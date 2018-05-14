import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from 'bootstrap-styled/lib/Alert';
import { withStyles } from 'material-ui/styles';
import compose from 'recompose/compose';
import classnames from 'classnames';

import {
    hideNotification,
    getNotification,
    translate,
    undo,
    complete,
} from '@yeutech/ra-core';

const styles = theme => ({
    confirm: {
        backgroundColor: theme.palette.background.default,
    },
    warning: {
        backgroundColor: theme.palette.error.light,
    },
    undo: {
        color: theme.palette.primary.light,
    },
});

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
            classes,
            className,
            type,
            translate,
            notification,
            autoHideDuration,
            hideNotification,
            ...rest
        } = this.props;
console.log("NOTIVVVV'")
        return (
            <Alert
                className={className}
                isOpen={this.state.open}
                autoHideDuration={
                    (notification && notification.autoHideDuration) ||
                    autoHideDuration
                }
                onExited={this.handleExited}
                onClick={this.handleRequestClose}
                color={type}
                {...rest}
            >
                {notification && notification.message && translate(notification.message, notification.messageArgs)}
            </Alert>
        );
    }
}

Notification.propTypes = {
    complete: PropTypes.func,
    classes: PropTypes.object,
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
    withStyles(styles),
    connect(mapStateToProps, {
        complete,
        hideNotification,
        undo,
    })
)(Notification);
