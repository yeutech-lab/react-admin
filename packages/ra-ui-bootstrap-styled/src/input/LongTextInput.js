import React from 'react';
import PropTypes from 'prop-types';
import Input from 'bootstrap-styled/lib/Input';
import FormGroup from 'bootstrap-styled/lib/Form/FormGroup';
import FormFeedback from 'bootstrap-styled/lib/Form/FormFeedback';
import classnames from 'classnames';
import { addField, FieldTitle } from '@yeutech/ra-core';

import sanitizeRestProps from './sanitizeRestProps';

export const LongTextInput = ({
    className,
    input,
    meta,
    isRequired,
    label,
    options,
    source,
    resource,
     // Our props
    rows,
    labelHidden,
    ...rest
}) => {
    if (typeof meta === 'undefined') {
        throw new Error(
            "The LongTextInput component wasn't called within a redux-form <Field>. Did you decorate it and forget to add the addField prop to your component? See https://marmelab.com/react-admin/Inputs.html#writing-your-own-input-component for details."
        );
    }
    const { touched, error } = meta;
    return (
        <FormGroup color={!!(touched && error) ? 'danger' : ''} className={classnames(className, 'w-100')} {...sanitizeRestProps(rest)}>
            <FieldTitle
                label={label}
                source={source}
                resource={resource}
                isRequired={isRequired}
                labelHidden={labelHidden}
            />
            <Input
                {...input}
                {...options}
                rows={rows}
                type="textarea"
            />
            {(touched &&  error) && <FormFeedback>{touched &&  error}</FormFeedback>}
        </FormGroup>
    );
};

LongTextInput.propTypes = {
    className: PropTypes.string,
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    meta: PropTypes.object,
    name: PropTypes.string,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    rows: PropTypes.string,
    validate: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.arrayOf(PropTypes.func),
    ]),
};

const EnhancedLongTextInput = addField(LongTextInput);
EnhancedLongTextInput.defaultProps = {
    options: {},
    rows: '5',
};

export default EnhancedLongTextInput;
