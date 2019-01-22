<template>
  <div class="agency-index">
    <div class="index-img">
      <img src="../../../../../../assets/img/public/image/common/personal/userIndex/agency-index.png" alt="">
    </div>
    <div class="Income-Details">
      <div class="left">
        <span>今日收益 <span>0</span>元</span>
      </div>
      <router-link tag="div" to="agency_income" class="right">
        <span>查看详情</span>
        <i class="icon iconfont h5-icon-next"></i>
      </router-link>
    </div>
    <div class="agency-content">
      <div class="row" v-for="(item,index) in agencyData" :key="index" @click="$router.push(item.path)">
        <i class="icon iconfont h5-icon-personal-data text-color"></i>
        <p class="nth-p">{{item.name}}</p>
        <p class="last-p">{{item.content}}</p>
        <i class="icon iconfont h5-icon-next"></i>
      </div>


    </div>
  </div>
</template>

<script>
import vpPubFooter from "@/pages/public/userIndex/common/Footer";

export default {
  data() {
    return {
      agencyData: [
        {
          name: "下级开户",
          content: "为下级建立账户",
          path: "/personal_index/agency_open"
        },
        {
          name: "下级列表",
          content: "查询下级列表",
          path: "/personal_index/agency_list"
        },
        {
          name: "下级财务",
          content: "查询下级资金明细",
          path: "/personal_index/agency_finance"
        },
        {
          name: "下级报表",
          content: "下级会员报表",
          path: "/personal_index/agency_report"
        },
        {
          name: "下级人数",
          content: "下级会员人数",
          path: "/personal_index/agency_number"
        },
        {
          name: "赔率计算",
          content: "下级返点赔率计算",
          path:'/personal_index/agency_odds'
        }
      ]
    };
  },
  components: {
    vpPubFooter
  }
};
</script>

<style lang="less" scoped>
.agency-index {
  padding-bottom: 1.08rem;
  overflow: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  .index-img {
    img {
      width: 100%;
    }
  }
  .Income-Details {
    margin-top: 0.2rem;
    height: 0.8rem;
    line-height: 0.8rem;
    background: #fff;
    display: flex;
    padding: 0 0.3rem;
    div {
      flex: 1;
    }
    .left {
      span {
        color: #424242;
        font-size: 0.3rem;
        span {
          color: rgba(255, 0, 0, 1);
        }
      }
    }
    .right {
      text-align: right;
      color: #888;
      font-size: 0.26rem;
      i {
        color: #c7c7cb;
        font-size: 0.26rem;
      }
    }
  }
  .agency-content {
    margin-top: 0.2rem;
    background: #fff;
    .row {
      margin-left: 1rem;
      position: relative;
      height: 1.2rem;
      i {
        &:nth-child(1) {
          font-size: 0.6rem;
          position: absolute;
          top: 0.3rem;
          left: -0.8rem;
        }
        &.h5-icon-next {
          position: absolute;
          color: #c7c7cb;
          font-size: 0.26rem;
          right: 0.3rem;
          top: 0.48rem;
        }
      }
      p {
        &.nth-p {
          color: #424242;
          font-size: 0.32rem;
          padding: 0.2rem 0;
        }
        &.last-p {
          font-size: 0.26rem;
          color: #aaaaaa;
        }
      }
    }
  }
}
</style>
