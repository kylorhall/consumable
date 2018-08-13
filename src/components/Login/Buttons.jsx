import styled from 'styled-components';

import dimensions from '~/styled/dimensions';

export default styled.div`
  display: grid;
  grid-gap: ${dimensions.padding};
  grid-template-columns: 100%;
  margin: 0 auto;
  max-width: 500px;
  padding: ${dimensions.padding};
`;
