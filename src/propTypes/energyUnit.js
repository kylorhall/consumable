import PropTypes from 'prop-types';

import { units } from '~/helpers/energy';

export default PropTypes.oneOf(Object.keys(units));
