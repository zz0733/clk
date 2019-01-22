<template>
  <div class="agency_team">


    <!-- 团队 -->
    <div class="team" v-if="toggleTeam =='team'">
      <!-- 搜索 -->
      <div class="search">
        <RadioGroup v-model="type" @on-change="getTeamList">
          <Radio label="member">
            <span class="radio-span">玩家</span>
          </Radio>
          <Radio label="agency">
            <span class="radio-span">代理</span>
          </Radio>
        </RadioGroup>

        <DatePicker type="daterange" placement="bottom-end" placeholder="选择时间" style="width: 236px;margin-left:25px;"
                    @on-change="hanlderTime"></DatePicker>
        <div class="searchBtn" @click="getTeamList">搜索</div>
      </div>
      <!-- 表格和分页 -->
      <Table :columns="columns" :data="data"
             no-data-text="<div style='margin:100px 0;'><img src='/static/public/image/userImg/no-data.png' alt=''></div>"></Table>
      <Page class="page" size="small" :total="total" @on-change="hanlderPage" v-if="total>0"></Page>
    </div>

    <!-- 报表 -->
    <div class="report" v-else-if="toggleTeam =='report'">
      <!-- 搜索 -->
      <div class="search">
        <DatePicker type="daterange" placement="bottom-end" style="width: 236px;margin-left:25px;"></DatePicker>
        <div class="searchBtn">搜索</div>
        <div class="callback" @click="toggleTeam ='team'">
          返回上一页
        </div>
      </div>

      <!-- 表格 -->
      <Table :columns="columns1" :data="data1"
             no-data-text="<div style='margin:100px 0;'><img src='/static/public/image/userImg/no-data.png' alt=''></div>"></Table>

    </div>


    <!-- 修改返点 -->
    <div class="upRefund" v-else>
      <!-- 反水设置 -->
      <div class="refundContent">

        <div class="bar" v-for="(item,i) in refundData" :key="i" :class="{refundList:refundList ==i}"
             @click="toggleRefund(i,item.list,item.name)">
          <label>{{item.name}}返水：</label>
          <span>{{item.active}}</span>
          <i class="ivu-icon ivu-icon-chevron-right"></i>
        </div>

        <div class="setRefund">

          <div class="setRefund-main" @click="MaxRefund">

            <div class="refund-row">
              <label>统一设置：</label>
              <img src="/static/public/image/userImg/jianshao.png" alt="" class="leftImg" @click="reduce">
              <img src="/static/public/image/userImg/zengjia.png" alt="" class="rightImg" @click="increase">
            </div>

            <div class="refund-row" v-for="(item,i) in setRefund" :key="i">
              <label>{{item.name}}：</label>

              <Select v-model="item.value" @on-change="MaxRefund">
                <Option v-for="v in item.option" :value="v.value" :key="v.value">{{v.name}}</Option>
              </Select>

            </div>

          </div>
        </div>

        <div class="submit">

          <div class="submitBtn" @click="upUser">确认修改</div>
          <div class="submitBtn" @click="toggleTeam ='team'">返回</div>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
  import mixins from './agency'

  export default {
    mixins: [mixins],
    data () {
      return {
        // 团队类型
        type: 'member',
        columns: [{
          title: '用户名',
          key: 'userName',
          align: 'center',
          width: 120
        },
          {
            title: '类型',
            key: 'Deposit',
            align: 'center',
            render: (h, params) => {
              return h('div', [h('span', params.row.uid ? '玩家' : '代理')])
            }
          },
          {
            title: '注册时间',
            key: 'created_at',
            align: 'center',
            width: 120,
            render: (h, params) => {
              return h('div', [
                h(
                  'span',
                  this.$moment
                    .unix(params.row.created_at - 0)
                    .format('YYYY-MM-DD')
                )
              ])
            }
          },
          {
            title: '余额',
            key: 'balance',
            align: 'center',
            width: 100,
            render: (h, params) => {
              return h('span', params.row.balance.toFixed(2))
            }
          },
          {
            title: '返点',
            key: 'rebate',
            align: 'center',
            width: 80,
            render: (h, params) => {
              return h('span', params.row.rebate.toFixed(2))
            }
          },

          {
            title: '状态',
            key: 'status',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('span', params.row.status == 'yes' ? '启用' : '禁用')
              ])
            }
          },
          {
            title: '操作',
            key: 'preferential',
            align: 'center',
            width: 130,
            render: (h, params) => {
              return h('div', [
                h(
                  'span', {
                    style: {
                      marginRight: '12px',
                      cursor: 'pointer'
                    },
                    on: {
                      click: () => {
                        this.toggleTeam = 'refund'
                        this.reportData.userName = params.row.userName
                        this.getRefundInfo()
                        // this.param = {};
                        // if (params.row.uid) {
                        //   this.url = `${this.$HOST_NAME}/Agency/upUser`;
                        //   this.param.uname = params.row.userName;
                        // } else {
                        //   this.url = `${this.$HOST_NAME}/Agency/modifyAgency`;
                        //   this.param.aid = params.row.aid;
                        //   this.param.rebate = params.row.rebate;
                        // }
                        // this.param.refundLottery = params.row.refundLottery;
                        // this.param.refundSports = params.row.refundSports;
                        // this.param.refundElec = params.row.refundElec;
                        // this.param.refundLive = params.row.refundLive;
                        // this.status = params.row.status;
                        // this.upReport = true;
                      }
                    }
                  }, [
                    h('img', {
                      attrs: {
                        src: '/static/public/image/userImg/edit-btu@3x.png'
                      },
                      style: {
                        fontSize: '12px',
                        marginRight: '3px',
                        width: '16px',
                        transform: 'translateY(20%)'
                      }
                    }),
                    h(
                      'span',

                      '修改'
                    )
                  ]
                ),
                h(
                  'span', {
                    style: {
                      cursor: 'pointer'
                    },
                    on: {
                      click: () => {
                        this.toggleTeam = 'report'

                        this.reportData.uname = params.row.uid
                        this.reportData.userName = params.row.userName
                        if (this.type == 'member') {
                          this.reportData.url = `${
                            this.$HOST_NAME
                            }/Agency/userReport`
                        } else {
                          this.reportData.url = `${
                            this.$HOST_NAME
                            }/Agency/teamReport`
                        }

                        this.getReport()

                        // this.reportData.uname = params.row.uid;
                        // // console.log(1111);
                        // // console.log(this.type);
                        // if (this.type == "member") {
                        //   this.reportData.url = `${
                        //     this.$HOST_NAME
                        //   }/Agency/userReport`;
                        // } else {
                        //   this.reportData.url = `${
                        //     this.$HOST_NAME
                        //   }/Agency/teamReport`;
                        // }
                        // this.reportShow = false;
                      }
                    }
                  }, [
                    h('img', {
                      attrs: {
                        src: '/static/public/image/userImg/total-but@3x.png'
                      },
                      style: {
                        fontSize: '12px',
                        marginRight: '3px',
                        width: '12px',
                        transform: 'translateY(8%)'
                      }
                    }),
                    h(
                      'span',

                      '报表'
                    )
                  ]
                )
              ])
            }
          }
        ],
        // 表格数组
        data: [],

        // 团队接口参数
        timeStart: '',
        timeEnd: '',
        total: 0,
        i: 1,

        // 切换团队，报表，修改返点
        toggleTeam: 'team',

        //  报表
        reportData: {},
        st: '',
        et: '',
        columns1: [{
          title: '用户名',
          key: 'username',
          align: 'center'
        },

          {
            title: '充值',
            key: 'Deposit',
            align: 'center'
          },
          {
            title: '提现',
            key: 'Withdrawals',
            align: 'center'
          },
          {
            title: '盈亏',
            key: 'winlossmoney',
            align: 'center'
          },
          {
            title: '投注额',
            key: 'betmoney',
            align: 'center'
          },
          {
            title: '派彩额',
            key: 'winmoney',
            align: 'center'
          }
        ],
        data1: [],

        // 反水

      }
    },
    methods: {
      getTeamList () {
        this.$store.commit('loading', true)
        this.$http
          .post(`${this.$HOST_NAME}/Agency/getTeamList?page=` + this.i, {
            aid: this.$store.state.mainState.userinfo.agencyInfo.uid,
            timeStart: this.timeStart || '2018-01-01',
            timeEnd: this.timeEnd || this.getYMD(new Date()),
            type: this.type
          })
          .then(res => {
            if (res.code == 200) {
              this.data = res.data.list.data
              this.total = res.data.list.total
              // this.refundData = res.data.dictionary
              // this.refundData.forEach(v => {
              //   v.active = "未设置";
              //   v.list.forEach((a, i) => {
              //     a.value = this.toFloat(a.value);
              //     a.option = [{
              //       value: '0.0',
              //       name: "0%"
              //     }];

              //     for (let j = 1; j <= a.value * 10; j++) {
              //       a.option.push({
              //         value: j / 10,
              //         name: j / 10 + "%"
              //       });
              //     }
              //   });
              // });
              // console.log(this.refundData)
              // this.setRefund = this.refundData[0].list;
              // this.refundName = this.refundData[0].name;
              this.$store.commit('loading', false)
            } else {
              this.$store.commit('loading', false)
            }
          })
      },
      // 选中时间
      hanlderTime (date) {
        this.timeStart = date[0]
        this.timeEnd = date[1]
      },
      // 选中页码
      hanlderPage (i) {
        this.i = i
        this.getTeamList()
      },

      // 报表信息
      getReport () {
        this.$http
          .post(this.reportData.url, {
            uname: this.reportData.uname,
            st: this.st || '2018-01-01',
            et: this.et || this.getYMD(new Date())
          })
          .then(res => {
            if (res && res.code == 200) {
              if (this.reportData.url == `${this.$HOST_NAME}/Agency/userReport`) {
                res.data.username = this.reportData.userName
                this.data1.push(res.data)
              } else {
                this.data1 = res.data.data
              }
            }
          })
      },

      // 修改
      upUser () {
        // this.param.status = this.status;

        // let param = {};
        // this.refundData.forEach(v => {
        //   param[v.title] = [];
        //   v.list.forEach((a, b) => {
        //     param[v.title][b] = {};
        //     param[v.title][b][a.key] = a.refund;
        //   });
        // });
        // this.param.refundjson = JSON.stringify(param);
        let param = {}
        param.uname = this.reportData.userName
        param.refundjson = this.productJsonParams()

        this.$http
          .post(`${this.$HOST_NAME}/Agency/upUser`, param)
          .then(res => {
            if (res.code == 200) {
              // this.getTeamList();
              this.$success('修改成功')
              this.toggleTeam = 'team'
            } else {
              this.$error(res.message)
            }
          })
      },

    },
    created () {
      this.$nextTick(() => {
        this.getTeamList()
      })
    }
  }
</script>

<style lang="less" scoped>
  .agency_team {
    .team {
      .search {
        height: 66px;
        padding: 0 14px;
        line-height: 66px;
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
        right: 20px;
        bottom: 35px;
      }
    }
    .report {
      .search {
        height: 66px;
        line-height: 66px;
        .searchBtn {
          width: 80px;
          height: 36px;
          border-radius: 5px;
          background: linear-gradient(180deg, #ff7c7c, #fd4848);
          color: #fff;
          line-height: 36px;
          text-align: center;
          display: inline-block;
          margin-left: 20px;
          font-size: 18px;
          cursor: pointer;
        }
        .callback {
          float: right;
          margin-right: 70px;
          font-size: 16px;
          cursor: pointer;
        }
      }
    }
    .upRefund {
      .refundContent {
        position: relative;
        margin-top: 66px;
        .bar {
          margin-top: 30px;
          padding-left: 60px;
          cursor: pointer;
          width: 30%;
          label {
            // width: 150px;
            cursor: pointer;
            padding-left: 5px;
            font-size: 15px;
            font-family: "Microsoft YaHei";
            vertical-align: middle;
            // background: linear-gradient(180deg, #fe8983, #f0b761);
            // color: #fff;
            // padding: 6.5px 8px;
            display: inline-block;
            height: 30px;
            width: 100px;
            line-height: 30px;
            text-align: center;
            border-radius: 10px 0 0 10px;
            // background: pink;
          }
          span {
            font-size: 15px;
            /* border: 1px solid #000; */
            /* display: inline-block; */
            display: inline-block;
            height: 30px;
            width: 90px;
            line-height: 30px;
            text-align: center;
            vertical-align: middle;
            margin-left: -3px;
            // background: #000;
            // color: #D7D7D7;
            margin-right: 10px;
            color: #666;
          }
          i {
            color: #bebebe;
            vertical-align: middle;
            font-size: 15px;
          }
        }
        .refundList {
          label {
            background: linear-gradient(180deg, #fe8983, #f0b761);
            color: #fff;
          }
          span {
            background: #f4f4f4;
          }
        }
        .setRefund {
          position: absolute;
          width: 214px;
          // height: 200px;
          top: 0;
          left: 288px;
          border: 1px solid #f5f5f5;
          overflow: hidden;
          max-height: 275px;
          .setRefund-main {
            padding: 5px 10px;
            // height: auto;
            height: 275px;
            max-height: 275px;
            overflow: auto;
            width: 140%;
            padding-right: 30px;
            position: relative;
            // padding-top: 30px;
            .refund-row {
              margin-bottom: 10px;
              position: relative;
              .leftImg {
                position: absolute;
                top: -2px;
                left: 105px;
                cursor: pointer;
              }
              .rightImg {
                position: absolute;
                top: -2px;
                left: 160px;
                cursor: pointer;
              }
              label {
                vertical-align: middle;
                display: inline-block;
                font-size: 14px;
                display: inline-block;
                width: 90px;
                text-align: right;
              }
              .ivu-select {
                width: 98px;
              }
              .ivu-select-single .ivu-select-selection {
                height: 24px;
                border-radius: 5px;
              }
              .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
              .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
                height: 24px;
                line-height: 24px;
              }
            }
          }
        }
      }
      .submit {
        margin-top: 30px;
        border-top: 1px solid #f5f5f5;
        .submitBtn {
          width: 140px;
          height: 42px;
          background: linear-gradient(180deg, #ff3492, #ff1e4f);
          line-height: 42px;
          color: #fff;
          cursor: pointer;
          text-align: center;
          margin-top: 30px;
          border-radius: 8px;
          font-size: 16px;
          margin-left: 80px;
          display: inline-block;
        }
      }
    }
  }
</style>
