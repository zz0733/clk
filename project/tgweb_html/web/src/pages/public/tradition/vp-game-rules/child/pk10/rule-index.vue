<template>
  <div>
    <div class="rules-container-header">
      <ul>
        <li @click="contentSelectFc(item)" :class="{'active':item.id==$route.query.id}"
            v-for="(item,index) in contentNav" :key=index>
          <a>{{item.title}}</a>
        </li>
      </ul>
    </div>
    <div class="rules-container-text">
      <KSSC v-if="$route.query.id==12"></KSSC>
      <SFSC v-if="$route.query.id==13"></SFSC>
      <BJPK10 v-if="$route.query.id==2"></BJPK10>
      <XYFT v-if="$route.query.id==3"></XYFT>
    </div>
  </div>
</template>
<script>
  import BJPK10 from './child/BJPK10'
  import SFSC from './child/SFSC'
  import KSSC from './child/KSSC'
  import XYFT from './child/XYFT'

  export default {
    data () {
      return {
        contentNav: [
          {title: '快速赛车', id: '12'},
          {title: '三分赛车', id: '13'},
          {title: '北京PK10', id: '2'},
          {title: '幸运飞艇', id: '3'}
        ]
      }
    },
    components: {BJPK10, SFSC, KSSC, XYFT},
    methods: {
      contentSelectFc (item) {
        this.$router.push({
          path: `/rules/pk10`,
          query: {
            id: item.id
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @active-color: #ff0000;
  .rules-container-header {
    height: 63px;
    border-bottom: 1px solid #e4e0e0;
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
            color: #ff6600;
            // line-height: 60px;
          }
        }
        &.active {
          border-bottom: 3px solid #ff6600;
          a {
            color: #ff6600;
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
  }
</style>
