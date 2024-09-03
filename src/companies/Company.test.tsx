import {describe, expect, it, vi} from "vitest";
import { render, waitFor } from "@testing-library/react";

import { JoblyApi } from "../api/api.ts";
import { Company } from "./Company.tsx";

/**
 * Something wrong with test config, uncomment line below to get intellisense to
 * recognize the extended expect methods, comment out for tests to run properly.
*/
// import "@testing-library/jest-dom";

const mockedGetCompany = vi.spyOn(JoblyApi, "getCompany");

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

    it("renders company info", async function () {
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
                "Looks like something went wrong: Test Error"
            );
        });
    })
});