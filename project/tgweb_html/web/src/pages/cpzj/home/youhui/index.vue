<template>
  <div class="main">
    <div class="body">
      <div class="item">
        <a href="/static/cpzj/html/grade/index.html" target="_blank">
          <img src="/static/cpzj/img/youhui/jgj.png"/>
        </a>
      </div>
      <div v-for="(item, i) in list" :key="i" class="item">
        <img :src="'/static/cpzj/img/youhui/' + item.img[0]" @click="item.unfold = !item.unfold"/>
        <img :src="'/static/cpzj/img/youhui/' + item.img[1]" v-show="item.unfold"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        list: [
          {img: ['x_kscp.jpg', 'x_kscpc.jpg'], unfold: false},
          {img: ['qipai_jz.jpg', 'qipai_jzc.jpg'], unfold: false},
          {img: ['qipai_jm.jpg', 'qipai_jmc.jpg'], unfold: false},
          {img: ['92.jpg', '92c.jpg'], unfold: false},
          {img: ['223.jpg', '223c.jpg'], unfold: false},
          {img: ['huikuan.jpg', 'huikuan.jpg'], unfold: false},
          {img: ['81.jpg', '81c.jpg'], unfold: false},
          {img: ['83.jpg', '83c.jpg'], unfold: false},
          {img: ['84.jpg', '84c.jpg'], unfold: false},
          {img: ['85.jpg', '85c.jpg'], unfold: false},
          {img: ['86.jpg', '86c.jpg'], unfold: false},
          {img: ['88.jpg', '88c.jpg'], unfold: false},
          {img: ['89.jpg', '89c.jpg'], unfold: false},
          {img: ['90.jpg', '90c.jpg'], unfold: false},
          {img: ['91.jpg', '91c.jpg'], unfold: false},
        ]
      }
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  .main {
    background: url(/static/cpzj/img/bg-article.png) #fff no-repeat center 96px;
    .body {
      width: 1000px;
      margin: 20px auto;
      border: 1px solid #ececec;
      border-radius: 4px;
      padding: 10px;
      box-sizing: border-box;
      .item {
        width: 100%;
        &:first-child {
          margin-top: 0;
        }
        margin-top: 20px;
        img {
          width: 100%;
        }
      }
    }
  }
</style>
