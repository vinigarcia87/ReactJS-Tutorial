import P from 'prop-types';
import React, {Component} from "react";
import {Button} from "react-bootstrap";
import './styles.scss';

export class AppButton extends Component {
    render() {
        const {text, onClick, disabled = false} = this.props;
        return (
            <Button variant="primary"
                    onClick={onClick}
                    disabled={disabled}
            >{text}</Button>
        )
    }
}
AppButton.defaultProps = {
    disabled: false
};
AppButton.propTypes = {
    text: P.string.isRequired,
    onClick: P.func.isRequired,
    disabled: P.bool
};