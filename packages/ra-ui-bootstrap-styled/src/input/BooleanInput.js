import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Label from 'bootstrap-styled/lib/Label';
import FormCustom from 'bootstrap-styled/lib/Form/FormCustom';
import FormGroup from 'bootstrap-styled/lib/Form/FormGroup';
import { addField, FieldTitle } from '@yeutech/ra-core';

import sanitizeRestProps from './sanitizeRestProps';

export class BooleanInput extends Component {
    handleChange = (event, value) => {
        this.props.input.onChange(value);
    };

    render() {
        const {
            className,
            input,
            isRequired,
            label,
            source,
            resource,
            options,
            // Our props
            labelHidden,
            classNameInput,
            size,
            ...rest
        } = this.props;

        return (
            <FormGroup className={classnames(className, 'mr-5')} check {...sanitizeRestProps(rest)}>
                <FieldTitle
                  label={label}
                  source={source}
                  resource={resource}
                  isRequired={isRequired}
                  labelHidden={labelHidden}
                >
                    <Label check>
                        <FormCustom
                          className={classnames(classNameInput, 'ml-2')}
                          checked={!!input.value}
                          onChange={this.handleChange}
                          size={size}
                        />
                    </Label>
                </FieldTitle>
            </FormGroup>
        );
    }
}

BooleanInput.propTypes = {
    className: PropTypes.string,
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    resource: PropTypes.string,
    source: PropTypes.string,
    options: PropTypes.object,
};

BooleanInput.defaultProps = {
    options: {},
};

export default addField(BooleanInput);
