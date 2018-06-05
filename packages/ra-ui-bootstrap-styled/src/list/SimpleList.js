import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ListGroup from 'bootstrap-styled/lib/ListGroup';
import ListGroupItem from 'bootstrap-styled/lib/ListGroup/ListGroupItem';
import ListGroupItemText from 'bootstrap-styled/lib/ListGroup/ListGroupItemText';
import Link from '../Link';
import Avatar from '../extendMui/Avatar';
import { linkToRecord } from '@yeutech/ra-core';

const LinkOrNot = (
    ({ classes, linkType, basePath, id, children, className }) =>
        linkType === 'edit' || linkType === true ? (
            <Link to={linkToRecord(basePath, id)} className={classnames(className, 'cursor-pointer w-100')}>
                {children}
            </Link>
        ) : linkType === 'show' ? (
            <Link to={`${linkToRecord(basePath, id)}/show`} className={classnames(className, 'cursor-pointer w-100')}>
                {children}
            </Link>
        ) : (
            <div className={classnames(className, 'w-100')}>{children}</div>
        )
);

const sanitizeRestProps = ({ currentSort, isLoading, setSort, ...rest }) =>
    rest;

const SimpleList = ({
    basePath,
    className,
    data,
    hasBulkActions,
    ids,
    leftAvatar,
    leftIcon,
    linkType,
    onToggleItem,
    primaryText,
    rightAvatar,
    rightIcon,
    secondaryText,
    selectedIds,
    tertiaryText,
    // Our props
    classNameListItem,
    ...rest
}) => (
    <ListGroup className={className} {...sanitizeRestProps(rest)}>
        {ids.map(id => (
            <ListGroupItem action className="w-100 p-0">
                <LinkOrNot linkType={linkType} basePath={basePath} id={id} key={id} className={classNameListItem}>
                    {leftIcon && (
                        <div>{leftIcon(data[id], id)}</div>
                    )}
                    {leftAvatar && (
                        <Avatar>{leftAvatar(data[id], id)}</Avatar>
                    )}
                    <ListGroupItemText>
                        <div>
                          {primaryText&& primaryText(data[id], id)}
                          {tertiaryText && (
                            <span style={{ float: 'right', opacity: 0.541176 }}>
                                        {tertiaryText(data[id], id)}
                                    </span>
                          )}
                          {secondaryText && secondaryText(data[id], id)}
                        </div>
                    </ListGroupItemText>
                    {rightAvatar && (
                        <Avatar>{rightAvatar(data[id], id)}</Avatar>
                    )}
                    {rightIcon && (
                        <ListItemIcon>
                            {rightIcon(data[id], id)}
                        </ListItemIcon>
                    )}
                </LinkOrNot>
            </ListGroupItem>
        ))}
    </ListGroup>
);

SimpleList.propTypes = {
    basePath: PropTypes.string,
    className: PropTypes.string,
    data: PropTypes.object,
    hasBulkActions: PropTypes.bool.isRequired,
    ids: PropTypes.array,
    leftAvatar: PropTypes.func,
    leftIcon: PropTypes.func,
    linkType: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
        .isRequired,
    onToggleItem: PropTypes.func.isRequired,
    primaryText: PropTypes.func,
    rightAvatar: PropTypes.func,
    rightIcon: PropTypes.func,
    secondaryText: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
    tertiaryText: PropTypes.func,
	  classNameListItem: PropTypes.string,
};

SimpleList.defaultProps = {
    linkType: 'edit',
    hasBulkActions: false,
    selectedIds: [],
};

export default SimpleList;
