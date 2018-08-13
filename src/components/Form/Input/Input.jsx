import styled, { css } from 'styled-components';

import colors from '~/styled/colors';
import dimensions from '~/styled/dimensions';

const height = 1.875;

export default styled.input`
  background-color: ${colors.whiteGrey};
  background-image: none;
  border: 0.125rem solid ${colors.grey};
  box-shadow: none;
  position: relative;
  transition: all 250ms, height 0ms, width 0ms;
  vertical-align: top;
  width: 100%;

  border-radius: ${height / 2}rem;
  height: ${height}rem;
  line-height: ${height - 0.25}rem; /* height - border widths */
  max-width: 19rem;
  padding: 0 ${dimensions.padding};

  &:focus,
  &:focus-within {
    border-color: ${colors.link};
    outline: none;
    box-shadow: none;
  }

  ${({ full }) => full && css`max-width: none;`}

  ${({ error }) => error && css`
    border-color: ${colors.red};
  `}
`;
