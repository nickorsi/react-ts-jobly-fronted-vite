import {useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";
import LoadingSpinner from "./LoadingSpinner";
import { CompanyDataToAPI, JoblyApi } from "./api";
import './CompanyList.css';

type CompanyDataFromAPI = Omit<CompanyDataToAPI, 'handle'> & Required<Pick<CompanyDataToAPI, 'handle'>>;


type CompaniesDataFromAPI = CompanyDataFromAPI[];

/**
 * CompanyList componenet renders descendent componenets related to companies
 * and holds data related to companies in state. Retrieves data on mount.
 *
 * Rendered by RoutesList on the /companies path
 *
 * RoutesList -> CompanyList -> { SearchForm, CompanyCard }
 */
function CompanyList() {
    const [companiesData, setCompaniesData] = useState<CompaniesDataFromAPI | null>(null);
    const [errors, setErrors] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(function() {
        async function retrieveCompanyData() {
            let companies;
            try {
                companies = await JoblyApi.getCompanies(searchTerm);
                // console.log("companies=", companies);
                setCompaniesData(companies);
                setErrors([]);
            } catch (error) {
                setErrors(error as string[]);
            }
        }
        retrieveCompanyData();
    }, [searchTerm]);

    function onSearch(search: string) {
        setSearchTerm(search);
    }

    if(errors.length > 0) {
        return (
            <LoadingSpinner></LoadingSpinner>
        )
    }

    if(companiesData === null) {
        return (
            <div className="spinner d-flex align-items-center">
                <div className="spinner-border me-3 text-light" aria-hidden="true"></div>
                <strong className="text-light" role="status">Loading...</strong>
            </div>
        )
    }


    return (
        <div className="companylist-container">
            <SearchForm onSearch={onSearch}/>
            <h1>
                {searchTerm.length > 0 ?
                    `Search results for ${searchTerm}` :
                    "All Companies"
                }
            </h1>
            {companiesData.length > 0 ?
                companiesData.map((company, i)=>{
                    return (
                        <CompanyCard
                            key={`${i}`}
                            handle={`${company.handle}`}
                            name={`${company.name}`}
                            description={`${company.description}`}
                            logoUrl={`${company.logoUrl}`}
                            numEmployees={company.numEmployees}
                        />
                    )
                }) :
                <p className="no-results">Sorry, no results found!</p>
            }
        </div>
    )
}

export {CompanyList};
export type {CompanyDataFromAPI, CompaniesDataFromAPI};