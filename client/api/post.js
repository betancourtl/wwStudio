import { getToken } from './utils';
import querystring from 'querystring';

// data - { user_id, title, content }
export const createPost = (data = {}) => {
  return fetch('/posts/create', {
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

export const updatePost = (data = {}) => {
  const { id, ...rest } = data;
  return fetch(`/posts/edit/${id}`, {
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

export const getPosts = (query = {}) => {
  const qs = querystring.stringify(query);
  return fetch('/posts'.concat(qs ? `?${qs}` : ''), {
    method: 'GET',
  }).then(res => {
    if (!res.ok) {
      throw Error('Error logging in');
    } else {
      return res.json();
    }
  })
};

export const deletePost = (id) => {
  return fetch(`/posts/delete/${id}`, {
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
