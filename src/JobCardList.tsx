import JobCard from "./JobCard";
import { JobsDataFromAPI } from "./JobList";
import './JobCardList.css';

type JobCardListProps = {
    jobs: JobsDataFromAPI
};

/**
 * JobCardList componenet renders a list of JobCard components.
 *
 * Takes jobs as a prop {jobs: [id, title, companyHandle, salary, equity, ...]}
 *
 * {Company, JobList} -> JobCardList -> JobCard
 */

function JobCardList({jobs}: JobCardListProps) {
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
                        companyName={job.companyName}
                    ></JobCard>
                )
            })}
        </>
    )
}

export {JobCardList};
