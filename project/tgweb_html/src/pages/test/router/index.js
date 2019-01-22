import Vue from 'vue'
import Router from 'vue-router'
import { resolve } from 'url'
//默认空首页
const index = r => require.ensure([], () => r(require('@/pages/test/index.vue')), 'index')

// 时时彩
const sh_chongqing = r => require.ensure([], () => r(require('@/pages/public/userIndex/tradition/shi-shi-cai/chong-qing/index')), 'sh_chongqing')
// // 六合彩
const liu_xianggang = r => require.ensure([], () => r(require('@/pages/public/userIndex/tradition/liu-he-cai/xiang-gang/index')), 'liu_xianggang')
// // 快三
const ks_jiangsu = r => require.ensure([], () => r(require('@/pages/public/userIndex/tradition/kuai-san/jiangsu/index')), 'ks_jiangsu')
// // pc蛋蛋
const pc_dandan = r => require.ensure([], () => r(require('@/pages/public/userIndex/tradition/pc-dan-dan/pc-dan-dan/index')), 'pc_dandan')
// // pk10
const pk_beijing = r => require.ensure([], () => r(require('@/pages/public/userIndex/tradition/pk10/bei-jing/index')), 'pk_beijing')
// //快乐十分
const kl_guangdong = r => require.ensure([], () => r(require('@/pages/public/userIndex/tradition/kuai-le-shi-fen/guang-dong/index')), 'kl_guangdong')
// //十一选5
const ele_guangdong = r => require.ensure([], () => r(require('@/pages/public/userIndex/tradition/eleven-selection-five/guang-dong/index')), 'ele_guangdong')
// //低频彩
const di_fucai3D = r => require.ensure([], () => r(require('@/pages/public/userIndex/tradition/di-pin-cai/fu-cai-3D/index')), 'di_fucai3D')
// 传统彩end

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index,
      redirect: '/home',
      children:
        [
          // 注册登录
          {
            path: '/admin/login',
            name: 'login',
            component: resolve => require(['@/pages/test/admin/login.vue'], resolve)
          },
          {
            path: '/admin/register',
            component: 'register',
            component: resolve => require(['@/pages/test/admin/register.vue'], resolve),

          },
          // 大厅        
          {
            path: '/home',
            component: resolve => require(['@/pages/test/home/vp-hall'], resolve)
          },
          {
            path: '/games',
            component: resolve => require(['@/pages/public/userIndex/game/index.vue'], resolve)
          },
          // 传统彩票
          {
            path: '/plays',
            component: resolve => require(['@/pages/public/userIndex/tradition/index.vue'], resolve),
            children: [
              // 时时彩
              {
                path: 'tradition/4',
                component: sh_chongqing,
                meta: { id: 4, name: '重庆时时彩', code: 'cqssc', 'series': 'ssc', }
              },
              {
                path: 'tradition/14',
                component: sh_chongqing,
                meta: { id: 14, name: '新疆时时彩', code: 'xjssc', 'series': 'ssc', }
              },
              {
                path: 'tradition/15',
                component: sh_chongqing,
                meta: { id: 15, name: '天津时时彩', code: 'tjssc', 'series': 'ssc', }
              },
              {
                path: 'tradition/16',
                component: sh_chongqing,
                meta: { id: 16, name: '快速时时彩', code: 'ksssc', 'series': 'ssc', }
              },
              {
                path: 'tradition/17',
                component: sh_chongqing,
                meta: { id: 17, name: '3分时时彩', code: 'sfssc', 'series': 'ssc', }
              },
              //六合彩
              {
                path: 'tradition/18',
                component: liu_xianggang,
                meta: { id: 18, name: '快速六合彩', code: 'kslhc', 'series': 'lhc', }
              },
              {
                path: 'tradition/19',
                component: liu_xianggang,
                meta: { id: 19, name: '5分六合彩', code: 'wflhc', 'series': 'lhc', }
              },
              {
                path: 'tradition/1',
                component: liu_xianggang,
                meta: { id: 1, name: '香港六合彩', code: 'xglhc', 'series': 'lhc', }
              },
              // pc蛋蛋
              {
                path: 'tradition/10',
                component: pc_dandan,
                meta: { id: 10, name: 'PC蛋蛋', code: 'bjpcdd', 'series': 'pcdd', }
              },
              //快三 
              {
                path: 'tradition/9',
                component: ks_jiangsu,
                meta: { id: 9, name: '江苏快3', code: 'jsk3', 'series': 'k3', }
              },
              {
                path: 'tradition/2900',
                component: ks_jiangsu,
                meta: { id: 2900, name: '北京快3', code: 'bjk3', 'series': 'k3', }
              },
              {
                path: 'tradition/2901',
                component: ks_jiangsu,
                meta: { id: 2901, name: '甘肃快3', code: 'gsk3', 'series': 'k3', }
              },
              {
                path: 'tradition/2902',
                component: ks_jiangsu,
                meta: { id: 2902, name: '广西快3', code: 'gxk3', 'series': 'k3', }
              },
              {
                path: 'tradition/2903',
                component: ks_jiangsu,
                meta: { id: 2903, name: '贵州快3', code: 'gzk3', 'series': 'k3', }
              },
              {
                path: 'tradition/2904',
                component: ks_jiangsu,
                meta: { id: 2904, name: '河北快3', code: 'hbk3', 'series': 'k3', }
              },
              {
                path: 'tradition/2905',
                component: ks_jiangsu,
                meta: { id: 2905, name: '湖北快3', code: 'hubk3', 'series': 'k3', }
              },
              {
                path: 'tradition/2906',
                component: ks_jiangsu,
                meta: { id: 2906, name: '上海快3', code: 'shk3', 'series': 'k3', }
              },
              {
                path: 'tradition/25',
                component: ks_jiangsu,
                meta: { id: 25, name: '安徽快3', code: 'ahk3', 'series': 'k3', }
              },
              {
                path: 'tradition/26',
                component: ks_jiangsu,
                meta: { id: 26, name: '吉林快3', code: 'jlk3', 'series': 'k3', }
              },
              {
                path: 'tradition/27',
                component: ks_jiangsu,
                meta: { id: 27, name: '快速快3', code: 'ksk3', 'series': 'k3', }
              },
              // pk10
              {
                path: 'tradition/2',
                component: pk_beijing,
                meta: { id: 2, name: '北京赛车', code: 'bjsc', 'series': 'pk10', }
              },
              {
                path: 'tradition/12',
                component: pk_beijing,
                meta: { id: 12, name: '快速赛车', code: 'kssc', 'series': 'pk10', }
              },
              {
                path: 'tradition/13',
                component: pk_beijing,
                meta: { id: 13, name: '3分赛车', code: 'sfsc', 'series': 'pk10', }
              },
              {
                path: 'tradition/3',
                component: pk_beijing,
                meta: { id: 3, name: '幸运飞艇', code: 'xyft', 'series': 'pk10', }
              },
              //快乐十分
              {
                path: 'tradition/5',
                component: kl_guangdong,
                meta: { id: 5, name: '广东快乐十分', code: 'gdklsf', 'series': 'klsf', }
              },
              {
                path: 'tradition/20',
                component: kl_guangdong,
                meta: { id: 20, name: '湖南快乐十分', code: 'hnklsf', 'series': 'klsf', }
              }, {
                path: 'tradition/6',
                component: kl_guangdong,
                meta: { id: 6, name: '幸运农场', code: 'xync', 'series': 'klsf', }
              },
              // 广东11选5
              {
                path: 'tradition/24',
                component: ele_guangdong,
                meta: { id: 24, name: '快速11选5', code: 'ks11x5', 'series': 'cp11x5', }
              },
              {
                path: 'tradition/7',
                component: ele_guangdong,
                meta: { id: 7, name: '广东11选5', code: 'gd11x5', 'series': 'cp11x5', }
              },
              {
                path: 'tradition/21',
                component: ele_guangdong,
                meta: { id: 21, name: '江西11选5', code: 'jx11x5', 'series': 'cp11x5', }
              },
              {
                path: 'tradition/22',
                component: ele_guangdong,
                meta: { id: 22, name: '上海11选5', code: 'sh11x5', 'series': 'cp11x5', }
              },
              {
                path: 'tradition/23',
                component: ele_guangdong,
                meta: { id: 23, name: '山东11选5', code: 'sd11x5', 'series': 'cp11x5', }
              },
              // 低势盘
              {
                path: 'tradition/11',
                component: di_fucai3D,
                meta: { id: 11, name: '福彩3D', code: 'fcsd', 'series': 'sd', }
              }, {
                path: 'tradition/28',
                component: di_fucai3D,
                meta: { id: 28, name: '排列3', code: 'pl3', 'series': 'sd', }
              }, {
                path: 'tradition/29',
                component: di_fucai3D,
                meta: { id: 29, name: '上海时时乐', code: 'shssl', 'series': 'sd', }
              },
            ]
          },
          {
            path: '/plays/loading',
            component: resolve => require(['@/pages/public/userIndex/game/loading.vue'], resolve),
          },
          {
            path: '/plays/trend',
            component: resolve => require(['@/pages/public/userIndex/tradition/vp-trend/index.vue'], resolve),
          },
          // 个人中心
          {
            path: '/personal',
            component: resolve => require(['@/pages/public/userIndex/personal/index.vue'], resolve),
            redirect: '/personal/mine',
            children: [
              {
                path: 'mine',
                component: resolve => require(['@/pages/public/userIndex/personal/Mine/index.vue'], resolve),
              },
            ]
          },

          {
            path: '/personal_index',
            component: resolve => require(['@/pages/public/userIndex/personal/perosonal-index/index.vue'], resolve),
            children: [
              {
                path: 'trading_record',
                component: resolve => require(['@/pages/public/userIndex/personal/Mine/financial/trading-record.vue'], resolve),
                name: '账变记录'
              },
              {
                path: 'get_money',
                component: resolve => require(['@/pages/public/userIndex/personal/Mine/financial/getMoney.vue'], resolve),
                name: '线上取款'
              },

              {
                path: 'pay_money',
                component: resolve => require(['@/pages/public/userIndex/personal/Mine/financial/deposit.vue'], resolve),
                name: '线上存款'
              },
              {
                path: 'deposit_submit',
                component: resolve => require(['@/pages/public/userIndex/personal/Mine/financial/deposit-submit.vue'], resolve),
                name: '线上存款提交'
              },
              {
                path: 'pay_help',
                component: resolve => require(['@/pages/public/userIndex/personal/Mine/financial/pay-help.vue'], resolve),
                name: '转账帮助'
              },
              {
                path: 'game_record',
                component: resolve => require(['@/pages/public/userIndex/personal/Mine/financial/game-record.vue'], resolve),
                name: '游戏记录'
              },
              {
                path: 'about',
                component: resolve => require(['@/pages/public/userIndex/personal/Mine/financial/about.vue'], resolve),
                name: '关于我们'
              },
              {
                path: 'message_index',
                component: resolve => require(['@/pages/public/userIndex/personal/Mine/userInfo/Message_index.vue'], resolve),
                name: '消息中心'
              },
              {
                path: 'bank_account',
                component: resolve => require(['@/pages/public/userIndex/personal/Mine/financial/bank-account.vue'], resolve),
                name: '银行信息'
              },
              {
                path: 'set_bank',
                component: resolve => require(['@/pages/public/userIndex/personal/Mine/financial/set-bank.vue'], resolve),
                name: '输入银行卡信息'
              },
              {
                path: 'honest',
                component: resolve => require(['@/pages/public/userIndex/personal/Mine/financial/honest.vue'], resolve),
                name: '实时返水'
              },
              {
                path: 'personal_info',
                component: resolve => require(['@/pages/public/userIndex/personal/Mine/userInfo/personal-info.vue'], resolve),
                name: '设置'
              },

              // {
              //   path: 'lottery',
              //   component: resolve => require(['@/pages/public/userIndex/personal/Mine/financial/record/lottery.vue'], resolve),
              //   name: '彩票记录'
              // },
              // {
              //   path: 'live',
              //   component: resolve => require(['@/pages/public/userIndex/personal/Mine/financial/record/Live.vue'], resolve),
              //   name: '视讯记录'
              // },
              // {
              //   path: 'chess',
              //   component: resolve => require(['@/pages/public/userIndex/personal/Mine/financial/record/chess.vue'], resolve),
              //   name: '棋牌记录'
              // },
              // {
              //   path: 'sport',
              //   component: resolve => require(['@/pages/public/userIndex/personal/Mine/financial/record/Sport.vue'], resolve),
              //   name: '体育记录'
              // },
              // {
              //   path: 'dianzi',
              //   component: resolve => require(['@/pages/public/userIndex/personal/Mine/financial/record/dianzi.vue'], resolve),
              //   name: '电子记录'
              // },
              // {
              //   path: 'VRlottery',
              //   component: resolve => require(['@/pages/public/userIndex/personal/Mine/financial/record/VRlottery.vue'], resolve),
              //   name: 'VR彩票记录'
              // },

              {
                path: 'safety',
                component: resolve => require(['@/pages/public/userIndex/personal/Mine/userInfo/safety.vue'], resolve),
                name: '安全问题'
              },
              {
                path: 'update_pwd/:id',
                component: resolve => require(['@/pages/public/userIndex/personal/Mine/userInfo/updatePwd.vue'], resolve),
                name: '修改密码'
              },
              {
                path: 'mibao',
                component: resolve => require(['@/pages/public/userIndex/personal/Mine/userInfo/Mibao.vue'], resolve),
                name: '修改密保问题'
              },

              // 代理
              {
                path: 'agency_index',
                component: resolve => require(['@/pages/public/userIndex/personal/Mine/agency/agency_index.vue'], resolve),
                name: '代理中心'
              },
              {
                path: 'agency_getMoney',
                component: resolve => require(['@/pages/public/userIndex/personal/Mine/agency/agency_getMoney.vue'], resolve),
                name: '代理转账'
              },
              {
                path: 'agency_income',
                component: resolve => require(['@/pages/public/userIndex/personal/Mine/agency/agency_income.vue'], resolve),
                name: '我的收益'
              },
              {
                path: 'agency_open',
                component: resolve => require(['@/pages/public/userIndex/personal/Mine/agency/agency_open.vue'], resolve),
                name: '下级开户'
              },
              {
                path: 'agency_list',
                component: resolve => require(['@/pages/public/userIndex/personal/Mine/agency/agency_list.vue'], resolve),
                name: '下级列表'
              },
              {
                path: 'agency_finance',
                component: resolve => require(['@/pages/public/userIndex/personal/Mine/agency/agency_finance.vue'], resolve),
                name: '下级财务'
              },
              {
                path: 'agency_report',
                component: resolve => require(['@/pages/public/userIndex/personal/Mine/agency/agency_report.vue'], resolve),
                name: '下级报表'
              },
              {
                path: 'agency_number',
                component: resolve => require(['@/pages/public/userIndex/personal/Mine/agency/agency_number.vue'], resolve),
                name: '下级人数'
              },
              {
                path: 'agency_odds',
                component: resolve => require(['@/pages/public/userIndex/personal/Mine/agency/agency_odds.vue'], resolve),
                name: '赔率计算'
              }

            ]
          },
          {
            path: '/scan',
            component: resolve => require(['@/pages/public/userIndex/personal/Mine/financial/scan.vue'], resolve),
          },
          {
            path: '/set_info',
            component: resolve => require(['@/pages/public/userIndex/personal/Mine/userInfo/setInfo.vue'], resolve),
          }
        ]
    }

  ]
})
