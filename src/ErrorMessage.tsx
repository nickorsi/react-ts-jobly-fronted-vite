import "./ErrorMessage.css";

/**
 * ErrorMessage component that renders a graceful error message to the user.
 *
 * Take props {errors}, with errors being an array of string error messages.
 *
 * {CompanyList, JobList, Company} -> ErrorMessage
 */
function ErrorMessage({ errors }: {'errors': string[]}) {
    return (
        <div className="error-container">
            <h2>Oops!</h2>
            <p>Looks like something went wrong:
            {errors.map((er, i, arr) => {
                return i + 1 !== arr.length ?
                    (<span key={i}> {er},</span>) :
                    (<span key={i}> {er}</span>)
            })}
            </p>
        </div>
    )
};

export default ErrorMessage;