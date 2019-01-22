<template>
    <div class="lottery-wrap">
        <div class="title">
            <label v-if="ifAnimateBt">{{showIssue}}</label> 
            <label v-if="!ifAnimateBt">{{+showIssue+1}}</label> 期 
            <span>
                <span v-if="ifAnimateBt">开奖结果</span>
                <span v-if="!ifAnimateBt">正在开奖</span>
                <i @click="goto({'path':`/trend/${$route.meta.id}`})" class="orange  iconfont icon-curve"></i>
                <i @click="upShow" class="iconfont icon-pc-live"></i>
                <i @click="goto({'path':`/rules/${$route.meta.series}`,query:{id:$route.meta.id}})" class="iconfont icon-rule"></i>
            </span>
        </div>
    </div>
</template>
<script>
export default {
    props: ["ifAnimateBt","lastIssue"],
    data() {
        return {
          showIssue:''
        }
    },    
    methods:{
      goto(router){
          let routeData = this.$router.resolve(router);
          window.open(routeData.href, '_blank');
      },
      upShow(){
        this.$emit('LotteryAnimateFc',true)
      }        
    },
    mounted(){
      if(this.$route.meta.code!="bjsc"&& this.$route.meta.code!="bjpcdd"&&this.$route.meta.id!=1){
        this.showIssue=this.lastIssue&&this.lastIssue.toString().substring(4,this.lastIssue.length);
      }else{
        this.showIssue=this.lastIssue;
      }        
    },
    watch:{
        lastIssue:{
          handler:function(val,oldVal){
            if(this.$route.meta.code!="bjsc"&& this.$route.meta.code!="bjpcdd"&&this.$route.meta.id!=1){
              this.showIssue=this.lastIssue&&this.lastIssue.toString().substring(4,this.lastIssue.length);
            }else{
              this.showIssue=this.lastIssue;
            }                 
          },       
          deep:true
        }
    },  
}
</script>

<style lang="less" scoped rel="stylesheet/less">

</style>
