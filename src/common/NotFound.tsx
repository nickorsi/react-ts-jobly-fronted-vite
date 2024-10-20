import "./NotFound.css";

/**
 * NotFound componenet with generic message for users that have reached a URL
 * that is not mapped to a specific path.
 *
 * RoutesList -> NotFound
 */
function NotFound() {
    return (
        <div className="not-found card">
            <h2>Sorry! 😅</h2>
            <p>Looks like that page doesn't exist!</p>
            <p>Please check out the rest of our site with the links above!</p>
        </div>
    )
}

export default NotFound;