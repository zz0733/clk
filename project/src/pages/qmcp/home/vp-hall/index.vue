<template>
  <vp-Pub-Hall :hallDatas=hallDatas></vp-Pub-Hall>
</template>

<script>

import vpPubHall from "@/pages/public/vp-hall";
export default {
  data() {
    return {
      hallDatas:{
        downLoadUrl:'/static/qmcp/html/download/index.html',
        downLoadPic:require('@assets/img/qmcp/img/download.png'),
        logo:require('@assets/img/qmcp/img/logo.png')
      }
    };
  },  
  components: {
   vpPubHall
  }
};
</script>