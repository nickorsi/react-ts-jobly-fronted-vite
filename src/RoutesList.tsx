import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import CompanyList from "./CompanyList"
import Company from "./Company"
import JobList from "./JobList"
import NotFound from "./NotFound"

function RoutesList() {
    return (
        <Routes>
            <Route path='/' element={ <Home/> }></Route>
            <Route path='companies' element={ <CompanyList/> }></Route>
            <Route path='companies/:companyId' element={ <Company/> }></Route>
            <Route path='jobs' element={ <JobList/> }></Route>
            <Route path='*' element={ <NotFound/>}></Route>
        </Routes>
    )
}

export default RoutesList;