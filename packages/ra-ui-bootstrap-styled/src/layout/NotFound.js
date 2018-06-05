import React from 'react';
import PropTypes from 'prop-types';
import Button from 'bootstrap-styled/lib/Button';
import classnames from 'classnames';

import AppBarMobile from './AppBarMobile';
import { translate } from '@yeutech/ra-core';

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
