<template>
  <vp-Pub-Hall :hallDatas=hallDatas></vp-Pub-Hall>
</template>

<script>

  import vpPubHall from '@/pages/public/vp-hall'

  export default {
    data () {
      return {
        hallDatas: {
          downLoadUrl: 'http://3000016.com/download/h500/index_h500.html',
          downLoadPic: require('@assets/img/500w/img/download.png'),
          logo: require('@assets/img/500w/img/logo.png')
        }
      }
    },
    components: {
      vpPubHall
    }
  }
</script>
