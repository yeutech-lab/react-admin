import React, { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import ListGroupItem from 'bootstrap-styled/lib/ListGroup/ListGroupItem';

const Opacity = styled.div `
    transition: opacity .15s ease-in-out;
`;

const styles = theme => ({
    root: {
        color: theme.palette.text.secondary,
        display: 'flex',
        alignItems: 'flex-start',
    },
    active: {
        color: theme.palette.text.primary,
    },
    icon: { paddingRight: '1.2em' },
});

export class MenuItemLink extends Component {
    static propTypes = {
        className: PropTypes.string,
        leftIcon: PropTypes.node,
        onClick: PropTypes.func,
        primaryText: PropTypes.string,
        staticContext: PropTypes.object,
			  sidebarOpen: PropTypes.bool,
        to: PropTypes.string.isRequired,
    };

    handleMenuTap = () => {
        this.props.onClick && this.props.onClick();
    };

    render() {
        const {
            className,
            primaryText,
            leftIcon,
            staticContext,
					  sidebarOpen,
            ...props
        } = this.props;
        return (
            <ListGroupItem
                className={classnames(className, 'border-0 rounded-0 d-flex flex-start')}
                style={{ textDecoration: 'none', transition: 'all .5s ease-in-out' }}
                action
                tag={NavLink}
                {...props}
                onClick={this.handleMenuTap}
            >
                {leftIcon && (
                    <span className="pr-3 d-flex">
                        {cloneElement(leftIcon, { titleAccess: primaryText })}
                    </span>
                )}
                <div className={!sidebarOpen ? 'd-none' : null}>{primaryText}</div>
            </ListGroupItem>
        );
    }
}


const mapStateToProps = state => ({
	sidebarOpen: state.admin.ui.sidebarOpen,
});

export default connect(mapStateToProps)(MenuItemLink);
