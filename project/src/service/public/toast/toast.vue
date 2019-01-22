<template>
    <div class="myAlert animated fadeIn" v-show="alertShow">
      <!-- fadeIn -->
      <div class="alert_content">
        <span>{{message}}</span>
      </div>
    </div>
</template>

<script>
export default {
     data(){
       return {
         alertShow:false,
         message:'',
         icon:''
     }
     },
     methods:{
     }
};
</script>

<style lang="less" scoped>
.myAlert {
  display: flex;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 45%;
  z-index: 1000;
  font-size: 16px;
  width: 100%;
  text-align: center;
  .alert_content{
    background-color: #000;
    opacity: .7;    
    padding: 18px 20px;
    border-radius: 6px;
    color: #ffffff;
    max-width: 6rem;
    text-align: justify;
    span{
      font-size: .32rem;
    }
  }
  // div{
  //   padding: .36rem .48rem;
  //   color: #fff;

  // }
}
</style>
