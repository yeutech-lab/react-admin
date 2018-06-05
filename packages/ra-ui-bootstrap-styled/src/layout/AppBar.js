import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import MuiAppBar from 'material-ui/AppBar';
import H2 from 'bootstrap-styled/lib/H2';
import Header from 'bootstrap-styled/lib/Header';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from 'material-ui/styles';
import compose from 'recompose/compose';
import { toggleSidebar as toggleSidebarAction } from '@yeutech/ra-core';

import LoadingIndicator from './LoadingIndicator';

const styles = theme => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        zIndex: 1300,
        color: 'white',
    },
    toolbar: {
        paddingRight: 24,
    },
    menuButton: {
        marginLeft: '0.5em',
        marginRight: '0.5em',
    },
    menuButtonIconClosed: {
        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        transform: 'rotate(0deg)',
    },
    menuButtonIconOpen: {
        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        transform: 'rotate(180deg)',
    },
    title: {
        flex: 1,
    },
    loadingIndicator: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1200,
        marginBottom: 16,
        marginTop: 16,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    logout: {
        color: theme.palette.secondary.contrastText,
    },
});

const AppBar = ({
    classes,
    className,
    logout,
    open,
    title,
    toggleSidebar,
    ...rest
}) => (
    <Header
        className={classnames(classes.appBar, className, 'bg-info')}
        {...rest}
    >
        <div className="d-flex align-items-center py-2 pr-4 pl-3">
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleSidebar}
            >
                <MenuIcon
                    classes={{
                        root: open
                            ? classes.menuButtonIconOpen
                            : classes.menuButtonIconClosed,
                    }}
                />
            </IconButton>
            <H2 className={classnames(classes.title, 'my-0')}>
                {typeof title === 'string' ? title : React.cloneElement(title)}
            </H2>
            {logout &&
                cloneElement(logout, {
                    className: classes.logout,
                })}
        </div>
        <LoadingIndicator className={classes.loadingIndicator} />
    </Header>
);

AppBar.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    logout: PropTypes.element,
    open: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
    toggleSidebar: PropTypes.func.isRequired,
};

const enhance = compose(
    connect(null, {
        toggleSidebar: toggleSidebarAction,
    }),
    withStyles(styles)
);

export default enhance(AppBar);
