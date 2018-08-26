import PropTypes from 'prop-types';

import { units as energyUnits } from '~/helpers/energy';
import { units as weightUnits } from '~/helpers/weight';

export default PropTypes.oneOf([
  ...Object.keys(energyUnits),
  ...Object.keys(weightUnits),
]);
