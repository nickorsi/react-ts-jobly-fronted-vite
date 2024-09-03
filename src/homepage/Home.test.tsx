import {describe, expect, it} from "vitest";
import { render } from "@testing-library/react";

import Home from "./Home.tsx";

describe("Simple Render Tests", () => {
    it("renders without crashing", function () {
        render(<Home />);
    });
    it("matches the snapshot", function () {
        const { container } = render(<Home />);

        expect(container).toMatchSnapshot();
    });
});