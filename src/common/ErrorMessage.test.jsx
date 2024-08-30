import {describe, expect, it} from "vitest";
import { render } from "@testing-library/react";

import ErrorMessage from "./ErrorMessage.tsx";

describe("Simple Render Tests", () => {
    it("renders without crashing", function () {
        render(<ErrorMessage errors={["Testing this!"]}/>);
    })
    it("matches the snapshot", function () {
        const { container } = render(
            <ErrorMessage errors={["Testing this!"]}/>
        );

        expect(container).toMatchSnapshot();
    })
})

describe("Multiple Errors Tests", () => {
    it("renders the multiple errors correctly", function () {
        const { container } = render(
            <ErrorMessage
                errors={["Did", "you", "get", "all", "this"]}
            />
        )

        expect(
            container.querySelector(".error-container p").textContent
        ).toEqual(
            "Looks like something went wrong: Did, you, get, all, this"
        )
    })
})