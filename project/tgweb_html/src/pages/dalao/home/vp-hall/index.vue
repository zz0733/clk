<template>
  <vp-Pub-Hall :hallDatas=hallDatas></vp-Pub-Hall>
</template>

<script>

  import vpPubHall from '@/pages/public/vp-hall'

  export default {
    data () {
      return {
        hallDatas: {
          downLoadUrl: '/static/dalao/html/download/index.html',
          downLoadPic: require('@assets/img/dalao/img/download.png'),
          logo: require('@assets/img/dalao/img/logo.png')
        }
      }
    },
    components: {
      vpPubHall
    }
  }
</script>
