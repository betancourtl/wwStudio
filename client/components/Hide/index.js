import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

@inject('session')
@withRouter
@observer
class HideIfAuthorized extends Component {
  render() {
    const { session } = this.props;

    if (session.authenticated) {
      return null
    }

    return (
      this.props.children
    );
  }
}

@inject('session')
@withRouter
@observer
class HideIfNotAuthorized extends Component {
  render() {
    const { session } = this.props;

    if (!session.authenticated) {
      return null
    }

    return (
      this.props.children
    );
  }
}


export {
  HideIfAuthorized,
  HideIfNotAuthorized
}
