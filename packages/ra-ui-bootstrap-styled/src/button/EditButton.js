import React from 'react';
import PropTypes from 'prop-types';
import shouldUpdate from 'recompose/shouldUpdate';
import Fa from 'bootstrap-styled/lib/Fa';

import Link from '../Link';
import { linkToRecord } from '@yeutech/ra-core';
import Button from './Button';

const EditButton = ({
    basePath = '',
    label = 'ra.action.edit',
    record = {},
    ...rest
}) => (
    <Button
        tag={Link}
        to={linkToRecord(basePath, record.id)}
        label={label}
        {...rest}
    >
        <Fa pencil />
    </Button>
);

EditButton.propTypes = {
    basePath: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string,
    record: PropTypes.object,
};

const enhance = shouldUpdate(
    (props, nextProps) =>
        props.translate !== nextProps.translate ||
        (props.record &&
            nextProps.record &&
            props.record.id !== nextProps.record.id) ||
        props.basePath !== nextProps.basePath ||
        (props.record == null && nextProps.record != null)
);

export default enhance(EditButton);
