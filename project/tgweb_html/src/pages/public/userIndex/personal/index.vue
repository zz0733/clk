<template>
  <div class="personal">
    <router-view></router-view>
    <vp-pub-footer></vp-pub-footer>
  </div>
</template>

<script>
import vpPubFooter from "@/pages/public/userIndex/common/Footer";

export default {
  data() {
    return {};
  },
  components: {
    vpPubFooter
  }
};
</script>

<style lang="less" scoped>
.personal {
  background: #f6f6f8;
  // display: flex;
  // flex-direction: column;
  // height: 100%;
  // background: #f8f8f8;
  // position: relative;
  // overflow: hidden;
  // pointer-events: auto;
}
</style>
