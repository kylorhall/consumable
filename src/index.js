import React from 'react';
import ReactDOM from 'react-dom';

import styledNormalize from 'styled-normalize';
import { injectGlobal } from 'styled-components';

import App from '~/containers/App';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  ${styledNormalize}

  html {
    height: 100vh;
  }

  body {
    min-height: 100vh;
  }

  html, body {
    font-family: 'Roboto', sans-serif;
  }

  body > #root {
    min-height: 100vh;
  }
`;

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
