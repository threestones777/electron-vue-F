import axios from "axios"

const baseURL = "http://api.guimishuo1.com/erp"

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = baseURL

// 请求拦截器，给所有的请求加上user_id
axios.interceptors.request.use(function (config) {
    // 取出localStorage中存储的user_id值
    let id = sessionStorage.getItem('user_id')
    // 设置到请求头中 user_id这个名字是和后台商量规定的
    config.headers['user_id'] = id
    return config
  }, function (error) {
    return Promise.reject(error)
  })
//==========================================购货=======================================
    //采购设置
        //列表
        export const shopSetting = params => {
            return axios.post("/purchasesetting/lists",params).then(res=>res.data)
        } 
        //详情
        export const shopSettingDe = params => {
            return axios.post("/purchasesetting/view",params).then(res=>res.data)
        } 
        //列表修改+删除
        export const shopSettingEdit = params => {
            return axios.post("/purchasesetting/edit",params).then(res=>res.data)
        } 
        //添加
        export const shopSettingAdd = params => {
            return axios.post("/purchasesetting/add",params).then(res=>res.data)
        }
    //购货单
        //  详情
        export const purchaseDe = params => {
            return axios.get("/purchase/view",params).then(res=>res.data)
        } 
    //采购订单
        //详情
        export const shopOderListDe = params => {
            return axios.get("/purchase/view",params).then(res=>res.data)
        } 
        //审核
        export const shopOderListCh = params => {
            return axios.post("/purchase/check",params).then(res=>res.data)
        } 
        //审核
        export const shopOderQueryBcode = params => {
            return axios.post("/purchase/querybarcode",params).then(res=>res.data)
        } 
        //添加商品
        export const shopOderAddG = params => {
            return axios.post("/purchase/addgoods",params).then(res=>res.data)
        } 
        //手动添加商品
        export const addGoodsByHand = params => {
            return axios.post("/purchase/addgoodstoerp",params).then(res=>res.data)
        } 
        //修改商品
        export const shopOderEdG = params => {
            return axios.post("/purchase/editgoods",params).then(res=>res.data)
        } 
        //删除商品
        export const shopOderDeG = params => {
            return axios.post("/purchase/removegoods",params).then(res=>res.data)
        } 
        //订单修改
        export const shopOderEd = params => {
            return axios.post("/purchase/edit",params).then(res=>res.data)
        } 
        //订单添加
        export const shopOderAdd = params => {
            return axios.post("/purchase/add",params).then(res=>res.data)
        } 
        //订单删除
        export const shopOderRm = params => {
            return axios.post("/purchase/remove",params).then(res=>res.data)
        } 
    //采购入库单
        //详情
        export const shopInListDe = params =>{
            return axios.post("/orpurchase/view",params).then(res=>res.data)
        }   
        //添加商品
        export const shopInListAddG = params =>{
            return axios.post("/orpurchase/addgoods",params).then(res=>res.data)
        }   
        //修改商品
        export const shopInListEdG = params =>{
            return axios.post("/orpurchase/editgoods",params).then(res=>res.data)
        }   
        //删除商品
        export const shopInListDeG = params =>{
            return axios.post("/orpurchase/removegoods",params).then(res=>res.data)
        }   
        //审核
        export const shopInListCh = params =>{
            return axios.post("/orpurchase/check",params).then(res=>res.data)
        }   
        //添加
        export const shopInListAdd = params =>{
            return axios.post("/orpurchase/add",params).then(res=>res.data)
        }   
        //修改
        export const shopInListEd = params =>{
            return axios.post("/orpurchase/edit",params).then(res=>res.data)
        }   
        //删除
        export const shopInListRmv = params =>{
            return axios.post("/orpurchase/remove",params).then(res=>res.data)
        }   
    //补货分析 
        //列表
    export const replyAnalysis = params => {
        return axios.post("/buhuofenxi/lists",params).then(res=>res.data)
    }
        //详情
    export const replyAnalysisDe = params => {
        return axios.post("/buhuofenxi/view",params).then(res=>res.data)
    }
        //添加
    export const replyAnalysisAdd = params => {
        return axios.post("/buhuofenxi/add",params).then(res=>res.data)
    }
    //修改+删除
    export const replyAnalysisEd = params => {
        return axios.post("/buhuofenxi/edit",params).then(res=>res.data)
    }
    //采购收货
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
        //修改+删除
        export const purchaseReEd = params => {
            return axios.post("/purchaseshouhuo/edit",params).then(res=>res.data)
        } 
    //购货退货
        //详情
        export const repurchaseDe = params => {
            return axios.get("/repurchase/view",params).then(res=>res.data)
        }
        //添加商品
        export const repurchaseAddG = params => {
            return axios.post("/repurchase/addgoods",params).then(res=>res.data)
        }
        //修改商品
        export const repurchaseEdG = params => {
            return axios.post("/repurchase/editgoods",params).then(res=>res.data)
        }
        //删除商品
        export const repurchaseRmv = params => {
            return axios.post("/repurchase/removegoods",params).then(res=>res.data)
        }
        //审核
        export const repurchaseCh = params => {
            return axios.post("/repurchase/check",params).then(res=>res.data)
        }
        //添加订单
        export const repurchaseAdd = params => {
            return axios.post("/repurchase/add",params).then(res=>res.data)
        }
        //退货
        export const repurchaseBa = params => {
            return axios.post("/repurchase/back",params).then(res=>res.data)
        }
        //删除单
        export const repurchaseDel = params => {
            return axios.post("/repurchase/remove",params).then(res=>res.data)
        }
//=======================================零售=======================================
    //零售设置
        //列表
        export const retailSetting = params => {
            return axios.post("/retailsetting/lists",params).then(res=>res.data)
        } 
        //详情
        export const retailSettingDe = params => {
            return axios.post("/retailsetting/view",params).then(res=>res.data)
        } 
        //添加
        export const retailSettingAdd = params => {
            return axios.post("/retailsetting/add",params).then(res=>res.data)
        } 
        //修改+删除
        export const retailSettingEd = params => {
            return axios.post("/retailsetting/edit",params).then(res=>res.data)
        } 
    //零售退货单
        //详情
        export const reretailReturnDe = params => {
            return axios.get("/reretail/view",params).then(res=>res.data)
        } 
    //服务订单
        //详情
        export const itemorderDe = params => {
            return axios.get("/itemorder/view",params).then(res=>res.data)
        } 
    //积分兑换
        //列表
        export const integraList = params => {
            return axios.post("/creditsexchange/lists",params).then(res=>res.data)
        } 
        //详情
        export const integraListDe = params => {
            return axios.post("/creditsexchange/view",params).then(res=>res.data)
        } 
        //修改+删除
        export const integraListEd = params => {
            return axios.post("/creditsexchange/edit",params).then(res=>res.data)
        } 
        //添加
        export const integraListAdd = params => {
            return axios.post("/creditsexchange/add",params).then(res=>res.data)
        } 
    //收银对账
        //列表
        export const cashierCheck = params => {
            return axios.post("/cashiercheck/lists",params).then(res=>res.data)
        } 
        //详情
        export const cashierCheckDe = params => {
            return axios.post("/cashiercheck/view",params).then(res=>res.data)
        } 
        //添加
        export const cashierCheckAdd = params => {
            return axios.post("/cashiercheck/add",params).then(res=>res.data)
        } 
        //修改+删除
        export const cashierCheckEd = params => {
            return axios.post("/cashiercheck/edit",params).then(res=>res.data)
        } 
    //流水查询
        //列表
        export const tradingInquiry = params => {
            return axios.post("/tradinginquiry/lists",params).then(res=>res.data)
        } 
        //详情
        export const tradingInquiryDe = params => {
            return axios.post("/tradinginquiry/view",params).then(res=>res.data)
        } 
        //添加
        export const tradingInquiryAdd = params => {
            return axios.post("/tradinginquiry/add",params).then(res=>res.data)
        } 
        //修改+删除
        export const tradingInquiryEd = params => {
            return axios.post("/tradinginquiry/edit",params).then(res=>res.data)
        } 
    //营业员
        //列表
        export const shopassistant = params => {
            return axios.post("/shopassistant/lists",params).then(res=>res.data)
        } 
        //详情
        export const shopassistantDe = params => {
            return axios.post("/shopassistant/view",params).then(res=>res.data)
        } 
        //添加
        export const shopassistantAdd = params => {
            return axios.post("/shopassistant/add",params).then(res=>res.data)
        } 
        //修改
        export const shopassistantEd = params => {
            return axios.post("/shopassistant/edit",params).then(res=>res.data)
        } 
        //删除
        export const shopassistantRmv = params => {
            return axios.post("/shopassistant/remove",params).then(res=>res.data)
        } 
    //卡券核销/提货券
        //列表
        export const cardVoucher = params => {
            return axios.post("/takegoodslist/takegoodslist",params).then(res=>res.data)
        } 
        //详情+查看
        export const cardVoucherDe = params => {
            return axios.post("/takegoodslist/tglist",params).then(res=>res.data)
        }  
        //添加
        export const cardVoucherAdd = params => {
            return axios.post("/takegoodslist/add",params).then(res=>res.data)
        } 
        //发放
        export const cardVoucherIssue = params => {
            return axios.post("/takegoodslist/send",params).then(res=>res.data)
        }
        //修改
        export const cardVoucherEd = params => {
            return axios.post("/takegoodslist/edit",params).then(res=>res.data)
        } 
        //删除提货券类型
        export const cardVoucherRmv = params => {
            return axios.post("/takegoodslist/remove",params).then(res=>res.data)
        } 
        //删除提货券
        export const cardVoucherRmvB = params => {
            return axios.post("/takegoodslist/removebonus",params).then(res=>res.data)
        } 
        //批量删除提货券
        export const cardVoucherAddDe = params => {
            return axios.post("/takegoodslist/batch",params).then(res=>res.data)
        } 
    //储值卡
        //--------------储值卡类型
        //列表
        export const valueCardType = params => {
            return axios.post("/valuecardtype/lists",params).then(res=>res.data)
        } 
        //详情
        export const valueCardTypeDe = params => {
            return axios.post("/valuecardtype/view",params).then(res=>res.data)
        } 
        //修改
        export const valueCardTypeEd = params => {
            return axios.post("/valuecardtype/edit",params).then(res=>res.data)
        } 
        //添加
        export const valueCardTypeAdd = params => {
            return axios.post("/valuecardtype/add",params).then(res=>res.data)
        } 
        //发放
        export const valueCardIssue = params => {
            return axios.post("/valuecard/add",params).then(res=>res.data)
        } 
        //--------------储值卡
        //列表
        export const valueCard = params => {
            return axios.post("/valuecard/lists",params).then(res=>res.data)
        } 
        //详情
        export const valueCardDe = params => {
            return axios.post("/valuecard/view",params).then(res=>res.data)
        } 
        //修改
        export const valueCardEd = params => {
            return axios.post("/valuecard/edit",params).then(res=>res.data)
        } 
        //==========================================调拨=======================================
    //配送设置
        //列表
        export const shippingSetting = params => {
            return axios.post("/shippingsetting/lists",params).then(res=>res.data)
        } 
        //详情
        export const shippingSettingDe = params => {
            return axios.post("/shippingsetting/view",params).then(res=>res.data)
        } 
        //添加
        export const shippingSettingAdd = params => {
            return axios.post("/shippingsetting/add",params).then(res=>res.data)
        } 
        //修改+删除
        export const shippingSettingEd = params => {
            return axios.post("/shippingsetting/edit",params).then(res=>res.data)
        } 
    //调货申请
        //列表
        export const transfer = params => {
            return axios.post("/transfer/lists",params).then(res=>res.data)
        } 
        //详情
        export const transferDe = params => {
            return axios.post("/transfer/view",params).then(res=>res.data)
        } 
        //添加
        export const transferAdd = params => {
            return axios.post("/transfer/add",params).then(res=>res.data)
        } 
        //修改+删除
        export const transferEd = params => {
            return axios.post("/transfer/edit",params).then(res=>res.data)
        } 
        //商品列表
        export const transferGoods = params => {
            return axios.post("/transfer/goodslist",params).then(res=>res.data)
        } 
        //添加商品
        export const transferAddG = params => {
            return axios.post("/transfer/addgoods",params).then(res=>res.data)
        } 
        //修改商品
        export const transferEdG = params => {
            return axios.post("/transfer/editgoods",params).then(res=>res.data)
        } 
        //删除商品
        export const transferRmv = params => {
            return axios.post("/transfer/removegoods",params).then(res=>res.data)
        } 
        //审核
        export const transferChe = params => {
            return axios.post("/transfer/check",params).then(res=>res.data)
        } 
    //调拨查询
        //列表
        export const allocat = params => {
            return axios.post("/allocatingquery/lists",params).then(res=>res.data)
        } 
        //详情
        export const allocatDe = params => {
            return axios.post("/allocatingquery/view",params).then(res=>res.data)
        } 
        //添加
        export const allocatAdd = params => {
            return axios.post("/allocatingquery/add",params).then(res=>res.data)
        }
        //修改+删除
        export const allocatEd = params => {
            return axios.post("/allocatingquery/edit",params).then(res=>res.data)
        } 
    //调拨毛利
        //列表
        export const Maori = params => {
            return axios.post("/allocatingmaoli/lists",params).then(res=>res.data)
        } 
        //详情
        export const MaoriDe = params => {
            return axios.post("/allocatingmaoli/view",params).then(res=>res.data)
        } 
        //添加
        export const MaoriAdd = params => {
            return axios.post("/allocatingmaoli/add",params).then(res=>res.data)
        }
        //修改+删除
        export const MaoriEd = params => {
            return axios.post("/allocatingmaoli/edit",params).then(res=>res.data)
        } 
    //退仓指令
        //列表
        export const warehouseIn = params => {
            return axios.post("warehouse/lists",params).then(res=>res.data)
        } 
        //详情
        export const warehouseInDe = params => {
            return axios.post("/warehouse/view",params).then(res=>res.data)
        } 
        //添加
        export const warehouseInAdd = params => {
            return axios.post("/warehouse/add",params).then(res=>res.data)
        }
        //修改+删除
        export const warehouseInEd = params => {
            return axios.post("/warehouse/edit",params).then(res=>res.data)
        } 
        //审核
        export const warehouseCh = params => {
            return axios.post("/warehouse/check",params).then(res=>res.data)
        } 
    //直调出库单
        //列表
        export const directOut = params => {
            return axios.post("/directoutlist/lists",params).then(res=>res.data)
        } 
        //详情
        export const directOutDe = params => {
            return axios.post("/directoutlist/view",params).then(res=>res.data)
        } 
        //添加
        export const directOutAdd = params => {
            return axios.post("/directoutlist/add",params).then(res=>res.data)
        }
        //修改+删除
        export const directOutEd = params => {
            return axios.post("/directoutlist/edit",params).then(res=>res.data)
        } 
        //发货
        export const directOutSend = params => {
            return axios.post("/directoutlist/sendgoods",params).then(res=>res.data)
        } 
    //直调收货单
        //列表
        export const directRece = params => {
            return axios.post("/directreceivinglist/lists",params).then(res=>res.data)
        } 
        //详情
        export const directReceDe = params => {
            return axios.post("/directreceivinglist/view",params).then(res=>res.data)
        } 
        //添加
        export const directReceAdd = params => {
            return axios.post("/directreceivinglist/add",params).then(res=>res.data)
        }
        //修改+删除
        export const directReceEd = params => {
            return axios.post("/directreceivinglist/edit",params).then(res=>res.data)
        } 
        //收货
        export const directReceRec = params => {
            return axios.post("/directreceivinglist/receivegoods",params).then(res=>res.data)
        } 
    //补货建议
        //列表
        export const Proposal = params => {
            return axios.post("/buhuojianyi/lists",params).then(res=>res.data)
        } 
        //详情
        export const ProposalDe = params => {
            return axios.post("/buhuojianyi/view",params).then(res=>res.data)
        } 
        //添加
        export const ProposalAdd = params => {
            return axios.post("/buhuojianyi/add",params).then(res=>res.data)
        }
        //修改+删除
        export const ProposalEd = params => {
            return axios.post("/buhuojianyi/edit",params).then(res=>res.data)
        } 
    //店间直调申请
        //列表
        export const storeDirect = params => {
            return axios.post("/storedirect/lists",params).then(res=>res.data)
        } 
        //详情
        export const storeDirectDe = params => {
            return axios.post("/storedirect/view",params).then(res=>res.data)
        } 
        //添加
        export const storeDirectAdd = params => {
            return axios.post("/storedirect/add",params).then(res=>res.data)
        }
        //修改+删除
        export const storeDirectEd = params => {
            return axios.post("/storedirect/edit",params).then(res=>res.data)
        } 
    //配货分析 列表
        //列表
        export const distribution = params => {
            return axios.post("/peihuosuggest/lists",params).then(res=>res.data)
        } 
        //详情
        export const distributionDe = params => {
            return axios.post("/peihuosuggest/view",params).then(res=>res.data)
        } 
        //添加
        export const distributionAdd = params => {
            return axios.post("/peihuosuggest/add",params).then(res=>res.data)
        }
        //修改+删除
        export const distributionEd = params => {
            return axios.post("/peihuosuggest/edit",params).then(res=>res.data)
        } 
        //审核
        export const distributionCh = params => {
            return axios.post("/peihuosuggest/check",params).then(res=>res.data)
        } 
//==========================================零售=======================================
    //收银台
        //营业员
        export const saleclerklist = params => {
            return axios.get("/clerk/saleclerklist",params).then(res=>res.data)
        } 
        //商品列表
        export const goodsDesk = params => {
            return axios.post("/cashier/goodslists",params).then(res=>res.data)
        } 
        //发送验证码
        export const sendMobileCode = params => {
            return axios.post("/customer/sendmobilecode",params).then(res=>res.data)
        } 
        //发送验证码
        export const register = params => {
            return axios.post("/customer/register",params).then(res=>res.data)
        } 
        //收银员列表
        export const cashierList = params => {
            return axios.get("/cashier/cashierlist",params).then(res=>res.data)
        } 
        //购物区列表
        export const cart = params => {
            return axios.get("/cashier/cart",params).then(res=>res.data)
        } 
        //购物区添加
        export const cartAdd = params => {
            return axios.post("/cashier/addtocart",params).then(res=>res.data)
        } 
        //修改购物车商品数量
        export const editCartN = params => {
            return axios.get("/cashier/editcart",params).then(res=>res.data)
        } 
        //删除购物车商品
        export const cartDel = params => {
            return axios.get("/cashier/dropcartgoods",params).then(res=>res.data)
        } 
        //清空购物车
        export const clearcart = params => {
            return axios.get("/cashier/clear-cart",params).then(res=>res.data)
        } 
        //检查订单
        export const checkout = params => {
            return axios.post("/cashier/checkout",params).then(res=>res.data)
        } 
        //创建订单
        export const createOrder = params => {
            return axios.post("/cashier/done",params).then(res=>res.data)
        } 
        //手工改价
        export const priceChange = params => {
            return axios.post("/cashier/pricechange",params).then(res=>res.data)
        } 
        //服务列表
        export const serverDesk = params => {
            return axios.get("/cashier/serverlists",params).then(res=>res.data)
        } 
        //挂起
        export const pickData = params => {
            return axios.get("/cashier/addguaqi",params).then(res=>res.data)
        } 
        //取消挂起
        export const cancelPick = params => {
            return axios.get("/cashier/cancelguaqi",params).then(res=>res.data)
        } 
        //现金支付
        export const cashPay = params => {
            return axios.post("/cashier/cashpay",params).then(res=>res.data)
        } 
        //余额支付
        export const balancepay = params => {
            return axios.post("/cashier/balancepay",params).then(res=>res.data)
        } 
//--------------------------------------------报表-----------------------------------------------
//购货对账单
    // 列表
    export const getPurchasebillList = params => {
        return axios.get("/purchasebill/lists",params).then(res => res.data)
    }
    // 详情
    export const getPurchaseDetail = params => {
        return axios.get("/purchasebill/view",params).then(res => res.data)
    }     
//购货退货对账单
    // 详情
    export const rpurchasebillDetail = params => {
        return axios.get("/rpurchasebill/view",params).then(res => res.data)
    }     
//销货退货对账单
    // 详情
    export const getResalebillDetail = params => {
        return axios.get("/resalebill/view",params).then(res => res.data)
    }     
//服务对账单
    // 详情
    export const itemorderbillDetail = params => {
        return axios.get("/itemorderbill/view",params).then(res => res.data)
    }     
//销货对账单
    // 详情
    export const salebillDetail = params => {
        return axios.get("/salebill/view",params).then(res => res.data)
    }     
//商品利润表
        //列表
        export const goodsprofit = params => {
            return axios.post("/goodsprofit/lists",params).then(res=>res.data)
        } 
        //详情
        export const goodsprofitDe = params => {
            return axios.post("/goodsprofit/view",params).then(res=>res.data)
        } 
        //添加
        export const goodsprofitAdd = params => {
            return axios.post("/goodsprofit/add",params).then(res=>res.data)
        }
        //修改+删除
        export const goodsprofitEd = params => {
            return axios.post("/goodsprofit/edit",params).then(res=>res.data)
        }    
     //销售利润表
        //列表
        export const profitform = params => {
            return axios.post("/profitform/lists",params).then(res=>res.data)
        } 
        //详情
        export const profitformDe = params => {
            return axios.post("/profitform/view",params).then(res=>res.data)
        } 
        //添加
        export const profitformAdd = params => {
            return axios.post("/profitform/add",params).then(res=>res.data)
        }
        //修改+删除
        export const profitformEd = params => {
            return axios.post("/profitform/edit",params).then(res=>res.data)
        }
//-------------------发送短信   
export const sendMsg = params => {
    return axios.post("/customer/message",params).then(res=>res.data)
}