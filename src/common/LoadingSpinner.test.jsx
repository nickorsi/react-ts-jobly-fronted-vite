import {describe, expect, it} from "vitest";
import { render } from "@testing-library/react";

import LoadingSpinner from "./LoadingSpinner.tsx";

describe("Simple Render Tests", () => {
    it("renders without crashing", function () {
        render(<LoadingSpinner />);
    });
    it("matches the snapshot", function () {
        const { container } = render(
            <LoadingSpinner />
        );

        expect(container).toMatchSnapshot();
    });
});