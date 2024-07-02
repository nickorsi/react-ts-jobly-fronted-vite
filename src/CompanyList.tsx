import {useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";
import { CompanyDataToAPI } from "./api";

type CompanyDataFromAPI = Omit<CompanyDataToAPI, 'handle'> & Required<Pick<CompanyDataToAPI, 'handle'>>;


type CompaniesDataFromAPI = CompanyDataFromAPI[];

/**
 * CompanyList container renders descendent componenets related to companies
 * and holds data related to companies in state. Retrieves data on mount.
 *
 * Rendered by RoutesList on /companies
 *
 * RoutesList -> CompanyList -> { SearchForm, CompanyCard }
 */
function CompanyList() {
    const [companiesData, setcompaniesData] = useState<CompaniesDataFromAPI | null>(null);
    const [errors, setErrors] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(function() {
        async function retrieveJobData() {
            let res;
            try {
                res = await JoblyApi.getJobs(searchTerm);
                setJobsData(res);
                setErrors([]);
            } catch (error) {
                setErrors(error as string[]);
            }
        }
        retrieveJobData();
    }, [searchTerm]);

    function onSearch(search: string) {
        setSearchTerm(search);
    }

    if(jobsData === null) {
        return (
            <h2>Loading...</h2>
        )
    }

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

    return (
        <>
            <SearchForm onSearch={onSearch}/>
            {searchTerm.length > 0 ?
                <p>Search results for "{searchTerm}"</p> :
                <p>All Jobs</p>
            }
            {jobsData.length > 0 ?
                <JobCardList jobs={jobsData}></JobCardList> :
                <p>Sorry, no results found!</p>
            }
        </>
    )
}

export {CompanyList};
export type {CompanyDataFromAPI, CompaniesDataFromAPI};