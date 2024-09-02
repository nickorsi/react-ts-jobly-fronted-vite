import {describe, expect, it, vi} from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
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

        await user.type(screen.getByTestId('search-bar-input'), "Test");
        await user.click(screen.getByTestId('search-bar-submit'));

        expect(fn).toHaveBeenCalledOnce();
        expect(fn.mock.calls).toEqual([['Test']]);
        // Search bar value should be 'Test' and shouldn't be blank
        expect(screen.getByTestId('search-bar-input').value).toEqual('Test');
    });
});