import React from 'react';
import PropTypes from 'prop-types';
import Button from 'bootstrap-styled/lib/Button';
import compose from 'recompose/compose';
import classnames from 'classnames';

import AppBarMobile from './AppBarMobile';
import { translate } from '@yeutech/ra-core';

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        [theme.breakpoints.up('md')]: {
            height: '100%',
        },
        [theme.breakpoints.down('sm')]: {
            height: '100vh',
            marginTop: '-3em',
        },
    },

    toolbar: {
        textAlign: 'center',
        marginTop: '2em',
    },
});

function goBack() {
    history.go(-1);
}

const NotFound = ({ classes, className, translate, title, ...rest }) => (
    <div className={classnames(className, 'd-flex  flex-column justify-content-center')} {...rest}>
        <AppBarMobile title={title} className="d-md-none" />
        <div className="text-center mx-2">
            <h1>{translate('ra.page.not_found')}</h1>
            <div>{translate('ra.message.not_found')}.</div>
        </div>
        <div className="text-center mt-4">
            <Button onClick={goBack}>
                {translate('ra.action.back')}
            </Button>
        </div>
    </div>
);

NotFound.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    translate: PropTypes.func.isRequired,
};

export default translate(NotFound);
