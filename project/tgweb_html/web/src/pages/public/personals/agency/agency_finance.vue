<template>
  <div class="apply_agency">
    <!-- <div class="header">
            财务管理
          </div> -->

    <div class="content">
      <div class="search">
        <DatePicker type="daterange" placement="bottom-end" placeholder="选择时间" @on-change="hanlderTime"
                    style="width: 236px;margin-left:25px;"></DatePicker>
        <div class="searchBtn" @click="teamQuery">搜索</div>
      </div>

      <Table :columns="columns" :data="data"
             no-data-text="<div style='margin:100px 0;'><img src='/static/public/image/userImg/no-data.png' alt=''></div>"></Table>
      <!-- 分页 -->
      <div class="page">
        <Page :current="i" v-if="total>0" :total="total" size="small" @on-change="hanlderPage"></Page>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        st: '2018-01-01',
        et: '',
        columns: [{
          title: '用户名',
          key: 'username',
          align: 'center'
        },
          {
            title: '存款',
            key: 'Deposit',
            align: 'center'
          },
          {
            title: '取款',
            key: 'Withdrawals',
            align: 'center'
          },
          {
            title: '用户盈亏',
            key: 'winlossmoney',
            align: 'center'
          },
          {
            title: '优惠',
            key: 'preferential',
            align: 'center'
          }
        ],
        data: [],
        i: 1,
        total: 0
      }
    },
    methods: {
      teamQuery () {
        this.$store.commit('loading', true)
        this.$http
          .post(`${this.$HOST_NAME}/Agency/teamQuery?page=${this.i}`, {
            uname: this.uname || this.$store.state.mainState.userinfo.userName,
            st: this.st || '2018-01-01',
            et: this.et || this.getYMD(new Date()),
            pagesize: 10
          })
          .then(res => {
            if (res.code == 200) {
              this.data = res.data.data
              this.total = res.data.total
              this.$store.commit('loading', false)
            } else {
              this.$store.commit('loading', false)
            }
          })
      },
      hanlderTime (date) {
        this.st = date[0]
        this.et = date[1]
      },
      hanlderPage (i) {
        this.i = i
        this.teamQuery()
      }
    },
    created () {
      this.$nextTick(() => {
        this.teamQuery()
      })
    },
    destroyed () {
      this.$store.commit('loading', false)
    }
  }
</script>

<style lang="less" scoped>
  .apply_agency {
    // .header {
    //   height: 66px;
    //   // line-height: 66px;
    //   border-bottom: 1px solid #f3f3f3;
    //   font-size: 1.8em;
    //   padding-left: 10px;
    //   color: #696969;
    //   line-height: 85px;
    //   // font-weight: 400;
    //   padding: 0 14px;
    // }
    .content {
      // padding-bottom: 10px;
      // border-bottom: 1px solid #dbdbdb;
      .search {
        height: 66px;
        line-height: 66px;
        // padding: 0 14px;
        .searchBtn {
          width: 80px;
          height: 36px;
          border-radius: 5px;
          background: linear-gradient(180deg, #ff3492, #ff1e4f);
          color: #fff;
          line-height: 36px;
          text-align: center;
          display: inline-block;
          margin-left: 20px;
          font-size: 18px;
          cursor: pointer;
        }
      }
      .page {
        position: absolute;
        right: 25px;
        bottom: 20px;
      }
    }
  }

  .ivu-table td {
    background: #fff;
  }
</style>
