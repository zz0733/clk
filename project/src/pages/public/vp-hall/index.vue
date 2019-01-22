<template>
<div class="container">
  <vp-hall-header :hallDatas=hallDatas class="hall-header"></vp-hall-header>
  <div class="hall-out-wrap">
    <!-- <cube-scroll ref="scroll" :data="typelist"> -->
      <div class="all-container-wrap">
        <cube-slide ref="slide" :data="images" class="hall-swipe-wrap" :showDots="false" :autoPlay="true" :interval="5000">
          <cube-slide-item v-for="(item, index) in images" :key="index">
            <a :href="item.targets?item.title.includes('download')?hallDatas.downLoadUrl:publicHost+'/'+item.targets:'#'">
              <img :src="item.img">
            </a>
          </cube-slide-item>
        </cube-slide>

      </div>
      <div class="hall-content">
        <div class="hall-content-top">
          <van-notice-bar delay="0" :text="lantern" :left-icon="require('@assets/img/public/image/common/home/message.png')" />
          <div class="hall-content-type">
            <div class="type-list" :key="index" v-for="(item,index) in typelist" @click="showListFc(item)">
              <img :src='item.ico' alt="">
              <div :class="{'active':item.name==selName}" class="list-title">{{item.name}}</div>
            </div>
          </div>
        </div>
        <div class="hottab">
          <img src="@assets/img/public/image/common/home/hot.png" alt="">
          <div>热门</div>
        </div>
        <div class="lotterylist">
          <div class="lotteryitem" v-for="(item, index) in showList" :key="index" @click="goto(item)">
            <div class="imgbox">
              <img :src="publicUrl+item.icon" alt="">
            </div>
            <div class="namebox">
              <div class="name">{{item.name}}</div>
              <div class="tag">{{item.summary}}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="showDowLoad" class="hall-gasket"></div>

    <!-- </cube-scroll> -->
  </div>

  <vp-pub-footer v-on:showListFc=showListFc></vp-pub-footer>

  <div v-if="showDowLoad" class="downLoad animated bounceInRight">
    <img @click="downLoad" :src="hallDatas.downLoadPic" alt="">
    <div class="close" @click="closeFc"></div>
  </div>
</div>
</template>

<script>
// 要改的地方
// 1、上面的名字，样式部分。
// 2、自己写的数据对比部分。
// 3、返回数据。
// 4、核对ico部分

import vpHallHeader from "./hall-header";
import vpPubFooter from "@/pages/public/common/Footer";
import $ from "jquery";
import store from "@/vuex/store";
// ico图片获取
import mixin from "../../public/game/pubilc.js";
export default {
  props: {
    hallDatas: {
      type: Object
    }
  },
  mixins: [mixin],
  data() {
    return {
      images: [],
      typelist: [{
          parent: "slot",
          parent2: "chess",
          name: "电子游艺",
          ico: require("@assets/img/public/image/common/home/1.png"),
          router: "/personal_index/get_money"
        },
        {
          parent: "isLottery",
          name: "彩票游戏",
          ico: require("@assets/img/public/image/common/home/2.png"),
          router: "/personal_index/game_record"
        },
        {
          parent: "live_casino",
          name: "真人视讯",
          ico: require("@assets/img/public/image/common/home/3.png"),
          router: "/personal_index/pay_money"
        },
        {
          parent: "sport",
          name: "体育赛事",
          ico: require("@assets/img/public/image/common/home/4.png"),
          router: ""
        }
      ],
      selName: "",
      caipiao: [], //彩票列表
      showList: [], //显示列表
      publicUrl: "http://img.7900005.com/default/",
      lantern: "", //滚动文字
      showDowLoad: true,
      downloadAppTarget: "",
      publicHost: ""
    };
  },
  methods: {
    tiaozhuan(item) {
      console.log(item);
      // :href="item.title.includes('download')?'/static/klk/html/download/index.html':item.target"
    },
    changetype(item) {
      this.currenttype = item.name;
      this.currentlottery = "";
    },
    // 获取列表
    async getlottery() {
      this.$loading3(true);
      let res = await this.$http.post(`${this.$HOST_NAME}/games/facade`, {
        parent: "no"
      });
      if (res && res.code == 200) {
        this.caipiao = res.data;
        // let type="hall";
        let type=this.$route.query.type?this.$route.query.type: "hall";
        let name='';
        if(type=='sport'){
          name='体育赛事';
        }else if(type=='live_casino'){
          name='真人视讯';
        }else if(type=='isLottery'){
          name='彩票游戏';
        }else if(type=='slot'){
          name='电子游戏';
        }

        this.showListFc({
          parent:type,
          name:name
        });
        this.$loading3(false);
      } else {
        this.$loading3(false);
      }
    },
    showListFc(obj) {
      this.$router.push({
        path: '/home'
      });      
      this.showList = [];
      this.selName = obj.name;
      if (obj.parent == "hall") {
        this.caipiao.forEach((item, v) => {
          if (v < 20) {
            this.showList.push(item);
          }
        });
      } else if (obj.parent == "isLottery") {
        this.caipiao.forEach((item, v) => {
          if (item.isLottery == "yes" || item.parent == "vr_lottery") {
            this.showList.push(item);
          }
        });
      } else if (obj.parent == "live_casino") {
        this.caipiao.forEach((item, v) => {
          if (item.isLottery == "no" && item.parent == obj.parent) {
            this.showList.push(item);
          }
        });
      } else if (obj.parent == "slot" || obj.parent2 == "chess") {
        this.caipiao.forEach((item, v) => {
          if (item.isLottery == "no" && item.parent == obj.parent) {
            this.showList.push(item);
          } else if (item.isLottery == "no" && item.parent == obj.parent2) {
            this.showList.unshift(item);
          }
        });
      } else if (obj.parent == "sport") {
        this.caipiao.forEach((item, v) => {
          if (item.isLottery == "no" && item.parent == obj.parent) {
            this.showList.push(item);
          }
        });
      }
    },
    //获取banner
    async getbannner() {
      let res = await this.$http.post(`${this.$HOST_NAME}/site/position`, {
        position: "banner",
        clientType: "h5"
      });
      if (res && res.code == 200) {
        this.images = res.data[0] && res.data[0].body;
        this.downloadAppTarget = res.data[0] && res.data[0].downloadAppTarget;
      }
    },
    // 跳转
    gotoTop(item) {
      if (!localStorage.token) {
        location.href = "#/admin/login";
        return false;
      }
      if (item.name == "在线客服") {
        let service = JSON.parse(localStorage.config).service;
        window.open(service[0].url);
      } else {
        this.$router.push({
          path: item.router
        });
      }
    },
    goto(item) {
      if (item.status == "no") {
        this.$newToast("维护中");
        return false;
      }
      if (item.isLottery == "yes") {
        this.$loading2(true);
        this.$router.push({
          path: `/plays/tradition/${item.id}`
        });
      } else {
        if (
          item.parent == "live_casino" ||
          item.parent == "vr_lottery" ||
          item.parent == "sport"
        ) {
          this.getParam(item);
        } else {
          this.$loading2(true);
          this.$router.push({
            path: "/games",
            query: {
              id: item.classId,
              name: item.name
            }
          });
        }
      }
    },
    async getParam(item) {
      if (!localStorage.token) {
        location.href = "#/admin/login";
        return false;
      }
      let routeData = this.$router.resolve({
        path: "/plays/loading",
        query: {
          login: true,
          gameName: item.special_setting.gameName,
          platform: item.special_setting.platform
        }
      });
      window.open(routeData.href, "_blank");
    },
    async getPopups() {
      if (!this.$store.state.mainState.ifpourT || localStorage.token)
        return false;
      //获取弹框公告
      let res = await this.$http.post(`${this.$HOST_NAME}/site/notice`, {
        type: "popups",
        desc_client_type: "html"
      });
      if (res && res.code == 200) {
        if (!res.data.data.length) return false;
        this.$dialog
          .alert({
            title: "公告",
            message: res.data.data[0] && res.data.data[0].description
          })
          .then(() => {
            // on close
          });
        this.$store.commit("mainState/resetPour", false);
      }
    },
    async getlantern() {
      let res = await this.$http.post(`${this.$HOST_NAME}/site/notice`, {
        type: "lantern",
        desc_client_type: "html"
      });
      if (res && res.code == 200) {
        if (!res.data.data.length) return false;
        this.lantern = res.data.data[0] && res.data.data[0].description;
        this.lantern = this.lantern.replace(/(\n)/g, "");
        this.lantern = this.lantern.replace(/(\t)/g, "");
        this.lantern = this.lantern.replace(/(\r)/g, "");
        this.lantern = this.lantern.replace(/<\/?[^>]*>/g, "");
        this.lantern = this.lantern.replace(/\s*/g, "");
        this.lantern = this.lantern.replace(/&nbsp;/g, "");
        this.lantern = this.lantern.replace(/&nbsp;/g, "");
        this.lantern = this.lantern.replace(/§/g, "");
      }
      // 参数： type: lantern 走马灯
      // 参数： type: popups 弹窗
      // 参数： type: notice 提示
    },
    setConfig() {
      if (localStorage.config) {
        let config = JSON.parse(localStorage.config);
        this.publicUrl = config.statics + config.theme + "/";
      }
    },
    downLoad() {
      window.location.href=this.hallDatas.downLoadUrl;
    },
    closeFc() {
      this.showDowLoad = false;
    }
  },

  created: function() {
    this.setConfig(); //设置图片路径
    this.getlottery();
    this.getbannner();
    this.getlantern();
    this.getPopups();
  },
  mounted() {
    // this.$confirm("asdjksadjsa djasld")
    // this.$toast
    // this.$newToast('维护中');
    // this.$newToast('维护中');
    this.publicHost = window.location.origin;
  },
  components: {
    vpHallHeader,
    vpPubFooter
  },
  store
};
</script>

<style lang="less" scoped>
@import "../../../assets/less/public/var.less";
#wrapper {
  top: 0.88rem;
  bottom: 0;
  left: 0;
}

.hall-out-wrap {
  position: absolute;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
  // height: 100%;
  padding-top: 0.88rem;
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  position: static;  
  flex: 1;
}

.container {
  .hall-header {
    position: absolute;
    width: 100%;
    z-index: 100;
  }
  .hall-content {
    width: 100%;
    background-color: rgb(245, 245, 248);
    padding-left: 0.15rem;
    padding-right: 0.15rem;
    padding-top: 0.1rem;
    padding-bottom: 1.5rem;
    min-height: 11.6rem;
    .hall-content-top {
      width: 100%;
      // height: 2.1rem;
      background: #fff;
      border-radius: 0.1rem;
      /deep/.van-notice-bar {
        color: #000;
        background-color: transparent;
      }
      .hall-marquee-wrap {
        width: 100%;
        background: #fff;
        display: flex;
        border-top-right-radius: 0.1rem;
        border-top-left-radius: 0.1rem;
        border-bottom: 0.02rem solid @main-lottery-border-color;
        .ico {
          flex: 0.8;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 0.25rem;
          }
        }
        marquee {
          flex: 9;
          height: 0.55rem;
          span {
            line-height: 0.55rem;
            font-size: 0.26rem;
            color: #000;
          }
        }
      }
      .hall-content-type {
        width: 100%;
        overflow: hidden;
        padding: 0.15rem 0.2rem 0.15rem 0.2rem;
        .type-list {
          // font-weight: 600;
          // padding: .1rem .2rem  .2rem .2rem;
          width: 25%;
          // margin-left: 7.2%;
          text-align: center;
          float: left;
          img {
            // margin-top: 1.1rem;
            width: 0.98rem;
          }
          .list-title {
            font-size: 0.3rem;
            margin-top: 0.12rem;
            color: #555;
            &.active {
              color: @main-brder-color;
            }
          }
        }
      }
    }
    .hottab {
      width: 100%;
      height: 0.5rem;
      line-height: 0.5rem;
      img {
        float: left;
        width: 0.3rem;
        margin-top: 0.08rem;
      }
      div {
        float: left;
        font-size: 0.26rem;
        color: rgb(47, 47, 50);
        margin-left: 0.25rem;
      }
    }
    .lotterylist {
      width: 100%;
      border-radius: 0.2rem;
      background-color: #fff;
      // overflow: hidden;
      zoom: 1;
      overflow: hidden;
      .lotteryitem {
        height: 1.52rem;
        width: 50%;
        border-bottom: 0.02rem solid @main-lottery-border-color;
        //  border-bottom:.02rem solid red;
        float: left;
        padding: 0.25rem 0 0.25rem 0.36rem;
        // &:nth-child(2n){
        //   padding-left: 1rem;
        // }
        .imgbox {
          min-width: 1rem;
          float: left;
          img {
            width: 1rem;
          }
        }
        .namebox {
          margin-left: 0.1rem;
          padding-top: 0.1rem;
          float: left;
          .name {
            font-size: 0.32rem;
            font-weight: 600;
            color: #555;
            letter-spacing: 0.02rem;
          }
          .tag {
            font-size: 0.28rem;
            color: rgb(97, 98, 97);
            margin-top: 0.2rem;
            // font-weight: 600;
          }
          .name2 {
            padding-top: 0.25rem;
          }
        }
      }
    }
  }
  .all-container-wrap {
    overflow: hidden;
    .hall-swipe-wrap {
      height: 3rem;
      .van-swipe-item {
        align-items: center;
        justify-content: center;
        display: flex;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .cube-slide-item {
        img {
          width: 100%;
        }
      }
    }
  }
}

.downLoad {
  position: absolute;
  bottom: 1.04rem;
  z-index: 99;
  width: 100%;
  img {
    width: 100%;
  }
  .close {
    width: 0.8rem;
    height: 0.8rem;
    position: absolute;
    top: 0.2rem;
    left: 0.1rem;
  }
}
</style>
