import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from 'bootstrap-styled/lib/Table';
import Thead from 'bootstrap-styled/lib/Table/Thead';
import Tr from 'bootstrap-styled/lib/Table/Tr';
import Th from 'bootstrap-styled/lib/Table/Th';
import FormGroup from 'bootstrap-styled/lib/Form/FormGroup';
import FormCustom from 'bootstrap-styled/lib/Form/FormCustom';
import Form from 'bootstrap-styled/lib/Form';

import classnames from 'classnames';

import DatagridHeaderCell from './DatagridHeaderCell';
import DatagridBody from './DatagridBody';


/**
 * The Datagrid component renders a list of records as a table.
 * It is usually used as a child of the <List> and <ReferenceManyField> components.
 *
 * Props:
 *  - styles
 *  - rowStyle
 *  - options (passed as props to <Table>)
 *  - headerOptions (passed as props to mui <TableHead>)
 *  - bodyOptions (passed as props to mui <TableBody>)
 *  - rowOptions (passed as props to mui <TableRow>)
 *
 * @example Display all posts as a datagrid
 * const postRowStyle = (record, index) => ({
 *     backgroundColor: record.nb_views >= 500 ? '#efe' : 'white',
 * });
 * export const PostList = (props) => (
 *     <List {...props}>
 *         <Datagrid rowStyle={postRowStyle}>
 *             <TextField source="id" />
 *             <TextField source="title" />
 *             <TextField source="body" />
 *             <EditButton />
 *         </Datagrid>
 *     </List>
 * );
 *
 * @example Display all the comments of the current post as a datagrid
 * <ReferenceManyField reference="comments" target="post_id">
 *     <Datagrid>
 *         <TextField source="id" />
 *         <TextField source="body" />
 *         <DateField source="created_at" />
 *         <EditButton />
 *     </Datagrid>
 * </ReferenceManyField>
 */
class Datagrid extends Component {
    updateSort = event => {
        event.stopPropagation();
        this.props.setSort(event.currentTarget.dataset.sort);
    };

    handleSelectAll = event => {
        const { onSelect, ids, selectedIds } = this.props;
        if (event.target.checked) {
            onSelect(selectedIds.concat(ids));
        } else {
            onSelect([]);
        }
    };

    render() {
        const {
            basePath,
            data,
            children,
            className,
            currentSort,
            hasBulkActions,
            hover,
            ids,
            isLoading,
            resource,
            rowStyle,
            selectedIds,
            setSort,
            onSelect,
            onToggleItem,
            version,
            ...rest
        } = this.props;

        return (
            <Table className={classnames(className, 'mb-0')} style={{ tableLayout: 'fixed' }} {...rest}>
                <Thead inverse>
                    <Tr>
                        {hasBulkActions && (
                            <Th className="py-0">
                                <Form>
                                    <FormGroup className="mb-0">
                                        <FormCustom
                                            className="select-all cursor-pointer"
                                            checked={
                                                selectedIds.length > 0 &&
                                                ids.length > 0 &&
                                                !ids.find(
                                                it => selectedIds.indexOf(it) === -1
                                                )
                                            }
                                            onChange={this.handleSelectAll}
                                        />
                                    </FormGroup>
                                </Form>
                            </Th>
                        )}
                        {React.Children.map(
                            children,
                            (field, index) =>
                                field ? (
                                    <DatagridHeaderCell
                                        className="p-0"
                                        currentSort={currentSort}
                                        field={field}
                                        isSorting={
                                        field.props.source ===
                                        currentSort.field
                                        }
                                        key={field.props.source || index}
                                        resource={resource}
                                        updateSort={this.updateSort}
                                    />
                                ) : null
                        )}
                    </Tr>
                </Thead>
                <DatagridBody
                    basePath={basePath}
                    data={data}
                    hasBulkActions={hasBulkActions}
                    hover={hover}
                    ids={ids}
                    isLoading={isLoading}
                    onToggleItem={onToggleItem}
                    resource={resource}
                    rowStyle={rowStyle}
                    selectedIds={selectedIds}
                    version={version}
                >
                    {children}
                </DatagridBody>
            </Table>
        );
    }
}

Datagrid.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    currentSort: PropTypes.shape({
        sort: PropTypes.string,
        order: PropTypes.string,
    }),
    data: PropTypes.object.isRequired,
    hasBulkActions: PropTypes.bool.isRequired,
    hover: PropTypes.bool,
    ids: PropTypes.arrayOf(PropTypes.any).isRequired,
    isLoading: PropTypes.bool,
    onSelect: PropTypes.func,
    onToggleItem: PropTypes.func,
    resource: PropTypes.string,
    rowStyle: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
    setSort: PropTypes.func,
    version: PropTypes.number,
};

Datagrid.defaultProps = {
    data: {},
    hasBulkActions: false,
    ids: [],
    selectedIds: [],
};

export default Datagrid;
