import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import Fa from 'bootstrap-styled/lib/Fa';
import ButtonDropdown from 'bootstrap-styled/lib/Button/ButtonDropdown';
import DropdownToggle from 'bootstrap-styled/lib/Dropdown/DropdownToggle';
import DropdownMenu from 'bootstrap-styled/lib/Dropdown/DropdownMenu';
import classnames from 'classnames';
import compose from 'recompose/compose';
import { translate } from '@yeutech/ra-core';

import FilterButtonMenuItem from './FilterButtonMenuItem';

export class FilterButton extends Component {
    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.state = {
					isOpen: false,
        };
        this.handleClickButton = this.handleClickButton.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    getHiddenFilters() {
        const { filters, displayedFilters, filterValues } = this.props;
        return filters.filter(
            filterElement =>
                !filterElement.props.alwaysOn &&
                !displayedFilters[filterElement.props.source] &&
                !filterValues[filterElement.props.source]
        );
    }

    handleClickButton() {
        this.setState({
					isOpen: !this.state.isOpen
        });
    }

    handleShow({ source, defaultValue }) {
        this.props.showFilter(source, defaultValue);
        this.setState({
					isOpen: false,
        });
    }

    render() {
        const hiddenFilters = this.getHiddenFilters();
        const {
            className,
            resource,
            showFilter,
            displayedFilters,
            filterValues,
            translate,
            ...rest
        } = this.props;
        const { isOpen } = this.state;

        return (
            hiddenFilters.length > 0 && (
                <ButtonDropdown
                    className={classnames('d-inline-block', className)}
                    isOpen={isOpen}
                    toggle={this.handleClickButton}
                    {...rest}
                >
                    <DropdownToggle
                        className="add-filter h-100 cursor-pointer"
                    >
                        <Fa search />
                    </DropdownToggle>
                    <DropdownMenu right>
                        {hiddenFilters.map(filterElement => (
                            <FilterButtonMenuItem
                                key={filterElement.props.source}
                                filter={filterElement.props}
                                resource={resource}
                                onShow={this.handleShow}
                            />
                        ))}
                    </DropdownMenu>
                </ButtonDropdown>
            )
        );
    }
}

FilterButton.propTypes = {
    resource: PropTypes.string.isRequired,
    filters: PropTypes.arrayOf(PropTypes.node).isRequired,
    displayedFilters: PropTypes.object.isRequired,
    filterValues: PropTypes.object.isRequired,
    showFilter: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default compose(translate)(FilterButton);
