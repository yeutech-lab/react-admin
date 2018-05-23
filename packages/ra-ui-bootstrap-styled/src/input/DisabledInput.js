import React from 'react';
import PropTypes from 'prop-types';
import Input from '';
import { addField, FieldTitle } from '@yeutech/ra-core';

import sanitizeRestProps from './sanitizeRestProps';

const DisabledInput = ({
    classes,
    className,
    record,
    input: { value },
    label,
    resource,
    source,
    options,
    // Our props
    labelHidden,
    classNameInput,
    size,
    ...rest
}) => (
    <FormGroup className={className} {...sanitizeRestProps(rest)}>
        <FieldTitle
            label={label}
            source={source}
            resource={resource}
            labelHidden={labelHidden}
        />
        <Input
            {...input}
            size={size}
            className={classNameInput}
            readOnly
        />
    </FormGroup>
);

DisabledInput.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    input: PropTypes.object,
    record: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    labelHidden: PropTypes.bool,
    classNameInput: PropTypes.string,
	  size: PropTypes.string,
};

export default addField(DisabledInput);
