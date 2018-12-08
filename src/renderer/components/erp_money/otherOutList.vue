<template>
  <div class="otherOutList">
    <div class="main-header">
        <h3>温州美联 管理中心</h3>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item>资金</el-breadcrumb-item>
            <el-breadcrumb-item>其他支出单</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="main-table">
            <!-- 搜索 -->
            <el-form :inline="true" :model="formServe" class="demo-form-inline">
                <el-form-item label="">
                    <el-input	size="small" type="tel" v-model="formServe.orderDate" placeholder="单据日期"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input	size="small" type="tel" v-model="formServe.orderId" placeholder="单据编号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small">搜索</el-button>
                    <el-button type="primary" size="small">刷新</el-button>
                </el-form-item>
            </el-form>
            <!-- 详情弹出框 -->
             <el-dialog width="840px" class="detail" title="收款单详情" :visible.sync="dialogServeDetail">
                <el-form label-position="left" ref="form" :model="formServeDetail" :inline="true" class="demo-form-inline">
                    <el-row>
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
                        <el-col :span="8">
                            <el-form-item label="单据金额" prop="monery" :rules="rule">
                                <el-input-number v-model="formServeDetail.monery" :precision="2" :min="0"></el-input-number>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="单据备注">
                                <el-input v-model="formServeDetail.remark" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="账户">
                                <el-input v-model="formServeDetail.jiesuan_account" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="制单人名">
                                <el-input v-model="formServeDetail.admin_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeDetail = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="editDone('form')">保存</el-button>
                </div>
            </el-dialog>
            <el-table
                :data="Data"
                v-loading="loading"
                border
                :row-style="{height:0}"  
                :cell-style="{padding:0}"
                :header-row-style="{height:0}"  
                :header-cell-style="{padding:0}"
                style="width: 100%">
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
                    prop="monery"
                    align="center"
                    label="单据金额">
                </el-table-column>
                <el-table-column
                    prop="remark"
                    align="center"
                    label="单据备注">
                </el-table-column>
                <el-table-column
                    prop="jiesuan_account"
                    align="center"
                    label="账户">
                </el-table-column>
                <el-table-column
                    prop="admin_name"
                    align="center"
                    label="制单人">
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
            备注信息：<el-input	size="small" v-model="input" style="width:200px" placeholder="请输入备注信息"></el-input>
            制单人:
            <el-select	size="small" v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>    
        </div>
    </div>
</template>   
<script>
import {
  getOtpaymentList,
  getOtpaymentDetail,
} from "../../api/api";
export default {
    data() {
      return {
        selectSupplier:false,
        dialogServeDetail:false,
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
            orderDate:'',
            orderId:'',
        },
        formServeDetail: {},
        page: 1,
        page_size: 10,
        loading: true,
        total: 0,
        isEdit: false,
        Data: [],
        rule: [{ required: true, message: "不能为空" }],
      }
    },
    methods:{
        initData() {
        // 获取列表
            let data = {
                subsite_id: 3,
                user_id: sessionStorage.user_id,
                page: this.page,
                page_size: this.page_size
            };
            getOtpaymentList({params:data}).then(res => {
                console.log(res.data);
                if (res.errno == 0) {
                this.Data = res.data.otpayment_list;
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
        showDetails(row) {
            this.isEdit = true;
            getOtpaymentDetail({params:{id:row.id}}).then(res => {
                if (res.errno == 0) {
                this.formServeDetail = res.data;
                // this.formServeDetail.shop_price = res.data.shop_price.substring(1);
                // this.formServeDetail.time = [+new Date(this.formServeDetail.start_time),+new Date(this.formServeDetail.end_time)];
                }
            });
        },
        handleCurrentChange(val) {
            this.page = val;
            this.initData();
        },
    },
    created() {
        this.initData();
    }
}
</script>
<style scoped>
.otherOutList {
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