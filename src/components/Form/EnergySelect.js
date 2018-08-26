import React from 'react';

import { units } from '~/helpers/energy';
import Select from '~/components/Form/Select';

const options = Object.keys(units).map(key => ({ value: units[key].abbr, label: `${units[key].abbr}` }));

export const EnergySelect = props => <Select {...props} />;

EnergySelect.defaultProps = {
  options,
};

export default EnergySelect;
