<template>
  <div class="record">
    <!-- <div class="header">
           取款记录
          </div> -->
    <div class="content">

      <div class="search">
        <RadioGroup v-model="day" @on-change="hanlderRadio">
          <Radio label="1">

            <span class="radio-span">今日</span>
          </Radio>
          <Radio label="2">

            <span class="radio-span">昨天</span>
          </Radio>
          <Radio label="3">

            <span class="radio-span">最近七天</span>
          </Radio>
        </RadioGroup>

        <DatePicker type="daterange" placement="bottom-end" style="width: 236px;margin-left:25px;" placeholder="请选择时间"
                    @on-change="hanlderDate"></DatePicker>
      </div>

      <Table :columns="columns" :data="data"
             no-data-text="<div style='margin:100px 0;'><img src='/static/public/image/userImg/no-data.png' alt=''></div>"></Table>

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
        day: '1',
        total: 0,
        i: 1,
        startTime: '',
        endTime: '',

        columns: [{
          title: '提款编号',
          align: 'center',
          width: 240,
          key: 'code'
        },
          {
            title: '银行名称',
            align: 'center',
            key: 'bankName'
          },
          {
            title: '提款金额',
            align: 'center',
            key: 'amount'
          },
          {
            title: '提款时间',
            align: 'center',
            key: 'time',
            render: (h, params) => {
              return h('div', [
                h(
                  'span',
                  this.$moment
                    .unix(params.row.time - 0)
                    .format('YYYY-MM-DD HH:mm:ss')
                )
              ])
            }
          },
          {
            title: '状态',
            align: 'center',
            key: 'status',
            render: (h, params) => {
              return h('div', [
                h(
                  'span',
                  params.row.status == 'success' ?
                    '成功' :
                    false || params.row.status == 'fail' ? '失败' : '审核中'
                )
              ])
            }
          },
          {
            title: '备注',
            align: 'center',
            key: 'remark'
          },
          {
            title: '催账',
            align: 'center',
            key: 'status',
            render: (h, params) => {
              return h('div', [
                (params.row.status == 'system_processing' || params.row.status == 'wait') ?
                  h(
                    'span', {
                      style: {
                        cursor: 'pointer',
                        border: '1px solid #dbdbdb',
                        padding: '6px 12px',
                        display: 'inline-block',
                        borderRadius: '5px',
                        background: 'linear-gradient(180deg,#ff3494, #ff1c4b)',
                        color: '#fff'
                      },
                      on: {
                        click: () => {
                          this.emergency(params.row.id, params.row.time)
                        }
                      }
                    },
                    '催账'
                  ) :
                  h(
                    'span', {
                      style: {
                        cursor: 'pointer',
                        border: '1px solid #dbdbdb',
                        padding: '6px 12px',
                        display: 'inline-block',
                        borderRadius: '5px',
                        background: '#f9f9f9'
                      },
                      on: {
                        click: () => {
                          // this.emergency(params.row.id);
                          // this.emergency(params.row.id, params.row.time);
                        }
                      }
                    },
                    '催账'
                  )
              ])
            }
          }
        ],
        data: []
      }
    },
    methods: {
      withdrawals () {
        this.$store.commit('loading', true)
        this.$http
          .post(`${this.$HOST_NAME}/withdrawals/index?page=` + this.i, {
            startTime: this.startTime || this.getYMD(new Date()) + ' 00:00:00',
            endTime: this.endTime || this.getTime(new Date()),
            limit: 10
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
      hanlderPage (i) {
        this.i = i
        this.withdrawals()
      },
      emergency (id, date) {
        this.$http
          .post(`${this.$HOST_NAME}/emergency/application`, {
            financeId: id,
            type: 'withdrawals',
            date: this.$moment.unix(date - 0).format('YYYY-MM-DD')
          })
          .then(res => {
            if (res.code == 200) {
              this.$success('催帐成功')
            } else {
              this.$error(res.message)
            }
          })
      },
      hanlderRadio (val) {
        this.i = 1
        if (val == '1') {
          this.startTime = this.getYMD(new Date()) + ' 00:00:00'
          this.endTime = this.getTime(new Date())
        } else if (val == '2') {
          this.startTime =
            this.getYMD(new Date() - 1000 * 60 * 60 * 24) + ' 00:00:00'
          this.endTime =
            this.getYMD(new Date() - 1000 * 60 * 60 * 24) + ' 23:59:59 '
        } else {
          this.startTime = this.getYMD(new Date() - 1000 * 60 * 60 * 24 * 6)
          this.endTime = this.getTime(new Date())
        }
        this.withdrawals()
      },
      hanlderDate (date) {
        // console.log(date);
        this.startTime = date[0]
        this.endTime = date[1]
        this.withdrawals()
      }
    },

    created () {
      this.$nextTick(() => {
        this.withdrawals()
      })
    },
    destroyed () {
      this.$store.commit('loading', false)
    }
  }
</script>

<style lang="less" scoped>
  .record {
    // .header {
    //   height: 66px;
    //   border-bottom: 1px solid #f3f3f3;
    //   font-size: 1.8em;
    //   padding-left: 10px;
    //   color: #696969;
    //   line-height: 85px;
    //   font-weight: 400;
    //   padding: 0 14px;
    // }
    .content {
      // position: relative;
      .search {
        height: 64px;
        line-height: 64px;
        padding: 0 10px;
        padding: 0 14px;
      }
      .page {
        position: absolute;
        right: 25px;
        bottom: 20px;
      }
    }
  }
</style>
