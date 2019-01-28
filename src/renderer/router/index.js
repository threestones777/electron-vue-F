import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  routes: [
    // temp
    {
      path: '/temp',
      name: 'temp',
      component: require('@/components/temp').default,
    },
    // 收银台
    {
      path: '/erp_cashier_goodslists',
      name: 'cashierDesk',
      component: require('@/components/cashierDesk').default,
    },
    // 登陆页面
    {
      path: '/login',
      name: 'login',
      component: require('@/components/login').default,
    },
    // 其他没有的页面重定向至主页
    {
      path: '*',
      redirect: '/login'
    },
    // 主页重定向至index页
    {
      path: '/',
      name: 'home',
      component: require('@/components/home').default,
      redirect:{
        path:'/index'
      },
      children:[
        { // index页
          name:'index',
          path:'/index',
          component:require('@/components/index').default,
        },
        { // 系统消息
          path: '/sysMessage',
          name: 'sysMessage',
          component: require('@/components/sysMessage').default
        },
        { // 用户资料页
          path: '/memberAccount',
          name: 'memberAccount',
          component: require('@/components/memberAccount').default
        },
        { // 商户资料页
          path: '/traderInfo',
          name: 'traderInfo',
          component: require('@/components/traderInfo').default
        },
        { // 测试页面
          path: '/erp_test_lists',
          name: 'test',
          component: require('@/components/test').default
        },

        // 购货 erp_purchase ==================================================================================
        {
          path: '/erp_purchasesetting_lists', // 采购设置
          name: 'shopSetting',
          component: require('@/components/erp_purchase/shopSetting').default
        },
        {
          path: '/erp_purchase_lists', // 购货单
          name: 'shopBuyList',
          component: require('@/components/erp_purchase/shopBuyList').default
        },
        {
          path: '/erp_opurchase_lists', // 采购订单
          name: 'shopOderList',
          component: require('@/components/erp_purchase/shopOderList').default
        },
        {
          path: '/erp_repurchase_lists', // 购货退货单
          name: 'shopReturnList',
          component: require('@/components/erp_purchase/shopReturnList').default
        },
        {
          path: '/erp_orpurchase_lists', // 采购入库单
          name: 'shopInList',
          component: require('@/components/erp_purchase/shopInList').default
        },
        {
          path: '/erp_buhuofenxi_lists', // 补货分析
          name: 'replyAnalysis',
          component: require('@/components/erp_purchase/replyAnalysis').default
        },
        {
          path: '/erp_purchaseshouhuo_lists', // 采购收货
          name: 'purchaseReceive',
          component: require('@/components/erp_purchase/purchaseReceive').default
        },

        // 零售 erp_retail =====================================================================================
        {
          path: '/erp_retailsetting_lists', // 零售设置
          name: 'retailSetting',
          component: require('@/components/erp_retail/retailSetting').default
        },
        {
          path: '/erp_reretail_lists', // 零售退货单
          name: 'retailReturnList',
          component: require('@/components/erp_retail/retailReturnList').default
        },
        {
          path: '/erp_itemorder_lists', // 服务订单
          name: 'serveList',
          component: require('@/components/erp_retail/serveList').default
        },
        {
          path: '/erp_integral_lists', // 积分兑换
          name: 'integralExchange',
          component: require('@/components/erp_retail/integralExchange').default
        },
        {
          path: '/erp_shopassistant_lists', // 营业员
          name: 'shopAssistant',
          component: require('@/components/erp_retail/shopAssistant').default
        },
        {
          path: '/erp_takegoods_takegoods', // 卡券核销
          name: 'cardVoucher',
          component: require('@/components/erp_retail/cardVoucher').default
        },
        {
          path: '/erp_cashiercheck_lists', // 收银对账
          name: 'cashierCheck',
          component: require('@/components/erp_retail/cashierCheck').default
        },
        {
          path: '/erp_tradinginquiry_lists', // 流水查询
          name: 'tradingInquiry',
          component: require('@/components/erp_retail/tradingInquiry').default
        },

        // 调拨 erp_allocation =====================================================================================
        {
          path: '/erp_shippingsetting_lists', // 配送设置
          name: 'shippingSetting',
          component: require('@/components/erp_allocation/shippingSetting').default
        },
        {
          path: '/erp_transfer_lists', // 调货申请
          name: 'transferApplication',
          component: require('@/components/erp_allocation/transferApplication').default
        },
        {
          path: '/erp_peihuosuggest_lists', // 配货分析
          name: 'distributionAnalysis',
          component: require('@/components/erp_allocation/distributionAnalysis').default
        },
        {
          path: '/erp_directoutlist_lists', // 直调出库单
          name: 'directOutList',
          component: require('@/components/erp_allocation/directOutList').default
        },
        {
          path: '/erp_directreceivinglist_lists', // 直调收货单
          name: 'directReceivingList',
          component: require('@/components/erp_allocation/directReceivingList').default
        },
        {
          path: '/erp_allocatingquery_lists', // 调拨查询
          name: 'allocatingQuery',
          component: require('@/components/erp_allocation/allocatingQuery').default
        },
        {
          path: '/erp_buhuojianyi_lists', // 补货建议
          name: 'replenishmentProposal',
          component: require('@/components/erp_allocation/replenishmentProposal').default
        },
        {
          path: '/erp_storedirect_lists', // 店间直调申请
          name: 'storeDirectApplications',
          component: require('@/components/erp_allocation/storeDirectApplications').default
        },
        {
          path: '/erp_warehouse_lists', // 退仓指令
          name: 'warehouseInstructions',
          component: require('@/components/erp_allocation/warehouseInstructions').default
        },
        {
          path: '/erp_allocatingmaoli_lists', // 调拨毛利
          name: 'allocatingMaori',
          component: require('@/components/erp_allocation/allocatingMaori').default
        },

        // 货架 erp_shelves ============================================================================================
        {
          path: '/erp_shelfset_lists', // 货架设置
          name: 'shelvesSet',
          component: require('@/components/erp_shelves/shelvesSet').default
        },
        {
          path: '/erp_shoppartition_lists', // 店铺分区
          name: 'shopPartition',
          component: require('@/components/erp_shelves/shopPartition').default
        },
        {
          path: '/erp_productsize_lists', // 商品尺寸
          name: 'productSize',
          component: require('@/components/erp_shelves/productSize').default
        },
        {
          path: '/erp_shelfdisplay_lists', // 货架陈列
          name: 'shelfDisplay',
          component: require('@/components/erp_shelves/shelfDisplay').default
        },

        // 批发 erp_wholesale =========================================================================================
        {
          path: '/erp_clientarea_lists', // 客户区域
          name: 'clientArea',
          component: require('@/components/erp_wholesale/clientArea').default
        },
        {
          path: '/erp_customerarchives_lists', // 客户档案
          name: 'customerArchives',
          component: require('@/components/erp_wholesale/customerArchives').default
        },
        {
          path: '/erp_wholesaleorders_lists', // 批发订单
          name: 'wholesaleOrders',
          component: require('@/components/erp_wholesale/wholesaleOrders').default
        },
        {
          path: '/erp_wholesalesalesorder_lists', // 批发销售单
          name: 'wholesaleSalesOrder',
          component: require('@/components/erp_wholesale/wholesaleSalesOrder').default
        },
        {
          path: '/erp_wholesalesalesquery_lists', // 批发销售查询
          name: 'wholesaleSalesQuery',
          component: require('@/components/erp_wholesale/wholesaleSalesQuery').default
        },
        {
          path: '/erp_customersalesquery_lists', // 客户销售查询
          name: 'customerSalesQuery',
          component: require('@/components/erp_wholesale/customerSalesQuery').default
        },
        {
          path: '/erp_wholesalereturnform_lists', // 批发退货单
          name: 'wholesaleReturnForm',
          component: require('@/components/erp_wholesale/wholesaleReturnForm').default
        },

        // 会员 erp_member ==============================================================================
        {
          path: '/erp_vipsetting_lists', // 会员设置
          name: 'vipSetting',
          component: require('@/components/erp_member/vipSetting').default
        },
        {
          path: '/erp_vipprofile_lists', // 会员档案
          name: 'vipProfile',
          component: require('@/components/erp_member/vipProfile').default
        },
        {
          path: '/erp_vipintegral_lists', // 会员积分
          name: 'vipIntegral',
          component: require('@/components/erp_member/vipIntegral').default
        },
        {
          path: '/erp_takegoodslist_takegoodslist', // 提货券
          name: 'giftVoucher',
          component: require('@/components/erp_member/giftVoucher').default
        },
        {
          path: '/erp_valuecardtype_lists', // 储值卡
          name: 'valueCard',
          component: require('@/components/erp_member/valueCard').default
        },
        {
          path: '/erp_giftmanagement_lists', // 礼品管理
          name: 'giftManagement',
          component: require('@/components/erp_member/giftManagement').default
        },
        {
          path: '/erp_contactfollow_lists', // 联系跟进
          name: 'contactFollow',
          component: require('@/components/erp_member/contactFollow').default
        },
        {
          path: '/erp_makedeal_lists', // 成交订单
          name: 'makeDeal',
          component: require('@/components/erp_member/makeDeal').default
        },
        {
          path: '/erp_receivablemanagement_lists', // 回款管理
          name: 'receivableManagement',
          component: require('@/components/erp_member/receivableManagement').default
        },
        {
          path: '/erp_customercomplaint_lists', // 客户投诉
          name: 'customerComplaint',
          component: require('@/components/erp_member/customerComplaint').default
        },
        {
          path: '/erp_salesleads_lists', // 销售机会
          name: 'salesLeads',
          component: require('@/components/erp_member/salesLeads').default
        },
        {
          path: '/erp_customercare_lists', // 客户关怀
          name: 'customerCare',
          component: require('@/components/erp_member/customerCare').default
        },

        // 职员 erp_clerks ===============================================================================================
        {
          path: '/erp_clerk_lists', // 职员列表
          name: 'workerList',
          component: require('@/components/erp_clerks/workerList').default
        },
        {
          path: '/erp_approval_lists', // 审批
          name: 'Approval',
          component: require('@/components/erp_clerks/Approval').default
        },
        {
          path: '/erp_checkingin_lists', // 考勤
          name: 'checkingIn',
          component: require('@/components/erp_clerks/checkingIn').default
        },
        {
          path: '/erp_signin_lists', // 签到
          name: 'signIn',
          component: require('@/components/erp_clerks/signIn').default
        },
        {
          path: '/erp_dailyrecord_lists', // 日志
          name: 'dailyRecord',
          component: require('@/components/erp_clerks/dailyRecord').default
        },
        {
          path: '/erp_announcement_lists', // 公告
          name: 'announcement',
          component: require('@/components/erp_clerks/announcement').default
        },
        {
          path: '/erp_commission_lists', // 代办
          name: 'commission',
          component: require('@/components/erp_clerks/commission').default
        },
        {
          path: '/erp_schedule_lists', // 日程
          name: 'schedule',
          component: require('@/components/erp_clerks/schedule').default
        },
        {
          path: '/erp_document_lists', // 文件
          name: 'document',
          component: require('@/components/erp_clerks/document').default
        },

        // 仓库 erp_store ==================================================================================================
        {
          path: '/erp_warehousesetting_lists', // 仓库设置
          name: 'warehouseSetting',
          component: require('@/components/erp_store/warehouseSetting').default
        },
        {
          path: '/erp_allocation_lists', // 调拨单
          name: 'allotList',
          component: require('@/components/erp_store/allotList').default
        },
        {
          path: '/erp_room_lists', // 库存查询
          name: 'repertorySearch',
          component: require('@/components/erp_store/repertorySearch').default
        },
        {
          path: '/erp_roomcheck_lists', // 库存盘点
          name: 'repertoryCheck',
          component: require('@/components/erp_store/repertoryCheck').default
        },
        {
          path: '/erp_roomwarning_lists', // 库存预警
          name: 'repertoryWarn',
          component: require('@/components/erp_store/repertoryWarn').default
        },
        {
          path: '/erp_otpurchase_lists', // 其他入库单
          name: 'repertoryIn',
          component: require('@/components/erp_store/repertoryIn').default
        },
        {
          path: '/erp_otsale_lists', // 其它出库单
          name: 'repertoryOut',
          component: require('@/components/erp_store/repertoryOut').default
        },
        {
          path: '/erp_combinationsplitting_lists', // 组合拆分
          name: 'combinationSplitting',
          component: require('@/components/erp_store/combinationSplitting').default
        },
        {
          path: '/erp_adjustmentorder_lists', // 成本调整单
          name: 'adjustmentOrder',
          component: require('@/components/erp_store/adjustmentOrder').default
        },
        {
          path: '/erp_movereceipt_lists', // 移仓单
          name: 'moveReceipt',
          component: require('@/components/erp_store/moveReceipt').default
        },
        {
          path: '/erp_trysuppliesstorage_lists', // 试用品出入库
          name: 'trySuppliesStorage',
          component: require('@/components/erp_store/trySuppliesStorage').default
        },

        // 资金 erp_money ==============================================================================================
        {
          path: '/erp_gather_lists', // 收款单
          name: 'moneyInList',
          component: require('@/components/erp_money/moneyInList').default
        },
        {
          path: '/erp_payment_lists', // 付款单
          name: 'moneyPayList',
          component: require('@/components/erp_money/moneyPayList').default
        },
        {
          path: '/erp_otgather_lists', // 其他收入单
          name: 'otherInList',
          component: require('@/components/erp_money/otherInList').default
        },
        {
          path: '/erp_otpayment_lists', // 其他支出单
          name: 'otherOutList',
          component: require('@/components/erp_money/otherOutList').default
        },
        {
          path: '/erp_eft_lists', // 资金调拨单
          name: 'moneyAllotList',
          component: require('@/components/erp_money/moneyAllotList').default
        },
        {
          path: '/erp_advancecollection_lists', // 客户预收款
          name: 'advanceCollection',
          component: require('@/components/erp_money/advanceCollection').default
        },
        {
          path: '/erp_customercharge_lists', // 客户费用
          name: 'customerCharge',
          component: require('@/components/erp_money/customerCharge').default
        },
        {
          path: '/erp_usersettlement_lists', // 客户结算
          name: 'usersSettlement',
          component: require('@/components/erp_money/usersSettlement').default
        },
        {
          path: '/erp_payanalysis_lists', // 客户账期分析
          name: 'customerPayAnalysis',
          component: require('@/components/erp_money/customerPayAnalysis').default
        },
        {
          path: '/erp_customertransaction_lists', // 客户来往账款
          name: 'customerTransaction',
          component: require('@/components/erp_money/customerTransaction').default
        },
        {
          path: '/erp_supplieradvance_lists', //供应商预付款
          name: 'advancePayment',
          component: require('@/components/erp_money/advancePayment').default
        },
        {
          path: '/erp_suppliercost_lists', // 供应商费用
          name: 'supplierCost',
          component: require('@/components/erp_money/supplierCost').default
        },
        {
          path: '/erp_suppliersettlement_lists', // 供应商结算
          name: 'supplierSettlement',
          component: require('@/components/erp_money/supplierSettlement').default
        },
        {
          path: '/erp_supplierpayanalysis_lists', // 供应商账期分析
          name: 'supplierPayAnalysis',
          component: require('@/components/erp_money/supplierPayAnalysis').default
        },
        {
          path: '/erp_suppliertransaction_lists', // 供应商来往账款
          name: 'supplierTransaction',
          component: require('@/components/erp_money/supplierTransaction').default
        },
        {
          path: '/erp_associatedcollection_lists', // 联营结算
          name: 'associatedCollection',
          component: require('@/components/erp_money/associatedCollection').default
        },
        {
          path: '/erp_agencycosts_lists', // 机构费用
          name: 'agencyCosts',
          component: require('@/components/erp_money/agencyCosts').default
        },
        {
          path: '/erp_agencystatement_lists', // 机构结算单
          name: 'agencyStatements',
          component: require('@/components/erp_money/agencyStatements').default
        },
        {
          path: '/erp_agencypayanalysis_lists', // 机构账期分析
          name: 'agencyPayAnalysis',
          component: require('@/components/erp_money/agencyPayAnalysis').default
        },
        {
          path: '/erp_agencytranstion_lists', // 机构来往账款
          name: 'agencyTransaction',
          component: require('@/components/erp_money/agencyTransaction').default
        },
        {
          path: '/erp_verificationform_lists', // 核销单
          name: 'verificationForm',
          component: require('@/components/erp_money/verificationForm').default
        },
        {
          path: '/erp_profitstatement_lists', // 利润表
          name: 'profitStatement',
          component: require('@/components/erp_money/profitStatement').default
        },

        // 报表 erp_report ===============================================================================================
        {
          path: '/erp_purchasebill_lists', // 购货对账单
          name: 'shopCheckList',
          component: require('@/components/erp_report/shopCheckList').default
        },
        {
          path: '/erp_repertoryinchecklist_lists', // 采购入库对账单
          name: 'repertoryInCheckList',
          component: require('@/components/erp_report/repertoryInCheckList').default
        },
        {
          path: '/erp_rpurchasebill_lists', // 购货退货对账单
          name: 'repertoryReturnCheckList',
          component: require('@/components/erp_report/repertoryReturnCheckList').default
        },
        {
          path: '/erp_salebill_lists', // 销货对账单
          name: 'sellCheckList',
          component: require('@/components/erp_report/sellCheckList').default
        },
        {
          path: '/erp_resalebill_lists', // 销货退货对账单
          name: 'sellReturnCheckList',
          component: require('@/components/erp_report/sellReturnCheckList').default
        },
        {
          path: '/erp_itemorderbill_lists', // 服务对账单
          name: 'serverCheckList',
          component: require('@/components/erp_report/serverCheckList').default
        },
        {
          path: '/erp_datainit_lists', // 数据初始化
          name: 'dataInit',
          component: require('@/components/erp_report/dataInit').default
        },
        {
          path: '/erp_goodsprofit_lists', // 商品利润表
          name: 'goodsProfitList',
          component: require('@/components/erp_report/goodsProfitList').default
        },
        {
          path: '/erp_profitform_lists', // 销售利润表
          name: 'sellProfitList',
          component: require('@/components/erp_report/sellProfitList').default
        },
        {
          path: '/erp_serialform_lists', // 串码跟踪表
          name: 'codeFollowList',
          component: require('@/components/erp_report/codeFollowList').default
        },
        {
          path: '/erp_arrearsform_lists', // 往来单位欠款表
          name: 'companyDebtList',
          component: require('@/components/erp_report/companyDebtList').default
        },

        // 资产 erp_assets =================================================================================================
        {
          path: '/erp_storeasset_lists', // 店铺资产
          name: 'storeAsset',
          component: require('@/components/erp_assets/storeAsset').default
        },
        {
          path: '/erp_equipmentwarranty_lists', // 设备保修
          name: 'equipmentWarranty',
          component: require('@/components/erp_assets/equipmentWarranty').default
        },

        // 硬件 erp_hardware =================================================================================================
        {
          path: '/erp_guidepos_lists', // 导购员pos
          name: 'guidePos',
          component: require('@/components/erp_hardware/guidePos').default
        },
        {
          path: '/erp_arguide_lists', // 店内AR导购
          name: 'ARguide',
          component: require('@/components/erp_hardware/ARguide').default
        },
        {
          path: '/erp_shoppingscreen_lists', // 无人货架导购屏
          name: 'shoppingScreen',
          component: require('@/components/erp_hardware/shoppingScreen').default
        },
        {
          path: '/erp_storecamera_lists', // 店内摄像头
          name: 'storeCamera',
          component: require('@/components/erp_hardware/storeCamera').default
        },
        {
          path: '/erp_inscreencontent_lists', // 店内互动屏
          name: 'inScreenContent',
          component: require('@/components/erp_hardware/inScreenContent').default
        },
        {
          path: '/erp_ticketprinter_lists', // 小票打印机
          name: 'ticketPrinter',
          component: require('@/components/erp_hardware/ticketPrinter').default
        },
        {
          path: '/erp_facesystem_lists', // 人脸识别
          name: 'faceSystem',
          component: require('@/components/erp_hardware/faceSystem').default
        },
        {
          path: '/erp_outscreencontent_lists', // 店外广告屏
          name: 'outScreenContent',
          component: require('@/components/erp_hardware/outScreenContent').default
        },
        {
          path: '/erp_wificontent_lits', // 店铺wifi
          name: 'wifiContent',
          component: require('@/components/erp_hardware/wifiContent').default
        },

        // 设置 erp_config ================================================================================================
        {
          path: '/erp_customer_lists', // 客户管理
          name: 'customerManage',
          component: require('@/components/erp_config/customerManage').default
        },    
        {
          path: '/erp_supplier_lists', // 供应商管理
          name: 'supplierManage',
          component: require('@/components/erp_config/supplierManage').default
        },
        {
          path: '/erp_goods_lists', // 商品管理
          name: 'goodsManage',
          component: require('@/components/erp_config/goodsManage').default
        },
        {
          path: '/erp_roommanage_lists', // 仓库管理
          name: 'repertoryManage',
          component: require('@/components/erp_config/repertoryManage').default
        },
        {
          path: '/erp_account_lists', // 资金账户
          name: 'myAccount',
          component: require('@/components/erp_config/myAccount').default
        },
        {
          path: '/erp_item_lists', // 服务管理
          name: 'serveManage',
          component: require('@/components/erp_config/serveManage').default
        },
        {
          path: '/erp_category_lists', // 商品类别
          name: 'goodsCategory',
          component: require('@/components/erp_config/goodsCategory').default
        },
        {
          path: '/erp_unit_lists', // 计量单位
          name: 'measurementUnit',
          component: require('@/components/erp_config/measurementUnit').default
        },
        {
          path: '/erp_brand_lists', // 品牌管理
          name: 'brandManage',
          component: require('@/components/erp_config/brandManage').default
        },
        {
          path: '/erp_code_lists', // 条码管理
          name: 'barCodeManage',
          component: require('@/components/erp_config/barCodeManage').default
        },
        {
          path: '/erp_auxiliaryattr_lists', // 辅助属性
          name: 'assistAttribute',
          component: require('@/components/erp_config/assistAttribute').default
        },
        {
          path: '/erp_quanxian_lists', // 权限设置
          name: 'authoritySet',
          component: require('@/components/erp_config/authoritySet').default
        },
        {
          path: '/erp_dataauthorize_lists', // 数据授权
          name: 'dataAuthorize',
          component: require('@/components/erp_config/dataAuthorize').default
        },
        // {
        //   path: '/alwaysUse',
        //   name: 'alwaysUse',
        //   component: require('@/components/erp_config/alwaysUse').default
        // },
        {
          path: '/erp_log_lists', // 操作日志
          name: 'operateLogs',
          component: require('@/components/erp_config/operateLogs').default
        },
        {
          path: '/erp_systemparam_params', // 系统参数
          name: 'systemParameter',
          component: require('@/components/erp_config/systemParameter').default
        },
        
      ]
    },     
  ]
})

router.beforeEach((to, from, next) => {
  let user_id = sessionStorage.getItem('user_id');
  // 如果已经登录，放行
  if (user_id) {
    next()
  } else {
    // 如果没有登录，访问非登录页面,则跳转到登录页面
    if (to.path !== '/login') {
      next({path: '/login'})
    } else {
      // 如果没有登录，但访问的是登录页面,直接进入
      next()
    }
  }
})

export default router