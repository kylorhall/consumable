import React from 'react';
import { DateTime } from 'luxon';
import debounce from 'lodash/debounce';

import { Context as AuthContext } from '~/context/Auth';
import { db, saveToFirebase } from '~/helpers/firebase';
import firebaseId from '~/helpers/firebaseId';

import DatePicker from '~/components/Form/DatePicker';
import Input from '~/components/Form/Input';
import Spinner from '~/components/Spinner';
import UnitGroup from '~/components/Form/UnitGroup';

import Consumable from '~/components/Consumable';

import Container from './Container';

export class Trip extends React.Component {
  state = {
    error: undefined,
    loading: true,

    // trip
    id: this.props.match.params.id || firebaseId.generate(),
    name: undefined,
    energy: undefined,
    energyUnit: undefined,
    startDate: DateTime.local(),
    endDate: DateTime.local().plus({ days: 2 }),

    // helps prevent the user from entering a random id and creating an entry with that id
    exists: undefined,

    // consumable state
    consumables: [],
  }

  async componentDidMount() {
    this.fetchModel(this.state.id);
  }

  componentWillUnmount() {
    saveToFirebase('trips', this.getModelState());
  }

  onChangeName = (e) => {
    this.setStateAndCommit({ name: e.target.value || '' });
  }

  onChangeAmount = ({ amount, unit }) => {
    this.setStateAndCommit({ energy: amount, energyUnit: unit });
  }

  onChangeDate = name => (date) => {
    this.setStateAndCommit({ [name]: date });
  }

  setStateAndCommit = (state, callback) => {
    let fn = this.saveModelDebounced;

    // if we _also_ have a callback, we need to call both
    if (typeof callback === 'function') {
      fn = () => {
        this.saveModelDebounced();
        callback();
      };
    }

    this.setState(state, fn);
  }

  // Only pass through non-undefined values (for firebase)
  getModelState = () => ({
    id: this.state.id,
    name: this.state.name,
    energy: this.state.energy,
    energyUnit: this.state.energyUnit || this.props.user.energyUnit,
    startDate: this.state.startDate,
    endDate: this.state.endDate,
    userId: this.props.user.uid, // needs an authentication id!
  })

  canEdit = () => this.state.userId === this.props.user.uid

  // NOTE: fetchModel should only be called on instantiation, really..
  fetchModel = async (id) => {
    const doc = await db.collection('trips').doc(id).get();
    if (!doc.exists) return this.setState({ exists: false, loading: false });

    const model = {
      id: doc.id,
      ...doc.data(),
    };

    this.setState({ ...model, exists: true, loading: false });
    return model;
  }

  updateUrl = () => {
    const modelPath = `/trips/${this.state.id}`;
    if (this.props.history.location.pathname !== modelPath) this.props.history.push(modelPath);
  }

  saveModel = async () => {
    if (!await this.validate()) return;

    try {
      await saveToFirebase('trips', this.getModelState());
      this.setState({ exists: true });
      this.updateUrl();
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
      this.setState({ error: e.message });
    }
  }

  saveModelDebounced = debounce(this.saveModel, 1000, { maxWait: 2500 }); // eslint-disable-line react/sort-comp

  hasBadId = () => {
    if (this.state.exists === true) return false;
    if (!firebaseId.isValid(this.state.id)) return true; // a manually entered, invalid id
    if (this.props.match.params.id && this.state.id === this.props.match.params.id) return true; // a manually entered id
    return false;
  }


  validate = () => {
    if (this.hasBadId()) return false;
    return true;
  }

  afterSaveConsumable = (consumable) => {
    this.setState((state) => {
      const currentIndex = state.consumables.findIndex(obj => obj.id === consumable.id);
      if (!currentIndex) return { consumables: state.consumables.concat(consumable) };

      const consumables = [].concat(state.consumables);
      consumables[currentIndex] = consumable; // update the index in a new, cloned array

      return { consumables };
    });
  }

  afterDeleteConsumable = (id) => {
    this.setState(state => ({
      consumables: state.consumables.filter(consumable => consumable.id !== id),
    }));
  }

  // NOTE: renderTrip consumes AuthContext.Consumer!
  renderTrip = () => <React.Fragment>
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

    Totals:
    <br />Days:
    <br />Calories:
    <br />Efficiency:
    <br />Food Weight:
    <br />Packaging:
    <br />Weight:
  </React.Fragment>


  render() {
    if (this.state.loading) return <Spinner />;
    if (this.hasBadId()) return <div>404 Not Found</div>;

    return <React.Fragment>
      <Container>
        {this.state.error && <mark>Error: {this.state.error}</mark>}
        {this.renderTrip()}
      </Container>

      {this.state.consumables.map(consumable => <Consumable
        {...consumable}
        key={consumable.id}
        tripId={this.state.id}
        afterDelete={this.afterDeleteConsumable}
        afterSave={this.afterSaveConsumable}
      />)}

      <Consumable
        key="new"
        tripId={this.state.id}
        afterDelete={this.afterDeleteConsumable}
        afterSave={this.afterSaveConsumable}
      />
    </React.Fragment>;
  }
}

export default props => <AuthContext.Consumer>
  {({ user }) => <Trip user={user} {...props} />}
</AuthContext.Consumer>;
