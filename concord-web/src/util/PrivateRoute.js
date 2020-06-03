import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function PrivateRoute({ children, allowed, redirectTo = '/login', ...props }) {
    return (
        <Route
            {...props}
            render={({ location }) =>
                allowed ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: redirectTo,
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    )
}
