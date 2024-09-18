import {describe, expect, it} from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

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
        render(
            <MemoryRouter initialEntries={["/companies"]}>
                <RoutesList ></RoutesList>
            </MemoryRouter>
        );

        await waitFor(() => {
            screen.debug();
            expect(
                screen.getByText("All Companies")
            ).toBeInTheDocument();
        });
    });
    it("renders the company page correctly", function() {
        render(
            <MemoryRouter initialEntries={["/companies/c1"]}>
                <RoutesList ></RoutesList>
            </MemoryRouter>
        );

        expect(
            screen.getByText("All the jobs in one convenient place.")
        ).toBeInTheDocument();
    });
    it("renders the jobs page correctly", function() {
        render(
            <MemoryRouter >
                <RoutesList ></RoutesList>
            </MemoryRouter>
        );

        expect(
            screen.getByText("All the jobs in one convenient place.")
        ).toBeInTheDocument();
    });
    it("renders the 404 page correctly", function() {
        render(
            <MemoryRouter >
                <RoutesList ></RoutesList>
            </MemoryRouter>
        );

        expect(
            screen.getByText("All the jobs in one convenient place.")
        ).toBeInTheDocument();
    });
});