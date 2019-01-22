<template>
  <div class="refundSet">

    <div class="refund-header">
      <span class="fl mh5-back" @click="goback(false)"></span>彩票反点
    </div>
    <cube-scroll>
      <div class="refund-title">
        <span></span>彩票反点设置
      </div>

      <div class="refund-btn">
            <span>
             批量设置
          </span>
        <span>
            <img src="../../../../../assets/img/public/image/common/personal/angencyImg/jianshao.png" alt=""
                 @click="reduce">
            <img src="../../../../../assets/img/public/image/common/personal/angencyImg/zengjia.png" alt=""
                 @click="increase">
          </span>
      </div>

      <div class="refund-content" v-for="(value,key,i) in rebatedata" :key="i">

        <div class="refund-row" v-for="item in value" :key="item.id">
          <label>{{item.name}}:</label>
          <cube-select v-model="item.rebate" :options="item.id|redundCaplitalize"></cube-select>
        </div>
      </div>

      <div class="submitDomain" @click="goback(true)">
        保存
      </div>
      <div style="height:.2rem"></div>
    </cube-scroll>
  </div>
</template>
<script>
  // import store from "@/vuex/store";
  export default {
    data () {
      return {
        rebatedata: {},
        listShow: true,
        refundList: [],
        refundName: '',
        active: {},
        oneSet: true
      }
    },

    methods: {
      goback (flag) {

        if (flag) {
          localStorage.rebatedata = JSON.stringify(this.rebatedata)
          this.$emit('caipiaoShow', flag, this.rebatedata)

        } else {
          this.$emit('caipiaoShow', flag)
        }

      },
      getrebatedata () {
        this.$loading(true)
        if (localStorage.rebatedata) {
          this.rebatedata = JSON.parse(localStorage.rebatedata)
          this.$loading(false)
        } else {
          this.$http.get(`${this.$HOST_NAME}/lottery/getrebatedata?type=member&id=${this.$store.state.mainState.userinfo.uid}`).then(res => {
            if (res && res.code == 200) {
              for (let key in res.data) {
                this.active[key] = '未设置'
              }
              this.rebatedata = res.data
              this.$loading(false)
            }
          })
        }
      },
      reduce () {
        for (let key in this.rebatedata) {
          this.rebatedata[key].forEach(v => {
            v.rebate =
              v.rebate * 10 - 1 <= 0 ? '0.00' : String((v.rebate * 10 - 1) / 10).indexOf('.') != -1 ? String((v.rebate * 10 - 1) / 10) + '0' : String((v.rebate * 10 - 1) / 10) + '.00'
          })
        }

      },
      increase () {
        let refund = JSON.parse(JSON.parse(localStorage.userinfo).rebate)
        for (let key in this.rebatedata) {
          this.rebatedata[key].forEach((v, i) => {
            v.rebate = v.rebate * 10 + 1 >= refund[v.id] * 10 + 1 ? refund[v.id] : String((v.rebate * 10 + 1) / 10).indexOf('.') != -1 ? String((v.rebate * 10 + 1) / 10) + '0' : String((v.rebate * 10 + 1) / 10) + '.00'
          })
        }

      },
    },
    created () {
      this.$nextTick(() => {
        this.getrebatedata()
      })
    },
    filters: {
      redundCaplitalize: function (id) {
        let rebate = JSON.parse(JSON.parse(localStorage.userinfo).rebate)[id]
        let arr = ['0.00']
        for (let i = 1; i <= rebate * 10; i++) {
          arr.push(String(i / 10).indexOf('.') != -1 ? String(i / 10) + '0' : String(i / 10) + '.00')
        }
        return arr
      }
    },
    destroyed () {
      this.$loading(false)
    },
    // store
  }
</script>
<style lang="less" scoped>
  .caipiao {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #f9f9f9;
    padding-top: 1.08rem;
    z-index: 88;
    .caipiao-header {
      height: 0.88rem;
      width: 100%;
      background: linear-gradient(90deg, #ff5100, #ff8e00);
      line-height: 0.88rem;
      text-align: center;
      color: #fff;
      font-size: 0.36rem;
      padding: 0 0.18rem;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1001;
    }
    .refund-title {
      padding-left: 0.5rem;
      // margin-top: 1.08rem;
      height: 0.88rem;
      line-height: 0.88rem;
      background-color: rgba(255, 255, 255, 1);
      position: relative;
      font-size: 0.3rem;
      border-bottom: 1px solid #f5f5f5;
      span {
        position: absolute;
        left: 0.4rem;
        top: 0.24rem;
        width: 0.05rem;
        height: 0.38rem;
        background-color: rgba(255, 153, 0, 1);
      }
    }
    .refund-btn {
      // width: 7.5rem;
      height: 0.8rem;
      background-color: rgba(255, 255, 255, 1);
      line-height: 0.8rem;
      margin-bottom: 0.2rem;
      display: flex;
      div {
        flex: 1;
        color: #aaa;
        font-size: .26rem;
      }
      div:nth-child(1) {
        text-align: center;
        span {
          color: rgba(255, 153, 0, 1);
          font-size: 0.28rem;
        }
      }
      div:nth-child(2) {
        text-align: right;
        padding-right: 0.4rem;
        span {
          background: #f60;
          color: #fff;
          padding: .1rem .3rem;
          border-radius: .1rem;
        }
      }
    }
    .caipiao-content {
      height: 84%;
      .row {
        height: 1.1rem;
        background: #fff;
        line-height: 1.1rem;
        border-bottom: 0.02rem solid #f5f5f5;
        position: relative;
        label {
          display: inline-block;
          width: 2rem;
          text-align: right;
          font-size: 0.3rem;
        }
        .cube-select {
          padding: 0.1rem 0.4rem 0.2rem 0.2rem;
          border-radius: 0.04rem;
          font-size: 0.28rem;
          height: 1rem;
          line-height: 0.9rem;
          width: 80%;
          position: absolute;
          top: 0;
          right: 0.1rem;
          .cube-select-placeholder {
            display: none;
          }
        }
        .cube-select::after {
          border: none;
        }
        .cube-select-icon {
          border-width: 0.2rem 0.12rem 0 0.12rem;
          border-color: #ccc7c6 transparent transparent transparent;
        }
        span {
          margin-right: 0.28rem;
          font-size: 0.3rem;
          color: #aaa;
        }
        .cube-input {
          display: inline-block;
          width: 4rem;
          &::after {
            border: 1px solid #fff;
          }
        }
        input {
          font-size: 0.3rem;
          color: #aaa;
        }
      }
    }
    .baocun {
      height: 0.9rem;
      line-height: 0.9rem;
      background: #f60;
      text-align: center;
      border-radius: 0.15rem;
      color: #fff;
      margin: 0.3rem 0.24rem;
    }
  }

  .refundSet {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #f9f9f9;
    padding-top: 1.08rem;
    z-index: 99;
    .refund-header {
      height: 0.88rem;
      width: 100%;
      background: linear-gradient(90deg, #ff5100, #ff8e00);
      line-height: 0.88rem;
      text-align: center;
      color: #fff;
      font-size: 0.36rem;
      padding: 0 0.18rem;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1001;
      span {
        // font-size: 0.46rem;
      }
    }
    .refund-title {
      padding-left: 0.5rem;
      // margin-top: 1.08rem;
      height: 0.88rem;
      line-height: 0.88rem;
      background-color: rgba(255, 255, 255, 1);
      position: relative;
      font-size: 0.3rem;
      border-bottom: 1px solid #f5f5f5;
      span {
        position: absolute;
        left: 0.4rem;
        top: 0.24rem;
        width: 0.05rem;
        height: 0.38rem;
        background-color: rgba(255, 153, 0, 1);
      }
    }
    .refund-btn {
      // width: 7.5rem;
      height: 0.8rem;
      background-color: rgba(255, 255, 255, 1);
      line-height: 0.8rem;
      position: relative;
      margin-bottom: 0.2rem;
      span {
        padding-left: 0.4rem;
        width: 1.12rem;
        height: 0.4rem;
        line-height: 0.4rem;
        color: rgba(255, 153, 0, 1);
        font-size: 0.28rem;
        text-align: left;
        font-family: PingFangSC-Regular;
      }
      span:nth-child(2) {
        width: 3rem;
        float: right;
        padding-top: 0.15rem;
        // width: 100
        img {
          margin: 0 0.4rem;
          width: 0.4rem;
        }
      }
    }
    .refund-content {
      .refund-row {
        height: 1rem;
        line-height: 1rem;
        background: #fff;
        position: relative;
        border-bottom: 1px solid #f5f5f5;
        label {
          display: inline-block;
          width: 2rem;
          text-align: right;
          font-size: 0.3rem;
        }
        .cube-select {
          padding: 0.1rem 0.4rem 0.2rem 0.2rem;
          border-radius: 0.04rem;
          font-size: 0.28rem;
          height: 0.9rem;
          line-height: 0.8rem;
          width: 72%;
          position: absolute;
          top: 0;
          right: 0.1rem;
          .cube-select-placeholder {
            display: none;
          }
        }
        .cube-select::after {
          border: none;
        }
        .cube-select-icon {
          border-width: 0.2rem 0.12rem 0 0.12rem;
          border-color: #ccc7c6 transparent transparent transparent;
        }
      }
    }
    .submitDomain {
      height: 0.9rem;
      line-height: 0.9rem;
      background: #f60;
      text-align: center;
      border-radius: 0.15rem;
      color: #fff;
      margin: 0.3rem 0.24rem;
    }
  }
</style>
