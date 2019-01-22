<template>
  <vp-Pub-Hall :hallDatas=hallDatas></vp-Pub-Hall>
</template>

<script>

import vpPubHall from "@/pages/public/vp-hall";
export default {
  data() {
    return {
      hallDatas:{
        downLoadUrl:'/static/hsyl/html/download/index.html',
        downLoadPic:require('@assets/img/hsyl/img/download.png'),
        logo:require('@assets/img/hsyl/img/logo.png')
      }
    };
  },  
  components: {
   vpPubHall
  }
};
</script>