<template>
  <div class="message-index">
    <nav>
      <a v-for="(item,index) in messageData" :key="index" :class="{'active':index == messageNum }"
         @click="messageNum = index">
        {{item.title}}
      </a>
    </nav>
    <div class="message-content"  ref="message-content" v-if="messageNum ==0">
      <div id="mescroll" class="mescroll" v-show="sentMessageShow">
        <div class="message-view" id="dataList">
          <div class="row" v-for="(item,index) in memeberMessage" :key="index"
               @click="detailData=item,sentMessageShow=false">
            <div class="row-top">
              <i class="icon iconfont h5-icon-message-icon" :class="{'text-color':item.received.length}"></i>
              <span class="top-title text-color" v-if="item.received.length">恭喜您，站长已回复信息</span>
              <span class="top-title" v-else>站长暂未回复</span>
              <span class="top-time">{{item.send_time}}</span>
            </div>
            <div class="row-bottom" v-html="item.content">
            </div>
            <i class="icon iconfont h5-icon-next "></i>
          </div>
        </div>
      </div>

      <div class="sent-message-view" v-show="!sentMessageShow">
        <div class="goback-header bg-color ">
          <span class="mh5-back" @click="sentMessageShow=true"></span>
          <span>消息中心</span>
        </div>
        <div class="sent-top">
          <div class="top-main">
            {{detailData.content}}
          </div>
          <div class="top-time">{{detailData.send_time}}</div>
        </div>
        <div class="sent-bottom" v-if="detailData.received.length">
          <div class="bottom-title">
            <i class="icon iconfont h5-icon-message-icon text-color"></i>
            <span class="text-color">站长回复</span>
          </div>
          <div class="bottom-content">
            <div class="bottom-main text-color">
              {{detailData.received[0].content}}
            </div>
            <div class="bottom-time">{{detailData.send_time}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="message-content"  ref="message-content" v-if="messageNum ==1">
      <div class="textarea">
        <textarea placeholder="请输入您的问题,我们会第一时间回复。谢谢" v-model="content"></textarea>
      </div>
      <div class="submit bg-color " @click="messageSubmit">
        提交
      </div>
    </div>
    <div class="message-content"  ref="message-content" v-if="messageNum ==2">
      <div id="mescroll" class="mescroll" v-show="memeberMessageShow">
        <div class="message-view" id="dataList">
          <div class="row" v-for="(item,index) in memeberMessage" :key="index" @click="getDetail(item)">
            <div class="row-top">
              <i class="icon iconfont h5-icon-message-icon" :class="{'text-color':item.status=='yes'}"></i>
              <span class="top-title" :class="{'text-color':item.status=='yes'}">{{item.title}}</span>
              <span class="top-time">{{item.send_time}}</span>
            </div>
            <div class="row-bottom" v-html="item.content">

            </div>
            <i class="icon iconfont h5-icon-next "></i>
          </div>
        </div>
      </div>
      <div class="message-detail" v-show="!memeberMessageShow">
        <div class="goback-header bg-color ">
          <span class="mh5-back" @click="memeberMessageShow=true"></span>
          <span>消息中心</span>
        </div>
        <div class="detail-title text-color">{{detailData.title}}</div>
        <div class="detail-content">
          <div class="content-main" v-html="detailData.content">
          </div>
          <div class="content-time">
            {{detailData.send_time}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import MeScroll from 'mescroll.js'
 import 'mescroll.js/mescroll.min.css'

export default {
  data() {
    return {
      messageData: [
        {
          title: "已发信息"
        },

        {
          title: "编写信息"
        },

        {
          title: "系统信息"
        }
      ],
      messageNum: 0,
      content: "",
      orderHis: [],
      mescroll: null,
      memeberMessage: [],
      memeberMessageShow: true,
      sentMessageShow: true,
      detailData: {
        received: []
      },
      url: "/member/messageReceived"
    };
  },
  methods: {
    messageSubmit() {
      if (!this.content) {
        this.$newToast("请输入信息内容");
        return false;
      }

      this.$http
        .post(`${this.$HOST_NAME}/member/messageSubmit`, {
          title: JSON.parse(localStorage.userinfo).userName,
          content: this.content
        })
        .then(res => {
          if (res.code == 200) {
            this.$toast.success(res.data);
            this.title = "";
            this.content = "";
          } else {
            this.$errToast(res.message);
          }
        });
    },
    createdMescroll() {
      this.mescroll = new MeScroll("mescroll", {
        up: {
          callback: this.upCallback, //上拉回调
          isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
          page: {
            size: 5
          }, //可配置每页8条数据,默认10
          toTop: {
            offset: 1000
          },
          empty: {
            warpId: "dataList",
            icon: require("../../../../../../assets/img/public/image/common/personal/userIndex/no-data.png"),
            tip: "暂无消息"
            //         btntext : "去逛逛 >" ,
            //         btnClick : function() {
            //          alert("点击了去逛逛按钮");
            //         }
          },
          htmlNodata: '<p class="upwarp-nodata">没有更多了</p>'
        }
      });
    },
    upCallback(page) {
      this.getListDataFromNet(
        page.num,
        curPageData => {
          if (page.num == 1) this.memeberMessage = [];
          this.memeberMessage = this.memeberMessage.concat(curPageData.data);
          this.$loading(false);
          this.mescroll.endByPage(
            curPageData.data.length,
            curPageData.per_page
          );
        },
        () => {
          this.mescroll.endErr();
        }
      );
    },
    getListDataFromNet(pageNum, successCallback, errorCallback) {
      setTimeout(() => {
        this.$http
          .post(`${this.$HOST_NAME}${this.url}?page=${pageNum}`, { prePage: 8 })
          .then(
            res => {
              res.data.data.forEach(v => {
                v.send_time = this.$moment
                  .unix(v.send_time - 0)
                  .format("YYYY-MM-DD");
              });
              this.orderHis = res.data;
              successCallback && successCallback(this.orderHis); //成功回调
            },
            err => {}
          );
      }, 500);
    },
    // 变更信息状态
    getDetail(item) {
      this.detailData = item;
      this.mescroll.destroy();
      this.memeberMessageShow = false;
      this.$http
        .post(`${this.$HOST_NAME}/member/messageDetail`, {
          id: item.id
        })
        .then(res => {});
    }
  },
  created() {
    this.$loading(true);
  },
  mounted() {
    this.$nextTick(()=>{
        let fontSize = +document.querySelector('html').style.fontSize.split('px')[0] / 100
        let clientHeight = document.body.clientHeight
        let contH = clientHeight - (187 ) * fontSize
        this.$refs['message-content'].style.height = contH + 'px'
    })
    this.createdMescroll();
  },
  watch: {
    // memeberMessageShow(newValue, oldValue) {
    //   if (newValue) {
    //     this.createdMescroll();
    //     this.mescroll.hideUpScroll();
    //   }
    // },
    messageNum(newValue, oldValue) {
      this.$nextTick(() => {
        this.memeberMessage = [];
        this.mescroll.destroy();
        this.mescroll.removeEmpty();

        this.detailData.received = [];
        if (newValue == 0) {
          this.url = "/member/messageReceived";
          this.createdMescroll();
        } else if (newValue == 2) {
          this.url = "/member/message";
          this.createdMescroll();
        }
      });
    }
  },
  destroyed() {
    this.mescroll.destroy();
  }
};
</script>

<style lang="less" scoped>
.message-index {
  // height: 92%;
  // overflow: hidden;
  nav {
    display: flex;
    background: #fff;
    padding: 0.25rem 0;
    a {
      flex: 1;
      text-align: center;
      font-size: 0.28rem;
      position: relative;
    }
  }
  .message-content {
    margin-top: 0.2rem;
    // display: flex;
    // flex-direction: column;
    .textarea {
      margin: 0 0.3rem;
      textarea {
        height: 3.2rem;
        width: 96%;
        border: 0;
        padding: 0.1rem;
        padding-top: 0.2rem;
        font-size: 0.28rem;
        color: #666;
        outline: none;
        -webkit-appearance: none;
      }
      textarea::-webkit-input-placeholder {
        color: #ccc;
      }
      textarea::-moz-placeholder {
        color: #ccc;
      }
      textarea:-ms-input-placeholder {
        color: #ccc;
      }
    }
    .message-view {
      background: #fff;
      .row {
        margin-left: 0.3rem;
        position: relative;
        padding-bottom: 0.34rem;
        &:last-child {
          border-bottom: none;
        }
        .row-top {
          padding-top: 0.3rem;
          position: relative;
          i {
            color: #cdcbce;
            margin-right: 0.16rem;
            vertical-align: middle;
            font-size: 0.3rem;
          }
          .top-title {
            color: #aaaaaa;
            font-size: 0.3rem;
            vertical-align: middle;
            display: inline-block;
            width: 3rem;
            line-height: 0.32rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .top-time {
            position: absolute;
            top: 0.34rem;
            right: 0.82rem;
            font-size: 0.26rem;
            color: #bbb;
          }
        }
        .row-bottom {
          padding-right: 0.82rem;
          padding-left: 0.72rem;

          padding-top: 0.26rem;
          font-size: 0.26rem;
          color: #aaa;
          line-height: 0.38rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .h5-icon-next {
          position: absolute;
          top: 0.7rem;
          right: 0.26rem;
          color: #c7c7cb;
          font-size: 0.24rem;
        }
      }
    }
    .message-detail {
      background: #fff;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      .goback-header {
        height: 0.88rem;
        line-height: 0.88rem;
        text-align: center;
        color: #fff;
        font-size: 0.36rem;
        padding: 0 0.18rem;
        position: relative;
        .mh5-back {
          position: absolute;
          left: 0.2rem;
        }
        span {
          font-weight: 600;
        }
      }
      .detail-title {
        height: 0.85rem;
        line-height: 0.85rem;
        text-align: center;
        font-size: 0.32rem;
        // color: #19A0F1;
        border-bottom: 1px solid #f8f8f8;
      }
      .detail-content {
        position: relative;
        .content-main {
          color: #888;
          font-size: 0.28rem;
          line-height: 0.48rem;
          padding: 0.3rem 0.3rem 0.87rem 0.3rem;
        }
        .content-time {
          position: absolute;
          font-size: 0.26rem;
          color: #bbb;
          bottom: 0.3rem;
          right: 0.3rem;
        }
      }
    }
    .sent-message-view {
      background: #fff;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      .goback-header {
        height: 0.88rem;
        line-height: 0.88rem;
        text-align: center;
        color: #fff;
        font-size: 0.36rem;
        padding: 0 0.18rem;
        position: relative;
        .mh5-back {
          position: absolute;
          left: 0.2rem;
        }
        span {
          font-weight: 600;
        }
      }
      .sent-top {
        position: relative;
        padding: 0.3rem 0.3rem 0.87rem 0.3rem;
        border-bottom: 1px solid #f8f8f8;
        .top-main {
          font-size: 0.28rem;
          line-height: 0.48rem;
          color: #888;
          line-height: 0.48rem;
        }
        .top-time {
          position: absolute;
          bottom: 0.3rem;
          right: 0.3rem;
          font-size: 0.26rem;
          color: #bbb;
        }
      }
      .sent-bottom {
        .bottom-title {
          padding-top: 0.3rem;
          padding-left: 0.3rem;
          position: relative;
          i {
            margin-right: 0.16rem;
            vertical-align: middle;
            font-size: 0.3rem;
          }
          span {
            font-size: 0.3rem;
            vertical-align: middle;
          }
        }
        .bottom-content {
          position: relative;
          padding: 0.3rem 0.3rem 0.87rem 0.3rem;
          .bottom-main {
            font-size: 0.28rem;
            line-height: 0.48rem;
            line-height: 0.48rem;
          }
          .bottom-time {
            position: absolute;
            bottom: 0.3rem;
            right: 0.3rem;
            font-size: 0.26rem;
            color: #bbb;
          }
        }
      }
    }

    .submit {
      margin: 0 0.3rem;
      margin-top: 0.32rem;
      height: 0.9rem;
      line-height: 0.9rem;
      text-align: center;
      color: #fff;
      font-size: 0.36rem;
      // border-radius: 0.15rem;
    }
  }
}
</style>
