<template>
  <div>
    <div v-show="s1" class="TplFloatSet0 TplFloatSet TplFloatPic_1">
      <div class="dial" @click="openDial"></div>
      <div class="close" @click="s1 = false"></div>
    </div>
    <div v-show="s2" class="TplFloatSet TplFloatPic_1">
      <div class="kefu" @click="openKefu"></div>
      <div class="close" @click="s2 = false"></div>
    </div>
    <div class="tip" v-show="s3">
      <img src="/static/500wcp/img/hc_zhuanpan.gif"/>
      <span class="fa fa-fw fa-close" @click="s3 = false"></span>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    data () {
      return {
        s1: true,
        s2: true,
        s3: true
      }
    },
    methods: {
      addWindow () {
        window.addEventListener('scroll', this.scrollFunc)
      },
      scrollFunc () {
        $('.TplFloatPic_1').stop().animate({top: window.pageYOffset + 170}, 1000)
      },
      openKefu () {
        window.open('https://gzz833.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=83359&configID=41292&jid=9582045656&s=1')
      },
      openDial () {
        window.open('http://6668576.com/active/opportunity/')
      }
    },
    mounted () {
      this.addWindow()
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  .tip {
    position: fixed;
    bottom: 10px;
    left: 10px;
    width: 230px;
    height: 230px;
    z-index: 1000;
    img {
      width: 100%;
      height: 100%;
    }
    .fa {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 20px;
      font-weight: 700;
      &:hover {
        color: #f13131;
      }
    }
  }

  .TplFloatSet {
    position: fixed;
    z-index: 1000;
    top: 170px;
    right: 5px;
    width: 127px;
    height: 250px;
    background: url("/static/500wcp/img/online-right.png") no-repeat;
    .close {
      position: absolute;
      height: 24px;
      width: 100%;
      bottom: 0;
      left: 0;
    }
    .kefu, .dial {
      position: absolute;
      height: 220px;
      width: 100%;
      top: 0;
      left: 0;
    }
  }

  .TplFloatSet0 {
    left: 18px;
    background: url("/static/500wcp/img/online-left.png") no-repeat;
  }
</style>
