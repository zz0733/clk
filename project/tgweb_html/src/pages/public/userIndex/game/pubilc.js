import UserService from '@/service/public/UserService.js'
import store from '@/vuex/store'

const mixin = {
  data: function () {
    return {
      token: localStorage.token,
      Public_User: localStorage.Public_User,
      thirdpartyAllDatas: {

        '开元棋牌': {platform: 'KY_CHESS', gameName: 0},
        'AG视讯': {platform: 'AG_LIVE', gameName: 1},
        'BBIN视讯': {platform: 'BBIN_LIVE', gameName: 'live#live'},
        'BG视讯': {platform: 'BG_LIVE', gameName: 'live'},
        'EBET视讯': {platform: 'EBET_LIVE', gameName: 1},
        'DS视讯': {platform: 'DS_LIVE', gameName: 1},
        'DG视讯': {platform: 'DG_LIVE', gameName: 1},
        'LEBO视讯': {platform: 'LEBO_LIVE', gameName: 1},
        'OG视讯': {platform: 'OG_LIVE', gameName: 1},
        'LMG视讯': {platform: 'LMG_LIVE', gameName: 1},
        '欧博视讯': {platform: 'AB_LIVE', gameName: 1},
        '沙龙视讯': {platform: 'SA_LIVE', gameName: 1},

        '皇冠体育': {platform: 'SX_SPORT', gameName: 1},
        '沙巴体育': {platform: 'SB_SPORT', gameName: 1},
        'BBIN体育': {platform: 'BBIN_SPORT', gameName: 'ball#ball'},

        'VR彩票': {platform: 'VR_LOTTERY', gameName: 1},
      }
    }
  },
  methods: {
    // 登录
    async tryPlayLogin () {
      this.$newToast('未登录')
      location.href = '#/admin/login'
      // this.$http.post(`/api/test/registerTest`, {}).then(res => {
      // if (res.code == 200) {
      //     UserService.setCache(res, "test");
      //     window.location.reload();
      //     return false;
      // }
      // });
    },
    // 正式登陆
    async login (param) {
      let datas
      if (param.length) {
        datas = JSON.parse(param[0].special_setting)
      } else if (typeof (param.special_setting) == 'object') {
        datas = param.special_setting
      } else if (typeof (param.special_setting) == 'string') {
        datas = JSON.parse(param.special_setting)
      } else {
        datas = param
      }

      let res = await this.$http.post(`${this.$HOST_NAME}/games/login`, {
        gameName: datas.gameName,
        userType: localStorage.Public_User == 'test' ? 1 : 0,
        platform: datas.platform,
        device: 'h5'
      })
      if (res && res.code == 200) {
        window.location.href = res.data.url
        // window.open(
        //     res.data.url,
        //     "newwindow",
        //     "height=750,width=1285, top=0, left=" +
        //     (window.screen.availWidth - 1295) / 2 +
        //     ""
        // );
      } else {
        alert(res.message)
        //
        window.close()
      }
    },
    async tryPlay (param) {
      if (localStorage.token) {
        this.login(param)
      } else {
        this.tryPlayLogin()
      }
    },
  },
  beforeDestroy () {
    this.$loading(false)
    this.$loading2(false)
  },
  store
}

export default mixin


