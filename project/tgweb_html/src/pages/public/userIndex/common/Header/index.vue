<template>
  <div class="header bg-color ">
    <span class="mh5-back" @click="goback"></span>
    <span>{{title}}</span>
  </div>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {};
  },
  methods: {
    goback() {
      if (this.title == "开奖走势") {
        // console.log(this.$route.query.id)
        this.$router.push(`/plays/tradition/${this.$route.query.id}`);
        return false;
      }
      this.$router.go(-1);
      this.$loading(false);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../../../assets/less/public/var.less";

.header {
  // position: fixed;
  // top: 0;
  // left: 0;
  // width: 100%;
  // z-index: 10;
  height: 0.88rem;
  line-height: 0.88rem;
  text-align: center;
  color: #fff;
  font-size: 0.36rem;
  padding: 0 0.18rem;
  .mh5-back {
    position: absolute;
    left: 0.2rem;
  }
  span {
    font-weight: 600;
  }
}
</style>
