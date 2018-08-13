import styled, { css } from 'styled-components';

import colors from '~/styled/colors';

export default styled.div`
  margin-bottom: 5px;

  ${({ error }) => error && css`color: ${colors.red};`}
`;
