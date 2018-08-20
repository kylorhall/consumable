/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';

import Firebase from '~/helpers/firebase';

import Spinner from '~/components/Spinner';

const defaultState = {
  authReported: false,
  error: undefined,
  user: undefined,
};

export const Context = React.createContext(defaultState);

export default class Auth extends Component {
  state = defaultState

  componentDidMount() {
    Firebase.auth.onAuthStateChanged(user => this.setState({ authReported: true, user }));
  }

  renderChildren = () => {
    if (!this.state.authReported) return <Spinner />;
    return this.props.children;
  }

  render() {
    return <Context.Provider value={{ ...this.state }}>
      {this.renderChildren()}
    </Context.Provider>;
  }
}
