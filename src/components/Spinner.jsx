import styled from 'styled-components';

const size = '50px';
const color = '#ccc';

export default styled.span`
  animation: spinner 750ms infinite linear;
  border-radius: 50%;
  border: solid 3px transparent;
  box-sizing: border-box;
  display: flex;
  height: ${size};
  margin: 0 auto;
  transform: translateZ(0);
  vertical-align: middle;
  width: ${size};

  border-left-color: ${color};
  border-top-color: ${color};

  @keyframes spinner {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
