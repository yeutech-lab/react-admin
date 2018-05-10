import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import Fa from 'bootstrap-styled/lib/Fa';
import ButtonBs from 'bootstrap-styled/lib/Button';
import classnames from 'classnames';

import { translate } from '@yeutech/ra-core';
import Responsive from '../layout/Responsive';

const Button = ({
    alignIcon = 'left',
    children,
    className,
    color = 'primary',
    label,
    size = 'sm',
    translate,
    ...rest
}) => (
    <Responsive
        small={
            <Fa
              plus
              className={className}
              color={color}
							{...rest}
            >
							{children}
            </Fa>
        }
        medium={
            <ButtonBs
              className={classnames('d-inline-flex align-items-center', className)}
              color={color}
              size={size}
							{...rest}
            >
							{alignIcon === 'left' && children}
                <span
                  className={classnames({
										'pl-2': alignIcon === 'left',
										'pr-2': alignIcon !== 'left',
									})}
                >
                  {label && translate(label, { _: label })}
                </span>
							{alignIcon === 'right' && children}
            </ButtonBs>
        }
    />
);

Button.propTypes = {
    alignIcon: PropTypes.string,
    children: PropTypes.node.isRequired,
    classes: PropTypes.object,
    className: PropTypes.string,
    color: PropTypes.string,
    label: PropTypes.string,
    size: PropTypes.string,
    translate: PropTypes.func.isRequired,
};

const enhance = compose(translate);

export default enhance(Button);
