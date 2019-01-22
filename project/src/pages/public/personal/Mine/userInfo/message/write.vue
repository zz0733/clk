<template>
   <div class="myinfo">




  <div id="mescroll" class="mescroll"  :class="{mainNone:detailShow ==false}">
      <!-- &lt;!&ndash;展示上拉加载的数据列表&ndash;&gt;s  -->
    
    <div   class="main" id="dataList" v-if="detailShow">
                <div class="row" @click="getDetail(item)" v-for="(item,i) in messageData" :key="i">
                      <!-- <div class="time">{{}}</div> -->
                      <div class="time">
                        {{item.send_time}}
                        
                        </div>
                       <div class="info">
                          <div :class="item.status">
                            {{item.title}}
                              <span class="fr" v-if="item.flag">未回复</span>
                              <span class="fr spanColor" v-else>已回复</span>
                            </div>
                            <p class="content" v-html="item.content"></p>
                       </div>
             </div>
              
         </div>
  </div>

           
         

            <div class="info-detail" v-if="!detailShow">
               
                       <div class="header">
                            <span class="fl mh5-back" @click="detailShow =true"></span>
                          信息详情
                       </div>
                        <cube-scroll>
                       <div class="write-main">
                          
                                   <div class="sent-info">
                                          <div class="sent-title">
                                                {{detailData.title}}
                                          </div>
                                          <div class="sent-content" v-html="detailData.content">                                                     
                                                           <p>{{detailData.send_time}}</p>
                                                        
                                          </div>
                                          
                                   </div>

                                    <div class="write-info" v-if="flag">

                                        <div class="write-title">
                                             网站回复：
                                        </div>

                                         <div class="write-content" v-html="writeContet">
                                        
                                         </div>
                                    </div>

                                   
                      </div>
                     </cube-scroll>                                                      
              </div>
   

   </div>
</template>


<script>
// import BScroll from "better-scroll";
import "../../../../../../assets/img/public/js/personal/mescroll-master/mescroll.m";
import touch from "@/service/public/perosonal/touch";
export default {
  data() {
    return {
      detailShow: true,
      detailData: {},
      messageData: [],
      i: 1,
      last_page: "",
      isLoading: false,
      orderHis: [],
      mescroll: null,
      writeContet: "",
      flag: false
    };
  },
  methods: {
    // getMessage() {
    //   this.$http.post(`${this.$HOST_NAME}/member/message?page=${this.i}`).then(res => {
    //     if (res.status == "success") {
    //       res.data.data.forEach(v => {
    //         v.send_time = this.$moment
    //           .unix(v.send_time - 0)
    //           .format("YYYY-MM-DD HH:mm");
    //       });
    //       this.last_page = res.data.last_page;
    //       this.messageData = res.data.data;
    //     }
    //   });
    // },
    getDetail(item) {
      this.$http.post(`${this.$HOST_NAME}/member/messageRead`, { id: item.id }).then(res=>{
        // if(res.code ==200){

        // }
      })

      this.detailData = item;
      if (item.received.length !== 0) {
        this.writeContet = item.received[0].content;
        this.flag = true;
      }else{
        this.flag = false;
      }

      this.detailShow = false;
    },
    upCallback(page) {
      // alert('上拉')
      //联网加载数据
      // var this = this;
      this.getListDataFromNet(
        page.num,
        // page.size,
        curPageData => {
          // console.log("curPageData", curPageData);
          //curPageData=[]; //打开本行注释,可演示列表无任何数据empty的配置

          // //如果是第一页需手动制空列表 (代替clearId和clearEmptyId的配置)
          if (page.num == 1) this.messageData = [];
          //更新列表数据
          this.messageData = this.messageData.concat(curPageData.data);
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
        this.$http.post(`${this.$HOST_NAME}/member/messageReceived?page=${pageNum}`).then(
          res => {
            res.data.data.forEach(v => {
              v.send_time = this.$moment
                .unix(v.send_time - 0)
                .format("YYYY-MM-DD HH:mm");

              if (v.received.length == 0) {
                v.flag = true;
              } else {
                v.flag = false;
              }
            });
            this.orderHis = res.data;
            // console.log(this.orderHis);
            successCallback && successCallback(this.orderHis); //成功回调
          },
          err => {}
        );
      }, 500);
    }
  },
  created() {
    this.$loading(true);
  },
  mounted() {
    this.mescroll = new MeScroll("mescroll", {
      //请至少在vue的mounted生命周期初始化mescroll,以确保您配置的id能够被找到
      up: {
        callback: this.upCallback, //上拉回调
        //以下参数可删除,不配置
        isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
        page: { size: 5 }, //可配置每页8条数据,默认10
        toTop: {
          //配置回到顶部按钮
          // src: "../res/img/mescroll-totop.png", //默认滚动到1000px显示,可配置offset修改
          // html: '<p>回到顶部</p>', //html标签内容,默认null; 如果同时设置了src,则优先取src
          offset: 1000
        },
        empty: {
          //配置列表无任何数据的提示
          warpId: "dataList",
          icon: require("../../../../../../assets/img/public/image/common/personal/userInfo/no-data.png")
          //         tip : "亲,暂无相关数据哦~" ,
          //         btntext : "去逛逛 >" ,
          //         btnClick : function() {
          //          alert("点击了去逛逛按钮");
          //         }
        },
        htmlNodata: '<p class="upwarp-nodata">没有更多了</p>'
        //vue的案例请勿配置clearId和clearEmptyId,否则列表的数据模板会被清空
        //vue的案例请勿配置clearId和clearEmptyId,否则列表的数据模板会被清空
        //      clearId: "dataList",
        //      clearEmptyId: "dataList"
      }
    });
  },
  destroyed() {
    this.$loading(false);
  }
};
</script>

<style lang="less" >
@import "../../../../../../assets/img/public/js/personal/mescroll-master/mescroll.min.css";

.myinfo {
  height: 92%;
  background: #f8f8f8;
  // padding-bottom: 0.5rem;
  //  z-index: -99;

  .main {
    position: relative;
    background: #f8f8f8;

    .row {
      height: 2.4rem;
      // background: #fff;
      .time {
        height: 0.8rem;
        line-height: 0.8rem;
        color: #999;
        font-size: 0.2rem;
        text-align: center;
      }
      .info {
        margin: 0 0.2rem;
        border: 1px solid #dbdbdb;
        height: 1.6rem;
        background: #fff;
        padding: 0.2rem 0.46rem 0.24rem 0.22rem;
        .no {
          font-size: 0.28rem;
          margin-bottom: 0.2rem;
          color: #000;
          span {
            font-size: 0.28rem;
            color: #000;
          }
          .spanColor {
            color: #ff5c00;
          }
        }
        .yes {
          font-size: 0.28rem;
          margin-bottom: 0.2rem;
          color: #999;
          span {
            font-size: 0.28rem;
            color: #999;
          }
          .spanColor {
            color: #ff5c00;
          }
        }
        .content {
          color: #676767;
          font-size: 0.26rem;
          height: 0.8rem;
          line-height: 0.4rem;
          overflow: hidden;
          position: relative;
          // z-index: 999;
          background: #fff;
        }
      }
    }
  }

  .info-detail {
    height: 92%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    .header {
      height: 0.88rem;
      background: linear-gradient(90deg, #ff5100, #ff8e00);
      line-height: 0.88rem;
      text-align: center;
      color: #fff;
      font-size: 0.36rem;
      padding: 0 0.18rem;
      margin-bottom: 0.2rem;
      span {
        // font-size: 0.46rem;
      }
    }
    .write-main {
      // margin-top: 0.6rem;
      // padding: 0 0.36rem;
      // line-height: 0.5rem;
      // font-size: 0.28rem;
      // text-indent: 0.5rem;
      // color: #000;
      .sent-info {
        .sent-title {
          height: 0.8rem;
          background: #fff;
          line-height: 0.8rem;
          font-size: 0.3rem;
          padding-left: 0.24rem;
        }
        .sent-content {
          padding: 0.3rem 0.24rem;
          font-size: 0.3rem;
          line-height: 0.5rem;
          p {
            margin-top: 0.2rem;
            margin-bottom: 0.3rem;
            text-align: right;
            font-size: 0.24rem;
            color: #999;
            padding: 0 0.36rem;
          }
        }
      }
      .write-info {
        .write-title {
          height: 0.8rem;
          line-height: 0.8rem;
          background: #fff;
          color: #f60;
          font-size: 0.3rem;
          padding-left: 0.24rem;
        }
        .write-content {
          padding: 0.3rem 0.24rem;
          font-size: 0.3rem;
          line-height: 0.5rem;
        }
      }
    }
  }
}

.mainNone {
  display: none;
}

.mescroll-empty .empty-icon {
  width: 60%;
}
.empty-tip {
  display: none;
}
</style>
