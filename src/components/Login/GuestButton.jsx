import React from 'react';
import styled from 'styled-components';
import { FaUserSecret } from 'react-icons/fa';

import Button from '~/components/Button';

const ColoredButton = styled(Button)`
  background: #777;
  color: #fff;
`;

export default ({ onClick }) => <ColoredButton onClick={onClick} type="button">
  <FaUserSecret />
  Login as a Guest
</ColoredButton>;
