import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

const UnauthOnlyRoute = ({ authenticated, component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => {
      const to = { pathname: '/', state: { from: props.location } };
      return !authenticated
        ? <Component {...props} />
        : <Redirect to={to} />;
    }}
    />
  );
};

UnauthOnlyRoute.propTypes = {
  authenticated: false,
};

UnauthOnlyRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default R.compose(
  inject('session'),
  withRouter, // used to make mobx re-render
  observer,
)(({ session, ...rest }) =>
  <UnauthOnlyRoute {...rest} authenticated={session.authenticated} />);
