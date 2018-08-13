import React from 'react';
import ReactDOM from 'react-dom';

import styledNormalize from 'styled-normalize';
import { injectGlobal } from 'styled-components';

import App from '~/containers/App';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  ${styledNormalize}

  html, body {
    font-family: 'Roboto', sans-serif;
  }
`;

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
