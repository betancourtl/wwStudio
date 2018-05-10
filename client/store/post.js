import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { extendObservable, action, computed, runInAction } from 'mobx';
import { createPost, getPosts, updatePost, deletePost } from '../api/post';

class Post {
  static storeName = 'post';

  constructor() {
    extendObservable(this, {
      create: {
        title: '',
        editorState: EditorState.createEmpty(),
        category_ids: [],
      },
      edit: {
        id: '',
        title: '',
        editorState: EditorState.createEmpty(),
        category_ids: [],
      },
      view: {
        id: '',
        title: '',
        editorState: EditorState.createEmpty(),
        category_ids: [],
      },
      posts: [],
      meta: {
        query: {
          page: 1,
          limit: 5,
        },
        meta: {
          total: 0,
          totalPages: 0,
          offset: 0,
          count: 0,
          start: 0,
          end: 0,
        },
      }
    });
  }

  @action.bound changeLimit(limit) {
    const newQuery = { ...this.meta.query, limit, };
    this.getPosts(newQuery);
  }

  // editorState
  @action.bound updateCreateEditorState(editorState) {
    this.create.editorState = editorState;
  };

  @action.bound updateEditEditorState(editorState) {
    this.edit.editorState = editorState;
  };

  // title
  @action.bound changeCreateTitle(title) {
    this.create.title = title;
  };

  @action.bound changeEditTitle(title) {
    this.edit.title = title;
  };

  // categories
  @action.bound changeCreateCategories(category_ids) {
    this.create.category_ids = category_ids;
  };

  @action.bound changeEditCategories(category_ids) {
    this.edit.category_ids = category_ids;
  };

  @action.bound createPost() {
    createPost({
      category_ids: this.create.category_ids,
      user_id: this.rootStore.session.id,
      title: this.create.title,
      content: JSON.stringify(convertToRaw(this.create.editorState.getCurrentContent())),
    })
      .then(post => {
        runInAction(() => {
          this.create.title = '';
          this.create.editorState = EditorState.createEmpty();
        });
      }).catch(err => {
      console.log('Error', err);
    })
  }

  @action.bound updatePost() {
    updatePost({
      category_ids: this.edit.category_ids,
      id: this.edit.id,
      title: this.edit.title,
      content: JSON.stringify(convertToRaw(this.edit.editorState.getCurrentContent())),
    }).then(res => {
      console.log('Post has been updated!');
    }).catch(err => {
      console.log('Error', err);
    })
  }

  @action.bound getPosts(query) {
    getPosts(query)
      .then(posts => {
        runInAction(() => {
          this.posts = posts.posts;
          this.meta = posts.meta;
        });
      })
      .catch(err => {
        console.log('Error', err);
      });
  }

  @action.bound getPost(id) {
    return getPosts({ id })
      .then((post) => {
        const [firstPost] = post.posts;
        if (!firstPost) return Promise.reject();
        return firstPost;
      })
  }

  @action.bound deletePost(id) {
    return deletePost(id)
      .then(res => {
        console.log('ok removed');
      }).catch(err => {
        console.log('not removed');
      })
  }

  @action.bound saveToView(post) {
    const contentState = convertFromRaw(JSON.parse(post.content));
    const editorState = EditorState.createWithContent(contentState);
    this.view.id = post.id;
    this.view.title = post.title;
    this.view.editorState = editorState;
    this.view.category_ids = post.categories.map(x => x.id);
  }

  @action.bound saveToEdit(post) {
    const contentState = convertFromRaw(JSON.parse(post.content));
    const editorState = EditorState.createWithContent(contentState);
    this.edit.id = post.id;
    this.edit.title = post.title;
    this.edit.editorState = editorState;
    this.edit.category_ids = post.categories.map(x => x.id);
  }

  @computed get getCreateCategories() {
    return this.create.category_ids.toJS();
  }

  @computed get getEditCategories() {
    return this.edit.category_ids.toJS();
  }

  @action.bound firstPage() {
    // will automatically set the page
    this.getPosts({ page: 1, limit: this.meta.query.limit });
  }

  @action.bound nextPage() {
    // will automatically set the page
    const nextPage = Number(this.meta.query.page) + 1;
    if (nextPage <= this.meta.meta.totalPages) {
      this.getPosts({ page: nextPage, limit: this.meta.query.limit });
    }
  }

  @action.bound prevPage() {
    // will automatically set the page
    const prevPage = Number(this.meta.query.page) - 1;
    if (prevPage >= 1) {
      this.getPosts({ page: prevPage, limit: this.meta.query.limit });
    }
  }

  @action.bound toPage(page) {
    // will automatically set the page
    this.getPosts({ page, limit: this.meta.query.limit });
  }

  @action.bound lastPage() {
    // will automatically set the page
    const lastPage = this.meta.meta.totalPages;
    this.getPosts({ page: lastPage, limit: this.meta.query.limit });
  }
}

export default Post;
const storeName = Post.storeName;

export {
  storeName,
}
