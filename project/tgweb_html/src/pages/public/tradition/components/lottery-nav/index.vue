<template>
  <div class="betArea-pubicNav triangle">
    <div class="top">
      <van-tabs className v-model="vanActive" @click="select" class="triangle-van">
        <van-tab :key=index v-for="(item,index) in side.list" :title="item.big">
        </van-tab>
      </van-tabs>
      <div class="ico" @click="showToggle=!showToggle">
        <div :class="{'active':showToggle}"></div>
      </div>
    </div>
    <div @touchmove.prevent ref="bottom" @click="selectBot()" class="bottom" v-show='showToggle'>
      <div class="bottom-nav-box">
        <ul>
          <li @click.stop="selectBot(index,item.big)" :key=index v-for="(item,index) in side.list">
            <div :class="{'active':activeTitle==item.big}" class="item">{{item.big}}</div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    props: ['side', 'sideReady', 'childNeedMess'],
    data () {
      return {
        showToggle: false,
        activeTitle: '',
        vanActive: '3',
        fontSize: 0
      }
    },
    methods: {
      select (index, title) {
        // console.log(this.childNeedMess)
        // if( this.$route.meta.series=='pcdd'){
        //     this.activeTitle=title;
        //     this.$emit('child-say',title);
        // }else{
        this.$emit('child-say', title)
        this.activeTitle = title
        // }
      },
      selectBot (index, title) {
        if (!index && !title) {
          this.showToggle = !this.showToggle
          return false
        }
        this.select(index, title)
        this.vanActive = index
        this.showToggle = !this.showToggle
      }
    },
    created: function () {},
    mounted () {
      //   this.$nextTick(()=>{
      //       this.fontSize=+document.querySelector('html').style.fontSize.split('px')[0]/100;
      //       let clientHeight=window.innerHeight;
      //       let contH=clientHeight-(74+233+88)*this.fontSize;
      //       this.$refs['bottom'].style.height=contH+'px';
      //   })
    },
    components: {},
    // 听封盘
    watch: {
      sideReady: {
        handler: function (val, oldVal) {
          this.select(0, this.side.list[0].big)
        },
        deep: true
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../../assets/less/public/var.less";

  .triangle {
    /deep/ .van-tabs__wrap--scrollable .van-tab span {
      padding: 0;
      width: auto;
      height: 0.64rem;
      padding-left: .24rem;
      padding-right: .24rem;
      line-height: 0.64rem;
    }
    .bottom {
      position: absolute;
      height: 100%;
      width: 100%;
      background: rgba(0, 0, 0, 0.2);
      z-index: 100;
      .bottom-nav-box {
        ul {
          background: #fafafa;
          padding: 0.3rem 0 0 0;
          border-bottom: 2px solid @main-brder-color;
          li {
            width: 25%;
            min-width: 25%;
            max-width: 25%;
            display: inline-block;
            text-align: center;
            height: 0.7rem;
            margin-bottom: 0.3rem;
            line-height: 0.7rem;
            .item {
              display: inline-block;
              min-width: 80%;
              height: 0.7rem;
              line-height: 0.7rem;
              border-radius: 0.05rem;
              font-size: 0.32rem;
              border: 1px solid #dedbd4;
              color: #757575;
              &.active {
                background: #fff;
                border: 1px solid @main-brder-color;
                color: @main-brder-color;
              }
            }
          }
        }
      }
    }
  }
</style>
