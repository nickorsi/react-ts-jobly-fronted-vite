import {describe, expect, it, vi} from "vitest";
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { JoblyApi } from "../api/api.ts";
import { CompanyList } from "./CompanyList.tsx";

const mockedGetCompanies = vi.spyOn(JoblyApi, "getCompanies");

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

    it("renders error if companies not found", async function () {
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
    })
});