<template>
    <div class="safety-problem">
       


             <div class="old-mibao" v-if="this.$store.state.mainState.userinfo.secret">
                     <div class="title">
                         请回答原密保问题
                     </div>

                       <div class="content">
                              <div class="row">
                                        {{this.$store.state.mainState.userinfo.secret}}
                                </div>
                                <div class="row">
                              <!-- <van-cell-group>
                                <van-field  placeholder="请输入原密保答案" type="password" />
                             </van-cell-group> -->
                             <input placeholder="请输入原密保答案" v-model="value" type="text" >
                                </div>
                       </div>
             </div>
   

               <div class="new-mibao">
                       <div class="title">
                         请选择新密保问题
                     </div>

                       <div class="content">
                              <div class="row">
                                <cube-select :options="secretData" v-model="newKey"></cube-select>
                                </div>
                                <div class="row">
                              <!-- <van-cell-group>
                                <van-field  placeholder="请输入原密保答案" type="password" />
                             </van-cell-group> -->
                             <input placeholder="请输入新密保答案" v-model="newValue" type="text">
                                </div>
                       </div>
               </div>

      

                   <div class="attention">

                           <p>注意事项：</p>

                            <div>
                                 1、请牢记密保答案，如果忘记密保问题，请联系在线客服找回！
                            </div>
                   </div>


                   <div class="sumbit" @click="setMibao">
                        修改信息
                   </div>
                  

    </div>
</template>

<script>
import UserService from "@/service/public/UserService.js";
import store from "@/vuex/store";
export default {
  data() {
    return {
      secretData: [],
      value: "",
      newKey: "",
      newValue: ""
    };
  },
  methods: {
    secretKey() {
      this.$http.post(`${this.$HOST_NAME}/member/secretKey`).then(res => {
        if (res.code == 200) {
          this.secretData = res.data;
        } else {
          
        }
      });
    },
    setMibao() {
      let param = {};
      if (this.$store.state.mainState.userinfo.secret) {
        param.key = this.$store.state.mainState.userinfo.secret;

        param.value = this.value;
        if (!param.value) {
          this.$newToast("请输入原密保答案");
          return false;
        }
        param.newKey = this.newKey;
        if (!param.newKey) {
          this.$newToast("请选择新密保问题");
          return false;
        }
        param.newValue = this.newValue;
        if (!param.newValue) {
          this.$newToast("请输入新密保答案");
          return false;
        }
      } else {
        param.key = this.newKey;
        if (!param.key) {
          this.$newToast("请选择密保答案");
          return false;
        }
        param.value = this.newValue;
        if (!param.value) {
          this.$newToast("请输入密保答案");
          return false;
        }
      }
      this.$http.post(`${this.$HOST_NAME}/member/secret`, param).then(res => {
        if (res.code == 200) {
          // this.$confirm("设置成功");
          this.$toast.success("设置成功");
          this.value = "";
          this.newKey = "";
          this.newValue = "";
          UserService.vpGetBasicInfo.call(this);
        } else {
          // this.$errToast(res.message);
          
        }
      });
    }
  },
  created() {
    this.secretKey();
  },
  store
};
</script>

<style lang="less" scoped>
.safety-problem {
  .old-mibao {
    .title {
      height: 0.64rem;
      background: #f1f1f1;
      font-size: 0.3rem;
      color: #000;
      padding: 0.1rem 0.24rem;
    }
    .content {
      background: #fff;
      padding: 0 0.2rem;
      .row {
        height: 1rem;
        line-height: 1rem;
        border-bottom: 1px solid #dbdbdb;
        padding: 0 0.1rem;
        font-size: 0.28rem;
        color: #333;
        overflow: hidden;
        input {
          font-size: 0.28rem;
          color: #333;
          height: 0.4rem;
          line-height: 0.4rem;
        }
      }
      .row:last-child {
        border-bottom: none;
      }
    }
  }
  .new-mibao {
    .title {
      height: 0.84rem;
      background: #f1f1f1;
      font-size: 0.3rem;
      color: #000;
      padding: 0 0.24rem;
      line-height: 0.84rem;
    }
    .content {
      background: #fff;
      padding: 0 0.2rem;
      .row {
        height: 1rem;
        line-height: 1rem;
        border-bottom: 1px solid #dbdbdb;
        padding: 0 0.1rem;
        font-size: 0.28rem;
        color: #333;
        position: relative;
        overflow: hidden;
        input {
          font-size: 0.28rem;
          color: #333;
          height: 0.4rem;
          line-height: 0.4rem;
        }
        .cube-select {
          padding: 0.1rem 0.4rem 0.2rem 0.2rem;
          border-radius: 0.04rem;
          font-size: 0.28rem;
          height: 0.9rem;
          line-height: 0.9rem;
          width: 100%;
          position: absolute;
          top: 0;
          right: 0.1rem;
          .cube-select-placeholder {
            display: none;
          }
          .cube-select-text {
            color: #000;
          }
        }
        .cube-select::after {
          border: none;
        }
      }
      .row:last-child {
        border-bottom: none;
      }
    }
  }

  .attention {
    padding: 0.25rem 0.3rem 0.35rem 0.3rem;
    p {
      font-size: 0.3rem;
      color: #ff0000;
      padding-bottom: 0.22rem;
    }
    div {
      font-size: 0.24rem;
      color: #999999;
      line-height: 0.4rem;
    }
  }
  .sumbit {
    margin: 0 0.2rem;
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: center;
    color: #fff;
    border-radius: 0.15rem;
    background: linear-gradient(90deg, #ff5000, #ff8e00);
    font-size: 0.36rem;
  }
}
</style>
