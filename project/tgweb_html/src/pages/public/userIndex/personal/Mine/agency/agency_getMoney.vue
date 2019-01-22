<template>
  <div>

    <router-link tag="div" to="/personal/mine" class="goHome">
      <span class="fl mh5-back"></span>
    </router-link>

    <div class="get-money">
      <div class="balance">
        <label>可用代理收入:</label>
        <span class="color">2000.00</span>
        <span class="color gray">元</span>
      </div>

      <div class="withdraw">
        <span class="icon"></span>
        <van-field type="number" v-model="amount" :placeholder="'转账金额'+availableAmount" id="moneyNum"
                   onkeyup="value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')" @blur="hanlderAmount"/>
        <span class="checkall text-color" @click="amount=availableAmount">全部</span>
      </div>
      <div class="balance no-balance" v-if="notAmount>0">
        <label>不可取款:</label>
        <span class="color">{{notAmount}}</span>
        <span class="color gray">元</span>
        <span class="checkall text-color" v-if="+notAmount>0" @click="$toast(unavailableReason)">查看原因</span>
      </div>
      <div class="pas-row">
        <label>资金密码:</label>
        <van-field type="password" class="payPassword" v-model="payPassword" placeholder="请输入6位资金密码" maxlength="6"/>
        <!-- <van-password-input class="payPassword" :value="payPassword" @focus="keyboardShow" /> -->
      </div>
      <van-number-keyboard :show="showKeyboard" class="numberKey" @input="onInput" @delete="onDelete"
                           @blur="showKeyboard = false"/>

    </div>
    <div class="submitGetMoney bg-color " @click="getMoneySubmit" :class="{'active':canClick}">
      立即取款
    </div>

  </div>
</template>

<script>
  import store from '@/vuex/store'

  export default {
    data () {
      return {
        payPassword: '',
        showKeyboard: false,
        bankInfo: {},
        amount: '',
        availableAmount: '', //可用总额
        notAmount: '', //不可用金额
        unavailableReason: '', //不可用原因,
        totalAmount: '', //总额
        canClick: false
      }
    },
    methods: {
      onInput (key) {
        this.payPassword = (this.payPassword + key).slice(0, 6)
      },
      onDelete () {
        this.payPassword = this.payPassword.slice(0, this.payPassword.length - 1)
      },
      fetchUserWithdrawAmmount () {
        this.$http
          .post(`${this.$HOST_NAME}/withdrawals/getWithdrawAmount`)
          .then(res => {
            if (res.code === 200 && res.data) {
              const {amount, totalAmount, notAmount, msg} = res.data
              this.totalAmount = totalAmount //总额
              this.availableAmount = amount //可用总额
              this.notAmount = notAmount //不可用金额
              this.unavailableReason = msg.split('，')[1] //不可用原因
            } else {
              $error(res.message)
            }
          })
      },
      getMoneySubmit () {
        if (this.canClick) {
          return false
        }

        if (!this.amount) {
          this.$newToast('请输入提款金额')
          return false
        }

        if (!this.payPassword) {
          this.$newToast('请输入资金密码')
          return false
        }

        if (this.availableAmount <= 0) {
          this.$newToast(this.unavailableReason)
          return false
        }

        if (
          parseInt(this.amount) <
          JSON.parse(localStorage.config).limit.withdrawalsLimit
        ) {
          this.$newToast(
            '提款金额不能低于' +
            JSON.parse(localStorage.config).limit.withdrawalsLimit
          )
          return false
        }

        if (this.amount > this.availableAmount) {
          this.$newToast('提款金额不能高于' + this.availableAmount)
          return false
        }

        this.canClick = true
        setTimeout(() => {
          this.canClick = false
        }, 5 * 1000)
        this.$http
          .post(`${this.$HOST_NAME}/member/setBalanceToLocal`)
          .then(res => {
            if (res.code == 200) {
              this.$http
                .post(`${this.$HOST_NAME}/withdrawals/application`, {
                  amount: this.amount,
                  bankId: this.bankInfo.id,
                  payPassword: this.payPassword
                })
                .then(res => {
                  if (res.code == 200) {
                    this.$toast.success('提現申请已发送，等待系统审核')
                    this.reset()
                    this.fetchUserWithdrawAmmount()
                  } else {
                    this.reset()
                  }
                })
            } else {
              this.reset()
            }
          })
      },
      reset () {
        this.payPassword = ''
        this.amount = ''
      },
    
      keyboardShow () {
        document.getElementById('moneyNum').blur()
        this.showKeyboard = true
      },
      //取款金额设置
      hanlderAmount () {
        // this.amount = amount.substring(amount.indexOf('.'),amount.indexOf('.') + 3)
        if (this.amount.indexOf('.') != -1) {
          this.amount = this.amount.substring(0, this.amount.indexOf('.') + 3)
        }
      }
    },
    created () {
      this.$nextTick(() => {
        // this.$loading(true)
        // this.getBank()
        // this.fetchUserWithdrawAmmount()
      })
    },

    destroyed () {
      this.$loading(false)
      localStorage.removeItem('selectBank')
    },
    filters: {
      capitalize: function (value) {
        try {
          return require(`../../../../../../assets/img/public/image/common/personal/bank/${value}logo.png`)
        } catch (err) {
          return require(`../../../../../../assets/img/public/image/common/personal/bank/bankpay@3x.png`)
        }
      }
    },

    store
  }
</script>

<style lang="less" scoped>
  .goHome {
    width: 1rem;
    height: 0.88rem;
    position: absolute;
    top: 0;
    left: 0;
    line-height: 0.88rem;
    padding: 0 0.18rem;
    z-index: 1002;
    span {
      // font-size: 0.46rem;
      color: #fff;
    }
  }

  .get-money {
    // height: 92%;
    label {
      width: 2rem;
      display: inline-block;
      text-align: right;
      font-size: 0.3rem;
      text-align: left;
      color: #000000;
    }
    .checkall {
      // color: #118eea;
      font-size: 0.35rem;
      float: right;
    }
    .balance {
      height: 1.2rem;
      line-height: 1.2rem;
      border-bottom: 1px solid #f5f5f5;
      padding: 0 0.3rem;
      background: #fff;
      span {
        color: #999;
        font-size: 0.28rem;
      }
      .color {
        color: #f00;
        font-size: 0.34rem;
      }
      .gray {
        color: #333;
      }
      span.checkall {
        .checkall();
      }
    }
    .withdraw {
      height: 1.7rem;
      line-height: 1.7rem;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 0 0.3rem;
      background: #fff;
      span.icon {
        width: 0.34rem;
        height: 0.44rem;
        background: url("../../../../../../assets/img/public/image/common/personal/userInfo/mm.png");
        background-size: 100% 100%;
      }
      /deep/ .van-cell {
        width: 70%;
        padding: 0;
        input {
          font-size: 0.42rem;
          &::-webkit-input-placeholder {
            font-size: 0.36rem !important;
            line-height: 0.65rem !important;
          }
        }
      }
      /deep/ .van-cell:not(:last-child)::after {
        border-bottom-width: 0;
      }
      span.checkall {
        .checkall();
      }
    }
    .bank-card {
      margin-top: 0.2rem;
      height: 1.22rem;
      line-height: 1.22rem;
      border-bottom: 1px solid #f5f5f5;
      position: relative;
      padding: 0 0.3rem;
      background: #fff;
      img {
        width: 0.7rem;
        position: absolute;
        top: 0.26rem;
      }
      span {
        font-size: 0.32rem;
        margin-left: 1rem;
      }
      i {
        color: #666;
        font-size: 0.3rem;
      }
    }
    .pas-row {
      height: 1.1rem;
      line-height: 1.1rem;
      font-size: 0.28rem;
      display: flex;
      align-items: center;
      padding: 0 0.3rem;
      background: #fff;
      // position: relative;
      .payPassword {
        width: 3.9rem;
        font-size: 0.3rem;
        // position: absolute;
        // left: 1.45rem;
        // top: 0.16rem;
        .van-password-input__security {
          height: 0.66rem;
        }
      }
    }
  }

  .submitGetMoney {
    margin: 0 0.2rem;
    margin-top: 0.3rem;
    // background: #19b4f5;
    height: 0.92rem;
    line-height: 0.92rem;
    text-align: center;
    font-size: 0.36rem;
    color: #fff;
    &.active {
      background: linear-gradient(180deg, #ccc, #eee);
    }
  }

  .van-number-keyboard {
    position: absolute;
  }
</style>
