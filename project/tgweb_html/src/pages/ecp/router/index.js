import Vue from 'vue'
import Router from 'vue-router'
import { resolve } from 'url'
//默认空首页
const index = r => require.ensure([], () => r(require('@/pages/ecp/index.vue')), 'index')
// 个人中心
const personal = r => require.ensure([], () => r(require('@/pages/public/personal')), 'personal')
const mine = r => require.ensure([], () => r(require('@/pages/public/personal/Mine')), 'mine')
const personal_index = r => require.ensure([], () => r(require('@/pages/public/personal/perosonal-index')), 'perosonal-index')
// 金融交易
const trading_record = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/financial/trading-record')), 'trading-record')
const game_record = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/financial/game-record')), 'game_record')
const self_help = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/financial/Self-help')), 'Self-help')
const bank_account = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/financial/bank-account')), 'bank-account')
const honest = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/financial/honest')), 'honest')
const get_money = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/financial/getMoney')), 'get_money')
const deposit = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/financial/deposit')), 'deposit')
const deposit_submit = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/financial/deposit-submit')), 'deposit_submit')
const recommend = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/financial/self-help/recommend')), 'recommend')
const deposit_send = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/financial/self-help/deposit-send')), 'deposit_send')
const demand = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/financial/self-help/demand')), 'demand')
const set_bank = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/financial/set-bank')), 'set_bank')
const lottery = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/financial/record/lottery')), 'lottery')
const live = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/financial/record/Live')), 'live')
const sport = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/financial/record/Sport')), 'sport')
const dianzi = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/financial/record/dianzi')), 'dianzi')
const VRlottery = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/financial/record/VRlottery')), 'VRlottery')
const Chess = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/financial/record/chess')), 'Chess')
const pay_help = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/financial/pay-help')), 'pay_help')

// 个人信息
const personal_info = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/userInfo/personal-info')), 'personal-info')
const myInfo = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/userInfo/message/myInfo')), 'myInfo')
const sent = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/userInfo/message/sent')), 'sent')
const write = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/userInfo/message/write')), 'write')
const message_index = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/userInfo/Message_index')), 'message_index')
const safety = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/userInfo/safety')), 'safety')
const update_pwd = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/userInfo/updatePwd')), 'update_pwd')
const sign = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/userInfo/sign')), 'sign')
const setInfo = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/userInfo/setInfo')), 'setInfo')
const mibao = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/userInfo/Mibao')), 'mibao')

// 客服
// const service = r => require.ensure([], () => r(require('@/pages/public/personal/service.vue')), 'service')
// 二维码
const scan = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/financial/scan')), 'scan')
// 代理中心
const agency_index = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/agency/agency-index')), 'agency-index')
const team = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/agency/team')), 'team')
const open_account = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/agency/open-account')), 'open-account')
const finance = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/agency/finance')), 'finance')
const apply_agency = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/agency/apply_agency')), 'apply_agency')
const kaihu = r => require.ensure([], () => r(require('@/pages/public/personal/Mine/agency/kaihu')), 'kaihu')

const games = r => require.ensure([], () => r(require('@/pages/public/game/index')), 'games')
const vpHome = r => require.ensure([], () => r(require('@/pages/ecp/home/vp-hall/index')), 'vpHome')
const vpLoading = r => require.ensure([], () => r(require('@/pages/public/game/loading.vue')), 'vpLoading')
const vpTrend = r => require.ensure([], () => r(require('@/pages/public/tradition/vp-trend')), 'vpTrend')

// 传统彩空页面
const traditioIndex = r => require.ensure([], () => r(require('@/pages/public/tradition')), 'traditioIndex')
// 时时彩
const sh_chongqing = r => require.ensure([], () => r(require('@/pages/public/tradition/shi-shi-cai/chong-qing/index')), 'sh_chongqing')
// 六合彩
const liu_xianggang = r => require.ensure([], () => r(require('@/pages/public/tradition/liu-he-cai/xiang-gang/index')), 'liu_xianggang')
// 快三
const ks_jiangsu = r => require.ensure([], () => r(require('@/pages/public/tradition/kuai-san/jiangsu/index')), 'ks_jiangsu')
// pc蛋蛋
const pc_dandan = r => require.ensure([], () => r(require('@/pages/public/tradition/pc-dan-dan/pc-dan-dan/index')), 'pc_dandan')
// pk10
const pk_beijing = r => require.ensure([], () => r(require('@/pages/public/tradition/pk10/bei-jing/index')), 'pk_beijing')
//快乐十分
const kl_guangdong = r => require.ensure([], () => r(require('@/pages/public/tradition/kuai-le-shi-fen/guang-dong/index')), 'kl_guangdong')
//十一选5
const ele_guangdong = r => require.ensure([], () => r(require('@/pages/public/tradition/eleven-selection-five/guang-dong/index')), 'ele_guangdong')
//低频彩
const di_fucai3D = r => require.ensure([], () => r(require('@/pages/public/tradition/di-pin-cai/fu-cai-3D/index')), 'di_fucai3D')
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
            component: resolve => require(['@/pages/ecp/admin/login.vue'], resolve)
          },
          {
            path: '/admin/register',
            component: 'register',
            component: resolve => require(['@/pages/ecp/admin/register.vue'], resolve),

          },
          // 大厅
          {
            path: '/home',
            component: vpHome,
          },
          {
            path: '/games',
            component: games,
          },
          // 传统彩票
          {
            path: '/plays',
            component: traditioIndex,
            children: [
              // 时时彩
              {
                path: 'tradition/4',
                component: sh_chongqing,
                meta: {id: 4, name: '重庆时时彩', code: 'cqssc', 'series': 'ssc',}
              },
              {
                path: 'tradition/14',
                component: sh_chongqing,
                meta: {id: 14, name: '新疆时时彩', code: 'xjssc', 'series': 'ssc',}
              },
              {
                path: 'tradition/15',
                component: sh_chongqing,
                meta: {id: 15, name: '天津时时彩', code: 'tjssc', 'series': 'ssc',}
              },
              {
                path: 'tradition/16',
                component: sh_chongqing,
                meta: {id: 16, name: '快速时时彩', code: 'ksssc', 'series': 'ssc',}
              },
              {
                path: 'tradition/17',
                component: sh_chongqing,
                meta: {id: 17, name: '3分时时彩', code: 'sfssc', 'series': 'ssc',}
              },
              //六合彩
              {
                path: 'tradition/18',
                component: liu_xianggang,
                meta: {id: 18, name: '快速六合彩', code: 'kslhc', 'series': 'lhc',}
              },
              {
                path: 'tradition/19',
                component: liu_xianggang,
                meta: {id: 19, name: '5分六合彩', code: 'wflhc', 'series': 'lhc',}
              },
              {
                path: 'tradition/1',
                component: liu_xianggang,
                meta: {id: 1, name: '香港六合彩', code: 'xglhc', 'series': 'lhc',}
              },
              // pc蛋蛋
              {
                path: 'tradition/10',
                component: pc_dandan,
                meta: {id: 10, name: 'PC蛋蛋', code: 'bjpcdd', 'series': 'pcdd',}
              },
              //快三
              {
                path: 'tradition/9',
                component: ks_jiangsu,
                meta: {id: 9, name: '江苏快3', code: 'jsk3', 'series': 'k3',}
              },
              {
                path: 'tradition/2900',
                component: ks_jiangsu,
                meta: {id: 2900, name: '北京快3', code: 'bjk3', 'series': 'k3',}
              },
              {
                path: 'tradition/2901',
                component: ks_jiangsu,
                meta: {id: 2901, name: '甘肃快3', code: 'gsk3', 'series': 'k3',}
              },
              {
                path: 'tradition/2902',
                component: ks_jiangsu,
                meta: {id: 2902, name: '广西快3', code: 'gxk3', 'series': 'k3',}
              },
              {
                path: 'tradition/2903',
                component: ks_jiangsu,
                meta: {id: 2903, name: '贵州快3', code: 'gzk3', 'series': 'k3',}
              },
              {
                path: 'tradition/2904',
                component: ks_jiangsu,
                meta: {id: 2904, name: '河北快3', code: 'hbk3', 'series': 'k3',}
              },
              {
                path: 'tradition/2905',
                component: ks_jiangsu,
                meta: {id: 2905, name: '湖北快3', code: 'hubk3', 'series': 'k3',}
              },
              {
                path: 'tradition/2906',
                component: ks_jiangsu,
                meta: {id: 2906, name: '上海快3', code: 'shk3', 'series': 'k3',}
              },
              {
                path: 'tradition/25',
                component: ks_jiangsu,
                meta: {id: 25, name: '安徽快3', code: 'ahk3', 'series': 'k3',}
              },
              {
                path: 'tradition/26',
                component: ks_jiangsu,
                meta: {id: 26, name: '吉林快3', code: 'jlk3', 'series': 'k3',}
              },
              {
                path: 'tradition/27',
                component: ks_jiangsu,
                meta: {id: 27, name: '快速快3', code: 'ksk3', 'series': 'k3',}
              },
              // pk10
              {
                path: 'tradition/2',
                component: pk_beijing,
                meta: {id: 2, name: '北京赛车', code: 'bjsc', 'series': 'pk10',}
              },
              {
                path: 'tradition/12',
                component: pk_beijing,
                meta: {id: 12, name: '快速赛车', code: 'kssc', 'series': 'pk10',}
              },
              {
                path: 'tradition/13',
                component: pk_beijing,
                meta: {id: 13, name: '3分赛车', code: 'sfsc', 'series': 'pk10',}
              },
              {
                path: 'tradition/3',
                component: pk_beijing,
                meta: {id: 3, name: '幸运飞艇', code: 'xyft', 'series': 'pk10',}
              },
              //快乐十分
              {
                path: 'tradition/5',
                component: kl_guangdong,
                meta: {id: 5, name: '广东快乐十分', code: 'gdklsf', 'series': 'klsf',}
              },
              {
                path: 'tradition/20',
                component: kl_guangdong,
                meta: {id: 20, name: '湖南快乐十分', code: 'hnklsf', 'series': 'klsf',}
              }, {
                path: 'tradition/6',
                component: kl_guangdong,
                meta: {id: 6, name: '幸运农场', code: 'xync', 'series': 'klsf',}
              },
              // 广东11选5
              {
                path: 'tradition/24',
                component: ele_guangdong,
                meta: {id: 24, name: '快速11选5', code: 'ks11x5', 'series': 'cp11x5',}
              },
              {
                path: 'tradition/7',
                component: ele_guangdong,
                meta: {id: 7, name: '广东11选5', code: 'gd11x5', 'series': 'cp11x5',}
              },
              {
                path: 'tradition/21',
                component: ele_guangdong,
                meta: {id: 21, name: '江西11选5', code: 'jx11x5', 'series': 'cp11x5',}
              },
              {
                path: 'tradition/22',
                component: ele_guangdong,
                meta: {id: 22, name: '上海11选5', code: 'sh11x5', 'series': 'cp11x5',}
              },
              {
                path: 'tradition/23',
                component: ele_guangdong,
                meta: {id: 23, name: '山东11选5', code: 'sd11x5', 'series': 'cp11x5',}
              },
              // 低势盘
              {
                path: 'tradition/11',
                component: di_fucai3D,
                meta: {id: 11, name: '福彩3D', code: 'fcsd', 'series': 'sd',}
              }, {
                path: 'tradition/28',
                component: di_fucai3D,
                meta: {id: 28, name: '排列3', code: 'pl3', 'series': 'sd',}
              }, {
                path: 'tradition/29',
                component: di_fucai3D,
                meta: {id: 29, name: '上海时时乐', code: 'shssl', 'series': 'sd',}
              },
            ]
          },
          {
            path: '/plays/loading',
            component: vpLoading,
          },
          {
            path: '/plays/trend',
            component: vpTrend,
          },

          // 个人中心
          {
            path: '/personal',
            component: personal,
            redirect: '/personal/mine',
            children: [
              {
                path: 'mine',
                component: mine
              }, {
                path: 'trading_record',
                component: trading_record
              }
            ]
          },

          {
            path: '/personal_index',
            component: personal_index,
            children: [
              {
                path: 'get_money',
                component: get_money,
                name: '线上取款'
              },

              {
                path: 'pay_money',
                component: deposit,
                name: '线上存款'
              },
              {
                path: 'deposit_submit',
                component: deposit_submit,
                name: '线上存款提交'
              },
              {
                path: 'game_record',
                component: game_record,
                name: '游戏记录'
              },
              {
                path: 'self_help',
                component: self_help,
                name: '推荐好友,获取收益'
              },
              {
                path: 'recommend',
                component: recommend,
                name: '推荐好友,获取收益2'
              },
              {
                path: 'deposit_send',
                component: deposit_send,
                name: '自助存送'
              },
              {
                path: 'demand',
                component: demand,
                name: '催账'
              },
              {
                path: 'message_index',
                component: message_index,
                name: '消息中心'
              },
              {
                path: 'bank_account',
                component: bank_account,
                name: '银行信息'
              },
              {
                path: 'set_bank',
                component: set_bank,
                name: '输入银行卡信息'
              },
              {
                path: 'honest',
                component: honest,
                name: '实时返水'
              },
              {
                path: 'personal_info',
                component: personal_info,
                name: '设置'
              },
              {
                path: 'myInfo',
                component: myInfo,
                name: '系统信息',
              },
              {
                path: 'lottery',
                component: lottery,
                name: '彩票记录'
              },
              {
                path: 'live',
                component: live,
                name: '视讯记录'
              },
              {
                path: 'chess',
                component: Chess,
                name: '棋牌记录'
              },
              {
                path: 'sport',
                component: sport,
                name: '体育记录'
              },
              {
                path: 'dianzi',
                component: dianzi,
                name: '电子记录'
              },
              {
                path: 'VRlottery',
                component: VRlottery,
                name: 'VR彩票记录'
              },
              {
                path: 'sent',
                component: sent,
                name: '编写信息',
              },
              {
                path: 'write',
                component: write,
                name: '已发信息',
              },
              {
                path: 'safety',
                component: safety,
                name: '安全问题'
              },
              {
                path: 'update_pwd/:id',
                component: update_pwd,
                name: '修改密码'
              },
              {
                path: 'mibao',
                component: mibao,
                name: '修改密保问题'
              },
              {
                path: 'agency_index',
                component: agency_index,
                name: '代理中心'
              },
              {
                path: 'team',
                component: team,
                name: '团队管理'
              },
              {
                path: 'open_account',
                component: open_account
              },
              {
                path: 'finance',
                component: finance,
                name: '财务管理'
              },
              {
                path: 'apply_agency',
                component: apply_agency,
                name: '申请代理'
              },
              {
                path: 'pay_help',
                component: pay_help,
                name: '转账帮助'
              },
              {
                path: 'kaihu',
                component: kaihu
                // name: '转账帮助'
              }
            ]
          },
          {
            path: '/scan',
            component: scan
          },
          {
            path: '/set_info',
            component: setInfo
          }
        ]
    },

  ]
})
