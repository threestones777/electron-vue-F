<template>
    <div class="moneyInList">
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>资金</el-breadcrumb-item>
                <el-breadcrumb-item>收款单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <!-- 搜索 -->
            <el-form :inline="true" :model="formServe" class="demo-form-inline">
                <el-form-item label="">
                    <el-input size="small" v-model="formServe.order" placeholder="请点击选择客户" @focus="getcustomer"></el-input>
                </el-form-item>
                <!-- <el-form-item label="">
                    <el-input size="small" type="tel" v-model="formServe.orderDate" placeholder="单据日期"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input size="small" type="tel" v-model="formServe.orderId" placeholder="单据编号"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <el-input placeholder="请输入用户id" @input="search" v-model="keywords" style="width:60%;margin-right:10px" size="small">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                    <el-button type="primary" size="small" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form>
            <!--选择客户弹出窗口-->
            <el-dialog
                title="选择客户"
                :visible.sync="selectSupplier"
                width="880px"
                class="customer"
                :before-close="handleClose">
                名称 :<el-input size="small" v-model="formServe.order" placeholder="客户名称"></el-input>          
                编号 :<el-input size="small" v-model="formServe.order" placeholder="客户编号"></el-input>          
                联系人 :<el-input size="small" v-model="formServe.order" placeholder="联系人"></el-input>          
                手机号 :<el-input size="small" v-model="formServe.order" placeholder="手机号"></el-input>          
                备注信息 :<el-input size="small" v-model="formServe.order" placeholder="备注信息"></el-input> 
                <el-button type="primary" size="small">搜索</el-button>
                <el-table
                ref="multipleTable"
                :data="customerData"
                border
                v-loading="loading2"
                style="margin-top:10px;"
                highlight-current-row
                :row-style="{height:0}"  
                :cell-style="{padding:0}"
                :header-row-style="{height:0}"  
                :header-cell-style="{padding:0}"
                @current-change="handleCurrentChange3">
                    <el-table-column
                    prop="user_name"
                    show-overflow-tooltip
                    label="客户名称">
                    </el-table-column>
                    <el-table-column
                    prop="user_id"
                    label="客户编号">
                    </el-table-column>
                    <el-table-column
                    prop="contacts"
                    label="联系人">
                    </el-table-column>
                    <el-table-column
                    prop="mobile_phone"
                    show-overflow-tooltip
                    label="手机号">
                    </el-table-column>
                    <el-table-column
                    prop="birthday"
                    label="生日">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    show-overflow-tooltip
                    label="客户地址">
                    </el-table-column>
                    <el-table-column
                    prop="rank_points"
                    label="客户积分">
                    </el-table-column>
                    <el-table-column
                    prop="social"
                    label="社交账号">
                    </el-table-column>
                    <el-table-column
                    prop="email"
                    show-overflow-tooltip
                    label="邮箱地址">
                    </el-table-column>
                    <el-table-column
                    prop="bank_username"
                    label="开户名">
                    </el-table-column>
                    <el-table-column
                    prop="bank_name"
                    label="开户行">
                    </el-table-column>
                    <el-table-column
                    prop="bank_cardnum"
                    label="银行账户">
                    </el-table-column>
                    <el-table-column
                    prop="duty_number"
                    label="税号">
                    </el-table-column>
                    <el-table-column
                    prop="remark"
                    label="备注信息"
                    show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                <span slot="footer" class="dialog-footer">
                    <el-button size="small" @click="selectSupplier=false">取 消</el-button>
                    <el-button size="small" type="primary" @click="selectSupplier=false">确 定</el-button>
                </span>
                <!--分页-->
                <el-pagination
                @current-change="handleCurrentChange2"
                    layout="total,prev, pager, next,jumper"
                    :page_size="page_size2"
                    :total="total2">
                </el-pagination>
            </el-dialog>
            <!-- 详情弹出框 -->
             <el-dialog width="840px" class="detail" title="收款单详情" :visible.sync="dialogServeDetail">
                <el-form label-position="left" ref="form" :model="formServeDetail" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="订单号">
                                <el-input v-model="formServeDetail.order_sn" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="单据编号">
                                <el-input v-model="formServeDetail.bill_sn" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="单据日期">
                                <el-input disabled v-model="formServeDetail.add_time" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="单据金额">
                                <el-input-number :controls="false" v-model="formServeDetail.order_amount" :precision="2" :min="0"></el-input-number>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="状态">
                                <el-input v-model="formServeDetail.pay_status" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="备注">
                                <el-input v-model="formServeDetail.pay_note" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="制单人名">
                                <el-input v-model="formServeDetail.admin_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="状态名">
                                <el-input v-model="formServeDetail.status_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="small" @click="dialogServeDetail = false">取 消</el-button>
                    <el-button size="small" type="primary" @click="editDone('form')">保存</el-button>
                </div>
            </el-dialog>
            <el-table
                :data="moneyInData"
                v-loading="loading"
                border
                :row-style="{height:0}"  
                :cell-style="{padding:0}"
                :header-row-style="{height:0}"  
                :header-cell-style="{padding:0}"
                style="width: 100%">
                <el-table-column
                    prop="order_sn"
                    align="center"
                    label="关联订单编号">
                </el-table-column>
                <el-table-column
                    prop="bill_sn"
                    align="center"
                    label="单据编号">
                </el-table-column>
                <el-table-column
                    prop="add_time"
                    align="center"
                    label="单据日期">
                </el-table-column>
                <el-table-column
                    prop="order_amount"
                    align="center"
                    label="单据金额">
                </el-table-column>
                <el-table-column
                    prop="user_id"
                    align="center"
                    label="用户id">
                </el-table-column>
                <el-table-column
                    prop="user_name"
                    align="center"
                    label="客户名">
                </el-table-column>
                <el-table-column
                    prop="admin_name"
                    align="center"
                    label="制单人名">
                </el-table-column>
                <el-table-column
                    prop="status_name"
                    align="center"
                    label="支付状态">
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showDetails(scope.row),dialogServeDetail = true">详情</el-button>
                        <el-button type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <el-pagination
            @current-change="handleCurrentChange"
                layout="total,prev, pager, next,jumper"
                :page_size="page_size"
                :total="total">
            </el-pagination>
        </div>
        <div class="footer">   
        </div>
    </div>
</template>   
<script>
import {
  getGatherList,
  getGatherDetail,
  getcustomerList
} from "../../api/api";
export default {
    inject: ['reload'],
    data() {
      return {
        selectSupplier:false,
        dialogServeDetail:false,
        keywords:'',
        options: [{
          value: '选项1',
          label: '10条记录'
        }, {
          value: '选项2',
          label: '25条记录'
        }, {
          value: '选项3',
          label: '50条记录'
        }, {
          value: '选项4',
          label: '100条记录'
        }],
        value: '',
        input:'',
        formServe:{
            order:'',
            orderDate:'',
            orderId:'',
        },
        formServeDetail: {},
        selectedCustomer:{},
        page: 1,
        page_size: 10,
        loading: true,
        total: 0,
        page2: 1,
        page_size2: 10,
        loading2: true,
        total2: 0,
        isEdit: false,
        moneyInData: [],
        customerData: [],
        multipleSelection: [],
        rule: [{ required: true, message: "不能为空" }],
      }
    },
    methods:{
        reset(){
            this.reload();
        },
        search() {
            getGatherList({params:{
                    page:1,
                    page_size:10,
                    user_id:this.keywords
                }}).then(res => {
                console.log(res.data);
                if (res.errno == 0) {
                this.moneyInData = res.data.gather_list;
                this.total = Number(res.data.record_count);
                this.loading = false;
                }
            });
        }, 
        initData() {
        // 获取列表
            let data = {
                subsite_id: 3,
                // user_id: sessionStorage.user_id,
                page: this.page,
                page_size: this.page_size
            };
            getGatherList({params:data}).then(res => {
                console.log(res.data);
                if (res.errno == 0) {
                this.moneyInData = res.data.gather_list;
                this.total = Number(res.data.record_count);
                this.loading = false;
                }
            });
        },
        handleClose(done) {
            done();
        },
        editDone() {

        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        getcustomer(){
            let data = {
                subsite_id: 3,
                user_id: sessionStorage.user_id,
                page: this.page2,
                page_size: this.page_size2
            };
            getcustomerList({params:data}).then(res => {
                console.log(res.data);
                if (res.errno == 0) {
                this.customerData = res.data.user_list;
                this.total2 = Number(res.data.record_count);
                this.loading2 = false;
                }
            });
            this.selectSupplier=true
        },
        showDetails(row) {
            this.isEdit = true;
            getGatherDetail({params:{bill_sn:row.bill_sn}}).then(res => {
                if (res.errno == 0) {
                    this.formServeDetail = res.data;
                // this.formServeDetail.shop_price = res.data.shop_price.substring(1);
                // this.formServeDetail.time = [+new Date(this.formServeDetail.start_time),+new Date(this.formServeDetail.end_time)];
                }else {
                    this.$message({
                        type: "error",
                        message: res.errmsg,
                        duration: 1000
                    });
                }
            });
        },
        handleCurrentChange(val) {
            this.page = val;
            this.initData();
        },
        handleCurrentChange2(val) {
            this.page2 = val;
            this.getcustomer();
        },
        handleCurrentChange3(cr) {
            this.selectedCustomer = cr
        }
    },
    created() {
        this.initData();
    }
}
</script>
<style scoped>
.moneyInList {
  margin: 20px;
}
/* 头部面包屑 */
.main-header {
  padding: 10px;
  background: #fff;
}
.main-header .el-breadcrumb {
  margin: 8px 0 0 10px;
}
/* 搜索操作 */
.main-table .el-form {
  padding-top: 10px;
  text-align: center;
}
.el-form .el-form-item {
  margin-bottom: 10px;
}
/* 分页器 */
.el-pagination {
  padding: 20px 0;
  text-align: right;
}
/* 新增弹出框 & 详情弹出框*/
.main-table >>> .el-dialog__body {
  padding: 0 20px;
}
.main-table >>> .el-dialog__wrapper.customer .el-dialog__body .el-input {
    width: 100px;
}
.main-table >>> .el-dialog__wrapper.detail .el-dialog__body .el-form-item__content {
    width: 180px;
}
.main-table >>> .el-dialog__body .el-form-item {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.main-table >>> .el-dialog__body .el-form-item .el-form-item__label {
  flex: 1;
  box-sizing: border-box;
  padding: 0;
  padding-left: 10px;
  text-align: left;
}
.main-table >>> .el-dialog__body .el-date-editor,
.main-table >>> .el-dialog__body .el-input-number {
  width: 100%;
}
.el-row {
  border-top: 1px dashed #ccc;
}

.footer {
    text-align: center;
}
</style> 