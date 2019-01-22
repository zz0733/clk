<template>
  <div class="content">
    <div class="subPage-wrap">
      <div class="subPage-box">
        <div style="" id="ActivityContent">
          <img alt="" src="/static/dalao/img/youhui/jgj.png"
               onclick="window.open('/static/dalao/html/active/jgj/index.html','_blank')">
          <img alt="" src="/static/dalao/img/youhui/qipai_jmc.jpg" style="display: none;width: 0;height: 0;">
          <img alt="" src="/static/dalao/img/youhui/qipai_jm.png">
          <img alt="" src="/static/dalao/img/youhui/qipai_jmc.jpg" style="display: none;">
          <img alt="" src="/static/dalao/img/youhui/qipai_jz.png">
          <img alt="" src="/static/dalao/img/youhui/qipai_jzc.jpg" style="display: none;">
          <img alt="" src="/static/dalao/img/youhui/x_kscp.png">
          <img alt="" src="/static/dalao/img/youhui/x_kscpc.jpg" style="display: none;">

          <img alt="" src="/static/dalao/img/youhui/323.png">
          <img alt="" src="/static/dalao/img/youhui/323c.jpg" style="display: none;">
          <img alt="" src="/static/dalao/img/youhui/1.png">
          <img alt="" src="/static/dalao/img/youhui/1c.jpg" style="display: none;">

          <img alt="" src="/static/dalao/img/youhui/2.png">
          <img alt="" src="/static/dalao/img/youhui/2c.jpg" style="display: none;">

          <img alt="" src="/static/dalao/img/youhui/huikuan.png">
          <img alt="" src="/static/dalao/img/youhui/huikuan1.jpg" style="display: none;">

          <img alt="" src="/static/dalao/img/youhui/9.png">
          <img alt="" src="/static/dalao/img/youhui/9c.jpg" style="display: none;">
          <img alt="" src="/static/dalao/img/youhui/10.png">
          <img alt="" src="/static/dalao/img/youhui/10c.jpg" style="display: none;">
          <img alt="" src="/static/dalao/img/youhui/11.png">
          <img alt="" src="/static/dalao/img/youhui/11c.jpg" style="display: none;">

          <img alt="" src="/static/dalao/img/youhui/4.png">
          <img alt="" src="/static/dalao/img/youhui/4c.jpg" style="display: none;">

          <img alt="" src="/static/dalao/img/youhui/5.png">
          <img alt="" src="/static/dalao/img/youhui/5c.jpg" style="display: none;">

          <img alt="" src="/static/dalao/img/youhui/6.png">
          <img alt="" src="/static/dalao/img/youhui/6c.jpg" style="display: none;">

          <img alt="" src="/static/dalao/img/youhui/7.png">
          <img alt="" src="/static/dalao/img/youhui/7c.jpg" style="display: none;">

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'

  export default {
    data () {
      return {}
    },
    methods: {},
    created: function () {},
    mounted () {
      $('#ActivityContent img:odd').hide()
      $('#ActivityContent img:even').each(function (index, obj) {
        $(obj).attr('id', 'img' + index)
        $(obj).click(function () {
          $('#ActivityContent img:odd').not('[src=\'' + $(this).next().attr('src') + '\']').hide()
          var inline = $(this).next().css('display')
          if (inline != 'none') {
            $(this).next().hide()
          } else {
            $(this).next().show()
          }
          //window.location.hash = "img" + index;
        })
      })
    },
    watch: {},
    components: {}
  }
</script>

<style lang="less" scoped>
  .content {
    background: #000 url(/static/dalao/img/bg_promotions.jpg) center 0 no-repeat;
    background-size: 100% auto;
    .subPage-wrap {
      width: 1000px;
      position: relative;
      margin: 0 auto;
      .subPage-box {
        width: 960px;
        margin: 0 auto;
        img {
          vertical-align: middle;
        }
        img:nth-child(odd) {
          margin: 15px 0;
          cursor: pointer;
        }
      }
    }
  }

  body {
    background: #000;
  }

  td {
    vertical-align: middle;
  }

  .promotContent {
    padding: 10px;
    color: rgb(245, 245, 245);
  }

  .promotContent table {
    border-spacing: 0;
    border-collapse: collapse;
    width: 100%;
    margin: 10px 0;
  }

  .promotContent table td {
    border: 1px solid #ccc;
    text-align: center;
    padding: 8px 0;
    font-size: 16px;
  }

  .promotContent p {
    font-size: 16px;
    line-height: 25px;
    color: rgb(235, 235, 235);
    text-align: justify;
  }

  .promotContent hr {
    height: 1px;
    background-color: rgb(250, 220, 75);
    border: 0;
  }

  .promotContent .top_title {
    font-size: 20px;
    font-weight: bold;
    margin: 5px 0;
  }

  .promotContent .con_title {
    font-size: 19px;
    line-height: 1.5;
    margin-top: 12px;
    color: rgb(250, 220, 75);
  }

  #yh_pic a img {
    padding: 0 20px;
  }
</style>
