import {
  test,
  describe,
  beforeAll,
  beforeEach,
  afterAll,
  afterEach,
  expect,
} from "vitest";

import { mockAPI, mockServer } from "./apiMock";
import { BASE_URL, JoblyApi } from "./api";
import { CompaniesDataFromAPI } from "../companies/CompanyList";
import { SpecificCompanyDataFromAPI } from "../companies/Company";
import { JobsDataFromAPI } from "../jobs/JobList";

beforeAll(function(){
  mockServer.listen();
})
afterEach(function(){
  mockServer.resetHandlers();
})
afterAll(function(){
  mockServer.close();
})

describe("Test company routes", function(){
  let allCompaniesResponse: {companies: CompaniesDataFromAPI} | undefined;
  let filteredCompaniesResponse: {companies: CompaniesDataFromAPI} | undefined;
  let singleCompaniesResponse: {company: SpecificCompanyDataFromAPI} | undefined;

  beforeEach(()=>{
    allCompaniesResponse = {
      companies: [
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
      ]
    };
    filteredCompaniesResponse = {
      companies:  [
        {
          handle: 'c1',
          name: 'Company 1',
          description: "Description 1",
          numEmployees: 1,
          logoUrl: 'http://c1.img',
        },
      ]
    };
    singleCompaniesResponse = {
      company: {
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
      }
    };
  });
  test("Get all companies", async function(){
    mockAPI(
      'get',
      `${BASE_URL}/companies`,
      allCompaniesResponse as {companies: CompaniesDataFromAPI}
    );
    const companies = await JoblyApi.getCompanies();

    expect(companies).toEqual(allCompaniesResponse?.companies);
    expect(companies.length).toEqual(3);
  });
  test("Get filtered companies", async function(){
    mockAPI(
      'get',
      `${BASE_URL}/companies`, // Removed the query in the URL per suggestion from stderror message in the terminal from msw
      filteredCompaniesResponse as {companies: CompaniesDataFromAPI}
    );
    const companies = await JoblyApi.getCompanies('c1');

    expect(companies).toEqual([{
      handle: 'c1',
      name: 'Company 1',
      description: "Description 1",
      numEmployees: 1,
      logoUrl: 'http://c1.img',
    }]);
    expect(companies.length).toEqual(1);
  });
  test("No matches for company filter", async function() {
    mockAPI(
      'get',
      `${BASE_URL}/companies`, // Removed the query in the URL per suggestion from stderror message in the terminal from msw
      {companies: []}
    );
    const companies = await JoblyApi.getCompanies('test');

    expect(companies).toEqual([]);
    expect(companies.length).toEqual(0);
  })
  test("Get company by handle", async function(){
    mockAPI(
      'get',
      `${BASE_URL}/companies/c1`,
      singleCompaniesResponse as {company: SpecificCompanyDataFromAPI}
    );
    const specificCompany = await JoblyApi.getCompany('c1');

    expect(specificCompany).toEqual(singleCompaniesResponse?.company);
  });
})

describe("Test jobs routes", function() {
  let allJobsResponse: {jobs: JobsDataFromAPI} | undefined;
  let filteredJobsResponse: {jobs: JobsDataFromAPI} | undefined;

  beforeEach(function() {
    allJobsResponse = {
      jobs: [
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
      ]
    }
    filteredJobsResponse = {
      jobs: [
        {
          id: 1,
          title: 'Job 1',
          salary: 1,
          equity: '1',
          companyHandle: 'c1',
          companyName: 'Company 1',
        },
      ]
    }
  });
  test("Get all jobs", async function() {
    mockAPI(
      'get',
      `${BASE_URL}/jobs`,
      allJobsResponse as {jobs: JobsDataFromAPI}
    )
    const jobs = await JoblyApi.getJobs();

    expect(jobs).toEqual(allJobsResponse?.jobs);
    expect(jobs.length).toEqual(3);
  })
  test("Get filtered jobs", async function() {
    mockAPI(
      'get',
      `${BASE_URL}/jobs`, // Removed the query in the URL per suggestion from stderror message in the terminal from msw
      filteredJobsResponse as {jobs: JobsDataFromAPI}
    )
    const jobs = await JoblyApi.getJobs('Job 1');

    expect(jobs).toEqual([{
      id: 1,
      title: 'Job 1',
      salary: 1,
      equity: '1',
      companyHandle: 'c1',
      companyName: 'Company 1',
    }]);
    expect(jobs.length).toEqual(1);
  })
  test("No matches for jobs filter", async function() {
    mockAPI(
      'get',
      `${BASE_URL}/jobs`, // Removed the query in the URL per suggestion from stderror message in the terminal from msw
      {jobs: []}
    )
    const jobs = await JoblyApi.getJobs('test');

    expect(jobs).toEqual([]);
    expect(jobs.length).toEqual(0);
  })
});