import React from "react";
import { NavLink } from "react-router-dom";
import './NavBar.css';

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <NavLink
                    to='/'
                    className={({ isActive, isPending }) =>
                        isPending ?
                            "pending navbar-brand ms-3" :
                            isActive ?
                                "active navbar-brand ms-3" :
                                "navbar-brand ms-3"
                    }
                >
                    Jobly 💼
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item mx-5">
                            <NavLink
                                to='/companies'
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "active" : ""
                                }
                            >
                                Companies
                            </NavLink>
                        </li>
                        <li className="nav-item mx-5">
                            <NavLink
                                to='/jobs'
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "active" : ""
                                }
                            >
                                Jobs
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;