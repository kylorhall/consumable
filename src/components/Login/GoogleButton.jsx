import React from 'react';
import styled from 'styled-components';
import { FaGoogle } from 'react-icons/fa';

import Button from '~/components/Button';

const ColoredButton = styled(Button)`
  background: #4285f4;
  color: #fff;
`;

export default ({ onClick }) => <ColoredButton onClick={onClick} type="button">
  <FaGoogle />
  Login as a Guest
</ColoredButton>;
