import styled from 'styled-components';

import dimensions from '~/styled/dimensions';

export default styled.button`
  background: #ccc;
  border-radius: ${dimensions.borderRadius};
  border: 0;
  color: #fff;
  line-height: ${dimensions.height};
  padding: 0 ${dimensions.padding};
  cursor: pointer;
  transition: 250ms all;

  &:hover, &:focus {
    filter: brightness(112%);
  }

  > svg {
    vertical-align: middle;
    margin-top: -.1875rem;
    margin-right: ${dimensions.padding};
  }
`;
