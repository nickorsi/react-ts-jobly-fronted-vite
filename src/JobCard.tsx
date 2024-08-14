import { JobDataFromAPI } from "./JobList"
import './JobCard.css';

/**
 * JobCard component that renders information about a specific job.
 *
 * Takes {id, title, companyName, companyHandle salary, equity} as props
 *
 * JobList -> JobCard
 */

function JobCard ({id, title, companyName, salary, equity}: JobDataFromAPI ) {
    return (
        <div id={`${id}`} className="job card">
            <div className="job-titles">
                <p>Job Title: <span className='job-title'>{ title }</span></p>
                <p className='job-company'>Company: { companyName }</p>
            </div>
            <div className="job-pay-info">
                <p className='job-salary'>Salary: { salary }</p>
                <p className='job-equity'>Equity: { equity }</p>
            </div>
        </div>
    )
}

export default JobCard