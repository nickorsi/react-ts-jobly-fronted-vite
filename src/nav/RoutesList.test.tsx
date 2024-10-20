import {describe, expect, it} from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {
    mockedGetCompany,
    mockedGetCompanies,
    mockedGetJobs
} from "../setupTests.ts";

import RoutesList from "./RoutesList.tsx";

/**
 * Something wrong with test config, uncomment line below to get intellisense to
 * recognize the extended expect methods, comment out for tests to run properly.
*/
// import "@testing-library/jest-dom";

describe("Simple Render Tests", () => {
    it("renders without crashing", function () {
        render(
            <MemoryRouter >
                <RoutesList ></RoutesList>
            </MemoryRouter>
        );
    });
    it("matches the snapshot", function () {
        const { container } = render(
            <MemoryRouter >
                <RoutesList ></RoutesList>
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });
});

describe("Test Individual Routes", function() {
    it("renders the home page correctly", function() {
        render(
            <MemoryRouter >
                <RoutesList ></RoutesList>
            </MemoryRouter>
        );

        expect(
            screen.getByText("All the jobs in one convenient place.")
        ).toBeInTheDocument();
    });
    it("renders the companies page correctly", async function() {
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

        render(
            <MemoryRouter initialEntries={["/companies"]}>
                <RoutesList ></RoutesList>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(
                screen.getByText("All Companies")
            ).toBeInTheDocument();
        });
    });
    it("renders the company page correctly", async function() {
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

        render(
            <MemoryRouter initialEntries={["/companies/c1"]}>
                <RoutesList ></RoutesList>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(
                screen.getByText("Company 1")
            ).toBeInTheDocument();
        });
    });
    it("renders the jobs page correctly", async function() {
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

        render(
            <MemoryRouter initialEntries={["/jobs"]}>
                <RoutesList ></RoutesList>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(
                screen.getByText("All Jobs")
            ).toBeInTheDocument();
        });
    });
    it("renders the 404 page correctly", function() {
        render(
            <MemoryRouter initialEntries={["/test"]}>
                <RoutesList ></RoutesList>
            </MemoryRouter>
        );

        expect(
            screen.getByText("Looks like that page doesn't exist!")
        ).toBeInTheDocument();
    });
});