import React from 'react';
import { FaEnvelope } from 'react-icons/fa';

import Button from '@material-ui/core/Button';

// TODO: Properly style this and use material-icons
export default props => <Button variant="contained" color="default" {...props}>
  <FaEnvelope />
  Login with Email
</Button>;
