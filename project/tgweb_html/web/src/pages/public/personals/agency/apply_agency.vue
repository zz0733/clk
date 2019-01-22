<template>
  <div class="apply_agency">
    <div class="header">
      申请代理
    </div>

    <div class="content">
      <div class="row">
        <label>电话：</label>
        <input type="text" v-model="phone" @blur="hanlderPhone">
      </div>
      <div class="row">
        <label>邮箱：</label>
        <input type="text" v-model="email" @blur="hanlderEmail">
      </div>
      <div class="row">
        <label>备注：</label>
        <textarea v-model="reason"></textarea>
      </div>

      <div class="toast" v-if="toastShow" :style="{top:toastNum+'px'}" ref="toast">
        {{toastText}}
      </div>
    </div>

    <div class="submit" @click="applyAgency">
      申请代理
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        phone: '',
        email: '',
        reason: '',
        toastShow: false,
        toastNum: 100,
        toastText: ''
      }
    },
    methods: {
      applyAgency () {
        if (!this.phone) {
          this.hanlderPhone()
        } else {
          if (!this.email) {
            this.hanlderEmail()
          } else {
            if (!this.reason) {
              this.hanlderReason()
            } else {
              this.$http
                .post(`${this.$HOST_NAME}/member/applyAgency`, {
                  reason: this.reason,
                  phone: this.phone,
                  email: this.email
                })
                .then(res => {
                  if (res.code == 200) {
                    this.$success('申请成功，等待系统审核')
                  } else {
                    this.$error(res.message)
                  }
                })
            }
          }
        }
      },
      hanlderPhone () {
        if (!this.phone) {
          this.toastText = '请输入手机号码'
          this.toastShow = true
          this.toastNum = 100
          this.$nextTick(() => {
            this.$refs.toast.style.right = '415px'
          })
        } else {
          this.toastShow = false
        }
      },
      hanlderEmail () {
        if (!this.email) {
          this.toastText = '请输入邮箱号码'
          this.toastShow = true
          this.toastNum = 156
          this.$nextTick(() => {
            this.$refs.toast.style.right = '415px'
          })
        } else {
          this.toastShow = false
        }
      },
      hanlderReason () {
        if (!this.reason) {
          this.toastText = '请输入申请理由'
          this.toastShow = true
          this.toastNum = 208
          this.$nextTick(() => {
            this.$refs.toast.style.right = '260px'
          })
        } else {
          this.toastShow = false
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .apply_agency {
    padding: 0 14px;
    .header {
      height: 66px;
      line-height: 66px;
      border-bottom: 1px solid #f3f3f3;
      font-size: 1.8em;
      padding-left: 10px;
      color: #000;
      font-weight: 400;
    }
    .content {
      padding-top: 10px;
      padding-bottom: 30px;
      border-bottom: 1px solid #dbdbdb;
      .row {
        margin-top: 20px;
        label {
          width: 142px;
          text-align: right;
          display: inline-block;
          font-size: 1.4em;
          vertical-align: middle;
        }
        input {
          height: 38px;
          border: 1px solid #dbdbdb;
          outline: none;
          text-indent: 1em;
          border-radius: 4px;
          margin-right: 20px;

          &:not(.other) {
            width: 242px;
            height: 38px;
            background: #f9f9f9;
          }
        }
        textarea {
          width: 400px;
          height: 200px;
          border: 1px solid #dbdbdb;
          background: #f9f9f9;
          border-radius: 4px;
          vertical-align: top;
          resize: none;
          padding-top: 1em;
          line-height: 16px;
        }
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
        right: 415px;
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
    .submit {
      width: 140px;
      height: 42px;
      line-height: 42px;
      text-align: center;
      color: #fff;
      font-size: 1.8em;
      background: linear-gradient(180deg, #ff328e, #ff1a43);
      border-radius: 10px;
      margin-top: 25px;
      margin-left: 145px;
      cursor: pointer;
      display: inline-block;
    }
  }
</style>
