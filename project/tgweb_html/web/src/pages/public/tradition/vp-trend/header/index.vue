<template>
  <div class="vp-trend-header">
    <nav class="vp-trend-nav">
      <ul>
        <li @click="trendSelectFc(item,index)" :class="{'active':item.id==getNavDatas.active}"
            v-for="(item,index) in getNavDatas.list" :key=index>
          <a>{{item.name}}</a>
        </li>
      </ul>
    </nav>
    <div class="vp-trend-navChild">
      <ul :class="{'active':getNavDatas.active=='999'}">
        <div v-if="getNavDatas.active=='999'" class="arrow"></div>
        <div class="title">{{navDatasChi.name}}</div>
        <li @click="trendSelChil(item,index)" :class="{'active':item.id==navDatasChi.active}"
            v-for="(item,index) in navDatasChi.list" :key=index>
          <a>{{item.name}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  // 走势图计算公式：
  // width:(8-1）*40  后面的位置减前面位置乘以每个宽度。
  // height:80,固定不变，如果不是不能画。
  // left:（n-1）*40+0.5*40  当前位置减1加上一半 。
  // top:（n-1）*40+0.5*40  当前行数减1加上一半 。
  import store from '@/vuex/store'

  export default {
    data () {
      return {
        getNavDatas: {
          list: [],
          all: [],
          active: '999'
        },
        navDatasChi: {
          name: '全部彩票',
          list: '',
          active: ''
        },
        childNeed: {}
      }
    },
    methods: {
      // 点击上面导航（父）
      trendSelectFc (item, index) {
        // 选中并让显示名称
        this.getNavDatas.active = item.id
        this.navDatasChi.name = item.name
        // 区分全部和分类
        if (item.id == '999') {
          this.navDatasChi.list = this.getNavDatas.all
          // this.navDatasChi.active=this.navDatasChi.list[0].id;
          // // 向下传
          // this.childNeed=this.navDatasChi.list[0];
          // this.$store.commit('lottery/resetTrend',item.lottery[0]);
          // this.$router.push({
          //     path:`/trend/${this.childNeed.id}`
          // })
        } else {
          this.navDatasChi.list = item.lottery
          this.navDatasChi.active = item.lottery[0].id
          // 向下传（默认第一个）
          this.childNeed = item.lottery[0]
          this.$store.commit('lottery/resetTrend', item.lottery[0])
          this.$router.push({
            path: `/trend/${this.childNeed.id}`
          })
        }
      },
      // 点击子级（子）
      trendSelChil (item, index) {
        // 选中子级样式
        this.navDatasChi.active = item.id
        this.childNeed = item
        this.$store.commit('lottery/resetTrend', item)
        this.$router.push({
          path: `/trend/${this.childNeed.id}`
        })
      },
      // 获取历史数据
      async getNavDatasFc () {
        let res = await this.$http.post(`${this.$HOST_NAME}/games/lottery/category`, {})
        if (res && res.code == 200) {
          res.data.unshift({name: '全部彩票', lottery: [], id: '999'})
          this.getNavDatas.list = res.data
          //  整理全部彩票
          let saveDatas = []
          res.data && res.data.forEach((item) => {
            item && item.lottery.forEach((innerItem) => {
              if (innerItem.devices == 'all' || innerItem.devices == 'pc') {
                saveDatas.push(innerItem)
              }
              //当找到这个路由对应的id时
              if (this.$route.path.split('/trend/')[1] == innerItem.id) {
                // 找到了向下传(父)
                this.childNeed = innerItem
                this.$store.commit('lottery/resetTrend', innerItem)
                //数据传递完毕选选中（父）
                this.getNavDatas.active = item.id
                //刷新时数据(子)
                this.navDatasChi.list = item.lottery
                //选中子类（子）
                this.navDatasChi.active = innerItem.id
              }
            })
          })
          //获得所有彩票列表（并保存在父类上）
          this.getNavDatas.all = saveDatas

          // this.navDatasChi.list=this.getNavDatas.all;
          // this.childNeed=this.navDatasChi.list[0];
          // this.navDatasChi.active=this.childNeed.id;
          // this.$router.push({
          //     path:`/trend/${this.$route.path.split('/trend/')[1]}`,
          // })
          // // 默认
          // this.navDatasChi.active=this.childNeed.id;
        } else {
          // console.log('获取分类失败···')
        }
      }
    },
    watch: {
      // childNeed:{
      //     handler:function(val,oldVal){
      //          this.$store.commit('lottery/resetTrend',val);
      //     },
      //     deep:true
      // }
    },
    created () {
      this.getNavDatasFc()
    },
    computed: {},
    mounted () {
    },
    beforeDestroy () {

    },
    components: {},
    store
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  .vp-trend-header {
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-width: 1400px;
    .vp-trend-nav {
      ul {
        zoom: 1;
        overflow: hidden;
        width: 100%;
        padding: 0;
        margin: 0;
        min-height: 42px;
        background: #f5f5f5;
        border: 1px solid #dadada;
        li {
          float: left;
          padding: 0 21px;
          line-height: 42px;
          cursor: pointer;
          a {
            font-size: 15px;
            color: #515151;
          }
          &.active {
            background: url('/static/public/image/lottery/trend/vp-trend-nav-bg.png');
            a {
              color: #fff;
            }
          }
        }
      }
    }
    .vp-trend-navChild {
      position: relative;
      ul {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        overflow: hidden;
        transition: max-height .3s linear;
        padding-left: 16px;
        background: #fff;
        border: 1px solid #dadada;
        box-shadow: 0 1px 1px #e8e8de;
        border-top: none;
        max-height: 54px;
        min-height: 54px;
        padding-top: 10px;
        .arrow {
          width: 0;
          height: 0;
          border: 6px solid transparent;
          border-top-color: #ff5151;
          position: absolute;
          bottom: -6px;
          left: 50%;
          -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
          cursor: pointer;
          transition: display .3s linear;
        }
        &.active:hover {
          z-index: 1;
          max-height: 150px; //三行
          .arrow {
            display: none;
          }
        }
        .title {
          display: inline-block;
          margin-right: 16px;
          color: #ff5151;
          font-size: 15px;
          line-height: 39px;
        }
        li {
          display: inline-block;
          text-align: center;
          cursor: pointer;
          padding: 0 6px;
          height: 30px;
          line-height: 30px;
          border: 1px solid #dadada;
          border-radius: 4px;
          margin-right: 5px;
          margin-bottom: 10px;
          a {
            font-size: 15px;
            color: #515151;
          }
          &.active {
            border: 1px solid #ff5151;
            a {
              color: #ff5151;
            }
          }
        }
      }
    }
  }


</style>
