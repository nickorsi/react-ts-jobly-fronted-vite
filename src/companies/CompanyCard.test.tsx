import {describe, expect, it} from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import CompanyCard from "./CompanyCard.tsx";

const defaultCompany = {
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
                    handle={defaultCompany.handle}
                    name={defaultCompany.name}
                    description={defaultCompany.description}
                    numEmployees={defaultCompany.numEmployees}
                    logoUrl={defaultCompany.logoUrl}
                />
            </MemoryRouter>
        );
    });
    it("matches the snapshot", function () {
        const { container } = render(
            <MemoryRouter>
                <CompanyCard
                    handle={defaultCompany.handle}
                    name={defaultCompany.name}
                    description={defaultCompany.description}
                    numEmployees={defaultCompany.numEmployees}
                    logoUrl={defaultCompany.logoUrl}
                />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });
});