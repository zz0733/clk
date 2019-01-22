<template>
  <div class="sent">     
    <cube-input type="text" placeholder="请输入标题" v-model="title"></cube-input>
    <textarea placeholder="请输入您具体信息描述" v-model="content"></textarea>
    <div class="submit" @click="messageSubmit">
        提交信息
    </div>     
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      content: ""
    };
  },
  methods: {
    messageSubmit() {

         if(!this.title){
             this.$newToast("请输入信息标题");
             return false;
         }
           if(!this.content){
             this.$newToast("请输入信息内容");
             return false;
         }
       
      this.$http
        .post(`${this.$HOST_NAME}/member/messageSubmit`, {
          title: this.title,
          content: this.content
        })
        .then(res => {
          if (res.code == 200) {
            this.$toast.success(res.data);
            this.title = '';
            this.content = ''; 
          } else {
            this.$errToast(res.message);
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
.sent {
  margin-top: 0.15rem;
  text-align: center;
  padding:0 .2rem;
   
  input {
    width: 100%;
    height: 0.82rem;
    line-height: 0.82rem;
    border: 1px solid #dbdbdb;
    font-size: 0.28rem;
    color: #666;
    text-indent: 0.3rem;
    outline: none;
    -webkit-appearance: none;   
  }
  textarea {
    height: 3.2rem;
    width: 96%;
    border: 1px solid #dbdbdb;
    margin-top: 0.2rem;
    padding: .1rem;
    // text-indent: 0.3rem;
    // padding-left: 0.3rem;
    padding-top: 0.2rem;
    font-size: 0.28rem;
    color: #666;
    outline: none;
    -webkit-appearance: none;
  }
  textarea::-webkit-input-placeholder {
    color: #ccc;
  }
  textarea::-moz-placeholder {
    color: #ccc;
  }
  textarea:-ms-input-placeholder {
    color: #ccc;
  }   
  .submit {
    margin: 0 0.2rem;
    margin-top: 0.32rem;
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: center;
    color: #fff;
    font-size: 0.36rem;
    border-radius: 0.15rem;
    background: linear-gradient(90deg, #ff5200, #fd9000);
  }
}
</style>
