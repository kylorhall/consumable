import React from 'react';
import DatePicker from 'material-ui-pickers/DatePicker';

export default props => <DatePicker
  autoOk
  // NOTE: Masks do not currently appear to work..
  // disableOpenOnEnter
  // keyboard
  // mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
  placeholder="MM/DD/YYYY"
  {...props}
/>;
