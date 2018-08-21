import React from 'react';

import Label from '~/components/Form/Label';

import Input from './Input.jsx';

export default props => <Label {...props}>
  <Input
    {...props}
    value={props.value || ''}
  />
</Label>;
