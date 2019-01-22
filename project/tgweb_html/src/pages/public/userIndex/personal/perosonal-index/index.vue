<template>
  <div class="personal-index ">
    <vp-pub-header :title="title"></vp-pub-header>
    <router-view class="personal-content"></router-view>
  </div>
</template>

<script>
import vpPubHeader from "@/pages/public/userIndex/common/Header";

export default {
  data() {
    return {
      title: null
    };
  },
  components: {
    vpPubHeader
  },
  computed: {
    depositTitle() {
      return JSON.parse(localStorage.paylist);
    }
  },
  destroyed() {
    delete localStorage.bankData;
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        this.setTitle(newVal);
        // console.log(newVal)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    setTitle(newVal) {
      if (newVal.query.id) {
        //  console.log(newVal)
        if (newVal.path == "/personal_index/bank_account") {
          this.title = "银行信息";
          return false;
        }
        let target = this.depositTitle.filter(
          item => item.id == newVal.query.id
        )[0];
        this.title = target.className;
      } else if (newVal.name == "修改密码") {
        if (newVal.params.id == "0") {
          this.title = "修改登陆密码";
        } else {
          this.title = "修改资金密码";
        }
      } else if (newVal.name == "转账帮助") {
        if (newVal.params.name == "wechat") {
          this.title = "微信转银行卡";
        } else {
          this.title = "支付宝转银行卡";
        }
      } else if (newVal.name == "账户安全") {
      } else {
        this.title = newVal.name;
      }
    }
  }
};
</script>

<style lang="less">
.personal-index {
  // padding-top: 0.88rem;
  // user-select: none;
  // overflow: hidden;
  // pointer-events: auto;
  .personal-content {
    flex: 1;
    background: #f6f6f8;
    overflow: auto;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    height: 100%;
  }
}
</style>
