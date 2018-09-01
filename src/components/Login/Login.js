import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';

import config from '~/config';
import { auth, GoogleAuthProvider } from '~/helpers/firebase';
import Input from '~/components/Form/Input';

import EmailButton from './EmailButton';
import GoogleButton from './GoogleButton';
import GuestButton from './GuestButton';

export default class Login extends React.Component {
  state = {
    email: '',
    message: undefined,
  }

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value || '' });
  }

  handleAuthError = () => {
    this.setState({ message: 'There was an issue logging in.' });
  }

  loginWithEmail = async () => {
    try {
      await auth.sendSignInLinkToEmail(this.state.email, {
        url: `${config.url}/login/passwordless`,
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
      const provider = GoogleAuthProvider;
      const result = await auth.signInWithPopup(provider);

      window.localStorage.getItem('googleAccessToken', result.credential.accessToken);
    } catch (e) {
      this.handleAuthError(e);
    }
  }

  loginAnonymously = async () => {
    try {
      await auth.signInAnonymously();
    } catch (e) {
      this.handleAuthError(e);
    }
  }

  render() {
    return <Dialog onClose={this.props.onClose} aria-labelledby="login-dialog" open={this.props.open}>
      <DialogTitle id="login-dialog">Please Login</DialogTitle>
      <form>
        {this.state.message && <p>{this.state.message}</p>}

        <List>
          <ListItem dense>
            <Input label="Email Address" type="email" fullWidth value={this.state.email} name="email" onChange={this.onChangeEmail} />
          </ListItem>

          <ListItem dense>
            <EmailButton onClick={this.loginWithEmail} fullWidth />
          </ListItem>

          <Divider />

          <ListItem dense>
            <GoogleButton onClick={this.loginWithGoogle} fullWidth />
          </ListItem>

          <ListItem dense>
            <GuestButton onClick={this.loginAnonymously} fullWidth />
          </ListItem>
        </List>
      </form>
    </Dialog>;
  }
}
