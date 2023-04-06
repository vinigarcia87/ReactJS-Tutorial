import React, {Component} from "react";
import {Button} from "react-bootstrap";
import './styles.scss';

export class AppButton extends Component {
    render() {
        const {text, onClick, disabled} = this.props;
        return (
            <Button variant="primary"
                    onClick={onClick}
                    disabled={disabled}
            >{text}</Button>
        )
    }
}