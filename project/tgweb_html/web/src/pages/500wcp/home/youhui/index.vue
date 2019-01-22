<template>
  <div class="main">
    <div class="body">
      <div class="item">
        <a href="/static/500wcp/html/grade/index.html" target="_blank">
          <img src="/static/500wcp/img/youhui/jgj.png"/>
        </a>
      </div>
      <div v-for="(item, i) in list" :key="i" class="item">
        <img :src="'/static/500wcp/img/youhui/' + item.img[0]" @click="item.unfold = !item.unfold"/>
        <img :src="'/static/500wcp/img/youhui/' + item.img[1]" v-show="item.unfold"/>
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
          {img: ['323.png', '323c.jpg'], unfold: false},
          {img: ['81.png', '81c.jpg'], unfold: false},
          {img: ['9.png', '9c.jpg'], unfold: false},
          {img: ['10.png', '10.jpg'], unfold: false},
          {img: ['11.jpg', '11c.jpg'], unfold: false},
          {img: ['84.png', '84c.jpg'], unfold: false},
          {img: ['85.png', '85c.jpg'], unfold: false},
          {img: ['86.png', '86c.jpg'], unfold: false},
        ]
      }
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  .main {
    background: url(/static/500wcp/img/bg-article.png) #fff no-repeat center 96px;
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
