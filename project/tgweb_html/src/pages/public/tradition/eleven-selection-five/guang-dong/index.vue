<template>
  <div class="container" ref="container" :class="{'active':ifShowNav}">
    <vp-lot-header v-on:menu-animate-say="menuAnimate" :title="childNeedMess.title"></vp-lot-header>
    <div class="all-container-wrap">
      <transition name="fade">
        <div class="all-container-betArea">
          <vp-lottery-result ref="lotHeaderWrap" v-on:close-say='closeLoy'
                             :childNeedMess='childNeedMess'></vp-lottery-result>
          <vp-nav :sideReady='sideReady' :childNeedMess='childNeedMess' :side='side'
                  v-on:child-say="getListData"></vp-nav>
          <div class="betArea-decial-box">
            <div class="lottery-cont" ref="lottery-cont">
              <!-- <cube-scroll :data="showList.list" ref="scroll" @scroll="scroll" :scroll-events="scrollEvents"> -->
              <div class="wrap">
                <div class="list" :key=outIndex v-for="(outItem,outIndex) in showList.list">
                  <div class="lottery-title">{{outItem.small?outItem.small=='拆分'?'两面':outItem.small:sideSelect}}</div>
                  <ul class="lottery-ul">
                    <li :class="{
                                            'fourSquare':sideSelect=='两面盘'||
                                            sideSelect=='前中后'||
                                            sideSelect=='斗牛'||
                                            sideSelect=='梭哈'||
                                            outItem.small=='拆分'||
                                            outItem.small=='玩法',
                                            'kuaijie':outItem.small=='球号'
                                        }" @click="addActiveFc(intItem)" class="lottery-item" :key=intIndex
                        v-for="(intItem,intIndex) in outItem.code">
                      <div :class="{'active':intItem.state}" class="ball">{{intItem.name}}</div>
                      <div :class="{'active':intItem.state}" v-if="sideSelect!='快捷'" class="odd">
                        {{(+intItem.odds*(1-total.rebate*0.01)).toFixed(2)}}
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

<script>
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
            // console.log(this.showList.list)
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
                //   let save=listItem1.code.splice(10,listItem1.code.length);
                //   //只分两行
                //   if(save.length){
                //       this.showList.list.push({'small':'拆分',code:save})
                //   }
              })
            }
            // console.log(this.showList.list)
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../../assets/less/public/var.less";

  .container {
    height: 100%;
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
