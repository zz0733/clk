<template>
  <div class="bank-account">
    <!--未绑定银行卡  -->
    <div class="noSet-bank" v-if="this.$store.state.mainState.userinfo.cardNum !=='set'">
      <div class="logo">
        <img src="../../../../../assets/img/public/image/common/personal/userInfo/no-bank.png" alt="">
        <p>未绑定银行卡</p>
      </div>
      <div class="setbank" @click="goSetBank">
        <p>添加银行卡</p>
        <span class="cubeic-arrow"></span>
      </div>

    </div>
    <!-- 银行卡 -->
    <div v-else class="bank-info">
      <cube-scroll>
        <div class="row" v-for="(item,i) in bankData" :key="i" @click="selectBank(item)"
             :style="{backgroundImage: 'url(' + item.imgUrl + ')', backgroundSize:'cover'}">
          <div class="bank-name">
            <label></label>
            <span>
                      {{item.bankName}}
                      </span>
          </div>
          <div class="bank-num">
            {{item.cardNum}}
          </div>
        </div>

        <div class="setbank" @click="goSetBank">
          <p>添加银行卡</p>
          <span class="cubeic-arrow"></span>
        </div>
        <div style="height:.3rem;">

        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
  import store from '@/vuex/store'

  export default {
    data () {
      return {
        bankData: []
      }
    },
    methods: {
      //  获取银行卡
      getBank () {
        this.$http.post(`${this.$HOST_NAME}/member/bank`).then(res => {
          if (res && res.code == 200) {
            res.data.forEach(v => {
              v.cardNum = v.cardNum
                .replace(/\s/g, '  ')
                .replace(/(.{4})/g, '$1 ')

              try {
                v.imgUrl = require(`../../../../../assets/img/public/image/common/personal/bank/${
                  v.bankName
                  }.png`)
              } catch (err) {
                v.imgUrl = require(`../../../../../assets/img/public/image/common/personal/bank/no-bank.png`)
              }
            })

            localStorage.bankData = JSON.stringify(res.data)
            this.bankData = JSON.parse(localStorage.bankData)
            this.$loading(false)
          } else {
            this.$loading(false)
          }
        })
      },
      // 跳去设置银行卡
      goSetBank () {
        this.$router.push('/personal_index/set_bank')
      },
      // 判断用户如果是从取款页面进来，可以选择银行卡。
      selectBank (bank) {
        if (this.$route.query.id == '2') {
          bank.cardNum = bank.cardNum.substr(bank.cardNum.length - 5)
          bank.cardNum = bank.cardNum.replace(/\s/g, '')
          localStorage.selectBank = JSON.stringify(bank)
          this.$router.push('/personal_index/get_money')
        }
      }
    },
    created () {
      this.$nextTick(() => {
        this.$loading(true)
        if (localStorage.bankData) {
          this.bankData = JSON.parse(localStorage.bankData)
          this.$loading(false)
        } else {
          this.getBank()
        }
      })
      // this.getBank();
    },
    store,
    destroyed () {
      this.$loading(false)
    }
  }
</script>

<style lang="less" scoped>
  .bank-account {
    padding-top: .25rem;
    height: 92%;
    .noSet-bank {
      .logo {
        height: 4.25rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        flex-direction: column;
        img {
          width: 1.7rem;
        }
        p {
          margin-top: 0.34rem;
          font-size: 0.3rem;
          color: #898989;
        }
      }
      .setbank {
        height: 1rem;
        line-height: 1rem;
        background: #fff;
        padding-left: 0.6rem;
        position: relative;
        p {
          font-size: 0.3rem;
          color: #000;
          font-weight: 400;
        }
        span {
          font-size: 0.3rem;
          color: #aaa;
          position: absolute;
          right: 0.3rem;
          top: 0;
        }
      }
    }

    .bank-info {
      height: 100%;
      .row {
        margin: 0 0.2rem;
        margin-bottom: 0.25rem;
        height: 2.5rem;
        background: #fe6155;
        border-radius: 0.15rem;
        .bank-name {
          padding-top: 0.2rem;
          padding-left: 0.2rem;
          label {
            display: inline-block;
            width: 0.7rem;
            height: 0.7rem;
            border-radius: 50%;
            vertical-align: middle;
            background: #fff;
            opacity: 0;
          }
          span {
            margin-left: 0.2rem;
            font-size: 0.3rem;
            color: #fff;
            vertical-align: middle;
          }
        }
        .bank-num {
          margin-top: 0.4rem;
          font-size: 0.46rem;
          color: #fff;
          text-align: center;
        }
      }
      .setbank {
        height: 1rem;
        line-height: 1rem;
        background: #fff;
        padding-left: 0.6rem;
        position: relative;
        p {
          font-size: 0.3rem;
          color: #000;
          font-weight: 400;
        }
        span {
          font-size: 0.3rem;
          color: #aaa;
          position: absolute;
          right: 0.3rem;
          top: 0;
        }
      }
    }
  }
</style>
