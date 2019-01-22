<template>
<!--  -->
  <div v-if="loadingShow"  class="Myloading2"  >
    <div class="loading-content">
        <div class="wrap">
          <div class="loading-container visible active">
            <div class="loading">
                <div class="loading-page spinner spinner-ios">
                    <svg viewBox="0 0 64 64">
                        <g stroke-width="4" stroke-linecap="round">
                            <line y1="17" y2="29" transform="translate(32,32) rotate(180)">
                                <animate attributeName="stroke-opacity" dur="750ms" values="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1" repeatCount="indefinite"></animate>
                            </line>
                            <line y1="17" y2="29" transform="translate(32,32) rotate(210)">
                                <animate attributeName="stroke-opacity" dur="750ms" values="0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0" repeatCount="indefinite"></animate>
                            </line>
                            <line y1="17" y2="29" transform="translate(32,32) rotate(240)">
                                <animate attributeName="stroke-opacity" dur="750ms" values=".1;0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1" repeatCount="indefinite"></animate>
                            </line>
                            <line y1="17" y2="29" transform="translate(32,32) rotate(270)">
                                <animate attributeName="stroke-opacity" dur="750ms" values=".15;.1;0;1;.85;.7;.65;.55;.45;.35;.25;.15" repeatCount="indefinite"></animate>
                            </line>
                            <line y1="17" y2="29" transform="translate(32,32) rotate(300)">
                                <animate attributeName="stroke-opacity" dur="750ms" values=".25;.15;.1;0;1;.85;.7;.65;.55;.45;.35;.25" repeatCount="indefinite"></animate>
                            </line>
                            <line y1="17" y2="29" transform="translate(32,32) rotate(330)">
                                <animate attributeName="stroke-opacity" dur="750ms" values=".35;.25;.15;.1;0;1;.85;.7;.65;.55;.45;.35" repeatCount="indefinite"></animate>
                            </line>
                            <line y1="17" y2="29" transform="translate(32,32) rotate(0)">
                                <animate attributeName="stroke-opacity" dur="750ms" values=".45;.35;.25;.15;.1;0;1;.85;.7;.65;.55;.45" repeatCount="indefinite"></animate>
                            </line>
                            <line y1="17" y2="29" transform="translate(32,32) rotate(30)">
                                <animate attributeName="stroke-opacity" dur="750ms" values=".55;.45;.35;.25;.15;.1;0;1;.85;.7;.65;.55" repeatCount="indefinite"></animate>
                            </line>
                            <line y1="17" y2="29" transform="translate(32,32) rotate(60)">
                                <animate attributeName="stroke-opacity" dur="750ms" values=".65;.55;.45;.35;.25;.15;.1;0;1;.85;.7;.65" repeatCount="indefinite"></animate>
                            </line>
                            <line y1="17" y2="29" transform="translate(32,32) rotate(90)">
                                <animate attributeName="stroke-opacity" dur="750ms" values=".7;.65;.55;.45;.35;.25;.15;.1;0;1;.85;.7" repeatCount="indefinite"></animate>
                            </line>
                            <line y1="17" y2="29" transform="translate(32,32) rotate(120)">
                                <animate attributeName="stroke-opacity" dur="750ms" values=".85;.7;.65;.55;.45;.35;.25;.15;.1;0;1;.85" repeatCount="indefinite"></animate>
                            </line>
                            <line y1="17" y2="29" transform="translate(32,32) rotate(150)">
                                <animate attributeName="stroke-opacity" dur="750ms" values="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1" repeatCount="indefinite"></animate>
                            </line>
                        </g>
                    </svg>
                </div>
                <p>加载中</p>
            </div>
          </div>   
          
        </div>
    </div> 
      
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadingShow: false
    };
  }
};
</script>
<style lang="less" scoped rel="stylesheet/less">
.Myloading2{
    z-index:999;
    position: fixed;
    left: 0;
    top: .88rem; 
    width: 100%;
    height: 100%;  
  .loading-container {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 13;
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -moz-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      -moz-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      -moz-align-items: center;
      align-items: center;
      -webkit-transition: 0.2s opacity linear;
      transition: 0.2s opacity linear;
      visibility: hidden;
      opacity: 0;
  }
  .loading-container:not(.visible) .spinner {
      display: none;
  }
  .loading-container.visible {
      visibility: visible;
  }
  .loading-container.active {
      opacity: 1;
  }
  .loading-container .loading {
      position: relative;
      margin-top: -.82rem;
      padding: .4rem;
      border-radius: .1rem;
      color: #fff;
      text-align: center;
      text-overflow: ellipsis;
      font-size: .3rem;
      background-color: rgba(0, 0, 0, 0.5);
      p{
        padding-top: .08rem;
        font-size: .28rem;
      }
  }
  .spinner svg {
      width: .56rem;
      height: .56rem;
  }
  .spinner-ios{
    // stroke: #69717d;
    stroke: #eee;
  }
  .loading-page svg {
      width: .48rem;
      height: .48rem;
  }
}

</style>
