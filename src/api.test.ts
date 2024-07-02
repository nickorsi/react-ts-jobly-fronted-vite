import {
  test,
  describe,
  beforeAll,
  beforeEach,
  afterAll,
  afterEach,
  expect} from "vitest";

import { mockAPI, mockServer } from "./apiMock";
import { BASE_URL, JoblyApi } from "./api";

beforeAll(()=>{
  mockServer.listen();
})
afterEach(()=>{
  mockServer.resetHandlers();
})
afterAll(()=>{
  mockServer.close();
})

describe("test company routes", ()=>{
  let allCompaniesResponse;
  let filteredCompaniesResponse;
  let singleCompaniesResponse;

  beforeEach(()=>{
    allCompaniesResponse = {
      companies: [
        {
          handle: 'c1',
          name: 'Company 1',
          description: "Description 1",
          numEmployees: 1,
          logoURL: 'http://c1.img',
        }
      ]
    }
  })
})