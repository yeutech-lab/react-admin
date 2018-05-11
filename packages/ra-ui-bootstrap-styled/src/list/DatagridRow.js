import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tr from 'bootstrap-styled/lib/Table/Tr';
import Td from 'bootstrap-styled/lib/Table/Td';
import Label from 'bootstrap-styled/lib/Label';
import FormCustom from 'bootstrap-styled/lib/Form/FormCustom';
import FormGroup from 'bootstrap-styled/lib/Form/FormGroup';
import Form from 'bootstrap-styled/lib/Form';
import classnames from 'classnames';

import DatagridCell from './DatagridCell';

const sanitizeRestProps = ({
    className,
    resource,
    children,
    id,
    isLoading,
    record,
    basePath,
    selected,
    styles,
    style,
    onToggleItem,
    ...rest
}) => rest;

class DatagridRow extends Component {
    handleToggle = () => {
        this.props.onToggleItem(this.props.id);
    };

    render() {
        const {
            basePath,
            children,
            className,
            hasBulkActions,
            hover,
            id,
            record,
            resource,
            selected,
            style,
            ...rest
        } = this.props;
        return (
            <Tr
                className={className}
                key={id}
                {...sanitizeRestProps(rest)}
            >
                {hasBulkActions && (
                    <Td className="m-0">
                        <Form>
                            <FormGroup check>
                                <Label check>
                                    <FormCustom
                                      className="select-item"
                                      checked={selected}
                                      onClick={this.handleToggle}
                                    />
                                </Label>
                            </FormGroup>
                        </Form>
                    </Td>
                )}
                {React.Children.map(
                    children,
                    (field, index) =>
                        field ? (
                            <DatagridCell
                                key={`${id}-${field.props.source || index}`}
                                className={classnames(
                                    `column-${field.props.source}`,
                                    'px-2'
                                )}
                                record={record}
                                id={id}
                                {...{ field, basePath, resource }}
                            />
                        ) : null
                )}
            </Tr>
        );
    }
}

DatagridRow.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    hasBulkActions: PropTypes.bool.isRequired,
    hover: PropTypes.bool,
    id: PropTypes.any,
    onToggleItem: PropTypes.func,
    record: PropTypes.object.isRequired,
    resource: PropTypes.string,
    selected: PropTypes.bool,
    style: PropTypes.object,
    styles: PropTypes.object,
};

DatagridRow.defaultProps = {
    hasBulkActions: false,
    hover: true,
    record: {},
    selected: false,
};

export default DatagridRow;
