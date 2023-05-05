import React from "react";
import {render, screen} from "@testing-library/react";
import {PostCard} from "./index";
import {mockPostCard} from "./mock";

const mockPost = mockPostCard;

describe('<PostCard />', () => {
    it('should render PostCard correctly', function () {
        render(<PostCard post={mockPost} />)

        expect(screen.getByRole('img', { name: mockPost.title }))
            .toHaveAttribute('src', mockPost.cover);

        expect(screen.getByRole('heading', { name: mockPost.title }))
            .toBeInTheDocument();

        expect(screen.getByText(mockPost.body)).toBeInTheDocument();
    });

    it('should match snapshot', function () {
        const {container} = render(<PostCard post={mockPost} />)
        expect(container.firstChild).toMatchSnapshot();
    });
});