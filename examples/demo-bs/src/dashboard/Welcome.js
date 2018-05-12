import React from 'react';
import Card from 'bootstrap-styled/lib/Cards/Card';
import CardBlock from 'bootstrap-styled/lib/Cards/CardBlock';
import Button from 'bootstrap-styled/lib/Button';
import Fa from 'bootstrap-styled/lib/Fa';
import H2 from 'bootstrap-styled/lib/H2';
import P from 'bootstrap-styled/lib/P';

import { translate } from '@yeutech/react-admin-bs';

export default translate(({ translate }) => (
    <Card>
        <CardBlock>
            <H2>
                {translate('pos.dashboard.welcome.title')}
            </H2>
            <P>
                {translate('pos.dashboard.welcome.subtitle')}
            </P>
        </CardBlock>
        <CardBlock className="d-flex justify-content-end">
            <Button color="info" href="https://marmelab.com/react-admin" className="mr-2" style={{ textDecoration: 'none' }}>
                <Fa home className="pr-2" />
                {translate('pos.dashboard.welcome.aor_button')}
            </Button>
            <Button color="success" href="https://github.com/yeutech/react-admin" style={{ textDecoration: 'none' }}>
                <Fa code className="pr-2" />
                {translate('pos.dashboard.welcome.demo_button')}
            </Button>
        </CardBlock>
    </Card>
));
