<template>
  <div class="main-wrap">
    <transition name="fade" mode="out-in">
      <router-view :key="activeDate">
      </router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        activeDate: 'start'
      }
    },
    methods: {},
    methods: {
      async setBalanceToLocal () {
        if (!localStorage.token) {
          return false
        }
        let res = await this.$http.post(`${this.$HOST_NAME}/member/setBalanceToLocal`, {})
        if (res && res.code == 200) {
        } else {

        }
      },
    },
    created: function () {
      this.setBalanceToLocal()
    },
    components: {},
    watch: {
      $route () {
        this.activeDate = new Date().getTime()
      }
    }
  }
</script>

<style lang="less" scoped>
  .main-wrap {
    height: 100%;
    overflow: hidden;
    background: #fff;
  }
</style>
