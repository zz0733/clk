<template>
  <div class="footer" :style="{position:position }">
    <ul>
      <li :class="{text:$route.path == item.path}" @click="toggle(item.path)" v-for="(item,i) in footerList" :key="i">
        <img :src="$route.path == item.path?item.hover:item.icon" alt="">
        <p :class="{active:$route.path == item.path}">{{item.text}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import store from '@/vuex/store'
  import $ from 'jquery'

  export default {
    data () {
      return {
        footerList: [
          {
            text: '首页',
            icon: require('../../../../assets/img/public/image/common/home/h5-user-home.png'),
            hover: require('../../../../assets/img/public/image/common/home/h5-user-home-hover.png'),
            path: '/home'
          },
          {
            text: '存款',
            icon: require('../../../../assets/img/public/image/common/home/h5-user-deposit.png'),
            hover: require('../../../../assets/img/public/image/common/home/h5-user-deposit-hover.png'),
            path: '/personal_index/pay_money'
          },
          {
            text: '客服',
            icon: require('../../../../assets/img/public/image/common/home/h5-user-service.png'),
            hover: require('../../../../assets/img/public/image/common/home/h5-user-service-hover.png'),
            path: '/service'
          },
          {
            text: '投注记录',
            icon: require('../../../../assets/img/public/image/common/home/h5-user-offer.png'),
            hover: require('../../../../assets/img/public/image/common/home/h5-user-offer-hover.png'),
            path: '/personal_index/game_record'
          },
          {
            text: '我的',
            icon: require('../../../../assets/img/public/image/common/home/h5-user-my.png'),
            hover: require('../../../../assets/img/public/image/common/home/h5-user-my-hover.png'),
            path: '/personal/mine'
          }
        ],
        position: 'absolute'
      }
    },
    methods: {
      isMobile () {
        const Mobile = navigator.userAgent.toLowerCase()
        if (/iphone|ipad|ipod/.test(Mobile)) {
          return false
        } else if (/android/.test(Mobile)) {
          return true
        }
      },
      toggle (url) {
        if (url == '/service') {
          let service = JSON.parse(localStorage.config).service
          if (service[0]) {
            window.open(
              service[0].url
            )
          }
        } else if (url == '/discounts') {
          this.getbannner()
        } else if (url == '/home') {
          if (this.$route.path == '/home') {
            this.$emit('showListFc', {
              parent: 'hall'
            })
            return false
          }
          this.$router.push(url)
        } else {
          if (!localStorage.token) {
            location.href = '#/admin/login'
            return false
          }
          this.$router.push(url)
        }
      },
      async getbannner () {
        let res = await this.$http.post(`${this.$HOST_NAME}/site/position`, {
          position: 'banner',
          clientType: 'h5'
        })
        if (res && res.code == 200) {
          window.location.href = window.location.origin + '/' + res.data[0].activityTargets
        }

      },
    },
    created () {
      // this.$nextTick(() => {
      //   let flag = this.isMobile();
      //   flag ? (this.position = "absolute") : (this.position = "fixed");

      //   var oHeight = $(document).height();
      //   $(window).resize(function() {
      //     if ($(document).height() < oHeight) {
      //       $(".footer").css("position", "static");
      //     } else {
      //       $(".footer").css("position", 'fixed'); //adsolute或fixed，看你布局
      //     }
      //   });
      // });
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../assets/less/public/var.less";

  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    padding-top: 0.16rem;
    padding-bottom: 0.16rem;
    border-top: 0.02rem solid rgba(232, 232, 232, 0.7);
    z-index: 100;
    //   line-height: 0.49rem;
    ul {
      height: 100%;
      li {
        float: left;
        width: 20%;
        text-align: center;
        //   padding-top: .1rem;

        img {
          // height: .40rem;
          height: 0.34rem;
          // display: block;
          // margin:.1rem 0;
          margin-bottom: 0.12rem;
        }
        p {
          font-size: 0.26rem;
          color: #6c6c6c;
        }
      }
      .text {
        p {
          &.active {
            color: @main-brder-color;
          }
        }
      }
    }
  }
</style>
