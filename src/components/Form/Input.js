import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import FormControl from '~/components/Form/Control';
import uuid from '~/helpers/uuid';

export const FormInput = ({ label, ...props }) => <FormControl {...props}>
  {label !== false && <InputLabel htmlFor={props.id}>{label}</InputLabel>}

  <Input {...props} />
</FormControl>;

FormInput.defaultProps = {
  id: uuid(),
};

export default FormInput;
