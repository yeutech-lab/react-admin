import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Labeled from '../input/Labeled';

const sanitizeRestProps = ({ basePath, record, resoure, ...rest }) => rest;

export const FormInput = ({ classes, input, formClassName, ...rest }) =>
    input ? (
        <div
            className={classnames(
                'ra-input',
                `ra-input-${input.props.source}`,
								formClassName
            )}
        >
            {input.props.addLabel ? (
                <Labeled {...input.props} {...sanitizeRestProps(rest)}>
                    {React.cloneElement(input, {
                        className: input.props.className,
                        ...rest,
                    })}
                </Labeled>
            ) : (
                React.cloneElement(input, {
                    className: input.props.className,
                    ...rest,
                })
            )}
        </div>
    ) : null;

FormInput.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
    input: PropTypes.object,
};

export default FormInput;
