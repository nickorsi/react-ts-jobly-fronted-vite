const BASE_URL:string = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:3001";

type CompanyDataToAPI = {
  handle?: string,
  name: string,
  description: string,
  numEmployees: number,
  logoURL: string,
};

type JobDataToAPI = {
  title: string,
  salary: number,
  equity: number,
  companyHandle?: string,
};

type UserDataToAPI = {
  username?: string,
  password?: string,
  firstName?: string,
  lastName?: string,
  email?: string,
  isAdmin?: boolean,
}

type FilterDataToAPI = {
  nameLike?: string,
  title?: string,
}

type Data = CompanyDataToAPI | UserDataToAPI | JobDataToAPI | UserDataToAPI | FilterDataToAPI | Record<string, never>;

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  static async request(endpoint:string, data:Data = {}, method:string = "GET") {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      authorization: `Bearer ${JoblyApi.token}`,
      'content-type': 'application/json',
    };

    url.search = (method === "GET")
      ? new URLSearchParams(data as FilterDataToAPI).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET")
      ? JSON.stringify(data)
      : undefined;

    const resp = await fetch(url, { method, body, headers });

    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const message = (await resp.json()).error.message;
      throw Array.isArray(message) ? message : [message];
    }

    return await resp.json();
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle: string) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }


  /**
   * Get details on companies based on passed in searchTerm string.
   * Note: If searchTerm is empty, returns all companies.
  */

  /**
   * Get details on jobs based on passed in searchTerm string.
   * Note: If searchTerm is empty, returns all jobs.
  */

  static async getJobs(searchTerm: string = '') {
    const data:FilterDataToAPI = {};
    if(searchTerm.length > 0) {
       data['title'] = searchTerm;
    }
    const res = await this.request(`jobs`, data);
    return res.jobs;
  }
}

export { JoblyApi, BASE_URL };

export type {JobDataToAPI, CompanyDataToAPI};
