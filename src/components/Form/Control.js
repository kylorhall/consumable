import React from 'react';
import FormControl from '@material-ui/core/FormControl';

export default props => <FormControl
  fullWidth={props.fullWidth}
  error={props.error}
  disabled={props.disabled}
  margin={props.margin}
  required={props.required}
>
  {props.children}
</FormControl>;
