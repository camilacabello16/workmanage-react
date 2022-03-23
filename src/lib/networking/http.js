import axios from 'axios';

// const instance = axios.create();

/**
 * interceptors add only for demo purpose
 */
// instance.interceptors.request.use((config) => {
//   config.headers.Authorization = 'Bearer Token';
//   config.headers.post['Access-Control-Allow-Origin'] = '*';
//   return config;
// });

const httpGet = (
  url,
  params = { withCredentials: true, responseType: 'json' }
) => {
  return axios.get(url, params);
};

const httpPost = (url, data) => {
  return axios.post(url, data, { withCredentials: true });
};

const httpPut = (url, data) => {
  return axios.put(url, data, { withCredentials: true });
};

export { httpGet, httpPost, httpPut };
