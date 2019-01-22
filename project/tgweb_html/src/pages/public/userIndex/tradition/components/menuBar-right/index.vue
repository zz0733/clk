<template>
  <div class="lottery-menuBar-wrap" v-if="ifShow">
    <div v-if="showRule" class="menuBar-hold" @click="ifShowFc"></div>
    <div v-if="showRule" class="menuBar-cont menuBar-cont fadeInRightBig animatedSide">
      <div class="header bg-color " @click="toHistory">
        <div class="left-img">
          <img src="../../../../../../assets/img/public/image/lottery/plays-tradition/time-reload.png" alt="">
        </div>
        <div class="right-text">
          <div>即时注单</div>
          <div>{{betCount||'0'}}</div>
        </div>

      </div>
      <div class="list">
        <ul>
          <li @click="goTo(item)" :key=index v-for="(item,index) in list">
            <div class="ico">
              <img :src="item.ico" alt="">
            </div>
            <div class="item">
              <span>{{item.name}}</span><span class="item-select  cubeic-arrow"></span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div @touchmove.prevent v-if="!showRule" class="rule-box" @click="ifShowFc">
      <div class="cont-decial">
        <div class="header bg-color ">{{title}}规则说明</div>
        <div class="content">
          <iframe :src='url' frameborder="0"></iframe>
        </div>
        <div class="ruleFooter">
          <div class="btn bg-color ">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['title'],
    data () {
      return {
        list: [
          {
            name: '个人中心',
            ico: require('../../../../../../assets/img/public/image/lottery/plays-tradition/menu-center@3x.png'),
            router: '/personal/mine'
          },
          {
            name: '在线充值',
            ico: require('../../../../../../assets/img/public/image/lottery/plays-tradition/menu-recharge@3x.png'),
            router: '/personal_index/pay_money'
          },
          {
            name: '在线提款',
            ico: require('../../../../../../assets/img/public/image/lottery/plays-tradition/menu-withdrawals@3x.png'),
            router: '/personal_index/get_money'
          },
          {
            name: '投注记录',
            ico: require('../../../../../../assets/img/public/image/lottery/plays-tradition/menu-Recharge-record@3x.png'),
            router: '/personal_index/game_record'
          },
          {
            name: '开奖走势',
            ico: require('../../../../../../assets/img/public/image/lottery/plays-tradition/menu-Trend@3x.png'),
            router: '/plays/trend'
          },
          {
            name: '游戏规则',
            ico: require('../../../../../../assets/img/public/image/lottery/plays-tradition/menu-rules@3x.png'),
            router: ''
          }
          // {'name':'奖金说明',ico:menuInstructions,router:''}
        ],
        ifShow: false,
        url: '',
        showRule: true,
        betCount: 0
      }
    },
    methods: {
      ifShowFc (bool) {
        this.ifShow = !this.ifShow
        this.showRule = true
        if (!this.ifShow) return false
        this.balance()
      },
      goTo (item) {
        if (item.name == '游戏规则') {
          this.showRule = false
          return false
        }
        if (item.name == '开奖走势') {
          this.$router.push({
            path: item.router,
            query: {
              id: this.$route.meta.id,
              series: this.$route.meta.series
            }
          })
        } else {
          if (!localStorage.token && item.router) {
            this.$router.push({
              path: '/admin/login'
            })
            return false
          }
          this.$router.push({
            path: item.router
          })
        }
      },

      // 显示规则
      loadHtml () {
        if (localStorage.config) {
          this.url = `${JSON.parse(localStorage.config).statics}rules/${
            this.$route.meta.code
            }.html`
        }
        //  console.log(this.url)
      },
      async balance () {
        if (!localStorage.token) {
          return false
        }
        let res = await this.$http.post(
          `${this.$HOST_NAME}/games/getLotteryNoCount`,
          {}
        )
        if (res.code == 200) {
          this.betCount = res.data
        } else {
        }
      },
      toHistory () {
        if (!localStorage.token) {
          this.$router.push({
            path: '/admin/login'
          })
          return false
        }

        this.$router.push({
          path: `/personal_index/lottery?type=CT_LOTTERY&timeStart=${this.getToday(
            new Date() - 1000 * 60 * 60 * 24
          )}&timeEnd=${this.getToday(new Date())}&status=0`
        })
      }
    },
    created: function () {},
    mounted () {
      this.$nextTick(() => {
        this.loadHtml()
      })
    }
  }
</script>

<style lang="less" scoped>
  // @import "../../../../../assets/less/public/var.less";
  .lottery-menuBar-wrap {
    z-index: 102;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .menuBar-hold {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
    }
    .menuBar-cont {
      position: absolute;
      right: 0;
      top: 0;
      width: 200px;
      height: 100%;
      background: #fff;
      &.animatedSide {
        -webkit-animation-duration: .3s;
        animation-duration: .3s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
      }
      // -webkit-animation: animateSub @main-time ease-in-out 1 alternate;
      // -o-animation: animateSub @main-time ease-in-out 1 alternate;
      // -moz-animation: animateSub @main-time ease-in-out 1 alternate;
      // animation: animateSub @main-time ease-in-out 1 alternate;
      // @-webkit-keyframes animateSub {
      //   0% {right:-200px}
      //   100%{right:0}
      // }
      // @-moz-keyframes animateSub {
      //   0% {right:-200px}
      //   100%{right:0}
      // }
      // @-o-keyframes animateSub {
      //   0% {right:-200px}
      //   100%{right:0}
      // }
      // @-ms-keyframes animateSub {
      //   0% {right:-200px}
      //   100%{right:0}
      // }
      // @keyframes animateSub {
      //   0% {right:-200px}
      //   100%{right:0}
      // }
      .header {
        // background: @main-color;
        height: 86px;
        width: 100%;
        color: #ffffff;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        .left-img {
          padding-right: 10px;
          img {
            width: 50px;
          }
        }
        .right-text {
          div {
            &:first-child {
              padding-bottom: 6px;
            }
            &:last-child {
              text-align: center;
            }
          }
        }
      }
      .list {
        // padding: .23rem 0 0 .38rem;
        ul {
          padding-left: 25px;
          li {
            cursor: pointer;
            display: flex;
            // padding-bottom: .2rem;
            .ico {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 5%;
              // padding-right: .3rem;
              img {
                width: 22px;
                height: 22px;
              }
            }
            .item {
              color: #555555;
              font-size: 17px;
              width: 144px;
              height: 44px;
              line-height: 44px;
              border-bottom: 1px solid #f1f1f1;
              .item-select {
                float: right;
                padding-right: 25px;
                color: #dedbd4;
              }
            }
          }
        }
      }
    }
    .rule-box {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      .cont-decial {
        position: relative;
        width: 6rem;
        height: 8.6rem;

        background: #fff;
        border-radius: 0.2rem;
        .header {
          height: 0.8rem;
          line-height: 0.8rem;
          width: 100%;
          color: #fff;
          // background: @main-color;
          border-top-left-radius: 0.2rem;
          border-top-right-radius: 0.2rem;
          text-align: center;
        }
        .content {
          height: 6.03rem;
          -webkit-overflow-scrolling: touch;
          overflow-y: scroll;
          overflow-x: hidden;
          iframe {
            height: 6.03rem;
            width: 6.03rem;
          }
        }
        .ruleFooter {
          position: absolute;
          bottom: 0;
          width: 100%;
          padding: 0.3rem 0.2rem;
          .btn {
            // background: @main-color;
            height: 0.8rem;
            width: 5.6rem;
            line-height: 0.8rem;
            color: #fff;
            text-align: center;
          }
        }
      }
    }
  }
</style>
