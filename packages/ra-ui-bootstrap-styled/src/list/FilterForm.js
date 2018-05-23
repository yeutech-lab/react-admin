import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import styled from 'styled-components';
import Fa from 'bootstrap-styled/lib/Fa';
import Button from 'bootstrap-styled/lib/Button';
import FormBs from 'bootstrap-styled/lib/Form';
import CardBlock from 'bootstrap-styled/lib/Cards/CardBlock';
import classnames from 'classnames';
import lodashSet from 'lodash/set';
import { translate } from '@yeutech/ra-core';

// const styles = ({ palette: { primary1Color } }) => ({
//     card: {
//         marginTop: '-14px',
//         paddingTop: 0,
//         display: 'flex',
//         justifyContent: 'flex-end',
//         alignItems: 'flex-end',
//         flexWrap: 'wrap',
//     },
//     body: { display: 'flex', alignItems: 'flex-end' },
//     spacer: { width: 48 },
//     icon: { color: primary1Color || '#00bcd4', paddingBottom: 0 },
//     clearFix: { clear: 'right' },
// });


const Form = styled(FormBs)`
  &.form-inline {
    .filter-field {
      position: relative;
      }
    .form-group {
      flex-direction: column !important;
    }
    .btn {
      position: absolute;
      top: 24px;
      right: 5px;
      z-index: 800;
      border-color: transparent;
    }
  }
`;

const emptyRecord = {};

const sanitizeRestProps = ({
    anyTouched,
    asyncValidate,
    asyncValidating,
    autofill,
    blur,
    change,
    clearAsyncError,
    clearFields,
    clearSubmit,
    clearSubmitErrors,
    destroy,
    dirty,
    dispatch,
    displayedFilters,
    filterValues,
    handleSubmit,
    hideFilter,
    initialize,
    initialized,
    initialValues,
    invalid,
    pristine,
    pure,
    reset,
    resetSection,
    save,
    setFilter,
    setFilters,
    submit,
    submitFailed,
    submitSucceeded,
    submitting,
    touch,
    translate,
    triggerSubmit,
    untouch,
    valid,
    validate,
    ...props
}) => props;

export class FilterForm extends Component {
    getShownFilters() {
        const { filters, displayedFilters, initialValues } = this.props;

        return filters.filter(
            filterElement =>
                filterElement.props.alwaysOn ||
                displayedFilters[filterElement.props.source] ||
                typeof initialValues[filterElement.props.source] !== 'undefined'
        );
    }

    handleHide = event =>
        this.props.hideFilter(event.currentTarget.dataset.key);

    render() {
        const {
            className,
            resource,
            translate,
            ...rest
        } = this.props;

        return (
          <Form inline className={classnames(className, 'justify-content-around justify-content-sm-end align-items-md-center')} {...sanitizeRestProps(rest)}>
            {this.getShownFilters()
                .reverse()
                .map(filterElement => (
                    <div
                        key={filterElement.props.source}
                        data-source={filterElement.props.source}
                        className="filter-field mx-2 align-items-end my-3"
                    >
                        <div>
                            <Field
                              allowEmpty
                              {...filterElement.props}
                              name={filterElement.props.source}
                              component={filterElement.type}
                              resource={resource}
                              record={emptyRecord}
                            />
                        </div>
                        {!filterElement.props.alwaysOn && (
                            <Button
                                className="hide-filter cursor-pointer"
                                color="danger"
                                size="sm"
                                outline
                                onClick={this.handleHide}
                                data-key={filterElement.props.source}
                                tooltip={translate(
                                    'ra.action.remove_filter'
                                )}
                            >
                                <Fa remove />
                            </Button>
                        )}
                    </div>
                ))}
            </Form>
        );
    }
}

FilterForm.propTypes = {
    resource: PropTypes.string.isRequired,
    filters: PropTypes.arrayOf(PropTypes.node).isRequired,
    displayedFilters: PropTypes.object.isRequired,
    hideFilter: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    translate: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export const mergeInitialValuesWithDefaultValues = ({
    initialValues,
    filters,
}) => ({
    initialValues: {
        ...filters
            .filter(
                filterElement =>
                    filterElement.props.alwaysOn &&
                    filterElement.props.defaultValue
            )
            .reduce(
                (acc, filterElement) =>
                    lodashSet(
                        { ...acc },
                        filterElement.props.source,
                        filterElement.props.defaultValue
                    ),
                {}
            ),
        ...initialValues,
    },
});

const enhance = compose(
    translate,
    withProps(mergeInitialValuesWithDefaultValues),
    reduxForm({
        form: 'filterForm',
        enableReinitialize: true,
        destroyOnUnmount: false, // do not destroy to preserve state across navigation
        onChange: (values, dispatch, props) =>
            props && props.setFilters(values),
    })
);

export default enhance(FilterForm);
