import React from 'react';
import Button from '@material-ui/core/Button';

import { Context } from '~/context/Auth';
import Login from '~/components/Login';

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

  renderLoggedIn = (user, signOut) => <div>
      Welcome {user.displayName || user.uid}

    <Button onClick={signOut}>Sign Out</Button>
  </div>

  render() {
    return <Context.Consumer>
      {({ user, signOut }) => {
        if (user) return this.renderLoggedIn(user, signOut);
        return this.renderLoggedOut(user);
      }}
    </Context.Consumer>;
  }
}
