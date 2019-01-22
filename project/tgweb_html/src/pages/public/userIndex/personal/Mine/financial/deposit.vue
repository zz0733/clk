<template>
  <div class="pay-money">
    <div class="pay-list">
      <!-- <cube-scroll ref="scroll" :data="paylist"> -->
        <van-cell-group>
          <van-cell v-for="(pay,i) in paylist" :key="i" :title="pay.className" is-link :label="pay.classRemarks"
                    @click="$router.push({path:'deposit_submit',query:{classType:pay.classType,name:pay.className,id:pay.id}})">
            <template slot="icon">
              <!-- v-if="pay.devices.split(',').includes('h5')" -->
              <!-- {{pay.devices.split(",")}} -->
              <img class="bank_icon" :src="pay.className!=='银行转账'?staticsPath+pay.classIcon:pay.classIcon" alt="">
            </template>
          </van-cell>
        </van-cell-group>
      <!-- </cube-scroll> -->
    </div>
    <vp-pub-footer ></vp-pub-footer>
  </div>
</template>

<script>
import vpPubFooter from "@/pages/public/userIndex/common/Footer";
import touch from "@/service/public/perosonal/touch";

export default {
  data() {
    return {
      paylist: []
    };
  },
  computed: {
    staticsPath() {
      return localStorage.config && JSON.parse(localStorage.config).statics;
    }
  },
  methods: {
    // 获取支付分组分类
    payCategory() {
      this.$loading(true);
      this.$http
        .post(`${this.$HOST_NAME}/deposit/payment/category`, {
          devices: "h5"
        })
        .then(res => {
          if (res.code == 200) {
            res.data.forEach(item => {
              if (!item.classIcon) {
                item.classIcon = require("../../../../../../assets/img/public/image/common/personal/bank/base-pay.png");
              }
            });
            this.paylist = res.data;
            this.paylist.unshift({
              classRemarks: "入款优惠1%，您的首选",
              classType: "yinHang",
              className: "银行转账",
              id: "0",
              classIcon: require("../../../../../../assets/img/public/image/common/personal/userIndex/bank.png")
            });
            localStorage.paylist = JSON.stringify(this.paylist);
            this.$loading(false);
          } else {
          }
        });
    }
  },
  created() {
    this.$nextTick(() => {
      this.payCategory();
      // if (localStorage.paylist) {
      //   this.paylist = JSON.parse(localStorage.paylist)
      // } else {
      //   this.payCategory();
      // }
    });
  },
  filters: {
    // capitalize: function(value) {
    //   if (value) {
    //     try {
    //       let url = require(`../../../../../assets/img/public/image/common/personal/userInfo/${value}.png`);
    //       return url;
    //     } catch (err) {
    //       let url = require("../../../../../assets/img/public/image/common/personal/userInfo/menu-recharge@3x.png");
    //       return url;
    //     }
    //   }
    // }
  },
  components: {
    vpPubFooter
  },
  destroyed() {
    this.$loading(false);
    // localStorage.removeItem('paylist')
    // this.paylist = [];
  }
};
</script>

<style lang="less" scoped>
.pay-money {
  // height: 92%;
  flex: 1;
  // background: #fff;
  .pay-list {
    height: 100%;
    padding-bottom: 1.08rem;
    /deep/ .van-cell {
      height: 1.25rem;
      position: relative;
      border-bottom: 1px solid #f5f5f5;
      padding: 5px 30px;
      padding-left: 0;
      margin-left: 15px;
      // &:nth-child(6)::before {
      //   width: 100%;
      //   position: absolute;
      //   left: 0;
      //   top: 0;
      //   padding: 0.06rem;
      //   display: block;
      //   content: "";
      //   height: 0;
      //   background-color: #eee;
      // }
      .van-cell__right-icon {
        font-size: 0.2rem;
        color: #c7c7cb;
      }
      .van-cell__title span:not(.van-cell__label) {
        font-size: 0.3rem;
        color: #080604;
      }
      .van-cell__label {
        // margin-top: 2px;
        color: #bbbbbb;
        font-size: 0.26rem;
      }
    }
    /deep/ .van-cell__right-icon {
      line-height: 0.9rem;
    }
    /deep/ .van-cell:not(:last-child)::after {
      border: none;
    }
    /deep/ [class*="van-hairline"]::after {
      border: none;
    }
    .bank_icon {
      width: 0.74rem;
      height: 0.74rem;
      margin-right: 10px;
      padding-top: 0.1rem;
    }
  }
}

.cube-popup-content {
  position: fixed;
}
</style>