const request = require('supertest');
const app = require('../../../app');
const postModel = require('../../model/Post');
const userModel = require('../../model/User');
const categoryModel = require('../../model/Category');

describe('PostCategoryModel', () => {
  const category1 = categoryModel.create({
    name: 'javascript',
  });

  const category2 = categoryModel.create({
    name: 'PHP',
  });

  const category3 = categoryModel.create({
    name: 'MongoDB',
  });

  const user1 = userModel.create({
    email: 'webdeveloperpr@gmail.com',
    password: '123123123',
    confirmPassword: '123123123'
  });

  const post1 = postModel.create({
    title: 'This is Post 1',
    content: 'Post 1 content',
  });

  const post2 = postModel.create({
    title: 'This is post 2',
    content: 'Post 2 content',
  });

  const createUser = user => {
    return request(app)
      .post('/users/create')
      .send(user)
      .then(res => res)
  };

  const createCategory = (category, token) => {
    return request(app)
      .post('/categories/create')
      .set('authorization', token)
      .send(category)
      .then(res => res)
  };

  const insertPostWithCategories = (category_ids = [], user_id, post) => {
    return request(app)
      .post('/posts/create')
      .send({ category_ids, ...post, user_id })
      .set('authorization', lastUserToken)
      .then(res => res)
  };

  let db_category_ids = [];
  let lastUser;
  let lastUserToken;
  beforeEach(done => {
    createUser(user1)
      .then(res => {
        const { user, token } = res.body;
        lastUser = user;
        lastUserToken = token;
        // Create the categories so we can add them to a post
        return Promise.all([
          createCategory(category1, token),
          createCategory(category2, token),
          createCategory(category3, token),
        ])
          .then(categories => {
            // get the category id's we se can attach them to a post
            db_category_ids = categories.map(x => x.body.id);
            done();
          })
      });
  });

  it('should create a post with it\'s categories and return the post with categories',
    done => {
      insertPostWithCategories(db_category_ids, lastUser.id, post1)
        .then(res => {
          const [firstPost] = res.body.posts;
          expect(firstPost.categories.length).to.equal(3);
          done();
        });
    });

  it('should get all posts matching query with it\'s categories',
    done => {
      Promise.all([
        insertPostWithCategories(db_category_ids, lastUser.id, post1),
      ])
        .then(res => {
          return request(app)
            .get(`/posts`)
            .send()
            .then(res => {
              const posts = res.body.posts;
              const [firstPost] = posts;

              expect(posts.length).to.equal(1);
              expect(firstPost.title).to.equal(post1.title);
              done();
            })
        });
    });

  it('should get all posts matching empty query with it\'s categories',
    done => {
      Promise.all([
        insertPostWithCategories(db_category_ids, lastUser.id, post1),
        insertPostWithCategories([], lastUser.id, post2),
      ])
        .then(res => {
          return request(app)
            .get(`/posts`)
            .send()
            .then(res => {
              const posts = res.body.posts;
              expect(posts.length).to.equal(2);
              done();
            })
        });
    });

  it('should edit a post and return the new post with categories', done => {
    insertPostWithCategories(db_category_ids, lastUser.id, post1)
      .then(res => {
        const [firstPost] = res.body.posts;
        const post_id = firstPost.id;
        // update the post categories
        const category_ids = db_category_ids
          .slice(0, 2)
          .sort((a, b) => a - b);
        request(app)
          .put(`/posts/edit/${post_id}`)
          .set('authorization', lastUserToken)
          .send({ category_ids, title: 'Title Changed' })
          .then(res => {
            const [firstPost] = res.body.posts;
            expect(firstPost.title).to.equal('Title Changed');
            done();
          })
      });
  });

  it('should remove a post and it\s categories', done => {
    insertPostWithCategories(db_category_ids, lastUser.id, post1)
      .then(res => {
        const [firstPost] = res.body.posts;
        const post_id = firstPost.id;
        // update the post categories
        request(app)
          .delete(`/posts/delete/${post_id}`)
          .set('authorization', lastUserToken)
          .then(res => {
            done();
          })
      });
  });
});