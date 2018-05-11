import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import compose from 'recompose/compose';
import FormGroup from 'bootstrap-styled/lib/Form/FormGroup';
import Input from 'bootstrap-styled/lib/Input';
import Option from 'bootstrap-styled/lib/Option';
import FormFeedback from 'bootstrap-styled/lib/Form/FormFeedback';
import { addField, translate, FieldTitle } from '@yeutech/ra-core';

import sanitizeRestProps from './sanitizeRestProps';

const styles = theme => ({
    input: { width: theme.spacing.unit * 16 },
});

export class NullableBooleanInput extends Component {
    state = {
        value: this.props.input.value,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.input.value !== this.props.input.value) {
            this.setState({ value: nextProps.input.value });
        }
    }

    handleChange = event => {
        this.props.input.onChange(
            this.getBooleanFromString(event.target.value)
        );
        this.setState({ value: event.target.value });
    };

    getBooleanFromString = value => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return null;
    };

    getStringFromBoolean = value => {
        if (value === true) return 'true';
        if (value === false) return 'false';
        return '';
    };

    render() {
        const {
            classes,
            className,
            isRequired,
            label,
            meta,
            options,
            resource,
            source,
            translate,
            // Our props
					  labelHidden,
					  classNameInput,
					  size,
            ...rest
        } = this.props;
        const { touched, error } = meta;
        return (
            <FormGroup color={meta.error ? 'danger' : ''} className={className}>
                <FieldTitle
                    label={label}
                    source={source}
                    resource={resource}
                    isRequired={isRequired}
                    labelHidden={labelHidden}
                />
                <Input
                    value={this.getStringFromBoolean(this.state.value)}
                    onChange={this.handleChange}
                    type="select"
                    size={size}
                    className={classNameInput}
                    {...options}
										{...sanitizeRestProps(rest)}
                >
                    <Option value="" />
                    <Option value="false">
                        {translate('ra.boolean.false')}
                    </Option>
                    <Option value="true">
                        {translate('ra.boolean.true')}
                    </Option>
                </Input>
                {error && <FormFeedback>{error}</FormFeedback>}
            </FormGroup>
        );
    }
}

NullableBooleanInput.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    meta: PropTypes.object,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    translate: PropTypes.func.isRequired,
};

const enhance = compose(addField, translate, withStyles(styles));

export default enhance(NullableBooleanInput);
