import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import shouldUpdate from 'recompose/shouldUpdate';
import compose from 'recompose/compose';
import Th from 'bootstrap-styled/lib/Table/Th';
import Button from 'bootstrap-styled/lib/Button';
import Fa from 'bootstrap-styled/lib/Fa';
import Tooltip from 'material-ui/Tooltip';
import { FieldTitle, translate } from '@yeutech/ra-core';

export const DatagridHeaderCell = ({
    className,
    field,
    currentSort,
    updateSort,
    resource,
    isSorting,
    translate,
    ...rest
}) => (
    <Th
        className={classnames(className, 'p-0', field.props.headerClassName)}
        {...rest}
    >
        {field.props.sortable !== false && field.props.source ? (
            <Tooltip
                title={translate('ra.action.sort')}
                placement={
                    field.props.textAlign === 'right'
                        ? 'bottom-end'
                        : 'bottom-start'
                }
                enterDelay={300}
            >
                <Button
                  tag='span'
                  outline
                  color="secondary"
                  className="border-0"
                  active={field.props.source === currentSort.field}
                  onClick={updateSort}
                  data-sort={field.props.source}
                >
                    <FieldTitle
                        label={field.props.label}
                        source={field.props.source}
                        resource={resource}
                    />
									{field.props.source === currentSort.field ? (
										currentSort.order === 'ASC' ? (
                      <Fa long-arrow-up className="ml-2" />
										) : (
                      <Fa long-arrow-down className="ml-2" />
										)
									) : (
										false
									)}
                </Button>
            </Tooltip>
        ) : (
            <FieldTitle
                label={field.props.label}
                source={field.props.source}
                resource={resource}
            />
        )}
    </Th>
);

DatagridHeaderCell.propTypes = {
    className: PropTypes.string,
    field: PropTypes.element,
    currentSort: PropTypes.shape({
        sort: PropTypes.string,
        order: PropTypes.string,
    }),
    isSorting: PropTypes.bool,
    sortable: PropTypes.bool,
    resource: PropTypes.string,
    translate: PropTypes.func.isRequired,
    updateSort: PropTypes.func.isRequired,
};

const enhance = compose(
    shouldUpdate(
        (props, nextProps) =>
            props.isSorting !== nextProps.isSorting ||
            (nextProps.isSorting &&
                props.currentSort.order !== nextProps.currentSort.order)
    ),
    translate
);

export default enhance(DatagridHeaderCell);
