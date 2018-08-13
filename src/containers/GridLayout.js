import styled from 'styled-components';

export default styled.div`
  border: 5px solid red;

  display: grid;
  grid-template-areas: "header header"
                       "sidebar content"
                       "footer footer";
  grid-template-rows: 150px 1fr 100px;
  grid-template-columns: 200px 1fr;
`;
