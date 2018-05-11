import React, { Children, cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Typography from 'material-ui/Typography';
import Fa from 'bootstrap-styled/lib/Fa';
import Ul from 'bootstrap-styled/lib/Ul';
import Li from 'bootstrap-styled/lib/Li';
import P from 'bootstrap-styled/lib/P';

import ButtonBs from 'bootstrap-styled/lib/Button';
import { withStyles } from 'material-ui/styles';
import { translate } from '@yeutech/ra-core';

import FormInput from '../form/FormInput';

const styles = theme => ({
    root: {
        padding: 0,
        marginBottom: 0,
        '& > li:last-child': {
            borderBottom: 'none',
        },
    },
    line: {
        display: 'flex',
        listStyleType: 'none',
        borderBottom: `solid 1px ${theme.palette.divider}`,
        [theme.breakpoints.down('xs')]: { display: 'block' },
        '&.fade-enter': {
            opacity: 0.01,
            transform: 'translateX(100vw)',
        },
        '&.fade-enter-active': {
            opacity: 1,
            transform: 'translateX(0)',
            transition: 'all 500ms ease-in',
        },
        '&.fade-exit': {
            opacity: 1,
            transform: 'translateX(0)',
        },
        '&.fade-exit-active': {
            opacity: 0.01,
            transform: 'translateX(100vw)',
            transition: 'all 500ms ease-in',
        },
    },
    index: {
        width: '3em',
        paddingTop: '1em',
        [theme.breakpoints.down('sm')]: { display: 'none' },
    },
    form: { flex: 2 },
    action: {
        paddingTop: '0.5em',
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
});

export class SimpleFormIterator extends Component {
    constructor(props) {
        super(props);
        // we need a unique id for each field for a proper enter/exit animation
        // but redux-form doesn't provide one (cf https://github.com/erikras/redux-form/issues/2735)
        // so we keep an internal map between the field position and an autoincrement id
        this.nextId = 0;
        this.ids = props.fields ? props.fields.map(() => this.nextId++) : [];
    }

    removeField = index => () => {
        const { fields } = this.props;
        this.ids.splice(index, 1);
        fields.remove(index);
    };

    addField = () => {
        const { fields } = this.props;
        this.ids.push(this.nextId++);
        fields.push({});
    };

    render() {
        const {
            basePath,
            classes = {},
            children,
            fields,
            meta: { error, submitFailed },
            record,
            resource,
            translate,
        } = this.props;
        return fields ? (
            <Ul className={classes.root}>
                {submitFailed && error && <span>{error}</span>}
                <TransitionGroup>
                    {fields.map((member, index) => (
                        <CSSTransition
                            key={this.ids[index]}
                            timeout={500}
                            classNames="fade"
                        >
                            <Li className={classes.line}>
                                <P className={classes.index}>
                                    {index + 1}
                                </P>
                                <section className={classes.form}>
                                    {Children.map(children, input => (
                                        <FormInput
                                            basePath={basePath}
                                            input={cloneElement(input, {
                                                source: `${member}.${input.props
                                                    .source}`,
                                                label:
                                                    input.props.label ||
                                                    input.props.source,
                                            })}
                                            record={record}
                                            resource={resource}
                                        />
                                    ))}
                                </section>
                                <span className={classes.action}>
                                    <ButtonBs
                                        size="small"
                                        onClick={this.removeField(index)}
                                    >
                                        <Fa close
                                            className={classes.leftIcon}
                                        />
                                        {translate('ra.action.remove')}
                                    </ButtonBs>
                                </span>
                            </Li>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
                <Li className={classes.line}>
                    <span className={classes.action}>
                        <ButtonBs size="small" onClick={this.addField}>
                            <Fa plus className={classes.leftIcon} />
                            {translate('ra.action.add')}
                        </ButtonBs>
                    </span>
                </Li>
            </Ul>
        ) : null;
    }
}

SimpleFormIterator.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    fields: PropTypes.object,
    meta: PropTypes.object,
    record: PropTypes.object,
    resource: PropTypes.string,
    translate: PropTypes.func,
};

export default compose(translate, withStyles(styles))(SimpleFormIterator);
