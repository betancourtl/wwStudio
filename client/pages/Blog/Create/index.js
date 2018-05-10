import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PostForm from '../../../components/forms/PostForm/PostForm';

@inject('post', 'category')
@observer
class CreatePostForm extends Component {
  componentWillMount() {
  }

  render() {
    return (
      <PostForm
        fetchAllCategories={this.props.category.getCategories}
        categoryValues={this.props.post.getCreateCategories}
        title={this.props.post.create.title}
        changeTitle={e => this.props.post.changeCreateTitle(e.target.value)}
        editorState={this.props.post.create.editorState}
        changeEditorState={this.props.post.updateCreateEditorState}
        onSubmit={this.props.post.createPost}
        changeCategories={this.props.post.changeCreateCategories}
        categories={this.props.category.categories}
      />
    );
  };
}

export default CreatePostForm
