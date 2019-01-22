<template>
<div class="result-outSide-wrap">
    <div v-if="trueAward.length!=3" class="wrap">
        <div class="lottery-result" :class="{'pk10Result':$route.meta.series=='pk10',}">
            <div  class="left">
                <div style="text-align:left;"><span>{{showLastIssue}}期</span></div>
                <div>开奖结果:</div>
            </div>
            <div  class="right">
              <ul class="lottery-style">
                  <li class="lottery-result-center"
                      :class="{
                          'pk10Style':$route.meta.series=='pk10',
                          'pk10StyleR1':$route.meta.id==12,
                          'pk10StyleR2':$route.meta.id==13,
                          'liuhecaiStyle':$route.meta.series=='lhc'
                      }">
                      <span :class="{
                          'activePk1':$route.meta.series=='pk10'&&+item==1,
                          'activePk2':$route.meta.series=='pk10'&&+item==2,
                          'activePk3':$route.meta.series=='pk10'&&+item==3,
                          'activePk4':$route.meta.series=='pk10'&&+item==4,
                          'activePk5':$route.meta.series=='pk10'&&+item==5,
                          'activePk6':$route.meta.series=='pk10'&&+item==6,
                          'activePk7':$route.meta.series=='pk10'&&+item==7,
                          'activePk8':$route.meta.series=='pk10'&&+item==8,
                          'activePk9':$route.meta.series=='pk10'&&+item==9,
                          'activePk10':$route.meta.series=='pk10'&&+item==10,
                          'activeRLhc':$route.meta.series=='lhc'&&bose.red.includes(+item),
                          'activeBLhc':$route.meta.series=='lhc'&&bose.blue.includes(+item), 
                          'activeGLhc':$route.meta.series=='lhc'&&bose.green.includes(+item), 
                          'activeK31':$route.meta.series=='lhc'&&bose.red.includes(+item),
                          'activeK32':$route.meta.series=='lhc'&&bose.blue.includes(+item), 
                          'activeK33':$route.meta.series=='lhc'&&bose.green.includes(+item),                                            
                      }"   v-if="trueAward.length" v-for="(item,index) in trueAward" :key="index">{{item}}</span>
                      <span v-if="$route.meta.series=='lhc'&&this.trueAward.length" class="add">+</span>
                  </li>
              </ul>                    
              <div :class="{'liuhecaiStyle2':$route.meta.series=='lhc'}">
                  <span :class="{
                      'activeTwo':!+item&&item.length==2,
                      'activeThree':!+item&&item.length==3
                    }" v-if='index<8' v-for="(item,index) in awardSign" :key="index">{{item}}</span>
                  <!-- <span v-if="childNeedMess.series=='lhc'&&this.trueAward.length" class="add">+</span> -->
              </div>
            </div>
        </div>

        <div class="container-lottery-timer">
            <div class="lottery-timer-left">{{showIssue}}期</div>
            <div class="lottery-timer-center">
                <span class="tip" v-show="!timer.djs_next_kaipan">封盘:</span>
                <span class="tip" v-show="timer.djs_next_kaipan">开盘:</span>
                <vp-timer v-on:child-say="timeout" ref="timer"></vp-timer>
            </div>
            <i @click="$router.push({path:'/plays/trend',query:{id:$route.meta.id,series:$route.meta.series}})" class="iconfont icon-H-qushi"></i>
            
        </div>
    </div>  
    
    <div  v-if="trueAward.length==3" class="wrap-bot">
        <div class="lottery-result-bot">
            <div v-if=" this.$route.meta.series=='k3'"  class="left-bot">
                <div class="issue">
                    <span class="addColor">{{showLastIssue}}期开奖号码</span>
                 </div>
                <div class="result">
                    <ul class="k3">
                        <li :class="{
                            'active1':+item==1,
                            'active2':+item==2,
                            'active3':+item==3,
                            'active4':+item==4,
                            'active5':+item==5,
                            'active6':+item==6
                        }" v-for="(item,index) in trueAward" :key="index">
                        </li>
                    </ul>
                </div>
            </div>
            <div v-else  class="left-bot">
                <div class="issue">
                    <span class="addColor">{{showLastIssue}}期开奖号码</span>
                </div>
                <ul class="other">
                  <div class="other-wrap">
                    <li v-if="trueAward.length" v-for="(item,index) in trueAward" :key="index">
                        <span>{{item}}</span>
                    </li>
                  </div>

                </ul>
            </div>            
            <div  class="right-bot">
                <div class="issue">{{showIssue}}期投注</div>
                <div class="ico">
                    <span class="fengpan" v-show="timer.djs_next_kaipan">已封盘</span>
                    <label for="" v-show="!timer.djs_next_kaipan">
                        <span class="jiezhi">截止</span><vp-timer class="ico-time"   v-on:child-say="timeout" ref="timer"></vp-timer>
                    </label>
                    <i @click="$router.push({path:'/plays/trend',query:{id:$route.meta.id,series:$route.meta.series}})" class="iconfont icon-H-qushi"></i>
                </div>
            </div>
        </div>         
    </div> 
    
          
</div>

</template>
<script>
// import { Indicator } from 'mint-ui';
import store from '@/vuex/store'
import { _SetGet ,_SetPost} from '@/service/public/service.js'
import vpTimer from '../timer';
import UserService from '@/service/public/UserService.js'
export default {
    props: {
        childNeedMess:{
            type:Object
        }
    },    
    data() {
        return{
            reloadTimeStaue:true,
            timer:{
                timerModel:'hours',
                timeLeave:'',
                djs_next_kaipan:''
            },
            isopen:true,
            trueAward:[],
            awardSign:[],
            ifAnimate:true,
            bose:{
                red:[1 ,7 ,13 ,19 ,23 ,29 ,35, 45, 2 ,8 ,12 ,18, 24 ,30 ,34 ,40 ,46],
                blue:[3, 9 ,15 ,25 ,31 ,37 ,41 ,47 ,4 ,10 ,14 ,20 ,26 ,36 ,42 ,48],
                green:[5 ,11, 17 ,21 ,27 ,33 ,39 ,43 ,6 ,16 ,22 ,28 ,32 ,38 ,44,49]                
            },
            loadingStaue:true,
            showLastIssue:'' ,
            showIssue:'' ,
            showTotal:0
        }
    },
    methods: {
        // 获取要开奖的时间等信息
        async getOpenDatas(){
            this.reloadTimeStaue=false;
            // 是否第一次loading
            if(this.loadingStaue){
               this.$loading3(true);     
            }
            this.loadingStaue=false;
            //获取数据
            let res = await _SetGet(`${this.$HOST_NAME}/lottery/getIssue/${ this.$route.meta.id}`,{});
            if (res&&res.code == 200) {
                // if(this.ifAnimate){
                    if(this.trueAward.length){
                        this.showTotal=+this.trueAward[0]+(+this.trueAward[1])+(+this.trueAward[2]);
                    }
                    this.awardSign=res.data.lastluzhu?res.data.lastluzhu.split(','):[];
                    this.trueAward=res.data.lastresultInfo?res.data.lastresultInfo.split(','):[];
                    if(res.data.issue&& this.$route.meta.code!="bjsc"&& this.$route.meta.code!="bjpcdd"&&this.$route.meta.id!=1){
                        this.showLastIssue=res.data.lastissue&&res.data.lastissue.toString().substring(4,res.data.issue.length);
                    }else{
                        this.showLastIssue=res.data.lastissue;
                    }
                // }
                this.ifAnimate=false;

                // 更新开奖期数
                if(res.data.issue&& this.$route.meta.code!="bjsc"&& this.$route.meta.code!="bjpcdd"&&this.$route.meta.id!=1){
                    this.showIssue=res.data.issue&&res.data.issue.toString().substring(4,res.data.issue.length);
                }else{
                    this.showIssue=res.data.issue;
                }                
                // 下注期数传
                this.childNeedMess.issue=res.data.issue;      
                // 时间传
                this.timer.timeLeave=res.data.djs_fengpan;
                this.timer.djs_next_kaipan=res.data.djs_next_kaipan;
                // 向下传信息
                this.$nextTick(()=>{
                    this.$refs.timer.getTime(this.timer); 
                })
                
                // 锁定封关盘               
                if(res.data.djs_next_kaipan){
                   this.$emit('close-say',false);
                }else{
                    this.$emit('close-say',true);
                } 
                this.$loading3(false);              
            } else {
                this.dNotify('获取当前期数信息失败');
                return false
            }           
        },  
        // 时间到子组件触发
        timeout(datas){
             this.getOpenDatas();
            // setTimeout(()=>{
            //     this.reloadTimeStaue=true;
            // },5000);
            // if(this.reloadTimeStaue){
            //     console.log(this.reloadTimeStaue)
            //     this.getOpenDatas();
            // }            
        },
        init(){
            // console.log(this.childNeedMess)
           if( this.$route.meta.code=='xglhc'|| this.$route.meta.series=='sd'){
               this.timer.timerModel='days';
           }
        },
        //soket接收信息
        websoc(msg){
            if(msg.type=='user.lotteryOpen'){
                msg&&msg.data.forEach((item,index)=>{
                    if(item.lotteryId== this.$route.meta.id){
                        this.trueAward=item.lastresultInfo?item.lastresultInfo.split(','):[];
                        this.awardSign=item.lastluzhu?item.lastluzhu.split(','):[]; 
                        if(item.lastissue&& this.$route.meta.code!="bjsc"&& this.$route.meta.code!="bjpcdd"&&this.$route.meta.id!=1){
                            this.showLastIssue=item.lastissue.toString().substring(4,item.lastissue.length);
                        }else{
                            this.showLastIssue=item.lastissue;
                        }                                   
                    }
                })
            }
        }                  
    },
    watch: {
     
    },     
    created: function() { 
        //不需要监听，原因上一步写死
        this.init();
        this.getOpenDatas();     
        // console.log("您已进入彩票页")
    },  
    mounted(){
      
    },
    components: {
        vpTimer
    },
    computed: {  
      userIfo(){
          return this.$store.state.mainState.userinfo; 
      }
    }, 
    watch: {
      
    },             
    store
}
</script>

<style lang="less" scoped>
@import "../../../../../assets/less/public/var.less";
.result-outSide-wrap{
    position: relative;
    .wrap{
        height: 1.85rem;
        .lottery-result{
            padding: 0 0 0 .2rem;
            zoom: 1;
            overflow: hidden;
            font-size: .30rem;
            width: 100%;
            border-bottom: 1px solid @main-lottery-border-color;
            padding-bottom: .08rem;
            &.pk10Result{
                 height: 1.13rem;
                 padding: 0 0 0 .1rem;
            }
            .left{
            float: left;
            text-align: center;
            div{
                padding-top: .06rem;
                color:#333;
                line-height: .48rem;
                text-align: center; 
                &:first-child{
                    span{
                         color:@main-brder-color;
                    }
                   
                }               
            }
            }
            .right{
                float: left;
                padding-left: .2rem;
                .lottery-style{
                    padding-top: .05rem;
                    .lottery-result-center{
                        position: relative;
                        span{
                            width: .46rem;
                            height: .46rem;
                            line-height: .46rem;
                            text-align: center;
                            border-radius: 50%;
                            display: inline-block;
                            background:@main-color;
                            // border: 1px solid @main-brder-color;
                            border: 0;
                            color: #fff;
                            font-weight: 600;
                            margin-right: .05rem;
                            &.activeRLhc{
                                background: #F36055; 
                                border: 1px solid #F36055;   
                            }
                            &.activeBLhc{
                                background: #20A2D8; 
                                border: 1px solid #20A2D8;   
                            }
                            &.activeGLhc{
                                background: #49BB27; 
                                border: 1px solid #49BB27;   
                            }                        
                        }
                    }
                    .pk10Style{
                        
                        span{
                            width: .40rem;
                            height: .40rem;
                            line-height: .38rem;
                            border-radius:0;
                            text-align: center;
                            display: inline-block;
                            color: #fff;
                            font-weight: 500;
                            margin-right: .05rem;
                            font-size: .26rem;
                            &.activePk1{
                                background: #E6DE0B;
                                border: 1px solid #E6DE0B;
                            }
                            &.activePk2{
                                background: #4B84F8;
                                border: 1px solid #4B84F8;
                            }
                            &.activePk3{
                                background: #4C4C4C; 
                                border: 1px solid #4C4C4C;
                            }
                            &.activePk4{
                                background: #D86F1A; 
                                border: 1px solid #D86F1A; 
                            }
                            &.activePk5{
                                background: #80E7E6; 
                                border: 1px solid #80E7E6; 
                            }
                            &.activePk6{
                                background: #4403F3;
                                border: 1px solid #4403F3;   
                            }
                            &.activePk7{
                                background: #DFDFDF; 
                                border: 1px solid #DFDFDF; 
                            }
                            &.activePk8{
                                background: #D10108; 
                                border: 1px solid #D10108;  
                            }
                            &.activePk9{
                                background: #650000; 
                                border: 1px solid #650000;  
                            }
                            &.activePk10{
                                background: #73C32E; 
                                border: 1px solid #73C32E; 
                            }                                             
                        }
                    }
                    .pk10StyleR1{
                      span{
                        border-radius: .1rem;
                      }
                    }
                    .pk10StyleR2{
                      span{
                        border-radius: 50%;
                      }                              
                    }                            
                    .liuhecaiStyle{
                      line-height: 1;
                        span{
                          line-height: .42rem;
                          &:nth-child(7){
                              margin-left: .53rem;
                          }   
                        }
                        .add{
                            position: absolute;
                            top: 0rem;
                            right: .52rem;
                            background: #fff;
                            color: #F36055;
                            font-size: .59rem;
                            font-weight: normal;
                            border:0;
                        }
                    }
                }                
                div{
                  padding-top: .06rem;
                  &:last-child{
                      position: relative;
                      color:#666;
                      span{
                          width: .46rem;
                          height: .46rem;
                          line-height: .48rem;
                          text-align: center;
                          border-radius: .10rem;
                          display: inline-block;
                          border: 1px solid @main-lottery-border-color2;
                          margin-right: .05rem;
                      } 
                      &.liuhecaiStyle2{
                          span{
                          &:nth-child(7){
                              margin-left: .53rem;
                          }
                          //    &:last-child{
                          //         position: absolute;
                          //         top: .06rem;
                          //         right: .52rem;                                
                          //         background: #fff;
                          //         color: #F36055;
                          //         font-size: .59rem;
                          //         border: 0;
                          //    } 
                          }   
                      }                    
                      .activeTwo{
                      width: .72rem;
                      } 
                      .activeThree{
                          width: .104rem;
                      }                     
                  }
                }
            }
        }
    }
    .container-lottery-timer{
        padding: .1rem .2rem ;
        height: .66rem;
        line-height: .49rem;
        border-bottom: 1px solid @main-lottery-border-color;
        font-size: .3rem;
        position: relative;
        z-index: 101;
        .lottery-timer-left{
            padding-right: .2rem;
            color:#333;
            line-height: .5rem;
            float: left;
        }  
        .lottery-timer-center{
            float: left;
            .tip{
                float: left;
                color: #333;
            }
        }
        .lottery-timer-trend{
            float: right;
            span{
                color:@main-brder-color;
                font-size: .38rem;
                line-height: .50rem;
            }
        } 
        i{
            float: right;
            color: @main-brder-color;
            font-size: .32rem;
        }                     
    }
    .wrap-bot{
      .lottery-result-bot{
        width: 100%;
        &::after{
          display: block;
          content: "";
          clear: both;
        }            
        .issue{
                font-size: .3rem;
                color:#666;
                text-align: center;
                padding: .18rem 0;      
        }        
        .left-bot{
          float: left;
          min-width: 50%;
          border-right: 1px solid @main-lottery-border-color;
          padding-bottom: .15rem;
          border-bottom: 1px solid @main-lottery-border-color; 
          .issue{
              .addColor{
                  color:#666;
              } 
          }           
          .result{
            justify-content: center;
            display: flex;                
            .k3{
                display: flex;
                li{
                    width: .48rem;
                    height: .48rem;
                    &.active1{
                        background: url('../../../../../assets/img/public/image/lottery/kuai3/kuaisan-one@3x.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    &.active2{
                        background: url('../../../../../assets/img/public/image/lottery/kuai3/kuaisan-two@3x.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    &.active3{
                        background: url('../../../../../assets/img/public/image/lottery/kuai3/kuaisan-three@3x.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    &.active4{
                        background: url('../../../../../assets/img/public/image/lottery/kuai3/kuaisan-four@3x.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    &.active5{
                        background: url('../../../../../assets/img/public/image/lottery/kuai3/kuaisan-five@3x.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    &.active6{
                        background: url('../../../../../assets/img/public/image/lottery/kuai3/kuaisan-six@3x.png') no-repeat;
                        background-size: 100% 100%;
                    }   
                }
                .totle{
                    width: .48rem;
                    height: .48rem;
                    line-height: .48rem;
                    text-align: center;
                    font-size: .34rem;
                    color:@main-brder-color;
                }
            }
            .k3{
                li{
                    margin-right: .1rem;
                    // &:nth-child(1){
                    // &::after{
                    //         color: #C2C2BF;
                    //         display: inline-block;
                    //         content: '+';
                    //         font-size: .48rem;
                    //         vertical-align: middle; 
                    //         margin-left: .54rem;                      
                    // }
                    // }
                    // &:nth-child(2){
                    // &::after{
                    //         color: #C2C2BF;
                    //         display: inline-block;
                    //         content: '+';
                    //         font-size: .48rem;
                    //         vertical-align: middle; 
                    //         margin-left: .54rem;                      
                    // }
                    // }
                    // &:nth-child(3){
                    // &::after{
                    //         color: #C2C2BF;
                    //         display: inline-block;
                    //         content: '=';
                    //         font-size: .48rem;
                    //         vertical-align: middle; 
                    //         margin-left: .54rem;                      
                    // }
                    // }                                                
                }
            }
          }
          .other{
            &::after{
              display: block;
              content: "";
              clear: both;
            }
            .other-wrap{
              text-align: center;
              li{
                display: inline-block;
                width: .52rem;
                height: .52rem;
                line-height: .52rem;
                border-radius: 50%;
                background:@main-color;
                text-align: center;
                border: 0;
                color: #fff;
                font-weight: 600;
                margin-right: .05rem;  
                font-size: .34rem; 
                &:last-child{
                  margin-right: 0;  
                }                        
              }
            }  
          }                
        }
        .right-bot{
            float: right;
            padding-bottom: .15rem;
            border-bottom: 1px solid @main-lottery-border-color;                  
            flex: 1;
            min-width: 50%;
            .ico{
                font-size: .38rem;
                display:flex;
                justify-content: center;
                .ico-time{
                    margin-top: -.03rem;
                }
                .fengpan{
                    font-size: .32rem;
                }
                span{
                    color: @main-brder-color;
                    font-size: .38rem;
                    line-height: .38rem;
                    padding-left: .1rem;
                }
                label{
                    .jiezhi{
                        float: left;
                        font-size: .32rem;
                        line-height: 0.46rem;
                        padding-right: .03rem
                    }
                }
                i{
                    padding-left: .08rem;
                    padding-top: .06rem;
                    color: @main-brder-color;
                    font-size: .32rem;
                } 
            }
        }        
      }
    }
    .time{
        position: absolute;
        top: 1.33rem;
        left: 1.62rem;
        font-size: .3rem;
        &.active{
           top: .64rem;
           left: 4.64rem;           
        }
    }
}


</style>
