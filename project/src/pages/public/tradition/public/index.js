import vpLotHeader from "../components/lottery-header";
import vpLotteryResult from "../components/lottery-result";
import vpLotterySecMoney from "../components/lottery-select-money";
import vpLotterySubmit from "../components/lottery-submit";
import vpLuZhu from "../components/lu-zhu";
import vpNav from "../components/lottery-nav";
import { _SetGet, _SetPost } from "@/service/public/service.js";
import UserService from "@/service/public/UserService.js";
const mixin = {
  data: function () {
    return {
      position: '',
      ifShowNav: false,
      token: localStorage.token,//token是否存在
      isopen: true,//是否开盘
      closeMaskStaue: false,//是否显示遮罩
      fontSize: 0,//初始化页面
      showSubmit: false,//显示提交框
      scrollEvents: ['scroll'],
      side: {
        list: [],
      },
      total: {
        momey: '',
        num: '',
        inputVal: '',
        double: 1,
        model: {
          name: '元',
          db: 1
        },
        odds: 1980,
        rebate: 0
      },
      childNeedMess: {
        title: "",
        issue: "",
        id: '',
        total: ''
      },
      sideReady: false,//导航是否准备完毕
      sideSelect: '',//当前选中
      showList: {
        list: [],
        active: ''
      },
      submitList: [],
      kuaiJie: {},
      interval:null
    }
  },
  methods: {
    //显示球号选择
    showBallSel(bool, ballList) {
      this.$refs.selBall.ifShow(bool, ballList);
    },
    //滚动处理
    scroll() { },
    // 显示子组件动画
    menuAnimate(bool) {
      this.ifShowNav = bool;
    },
    // 封盘
    closeLoy(bool) {
      this.isopen = bool;
      if (bool) {
        this.closeMaskStaue = false;
        // console.log("开盘了");
        // this.total.inputVal = "";
        this.$refs.selMoney.ifShowFc(false);
        //滚动
        // this.$nextTick(() => {
        //   this.$refs.scroll.enable(true);
        // });
      } else {
        this.closeMaskStaue = true;
        // console.log("封盘了");
        // this.total.inputVal = "";
        this.$refs.selMoney.ifShowFc(true);
        //不能滚动
        // this.$nextTick(() => {
        //   this.$refs.scroll.disable(false);
        // });
      }
    },
    //选中
    addActiveFc(intItem) {
      if (!this.token) {
        this.$router.push({
          path: '/admin/login'
        })
        return false;
      }
      intItem.state = !intItem.state;
      // let rankList = [
      //   { name: "第六名" }, { name: "第七名" }, { name: "第八名" }, { name: "第九名" }, { name: "第十名" }
      // ];//没有龙虎的集合
      // let flag = false;
      // rankList.forEach(rank => {
      //   if (rank.name == intItem.name) {
      //     flag = true;
      //     this.showList.list[2].code.forEach(ball => {
      //       if (ball.name == "龙" || ball.name == "虎") {
      //         ball.show = true;//不显示设置为true，因为其他号码没有这个属性
      //       }
      //     })
      //     return false;
      //   }
      // })
      // if (!flag) {
      //   this.showList.list[2].code.forEach(ball => {
      //     if (ball.name == "龙" || ball.name == "虎") {
      //       delete ball.show;
      //     }
      //   })
      // }
      this.calculate();
    },
    // 隐藏投注框
    hidePopup() {
      this.showSubmit = false;
      let component = this.$refs["mySumit"];
      component.hide();
    },
    // 显示投注框投注逻辑(先计算一遍)
    showPopup() {
      if (!this.isopen) {
        this.$newToast("已封盘");
        return false;
      }
      this.calculate();
      //整理数据
      this.submitList = [];
      if (this.sideSelect == "快捷") {
        if (
          (this.kuaiJie.list0.length && this.kuaiJie.list1.length) ||
          (this.kuaiJie.list0.length && this.kuaiJie.list2.length)
        ) {
          this.kuaiJie.list0.forEach((list0Item, _v0) => {
            // console.log(list0Item)
            this.kuaiJie.list1.forEach((list1Item, _v1) => {
              this.submitList.push({
                code: list1Item.code,
                odds: list1Item.odds,
                playway: list1Item.playway,
                intTitle: list0Item.code
              });
            });
            this.kuaiJie.list2.forEach((list2Item, _v2) => {
              this.submitList.push({
                code: list2Item.code,
                odds: list2Item.odds,
                playway: list2Item.playway,
                intTitle: list0Item.code
              });
            });
          });
        } else {
          // this.$errToast("快捷模式请选择完整!!!");
          this.$newToast("快捷模式请选择完整!");
        }

        // console.log(this.kuaiJie);
      } else {
        this.showList.list.forEach(outItem => {
          outItem.code.forEach(intItem => {
            if (intItem.state) {
              this.submitList.push({
                code: intItem.code,
                odds: intItem.odds,
                playway: intItem.playway,
                intTitle:
                  outItem.small && outItem.small != "拆分"
                    ? outItem.small
                    : this.sideSelect
              });
            }
          });
        });
      }

      if (!this.submitList.length) {
        this.$newToast("请选择投注类型");
        return false;
      };
      //显示
      const component = this.$refs["mySumit"];
      component.show();
      //滚动bug
      this.showSubmit = true;
    },
    //获取侧边玩法设置
    async getPlaywaySet() {
      let res = await _SetGet(
        `${this.$HOST_NAME}/lottery/getPlaywaySet/${this.$route.meta.id}`,
        {}
      );
      if (res && res.code == 200) {
        res.data.forEach(outItem => {
          outItem.items.forEach(intItem => {
            intItem.code.forEach((thirItem, _v3) => {
              thirItem.id = intItem.small + _v3;
              thirItem.state = false;
            });
          });
        });
        //   console.log(res.data);
        this.side.list = res.data;
        this.sideReady = true; 
      } else {

      }
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
        submitArr.push({
          code: item.code,
          playway: item.playway,
          odds: item.odds,
          money: submitMoney,
          ball: item.intTitle,
          attach: ""
        });
      });
      let heXiaoConfig = [
        { name: "二肖", length: 2 },
        { name: "三肖", length: 3 },
        { name: "四肖", length: 4 },
        { name: "五肖", length: 5 },
        { name: "六肖", length: 6 },
        { name: "七肖", length: 7 },
        { name: "八肖", length: 8 },
        { name: "九肖", length: 9 },
        { name: "十肖", length: 10 },
        { name: "十一肖", length: 11 }
      ]
      let quanBuZhongConfig = [
        { name: "五不中", length: 5 },
        { name: "六不中", length: 6 },
        { name: "七不中", length: 7 },
        { name: "八不中", length: 8 },
        { name: "九不中", length: 9 },
        { name: "十不中", length: 10 },
        { name: "十一不中", length: 11 },
        { name: "十二不中", length: 12 },
      ]
      let flag = false;
      let that = this;
      function stopSubmit(configArr, active) {//阻止合肖和五不中的函数
        configArr.forEach(item => {
          if (item.name == active) {
            if (submitArr.length > item.length) {
              flag = true;
              that.hidePopup();
              that.$newToast(`${active}只能选择${item.length}个数量投注！`);
              return false;
            }
          }
        })
      }
      if (this.sideSelect == "合肖") {
        stopSubmit(heXiaoConfig, this.active.heXiaoMol);
      }
      if (this.sideSelect == "全不中") {
        stopSubmit(quanBuZhongConfig, this.active.quanBuZhongMol);
      }
      if (!flag) {
        this.pubilcSubmit(submitArr);
      }
    },
    //计算总数
    calculate() {
      let num = 0;
      let kuaiJie = { list0: [], list1: [], list2: [] };
      this.showList.list.forEach(outItem => {
        outItem.code.forEach(intItem => {
          if (intItem.state) {
            if (this.sideSelect == "快捷") {
              if (outItem.small == "号码") {
                kuaiJie.list1.push(intItem);
              } else if (outItem.small == "玩法") {
                kuaiJie.list2.push(intItem);
              } else {
                kuaiJie.list0.push(intItem);
              }
              //计算
              if (
                (kuaiJie.list0.length && kuaiJie.list1.length) ||
                (kuaiJie.list0.length && kuaiJie.list2.length)
              ) {
                num =
                  kuaiJie.list1.length * kuaiJie.list0.length +
                  kuaiJie.list2.length * kuaiJie.list0.length;
              }
            } else {
              num = num + 1;
            }
          }
        });
      });
      this.kuaiJie = kuaiJie;
      this.total.num = num;
      if (this.total.model.name == "元") {
        this.total.momey =
          +this.total.inputVal * num * this.total.double * this.total.model.db;
      } else if (this.total.model.name == "角") {
        this.total.momey = (+this.total.inputVal *
          num *
          this.total.double *
          this.total.model.db
        ).toFixed(1);
      } else if (this.total.model.name == "分") {
        this.total.momey = (+this.total.inputVal *
          num *
          this.total.double *
          this.total.model.db
        ).toFixed(2);
      }
    },
    //公共提交
    async pubilcSubmit(submitArr) {
      if (!localStorage.token) return false;
      let res = await this.$http.post(`${this.$HOST_NAME}/lottery/submit`, {
        lotteryId: this.$route.meta.id,
        issue: this.childNeedMess.issue,
        code: JSON.stringify(submitArr),
        rebate: this.total.rebate
      });
      if (res && res.code == 200) {
        this.hidePopup();
        this.reset();
        this.$toast.success('下注成功');
        UserService.reloadBalance.call(this);
      } else {
        this.hidePopup();
        this.$toast.success(res.message);
      }
    },
    //重置所有信息
    reset() {
      if (!this.isopen) {
        return false;
      }
      this.showList.list.forEach((outItem, _v1) => {
        outItem.code.forEach((intItem, _v2) => {
          intItem.state = false;
        });
      });
      this.total.num = 0;
      this.total.momey = 0;
      this.total.inputVal = "";
      this.kuaiJie = {};
      this.erZiDingWei ? this.erZiDingWei = {} : '';
      this.sanZiDingWei ? this.sanZiDingWei = {} : '';
    },
    initHtml() {
      this.$nextTick(() => {
        UserService.vpInitHtml.call(this, "init");
      });
    },
    init() {
      this.childNeedMess = {
        title: this.$route.meta.name,
        issue: "",
        id: this.$route.meta.id,
        total: "",
        code: this.$route.meta.code,
        series: this.$route.meta.series
      };
    },
    isMobile() {
      const Mobile = navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(Mobile)) {
        return false;
      } else if (/android/.test(Mobile)) {
        return true;
      }
    },
    websoc(msg) {
      // 时时更新露珠和开奖
      this.$nextTick(() => {
        if (msg.type == 'user.lotteryOpen') {
          msg && msg.data.forEach((item) => {
            if (item.lotteryId == this.$route.meta.id) {
              this.$refs.lotHeaderWrap.websoc(msg);
              if (this.$route.meta.series != 'lhc') {
                this.$refs.luZhuWrap.getData();
              }
            }
          })
        }
      });
    }
  },
  created: function () {
    // this.$refs.luZhuWrap.getData();
    // alert();
    this.$nextTick(() => {
      let flag = this.isMobile();
      flag ? (this.position = "absolute") : (this.position = "fixed");
    });    
    
    //初始化
    this.init();
    // 获取列表赔率
    this.getPlaywaySet();
    // 初始化页面高度
    this.initHtml();
    UserService.vpGetBasWebsoc.call(this);
    if (localStorage.token) {
      let rebate = +JSON.parse(localStorage.userinfo).rebate;
      this.total.odds = rebate;
    }

  },
  computed: {
  },
  beforeDestroy() {
    this.$loading3(false);
    this.$loading2(false);
    clearInterval(this.interval);
  },
  watch: {
  },
  components: {
    vpLotteryResult,
    vpLotterySecMoney,
    vpLotterySubmit,
    vpLuZhu,
    vpLotHeader,
    vpNav
  }
}

export default mixin;


