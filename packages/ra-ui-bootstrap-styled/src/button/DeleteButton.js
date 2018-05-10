import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Fa from 'bootstrap-styled/lib/Fa';

import { fade } from 'material-ui/styles/colorManipulator';
import ActionDelete from '@material-ui/icons/Delete';
import classnames from 'classnames';
import { translate, crudDelete, startUndoable } from '@yeutech/ra-core';

import Button from './Button';

class DeleteButton extends Component {
    handleDelete = event => {
        event.preventDefault();
        const {
            dispatchCrudDelete,
            startUndoable,
            resource,
            record,
            basePath,
            redirect,
            undoable,
        } = this.props;
        if (undoable) {
            startUndoable(
                crudDelete(resource, record.id, record, basePath, redirect)
            );
        } else {
            dispatchCrudDelete(resource, record.id, record, basePath, redirect);
        }
    };

    render() {
        const {
            label = 'ra.action.delete',
            className,
        } = this.props;
        return (
            <Button
                onClick={this.handleDelete}
                label={label}
                className={classnames(
                    'ra-delete-button',
                    className
                )}
                key="button"
            >
                <ActionDelete />
            </Button>
        );
    }
}

DeleteButton.propTypes = {
    basePath: PropTypes.string,
    className: PropTypes.string,
    dispatchCrudDelete: PropTypes.func.isRequired,
    label: PropTypes.string,
    record: PropTypes.object,
    redirect: PropTypes.string,
    resource: PropTypes.string.isRequired,
    startUndoable: PropTypes.func,
    translate: PropTypes.func,
    undoable: PropTypes.bool,
};

DeleteButton.defaultProps = {
    redirect: 'list',
    undoable: true,
};

export default compose(
    connect(null, { startUndoable, dispatchCrudDelete: crudDelete }),
    translate,
)(DeleteButton);
