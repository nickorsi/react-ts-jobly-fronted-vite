import React, { useState, useEffect } from "react";
import { JobCardList } from "./JobCardList";
import SearchForm from "./SearchForm";
import { JobDataToAPI, JoblyApi } from "./api";

type JobDataFromAPI = {
    id: number
} & JobDataToAPI;

type JobsDataFromAPI = JobDataFromAPI[];

// type JobsDataState = {
//     jobs: JobsDataFromAPI,
//     isLoading: boolean
// }

// const initialJobsData: JobsDataState = {
//     jobs: [],
//     isLoading: true
// };
/**
 * JobList container renders descendent componenets related to jobs and holds
 * data related to jobs in state. Retrieves data on mount.
 *
 * Rendered by RoutesList on /jobs
 *
 * RoutesList -> JobList -> { SearchForm, JobCardList }
 */

function JobList() {

    const [jobsData, setJobsData] = useState<JobsDataFromAPI>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(function() {
        async function retrieveJobData() {
            let res;
            try {
                res = await JoblyApi.getJobs();
                setJobsData(res);
                setErrors([]);
            } catch (error) {
                setErrors(error as string[]);
            }
            setIsLoading(false);
        }
        retrieveJobData();
    }, []);

    if(isLoading) {
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
            <SearchForm></SearchForm>
            <div>JobList Componenet</div>
            <JobCardList jobs={jobsData}></JobCardList>
        </>
    )
}

export {JobList};
export type {JobsDataFromAPI, JobDataFromAPI};