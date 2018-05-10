import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';

// components
import Routes from './Routes';

// stores
import store from './store';

if (process.env.NODE_ENV === 'development') {
// Adds hot reloading
  if (module.hot) {
    module.hot.accept();
  }
}

ReactDOM.render(
  <Provider {...store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);
