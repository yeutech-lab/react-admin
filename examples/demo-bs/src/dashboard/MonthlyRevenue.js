import React from 'react';
import Card from 'bootstrap-styled/lib/Cards/Card';
import CardBlock from 'bootstrap-styled/lib/Cards/CardBlock';
import CardTitle from 'bootstrap-styled/lib/Cards/CardTitle';
import CardSubtitle from 'bootstrap-styled/lib/Cards/CardSubtitle';
import DollarIcon from '@material-ui/icons/AttachMoney';
import { translate } from '@yeutech/react-admin-bs';

const styles = {
    icon: {
        float: 'right',
        width: 54,
        height: 54,
        padding: 14,
        color: '#31708f',
    },
};

export default translate(({ value, translate }) => (
    <Card style={{ borderLeft: 'solid 4px #31708f', flex: '1', marginRight: '1em' }}>
      <CardBlock>
        <DollarIcon style={styles.icon} />
        <CardTitle>
					{value}
        </CardTitle>
        <CardSubtitle className="text-muted">
					{translate('pos.dashboard.monthly_revenue')}
        </CardSubtitle>
      </CardBlock>
    </Card>
));
