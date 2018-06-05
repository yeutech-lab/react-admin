import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import AlertBs from 'bootstrap-styled/lib/Alert';
import compose from 'recompose/compose';
import classnames from 'classnames';

import {
    hideNotification,
    getNotification,
    translate,
    undo,
    complete,
} from '@yeutech/ra-core';

const Alert = styled(AlertBs)`
  &.alert {
    position: fixed;
    bottom: 0;
    left: 35%;
    right: 35%;
  }
  &.alert .close {
    color: inherit;
    float: left;
    text-shadow: 0 0 0 #fff;
    opacity: 1;
    margin-right: 1rem;
    margin-top: 0;
  }
`;

class Notification extends React.Component {
    state = {
        open: false,
    };
    componentWillMount = () => {
        this.setOpenState(this.props);
    };
    componentWillReceiveProps = nextProps => {
        this.setOpenState(nextProps);
    };

    setOpenState = ({ notification }) => {
        this.setState({
            open: !!notification,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    handleExited = () => {
        const { notification, hideNotification, complete } = this.props;
        if (notification && notification.undoable) {
            complete();
        }
        hideNotification();
    };

    render() {
        const {
            undo,
            complete,
            className,
            type,
            translate,
            notification,
            autoHideDuration,
            hideNotification,
            ...rest
        } = this.props;

        return (
            <Alert
                className={classnames(className, 'mb-0 rounded-0')}
                isOpen={this.state.open}
                autoHideDuration={
                    (notification && notification.autoHideDuration) ||
                    autoHideDuration
                }
                onExited={this.handleExited}
                onClick={this.handleRequestClose}
                color={type}
                cssModule={{ 'alert-dismissible': 'notification' }}
                {...rest}
            >
                {notification && notification.message && translate(notification.message, notification.messageArgs)}
            </Alert>
        );
    }
}

Notification.propTypes = {
    complete: PropTypes.func,
    className: PropTypes.string,
    notification: PropTypes.shape({
        message: PropTypes.string,
        type: PropTypes.string,
        autoHideDuration: PropTypes.number,
        messageArgs: PropTypes.object,
    }),
    type: PropTypes.string,
    hideNotification: PropTypes.func.isRequired,
    autoHideDuration: PropTypes.number,
    translate: PropTypes.func.isRequired,
    undo: PropTypes.func,
};

Notification.defaultProps = {
    type: 'info',
    autoHideDuration: 4000,
};

const mapStateToProps = state => ({
    notification: getNotification(state),
});

export default compose(
    translate,
    connect(mapStateToProps, {
        complete,
        hideNotification,
        undo,
    })
)(Notification);
