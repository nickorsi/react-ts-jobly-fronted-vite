import {describe, expect, it, vi} from "vitest";
import { render, waitFor, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { JoblyApi } from "../api/api.ts";
import { CompanyList } from "./CompanyList.tsx";
import userEvent from "@testing-library/user-event";

/**
 * Something wrong with test config, uncomment line below to get intellisense to
 * recognize the extended expect methods, comment out for tests to run properly.
*/
// import "@testing-library/jest-dom";

const mockedGetCompanies = vi.spyOn(JoblyApi, "getCompanies");
const user = userEvent.setup();

describe("Simple Render Tests", () => {
    it("renders without crashing", function () {
        render(
            <MemoryRouter>
                <CompanyList />
            </MemoryRouter>
        );
    });
    it("matches the snapshot", function () {
        const { container } = render(
            <MemoryRouter>
                <CompanyList />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });
});

describe("Different Rendered Condition Tests", () => {
    it("renders loading component", function () {
        const { container } = render(
            <MemoryRouter>
                <CompanyList />
            </MemoryRouter>
        );

        expect(mockedGetCompanies).toHaveBeenCalledOnce();
        expect(container).toContainHTML("Loading...");
    });

    it("renders companies info", async function () {
        mockedGetCompanies.mockResolvedValue([
            {
                handle: "c1",
                name: "Company 1",
                description: "Description 1",
                numEmployees: 1,
                logoUrl: "http//c1.img",
              },
              {
                handle: "c2",
                name: "Company 2",
                description: "Description 2",
                numEmployees: 2,
                logoUrl: "http//c2.img",
              },
              {
                handle: "c3",
                name: "Company 3",
                description: "Description 3",
                numEmployees: 3,
                logoUrl: "http//c3.img",
              },
        ]);

        const { container } = render(
            <MemoryRouter>
                <CompanyList />
            </MemoryRouter>
        );

        expect(mockedGetCompanies).toHaveBeenCalledOnce();

        await waitFor(() => {
            expect(container).toContainHTML("Company 1");
            expect(container).toContainHTML("Company 2");
            expect(container).toContainHTML("Company 3");
        });
    });

    it("renders error if data could not be retrieved", async function () {
        mockedGetCompanies.mockRejectedValue(
            ['Test Error']
        );

        const { container } = render(
            <MemoryRouter>
                <CompanyList />
            </MemoryRouter>
        );

        expect(mockedGetCompanies).toHaveBeenCalledOnce();

        await waitFor(() => {
            expect(
                container.querySelector(".error-container p")?.textContent
            ).toEqual(
                "Looks like something went wrong: Test Error"
            );
        });
    });

    it("renders a successful search result", async function() {
        mockedGetCompanies.mockResolvedValue([
            {
                handle: "c1",
                name: "Company 1",
                description: "Description 1",
                numEmployees: 1,
                logoUrl: "http//c1.img",
            },
            {
              handle: "c2",
              name: "Company 2",
              description: "Description 2",
              numEmployees: 2,
              logoUrl: "http//c2.img",
            },
            {
              handle: "c3",
              name: "Company 3",
              description: "Description 3",
              numEmployees: 3,
              logoUrl: "http//c3.img",
            },
      ]);

        const { container } = render(
            <MemoryRouter>
                <CompanyList />
            </MemoryRouter>
        );

        expect(mockedGetCompanies).toHaveBeenCalledOnce();

        await waitFor(() => {
            expect(container).toContainHTML("Company 1");
            expect(container).toContainHTML("Company 2");
            expect(container).toContainHTML("Company 3");
        });

        mockedGetCompanies.mockResolvedValue([
            {
                handle: "c1",
                name: "Company 1",
                description: "Description 1",
                numEmployees: 1,
                logoUrl: "http//c1.img",
            }
        ]);

        const searchInput = screen.getByTestId('search-bar-input') as HTMLInputElement;
        const searchSubmit = screen.getByTestId('search-bar-submit');

        await user.type(searchInput, "Company 1");
        await user.click(searchSubmit);

        expect(mockedGetCompanies).toHaveBeenCalledTimes(2);
        expect(mockedGetCompanies.mock.calls).toEqual([[""], ["Company 1"]]);

        await waitFor(() => {
            expect(container).toContainHTML("Company 1");
            expect(() => {
                expect(container).toContainHTML("Company 2");
            }).toThrow();
            expect(() => {
                expect(container).toContainHTML("Company 3");
            }).toThrow();
            expect(searchInput.value).toEqual("Company 1");
        });
    });

    it("renders an unsuccessful search result", async function() {
        mockedGetCompanies.mockResolvedValue([
            {
                handle: "c1",
                name: "Company 1",
                description: "Description 1",
                numEmployees: 1,
                logoUrl: "http//c1.img",
            },
            {
              handle: "c2",
              name: "Company 2",
              description: "Description 2",
              numEmployees: 2,
              logoUrl: "http//c2.img",
            },
            {
              handle: "c3",
              name: "Company 3",
              description: "Description 3",
              numEmployees: 3,
              logoUrl: "http//c3.img",
            },
      ]);

        const { container } = render(
            <MemoryRouter>
                <CompanyList />
            </MemoryRouter>
        );

        expect(mockedGetCompanies).toHaveBeenCalledOnce();

        await waitFor(() => {
            expect(container).toContainHTML("Company 1");
            expect(container).toContainHTML("Company 2");
            expect(container).toContainHTML("Company 3");
        });

        mockedGetCompanies.mockResolvedValue(
            []
        );

        const searchInput = screen.getByTestId('search-bar-input') as HTMLInputElement;
        const searchSubmit = screen.getByTestId('search-bar-submit');

        await user.type(searchInput, "Test Fail");
        await user.click(searchSubmit);

        expect(mockedGetCompanies).toHaveBeenCalledTimes(2);
        expect(mockedGetCompanies.mock.calls).toEqual([[""], ["Test Fail"]]);

        await waitFor(() => {
            expect(container).toContainHTML("Sorry, no results were found!");
            expect(() => {
                expect(container).toContainHTML("Company 1");
            }).toThrow();
            expect(() => {
                expect(container).toContainHTML("Company 2");
            }).toThrow();
            expect(() => {
                expect(container).toContainHTML("Company 3");
            }).toThrow();
            expect(searchInput.value).toEqual("Test Fail");
        });
    });
});