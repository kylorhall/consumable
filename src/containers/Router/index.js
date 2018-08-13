import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import AuthContainer from '~/composers/Auth';

import Login from '~/components/Login';
import User from '~/components/User';

export default () => <BrowserRouter>
  <AuthContainer>
    <Route path="/login" component={Login} />
    <Route path="/user" component={User} />
  </AuthContainer>
</BrowserRouter>;
