import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ProtectedRoute({ children, component: Component, ...rest }) {
  const user = useSelector(state => state.auth.user)
  const generalLoading = useSelector((state) => state.general.generalLoading)

  if (!generalLoading) {
    return user
    ? (<Route {...rest} component={Component} />)
    : (<Redirect to={'/'} />)
  }
  else
    return null;
}

export default ProtectedRoute