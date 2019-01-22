<template>
  <div class="mui-content">
    <!-- 阴影 -->
    <div class="mui-wrapper" id="mui-wrapper" @click="colorPickerHide"></div>
    <!-- 内容 -->

    <div class="actionsheet animated  fadeInUp" id="actionsheet">
      <div class="tcMark">
        <ul class="table-view">
          <li class="table-view-cell" v-for="(item,index) in colorData" :key="index" @click="toggleColor(item.code)">
            <a class="navigate">
              <span class="color-inlineblock" :style="{background:item.color}"></span>
              <i class="innerText">{{item.title}}</i>
              <i class="icon iconfont h5-icon-changeskin-icon text-color" v-if="item.code == localStorageColor"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        colorData: [
          {color: '#5f8ff2', title: '冰川蓝', code: 'a'},
          {color: '#ed742e', title: '旺旺红', code: 'b'},
          {color: '#8c19ff', title: '高贵紫', code: 'c'},
          {color: '#0ACA00', title: '草原绿', code: 'd'},
          {color: '#ff1a18', title: '法拉利红', code: 'e'},
          {color: '#f7ab00', title: '土豪金', code: 'f'},
          {color: '#000', title: '夜间模式', code: 'g'}
        ]
      }
    },
    methods: {
      colorPickerHide () {
        document.getElementById('mui-wrapper').style.display = 'none'
        document.getElementById('actionsheet').className =
          'actionsheet animated  fadeOutDown'
        setTimeout(() => {
          this.$emit('colorPickerHide', false)
        }, 500)
      },
      toggleColor (code) {
        localStorage.toggleColor = code
        document.getElementById('h5app').className = 'theme' + code
        document.getElementById('mui-wrapper').style.display = 'none'
        document.getElementById('actionsheet').className =
          'actionsheet animated  fadeOutDown'
        this.$emit('colorPickerHide', false)
      }
    },
    computed: {
      localStorageColor () {
        if (localStorage.toggleColor) return localStorage.toggleColor
        return 'a'
      }
    }
  }
</script>

<style lang="less" scoped>
  .mui-content {
    flex: 1;
    background: #f5f6f7;
    user-select: none;
    overflow: hidden;
    pointer-events: auto;
    .mui-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #000;
      opacity: 0.5;
      z-index: 200;
    }
    .actionsheet {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      background-color: #efefef;
      z-index: 200;
      display: flex;
      flex-direction: column;
      .tcMark {
        // padding: 0.24rem 0;
        .table-view {
          position: relative;
          margin-top: 0;
          margin-bottom: 0;
          padding-left: 0;
          list-style: none;
          background-color: #fff;
          .table-view-cell {
            position: relative;
            overflow: hidden;
            padding: 10px 15px;
            padding-right: 65px;
            &::after {
              position: absolute;
              right: 0;
              bottom: 0;
              left: 15px;
              height: 1px;
              content: "";
              transform: scaleY(0.5);
              background-color: #f5f5f5;
            }
            .navigate {
              position: relative;
              display: block;
              overflow: hidden;
              margin: -11px -15px;
              padding: inherit;
              white-space: nowrap;
              text-overflow: ellipsis;
              text-align: left;
              margin-right: -65px;
              color: rgb(44, 62, 80);
              .color-inlineblock {
                display: inline-block;
                width: 0.4rem;
                height: 0.4rem;
                border-radius: 50%;
                //   background: #19b4f5;
              }
              .innerText {
                font-size: 0.24rem;
                vertical-align: 5px;
                margin-left: 0.2rem;
              }
              .text-color {
                position: absolute;
                right: 0.32rem;
                top: 0.28rem;
                font-size: 0.3rem;
              }
            }
          }
        }
      }
    }
    .animated {
      animation-duration: 0.5s;
    }
  }
</style>
