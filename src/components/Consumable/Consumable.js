import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

import { Context as AuthContext } from '~/context/Auth';
import { saveToFirebase } from '~/helpers/firebase';
import firebaseId from '~/helpers/firebaseId';

import Input from '~/components/Form/Input';
import UnitGroup from '~/components/Form/UnitGroup';

export class Consumable extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    tripId: PropTypes.string.isRequired,
    name: PropTypes.string,
    type: PropTypes.oneOf(['food', 'consumable']),
    energy: PropTypes.number,
    // …
  }

  state = {
    id: this.props.id || firebaseId.generate(),

    // consumable state
    name: this.props.name,
    type: this.props.type,

    energy: this.props.energy,
    energyUnit: this.props.energyUnit,
    weight: this.props.weight,
    weightUnit: this.props.weightUnit,
    packageWeight: this.props.packageWeight,
    packageWeightUnit: this.props.packageWeightUnit,
    serving: this.props.serving,
    servingUnit: this.props.servingUnit,
  }

  onChange = name => (e) => {
    this.setStateAndCommit({ [name]: e.target.value || '' });
  }

  onChangePair = name => ({ amount, unit }) => {
    this.setStateAndCommit({ [name]: amount, [`${name}Unit`]: unit });
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

  getModelState = () => ({
    id: this.state.id,
    name: this.state.name,
    tripId: this.props.tripId,
    type: this.state.type,

    energy: this.state.energy,
    energyUnit: this.state.energyUnit || this.props.user.energyUnit,
    weight: this.state.weight,
    weightUnit: this.state.weightUnit || this.props.user.weightUnit,
    packageWeight: this.state.packageWeight,
    packageWeightUnit: this.state.packageWeightUnit || this.props.user.weightUnit,
    serving: this.state.serving,
    servingUnit: this.state.servingUnit || this.props.user.weightUnit,
  })

  saveModel = async () => {
    try {
      await saveToFirebase('consumables', this.getModelState());
      this.props.afterSave(this.getModelState());
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
      this.setState({ error: e.message });
    }
  }

  saveModelDebounced = debounce(this.saveModel, 1000, { maxWait: 2500 }); // eslint-disable-line react/sort-comp

  renderConsumable = () => <React.Fragment>
    <Input
      label="Name"
      name="name"
      onChange={this.onChange('name')}
      value={this.state.name}
    />

    <UnitGroup
      amount={this.state.energy}
      amountLabel="Energy"
      onChange={this.onChangePair('energy')}
      type="energy"
      unit={this.state.energyUnit}
    />

    <UnitGroup
      amount={this.state.weight}
      amountLabel="Weight"
      onChange={this.onChangePair('weight')}
      type="weight"
      unit={this.state.weightUnit}
    />
  </React.Fragment>

  render() {
    return <form onSubmit={this.onSubmit} autoComplete="off">
      {this.state.error && <mark>Error: {this.state.error}</mark>}
      {this.renderConsumable()}
    </form>;
  }
}

export default props => <AuthContext.Consumer>
  {({ user }) => <Consumable user={user} {...props} />}
</AuthContext.Consumer>;
