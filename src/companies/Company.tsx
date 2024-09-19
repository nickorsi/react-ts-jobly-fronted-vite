import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CompanyDataFromAPI } from "./CompanyList";
import { JobsDataFromAPI } from "../jobs/JobList";
import { JobCardList } from "../jobs/JobCardList";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";
import { JoblyApi } from "../api/api";
import "./Company.css";

type SpecificCompanyDataFromAPI = CompanyDataFromAPI & {jobs: JobsDataFromAPI}

/**
 * Company componenet renders a page with company data and descendent
 * componenets related to jobs associated with the company. Holds data related
 * to the company in state. Retrieves data on mount.
 *
 * Rendered by RoutesList on the /companies/:companyHandle path
 *
 * RoutesList -> Company -> JobList
 */
function Company() {
    const { companyHandle }  = useParams();
    const [companyData, setCompanyData] = useState<SpecificCompanyDataFromAPI | null>(null);
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(function () {
        async function getCompanyData(companyHandle: string) {
            try{
                const companyData = await JoblyApi.getCompany(companyHandle);
                setCompanyData(companyData);
                setErrors([]);
            } catch (error) {
                setErrors(error as string[]);
            }
        }
        getCompanyData(companyHandle as string);
    }, []);

    if(errors.length > 0) {
        return (
            <ErrorMessage errors={errors}></ErrorMessage>
        )
    }

    if(companyData === null) {
        return (
            <LoadingSpinner></LoadingSpinner>
        )
    }


    return (
        <div className="company-container">
            <div className="company-info card">
                <div className="company-brand">
                    <h1>{ companyData.name }</h1>
                    {
                        companyData.logoUrl === null ? //comparing to null object
                        null :
                        <img src={`${companyData.logoUrl}`} alt="company logo" />
                    }
                </div>
                <p>{companyData.description}</p>
            </div>
            <h2>Open Positions</h2>
            {companyData.jobs.length > 0 ?
                <JobCardList jobs={companyData.jobs}></JobCardList> :
                <p className="no-results">Sorry, there are no open roles at this time.</p>
            }
        </div>
    )
}

export {Company};
export type {SpecificCompanyDataFromAPI};