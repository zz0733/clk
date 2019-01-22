const mixin = {
  data: function () {
    return {
      token: localStorage.token,
      Public_User: localStorage.Public_User
    }
  },
  methods: {
    // 正式登陆
    async login (param) {
      let datas
      if (param.length) {
        datas = JSON.parse(param[0].special_setting)
      } else if (typeof(param.special_setting) == 'object') {
        datas = param.special_setting
      } else if (typeof(param.special_setting) == 'string') {
        datas = JSON.parse(param.special_setting)
      } else {
        datas = param
      }

      let res = await this.$http.post(`${this.$HOST_NAME}/games/login`, {
        gameName: datas.gameName,
        userType: localStorage.Public_User == 'test' ? 1 : 0,
        platform: datas.platform,
        device: 'pc'
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
        // window.close();
      }
    },
    //需要获取/games/index再登录真人 vr 等
    async getItemId (item) {
      if (!localStorage.token || !localStorage.userinfo) {
        alert('未登录')
        return false
      }
      console.log(item)
      let routeData = this.$router.resolve({
        path: '/loading',
        query: {name: item.name, classId: item.id, platform: item.platform}
      })
      window.open(routeData.href, 'newwindow', 'height=750,width=1285, top=0, left=' + (window.screen.availWidth - 1295) / 2 + '')
    },
    //直接登录，如捕鱼
    trustLogin (item) {
      if (!localStorage.token) {
        alert('未登录')
        return false
      }
      let routeData = this.$router.resolve({
        path: '/loading',
        query: {platform: item.platform, gameName: item.gameName, name: item.name, login: true}
      })
      window.open(routeData.href, 'newwindow', 'height=750,width=1285, top=0, left=' + (window.screen.availWidth - 1295) / 2 + '')
    },
    // 需要解析再登录，如第三方电子,需要解析
    loginGame (item) {
      if (!localStorage.token || !localStorage.userinfo) {
        alert('未登录')
        return false
      }
      let routeData = this.$router.resolve({
        path: '/loading',
        query: {
          name: item.name,
          platform: JSON.parse(item.special_setting).platform,
          gameName: JSON.parse(item.special_setting).gameName,
          login: true
        }
      })
      window.open(routeData.href, 'newwindow', 'height=750,width=1285, top=0, left=' + (window.screen.availWidth - 1295) / 2 + '')
    },
  },
  beforeDestroy () {
  },
}

export default mixin


