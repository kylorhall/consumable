import React from 'react';

import { Context as AuthContext } from '~/context/Auth';
import { db } from '~/helpers/firebase';

import Button from '~/components/Button';
import Input from '~/components/Form/Input';
import Select from '~/components/Form/Select';
import Spinner from '~/components/Spinner';

export class Trip extends React.Component {
  state = {
    error: undefined,
    loading: true,
    trip: {},
  }

  async componentDidMount() {
    this.fetchTrip(this.props.match.params.id);
  }

  onSubmit = (e) => {
    e.preventDefault(); // don't use HTML submission
    if (this.canEdit()) return this.updateTrip(e);
    return this.createTrip(e);
  }

  onChange = (event) => {
    const target = event.currentTarget;
    const name = event.currentTarget.getAttribute('name');
    let value = target.value;

    if (!target) return;

    if (target.options && target.options.length && target.options[target.selectedIndex] !== undefined) { // change select
      value = target.options[target.selectedIndex].value; // selected value
    } else if (target.getAttribute('type') === 'checkbox') { // change textbox
      value = target.checked;
    }

    if (value !== undefined) {
      this.setState(state => ({
        trip: {
          ...state.trip,
          [name]: value,
        },
      }));
    }
  }

  getTripForFirebase = () => {
    // WARNING: Mutating trip below, intentionally!
    const trip = {
      ...this.state.trip,
      dailyEnergyUnit: this.state.trip.dailyEnergyUnit || 'kcal', // default to kcal
      userId: this.props.user.uid, // needs an authentication id!
    };
    delete trip.id; // Must delete the id.
    return trip;
  }

  fetchTrip = async (tripId) => {
    const doc = await db.collection('trips').doc(tripId).get();

    return this.setState({
      loading: false,
      trip: {
        id: doc.id,
        ...doc.data(),
      },
    });
  }

  canEdit = () => this.state.trip.userId === this.props.user.uid

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
      await db.collection('trips').doc(this.state.trip.id).update(this.getTripForFirebase());
      this.setState({ loading: false }); // successful if there is no error
    } catch (e) {
      console.error(e);
      this.setState({ loading: false, error: e.message });
    }
  }

  // NOTE: renderTrip consumes AuthContext.Consumer!
  renderTrip = () => {
    if (!this.state.trip.id && !this.props.user) return <h1>404, Trip Not Found</h1>;
    if (!this.state.trip.id) return <h1>404 • Trip Not found</h1>;

    return <React.Fragment>
      <Input label="Name" required value={this.state.trip.name} name="name" onChange={this.onChange} />
      <Input label="Daily Energy Estimate" required value={this.state.trip.dailyEnergy} name="dailyEnergy" onChange={this.onChange} />
      <Select
        label="Energy Unit"
        options={[
          { value: 'kcal', label: 'Calories' },
          { value: 'kj', label: 'Kilojoules' },
        ]}
        value={this.state.trip.dailyEnergyUnit || 'kcal'} // default to first
        name="dailyEnergyUnit"
        onChange={this.onChange}
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
