import React, { Component } from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Draft from '../../../components/Draft';

class View extends Component {
  componentWillMount() {
    const { id } = this.props.match.params;
    if (id) {
      console.log('getting post');
      this
        .props.post
        .getPost(id)
        .then(this.props.post.saveToView)
        .catch(err => {
          this.props.history.replace('/blog');
        });
    }
  };

  render() {
    console.log(this.props.match.params);
    return (
      <div className="blog-create-page">
        View
        <h1>{this.props.post.view.title}</h1>
        <Draft
          readOnly
          editorState={this.props.post.view.editorState}
        />
      </div>
    );
  };
}

View.propTypes = {};

View.defaultProps = {};

export default R.compose(
  inject('post'),
  withRouter,
  observer,
)(View);
