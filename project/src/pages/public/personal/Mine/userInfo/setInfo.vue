<template>
<div class="set-info">
  <div class="header">
    <span class="fl mh5-back" @click="goback"></span>{{newValue?'修改'+title:'设置'+title}}
    <span class="right" @click="showKeyboard =true">确定</span>
  </div>
  <div class="inputVal">
    <van-cell-group>
      <van-field type="text" placeholder="-" v-model="newValue" />

    </van-cell-group>
    <span @click="resetVal">
                                <i class="cubeic-close"></i>
                          </span>
  </div>

  <p>请填写您的{{title}}号</p>


  <div class="keyboard" v-if="showKeyboard">
    <div class="title">
      <i class="cubeic-close fl" @click="showKeyboard = false"></i> 请输入交易密码
      <span class="fr" @click="resetMember">完成</span>
    </div>
    <div class="reminder">
      为了保障您的资金安全，请牢记交易密码
    </div>
    <van-password-input class="pasyworld" :value="value" />
    <van-number-keyboard :show="showKeyboard" class="numberKey" @input="onInput" @delete="onDelete" />
  </div>


</div>
</template>

<script>
import UserService from "@/service/public/UserService.js";
import store from "@/vuex/store";
export default {
  data() {
    return {
      title: this.$route.query.msg,
      showKeyboard: false,
      value: "",
      newValue: "",
      param: {}
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
      this.$loading(false);
    },
    resetVal() {
      this.value = "";
      this.newValue = "";
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    resetMember() {
      // console.log(this.$store.state.mainState.userinfo)
      if (this.$route.query.msg == "手机") {
        this.param.phone = this.newValue == '-*****' ? this.$store.state.mainState.userinfo.phone : this.newValue;
      } else if (this.$route.query.msg == "邮箱") {
        this.param.email = this.newValue == '-*****' ? this.$store.state.mainState.userinfo.email : this.newValue;
        // this.param.email = this.$store.state.mainState.userinfo.email == this.newValue ? '' : this.newValue;
        // this.param.email = this.newValue;
      } else {
        this.param.wechat = this.newValue == '-*****' ? this.$store.state.mainState.userinfo.wechat : this.newValue;
        // this.param.wechat = this.$store.state.mainState.userinfo.wechat == this.newValue ? '' : this.newValue;
        // this.param.wechat = this.newValue;
      }

      this.param.payPassword = this.value;
      this.$http
        .post(`${this.$HOST_NAME}/member/resetMember`, this.param)
        .then(res => {
          if (res.code == 200) {
            // this.$confirm("修改成功");
            this.$toast.success(res.message);
            this.showKeyboard = false;
            this.value = "";
            UserService.vpGetBasicInfo.call(this);
          } else {
            // this.$errToast(res.message);

          }
        });
    }
  },
  created() {
    if (this.$route.query.msg == "手机") {
      this.newValue = this.$store.state.mainState.userinfo.phone ? '-*****' : ''
    } else if (this.$route.query.msg == "邮箱") {
      this.newValue = this.$store.state.mainState.userinfo.email ? '-*****' : '';
    } else {
      this.newValue = this.$store.state.mainState.userinfo.wechat ? '-*****' : '';
    }
  },
  store
};
</script>

<style lang="less" scoped>
.set-info {
  height: 100%;
  background: #f1f1f1;
  .header {
    height: 0.88rem;
    background: linear-gradient(90deg, #ff8e00, #ff5100);
    line-height: 0.88rem;
    text-align: center;
    color: #fff;
    font-size: 0.36rem;
    padding: 0 0.18rem;
    span {
      // font-size: 0.46rem;
    }
    .right {
      float: right;
      font-size: 0.3rem;
    }
  }
  .inputVal {
    position: relative;
    .van-cell {
      padding: 0.2rem 0.3rem;
      line-height: 0.48rem;
      font-size: 0.28rem;
    }
    span {
      width: 0.5rem;
      height: 0.5rem;
      line-height: 0.5rem;
      text-align: center;
      display: inline-block;
      position: absolute;
      right: 0.2rem;
      top: 0.2rem;
      i {
        background: #ccc;
        border-radius: 50%;
        color: #fff;
        font-size: 0.26rem;
      }
    }
  }
  p {
    font-size: 0.26rem;
    color: #999;
    margin-top: 0.4rem;
    padding-left: 0.25rem;
  }
  .keyboard {
    background: #fff;
    margin-top: 2.3rem;
    padding-bottom: 0.1rem;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    .title {
      text-align: center;
      height: 1rem;
      line-height: 1rem;
      font-size: 0.34rem;
      padding: 0 0.3rem;
      span {
        font-size: 0.34rem;
      }
    }
    .reminder {
      height: 1.1rem;
      line-height: 1.1rem;
      text-align: center;
      font-size: 0.3rem;
      border-top: 1px solid #dbdbdb;
    }
    .pasyworld {
      ul {
        li {
          width: 1.14rem;
          height: 1.04rem;
        }
      }
    }
    .numberKey {
      position: initial;
      margin-top: 0.1rem;
      border-top: none;
    }
  }
}
</style>
