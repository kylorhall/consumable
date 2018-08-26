import React from 'react';
import NumberFormat from 'react-number-format';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import FormControl from '~/components/Form/Control';
import uuid from '~/helpers/uuid';

export const NumberInput = ({ label, onChange, ...props }) => <FormControl {...props}>
  {label !== false && <InputLabel htmlFor={props.id}>{label}</InputLabel>}

  <NumberFormat
    customInput={Input}
    isNumericString

    onValueChange={(values) => {
      onChange({
        target: {
          name: props.name,
          value: values.value,
        },
      });
    }}

    {...props}
  />
</FormControl>;

NumberInput.defaultProps = {
  decimalScale: 2,
  id: uuid(),
};

export default NumberInput;
