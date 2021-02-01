import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom';

//components
import Employees from '../Employess/index'
import Company from '../Company/index'
import Datatable from '../Datatable/index'
import CompanyList from '../CompanyList/index'
import LoginPage from '../LoginPage/index'
import RegisterPage from '../RegisterPage/index'

const Routes=()=>{
    return(
        <main>
            <BrowserRouter>
        <Switch>
        <Route exact path="/" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />

        <Route exact path="/Datatable" component={Datatable} />
        <Route exact path="/employees" component={Employees} />
        <Route exact path="/companies" component={Company} />
        <Route exact path='/list' component={CompanyList}/>
      </Switch>
      </BrowserRouter>
      </main>
    )
}
export default Routes;