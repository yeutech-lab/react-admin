import React from 'react';
import PropTypes from 'prop-types';
import shouldUpdate from 'recompose/shouldUpdate';
import Tbody from 'bootstrap-styled/lib/Table/Tbody';
import classnames from 'classnames';

import DatagridRow from './DatagridRow';

const DatagridBody = ({
    basePath,
    className,
    resource,
    children,
    hasBulkActions,
    hover,
    ids,
    isLoading,
    data,
    selectedIds,
    styles,
    rowClassName,
    onToggleItem,
    version,
    ...rest
}) => (
    <Tbody className={classnames('datagrid-body', className)} {...rest}>
        {ids.map((id, rowIndex) => (
            <DatagridRow
                basePath={basePath}
                // AJT TODO: check how mateiralUI uses rowEven and odds with modulo
                className={className}
                hasBulkActions={hasBulkActions}
                id={id}
                key={id}
                onToggleItem={onToggleItem}
                record={data[id]}
                resource={resource}
                selected={selectedIds.includes(id)}
                hover={hover}
                rowClassName={rowClassName ? rowClassName(data[id]) : null}
            >
                {children}
            </DatagridRow>
        ))}
    </Tbody>
);

DatagridBody.propTypes = {
    basePath: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    data: PropTypes.object.isRequired,
    hasBulkActions: PropTypes.bool.isRequired,
    hover: PropTypes.bool,
    ids: PropTypes.arrayOf(PropTypes.any).isRequired,
    isLoading: PropTypes.bool,
    onToggleItem: PropTypes.func,
    resource: PropTypes.string,
	  rowClassName: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
    styles: PropTypes.object,
    version: PropTypes.number,
};

DatagridBody.defaultProps = {
    data: {},
    hasBulkActions: false,
    ids: [],
};

const PureDatagridBody = shouldUpdate(
    (props, nextProps) =>
        props.version !== nextProps.version || nextProps.isLoading === false
)(DatagridBody);

// trick material-ui Table into thinking this is one of the child type it supports
PureDatagridBody.muiName = 'TableBody';

export default PureDatagridBody;
