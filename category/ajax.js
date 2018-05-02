import { Message } from 'element-ui'
import axios from 'axios'
import qs from 'qs'
import router from '../router'
import { getToken } from 'common'

const service = axios.create({
    baseURL: process.env.MOCK_URL,
    timeout: 60000
    // withCredentials: true
});

service.interceptors.request.use(config => {
      // Do something before request is sent
      if (store.getters.token) {
        config.headers['X-Token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      }
      return config
}, error => {
      // Do something with request error
      console.log(error) // for debug
      Promise.reject(error)
})


service.interceptors.response.use(function(response) {
    if (response.headers.loginstate === 'expired') router.push({ path: '/login' })
    return response;
}, function(error) {
    return Promise.reject(error);
});

/**
 * 通用request封装
 * @param method
 * @param url
 * @param data
 * @param config
 * @returns {Promise}
 */
const request = (method, url, data, config = {}) => {
    let options = Object.assign({}, config, {
        url,
        method,
        data
    })
    options.headers = options.headers || {};
    options.withCredentials = true
    return new Promise((resolve, reject) => {
        service.request(options)
            .then(res => {
                let data = res.data;
                let status = res.status ;
                if (!data && status === 200) {
                    return resolve(data);
                }
                if (data.HasError) {
                    if (!res.config.notNotifyError) {
                        Message({
                            message: res.message,
                            type: 'error',
                            duration: 5 * 1000
                        });
                    }
                    reject(res);
                }
                resolve(data);
            }).catch(res => {
                if (!res.config.notNotifyError) {
                    Message({
                        message: res.message,
                        type: 'error',
                        duration: 5 * 1000
                    });
                }
                reject(res);
            });
    });
};

export const ajax = {
    get(url, config) {
        // if (config) {
        //     if (config.id) {
        //         url += '/' + config.id;
        //     }
        // }
        return request('get', url, null, config);
    },
    delete(url, data, config) {
        return request('delete', url, data, config);
    },
    head(url, config) {
        return request('head', url, null, config);
    },
    post(url, data, config) {
        return request('post', url, qs.stringify(data), config);
    },
    put(url, data, config = {}) {
        config.headers = {
            'Content-Type': 'application/json; charset=UTF-8'
        }
        return request('put', url, data, config);
    },
    patch(url, data, config) {
        return request('path', url, qs.stringify(data), config);
    },
    setCommonHeader(key, value) {
        service.defaults.headers.common[key] = value;
    }
};
