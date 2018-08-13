import React from 'react';

import Label from '~/components/Form/Label';

import Input from './Input.jsx';

export default props => <Label {...props}>
  <Input
    {...props}

    onChange={props.onChange}
    value={props.value || ''}

    // style props
    full={props.full}
    error={props.error}
  />
</Label>;
