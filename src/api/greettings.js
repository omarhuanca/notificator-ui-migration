import axios from 'axios';

// axios.defaults.baseURL = 'localhost:8080';
axios.defaults.headers.common.Authorization = 'Basic @#$%$&^%&';
export default {
  getGreetting(callback) {
    return axios.get('/greettings').then((response) => {
      if (response.status === 200) {
        callback(response.data);
      }
    });
  },
};