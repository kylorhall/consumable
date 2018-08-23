import React from 'react';

import { Context as AuthContext } from '~/context/Auth';
import { db } from '~/helpers/firebase';
import convertEnergy, { base as baseEnergy } from '~/helpers/energy';

import Button from '~/components/Button';
import Input from '~/components/Form/Input';
import NumberInput from '~/components/Form/NumberInput';
import EnergySelect from '~/components/Form/EnergySelect';
import Spinner from '~/components/Spinner';

export class Trip extends React.Component {
  state = {
    error: undefined,
    loading: true,

    // trip
    id: undefined,
    name: undefined,
    energy: undefined,
    energyUnit: baseEnergy.abbr,
  }

  async componentDidMount() {
    this.fetchTrip(this.props.match.params.id);
  }

  onSubmit = (e) => {
    e.preventDefault(); // don't use HTML submission
    if (this.canEdit()) return this.updateTrip(e);
    return this.createTrip(e);
  }

  onChangeName = (e) => {
    this.setState({ name: e.currentTarget.value || '' });
  }

  onChangeEnergyUnit = (e) => {
    const value = e.currentTarget.value || '';
    this.setState(state => ({
      energyUnit: value,
      energy: this.recalculateEnergy(state.energy, state.energyUnit, value),
    }));
  }

  onChangeFormattedEnergy = ({ value, formattedValue }) => {
    this.setState({
      energy: value,
      energyFormatted: formattedValue,
    });
  }

  // NOTE: Excluding `id` intentionally, for firebase.
  getTripForFirebase = () => ({
    name: this.state.name,
    energy: this.state.energy,
    energyUnit: this.state.energyUnit || this.props.user.baseEnergy,
    userId: this.props.user.uid, // needs an authentication id!
  })

  fetchTrip = async (tripId) => {
    const doc = await db.collection('trips').doc(tripId).get();

    return this.setState({
      loading: false,
      id: doc.id,
      ...doc.data(),
    });
  }

  canEdit = () => this.state.userId === this.props.user.uid

  createTrip = async () => {
    this.setState({ loading: true });
    try {
      const doc = await db.collection('trips').add(this.getTripForFirebase());
      const trip = await this.fetchTrip(doc.id);

      // change to new url
      this.props.history.push(`/trips/${trip.id}`);
    } catch (e) {
      console.error(e);
      this.setState({ loading: false, error: e.message });
    }
  }

  updateTrip = async () => {
    this.setState({ loading: true });
    try {
      await db.collection('trips').doc(this.state.id).update(this.getTripForFirebase());
      this.setState({ loading: false }); // successful if there is no error
    } catch (e) {
      console.error(e);
      this.setState({ loading: false, error: e.message });
    }
  }

  recalculateEnergy = (value, from, to) => convertEnergy({
    value: value || 0,
    from: from || baseEnergy.abbr,
    to: to || baseEnergy.abbr,
  })

  // NOTE: renderTrip consumes AuthContext.Consumer!
  renderTrip = () => {
    if (!this.state.id && !this.props.user) return <h1>404, Trip Not Found</h1>;
    if (!this.state.id) return <h1>404 • Trip Not found</h1>;

    return <React.Fragment>
      <Input label="Name" value={this.state.name} name="name" onChange={this.onChangeName} />
      <NumberInput label="Daily Energy Estimate" value={this.state.energy} name="energy" onValueChange={this.onChangeFormattedEnergy} />

      <EnergySelect
        value={this.state.energyUnit || this.props.user.energyUnit}
        onChange={this.onChangeEnergyUnit}
      />

      <Button onClick={this.onSubmit} />
    </React.Fragment>;
  }

  render() {
    if (this.state.loading) return <Spinner />;

    return <form onSubmit={this.onSubmit}>
      {this.state.error && <mark>Error: {this.state.error}</mark>}
      {this.renderTrip()}
    </form>;
  }
}

export default props => <AuthContext.Consumer>
  {({ user }) => <Trip user={user} {...props} />}
</AuthContext.Consumer>;
