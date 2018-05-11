import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import CardFooter from 'bootstrap-styled/lib/Cards/CardFooter';
import Fa from 'bootstrap-styled/lib/Fa';
import P from 'bootstrap-styled/lib/P';
import PaginationBs from 'bootstrap-styled/lib/Pagination';
import PaginationItem from 'bootstrap-styled/lib/Pagination/PaginationItem';
import PaginationLink from 'bootstrap-styled/lib/Pagination/PaginationLink';
import compose from 'recompose/compose';
import classnames from 'classnames';
import { translate } from '@yeutech/ra-core';

import Responsive from '../layout/Responsive';

export class Pagination extends Component {
    range() {
        const input = [];
        const { page, perPage, total } = this.props;
        if (isNaN(page)) return input;
        const nbPages = Math.ceil(total / perPage) || 1;

        // display page links around the current page
        if (page > 2) {
            input.push('1');
        }
        if (page === 4) {
            input.push('2');
        }
        if (page > 4) {
            input.push('.');
        }
        if (page > 1) {
            input.push(page - 1);
        }
        input.push(page);
        if (page < nbPages) {
            input.push(page + 1);
        }
        if (page === nbPages - 3) {
            input.push(nbPages - 1);
        }
        if (page < nbPages - 3) {
            input.push('.');
        }
        if (page < nbPages - 1) {
            input.push(nbPages);
        }

        return input;
    }

    getNbPages() {
        return Math.ceil(this.props.total / this.props.perPage) || 1;
    }

    prevPage = event => {
        event.stopPropagation();
        if (this.props.page === 1) {
            throw new Error(
                this.props.translate('ra.navigation.page_out_from_begin')
            );
        }
        this.props.setPage(this.props.page - 1);
    };

    nextPage = event => {
        event.stopPropagation();
        if (this.props.page > this.getNbPages()) {
            throw new Error(
                this.props.translate('ra.navigation.page_out_from_end')
            );
        }
        this.props.setPage(this.props.page + 1);
    };

    gotoPage = event => {
        event.stopPropagation();
        const page = event.currentTarget.dataset.page;
        if (page < 1 || page > this.getNbPages()) {
            throw new Error(
                this.props.translate('ra.navigation.page_out_of_boundaries', {
                    page,
                })
            );
        }
        this.props.setPage(page);
    };

    renderPageNums() {
        return this.range().map(
            (pageNum, index) =>
                pageNum === '.' ? (
                  <PaginationItem key={`hyphen_${index}`}>
                      <PaginationLink
                        className="page-number my-1 cursor-default"
                      >
                          &hellip;
                      </PaginationLink>
                  </PaginationItem>
                ) : (
                  <PaginationItem key={pageNum}>
                      <PaginationLink
                        className="page-number my-1"
                        data-page={pageNum}
                        onClick={this.gotoPage}
                      >
												{pageNum}
                      </PaginationLink>
                  </PaginationItem>
                )
        );
    }

    render() {
        const {
            className,
            page,
            perPage,
            setPage,
            total,
            translate,
            ...rest
        } = this.props;
        if (total === 0) return null;
        const offsetEnd = Math.min(page * perPage, total);
        const offsetBegin = Math.min((page - 1) * perPage + 1, offsetEnd);
        const nbPages = this.getNbPages();

        return (
            <Responsive
                small={
                    <CardFooter className="d-flex align-items-center justify-content-end" {...rest}>
                        {page > 1 && (
                            <div onClick={this.prevPage}>
                                <Fa chevron-left />
                            </div>
                        )}
                        <P className="displayed-records p-3">
                            {translate('ra.navigation.page_range_info', {
                                offsetBegin,
                                offsetEnd,
                                total,
                            })}
                        </P>
                        {page !== nbPages && (
                            <div onClick={this.nextPage}>
                                <Fa chevron-right />
                            </div>
                        )}
                    </CardFooter>
                }
                medium={
                    <CardFooter className="d-flex align-items-center justify-content-end">
                        <span className="displayed-records">
                            {translate('ra.navigation.page_range_info', {
                                offsetBegin,
                                offsetEnd,
                                total,
                            })}
                        </span>
                        {nbPages > 1 &&
                            <PaginationBs className="m-0 ml-3 cursor-pointer">
                                {page > 1 &&
                                    <PaginationItem key="prev">
                                        <PaginationLink
                                            className="previous-page my-1"
                                            color="primary"
                                            onClick={this.prevPage}
                                            previous
                                        >
                                            {translate('ra.navigation.prev')}
                                        </PaginationLink>
                                    </PaginationItem>
                                }
                                {this.renderPageNums()}
                                {page !== nbPages &&
                                    <PaginationItem key="next">
                                        <PaginationLink
                                            className="next my-1"
                                            color="primary"
                                            onClick={this.nextPage}
                                            next
                                        >
                                            {translate('ra.navigation.next')}
                                        </PaginationLink>
                                    </PaginationItem>
                                }
                            </PaginationBs>
                        }
                    </CardFooter>
                }
            />
        );
    }
}

Pagination.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    page: PropTypes.number,
    perPage: PropTypes.number,
    setPage: PropTypes.func,
    translate: PropTypes.func.isRequired,
    total: PropTypes.number,
};

const enhance = compose(pure, translate);

export default enhance(Pagination);
