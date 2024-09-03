import {describe, expect, it} from "vitest";
import { render } from "@testing-library/react";

import { JobCardList } from "./JobCardList.tsx";

/**
 * Something wrong with test config, uncomment line below to get intellisense to
 * recognize the extended expect methods, comment out for tests to run properly.
*/
// import "@testing-library/jest-dom";

const TEST_JOBS = [
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
  ];


describe("Simple Render Tests", () => {
    it("renders without crashing", function () {
        render(<JobCardList jobs={TEST_JOBS}/>);
    });
    it("matches the snapshot", function () {
        const { container } = render(<JobCardList jobs={TEST_JOBS}/>);

        expect(container).toMatchSnapshot();
    });
    it("renders with expected info", function () {
        const { container } = render(<JobCardList jobs={TEST_JOBS}/>);

        expect(container).toContainHTML("Job 1");
        expect(container).toContainHTML("Job 2");
        expect(container).toContainHTML("Job 3");
    });
});