import React from 'react';
import compose from 'recompose/compose';
import Card from 'bootstrap-styled/lib/Cards/Card';
import CardBlock from 'bootstrap-styled/lib/Cards/CardBlock';
import CardTitle from 'bootstrap-styled/lib/Cards/CardTitle';
import CardSubtitle from 'bootstrap-styled/lib/Cards/CardSubtitle';
import ListGroup from 'bootstrap-styled/lib/ListGroup';
import ListGroupItem from 'bootstrap-styled/lib/ListGroup/ListGroupItem';
import ListGroupItemText from 'bootstrap-styled/lib/ListGroup/ListGroupItemText';
import CommentIcon from '@material-ui/icons/Comment';
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import { translate } from '@yeutech/react-admin-bs';
import classnames from 'classnames';
import StarRatingField from '../reviews/StarRatingField';

const styles = theme => ({
    titleLink: { textDecoration: 'none', color: 'inherit' },
    card: { borderLeft: 'solid 4px #f44336', flex: 1, marginRight: '1em' },
    icon: {
        float: 'right',
        width: 64,
        height: 64,
        padding: '16px 16px 0 16px',
        color: '#f44336',
    },
    avatar: {
        background: theme.palette.background.avatar,
    },
    listItemText: {
        overflowY: 'hidden',
        height: '4em',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
    },
});

const location = {
    pathname: 'reviews',
    query: { filter: JSON.stringify({ status: 'pending' }) },
};

const PendingReviews = ({
    reviews = [],
    customers = {},
    nb,
    translate,
    classes,
}) => (
    <Card className={classes.card}>
        <CardBlock>
            <CommentIcon className={classes.icon} />
            <CardTitle>
                <Link to={location} className={classes.titleLink}>
                  {nb}
                </Link>
            </CardTitle>
            <CardSubtitle color="muted">
                {translate('pos.dashboard.pending_reviews')}
            </CardSubtitle>
        </CardBlock>
        <ListGroup>
            {reviews.map(record => (
                <ListGroupItem
                    key={record.id}
                    action
                    tag={Link}
                    to={`/reviews/${record.id}`}
                    className="border-0 rounded-0 d-flex flex-row justify-content-between"
                >
                    {customers[record.customer_id] ? (
                        <Avatar
                            src={`${customers[record.customer_id]
                                .avatar}?size=32x32`}
                            className={classes.avatar}
                        />
                    ) : (
                        <Avatar />
                    )}

                    <ListGroupItemText
                        className={classnames(classes.listItemText, 'd-flex flex-column')}
                        style={{ paddingRight: 0 }}
                    >
                      <StarRatingField record={record} />
											{record.comment}
                    </ListGroupItemText>
                </ListGroupItem>
            ))}
        </ListGroup>
    </Card>
);

const enhance = compose(withStyles(styles), translate);

export default enhance(PendingReviews);
