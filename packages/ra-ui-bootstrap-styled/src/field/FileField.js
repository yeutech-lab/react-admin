import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import classnames from 'classnames';
import Ul from 'bootstrap-styled/lib/Ul';
import Li from 'bootstrap-styled/lib/Li';
import A from 'bootstrap-styled/lib/A'
import sanitizeRestProps from './sanitizeRestProps';

export const FileField = ({
    classes = {},
    className,
    record,
    source,
    title,
    src,
    target,
    ...rest
}) => {
    const sourceValue = get(record, source);

    if (!sourceValue) {
        return (
            <div
              className={classnames('d-inline-block', className)}
                {...sanitizeRestProps(rest)}
            />
        );
    }

    if (Array.isArray(sourceValue)) {
        return (
            <Ul
                className={classnames('d-inline-block', className)}
                {...sanitizeRestProps(rest)}
            >
                {sourceValue.map((file, index) => {
                    const titleValue = get(file, title) || title;
                    const srcValue = get(file, src) || title;

                    return (
                        <Li key={index}>
                            <A
                                href={srcValue}
                                title={titleValue}
                                target={target}
                            >
                                {titleValue}
                            </A>
                        </Li>
                    );
                })}
            </Ul>
        );
    }

    const titleValue = get(record, title) || title;

    return (
        <div className={classnames('d-inline-block', className)} {...rest}>
            <A href={sourceValue} title={titleValue} target={target}>
                {titleValue}
            </A>
        </div>
    );
};

FileField.propTypes = {
    addLabel: PropTypes.bool,
    basePath: PropTypes.string,
    className: PropTypes.string,
    cellClassName: PropTypes.string,
    headerClassName: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
    src: PropTypes.string,
    title: PropTypes.string,
    target: PropTypes.string,
};

export default FileField;
