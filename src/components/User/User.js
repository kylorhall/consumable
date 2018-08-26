import React from 'react';
import Button from '@material-ui/core/Button';

import { Context } from '~/context/Auth';
import Firebase from '~/helpers/firebase';
import Login from '~/components/Login';

const signOut = async () => Firebase.auth.signOut();

export default class User extends React.Component {
  state = {
    open: false,
  }

  openLogin = () => this.setState({ open: true })

  closeLogin = () => this.setState({ open: false })

  renderLoggedOut = () => <React.Fragment>
    <Button onClick={this.openLogin}>Login</Button>

    <Login open={this.state.open} onClose={this.closeLogin} />
  </React.Fragment>

  renderLoggedIn = user => <div>
      Welcome {user.displayName || user.uid}

    <Button onClick={signOut}>Sign Out</Button>
  </div>

  render() {
    return <Context.Consumer>
      {({ user }) => {
        if (user) return this.renderLoggedIn(user);
        return this.renderLoggedOut(user);
      }}
    </Context.Consumer>;
  }
}
