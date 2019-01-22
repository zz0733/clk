// 公共弹框显示设置
const state = {
  login: {
      ifLogin: false,
      modelTitle: "用户登录",
      chooseModel: "用户登录",
  },
 
  //提示显示框状态
  tipModel: {
      bool: false,
      title: '',
      model: ''//warn,success,error 
  },
  promit: {
      isPromit: false,

  }


}


const datas = {
  namespaced: true,
  state,
  mutations: {
      // 是否显示提示信息
      showTipModel(state, datas) {
          state.tipModel.bool = datas.bool;
          state.tipModel.title = datas.title;
          state.tipModel.model = datas.model;
      },
      // 是否显示登录弹框
      showLogin(state, bool) {
          state.login.ifLogin = bool;
      },
      // 改变注册和登录公用标题
      setLoginTitle(state, title) {
          state.login.modelTitle = title;
      },
      //设置显示登录还是注册框
      setChooseModel(state, model) {
          state.login.chooseModel = model;
      }
  },
  actions: {
      // 异步操作封装在action
  }
}


export default datas;