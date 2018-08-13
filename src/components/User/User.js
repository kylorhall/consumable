import React from 'react';
import { Link } from 'react-router-dom';

import { Context } from '~/composers/Auth';

export default () => <Context.Consumer>
  {({ user }) => {
    if (user) return <div>Welcome {user.displayName || user.uid}</div>;
    return <Link to="/login">Please Login</Link>;
  }}
</Context.Consumer>;
