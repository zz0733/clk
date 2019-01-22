// 创建vue插件挂在到vue原型上
export default {
  install(Vue, options) {
    // 全局请求失败提示
    Vue.prototype.dNotify = function (msg) {
      // this.$Message.error(msg);
      console.log(msg)
    };
    // 全局手机端判断
    Vue.prototype.$isMobile=function() {
      const Mobile = navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(Mobile)) {
        return false;
      } else if (/android/.test(Mobile)) {
        return true;
      }
    },
    // 无效金额
    Vue.prototype.dInvalidMoney = function (momey) {
      // return true;
      //判断字符串是否为数字
      let re = /^[0-9]*$/g;
      if (!re.test(momey) || !momey) {
        return false;
      } else {
        return true;
      }
    };
    Vue.prototype.validatePhone = function (phone) {
      if (!/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(phone)) {
        return false;
      } else {
        return true;
      }
    };

    Vue.prototype.dGetTodayDate = function () {
      let d = new Date();
      let nowtime = d.toLocaleString();
      let f = nowtime.split(' ')[0].replace(/\//g, '-');
      return f;
    };
 
    // 获取今天时间
    Vue.prototype.getToday = function (time) {

      let now = new Date(time - 0);
      let yy = now.getFullYear(); //年
      let mm = now.getMonth() + 1; //月
      let dd = now.getDate(); //日
      let clock = yy + '-';
      if (mm < 10) clock += '0';
      clock += mm + '-';
      if (dd < 10) clock += '0';
      clock += dd;
      return clock
    };
    // 获取今天时间
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



    // 转换反水格式
    Vue.prototype.getRefund = function (data) {

      let refundData = [];
      let platformKey = Object.keys(data.platform);
      platformKey.forEach((v, i) => {
        refundData[i] = {};
        refundData[i].key = v;
        refundData[i].active = "未设置";
        refundData[i].list = [];
        // console.log(data.platform)
        data.platform[refundData[i].key].forEach((a, b) => {
          refundData[i].list[b] = {};

          refundData[i].list[b].name = Object.keys(a);
          refundData[i].list[b].refunds = Object.values(a);

          refundData[i].list[b].value =
            data.alias[refundData[i].list[b].name[0]];

          refundData[i].list[b].key = refundData[i].list[b].name[0];
          refundData[i].list[b].refund = String(refundData[i].list[b].refunds[0]);

          delete refundData[i].list[b].name;
          delete refundData[i].list[b].refunds;
        });
      });

      return refundData
    }

    // 账户、密码验证
    Vue.prototype.validateAccount = function (str) {
      if (/^[0-9a-zA-Z]{5,20}$/i.test(str)) {
        return true;
      }
      return false;
    };

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


    // 获取url后面参数

    Vue.prototype.GetQueryString = function (name) {
      return localStorage[name];
    }


  }
}
