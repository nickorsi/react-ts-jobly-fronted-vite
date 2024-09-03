import {describe, expect, it} from "vitest";
import { render } from "@testing-library/react";

import JobCard from "./JobCard.tsx";

const defaultJob = {
    "id": 1,
    "title": "Job 1",
    "salary": 1,
    "equity": "1",
    "companyHandle": "c1",
    "companyName": "Company 1",
}


describe("Simple Render Tests", () => {
    it("renders without crashing", function () {
        render(
            <JobCard
                id={defaultJob.id}
                title={defaultJob.title}
                salary={defaultJob.salary}
                equity={defaultJob.equity}
                companyHandle={defaultJob.companyHandle}
                companyName={defaultJob.companyName}
            />
        );
    });
    it("matches the snapshot", function () {
        const { container } = render(
            <JobCard
                id={defaultJob.id}
                title={defaultJob.title}
                salary={defaultJob.salary}
                equity={defaultJob.equity}
                companyHandle={defaultJob.companyHandle}
                companyName={defaultJob.companyName}
            />
        );

        expect(container).toMatchSnapshot();
    });
});