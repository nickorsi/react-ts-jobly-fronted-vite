import { JobDataFromAPI } from "./JobList"

/**
 * JobCard component that renders information about a specific job.
 *
 * Takes {id, title, companyHandle, salary, equity} as props
 *
 * JobList -> JobCard
 */

function JobCard ({id, title, companyHandle, salary, equity}: JobDataFromAPI ) {
    return (
        <div id={`${id}`}>
            <div className="job-titles">
                <p>{ title }</p>
                <p>{ companyHandle }</p>
            </div>
            <div className="job-pay-info">
                <p>{ salary }</p>
                <p>{ equity }</p>
            </div>
        </div>
    )
}

export default JobCard