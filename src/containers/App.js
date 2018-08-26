import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import LuxonUtils from 'material-ui-pickers/utils/luxon-utils';

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
    <MuiPickersUtilsProvider utils={LuxonUtils}>
      <GridLayout>
        <Header />

        <Sidebar />

        <Content>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/trips" component={Trips} exact />
            <Route path="/trips/:id" component={Trip} />
            <Route path="/trips/new" component={Trip} exact />
            <Route path="/user" component={User} />
          </Switch>
        </Content>

        <Footer />
      </GridLayout>
    </MuiPickersUtilsProvider>
  </AuthContainer>
</BrowserRouter>;
