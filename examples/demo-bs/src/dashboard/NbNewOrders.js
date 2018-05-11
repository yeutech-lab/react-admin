import React from 'react';
import Card from 'bootstrap-styled/lib/Cards/Card';
import CardBlock from 'bootstrap-styled/lib/Cards/CardBlock';
import CardTitle from 'bootstrap-styled/lib/Cards/CardTitle';
import CardSubtitle from 'bootstrap-styled/lib/Cards/CardSubtitle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { translate } from '@yeutech/react-admin-bs';

const styles = {
    icon: {
        float: 'right',
        width: 64,
        height: 64,
        padding: 16,
        color: '#ff9800',
    },
};

export default translate(({ value, translate }) => (
    <Card style={{ borderLeft: 'solid 4px #ff9800', flex: 1, marginLeft: '1em' }}>
      <CardBlock>
        <ShoppingCartIcon style={styles.icon} />
        <CardTitle>
					{value}
        </CardTitle>
        <CardSubtitle>
					{translate('pos.dashboard.new_orders')}
        </CardSubtitle>
      </CardBlock>
    </Card>
));
