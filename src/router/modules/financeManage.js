import Layout from '@/views/layout/Layout'

export default [
  {
    path: '/financeManage',
    component: Layout,
    redirect: '/financeManage/RechargeRecord',
    alwaysShow: true, // will always show the root menu
    name: 'financeManage',
    meta: {
      title: '财务管理',
      icon: 'money',
    },
    children: [{
      path: 'RechargeRecord',
      component: () => import('@/views/financeManage/RechargeRecord'),
      name: 'RechargeRecord',
      meta: {
        title: '充值记录'
      }
    },{
      path: 'WithdrawRecord',
      component: () => import('@/views/financeManage/WithdrawRecord'),
      name: 'WithdrawRecord',
      meta: {
        title: '提现记录'
      }
    },{
      path: 'CashFlowRecord',
      component: () => import('@/views/financeManage/CashFlowRecord'),
      name: 'CashFlowRecord',
      meta: {
        title: '资金流水记录'
      }
    },{
      path: 'BorrowCurrencyRecord',
      component: () => import('@/views/financeManage/BorrowCurrencyRecord'),
      name: 'BorrowCurrencyRecord',
      meta: {
        title: '借币记录'
      }
    },]
  },
]
