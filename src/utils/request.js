
import axios from 'axios'
import { message } from 'antd';
const request = axios.create()
// 2.请求拦截器
request.interceptors.request.use(config => {
  // console.log(config, 'config');
  //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
  // const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJseCIsImxvZ2luVHlwZSI6ImFjY291bnQiLCJpZCI6IkIwRDEzMTAzRDQwMjRGQjRCRTc5RTBBQ0Q5RUUzRjBFIiwiZXhwIjoxNzI1MDIxMDA1fQ.IwbKp0xgxh7z90tJxFn-blfoSEbbpymLL7E2o1jpF_bIcUAhAXOWz-HzyeHZhjl5DMJ1Ms-t50l_16PG7p9hvg';
  // config.headers.Authorization = token;
  //如有需要：注意使用token的时候需要引入cookie方法或者用本地localStorage等方法，推荐js-cookie
  //const token = getCookie('名称');//这里取token之前，你肯定需要先拿到token,存一下
  //if(token){
  //config.params = {'token':token} //如果要求携带在参数中
  //config.headers.token= token; //如果要求携带在请求头中
  //}
  return config
}, error => {
  Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(response => {
  return response
}, error => {
  if (error && error.response) {
    // 1.公共错误处理
    // 2.根据响应码具体处理
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break;
      case 401:
        error.message = '未授权，请重新登录'
        break;
      case 403:
        error.message = '拒绝访问'
        break;
      case 404:
        error.message = '请求错误,未找到该资源'
        window.location.href = "/NotFound"
        break;
      case 405:
        error.message = '请求方法未允许'
        break;
      case 408:
        error.message = '请求超时'
        break;
      case 500:
        error.message = '服务器端出错'
        break;
      case 501:
        error.message = '网络未实现'
        break;
      case 502:
        error.message = '网络错误'
        break;
      case 503:
        error.message = '服务不可用'
        break;
      case 504:
        error.message = '网络超时'
        break;
      case 505:
        error.message = 'http版本不支持该请求'
        break;
      default:
        error.message = `连接错误${error.response.status}`
    }
  } else {
    // 超时处理
    if (JSON.stringify(error).includes('timeout')) {
      message.error('服务器响应超时，请刷新当前页')
    }
  }
  return Promise.resolve(error.response)
})
export default request