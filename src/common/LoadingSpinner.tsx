import "./LoadingSpinner.css";

/**
 * LoadingSpinner component renders a dynamic spinner using bootstrap resources
 *
 * Rendered by main pages requiring an api call to load the content
 *
 * {Company, CompanyList, JobList} -> LoadingSpinner
 */

function LoadingSpinner() {
    return (
        <div className="spinner d-flex align-items-center">
            <div
                className="spinner-border me-3 text-light"
                aria-hidden="true"
            ></div>
            <strong className="text-light" role="status">Loading...</strong>
        </div>
    )
}

export default LoadingSpinner;