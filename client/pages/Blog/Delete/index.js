import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { inject, observer } from 'mobx-react';

class Delete extends Component {
  componentWillMount() {
    console.log('Delete!');
    const { id } = this.props.match.params;
    this.props.post.deletePost(id)
      .then(res => {
        this.props.history.push('/blog');
      });
  }

  render() {
    return (
      <div className="blog-delete-page">
        Delete Page
      </div>
    );
  };
}

Delete.propTypes = {};

Delete.defaultProps = {};

export default R.compose(
  inject('post'),
  observer,
)(Delete);