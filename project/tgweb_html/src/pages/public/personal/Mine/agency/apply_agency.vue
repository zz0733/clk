<template>
  <div class="apply-agency">
    <div class="row">
      <label>电话</label>
      <input type="text" v-model="applyData.phone">
    </div>

    <div class="row">
      <label>邮箱</label>
      <input type="text" v-model="applyData.email">
    </div>

    <div class="row">
      <label>申请理由</label>
      <input type="text" v-model="applyData.reason">
    </div>

    <div class="submiInfo" @click="applyAgency">
      提交信息
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        applyData: {}
      }
    },
    methods: {
      applyAgency () {
        this.$http.post(`${this.$HOST_NAME}/member/applyAgency`, this.applyData).then(res => {
          if (res.status == 'success') {
            // this.$confirm("申请成功");
            this.$toast.success(申请成功)
            this.applyData = {}
          } else {
            // this.$errToast(res.message);

          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .apply-agency {
    .row {
      height: 0.82rem;
      line-height: 0.82rem;
      border-bottom: 1px solid #dbdbdb;
      background: #fff;
      input {
        height: 0.6rem;
        font-size: 0.3rem;
        color: #666;
      }
      label {
        width: 1.5rem;
        display: inline-block;
        text-align: right;
        margin-right: 0.3rem;
        font-size: 0.3rem;
        color: #333;
      }
    }
    .submiInfo {
      margin: 0.3rem 0.24rem;
      height: 0.88rem;
      background: linear-gradient(90deg, #ff8e00, #ff5100);
      line-height: 0.88rem;
      text-align: center;
      color: #fff;
      font-size: 0.36rem;
      border-radius: 0.15rem;
    }
  }
</style>
