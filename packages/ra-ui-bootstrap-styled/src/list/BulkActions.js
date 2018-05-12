import React, { cloneElement, Children, Component } from 'react';
import PropTypes from 'prop-types';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import ButtonDropdown from 'bootstrap-styled/lib/Button/ButtonDropdown';
import DropdownToggle from 'bootstrap-styled/lib/Dropdown/DropdownToggle';
import DropdownMenu from 'bootstrap-styled/lib/Dropdown/DropdownMenu';
import DropdownItem from 'bootstrap-styled/lib/Dropdown/DropdownItem';
import { withStyles } from 'material-ui/styles';
import compose from 'recompose/compose';
import classnames from 'classnames';
import { translate } from '@yeutech/ra-core';

import BulkDeleteAction from './BulkDeleteAction';

const styles = theme => ({
    bulkActionsButton: {
        transition: theme.transitions.create('opacity', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    icon: {
        marginRight: theme.spacing.unit,
    },
    unselected: {
        opacity: 0,
    },
    selected: {
        opacity: 1,
    },
});

const sanitizeRestProps = ({
    basePath,
    classes,
    filterValues,
    resource,
    onUnselectItems,
    ...rest
}) => rest;

class BulkActions extends Component {
    state = {
        isOpen: false,
        activeAction: null,
    };

    storeButtonRef = node => {
        this.anchorElement = node;
    };

    handleClick = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    handleLaunchAction = action => {
        this.setState({ activeAction: action, isOpen: false });
    };

    handleExitAction = () => {
        this.setState({ activeAction: null });
    };

    render() {
        const {
            basePath,
            classes,
            children,
            className,
            filterValues,
            label,
            resource,
            selectedIds,
            translate,
            ...rest
        } = this.props;
        const { isOpen } = this.state;

        return (
            <ButtonDropdown
                className={classnames(
                    'bulk-actions-button',
                    className,
                    classes.bulkActionsButton,
                    {
                        [classes.selected]: selectedIds.length > 0,
                        [classes.unselected]: selectedIds.length === 0,
                    }
                )}
                aria-owns={isOpen ? 'bulk-actions-menu' : null}
                aria-haspopup="true"
                isOpen={isOpen}
                toggle={this.handleClick}
                color="info"
                {...sanitizeRestProps(rest)}
            >
                <DropdownToggle
                    className="h-100 cursor-pointer"
                >
                    <FilterNoneIcon className={classes.icon} />
                    {translate(label, {
                        _: label,
                        smart_count: selectedIds.length,
                    })}
                </DropdownToggle>
                <DropdownMenu right>
                    {Children.map(children, (child, index) => (
                        <DropdownItem
                            key={index}
                            className={classnames(
                                'bulk-actions-menu-item',
                                child.props.className
                            )}
                            onClick={() => this.handleLaunchAction(index)}
                            {...sanitizeRestProps(rest)}
                        >
                            {translate(child.props.label)}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
                {Children.map(
                    children,
                    (child, index) =>
                        this.state.activeAction === index &&
                        cloneElement(child, {
                            basePath,
                            filterValues,
                            onExit: this.handleExitAction,
                            resource,
                            selectedIds,
                        })
                )}
            </ButtonDropdown>
        );
    }
}

BulkActions.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
    filterValues: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    label: PropTypes.string,
    resource: PropTypes.string,
    selectedIds: PropTypes.arrayOf(PropTypes.any),
    translate: PropTypes.func.isRequired,
};

BulkActions.defaultProps = {
    children: <BulkDeleteAction />,
    label: 'ra.action.bulk_actions',
    selectedIds: [],
};

const EnhancedButton = compose(withStyles(styles), translate)(BulkActions);

export default EnhancedButton;
