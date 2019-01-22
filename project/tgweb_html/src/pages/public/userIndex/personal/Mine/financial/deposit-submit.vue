<template>
  <div class="deposit-form" v-if="$route.query.classType!='qr_code'">
    <!-- <cube-scroll ref="scroll"> -->
    <div class="off-line" v-if="depositBank.length !==0&&$route.query.name==='银行转账'">
      <div class="course">
        <p>帮助教程</p>
        <div class="pay-course">
          <span class="fl" @click="goWeixin">1.微信转银行卡教程</span>
          <span class="fr" @click="goZfb">2.支付宝转银行卡教程</span>
        </div>
        <h3>选择汇款卡号</h3>
        <ul class="clearfloat">
          <li v-for="(item,i) in depositBank" :key="i" @click="toggleLi(i,item)" :class="{'border-color':activeLi===i}">
            <img :src="item.bankName|capitalizeBank" alt="">
            <span>{{item.bankName}}</span>
          </li>
        </ul>
      </div>
      <div class="bank-info">
        <div class="row">
          <label>收款姓名</label>
          <span>{{deoisitList.cardName}}</span>
          <a class="bg-color" @click="onCopy(deoisitList.cardName)">复制</a>
        </div>
        <div class="row">
          <label>收款账号</label>
          <span>{{deoisitList.cardNum}}</span>
          <a class="bg-color" @click="onCopy(deoisitList.cardNum)">复制</a>
        </div>
        <div class="row">
          <label>开户网点</label>
          <span>{{deoisitList.cardAddress}}</span>
          <a class="bg-color" @click="onCopy(deoisitList.cardAddress)">复制</a>
        </div>
        <div class="row">
          <label>汇款方式</label>
          <cube-select class="cube-select" v-model="type" :options="options"></cube-select>
        </div>
        <div class="row">
          <label>汇款姓名</label>
          <input type="text" v-model="depositRealName" placeholder="请输入汇款姓名">
        </div>
        <div class="row">
          <label>汇款金额</label>
          <input type="tel" v-model="amount" placeholder="最少10元">
        </div>
      </div>
      <div class="payBtn bg-color" @click="bankSubmit" :class="{'active':!canClick}">
        确认提交
      </div>
      <div class="warmPrompt">
        温馨提示：银行帐号随时更换! 请每次存款都至 [银行转账] 进行操作，入款至已过期帐号，公司无法查收，恕不负责!
      </div>
      <div style="height:.8rem;"></div>
    </div>
    <div class="on-line" v-else-if="categoryData.length !==0">
      <div class="on-line-height" style="height:.2rem;background:#f9f9f9;"></div>
      <div class="vant-wrapper">
        <van-tabs>
          <van-tab v-for="(item,i) in categoryData" :class="{aisleActive:aisleActive ==i}" :key="i">
            <div slot="title" class="tab-title" @click="toggleAisle(item,i)">
              <!-- <img :src="$route.query.id|filterSrc(imgArr,staticsPath)" alt=""> -->
              <span>通道{{i+1}}</span>
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <div class="on-line-height" style="height:.2rem;background:#f9f9f9;"></div>
      <div class="recharge">
        <p>充值金额</p>
        <div>
          ￥ <input type="tel" v-model="mount" :placeholder="`单笔消费不能超过 ${maxMoney}`">
        </div>
        <ul class="clearfloat">
          <li v-for="(item,i) in moneyData" @click="mountMoney(item,i+1)" :key="i"
              :class="{'border-font-color':mountMoneyActive ==i+1}">{{item}}
          </li>
        </ul>
      </div>
      <div class="payBtn  bg-color" @click="onlinePayment" :class="{'active':!canClick}">
        支&nbsp;付
      </div>
      <div class="warmPrompt">
      <span v-if="$route.query.name.includes('线上')||$route.query.name=='银联钱包'||$route.query.name=='银联支付'">
          温馨提示：由于银行管制、导致第三方充值通道不稳定、如果充值一次未成功请换其它通道进行充值！
          </span>
        <span v-else>
            温馨提示：二维码随时会更换！请每次存款都至[{{$route.query.name.includes('线上')?$route.query.name.split('线上')[0]:$route.query.name}}]进行操作，入款至已过期二维码，公司无法查收，恕不负责!
          </span>
      </div>
      <div style="height:.8rem;"></div>
    </div>
    <div v-else class="no-pay-tongdao">
      <img src="../../../../../../assets/img/public/image/common/personal/userInfo/no-pay-tongdao.png" alt=""
           width="60%">
    </div>
    <!-- </cube-scroll> -->
  </div>
  <div v-else class="saveBox deposit-form">
    <!-- <cube-scroll ref="scroll"> -->
    <div v-if="categoryData.length !=0" class="wrap">
      <div class="vant-wrapper">
        <van-tabs>
          <van-tab v-for="(item,i) in categoryData" :class="{aisleActive:aisleActive ==i}" :key="i">
            <div slot="title" class="tab-title" @click="toggleAisle(item,i)">
              <!-- <img :src="$route.query.id|filterSrc(imgArr,staticsPath)" alt=""> -->
              <span>通道{{i+1}}</span>
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <div class="codeBox">
        <!-- :href="publicUrl+qr_code" :download="publicUrl+qr_code" -->
        <a>
          <img :src="publicUrl+qr_code" alt="">
          <div class="qrBt">长按二维码或截屏保存</div>
        </a>
      </div>
      <div class="inputBox">
        <div class="inpItem">
          <label>姓名：</label>
          <cube-input v-model="passKey.depositAccountName" type="text" placeholder="存款姓名"></cube-input>
        </div>
        <div class="inpItem">
          <label>订单号：</label>
          <cube-input v-model="passKey.order" type="text" placeholder="请输入订单号的后9位数字"></cube-input>
        </div>
        <div class="inpItem">
          <label>存款金额：</label>
          <cube-input v-model="passKey.money" type="tel"
                      :placeholder="'单笔限额'+passKey.min_amount+'~'+passKey.max_amount+'元'"></cube-input>
        </div>

        <!-- <input type="tel" v-model="mount" :placeholder="`单笔消费不能超过 ${maxMoney} 元！`"> -->
      </div>
      <div class="payBtn bg-color" @click="submitCode" :class="{'active':!canClick}">
        确认提交
      </div>
      <div class="warmPrompt">
      <span>
            温馨提示：二维码随时会更换！请每次存款都至[{{$route.query.name.includes('线上')?$route.query.name.split('线上')[0]:$route.query.name}}] 进行操作。入款至已过期二维码，公司无法查收，恕不负责!
          </span>
      </div>

      <!-- <div class="tipBox">
            <div class="title">温馨提示</div>
            <div class="content">
              <div>一、在支付成功之后请务必填写该页上方的汇款信息表格, 以便财务系统能够及时的为您确认并添加金额到您的会员账户中。
              </div>
              <div>二、公司财务系统将对银行存款的会员按实际存款金额实行返利派送。</div>
              三、收款二维码随时更换,请勿保存二维码。
            </div>
          </div>       -->
    </div>
    <div v-else class="no-pay-tongdao">
      <img src="../../../../../../assets/img/public/image/common/personal/userInfo/no-pay-tongdao.png" alt=""
           width="60%">
    </div>
    <!-- </cube-scroll> -->
  </div>
</template>
<script>
import $ from "jquery";

export default {
  data() {
    return {
      canClick: true,
      passKey: {
        money: "",
        order: "",
        time: "",
        codeId: "",
        max_amount: "",
        min_amount: ""
      },
      depositBank: [],
      deoisitList: {},
      type: "网银转账",
      options: [
        "网银转账",
        "手机转账",
        "支付宝转账",
        "微信转账",
        "银行柜台",
        "ATM现金",
        "ATM卡转",
        "其他"
      ],
      activeLi: 0,
      mount: "",
      maxMoney: "",
      minMoney: "",
      paymentId: "",
      payName: "",
      depositRealName: "",
      amount: null,
      categoryData: [],
      aisleActive: 0,
      moneyData: ["50", "100", "500", "1000", "5000"],
      mountMoneyActive: "",
      qr_code: "",
      publicUrl: "",
      titles: [
        {
          name: "银行转账",
          id: 0
        }
      ]
    };
  },
  computed: {
    imgArr() {
      return JSON.parse(localStorage.paylist);
    },
    staticsPath() {
      return localStorage.config && JSON.parse(localStorage.config).statics;
    }
  },
  filters: {
    capitalizeBank: function(value) {
      // return `../../../../../assets/img/
      // return `${this.$HOST_ENVI}../../../../../assets/img/
      try {
        return require(`../../../../../../assets/img/public/image/common/personal/bank/${value}logo.png`);
      } catch (err) {
        return require(`../../../../../../assets/img/public/image/common/personal/bank/bankpay@3x.png`);
      }
    }
    // filterSrc(id, arr, path) {
    //   let target = arr.filter(item => item.id == id)[0];
    //   return path + target.classIcon;
    // }
  },
  created() {
    this.$nextTick(() => {
      if (!localStorage.token) {
        this.$router.push("/");
        this.$router.push("/admin/login");
      } else {
        this.$loading(true);
        const { classType, id } = this.$route.query;
        switch (classType) {
          case "payment":
            this.paymentShow();
            break;
          case "qr_code":
            this.getCode("h5", id);
            break;
          case "yinHang":
            this.getDepositBank();
            break;
          default:
            this.paymentShow();
            break;
        }
      }
    });
  },
  methods: {
    onCopy(text) {
      this.$copyText(text.replace(/\s*/g, ""))
        .then(() => {
          this.$newToast("复制成功");
        })
        .catch(() => {
          this.$newToast("复制成功");
        });
    },
    goWeixin() {
      this.$router.push({
        name: "转账帮助",
        params: {
          name: "wechat"
        }
      });
    },
    goZfb() {
      this.$router.push({
        name: "转账帮助",
        params: {
          name: "alipay"
        }
      });
    },
    // 选择银行卡
    toggleLi(i, val) {
      this.activeLi = i;
      this.deoisitList = val;
    },
    // 充值金额选项
    mountMoney(v, i) {
      this.mount = v;
      this.mountMoneyActive = i;
    },
    getCode(devices, categoryId) {
      this.qr_code = "";
      this.$http
        .post(`${this.$HOST_NAME}/deposit/qr_code`, {
          devices: devices,
          categoryId: categoryId
        })
        .then(res => {
          if (res.code == 200) {
            this.$loading(false);
            this.categoryData = res.data;
            this.toggleAisle(res.data[0], 0);
          } else {
            if (res && res.message) {
              this.$newToast(res.message);
            } else {
              // //this.$newToast("服务器报错");
            }
          }
        });
    },
    //  获取支付通道
    paymentShow() {
      this.$http
        .post(`${this.$HOST_NAME}/deposit/online`, {
          categoryId: this.$route.query.id,
          devices: "h5"
        })
        .then(res => {
          if (res.code == 200) {
            this.$loading(false);
            this.categoryData = res.data;
            this.maxMoney = res.data[0] && res.data[0].maxAmount;
            this.minMoney = res.data[0] && res.data[0].minAmount;
            this.paymentId = res.data[0] && res.data[0].id;
          } else {
            if (res && res.message) {
              this.$newToast(res.message);
            } else {
              //this.$newToast("服务器报错");
            }
          }
        });
    },
    // 获取银行卡信息
    getDepositBank() {
      this.$http.post(`${this.$HOST_NAME}/deposit/bank`).then(res => {
        if (res.code == 200) {
          this.$loading(false);
          this.depositBank = res.data;
          this.deoisitList = this.depositBank[0];
        } else {
          if (res && res.message) {
            this.$newToast(res.message);
          } else {
            //this.$newToast("服务器报错");
          }
          this.$router.go(-1);
        }
      });
    },
    // 切换支付通道的选项
    toggleAisle(item, i) {
      if (this.$route.query.classType != "qr_code") {
        // this.$refs.scroll.refresh();
        this.aisleActive = i;
        this.maxMoney = item.max_amount
          ? parseInt(+item.max_amount)
          : parseInt(+item.maxAmount);
        this.minMoney = item.min_amount
          ? parseInt(+item.min_amount)
          : parseInt(+item.minAmount);
        this.paymentId = item.id;
        this.amount = "";
      } else {
        if (localStorage.config) {
          let config = JSON.parse(localStorage.config);
          this.publicUrl = config.statics;
        }
        if (!item) {
          return false;
        }
        this.qr_code = "";
        this.passKey.max_amount = +item.max_amount;
        this.passKey.min_amount = +item.min_amount;
        this.qr_code = item.qr_code;
        this.passKey.codeId = item.id;
      }
    },
    // 线下存款申请
    bankSubmit() {
      if (!this.canClick) {
        return false;
      }
      let isAmount = this.dInvalidMoney(this.amount);
      let reg = /^[\u4E00-\u9FA5]+$/;

      if (!reg.test(this.depositRealName)) {
        this.$newToast("请输入正确汇款姓名");
        return false;
      }
      if (!isAmount) {
        this.$newToast("请输入正确金额");
        return false;
      }

      if (
        parseInt(this.amount) <
        JSON.parse(localStorage.config).limit.paymentLimit
      ) {
        this.$newToast(
          "存款金额不能小于" +
            JSON.parse(localStorage.config).limit.paymentLimit +
            "元"
        );
        return false;
      }
      this.canClick = false;
      setTimeout(() => {
        this.canClick = true;
      }, 5 * 1000);
      this.$http
        .post(`${this.$HOST_NAME}/deposit/application`, {
          amount: this.amount,
          depositId: this.deoisitList.id,
          bankId: this.deoisitList.cardNum,
          bankName: this.deoisitList.bankName,
          bankAccountName: this.deoisitList.cardName,
          bankSerialNumber: "",
          type: this.type,
          depositRealName: this.depositRealName,
          depositTime: this.$moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
        })
        .then(res => {
          if (res.code == 200) {
            // this.$confirm(res.data);

            this.$toast.success(res.data);
            this.amount = "";
            this.depositRealName = "";
          } else {
            // this.$errToast(res.message);
            if (res && res.message) {
              this.$newToast(res.message);
            } else {
              //this.$newToast("服务器报错");
            }
          }
        });
    },
    submitCode() {
      if (!this.canClick) {
        return false;
      }
      let reg = /^[\u4E00-\u9FA5]+$/;

      if (!reg.test(this.passKey.depositAccountName)) {
        this.$error("请输入正确汇款姓名");
        return false;
      }

      if (!this.passKey.money) {
        this.$error("请输入存款金额");
        return false;
      }
      if (!this.passKey.order) {
        this.$error("请输入订单号后九位");
        return false;
      }
      this.canClick = false;
      clearTimeout(timmer);
      let timmer = setTimeout(() => {
        this.canClick = true;
      }, 5 * 1000);
      this.$http
        .post(`${this.$HOST_NAME}/deposit/qr_code_application`, {
          QRCodeId: this.passKey.codeId,
          amount: this.passKey.money,
          depositTime: this.getTime(new Date()),
          serialNumber: this.passKey.order,
          depositAccountName: this.passKey.depositAccountName
        })
        .then(res => {
          if (res.code == 200) {
            this.passKey.money = "";
            this.passKey.order = "";
            this.passKey.time = "";
            this.$toast.success(res.data);
          } else {
            this.$toast.error(res.message);
          }
        });
    },
    // 线上支付申请
    onlinePayment() {
      if (!this.canClick) {
        return false;
      }
      let isAmount = this.dInvalidMoney(this.mount);

      if (!isAmount) {
        this.$newToast("请输入正确金额");
        return false;
      }
      if (this.mount - 0 < this.minMoney - 0) {
        this.$newToast("本通道充值金额不能低于" + this.minMoney);
        return false;
      }
      if (this.mount - 0 >= this.maxMoney - 0) {
        this.$newToast("本通道充值金额不能高于" + this.maxMoney);
        return false;
      }
      this.canClick = false;
      setTimeout(() => {
        this.canClick = true;
      }, 5 * 1000);
      this.$newToast("请求中,请勿重复点击！");
      clearTimeout(timer);
      let timer = setTimeout(() => {
        $.ajax({
          url: `${this.$HOST_NAME}/onlinePaymentNew`,
          headers: {
            // "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `${localStorage.token}`
          },
          async: false,
          type: "post",
          data: {
            paymentId: this.paymentId,
            money: this.mount,
            type: "h5",
            categoryId: this.$route.query.id
          },
          success: res => {
            if (res.code == 200) {
              if (res.data.qrCode) {
                this.$router.push({
                  path: "/scan",
                  query: {
                    order: res.data.order,
                    qrCode: res.data.qrCode,
                    name: this.payName
                  }
                });
              } else {
                // tempwindow.location = res.data.formUrl;
                window.open(res.data.formUrl);
              }
            } else {
              // tempwindow.close();
              if (res && res.message) {
                this.$newToast(res.message);
              } else {
                //this.$newToast("服务器报错");
              }
            }
          },
          error: err => {}
        });
      }, 500);
    }
  }
};
</script>
<style lang="less" scoped>
.saveBox {
  position: relative;
  // overflow-y: scroll;
  // background: #f8f8f8;
  height: 100%;
  .wrap {
    width: 100%;
    .codeBox {
      width: 100%;
      height: 6.5rem;
      background: #fff;
      // margin-top: 0.2rem;
     margin-top: 0.2rem;
      text-align: center;
      img {
        width: 5rem;
        height: 5rem;
      }
      .qrBt {
        color: #ff8e00;
        font-size: 0.36rem;
        width: 4.5rem;
        height: 0.8rem;
        line-height: 0.8rem;
        border: 1px solid #ff8e00;
        display: inline-block;
        border-radius: 2px;
        margin-top: 0.15rem;
      }
    }
    .tipBox {
      padding: 0.2rem 0.2rem;
      .title {
        font-size: 0.32rem;
        line-height: 0.35rem;
        color: #000;
        padding-top: 0.3rem;
        padding-bottom: 0.3rem;
        font-weight: 600;
      }
      .content {
        font-size: 0.28rem;
        line-height: 0.4rem;
        color: #666;
        div {
          padding-bottom: 0.1rem;
        }
      }
    }
    .inputBox {
      background: #fff;
      margin-top: 0.15rem;
      .inpItem {
        margin: 0 0.2rem;
        border-bottom: 1px solid #f5f5f5;
        height: 1.05rem;
        line-height: 1.05rem;
        font-size: 0.32rem;
        display: flex;
        label {
          // width: 1.6rem;
          flex: 1;
          display: inline-block;
          text-align: right;
        }
        /deep/ .cube-input {
          // display: inline-block;
          flex: 3;
          // width: 4.2rem;
          font-size: 0.32rem;
          &::after {
            border: 0 solid transparent;
          }
          .cube-input-field {
            padding: 0;
          }
        }
      }
    }
    .payBtn {
      color: #fff;
      background: linear-gradient(90deg, #ff5100, #ff8e00);
      height: 0.92rem;
      line-height: 0.92rem;
      text-align: center;
      margin: 0 0.2rem;
      margin-top: 0.4rem;
      border-radius: 0.15rem;
      font-size: 0.36rem;
      margin-bottom: 0;
      &.active {
        background: linear-gradient(180deg, #ccc, #eee);
        &:hover {
          cursor: not-allowed;
        }
      }
    }
  }
}

.deposit-form {
  height: 100%;
  padding-bottom: 1.2rem;
  // background: #f9f9f9;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  position: static;
  overflow-y: scroll;
  .warmPrompt {
    color: rgb(87, 94, 104);
    // color: #333;
    font-size: 0.28rem;
    padding: 0.4rem 0.2rem;
    line-height: 0.36rem;
    text-align: justify;
    font-family: Arial, "STXihei", "华文细黑", "Microsoft YaHei", "微软雅黑",
      "SimSun", "宋体", "Heiti", "黑体";
    text-indent: -0.08rem;
    span {
      line-height: 0.48rem;
    }
  }
  .off-line {
    .course {
      background: #fff;
      padding: 0 0.2rem;
      // margin-bottom: 0.2rem;
      p:nth-child(1) {
        padding-top: 0.28rem;
        padding-bottom: 0.24rem;
        font-size: 0.3rem;
        color: #333;
      }
      .pay-course {
        background: #fff5d9;
        height: 0.72rem;
        border: 1px solid #dbdbdb;
        line-height: 0.72rem;
        padding: 0 0.36rem;
        border-radius: 0.1rem;
        span {
          font-size: 0.26rem;
          color: #060eb5;
        }
      }
      h3 {
        padding-top: 0.42rem;
        padding-bottom: 0.32rem;
        font-size: 0.3rem;
      }
      ul {
        li {
          float: left;
          width: 2.1rem;
          height: 0.8rem;
          line-height: 0.4rem;
          background: #eee;
          // border:1px solid #dbdbdb;
          margin-bottom: 0.3rem;
          border-radius: 0.1rem;
          text-align: center;
          padding: 0.13rem 0;
          margin-right: 0.2rem;
          img {
            width: 0.54rem;
            vertical-align: middle;
            margin-right: 0.05rem;
          }
          span {
            font-size: 0.28rem;
            vertical-align: middle;
          }
        }
        .activeLi {
          border: 1px solid #f60;
        }
      }
    }
    .bank-info {
      padding: 0.08rem 0.2rem 0.28rem 0.2rem;
      background: #fff;
      .row {
        height: 0.82rem;
        line-height: 0.82rem;
        border-bottom: 1px solid #f5f5f5;
        position: relative;
        input {
          height: 0.4rem;
          line-height: 0.4rem;
          font-size: 0.3rem;
          color: #666;
        }
        label {
          width: 1.3rem;
          display: inline-block;
          text-align: right;
          margin-right: 0.3rem;
          font-size: 0.3rem;
          color: #333;
        }
        // input::-webkit-input-placeholder {
        //   color: #888888 !important;
        //   font-size: 0.28rem !important;
        // }
        span {
          font-size: 0.3rem;
          color: #666;
        }
        a {
          height: 0.5rem;
          width: 0.7rem;
          position: absolute;
          right: 0.2rem;
          top: 0.16rem;
          line-height: 0.5rem;
          border: 1px solid #dbdbdb;
          text-align: center;
          border-radius: 0.1rem;
          background: linear-gradient(90deg, #ff5100, #ff8e00);
          color: #fff;
          font-size: 0.26rem;
        }
        .cube-select {
          float: right;
          width: 77%;
          font-size: 0.3rem;
          padding: 0.2rem 0.2rem 0.1rem 0.02rem;
          .cube-select-icon {
            border-width: 0.08rem 0.08rem 0 0.08rem;
          }
        }
        .cube-select::after {
          border: none;
        }
        .time-select {
          float: right;
          padding-right: 0.15rem;
          color: #666;
        }
      }
    }
    .payBtn {
      color: #fff;
      background: linear-gradient(90deg, #ff5100, #ff8e00);
      height: 0.92rem;
      line-height: 0.92rem;
      text-align: center;
      margin: 0 0.2rem;
      margin-top: 0.1rem;
      border-radius: 0.15rem;
      font-size: 0.36rem;
      margin-bottom: 0;
      &.active {
        background: linear-gradient(180deg, #ccc, #eee);
        &:hover {
          cursor: not-allowed;
        }
      }
    }
  }
  
  .on-line {
    .pay-aisle {
      // height: 2.2rem;
      margin-top: 0.2rem;
      background: #fff;
      padding: 0.34rem 0.3rem;
      // margin-bottom: 0.2rem;
      p {
        font-size: 0.3rem;
        margin-bottom: 0.3rem;
      }
      div {
        // width: 2.2rem;
        border: 1px solid transparent;
        width: 30%;
        height: 0.98rem;
        text-align: center;
        background: #eee;
        display: inline-block;
        margin-right: 0.16rem;
        margin-bottom: 0.2rem;
        padding: 0.16rem 0;
        border-radius: 0.1rem;
        p:nth-child(1) {
          font-size: 0.28rem;
          margin-bottom: 0;
        }
        p:nth-child(2) {
          font-size: 0.2rem;
          height: 0.4rem;
          padding-top: 0.2rem;
          color: #666;
          overflow: hidden;
          display: flex;
          // display: inline;
          // width: 100%;
          span {
            overflow: hidden;
            // width: 50%;
            flex: 1;
            justify-content: center;
            // display: inline-block;
            vertical-align: middle;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          span:nth-child(2) {
            color: #f60;
          }
        }
      }
      .aisleActive {
        border: 1px solid #f60;
      }
    }
    .recharge {
      // height: 2.77rem;
      padding-top: 0.24rem;
      background: #fff;
      // padding: 0.3rem 0;
      // padding-top: 0.3rem;
      p {
        margin-left: 0.3rem;
        font-size: 0.34rem;
        color: #000;
        margin-bottom: 0.6rem;
        font-family: "Microsoft YaHei" !important;
      }
      div {
        margin: 0 0.2rem;
        border-bottom: 1px solid #f5f5f5;
        // height: 0.52rem;
        padding-bottom: 0.6rem;
        font-size: 0.64rem;
        color: #333;
        // overflow: hidden;
        input {
          font-size: 0.46rem;
          color: #000;
          width: 80%;
          transform: translateY(-8%);
          &::-webkit-input-placeholder {
            color: #c5c5c5 !important;
            transform: translateY(10%);
            font-size: 0.45rem !important;
          }
        }
      }
      ul {
        padding: 0.35rem 0.1rem 0.3rem 0.28rem;
        li {
          float: left;
          font-family: Arial;
          width: 1.2rem;
          height: 0.64rem;
          color: #000;
          // font-weight: 600;
          // background: #eee;
          text-align: center;
          line-height: 0.64rem;
          margin-right: 0.2rem;
          border-radius: 0.1rem;
          font-size: 0.38rem;
          border: 1px solid #dbdbdb;
        }
        .mountMoneyActive {
          border: 1px solid #ff8e00;
          color: #ff8e00;
        }
      }
    }
    .payBtn {
      color: #fff;
      background: linear-gradient(90deg, #ff5100, #ff8e00);
      height: 0.92rem;
      line-height: 0.92rem;
      text-align: center;
      margin: 0 0.2rem;
      margin-top: 0.45rem;
      border-radius: 0.15rem;
      font-size: 0.36rem;
      &.active {
        background: linear-gradient(180deg, #ccc, #eee);
        &:hover {
          cursor: not-allowed;
        }
      }
    }
    /deep/ .van-tab{
      flex:0 0 20%;
    }
  }
  .no-pay-tongdao {
    width: 100%;
    height: 100%;
    background: #fff;
    padding-top: 2rem;
    img {
      width: 35%;
      display: block;
      margin: 0 auto;
    }
  }
}
</style>

