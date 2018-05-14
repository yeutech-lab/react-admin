import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tr from 'bootstrap-styled/lib/Table/Tr';
import Td from 'bootstrap-styled/lib/Table/Td';
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
														 rowClassName,
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
			rowClassName,
			...rest
		} = this.props;

		return (
      <Tr
        color={classnames(className, rowClassName)}
        key={id}
				{...sanitizeRestProps(rest)}
      >
				{hasBulkActions && (
          <Td style={{ verticalAlign: 'middle'}}>
              <Form>
								<FormGroup className="mb-0">
                      <FormCustom
                        className="select-item cursor-pointer"
                        checked={selected}
                        onClick={this.handleToggle}
                      />
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
