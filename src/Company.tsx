import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CompanyDataFromAPI } from "./CompanyList";
import { JobsDataFromAPI } from "./JobList";
import { JobCardList } from "./JobCardList";
import { JoblyApi } from "./api";
import './Company.css';

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
            <>
                <h2>Oops, looks like something went wrong!</h2>
                {errors.map((er, i) => {
                    return (
                        <div key={i}>{er}</div>
                    )
                })}
            </>
        )
    }

    if(companyData === null) {
        return (
            <h2>Loading...</h2>
        )
    }


    return (
        <div className='company-container'>
            <div className='company-info card'>
                <div className="company-brand">
                    <h2>{ companyData.name }</h2>
                    {
                        companyData.logoUrl === 'null' ?
                        null :
                        <img src={`${companyData.logoUrl}`} alt="company logo" />
                    }
                </div>
                <p>{companyData.description}</p>
            </div>
            <JobCardList jobs={companyData.jobs}></JobCardList>
        </div>
    )
}

export {Company};
export type {SpecificCompanyDataFromAPI};