<template>
   <div class="message">
    <ul v-if="$store.state.personal.contentView!='recharge'">
      <li v-for="(item,i) in allList" :key="i" :class="{liActive:i==$store.state.personal.navView}" @click="toggle(i)" >
        <span>{{item}}</span>
      </li> 
    </ul>
    <ul v-else>
      <li v-for="(item,i) in allList" :key="i" :class="{liActive:i==$store.state.personal.navView}" @click="toggle2(i,item)">
        <span>{{item.className}}</span>
      </li>
    </ul>    
   </div>
</template>

<script>
import store from "@/vuex/store";
export default {
  data() {
    return {
      allList: [],
      agencyList: ["代理中心", "财务查询", "团队管理", "邀请链接", "用户开户"],
      discountsList: ["推荐好友", "实时返水"],
      messageList: ["系统信息", "编写信息", "已发信息"],
      personageList: [
        "我的资料",
        "投注记录",
        "存款记录",
        "取款记录",
        "优惠记录",
        "代理记录",
        "其它记录",
        "账户安全"
      ],
      withdrawList: ["提款申请", "提款记录", "绑定银行卡"]
    };
  },
  methods: {
    toggle(i) {
      this.$store.commit("showNav", { child: i });
    },
    toggle2(i, item) {
      this.liActive = i;
      if (i == 0) {
        this.$store.commit("showContent", { parent: "recharge" });
        this.$store.commit("showNav", { child: i });
      } else {
        this.$store.commit("showContent", { parent: "recharge" });
        this.$store.commit("showNav", { child: i });
        this.$store.commit("payment", item);
        let postUrl = "";
        if (item.classType == "qr_code") {
          postUrl = "/deposit/qr_code";
        } else {
          postUrl = "/deposit/online";
        }
        this.$http
          .post(`${this.$HOST_NAME + postUrl}`, {
            categoryId: item.id,
            devices: "pc"
          })
          .then(res => {
            if (res.code == 200) {
                // console.log(res)
                res.data.forEach(v => {
              
                if ( v.bankCode && v.bankCode !== "null") {
                  v.bankCode = JSON.parse(v.bankCode);
                  //  console.log( JSON.parse(v.bankCode))
                  v.codeShow = true;
                }else{
                  v.codeShow = false;
                }
              });
              this.$store.commit("paymentDataFc", res.data);
            }
          });
        this.$store.commit("refresh", 1);
      }
    },
    payCategory() {
      if (this.$store.state.personal.contentView != "recharge") {
        this.allList = this[this.contentView + "List"];
      } else {
        this.getNavDatas();
      }
    },
    getNavDatas() {
      this.allList = [];
      this.$http
        .post(`${this.$HOST_NAME}/deposit/payment/category`, { devices: "pc" })
        .then(res => {
          if (res.code == 200) {
            res.data.unshift({ className: "网银转账" });
            this.allList = res.data;
          }
        });
    }
  },
  created() {
    this.payCategory();
  },
  computed: {
    contentView() {
      return this.$store.state.personal.contentView;
    }
  },
  watch: {
    contentView: {
      handler: function(val, oldVal) {
        this.payCategory();
      },
      deep: true
    }
  },
  store
};
</script>

<style lang="less" scoped>
.message {
  color: #fff;
  font-weight: 200;
  ul {
    li {
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 1.6em;
      cursor: pointer;
      span {
        padding: 8px 18px;
        border-radius: 10px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
      }
    }
    .liActive {
      span {
        background-color: RGBA(21, 20, 49, 0.45);
      }
    }
  }
}
</style>
