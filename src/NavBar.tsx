import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <NavLink
                to='/'
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }
            >
                Jobly
            </NavLink>
            <NavLink
                to='/companies'
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }
            >
                Companies
            </NavLink>
            <NavLink
                to='/jobs'
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }
            >
                Jobs
            </NavLink>
        </nav>
    )
}

export default NavBar;