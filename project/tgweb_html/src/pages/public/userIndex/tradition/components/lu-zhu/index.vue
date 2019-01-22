<template>
  <div ref="vp-luzhu-wrap" class="vp-luzhu-wrap">
    <div class="header">
      <div @click="tag(ballList[0].title)"
           :class="{'active':this.selDatas.includes('球')||this.selDatas.includes('名')||this.selDatas.includes('军')}"
           class="select-wrap item">
        <div class="title">
          <span
            :class="{'text-color':this.selDatas.includes('球')||this.selDatas.includes('名')||this.selDatas.includes('军')}">{{ball}}</span>
        </div>
      </div>
      <div @click="tag('两面长龙')" :class="{'text-color':selDatas=='两面长龙'}" class="el item">两面长龙</div>
    </div>
    <div class="cont" v-show="selDatas=='两面长龙'">
      <ul class="zhangLong-ul">
        <li class="zhangLong-li" v-for="(item, index) in list" :key='index'>
          <div>{{Object.entries(item)[0][0]}}</div>
          <div class="text-color">{{Object.entries(item)[0][1]}}期</div>
        </li>
      </ul>
    </div>
    <div class="cont" v-show="this.selDatas.includes('球')||this.selDatas.includes('名')||this.selDatas.includes('军')">
      <div class="nav">
        <van-tabs v-model='vanActive' @click="select" class="hall-container-header luZhuTitle">
          <van-tab v-if="+ball.substring(1,2)>5&&$route.meta.series=='pk10'&&item.title=='龙虎'?0:1" :key="index"
                   v-for="(item,index) in itemList" :title="item.title">
          </van-tab>
        </van-tabs>
      </div>
      <div ref="horizontal-scroll" class="horizontal-scroll-list-wrap">
        <!-- <cube-scroll
        :class="{'visiable':showScroll}"
            :data="datas.lastData"
            ref="scroll"
            direction="horizontal"> -->
        <ul class="list-wrapper" :class="{'visiable':showScroll}">
          <!-- <span  class="showText">{{datas.lastData[0].list[0].ball}}</span>                          -->
          <li :key='outIndex' v-for="(outItem, outIndex) in datas.lastData" class="list-item">
            <div :key='intIndex' v-for="(intItem, intIndex) in outItem.list">
                               <span :class="{
                                   'active':intItem.ball,
                                   'active2':intItem.ball=='龙'||intItem.ball=='大'||intItem.ball=='双',
                                   'green':intItem.ball=='和'
                                }">{{intItem.ball}}</span>
            </div>
          </li>

        </ul>
        <!-- </cube-scroll> -->
      </div>
    </div>
    <!-- <div class="lottery-gasket-liuhe"></div> -->
  </div>
</template>
<script>
  import $ from 'jquery'
  // require('intersection-observer');
  export default {
    props: {
      childNeedMess: {
        type: Object
      }
    },
    data () {
      return {
        showScroll: false,
        luZhu: '路子',
        haveReady: true,
        selDatas: '第一球',
        ball: '第1球',
        list: [],
        col1Data: [],
        ballList: [],//总数据
        itemList: [],//项目数据
        ballStaue: '长龙面',
        vanActive: '0',
        datas: {
          lastData: [], //最终数据
          nowSelect: '',//当前选择哪一个三级导航
          datasTotal: []
        },
        options: {
          threshold: [0]
        }
      }
    },
    methods: {
      // 获取历史记录
      async getData () {
        this.haveReady = false
        let idArr = this.$route.fullPath.split('/')
        let lotteryId = idArr.filter(item => Number.isInteger(item * 1) && item !== '')[0] * 1
        let res = await this.$http.post(`${this.$HOST_NAME}/lottery/results`, {
          lotteryId
          // lottery: this.$route.meta.code,
          // type: this.$route.meta.series
        })
        if (res && res.code == 200) {
          this.list = res.data[`${ this.$route.meta.code}`]['double:']
          res.data[`${ this.$route.meta.code}`].list.forEach((outItem) => {
            outItem.list.forEach((intItem) => {
              intItem.list = intItem.list.reverse()
            })
          })
          this.ballList = res.data[`${ this.$route.meta.code}`].list
          this.selDatas = this.ballList[0].title
          this.ball = this.ballList[0].title
          this.showScroll = true
          this.getSecTab()
          setTimeout(() => {
            $('.horizontal-scroll-list-wrap').animate({scrollLeft: 1500}, 10)
          }, 100)

          setTimeout(() => {
            this.showScroll = false
          }, 200)
        } else {

        }
      },
      // 切换模式
      tag (data) {

        this.selDatas = data
        let nowInder = 0
        if (this.selDatas.includes('球') || this.selDatas.includes('名') || this.selDatas.includes('军')) {
          if (this.ballStaue == '球面') {
            this.col1Data = []
            this.ballList.forEach((item) => {
              this.col1Data.push({text: item.title, value: 'ball'})
            })
            this.col1Data.forEach((item, v1) => {
              if (item.text == this.ball) {
                nowInder = v1
              }
            })
            this.newPicker()
            this.picker.setData([this.col1Data], [nowInder])
            this.picker.show()
          }
          this.ballStaue = '球面'
        } else if (data == '两面长龙') {
          this.ballStaue = '长龙面'
        }
      },
      //新选择框
      newPicker () {
        let $this = this
        this.picker = this.$createPicker({
          title: '',
          data: [$this.col1Data],
          onSelect: (selectedVal, selectedIndex, selectedText) => {
            this.showPickerReturn(selectedVal, selectedIndex, selectedText)
          },
          onCancel: () => {
          }
        })
      },
      //点击选中返回数据
      showPickerReturn (selectedVal, selectedIndex, selectedText) {
        this.ball = selectedText[0]
        this.getSecTab()
        this.vanActive = '0'
      },
      //获取list切换
      getSecTab () {
        this.ballList.forEach((item) => {
          if (this.ball == item.title) {
            this.itemList = item.list
            this.datas.nowSelect = item.list[0].title
          }
        })
        this.lastDataFc()
      },
      //点击二级目录
      select (v, title) {
        this.datas.lastData = []
        this.datas.nowSelect = title
        this.lastDataFc()
        // this.$refs['horizontal-scroll'].scrollLeft=0;
        // $('.horizontal-scroll-list-wrap').animate({scrollLeft: 0}, 0);
        $('.horizontal-scroll-list-wrap').animate({scrollLeft: 2000}, 10)
        // setTimeout(()=>{
        //   $('.horizontal-scroll-list-wrap').animate({scrollLeft: 1500}, 1000);
        // },300);
      },
      // 处理大小方法
      lastDataFc () {
        this.datas.datasTotal = []
        this.datas.lastData = []
        let recieveForWard = []
        let index = 0
        this.itemList.forEach((item) => {
          if (item.title == this.datas.nowSelect) {
            this.datas.datasTotal = item.list
          }
        })
        // return false;
        this.datas.datasTotal.forEach((item, v) => {
          // 通过前后比较得出结果，由于0没有比较直接跳过
          if (v > 0 && this.datas.datasTotal[v].ball != this.datas.datasTotal[v - 1].ball) {
            let forWard = []
            for (let i = index; i < v; i++) {
              forWard.push(this.datas.datasTotal[i])
            }
            //处理球不够6个的情况
            let forWardArr = forWard.length
            if (forWardArr < 8) {
              for (let j = 1; j <= 8 - forWardArr; j++) {
                forWard.push({})
              }
            }
            //  处理完毕传送最后数据
            recieveForWard.push({list: forWard})
            index = v//操作完了再记录
          }
          // 通过前后比较得出结果，由于最后一个没比较，直接取等于
          if (v == this.datas.datasTotal.length - 1) {
            let last = []
            for (let i = index; i <= v; i++) {
              last.push(this.datas.datasTotal[i])
            }
            //处理球不够8个的情况
            let listArr = last.length
            if (listArr < 8) {
              for (let j = 1; j <= 8 - listArr; j++) {
                last.push({})
              }
            }
            //处理龙虎无限重复问题
            if (listArr >= 36) {
              last.splice(0, listArr - 36)
            }
            //  处理完毕传送最后数据
            recieveForWard.push({list: last})
            //  最后处理列数不够18的情况
            let lastDataLength = recieveForWard.length
            if (lastDataLength < 22) {
              for (let j = 1; j <= 22 - lastDataLength; j++) {
                recieveForWard.push({list: [{}, {}, {}, {}, {}, {}, {}, {}]})
              }
            } else if (lastDataLength >= 22) {
              recieveForWard.push({list: [{}, {}, {}, {}, {}, {}, {}, {}]})
              recieveForWard.push({list: [{}, {}, {}, {}, {}, {}, {}, {}]})
            }

            //进一步处理大于8个球的情况，拐弯
            this.handleTurn(recieveForWard)
          }
        })
      },
      //公共处理转弯
      handleTurn (recieveForWard) {
        // this.datas.lastData=recieveForWard;
        // return false;
        let turnArr = []
        let span = -1

        recieveForWard.forEach((item, v) => {
          let spliceArr = []
          // 第一个大于8长度的
          if (item.list.length > 8 && !turnArr.length && span == -1) {
            //获取大于8长度的数值
            spliceArr = item.list.splice(8, item.list.length - 8)
            //添加循环数
            turnArr.push({list: spliceArr, index: v, length: 8})
            //拆分
            item.list.splice(8, item.list.length - 8)
            //前面第几个大于8记录
            span = v
            //前面在前面范围以内的
          } else if (item.list.length > 7 && turnArr.length && span != -1 && item.list[7].name &&
            turnArr[0].list.length + span >= v
          ) {
            //获取大于7长度的数值
            spliceArr = item.list.splice(7, item.list.length - 7)
            //添加循环数
            turnArr.push({list: spliceArr, index: v, length: 7})
            //拆分
            item.list.splice(7, item.list.length - 7)
            //前面第几个大于7记录
            span = v
          } else if (item.list.length > 8 && turnArr.length && span != -1) {
            //获取大于8长度的数值
            spliceArr = item.list.splice(8, item.list.length - 8)
            //添加循环数
            turnArr.push({list: spliceArr, index: v, length: 8})
            //拆分
            item.list.splice(8, item.list.length - 8)
            //前面第几个大于8记录
            span = v
          }
        })

        if (!turnArr.length) {
          this.datas.lastData = recieveForWard
          return false
        } else {
          this.datas.lastData = recieveForWard
        }
        //2.处理拐弯
        turnArr.forEach((item, j) => {
          //留着看
          //被比较的大于8的长度
          if (item.length == 8) {
            for (let k = 0; k < item.list.length; k++) {
              if (!this.datas.lastData[item.index + k + 1]) {
                return false
              }
              this.datas.lastData[item.index + k + 1]['list'][7] = item.list[k]
            }
          } else if (item.length == 7) {
            for (let k = 0; k < item.list.length; k++) {
              if (!this.datas.lastData[item.index + k + 1]) {
                return false
              }
              this.datas.lastData[item.index + k + 1]['list'][6] = item.list[k]
            }
          }
        })
        this.datas.lastData = this.datas.lastData
      },
    },
    watch: {},
    created () {
      // if(!this.datas.lastData.length){
      //   this.getData();
      // }
      this.getData()
    },
    mounted () {
      // v-hide="$route" pk10
      // console.log(this.$route.meta.series)

    },
    destroyed () {
    },
    watch: {
      // childNeedMess:{
      //     handler:function(val,oldVal){
      //         if(this.haveReady){
      //           this.getData();
      //         }
      //     },
      //     deep:true
      // }
    },
  }
  // this.$refs.scroll.refresh();
  // this.$refs.scroll.forceUpdate();
  // this.$refs.scroll.refresh();
</script>

<style lang="less" scoped>
  @import "../../../../../../assets/less/public/var.less";

  .vp-luzhu-wrap {
    width: 100%;
    .header {
      height: .7rem;
      width: 100%;
      border-top: 1px solid @main-lottery-border-color;
      border-bottom: 1px solid @main-lottery-border-color;
      display: flex;
      .item {
        flex: 1;
        font-size: .32rem;
        line-height: .7rem;
        color: #333;
        &.active {
          background: #fff;
          color: @main-brder-color;
        }
      }
      .select-wrap {
        text-align: center;
        display: flex;
        justify-content: space-between;
        .title {
          line-height: .7rem;
          width: 100%;
          span {
            //    display: inline-block;
            &::after {
              content: '';
              display: inline-block;
              width: 0;
              height: 0;
              border-left: .13rem solid transparent;
              border-right: .13rem solid transparent;
              border-top: .19rem solid #B9B4AC;
              margin-left: .1rem;
            }
            &.active {
              &::after {
                border-top: .19rem solid @main-brder-color;
              }
            }
          }
        }

      }
      .el {
        border-left: 1px solid @main-lottery-border-color;
        text-align: center;
      }
    }
    .cont {
      min-height: 4.09rem;
      .zhangLong-ul {
        .zhangLong-li {
          height: .6rem;
          border-bottom: 1px solid @main-lottery-border-color;
          display: flex;
          div {
            flex: 1;
            font-size: .28rem;
            color: #666;
            text-align: center;
            line-height: .6rem;
            &:last-child {
              color: #ff5100;
            }
          }
          &:last-child {
            border-bottom: 0;
          }
        }
      }
      .ball-ul {
        width: 200px;
        overflow: auto;
        .ball-li {
          width: 200%;
        }
      }
      .horizontal-scroll-list-wrap {
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        overflow-x: scroll;
        border-top: 1px solid #eee;
        .visiable {
          visibility: hidden;
        }
      }
    }
    .list-wrapper {
      display: flex;
      padding-left: .02rem;
      .showText {
        position: absolute;
        color: transparent;
      }
      .list-item {
        &:first-child {
          div {
            border-left: 1px solid @main-lottery-border-color;
          }
        }
        div {
          width: .34rem;
          height: .34rem;
          border-right: 1px solid @main-lottery-border-color;
          border-bottom: 1px solid @main-lottery-border-color;
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            display: inline-block;
            width: .31rem;
            height: .31rem;
            border-radius: 50%;
            color: #fff;
            line-height: .31rem;
            font-size: .22rem;
            text-align: center;
            &.active {
              background: #5598FC;
            }
            &.active2 {
              background: #FB162D;
            }
            &.green {
              background: #4caf50;
            }
          }
          &:first-child {
            //   border-top: 1px solid #DDDDDD;
          }
        }
      }
    }
  }
</style>
