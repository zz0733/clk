<template>
  <div class="sports_main">


    <div class="wrapper">

      <ul>
        <li v-for="(item,i) in buyuData" :key="i">
          <div class="cover_hover"></div>
          <div class="cover" :style="{backgroundImage: 'url(' + item.img + ')'}"></div>
          <div class="title">
            <h2>{{item.name}}</h2>
            <h3>{{item.content}}</h3>
          </div>
          <p><a class="btn" @click="trustLogin({name:item.name,platform:item.platform,gameName:item.gameName})">开始游戏</a>
          </p>
          <p><a class="btn_ag" @click="trustLogin({name:item.name,platform:item.platform,gameName:item.gameName})"
                href="javascript:void(0)">游戏说明</a>
          </p>
        </li>


      </ul>
    </div>
  </div>
</template>

<script>
  import store from '@/vuex/store'
  import $ from 'jquery'
  import mixin from '../../../public/games/public.js'

  export default {
    mixins: [mixin],
    data () {
      return {
        buyuData: [
          {
            name: '皇冠体育',
            img: '/static/hsyl/img/bg_sports_01.png',
            content: '简单操作，自由编排',
            platform: 'sport',
            gameName: '21'
          },
          {
            name: 'BBIN体育',
            img: '/static/hsyl/img/bg_sports_02.png',
            content: '全新竞技 多种体验',
            platform: 'sport',
            gameName: '41'
          },
          {
            name: 'AG体育',
            img: '/static/hsyl/img/bg_sports_03.png',
            content: '经典玩法 玩法丰富',
            platform: 'sport',
            gameName: '22'
          },
          {
            name: '沙巴体育',
            img: '/static/hsyl/img/bg_sports_04.png',
            content: '各式赔率，一触即发',
            platform: 'sport',
            gameName: '20'
          }
        ]
      }
    },
    methods: {
      async thirdParty (platform, gameName) {
        // 判断本地有没有登录
        if (!localStorage.token || !localStorage.userinfo) {
          this.tryPlay()
          return false
        }
        this.loading = window.open(
          '/static/loading/index.html',
          'newwindow',
          'height=750,width=1285, top=0, left=' +
          (window.screen.availWidth - 1295) / 2 +
          ''
        )
        let res = await this.$http.post(`${this.$HOST_NAME}/games/index`, {
          platform: platform,
          tag: '',
          classId: gameName,
          limit: 20
        })
        if (res && res.code == 200) {
          this.login(res.data)
        } else {
          console.log('获取分页详情失败!')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .sports_main {
    position: relative !important;
    height: 900px;
    background: url("/static/hsyl/img/bg_sports.jpg") center top;

    .wrapper {
      width: 1400px;
      height: 100%;
      // margin: 0 auto;
      float: right;
      padding-top: 250px;
      padding-left: 60px;
      ul {
        li {
          width: 23%;
          // padding: 10px;
          // margin: 0 10px;
          // background: #000;
          height: auto;
          float: left;
          position: relative;
          text-align: center;
          .cover_hover {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 390px;
            z-index: 20;
            cursor: pointer;
          }
          .cover {
            width: 100%;
            height: 390px;
            // background: url("/static/hsyl/img/bg_fish_01.png") center
            //   center no-repeat;
            background-position: center center;
            background-repeat: no-repeat;
            transition: all 0.3s ease-in;

            z-index: 10;
          }
          .cover_hover:hover + .cover {
            transform: rotateY(180deg);
          }
          .cover_hover:hover ~ .title {
            animation: titleSlide 0.3s linear;
          }
          .title {
            position: absolute;
            left: 40px;
            top: 30px;
            color: #fff;
            text-align: left;
            h2 {
              font-size: 24px;
              line-height: 2;
            }
            h3 {
              font-size: 14px;
              line-height: 1.5;
              font-weight: normal;
            }
          }
          p {
            margin-top: 20px;
            a {
              display: inline-block;
              // width: 280px;
              width: 260px;
              height: 54px;
              line-height: 54px;
              text-align: center;
              color: #fff;
              font-size: 22px;
              box-sizing: border-box;
              border: 2px solid #fd7328;
              background: #fd7328;
              border-radius: 6px;
            }
            .btn_ag {
              color: #4d8ffa;
              border-color: #4d8ffa;
              background: transparent;
            }
            .btn_ag:hover {
              border-color: #74a6ff;
              color: #74a6ff;
              background: transparent;
            }
          }
        }
      }
    }
  }

  @keyframes titleSlide {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    50% {
      transform: translateY(20px);
      opacity: 0;
    }
    51% {
      transform: translateY(-20px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>
