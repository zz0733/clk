<template>
<div class="cp-container-select">
  <div class="nav-name-wrap" :class="{lhcSize:lhcSize}">
    <span class="navName" :key="index" v-for="(item,index) in navObj.list" @click="playsModel(item)" :class="{'active':navObj.model==item.title}">
                    <a href="javascript:;">{{item.title}}</a>
                  </span>
  </div>

  <label @click="dNotify('即将上线','warn')">
            <i class="iconfont icon-liebiao"></i>遗漏
            </label>
  <!-- <Modal :scrollable=true  
                title="遗漏"
                v-model="modal" class-name="vp-omission-wrap"
                @on-cancel="cancel"
                width="584" height="400">
                  <div class="vp-betting-wrap">
                      <div class="vp-betting-container">
                          <div class="betting-container-header">
                              <div class="title">球号</div>
                              <div class="title">号码</div>
                              <div class="title">期数</div>
                              <div class="title">操作</div>
                          </div>
                          <div class="vp-overfloat-out"> 
                              <div class="vp-overfloat-in" v-show="!loading">
                                  <div calss="betting" :key="outIndex" v-for="(outItem,outIndex) in lostDatas">
                                      <div  class="text">第{{outItem.title}}球</div>
                                      <div  class="text">{{outItem['lost:'].ball}}号</div>
                                      <div  class="text">{{outItem['lost:'].lost_num}}期</div>
                                      <div  class="text"><span @click="betsBtn(outItem,outIndex)" :class="{'active':outItem.staue}">下注</span></div>
                                  </div>
                              </div>
                          </div> 
                      </div>
                      <div class="omission-footer" v-if="ifShow">
                         <div class="odd">当前赔率：2</div>
                         <div class="price">
                            <span>下注金额:</span>
                            <input type="text" v-model="priceInput" @keyup="omissionKeyUp">
                         </div>
                         
                         <div class="button-box">
                              <a @click="sure">确定</a>
                              <a @click="cancel">取消</a>
                         </div>
                      </div>      
                </div>
            </Modal>          -->
</div>
</template>

<script>
import store from '@/vuex/store'
export default {
  props: {
    navObj: {
      type: Object
    }
  },
  data() {
    return {
      modal: false,
      ifShow: false,
      loading: true,
      priceInput: '',
      lostDatas: [],
      lhcSize: false
    }
  },
  methods: {
    //选择历史球记录 
    playsModel(item) {
      this.navObj.model = item.title;
      this.$emit('tsferTrend', 'click');
    },
    betsBtn(outItem, outIndex) {
      alert('暂不支持！')
      return false;
      outItem.staue = !outItem.staue;
      this.submitList.forEach((item, v) => {
        if (outIndex != v) {
          item.staue = false;
        }
      });
      // 显示下注
      let staue = false;
      this.submitList.forEach((item, v) => {
        if (item.staue) {
          staue = true;
          return false;
        }
      });

      if (staue) {
        this.ifShow = true;
      } else {
        this.ifShow = false;
      }

    },
    omissionKeyUp() {
      if (!this.priceInput) return false;
      if (!this.dInvalidMoney(this.priceInput)) {
        alert('请输入数字！');
        this.priceInput = '';
      }
    },
    cancel() {
      // this.submitList.forEach((item,v)=>{
      //       item.staue=false;
      // }); 
      this.priceInput = '';
      this.modal = false;
    },
    //遗漏数据请求
    async showLost() {
      this.modal = true;
      this.loading = true;
      let res = await this.$http.post(`${this.$HOST_NAME}/lottery/results`, {
        lottery: this.$route.meta.code,
        type: this.$route.meta.series
      });
      if (res && res.code == 200) {
        this.loading = false;
        this.lostDatas = res.data[this.$route.meta.code]['statistics:'];
      } else {
        console.log('获取遗漏数据失败！')
      }

    },
    async sure() {
      if (!this.priceInput) return false;
    }
  },
  created() {
    // console.log(this.$route)
    if (this.$route.meta.series == "lhc") {
      this.lhcSize = true;
    } else {
      this.lhcSize = false;
    }
  },
  mounted() {},
  components: {},
  store
}
</script>

<style lang="less" scoped>
@import '../../../../../assets/less/public/var.less';
.cp-container-select {
  zoom: 1;
  overflow: hidden;
  height: 42px;
  border: 1px solid #dedede;
  border-left: 0;
  border-right: 0;
  background: rgba(248, 246, 246, 0.59);
  padding: 0 25px;
  box-shadow: 3px 3px 5px #FFFFFF inset;
  //   box-shadow: 2px 2px 100px #FFFFFF inset;
  .nav-name-wrap {
    float: left;
    .navName {
      height: 42px;
      // padding: 0 20px;
      display: inline-block;
      font-size: 16px;
      color: #4C4C4C;
      float: left;
      cursor: pointer;
      a {
        color: #4C4C4C;
        border-right: 1px solid #CFCFCF;
        display: inline-block;
        width: 100%;
        padding: 0 20px;
        margin-top: 12px;
      }
      &.active {
        background: url("/static/public/image/lottery/vp-tab.gif") no-repeat;
        color: #fff;
        background-size: 100% 100%;
        margin-left: -2px;
        a {
          color: #fff;
          border-right: 0;
        }
      }
      &:last-child {
        a {
          border-right: 0;
        }
      }
    }
  }
  .lhcSize {
    .navName {
      a {
        padding: 0 16px;
      }
    }
  }
  label {
    float: right;
    font-size: 14px;
    padding: 4px 12px;
    cursor: pointer;
    border: 1px solid #eee;
    background: #fff;
    display: inline-block;
    margin-top: 7px;
    border-radius: 3px;
    color: #888;
    i {
      padding-right: 5px;
    }
  }
}
</style>

