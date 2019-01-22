<template>
  <div class="set-bank">
    <!-- <cube-scroll> -->
      <div class="bank-info">
        <div class="row">
          <label>开户姓名</label>
          <input type="text" v-model="param.cardName" maxlength="15" placeholder="请输入开户姓名">
          <!-- <span v-else>{{param.cardName}}</span> -->
        </div>
        <div class="row" @click="bankNmaeShow=true">
          <label>开户银行</label>
          <span :class="{'spanActive': param.bankName != '请选择开户银行'}">{{param.bankName}}</span>
          <i class="fr icon iconfont h5-icon-next"></i>
        </div>
        <div class="row" @click="areaShow=true">
          <label>开户地区</label>
          <span :class="{'spanActive': param.cardAddress != '请选择银行开户城市'}">{{param.cardAddress}}</span>
          <i class="fr icon iconfont h5-icon-next"></i>
        </div>
        <div class="row">
          <label>开户网点</label>
          <input type="text" v-model="wangdian" placeholder="请输入开户网点名称">
        </div>
        <div class="row">
          <label>开户帐号</label>
          <input type="tel" v-model="param.cardNum" placeholder="请输入银行卡号" id="bankCard" maxlength="24">
        </div>
      </div>

      <div class="pay-info">
        <div class="row">
          <label>资金密码</label>
          <input type="password" v-model="param.payPassword" maxlength="6" placeholder="请输入资金密码">
        </div>
        <div class="row" v-if="this.$store.state.mainState.userinfo.cardNum =='noset'" @click="secretShow=true">
          <label>密保问题</label>
          <span>{{param.key}}</span>
          <i class="fr icon iconfont h5-icon-next"></i>
        </div>
        <div class="row" v-if="this.$store.state.mainState.userinfo.cardNum =='noset'">
          <label>密保答案</label>
          <input type="text" v-model="param.value" placeholder="请输入密保答案">
        </div>
      </div>

      <div class="attention">

        <p>注意事项：</p>

        <div>
          <p>1、请牢记资金密码,如果遗失,将无法取款</p>
          <p>2、请牢记密保答案,如果遗失,将无法找回或重置,也无法修改资金密码</p>
        </div>
      </div>

      <div class="sumbitBank bg-color " @click="setBank">
        提交信息
      </div>

      <div style="height:.3rem;"></div>
    <!-- </cube-scroll> -->

    <van-area v-if="areaShow" :area-list="areaList" :columns-num="2" class="van-area" @confirm="hanlderArea"
              @cancel="areaShow=false"/>
    <van-picker v-if="bankNmaeShow" class="van-area" show-toolbar @confirm="hanlderBankName" :columns="commBank"
                @cancel="bankNmaeShow=false"/>
    <van-picker v-if="secretShow" class="van-area" show-toolbar @confirm="hanlderSecret" :columns="secretData"
                @cancel="secretShow=false"/>
  </div>
</template>

<script>
import store from "@/vuex/store";
import areaList from "@/service/public/perosonal/van-area";
import UserService from "@/service/public/UserService.js";
import $ from "jquery";

export default {
  data() {
    return {
      secretData: [],
      commBank: [
        "工商银行",
        "农业银行",
        "建设银行",
        "招商银行",
        "中国银行",
        "浦发银行",
        "中信银行",
        "交通银行",
        "民生银行",
        "兴业银行",
        "邮政银行",
        "光大银行",
        "华夏银行",
        "浙商银行",
        "包商银行",
        "北京银行",
        "上海银行",
        "哈尔滨银行",
        "江苏银行"
      ],
      commData: [],
      areaShow: false,
      bankNmaeShow: false,
      secretShow: false,
      // bankName: "",
      areaList: areaList,
      wangdian: "",

      // cardAddress: "",
      // cardNum: "",
      // payPassword: "",
      // value: "",
      // key: "",
      param: {
        cardName: this.$store.state.mainState.userinfo.realName,
        cardAddress: "请选择银行开户城市",
        bankName: "请选择开户银行",
        key: ""
      }
    };
  },
  methods: {
    secretKey() {
      this.$http.post(`${this.$HOST_NAME}/member/secretKey`).then(res => {
        if (res.code == 200) {
          this.secretData = res.data;
          this.param.key = res.data[0];
        } else {
          if (res && res.message) {
            this.$newToast(res.message);
          } else {
            //this.$newToast("服务器报错");
          }
        }
      });
    },
    // commonBank() {
    //   this.$http.post(`${this.$HOST_NAME}/common/bank`).then(res => {
    //     if (res.code == 200) {
    //       res.data.forEach(v => {
    //         this.commBank.push(v.bankName);
    //         this.commData = res.data;
    //       });
    //     }
    //   });
    // },
    hanlderArea(area) {
      this.areaShow = false;
      if (area[0].name !== "选择省份" && area[1].name !== "选择城市") {
        this.param.cardAddress = area[0].name + area[1].name;
      }
    },
    hanlderBankName(val) {
      this.param.bankName = val;
      this.bankNmaeShow = false;
    },
    hanlderSecret(val) {
      this.param.key = val;
      this.secretShow = false;
    },
    setBank() {
      var reg = /^[\u4E00-\u9FA5]+$/;

      if (
        !reg.test(this.param.cardName) &&
        !this.$store.state.mainState.userinfo.realName
      ) {
        this.$newToast("请输入正确开户姓名");
        return false;
      }

      if (this.param.bankName == "请选择开户银行") {
        this.$newToast("请选择开户银行");
        return false;
      }
      if (this.param.cardAddress == "请选择银行开户城市") {
        this.$newToast("请选择银行开户城市");
        return false;
      }
      if (!this.wangdian) {
        this.$newToast("请输入开户网点");
        return false;
      }
      if (!this.param.cardNum) {
        this.$newToast("请输入银行帐号");
        return false;
      }
      if (!this.param.payPassword) {
        this.$newToast("请输入资金密码");
        return false;
      }
      if (
        !this.param.value &&
        this.$store.state.mainState.userinfo.cardNum == "noset"
      ) {
        this.$newToast("请输入密保答案");
        return false;
      }

      var cardAddressTemp = this.param.cardAddress;
      this.param.cardAddress = cardAddressTemp + this.wangdian;

      this.param.cardNum = this.param.cardNum.replace(/\s|\xA0/g, "");

      // let param = {
      //   bankName: this.bankName,
      //   cardName: this.cardName,
      //   cardNum: this.cardNum,
      //   cardAddress: this.cardAddress,
      //   key: this.key,
      //   value: this.value,
      //   bankId: 1,
      //   payPassword: this.payPassword
      // };

      this.$http
        .post(`/frontend/member/set-bank-info`, this.param, this.$headers)
        .then(res => {
          if (res && res.code == 200) {
            // this.$confirm(res.data);
            this.$toast.success("添加成功");
            this.$http.post(`${this.$HOST_NAME}/member/bank`).then(res => {
              if (res.code == 200) {
                res.data.forEach(v => {
                  v.cardNum = v.cardNum
                    .replace(/\s/g, "  ")
                    .replace(/(.{4})/g, "$1 ");

                  v.imgUrl = require(`../../../../../../assets/img/public/image/common/personal/bank/${
                    v.bankName
                  }.png`);
                });
                localStorage.bankData = JSON.stringify(res.data);
                this.$router.go(-1);
              }
            });
            UserService.vpGetBasicInfo.call(this);
          } else {
            // this.$errToast(res.message);
            if (res && res.message) {
              this.$newToast(res.message);
            } else {
              //this.$newToast("服务器报错");
            }
            this.param.cardAddress = cardAddressTemp;
          }
        });
    }
  },
  created() {
    this.secretKey();
    // this.commonBank();
  },
  mounted() {
    $("#bankCard").on("keyup", function() {
      //获取当前光标的位置
      var caret = this.selectionStart; //获取当前的value
      var value = this.value; //从左边沿到坐标之间的空格数
      var sp = (value.slice(0, caret).match(/\s/g) || []).length; //去掉所有空格
      var nospace = value.replace(/\s/g, ""); //重新插入空格
      var curVal = (this.value = nospace
        .replace(/\D+/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()); //从左边沿到原坐标之间的空格数
      var curSp = (curVal.slice(0, caret).match(/\s/g) || []).length; //修正光标位置
      this.selectionEnd = this.selectionStart = caret + curSp - sp;
    });
  },

  store
};
</script>

<style lang="less">
.set-bank {
  // height: 90%;
  // background: #f8f8f8;
  // overflow: hidden;
  // overflow-y: scroll;
  // -webkit-overflow-scrolling: touch;
  // padding-bottom: 1.08rem;
  .bank-info {
    background: #fff;
    margin-bottom: 0.2rem;
    .row {
      height: 1rem;
      overflow: hidden;
      line-height: 1rem;
      margin: 0 0.2rem;
      padding: 0 0.1rem;
      // border-bottom: 0.02rem solid #f5f5f5;
      position: relative;
      label {
        font-size: 0.28rem;
        color: #333;
        margin-right: 0.2rem;
      }
      span {
        font-size: 0.28rem;
        color: #888;
        &.spanActive {
          color: #424242;
        }
      }
      input {
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.28rem;
        width: 4rem;
        color: #424242;
      }
      i {
        color: #c7c7cb;
        font-size: 0.28rem;
      }
      .cube-select {
        padding: 0.05rem 0.4rem 0.2rem 0.2rem;
        border-radius: 0.04rem;
        font-size: 0.28rem;
        height: 0.9rem;
        line-height: 0.9rem;
        width: 80%;
        position: absolute;
        top: 0;
        right: 0.1rem;
        .cube-select-placeholder {
          display: none;
        }
        .cube-select-text {
          color: #333;
        }
      }
      .cube-select::after {
        border: none;
      }
    }
  }
  .pay-info {
    background: #fff;
    .row {
      height: 1rem;
      line-height: 1rem;
      margin: 0 0.2rem;
      padding: 0 0.1rem;
      // border-bottom: 0.02rem solid #f5f5f5;
      position: relative;
      overflow: hidden;
      label {
        font-size: 0.28rem;
        color: #333;
        margin-right: 0.2rem;
      }
      span {
        font-size: 0.28rem;
        color: #424242;
      }
      input {
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.28rem;
        width: 4rem;
        color: #424242;
      }
      i {
        color: #c7c7cb;
        font-size: 0.28rem;
      }
    }
  }

  .attention {
    padding: 0.25rem 0.3rem 0.35rem 0.3rem;
    p {
      font-size: 0.3rem;
      color: #ff0000;
      padding-bottom: 0.22rem;
    }
    div {
      p {
        color: #999999;
        font-size: 0.26rem;
        // padding-bottom: 0;
        // margin-bottom: 0.2rem;
      }
      p:nth-child(2) {
        line-height: 0.48rem;
      }
    }
  }
  .sumbitBank {
    margin: 0 0.2rem;
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: center;
    color: #fff;
    border-radius: 0.15rem;
    // background: linear-gradient(90deg, #ff5000, #ff8e00);
    font-size: 0.36rem;
  }

  .van-area {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 1002;
    .van-picker__toolbar {
      height: 0.8rem;
      line-height: 0.8rem;
      .van-picker__cancel,
      .van-picker__confirm {
        padding: 0 0.3rem;
      }
    }
  }
}
</style>
