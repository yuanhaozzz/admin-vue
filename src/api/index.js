import axios from 'axios';
import { Message } from 'element-ui';
let qs = require('qs');

import { getSessionStorage } from '@/util/common';
class Api {
    constructor() {
        this.instance = '';
        this.initAxios();
    }

    /**
     * 初始化axions
     */
    initAxios() {
        this.instance = axios.create({
            baseURL: 'http://yuanhao-web.cn:3003/server',
            timeout: 6000,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });

        // 请求头拦截器
        this.instance.interceptors.request.use(
            function(config) {
                // post数据序列化  针对post需要
                // if (config.method === "post") {
                //   if (
                //     !config["headers"]["Content-Type"] ||
                //     config["headers"]["Content-Type"] ===
                //       "application/x-www-form-urlencoded"
                //   ) {
                //     console.log(qs);
                //     config.data = qs.stringify(config.data);
                //   }
                // }
                let id = getSessionStorage('id');
                let { token } = getSessionStorage('user' + id);
                if (token) config.headers.Authorization = 'Bearer ' + token;
                return config;
            },
            function(error) {
                // Do something with request error
                return Promise.reject(error);
            }
        );

        // 响应头 拦截器
        this.instance.interceptors.response.use(
            function(response) {
                // Do something with response data
                return response;
            },
            function(error) {
                // Do something with response error
                return Promise.reject(error);
            }
        );
    }

    /**
     * post请求
     * @params {url} Object 请求路径
     * @params {params} Object 请求参数
     * @params {config} Object axios附加配置
     */
    post(url, params, config = {}) {
        return new Promise((resolve, reject) => {
            this.instance
                .post(url, params, config)
                .then(res => {
                    let {
                        data: { code, msg, data }
                    } = res;
                    if (code === 200) {
                        resolve(data);
                    } else {
                        if (code === 401) {
                            location.href = '/';
                            console.log(this);
                        }
                        Message.error(msg);
                        reject(msg);
                    }
                })
                .catch(err => {
                    console.log(err.message);
                    Message.error(err.message);
                    reject(err);
                });
        });
    }
    /**
     * get请求
     * @params {url} Object 请求路径
     * @params {params} Object 请求参数
     * @params {config} Object axios附加配置
     */
    get(url, params, config = {}) {
        return new Promise((resolve, reject) => {
            this.instance
                .get(url, params, config)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}

export default Api;
