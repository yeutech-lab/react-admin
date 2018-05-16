import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Table from 'bootstrap-styled/lib/Table';
import Tbody from 'bootstrap-styled/lib/Table/Tbody';
import Thead from 'bootstrap-styled/lib/Table/Thead';
import Th from 'bootstrap-styled/lib/Table/Th';
import Tr from 'bootstrap-styled/lib/Table/Tr';
import Td from 'bootstrap-styled/lib/Table/Td';


import Paper from 'material-ui/Paper';
import {
    translate,
    crudGetMany as crudGetManyAction,
} from '@yeutech/react-admin-bs';
import compose from 'recompose/compose';
import withStyles from 'material-ui/styles/withStyles';

const styles = {
    container: {
        width: '42em',
        float: 'right',
        zIndex: 2,
        '&:after': { clear: 'both' },
    },
    rightAlignedCell: { textAlign: 'right' },
    boldCell: { fontWeight: 'bold' },
};

class Basket extends Component {
    componentDidMount() {
        this.fetchData();
    }
    fetchData() {
        const { record: { basket }, crudGetMany } = this.props;
        crudGetMany('products', basket.map(item => item.product_id));
    }
    render() {
        const { classes, record, products, translate } = this.props;
        const { basket } = record;
        return (
            <Paper className={classes.container}>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>
                                {translate(
                                    'resources.commands.fields.basket.reference'
                                )}
                            </Th>
                            <Th className={classes.rightAlignedCell}>
                                {translate(
                                    'resources.commands.fields.basket.unit_price'
                                )}
                            </Th>
                            <Th className={classes.rightAlignedCell}>
                                {translate(
                                    'resources.commands.fields.basket.quantity'
                                )}
                            </Th>
                            <Th className={classes.rightAlignedCell}>
                                {translate(
                                    'resources.commands.fields.basket.total'
                                )}
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {basket.map(
                            item =>
                                products[item.product_id] && (
                                    <Tr key={item.product_id}>
                                        <Th scope="row">
                                            {
                                                products[item.product_id]
                                                    .reference
                                            }
                                        </Th>
                                        <Td
                                            className={classes.rightAlignedCell}
                                        >
                                            {products[
                                                item.product_id
                                            ].price.toLocaleString(undefined, {
                                                style: 'currency',
                                                currency: 'USD',
                                            })}
                                        </Td>
                                        <Td
                                            className={classes.rightAlignedCell}
                                        >
                                            {item.quantity}
                                        </Td>
                                        <Td
                                            className={classes.rightAlignedCell}
                                        >
                                            {(products[item.product_id].price *
                                                item.quantity
                                            ).toLocaleString(undefined, {
                                                style: 'currency',
                                                currency: 'USD',
                                            })}
                                        </Td>
                                    </Tr>
                                )
                        )}
                        <Tr>
                            <Td colSpan={2} />
                            <Td>
                                {translate(
                                    'resources.commands.fields.basket.sum'
                                )}
                            </Td>
                            <Td className={classes.rightAlignedCell}>
                                {record.total_ex_taxes.toLocaleString(
                                    undefined,
                                    { style: 'currency', currency: 'USD' }
                                )}
                            </Td>
                        </Tr>
                        <Tr>
                            <Td colSpan={2} />
                            <Td>
                                {translate(
                                    'resources.commands.fields.basket.delivery'
                                )}
                            </Td>
                            <Td className={classes.rightAlignedCell}>
                                {record.delivery_fees.toLocaleString(
                                    undefined,
                                    { style: 'currency', currency: 'USD' }
                                )}
                            </Td>
                        </Tr>
                        <Tr>
                            <Td colSpan={2} />
                            <Td>
                                {translate(
                                    'resources.commands.fields.basket.tax_rate'
                                )}
                            </Td>
                            <Td className={classes.rightAlignedCell}>
                                {record.tax_rate.toLocaleString(undefined, {
                                    style: 'percent',
                                })}
                            </Td>
                        </Tr>
                        <Tr>
                            <Td colSpan={2} />
                            <Td className={classes.boldCell}>
                                {translate(
                                    'resources.commands.fields.basket.total'
                                )}
                            </Td>
                            <Td
                                className={classnames(
                                    classes.boldCell,
                                    classes.rightAlignedCell
                                )}
                            >
                                {record.total.toLocaleString(undefined, {
                                    style: 'currency',
                                    currency: 'USD',
                                })}
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </Paper>
        );
    }
}

const mapStateToProps = (state, props) => {
    const { record: { basket } } = props;
    const productIds = basket.map(item => item.product_id);
    return {
        products: productIds
            .map(productId => state.admin.resources.products.data[productId])
            .filter(r => typeof r !== 'undefined')
            .reduce((prev, next) => {
                prev[next.id] = next;
                return prev;
            }, {}),
    };
};

const enhance = compose(
    translate,
    withStyles(styles),
    connect(mapStateToProps, {
        crudGetMany: crudGetManyAction,
    })
);

export default enhance(Basket);
