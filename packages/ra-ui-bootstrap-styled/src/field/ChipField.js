import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import pure from 'recompose/pure';
import Badge from 'bootstrap-styled/lib/Badge';
import classnames from 'classnames';
import sanitizeRestProps from './sanitizeRestProps';

export const ChipField = ({
    className,
    source,
    record = {},
    ...rest
}) => {
    return (
        <Badge
          className={classnames('m-1', className)}
            label={get(record, source)}
            {...sanitizeRestProps(rest)}
        />
    );
};

ChipField.propTypes = {
    className: PropTypes.string,
    elStyle: PropTypes.object,
    source: PropTypes.string.isRequired,
    record: PropTypes.object,
};

const PureChipField = pure(ChipField);

export default PureChipField;
