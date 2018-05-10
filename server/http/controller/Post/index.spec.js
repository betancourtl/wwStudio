const request = require('supertest');
const app = require('../../../app');
const postModel = require('../../model/Post');
const userModel = require('../../model/User');
const postController = require('./');

describe('PostController', () => {
  const post = postModel.create({
    title: 'Hello world',
    content: 'Content',
  });

  const createUser = user => {
    return request(app)
      .post('/users/create')
      .send(user)
      .then(res => res)
  };

  const user1 = userModel.create({
    email: 'webdeveloperpr@gmail.com',
    first_name: 'Luis',
    last_name: 'Betancourt',
    password: '123qweasd',
  });

  let user;
  beforeEach(done => {
    createUser(user1)
      .then(newUser => {
        user = newUser.body.user;
        done();
      });
  });

  it('should create a post', done => {
    const newPost = postModel.create({ ...post, user_id: user.id });
    postController.createPost(newPost)
      .then(post_id => {
        expect(post_id).to.equal(1);
        done();
      })
  });

  it('should return the total count of posts', done => {
    const newPost = postModel.create({ ...post, user_id: user.id });
    Promise
      .all(Array(1).fill('').map(() => postController.createPost(newPost)))
      .then(() => {
        postController.getPosts({ page: 1, limit: 10, })
          .then(([posts, metadata]) => {
            expect(metadata.query.page).to.equal(1);
            expect(metadata.query.limit).to.equal(10);
            expect(metadata.meta.total).to.equal(1);
            expect(metadata.meta.offset).to.equal(0);
            expect(metadata.meta.count).to.equal(1);
            expect(metadata.meta.start).to.equal(0);
            expect(metadata.meta.end).to.equal(1);
            expect(metadata.meta.totalPages).to.equal(1);
            done();
          })
      })
  });

  it('should return the total count of posts', done => {
    const newPost = postModel.create({ ...post, user_id: user.id });
    Promise
      .all(Array(15).fill('').map(() => postController.createPost(newPost)))
      .then(() => {
        postController.getPosts({ page: 2, limit: 10, })
          .then(([posts, metadata]) => {
            expect(metadata.query.page).to.equal(2);
            expect(metadata.query.limit).to.equal(10);
            expect(metadata.meta.total).to.equal(15);
            expect(metadata.meta.offset).to.equal(10);
            expect(metadata.meta.count).to.equal(5);
            expect(metadata.meta.start).to.equal(10);
            expect(metadata.meta.end).to.equal(15);
            expect(metadata.meta.totalPages).to.equal(2);
            done();
          }).catch(err => {
            return Promise.reject();
            done();
        })
      })
  });

  it('should get all posts matching query', done => {
    const newPost = postModel.create({ ...post, user_id: user.id });
    Promise
      .all([
        postController.createPost(newPost),
        postController.createPost(newPost)
      ]).then(([post_id1, post_id2]) => {
      postController.getPosts({ id: post_id2 })
        .then(([posts]) => {
          expect(posts.length).to.equal(1);
          done();
        })
    })
  });

  it('should should get all posts', done => {
    const newPost = postModel.create({ ...post, user_id: user.id });
    Promise
      .all([
        postController.createPost(newPost),
        postController.createPost(newPost)
      ]).then(() => {
      postController.getPosts()
        .then(([posts]) => {
          expect(posts.length).to.equal(2);
          done();
        })
    })
  });

  it('should update a post', done => {
    const newPost = postModel.create({ ...post, user_id: user.id });
    postController.createPost(newPost)
      .then(post_id => {
        postController.editPost(post_id, user.id, { title: 'New title' })
          .then(res => {
            postController.getPosts({ id: post_id })
              .then(([[firstPost] = posts]) => {
                expect(firstPost.title).to.equal('New title');
                done();
              });
          });
      });
  });

  it('should remove a post', done => {
    const newPost = postModel.create({ ...post, user_id: user.id });
    postController.createPost(newPost)
      .then(post_id => {
        postController.removePost(post_id, user.id)
          .then(() => {
            postController.getPosts({ id: post_id })
              .then(([posts]) => {
                expect(posts.length).to.equal(0);
                done();
              });
          });
      });
  });
});
