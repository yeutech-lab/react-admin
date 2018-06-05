import React from 'react';
import compose from 'recompose/compose';
import Card from 'bootstrap-styled/lib/Cards/Card';
import CardBlock from 'bootstrap-styled/lib/Cards/CardBlock';
import CardTitle from 'bootstrap-styled/lib/Cards/CardTitle';
import CardSubtitle from 'bootstrap-styled/lib/Cards/CardSubtitle';
import ListGroup from 'bootstrap-styled/lib/ListGroup';
import ListGroupItem from 'bootstrap-styled/lib/ListGroup/ListGroupItem';
import ListGroupItemText from 'bootstrap-styled/lib/ListGroup/ListGroupItemText';
import Avatar from 'material-ui/Avatar';
import CustomerIcon from '@material-ui/icons/PersonAdd';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import { translate } from '@yeutech/react-admin-bs';

const styles = theme => ({
	icon: {
		float: 'right',
		width: 64,
		height: 64,
		padding: '16px 16px 0 16px',
		color: '#4caf50',
	},
	avatar: {
		background: theme.palette.background.avatar,
	},
	listItemText: {
		paddingRight: 0,
	},
});

const NewCustomers = ({ visitors = [], nb, translate, classes }) => (
  <Card style={{ borderLeft: 'solid 4px #4caf50', flex: 1, marginLeft: '1em' }}>
    <CardBlock>
      <CustomerIcon className={classes.icon} />
      <CardTitle>
        {nb}
      </CardTitle>
      <CardSubtitle color="muted">
        {translate('pos.dashboard.new_customers')}
      </CardSubtitle>
    </CardBlock>
    <ListGroup>
			{visitors.map(record => (
        <ListGroupItem
          action
          to={`/customers/${record.id}`}
          tag={Link}
          key={record.id}
          className="border-0 rounded-0"
        >
          <Avatar
            src={`${record.avatar}?size=32x32`}
            className={classes.avatar}
          />
          <ListGroupItemText
            className={classes.listItemText}
          >
						{`${record.first_name} ${record.last_name}`}
          </ListGroupItemText>
        </ListGroupItem>
			))}
    </ListGroup>
  </Card>
);

const enhance = compose(withStyles(styles), translate);

export default enhance(NewCustomers);
