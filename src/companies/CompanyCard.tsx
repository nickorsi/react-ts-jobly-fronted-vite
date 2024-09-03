import React from "react";
import { CompanyDataFromAPI } from "./CompanyList";
import './CompanyCard.css';
import { Link } from 'react-router-dom'

/**
 * CompanyCard component that renders information about the company.
 *
 * Takes props {handle, name, description, numEmployees, logoURL} as props
 *
 * CompanyList -> CompanyCard
 */
function CompanyCard(
    {handle, name, description, numEmployees, logoUrl}: CompanyDataFromAPI
) {

    return (
        <Link className="company card" to={`${handle}`} data-testid="company-link">
            <div className="company-info">
                <div className="company-brand">
                    <p>{ name }</p>
                    {
                        logoUrl === 'null' ? //Comparing to null string, passed as prop
                        null :
                        <img src={`${logoUrl}`} alt="company logo" />
                    }
                </div>
                <p>{ description }</p>
            </div>
        </Link>
    )
}

export default CompanyCard;