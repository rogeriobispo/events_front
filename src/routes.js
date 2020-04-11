import React from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import PrivateRoute from './container/privateRoute'

import Login from './pages/login'
import Home from './pages/home'


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/user" component={() => <h1>SignUp</h1>} />
            <PrivateRoute path="/home" component={Home} />
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
)

export default Routes