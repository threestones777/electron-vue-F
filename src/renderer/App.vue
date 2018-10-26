<template>
  <div id="app">
        <el-container style="min-width:1200px;">
        <!-- 左侧导航 -->
            <el-aside v-show="!$route.meta.hidden" :width="newWidth">
                <!-- 头像 -->
                <div class="avatar">
                    <div class="avatar-in">
                        <img src="./assets/images/profile_small.jpg">
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link" style="width:110px">
                                美联管理员<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>修改头像</el-dropdown-item>
                                <el-dropdown-item>个人资料</el-dropdown-item>
                                <el-dropdown-item>联系我们</el-dropdown-item>
                                <el-dropdown-item>信箱</el-dropdown-item>
                                <el-dropdown-item>安全退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <!-- 左菜单 -->
                <el-menu text-color="#ccc" class="el-menu-vertical-demo" :router="true" background-color="#2f4050" :unique-opened="true" :collapse="isCollapse">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">购货</span>
                        </template>
                        <el-menu-item index="/shopBuyList">购货单</el-menu-item>
                        <el-menu-item index="/shopOderList">采购订单</el-menu-item>
                        <el-menu-item index="/shopInList">采购入库单</el-menu-item>
                        <el-menu-item index="/shopReturnList">购货退货单</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">销货</span>
                        </template>
                        <el-menu-item index="/sellList">销货单</el-menu-item>
                        <el-menu-item index="/sellReturnList">销货退货单</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">零售</span>
                        </template>
                        <el-menu-item index="/cashierDesk">收银台</el-menu-item>
                        <el-menu-item index="/retailReturnList">零售退货单</el-menu-item>
                        <el-menu-item index="/serveList">服务订单</el-menu-item>
                        <el-menu-item index="/integralExchange">积分兑换</el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">仓库</span>
                        </template>
                        <el-menu-item index="/allotList">调拨单</el-menu-item>
                        <el-menu-item index="/repertorySearch">库存查询</el-menu-item>
                        <el-menu-item index="/repertoryCheck">库存盘点</el-menu-item>
                        <el-menu-item index="/repertoryWarn">库存预警</el-menu-item>
                        <el-menu-item index="/repertoryIn">其他入库单</el-menu-item>
                        <el-menu-item index="/repertoryOut">其他出库单</el-menu-item>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">资金</span>
                        </template>
                        <el-menu-item index="/moneyInList">收款单</el-menu-item>
                        <el-menu-item index="/moneyPayList">付款单</el-menu-item>
                        <el-menu-item index="/otherInList">其他收入单</el-menu-item>
                        <el-menu-item index="/otherOutList">其他支出单</el-menu-item>
                        <el-menu-item index="/moneyAllotList">资金调拨单</el-menu-item>
                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title">
                            <i class="el-icon-location"></i>
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
                    <el-submenu index="7">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">设置</span>
                        </template>
                        <el-menu-item index="/customerManage">客户管理</el-menu-item>
                        <el-menu-item index="/supplierManage">供应商管理</el-menu-item>
                        <el-menu-item index="/goodsManage">商品管理</el-menu-item>
                        <el-menu-item index="/repertoryManage">仓库管理</el-menu-item>
                        <el-menu-item index="/myAccount">自己账户</el-menu-item>
                        <el-menu-item index="/serveManage">服务管理</el-menu-item>
                        <el-menu-item index="/goodsCategory">商品类别</el-menu-item>
                        <el-menu-item index="/measurementUnit">计量单位</el-menu-item>
                        <el-menu-item index="/brandManage">品牌管理</el-menu-item>
                        <el-menu-item index="/barCodeManage">条码管理</el-menu-item>
                        <el-menu-item index="/assistAttribute">辅助属性</el-menu-item>
                        <el-menu-item index="/alwaysUse">常用功能</el-menu-item>
                        <el-menu-item index="/systemParameter">系统参数</el-menu-item>
                        <el-menu-item index="/workerList">职员管理</el-menu-item>
                        <el-menu-item index="/dataBackup">数据备份</el-menu-item>
                        <el-menu-item index="/authoritySet">权限设置</el-menu-item>
                        <el-menu-item index="/dataAuthorize">数据授权</el-menu-item>
                        <el-menu-item index="/operateLogs">操作日志</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <!-- 头部 -->
                <el-header v-show="!$route.meta.hidden">
                <!-- 折叠按钮 -->
                <el-button size="small" type="success" @click="isCollapse=!isCollapse">
                    <i class="el-icon-d-arrow-right" v-if="isCollapse"></i>
                    <i class="el-icon-d-arrow-left" v-else></i>
                </el-button>
                <!-- 等级 -->
                <el-dropdown trigger="click" class="level">
                    <span class="el-dropdown-link">
                        <span>等级</span>
                        <img src="./assets/images/zs.png">
                    </span>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>描述相符 3分</el-dropdown-item>
                    <el-dropdown-item>服务态度 3分</el-dropdown-item>
                    <el-dropdown-item>物流服务 3分</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <!-- 系统消息 -->
                <el-badge :value="30" :max="99" class="message-item">
                    <span size="small">系统消息</span>
                </el-badge>
                </el-header>
                <!-- 内容区域 -->
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
  </div>
</template>

<script>
export default {
  name: "meilian_electron_erp",
  data() {
    return {
      isCollapse: false,
      newWidth: "200px"
    };
  },

  watch: {
    isCollapse(curVal, oldVal) {
      this.newWidth = oldVal ? "200px" : "100px";
    }
  }
};
</script>
<style>
.el-menu--vertical {
  width: 200px;
}
.el-container {
    height: 100vh;
}
.el-main {
  padding: 0!important;
  background: rgb(243, 243, 243);
}
</style>

<style scoped>
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
  text-align: center;
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
  background: url(./assets/images/header-profile.png) no-repeat center;
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
}
.el-header .el-dropdown-link img {
  width: 20px;
  vertical-align: middle;
}
.message-item span {
  color: #333;
}
</style>
