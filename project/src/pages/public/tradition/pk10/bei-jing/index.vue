<template>
    <div class="container" ref="container" :class="{'active':ifShowNav}">
        <vp-lot-header v-on:menu-animate-say="menuAnimate" :title="childNeedMess.title"></vp-lot-header>
        <div class="all-container-wrap">
            <transition name="fade">
                <div class="all-container-betArea">
                    <vp-lottery-result ref="lotHeaderWrap" v-on:close-say='closeLoy' :childNeedMess='childNeedMess'></vp-lottery-result>
                    <vp-nav :sideReady='sideReady' :childNeedMess='childNeedMess' :side='side' v-on:child-say="getListData"></vp-nav>
                    <div class="betArea-decial-box">
                        <div class="lottery-cont" ref="lottery-cont">
                          <div class="wrap">
                            <div class="list" :key=outIndex v-for="(outItem,outIndex) in showList.list">
                                <div class="lottery-title">{{outItem.small?outItem.small=='拆分'?'两面':outItem.small:sideSelect}}</div>
                                <ul class="lottery-ul">
                                    <li :class="{
                                    'fourSquare':
                                    sideSelect=='两面盘'|| 
                                    outItem.small=='玩法'||
                                    sideSelect=='前中后'||
                                    sideSelect=='冠亚和'||
                                    outItem.small=='拆分',
                                    'kuaijie':outItem.small=='球号',
                                    'yiDaoWu':sideSelect=='1~10名',
                                    'liangMianPan':sideSelect=='两面盘',                                             
                                }" @click="addActiveFc(intItem)" class="lottery-item" :key=intIndex v-for="(intItem,intIndex) in outItem.code">
                                        <div :class="{'active':intItem.state}" class="ball" v-show="!intItem.show?true:!intItem.show">{{intItem.name}}</div>
                                        <div :class="{'active':intItem.state}" v-if="intItem.odds" class="odd">
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
                        <cube-popup :style="{position:position }"  type="vp-submit" ref="mySumit">
                            <transition name="fade">
                                <vp-lottery-submit :childNeedMess="childNeedMess" v-if="showSubmit" v-on:hidePopup="hidePopup" v-on:allSubmit="allSubmit" :submitList="submitList" :total="total"></vp-lottery-submit>
                            </transition>
                        </cube-popup>                    
                        <transition name="fade">
                            <vp-lottery-sec-money 
                            v-show="total.num&&total.num>0"
                            v-on:sec-money-say="reset" v-on:showPopup="showPopup" v-on:calculate="calculate" :total=total ref="selMoney"></vp-lottery-sec-money>
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
  data() {
    return {
    };
  },
  methods: {
    //导航向上传的参数
    getListData(datas) {
      //如果已经有了，就不要进行下一步
      if (this.sideSelect == datas) return false;
      //滚动顶部
      this.$refs['lottery-cont'].scrollTop=0;
      //记录当前选中，样式用
      this.sideSelect = datas;
      //切换还原所有
      this.reset();
      //重新渲染list（并拆分特殊的第一到第n球的大小单双）
      this.side.list.forEach((outItem, _v1) => {
        if (outItem.big == datas) {
          this.showList.list = outItem.items;
          // console.log(this.showList.list)
          if (datas == "快捷") {
            if (this.showList.list.length == 3) return false;
            this.showList.list.unshift({
              small: "球号",
              code: [
                { name:"冠军", code: "冠军", id: "球号1", odds: "", playway: "", state: false },
                { name:"亚军",code: "亚军", id: "球号2", odds: "", playway: "", state: false },
                { name:"第三名",code: "第三名", id: "球号3", odds: "", playway: "", state: false },
                { name:"第四名",code: "第四名", id: "球号4", odds: "", playway: "", state: false },
                { name:"第五名",code: "第五名", id: "球号5", odds: "", playway: "", state: false },
                { name:"第六名",code: "第六名", id: "球号5", odds: "", playway: "", state: false },
                { name:"第七名",code: "第七名", id: "球号5", odds: "", playway: "", state: false },
                { name:"第八名",code: "第八名", id: "球号5", odds: "", playway: "", state: false },
                { name:"第九名",code: "第九名", id: "球号5", odds: "", playway: "", state: false },
                { name:"第十名",code: "第十名", id: "球号5", odds: "", playway: "", state: false }
              ]
            });
            // this.showList.list[3] = {
            //   small: "球号",
            //   code: [
            //     { name:"第六名",code: "第六名", id: "球号5", odds: "", playway: "", state: false },
            //     { name:"第七名",code: "第七名", id: "球号5", odds: "", playway: "", state: false },
            //     { name:"第八名",code: "第八名", id: "球号5", odds: "", playway: "", state: false },
            //     { name:"第九名",code: "第九名", id: "球号5", odds: "", playway: "", state: false },
            //     { name:"第十名",code: "第十名", id: "球号5", odds: "", playway: "", state: false }
            //   ]
            // }
            // this.showList.list[4]={...this.showList.list[1]};
            // let code = [...this.showList.list[1].code]
            // this.showList.list[4].code = [...code];
            // this.showList.list[4].code[0].flag="111111";
            // console.log(this.showList.list[4]);
            // console.log(">>>>>>>>>>>>>>>>")
            // console.log(this.showList.list[1]);
            // let temp = {...this.showList.list[2]};
            // temp.code =[...this.showList.list[2].code];
            // temp.code.forEach((item,index)=>{//6-10名没有龙虎，干掉
            //   if(item.name == "龙"){
            //     temp.code.splice(index,1);
            //     return false;
            //   }
            // })
            // temp.code.forEach((item,index)=>{//6-10名没有龙虎，干掉
            //   if(item.name == "虎"){
            //     temp.code.splice(index,1);
            //     return false;
            //   }
            // })
            // this.showList.list[5] = {...temp};
          }
          if (
            (datas.includes("名") && datas != "1~10名") ||
            (datas.includes("冠军") && datas != "1~10名") ||
            (datas.includes("亚军") && datas != "1~10名")
          ) {
            this.showList.list.forEach((listItem1, vi_1) => {
              let save = listItem1.code.splice(10, listItem1.code.length);
              //只分两行
              if (save.length) {
                this.showList.list.push({ small: "拆分", code: save });
              }
            });
          }
          // console.log(this.showList.list)
        }
      });
    },
    // 正式提交（显示可能于提交形式不同）
    async allSubmit() {
      if (!this.isopen) {
        this.$newToast("已封盘");
        return false;
      }
      let submitArr = [];
      let submitMoney = 0;
      if (this.total.model.name == "元") {
        submitMoney =
          this.total.double * this.total.inputVal * this.total.model.db;
      } else if (this.total.model.name == "角") {
        submitMoney = (this.total.double *
          this.total.inputVal *
          this.total.model.db
        ).toFixed(1);
      } else if (this.total.model.name == "分") {
        submitMoney = (this.total.double *
          this.total.inputVal *
          this.total.model.db
        ).toFixed(2);
      }
      this.submitList.forEach(item => {
        if (item.code == "龙" || item.code == "虎") {
          if (item.intTitle == "第一名"||item.intTitle == "冠军") {
            submitArr.push({
              code: item.code,
              playway: item.playway,
              odds: item.odds,
              money: submitMoney,
              ball: "1V10",
              attach: ""
            });
          } else if (item.intTitle == "第二名"||item.intTitle == "亚军") {
            submitArr.push({
              code: item.code,
              playway: item.playway,
              odds: item.odds,
              money: submitMoney,
              ball: "2V9",
              attach: ""
            });
          } else if (item.intTitle == "第三名") {
            submitArr.push({
              code: item.code,
              playway: item.playway,
              odds: item.odds,
              money: submitMoney,
              ball: "3V8",
              attach: ""
            });
          } else if (item.intTitle == "第四名") {
            submitArr.push({
              code: item.code,
              playway: item.playway,
              odds: item.odds,
              money: submitMoney,
              ball: "4V7",
              attach: ""
            });
          } else if (item.intTitle == "第五名") {
            submitArr.push({
              code: item.code,
              playway: item.playway,
              odds: item.odds,
              money: submitMoney,
              ball: "5V6",
              attach: ""
            });
          } else if (item.intTitle == "第六名") {
            submitArr.push({
              code: item.code,
              playway: item.playway,
              odds: item.odds,
              money: submitMoney,
              ball: "5V6",
              attach: ""
            });
          } else if (item.intTitle == "第七名") {
            submitArr.push({
              code: item.code,
              playway: item.playway,
              odds: item.odds,
              money: submitMoney,
              ball: "4V7",
              attach: ""
            });
          } else if (item.intTitle == "第八名") {
            submitArr.push({
              code: item.code,
              playway: item.playway,
              odds: item.odds,
              money: submitMoney,
              ball: "3V8",
              attach: ""
            });
          } else if (item.intTitle == "第九名") {
            submitArr.push({
              code: item.code,
              playway: item.playway,
              odds: item.odds,
              money: submitMoney,
              ball: "2V9",
              attach: ""
            });
          } else if (item.intTitle == "第十名") {
            submitArr.push({
              code: item.code,
              playway: item.playway,
              odds: item.odds,
              money: submitMoney,
              ball: "1V10",
              attach: ""
            });
          }
        } else {
          submitArr.push({
            code: item.code,
            playway: item.playway,
            odds: item.odds,
            money: submitMoney,
            ball: item.intTitle=='冠军'?'第一名':item.intTitle=='亚军'?'第二名':item.intTitle,
            attach: ""
          });
        }
      });
      this.pubilcSubmit(submitArr);
    }
  }
};
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
          .lottery-ul {
            .lottery-item {
              &.yiDaoWu {
                &:nth-child(n + 11) {
                  width: 25%;
                  min-width: 25%;
                  max-width: 25%;
                  div.ball {
                    width: 1.2rem;
                    height: 0.76rem;
                    border-radius: 0.1rem;
                  }
                }
              }
            }
          }
          .lottery-item {
            .ball {
              width: 1rem;
              border-radius: 0.1rem;
            }
          }
          &:first-child{
            .lottery-ul{
              .liangMianPan{
                .ball{
                  width: 1.45rem;
                }
              }
            }
          }          
        }
      }
    }
  }
}
</style>
