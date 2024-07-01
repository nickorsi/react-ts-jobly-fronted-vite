import React, { useState } from "react";


type SearchFormProps = {
    // initialSearchTerm: string,
    onSearch: ((param:string) => void),
}
/**
 * SearchForm component used to hold a simple text input and button.
 *
 * Takes prop to {initialSearchTerm, onSearch} that is the text in the input
 * and the function to run when the user searches.
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