import {describe, expect, it} from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import NavBar from "./NavBar.tsx";

describe("Simple Render Tests", () => {
    it("renders without crashing", function () {
        render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        );
    });
    it("matches the snapshot", function () {
        const { container } = render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });
    it("renders with the correct content", function () {
        const { container } = render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        );

        const links = container.querySelectorAll("a");

        expect(links.length).toEqual(3);
        expect(screen.getByText("Jobly 💼").getAttribute('href')).toEqual('/');
        expect(
            screen.getByText("Companies").getAttribute('href')
        ).toEqual('/companies');
        expect(screen.getByText("Jobs").getAttribute('href')).toEqual('/jobs');
    });
});
