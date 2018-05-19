// in src/comments.js
import React from 'react';
import { DateField, EditButton, translate } from '@yeutech/react-admin-bs';
import Card from 'bootstrap-styled/lib/Cards/Card';
import CardBlock from 'bootstrap-styled/lib/Cards/CardBlock';
import CardTitle from 'bootstrap-styled/lib/Cards/Card';
import { withStyles } from 'material-ui/styles';
import CustomerReferenceField from '../visitors/CustomerReferenceField';
import StarRatingField from './StarRatingField';
import ProductReferenceField from '../products/ProductReferenceField';
import ApproveButton from './ApproveButton';
import rowClassName from './rowClassName';

const listStyles = theme => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: '0.5rem 0',
    },
    cardTitleContent: {
        display: 'flex',
        flexDirection: 'rows',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    cardContent: theme.typography.body1,
    cardContentRow: {
        display: 'flex',
        flexDirection: 'rows',
        alignItems: 'center',
        margin: '0.5rem 0',
    },
});

const MobileGrid = withStyles(listStyles)(
    translate(({ classes, ids, data, basePath, translate, className }) => (
        <div style={{ margin: '1em' }} className={className}>
            {ids.map(id => (
                <Card key={id} color={rowClassName(data[id])}>
                    <CardTitle>
                        <div className={classes.cardTitleContent}>
                            <span>
                                {translate(
                                  'resources.reviews.fields.date'
                                )}:&nbsp;
                                <DateField
                                  record={data[id]}
                                  source="date"
                                />
                            </span>

                            <EditButton
                              resource="reviews"
                              basePath={basePath}
                              record={data[id]}
                            />
                        </div>
                    </CardTitle>
                    <CardBlock className={classes.cardContent}>
                        <span className={classes.cardContentRow}>
                            {translate(
                                'resources.reviews.fields.rating',
                                1
                            )}:&nbsp;
                            <StarRatingField record={data[id]} />
                        </span>
                        <span className={classes.cardContentRow}>
                            {translate('resources.customers.name', 1)}:&nbsp;
                            <CustomerReferenceField
                                record={data[id]}
                                basePath={basePath}
                            />
                        </span>
                        <span className={classes.cardContentRow}>
                            {translate(
                                'resources.reviews.fields.product_id'
                            )}:&nbsp;
                            <ProductReferenceField
                                record={data[id]}
                                basePath={basePath}
                            />
                        </span>
                        {data[id].status === 'pending' && (
                            <span className={classes.cardContentRow}>
                                {translate('resources.reviews.fields.comment')}:<br />
                                {data[id].comment}
                            </span>
                        )}
                        {data[id].status === 'pending' && (
                            <span className={classes.cardContentRow}>
                                <ApproveButton record={data[id]} />
                            </span>
                        )}
                    </CardBlock>
                </Card>
            ))}
        </div>
    ))
);

MobileGrid.defaultProps = {
    data: {},
    ids: [],
};

export default MobileGrid;
