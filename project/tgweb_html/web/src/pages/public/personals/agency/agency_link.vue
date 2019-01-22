<template>
  <div class="agency-link" v-if="linkShow">
    <!-- 搜索 -->
    <div class="search">
      <RadioGroup v-model="time">
        <Radio label="one">
          <span class="radio-span">今日</span>
        </Radio>
        <Radio label="two">
          <span class="radio-span">昨日</span>
        </Radio>
        <Radio label="three">
          <span class="radio-span">最近七日</span>
        </Radio>
      </RadioGroup>

      <DatePicker type="daterange" placement="bottom-end" placeholder="选择时间"
                  style="width: 236px;margin-left:25px;"></DatePicker>
      <div class="searchBtn" @click="getDomains">搜索</div>
    </div>
    <!-- 链接内容 -->
    <div class="link-content">
      <Table :columns="columns" :data="domianData"
             no-data-text="<div style='margin:100px 0;'><img src='/static/public/image/userImg/no-data.png' alt=''></div>"></Table>
      <Page class="page" size="small" :total="total" @on-change="hanlderPage" v-if="total>0"></Page>
    </div>
  </div>


  <!-- 修改链接 -->
  <div v-else class="set-link">
    <div class="row">
      <label class="text">状态：</label>
      <RadioGroup v-model="status">
        <Radio label="yes">
          <span class="radio-span">启用</span>
        </Radio>
        <Radio label="no">
          <span class="radio-span">禁用</span>
        </Radio>

      </RadioGroup>

    </div>
    <div class="row">
      <label class="text">返点赔率：</label>
      <Select v-model="rebate">
        <Option v-for="(item,i) in options1" :key="i" :value="item">
          {{item}}
        </Option>
      </Select>
    </div>
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

    </div>

    <div class="submitPay" @click="modifyDomain">
      确认修改
    </div>
  </div>
</template>

<script>
  import mixins from './agency'

  export default {
    mixins: [mixins],
    data () {
      return {
        time: 'one',
        columns: [{
          title: '邀请链接',
          key: 'domain',
          align: 'left',
          width: 310,
          render: (h, params) => {
            return h('div', [
              h('input', {
                attrs: {
                  type: 'type',
                  value: params.row.domain,
                  disabled: 'disabled'
                },
                style: {
                  border: '1px solid #dbdbdb',
                  height: '36px',
                  width: '250px',
                  borderRadius: '8px',
                  outline: 'none',
                  paddingLeft: '10px',
                  fontSize: '14px',
                  color: '#999'
                }
              }),
              h(
                'span', {
                  style: {
                    marginLeft: '10px',
                    fontSize: '14px',
                    color: '#808080',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.Copy(params.row.domain)
                    }
                  }
                },
                '复制'
              )
            ])
          }
        },
          {
            title: '注册人数',
            key: 'Deposit',
            align: 'center'
          },
          {
            title: '生成时间',
            key: 'created_at',
            align: 'center',
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
            title: '备注',
            key: 'winlossmoney',
            align: 'center'
          },
          {
            title: '操作',
            key: 'preferential',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                // h(
                //   "span", {
                //     attrs: {
                //       class: "updataLink"
                //     },
                //     style: {
                //       marginLeft: "10px",
                //       fontSize: "14px",
                //       color: "#808080",
                //       cursor: "pointer"
                //     },
                //     on: {
                //       click: () => {
                //         this.getRefundInfo();
                //         this.linkShow = false;
                //         this.id = params.row.id;
                //         this.rebate = params.row.rebate;

                //         // this.rebate = params.row.rebate;
                //         // this.setLinkShow = false;
                //         // this.id = params.row.id;
                //         // this.refundData = JSON.parse(params.row.platform);
                //       }
                //     }
                //   },
                //   "修改"
                // ),
                h(
                  'span', {
                    attrs: {
                      class: 'deleteLink'
                    },
                    style: {
                      marginLeft: '40px',
                      fontSize: '14px',
                      color: '#808080',
                      cursor: 'pointer'
                    },
                    on: {
                      click: () => {
                        this.delDomain(params.row.id)
                      }
                    }
                  },
                  '删除'
                )
              ])
            }
          }
        ],
        domianData: [],
        total: 0,
        i: 1,
        linkShow: true,
        status: 'yes',
        rebate: '',
        options1: [],
        id: ''
      }
    },
    methods: {
      getDomains () {
        this.$store.commit('loading', true)
        this.$http
          .get(`${this.$HOST_NAME}/Agency/getDomains?page=` + this.i)
          .then(res => {
            if (res.code == 200) {
              this.domianData = res.data.list.data
              this.total = res.data.list.total
              // this.domianData.forEach(v => {
              //   v.created_at = this.$moment
              //     .unix(v.created_at - 0)
              //     .format("YYYY-MM-DD HH:mm:ss");
              // });
              this.$store.commit('loading', false)
              //   this.total = res.data.total;
            } else {
              this.$store.commit('loading', false)
            }
          })
      },
      // 选中页码
      hanlderPage (i) {
        this.i = i
        this.getDomains()
      },

      Copy (link) {
        this.$success('复制成功')
        this.$copyText(link)
      },

      //  删除链接
      delDomain (id) {
        this.$http
          .post(`${this.$HOST_NAME}/Agency/delDomain`, {
            id: id
          })
          .then(res => {
            if (res.code == 200) {
              this.$success(res.data)
              this.getDomains()
            }
          })
      },
      modifyDomain () {
        //       let param = {};
        //       this.refundData.forEach(v => {
        //         param[v.title] = [];
        //         v.list.forEach((a, b) => {
        //           param[v.title][b] = {};
        //           param[v.title][b][a.key] = a.refund;
        //         });
        //       });
        // this.param.refundjson = this.productJsonParams();
        this.$http
          .post(`${this.$HOST_NAME}/Agency/modifyDomain`, {
            id: this.id,
            rebate: this.rebate,
            refundjson: this.productJsonParams(),
            status: this.status
          })
          .then(res => {
            if (res.code == 200) {
              this.$success(res.data)
              this.setLinkShow = true
              this.linkShow = true
            } else {
              this.$error(res.message)
            }
          })
      },
    },
    created () {
      this.$nextTick(() => {
        this.getDomains()
        for (
          let i = 170; i <= this.$store.state.mainState.userinfo.agencyInfo.rebate / 10; i++
        ) {
          this.options1.push(i + '0')
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  .agency-link {
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
    /deep/ .updataLink {
      position: relative;
    }
    /deep/ .deleteLink {
      position: relative;
    }
    /deep/ .deleteLink::after {
      content: "";
      width: 12px;
      height: 20px;
      background: url("/static/public/image/userImg/del-btu@3x.png") no-repeat;
      position: absolute;
      top: 0;
      left: -18px;
      background-size: contain;
    }
    /deep/ .updataLink::after {
      content: "";
      width: 16px;
      height: 20px;
      background: url("/static/public/image/userImg/edit-btu@3x.png") no-repeat;
      position: absolute;
      top: 0;
      left: -25px;
      background-size: contain;
    }
  }

  .set-link {
    position: relative;
    height: 100%;
    margin-top: 66px;
    .row {
      margin-top: 20px;
      .text {
        display: inline-block;
        width: 150px;
        text-align: right;
        font-size: 15px;
        font-family: "Microsoft YaHei";
        vertical-align: middle;
        margin-right: 5px;
      }
      .ivu-select {
        width: 240px;
        .ivu-select-dropdown-list {
          max-height: 160px;
        }
      }
    }
    .refundContent {
      position: relative;
      padding-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
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
          // height: 275px;
          // max-height: 275px;
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
    .submitPay {
      // bottom: 50px;
      // position: absolute;
      width: 140px;
      height: 42px;
      line-height: 42px;
      text-align: center;
      color: #fff;
      font-size: 1.8em;
      background: linear-gradient(180deg, #ff3494, #ff1c4b);
      border-radius: 5px;
      margin-top: 25px;
      margin-left: 160px;
      cursor: pointer;
    }
  }
</style>
