/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';

import { auth, db } from '~/helpers/firebase';
import { baseUnit as baseEnergy } from '~/helpers/energy';
import { baseUnit as baseWeight } from '~/helpers/weight';

import Spinner from '~/components/Spinner';

const extendUser = {
  // when building a user, we spread this so a user always has default settings
  energyUnit: baseEnergy,
  weightUnit: baseWeight,
};

const defaultState = {
  authReported: false,
  error: undefined,
  user: undefined,
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
          ...extendUser,
          ...state.user,
          ...user,
        },
      })); // set state with user; will be extended
    });
  }

  grabUserSettings = async (user) => {
    if (!user) return;

    const doc = await db.collection('users').doc(user.uid).get();
    if (!doc.exists) return; // user not found

    this.setState((state) => {
      if (state.user.uid !== user.uid) return undefined; // different user; no change

      return {
        user: {
          ...extendUser,
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
      // NOTE: If the user does not have a uid, they are not valid to me
      user: this.state.user && this.state.user.uid ? this.state.user : undefined,
    };

    return <Context.Provider value={context}>
      <p>Uid: {this.state.user && this.state.user.uid}</p>

      {this.renderChildren()}
    </Context.Provider>;
  }
}
