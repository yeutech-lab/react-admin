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
            <P lead>
                {translate('pos.dashboard.welcome.subtitle')}
            </P>
        </CardBlock>
        <CardBlock className="d-flex justify-content-end">
            <Button outline href="https://marmelab.com/react-admin" className="mr-2">
                <Fa home style={{ paddingRight: '0.5em' }} />
                {translate('pos.dashboard.welcome.aor_button')}
            </Button>
            <Button outline href="https://github.com/yeutech/react-admin">
                <Fa code style={{ paddingRight: '0.5em' }} />
                {translate('pos.dashboard.welcome.demo_button')}
            </Button>
        </CardBlock>
    </Card>
));
