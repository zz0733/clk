//配置接口数据
import Vue from 'vue';
import axios from 'axios';
import UserService from './UserService'
const qs = require('qs');
export const HOST_NAME = '';


//公共请求
export let _SetPost = (url, params) => axios({
  url: HOST_NAME + url,
  method: 'post',
  data: {
    ...params
  }
});
//公共请求
export let _SetGet = (url, params) => axios({
  url: HOST_NAME + url,
  method: 'get',
  data: {
    ...params
  }
});



// //获取首页列表
// export let _GetWorkPageList = params => axios({
//   url: `${HOST_NAME}/api/Default/GetWorkPageList`,
//   method: 'post',
//   data: {
//     ...params
//   }
// });


//测试域名
axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
// 配置formdata格式
// axios.defaults.withCredentials = true;
axios.defaults.timeout = 20000;
axios.defaults.transformRequest = [(data) => {
  // console.log(data);
  return qs.stringify(data);
}];

axios.interceptors.request.use((config) => {
  config.headers.Authorization = `${localStorage.token}`;
  return config;
}, function (error) {
  return Promise.reject(error);
});

UserService.vpSetConfig();


axios.interceptors.response.use((response) => {
  if (response.data.sign > localStorage.configTime&&!response.config.url.includes('/config')) {
    UserService.vpReloadConfig();
  }
  if (response.data.code == 5003||response.data.code == 5002) {
    delete localStorage.bankData
    UserService.removeCache();
    Vue.prototype.$newToast(response.data.message);
    setTimeout(() => {
      location.href = '#/admin/login';
    }, 2000);
    return false;
  }else if(response.data.code == 5000){
    Vue.prototype.$newToast(response.data.message);
    location.href = `${Vue.prototype.$HOST_ENVI}/static/public/html/weihu/index.html`;
    return false;
  }else if(response.data.code == 5005){
    Vue.prototype.$newToast(response.data.message);
    window.history.back(-1); 
    return false;
  }
  // 验证是否过期
  if(localStorage.token && !response.config.url.includes('/member/refresh')) {
    UserService.expired(localStorage.token);
  } 
  if(response.data.code == 200){
    return response.data;
  }else if(response.data.code == 5006){
    return false;
  }else{
    Vue.prototype.$newToast(response.data.message);
  } 
}, (err) => {
  // if (err.response.data.code && err.response.data.code == 5003) {
  //   localStorage.removeItem('bankData');
  //   UserService.removeCache();
  //   Vue.prototype.$toast('未登录');
  //   setTimeout(() => {
  //     location.href = '#/admin/login';
  //   }, 2000);
  // } else {
  //   return err.response.data;
  // }
  Vue.prototype.$newToast(err.response.data.message);
  // return err.response.data;




  // switch (type) {
  //   case "未登录":
  //     store.commit('alert/showTipModel', {bool:true,title:'您未登录！',model:'warn'});
    
  //     break
  //   case "您的余额不足！": 
  //     break    
  // }

});


//注册
Vue.prototype.$headers = { headers: { 'Accept': 'application/x.tg.v2+json' } };
Vue.prototype.$getHeader = { 'Accept': 'application/x.tg.v2+json' };
Vue.prototype.$http = axios; //post




