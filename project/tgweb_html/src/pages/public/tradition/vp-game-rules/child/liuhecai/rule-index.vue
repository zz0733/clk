<template>
  <div>
    <div class="rules-container-header">
      <ul>
        <li @click="contentSelectFc(item)" :class="{'active':item.title==contentSelect}"
            v-for="(item,index) in contentNav" :key=index>
          <a>{{item.title}}</a>
        </li>
      </ul>
    </div>
    <div class="rules-container-text" v-if="contentSelect=='重庆时时彩'">
      <!-- 彩种介绍 -->
      <p class="rules-intro">
        重庆时时彩游戏是依照中国重庆福利彩票发行中心统一发行的『时时彩』彩票的开奖数据为依据所规划的线上彩票游戏，北京时间（GMT+8）每天白天从上午10:00开到晚上22:00（10分钟一期，共72期），夜间从晚上22:00至凌晨02:00（5分钟一期，共48期），每天开奖120期（白天72期，夜间48期）。本公司重庆时时彩具体游戏规则如下︰开奖结果为五码
        (万、仟、佰、拾、个)。假设结果为1 、2 、3 、4、5。
      </p>
      <header>游戏玩法</header>
      <div class="rules-space"></div>
      <!-- 规则开始 -->
      <!-- 头部 -->
      <div class="rules-item-title">
        <span class="dot"></span>第一球 ~ 第五球
      </div>
      <!-- 内容 -->
      <div class="rules-item-plays-wrap">
        <span class="rules-active">第一球~第五球</span>：第一球、第二球、第三球、第四球、第五球：指下注的每一球特码与开出之号码其开奖顺序及开奖号码相同，视为中奖，如第一球开出号码 8，下注第一球为
        8 者视为中奖，其余情形视为不中奖。<br>
        <span class="rules-active">单双大小</span>：根据相应单项投注第一球 ~ 第五球开出的球号，判断胜负。<br>
        <span class="rules-active">大小</span>：根据相应单项投注的第一球 ~ 第五球开出的球号大于或等于 5 为特码大，小于或等于 4 为特码小。<br>
        <span class="rules-active">单双</span>：根据相应单项投注的第一球 ~ 第五球开出的球号为双数则为特码双，如 2、6；球号为单数则为特码单，如 1、3。<br>
      </div>
      <div class="rules-item-title">
        <span class="dot"></span>总和
      </div>
      <div class="rules-item-plays-wrap">
        <span class="rules-active">大小</span>：根据相应单项投注的第一球 ~ 第五球开出的球号数字总和值大于或等于 23 为总和大，小于或等于 22 为总和小。<br>
        <span class="rules-active">单双</span>：根据相应单项投注的第一球 ~ 第五球开出的球号数字总和值是双数为总和双，数字总和值是单数为总和单。<br>

      </div>

      <div class="rules-item-title">
        <span class="dot"></span>前三特殊玩法： 豹子 > 顺子 > 对子 > 半顺 > 杂六
      </div>
      <div class="rules-item-plays-wrap">
        <span class="rules-active">豹子</span>：开奖号码的万位千位百位数字都相同。如中奖号码为：222XX、666XX、888XX...开奖号码的万位千位百位数字相同，则投注前三豹子者视为中奖，其它视为不中奖。<br>
        <span class="rules-active">顺子</span>：开奖号码的万位千位百位数字都相连，不分顺序（数字9、0、1相连）。如中奖号码为：123XX、901XX、321XX、798XX...开奖号码的万位千位百位数字相连，则投注前三顺子者视为中奖，其它视为不中奖。<br>
        <span class="rules-active">对子</span>：开奖号码的万位千位百位任意两位数字相同（不包括豹子）。如中奖号码为：001XX，288XX、696XX...开奖号码的万位千位百位有两位数字相同，则投注前三对子者视为中奖，其它视为不中奖。如果开奖号码为前三豹子，则前三对子视为不中奖。<br>
        <span class="rules-active">半顺</span>：开奖号码的万位千位百位任意两位数字相连，不分顺序（不包括顺子、对子）。如中奖号码为：125XX、540XX、390XX、160XX...开奖号码的万位千位百位有两位数字相连，则投注前三半顺者视为中奖，其它视为不中奖。如果开奖号码为前三顺子、前三对子，则前三半顺视为不中奖。如开奖号码为：123XX、901XX、556XX、233XX...视为不中奖。<br>
        <span class="rules-active">杂六</span>：：不包括豹子、对子、顺子、半顺的所有开奖号码。如开奖号码为：157XX、268XX...开奖号码位数之间无关联性，则投注前三杂六者视为中奖，其它视为不中奖。如
        1、3。
      </div>

      <div class="rules-item-title">
        <span class="dot"></span>中三特殊玩法： 豹子 > 顺子 > 对子 > 半顺 > 杂六
      </div>
      <div class="rules-item-plays-wrap">
        <span class="rules-active">豹子</span>：开奖号码的万位千位百位数字都相同。如中奖号码为：222XX、666XX、888XX...开奖号码的万位千位百位数字相同，则投注前三豹子者视为中奖，其它视为不中奖。<br>
        <span class="rules-active">顺子</span>：开奖号码的万位千位百位数字都相连，不分顺序（数字9、0、1相连）。如中奖号码为：123XX、901XX、321XX、798XX...开奖号码的万位千位百位数字相连，则投注前三顺子者视为中奖，其它视为不中奖。<br>
        <span class="rules-active">对子</span>：开奖号码的万位千位百位任意两位数字相同（不包括豹子）。如中奖号码为：001XX，288XX、696XX...开奖号码的万位千位百位有两位数字相同，则投注前三对子者视为中奖，其它视为不中奖。如果开奖号码为前三豹子，则前三对子视为不中奖。<br>
        <span class="rules-active">半顺</span>：开奖号码的万位千位百位任意两位数字相连，不分顺序（不包括顺子、对子）。如中奖号码为：125XX、540XX、390XX、160XX...开奖号码的万位千位百位有两位数字相连，则投注前三半顺者视为中奖，其它视为不中奖。如果开奖号码为前三顺子、前三对子，则前三半顺视为不中奖。如开奖号码为：123XX、901XX、556XX、233XX...视为不中奖。<br>
        <span class="rules-active">杂六</span>：不包括豹子、对子、顺子、半顺的所有开奖号码。如开奖号码为：157XX、268XX...开奖号码位数之间无关联性，则投注前三杂六者视为中奖，其它视为不中奖。如
        1、3。
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        contentNav: [
          {title: '重庆时时彩'},
          {title: '3分时时彩'},
          {title: '天津时时彩'},
          {title: '新疆时时彩'}
        ],
        contentSelect: '重庆时时彩'
      }
    },
    watch: {
      $route () {

      }
    },
    methods: {
      contentSelectFc (item) {
        this.contentSelect = item.title
        console.log(item.title)
      }
    },
    created () {
    },

    computed: {},
    mounted () {

    },
    components: {}
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @active-color: #FF0000;
  .rules-container-header {
    height: 63px;
    border-bottom: 1px solid #E4E0E0;
    padding: 0 10px;
    ul {
      li {
        float: left;
        padding: 0 20px;
        cursor: pointer;
        a {
          color: #666;
          line-height: 60px;
        }
        &:hover {
          //  border-bottom: 3px solid #FF6600;
          a {
            color: #FF6600;
            // line-height: 60px;
          }
        }
        &.active {
          border-bottom: 3px solid #FF6600;
          a {
            color: #FF6600;
            line-height: 60px;
          }
        }
      }
    }
  }

  .rules-container-text {
    padding: 25px 30px;
    font-size: 14px;
    line-height: 30px;
    color: #444444;
    text-align: justify;
    .rules-intro {
      text-indent: 28px;
    }
    header {
      padding: 35px 0 16px 0;
      font-weight: 600;
      font-size: 16px;
    }
    .rules-space {
      border-top: 1px solid #F4F4F4;
    }
    .rules-item-title {
      padding: 20px 0;
      color: #333;
      font-size: 16px;
      .dot {
        width: 5px;
        height: 5px;
        background: @active-color;
        display: inline-block;
        margin-right: 10px;
        margin-bottom: 2px;
      }
    }
    .rules-item-plays-wrap {
      padding-bottom: 20px;
      color: #666;
      font-size: 14px;
      .rules-active {
        color: @active-color;
        // font-weight: 600;
      }
    }
  }
</style>
