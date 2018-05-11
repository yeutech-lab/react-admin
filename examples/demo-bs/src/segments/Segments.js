import React from 'react';
import Table from 'bootstrap-styled/lib/Table';
import Tbody from 'bootstrap-styled/lib/Table/Tbody';
import Thead from 'bootstrap-styled/lib/Table/Thead';
import Tr from 'bootstrap-styled/lib/Table/Tr';
import Td from 'bootstrap-styled/lib/Table/Td';
import Th from 'bootstrap-styled/lib/Table/Th';
import Card from 'bootstrap-styled/lib/Cards/Card';
import CardBlock from 'bootstrap-styled/lib/Cards/CardBlock';

import { translate, ViewTitle } from '@yeutech/react-admin-bs';

import LinkToRelatedCustomers from './LinkToRelatedCustomers';
import segments from './data';

export default translate(({ translate }) => (
    <Card>
        <CardBlock>
            <ViewTitle title={translate('resources.segments.name')} />
        </CardBlock>
        <Table className="mb-0">
            <Thead>
                <Tr>
                    <Th>
                        {translate('resources.segments.fields.name')}
                    </Th>
                    <Th />
                </Tr>
            </Thead>
            <Tbody>
                {segments.map(segment => (
                    <Tr key={segment.id}>
                        <Td>{translate(segment.name)}</Td>
                        <Td>
                            <LinkToRelatedCustomers segment={segment.id} />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    </Card>
));
