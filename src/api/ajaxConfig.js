import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

axios.defaults.timeout = 20000;
axios.interceptors.request.use(function (config) {
  // 拦截http 状态
  config.headers['client'] = 'H5';
  config.headers['version'] = '1.3';
  config.headers['Content-Type'] = 'application/json';
  
  return config;
}, function (error) {
  return Promise.reject(error);
})

// 设置全局的请求次数，请求的间隙
axios.defaults.retry = 0;
axios.defaults.retryDelay = 1000;

axios.interceptors.response.use(function (response) {
  return response;
}, function axiosRetryInterceptor(err) {
  var config = err.config;
  if (!config || !config.retry) return Promise.reject(err);

  config.__retryCount = config.__retryCount || 0;

  if (config.__retryCount >= config.retry) {

    return Promise.reject(err);
  }

  config.__retryCount += 1;

  var backoff = new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, config.retryDelay || 1);
  });

  return backoff.then(function () {
    return axios(config);
  });
});

export default axios;