/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';

import { auth, db } from '~/helpers/firebase';
import { baseUnit as baseEnergy } from '~/helpers/energy';
import { baseUnit as baseWeight } from '~/helpers/weight';

import Spinner from '~/components/Spinner';

const defaultState = {
  authReported: false,
  error: undefined,
  user: {
    energyUnit: baseEnergy,
    weightUnit: baseWeight,
  },
};

export const Context = React.createContext(defaultState);

export default class Auth extends Component {
  state = defaultState

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      this.grabUserSettings(user); // grab user settings, async

      this.setState(state => ({
        authReported: true,
        user: {
          ...defaultState.user,
          ...state.user,
          ...user,
        },
      })); // set state with user; will be extended
    });
  }

  grabUserSettings = async (user) => {
    const doc = await db.collection('users').doc(user.uid).get();
    if (!doc.exists) return; // user not found

    this.setState((state) => {
      if (state.user.uid !== user.uid) return undefined; // different user; no change

      return {
        user: {
          ...defaultState.user,
          ...user,
          ...doc.data(),
        },
      };
    });
  }

  renderChildren = () => {
    if (!this.state.authReported) return <Spinner />;
    return this.props.children;
  }

  render() {
    const context = {
      authReported: this.state.authReported,
      error: this.state.error,
      user: (this.state.user && this.state.user.id) ? this.state.user : undefined,
    };

    return <Context.Provider value={context}>
      <p>Uid: {this.state.user && this.state.user.uid}</p>

      {this.renderChildren()}
    </Context.Provider>;
  }
}
