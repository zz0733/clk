const state = {
  headerTitle: '购彩大厅',
  userinfo: localStorage.userinfo && JSON.parse(localStorage.userinfo),
  userBank: [],
  nowApi: 'v1',
  balance: localStorage.userinfo && JSON.parse(localStorage.userinfo).balance,
  ifpourT:true
}

const datas = {
  namespaced: true,
  state,
  mutations: {
    // 改头部标题
    resetHeaderTit(state, string) {
      state.headerTitle = string;
    },
    // 刷新个人信息余额使用
    reloadUserinfo(state) {
      state.userinfo = localStorage.userinfo && JSON.parse(localStorage.userinfo);
    },
    // 重置用户个人信息
    resetUserinfo(state, bool) {
      state.userinfo = bool;
    },
    // 重置用户个人信息
    resetNowApi(state, string) {
      state.nowApi = string;
      // console.log(string)
    },
    resetBalance(state, balance) {
      state.balance = balance;
      let userinfo = JSON.parse(localStorage.userinfo);
      userinfo.balance = balance;
      localStorage.userinfo =  JSON.stringify(userinfo);
    },
    resetPour(state, bool){
      state.ifpourT=bool;
    }
  },
  actions: {
  }
}


export default datas;
