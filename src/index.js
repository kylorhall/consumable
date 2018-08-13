import React from 'react';
import ReactDOM from 'react-dom';

import styledNormalize from 'styled-normalize';
import { injectGlobal } from 'styled-components';

import Router from '~/containers/Router';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  ${styledNormalize}

  html, body {
    font-family: 'Roboto', sans-serif;
  }
`;

ReactDOM.render(
  <Router />,
  document.getElementById('root'),
);
