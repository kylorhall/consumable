import styled from 'styled-components';

export default styled.div`
  min-height: 100vh; /* grow to body and #root */

  display: grid;
  grid-template-areas: "header header"
                       "sidebar content"
                       "footer footer";
  grid-template-rows: 150px 1fr 100px;
  grid-template-columns: 200px 1fr;
`;
