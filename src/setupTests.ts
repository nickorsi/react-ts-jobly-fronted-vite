// This done here will be available in all test files.
import { vi, expect, afterEach } from "vitest";
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { JoblyApi } from "./api/api.ts";
import '@testing-library/jest-dom/vitest'; // This import allows the types to finallys be recognize and not impact the

// import '@testing-library/jest-dom';
// Have extending the matchers on the expect from vitest, but intellisense does
// not recognize the extended matchers UNLESS line 5 is uncommented. BUT this
// results in a ReferenceError when the tests are ran, saying 'expect' is not
// defined and references a line in a code buried within the jest-dom library.

expect.extend(matchers);
afterEach(cleanup);

const mockedGetJobs = vi.spyOn(JoblyApi, "getJobs");
const mockedGetCompanies = vi.spyOn(JoblyApi, "getCompanies");
const mockedGetCompany = vi.spyOn(JoblyApi, "getCompany");

export { mockedGetJobs, mockedGetCompanies, mockedGetCompany };