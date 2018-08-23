import React from 'react';

import { units } from '~/helpers/energy';

import Select from '~/components/Form/Select';

const options = Object.keys(units).map(key => ({ value: units[key].abbr, label: `${units[key].name}s` }));

export default props => <Select
  label={props.label || 'Energy Unit'}
  options={props.options || options}
  value={props.value}
  name={props.name || 'energyUnit'}
  onChange={props.onChange}
/>;
