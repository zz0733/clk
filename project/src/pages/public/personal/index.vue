<template>
    <div class="personal">       
      <router-view></router-view>    
      <vp-pub-footer></vp-pub-footer>         
    </div>
</template>

<script>
import  vpPubFooter  from "@/pages/public/common/Footer";
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
  height: 100%;
  background: #f8f8f8;
  position: relative;
  .personal-iview{
      position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
  }
}
</style>
