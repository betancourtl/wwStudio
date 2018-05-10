import { getToken } from './utils';
import querystring from 'querystring';

// data - { user_id, title, content }
export const createCategory = (data = {}) => {
  return fetch('/categories/create', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
    body: JSON.stringify(data),
  }).then(res => {
    if (!res.ok) {
      throw Error('Error logging in');
    } else {
      return res.json();
    }
  })
};

export const updateCategory = (data = {}) => {
  const { id, ...rest } = data;
  return fetch(`/categories/edit/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
    body: JSON.stringify(rest),
  }).then(res => {
    if (!res.ok) {
      throw Error('Error logging in');
    } else {
      return res.json();
    }
  })
};

export const getCategories = (query = {}) => {
  const qs = querystring.stringify(query);
  return fetch('/categories'.concat(qs ? `?${qs}` : ''), {
    method: 'GET',
  }).then(res => {
    if (!res.ok) {
      throw Error('Error logging in');
    } else {
      return res.json();
    }
  })
};

export const deleteCategory = (id) => {
  return fetch(`/categories/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  }).then(res => {
    if (!res.ok) {
      throw Error('Error Deleting Post');
    } else {
      return res.json();
    }
  })
};
