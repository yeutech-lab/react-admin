import React from 'react';
import Badge from 'bootstrap-styled/lib/Badge';
import { translate } from '@yeutech/react-admin-bs';
import segments from '../segments/data';

const SegmentsField = ({ record, translate }) => (
    <span className="d-flex flex-wrap justify-content-around">
        {record.groups &&
            record.groups.map(segment => (
                <Badge key={segment} className="my-1 p-" color={(`${segment}` === 'regular') && 'success' ||  (`${segment}` === 'returns') && 'danger' || (`${segment}` === 'collector') && 'info' || (`${segment}` === 'compulsive') && 'warning' || 'default'}>
                    {translate(segments.find(s => s.id === segment).name)}
                </Badge>
            ))}
    </span>
);

const TranslatedSegmentsField = translate(SegmentsField);

TranslatedSegmentsField.defaultProps = {
    addLabel: true,
    source: 'groups',
};

export default TranslatedSegmentsField;
