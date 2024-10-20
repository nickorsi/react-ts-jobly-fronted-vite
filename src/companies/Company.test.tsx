import {describe, expect, it} from "vitest";
import { render, waitFor } from "@testing-library/react";

import { mockedGetCompany } from "../setupTests";
import { Company } from "./Company.tsx";

/**
 * Something wrong with test config, uncomment line below to get intellisense to
 * recognize the extended expect methods, comment out for tests to run properly.
*/
// import "@testing-library/jest-dom";

describe("Simple Render Tests", () => {
    it("renders without crashing", function () {
        render(<Company />);
    });

    it("matches the snapshot", function () {
        const { container } = render(
            <Company />
        );

        expect(container).toMatchSnapshot();
    });
});

describe("Different Rendered Condition Tests", () => {
    it("renders loading component", function () {
        const { container } = render(<Company />);

        expect(mockedGetCompany).toHaveBeenCalledOnce();
        expect(container).toContainHTML("Loading...");
    });

    it("renders company info with logo and a job", async function () {
        mockedGetCompany.mockResolvedValue({
            handle: "c1",
            name: "Company 1",
            description: "Description 1",
            numEmployees: 1,
            logoUrl: "http//c1.img",
            jobs: [
              {
                id: 1,
                title: "Job 1",
                salary: 1,
                equity: "1",
                companyName: "Company 1",
              }
            ]
        });

        const { container } = render(<Company />);

        expect(mockedGetCompany).toHaveBeenCalledOnce();

        await waitFor(() => {
            expect(container).toContainHTML("Company 1");
            expect(container).toContainHTML("Job 1");
            expect(container).toContainElement(container.querySelector("img"));
        });
    });

    it("renders company with no logo and no jobs", async function() {
        mockedGetCompany.mockResolvedValue({
            handle: "c1",
            name: "Company 1",
            description: "Description 1",
            numEmployees: 1,
            logoUrl: null,
            jobs: [],
        });

        const { container } = render(<Company />);

        expect(mockedGetCompany).toHaveBeenCalledOnce();

        await waitFor(() => {
            expect(container).toContainHTML(
                "Sorry, there are no open roles at this time."
            );
            expect(container).not.toContainElement(container.querySelector("img"));
        });
    });

    it("renders error if company not found", async function () {
        mockedGetCompany.mockRejectedValue(
            ['Test Error']
        );

        const { container } = render(<Company />);

        expect(mockedGetCompany).toHaveBeenCalledOnce();

        await waitFor(() => {
            expect(
                container.querySelector(".error-container p")?.textContent
            ).toEqual(
                "Something went wrong. Test Error"
            );
        });
    })
});