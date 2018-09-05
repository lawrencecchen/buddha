import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import allYourBase from './components/allYourBase'
import Signup from './components/Signup'
import STSecured from './components/STSecured'
import STTV from './_st'

import '../sass/stApp.sass'

window._st = STTV

_st.loading = true

ReactDOM.render( 
    <BrowserRouter>
        <Switch>
            <Route exact path='/all-your-base-are-belong-to-us' component={allYourBase} />
            <Route exact path='/signup/:step?' component={Signup} />
            <Route exact path='/login' render={() => <Redirect to='/auth/token' />} />
            <Route path='/' render={(p) => <STSecured {...p} />} />
        </Switch>
    </BrowserRouter>,
document.getElementById('stApp') )