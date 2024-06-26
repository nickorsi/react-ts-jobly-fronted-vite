import React from "react";
import JobCardList from "./JobCardList";
import SearchForm from "./SearchForm";

function JobList() {
    return (
        <>
            <SearchForm></SearchForm>
            <div>JobList Componenet</div>
            <JobCardList></JobCardList>
        </>
    )
}

export default JobList