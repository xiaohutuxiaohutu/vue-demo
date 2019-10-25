import axios from 'axios'
import {Message} from "element-ui";

//注册全局 Axios 拦截器
export function registerInterceptor(options) {
  // ...
  axios.interceptors.response.use(
      res => {
        const ret = res.data;
        return Promise.resolve(ret);
      },
      err => {
        const status = err.response && err.response.status;
        let message = "";

        switch (status) {
          case 404:
            message = "请求资源未找到";
            break;
          case 401:
            message = "无权限";
            setTimeout(() => {
              //处理登录失效，例如跳转到登陆页
            }, 1000);
            break;
          case 500:
            message = "服务器异常";
            break;
            // 其他错误...
          default:
            break;
        }
        Message.error({
          message: message || err.message
          // type: 'error'
        });

        return Promise.reject(err);
      }
  );
}
