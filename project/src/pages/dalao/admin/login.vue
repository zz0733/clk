
<template>
    <div>
      <admin-Login :logoSrc="require('../../../assets/img/dalao/img/logo.png')" ></admin-Login>
    </div>
</template>
<script>
import adminLogin from "@/pages/public/admin/login";
export default {
  data() {
    return {
    };
  },
  components: {adminLogin}
};
</script>

<style lang="less" scoped>

</style>