import React from 'react';
import PropTypes from 'prop-types';
import CardTitle from 'bootstrap-styled/lib/Cards/CardTitle';
import classnames from 'classnames';

import Responsive from './Responsive';
import AppBarMobile from './AppBarMobile';

const ViewTitle = ({ className, title, ...rest }) => (
    <Responsive
        xsmall={
            <AppBarMobile
                className={classnames('title', className)}
                title={title}
                {...rest}
            />
        }
        medium={
            <CardTitle className={classnames('title mb-0', className)} {...rest}>
                {title}
            </CardTitle>
        }
    />
);

ViewTitle.propTypes = {
    className: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
};

export default ViewTitle;
