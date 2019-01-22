<template>
  <div class="register-public-css" ref="register">
    <!-- <vp-pub-header title="注册"></vp-pub-header> -->
    <img @click="$router.push('/home')" class="back-login" src="@assets/img/public/image/common/back-login.png" alt="">
    <div class="container-register">


      <img :src="logoSrc" alt="" class="logo-bg">
      <div class="row">
        <div class="box">
          <div class="img">
            <!-- <img src="../../../../assets/img/public/image/common/register/new-index-user.png" alt=""> -->
              <i class="icon iconfont h5-icon-new-index-user text-color"></i>

          </div>
          <cube-input v-model="userName" type="text" placeholder="账号(6-10位数字或字母)" id="userName"
                      @blur="getCode"></cube-input>
        </div>
      </div>

      <div class="row">
        <div class="box">
          <div class="img">
            <!-- <img src="../../../../assets/img/public/image/common/register/new-index-password.png" alt=""> -->
             <i class="icon iconfont h5-icon-new-index-password text-color"></i>
          </div>
          <cube-input v-model="password" type="password" placeholder="密码(6-20位数字或字母)"></cube-input>
        </div>
      </div>
      <div class="row">
        <div class="box">
          <div class="img">
            <!-- <img src="../../../../assets/img/public/image/common/register/new-index-password.png" alt=""> -->
             <i class="icon iconfont h5-icon-new-index-password text-color"></i>
          </div>
          <cube-input v-model="submit_password" type="password" placeholder="请确认密码"></cube-input>
        </div>
      </div>


      <div class="row">
        <div class="box">
          <div class="img">
            <!-- <img src="../../../../assets/img/public/image/common/register/new-index-yzm.png" alt=""> -->
             <i class="icon iconfont h5-icon-new-index-yzm text-color"></i>
          </div>
          <cube-input :maxlength=4 v-model="code" type="del" placeholder="验证码"></cube-input>
          <span class="codeImg" @click="getCode"
                :style="{backgroundImage: 'url(' + codeImg + ')', backgroundSize:'contain'}"></span>
        </div>
      </div>

      <div class="submit-wrap">
        <!-- @touchstart="submitRegister" -->
        <!-- :class="{'active':!ifCanclick}" -->
        <div @touchstart="submitRegister" @click="submitRegister" class="submitBt bg-color ">立即注册</div>
      </div>

      <router-link tag="div" to="/admin/login" class="go-register">

        已有帐号？<span class="text-color">立即登录</span>
      </router-link>


    </div>
    <img src="../../../../assets/img/public/image/common/register/new-index-bg.png" alt="" class="bg-img">
  </div>
</template>

<script>
  import vpPubFooter from '@/pages/public/userIndex/common/Footer'
  import store from '@/vuex/store'
  import UserService from '@/service/public/UserService'

  export default {
    props: ['logoSrc'],
    data () {
      return {
        register: [],
        userName: '',
        password: '',

        code: '',
        captcha_key: '',

        codeImg: '',
        submit_password: '',
        agent: null,
        ifCanclick: true
      }
    },
    methods: {
      submitRegister () {
        if (!this.ifCanclick) {
          return false
        }
        // console.log(this.agent)
        // let staueAcc = this.validateAccount(this.userName);
        // let stauePassword = this.validateAccount(this.password);
        if (this.userName.length < 6) {
          this.$newToast('账号 6-10位数字或字母')
          return false
        }
        // if (!staueAcc) {
        //   this.$newToast("账号 5-10位数字或字母");
        //   return false;
        // }
        if (this.password.length < 6) {
          this.$newToast('密码 6-10位数字或字母')
          return false
        }
        if (this.submit_password !== this.password) {
          this.$newToast('两次密码不一致')
          return false
        }
        if (this.code == '') {
          this.$newToast('请输入验证码')
          return false
        }
        if (this.code.length < 4 || this.code.length > 4) {
          this.$newToast('请输入4位验证码')
          return false
        }
        let params = {}
        params.userName = this.userName
        params.password = this.password
        params.device = 'h5'
        params.code = this.code
        params.captcha_key = this.captcha_key
        let flag = true
        for (let i = 0; i < this.register.length; i++) {
          if (this.register[i].value) {
            this.$newToast(this.register[i].placeholder)
            flag = false
            break
          }
          params[this.register[i].key] = this.register[i].value
        }
        if (!flag) {
          return false
        }
        if (this.agent) {
          params.agent = this.agent
        }
        this.ifCanclick = false
        //
        let cache = this.$HOST_NAME
        this.$HOST_NAME = '/api/v1'

        // localStorage.removeItem("token");

        this.$http
          .post(`${this.$HOST_NAME}/checkUsername/${this.userName}`, {})
          .then(res => {
            if (res && res.code == 200) {
              this.ifCanclick = true

              // localStorage.removeItem('token')
              // localStorage.removeItem('userinfo')
              // UserService.setCache(res, "v1");
              this.$http.post(`${this.$HOST_NAME}/register`, params).then(res => {
                if (res && res.code == 200) {
                  UserService.setCache(res, 'v1')
                  this.$store.commit('mainState/resetBalance', res.data.userinfo.balance)
                  delete localStorage.remember
                  // this.$newToast(res.message);
                  setTimeout(() => {
                    this.$router.push('/')
                  }, 1000)
                } else {
                  this.$HOST_NAME = cache
                  this.getCode()
                }
              })
            } else {
              this.$newToast('账户已存在')
              this.ifCanclick = true
              this.$HOST_NAME = cache
              // localStorage.setItem('token',token)
              return false
            }
          })
      },
      getCode () {
        if (!this.userName) {
          return false
        } else {
          this.$http
            .post(`/api/v1/captcha`, {
              userName: this.userName
            })
            .then(res => {
              if (res.code == 200) {
                this.codeImg = res.data.captcha_image_text
                this.captcha_key = res.data.captcha_key
              } else {
                this.userName = ''
              }
            })
        }
      }
    },
    created () {
      this.$nextTick(() => {
        this.agent = this.GetQueryString('agent')
        if (!JSON.parse(localStorage.config)) return false
        let registerH5 = JSON.parse(localStorage.config).register.h5
        registerH5.forEach((v, i) => {
          this.register[i] = {}
          switch (v) {
            case 'phone':
              this.register[i].placeholder = '请输入手机号'
              this.register[i].img =
                '../../../assets/img/public/image/common/register/user-phone@2x.png'
              this.register[i].value = ''
              this.register[i].key = v
              break
            case 'email':
              this.register[i].placeholder = '请输入邮箱地址'
              this.register[i].img =
                '../../../assets/img/public/image/common/register/user-mail@2x.png'
              this.register[i].value = ''
              this.register[i].key = v
              break
            case 'wechat':
              this.register[i].placeholder = '请输入微信号'
              this.register[i].img =
                '../../../assets/img/public/image/common/register/weixinhao.png'
              this.register[i].value = ''
              this.register[i].key = v
              break
            case 'realName':
              this.register[i].placeholder = '请输入真实姓名'
              this.register[i].img =
                '../../../assets/img/public/image/common/register/name.png'
              this.register[i].value = ''
              this.register[i].key = v
              break
            case 'payPassword':
              this.register[i].placeholder = '请输入支付密码'
              this.register[i].img =
                '../../../assets/img/public/image/common/register/jiaoyimima.png'
              this.register[i].value = ''
              this.register[i].key = v
              break
          }
        })
      })
    },
    mounted(){
      this.$refs['register'].style.height = window.innerHeight + 'px'
    },
    components: {
      vpPubFooter
    },
    store
  }
</script>

