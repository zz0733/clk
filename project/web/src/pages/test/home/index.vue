<template>
  <div class="new-index hqyl-home">
    <div class="banner">
      <div class="newgong">
        <div class="newgong-content">
          <div class="demolist list">
            <div class="notice">
              <img src="/static/test/img/home/icon-speaker.png" alt="">
            </div>            
            <marquee align="middle" direction="left" loop="-1" scrollamount="3" onmouseout="this.start()" onmouseover="this.stop()" 
            style="color: white; font-size: 15px; line-height: 40px;overflow: hidden;height: 40px;"
            >
              <span v-html="lantern"></span>
            </marquee>
          </div>
        </div>
      </div>

      <div class="carouse">
        <el-carousel :interval="2000" arrow="never" height="503px">
          <el-carousel-item v-for="(item,i) in carouselData" :key="i">
            <a :href="item.targets" target="_blank" v-if="item.targets !=='#'">
                <img :src="item.img" alt="">
              </a>
              <img :src="item.img" alt="" v-else>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>


    <div class="home-container">
      <div class="home-box">
          <div class="middle_title"></div>
          <div class="more_game_middle clear">
            <div class="middle_top clear animated fadeInDownBig">
              <div class="top_games clear">
                <div class="games_box ml_none z9999">
                    <a href="javascript:void(0);" class="game_icon" @click="goTo({type:'lottery',router:'#/plays/tradition/2'});">
                        <span class="game_icon_1"></span>
                    </a>
                    <div class="lottery_species">
                        <a class="species_center" href="javascript:void(0);" @click="goTo({type:'lottery',router:'#/plays/tradition/2'});">
                            北京赛车
                        </a>
                    </div>
                </div>
                <div class="games_box z9999">
                    <a href="javascript:void(0);" class="game_icon" @click="goTo({type:'lottery',router:'#/plays/tradition/4'});">
                        <span class="game_icon_2"></span>
                    </a>
                    <div class="lottery_species">
                        <a class="species_center" href="javascript:void(0);" @click="goTo({type:'lottery',router:'#/plays/tradition/4'});">
                            重庆时时彩
                        </a>
                    </div>
                </div>
                <div class="games_box z9999">
                    <a href="javascript:void(0);" class="game_icon" @click="goTo({type:'lottery',router:'#/plays/tradition/5'});">
                        <span class="game_icon_3"></span>
                    </a>
                    <div class="lottery_species">
                        <a class="species_center" href="javascript:void(0);" @click="goTo({type:'lottery',router:'#/plays/tradition/5'});">
                            广东快十分
                        </a>
                    </div>
                </div>
                <div class="games_box ml_none mt">
                    <a href="javascript:void(0);" class="game_icon">
                        <span class="game_icon_4"></span>
                    </a>
                    <div class="lottery_species">
                        <a class="species_center" href="javascript:void(0);">
                            幸运飞艇
                        </a>
                    </div>
                </div>
                <div class="games_box mt">
                    <a href="javascript:void(0);" class="game_icon" @click="goTo({type:'lottery',router:'#/plays/tradition/1'});">
                        <span class="game_icon_5"></span>
                    </a>
                    <div class="lottery_species">
                        <a class="species_center" href="javascript:void(0);" @click="goTo({type:'lottery',router:'#/plays/tradition/1'});">
                            香港六合彩
                        </a>
                    </div>
                </div>
                <div class="games_box mt">
                      <a @click="goTo({type:'lottery',router:'#/plays/tradition/7'});" href="javascript:;" class="game_icon">
                          <span class="game_icon_6"></span>
                      </a>
                      <div class="lottery_species">
                          <a class="species_center" href="javascript:;" @click="goTo({type:'lottery',router:'#/plays/tradition/7'});">
                              广东11选5
                          </a>
                      </div>
                  </div>

              </div>
              <div class="hot_list">
                <div class="rig-con1">
                    <a href="javascript:void(0);" title="最新优惠" @click="goTo({router:'/home/youhui'})">
                        <dl>
                            <dt></dt>
                            <dd>
                                <h3>最新优惠</h3>
                                <p>提供最新优惠</p>
                            </dd>
                        </dl>
                    </a>
                </div>
                <div class="rig-con2">
                      <a :href="serviceUrl" target="_blank" title="在线客服">
                          <dl>
                              <dt></dt>
                              <dd>
                                  <h3>在线客服</h3>
                                  <p>24小时在线客服</p>
                              </dd>
                          </dl>
                      </a>
                  </div>
                  <div class="rig-con3">
                      <a href="javascript:void(0);" title="代理加盟" @click="goUserCen('agency',0)">
                          <dl>
                              <dt></dt>
                              <dd>
                                  <h3>代理加盟</h3>
                                  <p>Agent to join</p>
                              </dd>
                          </dl>
                      </a>
                  </div>
              </div>
            </div>
          </div>
      </div>
      <div class="oth-item">
        <div class="wrap">
            <ul id="middle_bottom">
                <li class="li1 animated bounceInLeft">
                    <a href="javascript:void(0);" @click="goTo({type:'lottery',router:'#/plays/hall'});">
                        <i class="oth-img"></i>
                        <span>传统彩票</span>
                    </a>
                </li>
                <li class="li2 animated bounceInDown">
                    <a href="javascript:void(0);" @click="getItemId({id: '13',platform: 'vr_lottery'});">
                        <i class="oth-img"></i>
                        <span>VR彩票</span>
                    </a>
                </li>
                <li class="li3 animated bounceInDown">
                    <a href="javascript:void(0)" onclick="alert('即将上线，敬请期待');">
                        <i class="oth-img"></i>
                        <span>IG彩票</span>
                    </a>
                </li>
                <li class="li4 animated bounceInRight">
                    <a :href="$root.mobileurl" target="_blank">
                        <i class="oth-img"></i>
                        <span>手机下注</span>
                    </a>
                </li>
            </ul>

        </div>
      </div>
    </div>

    <div class="footer-exhibition">
      <div class="download_link">
        <div class="advantages">
            <div class="payment_date">
                <div class="payment_date_l">
                    <h3>存款</h3>
                    <p>到账平均时间</p>
                </div>
                <div class="payment_date_r">
                    <span class="pay_time">23<strong>秒</strong></span>
                </div>
                <div class="time_bar">
                    <span class="bar_slide"></span>
                </div>
            </div>
            <div class="payment_date">
                <div class="payment_date_l">
                    <h3>取款</h3>
                    <p>到账平均时间</p>
                </div>
                <div class="payment_date_r">
                    <span class="pay_time">2'02<strong>分</strong></span>
                </div>
                <div class="time_bar">
                    <span class="bar_slide_n"></span>
                </div>
            </div>
        </div>
        <div class="mobile_down">
            <p>移动互联网时代，机会一手把握</p>
            <p>全面支持苹果APP 安卓APP 手机全部浏览器</p>
            <div class="down">
                <span class="apple"><a href="javascript:void(0);"></a></span>
                <span class="android"><a href="javascript:void(0);"></a></span>
                <span class="browser"><a href="javascript:void(0);"></a></span>
            </div>
        </div>
        <div class="mobile_client">
            <h2>手机客户端</h2>
            <div class="client_downloads">
                <p>下载地址：</p>
                <a class="login_ios" :class="[mobileDow=='ios'?'on':'']" href="javascript:;" @click="mobileDow='ios'"></a>
                <a class="login_android" :class="[mobileDow=='android'?'on':'']" href="javascript:;" @click="mobileDow='android'"></a>
            </div>
            <div class="client_erweima">
                <p v-show="mobileDow=='ios'"><img src="/static/test/img/ios.jpg" alt="IOS" width="104" height="104"></p>
                <p v-show="mobileDow=='android'"><img src="/static/test/img/android.png" alt="ANDROID" width="104" height="104"></p>
            </div>
        </div>
      </div>
    </div>
    <Modal :scrollable=true title="网站公告" ok-text="关闭" v-model="showPopout" width="657" class="vp-popout-box">
      <div class="popout-box">
        <span v-html="popups"></span>
      </div>
    </Modal>
  </div>
</template>

<script>
import $ from "jquery";
import store from "@/vuex/store";
import data from "../../public/games/public.js";

export default {
  mixins: [data],
  data() {
    return {
      mobileDow:'ios',
      showPopout: false,
      popups: "",
      lantern: "",
      serviceUrl:null,
      // 轮播设置
      setting: {
        live:{
          liveVal:0,autoplaySpeed:3000,autoplay:true,dots:"none",trigger:"click",arrow:"never"
        }
      },
      // 滚动名单
      scrollDatas: [],
      // 选项选择
      optionList: [
        { name: "AG贵宾厅",index: 0 ,platform: 'live_casino',id:'14',img:'/static/hqyl/img/banner_game/zrsx_ag.jpg'},
        { name: "BBIN旗舰厅",index: 1,platform: 'live_casino',id:'15',img:'/static/hqyl/img/banner_game/zrsx_bbin.jpg'},
        { name: "BG大遊厅", index: 2 ,platform: 'live_casino',id:'44',img:'/static/hqyl/img/banner_game/zrsx_bg.jpg'},
        { name: "DG梦幻厅",index: 3 ,platform: 'live_casino',id:'33',img:'/static/hqyl/img/banner_game/zrsx_dg.jpg'},
        { name: "DS视讯厅",index: 4 ,platform: 'live_casino',id:'16',img:'/static/hqyl/img/banner_game/zrsx_ds.jpg'},
      ],
      otherGame:[
        {name:'彩票游戏',img:'/static/hqyl/img/home/live/gpi_cp.jpg',btnName:'进入游戏',router:'/plays/hall'},
        {name:'电子游艺',img:'/static/hqyl/img/home/live/gpi_dzyy.jpg',btnName:'进入游戏',router:'/home/games?id=26&name=MG老虎机'},
        {name:'体育投注',img:'/static/hqyl/img/home/live/gpi_tytz.jpg',btnName:'进入游戏',router:'/sport'},
        {name:'捕鱼达人',img:'/static/hqyl/img/home/live/gpi_bydr.jpg',btnName:'进入游戏',router:'/home/buyu'}
      ],
      carouselData: [
        
      ],
      jackpotNum: 30631803863,
      setInter: null,
    };
  },
  methods: {
    //获取banner
    async getbannner() {
      let res = await this.$http.post(`${this.$HOST_NAME}/site/position`, {
        position: "banner",
        clientType: "pc"
      });
      if (res && res.code == 200) {
        this.carouselData = res.data[0] && res.data[0].body;
      }
    },
    liveEnter(item){
      this.setting.live.autoplay=false;
      this.setting.live.liveVal=item.index;
    },
    liveLeave(){
     this.setting.live.autoplay=true;
    },

    jackpotFc() {
      clearInterval(this.setInter);
      this.setInter = setInterval(() => {
        this.jackpotNum = this.jackpotNum + 8.56;
      }, 20);
    },
    goTo(item){
      if (item.type=='lottery') {
        window.open(item.router);
        return false;
      }else{
        this.$router.push(item.router);
      }
    },
    goUserCen(name, num) {
      //name的类型有 ：  recharge （充值）  personage （个人资料）
      //withdraw （提现）  agency  （代理） message （消息）  discounts （优惠）
      this.$store.commit("showPersonal", {
        bool: true
      });
      this.$store.commit("showContent", {
        parent: name
      });
      this.$store.commit("showNav", {
        child: num
      });
    },
    async getlantern() {
      let res = await this.$http.post(`${this.$HOST_NAME}/site/notice`, {
        type: "lantern",
        desc_client_type:'html'
      });
      if (res && res.code == 200) {
        if (!res.data.data.length) return false;
        this.lantern = res.data.data[0] && res.data.data[0].description;
      }
      // 参数： type: lantern 走马灯
      // 参数： type: popups 弹窗
      // 参数： type: notice 提示
    },
    async getPopout() {
      if (!this.$store.state.mainState.ifpourT || localStorage.token)
        return false;
      let res = await this.$http.post(`${this.$HOST_NAME}/site/notice`, {
        type: "popups",
        desc_client_type:'html'
      });
      if (res && res.code == 200) {
        if (!res.data.data.length) return false;
        this.showPopout = true;
        this.popups = res.data.data[0] && res.data.data[0].description;
        this.$store.commit("mainState/resetPour", false);
      }
    }
  },
  created() {
    setTimeout(()=>{
      this.serviceUrl = this.$root.config.service[0]&&this.$root.config.service[0].url;
    },200);
    
    this.getPopout();
    let chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "j", "k", "-", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    // 随机用户名
    function generateMixed(n) {
      var res = "";
      for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 61);
        res += chars[id];
      }
      return res;
    }
    //50个模型demo
    let datas = [];
    for (let index = 0; index < 20; index++) {
      let arr=[2,3,4,5,4,5,2,3,4,2];
      datas.push(
        {
          account: generateMixed(arr[Math.floor(Math.random() * 10)])+'***',
          in: 99*Math.ceil(Math.random() * 10)*Math.ceil(Math.random() * 10)*Math.ceil(Math.random() * 10)*Math.ceil(Math.random() * 10)
        }
      );
    }
    this.scrollDatas = datas;
  },
  mounted() {
    clearInterval(this.setInter);
    this.jackpotFc();
    this.getlantern();
    setTimeout(()=>{
      this.serviceUrl = this.$root.config.service[0]&&this.$root.config.service[0].url;
    },200);
    this.getbannner();
  },
  beforeDestroy(){
    clearInterval(this.setInter);
  },
  components: {},
  store
};
</script>

<style lang="less">
@keyframes animate {
  0% {
    bottom:0
  }
  2% {
    bottom:-50px;
  }  
  50% {
    bottom:-50px;
  }  
  52% {
    bottom:0px;
  }    
  100% {
    bottom:0;
  }
} 
@-webkit-keyframes animate {
  0% {
    bottom:0
  }
  2% {
    bottom:-50px;
  }  
  50% {
    bottom:-50px;
  }  
  52% {
    bottom:0px;
  }    
  100% {
    bottom:0;
  }
}
@-moz-keyframes animate {
  0% {
    bottom:0
  }
  2% {
    bottom:-50px;
  }  
  50% {
    bottom:-50px;
  }  
  52% {
    bottom:0px;
  }    
  100% {
    bottom:0;
  }
}
@-o-keyframes animate {
  0% {
    bottom:0
  }
  2% {
    bottom:-50px;
  }  
  50% {
    bottom:-50px;
  }  
  52% {
    bottom:0px;
  }    
  100% {
    bottom:0;
  }
}
@-ms-keyframes animate {
  0% {
    bottom:0
  }
  2% {
    bottom:-50px;
  }  
  50% {
    bottom:-50px;
  }  
  52% {
    bottom:0px;
  }    
  100% {
    bottom:0;
  }
}


@keyframes animate2 {
  0% {top:0}
  1% {top:-25px}5% {top:-25px}
  6% {top:-50px}10% {top:-50px}
  11% {top:-75px}15% {top:-75px}
  16% {top:-100px}20% {top:-100px}
  21% {top:-125px}25% {top:-125px}
  26% {top:-150px}30% {top:-150px}
  31% {top:-175px}35% {top:-175px}
  36% {top:-200px}40% {top:-200px}

  41% {top:-225px}45% {top:-225px}
  46% {top:-250px}50% {top:-250px}
  51% {top:-275px}55% {top:-275px}
  56% {top:-300px}60% {top:-300px}
  61% {top:-325px}65% {top:-325px}
  66% {top:-350px}70% {top:-350px}

  71% {top:-375px}75% {top:-375px}
  76% {top:-400px}80% {top:-400px}
  81% {top:-425px}85% {top:-425px}
  86% {top:-450px}90% {top:-450px}
  91% {top:-475px}95% {top:-475px}
  96% {top:-500px}100% {top:-500px}
} 

.new-index {
  position: relative;
  background: #f1f1f1;
  .banner {
    position: relative;
    background-color: #10151b;
    .newgong {
      position: absolute;
      height: 42px;
      width: 100%;
      bottom: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.4);
      border-bottom: 1px solid #473a0b;
      border-top: 1px solid #473a0b;
      z-index: 12;
      .newgong-content {
        width: 1004px;
        height: 42px;
        margin: 0 auto;
        .demolist {
          display: inline-block;
          width: 950px;
          position: relative;
          .notice {
            display: inline-block;
            position: absolute;
            top: 12px;
            left: -30px;
          }          
        }
      }
    }
    .carouse {
      text-align: center;
      width: 100%;
      /deep/ .el-carousel__indicators{
        bottom: 42px;
        .el-carousel__indicator{
          .el-carousel__button {
            width: 13px;
            height: 13px;
            border-radius: 50%;
            // background: rgba(0, 0, 0, 0.9);
          }
        }
      }
      // /deep/ .el-carousel__button {
      //   width: 13px;
      //   height: 13px;
      //   border-radius: 50%;
      //   // background: rgba(0, 0, 0, 0.9);
      // }      
      // /deep/ .el-carousel__indicator {
        // bottom: 50px;
        // background: red;
        // &.is-active{
        //   .carousel__button {
        //     background: #fff;
        //   }
          
        // }
      // }
    }
  }
  
}
</style>
