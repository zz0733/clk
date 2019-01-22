<template>
    <div class="sign">
         <div class="mysign">
                 <span class="fl mh5-back" @click="$router.go(-1)"></span>
                 <p>我的签到</p>
                 <div class="circle">
                       <p>签到</p>
                       <p>+5积分</p>
                 </div>
                 <p class="continuous">已连续签到5天</p>
         </div>
         <div class="usable">
                 <span>可用积分：520</span>
                 <a href="#" class="fr">去兑换</a>
         </div>
         <div class="award">
             签到奖励
         </div>
         <div class="regulation">
                  <div class="row">
                                <span >1</span>
                                连续签到7天奖励50积分
                  </div>
                     <div class="row">
                                <span >2</span>
                                连续签到14天奖励100积分
                  </div>
                     <div class="row">
                                <span >3</span>
                                连续签到30天奖励500积分
                  </div>
         </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.sign {
  height: 100%;
  background: #f1f1f1;
  .mysign {
    background: url('../../../../../assets/img/public/image/common/personal/userInfo/sigininbg@3x.png') no-repeat;
   background-size: 100% 4.58rem;
    height: 4.58rem;
    text-align: center;
    padding: 0.2rem 0.2rem;
    color: #fff;
    p {
      font-size: 0.34rem;
      margin-top: 0.1rem;
      margin-bottom: 0.1rem;
    }
    span {
      // font-size: 0.46rem;
    }
    .circle {
      width: 2.2rem;
      height: 2.2rem;
      border-radius: 50%;
      background: #f4f4f4;
      margin: 0.2rem auto;
      box-shadow: 0px 0px 0px 0.12rem #fff, 0px 0px 0px 0.14rem #ff6350;
      margin-top: 0.4rem;
      color: #fe0100;
      padding-top: 0.22rem;
      p:nth-child(1) {
        font-size: 0.56rem;
        padding: 0.26rem 0;
      }
      p:nth-child(2) {
        font-size: 0.34rem;
      }
    }
    .continuous {
      margin-top: 0.4rem;
      font-size: 0.36rem;
    }
  }
  .usable {
    height: 0.8rem;
    line-height: 0.8rem;
    background: #fff;
    padding: 0 0.3rem;
    margin-bottom: 0.24rem;
    a {
      text-decoration: underline;
      font-size: 0.3rem;
    }
  }
  .award {
    height: 0.94rem;
    line-height: 0.94rem;
    font-size: 0.34rem;
    border-bottom: 1px solid #dbdbdb;
    padding: 0 0.3rem;
    background: #fff;
  }
  .regulation {
    background: #fff;
    padding: 0.3rem;
    padding-top: 0.02rem;
    .row {
      height: 1.24rem;
      border: 1px solid #dbdbdb;
      border-radius: 0.15rem;
      line-height: 1.24rem;
      padding-left: 1.62rem;
      position: relative;
      color: #cdcdcd;
      font-size: 0.3rem;
      margin-top: 0.28rem;
      span {
        width: 1.3rem;
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
        text-align: center;
        border-right: 1px dashed #dbdbdb;
        font-size: 0.74rem;
        color: #cccccc;
      }
    }
  }
}
</style>