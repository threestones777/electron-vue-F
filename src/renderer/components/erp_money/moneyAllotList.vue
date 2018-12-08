<template>
  <div class="moneyAllotList">
    <div class="main-header">
        <h3>温州美联 管理中心</h3>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item>资金</el-breadcrumb-item>
            <el-breadcrumb-item>资金调拨单</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="main-table">
            <!-- 搜索 -->
            <el-form :inline="true" :model="formServe" class="demo-form-inline">
                <!-- <el-form-item label="">
                    <el-input	size="small" type="tel" v-model="formServe.orderDate" placeholder="单据日期"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input	size="small" type="tel" v-model="formServe.orderId" placeholder="单据编号"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <!-- <el-button type="success" size="small">搜索</el-button> -->
                    <el-button type="primary" @click="reset" size="small">刷新</el-button>
                    <el-button type="primary" @click="add" size="small">新增</el-button>
                </el-form-item>
            </el-form>
            <!-- 详情弹出框 -->
             <el-dialog width="840px" class="detail" :title="isEdit?'编辑':'添加'" :visible.sync="dialogServeDetail">
                <el-form label-position="left" ref="form" :model="formServeDetail" :inline="true" class="demo-form-inline">
                    <el-row v-show="isEdit">
                        <el-col :span="8">
                            <el-form-item label="单据编号">
                                <el-input disabled v-model="formServeDetail.bill_sn" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="单据日期">
                                <el-input disabled v-model="formServeDetail.add_time" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="制单人名">
                                <el-input disabled v-model="formServeDetail.admin_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="调出账户" prop="diaochu_account" :rules="rule">
                                <el-select clearable v-model="formServeDetail.diaochu_account" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.zijin_account_id"
                                    :label="item.account_name"
                                    :value="item.zijin_account_id">
                                    </el-option>
                                </el-select>
                                <!-- <el-input v-model="formServeDetail.jiesuan_account" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="调入账户" prop="diaoru_account" :rules="rule">
                                <el-select clearable v-model="formServeDetail.diaoru_account" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.zijin_account_id"
                                    :label="item.account_name"
                                    :value="item.zijin_account_id">
                                    </el-option>
                                </el-select>
                                <!-- <el-input v-model="formServeDetail.jiesuan_account" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="单据金额" prop="money" :rules="rule">
                                <el-input-number :controls="false" v-model="formServeDetail.money" :precision="2" :min="0"></el-input-number>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="单据备注">
                                <el-input v-model="formServeDetail.remark" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" v-show="isEdit">
                            <el-form-item label="状态">
                                <el-input disabled v-model="formServeDetail.status" autocomplete="off"></el-input>
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
                    show-overflow-tooltip
                    label="单据编号">
                </el-table-column>
                <el-table-column
                    prop="add_time"
                    align="center"
                    label="单据日期">
                </el-table-column>
                <el-table-column
                    prop="money"
                    align="center"
                    label="单据金额">
                </el-table-column>
                <el-table-column
                    prop="remark"
                    align="center"
                    label="单据备注">
                </el-table-column>
                <el-table-column
                    prop="status"
                    align="center"
                    label="状态">
                </el-table-column>
                <el-table-column
                    prop="admin_name"
                    align="center"
                    label="制单人">
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                width="90"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showDetails(scope.row),dialogServeDetail = true">详情</el-button>
                        <el-button type="text" size="small" @click="deleteRow( scope.row)">删除</el-button>
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
    </div>
</template>   
<script>
import {
  getEftList,
  getEftDetail,
  addEft,
  editEft,
  delEft
} from "../../api/api";
export default {
    data() {
      return {
        dialogServeDetail:false,
        options: [],
        formServe:{},
        formServeDetail: {},
        page: 1,
        page_size: 10,
        total: 0,
        loading: true,
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
            getEftList({params:data}).then(res => {
                console.log(res.data);
                if (res.errno == 0) {
                this.Data = res.data.eft_list;
                this.options = res.data.account_list;
                this.total = Number(res.data.record_count);
                this.loading = false;
                }
            });
        },
        add() { // 打开 添加单据 弹出框
            this.isEdit = false;
            this.formServeDetail = {};
            if (this.$refs.form) {
                this.$refs.form.resetFields();
            }
            this.dialogServeDetail = true;
        },
        editDone(formName) { // 添加/编辑 单据
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.isEdit) {
                        if(!Number(this.formServeDetail.diaochu_account)) {
                            this.options.forEach((v,i)=>{
                                if(v.account_name == this.formServeDetail.diaochu_account) {
                                    this.formServeDetail.diaochu_account = v.zijin_account_id
                                }
                            })
                        }
                        if(!Number(this.formServeDetail.diaoru_account)) {
                            this.options.forEach((v,i)=>{
                                if(v.account_name == this.formServeDetail.diaoru_account) {
                                    this.formServeDetail.diaoru_account = v.zijin_account_id
                                }
                            })
                        }
                        let tmpData = this.$qs.stringify(this.formServeDetail);
                        editEft(tmpData).then(res => {
                        if (res.errno == 0) {
                            this.$message({
                            type: "success",
                            message: "修改成功!",
                            duration: 1000
                            });
                        } else {
                            this.$message({
                                type: "error",
                                message: res.errmsg,
                                duration: 1000
                            });
                        }
                        this.initData();
                        this.dialogServeDetail = false;
                        });
                    } else {
                        let tmpData = this.$qs.stringify(this.formServeDetail);
                        addEft(tmpData).then(res => {
                        if (res.errno == 0) {
                            this.$message({
                            type: "success",
                            message: "添加成功!",
                            duration: 1000
                            });
                        } else {
                            this.$message({
                                type: "error",
                                message: res.errmsg,
                                duration: 1000
                            });
                        }
                        this.initData();
                        this.dialogServeDetail = false;
                        });
                    }
                }
            });
        },
        deleteRow(rows) { // 删除单据
            this.$confirm("即将执行删除操作, 确认删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                let tmpData = this.$qs.stringify({diaobo_id:rows.diaobo_id})
                delEft(tmpData)
                .then(res => {
                    if (res.errno == 0) {
                        this.$message({
                            type: "success",
                            message: "删除成功!",
                            duration: 1000
                        });
                        this.initData();
                    }else {
                        this.$message({
                            type: "error",
                            message: res.errmsg,
                            duration: 1000
                        });
                    }
                })
            }).catch(res => {
                console.log("用户取消删除");
            })
        },
        showDetails(row) {
            this.isEdit = true;
            getEftDetail({params:{diaobo_id:row.diaobo_id}}).then(res => {
                if (res.errno == 0) {
                this.formServeDetail = res.data;
                }
            });
        },
        reset() {
            this.initData()
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
.moneyAllotList {
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