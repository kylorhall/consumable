import React from 'react';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import FormControl from '~/components/Form/Control';

import uuid from '~/helpers/uuid';

export const FormSelect = ({ label, options, ...props }) => <FormControl {...props}>
  {label !== false && <InputLabel htmlFor={props.id}>{label}</InputLabel>}

  <Select
    inputProps={{
      name: props.name,
      id: props.id,
    }}
    value={props.value}
    onChange={props.onChange}
    {...props}
  >
    {options.map(option => <MenuItem
      key={option.key || option.value + option.label}
      value={option.value}
      disabled={option.disabled === true}
    >
      {option.label}
    </MenuItem>)}
  </Select>
</FormControl>;

FormSelect.defaultProps = {
  id: uuid(),
};

export default FormSelect;
