<template>
    <div class="myAccount">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>设置</el-breadcrumb-item>
                <el-breadcrumb-item>资金账户</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <!-- 账户搜索 -->
            <el-form :inline="true" :model="formAccount">
                <!-- <el-form-item label="账户名称">
                    <el-input	size="small" v-model="formAccount.account_name" placeholder="账户名称"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input	size="small" v-model="formAccount.remark" placeholder="备注信息"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <el-input placeholder="请输入账户名称" @input="search" v-model="keywords" style="width:50%;margin-right:10px" size="small">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                    <el-button type="primary" size="small" @click="add">新增</el-button>
                    <el-button type="primary" size="small" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form>
            <!-- 账户详情弹出框 -->
            <el-dialog width="600px" title="账户详情" :visible.sync="dialogAccountDetail">
                <el-form ref="form" label-position="right" :model="formAccountDetail" :inline="true">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="账户名称">
                                <el-input v-model="formAccountDetail.account_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="期初余额">
                                 <el-input-number :controls="false" v-model="formAccountDetail.start_balance" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formAccountDetail.start_balance" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="开账时间">
                                <el-date-picker
                                v-model="formAccountDetail.add_time"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                                </el-date-picker>
                                <!-- <el-input disabled v-model="formAccountDetail.add_time" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="备注信息">
                                <el-input v-model="formAccountDetail.remark" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogAccountDetail = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="editDone('form')">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 资金账户报表弹出框 -->
            <el-dialog width="900px" title="资金详情" class="integral" :visible.sync="dialogAccountList">
                <el-form :inline="true" :model="formAccountIn" class="demo-form-inline">
                    <el-form-item>
                        <el-date-picker
                        v-model="value7"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="formAccountIn.docType" placeholder="单据类型">
                            <el-option label="单据一" value="doc1"></el-option>
                            <el-option label="单据二" value="doc2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="formAccountIn.AccountType" placeholder="资金操作">
                            <el-option label="操作一" value="Account1"></el-option>
                            <el-option label="操作二" value="Account2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="formAccountIn.AccountType" placeholder="操作用户">
                            <el-option label="操作一" value="Account1"></el-option>
                            <el-option label="操作二" value="Account2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="accountSearchIn">搜索</el-button>
                        <el-button type="primary" size="small">导出</el-button>
                        <el-button type="primary" size="small" @click="reset">刷新</el-button>
                    </el-form-item>
                </el-form>
                <el-table
                :data="AccountTableDataIn"
                border
                style="width: 100%">
                    <el-table-column
                    prop="oprateTime"
                    align="center"
                    label="操作时间">
                    </el-table-column>
                    <el-table-column
                    prop="doctype"
                    align="center"
                    label="单据类型">
                    </el-table-column>
                    <el-table-column
                    prop="docNumber"
                    align="center"
                    label="单据编号">
                    </el-table-column>
                    <el-table-column
                    prop="oprateAccount"
                    align="center"
                    label="资金操作">
                    </el-table-column>
                    <el-table-column
                    prop="AccountNum"
                    align="center"
                    label="资金数额">
                    </el-table-column>
                    <el-table-column
                    prop="oprateUser"
                    align="center"
                    label="操作用户">
                    </el-table-column>
                </el-table>
                <el-pagination
                @current-change="handleCurrentChange"
                layout="prev, pager, next, jumper"
                :page-count="page">
                </el-pagination>
            </el-dialog>
            <!-- 账户管理表格 -->
            <el-table
                :data="myAccountData"
                border
                :row-style="{height:0}"  
                :cell-style="{padding:0}"
                :header-row-style="{height:0}"  
                :header-cell-style="{padding:0}"
                v-loading="loading"
                style="width: 100%">
                <el-table-column
                prop="add_time"
                align="center"
                label="开账时间">
                </el-table-column>
                <el-table-column
                prop="account_name"
                align="center"
                label="账户名称"
                width="180">
                </el-table-column>
                <el-table-column
                prop="start_balance"
                align="center"
                label="期初余额"
                width="180">
                </el-table-column>
                <el-table-column
                prop="zijin_balance"
                align="center"
                label="资金余额"
                width="180">
                </el-table-column>
                <el-table-column
                prop="remark"
                align="center"
                label="备注信息">
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作"
                width="240">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="dialogAccountList = true">报表</el-button>
                        <el-button type="text" size="small" @click="accountDetail(scope.row),dialogAccountDetail = true">详情</el-button>
                        <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next,jumper"
                :total="total"
                :page-size="page_size">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {getAccountList,getAccountDetail,editAccount,addAccount} from '../../api/api'
export default {
    data() {
        return {
            page:1,
            page_size:10,
            total:0,
            loading:true,
            isEdit:false,
            dialogAccountDetail:false,
            keywords:'',
            dialogAccountList:false, //积分详情弹出框
            formAccount:{},
            formAccountDetail:{},
            myAccountData:[],
            AccountTableDataIn:[], // 积分详情内表格数据
            formAccountIn:{ // 积分详情内积分搜索表单数据
                docType:'',
                AccountType:''
            },
            pickerOptions: { // 日期选择器插件快捷选择功能数据
                shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                }
                }, {
                text: '最近一个月',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                }
                }, {
                text: '最近三个月',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                }
                }]
            },
            value7: ''
        }
    },
    methods:{
        search() {
            getAccountList({params:{
                page:1,
                page_size:10,
                account_name:this.keywords
            }}).then(res=>{
            console.log(res)
            if(res.errno == 0) {
                this.myAccountData=res.data.orders
                this.total = Number(res.data.record_count)
                this.loading = false
                }
            })
        }, 
        initData(obj) { // 获取账户列表
            let data = {
                subsite_id:3,
                user_id:sessionStorage.user_id,
                page:this.page,
                page_size:this.page_size
            }
            if(obj) {
                Object.assign(data,obj)
            }
            getAccountList({params:data}).then(res=>{
            console.log(res)
            if(res.errno == 0) {
                this.myAccountData=res.data.orders
                this.total = Number(res.data.record_count)
                this.loading = false
                }
            })
        },
        add() {
            this.isEdit = false;
            this.formAccountDetail = {};
            if (this.$refs.form) {
                this.$refs.form.resetFields();
            }
            this.dialogAccountDetail = true;
        },
        editDone(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.isEdit) {
                        this.formAccountDetail.add_time = parseInt(new Date(this.formAccountDetail.add_time)/1000)+''
                        editAccount({params:this.formAccountDetail}).then(res=>{
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
                        this.dialogAccountDetail = false;
                        });
                    } else {
                        // this.formAccountDetail.add_time = parseInt(new Date(this.formAccountDetail.add_time)/1000)+''
                        let tmpData = this.$qs.stringify(this.formAccountDetail);
                        addAccount(tmpData).then(res => {
                        if (res.errno == 0) {
                            this.$message({
                            type: "success",
                            message: "添加成功!",
                            duration: 1000
                            });
                            this.initData();
                        } else {
                            this.$message({
                            type: "error",
                            message: res.errmsg,
                            duration: 1000
                            });
                        }
                        this.dialogAccountDetail = false;
                        });
                    }
                }
            });
        },
        accountDetail(v) { // 资金账户详情
            this.isEdit= true
            getAccountDetail({params:{zijin_account_id:v.zijin_account_id}}).then(res=>{
                if(res.errno == 0) {
                    console.log(res)
                    this.formAccountDetail = res.data.orders
                    this.formAccountDetail.start_balance = res.data.orders.start_balance.substring(1)
                    this.formAccountDetail.zijin_account_id = res.data.filter.zijin_account_id
                }
            })
        },
        accountSearch() {
            this.initData(this.formAccount)
        },
        accountSearchIn() {
            console.log("submit!");
        },
        reset() {
            this.formAccountDetail= {}
            this.initData()
        },
        handleCurrentChange(val) {
            this.page = val
            this.initData()
        },
        deleteRow(rows) {
            this.$confirm("即将执行删除操作, 确认删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(() => {
                let tmpData = { zijin_account_id: rows.zijin_account_id,is_delete:0 };
                editAccount({params:tmpData}).then(res => {
                    if (res.errno == 0) {
                    this.$message({
                        type: "success",
                        message: "删除成功!",
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
            });
            })
            .catch(res => {
            console.log("用户取消删除");
            });
        }
    },
    created() {
        this.initData()
    }
}
</script>
<style scoped>
.myAccount{
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

.el-form .el-form-item .el-input {
  width: 180px;
}

/* 分页器 */
.el-pagination {
  padding: 20px 0;
  text-align: right;
}

/* 新增账户弹出框 & 账户详情弹出框*/
.main-table>>>.el-dialog__body {
  padding: 0 20px;
}
.el-dialog__body .el-form {
  text-align: right;
}
.el-row {
  border-top: 1px dashed #ccc;
}

/* 资金报表弹出框 */
.el-form .el-form-item .el-select{
  width: 120px;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 230px;
}
</style>
