import React, { useState } from "react";
import './SearchForm.css';


type SearchFormProps = {
    onSearch: ((param:string) => void),
}
/**
 * SearchForm component used to hold a simple text input and button.
 *
 * Takes a callback function onSearch that runs when the user searches. Note the
 * actually search work does not happen in this component, it just retains the
 * state for the search term and passes it upstream.
 *
 * {JobList, CompanyList} -> SearchForm
 */
function SearchForm({onSearch}: SearchFormProps) {
    const [searchTerm, setSearchTerm] = useState("");

    function handleSearch(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        setSearchTerm(searchTerm.trim());
        onSearch(searchTerm.trim());
    }
    return (
        <div className="search-bar">
            <form action="GET" className="search-bar-form">
                <input
                    data-testid="search-bar-input"
                    type="text"
                    placeholder="Enter a search term..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    data-testid="search-bar-submit"
                    className="btn btn-primary"
                    type="submit"
                    onClick={handleSearch}
                >Search</button>
            </form>
        </div>
    )
}

export default SearchForm;