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
    {handle, name, description, logoURL}: CompanyDataFromAPI
) {
    return (
        <a href={`companies/${handle}`}>
            <div className="company-card">
                <div className="company-titles">
                    <p>{ name }</p>
                    <img src={`${logoURL}`} alt="company logo" />
                </div>
                <div className="company-info">
                    <p>{ description }</p>
                </div>
            </div>
        </a>
    )
}

export default CompanyCard;