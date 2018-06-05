import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from 'bootstrap-styled/lib/ButtonGroup';
import classnames from 'classnames';

const CardActions = ({ className, children, ...rest }) => (
    <ButtonGroup
        className={classnames('d-flex justify-content-end flex-wrap', className)}
        {...rest}
    >
        {children}
    </ButtonGroup>
);

CardActions.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export default CardActions;
