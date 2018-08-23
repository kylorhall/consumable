import React from 'react';
import NumberFormat from 'react-number-format';

import Label from '~/components/Form/Label';
import { StyledInput } from '~/components/Form/Input';

export default props => <Label {...props}>
  <NumberFormat
    customInput={StyledInput}
    decimalScale={2}
    isNumericString

    {...props}
    value={props.value || ''}
  />
</Label>;
