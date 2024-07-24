import {expect, it, vi} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import { JoblyApi } from './api.ts';
import App from './App.tsx';

const mockedGetJobs = vi.spyOn(JoblyApi, "getJobs");
const mockedGetCompanies = vi.spyOn(JoblyApi, "getCompanies");
const mockedGetCompany = vi.spyOn(JoblyApi, "getCompany");


it("renders without crashing", function () {
    render(<App />);
})

it('matches the snapshot', function () {
    const { container } = render(<App />);

    expect(container).toMatchSnapshot();
})

it("renders homepage and navbar", function () {
    const { container } = render(<App />);

    expect(container.querySelector(".home")).toBeInTheDocument();
    expect(container.querySelector(".navbar")).toBeInTheDocument();
})

it("can be navigated by the user", async function () {
    mockedGetJobs.mockReturnValue(Promise.resolve([
        {
          id: 1,
          title: 'Job 1',
          salary: 1,
          equity: '1',
          companyHandle: 'c1',
          companyName: 'Company 1',
        },
        {
          id: 2,
          title: 'Job 2',
          salary: 2,
          equity: '2',
          companyHandle: 'c2',
          companyName: 'Company 2',
        },
        {
          id: 3,
          title: 'Job 3',
          salary: 3,
          equity: '3',
          companyHandle: 'c3',
          companyName: 'Company 3',
        },
    ]));
    mockedGetCompanies.mockReturnValue(Promise.resolve([
        {
          handle: 'c1',
          name: 'Company 1',
          description: "Description 1",
          numEmployees: 1,
          logoUrl: 'http://c1.img',
        },
        {
          handle: 'c2',
          name: 'Company 2',
          description: "Description 2",
          numEmployees: 2,
          logoUrl: 'http://c2.img',
        },
        {
          handle: 'c3',
          name: 'Company 3',
          description: "Description 3",
          numEmployees: 3,
          logoUrl: 'http://c3.img',
        },
      ]));
    mockedGetCompany.mockReturnValue(Promise.resolve({
        handle: 'c1',
        name: 'Company 1',
        description: "Description 1",
        numEmployees: 1,
        logoUrl: 'http://c1.img',
        jobs: [
          {
            id: 1,
            title: 'Job 1',
            salary: 1,
            equity: '1',
            companyName: 'Company 1',
          }
        ]
      }));

    const { container } = render(<App />)

    const user = userEvent.setup();

    // Navigating to jobs page
    await user.click(screen.getByTestId("jobs-nav-button"));
    // await user.click(container.querySelector("a [data-testid=jobs-nav-button]") as Element);

    expect(container.querySelectorAll(".job.card").length).toEqual(3);
    expect(container.querySelectorAll(".job.card")[0]).toContainHTML("Job 1");
    expect(container.querySelectorAll(".job.card")[1]).toContainHTML("Job 2");
    expect(container.querySelectorAll(".job.card")[2]).toContainHTML("Job 3");

    // TODO: Add tests for navigation to companies and company page.


})