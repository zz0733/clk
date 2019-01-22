<template>
  <div class="open-account">

    <div class="header" v-if="!refundShow">
    <span :class="{spanActive:spanActive==0}" @click="toggle(0)">
        <i class="cubeic-right" v-if="spanActive==0"></i>
        用户管理
      </span>
      <span :class="{spanActive:spanActive==1}" @click="toggle(1)">
        <i class="cubeic-right" v-if="spanActive==1"></i>
        邀请码管理
      </span>
    </div>

    <div class="open-content" v-if="!refundShow" v-show="!linkShow">

      <cube-scroll>
        <div class="title">
          <ul>
            <li v-for="(item,i) in openData" :key="i" :class="{openActive:openActive ==i}" @click="toggleNav(i,item)">
            <span>
                <img :src="item|capitalize" alt="">
                <label>{{item.name}}</label>
              </span>
            </li>

          </ul>
        </div>

        <div class="open-user" v-if="openActive ==0">
          <!-- <cube-input type="text" v-model="userName"></cube-input>  -->
          <div class="row">
            <label>账户:</label>
            <cube-input type="text" v-model="userName"></cube-input>
          </div>
          <div class="row">
            <label>默认密码:</label>
            <span>123456</span>
          </div>

          <div class="row" @click="caipiaoShow = true" style="margin-bottom:.2rem">
            <label>彩票返点:</label>
            <span>{{caipiaoActive}}</span>
            <span class="fr cubeic-arrow"></span>
          </div>


          <div @click="refundDetail(item,i)" class="row" v-for="(item,i) in refundData" :key="i">
            <label>{{item.name}}反水:</label>
            <span>{{item.active}}</span>
            <span class="fr cubeic-arrow"></span>
          </div>

          <div class="submitDomain" @click="createMember">
            立即开户
          </div>
        </div>

        <div class="open-link" v-if="openActive ==1">
          <div class="row" @click="caipiaoShow = true" style="margin-bottom:.2rem">
            <label>彩票返点:</label>
            <span>{{caipiaoActive}}</span>
            <span class="fr cubeic-arrow"></span>
          </div>
          <div @click="refundDetail(item,i)" class="row" v-for="(item,i) in refundData" :key="i">
            <label>{{item.name}}反水:</label>
            <span>{{item.active}}</span>
            <span class="fr cubeic-arrow"></span>
          </div>

          <div class="submitDomain" @click="createDomain">
            立即生成
          </div>
        </div>

        <div style="height:.2rem"></div>
      </cube-scroll>
    </div>

    <div class="refundSet" v-if="refundShow" v-show="!linkShow">

      <div class="refund-header">
        <span class="fl mh5-back" @click="goback"></span> {{refund.name}}返水
      </div>
      <cube-scroll>
        <div class="refund-title">
          <span></span> {{refund.name}}返水设置
        </div>

        <div class="refund-btn">
        <span>
            {{refund.name}}返水
          </span>
          <span>
            <img src="../../../../../assets/img/public/image/common/personal/angencyImg/jianshao.png" alt=""
                 @click="reduce">
            <img src="../../../../../assets/img/public/image/common/personal/angencyImg/zengjia.png" alt=""
                 @click="increase">
          </span>
        </div>

        <div class="refund-content">
          <!-- <cube-select v-model="aaaa" :options="['1']">
            </cube-select>           -->
          <div class="refund-row" v-for="(item,i) in refund.list" :key="i">
            <label>{{item.name}}:</label>
            <cube-select v-model="item.value" :options="item.key|redundCaplitalize"></cube-select>
          </div>
        </div>

        <div class="submitDomain" @click="submitRefund">
          保存
        </div>
        <div style="height:.2rem"></div>
      </cube-scroll>
    </div>

    <doiams v-if="linkShow"></doiams>

    <caipiao v-if="caipiaoShow" @caipiaoShow="setCaipiao"></caipiao>

  </div>
</template>

<script>
  import store from '@/vuex/store'
  import doiams from './link'
  import caipiao from './caipiao'

  let self
  export default {
    data () {
      return {
        aaaa: '1',
        spanActive: 0,
        openData: [
          {
            name: '精准开户',
            img: require('../../../../../assets/img/public/image/common/personal/angencyImg/wanjia.png'),
            hover: require('../../../../../assets/img/public/image/common/personal/angencyImg/wanjia-xuanzhong.png'),
            active: true
          },
          {
            name: '生成邀请链接',
            img: require('../../../../../assets/img/public/image/common/personal/angencyImg/daili.png'),
            hover: require('../../../../../assets/img/public/image/common/personal/angencyImg/dailiActive.png'),
            active: false
          }
        ],
        openActive: 0,
        userName: '',
        params: {},
        c: '',
        options1: [],
        options2: ['0.0', '0.1', '0.2', '0.3', '0.4', '0.5'],
        refundData: [],
        refundShow: false,
        linkShow: false,
        refund: {},
        refundI: 0,
        linkData: [],
        caipiaoShow: false,
        caipiaoActive: '未设置'
      }
    },
    methods: {
      toggle (i) {
        // this.params = {};
        if (i == 1) {
          this.linkShow = true
        } else {
          this.linkShow = false
        }
        this.spanActive = i
      },

      toggleNav (i) {
        this.openActive = i
        this.openData.forEach((v, num) => {
          if (i == num) {
            v.active = true
          } else {
            v.active = false
          }
        })
      },

      refundInfo () {
        this.$http.post(`${this.$HOST_NAME}/member/refundInfo`).then(res => {
          if (res.code == 200) {
            this.refundData = res.data.platform
            // console.log(this.refundData)
            localStorage.refund = JSON.stringify(this.refundData)
            this.refundData.forEach(item => {
              item.active = '未设置'
            })
            this.$loading(false)
          } else {
            if (res && res.message) {
              this.$newToast(res.message)
            } else {
              this.$newToast('服务器报错')
            }
          }
        })
      },
      refundDetail (item, i) {
        item.list &&
        item.list.forEach(intItem => {
          intItem.value = String(+intItem.value)
        })
        this.refundShow = true
        this.refund = item
        this.refundI = i
      },
      submitRefund () {
        this.refundData.forEach((v, i) => {
          if (i == this.refundI) {
            v = this.refund
            v.active = '已设置'
          }
        })
        this.refundShow = false
      },
      goback () {
        this.refundShow = false
      },
      reduce () {
        this.refund.list.forEach(v => {
          let refund = (v.value * 10 - 1) / 10
          v.value = String(refund <= 0 ? '0.0' : refund)
        })
      },
      increase () {
        let verifyrefund = JSON.parse(localStorage.refund)
        // let maxRefund;
        verifyrefund.forEach(v => {
          if (v.name == this.refund.name) {
            v.list.forEach((a, b) => {
              // maxRefund = a.refund;
              this.refund.list[b].value =
                this.refund.list[b].value * 10 + 1 >= a.value * 10
                  ? a.value * 1
                  : (this.refund.list[b].value * 10 + 1) / 10
              this.refund.list[b].value = String(this.refund.list[b].value)
            })
          }
        })
      },
      createDomain () {
        if (this.caipiaoActive == '未设置')
          return this.$newToast('彩票反点未设置')

        for (var i = 0; i < this.refundData.length; i++) {
          if (this.refundData[i].active == '未设置') {
            this.$newToast(`${this.refundData[i].name}反水未设置`)
            return false
          }
        }
        this.params.refundjson = this.productJsonParams()
        this.$http
          .post(`${this.$HOST_NAME}/Agency/createDomain`, this.params)
          .then(res => {
            if (res.code == 200) {
              this.$toast.success(res.data)
            } else {
              if (res && res.message) {
                this.$newToast(res.message)
              } else {
                this.$newToast('服务器报错')
              }
            }
          })
      },
      productJsonParams () {
        let sendParam = {}
        sendParam.refundjson = {}
        // {"视讯":[{"EBET_LIVE":"0.4"},{"DG_LIVE":"0.4"},{"LEBO_LIVE":"0.4"},{"LMG_LIVE":"0.4"},{"AB_LIVE":"0.4"},{"DS_LIVE":"0.4"},{"OG_LIVE":"0.4"},{"SA_LIVE":"0.4"},{"AG_LIVE":"0.4"},{"BBIN_LIVE":"0.4"},{"DS_LIVE":"0.4"}],
        // "电子":[{"MG_GAME":"0.4"},{"AE_GAME":"0.4"},{"TTG_GAME":"0.4"},{"JDB_GAME":"0.4"},{"DT_GAME":"0.4"},{"FG_GAME":"0.4"},{"CQ9_GAME":"0.4"},{"MW_GAME":"0.4"},{"KY_GAME":"0.4"},{"AG_GAME":"0.4"},{"BBIN_GAME":"0.4"},{"PT_GAME":"0.4"}],
        // "体育":[{"BBIN_SPORT":"0.4"},{"AG_SPORT":"0.4"},{"SHABA_SPORT":"0.4"},{"SX_SPORT":"0.4"}],
        // "vr彩票":[{"VR_LOTTERY":"0.4"}],
        // "棋牌":[{"CT_LOTTERY":"0.4"}]}
        this.refundData.forEach(v => {
          sendParam.refundjson[v.name] = [] //{视讯:[{BG_LIVE:"0.4"}]}
          v.list.forEach((a, b) => {
            sendParam.refundjson[v.name][b] = {}
            sendParam.refundjson[v.name][b][a.key] = a.value
          })
        })
        return JSON.stringify(sendParam.refundjson)
      },
      createMember () {
        let ifUserName = this.validateAccount(this.userName)
        if (!ifUserName) {
          this.$newToast('请输入5~20位字母与数字用户名')
          return false
        }
        if (this.caipiaoActive == '未设置')
          return this.$newToast('彩票反点未设置')
        for (var i = 0; i < this.refundData.length; i++) {
          if (this.refundData[i].active == '未设置') {
            this.$newToast(`${this.refundData[i].name}反水未设置`)
            return false
          }
        }
        this.params.userName = this.userName
        this.params.password = '123456'
        this.params.refundjson = this.productJsonParams()
        this.$http
          .post(`${this.$HOST_NAME}/Agency/createMember`, this.params)
          .then(res => {
            if (res.code == 200) {
              // this.params = {};
              this.userName = ''
              this.$toast.success(res.data)
              this.linkData = []
            } else {
              if (res && res.message) {
                this.$newToast(res.message)
              } else {
                this.$newToast('服务器报错')
              }
            }
          })
      },
      setCaipiao (falg, data) {
        falg ? (this.caipiaoActive = '已设置') : ''
        if (data) {
          let rebateData = JSON.parse(JSON.parse(localStorage.userinfo).rebate)
          for (let key in data) {
            data[key].forEach(v => {
              rebateData[v.id] = v.rebate
            })
          }
          this.params.rebate = JSON.stringify(rebateData)
        }
        this.caipiaoShow = false
      }
    },
    created () {
      this.$loading(true)
      this.refundInfo()
    },
    mounted () {
      self = this
    },
    destroyed () {
      delete localStorage.refund
      delete localStorage.rebatedata
      this.$loading(false)
    },
    filters: {
      capitalize: function (item) {
        if (item.active) {
          return item.hover
        } else {
          return item.img
        }
      },
      redundCaplitalize: function (value) {
        let refund
        let a
        // console.log(value)

        JSON.parse(localStorage.refund).forEach(v => {
          if (v.name == self.refund.name) {
            refund = v.list
          }
        })

        refund.forEach(v => {
          if (v.key == value) {
            a = v.value
          }
        })

        let arr = ['0.0']
        for (let i = 1; i <= a * 10; i++) {
          arr.push(String(i / 10))
        }
        return arr
      }
    },
    store,
    components: {
      doiams,
      caipiao
    }
  }
</script>

<style lang="less">
  .open-account {
    height: 92%;
    // background: #f1f1f1;
    // padding-bottom:1.08rem;
    .header {
      position: absolute;
      top: 0.26rem;
      left: 1.8rem;
      z-index: 66;
      width: 100%;
      height: 0.6rem;
      //  overflow: hidden;
      span {
        // width: 2.3rem;
        height: 0.6rem;
        // display: inline-block;
        border: 1px solid #bdbdbd;
        // line-height: 0.6rem;
        text-align: center;
        font-size: 0.3rem;
        color: #fff;
        padding: 0.15rem 0.2rem;
      }
      span:nth-child(2) {
        // margin-left: -0.1rem;
        border-left: none;
        padding: 0.15rem 0.3rem;
      }
      .spanActive {
        background: #f8f8f8;
        color: #f60;
        // margin-top: 0.02rem;
        //   border: .02rem solid #f1f1f1;
      }
    }
    .open-content {
      height: 100%;
      padding-bottom: 0.2rem;
      .title {
        height: 0.86rem;
        margin-bottom: 0.86rem;
        background: #fff;
        // border-bottom: .02rem solid #dbdbdb;
        // margin:  0 auto;
        padding: 0 1rem;
        text-align: center;
        margin-bottom: 0.1rem;
        ul {
          li {
            float: left;
            // width: 33.33%;
            width: 50%;
            text-align: center;
            height: 0.86rem;
            // padding: 0 .7rem;
            // margin: 0 1rem;
            line-height: 0.86rem;
            // padding-top: 0.08rem;
            label {
              display: inline-block;
              // width: 100%;
              // height: 100%;
              font-size: 0.32rem;
              vertical-align: middle;
            }
            img {
              width: 0.4rem;
              height: 0.32rem;
              display: inline-block;
              vertical-align: middle;
            }
          }
          .openActive {
            span {
              color: #f60;
              position: relative;
              display: inline-block;
            }
            span::after {
              content: "";
              position: absolute;
              width: 100%;
              height: 0.02rem;
              background: #f60;
              left: 0;
              bottom: 0.02rem;
            }
          }
        }
      }
      .open-user {
        .row {
          height: 1.1rem;
          background: #fff;
          line-height: 1.1rem;
          border-bottom: 0.02rem solid #f5f5f5;
          position: relative;
          label {
            display: inline-block;
            width: 2rem;
            text-align: right;
            font-size: 0.3rem;
          }
          .cube-select {
            padding: 0.1rem 0.4rem 0.2rem 0.2rem;
            border-radius: 0.04rem;
            font-size: 0.28rem;
            height: 1rem;
            line-height: 0.9rem;
            width: 80%;
            position: absolute;
            top: 0;
            right: 0.1rem;
            .cube-select-placeholder {
              display: none;
            }
          }
          .cube-select::after {
            border: none;
          }
          .cube-select-icon {
            border-width: 0.2rem 0.12rem 0 0.12rem;
            border-color: #ccc7c6 transparent transparent transparent;
          }
          span {
            margin-right: 0.28rem;
            font-size: 0.3rem;
            color: #aaa;
          }
          .cube-input {
            display: inline-block;
            width: 4rem;
            &::after {
              border: 1px solid #fff;
            }
          }
          input {
            font-size: 0.3rem;
            color: #aaa;
          }
        }
        .submitDomain {
          height: 0.9rem;
          line-height: 0.9rem;
          background: #f60;
          text-align: center;
          border-radius: 0.15rem;
          color: #fff;
          margin: 0.3rem 0.24rem;
        }
      }
      .open-link {
        .row {
          height: 1.1rem;
          background: #fff;
          line-height: 1.1rem;
          border-bottom: 0.02rem solid #f5f5f5;
          position: relative;
          label {
            display: inline-block;
            width: 2rem;
            text-align: right;
            font-size: 0.3rem;
          }
          .cube-select {
            padding: 0.1rem 0.4rem 0.2rem 0.2rem;
            border-radius: 0.04rem;
            font-size: 0.28rem;
            height: 1rem;
            line-height: 0.9rem;
            width: 80%;
            position: absolute;
            top: 0;
            right: 0.1rem;
            .cube-select-placeholder {
              display: none;
            }
          }
          .cube-select::after {
            border: none;
          }
          .cube-select-icon {
            border-width: 0.2rem 0.12rem 0 0.12rem;
            border-color: #ccc7c6 transparent transparent transparent;
          }
          span {
            margin-right: 0.28rem;
            font-size: 0.3rem;
            color: #aaa;
          }
        }
        .submitDomain {
          height: 0.9rem;
          line-height: 0.9rem;
          background: #f60;
          text-align: center;
          border-radius: 0.15rem;
          color: #fff;
          margin: 0.3rem 0.24rem;
        }
      }
    }
    .refundSet {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: #f9f9f9;
      padding-top: 1.08rem;
      .refund-header {
        height: 0.88rem;
        width: 100%;
        background: linear-gradient(90deg, #ff5100, #ff8e00);
        line-height: 0.88rem;
        text-align: center;
        color: #fff;
        font-size: 0.36rem;
        padding: 0 0.18rem;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1001;
        span {
          // font-size: 0.46rem;
        }
      }
      .refund-title {
        padding-left: 0.5rem;
        // margin-top: 1.08rem;
        height: 0.88rem;
        line-height: 0.88rem;
        background-color: rgba(255, 255, 255, 1);
        position: relative;
        font-size: 0.3rem;
        border-bottom: 1px solid #f5f5f5;
        span {
          position: absolute;
          left: 0.4rem;
          top: 0.24rem;
          width: 0.05rem;
          height: 0.38rem;
          background-color: rgba(255, 153, 0, 1);
        }
      }
      .refund-btn {
        // width: 7.5rem;
        height: 0.8rem;
        background-color: rgba(255, 255, 255, 1);
        line-height: 0.8rem;
        position: relative;
        margin-bottom: 0.2rem;
        span {
          padding-left: 0.4rem;
          width: 1.12rem;
          height: 0.4rem;
          line-height: 0.4rem;
          color: rgba(255, 153, 0, 1);
          font-size: 0.28rem;
          text-align: left;
          font-family: PingFangSC-Regular;
        }
        span:nth-child(2) {
          width: 3rem;
          float: right;
          padding-top: 0.25rem;
          // width: 100
          img {
            margin: 0 0.4rem;
            width: 0.3rem;
          }
        }
      }
      .refund-content {
        .refund-row {
          height: 1rem;
          line-height: 1rem;
          background: #fff;
          position: relative;
          border-bottom: 1px solid #f5f5f5;
          label {
            display: inline-block;
            width: 2rem;
            text-align: right;
            font-size: 0.3rem;
          }
          .cube-select {
            padding: 0.1rem 0.4rem 0.2rem 0.2rem;
            border-radius: 0.04rem;
            font-size: 0.28rem;
            height: 0.9rem;
            line-height: 0.8rem;
            width: 72%;
            position: absolute;
            top: 0;
            right: 0.1rem;
            .cube-select-placeholder {
              display: none;
            }
          }
          .cube-select::after {
            border: none;
          }
          .cube-select-icon {
            border-width: 0.2rem 0.12rem 0 0.12rem;
            border-color: #ccc7c6 transparent transparent transparent;
          }
        }
      }
      .submitDomain {
        height: 0.9rem;
        line-height: 0.9rem;
        background: #f60;
        text-align: center;
        border-radius: 0.15rem;
        color: #fff;
        margin: 0.3rem 0.24rem;
      }
    }
  }
</style>
