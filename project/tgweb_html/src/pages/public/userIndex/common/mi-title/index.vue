<template>
      <div class="content-title">
          <span v-for="(item,index) in titleList" :key="index">{{item}}</span>
     </div>
</template>

<script>
export default {
  props: {
    titleList: {
      type: Array
    }
  }
};
</script>

<style lang="less" scoped>
.content-title {
  height: 0.62rem;
  line-height: 0.62rem;
  display: flex;
  position: relative;
  background: #fff;
  margin-top: 0.2rem;
  &::before {
    content: "";
    width: 100%;
    height: 1px;
    background: rgba(219, 219, 219, 0.5);
    position: absolute;
    bottom: 0;
    left: 0;
  }
  span {
    flex: 1;
    color: #424242;
    font-size: 0.28rem;
    text-align: center;
  }
}
</style>
