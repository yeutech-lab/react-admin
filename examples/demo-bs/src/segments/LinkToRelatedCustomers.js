import React from 'react';
import compose from 'recompose/compose';
import Button from 'bootstrap-styled/lib/Button';
import { Link } from '@yeutech/react-admin-bs';
import { translate } from '@yeutech/react-admin-bs';
import { stringify } from 'query-string';

import { VisitorIcon } from '../visitors';


const LinkToRelatedCustomers = ({ classes, segment, translate }) => (
    <Button
        color="primary"
        tag={Link}
        size="sm"
        to={{
            pathname: '/customers',
            search: stringify({
                page: 1,
                perPage: 25,
                filter: JSON.stringify({ groups: segment }),
            }),
        }}
        className='d-inline-flex align-items-center'
    >
        <VisitorIcon className="pr-2" />
        {translate('resources.segments.fields.customers')}
    </Button>
);

const enhance = compose(translate);
export default enhance(LinkToRelatedCustomers);
