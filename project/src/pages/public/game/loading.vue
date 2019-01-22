<template>
  <div class="container">
    <div class="loading-container visible active">
      <!-- {{$route.query.name}} -->
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
        </div>
    </div>
  </div>
</template>

<script>
import mixin from "./pubilc.js"
export default {
  mixins: [mixin],
  data() {
    return {

    };
  },
  methods: {
    async getParam(){             
      let res=await  this.$http.post(`${this.$HOST_NAME}/games/index`,{
        classId:this.$route.query.classId,
        platform:this.$route.query.parent
      });
      if(res&&res.code==200){
        this.tryPlay(res.data);
      }else{
        
        window.close();
      }      
    },
  },

  created: function() {
  },
  beforeDestroy() {
  },
  mounted() {
    if(this.$route.query.login){
      this.tryPlay({gameName:this.$route.query.gameName,platform:this.$route.query.platform});
    }else{
      this.getParam();
    }
    
  },
  components: {
  },
};
</script>

<style lang="less" scoped>
    img{
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 9999;
        margin-left: -199px;
        margin-top: -135px;
    }
    .loading-container {
        position: absolute;
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
        padding: 20px;
        border-radius: 5px;
        color: #fff;
        text-align: center;
        text-overflow: ellipsis;
        font-size: 15px;
    }
    .spinner svg {
        width: 28px;
        height: 28px;
    }
    .spinner-ios{
        stroke: #69717d;
    }
    .loading-page svg {
        width: 24px;
        height: 24px;
    }      
</style>
