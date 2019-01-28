<template>
    <el-container style="min-width:1200px;">
    <!-- 左侧导航 -->
        <el-aside :width="newWidth" v-show="$route.path!='/erp_test_lists'">
            <!-- 头像 -->
            <div class="avatar">
                <div class="avatar-in">
                    <img src="../assets/images/profile_small.jpg">
                    <el-dropdown  @command="handleCommand" trigger="click">
                        <span class="el-dropdown-link" style="width:110px;cursor: pointer;">
                            美联管理员<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="a">商户资料</el-dropdown-item>
                            <el-dropdown-item command="b" >安全退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <!-- 左菜单 -->
            <el-menu text-color="#ccc" class="el-menu-vertical-demo" :router="true" background-color="#2f4050" :unique-opened="true" :collapse="isCollapse">
                <el-submenu :index="index.toString()" v-for="(item, index) in asideMenuList" :key="index">
                    <template slot="title">
                        <i class="el-icon-" :class="'el-icon-'+ icon[item.action_code]"></i>
                        <span slot="title">{{item.value}}</span>
                    </template>
                    <el-menu-item :index="'/'+v.action_code+'?action_id='+v.action_id" v-for="(v, i) in item.priv" :key="i">{{v.value}}</el-menu-item>
                </el-submenu>
                <!-- <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-goods"></i>
                        <span slot="title">购货</span>
                    </template>
                    <el-menu-item index="/shopSetting">采购设置</el-menu-item>
                    <el-menu-item index="/shopBuyList">购货单</el-menu-item>
                    <el-menu-item index="/shopOderList">采购订单</el-menu-item>
                    <el-menu-item index="/shopInList">采购入库单</el-menu-item>
                    <el-menu-item index="/shopReturnList">购货退货单</el-menu-item>
                    <el-menu-item index="/replyAnalysis">补货分析</el-menu-item>
                    <el-menu-item index="/purchaseReceive">采购收货</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-bell"></i>
                        <span slot="title">零售</span>
                    </template>
                    <el-menu-item index="/cashierDesk">收银台</el-menu-item>
                    <el-menu-item index="/retailSetting">零售设置</el-menu-item>
                    <el-menu-item index="/retailReturnList">零售退货单</el-menu-item>
                    <el-menu-item index="/serveList">服务订单</el-menu-item>
                    <el-menu-item index="/integralExchange">积分兑换</el-menu-item>
                    <el-menu-item index="/shopAssistant">营业员</el-menu-item>
                    <el-menu-item index="/cardVoucher">卡券核销</el-menu-item>
                    <el-menu-item index="/cashierCheck">收银对账</el-menu-item>
                    <el-menu-item index="/tradingInquiry">流水查询</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-document"></i>
                        <span slot="title">调拨</span>
                    </template>
                    <el-menu-item index="/shippingSetting">配送设置</el-menu-item>
                    <el-menu-item index="/transferApplication">调货申请</el-menu-item>
                    <el-menu-item index="/distributionAnalysis">配货分析</el-menu-item>
                    <el-menu-item index="/directOutList">直调出库单</el-menu-item>
                    <el-menu-item index="/directReceivingList">直调收货单</el-menu-item>
                    <el-menu-item index="/allocatingQuery">调拨查询</el-menu-item>
                    <el-menu-item index="/replenishmentProposal">补货建议</el-menu-item>
                    <el-menu-item index="/storeDirectApplications">店间直调申请</el-menu-item>
                    <el-menu-item index="/warehouseInstructions"> 退仓指令</el-menu-item>
                    <el-menu-item index="/allocatingMaori">调拨毛利</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-goods"></i>
                        <span slot="title">货架</span>
                    </template>
                    <el-menu-item index="/shelvesSet">货架设置</el-menu-item>
                    <el-menu-item index="/shopPartition">店铺分区</el-menu-item>
                    <el-menu-item index="/productSize">商品尺寸</el-menu-item>
                    <el-menu-item index="/shelfDisplay">货架陈列</el-menu-item>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-document"></i>
                        <span slot="title">批发</span>
                    </template>
                    <el-menu-item index="/clientArea">客户区域</el-menu-item>
                    <el-menu-item index="/customerArchives">客户档案</el-menu-item>
                    <el-menu-item index="/wholesaleOrders">批发订单</el-menu-item>
                    <el-menu-item index="/wholesaleSalesOrder">批发销售单</el-menu-item>
                    <el-menu-item index="/wholesaleSalesQuery">批发销售查询</el-menu-item>
                    <el-menu-item index="/customerSalesQuery">客户销售查询</el-menu-item>
                    <el-menu-item index="/wholesaleReturnForm">批发退货单</el-menu-item>
                </el-submenu>
                <el-submenu index="6">
                    <template slot="title">
                        <i class="el-icon-star-on"></i>
                        <span slot="title">会员</span>
                    </template>
                    <el-menu-item index="/vipSetting">会员设置</el-menu-item>
                    <el-menu-item index="/vipProfile">会员档案</el-menu-item>
                    <el-menu-item index="/vipIntegral">会员积分</el-menu-item>
                    <el-menu-item index="/giftVoucher">提货券</el-menu-item>
                    <el-menu-item index="/valueCard">储值卡</el-menu-item>
                    <el-menu-item index="/giftManagement">礼品管理</el-menu-item>
                    <el-menu-item index="/contactFollow">联系跟进</el-menu-item>
                    <el-menu-item index="/makeDeal">成交订单</el-menu-item>
                    <el-menu-item index="/receivableManagement">回款管理</el-menu-item>
                    <el-menu-item index="/customerComplaint">客户投诉</el-menu-item>
                    <el-menu-item index="/salesLeads">销售机会</el-menu-item>
                    <el-menu-item index="/customerCare">客户关怀</el-menu-item>
                </el-submenu>
                <el-submenu index="7">
                    <template slot="title">
                        <i class="el-icon-service"></i>
                        <span slot="title">职员</span>
                    </template>
                    <el-menu-item index="/workerList">职员列表</el-menu-item>
                    <el-menu-item index="/Approval">审批</el-menu-item>
                    <el-menu-item index="/checkingIn">考勤</el-menu-item>
                    <el-menu-item index="/signIn">签到</el-menu-item>
                    <el-menu-item index="/dailyRecord">日志</el-menu-item>
                    <el-menu-item index="/announcement">公告</el-menu-item>
                    <el-menu-item index="/commission">代办</el-menu-item>
                    <el-menu-item index="/schedule">日程</el-menu-item>
                    <el-menu-item index="/document">文件</el-menu-item>
                </el-submenu>
                <el-submenu index="8">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">仓库</span>
                    </template>
                    <el-menu-item index="/warehouseSetting">仓库设置</el-menu-item>
                    <el-menu-item index="/allotList">调拨单</el-menu-item>
                    <el-menu-item index="/repertorySearch">库存查询</el-menu-item>
                    <el-menu-item index="/repertoryCheck">库存盘点</el-menu-item>
                    <el-menu-item index="/repertoryWarn">库存预警</el-menu-item>
                    <el-menu-item index="/repertoryIn">其他入库单</el-menu-item>
                    <el-menu-item index="/repertoryOut">其他出库单</el-menu-item>
                    <el-menu-item index="/combinationSplitting">组合拆分</el-menu-item>
                    <el-menu-item index="/adjustmentOrder">成本调整单</el-menu-item>
                    <el-menu-item index="/moveReceipt">移仓单</el-menu-item>
                    <el-menu-item index="/trySuppliesStorage">试用品出入库</el-menu-item>
                </el-submenu>
                <el-submenu index="9">
                    <template slot="title">
                        <i class="el-icon-star-off"></i>
                        <span slot="title">资金</span>
                    </template>
                    <el-menu-item index="/moneyInList">收款单</el-menu-item>
                    <el-menu-item index="/moneyPayList">付款单</el-menu-item>
                    <el-menu-item index="/otherInList">其他收入单</el-menu-item>
                    <el-menu-item index="/otherOutList">其他支出单</el-menu-item>
                    <el-menu-item index="/moneyAllotList">资金调拨单</el-menu-item>
                    <el-menu-item index="/advanceCollection">客户预收款</el-menu-item>
                    <el-menu-item index="/customerCharge">客户费用</el-menu-item>
                    <el-menu-item index="/usersSettlement">客户结算</el-menu-item>
                    <el-menu-item index="/customerPayAnalysis"> 客户账期分析</el-menu-item>
                    <el-menu-item index="/customerTransaction">客户来往账款</el-menu-item>
                    <el-menu-item index="/advancePayment">供应商预付款</el-menu-item>
                    <el-menu-item index="/supplierCost">供应商费用</el-menu-item>
                    <el-menu-item index="/supplierSettlement">供应商结算</el-menu-item>
                    <el-menu-item index="/supplierPayAnalysis">供应商账期分析</el-menu-item>
                    <el-menu-item index="/supplierTransaction">供应商来往账款</el-menu-item>
                    <el-menu-item index="/associatedCollection">联营结算</el-menu-item>
                    <el-menu-item index="/agencyCosts">机构费用</el-menu-item>
                    <el-menu-item index="/agencyStatements">机构结算单</el-menu-item>
                    <el-menu-item index="/agencyPayAnalysis">机构账期分析</el-menu-item>
                    <el-menu-item index="/agencyTransaction"> 机构来往账款</el-menu-item>
                    <el-menu-item index="/verificationForm">核销单</el-menu-item>
                    <el-menu-item index="/profitStatement"> 利润表</el-menu-item>
                </el-submenu>
                <el-submenu index="10">
                    <template slot="title">
                        <i class="el-icon-tickets"></i>
                        <span slot="title">报表</span>
                    </template>
                    <el-menu-item index="/shopCheckList">购货对账单</el-menu-item>
                    <el-menu-item index="/repertoryInCheckList">采购入库对账单</el-menu-item>
                    <el-menu-item index="/repertoryReturnCheckList">购货退货对账单</el-menu-item>
                    <el-menu-item index="/sellCheckList">销货对账单</el-menu-item>
                    <el-menu-item index="/sellReturnCheckList">销货退货对账单</el-menu-item>
                    <el-menu-item index="/serverCheckList">服务对账单</el-menu-item>
                    <el-menu-item index="/dataInit">数据初始化</el-menu-item>
                    <el-menu-item index="/goodsProfitList">商品利润表</el-menu-item>
                    <el-menu-item index="/sellProfitList">销售利润表</el-menu-item>
                    <el-menu-item index="/codeFollowList">串码跟踪表</el-menu-item>
                    <el-menu-item index="/companyDebtList">往来单位欠款表</el-menu-item>
                </el-submenu>
                <el-submenu index="11">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span slot="title">资产</span>
                    </template>
                    <el-menu-item index="/storeAsset">店铺资产</el-menu-item>
                    <el-menu-item index="/equipmentWarranty">设备保修</el-menu-item>
                </el-submenu>
                <el-submenu index="12">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span slot="title">硬件</span>
                    </template>
                    <el-menu-item index="/guidePos">导购员pos</el-menu-item>
                    <el-menu-item index="/ARguide">店内AR导购</el-menu-item>
                    <el-menu-item index="/shoppingScreen">无人货架导购屏</el-menu-item>
                    <el-menu-item index="/storeCamera">店内摄像头</el-menu-item>
                    <el-menu-item index="/inScreenContent">店内互动屏</el-menu-item>
                    <el-menu-item index="/ticketPrinter">小票打印机</el-menu-item>
                    <el-menu-item index="/faceSystem">人脸识别</el-menu-item>
                    <el-menu-item index="/outScreenContent">店外广告屏</el-menu-item>
                    <el-menu-item index="/wifiContent">店铺wifi</el-menu-item>
                </el-submenu>
                <el-submenu index="13">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span slot="title">设置</span>
                    </template>
                    <el-menu-item index="/customerManage">客户管理</el-menu-item>
                    <el-menu-item index="/supplierManage">供应商管理</el-menu-item>
                    <el-menu-item index="/goodsManage">商品管理</el-menu-item>
                    <el-menu-item index="/repertoryManage">仓库管理</el-menu-item>
                    <el-menu-item index="/myAccount">资金账户</el-menu-item>
                    <el-menu-item index="/serveManage">服务管理</el-menu-item>
                    <el-menu-item index="/goodsCategory">商品类别</el-menu-item>
                    <el-menu-item index="/measurementUnit">计量单位</el-menu-item>
                    <el-menu-item index="/brandManage">品牌管理</el-menu-item>
                    <el-menu-item index="/barCodeManage">条码管理</el-menu-item>
                    <el-menu-item index="/assistAttribute">辅助属性</el-menu-item>
                    <el-menu-item index="/systemParameter">系统参数</el-menu-item>
                    <el-menu-item index="/authoritySet">权限设置</el-menu-item>
                    <el-menu-item index="/dataAuthorize">数据授权</el-menu-item>
                    <el-menu-item index="/operateLogs">操作日志</el-menu-item>
                    <el-menu-item index="/test">测试页面</el-menu-item>
                </el-submenu> -->
            </el-menu>
        </el-aside>
        <el-container>
            <!-- 头部 -->
            <el-header v-show="$route.path!='/erp_test_lists'">
            <!-- 折叠按钮 -->
            <el-button size="small" type="primary" @click="isCollapse=!isCollapse">
                <i class="el-icon-d-arrow-right" v-if="isCollapse"></i>
                <i class="el-icon-d-arrow-left" v-else></i>
            </el-button>
            <!-- 等级 -->
            <!-- <el-dropdown trigger="click" class="level">
                <span class="el-dropdown-link">
                    <span>等级</span>
                    <img src="../assets/images/zs.png">
                </span>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>描述相符 3分</el-dropdown-item>
                <el-dropdown-item>服务态度 3分</el-dropdown-item>
                <el-dropdown-item>物流服务 3分</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown> -->
            <!-- 系统消息 -->
            <el-badge style="margin-top:10px;" :value="count" :max="10000" class="message-item">
                <el-button type="text" style="font-size:25px" icon="el-icon-bell" @click="$router.push('/sysMessage')" ></el-button>
            </el-badge>
            <router-link 
            to="/erp_cashier_goodslists" 
            style="font-size:16px;position:relative;left:40px;color:#333333">
            收银台
            </router-link>
            <router-link 
            to="/erp_room_lists" 
            style="font-size:16px;position:relative;left:40px;color:#333333;margin-left:30px;">
            库存查询
            </router-link>
            <router-link 
            to="/erp_test_lists" 
            style="font-size:16px;position:relative;left:40px;color:#333333;margin-left:30px;">
            线上管理中心
            </router-link>
            </el-header>
            <!-- 内容区域 -->
            <el-main>
                <router-view v-if="isRouterAlive"></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import { getAsideMenu,getSysMsgList } from "../api/api";
export default {
    provide() {//------------------ 注册一个局部组件刷新方法
        return {
            reload: this.reload
        };
    },
  data() {
    return {
      isRouterAlive: true,
      isCollapse: true,
      newWidth: "100px",
      count:0,
      asideMenuList:[],
      erpTableSetting:{},
      icon:{erp_purchase:'goods',erp_retail:'bell',erp_allocation:'document',erp_member:'star-on',erp_clerks:'service',erp_write_off:'menu',erp_store:'location',erp_money:'star-off',erp_report:'tickets',erp_config:'setting',erp_goods:'goods'}
    };
  },
  watch: {
    isCollapse(curVal, oldVal) {
      this.newWidth = oldVal ? "200px" : "100px";
    }
  },
  methods: {
      reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    },
    handleCommand(v) {
      switch (v) {
        case "a":
          this.$router.push("/traderInfo");
          break;
        case "b":
          // 1. 清除登录状态，即删除保存在localStorage中的user_id
          sessionStorage.removeItem("user_id");
          localStorage.removeItem("user_id");
          // 2. 跳转到登录页面
          this.$router.replace("/login");
          break;

        default:
          break;
      }
    }
  },
    created() {
        if(localStorage.erpTableSetting==undefined){
            localStorage.erpTableSetting=JSON.stringify(this.erpTableSetting);
        }
      getSysMsgList({params:{user_id: sessionStorage.getItem("user_id")}}).then(res=>{
          this.count=Number(res.data.record_count);
      });
    let data = this.$qs.stringify({ user_id: sessionStorage.user_id });
    getAsideMenu(data).then(res => {
      if (res.errno == 0) {
          this.asideMenuList = res.data
        console.log(res);
      }else {
          this.$message({
            type: "error",
            message: res.errmsg,
            duration: 1000
            });
      }
    }).catch(res=>{
        this.$message({
            type: "error",
            message: res,
            duration: 1000
        });
    });
  }
};
</script>
<style scoped>
.el-container {
    height: 100vh;
}
.el-menu--inline .el-menu-item,
.el-menu--popup .el-menu-item {
  float: left;
  box-sizing: border-box;
  min-width: 0;
  width: 50%;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  padding: 0 10px !important;
  text-align: left;
}
.el-aside {
  transition: all 0.3s;
  background: #2f4050;
}

.el-menu {
  border-right: none;
}

.el-menu--collapse .el-submenu >>> .el-submenu__title {
  padding: 0 0 0 20px;
  width: 100px;
}
.el-menu--collapse .el-submenu >>> .el-submenu__title span {
  width: 60%;
  height: 100%;
  visibility: visible;
}
/* 头像区域 */
.avatar {
  width: 100%;
  background: url("../assets/images/header-profile.png") no-repeat center;
}
.avatar .avatar-in {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}
.avatar img {
  border-radius: 50%;
  margin: 10px auto;
}
.avatar .el-dropdown {
  margin-bottom: 16px;
}

/* 头部区域 */
.el-header {
  background: rgb(230, 230, 230);
  display: flex;
  align-items: center;
}
.el-header .level {
  margin: 0 20px;
  cursor: pointer;
}
.el-header .level .el-dropdown-link span {
  font-size: 16px;
  color: #333;
}
.el-header .el-dropdown-link img {
  width: 20px;
  vertical-align: middle;
}
.message-item {
  cursor: pointer;
  height: 60px;
  line-height: 60px;
  margin-left:20px;
}
.message-item a {
  color: #333;
}
</style>
