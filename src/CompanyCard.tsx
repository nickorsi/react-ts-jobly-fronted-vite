import React from "react";
import { CompanyDataFromAPI } from "./CompanyList";

/**
 * CompanyCard component that renders information about the company.
 *
 * Takes props {handle, name, description, numEmployees, logoURL} as props
 *
 * CompanyList -> CompanyCard
 */
function CompanyCard(
    {handle, name, description, logoUrl}: CompanyDataFromAPI
) {
    console.debug(
        'CompanyCard',
        'handle=',
        handle,
        'name=',
        name,
        'description=',
        description,
        'logoURL',
        logoUrl
    )
    return (
        <a href={`companies/${handle}`}>
            <div className="company-card">
                <div className="company-brand">
                    <p>{ name }</p>
                    {
                        logoUrl === 'null' ?
                        null :
                        <img src={`${logoUrl}`} alt="company logo" />
                    }
                </div>
                <div className="company-info">
                    <p>{ description }</p>
                </div>
            </div>
        </a>
    )
}

export default CompanyCard;