<template>
  <div class="deposit-send">
         
           <div class="content">
                  
                    <div class="row">
                        <label>存送优惠平台</label>
                    </div>
                     <div class="row">
                          <label>存送优惠类型</label>
                     </div>
                      <div class="row">
                           <label>转账金额</label>
                      </div>
                      <div class="row">
                           <label>红利金额</label>
                      </div>
                      <div class="row">
                            <label>流水倍数</label>
                      </div>
           </div>

           <div class="submitInfo">
                提交信息
           </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.deposit-send {
  .content {
    background: #fff;
    padding: 0 0.2rem;
    label {
      text-align: right;
      width: 1.9rem;
      display: inline-block;
      font-size: 0.28rem;
    }
     .row {
      height: 1rem;
      line-height: 1rem;
      border-bottom: 1px solid #dbdbdb;
    }
    .row:last-child{
        border-bottom:none;
    }
   
  }
  .submitInfo {
    margin: 0 0.2rem;
    margin-top: 0.28rem;
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: center;
    background: linear-gradient(90deg, #ff5100, #ff8e00);
    border-radius: .15rem;
    font-size: .36rem;
    color:#fff;
  }
}
</style>
