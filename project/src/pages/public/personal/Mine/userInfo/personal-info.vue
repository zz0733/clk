<template>
<div class="home">
  <div class="set-list">
    <div class="portrait">
      <span>头像</span>
      <img :src="this.$store.state.mainState.userinfo.pic|capitalize" alt="" @click="show = true">
      <i class="fr cubeic-arrow" @click="show = true"></i>
    </div>
    <div class="row">
      <span>姓名</span>
      <span class="fr">{{this.$store.state.mainState.userinfo.realName||'暂无设置'}}</span>
    </div>
    <div class="row">
      <span>账户名</span>
      <span class="fr">{{this.$store.state.mainState.userinfo.userName}}</span>
    </div>
  </div>

  <div class="infoSetList">
    <div class="row">
      <span>资金密码</span>
      <div @click="goSetInfo('/personal_index/safety')" class="fr">
        <span>{{ this.$store.state.mainState.userinfo.payPassword == "set"?"已设置":"暂无设置"}}</span>
        <i class="fr cubeic-arrow"></i>
      </div>
    </div>
    <div class="row">
      <span>手机号</span>
      <div @click="goSetInfo('/set_info?msg=手机')" class="fr">
        <span>
          {{this.$store.state.mainState.userinfo.phone?'-*****':"暂无设置"}}
          </span>
        <i class="fr cubeic-arrow"></i>
      </div>
    </div>
    <div class="row">
      <span>银行卡资料</span>
      <router-link tag="div" to="/personal_index/bank_account" class="fr">
        <span>{{ this.$store.state.mainState.userinfo.cardNum == "set"?"已设置":"暂无设置"}}</span>
        <i class="fr cubeic-arrow"></i>
      </router-link>
    </div>
    <div class="row">
      <span>邮箱账号</span>
      <div @click="goSetInfo('/set_info?msg=邮箱')" class="fr">
        <span>
          {{this.$store.state.mainState.userinfo.email?'-*****':"暂无设置"}}            
          </span>
        <i class="fr cubeic-arrow"></i>
      </div>
    </div>
    <div class="row">
      <span>微信账号</span>
      <div @click="goSetInfo('/set_info?msg=微信')" class="fr">
        <span class="wechat-name">
            {{this.$store.state.mainState.userinfo.wechat?'-*****':"暂无设置"}}             
          </span>
        <i class="fr cubeic-arrow"></i>
      </div>
    </div>
  </div>

  <div class="loginout" @click="exit">
    <span class="logout-text">安全退出</span>
  </div>

  <!-- 设置头像 -->
  <van-actionsheet v-model="show" class="portraitImg">
    <div class="imgList clearfloat" ref="imgList" v-swipeleft="swipeleft" v-swiperight="swiperight">
      <img :src="item|capitalize" alt="" v-for="(item,i) in portraitList" :key="i" @click="toggleImg(i,item)" :class="{imgActive:imgActive===i}">
    </div>
    <div class="pulley">
      <span v-for="(item,i) in 3" :key="i" @click="toggle(i)" :class="{spanActive:spanActive===i}"></span>
    </div>
    <div class="notarize" @click="updataImg">
      确认
    </div>
  </van-actionsheet>

  <!-- 修改交易密码 -->
  <div class="keyboard" v-if="showKeyboard">
    <div class="title">
      <i class="cubeic-close fl" @click="showKeyboard = false"></i> 请设置资金密码
      <span class="fr" @click="submitPay">完成</span>
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
import store from "@/vuex/store";
import UserService from "@/service/public/UserService.js";
import touch from "@/service/public/perosonal/touch";
export default {
  data() {
    return {
      show: false,
      portraitList: [],
      spanActive: 0,
      imgActive: 0,
      pic: "photo1.png",
      x: 1,
      showKeyboard: false,
      value: ""
    };
  },
  methods: {
    toggle(i) {
      this.spanActive = i;
      let x = 0;
      if (i == 1) {
        x = 33;
      } else if (i == 2) {
        x = 66;
      }
      this.$refs.imgList.style.transition = "all 1s";
      this.$refs.imgList.style.transform = `translateX(-${x}%)`;
    },
    // 设置头像左滑
    swipeleft() {
      let x = 33 * this.x;
      this.$refs.imgList.style.transition = "all 1s";
      this.$refs.imgList.style.transform = `translateX(-${x}%)`;
      this.spanActive = this.x;
      this.x++;
      if (this.x > 2) {
        this.x = 2;
      }
    },
    // 设置头像右滑
    swiperight() {
      let x = 33 * this.x - 33;
      this.$refs.imgList.style.transition = "all 1s";
      this.$refs.imgList.style.transform = `translateX(-${x}%)`;
      this.x--;
      if (this.x < 0) {
        this.x = 0;
      }
      this.spanActive = this.x;
    },
    // 切换头像图片
    toggleImg(i, item) {
      this.imgActive = i;
      this.pic = item;
    },
    // 修改头像
    updataImg() {
      this.$http
        .post(`${this.$HOST_NAME}/member/pic`, {
          pic: this.pic
        })
        .then(res => {
          if (res && res.code == 200) {
            this.show = false;
            this.$toast.success("修改成功");
            UserService.vpGetBasicInfo.call(this);
          }else{
             this.show = false;
          }
        });
    },
    // 安全退出
    exit() {
      UserService.logout.call(this);
      this.$router.push("/");
      this.$newToast("退出成功");
    },

    goSetInfo(link) {
      if (localStorage.getItem("Public_User") == "test") {
        this.$newToast("试玩用户无权限，请注册正式用户");
      } else {
        if (this.$store.state.mainState.userinfo.payPassword == "set") {
          this.$router.push(link);
        } else {
          if (link == "/personal_index/safety") {
            this.showKeyboard = true;
          } else {
            this.$newToast("请先设置资金密码");
          }
        }
      }
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    // 设置交易密码
    submitPay() {
      this.$http
        .post(`${this.$HOST_NAME}/member/resetMember`, {
          payPassword: this.value
        })
        .then(res => {
          if (res.code == 200) {
            this.showKeyboard = false;
            this.value = "";
            UserService.vpGetBasicInfo.call(this);
            // this.$confirm("设置成功");
            this.$toast.success("设置成功");
          } else {
            // this.$errToast(res.message);
          }
        });
    }
  },
  created() {
    for (var i = 0; i < 24; i++) {
      this.portraitList[i] = `photo${i + 1}.png`;
      // this.portraitList[12 + i] = `photo${i + 1}.png`;
    }
  },
  filters: {
    capitalize: function(value) {
      try {
        return require(`../../../../../assets/img/public/image/common/personal/proimt/${value}`);
      } catch (err) {
        return require(`../../../../../assets/img/public/image/common/personal/proimt/默认.png`);
      }
    }
  },
  store
};
</script>

<style lang="less" scoped>
.van-actionsheet {
  position: absolute;
}

.van-hairline--bottom:after {
  border-bottom: none;
}

.home {
  height: 100%;
  .set-list {
    padding: 0 0.24rem;
    background: #fff;
    .portrait {
      height: 1.28rem;
      line-height: 1.28rem;
      border-bottom: 1px solid #f5f5f5;
      font-size: 0.33rem;
      color: #333;
      position: relative;
      img {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        position: absolute;
        top: 0.24rem;
        right: 0.36rem;
      }
      i {
        font-size: 0.3rem;
        color: #aaa;
      }
    }
    .row {
      height: 1rem;
      line-height: 1rem;
      border-bottom: 1px solid #f5f5f5;
      font-size: 0.33rem;
      color: #333;
      padding-right: 0.36rem;
      span:nth-child(2) {
        color: #999;
      }
    }
    .row:nth-child(3) {
      border-bottom: none;
    }
  }
  .infoSetList {
    padding: 0 0.24rem;
    background: #fff;
    margin-top: 0.2rem;
    .row {
      height: 1rem;
      line-height: 1rem;
      border-bottom: 1px solid #f5f5f5;
      font-size: 0.33rem;
      color: #333;
      position: relative;
      div {
        span {
          color: #999;
        }
        i {
          font-size: 0.3rem;
          color: #999;
        }
      }
    }
  }
  .loginout {
    height: 0.9rem;
    line-height: 0.9rem;
    margin: 0.3rem 0.2rem;
    background: linear-gradient(90deg, #ff5100, #ff8e00);
    color: #fff;
    text-align: center;
    font-size: 0.36rem;
    border-radius: 0.15rem;
    .logout-text {
      width: 100%;
      display: inline-block;
    }
  }
  .portraitImg {
    padding: 0.22rem 0.16rem;
    overflow: hidden;
    .imgList {
      width: 300%;
      // transform: translateX(-31.5%);
      img {
        width: 1.3rem;
        margin: 0 0.24rem 0.3rem 0.24rem;
        display: block;
        float: left;
        border-radius: 50%;
      }
      img:nth-child(12) {
        width: 1.3rem;
      }
      .imgActive {
        border: 0.05rem solid #f60;
        border-radius: 50%;
        width: 1.2rem;
      }
    }
    .pulley {
      text-align: center;
      span {
        display: inline-block;
        width: 0.4rem;
        height: 0.06rem;
        background: #ddd;
        margin: 0 0.03rem;
        border-radius: 0.03rem;
      }
      .spanActive {
        background: #666;
      }
    }
    .notarize {
      background: linear-gradient(90deg, #ff8e00, #ff5100);
      height: 0.92rem;
      line-height: 0.92rem;
      font-size: 0.36rem;
      color: #fff;
      text-align: center;
      margin-top: 0.2rem;
      border-radius: 0.15rem;
    }
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
  .wechat-name {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 200px;
    text-align: right;
  }
}
</style>
