import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {AppButton} from "./index";

describe('<AppButton />', () => {
    it('should render the button with the text', function () {
        const fn = jest.fn();
        render(<AppButton text="load more"  onClick={fn}/>);

        const button = screen.getByRole('button', {name : /load more/i});

        expect.assertions(1);
        expect(button).toBeInTheDocument();
    });

    it('should call function on button click', async function () {
        const user = userEvent.setup();
        const fn = jest.fn();

        render(<AppButton text="load more" onClick={fn}/>);

        const button = screen.getByRole('button', {name: /load more/i});
        await user.click(button);

        expect.assertions(1);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should be disabled when disabled is true', function () {
        const fn = jest.fn();
        render(<AppButton text="load more" disabled={true} onClick={fn}/>);

        const button = screen.getByRole('button', {name: /load more/i});

        expect.assertions(1);
        expect(button).toBeDisabled();
    });

    it('should be enabled when disabled is false', function () {
        const fn = jest.fn();
        render(<AppButton text="load more" disabled={false} onClick={fn}/>);

        const button = screen.getByRole('button', {name: /load more/i});

        expect.assertions(1);
        expect(button).toBeEnabled();
    });

    it('should match snapshot', async function () {
        const fn = jest.fn();
        const {container} = render(<AppButton text="load more" onClick={fn} disabled={false}/>);

        expect(container.firstChild).toMatchSnapshot();
    });
})