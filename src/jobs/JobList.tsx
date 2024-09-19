import { useState, useEffect } from "react";
import { JobCardList } from "./JobCardList";
import SearchForm from "../common/SearchForm";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";
import { JobDataToAPI, JoblyApi } from "../api/api";
import './JobList.css';

type JobDataFromAPI = {
    id: number,
    companyName?: string
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
            <ErrorMessage errors={errors}></ErrorMessage>
        )
    }

    if(jobsData === null) {
        return (
            <LoadingSpinner></LoadingSpinner>
        )
    }


    return (
        <div className='joblist-container'>
            <SearchForm onSearch={onSearch}/>
            <h1>
                {searchTerm.length > 0 ?
                    `Search results for ${searchTerm}` :
                    "All Jobs"
                }
            </h1>
            {jobsData.length > 0 ?
                <JobCardList jobs={jobsData}></JobCardList> :
                <p className="no-results">Sorry, no results were found!</p>
            }
        </div>
    )
}

export {JobList};
export type {JobsDataFromAPI, JobDataFromAPI};