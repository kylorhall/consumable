import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import AuthContainer from '~/context/Auth';

import Login from '~/components/Login';
import User from '~/components/User';

import GridLayout from '~/containers/GridLayout';
import Header from '~/containers/Header';
import Sidebar from '~/containers/Sidebar';
import Content from '~/containers/Content';
import Footer from '~/containers/Footer';

export default () => <BrowserRouter>
  <AuthContainer>
    <GridLayout>
      <Header />

      <Sidebar />

      <Content>
        <Route path="/login" component={Login} />
        <Route path="/user" component={User} />
      </Content>

      <Footer />
    </GridLayout>
  </AuthContainer>
</BrowserRouter>;
