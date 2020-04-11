import React from "react";

import { Route, Redirect } from 'react-router-dom'

import PrivateLayout from '../layout/privateLayout'
import { isAuthenticated } from '../../services/auth'


const PrivateRoute = ({ component: Component, ...rest }) => (
    <PrivateLayout>
        <Route
            {...rest}
            render={props =>
                isAuthenticated() ? (
                    <Component {...props} />
                ) : (
                        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                    )
            }
        />
    </PrivateLayout>
);


export default PrivateRoute