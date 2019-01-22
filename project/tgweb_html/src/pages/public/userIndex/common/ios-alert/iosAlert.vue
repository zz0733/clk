<template>
     <div class="ios-alert">
          <div class="alert-wrapper"></div>
          <div class="ios-popup  animated fadeIn">
               <div class="popup-inner ">
                    <!-- <div class="popup-title">提示</div> -->
                    <div class="popup-text">{{title}}</div>
               </div>
               <div class="popup-buttons">
                  <span class="popup-button text-color  " @click="cancel">
                        取消
                  </span>
                  <span class="popup-button-bold text-color  " @click="sure">
                        确认
                  </span>
               </div>
          </div>
     </div>
</template>

<script>
export default {
   props:{
     title:{
        type:String
     },
     cancel:{
       type:Function
     },
     sure:{
       type:Function
     }
   }
};
</script>

<style lang="less" scoped>
.ios-alert {
  flex: 1;
  background: #f5f6f7;
  user-select: none;
  overflow: hidden;
  pointer-events: auto;
  .alert-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.5;
    z-index: 101;
  }
  .ios-popup {
    position: fixed;
    z-index: 10000;
    top: 50%;
    left: 50%;
    overflow: hidden;
    width: 270px;
    text-align: center;
    color: #000;
    border-radius: 13px;
    transform: translate3d(-50%, -50%, 0) scale(1);
    opacity: 1;
    transition-property: transform, opacity;
    .popup-inner {
      position: relative;
      padding: 20px;
      border-radius: 13px 13px 0 0;
      background: rgba(255, 255, 255, 0.95);
      &::after {
        position: absolute;
        z-index: 15;
        top: auto;
        right: auto;
        bottom: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 1px;
        content: "";
        transform: scaleY(0.5);
        transform-origin: 50% 100%;
        background-color: rgba(0, 0, 0, 0.2);
      }
      .popup-title {
        font-size: 18px;
        font-weight: 500;
        text-align: center;
      }
      .popup-text {
        font-size: 16px;
        margin: 5px 0 0;
      }
    }
    .popup-buttons {
      position: relative;
      display: flex;
      height: 44px;
      justify-content: center;
      .popup-button {
        font-size: 17px;
        line-height: 44px;
        position: relative;
        display: block;
        overflow: hidden;
        box-sizing: border-box;
        width: 100%;
        height: 44px;
        padding: 0 5px;
        cursor: pointer;
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        // color: #007aff;
        background: rgba(255, 255, 255, 0.95);
        &::after {
          position: absolute;
          z-index: 15;
          top: 0;
          right: 0;
          bottom: auto;
          left: auto;
          display: block;
          width: 1px;
          height: 100%;
          content: "";
          transform: scaleX(0.5);
          transform-origin: 100% 50%;
          background-color: rgba(0, 0, 0, 0.2);
        }
      }
      .popup-button-bold {
        font-size: 17px;
        line-height: 44px;
        position: relative;
        display: block;
        overflow: hidden;
        box-sizing: border-box;
        width: 100%;
        height: 44px;
        padding: 0 5px;
        cursor: pointer;
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        // color: #007aff;
        background: rgba(255, 255, 255, 0.95);
        -webkit-box-flex: 1;
        border-radius: 0 0 13px;
      }
    }
  }
}
</style>
