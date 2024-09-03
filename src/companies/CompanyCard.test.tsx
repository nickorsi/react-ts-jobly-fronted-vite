import {describe, expect, it} from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import CompanyCard from "./CompanyCard.tsx";

const TEST_COMPANY = {
    "handle": "c1",
    "name": "Company 1",
    "description": "Description 1",
    "numEmployees": 1,
    "logoUrl": "http//c1.img",
}


describe("Simple Render Tests", () => {
    it("renders without crashing", function () {
        render(
            <MemoryRouter>
                <CompanyCard
                    handle={TEST_COMPANY.handle}
                    name={TEST_COMPANY.name}
                    description={TEST_COMPANY.description}
                    numEmployees={TEST_COMPANY.numEmployees}
                    logoUrl={TEST_COMPANY.logoUrl}
                />
            </MemoryRouter>
        );
    });
    it("matches the snapshot", function () {
        const { container } = render(
            <MemoryRouter>
                <CompanyCard
                    handle={TEST_COMPANY.handle}
                    name={TEST_COMPANY.name}
                    description={TEST_COMPANY.description}
                    numEmployees={TEST_COMPANY.numEmployees}
                    logoUrl={TEST_COMPANY.logoUrl}
                />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });
});