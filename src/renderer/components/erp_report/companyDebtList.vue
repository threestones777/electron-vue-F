<template>
    <div id='companyDebtList'>
        <div class="main-header">
            <!-- <h3>温州美联 管理中心</h3> -->
            <el-breadcrumb style="font-size:18px" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>报表</el-breadcrumb-item>
                <el-breadcrumb-item>往来单位欠款表</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="operate-in">
                <!-- <div>
                <i class="el-icon-circle-plus"></i>
                <div>增加</div>
                </div>
                <div>
                <i class="el-icon-edit"></i>
                <div>编辑</div>
                </div>
                <div>
                <i class="el-icon-remove"></i>
                <div>删除</div>
                </div>
                <div>
                <i class="el-icon-circle-check"></i>
                <div>保存</div>
                </div>
                <div>
                <i class="el-icon-circle-close"></i>
                <div>取消</div>
                </div>
                <div>
                <i class="el-icon-view"></i>
                <div>审核</div>
                </div> 
                <div class="card">
                <i class="el-icon-search"></i>
                <div>查询</div>
                </div>
                <div class="card">
                <i class="el-icon-setting"></i>
                <div>功能</div>
                <b class="el-icon-caret-bottom"></b>
                </div>
                <div class="card">
                <i class="el-icon-printer"></i>
                <div>打印</div>
                <b class="el-icon-caret-bottom"></b>
                </div>
                <div class="card">
                <i class="el-icon-menu"></i>
                <div>设置</div>
                </div>
                <div class="card">
                <i class="el-icon-zoom-in"></i>
                <div>高级查询</div>
                </div>
                <div class="card">
                <el-dropdown trigger="click" placement="bottom" @command="handleExport">
                    <div class="card-title">
                    <i class="el-icon-download"></i>
                    <div>导入/导出</div>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="in">导入</el-dropdown-item>
                    <el-dropdown-item command="xlsx-out">导出为excel</el-dropdown-item>
                    <el-dropdown-item command="csv-out">导出为csv</el-dropdown-item>
                    <el-dropdown-item command="txt-out">导出为txt</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <b class="el-icon-caret-bottom"></b>
                </div>-->
                <div @click="reset" class="card">
                    <i class="el-icon-loading"></i>
                    <div>刷新</div>
                </div>
                <!-- <div @click="dialogShow=true" class="card">
                    <i class="el-icon-tickets"></i>
                    <div>显示列</div>
                </div> -->
                <div @click="add" class="card">
                    <i class="el-icon-plus"></i>
                    <div>新增</div>
                </div>
            </div>
        </div>
        <div class="main-table">
            <!-- 搜索 -->
            <el-form :inline="true" :model="formServe" class="demo-form-inline">
                <!-- <el-form-item label="">
                    <el-input	size="small" v-model="formServe.name" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input	size="small" type="tel" v-model="formServe.marks" placeholder="编号"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input	size="small" type="tel" v-model="formServe.marks" placeholder="备注信息"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <el-input placeholder="请输入单位名称" @input="search" v-model="keywords" style="width:70%;margin-right:10px" size="small">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                    <!-- <el-button type="primary" size="small" @click="add">新增</el-button>
                    <el-button type="primary" size="small" @click="reset">刷新</el-button> -->
                </el-form-item>
            </el-form>
            <!-- 新增弹出框 -->
            <el-dialog width="450px" title="新增" :visible.sync="dialogServeAdd">
                <el-form :model="formServeAdd">
                    <el-form-item label="编号">
                        <el-input v-model="formServeAdd.price"></el-input>
                    </el-form-item>
                    <el-form-item label="备注信息">
                        <el-input v-model="formServeAdd.servePrice"></el-input>
                    </el-form-item>                    
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogServeAdd = false">取 消</el-button>
                    <el-button type="primary" @click="dialogServeAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 详情弹出框 -->
            <el-dialog width="920px" title="往来单位欠款表" :visible.sync="dialogServeDetail">
                <el-form label-position="left" ref="form" :model="formServeDetail" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="单位编码" prop="company_number" :rules="rule">
                                <el-input @focus="randomNumer" v-model="formServeDetail.company_number" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="单位名称" prop="company_name" :rules="rule">
                                <el-input v-model="formServeDetail.company_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="单位类型" prop="company_type" :rules="rule">
                                <el-select v-model="formServeDetail.company_type" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.company_type"
                                    :value="item.company_type">
                                    </el-option>
                                </el-select>
                                <!-- <el-input v-model="formServeDetail.company_type" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="金额" prop="money" :rules="rule">
                                <el-input-number :controls="false" v-model="formServeDetail.money" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.dinghuo_give_fahuo" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeDetail = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="editDone('form')">保存</el-button>
                </div>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="Data"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            v-loading="loading"
            style="width: 100%">
                <el-table-column
                prop="company_number"
                align="center"
                label="单位编码">
                </el-table-column>
                <el-table-column
                prop="company_name"
                align="center"
                label="单位名称">
                </el-table-column>
                <el-table-column
                prop="company_type"
                align="center"
                label="单位类型">
                </el-table-column>
                <el-table-column
                prop="money"
                align="center"
                label="金额">
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作"
                width="90">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showDetails(scope.row),dialogServeDetail = true">详情</el-button>
                        <el-button type="text" size="small" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
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
  getArrearsformList,
  getArrearsformDetail,
  addArrearsform,
  editArrearsform,
  delArrearsform
} from "../../api/api";
export default {
    data() {
        return {
            page:1,
            page_size:10,
            total:0,
            loading:true,
            isEdit:false,
            dialogServeAdd:false,
            dialogServeDetail:false,
            keywords:'',
            formServe:{},
            formServeAdd:{},
            formServeDetail:{},
            Data:[],
            options:[
                {
                    company_type:'政府部门',
                    value:0
                },
                {
                    company_type:'院校',
                    value:1
                },
                {
                    company_type:'科研所',
                    value:2
                },
                {
                    company_type:'国有企业',
                    value:3
                },
                {
                    company_type:'集体企业',
                    value:4
                },
                {
                    company_type:'股份合作企业',
                    value:5
                },
                {
                    company_type:'联营企业',
                    value:6
                },
                {
                    company_type:'有限责任公司',
                    value:7
                },
                {
                    company_type:'股份有限公司',
                    value:8
                },
                {
                    company_type:'私营企业',
                    value:9
                },
                {
                    company_type:'港、澳、台商投资企业',
                    value:10
                },
                {
                    company_type:'外商投资企业',
                    value:11
                },
                {
                    company_type:'其他',
                    value:12
                },
            ],
            rule: [{ required: true, message: "不能为空" }],
        }
    },
    methods:{
        initData() { // 获取列表
            let data = {
                subsite_id:3,
                user_id:sessionStorage.user_id,
                page:this.page,
                page_size:this.page_size
            }
            getArrearsformList({params:data}).then(res=>{
                console.log(res.data)
                if(res.errno == 0) {
                    this.Data = res.data.list
                    this.total = Number(res.data.record_count)
                    this.loading = false
                }
            })
        },
        randomNumer() {
            let date = new Date()
            let str = date.getFullYear()+String((date.getMonth()+1)).padStart(2,'0')+String(date.getDate()).padStart(2,'0')+String(date.getHours()).padStart(2,'0')+String(date.getMinutes()).padStart(2,'0')+String(date.getSeconds()).padStart(2,'0')
            let randomNum = `K${str+String(Math.floor(Math.random()*100)).padStart(2,'0')}`
            this.$set(this.formServeDetail,'company_number',randomNum)
        },
        add() {
            this.isEdit = false;
            this.formServeDetail = {};
            if (this.$refs.form) {
                this.$refs.form.resetFields();
            }
            this.dialogServeDetail = true;
        },
        editDone(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.isEdit) {
                        let tmpData = this.$qs.stringify(this.formServeDetail);
                        editArrearsform(tmpData).then(res => {
                        if (res.errno == 0) {
                            this.$message({
                            type: "success",
                            message: "修改成功!",
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
                        this.dialogServeDetail = false;
                        });
                    } else {
                        this.formServeDetail.need_xiaoshou = 0;
                        this.formServeDetail.not_zhangmian_num = 0;
                        this.formServeDetail.xiazai_kucun = 0;
                        let tmpData = this.$qs.stringify(this.formServeDetail);
                        addArrearsform(tmpData).then(res => {
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
                        this.dialogServeDetail = false;
                        });
                    }
                }
            });
        },
        search() {
            getArrearsformList({params:{
                page:1,
                page_size:10,
                company_name:this.keywords
            }}).then(res=>{
                console.log(res.data)
                if(res.errno == 0) {
                    this.Data = res.data.list
                    this.total = Number(res.data.record_count)
                    this.loading = false
                }
            })
        },       
        reset() {
            this.initData()   
        },
        handleCurrentChange(val) {
            this.page = val
            this.initData()   
        },
        showDetails(row){
            this.isEdit = true;
            let data = { id: row.id };
            getArrearsformDetail({params:data}).then(res => {
                if (res.errno == 0) {
                this.formServeDetail = res.data;
                // this.formServeDetail.pf_lt_shoujia = res.data.pf_lt_shoujia.substring(1);
                // this.formServeDetail.time = [+new Date(this.formServeDetail.start_time),+new Date(this.formServeDetail.end_time)];
                }
            });
        },
        deleteRow(index, rows) {
            this.$confirm("即将执行删除操作, 确认删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(() => {
                console.log(rows.id);
                let tmpData = this.$qs.stringify({ id: rows.id });
                delArrearsform(tmpData).then(res => {
                    if (res.errno == 0) {
                    this.$message({
                        type: "success",
                        message: "删除成功!",
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
#companyDebtList {
  margin: 10px;
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
#companyDebtList >>> .el-dialog__body {
  padding: 0 20px;
}
.main-table >>> .el-dialog__body .el-form-item__content {
  width: 180px;
  text-align: right;
}
.main-table >>> .el-dialog__body .el-form-item.time .el-form-item__content {
  width: 80%;
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
</style>