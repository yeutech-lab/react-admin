import React from 'react';
import PropTypes from 'prop-types';
import { Link as RRLink } from 'react-router-dom';

const Link = ({ to, children, className }) => (
    <RRLink to={to} className={className} style={{ textDecoration: 'none' }}>
        {children}
    </RRLink>
);
Link.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default Link;
