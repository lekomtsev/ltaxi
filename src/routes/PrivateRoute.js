import React from 'react'
import { Route, Redirect } from 'react-router'
import PropTypes from 'prop-types'

export const PrivateRoute = ({ component: Component }) => (
  localStorage.getItem('user')
    ? <Route path="/" component={Component} />
    : <Redirect to={{ pathname: '/login' }} />
)

PrivateRoute.propTypes = {
  component: PropTypes.object
}

