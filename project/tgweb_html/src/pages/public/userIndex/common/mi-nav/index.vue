<template>
     <div class="personal-nav">
      <a class="nav" v-for="(item,index) in timeData" :key="index" @click="select(index)">
        <span :class="{'bg-color-active':activeTime ==index}">{{item.title}}</span>
      </a>
    </div>
</template>

<script>
export default {
  data() {
    return {
      timeData: [
        { title: "本周" },
        { title: "上周" },
        { title: "本月" },
        { title: "上月" }
      ],
      activeTime: 0
    };
  },
  methods: {
    select(index) {
      this.activeTime = index;
      this.$emit("select-time", index);
    }
  }
};
</script>

<style lang="less" scoped>
.personal-nav {
  height: 0.88rem;
  line-height: 0.88rem;
  background: #fff;
  display: flex;
  .nav {
    text-align: center;
    flex: 1;
    span {
      color: #424242;
      font-size: 0.34rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      padding: 0.1rem 0.33rem;
      border-radius: 20px;
    }
  }
}
</style>
