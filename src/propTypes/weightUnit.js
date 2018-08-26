import PropTypes from 'prop-types';

import { units } from '~/helpers/weight';

export default PropTypes.oneOf(Object.keys(units));
