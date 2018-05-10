const AuthController = require('../controller/Auth');
const UserController = require('../controller/User');
const CategoryController = require('../controller/Category');
const PostsCategoryController = require('../controller/PostsCategories');
const EmailController = require('../controller/Email');
const jwtAuth = require('../middleware/jwtAuth');

// Reporting async errors *must* go through `next()
const authRoutes = app => {
  app.post('/auth/authenticate', AuthController.authenticate);
  app.post('/auth/authenticate-with-token', jwtAuth, AuthController.authenticateWithToken);
  app.put('/auth/activate-account/:token', AuthController.activateAccount);
  app.post('/auth/send-activation-email', AuthController.sendActivationEmail);
  app.post('/auth/send-reset-password-email', AuthController.sendResetPasswordEmail);
};

const userRoutes = app => {
  app.get('/users', UserController.get);
  app.post('/users/create', UserController.create);
  app.put('/users/edit/:id', UserController.edit);
  app.put('/users/edit-password/:token', UserController.editPassword);
  app.delete('/users/delete/:id', UserController.remove);
};

const postRoutes = app => {
  app.get('/posts', PostsCategoryController.get);
  app.post('/posts/create', jwtAuth, PostsCategoryController.create);
  app.put('/posts/edit/:id', jwtAuth, PostsCategoryController.edit);
  app.delete('/posts/delete/:id', jwtAuth, PostsCategoryController.remove);
};

const categoryRoutes = app => {
  app.get('/categories', CategoryController.get);
  app.post('/categories/create', jwtAuth, CategoryController.create);
  app.put('/categories/edit/:id', jwtAuth, CategoryController.edit);
  app.delete('/categories/delete/:id', jwtAuth, CategoryController.remove);
};

// todo: remove this test and handle this on the e-mail tests by creating a
// new mock express app.
const email = app => {
  app.post('/email', EmailController.test);
};

module.exports = app => {
  authRoutes(app);
  userRoutes(app);
  postRoutes(app);
  categoryRoutes(app);
  email(app);
};
