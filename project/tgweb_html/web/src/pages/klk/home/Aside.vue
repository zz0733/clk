<template>
  <ul class="qy-service">
    <li class="service" @click="goService">
      <div>
        <i></i>
      </div>
      <p>在线客服</p>
    </li>

    <li class="cs-mail">
      <div>
        <i></i>
      </div>

      <div class="shrink">
        klk22k@163.com
      </div>
      <p>投诉信箱</p>
    </li>

    <li class="open-user" @click="goResiter">
      <div>
        <i></i>
      </div>
      <p>免费开户</p>
    </li>

    <li class="shi-pay" @click="tryPlay">
      <div>
        <i></i>
      </div>
      <p>免费试玩</p>
    </li>

    <!-- <li class="cs-app">
                    <div>
                  <i></i>
               </div>
               <p>APP下载</p>
            </li> -->

    <li class="cs-goTop" @click="goTop">
      <div>
        <i></i>
      </div>
      <p>一键置顶</p>
    </li>

  </ul>
</template>

<script>
  import UserService from '@/service/public/UserService.js'
  import $ from 'jquery'

  export default {
    data () {
      return {}
    },
    methods: {
      goService () {
        // let url = JSON.parse(localStorage.config).service[0].url;
        window.open(
          'https://gzzaxc219.learnsaas.com/chat/chatClient/chatbox.jsp?companyID=938240&configID=41445&jid=1936571624&s=1'
        )
      },
      async tryPlay () {
        let res = await this.$http.post('/api/test/registerTest', {})
        if (res && res.code == 200) {
          UserService.setCache(res, 'test')
          window.location.reload()
        }
      },
      goResiter () {
        this.$router.push('/home/register')
      },
      goTop () {
        $('html,body')
          .stop()
          .animate({scrollTop: 0}, 500)
      }
    }
  }
</script>

<style lang="less" scoped>
  .qy-service {
    position: fixed;
    right: 20px;
    z-index: 99;
    top: 212px;
    li {
      position: relative;
      width: 65px;
      height: 65px;
      background-color: #fff;
      margin-bottom: 5px;
      border-radius: 5px;
      cursor: pointer;
      border: 1px solid #d6d6d6;
      div {
        height: 40px;
        line-height: 56px;
        text-align: center;
        i {
          display: inline-block;
          background: url("/static/klk/img/thirdparty/cebianlan-sprite.png") no-repeat top left;
          width: 19px;
          height: 25px;
        }
      }
      p {
        font-size: 14px;
        text-align: center;
      }
    }
    li:hover {
      background: url("/static/klk/img/thirdparty/service-bg.png");
      border: unset;
    }
    .service {
      i {
        background-position: 0 -33px;
      }
    }
    .cs-mail {
      i {
        background-position: 0 -68px;
      }
      .shrink {
        right: 70px;
        background: #fff;
        border: 2px solid #bb9a55;
        position: absolute;
        top: 0px;
        width: 150px;
        height: 62px;
        line-height: 62px;
        text-align: center;
        display: none;
      }
    }
    .cs-mail:hover {
      .shrink {
        display: block;
      }
    }
    .open-user {
      i {
        width: 43px;
        height: 26px;
        display: inline-block;
        margin: 8px 0;
        background: url("/static/klk/img/thirdparty/right_register.png") no-repeat;
      }
    }
    .shi-pay {
      i {
        width: 43px;
        height: 26px;
        display: inline-block;
        margin: 8px 0;
        background: url("/static/klk/img/thirdparty/right_freeplay.png") no-repeat;
      }
    }
    .cs-app {
      i {
        width: 20px;
        height: 26px;
        display: inline-block;
        margin: 8px 0;
        background: url("/static/klk/img/thirdparty/right_app.png") no-repeat;
      }
    }
    .cs-goTop {
      i {
        background-position: 0 -168px;
        height: 15px;
        width: 26px;
      }
    }
  }
</style>
