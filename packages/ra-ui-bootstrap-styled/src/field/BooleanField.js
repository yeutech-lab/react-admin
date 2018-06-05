import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import pure from 'recompose/pure';

import Fa from 'bootstrap-styled/lib/Fa';
import sanitizeRestProps from './sanitizeRestProps';

export const BooleanField = ({ className, source, record = {}, ...rest }) => {
    if (get(record, source) === false) {
			return <Fa close className={className} {...sanitizeRestProps(rest)} />;
    }

    if (get(record, source) === true) {
			return <Fa check className={className} {...sanitizeRestProps(rest)} />;
    }

    return <span className={className} {...sanitizeRestProps(rest)} />;
};

BooleanField.propTypes = {
    addLabel: PropTypes.bool,
    basePath: PropTypes.string,
    className: PropTypes.string,
    cellClassName: PropTypes.string,
    headerClassName: PropTypes.string,
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

const PureBooleanField = pure(BooleanField);

PureBooleanField.defaultProps = {
    addLabel: true,
};

export default PureBooleanField;
