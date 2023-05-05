import P from 'prop-types';
import React from "react";

import './styles.scss';

export const TextInput = ({searchValue, handleChange}) => (
    <input
        onChange={handleChange}
        value={searchValue}
        type="search"
        className="text-input form-control"
        placeholder="Type your search"/>
);

TextInput.propTypes = {
    searchValue: P.string,
    handleChange: P.func.isRequired
}