import PostForm from '../../../components/forms/PostForm/PostForm'
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('post', 'category')
@observer
class EditPostForm extends Component {
  componentWillMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.props.post
        .getPost(id)
        .then(this.props.post.saveToEdit)
        .catch(err => {
          this.props.history.replace('/blog');
        });
    }
  };

  render() {
    return (
      <PostForm
        fetchAllCategories={this.props.category.getCategories}
        categoryValues={this.props.post.getEditCategories}
        title={this.props.post.edit.title}
        changeTitle={e => this.props.post.changeEditTitle(e.target.value)}
        editorState={this.props.post.edit.editorState}
        changeEditorState={this.props.post.updateEditEditorState}
        onSubmit={this.props.post.updatePost}
        changeCategories={this.props.post.changeEditCategories}
        categories={this.props.category.categories}
        submitBtnText="Update Post"
      />
    );
  };
}

export default EditPostForm
