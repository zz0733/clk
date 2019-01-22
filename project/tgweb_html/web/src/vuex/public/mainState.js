const state = {
  userinfo: localStorage.userinfo && JSON.parse(localStorage.userinfo),
  flag: true,
  aid: '',
  ifpourT: true
}

const datas = {
  namespaced: true,
  state,
  mutations: {
    // 重置用户个人信息
    resetUserinfo (state, bool) {
      state.userinfo = bool
    },
    // 刷新个人信息余额使用
    reloadUserinfo (state, userinfo) {
      localStorage.setItem('userinfo', JSON.stringify(userinfo))
      state.userinfo = localStorage.userinfo && JSON.parse(localStorage.userinfo)
    },
    resetFlag (state, bool) {
      state.flag = bool
    },
    resetPour (state, bool) {
      state.ifpourT = bool
    }
  }
}

export default datas
