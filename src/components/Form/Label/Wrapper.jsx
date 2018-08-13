import styled, { css } from 'styled-components';

import dimensions from '~/styled/dimensions';

const blockCss = css`
  display: block;
  margin-bottom: ${dimensions.padding};
  max-width: fit-content;
  vertical-align: top;
  width: 100%;
`;

const inlineCss = css`
  display: inline-block;
  margin-right: ${dimensions.padding};
  max-width: fit-content;
  width: auto;
`;

export default styled.label`
  vertical-align: top;
  ${props => (props.block ? blockCss : inlineCss)}
`;
