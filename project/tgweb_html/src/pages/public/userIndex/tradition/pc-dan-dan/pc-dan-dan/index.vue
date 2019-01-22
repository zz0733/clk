<template>
  <div class="container" ref="container" :class="{'active':ifShowNav}">
    <vp-lot-header v-on:menu-animate-say="menuAnimate" :title="childNeedMess.title"></vp-lot-header>
    <div class="all-container-wrap">
      <transition name="fade">
        <div class="all-container-betArea">
          <vp-lottery-result ref="lotHeaderWrap" v-on:close-say='closeLoy'
                             :childNeedMess='childNeedMess'></vp-lottery-result>
          <vp-nav class="pcDdZhuShi" :childNeedMess='childNeedMess' :sideReady='sideReady' :side='side'
                  v-on:child-say="getListData"></vp-nav>
          <div class="betArea-decial-box">
            <div class="lottery-cont" ref="lottery-cont">
              <div class="wrap">
                <div class="list" :key=outIndex v-for="(outItem,outIndex) in showList.list">
                  <div class="lottery-title">{{outItem.small=='拆分'?'':outItem.small}}</div>
                  <ul class="lottery-ul">
                    <li :class="{
                                          'fourSquare':
                                          outItem.small=='两面'||
                                          outItem.small=='色波/豹子'||
                                          outItem.small=='拆分'
                                      }" @click="addActiveFc(intItem)" class="lottery-item" :key=intIndex
                        v-for="(intItem,intIndex) in outItem.code">
                      <div :class="{'active':intItem.state,blue:+intItem.code==2&&intItem.state||+intItem.code==5&&intItem.state||+intItem.code==8&&intItem.state||+intItem.code==11&&intItem.state
                    ||+intItem.code==17&&intItem.state||+intItem.code==20&&intItem.state||+intItem.code==23&&intItem.state||+intItem.code==26&&intItem.state
                    ,red:+intItem.code==3&&intItem.state||+intItem.code==6&&intItem.state||+intItem.code==9&&intItem.state||+intItem.code==12&&intItem.state
                    ||+intItem.code==15&&intItem.state||+intItem.code==18&&intItem.state||+intItem.code==21&&intItem.state||+intItem.code==24&&intItem.state,
                    green:+intItem.code==1&&intItem.state||+intItem.code==4&&intItem.state||+intItem.code==7&&intItem.state||+intItem.code==10&&intItem.state
                    ||+intItem.code==16&&intItem.state||+intItem.code==19&&intItem.state||+intItem.code==22&&intItem.state||+intItem.code==25&&intItem.state,
                    gray:intItem.code=='0'&&intItem.state||+intItem.code==13&&intItem.state||+intItem.code==14&&intItem.state||+intItem.code==27&&intItem.state,nblue:+intItem.code==2||+intItem.code==5||+intItem.code==8||+intItem.code==11||
                    +intItem.code==17||+intItem.code==20|| +intItem.code==23||+intItem.code==26,nred:+intItem.code==3||+intItem.code==6||+intItem.code==9||+intItem.code==12||
                    +intItem.code==15||+intItem.code==18|| +intItem.code==21||+intItem.code==24,ngreen:+intItem.code==1||+intItem.code==4||+intItem.code==7||+intItem.code==10||
                    +intItem.code==16||+intItem.code==19|| +intItem.code==22||+intItem.code==25,ngray:intItem.code=='0'||+intItem.code==13||+intItem.code==14||
                    +intItem.code==27}" class="ball">{{intItem.name}}
                      </div>
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
                                 v-on:allSubmit="allSubmit" :submitList="submitListPrime"
                                 :total="total"></vp-lottery-submit>
            </transition>
          </cube-popup>
          <transition name="fade">
            <vp-lottery-sec-money v-show="total.num&&total.num>0" v-on:sec-money-say="reset" v-on:showPopup="showPopup"
                                  v-on:calculate="calculate" :total=total ref="selMoney"></vp-lottery-sec-money>
          </transition>
          <span @touchmove.prevent v-show="closeMaskStaue" class="closeFix">已封盘</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import UserService from '@/service/public/UserService.js'
  import childIndex from '../../public'

  export default {
    mixins: [childIndex],
    data () {
      return {
        submitListPrime: [],
        submitList: [],
        baoSan: [],
        interval: null
      }
    },
    methods: {
      //导航向上传的参数
      getListData (datas) {
        //滚动顶部
        this.fontSize = +document.querySelector('html').style.fontSize.split('px')[0] / 100
        if (datas == '和值') {
          this.$refs['lottery-cont'].scrollTop = 0
        } else if (datas == '两面') {
          this.$refs['lottery-cont'].scrollTop = 1028 * this.fontSize
        } else if (datas == '色波/豹子') {
          this.$refs['lottery-cont'].scrollTop = 1567 * this.fontSize
        } else if (datas == '特码包三') {
          this.$refs['lottery-cont'].scrollTop = 1808 * this.fontSize
          // this.$refs.scroll.scrollTo(0, -1808 * this.fontSize,500);
        }

        if (this.showList.list.length) {
          return false
        }
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
                code: [{
                  name: '第一球',
                  code: '第一球',
                  id: '球号1',
                  odds: '',
                  playway: '',
                  state: false
                },
                  {
                    name: '第二球',
                    code: '第二球',
                    id: '球号2',
                    odds: '',
                    playway: '',
                    state: false
                  },
                  {
                    name: '第三球',
                    code: '第三球',
                    id: '球号3',
                    odds: '',
                    playway: '',
                    state: false
                  },
                  {
                    name: '第四球',
                    code: '第四球',
                    id: '球号4',
                    odds: '',
                    playway: '',
                    state: false
                  },
                  {
                    name: '第五球',
                    code: '第五球',
                    id: '球号5',
                    odds: '',
                    playway: '',
                    state: false
                  }
                ]
              })
            }
            if (datas.includes('球')) {
              this.showList.list.forEach((listItem1, vi_1) => {
                let save = listItem1.code.splice(10, listItem1.code.length)
                //只分两行
                if (save.length) {
                  this.showList.list.push({
                    small: '拆分',
                    code: save
                  })
                }
              })
            }
            // console.log(this.showList.list)
          }
        })
      },
      //计算总数
      calculate () {
        let num = 0
        let baoSan = []
        this.showList.list.forEach(outItem => {
          outItem.code.forEach(intItem => {
            if (intItem.state) {
              if (outItem.small == '特码包三') {
                baoSan.push(intItem)
                if (baoSan.length == 3) {
                  num = num + 1
                }
              } else {
                num = num + 1
              }
            }
          })
        })
        this.baoSan = baoSan
        this.total.num = num
        if (this.total.model.name == '元') {
          this.total.momey = +this.total.inputVal * num * this.total.double * this.total.model.db
        } else if (this.total.model.name == '角') {
          this.total.momey = (+this.total.inputVal *
            num *
            this.total.double *
            this.total.model.db
          ).toFixed(1)
        } else if (this.total.model.name == '分') {
          this.total.momey = (+this.total.inputVal *
            num *
            this.total.double *
            this.total.model.db
          ).toFixed(2)
        }

        // console.log()
      },
      // 显示投注框投注逻辑(先计算一遍)
      showPopup () {
        if (!this.isopen) {
          this.$newToast('已封盘')
          return false
        }
        this.calculate()
        if (this.baoSan.length == 3 || this.baoSan.length == 0) {} else {
          this.$newToast('特码包三只能选三个号码!')
          return false
        }
        //整理数据
        this.submitList = []
        this.submitListPrime = []
        this.showList.list.forEach(outItem => {
          if (outItem.small == '特码包三') {
            let baoSan = ''
            outItem.code.forEach(intItem => {
              if (intItem.state) {
                this.submitList.push({
                  code: intItem.code,
                  odds: intItem.odds,
                  playway: intItem.playway,
                  intTitle: outItem.small ? outItem.small : this.sideSelect
                })
                baoSan += intItem.code + ','
              }
            })
            // console.log(baoSan)
            if (baoSan.length) {
              this.submitListPrime.push({
                code: baoSan.substring(0, baoSan.length - 1),
                odds: outItem.code[0].odds,
                playway: outItem.code[0].playway,
                intTitle: `包三`
              })
            }
          } else {
            outItem.code.forEach(intItem => {
              if (intItem.state) {
                this.submitListPrime.push({
                  code: intItem.code,
                  odds: intItem.odds,
                  playway: intItem.playway,
                  intTitle: outItem.small ? outItem.small : this.sideSelect
                })
                this.submitList.push({
                  code: intItem.code,
                  odds: intItem.odds,
                  playway: intItem.playway,
                  intTitle: outItem.small ? outItem.small : this.sideSelect
                })
              }
            })
          }

        })
        // console.log(this.submitListPrime)

        if (!this.submitList.length) {
          this.$newToast('请选择投注类型')
          return false
        }

        //显示
        const component = this.$refs['mySumit']
        component.show()
        //滚动bug
        this.showSubmit = true
      },
      //获取侧边玩法设置
      async getPlaywaySet () {
        let res = await this.$http.get(
          `${this.$HOST_NAME}/lottery/getPlaywaySet/${ this.$route.meta.id}`, {}
        )
        if (res && res.code == 200) {
          res.data.forEach(outItem => {
            outItem.items.forEach(intItem => {
              intItem.code.forEach((thirItem, _v3) => {
                thirItem.id = intItem.small + _v3
                thirItem.state = false
              })
              res.data.push({
                big: intItem.small,
                items: []
              })
            })
          })

          res.data.forEach(outItem => {
            outItem.items = res.data[0].items
          })
          res.data.shift()
          this.side.list = res.data
          this.sideReady = true
        } else {

        }
      },
      //重置所有信息
      reset () {
        if (!this.isopen) {
          return false
        }
        this.showList.list.forEach((outItem, _v1) => {
          outItem.code.forEach((intItem, _v2) => {
            intItem.state = false
          })
        })
        this.total.num = 0
        this.total.momey = 0
        this.total.inputVal = ''
        this.baoSan = []
      },
      initHtml () {
        this.$nextTick(() => {
          UserService.vpInitHtml.call(this, 'init', 'pcdd')
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../../../assets/less/public/var.less";

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
            .lottery-ul {
              .ball {
                font-weight: 600;
                &.blue {
                  background: #20a2d8;
                  color: #fff;
                }
                &.red {
                  background: #f36055;
                  color: #fff;
                }
                &.green {
                  background: #54bf37;
                  color: #fff;
                }
                &.gray {
                  background: #666;
                  color: #fff;
                }
              }
              .nblue {
                color: #20a2d8;
                border: 1px solid #20a2d8;
              }
              .nred {
                color: #f36055;
                border: 1px solid #f36055;
              }
              .ngreen {
                color: #54bf37;
                border: 1px solid #54bf37;
              }
              .ngray {
                color: #666;
                border: 1px solid #666;
              }
            }
          }
        }
      }
    }
  }
</style>
