<template>

  <div class="top_nav">
    <div class="nav-content">
      <div class="logo fl">
        <a href="javascript:void(0)" @click="goHome"><img src="/static/eyc/img/logo.png"></a>
      </div>

      <ul class="nav-bar fr">
        <li class="tpT" :class="{'navActive':navActive==i}" v-for="(item,i) in classifyList" :key="i">
          <img src="/static/eyc/img/icon/hot.gif" class="x-dh-i" alt="" v-if="item.hotShow">
          <span class="x-dh-t " @click="goLink(item,i)">{{item.name}}</span>
          <span class="x-dh-b" @click="goLink(item,i)">{{item.text}}</span>

          <div class="girl dropdown" v-if="item.list">
            <ol>
              <li v-for="(v,i) in item.list" :key="i" @click="thirdParty(v,item.platform)">
                <a href="javascript:void(0)">
                  <img :src="v.img" width="37" height="21" alt="" v-if="v.img">
                  <span>{{v.name}}</span>
                </a>
              </li>

            </ol>
          </div>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
import data from "../../public/games/public.js";
export default {
  mixins: [data],
  data() {
    return {
      classifyList: [
        {
          name: "网站首页",
          text: "HOMEPAGE",
          link: "/home"
        },
        {
          name: "传统彩票",
          text: "LOTTERY",
          hotShow: true,
          platform: "vr_lottery",
          link: "/plays/hall",
          list: [
            {
              name: "北京PK10",
              link: "/plays/tradition/2",
              id: "2"
            },
            {
              name: "香港六合彩",
              link: "/plays/tradition/1",
              id: "1"
            },
            {
              name: "重庆时时彩",
              link: "/plays/tradition/4",
              id: "4"
            },
            {
              name: "福彩3D",
              link: "/plays/tradition/11",
              id: "11"
            },
            {
              name: "上海时时乐",
              link: "/plays/tradition/29",
              id: "29"
            },
            {
              name: "排列三",
              link: "/plays/tradition/28",
              id: "28"
            },
            {
              name: "广东快乐十分",
              link: "/plays/tradition/5",
              id: "5"
            },
            {
              name: "江苏快三",
              link: "/plays/tradition/9",
              id: "9"
            }
          ]
        },
        // {
        //   name: "VR彩票",
        //   text: "VRLOTTERY",
        //   hotShow: true,
        //   platform: "vr_lottery",
        //   id: "13",
        // },
        {
          name: "电子游艺",
          text: "GAME",
          link: "/home/games"
        },
        {
          name: "捕鱼游戏",
          text: "FISHING",
          link: "/home/buyu"
        },
        {
          name: "真人娱乐",
          text: "LIVE CASINO",
          link: "/home/live",
          platform: "live_casino",
          list: [
            {
              name: "AG视讯",
              id: "14"
            },
            {
              name: "BBIN视讯",
              id: "15"
            },
            {
              name: "BG视讯",
              id: "44"
            },
            {
              name: "DG视讯",
              id: "33"
            },
            {
              name: "DS视讯",
              id: "16"
            },
            {
              name: "LEBO视讯",
              id: "35"
            },
            {
              name: "OG视讯",
              id: "39"
            },
            {
              name: "eBET视讯",
              id: "34"
            },
            {
              name: "LMG视讯",
              id: "36"
            },
            {
              name: "欧博视讯",
              id: "37"
            },
            {
              name: "SA视讯",
              id: "40"
            }
          ]
        },
        {
          name: "体育投注",
          text: "SPORTS",
          platform: "sport",
          link: "/home/sports",
          list: [
            {
              name: "皇冠体育",
              id: "21"
            },
            {
              name: "沙巴体育",
              id: "20"
            },
            {
              name: "BBIN体育",
              id: "41"
            },
            {
              name: "AG体育",
              id: "22"
            }
          ]
        },
        {
          name: "棋牌游戏",
          text: "CHESS",
          link: "/home/chess",
          platform: "KY_CHESS",
          gameName: "0",
          list: [
            {
              name: "斗地主",
              gameName: "610",
              platform: "KY_CHESS"
            },
            {
              name: "抢庄牛牛",
              gameName: "830",
              platform: "KY_CHESS"
            },
            {
              name: "炸金花",
              gameName: "220",
              platform: "KY_CHESS"
            },
            {
              name: "德州扑克",
              platform: "KY_CHESS",
              gameName: "620"
            },
            {
              name: "21点",
              platform: "KY_CHESS",
              gameName: "600"
            }
          ]
        },
        {
          name: "优惠活动",
          text: "PROMOTION",
          link: "/home/youhui",
          hotShow: true
        },
        {
          name: "在线客服",
          text: "SERVICE",
          link: "service"
        }
      ]
    };
  },
  methods: {
    goHome() {
      this.$router.push("/home");
    },
    goLink(item,i) {
      this.$store.commit("hsyl/setNav", i);
      if (item.link) {
        if (item.link == "service") {
          window.open(
            "https://gzz833.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=83358&configID=41301&jid=2035288252&s=1"
          );
        } else if (item.link == "/plays/hall") {
          window.open("#/plays/hall");
        } else {
          this.$router.push(item.link);
        }
      } else if (item.gameName) {
        this.trustLogin(item);
      }
    },
    thirdParty(item, platform) {
      if (item.link == "/plays/hall") {
        window.open("#/plays/hall");
        return false;
      }

      if (item.link.includes("/plays/tradition")) {
        window.open("#" + item.link);
        return false;
      }

      if (item.id) {
        this.getItemId(item);
      } else if (item.gameName) {
        this.trustLogin(item);
      } else if (item.num) {
        this.$router.push("/home/games?id=" + item.num);
      } else {
        this.$router.push(item.link);
      }
    }
  },
  computed: {
    navActive() {
      return this.$store.state.hsyl.navActive;
    }
  }
};
</script>

<style lang="less" scoped>
.top_nav {
  @h: 82px;
  @c: #ef3123;
  height: @h;
  background: #fff;
  border-bottom: 3px solid @c;
  .nav-content {
    width: 1200px;
    margin: auto;
    .logo {
      width: 221px;
      img {
        width: 100%;
      }
    }
    .nav-bar {
      height: @h;
      li {
        width: 100px;
        height: @h;
        float: left;
        position: relative;
        font-size: 12px;
        color: #000;
        line-height: @h;
        cursor: pointer;
        text-align: center;
        &.tpT {
          padding-top: 25px;
          line-height: 20px;
        }
        a {
          width: 100%;
          height: 100%;
          display: inline-block;
          .bg-home {
            width: 25px;
            height: 23px;
            display: block;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            background: url("/static/public/image/userImg/header_nav_sprites.png") -10px -10px;
          }
          .bg-home:hover {
            background: url("/static/public/image/userImg/header_nav_sprites.png") -55px -10px;
          }
        }
        .x-dh-i {
          position: absolute;
          top: 12px;
          right: 0px;
        }

        .x-dh-t {
          display: block;
          font-size: 14px;
          margin-bottom: 3px;
        }
        .x-dh-b {
          font-size: 12px;
          white-space: nowrap;
        }
        .dropdown {
          left: 0;
          width: 100%;
          display: none;
          position: absolute;
          top: @h;
          z-index: 999;
          background: rgba(0, 0, 0, 0.6);
          line-height: normal;
          color: #fff;
          font-size: 13px;
          border: 1px solid rgb(255, 255, 255);
          li {
            line-height: 40px;
            color: #fff;
            width: 100%;
            height: 40px;
            border-bottom: 1px solid #ccc;
            text-align: center;
            margin: 0;
            a {
              width: 100%;
              height: 100%;
              display: inline-block;
              text-align: center;

              color: #fff;
              img {
                border: 0;
                vertical-align: middle;
              }
            }
          }
          li:hover {
            background: @c;
          }
        }
      }
      li.navActive {
        background-color: @c;
        color: #fff;
      }
      li:hover {
        background-color: @c;
        color: #fff;
        .dropdown {
          display: block;
        }
      }
    }
  }
}
</style>
