import React from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import PrivateRoute from './container/privateRoute'

import Login from './pages/login'
import Home from './pages/home'
import EventCreate from './pages/events/create'


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/events/create" component={EventCreate} />
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
)

export default Routes