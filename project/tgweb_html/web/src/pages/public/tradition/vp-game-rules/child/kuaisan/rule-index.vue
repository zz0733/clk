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
      <JSKS v-if="$route.query.id=='9'"></JSKS>
      <BJKS v-if="$route.query.id=='2900'"></BJKS>
      <GSKS v-if="$route.query.id=='2901'"></GSKS>
      <GXKS v-if="$route.query.id=='2902'"></GXKS>
      <GZKS v-if="$route.query.id=='2903'"></GZKS>
      <HBKS v-if="$route.query.id=='2904'"></HBKS>
      <HuBeiKS v-if="$route.query.id=='2905'"></HuBeiKS>
      <SHKS v-if="$route.query.id=='2906'"></SHKS>
      <AHKS v-if="$route.query.id=='25'"></AHKS>
      <JLKS v-if="$route.query.id=='26'"></JLKS>
      <KSKS v-if="$route.query.id=='27'"></KSKS>
    </div>
  </div>
</template>
<script>
  import JSKS from './child/JSKS'
  import BJKS from './child/BJKS'
  import GSKS from './child/GSKS'
  import GXKS from './child/GXKS'
  import GZKS from './child/GZKS'
  import HBKS from './child/HBKS'
  import HuBeiKS from './child/HuBeiKS'
  import SHKS from './child/SHKS'
  import AHKS from './child/AHKS'
  import JLKS from './child/JLKS'
  import KSKS from './child/KSKS'

  export default {
    data () {
      return {
        contentNav: [
          {title: '江苏快3', id: '9'},
          {title: '北京快3', id: '2900'},
          {title: '甘肃快3', id: '2901'},
          {title: '广西快3', id: '2902'},
          {title: '贵州快3', id: '2903'},
          {title: '河北快3', id: '2904'},
          {title: '湖北快3', id: '2905'},
          {title: '上海快3', id: '2906'},
          {title: '安徽快3', id: '25'},
          {title: '吉林快3', id: '26'},
          {title: '快速快3', id: '27'},
        ]
      }
    },
    components: {
      JSKS,
      BJKS,
      GSKS,
      GXKS,
      GZKS,
      HBKS,
      HuBeiKS,
      SHKS,
      AHKS,
      JLKS,
      KSKS
    },
    watch: {
      $route () {}
    },
    methods: {
      contentSelectFc (item) {
        this.$router.push({
          path: `/rules/k3`,
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
    padding-left: 8px;
    ul {
      li {
        float: left;
        padding: 0 15px;
        cursor: pointer;
        // &:last-child{
        //   padding-right: 0;
        // }
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
