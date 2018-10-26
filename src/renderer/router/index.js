import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: require('@/components/index').default
    },
    {
      path: '*',
      redirect: '/'
    },
    /*购货 四个*/
    {
      path: '/shopBuyList',
      name: 'shopBuyList',
      component: require('@/components/shopBuyList').default
    },
    {
      path: '/shopOderList',
      name: 'shopOderList',
      component: require('@/components/shopOderList').default
    },
    {
      path: '/shopReturnList',
      name: 'shopReturnList',
      component: require('@/components/shopReturnList').default
    },
  {
    path: '/shopInList',
    name: 'shopInList',
    component: require('@/components/shopInList').default
  },
  /*销货 二个*/
  {
    path: '/sellList',
    name: 'sellList',
    component: require('@/components/sellList').default
  },
  {
    path: '/sellReturnList',
    name: 'sellReturnList',
    component: require('@/components/sellReturnList').default
  },
  /*零售 四个*/
  // 收银台
  {
    path: '/cashierDesk',
    name: 'cashierDesk',
    component: require('@/components/cashierDesk').default,
    children:[
      {
          path: '/cashierDesk/goodsDesk',
          name: 'goodsDesk',
          component: require('@/components/goodsDesk').default,
          meta:{
            hidden:true
          }
      },
      {
          path: '/cashierDesk/serverDesk',
          name: 'serverDesk',
          component: require('@/components/serverDesk').default,
          meta:{
            hidden:true
          }
      }
    ],
    meta:{
      hidden:true
    }
  },     
  {
    path: '/retailReturnList',
    name: 'retailReturnList',
    component: require('@/components/retailReturnList').default
  },
  {
    path: '/serveList',
    name: 'serveList',
    component: require('@/components/serveList').default
  },
  {
    path: '/integralExchange',
    name: 'integralExchange',
    component: require('@/components/integralExchange').default
  },
  /*仓库 六个*/
  {
    path: '/allotList',
    name: 'allotList',
    component: require('@/components/allotList').default
  },
  {
    path: '/repertorySearch',
    name: 'repertorySearch',
    component: require('@/components/repertorySearch').default
  },
  {
    path: '/repertoryCheck',
    name: 'repertoryCheck',
    component: require('@/components/repertoryCheck').default
  },
  {
    path: '/repertoryWarn',
    name: 'repertoryWarn',
    component: require('@/components/repertoryWarn').default
  },
  {
    path: '/repertoryIn',
    name: 'repertoryIn',
    component: require('@/components/repertoryIn').default
  },
  {
    path: '/repertoryOut',
    name: 'repertoryOut',
    component: require('@/components/repertoryOut').default
  },
  /*资金 五个*/
  {
    path: '/moneyInList',
    name: 'moneyInList',
    component: require('@/components/moneyInList').default
  },
  {
    path: '/moneyPayList',
    name: 'moneyPayList',
    component: require('@/components/moneyPayList').default
  },
  {
    path: '/otherInList',
    name: 'otherInList',
    component: require('@/components/otherInList').default
  },
  {
    path: '/otherOutList',
    name: 'otherOutList',
    component: require('@/components/otherOutList').default
  },
  {
    path: '/moneyAllotList',
    name: 'moneyAllotList',
    component: require('@/components/moneyAllotList').default
  },
  /*报表 十一个*/
  {
    path: '/shopCheckList',
    name: 'shopCheckList',
    component: require('@/components/shopCheckList').default
  },
  {
    path: '/repertoryInCheckList',
    name: 'repertoryInCheckList',
    component: require('@/components/repertoryInCheckList').default
  },
  {
    path: '/repertoryReturnCheckList',
    name: 'repertoryReturnCheckList',
    component: require('@/components/repertoryReturnCheckList').default
  },
  {
    path: '/sellCheckList',
    name: 'sellCheckList',
    component: require('@/components/sellCheckList').default
  },
  {
    path: '/sellReturnCheckList',
    name: 'sellReturnCheckList',
    component: require('@/components/sellReturnCheckList').default
  },
  {
    path: '/serverCheckList',
    name: 'serverCheckList',
    component: require('@/components/serverCheckList').default
  },
  {
    path: '/dataInit',
    name: 'dataInit',
    component: require('@/components/dataInit').default
  },
  {
    path: '/goodsProfitList',
    name: 'goodsProfitList',
    component: require('@/components/goodsProfitList').default
  },
  {
    path: '/sellProfitList',
    name: 'sellProfitList',
    component: require('@/components/sellProfitList').default
  },
  {
    path: '/codeFollowList',
    name: 'codeFollowList',
    component: require('@/components/codeFollowList').default
  },
  {
    path: '/companyDebtList',
    name: 'companyDebtList',
    component: require('@/components/companyDebtList').default
  },
  /*设置 十八个*/
  {
    path: '/customerManage',
    name: 'customerManage',
    component: require('@/components/customerManage').default
  },    
  {
    path: '/supplierManage',
    name: 'supplierManage',
    component: require('@/components/supplierManage').default
  },
  {
    path: '/goodsManage',
    name: 'goodsManage',
    component: require('@/components/goodsManage').default
  },
  {
    path: '/repertoryManage',
    name: 'repertoryManage',
    component: require('@/components/repertoryManage').default
  },
  {
    path: '/myAccount',
    name: 'myAccount',
    component: require('@/components/myAccount').default
  },
  {
    path: '/serveManage',
    name: 'serveManage',
    component: require('@/components/serveManage').default
  },
  {
    path: '/goodsCategory',
    name: 'goodsCategory',
    component: require('@/components/goodsCategory').default
  },
  {
    path: '/measurementUnit',
    name: 'measurementUnit',
    component: require('@/components/measurementUnit').default
  },
  {
    path: '/brandManage',
    name: 'brandManage',
    component: require('@/components/brandManage').default
  },
  {
    path: '/barCodeManage',
    name: 'barCodeManage',
    component: require('@/components/barCodeManage').default
  },
  {
    path: '/assistAttribute',
    name: 'assistAttribute',
    component: require('@/components/assistAttribute').default
  },
  {
    path: '/workerList',
    name: 'workerList',
    component: require('@/components/workerList').default
  },
  {
    path: '/dataBackup',
    name: 'dataBackup',
    component: require('@/components/dataBackup').default
  },
  {
    path: '/authoritySet',
    name: 'authoritySet',
    component: require('@/components/authoritySet').default
  },
  {
    path: '/dataAuthorize',
    name: 'dataAuthorize',
    component: require('@/components/dataAuthorize').default
  },
  {
    path: '/alwaysUse',
    name: 'alwaysUse',
    component: require('@/components/alwaysUse').default
  },
  {
    path: '/operateLogs',
    name: 'operateLogs',
    component: require('@/components/operateLogs').default
  },
  {
    path: '/systemParameter',
    name: 'systemParameter',
    component: require('@/components/systemParameter').default
  },
]
})