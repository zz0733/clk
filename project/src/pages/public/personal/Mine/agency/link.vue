<template>
<div class="inviteLink">
  <!--头部 -->
  <div class="title" v-if="!updataLinkShow">
    <span>邀请链接</span>
    <span>返点</span>
    <span>操作</span>
  </div>
  <!--内容  -->
  <div class="content" v-if="!updataLinkShow" :style="{height:linkData.length ==0?'0':'100%'}">
    <div id="mescroll" class="mescroll">
      <div class="main" id="dataList">
        <div class="row" v-for="(item,i) in linkData" :key="i">
          <label class="copy" v-clipboard:copy="item.domain" v-clipboard:success="onCopy" v-clipboard:error="onError"  ref="linkUrl" for="">
                                            <span>{{item.domain}}</span>
                                            <span >{{item.rebate}}</span>   
                                            <span >复制</span>                                    
                                        </label>
          <span class="btn">
                                          <!-- <span @click="updataDomain(item)">修改</span> -->
          <span @click="delDomain(item.id)">删除</span>
          </span>
        </div>
      </div>

    </div>
  </div>
  <!-- 修改链接 -->
  <div class="updataLink" v-if="updataLinkShow">
    <div class="link-header">
      <span class="fl mh5-back" @click="updataLinkShow = false"></span> 修改链接
    </div>

    <div class="link-title" v-if="!refundLinkShow">
      <cube-radio-group v-model="selected" :options="options" :horizontal="true" />
      <label class="text">用户状态：</label>
    </div>

    <div class="link-content" v-if="!refundLinkShow">

      <div class="row">
        <label>返点:</label>
        <cube-select v-model="rebate" :options="options1"></cube-select>
      </div>

      <div class="row" v-for="(val,key,i) in refund">
        <label>{{key}}:</label>
        <span class="fr cubeic-arrow" @click="goSet(val,key)"></span>
      </div>


      <div class="sumbit" @click="modifyDomain">确定</div>
      <div class="close" @click="updataLinkShow = false">取消</div>
    </div>

    <!--  修改反水-->
    <div class="refundSet" v-if="refundLinkShow">

      <div class="refund-header">
        <span class="fl mh5-back" @click="refundLinkShow = false"></span> {{refundKey}}反水
      </div>
      <cube-scroll>

        <div class="refund-title">
          <span></span> {{refundKey}}反水设置
        </div>

        <div class="refund-btn">
          <span>
                                      {{refundKey}}反水
                                    </span>
          <span>
                                          <img src="../../../../../assets/img/public/image/common/personal/angencyImg/jianshao.png"  alt="" @click="reduce">
                                          <img src="../../../../../assets/img/public/image/common/personal/angencyImg/zengjia.png" alt="" @click="increase" >
                                      </span>
        </div>

        <div class="refund-content">
          <div class="refund-row" v-for="item in refundVal">
            <label>{{item.name||item.key}}:</label>
            <cube-select v-model="item.refund" :options="item.key|redundCaplitalize"></cube-select>

          </div>
        </div>

        <div class="submitDomain" @click="saveRefund">
          保存
        </div>
        <div style="height:.2rem"></div>
      </cube-scroll>
    </div>

  </div>

  <div v-if="!linkData.length" style='margin:2rem 0;text-align: center;'><img src='../../../../../assets/img/public/image/common/personal/userInfo/no-data.png' width="60%" alt=''></div>
</div>
</template>

<script>
import store from "@/vuex/store";
import "../../../../../assets/img/public/js/personal/mescroll-master/mescroll.m.js";
import "../../../../../assets/img/public/js/personal/mescroll-master/mescroll.min.css";
let self;
export default {
  data() {
    return {
      linkData: [],
      alias: {},
      platform: {},
      updataLinkShow: false,
      refundLinkShow: false,
      options: [{
          label: "启用",
          value: "yes"
        },
        {
          label: "禁用",
          value: "no"
        }
      ],
      options1: [],
      // options2:['0.0','0.1','0.2'],
      rebate: "",
      selected: "yes",
      refund: {},
      refundKey: "",
      refundVal: [],
      mescroll: null,
      orderHis: []
    };
  },
  methods: {
    // 获取链接
    // getDomainsLink() {
    //   this.$loading(true);
    //   this.$http.get(`${this.$HOST_NAME}/Agency/getDomains?page=1`).then(res => {
    //     if (res.status == "success") {
    //       this.$loading(false);
    //       this.linkData = res.data.list.data;
    //       // this.linkData
    //     }
    //   });
    // },
    // 复制链接
    // copyFc(i){
    //   let container = this.$refs.linkUrl[i]
    //   this.$copyText("Text to copy", container)      
    // },
    onCopy() {
      this.$toast.success("复制成功");
    },
    onError() {
      this.$toast.success("复制成功");
    },
    // 删除链接
    delDomain(id) {
      this.$http
        .post(`${this.$HOST_NAME}/Agency/delDomain`, {
          id: id
        })
        .then(res => {
          if (res.status == "success") {
            // this.$confirm("删除成功");
            this.$toast.success("删除成功");
            // this.linkData = [];
            this.newScroll();


            // this.getDomainsLink();
          } else {
            this.$errToast(res.message);
          }
        });
    },

    // 修改链接
    updataDomain(item) {
      // console.log(item)
      this.rebate = String(parseInt(item.rebate));
      this.updataLinkShow = true;
      this.id = item.id;
      // console.log(JSON.parse(item.platform))
      this.refund = JSON.parse(item.platform);
      // console.log(this.refund)
    },
    // 打开反水设置
    goSet(val, key) {
      this.refundKey = key;
      this.refundLinkShow = true;
      let arr = [];
      val.forEach((v, i) => {
        arr[i] = {};

        arr[i].name = this.alias[Object.keys(v)[0]];
        arr[i].key = Object.keys(v)[0];
        arr[i].refund = String(Object.values(v)[0]);

        // v.name = this.alias[Object.keys(v)[0]];
        // v.key = Object.keys(v)[0];
        // let arr = Object.values(v);
        // v.refund = String(arr[0]);
      });
      // localStorage.setItem("refundArr", JSON.stringify(arr));
      this.refundVal = arr;
    },

    // 保存反水
    saveRefund() {
      let arr = [];

      this.refundVal.forEach((v, i) => {
        arr[i] = {};
        arr[i][v.key] = v.refund;
      });

      this.refund[this.refundKey] = arr;
      this.refundLinkShow = false;
    },

    // 減少
    reduce() {
      this.refundVal.forEach(v => {
        v.refund =
          v.refund * 10 - 1 <= 0 ? "0.0" : String((v.refund * 10 - 1) / 10);
      });
    },
    // 增加
    increase() {
      let arr = this.platform[this.refundKey];

      arr.forEach((v, i) => {
        if (Object.keys(v)[0] == this.refundVal[i].key) {
          this.refundVal[i].refund = String(
            this.refundVal[i].refund * 10 + 1 >= Object.values(v)[0] * 10 ?
            Object.values(v)[0] :
            (this.refundVal[i].refund * 10 + 1) / 10
          );
        }
      });
    },
    //  修改鏈接
    modifyDomain() {
      this.$http
        .post(`${this.$HOST_NAME}/Agency/modifyDomain`, {
          id: this.id,
          rebate: this.rebate,
          status: this.selected,
          refundjson: JSON.stringify(this.refund)
        })
        .then(res => {
          if (res.code == 200) {
            this.$toast.success(res.data);
          } else {

          }
        });
    },
    upCallback(page) {
      // alert('上拉')
      //联网加载数据
      // var this = this;
      this.getListDataFromNet(
        page.num,
        // page.size,
        curPageData => {
          // this.$loading(true)
          // console.log("curPageData", curPageData);
          //curPageData=[]; //打开本行注释,可演示列表无任何数据empty的配置

          // //如果是第一页需手动制空列表 (代替clearId和clearEmptyId的配置)
          if (page.num == 1) this.linkData = [];
          //更新列表数据
          this.linkData = this.linkData.concat(curPageData.data);
          this.$loading(false);
          // console.log(curPageData.data.length)

          // //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
          // //mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
          // console.log("page.num=" + page.num + ", page.size=" + page.size + ", curPageData.length=" + curPageData.length + ", this.pdlist.length==" + this.pdlist.length);
          //
          // //方法一(推荐): 后台接口有返回列表的总页数 totalPage
          this.mescroll.endByPage(
            curPageData.data.length,
            curPageData.per_page
          ); //必传参数(当前页的数据个数, 总页数)
        },
        () => {
          //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          this.mescroll.endErr();
        }
      );
    },
    getListDataFromNet(pageNum, successCallback, errorCallback) {
      //延时一秒,模拟联网
      setTimeout(() => {
        this.$http
          .get(`${this.$HOST_NAME}/Agency/getDomains?page=${pageNum}`)
          .then(
            res => {
              if (res.code == 200) {
                this.alias = res.data.alias;
                this.platform = res.data.platform;
                this.orderHis = res.data.list;
                this.$loading(false);
                // console.log(this.orderHis);
                successCallback && successCallback(this.orderHis); //成功回调
              } else {

              }
            },
            err => {}
          );
      }, 500);
    },
    newScroll() {
      this.mescroll = new MeScroll("mescroll", {
        //请至少在vue的mounted生命周期初始化mescroll,以确保您配置的id能够被找到
        up: {
          callback: this.upCallback, //上拉回调
          //以下参数可删除,不配置
          isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
          page: {
            size: 5
          }, //可配置每页8条数据,默认10
          toTop: {
            //配置回到顶部按钮
            // src: "../res/img/mescroll-totop.png", //默认滚动到1000px显示,可配置offset修改
            // html: '<p>回到顶部</p>', //html标签内容,默认null; 如果同时设置了src,则优先取src
            offset: 1000
          }
        }
      });
    }
  },
  created() {
    // this.getDomainsLink();
    this.$loading(true);

    for (
      let i = 170; i <= this.$store.state.mainState.userinfo.agencyInfo.rebate / 10; i++
    ) {
      this.options1.push(i + "0");
    }
  },
  mounted() {
    self = this;
    this.newScroll();
  },
  destroyed() {
    this.$loading(false);
  },
  store,

  filters: {
    redundCaplitalize: value => {
      // console.log(JSON.parse(localStorage.getItem('linkRefund')))
      // let linkRefund = JSON.parse(localStorage.getItem("linkRefund"));
      let refund = self.platform[self.refundKey];
      let a;
      refund.forEach(v => {
        if (Object.keys(v)[0] == value) {
          a = Object.values(v)[0];
        }
      });

      let arr = ["0.0"];
      for (let i = 1; i <= a * 10; i++) {
        arr.push(String(i / 10));
      }
      return arr;
    }
  }
};
</script>

<style lang="less" scoped>
.inviteLink {
  height: 100%;
  overflow-x: hidden;
  .title {
    height: 0.8rem;
    line-height: 0.8rem;
    background: #f9f9f9;
    padding: 0 0.36rem;
    font-size: 0.3rem;
    span:nth-child(1) {
      width: 4rem;
      display: inline-block;
    }
    span:nth-child(2) {
      width: 1.6rem;
      display: inline-block;
    }
  }
  .content {
    // background: #f1f1f1;
    // height: 100%;
    // width: 100%;
    #dataList {
      background: #fff;
    }
    .row {
      height: 0.9rem;
      line-height: 0.9rem;
      margin: 0 0.2rem;
      font-size: 0.26rem;
      border-bottom: 0.02rem solid #f5f5f5;
      .copy {
        span:nth-child(1) {
          // width: 4.2rem;
          width: 3.9rem;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          float: left;
        }
        span:nth-child(2) {
          // width: 1.2rem;
          width: .8rem;
          display: block;
          float: left;
          color: #999999;
        }
        span:nth-child(3) {
          color: #999999;
          display: block;
          float: left;
          margin-top: 0.25rem;
          width: 0.75rem;
          height: 0.4rem;
          line-height: 0.4rem;
          text-align: center;
          background: #f1f1f1;
          border-radius: 0.2rem;
          margin-right: 0.05rem;
        }
      }
      .btn {
        span {
          color: #999999;
          display: block;
          float: left;
          margin-top: 0.25rem;
          width: 0.75rem;
          height: 0.4rem;
          line-height: 0.4rem;
          text-align: center;
          background: #f1f1f1;
          border-radius: 0.2rem;
          margin-right: 0.05rem;
        }
      }
    }
  }
  .updataLink {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding-top: 0.88rem;
    height: 100%;
    // background: #fff;
    .link-header {
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
      z-index: 1002;
      span {
        // font-size: 0.46rem;
      }
    }
    .link-title {
      height: 1.2rem;
      background: #fff;
      padding-left: 1.6rem;
      position: relative;
      border-bottom: 1px solid #f5f5f5;
      // label{
      //   font-size: .3rem;
      //   // position: absolute;
      //   top: .5rem;
      //   left: .3rem;
      // }
      .cube-radio-group {
        background: transparent;
        width: 60%;
        height: 1.2rem;
        font-size: 0.28rem;
      }
      .cube-radio-group::after {
        border: none;
      }
      .text {
        position: absolute;
        top: 0.46rem;
        left: 0.2rem;
        font-size: 0.28rem;
        color: #666;
      }
    }
    .link-content {
      .row {
        height: 1rem;
        background: #fff;
        line-height: 1rem;
        border-bottom: 0.02rem solid #f5f5f5;
        position: relative;
        label {
          display: inline-block;
          width: 1.46rem;
          text-align: right;
          font-size: 0.28rem;
          color: #666;
        }
        /deep/ .cube-select {
          padding: 0.1rem 0.4rem 0.2rem 0.2rem;
          border-radius: 0.04rem;
          font-size: 0.28rem;
          height: 0.9rem;
          line-height: 0.85rem;
          width: 80%;
          position: absolute;
          top: 0;
          right: 0.1rem;
          /deep/ .cube-select-placeholder {
            display: none;
          }
        }
        /deep/ .cube-select::after {
          border: none;
        }
        /deep/ .cube-select-icon {
          border-width: 0.2rem 0.12rem 0 0.12rem;
          border-color: #ccc7c6 transparent transparent transparent;
        }
        span {
          margin-right: 0.28rem;
          font-size: 0.3rem;
          color: #ccc;
        }
      }
      .sumbit {
        margin: 0.3rem;
        background: linear-gradient(90deg, #ff5100, #ff8e00);
        height: 0.88rem;
        line-height: 0.88rem;
        text-align: center;
        color: #fff;
        font-size: 0.32rem;
        border-radius: 0.15rem;
      }
      .close {
        margin: 0.3rem;
        background: #666;
        height: 0.88rem;
        line-height: 0.88rem;
        text-align: center;
        color: #fff;
        font-size: 0.32rem;
        border-radius: 0.15rem;
      }
    }
    .refundSet {
      // height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: #f9f9f9;
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
        z-index: 1003;
        span {
          font-size: 0.46rem;
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
}
</style>
