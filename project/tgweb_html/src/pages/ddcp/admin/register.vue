<template>
  <div>
    <admin-Register :logoSrc="require('../../../assets/img/ddcp/img/logo.png')"></admin-Register>
  </div>
</template>
<script>
  import adminRegister from '@/pages/public/admin/register'

  export default {
    data () {
      return {}
    },
    components: {adminRegister}
  }
</script>

<style lang="less" scoped>

</style>
