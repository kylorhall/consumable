import React from 'react';

import { units } from '~/helpers/weight';
import Select from '~/components/Form/Select';

const options = Object.keys(units).map(key => ({ value: units[key].abbr, label: `${units[key].abbr}` }));

export const WeightSelect = props => <Select {...props} />;

WeightSelect.defaultProps = {
  options,
};

export default WeightSelect;
