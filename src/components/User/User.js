import React from 'react';
import { Link } from 'react-router-dom';

import Firebase from '~/helpers/firebase';
import { Context } from '~/context/Auth';

import Button from '~/components/Button';

const signOut = async () => Firebase.auth.signOut();

export default () => <Context.Consumer>
  {({ user }) => {
    if (user) {
      return <div>
      Welcome {user.displayName || user.uid}

        <Button onClick={signOut}>Sign Out</Button>
      </div>;
    }
    return <Link to="/login">Please Login</Link>;
  }}
</Context.Consumer>;
