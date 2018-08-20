import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AuthContainer from '~/context/Auth';

import Login from '~/components/Login';
import Trip from '~/components/Trip';
import Trips from '~/components/Trips';
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
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/trips/:id" component={Trip} />
          <Route path="/trips/new" component={Trip} />
          <Route path="/trips" component={Trips} exact />
          <Route path="/user" component={User} />
        </Switch>
      </Content>

      <Footer />
    </GridLayout>
  </AuthContainer>
</BrowserRouter>;
