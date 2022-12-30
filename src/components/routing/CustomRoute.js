import React, { useMemo } from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Container } from './CustomRouteStyle'
import { withOidcSecure } from '@axa-fr/react-oidc-context'

function PrivateRoute({ component: Component, exact, path }) {
  const SecuredComponent = useMemo(() => withOidcSecure(Component), [Component])

  return useMemo(() => <Route exact={exact} path={path} component={SecuredComponent} />, [SecuredComponent, exact, path])
}

PrivateRoute.propTypes = {
  component: PropTypes.func,
  exact: PropTypes.bool,
  path: PropTypes.string
}

function CustomRoute({ isPrivate, fullWidth, ...props }) {
  return <Container fullWidth={fullWidth}>{isPrivate ? <PrivateRoute {...props} /> : <Route {...props} />}</Container>
}

CustomRoute.defaultProps = {
  isPrivate: true,
  fullWidth: false
}

CustomRoute.propTypes = {
  component: PropTypes.func,
  exact: PropTypes.bool,
  isPrivate: PropTypes.bool,
  fullWidth: PropTypes.bool,
  path: PropTypes.string
}

export default CustomRoute
