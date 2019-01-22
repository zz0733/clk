<template>
<div class="lottery-menuBar-wrap">
  <div v-if="ifShow" @click="ifShowFc(false)" class="menuBar-hold"></div>
    <div v-if="ifShow"     class="menuBar-cont fadeInLeftBig animatedSide">
  <div class="menuBar-cont">
    <div class="header" @click="goTo('/')">
      <!-- <div class="right-text"> -->
      <img src="../../.././../../assets/img/public/image/lottery/plays-tradition/side/h5-back.png" alt="">
      <span>返回大厅</span>
    </div>

    <!-- </div> -->

    <div class="list">
      <cube-scroll :data="list">
        <ul>
          <div :key=index v-for="(item,index) in list">


            <li @click="goTo(item.router)">
              <div class="item">
                <img :src="item.code|capitalize" alt="">
                <span>{{item.name}}</span>
                <span class="ico cubeic-arrow"></span>
              </div>
            </li>
            <!-- <li :class="{
                        'activeCommon':item.id==100,
                        'activeLiuhe':item.id==3,
                        'activePcdd':item.id==4,
                        'activeK3':item.id==7,
                        'activeElevent':item.id==6,
                        'activePk':item.id==1,
                        'activeSsc':item.id==2,
                        'activeKlsf':item.id==5,
                        'activeDpc':item.id==9
                        }" @click="toggle(item)">
              <div class="item">
                <span>{{item.name}}</span>
                <span class="ico cubeic-select"></span>
              </div>
            </li> -->
            <!-- {{item.staue}} -->
            <!-- <div @click="goTo(intItem.router)" v-if="item.staue" :key=intIndex v-for="(intItem,intIndex) in item.lottery" class="child-wrap">
              <div class="child-item">
                {{intItem.name}}<span class="cubeic-arrow"></span>
              </div>
            </div> -->

          </div>

        </ul>
        <div class="lottery-left-nav-gasket"></div>
      </cube-scroll>
    </div>
  </div>

    </div>

</div>
</template>

<script>
import {
  _SetGet,
  _SetPost
} from '@/service/public/service.js'
export default {
  data() {
    return {
      list: [],
      ifShow: false,
      activeName: '1',
    }
  },
  methods: {
    ifShowFc(bool) {
      this.ifShow = bool;
      this.$emit('child-say');
    },
    goTo(router) {
      if (router == this.$route.path) {
        this.ifShowFc(false);
        window.location.reload();
      } else if (router == "/home") {
        this.$router.push({
          path: '/home',
          query: {
            type: 'isLottery'
          }
        })
      } else {
        this.$router.push({
          path: router
        })
      }

    },
    // async getDatas() {
    //   let res = await _SetPost(`${this.$HOST_NAME}/games/lottery/category`, {});
    //   if (res && res.code == 200) {
    //     let list = res.data;
    //     // 提取常用彩票
    //     let conmmonUse = {
    //       name: "常用彩票",
    //       id: "100",
    //       lottery: []
    //     };
    //     list.forEach((item) => {
    //       item && item.lottery.forEach((innerItem) => {
    //         this.classify(innerItem);
    //         if (innerItem.tag == '常用') {
    //           conmmonUse.lottery.push(innerItem);
    //         }
    //       });
    //     });
    //     //只显示常用5个
    //     if (conmmonUse.lottery.length > 5) {
    //       conmmonUse.lottery.splice(5, conmmonUse.lottery.length);
    //     }
    //     list.unshift(conmmonUse);
    //     list.forEach((item) => {
    //       item.staue = false;
    //     });
    //     this.list = list;
    //     // console.log(this.list)                   
    //   } else {

    //   }
    // },
    // classify(inItem) {
    //   inItem.router = `/plays/tradition/${inItem.id}`;
    // },
    // 是否展开
    toggle(item) {
      // console.log(item.id)
      this.list.forEach((listItem) => {
        if (item.id == listItem.id) {
          item.staue = !item.staue;
          // console.log(item.staue)
        } else {
          listItem.staue = false;
        }
      });
    },

    // 获取左边导航栏
    getLeftMenu() {
      this.$http.post(`${this.$HOST_NAME}/games/lottery/leftMenu`, {
        prePage: 14
      }).then(res => {
        if (res && res.code == 200) {
          let list = res.data;
          list.forEach(item => {
            item.id ? item.router = `/plays/tradition/${item.id}` : ''
          })
          list.push({
            name: '更多彩票',
            router: '/home',
            code: 'more'
          })
          this.list = list;
        }
      })
    }
  },
  created: function() {
    // this.getDatas();
    this.getLeftMenu()
  },
  mounted() {

  },
  components: {},
  computed: {
    userinfo() {
      return this.$store.state.mainState.userinfo;
    }
  },
  filters: {
    capitalize: function(value) {
      try {
        return require(`../../../../../assets/img/public/image/lottery/plays-tradition/side/${value}.png`);
      } catch (err) {
        return require(`../../../../../assets/img/public/image/lottery/plays-tradition/side/bjsc.png`);
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../../../assets/less/public/var.less";
.lottery-menuBar-wrap {
  z-index: 102;
  position: fixed;
  top: 0;
  // left: -200px;
  height: 100%;
  .menuBar-hold {
    position: fixed;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .menuBar-cont {
    position: absolute;
    left: 0;
    top: 0;
    width: 200px;
    height: 100%;
    background: #fff;
    .header {
      background: @main-color;
      height: 50px;
      // line-height: 50px;
      width: 100%;
      color: #FFFFFF;
      font-size: 18px;
      padding: 10px 25px;
      display: flex;
      img {
        width: 30px;
        height: 30px;
      }
      span {
        padding-top: .15rem;
        padding-left: 10px;
      }
      // .right-text {
      //   div {
      //     &::before {
      //       content: '';
      //       display: inline-block;
      //       width: 21px;
      //       height: 20px;
      //       background: url('../../.././../../assets/img/public/image/lottery/plays-tradition/side/h5-back.png') no-repeat;
      //       background-size: 100% 100%;
      //       margin-right: 10px;
      //       // margin-bottom: -1px;                   
      //     }
      //   }
      // }
    }
    .list {
      position: absolute;
      left: 0;
      height: 95%;
      ul {
        // padding: 0 0 0 25px;
        // padding-left: 50px;
        li {
          cursor: pointer;
          display: flex;
          position: relative;
          .item {
            color: #555555;
            font-size: 17px;
            height: 44px;
            line-height: 44px;
            width: 150px;
            border-bottom: 1px solid @main-lottery-border-color;
            margin-left: 50px;
            // position: relative;
            img {
              position: absolute;
              width: 26px;
              top: 9px;
              left: 16px;
            }
            .ico {
              float: right;
              color: #DDDDDD;
              padding-right: 17px;
            }
          }
          &:before {
            width: 24px;
            height: 20.57px;
            margin-right: 5%;
            margin-top: 12px;
          }
          // &.activeCommon {
          //   &:before {
          //     content: '';
          //     display: inline-block;
          //     background: url('../../.././../../assets/img/public/image/lottery/plays-tradition/side/changyong@2x.png') no-repeat;
          //     background-size: 100% 100%;
          //   }
          // }
          // &.activeLiuhe {
          //   &:before {
          //     content: '';
          //     display: inline-block;
          //     background: url('../../.././../../assets/img/public/image/lottery/plays-tradition/side/liuhecai@2x.png') no-repeat;
          //     background-size: 100% 100%;
          //   }
          // }
          // &.activePcdd {
          //   &:before {
          //     content: '';
          //     display: inline-block;
          //     background: url('../../.././../../assets/img/public/image/lottery/plays-tradition/side/pcdandan@2x.png') no-repeat;
          //     background-size: 100% 100%;
          //   }
          // }
          // &.activeK3 {
          //   &:before {
          //     content: '';
          //     display: inline-block;
          //     background: url('../../.././../../assets/img/public/image/lottery/plays-tradition/side/kuaisan@2x.png') no-repeat;
          //     background-size: 100% 100%;
          //   }
          // }
          // &.activeElevent {
          //   &:before {
          //     content: '';
          //     display: inline-block;
          //     background: url('../../.././../../assets/img/public/image/lottery/plays-tradition/side/shiyixuan@2x.png') no-repeat;
          //     background-size: 100% 100%;
          //   }
          // }
          // &.activePk {
          //   &:before {
          //     content: '';
          //     display: inline-block;
          //     background: url('../../.././../../assets/img/public/image/lottery/plays-tradition/side/pk10@2x.png') no-repeat;
          //     background-size: 100% 100%;
          //   }
          // }
          // &.activeSsc {
          //   &:before {
          //     content: '';
          //     display: inline-block;
          //     background: url('../../.././../../assets/img/public/image/lottery/plays-tradition/side/shishicai@2x.png') no-repeat;
          //     background-size: 100% 100%;
          //   }
          // }
          // &.activeKlsf {
          //   &:before {
          //     content: '';
          //     display: inline-block;
          //     background: url('../../.././../../assets/img/public/image/lottery/plays-tradition/side/shifen@2x.png') no-repeat;
          //     background-size: 100% 100%;
          //   }
          // }
          // &.activeDpc {
          //   &:before {
          //     content: '';
          //     display: inline-block;
          //     background: url('../../.././../../assets/img/public/image/lottery/plays-tradition/side/dipin@2x.png') no-repeat;
          //     background-size: 100% 100%;
          //   }
          // }
        }
        .child-wrap {
          color: #555555;
          font-size: 17px;
          line-height: 44px;
          height: 44px;
          // width: 2.25rem;
          .child-item {
            cursor: pointer;
            margin-left: 30px;
            border-bottom: 1px solid @main-lottery-border-color;
            span {
              color: #eee;
              margin-right: 17px;
              float: right;
            }
          }
        }
      }
    }
  }
}
</style>
