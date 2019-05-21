import axios from 'axios';

export default function execute() {
  axios.interceptors.request.use(
    config => config,
    err => Promise.reject(err),
  );
  axios.interceptors.response.use(
    config => config,
    (err) => {
      if (err.response.status === 401) {
        window.location.assign(`${window.location.origin}${window.location.pathname}login`);
      }
      return Promise.reject(err);
    },
  );
}
