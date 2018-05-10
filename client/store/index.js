import { configure } from 'mobx';

// Enforces all actions
configure({ enforceActions: true });

// Dynamically loads store components
const context = require.context(".", true, /\.js$/);
const modules = {};

context.keys().forEach(key => {
  if (!key.match('./index.js')) {
    if (!context(key).storeName) {
      console.log('store is missing static storeName property');
    }
    modules[context(key).storeName] = context(key);
  }
});

class RootStore {
  constructor() {
    return Object
      .keys(modules)
      .forEach(key => {
        this[key] = new modules[key].default(this);
        // inject the root store into all of the stores.
        this[key].rootStore = this;
      });
  }
}

export default new RootStore();
