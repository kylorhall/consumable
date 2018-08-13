import React from 'react';

import Content from './Content';
import Error from './Error';
import Label from './Label.jsx';
import Wrapper from './Wrapper';

export default (props) => {
  const styleProps = { error: props.error };

  return <Wrapper {...styleProps} className={props.className}>
    {props.label && <Label {...styleProps}>{props.label}</Label>}

    <Content {...styleProps}>{props.children}</Content>

    {props.error && typeof props.error === 'string'
      && <Error {...styleProps}>{props.error}</Error>
    }
  </Wrapper>;
};
