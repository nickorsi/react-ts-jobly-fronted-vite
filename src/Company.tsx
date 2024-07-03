import React from "react";
import { CompanyDataFromAPI } from "./CompanyList";
import { JobsDataFromAPI } from "./JobList";

type SpecificCompanyDataFromAPI = CompanyDataFromAPI & {jobs: JobsDataFromAPI}

function Company() {
    return (
        <div>Company Component</div>
    )
}

export {Company};
export type {SpecificCompanyDataFromAPI};