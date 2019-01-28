import axios from "axios"

const baseURL = "http://api.guimishuo1.com/erp"
const subsite_id = 3
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = baseURL

// 请求拦截器，给所有的请求加上user_id
// axios.interceptors.request.use(function (config) {
//     // 取出localStorage中存储的user_id值
//     let id
//     if(localStorage.getItem('user_id')) {
//         id = localStorage.getItem('user_id')
//     }else {
//         id = sessionStorage.getItem('user_id')
//     }
//     // 设置到请求头中 user_id这个名字是和后台商量规定的
//     config.headers['user_id'] = id
//     return config
//   }, function (error) {
//     return Promise.reject(error)
//   })


// 登录
export const login = params => {
    return axios.post("/login/login?subsite_id="+subsite_id,params).then(res => res.data)
}
// 用户资料页
export const getMember = params => {
    return axios.get("/user/edit",params).then(res => res.data)
}
// 商户资料页
export const getShopInfo = params => {
    return axios.post("/user/editshop?subsite_id="+subsite_id,params).then(res => res.data)
}
// 商户资料提交修改
export const setShopInfo = params => {
    return axios.post("/user/updateshop?subsite_id="+subsite_id,params).then(res => res.data)
}
// 用户资料修改确认
export const updateMemberInfo = params => {
    return axios.post("/user/update",params).then(res => res.data)
}
// 获取侧边栏
export const getAsideMenu = params => {
    return axios.post("/quanxian/menu2?subsite_id="+subsite_id,params).then(res => res.data)
}
// 获取子权限
export const getSubAuthority = params => {
    return axios.post("/quanxian/one?subsite_id="+subsite_id,params).then(res => res.data)
}
// 获取操作人能管理的仓库列表
export const getStoreList = params => {
    return axios.post("/allocation/adddata",params).then(res => res.data)
}
// 测试接口
export const test = params => {
    return axios.post("/clerk/lists",params).then(res => res.data)
}
// ------------------主页
    //首页数据统计
    export const indexCounts = params => {
        return axios.get("/index/counts",params).then(res => res.data)
    }
    //用户数据趋势
    export const userdatatrend = params => {
        return axios.post("/datastatistics/userdatatrend",params).then(res => res.data)
    }
    //用户来源
    export const userfrom = params => {
        return axios.post("/datastatistics/userfrom",params).then(res => res.data)
    }
    //月复购率
    export const repeatpurchase= params => {
        return axios.post("/datastatistics/repeatpurchase",params).then(res => res.data)
    }

// 头部=>系统消息
    // 获取系统消息列表
    export const getSysMsgList = params => {
        return axios.get("/msgsystem/lists",params).then(res => res.data)
    }
    // 删除消息
    export const delMsg = params => {
        return axios.post("/msgsystem/batchremove",params).then(res => res.data)
    }
    // 回复消息
    export const replyMsg = params => {
        return axios.post("/msgsystem/replay",params).then(res => res.data)
    }

//==========================================购货==================================================================
    //供应商详情
    export const supplier = params => {
        return axios.get("/supplier/view",params).then(res=>res.data)
    }
    //客户详情
    export const customer = params => {
        return axios.get("/customer/view",params).then(res=>res.data)
    }    
    //购货单
    export const shopBuyList =params => {
        return axios.get("/purchase/lists",params).then(res=>res.data)
    }
    //采购订单
    export const shopOderList = params =>{
        return axios.post("/purchase/lists",params).then(res=>res.data)
    }
    //采购入库单
    export const shopInList = params =>{
        return axios.get("/orpurchase/lists",params).then(res=>res.data)
    }
    //购货退货单
    export const shopReturnList = params =>{
        return axios.post("/repurchase/lists",params).then(res=>res.data)
    }
    //采购收货===
        //列表
    export const purchaseReceive = params => {
        return axios.post("/purchaseshouhuo/lists",params).then(res=>res.data)
    }
        //详情
    export const purchaseReDe = params => {
        return axios.post("/purchaseshouhuo/view",params).then(res=>res.data)
    }
        //新增
    export const purchaseReAdd = params => {
        return axios.post("/purchaseshouhuo/add",params).then(res=>res.data)
    }
    //采购设置
        //列表
    export const shopSetting = params => {
        return axios.get("/purchasesetting/lists",params).then(res=>res.data)
    } 
        //列表修改
    export const shopSettingEdit = params => {
        return axios.post("/purchasesetting/edit",params).then(res=>res.data)
    }

//======================================销货===========================================================================
    //销货单
    export const sellList = params =>{
        return axios.get("/sale/lists",params).then(res=>res.data)
    }
    //销货退货单
    export const sellReturnList = params =>{
        return axios.get("/resale/lists",params).then(res=>res.data)
    }

//====================================零售==========================================================================
    //零售退货单
    export const retailReturnList = params =>{
        return axios.get("/reretail/lists",params).then(res=>res.data)
    }
    //服务订单
    export const serveList = params =>{
        return axios.get("/itemorder/lists",params).then(res=>res.data)
    }
    //积分兑换
    export const integralExchange = params =>{
        return axios.get("/integral/lists",params).then(res=>res.data)
    }
//====================================货架===========================================================================
//批发=>货架设置
    // 获取货架列表
    export const getShelfsetList = params => {
        return axios.post("/shelfset/lists",params).then(res => res.data)
    }
    // 货架详情
    export const getShelfsetDetail = params => {
        return axios.post("/shelfset/view",params).then(res => res.data)
    }
    // 添加货架
    export const addShelfset = params => {
        return axios.post("/shelfset/add",params).then(res => res.data)
    }
    // 修改/删除 货架
    export const editShelfset = params => {
        return axios.post("/shelfset/edit",params).then(res => res.data)
    }

//批发=>店铺分区
    // 获取分区列表
    export const getShoppartitionList = params => {
        return axios.post("/shoppartition/lists",params).then(res => res.data)
    }
    // 分区详情
    export const getShoppartitionDetail = params => {
        return axios.post("/shoppartition/view",params).then(res => res.data)
    }
    // 添加分区
    export const addShoppartition = params => {
        return axios.post("/shoppartition/add",params).then(res => res.data)
    }
    // 修改/删除 分区
    export const editShoppartition = params => {
        return axios.post("/shoppartition/edit",params).then(res => res.data)
    }

//批发=>商品尺寸
    // 获取尺寸列表
    export const getProductsizeList = params => {
        return axios.post("/productsize/lists",params).then(res => res.data)
    }
    // 尺寸详情
    export const getProductsizeDetail = params => {
        return axios.post("/productsize/view",params).then(res => res.data)
    }
    // 添加尺寸
    export const addProductsize = params => {
        return axios.post("/productsize/add",params).then(res => res.data)
    }
    // 修改/删除 尺寸
    export const editProductsize = params => {
        return axios.post("/productsize/edit",params).then(res => res.data)
    }

//批发=>货架陈列
    // 获取陈列列表
    export const getShelfdisplayList = params => {
        return axios.post("/shelfdisplay/lists",params).then(res => res.data)
    }
    // 陈列详情
    export const getShelfdisplayDetail = params => {
        return axios.post("/shelfdisplay/view",params).then(res => res.data)
    }
    // 添加陈列
    export const addShelfdisplay = params => {
        return axios.post("/shelfdisplay/add",params).then(res => res.data)
    }
    // 修改/删除 陈列
    export const editShelfdisplay = params => {
        return axios.post("/shelfdisplay/edit",params).then(res => res.data)
    }

//====================================批发============================================================================
//批发=>客户区域
    // 获取客户列表
    export const getClientareaList = params => {
        return axios.post("/clientarea/lists",params).then(res => res.data)
    }
    // 客户详情
    export const getClientareaDetail = params => {
        return axios.post("/clientarea/view",params).then(res => res.data)
    }
    // 添加客户
    export const addClientarea = params => {
        return axios.post("/clientarea/add",params).then(res => res.data)
    }
    // 修改/删除 客户
    export const editClientarea = params => {
        return axios.post("/clientarea/edit",params).then(res => res.data)
    }

//批发=>客户档案
    // 获取档案列表
    export const getCustomerarchivesList = params => {
        return axios.post("/customerarchives/lists",params).then(res => res.data)
    }
    // 档案详情
    export const getCustomerarchivesDetail = params => {
        return axios.post("/customerarchives/view",params).then(res => res.data)
    }
    // 添加档案
    export const addCustomerarchives = params => {
        return axios.post("/customerarchives/add",params).then(res => res.data)
    }
    // 修改/删除 档案
    export const editCustomerarchives = params => {
        return axios.post("/customerarchives/edit",params).then(res => res.data)
    }

//批发=>批发订单
    // 获取订单列表
    export const getWholesaleordersList = params => {
        return axios.post("/wholesaleorders/lists",params).then(res => res.data)
    }
    // 订单详情
    export const getWholesaleordersDetail = params => {
        return axios.post("/wholesaleorders/view",params).then(res => res.data)
    }
    // 添加订单
    export const addWholesaleorders = params => {
        return axios.post("/wholesaleorders/add",params).then(res => res.data)
    }
    // 修改/删除 订单
    export const editWholesaleorders = params => {
        return axios.post("/wholesaleorders/edit",params).then(res => res.data)
    }

//批发=>批发销售单
    // 获取销售单列表
    export const getWholesalesalesorderList = params => {
        return axios.post("/wholesalesalesorder/lists",params).then(res => res.data)
    }
    // 销售单详情
    export const getWholesalesalesorderDetail = params => {
        return axios.post("/wholesalesalesorder/view",params).then(res => res.data)
    }
    // 添加销售单
    export const addWholesalesalesorder = params => {
        return axios.post("/wholesalesalesorder/add",params).then(res => res.data)
    }
    // 修改/删除 销售单
    export const editWholesalesalesorder = params => {
        return axios.post("/wholesalesalesorder/edit",params).then(res => res.data)
    }

//批发=>批发销售查询
    // 获取查询列表
    export const getWholesalesalesqueryList = params => {
        return axios.post("/wholesalesalesquery/lists",params).then(res => res.data)
    }
    // 查询详情
    export const getWholesalesalesqueryDetail = params => {
        return axios.post("/wholesalesalesquery/view",params).then(res => res.data)
    }
    // 添加查询
    export const addWholesalesalesquery = params => {
        return axios.post("/wholesalesalesquery/add",params).then(res => res.data)
    }
    // 修改/删除 查询
    export const editWholesalesalesquery = params => {
        return axios.post("/wholesalesalesquery/edit",params).then(res => res.data)
    }

//批发=>客户销售查询
    // 获取查询列表
    export const getCustomersalesqueryList = params => {
        return axios.post("/customersalesquery/lists",params).then(res => res.data)
    }
    // 查询详情
    export const getCustomersalesqueryDetail = params => {
        return axios.post("/customersalesquery/view",params).then(res => res.data)
    }
    // 添加查询
    export const addCustomersalesquery = params => {
        return axios.post("/customersalesquery/add",params).then(res => res.data)
    }
    // 修改/删除 查询
    export const editCustomersalesquery = params => {
        return axios.post("/customersalesquery/edit",params).then(res => res.data)
    }

//批发=>批发退货单
    // 获取退货单列表
    export const getWholesalereturnformList = params => {
        return axios.post("/wholesalereturnform/lists",params).then(res => res.data)
    }
    // 退货单详情
    export const getWholesalereturnformDetail = params => {
        return axios.post("/wholesalereturnform/view",params).then(res => res.data)
    }
    // 添加退货单
    export const addWholesalereturnform = params => {
        return axios.post("/wholesalereturnform/add",params).then(res => res.data)
    }
    // 修改/删除 退货单
    export const editWholesalereturnform = params => {
        return axios.post("/wholesalereturnform/edit",params).then(res => res.data)
    }

//====================================会员=========================================================================================
//会员=>会员设置
    // 获取设置列表
    export const getVipsettingList = params => {
        return axios.post("/vipsetting/lists",params).then(res => res.data)
    }
    // 设置详情
    export const getVipsettingDetail = params => {
        return axios.post("/vipsetting/view",params).then(res => res.data)
    }
    // 添加设置
    export const addVipsetting = params => {
        return axios.post("/vipsetting/add",params).then(res => res.data)
    }
    // 修改设置
    export const editVipsetting = params => {
        return axios.post("/vipsetting/edit",params).then(res => res.data)
    }

//会员=>会员档案
    // 获取档案列表
    export const getVipprofileList = params => {
        return axios.post("/vipprofile/lists",params).then(res => res.data)
    }
    // 档案详情
    export const getVipprofileDetail = params => {
        return axios.post("/vipprofile/view",params).then(res => res.data)
    }
    // 添加档案
    export const addVipprofile = params => {
        return axios.post("/vipprofile/add",params).then(res => res.data)
    }
    // 修改/删除 档案
    export const editVipprofile = params => {
        return axios.post("/vipprofile/edit",params).then(res => res.data)
    }

//会员=>会员积分
    // 获取积分列表
    export const getVipintegralList = params => {
        return axios.post("/vipintegral/lists",params).then(res => res.data)
    }
    // 积分详情
    export const getVipintegralDetail = params => {
        return axios.post("/vipintegral/view",params).then(res => res.data)
    }
    // 添加积分
    export const addVipintegral = params => {
        return axios.post("/vipintegral/add",params).then(res => res.data)
    }
    // 修改/删除 积分
    export const editVipintegral = params => {
        return axios.post("/vipintegral/edit",params).then(res => res.data)
    }

//会员=>提货券

//会员=>储值卡
    // 获取储值卡列表
    export const getValuecardList = params => {
        return axios.post("/valuecard/lists",params).then(res => res.data)
    }
    // 储值卡详情
    export const getValuecardDetail = params => {
        return axios.post("/valuecard/view",params).then(res => res.data)
    }
    // 添加储值卡
    export const addValuecard = params => {
        return axios.post("/valuecard/add",params).then(res => res.data)
    }
    // 修改/删除 储值卡
    export const editValuecard = params => {
        return axios.post("/valuecard/edit",params).then(res => res.data)
    }

//会员=>礼品管理
    // 获取礼品列表
    export const getGiftmanagementList = params => {
        return axios.post("/giftmanagement/lists",params).then(res => res.data)
    }
    // 礼品详情
    export const getGiftmanagementDetail = params => {
        return axios.post("/giftmanagement/view",params).then(res => res.data)
    }
    // 添加礼品
    export const addGiftmanagement = params => {
        return axios.post("/giftmanagement/add",params).then(res => res.data)
    }
    // 修改/删除 礼品
    export const editGiftmanagement = params => {
        return axios.post("/giftmanagement/edit",params).then(res => res.data)
    }

//会员=>联系跟进
    // 获取跟进列表
    export const getContactfollowList = params => {
        return axios.post("/contactfollow/lists",params).then(res => res.data)
    }
    // 跟进详情
    export const getContactfollowDetail = params => {
        return axios.post("/contactfollow/view",params).then(res => res.data)
    }
    // 添加跟进
    export const addContactfollow = params => {
        return axios.post("/contactfollow/add",params).then(res => res.data)
    }
    // 修改/删除 跟进
    export const editContactfollow = params => {
        return axios.post("/contactfollow/edit",params).then(res => res.data)
    }
    // 跟进评论列表
    export const getContactfollowCmtList = params => {
        return axios.post("/contactfollow/commentlist",params).then(res => res.data)
    }
    // 跟进评论 回复
    export const replyContactfollowCmt = params => {
        return axios.post("/contactfollow/comment",params).then(res => res.data)
    }
    // 跟进评论 删除
    export const delContactfollowCmt = params => {
        return axios.post("/contactfollow/commentdelete",params).then(res => res.data)
    }

//会员=>成交订单

//会员=>回款管理

//会员=>客户投诉
    // 获取投诉列表
    export const getCustomercomplainList = params => {
        return axios.post("/customercomplaint/lists",params).then(res => res.data)
    }
    // 投诉详情
    export const getCustomercomplainDetail = params => {
        return axios.post("/customercomplaint/view",params).then(res => res.data)
    }
    // 添加投诉
    export const addCustomercomplain = params => {
        return axios.post("/customercomplaint/add",params).then(res => res.data)
    }
    // 修改/删除 投诉
    export const editCustomercomplain = params => {
        return axios.post("/customercomplaint/edit",params).then(res => res.data)
    }
    // 投诉评论列表
    export const getCustomercomplainCmtList = params => {
        return axios.post("/customercomplaint/commentlist",params).then(res => res.data)
    }
    // 投诉评论 回复
    export const replyCustomercomplainCmt = params => {
        return axios.post("/customercomplaint/comment",params).then(res => res.data)
    }
    // 投诉评论 删除
    export const delCustomercomplainCmt = params => {
        return axios.post("/customercomplaint/commentdelete",params).then(res => res.data)
    }

//会员=>客户销售机会
    // 获取机会列表
    export const getSalesleadsList = params => {
        return axios.post("/salesleads/lists",params).then(res => res.data)
    }
    // 机会详情
    export const getSalesleadsDetail = params => {
        return axios.post("/salesleads/view",params).then(res => res.data)
    }
    // 添加机会
    export const addSalesleads = params => {
        return axios.post("/salesleads/add",params).then(res => res.data)
    }
    // 修改/删除 机会
    export const editSalesleads = params => {
        return axios.post("/salesleads/edit",params).then(res => res.data)
    }
    // 机会评论列表
    export const getSalesleadsCmtList = params => {
        return axios.post("/salesleads/commentlist",params).then(res => res.data)
    }
    // 机会评论 回复
    export const replySalesleadsCmt = params => {
        return axios.post("/salesleads/comment",params).then(res => res.data)
    }
    // 机会评论 删除
    export const delSalesleadsCmt = params => {
        return axios.post("/salesleads/commentdelete",params).then(res => res.data)
    }

// 会员=>客户关怀
    // 获取关怀列表
    export const getCustomercareList = params => {
        return axios.post("/customercare/lists",params).then(res => res.data)
    }
    // 添加关怀
    export const addCustomercare = params => {
        return axios.post("/customercare/add",params).then(res => res.data)
    }
    // 关怀详情
    export const getCustomercareDetail = params => {
        return axios.post("/customercare/view",params).then(res => res.data)
    }
    // 修改关怀
    export const editCustomercare = params => {
        return axios.post("/customercare/edit",params).then(res => res.data)
    }
//=====================职员============================
// 职员=>职员管理
    // 获取职员列表
    export const getWorkerList = params => {
        return axios.post("/clerk/lists",params).then(res => res.data)
    }
    // 添加职员
    export const addWorker = params => {
        return axios.post("/clerk/add",params).then(res => res.data)
    }
    // 删除职员
    export const delWorker = params => {
        return axios.get("/clerk/remove",params).then(res => res.data)
    }
    // 修改职员
    export const editWorker = params => {
        return axios.post("/clerk/edit",params).then(res => res.data)
    }
//职员=>签到
    // 签到
    export const signIn = params => {
        return axios.post("/clerk/sign",params).then(res => res.data)
    }
    // 签到
    export const signList = params => {
        return axios.post("/clerk/signlist",params).then(res => res.data)
    }


//====================================仓库=========================================================================
// 仓库=>仓库设置
    // 获取设置列表
    export const getWarehousesettingList = params => {
        return axios.post("/warehousesetting/lists",params).then(res => res.data)
    }
    // 获取设置详情
    export const getWarehousesettingDetail = params => {
        return axios.post("/warehousesetting/view",params).then(res => res.data)
    }
    // 添加设置
    export const addWarehousesetting = params => {
        return axios.post("/warehousesetting/add",params).then(res => res.data)
    }
    // 编辑/删除 设置 => 如果不传‘is_delete’参数的话是修改 如果传‘is_delete’参数的话就是删除
    export const editWarehousesetting = params => {
        return axios.post("/warehousesetting/edit",params).then(res => res.data)
    }

// 仓库=>调拨单
    // 获取单据列表
    export const getAllocationList = params => {
        return axios.get("/allocation/lists",params).then(res => res.data)
    }
    // 获取单据详情(包含内商品列表)
    export const getAllocationDetail = params => {
        return axios.get("/allocation/view",params).then(res => res.data)
    }
    // 添加单据
    export const addAllocation = params => {
        return axios.post("/allocation/add",params).then(res => res.data)
    }
    // 修改单据
    export const editAllocation = params => {
        return axios.post("/allocation/edit",params).then(res => res.data)
    }
    // 删除 单据
    export const delAllocation = params => {
        return axios.post("/allocation/remove",params).then(res => res.data)
    }
    // 添加商品
    export const addAllocationGoods = params => {
        return axios.post("/allocation/addgoods",params).then(res => res.data)
    }
    // 修改商品
    export const editAllocationGoods = params => {
        return axios.post("/allocation/editgoods",params).then(res => res.data)
    }
    // 删除商品
    export const delAllocationGoods = params => {
        return axios.post("/allocation/removegoods",params).then(res => res.data)
    }
    // 出库审核
    export const checkoutAllocation = params => {
        return axios.post("/allocation/checkout",params).then(res => res.data)
    }
    // 入库审核
    export const checkinAllocation = params => {
        return axios.post("/allocation/checkin",params).then(res => res.data)
    }

// 仓库=>库存查询
    // 获取库存列表
    export const getRoomList = params => {
        return axios.post("/room/lists",params).then(res => res.data)
    }
    // 获取库存详情
    export const getRoomDetail = params => {
        return axios.post("/room/view",params).then(res => res.data)
    }

// 仓库=>库存盘点
    // 获取盘点列表
    export const getRoomcheckList = params => {
        return axios.get("/roomcheck/lists",params).then(res => res.data)
    }
    // 编辑盘点
    export const editRoomcheck = params => {
        return axios.post("/roomcheck/edit",params).then(res => res.data)
    }
    // 添加盘点
    export const addRoomcheck = params => {
        return axios.post("/roomcheck/add",params).then(res => res.data)
    }
    // 删除盘点
    export const delRoomcheck = params => {
        return axios.post("/roomcheck/remove",params).then(res => res.data)
    }
    // 审核盘点
    export const checkRoomcheck = params => {
        return axios.post("/roomcheck/check",params).then(res => res.data)
    }

// 仓库=>库存预警
    // 获取预警列表
    export const getRoomwarningList = params => {
        return axios.get("/roomwarning/lists",params).then(res => res.data)
    }

// 仓库=>其他入库单
    // 获取入库单列表
    export const getOtpurchaseList = params => {
        return axios.get("/otpurchase/lists",params).then(res => res.data)
    }
    // 获取入库单详情
    export const getOtpurchaseDetail = params => {
        return axios.get("/otpurchase/view",params).then(res => res.data)
    }
    // 添加单据
    export const addOtpurchase = params => {
        return axios.post("/otpurchase/add",params).then(res => res.data)
    }
    // 编辑 单据
    export const editOtpurchase = params => {
        return axios.post("/otpurchase/edit",params).then(res => res.data)
    }
    // 删除 单据
    export const delOtpurchase = params => {
        return axios.post("/otpurchase/remove",params).then(res => res.data)
    }
    // 添加商品
    export const addOtpurchaseGoods = params => {
        return axios.post("/otpurchase/addgoods",params).then(res => res.data)
    }
    // 修改商品
    export const editOtpurchaseGoods = params => {
        return axios.post("/otpurchase/editgoods",params).then(res => res.data)
    }
    // 删除商品
    export const delOtpurchaseGoods = params => {
        return axios.post("/otpurchase/removegoods",params).then(res => res.data)
    }
    // 审核 单据
    export const checkOtpurchase = params => {
        return axios.post("/otpurchase/check",params).then(res => res.data)
    }

// 仓库=>其他出库单
    // 获取出库单列表
    export const getOtsaleList = params => {
        return axios.get("/otsale/lists",params).then(res => res.data)
    }
    // 获取出库单详情
    export const getOtsaleDetail = params => {
        return axios.get("/otsale/view",params).then(res => res.data)
    }
    // 添加单据
    export const addOtsale = params => {
        return axios.post("/otsale/add",params).then(res => res.data)
    }
    // 编辑 单据
    export const editOtsale = params => {
        return axios.post("/otsale/edit",params).then(res => res.data)
    }
    // 删除 单据
    export const delOtsale = params => {
        return axios.post("/otsale/remove",params).then(res => res.data)
    }
    // 添加商品
    export const addOtsaleGoods = params => {
        return axios.post("/otsale/addgoods",params).then(res => res.data)
    }
    // 修改商品
    export const editOtsaleGoods = params => {
        return axios.post("/otsale/editgoods",params).then(res => res.data)
    }
    // 删除商品
    export const delOtsaleGoods = params => {
        return axios.post("/otsale/removegoods",params).then(res => res.data)
    }
    // 审核 单据
    export const checkOtsale = params => {
        return axios.post("/otsale/check",params).then(res => res.data)
    }

// 仓库=>组合拆分
    // 获取列表
    export const getCombinationsplittingList = params => {
        return axios.post("/combinationsplitting/lists",params).then(res => res.data)
    }
    // 获取详情
    export const getCombinationsplittingDetail = params => {
        return axios.post("/combinationsplitting/view",params).then(res => res.data)
    }
    // 添加
    export const addCombinationsplitting = params => {
        return axios.post("/combinationsplitting/add",params).then(res => res.data)
    }
    // 编辑/删除
    export const editCombinationsplitting = params => {
        return axios.post("/combinationsplitting/edit",params).then(res => res.data)
    }

// 仓库=>成本调整单
    // 获取单据列表
    export const getAdjustmentorderList = params => {
        return axios.post("/adjustmentorder/lists",params).then(res => res.data)
    }
    // 获取单据详情
    export const getAdjustmentorderDetail = params => {
        return axios.post("/adjustmentorder/view",params).then(res => res.data)
    }
    // 添加单据
    export const addAdjustmentorder = params => {
        return axios.post("/adjustmentorder/add",params).then(res => res.data)
    }
    // 编辑/删除 单据
    export const editAdjustmentorder = params => {
        return axios.post("/adjustmentorder/edit",params).then(res => res.data)
    }
    // 获取单据内商品列表
    export const getAdjustmentorderGoodsList = params => {
        return axios.post("/adjustmentorder/viewgoods",params).then(res => res.data)
    }
    // 添加商品
    export const addAdjustmentorderGoods = params => {
        return axios.post("/adjustmentorder/addgoods",params).then(res => res.data)
    }
    // 修改商品
    export const editAdjustmentorderGoods = params => {
        return axios.post("/adjustmentorder/editgoods",params).then(res => res.data)
    }
    // 删除商品
    export const delAdjustmentorderGoods = params => {
        return axios.post("/adjustmentorder/removegoods",params).then(res => res.data)
    }
    // 审核/反审核 单据
    export const checkAdjustmentorder = params => {
        return axios.post("/adjustmentorder/check",params).then(res => res.data)
    }


// 仓库=>移仓单
    // 获取列表
    export const getMovereceiptList = params => {
        return axios.post("/movereceipt/lists",params).then(res => res.data)
    }
    // 获取详情
    export const getMovereceiptDetail = params => {
        return axios.post("/movereceipt/view",params).then(res => res.data)
    }
    // 添加
    export const addMovereceipt = params => {
        return axios.post("/movereceipt/add",params).then(res => res.data)
    }
    // 编辑/删除
    export const editMovereceipt = params => {
        return axios.post("/movereceipt/edit",params).then(res => res.data)
    }

// 仓库=>试用品出入库



//====================================资金====================================================================================
// 资金=>收款单
    // 获取收款单列表
    export const getGatherList = params => {
        return axios.get("/gather/lists",params).then(res => res.data)
    }
    // 获取收款单详情
    export const getGatherDetail = params => {
        return axios.get("/gather/view",params).then(res => res.data)
    }

// 资金=>付款单
    // 获取付款单列表
    export const getPaymentList = params => {
        return axios.get("/payment/lists",params).then(res => res.data)
    }
    // 获取付款单详情
    export const getPaymentDetail = params => {
        return axios.get("/payment/view",params).then(res => res.data)
    }

// 资金=>其他收入单
    // 获取其他收入单列表
    export const getOtgatherList = params => {
        return axios.get("/otgather/lists",params).then(res => res.data)
    }
    // 获取其他收入单详情
    export const getOtgatherDetail = params => {
        return axios.get("/otgather/view",params).then(res => res.data)
    }
    // 添加其他收入单
    export const addOtgather = params => {
        return axios.post("/otgather/add",params).then(res => res.data)
    }
    // 修改其他收入单
    export const editOtgather = params => {
        return axios.post("/otgather/edit",params).then(res => res.data)
    }
    // 删除其他收入单
    export const delOtgather = params => {
        return axios.post("/otgather/remove",params).then(res => res.data)
    }

// 资金=>其他支出单
    // 获取其他支出单列表
    export const getOtpaymentList = params => {
        return axios.post("/otpayment/lists",params).then(res => res.data)
    }
    // 获取其他支出单详情
    export const getOtpaymentDetail = params => {
        return axios.post("/otpayment/view",params).then(res => res.data)
    }
    // 其他支出单修改
    export const editOtpayment = params => {
        return axios.post("/otpayment/edit",params).then(res => res.data)
    }
    // 其他支出单添加
    export const addOtpayment = params => {
        return axios.post("/otpayment/add",params).then(res => res.data)
    }
    // 其他支出单删除
    export const dropOtpayment = params => {
        return axios.post("/otpayment/drop",params).then(res => res.data)
    }
    // 其他支出单审核
    export const checkOtpayment = params => {
        return axios.post("/otpayment/check",params).then(res => res.data)
    }

// 资金=>资金调拨单
    // 获取资金调拨单列表
    export const getEftList = params => {
        return axios.get("/eft/lists",params).then(res => res.data)
    }
    // 获取资金调拨单详情
    export const getEftDetail = params => {
        return axios.get("/eft/view",params).then(res => res.data)
    }
    // 添加其他收入单
    export const addEft = params => {
        return axios.post("/eft/add",params).then(res => res.data)
    }
    // 修改其他收入单
    export const editEft = params => {
        return axios.post("/eft/edit",params).then(res => res.data)
    }
    // 删除其他收入单
    export const delEft = params => {
        return axios.post("/eft/remove",params).then(res => res.data)
    }

// 资金=>客户预收款
    // 获取预收款列表
    export const getAdvancecollectionList = params => {
        return axios.post("/advancecollection/lists",params).then(res => res.data)
    }
    // 获取预收款详情
    export const getAdvancecollectionDetail = params => {
        return axios.post("/advancecollection/view",params).then(res => res.data)
    }
    // 添加预收款
    export const addAdvancecollection = params => {
        return axios.post("/advancecollection/add",params).then(res => res.data)
    }
    // 修改/删除 预收款
    export const editAdvancecollection = params => {
        return axios.post("/advancecollection/edit",params).then(res => res.data)
    }
    // 审核 预收款
    export const checkAdvancecollection = params => {
        return axios.post("/advancecollection/check",params).then(res => res.data)
    }
    
// 资金=>客户费用
    // 获取费用列表
    export const getCustomerchargeList = params => {
        return axios.post("/customercharge/lists",params).then(res => res.data)
    }
    // 获取费用详情
    export const getCustomerchargeDetail = params => {
        return axios.post("/customercharge/view",params).then(res => res.data)
    }
    // 添加费用
    export const addCustomercharge = params => {
        return axios.post("/customercharge/add",params).then(res => res.data)
    }
    // 修改/删除 费用
    export const editCustomercharge = params => {
        return axios.post("/customercharge/edit",params).then(res => res.data)
    }
    

// 资金=>客户结算
    // 获取结算列表
    export const getUsersettlementList = params => {
        return axios.post("/usersettlement/lists",params).then(res => res.data)
    }
    // 获取结算详情
    export const getUsersettlementDetail = params => {
        return axios.post("/usersettlement/view",params).then(res => res.data)
    }
    // 添加结算
    export const addUsersettlement = params => {
        return axios.post("/usersettlement/add",params).then(res => res.data)
    }
    // 修改/删除 结算
    export const editUsersettlement = params => {
        return axios.post("/usersettlement/edit",params).then(res => res.data)
    }
    // 审核 结算
    export const checkUsersettlement = params => {
        return axios.post("/usersettlement/check",params).then(res => res.data)
    }

// 资金=>客户账期分析
    // 获取分析列表
    export const getPayanalysisList = params => {
        return axios.post("/payanalysis/lists",params).then(res => res.data)
    }
    // 获取分析详情
    export const getPayanalysisDetail = params => {
        return axios.post("/payanalysis/view",params).then(res => res.data)
    }
    // 添加分析
    export const addPayanalysis = params => {
        return axios.post("/payanalysis/add",params).then(res => res.data)
    }
    // 修改/删除 分析
    export const editPayanalysis = params => {
        return axios.post("/payanalysis/edit",params).then(res => res.data)
    }

// 资金=>客户来往账款
    // 获取账款列表
    export const getCustomertransactionList = params => {
        return axios.post("/customertransaction/lists",params).then(res => res.data)
    }
    // 获取账款详情
    export const getCustomertransactionDetail = params => {
        return axios.post("/customertransaction/view",params).then(res => res.data)
    }
    // 添加账款
    export const addCustomertransaction = params => {
        return axios.post("/customertransaction/add",params).then(res => res.data)
    }
    // 修改/删除 账款
    export const editCustomertransaction = params => {
        return axios.post("/customertransaction/edit",params).then(res => res.data)
    }

// 资金=>供应商预付款
    // 获取预付款列表
    export const getSupplieradvanceList = params => {
        return axios.post("/supplieradvance/lists",params).then(res => res.data)
    }
    // 获取预付款详情
    export const getSupplieradvanceDetail = params => {
        return axios.post("/supplieradvance/view",params).then(res => res.data)
    }
    // 添加预付款
    export const addSupplieradvance = params => {
        return axios.post("/supplieradvance/add",params).then(res => res.data)
    }
    // 修改/删除 预付款
    export const editSupplieradvance = params => {
        return axios.post("/supplieradvance/edit",params).then(res => res.data)
    }
    // 审核 预付款
    export const checkSupplieradvance = params => {
        return axios.post("/supplieradvance/check",params).then(res => res.data)
    }

// 资金=>供应商费用

// 资金=>供应商结算
    // 获取结算列表
    export const getSuppliersettlementList = params => {
        return axios.post("/suppliersettlement/lists",params).then(res => res.data)
    }
    // 获取结算详情
    export const getSuppliersettlementDetail = params => {
        return axios.post("/suppliersettlement/view",params).then(res => res.data)
    }
    // 添加结算
    export const addSuppliersettlement = params => {
        return axios.post("/suppliersettlement/add",params).then(res => res.data)
    }
    // 修改/删除 结算
    export const editSuppliersettlement = params => {
        return axios.post("/suppliersettlement/edit",params).then(res => res.data)
    }
    // 审核 结算
    export const checkSuppliersettlement = params => {
        return axios.post("/suppliersettlement/check",params).then(res => res.data)
    }

// 资金=>供应商账期分析
    // 获取分析列表
    export const getSupplierpayanalysisList = params => {
        return axios.post("/supplierpayanalysis/lists",params).then(res => res.data)
    }
    // 获取分析详情
    export const getSupplierpayanalysisDetail = params => {
        return axios.post("/supplierpayanalysis/view",params).then(res => res.data)
    }
    // 添加分析
    export const addSupplierpayanalysis = params => {
        return axios.post("/supplierpayanalysis/add",params).then(res => res.data)
    }
    // 编辑/删除 分析 => 如果不传‘is_delete’参数的话是修改 如果传‘is_delete’参数的话就是删除
    export const editSupplierpayanalysis = params => {
        return axios.post("/supplierpayanalysis/edit",params).then(res => res.data)
    }

// 资金=>供应商账期分析
    // 获取分析列表
    export const getSuppliertransactionList = params => {
        return axios.post("/suppliertransaction/lists",params).then(res => res.data)
    }
    // 获取分析详情
    export const getSuppliertransactionDetail = params => {
        return axios.post("/suppliertransaction/view",params).then(res => res.data)
    }
    // 添加分析
    export const addSuppliertransaction = params => {
        return axios.post("/suppliertransaction/add",params).then(res => res.data)
    }
    // 编辑/删除 分析 => 如果不传‘is_delete’参数的话是修改 如果传‘is_delete’参数的话就是删除
    export const editSuppliertransaction = params => {
        return axios.post("/suppliertransaction/edit",params).then(res => res.data)
    }

// 资金=>联营结算
    // 获取结算列表
    export const getAssociatedcollectionList = params => {
        return axios.post("/associatedcollection/lists",params).then(res => res.data)
    }
    // 获取结算详情
    export const getAssociatedcollectionDetail = params => {
        return axios.post("/associatedcollection/view",params).then(res => res.data)
    }
    // 添加结算
    export const addAssociatedcollection = params => {
        return axios.post("/associatedcollection/add",params).then(res => res.data)
    }
    // 编辑/删除 结算 => 如果不传‘is_delete’参数的话是修改 如果传‘is_delete’参数的话就是删除
    export const editAssociatedcollection = params => {
        return axios.post("/associatedcollection/edit",params).then(res => res.data)
    }

// 资金=>机构费用
    // 获取费用列表
    export const getAgencycostsList = params => {
        return axios.post("/agencycosts/lists",params).then(res => res.data)
    }
    // 获取费用详情
    export const getAgencycostsDetail = params => {
        return axios.post("/agencycosts/view",params).then(res => res.data)
    }
    // 添加费用
    export const addAgencycosts = params => {
        return axios.post("/agencycosts/add",params).then(res => res.data)
    }
    // 编辑/删除 费用 => 如果不传‘is_delete’参数的话是修改 如果传‘is_delete’参数的话就是删除
    export const editAgencycosts = params => {
        return axios.post("/agencycosts/edit",params).then(res => res.data)
    }
    // 审核 费用
    export const checkAgencycosts = params => {
        return axios.post("/agencycosts/check",params).then(res => res.data)
    }

// 资金=>机构结算单
    // 获取结算单列表
    export const getAgencystatementList = params => {
        return axios.post("/agencystatement/lists",params).then(res => res.data)
    }
    // 获取结算单详情
    export const getAgencystatementDetail = params => {
        return axios.post("/agencystatement/view",params).then(res => res.data)
    }
    // 添加结算单
    export const addAgencystatement = params => {
        return axios.post("/agencystatement/add",params).then(res => res.data)
    }
    // 编辑/删除 结算单 => 如果不传‘is_delete’参数的话是修改 如果传‘is_delete’参数的话就是删除
    export const editAgencystatement = params => {
        return axios.post("/agencystatement/edit",params).then(res => res.data)
    }
    // 审核 结算单
    export const checkAgencystatement = params => {
        return axios.post("/agencystatement/check",params).then(res => res.data)
    }

// 资金=>机构账期分析
    // 获取分析列表
    export const getAgencypayanalysisList = params => {
        return axios.post("/agencypayanalysis/lists",params).then(res => res.data)
    }
    // 获取分析详情
    export const getAgencypayanalysisDetail = params => {
        return axios.post("/agencypayanalysis/view",params).then(res => res.data)
    }
    // 添加分析
    export const addAgencypayanalysis = params => {
        return axios.post("/agencypayanalysis/add",params).then(res => res.data)
    }
    // 编辑/删除 结算单 => 如果不传‘is_delete’参数的话是修改 如果传‘is_delete’参数的话就是删除
    export const editAgencypayanalysis = params => {
        return axios.post("/agencypayanalysis/edit",params).then(res => res.data)
    }

// 资金=>机构来往账款
    // 获取账款列表
    export const getAagencytranstionList = params => {
        return axios.post("/agencytranstion/lists",params).then(res => res.data)
    }
    // 获取账款详情
    export const getAagencytranstionDetail = params => {
        return axios.post("/agencytranstion/view",params).then(res => res.data)
    }
    // 添加账款
    export const addAagencytranstion = params => {
        return axios.post("/agencytranstion/add",params).then(res => res.data)
    }
    // 编辑/删除 结算单 => 如果不传‘is_delete’参数的话是修改 如果传‘is_delete’参数的话就是删除
    export const editAagencytranstion = params => {
        return axios.post("/agencytranstion/edit",params).then(res => res.data)
    }

// 资金=>核销表

// 资金=>利润表

//==========================================报表=======================================================================
// 报表=>购货对账单
    // 获取对账单列表
    export const getPurchasebillList = params => {
        return axios.get("/purchasebill/lists",params).then(res => res.data)
    }
    // 购货对账单详情
    export const getPurchaseDetail = params => {
        return axios.get("/purchase/view",params).then(res => res.data)
    }

// 报表=>采购入库对账单
    // 获取对账单列表
    export const getRpurchasebillList = params => {
        return axios.get("/rpurchasebill/lists",params).then(res => res.data)
    }
    // 获取对账单详情
    export const getRpurchasebillDetail = params => {
        return axios.get("/rpurchasebill/view",params).then(res => res.data)
    }

// 报表=>购货退货对账单
    // 获取对账单列表 => getRpurchasebillList

// 报表=>销货对账单
    // 获取列表
    export const getSalebillList = params => {
        return axios.get("/salebill/lists",params).then(res => res.data)
    }

// 报表=>销货退货对账单
    // 获取列表
    export const getResalebillList = params => {
        return axios.get("/resalebill/lists",params).then(res => res.data)
    }

// 报表=>服务对账单
    // 获取列表
    export const getItemorderbillList = params => {
        return axios.get("/itemorderbill/lists",params).then(res => res.data)
    }

// 报表=>商品利润表
    // 获取列表
    export const getApegoodsformList = params => {
        return axios.get("/apegoodsform/lists",params).then(res => res.data)
    }

// 报表=>销售利润表
    // 获取列表
    export const getProfitformList = params => {
        return axios.get("/profitform/lists",params).then(res => res.data)
    }
// 报表=>串码跟踪表
    // 获取列表
    export const getSerialformList = params => {
        return axios.get("/serialform/lists",params).then(res => res.data)
    }
    // 获取详情
    export const getSerialformDetail = params => {
        return axios.get("/serialform/view",params).then(res => res.data)
    }
// 报表=>来往单位欠款表
    // 获取列表
    export const getArrearsformList = params => {
        return axios.get("/arrearsform/lists",params).then(res => res.data)
    }
    // 获取详情
    export const getArrearsformDetail = params => {
        return axios.get("/arrearsform/view",params).then(res => res.data)
    }
    // 添加
    export const addArrearsform = params => {
        return axios.post("/arrearsform/add",params).then(res => res.data)
    }
    // 编辑
    export const editArrearsform = params => {
        return axios.post("/arrearsform/edit",params).then(res => res.data)
    }
    // 删除
    export const delArrearsform = params => {
        return axios.post("/arrearsform/remove",params).then(res => res.data)
    }

//==========================================硬件=================================================================================
//硬件=>小票打印机
    // 获取打印机列表
    export const getHardwareprintList = params => {
        return axios.post("/hardwareprint/lists",params).then(res => res.data)
    }
    // 添加打印机
    export const addHardwareprint = params => {
        return axios.post("/hardwareprint/add",params).then(res => res.data)
    }
    // 修改打印机
    export const editHardwareprint = params => {
        return axios.post("/hardwareprint/edit",params).then(res => res.data)
    }


//==========================================设置=================================================================================
// 设置=>客户管理
    // 获取客户管理列表
    export const getcustomerList = params => {
        return axios.post("/customer/lists",params).then(res => res.data)
    }
    // 获取客户详情
    export const getcustomerDetail = params => {
        return axios.get("/customer/view?user_id="+params).then(res => res.data)
    }
    // 修改
    export const getcustomerEd= params => {
        return axios.post("/customer/update",params).then(res => res.data)
    }
    // 删除
    export const getcustomerRmv= params => {
        return axios.post("/customer/remove",params).then(res => res.data)
    }
    // 添加
    export const getcustomerAdd= params => {
        return axios.post("/customer/insert",params).then(res => res.data)
    }
// 设置=>供应商管理
    // 获取供应商列表
    export const getsupplierList = params => {
        return axios.post("/supplier/lists",params).then(res => res.data)
    }
    // 获取供应商详情
    export const getsupplierDetail = params => {
        return axios.post("/supplier/view",params).then(res => res.data)
    }
    // 添加
    export const getsupplierAdd = params => {
        return axios.post("/supplier/add",params).then(res => res.data)
    }
    // 修改
    export const getsupplierEd = params => {
        return axios.post("/supplier/edit",params).then(res => res.data)
    }
    // 删除
    export const getsupplierRmv = params => {
        return axios.post("/supplier/remove",params).then(res => res.data)
    }

// 设置=>商品管理
    // 获取商品列表
    export const getGoodsList = params => {
        return axios.get("/goods/lists",params).then(res => res.data)
    }
    // 获取商品详情
    export const getGoodsDeail = params => {
        return axios.get("/goods/view",params).then(res => res.data)
    }
    // 添加
    export const getGoodsAdd = params => {
        return axios.post("/goods/add",params).then(res => res.data)
    }
    // 修改+删除
    export const getGoodsEd= params => {
        return axios.post("/goods/edit",params).then(res => res.data)
    }

// 设置=>仓库管理
    // 获取仓库列表
    export const getRepertoryList = params => {
        return axios.get("/roommanage/lists",params).then(res => res.data)
    }
    // 获取仓库详情
    export const getRepertoryDetail = params => {
        return axios.get("/roommanage/view",params).then(res => res.data)
    }
    // 删除仓库
    export const delRepertory = params => {
        return axios.get("/roommanage/remove",params).then(res => res.data)
    }
    // 添加仓库
    export const addRepertory = params => {
        return axios.post("/roommanage/add",params).then(res => res.data)
    }
    // 修改仓库
    export const editRepertory = params => {
        return axios.post("/roommanage/edit",params).then(res => res.data)
    }
    // 获取父仓库/子仓库/库管
    export const getRepertoryData = params => {
        return axios.post("/roommanage/data",params).then(res => res.data)
    }

// 设置=>资金账户
    // 获取账户列表
    export const getAccountList = params => {
        return axios.get("/account/lists",params).then(res => res.data)
    }
    // 获取账户详情
    export const getAccountDetail = params => {
        return axios.get("/account/info",params).then(res => res.data)
    }
    // 修改/删除账户
    export const editAccount = params => {
        return axios.get("/account/edit",params).then(res => res.data)
    }
    // 添加账户
    export const addAccount = params => {
        return axios.post("/account/add",params).then(res => res.data)
    }

// 设置=>服务管理
    // 获取服务列表
    export const getItemList = params => {
        return axios.post("/item/lists",params).then(res => res.data)
    }
    // 获取服务详情
    export const getItemDetail = params => {
        return axios.post("/item/info",params).then(res => res.data)
    }
    // 修改服务
    export const editItem = params => {
        return axios.post("/item/edit",params).then(res => res.data)
    }
    // 删除服务
    export const delItem = params => {
        return axios.post("/item/drop",params).then(res => res.data)
    }

// 设置=>商品类别
    // 获取商品类别列表
    export const getGoodsCate = params => {
        return axios.get("/category/lists",params).then(res => res.data)
    }
    // 添加商品分类
    export const addGoodsCate = params => {
        return axios.post("/category/add",params).then(res => res.data)
    }
    // 删除商品分类
    export const delGoodsCate = params => {
        return axios.get("/category/remove",params).then(res => res.data)
    }
    // 修改商品分类
    export const editGoodsCate = params => {
        return axios.post("/category/edit",params).then(res => res.data)
    }

// 设置=>计量单位管理
    // 获取计量单位列表
    export const getUnitList = params => {
        return axios.get("/unit/lists",params).then(res => res.data)
    }
    // 修改计量单位
    export const editUnit = params => {
        return axios.post("/unit/edit",params).then(res => res.data)
    }
    // 添加计量单位
    export const addUnit = params => {
        return axios.post("/unit/add",params).then(res => res.data)
    }
    // 删除计量单位
    export const delUnit = params => {
        return axios.get("/unit/remove",params).then(res => res.data)
    }

// 设置=>品牌管理
    // 获取品牌列表
    export const getBrandList = params => {
        return axios.get("/brand/lists",params).then(res => res.data)
    }
    // 获取品牌详情
    export const getBrandDetail = params => {
        return axios.get("/brand/view",params).then(res => res.data)
    }
    // 修改品牌
    export const editBrand = params => {
        return axios.post("/brand/edit",params).then(res => res.data)
    }
    // 添加品牌
    export const addBrand = params => {
        return axios.post("/brand/add",params).then(res => res.data)
    }
    // 删除品牌
    export const delBrand = params => {
        return axios.get("/brand/remove",params).then(res => res.data)
    }

// 设置=>条码管理
    // 获取条码列表
    export const getCodeList = params => {
        return axios.get("/code/lists",params).then(res => res.data)
    }
    // 条码详情
    export const getCodeDetail = params => {
        return axios.get("/code/view",params).then(res => res.data)
    }
    // 修改条码
    export const editCode = params => {
        return axios.post("/code/edit",params).then(res => res.data)
    }
    // 添加条码
    export const addCode = params => {
        return axios.post("/code/add",params).then(res => res.data)
    }
    // 删除条码
    export const delCode = params => {
        return axios.post("/code/drop",params).then(res => res.data)
    }
    
// 设置=>辅助属性
    // 获取辅助属性列表
    export const getAssistAttributeList = params => {
        return axios.get("/auxiliaryattr/lists",params).then(res => res.data)
    }
    // 辅助属性详情
    export const getAssistAttributeDetail = params => {
        return axios.get("/auxiliaryattr/view",params).then(res => res.data)
    }
    // 添加辅助属性
    export const addAssistAttribute = params => {
        return axios.post("/auxiliaryattr/add",params).then(res => res.data)
    }
    // 修改辅助属性
    export const editAssistAttribute = params => {
        return axios.post("/auxiliaryattr/edit",params).then(res => res.data)
    }
    // 删除辅助属性
    export const delAssistAttribute = params => {
        return axios.post("/auxiliaryattr/drop",params).then(res => res.data)
    }

// 设置=>系统参数
    // 获取基础信息,功能设置,收银设置数据
    export const getSystemparamData = params => {
        return axios.post("/systemparam/params",params).then(res => res.data)
    }
    // 保存基础信息
    export const savebaseinfo = params => {
        return axios.post("/systemparam/savebaseinfo",params).then(res => res.data)
    }
    // 保存功能设置
    export const savefuncsetting = params => {
        return axios.post("/systemparam/savefuncsetting",params).then(res => res.data)
    }
    // 保存收银设置
    export const savecashiersetting = params => {
        return axios.post("/systemparam/savecashiersetting",params).then(res => res.data)
    }
    // 获取编码规则
    export const getCoderuleList = params => {
        return axios.get("/coderule/lists",params).then(res => res.data)
    }
    // 获取编码详情
    export const getCoderuleDetail = params => {
        return axios.get("/coderule/view",params).then(res => res.data)
    }
    // 添加编码
    export const addCoderule = params => {
        return axios.post("/coderule/add",params).then(res => res.data)
    }
    // 编辑编码
    export const editCoderule = params => {
        return axios.post("/coderule/edit",params).then(res => res.data)
    }
    // 删除编码
    export const delCoderule = params => {
        return axios.post("/coderule/remove",params).then(res => res.data)
    }

// 设置=>权限设置
    // 获取权限列表
    export const getQuanxianList = params => {
        return axios.get("/quanxian/lists",params).then(res => res.data)
    }
    // 权限详情
    export const getQuanxianDetail = params => {
        return axios.post("/quanxian/view",params).then(res => res.data)
    }
    // 提交权限修改
    export const editQuanxian = params => {
        return axios.post("/quanxian/edit",params).then(res => res.data)
    }
    // 当前权限id换取其拥有的子权限列表
    export const getQuanxianOne = params => {
        return axios.post("/quanxian/one",params).then(res => res.data)
    }

// 设置=>操作日志
    // 获取日志列表
    export const getLogList = params => {
        return axios.get("/log/lists",params).then(res => res.data)
    }
    // 批量删除日志
    export const delLogs = params => {
        return axios.post("/log/batchdrop",params).then(res => res.data)
    }
    