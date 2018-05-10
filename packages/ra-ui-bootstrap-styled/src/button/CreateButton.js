import React from 'react';
import PropTypes from 'prop-types';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import ButtonBs from 'bootstrap-styled/lib/Button';
import Fa from 'bootstrap-styled/lib/Fa';
import compose from 'recompose/compose';
import classnames from 'classnames';

import Responsive from '../layout/Responsive';
import Link from '../Link';
import { translate } from '@yeutech/ra-core';

const CreateButton = ({
    basePath = '',
    className,
    classes = {},
    translate,
    label = 'ra.action.create',
    ...rest
}) => (
    <Responsive
        small={
            <ButtonBs
                tag={Link}
                color="primary"
                className={classnames('m-0', className)}
                to={`${basePath}/create`}
                {...rest}
            >
                <Fa plus />
            </ButtonBs>
        }
        medium={
            <ButtonBs
                tag={Link}
                color="primary"
                to={`${basePath}/create`}
                className={classnames('d-inline-flex align-items-center', className)}
                {...rest}
            >
                <Fa plus />
                {label && translate(label)}
            </ButtonBs>
        }
    />
);

CreateButton.propTypes = {
    basePath: PropTypes.string,
    className: PropTypes.string,
    classes: PropTypes.object,
    label: PropTypes.string,
    translate: PropTypes.func.isRequired,
};

const enhance = compose(
    translate,
    onlyUpdateForKeys(['basePath', 'label']),
);

export default enhance(CreateButton);
