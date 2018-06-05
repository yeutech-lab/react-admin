import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Fa from 'bootstrap-styled/lib/Fa';
import ButtonBs from 'bootstrap-styled/lib/Button';
import { CircularProgress } from 'material-ui/Progress';
import classnames from 'classnames';

import { showNotification, translate } from '@yeutech/ra-core';

const sanitizeRestProps = ({
    className,
    saving,
    label,
    invalid,
    translate,
    handleSubmitWithRedirect,
    submitOnEnter,
    redirect,
    locale,
    showNotification,
    ...rest
}) => rest;

export class SaveButton extends Component {
    handleClick = e => {
        const {
            handleSubmitWithRedirect,
            invalid,
            redirect,
            saving,
            showNotification,
        } = this.props;

        if (saving) {
            // prevent double submission
            e.preventDefault();
        } else {
            if (invalid) {
                showNotification('ra.message.invalid_form', 'warning');
            }
            // always submit form explicitly regardless of button type
            if (e) {
                e.preventDefault();
            }
            handleSubmitWithRedirect(redirect)();
        }
    };

    render() {
        const {
            className,
            invalid,
            label = 'ra.action.save',
            pristine,
            redirect,
            saving,
            submitOnEnter,
            translate,
            ...rest
        } = this.props;

        const type = submitOnEnter ? 'submit' : 'button';
        return (
            <ButtonBs
                className={classnames(className, 'cursor-pointer')}
                type={type}
                onClick={this.handleClick}
                color={saving ? 'default' : 'primary'}
                {...sanitizeRestProps(rest)}
            >
                {saving && saving.redirect === redirect ? (
                    <CircularProgress
                        size={25}
                        thickness={2}
                        className={classes.iconPaddingStyle}
                    />
                ) : (
                    <Fa save className="pr-2" />
                )}
                {label && translate(label, { _: label })}
            </ButtonBs>
        );
    }
}

SaveButton.propTypes = {
    className: PropTypes.string,
    handleSubmitWithRedirect: PropTypes.func,
    invalid: PropTypes.bool,
    label: PropTypes.string,
    pristine: PropTypes.bool,
    redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    saving: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    showNotification: PropTypes.func,
    submitOnEnter: PropTypes.bool,
    translate: PropTypes.func.isRequired,
};

SaveButton.defaultProps = {
    handleSubmitWithRedirect: () => () => {},
};

const mapStateToProps = state => ({
    saving: state.admin.saving,
});

const enhance = compose(
    translate,
    connect(mapStateToProps, { showNotification }),
);

export default enhance(SaveButton);
