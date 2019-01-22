<template>
  <vp-Pub-Hall :hallDatas=hallDatas></vp-Pub-Hall>
</template>

<script>

import vpPubHall from "@/pages/public/vp-hall";
export default {
  data() {
    return {
      hallDatas:{
        downLoadUrl:'/static/ddcp/html/download/index.html',
        downLoadPic:require('@assets/img/ddcp/img/download.png'),
        logo:require('@assets/img/ddcp/img/logo.png')
      }
    };
  },  
  components: {
   vpPubHall
  }
};
</script>