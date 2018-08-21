import React from 'react';

import Label from '~/components/Form/Label';

import Select from './Select.jsx';

export default props => <Label {...props}>
  <Select
    {...props}
    value={props.value || ''}
  >
    {props.options.length > 0 && props.options.map(option => <option
      key={`${option.value}${option.label}`}
      value={option.value}
      disabled={option.disabled === true}
    >
      {option.label}
    </option>)}
  </Select>
</Label>;
