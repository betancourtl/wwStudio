const app = require('../../../app');
const categoryModel = require('../../model/Category');
const userModel = require('../../model/User');
const request = require('supertest');

describe('CategoryController', () => {
  const category1 = categoryModel.create({
    name: 'javascript',
  });

  const category2 = categoryModel.create({
    name: 'PHP',
  });

  const user1 = userModel.create({
    email: 'webdeveloperpr@gmail.com',
    password: '123123123',
    confirmPassword: '123123123'
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

  let user;
  let token;
  beforeEach(done => {
    createUser(user1)
      .then(res => {
        user = res.body.user;
        token = res.body.token;
        done();
      })
  });

  it('should create a category', done => {
    createCategory(category1, token)
      .then(res => {
        const { name } = res.body;
        expect(name).to.equal('javascript');
        done();
      })
      .catch(err => {
        console.log(err);
      });
  });

  it('should get all categories matching query', done => {
    Promise
      .all([
        createCategory(category1, token),
        createCategory(category2, token)
      ])
      .then(([firstCategory]) => {
        request(app)
          .get(`/categories?id=${firstCategory.body.id}`)
          .send()
          .end((err, res) => {
            expect(res.body.length).to.equal(1);
            done();
          });
      })
  });

  it('should should get all categories', done => {
    Promise
      .all([
        createCategory(category1, token),
        createCategory(category2, token),
      ])
      .then(() => {
        request(app)
          .get('/categories')
          .send()
          .end((err, res) => {
            expect(res.body.length).to.equal(2);
            done();
          });
      })
  });

  it('should throw an error when the wrong query is sent', (done) => {
    Promise
      .all([
        createCategory(category1, token),
        createCategory(category2, token)
      ])
      .then(([firstCategory]) => {
        request(app)
          .get(`/categories?test=asdf}`)
          .send()
          .end((err, res) => {
            expect(res.body).to.deep.equal({ category: 'Error fetching categories.' });
            done();
          });
      })
  });

  it('should update a category', done => {
    createCategory(category1, token)
      .then(res => {
        const { id } = res.body;
        request(app)
          .put(`/categories/edit/${id}`)
          .set('authorization', token)
          .send({ name: 'NodeJS' })
          .end((err, res) => {
            const { name } = res.body;
            expect(name).to.equal('NodeJS');
            done();
          });
      });
  });

  it('should throw an error when incorrect update is applied', done => {
    createCategory(category1, token)
      .then(res => {
        const { id } = res.body;
        request(app)
          .put(`/categories/edit/${id}`)
          .set('authorization', token)
          .send({ randomKey: 'invalid' })
          .end((err, res) => {
            expect(res.body).to.deep.equal({
              category: 'Error Updating category'
            });
            done();
          });
      });
  });

  it('should remove a category', done => {
    createCategory(category1, token)
      .then(res => {
        const { id } = res.body;
        request(app)
          .delete(`/categories/delete/invalid`)
          .set('authorization', token)
          .send()
          .end((err, res) => {
            expect(res.body).to.deep.equal({
              category: 'Error Deleting category'
            });
            done();
          });
      });
  });
});