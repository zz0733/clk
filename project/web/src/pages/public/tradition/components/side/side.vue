<template>
<div class="side-css">
    <!-- :default-openeds=posit.parentPosit  default-active default-openeds只加一个 -->
    <el-menu ref="sideElMenu"
      router
      :unique-opened=true
      :default-active=router
      class="el-menu-vertical-demo"
      activeTextColor="#ff0000"
      @select="handleSelect"
      @open="handleOpen"
      @close="handleClose">
       <el-submenu  :index="''+index" :key="index" v-for="(item,index) in sideDatas">
        <template slot="title">
          <label @click="toHome(item)" for="">
            <i><img :src="item.name|capitalize"></i>   
            <span>{{item.name}}</span>
          </label>
        </template>
        <el-menu-item-group>
          <el-menu-item :key="innerIndex" v-for="(innerItem,innerIndex) in item.lottery"  :index="''+'/plays/tradition/'+innerItem.id">{{innerItem.name}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>        
    </el-menu>
</div>        
</template>
<script>
// 获取侧边导航ico分类
import store from '@/vuex/store'
export default {
    data() {
        return {
            sideDatas:[],
            router:'/'
        }
    },
    methods:{
        // 分类ico,一般不动
        async getLIst(){
            let res = await this.$http.post(`${this.$HOST_NAME}/games/lottery/category`,{});
            // return false;
            if (res&&res.code == 200) {
                this.sideDatas=res.data;
                // 提取常用彩票
                let conmmonUse={
                    name:"常用彩票",
                    id:"100",
                    lottery:[]
                };
                this.sideDatas.forEach((item)=> { 
                    item&&item.lottery.forEach((innerItem)=>{ 
                        if(innerItem.tag=='常用'){
                            conmmonUse.lottery.push(innerItem);
                        }                           
                    });                    
                });   
                //只显示常用5个
                // console.log(conmmonUse.lottery)
                if(conmmonUse.lottery.length>5){
                    conmmonUse.lottery.splice(5,conmmonUse.lottery.length);
                }             
                this.sideDatas.unshift(conmmonUse);  
                //加大厅                
                this.sideDatas.unshift({name:"购彩大厅",lottery:[]})                             
                res.data&&this.sideDatas.forEach((item)=> {
                    //常玩
                    if(item&&item.id=="100"){
                        item.lottery&&item.lottery.splice(5,100);
                    }
                    // this.commonUsed(item);

                });
                //系列(放在路由之后)
                this.series(); 
                this.$store.commit('lottery/setReady'); 
                // console.log(this.sideDatas)
            } else {
              this.dNotify(res.message,'error'); 
            }
        },
        //分配系列类型
        series (){       
           this.sideDatas.forEach((outItem)=>{
                 outItem.lottery&&outItem.lottery.forEach((intItem)=>{
                    if(intItem&&intItem.router&&intItem.router==this.$route.path.toString()
                    &&outItem.name!="常用彩种"){
                        this.$store.commit('lottery/resetSeriesMsg', {
                            code:intItem.code,
                            series:JSON.parse(intItem.special_setting).series,
                            id:intItem.id,
                            title:intItem.name
                        }); 
                    }
                })
            })
        },   
        toHome(item){
            // console.log(item.name)
            if(item.name=="购彩大厅"){
                this.$router.push({
                    path:"/plays/hall"
                })
            }
        },  
        handleOpen(key, keyPath) { 
        },
        handleSelect(key, keyPath){
        },
        handleClose(key, keyPath) {
        },
 
    },
    // 监听路由跳转
    watch: {
        $route() {
            this.series();
        }
    },
    mounted(){

    },
    created () {
        this.getLIst();
        this.router=this.$route.path;
    },
    computed: {      
    },
    filters:{
        capitalize: function(value) {
            try {
                return `/static/public/image/lottery/sideIco/vp-${value}.png`;
            }
            catch(err) {
                return `/static/public/image/lottery/sideIco/vp-changwan-ico.png`;
            }
            
        }
    },
    store
}
</script>

<style lang="less" scoped rel="stylesheet/less">
// @import '../assets/less/var.less';

</style>
