import styled, { css } from 'styled-components';

import colors from '~/styled/colors';
import dimensions from '~/styled/dimensions';

export default styled.input`
  background-color: ${colors.whiteGrey};
  background-image: none;
  border: 1px solid ${colors.grey};
  box-shadow: none;
  position: relative;
  transition: all 250ms, height 0ms, width 0ms;
  vertical-align: top;
  width: 100%;

  border-radius: ${dimensions.borderRadius};
  height: ${dimensions.height};
  line-height: ${dimensions.lineHeight}; /* height - border widths */
  max-width: 19rem;
  padding: 0 ${dimensions.padding};

  &:focus,
  &:focus-within {
    border-color: ${colors.blue};
    outline: none;
    box-shadow: none;
  }

  ${({ full }) => full && css`max-width: none;`}

  ${({ error }) => error && css`
    border-color: ${colors.red};
  `}
`;
