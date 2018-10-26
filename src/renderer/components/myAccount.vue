<template>
    <div class="myAccount">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>设置</el-breadcrumb-item>
                <el-breadcrumb-item>自己账户</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <!-- 账户搜索 -->
            <el-form :inline="true" :model="formAccount" class="demo-form-inline">
                <el-form-item label="账户名称">
                    <el-input v-model="formAccount.name" placeholder="账户名称"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="tel" v-model="formAccount.marks" placeholder="备注信息"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" size="small" @click="accountSearch">搜索</el-button>
                    <el-button type="success" size="small" @click="dialogAccountAdd = true">新增</el-button>
                    <el-button type="success" size="small" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form>
            <!-- 新增账户弹出框 -->
            <el-dialog width="600px" title="账户新增" :visible.sync="dialogAccountAdd">
                <el-form label-position="right" :model="formAccountAdd" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="账户名称">
                                <el-input v-model="formAccountAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="期初余额">
                                <el-input v-model="formAccountAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="开账时间">
                                <el-input v-model="formAccountAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="备注信息">
                                <el-input v-model="formAccountAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogAccountAdd = false">取 消</el-button>
                    <el-button type="primary" @click="dialogAccountAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 账户详情弹出框 -->
            <el-dialog width="600px" title="账户详情" :visible.sync="dialogAccountDetail">
                <el-form label-position="right" :model="formAccountDetail" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="账户名称">
                                <el-input v-model="formAccountDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="期初余额">
                                <el-input v-model="formAccountDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="开账时间">
                                <el-input v-model="formAccountDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="备注信息">
                                <el-input v-model="formAccountDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogAccountDetail = false">取 消</el-button>
                    <el-button type="primary" @click="dialogAccountDetail = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 资金账户报表弹出框 -->
            <el-dialog width="900px" title="积分详情-报表" class="integral" :visible.sync="dialogAccountList">
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
                        <el-button type="success" size="small" @click="accountSearchIn">搜索</el-button>
                        <el-button type="success" size="small">导出</el-button>
                        <el-button type="success" size="small" @click="reset">刷新</el-button>
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
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="1"
                :page-sizes="[5, 10, 20, 50]"
                :page-size="5"
                layout="total, sizes, prev, pager, next, jumper"
                :total="200">
                </el-pagination>
            </el-dialog>
            <!-- 账户管理表格 -->
            <el-table
            :data="AccountTableData"
            border
            style="width: 100%">
                <el-table-column
                prop="time"
                align="center"
                label="开账时间">
                </el-table-column>
                <el-table-column
                prop="name"
                align="center"
                label="账户名称"
                width="180">
                </el-table-column>
                <el-table-column
                prop="remainderFirst"
                align="center"
                label="期初余额"
                width="180">
                </el-table-column>
                <el-table-column
                prop="remainderNow"
                align="center"
                label="资金余额"
                width="180">
                </el-table-column>
                <el-table-column
                prop="marks"
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
                        <el-button type="text" size="small" @click="dialogAccountDetail = true">详情</el-button>
                        <el-button type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="200">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dialogAccountAdd:false,
            dialogAccountDetail:false,
            dialogAccountList:false, //积分详情弹出框
            formAccount:{
                name:"淘宝",
                number:88888888,
                contacts:"马云",
                phone:18888888888,
                marks:"我不喜欢钱,我对钱没有兴趣..."
            },
            formAccountAdd:{
                name:""
            },
            formAccountDetail:{
                name:""
            },
            AccountTableData:[
                {
                name: "淘宝",
                number: "88888888",
                contacts:"马云",
                phone: "18888888888",
                marks: "我不喜欢钱,我对钱没有兴趣..."
                }
            ],
            AccountTableDataIn:[ // 积分详情内表格数据
                {
                oprateTime: "2018-08-08",
                doctype: "单据一",
                docNumber: "88888888",
                oprateAccount:"",
                AccountNow:888888,
                marks: "大吉大利"
                },
                {
                oprateTime: "2018-08-08",
                doctype: "单据一",
                docNumber: "88888888",
                oprateAccount:"",
                AccountNow:888888,
                marks: "大吉大利"
                }
            ],
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
        accountSearch() {

        },
        accountSearchIn() {
            console.log("submit!");
        },
        reset() {

        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
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
  text-align: center;
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
