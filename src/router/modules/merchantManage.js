import Layout from '@/views/layout/Layout'

export default [
  {
    path: '/merchantManage',
    component: Layout,
    redirect: '/merchantManage/AddMerchant',
    alwaysShow: true, // will always show the root menu
    name: 'merchantManage',
    meta: {
      title: '商户管理',
      icon: 'international'
    },
    children: [{
      path: 'MerchantList',
      component: () => import('@/views/merchantManage/MerchantList'),
      name: 'MerchantList',
      meta: {
        title: '商户列表'
      }
    }, {
      path: 'AddMerchant',
      component: () => import('@/views/merchantManage/AddMerchant'),
      name: 'AddMerchant',
      meta: {
        title: '商户用户'
      }
    }, {
      path: 'AssetDetail/:memberId',
      component: () => import('@/views/merchantManage/AssetDetail'),
      name: 'AssetDetail',
      hidden: true,
      meta: {
        title: '资金信息'
      }
    }]
  }
]
