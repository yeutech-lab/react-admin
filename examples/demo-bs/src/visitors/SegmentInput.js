import React from 'react';
import { translate } from '@yeutech/react-admin-bs';
import { SelectInput } from '@yeutech/ra-ui-bootstrap-styled';

import compose from 'recompose/compose';

import segments from '../segments/data';

const SegmentInput = ({ classes, translate, ...rest }) => (
    <SelectInput
        {...rest}
        choices={segments.map(segment => ({
            id: segment.id,
            name: translate(segment.name),
        }))}
    />
);

const TranslatedSegmentInput = compose(translate)(
    SegmentInput
);

TranslatedSegmentInput.defaultProps = {
    addLabel: true,
    source: 'groups',
};

export default TranslatedSegmentInput;
