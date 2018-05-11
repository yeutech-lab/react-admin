import React from 'react';
import compose from 'recompose/compose';
import Small from 'bootstrap-styled/lib/Small';
import Card from 'bootstrap-styled/lib/Cards/Card';
import CardBlock from 'bootstrap-styled/lib/Cards/CardBlock';
import CardTitle from 'bootstrap-styled/lib/Cards/CardTitle';
import ListGroup from 'bootstrap-styled/lib/ListGroup';
import ListGroupItem from 'bootstrap-styled/lib/ListGroup/ListGroupItem';
import ListGroupItemText from 'bootstrap-styled/lib/ListGroup/ListGroupItemText';
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import { translate } from '@yeutech/react-admin-bs';

const style = theme => ({
    root: {
        flex: 1,
    },
    avatar: {
        background: theme.palette.background.avatar,
    },
    cost: {
        marginRight: '1em',
        position: 'absolute',
        top: '1em',
        right: 0,
        color: theme.palette.text.primary,
    },
});

const PendingOrders = ({ orders = [], customers = {}, translate, classes }) => (
    <Card className={classes.root}>
        <CardBlock>
            <CardTitle>
							{translate('pos.dashboard.pending_orders')}
            </CardTitle>
        </CardBlock>
        <ListGroup>
            {orders.map(record => (
                <ListGroupItem
                    key={record.id}
                    action
                    component={Link}
                    to={`/commands/${record.id}`}
                    className="border-0 rounded-0"
                >
                    {customers[record.customer_id] ? (
                        <Avatar
                            className={classes.avatar}
                            src={`${customers[record.customer_id]
                                .avatar}?size=32x32`}
                        />
                    ) : (
                        <Avatar />
                    )}
                    <div className="d-flex flex-column mr-2">
                        <ListGroupItemText className="m-0">
                          {new Date(record.date).toLocaleString('en-GB')}
                        </ListGroupItemText>
                        <ListGroupItemText tag={Small} className="m-0 text-muted">
                          {translate('pos.dashboard.order.items', {
                            smart_count: record.basket.length,
                            nb_items: record.basket.length,
                            customer_name: customers[record.customer_id]
                              ? `${customers[record.customer_id]
                                .first_name} ${customers[
                                record.customer_id
                                ].last_name}`
                              : '',
                          })}
                        </ListGroupItemText>
                    </div>
                    <ListGroupItemText>
                        <span className={classes.cost}>{record.total}$</span>
                    </ListGroupItemText>
                </ListGroupItem>
            ))}
        </ListGroup>
    </Card>
);

const enhance = compose(withStyles(style), translate);

export default enhance(PendingOrders);
