<template>
  <div class="header">
    <span class="mh5-back" @click="goback"></span>
    <span>{{title}}</span>
  </div>
</template>

<script>
  export default {
    props: ['title'],
    data () {
      return {}
    },
    methods: {
      goback () {
        if (this.title == '开奖走势') {
          // console.log(this.$route.query.id)
          this.$router.push(`/plays/tradition/${this.$route.query.id}`)
          return false
        }
        this.$router.go(-1)
        this.$loading(false)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../assets/less/public/var.less";

  .header {
    height: 0.88rem;
    background: linear-gradient(90deg, #ff8e00, #ff5100);
    line-height: 0.88rem;
    text-align: center;
    color: #fff;
    font-size: 0.36rem;
    padding: 0 0.18rem;
    position: relative;
    .mh5-back {
      position: absolute;
      left: .2rem;
    }
    span {
      font-weight: 600;
    }
  }
</style>
