<template>
  <div :style="{position:position }" class="betArea-decial-choose-cont">
    <div class="sel-box" v-if="$route.meta.series!='lhc'">
      <div class="left">
        <div>已选
          <span>{{total.num}}</span> 注</div>
        <div>共
          <span>¥ {{total.momey}}</span>
        </div>
      </div>
      <div class="right">
        <div @click="showPickerFc('元')" class="model item">{{total.model.name}}</div>
        <div @click="showPickerFc('赔率')" class="percent item">
          <div>{{total.rebate+"%"}}</div>
          <div class="cubeic-select"></div>
        </div>
        <div class="number item">
          <div @click="add('decrease')" class="decrease">-</div>
          <div class="input">
            <input v-model="total.double" type="tel">
          </div>
          <div @click="add('increase')" class="add">+</div>
        </div>
      </div>
    </div>
    <div class="betArea-decial-choose-money">
      <div class="input-wrap">
        <span @click="cancel" class="text">清除</span>
        <span class="input">
          <van-field type="tel" placeholder="输入金额" maxlength="10" matinput="" aria-invalid="false" @blur="inputBlur" @keyup="calculate" v-model="total.inputVal" />
          <!-- <input matinput="" type="tel" aria-invalid="false" @blur="inputBlur" @keyup="calculate" ref="inputVal" v-model="total.inputVal" placeholder="输入金额"> -->
          <span v-if="$route.meta.series=='lhc'" class="totle">共<label>{{total.num}}</label>注</span>
        </span>
        <span @click="sure" class="sure">立即投注</span>

      </div>
    </div>
    <div v-if="ifShow" :class="{'active':$route.meta.series=='lhc'}" class="mask">
    </div>
  </div>
</template>

<script>
export default {
  props: ["total"],
  data() {
    return {
      ifShow: false,
      col1Data: [],
      position:''
    };
  },
  methods: {
    isMobile() {
      const Mobile = navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(Mobile)) {
        return false;
      } else if (/android/.test(Mobile)) {
        return true;
      }
    },    
    //输入框失去焦点
    inputBlur() {
    // document.documentElement.scrollTop = 0;
      //  this.$emit('calculate');
    },
    //是否显示已封盘蒙版
    ifShowFc(bool) {
      this.ifShow = bool;
    },
    //清除
    cancel() {
      this.$emit("sec-money-say");
    },
    //计算
    calculate() {
      this.$emit("calculate");
    },
    //提交
    sure() {
      let state = this.dInvalidMoney(this.total.inputVal);
      if (!state) {
        this.total.inputVal = "";
        this.$newToast("请输入正确的金额");
        // this.$newToast("请输入正确金额");
      } else {
        this.$emit("showPopup");
      }
    },
    //输入框禁止输入
    disable(bool) {
      this.$nextTick(() => {
        if (bool) {
          // this.$refs.inputVal.setAttribute("disabled", bool);
        } else {
          // this.$refs.inputVal.removeAttribute("disabled", bool);
        }
      });
    },
    //显示选择框以及模式选择
    showPickerFc(model) {
      if (!localStorage.token) {
        return false;
      }

      let nowInder = 0;
      if (model == "元") {
        this.col1Data = [
          { text: "元", value: "yuan" },
          { text: "角", value: "yuan" },
          { text: "分", value: "yuan" }
        ];
        this.col1Data.forEach((item, v1) => {
          if (item.text == this.total.model.name) {
            nowInder = v1;
          }
        });
      } else if (model == "赔率") {
        let rebate = +JSON.parse(localStorage.userinfo).rebate;
        let saveArr = [];
        // for (let i = 0; i <= 26; i++) {
        //   saveArr.push({ text: `${rebate - 5 * i}`, value: "odd" });
        // }
        for (let i = 0; i <= 26; i++) {
          saveArr.push({ text:0.5*i+'%' , value: "odd" });
        }        
        saveArr.forEach((item, v2) => {
          if (item.text == this.total.odds) {
            nowInder = v2;
          }
        });
        this.col1Data = saveArr;
        // console.log(saveArr)
      }
      this.newPicker();
      this.picker.setData([this.col1Data], [nowInder]);
      this.picker.show();
      // let flag = this.$isMobile();
      // if(flag){
      //   document.querySelector('.cube-picker').style.position="absolute";
      // }      
    },
    //点击选中返回数据
    showPickerReturn(selectedVal, selectedIndex, selectedText) {
      if (selectedVal[0] == "yuan") {
        this.total.model.name = selectedText[0];
        if (selectedText[0] == "元") {
          this.total.model.db = 1;
        } else if (selectedText[0] == "角") {
          this.total.model.db = 0.1;
        } else {
          this.total.model.db = 0.01;
        }
      } else if (selectedVal[0] == "odd") {
        let rebate = +JSON.parse(localStorage.userinfo).rebate;
        this.total.odds = selectedText[0];

        // this.total.rebate = (+rebate - this.total.odds) / 10;
        // console.log(this.total.odds)

        this.total.rebate =+this.total.odds.split('%')[0] ;
      }
      this.$emit("calculate");
      //   console.log(selectedVal)
      //   console.log(selectedIndex)
      //   console.log(selectedText)
    },
    //新选择框
    newPicker() {
      let $this = this;
      this.picker = this.$createPicker({
        title: "",
        data: [$this.col1Data],
        onSelect: (selectedVal, selectedIndex, selectedText) => {
          this.showPickerReturn(selectedVal, selectedIndex, selectedText);
        },
        onCancel: () => {}
      });
    },
    //加减
    add(type) {
      if (type == "decrease") {
        this.total.double = this.total.double - 1;
        if (this.total.double <= 1) {
          this.total.double = 1;
        }
      } else if (type == "increase") {
        this.total.double = this.total.double + 1;
      }
      this.$emit("calculate");
    }
  },
  mounted() {
      let flag = this.isMobile();
      flag ? (this.position = "absolute") : (this.position = "fixed");
      // console.log(this.total)
  }
};
</script>

<style lang="less" scoped>
@import "../../../../../assets/less/public/var.less";
//下注金额查询
.betArea-decial-choose-cont {
  position: absolute;
  width: 100%;
  bottom: 0;
  z-index: 99;
  .sel-box {
    width: 100%;
    height: 0.94rem;
    border-top: 1px solid @main-lottery-border-color;
    border-bottom: 1px solid @main-lottery-border-color;
    padding: 0.15rem 0.25rem;
    background: #fff;
    .left {
      float: left;
      font-size: 0.28rem;
      color: #333333;
      div {
        span {
          color: @main-brder-color;
        }
        &:first-child {
          padding-bottom: 0.1rem;
        }
      }
      // line-height: .31rem;
    }
    .right {
      float: right;
      font-size: 0.28rem;
      color: #333333;
      .item {
        float: left;
        height: 0.62rem;
        line-height: 0.62rem;
        background: linear-gradient(180deg, #fff, #eee);
        box-shadow: 0px 0px 0.08rem rgba(177, 177, 177, 1);
        text-align: center;
      }
      .model {
        width: 0.62rem;
        border-radius: 50%;
      }
      .percent {
        margin-left: 0.28rem;
        width: 1.3rem;
        border-radius: 0.31rem;
        div {
          color: #999999;
          float: left;
          &:first-child {
            color: #333;
            width: 0.95rem;
            height: 100%;
            border-right: 1px solid #e0e0e0;
          }
        }
      }
      .number {
        margin-left: 0.28rem;
        width: 1.7rem;
        border-radius: 0.31rem;
        div {
          float: left;
          // &:first-child{
          //     width: .95rem;
          //     height: 100%;
          //     border-right: 1px solid #E0E0E0;
          // }
          &.decrease {
            cursor: pointer;
            color: #666;
            float: left;
            width: 0.55rem;
            border-right: 1px solid #e0e0e0;
            font-size: 0.38rem;
          }
          &.add {
            cursor: pointer;
            color: #666;
            float: right;
            width: 0.55rem;
            border-left: 1px solid #e0e0e0;
          }
          &.input {
            background: #f1f0f0;
            input {
              border: 0;
              width: 0.6rem;
              background: #f1f0f0;
              text-align: center;
              box-shadow: none;
            }
          }
        }
      }
    }
  }
  .mask {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1.88rem;
    // background: rgba(0, 0, 0, 0.1);
    line-height: 1.88rem;
    // font-size: .58666667rem;
    background: rgba(0, 0, 0, 0.1);
    // font-weight: 700;
    text-align: center;
    &.active {
      line-height: 0.94rem;
      height: 0.94rem;
    }
  }
  .van-picker-select {
    position: absolute;
    top: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    .btn-box {
      position: absolute;
      bottom: 150px;
      background: #fff;
      height: 44px;
      width: 100%;
      border-bottom: 2px solid @main-lottery-border-color;
      span {
        line-height: 44px;
        padding: 0 20px;
        color: @main-brder-color;
        cursor: pointer;
        &:first-child {
          float: left;
        }
        &:last-child {
          float: right;
        }
      }
    }
    .van-picker {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }
  .betArea-decial-choose-money {
    width: 100%;
    height: 0.94rem;
    .input-wrap {
      display: flex;
      width: 100%;
      height: 0.94rem;
      background: #f9f9f9;
      // padding: 0.18rem 0.24rem;
      padding-left: 0.27rem;
      line-height: 0.58rem;
      // border-top:1px solid @main-lottery-border-color;
      .text {
        color: #555;
        font-size: 0.32rem;
        display: inline-block;
        padding-top: .20rem;
        cursor: pointer;
        &::before {
          display: inline-block;
          content: "";
          background: url("../../../../../assets/img/public/image/lottery/plays-tradition/del_icon@2x.png")
            no-repeat;
          width: 0.34rem;
          height: 0.34rem;
          background-size: 0.34rem;
          vertical-align: middle;
          margin-right: 0.1rem;
        }
      }
      .sure {
        display: inline-block;
        height: 0.8rem;
        line-height:0.8rem; 
        margin-top: .08rem;
        width: 2.2rem;
        font-size: 0.34rem;
        float: right;
        text-align: center;
        border-radius: 0.08rem;
      }
      .sure {
        color: #fff;
        background: @main-color;
        // background: url('../images/plays-tradition/m-lottery-sure.png');
        background-size: 100% 100%;
      }
      .input {
        position: relative;
        margin: 0 .20rem;
        // input {
        //   display: inline-block;
        //   width: 2.75rem;
        //   height: 0.58rem;
        //   border: 1px solid #dbdbdb;
        //   outline: none;
        //   border-radius: 0.08rem;
        //   text-indent: 0.2rem;
        //   font-size: 0.28rem;
        //   color: #666;
        //   margin-right: 10px;
        //   vertical-align: top;
        // }
        .van-cell {
          margin-top: .18rem;
          width: 3.18rem;
          height: 0.58rem;
          border: 1px solid #dbdbdb;
          align-items: center;
          border-radius: 0.08rem;
          font-size: 0.28rem;
          color: #666;
          padding: 0;
          padding-left: 10px;
          margin-right: 10px;
          vertical-align: top;
        }
        .totle {
          position: absolute;
          top:.18rem;
          right: 0.3rem;
          font-size: 0.28rem;
          color: #666;
          label {
            color: @main-brder-color;
          }
        }
      }
    }
  }
}
</style>
