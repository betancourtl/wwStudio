const knex = require('../../../config/knex');
const userModel = require('../../model/User');
const userController = require('../../controller/User');
const emailController = require('../../controller/Email');
const { RouteError } = require('../../errors');
const { catchAsyncErrors, throwAsRouteError } = require('../../../utils');

const authenticate = catchAsyncErrors((req, res) => {
  const { email, password } = req.body;
  return throwAsRouteError({
    email: 'E-mail may be incorrect',
    password: 'Password may be incorrect',
    },
    knex(userModel.name)
      .where({ email })
      .then(([user]) => {

        if (!user) throw new RouteError({
          status: 401,
          email: 'E-mail does not exist',
        });

        let hash;

        try {
          const result = userModel.saltHashPassword({
            password,
            salt: user.salt
          });

          hash = result.hash;
        } catch (err) {
          throw new RouteError({
            status: 401,
            password: 'Invalid Password',
          });
        }

        if (hash !== user.password) throw new RouteError({
          status: 401,
          password: 'Invalid password',
        });

        const token = userModel.createToken(user.id);

        res.send({ user, token });
      }))
});

/**
 * User already has a token and it has been verified by the JWTAuth middleware
 * We create a new token and send it bak to the frontend.
 * @param req
 * @param res
 */
const authenticateWithToken = (req, res) => {
  const user = res.locals.user;
  const token = userModel.createToken(user.id);
  res.status(200).send({ user, token });
};

/**
 * When a user registers on the site, an e-mail will be sent with an activation link.
 * this link will be used to
 * @param req
 * @param res
 */
const activateAccount = catchAsyncErrors((req, res) => {
  // should get the activation token.
  const { token } = req.params;

  // should verify the activation token to make sure that it is valid.
  return knex(userModel.name)
    .select('*')
    .where({ token })
    .then(([firstUser]) => {
      // if the token is valid then we activate the user.
      if (!firstUser) throw new RouteError({
        user: 'Invalid user token',
        status: '401',
      });

      const userId = firstUser.id;

      // set user to active and reset the token
      const newProps = {
        token: '',
        active: true,
      };

      return knex(userModel.name)
        .update(newProps)
        .where({ token })
        .then(() => {
          // get the new user with the updated props
          return userController
            .getUsers({ id: userId })
            .then(([user]) => {
              if (!user) throw new RouteError({
                user: 'Error Updating user',
                status: 400,
              });

              return userController.userWithToken(userId)
                .then(userAndToken => res.send(userAndToken))
            });
        });
    })
});

/**
 * Used when a user needs to get a new activation e-mail
 * @param req
 * @param res
 */
const sendActivationEmail = catchAsyncErrors((req, res) => {
  const { id } = req.body;
  return userController
    .userWithToken(id)
    .then(userAndToken => {
      const user = userAndToken.user;
      // Send email to a user.
      return emailController.activateAccountEmail(user.email, user.token)
        .then(() => res.send(userAndToken))
    });
});

/**
 * Used when a user needs to reset his password
 * @param req
 * @param res
 */
const sendResetPasswordEmail = catchAsyncErrors((req, res) => {
  const { email } = req.body;
  const token = userModel.randomString();

  return knex(userModel.name)
    .update({ token })
    .where({ email })
    .then((affectedRows) => {
      if (!affectedRows) {
        throw new RouteError({
          email: 'E-mail does not exist'
        });
      }

      return emailController.changePasswordEmail(email, token)
        .then(() => res.send({ success: 'ok' }));
    })
});

module.exports = {
  authenticate,
  authenticateWithToken,
  activateAccount,
  sendActivationEmail,
  sendResetPasswordEmail,
};
