<template>
  <div class="container" ref="container" :class="{'active':ifShowNav}">
    <vp-lot-header v-on:menu-animate-say="menuAnimate" :title="childNeedMess.title"></vp-lot-header>
    <div class="all-container-wrap" :class="{'active':ifShowNav}">
      <transition name="fade">
        <div class="all-container-betArea">
          <vp-lottery-result ref="lotHeaderWrap" v-on:close-say='closeLoy'
                             :childNeedMess='childNeedMess'></vp-lottery-result>
          <vp-nav :sideReady='sideReady' :childNeedMess='childNeedMess' :side='side'
                  v-on:child-say="getListData"></vp-nav>
          <div class="betArea-decial-box">
            <div class="lottery-cont" ref="lottery-cont">
              <!-- <cube-scroll :data="showList.list" ref="scroll" @scroll="scroll" :scroll-events="scrollEvents"> -->
              <div v-if="sideSelect=='点数'" class="wrap">
                <div class="list" :key=outIndex v-for="(outItem,outIndex) in showList.list">
                  <div class="lottery-title">{{outItem.small=='拆分'?'':outItem.small}}</div>
                  <div class="dianShuTitle">猜3个开奖号相加的和，3-10为小，11-18为大</div>
                  <ul class="lottery-ul-dianShu">
                    <li :class="{'bg-color-active':intItem.state}" @click="addActiveFc(intItem)" class="lottery-li-dianShu"
                        :key=intIndex v-for="(intItem,intIndex) in outItem.code">
                      <div class="ball">
                        <div>{{intItem.name}}</div>
                        <div>赔率:{{(+intItem.odds*(1-total.rebate*0.01)).toFixed(2)}}</div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div @touchmove.prevent v-show="closeMaskStaue" class="lottery-close-mask" ref="lottery-close-mask">
                </div>
                <vp-lu-zhu ref="luZhuWrap" v-on:select-say="showBallSel" :childNeedMess="childNeedMess"></vp-lu-zhu>
                <div class="lottery-gasket" v-show="total.num&&total.num>0"></div>
              </div>
              <div v-if="sideSelect=='三同'||sideSelect=='二同'||sideSelect=='二不同'" class="wrap">
                <div class="list" :key=outIndex v-for="(outItem,outIndex) in showList.list">
                  <div class="lottery-title">{{outItem.small}}</div>
                  <div v-if="outItem.small=='三同'" class="dianShuTitle">
                    对相同的三个号码(111、222、333、444、555、666)中的任意一 个或多个进行投注，所选号码开出，即为中奖
                  </div>
                  <div v-if="outItem.small=='三同通选'" class="dianShuTitle">
                    对相同的三个号码(111、222、333、444、555、666)进行投注，任意号码开出，即为中奖
                  </div>
                  <div v-if="outItem.small=='二同'" class="dianShuTitle">
                    从11-66中任意选1个或者多个号码，选号与奖号（包含11-66，不限顺序）相同，即为中奖（不含豹子）
                  </div>
                  <div v-if="outItem.small=='二不同'" class="dianShuTitle">
                    从11-66中任意选1个或者多个号码，选号与奖号（包含11-66，不限顺序）相同即为中奖（不含豹子）
                  </div>
                  <ul :class="{
                      'sTTongXuan':outItem.small=='三同通选',
                      'erBuTong':sideSelect=='二不同'
                     }" class="lottery-ul-sanTong">
                    <li :class="{'bg-color-active':intItem.state}" @click="addActiveFc(intItem)" class="lottery-li-sanTong"
                        :key=intIndex v-for="(intItem,intIndex) in outItem.code">
                      <div :class="{'bg-color-active':intItem.state}" class="ball">
                        <div>
                            <span v-if="outItem.small!='三同通选'" :key=ballIndex v-for="(ballItem,ballIndex) in 3" :class="{
                                                            'active1':intItem.code==111,
                                                            'active2':intItem.code==222,
                                                            'active3':intItem.code==333,
                                                            'active4':intItem.code==444,
                                                            'active5':intItem.code==555,
                                                            'active6':intItem.code==666
                                                        }">
                            </span>
                          {{intItem.name}}
                        </div>
                        <div>赔率:{{(+intItem.odds*(1-total.rebate*0.01)).toFixed(2)}}</div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div @touchmove.prevent v-show="closeMaskStaue" class="lottery-close-mask" ref="lottery-close-mask">
                </div>
                <vp-lu-zhu ref="luZhuWrap" v-on:select-say="showBallSel" :childNeedMess="childNeedMess"></vp-lu-zhu>
                <div class="lottery-gasket" v-show="total.num&&total.num>0"></div>
              </div>
              <div v-if="sideSelect=='三不同'" class="wrap">
                <div class="list" :key=outIndex v-for="(outItem,outIndex) in showList.list">
                  <div class="lottery-title">{{outItem.small}}</div>
                  <div v-if="outItem.small=='三不同'" class="dianShuTitle">
                    从1-6中任选3个或多个号码,所选号码与开奖号码的3个号码相同, 即为中奖
                  </div>
                  <div v-if="outItem.small=='三连通选'" class="dianShuTitle">
                    对所有的3个相连号码(123、234、345、456)进行投注，任意号码开出，即为中奖
                  </div>

                  <ul :class="{'sLTongXuan':outItem.small=='三连通选'}" class="lottery-ul-sanBuTong ">
                    <li :class="{'bg-color-active':intItem.state}" @click="addActiveFc(intItem)" class="lottery-li-sanBuTong"
                        :key=intIndex v-for="(intItem,intIndex) in outItem.code">
                      <div :class="{'bg-color-active':intItem.state}" class="ball">
                        <div>
                            <span :key=ballIndex v-for="(ballItem,ballIndex) in 3" :class="{
                                                            'active1':intItem.code==111,
                                                            'active2':intItem.code==222,
                                                            'active3':intItem.code==333,
                                                            'active4':intItem.code==444,
                                                            'active5':intItem.code==555,
                                                            'active6':intItem.code==666
                                                        }">
                            </span>
                          {{intItem.name}}
                        </div>
                        <div>赔率:{{(+intItem.odds*(1-total.rebate*0.01)).toFixed(2)}}</div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div @touchmove.prevent v-show="closeMaskStaue" class="lottery-close-mask" ref="lottery-close-mask">
                </div>
                <vp-lu-zhu ref="luZhuWrap" v-on:select-say="showBallSel" :childNeedMess="childNeedMess"></vp-lu-zhu>
                <div class="lottery-gasket" v-show="total.num&&total.num>0"></div>
              </div>
            </div>
          </div>
          <cube-popup :style="{position:position }" type="vp-submit" ref="mySumit">
            <transition name="fade">
              <vp-lottery-submit :childNeedMess="childNeedMess" v-if="showSubmit" v-on:hidePopup="hidePopup"
                                 v-on:allSubmit="allSubmit" :submitList="submitList" :total="total"></vp-lottery-submit>
            </transition>
          </cube-popup>
          <transition name="fade">
            <vp-lottery-sec-money
              v-show="total.num&&total.num>0"
              v-on:sec-money-say="reset" v-on:showPopup="showPopup" v-on:calculate="calculate" :total=total
              ref="selMoney"></vp-lottery-sec-money>
          </transition>
          <span @touchmove.prevent v-show="closeMaskStaue" class="closeFix">已封盘</span>
        </div>
      </transition>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import UserService from '@/service/public/UserService.js'
  import childIndex from '../../public'

  export default {
    mixins: [childIndex],
    data () {
      return {}
    },
    methods: {
      //导航向上传的参数
      getListData (datas) {
        //如果已经有了，就不要进行下一步
        if (this.sideSelect == datas) return false
        //滚动顶部
        this.$refs['lottery-cont'].scrollTop = 0
        //记录当前选中，样式用
        this.sideSelect = datas
        //切换还原所有
        this.reset()
        //重新渲染list（并拆分特殊的第一到第n球的大小单双）
        this.side.list.forEach((outItem, _v1) => {
          if (outItem.big == datas) {
            this.showList.list = outItem.items
            if (datas == '快捷') {
              if (this.showList.list.length == 3) return false
              this.showList.list.unshift({
                small: '球号',
                code: [
                  {name: '第一球', code: '第一球', id: '球号1', odds: '', playway: '', state: false},
                  {name: '第二球', code: '第二球', id: '球号2', odds: '', playway: '', state: false},
                  {name: '第三球', code: '第三球', id: '球号3', odds: '', playway: '', state: false},
                  {name: '第四球', code: '第四球', id: '球号4', odds: '', playway: '', state: false},
                  {name: '第五球', code: '第五球', id: '球号5', odds: '', playway: '', state: false}
                ]
              })
            }
            if (datas.includes('球')) {
              this.showList.list.forEach((listItem1, vi_1) => {
                let save = listItem1.code.splice(10, listItem1.code.length)
                //只分两行
                if (save.length) {
                  this.showList.list.push({small: '拆分', code: save})
                }
              })
            }
          }
        })
        // console.log(this.showList.list)
      },
      initHtml () {
        this.$nextTick(() => {
          UserService.vpInitHtml.call(this, 'init', 'k3')
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../../../assets/less/public/var.less";

  .container {
    height: 100%;
    .ball-ul {
      position: fixed;
      top: 200px;
      left: 0;
      width: 750px;
      bottom: 0;
      right: 0;
      overflow: auto;
      .ball-li {
        width: 200%;
      }
    }
    .betArea-decial-box {
      position: relative;
      min-width: 100%;
      .lottery-cont {
        // position: fixed;
        // width: 100%;
        // height: 100%;
        // top: 3.95rem;
        // position: absolute;
        width: 100%;
        height: 100%;
        // top: 0;
        .wrap {
          width: 100%;
          .list {
            .dianShuTitle {
              width: 100%;
              color: #999999;
              font-size: 0.26rem;
              text-align: center;
              line-height: 0.36rem;
              padding: .2rem;
            }
            .lottery-ul-dianShu {
              padding: 0 .2rem .2rem .2rem;
              zoom: 1;
              overflow: hidden;
              .lottery-li-dianShu {
                float: left;
                width: 25%;
                border-left: 1px solid @main-lottery-border-color;
                border-top: 1px solid @main-lottery-border-color;
                .ball {
                  // line-height: .55rem;
                  text-align: center;
                  div {
                    padding-top: .17rem;
                    &:first-child {
                      color: #444;
                      font-size: .38rem;
                    }
                    &:last-child {
                      color: #999;
                      font-size: .24rem;
                      padding-bottom: .17rem;
                    }
                  }
                }
                &:nth-child(4n) {
                  border-right: 1px solid @main-lottery-border-color;
                }
                &:nth-child(n+17) {
                  border-bottom: 1px solid @main-lottery-border-color;
                  div {
                    &:first-child {
                      color: #444;
                      font-size: .36rem;
                    }
                  }
                }
                &.active {
                  background: @main-color;
                  .ball {
                    div {
                      color: #fff;
                    }
                  }
                }
              }
            }
            .lottery-ul-sanTong {
              padding: 0 .2rem .2rem .2rem;
              zoom: 1;
              overflow: hidden;
              .lottery-li-sanTong {
                height: 1.14rem;
                float: left;
                width: 33.33%;
                border-left: 1px solid @main-lottery-border-color;
                border-top: 1px solid @main-lottery-border-color;
                .ball {
                  // line-height: .55rem;
                  text-align: center;
                  div {
                    padding-top: .17rem;
                    &:first-child {
                      color: #444;
                      font-size: .38rem;
                    }
                    &:last-child {
                      color: #999;
                      font-size: .24rem;
                      padding-bottom: .17rem;
                    }
                  }
                }
                &:nth-child(3n) {
                  border-right: 1px solid @main-lottery-border-color;
                }
                &:nth-child(n+4) {
                  border-bottom: 1px solid @main-lottery-border-color;
                }
                &.active {
                  background: @main-color;
                  .ball {
                    div {
                      color: #fff;
                    }
                  }
                }
              }
              &.sTTongXuan {
                display: flex;
                justify-content: center;
                .lottery-li-sanTong {
                  height: 1.14rem;
                  border-right: 1px solid rgba(241, 241, 241, 0.6);
                  border-bottom: 1px solid rgba(241, 241, 241, 0.6);
                }
              }
              &.erBuTong {
                .lottery-li-sanTong {
                  height: 1.14rem;
                  &:nth-child(n+4) {
                    border-bottom: 0;
                  }
                  &:nth-child(n+13) {
                    border-bottom: 1px solid @main-lottery-border-color;
                  }
                }
              }
            }
            .lottery-ul-sanBuTong {
              padding: 0 .2rem .2rem .2rem;
              zoom: 1;
              overflow: hidden;
              .lottery-li-sanBuTong {
                float: left;
                width: 33.33%;
                border-left: 1px solid @main-lottery-border-color;
                border-top: 1px solid @main-lottery-border-color;
                .ball {
                  // line-height: .55rem;
                  text-align: center;
                  div {
                    padding-top: .17rem;
                    &:first-child {
                      color: #444;
                      font-size: .38rem;
                    }
                    &:last-child {
                      color: #999;
                      font-size: .24rem;
                      padding-bottom: .17rem;
                    }
                  }
                }
                &:nth-child(3n) {
                  border-right: 1px solid @main-lottery-border-color;
                }
                &:nth-child(n+16) {
                  width: 50%;
                }
                &:nth-child(18) {
                  border-right: 0;
                }
                &:nth-child(17), &:nth-child(19) {
                  border-right: 1px solid @main-lottery-border-color;
                }
                &:nth-child(18), &:nth-child(19) {
                  border-bottom: 1px solid @main-lottery-border-color;
                }
                &.active {
                  background: @main-color;
                  .ball {
                    div {
                      color: #fff;
                    }
                  }
                }
              }
              &.sLTongXuan {
                display: flex;
                justify-content: center;
                .lottery-li-sanBuTong {
                  border-right: 1px solid rgba(241, 241, 241, 0.6);
                  border-bottom: 1px solid rgba(241, 241, 241, 0.6);
                }
              }
            }

            .erTong {
              .lottery-item {
                .ball {
                  width: 1.5rem;
                }
              }
            }
            &:last-child {
              .lottery-ul {
                border-bottom: 0;
              }
            }
          }
        }
      }
    }
  }
</style>
