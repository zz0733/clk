<template>
<div class="apply_open">
  <!-- 头部 -->
  <div class="header">
    <ul>
      <li>
        <span>用户开户</span>
      </li>
      <li class="aisle">
        <span :class="{spanActive:spanActive ==0}" @click="toggle(0)">精准开户</span>
      </li>
      <li class="aisle">
        <span :class="{spanActive:spanActive ==1}" @click="toggle(1)">生成邀请链接</span>
      </li>
    </ul>
  </div>
  <!-- 精准开户 -->
  <div class="content" v-if="spanActive ==0">
    <!-- 用户名 -->
    <div class="row">
      <label>用户名：</label>
      <input type="text" v-model="userName">
    </div>
    <!-- 默认密码 -->
    <div class="row">
      <label>默认密码：</label>
      <input type="text" v-model="password" disabled>
    </div>
    <!-- 返点赔率 -->
    <div class="row">
      <label>返点赔率：</label>
      <Select v-model="param.rebate">
            <Option v-for="(item,i) in options1" :key="i" :value="item">
              {{item}}
            </Option>
          </Select>
    </div>

    <!-- 反水设置 -->
    <div class="refundContent">

      <div class="bar" v-for="(item,i) in refundData" :key="i" :class="{refundList:refundList ==i}" @click="toggleRefund(i,item.list,item.name)">
        <label>{{item.name}}返水：</label>
        <span>{{item.active}}</span>
        <i class="ivu-icon ivu-icon-chevron-right"></i>
      </div>

      <div class="setRefund">

        <div class="setRefund-main" @click="MaxRefund">

          <div class="refund-row">
            <label>统一设置：</label>
            <img src="/static/public/image/userImg/jianshao.png" alt="" class="leftImg" @click="reduce">
            <img src="/static/public/image/userImg/zengjia.png" alt="" class="rightImg" @click="increase">
          </div>

          <div class="refund-row" v-for="(item,i) in setRefund" :key="i">
            <label>{{item.name}}：</label>

            <Select v-model="item.value" @on-change="MaxRefund"> 
                  <Option v-for="v in item.option" :value="v.value" :key="v.value">{{v.name}}</Option>
                </Select>

          </div>

        </div>
      </div>

    </div>

  </div>
  <!-- 生成邀请链接 -->
  <div class="content" v-if="spanActive ==1">
    <!-- 返点 -->
    <div class="row">
      <label>返点赔率：</label>
      <Select v-model="param.rebate">
            <Option v-for="(item,i) in options1" :key="i" :value="item">
              {{item}}
            </Option>
          </Select>
    </div>
    <!-- 反水设置 -->
    <div class="refundContent">

      <div class="bar" v-for="(item,i) in refundData" :key="i" :class="{refundList:refundList ==i}" @click="toggleRefund(i,item.list,item.name)">
        <label>{{item.name}}返水：</label>
        <span>{{item.active}}</span>
        <i class="ivu-icon ivu-icon-chevron-right"></i>
      </div>

      <div class="setRefund">

        <div class="setRefund-main" @click="MaxRefund">

          <div class="refund-row">
            <label>统一设置：</label>
            <img src="/static/public/image/userImg/jianshao.png" alt="" class="leftImg" @click="reduce">
            <img src="/static/public/image/userImg/zengjia.png" alt="" class="rightImg" @click="increase">
          </div>

          <div class="refund-row" v-for="(item,i) in setRefund" :key="i">
            <label>{{item.name}}：</label>

            <Select v-model="item.value" @on-change="MaxRefund">
                  <Option v-for="v in item.option" :value="v.value" :key="v.value">{{v.name}}</Option>
                </Select>

          </div>
 
        </div>
      </div>

    </div>
  </div>



  <div class="submitPay" @click="submitOpen">
    确认提交
  </div>
  <div class="toast" v-if="toastShow" :style="{top:toastNum+'px'}">
    {{toastText}}
  </div>

</div>
</template>

<script>
import mixins from './agency'
export default {
  mixins: [mixins],
  data() {
    return {
      // 切换用户开户,生成邀请链接的样式
      spanActive: 0,
      // 精准开户用户名
      userName: '',
      // 精准开户默认密码
      password: '123456',
      param: {},
      // 返点的数组
      options1: [],

    

    
      // 用来区别每一组反水
      refundName: '',

      url: `${this.$HOST_NAME}/Agency/createMember`,

      //  提示
      toastShow: false,
      toastNum: 86,
      toastText: ""
    }
  },
  methods: {
    toggle(i) {
      this.spanActive = i;
      this.toastShow = false;
    },
   
    submitOpen() {
      if (this.spanActive == 0) {
        this.param.userName = this.userName;
        this.param.password = this.password;

        if (!this.param.userName) {
          this.toastText = "请输入用户名";
          (this.toastNum = 80), (this.toastShow = true);
          return false;
        }

        if (!this.param.rebate) {
          this.toastText = "请选择返点赔率";
          (this.toastNum = 200), (this.toastShow = true);
          return false;
        }
      } else {
        this.url = `${this.$HOST_NAME}/Agency/createDomain`;
      }

      if (!this.param.rebate) {
        this.toastText = "请选择返点赔率";
        this.toastNum = 80;
        this.toastShow = true;
        return false;
      }

      this.toastShow = false;
      this.param.refundjson = this.productJsonParams();

      this.$http.post(this.url, this.param).then(res => {
        if (res.code == 200) {
          this.$success(res.data);
          this.param = {};
          this.userName = "";
        } else {
          this.$error(res.message);
        }
      });
    },
  },
  created() {
  
    this.$nextTick(() => {
      //  this.$store.commit("loading", true);
      this.getRefundInfo();
      for (
        let i = 170; i <= this.$store.state.mainState.userinfo.agencyInfo.rebate / 10; i++
      ) {
        this.options1.push(i + "0");
      };

    })
    // this.setRefund = this.refundData[0].list;


  }
}
</script>

<style lang="less">
.apply_open {
  // 头部
  .header {
    border-bottom: 1px solid #f3f3f3;
    height: 60px;
    line-height: 60px;
    padding-top: 10px;
    ul {
      li {
        // width: 126px;
        padding: 0 20px;
        font-size: 1.8em;
        height: 40px;
        float: left;
        line-height: 40px;
        text-align: center;
        border-right: 1px solid #dbdbdb;
      }
      .aisle {
        border: none;
        font-size: 1.6em;
        font-weight: 200;
        padding-left: 20px;
        span {
          padding: 6px 20px;
          cursor: pointer;
        }
        .spanActive {
          background: linear-gradient(180deg, #fe8983, #f0b761);
          border-radius: 10px;
          color: #fff;
        }
      }
    }
  }
  // 内容
  .content {
    border-bottom: 1px solid #f3f3f3;
    .row {
      margin-top: 20px;
      label {
        display: inline-block;
        width: 150px;
        text-align: right;
        font-size: 15px;
        font-family: "Microsoft YaHei";
        vertical-align: middle;
        margin-right: 5px;
      }
      input {
        height: 38px;
        font-size: 16px;
        background: #f5f5f5;
        border: 0 solid #f5f5f5;
        border-radius: 10px;
        // padding: 0 16px;
        text-align: left;
        text-indent: 1em;
        -webkit-box-shadow: inset 0 1px 10px 0 RGBA(0, 0, 0, 0.06);
        -moz-box-shadow: inset 0 1px 10px 0 RGBA(0, 0, 0, 0.06);
        box-shadow: inset 0 1px 10px 0 RGBA(0, 0, 0, 0.06);
        color: #666;
        &:not(.other) {
          width: 240px;
          height: 38px;
          background: #fdfdfd;
        }
        .ivu-radio {
          font-size: 16px;
          color: #666;
        }
      }
      input:focus {
        outline: none !important;
        border: 1px solid rgba(254, 134, 93, 0.6);
        box-shadow: inset 0 1px 10px 0 RGBA(0, 0, 0, 0.06), 0 1px 10px 5px rgba(254, 134, 93, 0.14);
      }
      .ivu-select {
        width: 240px;
        .ivu-select-dropdown-list {
          max-height: 160px;
        }
      }
      span {
        font-size: 14.25px;
        vertical-align: middle;
      }
      .ivu-radio-group {
        margin-left: 30px;
      }
      .radio-span {
        font-size: 1.2em;
        font-weight: 200;
        color: #999;
      }
    }
    .refundContent {
      position: relative;
      .bar {
        margin-top: 30px;
        padding-left: 60px;
        cursor: pointer;
        width: 30%;
        label {
          // width: 150px;
          cursor: pointer;
          padding-left: 5px;
          font-size: 15px;
          font-family: "Microsoft YaHei";
          vertical-align: middle;
          // background: linear-gradient(180deg, #fe8983, #f0b761);
          // color: #fff;
          // padding: 6.5px 8px;
          display: inline-block;
          height: 30px;
          width: 100px;
          line-height: 30px;
          text-align: center;
          border-radius: 10px 0 0 10px;
          // background: pink;
        }
        span {
          font-size: 15px;
          /* border: 1px solid #000; */
          /* display: inline-block; */
          display: inline-block;
          height: 30px;
          width: 90px;
          line-height: 30px;
          text-align: center;
          vertical-align: middle;
          margin-left: -3px;
          // background: #000;
          // color: #D7D7D7;
          margin-right: 10px;
          color: #666;
        }
        i {
          color: #bebebe;
          vertical-align: middle;
          font-size: 15px;
        }
      }
      .refundList {
        label {
          background: linear-gradient(180deg, #fe8983, #f0b761);
          color: #fff;
        }
        span {
          background: #f4f4f4;
        }
      }
      .setRefund {
        position: absolute;
        width: 214px;
        // height: 200px;
        top: 0;
        left: 288px;
        border: 1px solid #f5f5f5;
        overflow: hidden;
        max-height: 275px;
        .setRefund-main {
          padding: 5px 10px;
          // height: auto;
          height: 275px;
          max-height: 275px;
          overflow: auto;
          width: 140%;
          padding-right: 30px;
          position: relative;
          // padding-top: 30px;
          .refund-row {
            margin-bottom: 10px;
            position: relative;
            .leftImg {
              position: absolute;
              top: -2px;
              left: 105px;
              cursor: pointer;
            }
            .rightImg {
              position: absolute;
              top: -2px;
              left: 160px;
              cursor: pointer;
            }
            label {
              vertical-align: middle;
              display: inline-block;
              font-size: 14px;
              display: inline-block;
              width: 90px;
              text-align: right;
            }
            .ivu-select {
              width: 98px;
            }
            .ivu-select-single .ivu-select-selection {
              height: 24px;
              border-radius: 5px;
            }
            .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
            .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
              height: 24px;
              line-height: 24px;
            }
          }
        }
      }
    }
  }
  .submitPay {
    width: 140px;
    height: 42px;
    line-height: 42px;
    text-align: center;
    color: #fff;
    font-size: 1.8em;
    background: linear-gradient(180deg, #ff3494, #ff1c4b);
    border-radius: 5px;
    // margin-top: 25px;
    margin-top: 8px;
    margin-left: 160px;
    cursor: pointer;
  }
  .toast {
    width: 200px;
    height: 30px;
    line-height: 30px;
    background: #ff9900;
    color: #fff;
    font-size: 14px;
    font-weight: 200;
    position: absolute;
    right: 400px;
    top: 30px;
    border-radius: 5px;
    z-index: 99;
    text-indent: 1em;
  }
  .toast::after {
    content: "";
    width: 0;
    height: 0;
    border-width: 4px 8px 4px 0px;
    border-style: solid;
    border-color: transparent #f90 transparent transparent;
    display: block;
    position: absolute;
    top: 10px;
    left: -8px;
  }
}
</style>
