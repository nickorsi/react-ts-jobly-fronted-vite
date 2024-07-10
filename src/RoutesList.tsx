import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import { CompanyList } from "./CompanyList"
import { Company } from "./Company"
import { JobList } from "./JobList"
import NotFound from "./NotFound"

/**
 * RoutesList componenet relying on the react-dom-router dependency.
 *
 * Maps componenets to relevant paths on the client side to mimic the
 * URL behavior of traditional html rendering sites.
 *
 * App -> RoutesList -> {Home, CompanyList, JobList, NotFound}
 */
function RoutesList() {
    return (
        <Routes>
            <Route path='/' element={ <Home/> }></Route>
            <Route path='companies' element={ <CompanyList/> }></Route>
            <Route path='companies/:companyHandle' element={ <Company/> }></Route>
            <Route path='jobs' element={ <JobList/> }></Route>
            <Route path='*' element={ <NotFound/>}></Route>
        </Routes>
    )
}

export default RoutesList;