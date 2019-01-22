<template>
    <div>
      <admin-Register :logoSrc="require('@assets/img/500w/img/logo.png')"></admin-Register>
    </div>
</template>
<script>
import adminRegister from "@/pages/public/admin/register";
export default {
  data() {
    return {
    };
  },
  created(){
  },
  components: {adminRegister}
};
</script>

<style lang="less" scoped>

</style>