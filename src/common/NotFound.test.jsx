import {describe, expect, it} from "vitest";
import { render } from "@testing-library/react";

import NotFound from "./NotFound.tsx";

describe("Simple Render Tests", () => {
    it("renders without crashing", function () {
        render(<NotFound />);
    });
    it("matches the snapshot", function () {
        const { container } = render(
            <NotFound />
        );

        expect(container).toMatchSnapshot();
    });
});