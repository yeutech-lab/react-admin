import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import classnames from 'classnames';
import Ul from 'bootstrap-styled/lib/Ul';
import Li from 'bootstrap-styled/lib/Li';
import Img from 'bootstrap-styled/lib/Img';
import sanitizeRestProps from './sanitizeRestProps';

export const ImageField = ({
    className,
    classes = {},
    record,
    source,
    src,
    title,
    ...rest
}) => {
    const sourceValue = get(record, source);
    if (!sourceValue) {
        return <div className={className} {...sanitizeRestProps(rest)} />;
    }

    if (Array.isArray(sourceValue)) {
        return (
            <Ul
                className={classnames('d-flex', className)}
                {...sanitizeRestProps(rest)}
            >
                {sourceValue.map((file, index) => {
                    const titleValue = get(file, title) || title;
                    const srcValue = get(file, src) || title;

                    return (
                        <Li key={index}>
                            <Img
                                alt={titleValue}
                                title={titleValue}
                                src={srcValue}
                                style={{ maxHeight: '10rem' }}
                                className="m-1"
                            />
                        </Li>
                    );
                })}
            </Ul>
        );
    }

    const titleValue = get(record, title) || title;

    return (
        <div className={className} {...sanitizeRestProps(rest)}>
            <img
                title={titleValue}
                alt={titleValue}
                src={sourceValue}
                className={classes.image}
            />
        </div>
    );
};

ImageField.propTypes = {
    addLabel: PropTypes.bool,
    basePath: PropTypes.string,
    className: PropTypes.string,
    cellClassName: PropTypes.string,
    headerClassName: PropTypes.string,
    classes: PropTypes.object,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
    src: PropTypes.string,
    title: PropTypes.string,
};

export default ImageField;
