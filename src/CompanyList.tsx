import React from "react";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";


function CompanyList() {
    return (
        <>
            <SearchForm></SearchForm>
            <div>CompanyCard Component</div>
            <CompanyCard></CompanyCard>
        </>
    )
}

export default CompanyList;