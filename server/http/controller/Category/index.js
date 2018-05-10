const categoryModel = require('../../model/Category');
const knex = require('../../../config/knex');
const { RouteError } = require('../../errors');
const { catchAsyncErrors, throwAsRouteError } = require('../../../utils');

const get = catchAsyncErrors((req, res) => {
  const query = req.query;
  return throwAsRouteError({
    category: 'Error fetching categories.',
  }, knex
    .select('*')
    .where(query)
    .from(categoryModel.name)
    .then(categories => res.send(categories)));
});

// {req.body -> { user_id, title, content }};
const create = catchAsyncErrors((req, res) => {
  const category = categoryModel.create({ ...req.body });
  return throwAsRouteError({ category: 'Error creating category', },
    knex(categoryModel.name)
      .insert(category)
      .then(([id]) => {
        return throwAsRouteError({ category: 'Category was created but there was an error fetching it' },
          knex
            .select('*')
            .from(categoryModel.name)
            .where({ id })
            .then(([newCategory]) => res.send(newCategory)));
      }));
});

// {req.body -> { user_id, title, content }};
// Make sure that the user owns the post.
const edit = catchAsyncErrors((req, res) => {
  const { id } = req.params;

  return throwAsRouteError({
    category: 'Error Updating category'
    },
    knex(categoryModel.name)
      .where({ id })
      .update(req.body)
      .then((rows) => {
        if (rows !== 1) throw new RouteError({
          category: 'Error updating category.',
        });

        return throwAsRouteError({
            category: 'Category updated. Error fetching category.',
          },
          knex
            .select('*')
            .from(categoryModel.name)
            .where({ id })
            .then(([category]) => res.send(category)));
      }));
});

const remove = catchAsyncErrors((req, res) => {
  const { id } = req.params;
  return throwAsRouteError({
      category: 'Error Deleting category',
    },
    knex(categoryModel.name)
      .where({ id })
      .del()
      .then(affectedRows => {
        if (affectedRows !== 1) throw Error;
        res.send({ affectedRows });
      }));
});

module.exports = {
  get,
  create,
  edit,
  remove,
};
