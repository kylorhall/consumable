import React from 'react';
import { DateTime } from 'luxon';

import Button from '@material-ui/core/Button';

import { Context as AuthContext } from '~/context/Auth';
import { db } from '~/helpers/firebase';

import DatePicker from '~/components/Form/DatePicker';
import Input from '~/components/Form/Input';
import Spinner from '~/components/Spinner';
import UnitGroup from '~/components/Form/UnitGroup';

import FormContainer from './Container';

export class Trip extends React.Component {
  state = {
    error: undefined,
    loading: true,

    // trip
    id: undefined,
    name: undefined,
    energy: undefined,
    energyUnit: undefined,
    startDate: DateTime.local(),
    endDate: DateTime.local(),
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
    this.setState({ name: e.target.value || '' });
  }

  onChangeAmount = ({ amount, unit }) => {
    this.setState({ energy: amount, energyUnit: unit });
  }

  onChangeDate = name => (date) => {
    this.setState({ [name]: date });
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
      console.error(e); // eslint-disable-line no-console
      this.setState({ loading: false, error: e.message });
    }
  }

  updateTrip = async () => {
    this.setState({ loading: true });
    try {
      await db.collection('trips').doc(this.state.id).update(this.getTripForFirebase());
      this.setState({ loading: false }); // successful if there is no error
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
      this.setState({ loading: false, error: e.message });
    }
  }

  // NOTE: renderTrip consumes AuthContext.Consumer!
  renderTrip = () => {
    if (!this.state.id && !this.props.user) return <h1>404, Trip Not Found</h1>;
    if (!this.state.id) return <h1>404 • Trip Not found</h1>;

    return <React.Fragment>
      <Input
        label="Section Name"
        name="name"
        onChange={this.onChangeName}
        value={this.state.name}
      />

      <div>
        <DatePicker label="Start Date" name="startDate" value={this.state.startDate} onChange={this.onChangeDate('startDate')} />
        <DatePicker label="End Date" name="endDate" value={this.state.endDate} onChange={this.onChangeDate('endDate')} />
      </div>


      <UnitGroup
        amount={this.state.energy}
        amountLabel="Daily Energy"
        onChange={this.onChangeAmount}
        type="energy"
        unit={this.state.energyUnit}
      />

      <Button onClick={this.onSubmit} color="primary" variant="contained">Save Trip</Button>
    </React.Fragment>;
  }

  render() {
    if (this.state.loading) return <Spinner />;

    return <FormContainer onSubmit={this.onSubmit} autoComplete="off">
      {this.state.error && <mark>Error: {this.state.error}</mark>}
      {this.renderTrip()}
    </FormContainer>;
  }
}

export default props => <AuthContext.Consumer>
  {({ user }) => <Trip user={user} {...props} />}
</AuthContext.Consumer>;
