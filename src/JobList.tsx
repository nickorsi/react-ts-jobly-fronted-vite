import { useState, useEffect } from "react";
import { JobCardList } from "./JobCardList";
import SearchForm from "./SearchForm";
import { JobDataToAPI, JoblyApi } from "./api";
import './JobList.css';

type JobDataFromAPI = {
    id: number,
    companyName: string
} & JobDataToAPI;

type JobsDataFromAPI = JobDataFromAPI[];

/**
 * JobList container renders descendent componenets related to jobs and holds
 * data related to jobs in state. Retrieves data on mount.
 *
 * Rendered by RoutesList on the /jobs path
 *
 * RoutesList -> JobList -> { SearchForm, JobCardList }
 */

function JobList() {

    const [jobsData, setJobsData] = useState<JobsDataFromAPI | null>(null);
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

    if(jobsData === null) {
        return (
            <h2>Loading...</h2>
        )
    }


    return (
        <div className='joblist-container'>
            <SearchForm onSearch={onSearch}/>
            {searchTerm.length > 0 ?
                <p>Search results for "{searchTerm}"</p> :
                <p>All Jobs</p>
            }
            {jobsData.length > 0 ?
                <JobCardList jobs={jobsData}></JobCardList> :
                <p>Sorry, no results were found!</p>
            }
        </div>
    )
}

export {JobList};
export type {JobsDataFromAPI, JobDataFromAPI};