import React from 'react';
import Progress from 'bootstrap-styled/lib/Progress';
import ProgressBar from 'bootstrap-styled/lib/Progress/ProgressBar';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Progress bar formatted to replace an input or a field in a form layout
 * 
 * Avoids visual jumps when replaced by value or form input
 * 
 * @see ReferenceField
 * @see ReferenceInput
 * 
 * @param {object} classes CSS class names injected by withStyles 
 */
export const LinearProgress = ({ className, ...rest }) => (
  <Progress className={classnames(className, 'mt-2')} {...rest}>
      <ProgressBar valueNow={100} striped animated />
  </Progress>
);
LinearProgress.propTypes = {
    className: PropTypes.string,
};

export default LinearProgress;
