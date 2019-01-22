<template>
  <div class="main">
    <div class="body">
      <div class="item">
        <a href="/static/fhcp/html/grade/index.html" target="_blank">
          <img src="/static/fhcp/img/youhui/jgj.png"/>
        </a>
      </div>
      <div v-for="(item, i) in list" :key="i" class="item">
        <img :src="'/static/fhcp/img/youhui/' + item.img[0]" @click="item.unfold = !item.unfold"/>
        <img :src="'/static/fhcp/img/youhui/' + item.img[1]" v-show="item.unfold"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        list: [
          {img: ['x_kscp.png', 'x_kscpc.jpg'], unfold: false},
          {img: ['qipai_jz.png', 'qipai_jzc.jpg'], unfold: false},
          {img: ['ttck.png', 'ttckc.jpg'], unfold: false},
          {img: ['423.jpg', '423c.jpg'], unfold: false},
          {img: ['323.jpg', '323c.jpg'], unfold: false},
          {img: ['81.jpg', '81c.jpg'], unfold: false},
          {img: ['huikuan.jpg', 'huikuan1.jpg'], unfold: false},
          {img: ['83.jpg', '83c.jpg'], unfold: false},
          {img: ['9.jpg', '9c.jpg'], unfold: false},
          {img: ['10.jpg', '10c.jpg'], unfold: false},
          {img: ['11.png', '11c.jpg'], unfold: false},
          {img: ['84.jpg', '84c.jpg'], unfold: false},
          {img: ['85.jpg', '85c.jpg'], unfold: false},
          {img: ['86.jpg', '86c.jpg'], unfold: false},
        ]
      }
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  .main {
    background: url(/static/fhcp/img/bg-article.png) #fff no-repeat center 96px;
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
