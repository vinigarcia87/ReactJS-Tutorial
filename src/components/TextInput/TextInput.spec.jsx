import React from "react";
import {render, screen} from "@testing-library/react";
import {TextInput} from "./index";
import userEvent from "@testing-library/user-event";

describe('<TextInput />', () => {
    it('Should have a value of searchValue', () => {
        const fn = jest.fn();
        render(<TextInput handleChange={fn} searchValue={'testando'}/>);

        const input = screen.getByPlaceholderText(/type your search/i);
        expect(input).toBeInTheDocument();
        expect(input.value).toBe('testando');
    });

    it('Should call handleChange function on each key pressed', async () => {
        const user = userEvent.setup();
        const fn = jest.fn();
        render(<TextInput handleChange={fn}/>);

        const input = screen.getByPlaceholderText(/type your search/i);
        const value = 'o valor';

        await user.type(input, value);

        expect(input.value).toBe(value);
        expect(fn).toHaveBeenCalledTimes(value.length);
    });

    it('Should match snapshot', () => {
        const fn = jest.fn();
        const {container} = render(<TextInput handleChange={fn} searchValue={'testando'}/>);
        expect(container.firstChild).toMatchSnapshot();
    });
})