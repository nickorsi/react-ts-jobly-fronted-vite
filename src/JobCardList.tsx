import React from "react";
import JobCard from "./JobCard";
import { JobDataToAPI } from "./api";

type JobDataFromAPI = {
    id: number
} & JobDataToAPI;

type JobsDataFromAPI = JobDataFromAPI[];


function JobCardList(jobs: JobsDataFromAPI) {
    return (
        <>
            {jobs.map((job) => {
                return (
                    <JobCard
                        key={job.id}
                        id={job.id}
                        title={job.title}
                        salary={job.salary}
                        equity={job.equity}
                        companyHandle={job.companyHandle}
                    ></JobCard>
                )
            })}
        </>
    )
}

export {JobCardList};

export type {JobDataFromAPI}