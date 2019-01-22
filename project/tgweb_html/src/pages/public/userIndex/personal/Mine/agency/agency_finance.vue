<template>
    <div class="agency_finance">
      <mi-nav></mi-nav>
      <div class="finance-list">
        <van-tabs>
         <van-tab v-for="(item,i) in financeList" :key="i">
          <div slot="title" class="tab-title">
            <span>{{item.text}}</span>
          </div>
         </van-tab>
       </van-tabs>
     </div>
       <mi-title :titleList="['会员','类型','状态','金额']"></mi-title>
      <div class="content-main">
         <div class="row" v-for="item in 40">
              <span>alifu</span> <span>支付宝存款</span> <span>成功</span> <span>100.00</span>
         </div>
     </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      financeList: [
        {
          text: "存款"
        },
        {
          text: "取款"
        },
        {
          text: "返水"
        },
        {
          text: "优惠"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.agency_finance {
  .finance-list {
    margin-top: 0.2rem;
    /deep/ .van-tab {
      flex: 0 0 25%;
    }
  }
  .content-main {
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    background: #fff;
    .row {
      display: flex;
      height: 0.8rem;
      line-height: 0.8rem;
      &::after{
          content:"";
          width:.3rem;
          height: 1px;
          background: #fff;
          position: absolute;
          bottom: 0;
          left: 0;
      }
      span{
          flex: 1;
          text-align: center;
          color: #888888;
          font-size: .28rem;
      }
    }
  }
}
</style>
