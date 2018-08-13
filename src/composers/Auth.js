/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';

import Firebase from '~/helpers/firebase';

import Spinner from '~/components/Spinner';

const defaultFirebaseContext = {
  authReported: false,
  error: undefined,
  user: undefined,
};

export const Context = React.createContext(defaultFirebaseContext);

export default class Auth extends Component {
  state = defaultFirebaseContext

  componentDidMount() {
    Firebase.auth.onAuthStateChanged(user => this.setState({ authReported: true, user }));
  }

  onAuthError = () => {
    this.setState({ error: 'There was an issue logging in.' });
  }

  signOut = async () => {
    try {
      await Firebase.auth.signOut();
    } catch (e) {
      this.onAuthError(e);
    }
  }

  renderError = () => <h1>{this.state.error}</h1>;

  renderChildren = () => {
    if (!this.state.authReported) return <Spinner />;
    if (this.state.error) return this.renderError();
    return this.props.children;
  }

  render() {
    return <Context.Provider value={{ ...this.state }}>
      {this.renderChildren()}

      {this.state.user && <button type="button" onClick={this.signOut}>Sign Out</button>}
    </Context.Provider>;
  }
}
