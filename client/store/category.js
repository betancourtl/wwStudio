import { extendObservable, action, runInAction } from 'mobx';
import debounce from 'lodash.debounce';
import {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory
} from '../api/category';

class Category {
  static storeName = 'category';

  constructor() {
    extendObservable(this, {
      categories: [],
    });
  }

  @action.bound changeCategory(id, name) {
    this.categories.some(x => {
      if (x.id === id) {
        x.name = name;
        return true
      }
    });

    this.updateCategory(id);
  };

  @action.bound createCategory() {
    return createCategory({
      name: '',
    }).then(() => {
      this.getCategories({});
    }).catch(err => {
      console.log('Error', err);
    });
  }

  updateCategory = debounce(this._updateCategory, 500);

  @action.bound _updateCategory(id) {
    this.categories.some(x => {
      if (x.id === id) {
        updateCategory({
          id: x.id,
          name: x.name,
        }).then(res => {
          console.log('Category has been updated!');
        }).catch(err => {
          console.log('Error', err);
        });
        return true
      }
    });
  }

  @action.bound getCategories(query = {}) {
    getCategories(query)
      .then(categories => {
        runInAction(() => {
          this.categories = categories;
        });
      })
      .catch(err => {
        console.log('Error', err);
      });
  }

  @action.bound getCategory(id) {
    return getCategories({ id })
      .then(([category]) => {
        if (!category) return Promise.reject();
        return category;
      })
  }

  @action.bound deleteCategory(id) {
    return deleteCategory(id)
      .then(res => {
        console.log('ok removed');
        this.getCategories();
      }).catch(err => {
        console.log('not removed');
      })
  }
}

export default Category;
const storeName = Category.storeName;

export {
  storeName,
}
