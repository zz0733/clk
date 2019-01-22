
<template>
  <vp-Pub-Hall :hallDatas=hallDatas></vp-Pub-Hall>
</template>

<script>

import vpPubHall from "@/pages/public/vp-hall";
export default {
  data() {
    return {
      hallDatas:{
        downLoadUrl:'/static/500w/html/download/index.html',
        downLoadPic:require('@assets/img/500w/img/download.png'),
        logo:require('@assets/img/500w/img/logo.png')
      }
    };
  },  
  components: {
   vpPubHall
  }
};
</script>
