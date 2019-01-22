// 创建vue插件挂在到vue原型上
export default {
  install(Vue, options) {
    // 全局请求成功提示
    Vue.prototype.dNotify = function (msg, type) {
      this.$store.commit('alert/showTipModel', { bool: true, title: msg, model: type });
      setTimeout(() => {
        this.$store.commit('alert/showTipModel', { bool: false, title: msg, model: type });
      }, 100000);
    };
    // 彩票无效金额
    Vue.prototype.dInvalidMoney = function (momey) {
      var regu = "^[0-9]+\.?[0-9]*$";
      var re = new RegExp(regu);  //判断字符串是否为数字
      if (!re.test(momey)) {
        return false;
      } else {
        return true;
      }
    };
    //系统类型判断
    Vue.prototype.dPcOrMobile = function (momey) {
      var sUserAgent = navigator.userAgent.toLowerCase();
      var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
      var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
      var bIsMidp = sUserAgent.match(/midp/i) == "midp";
      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
      var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
      var bIsAndroid = sUserAgent.match(/android/i) == "android";
      var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
      var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
      if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        //跳转移动端页面
        if (bIsIphoneOs) {
          return 'iphone'
        } else {
          return 'android'
        }

      } else {
        //跳转pc端页面
        return 'pc'
      }
    };
    //年月日
    Vue.prototype.dGetTodayDate = function () {
      let d = new Date();
      let nowtime = d.toLocaleString();
      let f = nowtime.split(' ')[0].replace(/\//g, '-');
      let dateArr = f.split('-');
      let year = dateArr[0];
      let month = dateArr[1] > 9 ? dateArr[1] : '0' + dateArr[1];
      let day = dateArr[2] > 9 ? dateArr[2] : '0' + dateArr[2];
      return year + '-' + month + '-' + day;
    };
    // 用户名、密码验证
    Vue.prototype.validateAccount = function (str) {
      if (/^[0-9a-zA-Z]{6,20}$/i.test(str)) {
        return true;
      }
      return false;
    };
    //验证支付密码 长度
    Vue.prototype.valiPwdAccount = function (pwd) {
      if (pwd.length < 6) {
        return false
      } else {
        return true
      }
    }
    // 电话验证
    Vue.prototype.testPhone = function (text) {
      // 电话类型
      if (!/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(text)) {
        return false;
      } else {
        return true;
      }
    };
    // 邮箱验证
    Vue.prototype.testEmail = function (email) {
      if (!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)) {
        return false;
      } else {
        return true;
      }
    };
    // 年月日时分秒
    Vue.prototype.getTime = function (time) {

      let now = new Date(time - 0);
      let yy = now.getFullYear(); //年
      let mm = now.getMonth() + 1; //月
      let dd = now.getDate(); //日
      let hh = now.getHours()
      let MM = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
      let ss = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
      let clock = yy + '-';
      if (mm < 10) clock += '0';
      clock += mm + '-';
      if (dd < 10) clock += '0';
      clock += dd;
      return clock + ' ' + hh + ':' + MM + ':' + ss
    };
    // 精准日期
    Vue.prototype.getTimes = function (time) {

      let now = new Date(time - 0);
      let yy = now.getFullYear(); //年
      let mm = now.getMonth() + 1; //月
      let dd = now.getDate(); //日
      let hh = now.getHours()
      let MM = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
      let ss = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
      let clock = yy + '年';
      if (mm < 10) clock += '0';
      clock += mm + '月';
      if (dd < 10) clock += '0';
      clock += dd;
      return clock + '日' + hh + '时' + MM + '分' + ss + '秒'
    };
    Vue.prototype.getYMD = function (time) {
      // console.log(time)
      var now = new Date(+time);
      var yy = now.getFullYear();      //年
      var mm = now.getMonth() + 1;     //月
      var dd = now.getDate();          //日
      var clock = yy + "-";
      if (mm < 10) clock += "0";
      clock += mm + "-";
      if (dd < 10) clock += "0";
      clock += dd;
      return clock
    }
    Vue.prototype.getymd = function (time) {
      // console.log(time)
      var now = new Date(+time - 1000 * 60 * 60 * 184);
      var yy = now.getFullYear();      //年
      var mm = now.getMonth() + 1;     //月
      var dd = now.getDate();          //日
      var clock = yy + "-";
      if (mm < 10) clock += "0";
      clock += mm + "-";
      if (dd < 10) clock += "0";
      clock += dd;
      return clock
    }
    // 获取url后面参数
    Vue.prototype.GetQueryString = function (name) {
      return localStorage[name];
    }
  }
}
