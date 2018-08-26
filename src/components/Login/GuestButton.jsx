import React from 'react';
import { FaUserSecret } from 'react-icons/fa';

import Button from '@material-ui/core/Button';

// TODO: Properly style this and use material-icons
export default ({ onClick }) => <Button onClick={onClick} type="button">
  <FaUserSecret />
  Login as a Guest
</Button>;
