import React, { useState } from "react";


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
        <div>
            <form action="GET" >
                <input
                    type="text"
                    placeholder="Enter a search term..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" onClick={handleSearch}>Search</button>
            </form>
        </div>
    )
}

export default SearchForm;