import React from 'react';
import { FaEnvelope } from 'react-icons/fa';

import Button from '~/components/Button';

export default ({ onClick }) => <Button onClick={onClick} type="button">
  <FaEnvelope />
  Login with Email
</Button>;
