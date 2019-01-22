<template>
<div>

  <div class="page-content">
    <div class="header">
      <div class="searchinfo">
        <img src="../../../assets/img/public/image/common/home/goBack.png" @click="goback()" alt="">
        <div class="searchdetail">
          <div class="item-input">
            <input type="text" placeholder="关键词搜索" v-model="searchWord">
          </div>
          <span class="search-btn" @click="changetype()">搜 索</span>
        </div>
        <div class="gametypes" @click="showlist"></div>
      </div>
    </div>

    <div class="game-out-wrap" id="game-out-wrap">
      <!-- <cube-scroll :data="rollList"> -->
      <div class="game-type" v-if="navlist.length">
        <van-tabs v-model="vanActive" class="hall-container-header dianZi" @click="select">
          <van-tab :key="index" v-for="(item,index) in navlist" :title="item.name">
          </van-tab>
        </van-tabs>
      </div>



      <div class="game-list">
        <div class="jiangchi">
          <div class="jackpot">
            <div class="dt-jackpot" v-show="$route.query.id!='42'">
              <h1 class="active">
                <span class="providername">{{jackpotName}}</span>总奖池:
              </h1>
              <div class="jackpotcount">
                <span class="num-item" style="left:.04rem;">￥</span>
                <span class="num-item" style="left:.5rem;">{{jackpotNum.toString().substring(0,1)}}</span>
                <span class="num-item" style="left:.94rem;">{{jackpotNum.toString().substring(1,2)}}</span>
                <span class="num-item" style="left:1.36rem;">{{jackpotNum.toString().substring(2,3)}}</span>
                <span class="num-item" style="left:1.78rem;">{{jackpotNum.toString().substring(3,4)}}</span>
                <span class="num-item" style="left:2.2rem;">{{jackpotNum.toString().substring(4,5)}}</span>
                <span class="num-item" style="left:2.62rem;">{{jackpotNum.toString().substring(5,6)}}</span>
                <span class="num-item" style="left:3.04rem;">{{jackpotNum.toString().substring(6,7)}}</span>
                <span class="num-item" id="numberfour" style="left:3.44rem;">{{jackpotNum.toString().substring(7,8)}}</span>
                <span class="num-item" id="numberthree" style="left:3.9rem;">{{jackpotNum.toString().substring(8,9)}}</span>
                <span class="num-item" style="left:4.3rem;">.</span>
                <span class="num-item" style="left:4.72rem;">{{jackpotNum.toString().substring(9,10)}}</span>
                <span class="num-item" style="left:5.14rem;">{{jackpotNum.toString().substring(10,11)}}</span>
              </div>
              <img src="../../../assets/img/public/image/game/dt-jackpot.png" alt="">
            </div>
          </div>
        </div>
        <div class="slot-game-list">
          <ul :key="index" v-for="(item,index) in gamedata">
            <li>
              <div class="game-info">
                <div class="picbox">
                  <img :src="publicUrl+item.images" alt="">
                </div>
                <div class="game-operation">
                  <div class="gamename">{{item.name}}</div>
                  <div v-show="Public_User!='test'" class="startgame" @click="trustLogin(item,0)">立刻游戏</div>
                  <div v-show="Public_User=='test'||!Public_User" class="trygame" @click="trustLogin(item,1)">免费试玩</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- </cube-scroll> -->
    </div>

  </div>
  <div @touchmove.prevent id="background" @click="hidelist"></div>
  <div id="gametypes">
    <!-- <cube-scroll> -->
    <div class="slot-game">
      <div class="providerlist">
        <h3>游戏平台</h3>
        <ul :key="index" v-for="(item,index) in rollList">
          <li>
            <a href="javascript:;" :class="{'active':item.id==$route.query.id}" @click="changeprovider(item)">{{item.name}}</a>
          </li>
        </ul>
      </div>
      <div class="typelist">
        <div class="space-border">
          <div class="border"></div>
        </div>
        <div v-show='navlist.length' class="typedetail">
          <h3>类型</h3>
          <ul :key="index" v-for="(item,index) in navlist">
            <li>
              <a href="javascript:;" :class="{'active':item.tag==currenttype}" @click="choosetype(item,index)">{{item.name}}</a>
            </li>
          </ul>
        </div>
        <div v-show='navlist.length' class="space-border">
          <div class="border"></div>
        </div>
        <div v-show='linelist.length' class="line">
          <h3>赔付线</h3>
          <ul :key="index" v-for="(item,index) in linelist">
            <li>
              <a href="javascript:;" :class="{'active':item.tag==currentline}" @click="chooseline(item)">{{item.name}}</a>
            </li>
          </ul>
        </div>
        <div v-show='linelist.length' class="space-border">
          <div class="border"></div>
        </div>
        <div v-show='thirtlist.length' class="line">
          <h3>游戏类型</h3>
          <ul :key="index" v-for="(item,index) in thirtlist">
            <li>
              <a href="javascript:;" :class="{'active':item.tag==thirtTag}" @click="chooseThirt(item)">{{item.name}}</a>
            </li>
          </ul>
        </div>
        <div v-show='thirtlist.length' class="space-border">
          <div class="border"></div>
        </div>
      </div>
    </div>
    <!-- <div id="btnbox">
          <a href="javascript:;" @click="reset()">重置</a>
          <a href="javascript:;" class="active" @click="hidelist()">完成</a>
        </div> -->
    <!-- </cube-scroll> -->
  </div>
</div>
</template>

<script>
import {
  _SetGet,
  _SetPost
} from '@/service/public/service.js'
import UserService from '@/service/public/UserService.js'
import $ from "jquery"
import mixin from "./pubilc.js"
export default {
  mixins: [mixin],
  data() {
    return {
      jackpotName: '',
      publicUrl: 'http://img.7900005.com/',
      rollList: [{
          id: '26',
          name: 'MG电子',
          class: 'mg',
          type: {
            list: [{
                name: "全选",
                tag: ""
              },
              {
                name: "最新游戏",
                tag: "NEW"
              },
              {
                name: "热门游戏",
                tag: "HOT"
              },
              {
                name: "经典游戏",
                tag: "CLA"
              },
              {
                name: "老虎机",
                tag: "SLO"
              },
              {
                name: "奖池游戏",
                tag: "JPT"
              }
            ]
          },
          line: {
            list: [{
                name: "全选",
                tag: ""
              },
              {
                name: "单线",
                tag: "1-1"
              },
              {
                name: "5-10线",
                tag: "5-10"
              },
              {
                name: "15-20线",
                tag: "15-20"
              },
              {
                name: "243游戏",
                tag: "243"
              },
              {
                name: "更多",
                tag: "MOR"
              },
            ]
          }
        },
        {
          id: '17',
          name: 'AG电子',
          class: 'ag',
          type: {
            list: [{
                name: "全选",
                tag: ""
              },
              {
                name: "最新游戏",
                tag: "NEW"
              },
              {
                name: "热门游戏",
                tag: "HOT"
              },
              {
                name: "老虎机",
                tag: "SLO"
              },
              {
                name: "大额投注",
                tag: "MAX"
              },
              {
                name: "小额投注",
                tag: "MIN"
              },
              {
                name: "经典拉霸",
                tag: "FRT"
              },
              {
                name: "消消乐",
                tag: "CLH"
              }
            ]
          },
          line: {
            list: [{
                name: "全选",
                tag: ""
              },
              {
                name: "5-10线",
                tag: "5-10"
              },
              {
                name: "15-20线",
                tag: "15-20"
              },
              {
                name: "25-30线",
                tag: "25-30"
              },
              {
                name: "更多",
                tag: "MOR"
              }
            ]
          }
        },
        {
          id: '19',
          name: 'PT电子',
          class: 'pt',
          type: {
            list: [{
                name: "全选",
                tag: ""
              },
              {
                name: "最新游戏",
                tag: "NEW"
              },
              {
                name: "热门游戏",
                tag: "HOT"
              },
              {
                name: "经典游戏",
                tag: "CLA"
              },
              {
                name: "奖池游戏",
                tag: "JPT"
              },
              {
                name: "老虎机",
                tag: "SLO"
              }
            ]
          },
          line: {
            list: [{
                name: "全选",
                tag: ""
              },
              {
                name: "单线",
                tag: "1-1"
              },
              {
                name: "5-10线",
                tag: "5-10"
              },
              {
                name: "15-20线",
                tag: "15-20"
              },
              {
                name: "243线",
                tag: "243"
              },
              {
                name: "更多",
                tag: "MOR"
              }
            ]
          },
          thirt: {
            list: [{
                name: "全选",
                tag: ""
              },
              {
                name: "卡通",
                tag: "ANI"
              },
              {
                name: "洛奇",
                tag: "RCK"
              },
              {
                name: "少女",
                tag: "GIR"
              },
            ]
          }
        },
        {
          id: '32',
          name: 'CQ9电子',
          class: 'cq9',
          type: {
            list: [{
                name: "全选",
                tag: ""
              },
              {
                name: "最新游戏",
                tag: "NEW"
              },
              {
                name: "热门游戏",
                tag: "HOT"
              },
              {
                name: "老虎机",
                tag: "SLO"
              },
              {
                name: "捕鱼游戏",
                tag: "FSH"
              }
            ]
          },
          line: {
            list: [{
                name: "全选",
                tag: ""
              },
              {
                name: "单线",
                tag: "1-1"
              },
              {
                name: "5-10线",
                tag: "5-10"
              },
              {
                name: "15-20线",
                tag: "15-20"
              },
              {
                name: "243线",
                tag: "243"
              }
            ]
          }
        },
        {
          id: '42',
          name: '开元棋牌',
          class: 'ky',
          type: {
            list: []
          },
          line: {
            list: []
          }
        },
        {
          id: '31',
          name: 'FG电子',
          class: 'fg',
          type: {
            list: []
          },
          line: {
            list: []
          }
        },
        {
          id: '29',
          name: 'JDB电子',
          class: 'jdb',
          type: {
            list: []
          },
          line: {
            list: []
          }
        },
        {
          id: '18',
          name: 'BBIN电子',
          class: 'bbin',
          type: {
            list: [{
                name: "全选",
                tag: ""
              },
              {
                name: "最新游戏",
                tag: "NEW"
              },
              {
                name: "热门游戏",
                tag: "HOT"
              },
              {
                name: "老虎机",
                tag: "SLO"
              },
              {
                name: "刮刮乐",
                tag: "SCR"
              },
              {
                name: "桌上游戏",
                tag: "TBL"
              },
              {
                name: "大型机台",
                tag: "LMC"
              }
            ]
          },
          line: {
            list: []
          }
        },
        {
          id: '27',
          name: 'AE电子',
          class: 'ae',
          type: {
            list: []
          },
          line: {
            list: []
          }
        },
        {
          id: '30',
          name: 'DT电子',
          class: 'dt',
          type: {
            list: [{
                name: "全选",
                tag: ""
              },
              {
                name: "最新游戏",
                tag: "NEW"
              },
              {
                name: "热门游戏",
                tag: "HOT"
              },
              {
                name: "老虎机",
                tag: "SLO"
              },
              {
                name: "奖池游戏",
                tag: "JPT"
              },
              {
                name: "经典游戏",
                tag: "CLA"
              }
            ]
          },
          line: {
            list: [{
                name: "全选",
                tag: ""
              },
              {
                name: "单线",
                tag: "1-1"
              },
              {
                name: "5-10线",
                tag: "5-10"
              },
              {
                name: "15-20线",
                tag: "15-20"
              },
              {
                name: "243线",
                tag: "243"
              },
              {
                name: "更多",
                tag: "MOR"
              }
            ]
          }
        },
        {
          id: '24',
          name: 'MW电子',
          class: 'mw',
          type: {
            list: []
          },
          line: {
            list: []
          }
        },
        {
          id: '28',
          name: 'TTG电子',
          class: 'ttg',
          type: {
            list: [{
                name: "全选",
                tag: ""
              },
              {
                name: "最新游戏",
                tag: "NEW"
              },
              {
                name: "热门游戏",
                tag: "HOT"
              },
              {
                name: "老虎机",
                tag: "SLO"
              },
              {
                name: "经典游戏",
                tag: "CLA"
              }
            ]
          },
          line: {
            list: [{
                name: "全选",
                tag: ""
              },
              {
                name: "单线",
                tag: "1-1"
              },
              {
                name: "5-10线",
                tag: "5-10"
              },
              {
                name: "15-20线",
                tag: "15-20"
              },
              {
                name: "243线",
                tag: "243"
              },
              {
                name: "更多",
                tag: "MOR"
              }
            ]
          }
        }
      ],
      navlist: [],
      linelist: [],
      thirtlist: [],

      gamedata: [],

      currenttype: '',
      currentline: '',
      thirtTag: '',
      searchWord: '',

      jackpotNum: 15289205900,
      setInter: null,
      vanActive: '0'
    }
  },
  methods: {
    trustLogin(item, bool) {
      if (!bool && !localStorage.token) {
        location.href = "#/admin/login";
        return false;
      } else {
        if (!localStorage.token) {
          this.tryPlay();
          return false;
        }
      }
      let routeData = this.$router.resolve({
        path: '/plays/loading',
        query: {
          platform: JSON.parse(item.special_setting).platform,
          gameName: JSON.parse(item.special_setting).gameName,
          name: item.name,
          login: true
        }
      });
      window.open(routeData.href, '_blank');
    },
    async changetype() {
      let res = await _SetPost(`${this.$HOST_NAME}/games/index`, {
        classId: this.$route.query.id,
        devices: 'h5',
        tag: this.currenttype + ',' + this.currentline + "," + this.thirtTag,
        name: this.searchWord
      });
      if (res && res.code == 200) {
        this.searchWord = "";
        this.gamedata = res.data;
      }

    },
    choosetype(item, index) {
      this.currenttype = item.tag;
      this.changetype();
      this.vanActive = index.toString();
    },
    chooseline(item) {
      this.currentline = item.tag;
      this.changetype();
    },
    chooseThirt() {
      this.thirtTag = item.tag;
      this.changetype();
    },

    changeprovider(item) {
      this.jackpotName = item.name;
      this.navlist = item.type.list;
      this.linelist = item.line.list;
      if (item.thirt) {
        this.thirtlist = item.thirt.list;
      } else {
        this.thirtlist = [];
      }
      this.clear();
      this.$router.push({
        path: `/games`,
        query: {
          id: item.id,
          name: item.name
        }
      })
      this.changetype();
    },
    select(index, title) {
      this.currenttype = this.navlist[index].tag;
      this.changetype();
    },
    clear() {
      this.currenttype = '';
      this.currentline = '';
      this.thirtTag = '';
      this.searchWord = '';
      this.vanActive = '0';
    },
    reset() {
      this.clear();
      this.changetype();
    },
    // 返回
    goback() {
      this.$router.push({
        path: '/'
      })
    },
    // 侧边动画
    showlist() {
      let back = document.getElementById('background')
      let gametypes = document.getElementById('gametypes')
      document.getElementById('game-out-wrap').style.overflowY = 'hidden'
      back.style.display = 'block'
      gametypes.style.display = 'block'
      gametypes.style.right = '0'
    },
    hidelist() {
      let back = document.getElementById('background')
      let gametypes = document.getElementById('gametypes')
      document.getElementById('game-out-wrap').style.overflowY = 'scroll'
      back.style.display = 'none'
      gametypes.style.display = 'none'
      gametypes.style.right = '-75%'
    },
    jackpotNumAdd() {
      clearInterval(this.setInter);
      this.setInter = setInterval(() => {
        this.jackpotNum = this.jackpotNum + 8.56;
      }, 100)
    }
  },
  created: function() {
    this.rollList.forEach((item) => {
      if (this.$route.query.id == item.id) {
        item.type.list ? this.navlist = item.type.list : this.navlist = [];
        item.line.list ? this.linelist = item.line.list : this.linelist = [];
        item.thirt ? this.thirtlist = item.thirt.list : this.thirtlist = [];
      }
    })
  },
  mounted() {
    this.jackpotName = this.$route.query.name;
    this.jackpotNumAdd();
    if (localStorage.config) {
      let config = JSON.parse(localStorage.config);
      this.publicUrl = config.statics;
    }
    this.changetype();
  },
  watch: {},
  components: {},
  beforeDestroy() {
    clearInterval(this.setInter);
  }
}
</script>
  
<style lang="less" scoped>
@import "../../../assets/less/public/var.less";
#wrapper {
  top: 1.1rem;
  bottom: 0;
  left: 0;
}

.page-content {
  min-height: 100%;
  .header {
    position: absolute;
    height: 1.1rem;
    width: 100%;
    background-color: #fff;
    z-index: 20;
    .searchinfo {
      height: 1.1rem;
      position: relative;
      background: linear-gradient(to right, #ff8f00, #ff5000);
      justify-content: space-around;
      align-items: center;
      display: flex;
      -webkit-box-orient: horizontal;
      flex-direction: row;
      zoom: 1;
      img {
        position: absolute;
        left: -0.1rem;
        width: 1.04rem;
      }
      .searchdetail {
        position: absolute;
        right: 1.1rem;
        top: .2rem;
        display: flex;
        .item-input {
          font-size: .28rem;
          input {
            color: #fff;
            border: 0 !important;
            border-radius: .34rem;
            padding-top: .04rem;
            height: .7rem;
            width: 3.2rem;
            vertical-align: middle;
            font-size: .3rem;
            line-height: .36rem;
            text-indent: .3rem;
            background-color: rgba(255, 255, 255, .2);
            letter-spacing: .04rem;
          }
          input::-webkit-input-placeholder {
            color: #fff;
          }
        }
        .search-btn {
          font-size: .3rem;
          background-color: rgba(255, 255, 255, .2);
          color: #fff;
          display: inline-block !important;
          width: 1rem;
          height: .7rem;
          border-radius: .08rem;
          margin-left: .2rem;
          line-height: .7rem;
          text-align: center;
        }
      }
      .gametypes {
        height: 1rem;
        width: 1rem;
        position: absolute;
        right: .06rem;
        background-image: url(../../../assets/img/public/image/common/home/topSort.png);
        background-size: 1rem;
        background-position: 0 .04rem;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        overflow-y: scroll;
      }
    }
  }
  .game-out-wrap {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    padding-top: 1.1rem;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
  }
  .game-type {
    width: 100%;
    background-color: rgb(238, 238, 238);
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0;
    z-index: 1;
    padding-top: .2rem;
    padding-bottom: .2rem;
  }
  .game-list {
    background-color: rgb(238, 238, 238);
    position: relative;
    z-index: 10;
    display: flex;
    -webkit-box-orient: vertical;
    flex-direction: column;
    .jiangchi {
      width: 100%;
      background: rgb(238, 238, 238);
      padding-bottom: .2rem;
      .jackpot {
        width: 100%;
        background-color: #fff;
        .dt-jackpot {
          padding: .1rem 0;
          position: relative;
          width: 7rem;
          margin: 0 auto;
          h1 {
            height: .4rem;
            line-height: .4rem;
            margin-bottom: .1rem;
            color: #ff8502;
            font-size: .36rem;
            margin: 0;
            padding: 0;
            font-weight: 400;
            display: none;
            margin-bottom: .1rem;
            &.active {
              display: block;
            }
            .providername {
              line-height: .4rem;
              color: #ff8502;
              font-size: .36rem;
            }
          }
          .jackpotcount {
            left: 1.36rem;
            bottom: .66rem;
            position: absolute;
            color: #fff;
            right: 0;
            .num-item {
              position: absolute;
              font-size: .29rem;
              left: .5rem;
              width: .26rem;
              display: inline-block;
              margin-right: .086rem;
              text-align: center;
            }
          }
          img {
            width: 7rem;
            border: none;
            vertical-align: middle;
          }
        }
      }
    }
    .slot-game-list {
      width: 100%;
      background-color: #fff;
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        li {
          .game-info {
            padding: .28rem .14rem 0 .28rem;
            float: left;
            width: 33%;
            box-sizing: border-box;
            border-radius: .2rem;
            position: relative;
            text-align: center;
            .picbox {
              border-radius: .3rem .3rem 0 0;
              overflow: hidden;
              background: #fff;
              height: 2rem;
              img {
                width: 100%;
                height: 2rem;
                display: block;
                text-shadow: 0 0 black;
              }
              .mg-pic {
                width: 200%;
                transform: translateX(-50%);
              }
            }
            .game-operation {
              height: auto;
              line-height: .64rem;
              border-radius: 0 0 .1rem .1rem;
              text-align: center;
              font-size: .28rem;
              .gamename {
                color: #787876;
                height: .64rem;
                overflow: hidden;
                word-wrap: break-word;
                word-break: break-all;
                line-height: .64rem;
              }
              .startgame {
                display: block;
                background: @main-brder-color;
                text-align: center;
                color: #fff;
                cursor: pointer;
                border-radius: .3rem;
                width: 90%;
                margin: 0 auto;
              }
              .trygame {
                display: block;
                background: #8ed700;
                text-align: center;
                color: #fff;
                cursor: pointer;
                border-radius: .3rem;
                width: 90%;
                margin: .1rem auto;
              }
            }
          }
        }
      }
    }
  }
}

#background {
  display: none;
  background-color: rgba(0, 0, 0, .5);
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: 100;
  transition: background-color 1s;
  left: 0rem;
}

#gametypes {
  overflow: auto;
  display: none;
  position: absolute;
  top: 0;
  // left: 0;
  bottom: 0;
  right: -75%;
  z-index: 9999;
  // padding: 0 0 .64rem 0;
  width: 75%;
  height: 100%;
  background: #fff;
  transition: right .85s;
  .slot-game {
    .providerlist {
      overflow: hidden;
      margin: 0;
      padding: 0;
      h3 {
        margin-bottom: .1rem;
        padding: 0 0 0 .24rem;
        font-size: .3rem;
        color: #ff7050;
        margin: 0;
        font-weight: 400;
        line-height: .56rem;
      }
      ul {
        padding: 0 .12rem;
        li {
          float: left;
          margin: 0 0 .12rem 0;
          padding: 0 .12rem;
          width: 50%;
          box-sizing: border-box;
          display: list-item;
          text-align: center;
          a {
            display: block;
            height: .56rem;
            background: #eee;
            border: .02rem solid #eee;
            line-height: .56rem;
            text-align: center;
            color: #666;
            border-radius: .3rem;
            overflow: hidden;
            text-decoration: none;
            cursor: pointer;
            &.active {
              background: #ff8502;
              color: #fff;
            }
          }
        }
      }
    }
    .typelist {
      .space-border {
        padding: 0 .3rem;
        .border {
          margin: .1rem 0;
          height: .02rem;
          width: 100%;
          background: #ccc;
        }
      }
      .typedetail,
      .line {
        overflow: hidden;
        h3 {
          margin-bottom: .1rem;
          padding: 0 0 0 .24rem;
          font-size: .3rem;
          color: #ff7050;
          line-height: .56rem;
        }
        ul {
          padding: 0 .12rem;
          li {
            float: left;
            margin: 0 0 .12rem 0;
            padding: 0 .12rem;
            width: 50%;
            box-sizing: border-box;
            text-align: center;
            a {
              display: block;
              height: .56rem;
              background: #eee;
              border: .02rem solid #eee;
              line-height: .56rem;
              text-align: center;
              color: #666;
              border-radius: .3rem;
              overflow: hidden;
              &.active {
                background: #ff8502;
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
}

#space-border {
  padding: 0 .3rem;
  .border {
    margin: .1rem 0;
    height: .02rem;
    width: 100%;
    background: #ccc;
  }
}

#btnbox {
  margin-top: .36rem;
  padding: 0 .3rem;
  a {
    width: 48%;
    height: .76rem;
    line-height: .76rem;
    background: #eee;
    border: .02rem solid #eee;
    font-weight: 700;
    font-size: .35rem;
    color: #666;
    border-radius: .3rem;
    text-decoration: none;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    &.active {
      background: #ff8502;
      border: .02rem solid #ff8502;
      color: #fff;
    }
  }
}
</style>
