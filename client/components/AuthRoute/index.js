import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

const AuthRoute = ({ authenticated, component: Component, render: RenderComponent, ...rest }) => {
  return (
    <Route {...rest} render={props => {
      if (!authenticated) return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
      if (Component) return <Component {...props} />;
      if (RenderComponent) return <RenderComponent {...props} />;
      return <p>Error:</p>
    }}
    />
  );
};

AuthRoute.defaultProps = {
  authenticated: false,
};

AuthRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default R.compose(
  inject('session'),
  withRouter, // used to make mobx re-render
  observer,
)(({ session, ...rest }) =>
  <AuthRoute {...rest} active={session.active} authenticated={session.authenticated} />);
