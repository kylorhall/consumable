import React from 'react';
import PropTypes from 'prop-types';

import { Context as AuthContext } from '~/context/Auth';
import convertEnergy, { baseUnit as baseEnergy } from '~/helpers/energy';
import convertWeight, { baseUnit as baseWeight } from '~/helpers/weight';
import unitPropType from '~/propTypes/unit';

import NumberInput from '~/components/Form/NumberInput';
import EnergySelect from '~/components/Form/EnergySelect';
import WeightSelect from '~/components/Form/WeightSelect';

export class UnitGroup extends React.Component {
  static propTypes = {
    amount: PropTypes.number,
    amountLabel: PropTypes.node,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['energy', 'weight']).isRequired,
    unit: unitPropType,
  }

  static defaultProps = {
    amountLabel: 'Amount',
  }

  state = {
    amount: this.props.amount,
    unit: this.props.unit,
  }

  getDefaultUnit = () => {
    if (this.props.type === 'energy') return this.props.user.baseEnergy || baseEnergy;
    if (this.props.type === 'weight') return this.props.user.baseWeight || baseWeight;
    throw new Error(`Invalid type for UnitGroup: ${this.props.type}`);
  }

  getUnitSelect = () => {
    if (this.props.type === 'energy') return EnergySelect;
    if (this.props.type === 'weight') return WeightSelect;
    throw new Error(`Invalid type for UnitGroup: ${this.props.type}`);
  }

  afterChange = source => () => {
    this.props.onChange({
      ...this.state,
      source,
    });
  }

  handleAmountChange = (e) => {
    this.setState({
      amount: e.target.value,
    }, this.afterChange('amount'));
  }

  handleUnitChange = (e) => {
    this.setState(state => ({
      unit: e.target.value,
      amount: this.recalculate(state.amount, state.unit, e.target.value),
    }), this.afterChange('unit'));
  }

  recalculate = (value, from, to) => {
    let fn;
    if (this.props.type === 'energy') fn = convertEnergy;
    if (this.props.type === 'weight') fn = convertWeight;

    return fn({
      value: value || 0,
      from: from || this.getDefaultUnit(),
      to: to || this.getDefaultUnit(),
    });
  }

  render() {
    const UnitSelect = this.getUnitSelect();

    return <NumberInput
      // NOTE: Don't spread all props here; eg, props.type would throw warnings.
      label={this.props.amountLabel}
      name="amount"
      onChange={this.handleAmountChange}
      value={this.state.amount || ''}

      endAdornment={<UnitSelect
        label={false}
        name="unit"
        onChange={this.handleUnitChange}
        value={this.state.unit || this.getDefaultUnit()}
        disableUnderline
      />}
    />;
  }
}

export default props => <AuthContext.Consumer>
  {({ user }) => <UnitGroup user={user} {...props} />}
</AuthContext.Consumer>;
