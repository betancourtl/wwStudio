export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = token => {
  return localStorage.setItem('token', token);
};

/**
 * Only accept responses that are ok 200-299, if not reject the promise
 * @param promise
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export const onlyOk = (promise) => {
  return promise.then(res => {
    if (!res.ok) {
      return res.json().then(json => {
        return Promise.reject(json);
      });

    } else {
      return res.json();
    }
  })
};
