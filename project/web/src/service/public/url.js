import UserService from './UserService';
import Vue from 'vue'


(function(){
  let url = window.location.href;
  let obj = {};
  let keyvalue=[];
  let key="",
      value="";
  let parseString = url.substring(url.indexOf("?")+1,url.length).split("&");
  for (var i in parseString) {
      keyvalue = parseString[i].split("=");
      key=keyvalue[0];
      value=keyvalue[1]&&keyvalue[1].includes('#/')?keyvalue[1].split('#/')[0]:keyvalue[1];
      obj[key]=value;
  }
  if(obj.agent){
    localStorage.setItem('agent',obj.agent)
  }
})();


// 判断过期
if(localStorage.token){
  let obj=UserService.expiredPart(localStorage.token);
  if(obj.exp - obj.timestamp<=0){
      UserService.removeCache();
  }    
}

//vm登进登出
let incode=window.location.href.includes('?t=b506f0d11ee755d712a09f9fa25c52f5');
let outcode=window.location.href.includes('?t=52335218f376c22f123183adb2481802');
if(incode){
    localStorage.setItem('Public_User','vm');
    Vue.prototype.$HOST_NAME ='/api/vm';
    location.href = '#/';
}else if(outcode){
    localStorage.setItem('Public_User','v1');
    Vue.prototype.$HOST_NAME ='/api/v1';
    location.href = '#/';
}


// 判断不输入对密码的情况（不过期并且值存在）vm上面加，试玩在试玩按钮
if(localStorage.Public_User&&localStorage.Public_User=='vm'){
    Vue.prototype.$HOST_NAME ='/api/vm'; 
}else if(localStorage.Public_User&&localStorage.Public_User=='test'){
    Vue.prototype.$HOST_NAME ='/api/test'; 
}else{
    Vue.prototype.$HOST_NAME ='/api/v1';
}



