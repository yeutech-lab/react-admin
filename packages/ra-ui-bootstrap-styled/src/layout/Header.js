import React from 'react';
import PropTypes from 'prop-types';
import CardHeader from 'bootstrap-styled/lib/Cards/CardHeader';
import classnames from 'classnames';

import ViewTitle from './ViewTitle';

export const Header = ({
    className,
    title,
    actions,
    actionProps,
    ...rest
}) => (
    <CardHeader className={classnames('p-0 px-sm-3 py-sm-2 flex-column flex-sm-row d-flex justify-content-between mb-0 align-items-center rounded-bottom-0', className)} {...rest}>
        <ViewTitle title={title} />
        {actions && React.cloneElement(actions, actionProps)}
    </CardHeader>
);

Header.propTypes = {
    className: PropTypes.string,
    title: PropTypes.any,
    actions: PropTypes.element,
    actionProps: PropTypes.object,
};

export default Header;
