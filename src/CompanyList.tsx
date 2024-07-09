import {useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";
import { CompanyDataToAPI, JoblyApi } from "./api";

type CompanyDataFromAPI = Omit<CompanyDataToAPI, 'handle'> & Required<Pick<CompanyDataToAPI, 'handle'>>;


type CompaniesDataFromAPI = CompanyDataFromAPI[];

/**
 * CompanyList componenet renders descendent componenets related to companies
 * and holds data related to companies in state. Retrieves data on mount.
 *
 * Rendered by RoutesList on /companies
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
                console.log("companies=", companies);
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

    if(companiesData === null) {
        return (
            <h2>Loading...</h2>
        )
    }

    if(errors.length > 0) {
        return (
            <>
                <h2>Oops, looks like something went wrong!</h2>
                {errors.map((er, i) => {
                    return (
                        <div key={i}>{er}</div>
                    )
                })}
            </>
        )
    }

    return (
        <>
            <SearchForm onSearch={onSearch}/>
            {searchTerm.length > 0 ?
                <p>Search results for "{searchTerm}"</p> :
                <p>All Companies</p>
            }
            {companiesData.length > 0 ?
                companiesData.map((company, i)=>{
                    console.log('company.logoURL=', company.logoUrl)
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
                <p>Sorry, no results found!</p>
            }
        </>
    )
}

export {CompanyList};
export type {CompanyDataFromAPI, CompaniesDataFromAPI};