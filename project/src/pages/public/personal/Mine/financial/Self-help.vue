<template>
  <div class="recommend">

            <h3>好友可扫描推荐码进行注册</h3>
              <div class="qrcode "><div id="qrcode"></div> <p>长按可保存二维码</p> </div>
              <div class="share" @click="show=true">一键分享,赚取佣金</div>

           

               <van-actionsheet v-model="show" class="shareLink">
                  <p>分享给好友</p>
                  <div class="row">
                    <ul>
                       <li>
                          <img src="../../../../../assets/img/public/image/common/personal/userInfo/微信.png" alt="">
                          <span>微信好友</span>
                       </li>
                       <li></li>
                       <li></li>
                       <li></li>
                       <li></li>
                    </ul>
                  </div>
                  <div class="close" @click="show=false">取消</div>
                </van-actionsheet>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      show: false
    };
  },
  created() {},
  mounted() {
    let qrcode = new QRCode("qrcode", {
      width: 260,
      height: 260, // 高度
      text: "http://10.10.19.7:66/#/personal/mine", // 二维码内容
      render: "table" // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
      // background: '#f0f'
      // foreground: '#ff0'
    });
  }
};
</script>

<style lang="less" scoped>
.recommend {
  text-align: center;
  position: relative;
  h3 {
    font-size: 0.28rem;
    color: #333;
    margin-top: 0.3rem;
    margin-bottom: 0.45rem;
  }
  .qrcode {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    p {
      margin-top: 0.3rem;
      font-size: 0.26rem;
      color: #888;
    }
  }
  .share {
    margin: 0 0.2rem;
    margin-top: 0.75rem;
    background: linear-gradient(90deg, #ff5100, #ff8e00);
    height: 0.9rem;
    line-height: 0.9rem;
    color: #fff;
    border-radius: 0.1rem;
    font-size: .28rem;
  }
  .shareLink {
    padding: 0.36rem 0.2rem 0 0.2rem;
    text-align: left;
    p {
      font-size: 0.3rem;
      color: #000;
      font-weight: 0;
    }
    .row {
      height: 2.1rem;
      // line-height: 2rem;
      border-bottom:1px solid #dbdbdb;
      ul {
        height: 100%;
        display: flex;
        li {
          width: 20%;
          height: 100%;
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          img {
            width: 1.22rem;
          }
          span{
            font-size: .26rem;
            color:#999999;
            margin-top: 0.16rem;
          }
        }
      }
     
    }
     .close{
        height: 1.12rem;
        line-height: 1.12rem;
        text-align: center;
        font-size: .36rem;
        color:#000;
      }
  }
}
</style>