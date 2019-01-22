<template>
      <div class="scan">

             <vp-pub-header :title="`${this.$route.query.name}扫码支付`"></vp-pub-header>

                 <h3>长按保存图片至相册,打开{{ this.$route.query.name}}钱包扫一扫</h3>
              <div class="qrcode "><div id="qrcode"></div> </div>
      </div>
</template>

<script>
import  vpPubHeader  from "@/pages/public/common/Header";
import QRCode from "qrcodejs2"; 
import UserService from "@/service/public/UserService.js";
let timer;
export default {
  data() {
    return {
      //   order: "",
      //   qrCode: ""
    }; 
  },
  mounted() {
    let qrcode = new QRCode("qrcode", {
      width: 260,
      height: 260, // 高度
      text: this.$route.query.qrCode, // 二维码内容
      render: "table" // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
      // background: '#f0f'
      // foreground: '#ff0'
    });

    timer = setInterval(this.queryOrder, 1500);
    // console.log(this.$route.query.order )
  },
  methods: {
    queryOrder() {
      this.$http
        .post(`${this.$HOST_NAME}/onlinePayment/order`, { order: this.$route.query.order })
        .then(res => {
          if (res.data.orderStatus == "success") {
            this.$confirm("支付成功");
            this.$router.push("/personal/mine");
            UserService.vpGetBasicInfo.call(this);
            clearInterval(timer);
          }
        });
    }
  },
  destroyed() {
    clearInterval(timer);
  },
  components: {
    vpPubHeader
  }
};
</script>

<style lang="less" scoped>
.scan {
  text-align: center;
  position: relative;
  height: 100%;
  background: #f1f1f1;
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
}
</style>
