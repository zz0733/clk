import moment from 'moment'

export default {

  Lottery: [
    {
      title: '游戏类型',
      align: 'center',
      key: 'platform',
      width: 90
    },
    {
      title: '订单编号',
      align: 'center',
      key: 'billNo',
      width: 160
    },
    {
      title: '期数',
      align: 'center',
      key: 'issue',
      width: 120
    },

    {
      title: '投注时间',
      align: 'center',
      key: 'betTime',
      width: 150,
      render: (h, params) => {
        return h('div', [
          h(
            'span',
            moment.unix(params.row.betTime - 0).format('YYYY-MM-DD HH:mm:ss')
          )
        ])
      }
    },
    {
      title: '投注金额',
      align: 'center',
      key: 'betAmount'
    },

    {
      title: '彩种',
      align: 'center',
      key: 'lotteryName',
      width: 100
    },
    {
      title: '玩法',
      align: 'center',
      key: 'playwayName'
    },

    {
      title: '玩号',
      align: 'center',
      key: 'ball',
      render: (h, params) => {
        //             <Tooltip content="Here is the prompt text">
        //     A balloon appears when the mouse passes over this text
        // </Tooltip>
        return h('div', [
          h('Poptip', {
            props: {
              placement: 'right-start'
            },
            style: {
              cursor: 'pointer',
            }
          }, [
            h('div', '详情'),
            h('div', {slot: 'title'}, params.row.lotteryName),
            h('div', {
                slot: 'content',
                style: {
                  // height: "80px",
                  width: '137px',
                  whiteSpace: 'pre-wrap',
                  // overflowY: "scroll"
                }
              },
              params.row.ball ? params.row.ball : '无'
            )
          ])
        ])
        // return h("div", [
        //     h(
        //         "span",
        //         params.row.ball ? params.row.ball : '无'
        //     )
        // ]);
      }
    },
    {
      title: '下注内容',
      align: 'center',
      key: 'betInfo'
    },

    // {
    //     title: "开奖结果",
    //     align: "center",
    //     key: "result",
    //     render: (h, params) => {

    //         return h("div", [
    //             h(
    //                 "span",
    //                 params.row.result ? params.row.result : '未开奖'
    //             )
    //         ]);
    //     }
    // },

    {
      title: '输赢',
      align: 'center',
      key: 'netAmount'
    },
    {
      title: '状态',
      align: 'center',
      key: 'status',
      render: (h, params) => {
        let status

        switch (params.row.status) {
          case 0:
            status = '未结算'
            break
          case 1:
            status = '已中奖'
            break
          case 2:
            status = '未中奖'
            break
          case 3:
            status = '平'
            break
          case 4:
            status = '取消'
            break
          case 5:
            status = '撤销'
            break
        }
        return h('div', [

          h(
            'span',
            status
          )
        ])
      }
    }

  ],

  Live: [
    {
      title: '游戏类型',
      align: 'center',
      key: 'platform',
      width: 90
    },
    {
      title: '订单编号',
      align: 'center',
      key: 'billNo',
      width: 230
    },
    {
      title: '投注时间',
      align: 'center',
      key: 'betTime',
      width: 150,
      render: (h, params) => {
        return h('div', [
          h(
            'span',
            moment.unix(params.row.betTime - 0).format('YYYY-MM-DD HH:mm:ss')
          )
        ])
      }
    },

    {
      title: '玩法',
      align: 'center',
      key: 'gameName'
    },
    {
      title: '投注内容',
      align: 'center',
      key: 'betInfo',
      render: (h, params) => {
        return h('div', [
          h(
            'span',
            params.row.betInfo ? params.row.betInfo : '- -'
          )
        ])
      },
      width: 180
    },
    {
      title: '投注金额',
      align: 'center',
      key: 'betAmount'
    },
    {
      title: '输赢',
      align: 'center',
      key: 'netAmount'
    }
  ],

  sport: [
    {
      title: '游戏类型',
      align: 'center',
      key: 'platform',
      width: 90
    },
    {
      title: '订单编号',
      align: 'center',
      key: 'billNo',
      width: 150,
    },
    {
      title: '投注时间',
      align: 'center',
      key: 'betTime',
      render: (h, params) => {
        return h('div', [
          h(
            'span',
            moment.unix(params.row.betTime - 0).format('YYYY-MM-DD HH:mm:ss')
          )
        ])
      },
      width: 150
    },

    // {
    //     title: "会员名",
    //     align: "center",
    //     key: "userName"
    // },

    // {
    //     title: "游戏类型",
    //     align: "center",
    //     key: "gameName"
    // },
    {
      title: '投注内容',
      align: 'center',
      key: 'betInfo',
      width: 300,
      render: (h, params) => {

        if (params.row.betInfo != null) {
          return h('div', [
            h(
              'div',
              params.row.betInfo[0].hometeamname + 'VS' + params.row.betInfo[0].awayteamname
            ),
            h(
              'div',
              params.row.betInfo[0].bettypename
            ),
            h(
              'div',
              params.row.betInfo[0].teambetname + `(赔率${params.row.betInfo[0].odds})`
            )
          ])
        } else {
          return h('div', [
            h(
              'span',
              '- -'
            )
          ])
        }

      }
    },
    {
      title: '投注金额',
      align: 'center',
      key: 'betAmount'
    },

    {
      title: '输赢',
      align: 'center',
      key: 'netAmount'
    },
    {
      title: '状态',
      align: 'center',
      key: 'status',
      render: (h, params) => {
        let status

        switch (params.row.status) {
          case 0:
            status = '未结算'
            break
          case 1:
            status = '已结算'
            break
          case 2:
            status = '无效'
            break
        }
        return h('div', [

          h(
            'span',
            status
          )
        ])
      }
    }
  ],

  chess: [
    {
      title: '游戏类型',
      align: 'center',
      key: 'platform',

    },
    {
      title: '游戏名称',
      align: 'center',
      key: 'gameName',

    },
    {
      title: '订单编号',
      align: 'center',
      key: 'billNo',
      width: 200
    },

    {
      title: '投注时间',
      align: 'center',
      key: 'betTime',
      render: (h, params) => {
        return h('div', [
          h(
            'span',
            moment.unix(params.row.betTime - 0).format('YYYY-MM-DD HH:mm:ss')
          )
        ])
      }
    },
    {
      title: '下注内容',
      align: 'center',
      key: 'betInfo',
      render: (h, params) => {

        return h('div', [
            h(
              'span',
              '--'
            )
          ]
        )

      }
    },
    {
      title: '投注金额',
      align: 'center',
      key: 'betAmount'
    },
    {
      title: '输赢',
      align: 'center',
      key: 'netAmount'
    },
  ]

}
