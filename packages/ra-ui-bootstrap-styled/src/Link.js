import React from 'react';
import PropTypes from 'prop-types';
import { Link as RRLink } from 'react-router-dom';
import composeLink from 'bootstrap-styled/lib/A/composeLink';

const LinkBs = composeLink(RRLink);

const Link = ({ to, children, className }) => (
    <LinkBs to={to} className={className}>
        {children}
    </LinkBs>
);
Link.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default Link;
