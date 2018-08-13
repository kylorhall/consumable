import React from 'react';
import { Redirect } from 'react-router-dom';

import Firebase from '~/helpers/firebase';
import { Context } from '~/composers/Auth';

import Buttons from './Buttons';
import EmailButton from './EmailButton';
import GoogleButton from './GoogleButton';
import GuestButton from './GuestButton';

export default class Login extends React.Component {
  state = {
    email: '',
    message: undefined,
  }

  onChangeEmail = (e) => {
    this.setState({ email: e.currentTarget.value || '' });
  }

  handleAuthError = () => {
    this.setState({ message: 'There was an issue logging in.' });
  }

  loginWithEmail = async () => {
    try {
      await Firebase.auth.sendSignInLinkToEmail(this.state.email, {
        url: 'https://consumeables.app/login/passwordless',
        handleCodeInApp: true,
      });

      window.localStorage.getItem('emailForSignInLink', this.state.email);
      this.setState({ message: 'Check your email for a passwordless login link.' });
    } catch (e) {
      this.handleAuthError(e);
    }
  }

  loginWithGoogle = async () => {
    try {
      const provider = Firebase.GoogleAuthProvider;
      const result = await Firebase.auth.signInWithPopup(provider);

      window.localStorage.getItem('googleAccessToken', result.credential.accessToken);
    } catch (e) {
      this.handleAuthError(e);
    }
  }

  loginAnonymously = async () => {
    try {
      await Firebase.auth.signInAnonymously();
    } catch (e) {
      this.handleAuthError(e);
    }
  }

  renderRedirect = () => <Redirect to="/user" />

  renderLoginForm = () => <form>

    <p>
      {this.state.message}
    </p>

    <Buttons>
      <input type="email" required value={this.state.email} name="email" onChange={this.onChangeEmail} />
      <EmailButton onClick={this.loginWithEmail} />

      <hr />
      <GoogleButton onClick={this.loginWithGoogle} />
      <GuestButton onClick={this.loginAnonymously} />
    </Buttons>
  </form>

  render() {
    return <Context.Consumer>
      {({ user }) => {
        if (user) return this.renderRedirect();
        return this.renderLoginForm();
      }}
    </Context.Consumer>;
  }
}
