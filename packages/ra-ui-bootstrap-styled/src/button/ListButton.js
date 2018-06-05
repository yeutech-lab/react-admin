import React from 'react';
import PropTypes from 'prop-types';
import Fa from 'bootstrap-styled/lib/Fa';

import Link from '../Link';
import Button from './Button';

const ListButton = ({ basePath = '', label = 'ra.action.list', ...rest }) => (
    <Button tag={Link} to={basePath} label={label} {...rest}>
      <Fa list-ul className="mr-1" />
    </Button>
);

ListButton.propTypes = {
    basePath: PropTypes.string,
    label: PropTypes.string,
};

export default ListButton;
