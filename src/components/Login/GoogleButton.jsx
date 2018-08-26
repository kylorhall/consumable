import React from 'react';
import { FaGoogle } from 'react-icons/fa';

import Button from '@material-ui/core/Button';

// TODO: Properly style this and use material-icons
export default props => <Button variant="contained" color="primary" {...props}>
  <FaGoogle />
  Login with Google
</Button>;
