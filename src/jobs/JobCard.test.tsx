import {describe, expect, it} from "vitest";
import { render } from "@testing-library/react";

import JobCard from "./JobCard.tsx";

const TEST_JOB = {
    "id": 1,
    "title": "Job 1",
    "salary": 1,
    "equity": "1",
    "companyHandle": "c1",
    "companyName": "Company 1",
}

const TEST_JOB_2 = {
    "id": 1,
    "title": "Job 1",
    "salary": 1,
    "equity": "1",
    "companyHandle": undefined,
    "companyName": undefined,
}


describe("Simple Render Tests", () => {
    it("renders without crashing", function () {
        render(
            <JobCard
                id={TEST_JOB.id}
                title={TEST_JOB.title}
                salary={TEST_JOB.salary}
                equity={TEST_JOB.equity}
                companyHandle={TEST_JOB.companyHandle}
                companyName={TEST_JOB.companyName}
            />
        );
    });
    it("matches the snapshot", function () {
        const { container } = render(
            <JobCard
                id={TEST_JOB.id}
                title={TEST_JOB.title}
                salary={TEST_JOB.salary}
                equity={TEST_JOB.equity}
                companyHandle={TEST_JOB.companyHandle}
                companyName={TEST_JOB.companyName}
            />
        );

        expect(container).toMatchSnapshot();
    });
    it("renders without a companyName", function () {
        render(
            <JobCard
               {...TEST_JOB_2}
            />
        );
    })
});