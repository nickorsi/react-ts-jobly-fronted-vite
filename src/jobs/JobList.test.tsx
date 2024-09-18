import {describe, expect, it, vi} from "vitest";
import { render, waitFor, screen } from "@testing-library/react";

import { mockedGetJobs } from "../setupTests";
import { JobList } from "./JobList.tsx";
import userEvent from "@testing-library/user-event";

/**
 * Something wrong with test config, uncomment line below to get intellisense to
 * recognize the extended expect methods, comment out for tests to run properly.
*/
// import "@testing-library/jest-dom";

const user = userEvent.setup();

describe("Simple Render Tests", () => {
    it("renders without crashing", function () {
        render(
            <JobList />
        );
    });
    it("matches the snapshot", function () {
        const { container } = render(
            <JobList />
        );

        expect(container).toMatchSnapshot();
    });
});

describe("Different Rendered Condition Tests", () => {
    it("renders loading component", function () {
        const { container } = render(
            <JobList />
        );

        expect(mockedGetJobs).toHaveBeenCalledOnce();
        expect(container).toContainHTML("Loading...");
    });

    it("renders companies info", async function () {
        mockedGetJobs.mockResolvedValue([
            {
              id: 1,
              title: "Job 1",
              salary: 1,
              equity: "1",
              companyHandle: "c1",
              companyName: "Company 1",
            },
            {
              id: 2,
              title: "Job 2",
              salary: 2,
              equity: "2",
              companyHandle: "c2",
              companyName: "Company 2",
            },
            {
              id: 3,
              title: "Job 3",
              salary: 3,
              equity: "3",
              companyHandle: "c3",
              companyName: "Company 3",
            },
        ]);

        const { container } = render(
            <JobList />
        );

        expect(mockedGetJobs).toHaveBeenCalledOnce();

        await waitFor(() => {
            expect(container).toContainHTML("Job 1");
            expect(container).toContainHTML("Job 2");
            expect(container).toContainHTML("Job 3");
        });
    });

    it("renders error if data could not be retrieved", async function () {
        mockedGetJobs.mockRejectedValue(
            ['Test Error']
        );

        const { container } = render(
            <JobList />
        );

        expect(mockedGetJobs).toHaveBeenCalledOnce();

        await waitFor(() => {
            expect(
                container.querySelector(".error-container p")?.textContent
            ).toEqual(
                "Something went wrong. Test Error"
            );
        });
    });

    it("renders a successful search result", async function() {
        mockedGetJobs.mockResolvedValue([
            {
              id: 1,
              title: "Job 1",
              salary: 1,
              equity: "1",
              companyHandle: "c1",
              companyName: "Company 1",
            },
            {
              id: 2,
              title: "Job 2",
              salary: 2,
              equity: "2",
              companyHandle: "c2",
              companyName: "Company 2",
            },
            {
              id: 3,
              title: "Job 3",
              salary: 3,
              equity: "3",
              companyHandle: "c3",
              companyName: "Company 3",
            },
        ]);

        const { container } = render(
            <JobList />
        );

        expect(mockedGetJobs).toHaveBeenCalledOnce();

        await waitFor(() => {
            expect(container).toContainHTML("Job 1");
            expect(container).toContainHTML("Job 2");
            expect(container).toContainHTML("Job 3");
        });

        mockedGetJobs.mockResolvedValue([
            {
              id: 1,
              title: "Job 1",
              salary: 1,
              equity: "1",
              companyHandle: "c1",
              companyName: "Company 1",
            }
        ]);

        const searchInput = screen.getByTestId('search-bar-input') as HTMLInputElement;
        const searchSubmit = screen.getByTestId('search-bar-submit');

        await user.type(searchInput, "Job 1");
        await user.click(searchSubmit);

        expect(mockedGetJobs).toHaveBeenCalledTimes(2);
        expect(mockedGetJobs.mock.calls).toEqual([[""], ["Job 1"]]);

        await waitFor(() => {
            expect(container).toContainHTML("Job 1");
            expect(() => {
                expect(container).toContainHTML("Job 2");
            }).toThrow();
            expect(() => {
                expect(container).toContainHTML("Job 3");
            }).toThrow();
            expect(searchInput.value).toEqual("Job 1");
        });
    });

    it("renders an unsuccessful search result", async function() {
        mockedGetJobs.mockResolvedValue([
            {
              id: 1,
              title: "Job 1",
              salary: 1,
              equity: "1",
              companyHandle: "c1",
              companyName: "Company 1",
            },
            {
              id: 2,
              title: "Job 2",
              salary: 2,
              equity: "2",
              companyHandle: "c2",
              companyName: "Company 2",
            },
            {
              id: 3,
              title: "Job 3",
              salary: 3,
              equity: "3",
              companyHandle: "c3",
              companyName: "Company 3",
            },
        ]);

        const { container } = render(
            <JobList />
        );

        expect(mockedGetJobs).toHaveBeenCalledOnce();

        await waitFor(() => {
            expect(container).toContainHTML("Job 1");
            expect(container).toContainHTML("Job 2");
            expect(container).toContainHTML("Job 3");
        });

        mockedGetJobs.mockResolvedValue([]);

        const searchInput = screen.getByTestId('search-bar-input') as HTMLInputElement;
        const searchSubmit = screen.getByTestId('search-bar-submit');

        await user.type(searchInput, "Test Fail");
        await user.click(searchSubmit);

        expect(mockedGetJobs).toHaveBeenCalledTimes(2);
        expect(mockedGetJobs.mock.calls).toEqual([[""], ["Test Fail"]]);

        await waitFor(() => {
            expect(container).toContainHTML("Sorry, no results were found!");
            expect(() => {
                expect(container).toContainHTML("Job 1");
            }).toThrow();
            expect(() => {
                expect(container).toContainHTML("Job 2");
            }).toThrow();
            expect(() => {
                expect(container).toContainHTML("Job 3");
            }).toThrow();
            expect(searchInput.value).toEqual("Test Fail");
        });
    });
});