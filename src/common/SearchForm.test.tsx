import {describe, expect, it, vi} from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SearchForm from "./SearchForm.tsx";

const fn = vi.fn();
const user = userEvent.setup();

describe("Simple Render Tests", () => {
    it("renders without crashing", function () {
        render(<SearchForm onSearch={fn} />);
    });
    it("matches the snapshot", function () {
        const { container } = render(
            <SearchForm onSearch={fn} />
        );

        expect(container).toMatchSnapshot();
    });
});

describe("SearchForm Interaction Tests", () => {
    it("runs the propfunction when the user searches", async function () {
        render(
            <SearchForm onSearch={fn} />
        );

        const searchInput = screen.getByTestId('search-bar-input') as HTMLInputElement;
        const searchSubmit = screen.getByTestId('search-bar-submit');

        await user.type(searchInput, "Test");
        await user.click(searchSubmit);

        expect(fn).toHaveBeenCalledOnce();
        expect(fn.mock.calls).toEqual([['Test']]);
        // Search bar value should be 'Test' and shouldn't be blank
        expect(searchInput.value).toEqual('Test');
    });
});