<template>
  <div class="container" ref="container" :class="{'active':ifShowNav}">
    <vp-lot-header v-on:menu-animate-say="menuAnimate" :title="childNeedMess.title"></vp-lot-header>
    <div class="all-container-wrap">
      <transition name="fade">
        <div class="all-container-betArea">
          <vp-lottery-result ref="lotHeaderWrap" v-on:close-say='closeLoy'
                             :childNeedMess='childNeedMess'></vp-lottery-result>
          <vp-nav class="fuCaiNav" :childNeedMess='childNeedMess' :sideReady='sideReady' :side='side'
                  v-on:child-say="getListData"></vp-nav>
          <div class="betArea-decial-box">
            <div class="lottery-cont" ref="lottery-cont">
              <div class="wrap" v-if="sideSelect=='二字定位'">
                <div class="list-tap">
                  <div @click="teMolFc('er','佰拾定位')" :class="{'active':active.erMol=='佰拾定位'}">佰拾定位</div>
                  <div @click="teMolFc('er','佰个定位')" :class="{'active':active.erMol=='佰个定位'}">佰个定位</div>
                  <div @click="teMolFc('er','拾个定位')" :class="{'active':active.erMol=='拾个定位'}">拾个定位</div>
                </div>
                <div v-if="active.erMol==outItem.small" class="list" :key=outIndex
                     v-for="(outItem,outIndex) in showList.list">
                  <div class="lottery-title">
                    {{outIndex==0||outIndex==1||outIndex==2?outItem.small.substring(0,1):outItem.small.substring(1,2)}}
                  </div>
                  <ul class="lottery-ul">
                    <li :class="{
                                            'lianMianPan':sideSelect=='主盘势',
                                            'erZiHeShu':sideSelect=='二字和数'||sideSelect=='三字和数',
                                        }" @click="addActiveFc(intItem)" class="lottery-item" :key=intIndex
                        v-for="(intItem,intIndex) in outItem.code">
                      <div :class="{'active':intItem.state}" class="ball">{{intItem.name}}</div>
                      <div :class="{'active':intItem.state}" class="odd">
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
              <div class="wrap" v-if="sideSelect=='三字定位'">
                <div v-if="active.erMol==outItem.small" class="list" :key=outIndex
                     v-for="(outItem,outIndex) in showList.list">
                  <div class="lottery-title">{{outItem.title}}</div>
                  <ul class="lottery-ul">
                    <li :class="{
                                            'lianMianPan':sideSelect=='主盘势',
                                            'erZiHeShu':sideSelect=='二字和数'||sideSelect=='三字和数',
                                        }" @click="addActiveFc(intItem)" class="lottery-item" :key=intIndex
                        v-for="(intItem,intIndex) in outItem.code">
                      <div :class="{'active':intItem.state}" class="ball">{{intItem.name}}</div>
                      <div :class="{'active':intItem.state}" class="odd">
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
              <div class="wrap" v-if="sideSelect!='二字定位'&&sideSelect!='三字定位'">
                <div class="list" :key=outIndex v-for="(outItem,outIndex) in showList.list">
                  <div class="lottery-title">{{outItem.small?outItem.small=='拆分'?'两面':outItem.small:sideSelect}}</div>
                  <ul class="lottery-ul">
                    <li :class="{
                                            'lianMianPan':sideSelect=='主盘势',
                                            'lianMianPanF':outItem.small=='拆分'||
                                            outItem.small=='总和，龙虎'||
                                            outItem.small=='两面 佰'||
                                            outItem.small=='两面 拾'||
                                            outItem.small=='两面 个',
                                            'fiveSquare':outItem.small=='3连',
                                            'erZiHeShu':sideSelect=='二字和数'||sideSelect=='三字和数',
                                            'yiDaoSan':sideSelect=='1~3球',
                                            'overFourWorld':sideSelect=='整合'
                                        }" @click="addActiveFc(intItem)" class="lottery-item" :key=intIndex
                        v-for="(intItem,intIndex) in outItem.code">
                      <div :class="{'active':intItem.state}" class="ball">
                        {{sideSelect=='三字组合'?intItem.code:intItem.name}}
                      </div>
                      <div :class="{'active':intItem.state}" class="odd">
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
              v-on:sec-money-say="reset"
              v-on:showPopup="showPopup"
              v-on:calculate="calculate"
              :total=total ref="selMoney">
            </vp-lottery-sec-money>
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
        active: {
          erMol: '佰拾定位'
        },
        erZiDingWei: {
          list: [],
          numT: 0,
          numB: 0
        },
        sanZiDingWei: {
          list: [],
          numT: 0,
          numC: 0,
          numB: 0
        },
        interval: null
      }
    },
    methods: {
      //特AB选择
      teMolFc (str, datas) {
        this.active[`${str}Mol`] = datas
        this.reset()
      },
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

            if (datas == '二字定位') {
              this.showList.list.forEach((listItem1, vi_1) => {
                let save = listItem1.code.splice(10, listItem1.code.length)
                save.small = listItem1.small.substring(0, 1)
                //只分两行
                if (save.length) {
                  this.showList.list.push({
                    small: listItem1.small,
                    code: save,
                    tag: '下'
                  })
                }
              })
            }

            if (datas == '三字定位') {
              this.showList.list.forEach((listItem1, vi_1) => {
                let save = listItem1.code.splice(10, listItem1.code.length)
                save.small = listItem1.small.substring(0, 1)
                let save2 = save.splice(10, listItem1.code.length)
                save2.small = listItem1.small.substring(0, 1)
                //只分两行
                if (save.length) {
                  listItem1.title = '佰'
                  this.showList.list.push({
                    small: listItem1.small,
                    code: save,
                    title: '拾',
                    tag: 'center'
                  })
                }
                if (save2.length) {
                  this.showList.list.push({
                    small: listItem1.small,
                    code: save2,
                    title: '个',
                    tag: 'bottom'
                  })
                }
              })
            }

            if (datas.includes('球') && datas != '1~3球') {
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
      },
      //计算总数
      calculate () {
        let num = 0
        let erZiDingWei = {
          list: [],
          numT: 0,
          numB: 0
        }
        let sanZiDingWei = {
          list: [],
          numT: 0,
          numC: 0,
          numB: 0
        }
        this.showList.list.forEach(outItem => {
          outItem.code.forEach(intItem => {
            if (intItem.state) {
              if (this.sideSelect == '二字定位') {
                erZiDingWei.list.push(intItem)
                if (outItem.tag) {
                  erZiDingWei.numB = erZiDingWei.numB + 1
                  if (erZiDingWei.numB > 1) {
                    this.$newToast('上下只能选一个')
                    intItem.state = false
                  }
                } else {
                  erZiDingWei.numT = erZiDingWei.numT + 1
                  if (erZiDingWei.numT > 1) {
                    this.$newToast('上下只能选一个')
                    intItem.state = false
                  }
                }

                if (erZiDingWei.numT > 0 && erZiDingWei.numB > 0) {
                  num = 1
                }
              } else if (this.sideSelect == '三字定位') {
                sanZiDingWei.list.push(intItem)
                if (outItem.tag == 'center') {
                  sanZiDingWei.numC = sanZiDingWei.numC + 1
                  if (sanZiDingWei.numC > 1) {
                    this.$newToast('上下只能选一个')
                    intItem.state = false
                  }
                } else if (outItem.tag == 'bottom') {
                  sanZiDingWei.numB = sanZiDingWei.numB + 1
                  if (sanZiDingWei.numB > 1) {
                    this.$newToast('上下只能选一个')
                    intItem.state = false
                  }
                } else {
                  sanZiDingWei.numT = sanZiDingWei.numT + 1
                  if (sanZiDingWei.numT > 1) {
                    this.$newToast('上下只能选一个')
                    intItem.state = false
                  }
                }
                if (
                  sanZiDingWei.numT > 0 &&
                  sanZiDingWei.numC > 0 &&
                  sanZiDingWei.numB > 0
                ) {
                  num = 1
                }
              } else {
                num = num + 1
              }
            }
          })
        })
        this.total.num = num
        if (this.total.model.name == '元') {
          this.total.momey =
            +this.total.inputVal * num * this.total.double * this.total.model.db
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
        this.erZiDingWei = erZiDingWei
        this.sanZiDingWei = sanZiDingWei
      },
      // 显示投注框投注逻辑(先计算一遍)
      showPopup () {
        if (!this.isopen) {
          this.$newToast('已封盘')
          return false
        }
        this.calculate()

        // console.log(this.erZiDingWei)
        //整理数据
        this.submitList = []
        if (this.sideSelect == '二字定位') {
          if (
            !this.erZiDingWei.numT ||
            !this.erZiDingWei.numB ||
            !this.erZiDingWei.list.length
          )
            return false
          this.submitList.push({
            code: this.erZiDingWei.list[0].code + this.erZiDingWei.list[1].code,
            odds: this.erZiDingWei.list[0].odds,
            playway: this.erZiDingWei.list[0].playway,
            intTitle: this.active.erMol
          })
        } else if (this.sideSelect == '三字定位') {
          if (
            !this.sanZiDingWei.numT ||
            !this.sanZiDingWei.numC ||
            !this.sanZiDingWei.numB ||
            !this.sanZiDingWei.list.length
          )
            return false
          this.submitList.push({
            code:
              this.sanZiDingWei.list[0].code +
              this.sanZiDingWei.list[1].code +
              this.sanZiDingWei.list[2].code,
            odds: this.sanZiDingWei.list[0].odds,
            playway: this.sanZiDingWei.list[0].playway,
            intTitle: this.sideSelect
          })
        } else {
          this.showList.list.forEach(outItem => {
            outItem.code.forEach(intItem => {
              if (intItem.state) {
                this.submitList.push({
                  code: intItem.code,
                  odds: intItem.odds,
                  playway: intItem.playway,
                  intTitle:
                    outItem.small && outItem.small != '拆分'
                      ? outItem.small
                      : this.sideSelect
                })
              }
            })
          })
        }

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
      // 正式提交（显示可能于提交形式不同）
      async allSubmit () {
        if (!this.isopen) {
          this.$newToast('已封盘')
          return false
        }
        let submitArr = []
        let submitMoney = 0
        if (this.total.model.name == '元') {
          submitMoney =
            this.total.double * this.total.inputVal * this.total.model.db
        } else if (this.total.model.name == '角') {
          submitMoney = (this.total.double *
            this.total.inputVal *
            this.total.model.db
          ).toFixed(1)
        } else if (this.total.model.name == '分') {
          submitMoney = (this.total.double *
            this.total.inputVal *
            this.total.model.db
          ).toFixed(2)
        }
        this.submitList.forEach(item => {
          if (
            (this.sideSelect == '一字组合' && item.intTitle == '两面 佰') ||
            (this.sideSelect == '一字组合' && item.intTitle == '两面 拾') ||
            (this.sideSelect == '一字组合' && item.intTitle == '两面 个')
          ) {
            submitArr.push({
              code: item.code,
              playway: item.playway,
              odds: item.odds,
              money: submitMoney,
              ball: item.intTitle.substring(
                item.intTitle.length - 1,
                item.intTitle.length
              ),
              attach: ''
            })
          } else if (this.sideSelect == '主盘势') {
            let param
            if (item.code.length <= 3) {
              param = item.code
            } else if (item.code.length == 5) {
              param = item.code.substring(0, 2)
            } else if (item.code.length == 6) {
              param = item.code.substring(0, 3)
            }
            submitArr.push({
              code: item.intTitle,
              playway: item.playway,
              odds: item.odds,
              money: submitMoney,
              ball: param,
              attach: ''
            })
          } else if (this.sideSelect == '二字定位') {
            submitArr.push({
              code: item.code,
              playway: item.playway,
              odds: item.odds,
              money: submitMoney,
              ball: this.active.erMol.substring(0, 2),
              attach: ''
            })
          } else if (this.sideSelect == '三字定位') {
            submitArr.push({
              code: item.code,
              playway: item.playway,
              odds: item.odds,
              money: submitMoney,
              ball: '佰拾个',
              attach: ''
            })
          } else {
            submitArr.push({
              code: item.code,
              playway: item.playway,
              odds: item.odds,
              money: submitMoney,
              ball:
                item.intTitle == '第一球'
                  ? '佰'
                  : item.intTitle == '第二球'
                  ? '拾'
                  : item.intTitle == '第三球' ? '个' : item.intTitle,
              attach: ''
            })
          }
        })
        this.pubilcSubmit(submitArr)
      },
      //获取侧边玩法设置
      async getPlaywaySet () {
        let res = await this.$http.get(
          `${this.$HOST_NAME}/lottery/getPlaywaySet/${ this.$route.meta.id}`,
          {}
        )
        if (res && res.code == 200) {
          res.data.forEach(outItem => {
            if (outItem.big == '三字组合') {
              let save = outItem.items[0].code
              let allDatas = []
              for (let i = 0; i <= 999; i++) {
                let code = '000'
                if (i < 10) {
                  code = '00' + i
                } else if (i < 100 && i >= 10) {
                  code = '0' + i
                } else {
                  code = i
                }
                allDatas.push({
                  code: code.toString(),
                  odds: '',
                  playway: '',
                  state: false
                })
              }
              outItem.items[0].code = allDatas

              //   console.log(save)
              outItem.items[0].code.forEach(itemList => {
                if (
                  itemList.code.substring(0, 1) ==
                  itemList.code.substring(1, 2) &&
                  itemList.code.substring(0, 1) == itemList.code.substring(2, 3)
                ) {
                  save.forEach(saveI => {
                    if (saveI.code == 'XXX') {
                      itemList.odds = saveI.odds
                      itemList.playway = saveI.playway
                    }
                  })
                } else if (
                  itemList.code.substring(0, 1) !=
                  itemList.code.substring(1, 2) &&
                  itemList.code.substring(1, 2) !=
                  itemList.code.substring(2, 3) &&
                  itemList.code.substring(0, 1) != itemList.code.substring(2, 3)
                ) {
                  save.forEach(saveI => {
                    if (saveI.code == 'XOY') {
                      itemList.odds = saveI.odds
                      itemList.playway = saveI.playway
                    }
                  })
                } else {
                  save.forEach(saveI => {
                    if (saveI.code == 'XXO') {
                      itemList.odds = saveI.odds
                      itemList.playway = saveI.playway
                    }
                  })
                }
                //   console.log(itemList.code.substring(0,1))
              })
            } else if (outItem.big == '主盘势') {
              outItem.items.forEach(intItem => {
                intItem.code.forEach((thirItem, _v3) => {
                  thirItem.id = intItem.small + _v3
                  thirItem.state = false
                })
                if (intItem.small == '大' || intItem.small == '小') {
                  intItem.code[0].name = '佰'
                  intItem.code[1].name = '拾'
                  intItem.code[2].name = '个'
                  intItem.code[3].name = '佰拾和尾数'
                  intItem.code[4].name = '佰个和尾数'
                  intItem.code[5].name = '拾个和尾数'
                  intItem.code[6].name = '佰拾个和数'
                  intItem.code[7].name = '佰拾个和尾数'

                  intItem.code[0].code = '佰'
                  intItem.code[1].code = '拾'
                  intItem.code[2].code = '个'
                  intItem.code[3].code = '佰拾和尾数'
                  intItem.code[4].code = '佰个和尾数'
                  intItem.code[5].code = '拾个和尾数'
                  intItem.code[6].code = '佰拾个和数'
                  intItem.code[7].code = '佰拾个和尾数'
                } else if (intItem.small == '单' || intItem.small == '双') {
                  intItem.code[0].name = '佰'
                  intItem.code[1].name = '拾'
                  intItem.code[2].name = '个'
                  intItem.code[3].name = '佰拾'
                  intItem.code[4].name = '佰个'
                  intItem.code[5].name = '拾个'
                  intItem.code[6].name = '佰拾个'

                  intItem.code[0].code = '佰'
                  intItem.code[1].code = '拾'
                  intItem.code[2].code = '个'
                  intItem.code[3].code = '佰拾'
                  intItem.code[4].code = '佰个'
                  intItem.code[5].code = '拾个'
                  intItem.code[6].code = '佰拾个'
                } else if (intItem.small == '质' || intItem.small == '合') {
                  intItem.code[0].name = '佰'
                  intItem.code[1].name = '拾'
                  intItem.code[2].name = '个'
                  intItem.code[3].name = '佰拾和尾数'
                  intItem.code[4].name = '佰个和尾数'
                  intItem.code[5].name = '拾个和尾数'
                  intItem.code[6].name = '佰拾个和尾数'

                  intItem.code[0].code = '佰'
                  intItem.code[1].code = '拾'
                  intItem.code[2].code = '个'
                  intItem.code[3].code = '佰拾和尾数'
                  intItem.code[4].code = '佰个和尾数'
                  intItem.code[5].code = '拾个和尾数'
                  intItem.code[6].code = '佰拾个和尾数'
                }
                // console.log(intItem.small)
                // intItem.code.forEach((thirItem,_v3)=>{
                //     thirItem.id=intItem.small+_v3;
                //     thirItem.state=false;
                // })
              })
            } else {
              outItem.items.forEach(intItem => {
                intItem.code.forEach((thirItem, _v3) => {
                  thirItem.id = intItem.small + _v3
                  thirItem.state = false
                })
              })
            }
          })
          //   console.log(res.data);
          this.side.list = res.data
          this.sideReady = true
        } else {

        }
      },
      initHtml () {
        this.$nextTick(() => {
          UserService.vpInitHtml.call(this, 'init', '3d')
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
        // position: absolute;
        width: 100%;
        height: 100%;
        // top: 0;
        .wrap {
          width: 100%;
          .list {
            .lottery-ul {
              .lottery-item {
                &.yiDaoSan {
                  &:nth-child(n + 11) {
                    width: 25%;
                    min-width: 25%;
                    max-width: 25%;
                    div.ball {
                      width: 1.2rem;
                      height: 0.76rem;
                      line-height: 0.76rem;
                      border-radius: 0.1rem;
                    }
                  }
                }
              }
              .lianMianPan {
                width: 50%;
                min-width: 50%;
                max-width: 50%;
                .ball {
                  width: 2.2rem;
                  height: 0.76rem;
                  line-height: 0.76rem;
                  border-radius: 0.1rem;
                }
              }
              .lianMianPanF {
                width: 25%;
                min-width: 25%;
                max-width: 25%;
                .ball {
                  width: 1.2rem;
                  height: 0.76rem;
                  line-height: 0.76rem;
                  border-radius: 0.1rem;
                }
              }
              .erZiHeShu {
                &.lottery-item {
                  width: 25%;
                  min-width: 25%;
                  max-width: 25%;
                  .ball {
                    width: 1rem;
                    height: 1rem;
                    line-height: 1rem;
                  }
                }
              }
            }
            &:first-child {
              .lottery-ul {
                .overFourWorld {
                  &:nth-child(1), &:nth-child(2), &:nth-child(3), &:nth-child(4) {
                    .ball {
                      width: 1.45rem;
                    }
                  }

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
