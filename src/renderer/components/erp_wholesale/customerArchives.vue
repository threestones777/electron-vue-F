<template>
    <div class="customerArchives">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>批发</el-breadcrumb-item>
                <el-breadcrumb-item>客户档案</el-breadcrumb-item>
            </el-breadcrumb>
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
                    <el-input placeholder="请输入客户名" @input="search" v-model="keywords" style="width:50%;margin-right:10px" size="small">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                    <el-button type="primary" size="small" @click="add">新增</el-button>
                    <el-button type="primary" size="small" @click="reset">刷新</el-button>
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
                    <el-button	size="small" @click="dialogServeAdd = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="dialogServeAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 详情弹出框 -->
            <el-dialog width="990px" title="客户档案" :visible.sync="dialogServeDetail">
                <el-form label-position="left" ref="form" :model="formServeDetail" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="客户名">
                                <el-input v-model="formServeDetail.user_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="预售款余额" prop="yushou_yue" :rules="rule">
                                <el-input-number v-model="formServeDetail.yushou_yue" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.yushou_yue" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="欠款余额" prop="qiankuan_yue" :rules="rule">
                                <el-input-number v-model="formServeDetail.qiankuan_yue" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.qiankuan_yue" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="区域id">
                                <el-input v-model="formServeDetail.area_id" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="客户级别">
                                <el-input v-model="formServeDetail.user_rank" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="价格扣率" prop="price_spike" :rules="rule">
                                <el-input-number v-model="formServeDetail.price_spike" :precision="2" :min="0" :max="100"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.price_spike" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <!-- <el-col :span="8">
                            <el-form-item label="结算期">
                                <el-input disabled v-model="formServeDetail.jiesuan_cycle" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="8">
                            <el-form-item label="联系人">
                                <el-input v-model="formServeDetail.contacts" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="电话">
                                <el-input v-model="formServeDetail.tel" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="手机号">
                                <el-input v-model="formServeDetail.mobile" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="传真">
                                <el-input v-model="formServeDetail.fax" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="地址">
                                <el-input v-model="formServeDetail.address" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="最近地标">
                                <el-input v-model="formServeDetail.sign_building" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="邮编">
                                <el-input v-model.number="formServeDetail.zip_code" autocomplete="off" maxlength="6"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="信用额度" prop="credit_line" :rules="rule">
                                <el-input-number v-model="formServeDetail.credit_line" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.credit_line" autocomplete="off"></el-input> -->
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
                prop="user_name"
                align="center"
                label="客户名">
                </el-table-column>
                <el-table-column
                prop="yushou_yue"
                align="center"
                label="预售款余额">
                </el-table-column>
                <el-table-column
                prop="qiankuan_yue"
                align="center"
                label="欠款余额">
                </el-table-column>
                <el-table-column
                prop="area_id"
                align="center"
                label="区域id">
                </el-table-column>
                <el-table-column
                prop="user_rank"
                align="center"
                label="客户级别">
                </el-table-column>
                <el-table-column
                prop="price_spike"
                align="center"
                label="价格扣率">
                </el-table-column>
                <el-table-column
                prop="jiesuan_cycle"
                align="center"
                label="结算期">
                </el-table-column>
                <el-table-column
                prop="contacts"
                align="center"
                label="联系人">
                </el-table-column>
                <el-table-column
                prop="tel"
                align="center"
                label="电话">
                </el-table-column>
                <el-table-column
                prop="mobile"
                align="center"
                label="手机号">
                </el-table-column>
                <el-table-column
                prop="fax"
                align="center"
                label="传真">
                </el-table-column>
                <el-table-column
                prop="address"
                align="center"
                label="地址">
                </el-table-column>
                <el-table-column
                prop="sign_building"
                align="center"
                label="最近标志性建筑">
                </el-table-column>
                <el-table-column
                prop="zip_code"
                align="center"
                label="邮编">
                </el-table-column>
                <el-table-column
                prop="credit_line"
                align="center"
                label="信用额度">
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作"
                width="90">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showDetails(scope.row),dialogServeDetail = true">详情</el-button>
                        <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, scope.row)">删除</el-button>
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
  getCustomerarchivesList,
  getCustomerarchivesDetail,
  addCustomerarchives,
  editCustomerarchives
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
            formServe:{
                name:"",
                marks:""
            },
            formServeAdd:{
                name:""
            },
            formServeDetail:{
                
            },
            Data:[],
            rule:[
                { required: true, message: '不能为空'},
                { type: 'number', message: '必须为数字值'}
            ]
        }
    },
    methods:{
        initData() { // 获取列表
          let data = this.$qs.stringify({
              subsite_id:3,
            //   user_id:sessionStorage.user_id,
              page:this.page,
              page_size:this.page_size
          })
            getCustomerarchivesList(data).then(res=>{
                console.log(res.data)
                if(res.errno == 0) {
                    this.Data = res.data.customerarchives_list
                    this.total = Number(res.data.record_count)
                    this.loading = false
                }
            })
        },
        add() {
            this.isEdit = false
            this.formServeDetail = {}
            this.dialogServeDetail = true
        },
        editDone(formName) {
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    if(this.isEdit) {
                        let tmpData = this.$qs.stringify(this.formServeDetail)
                        editCustomerarchives(tmpData).then(res=>{
                            if(res.errno==0) {
                                this.$message({
                                type: "success",
                                message: "修改成功!",
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
                            this.dialogServeDetail = false
                        })
                    }else {
                        this.formServeDetail.user_id = sessionStorage.user_id
                        this.formServeDetail.area_id = 1
                        let tmpData = this.$qs.stringify(this.formServeDetail)
                        addCustomerarchives(tmpData).then(res=>{
                            if(res.errno==0) {
                                this.$message({
                                type: "success",
                                message: "添加成功!",
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
                            this.dialogServeDetail = false
                        })
                    }
                }
            })
        },
        search() {
            let data=this.$qs.stringify({
                user_name:this.keywords
            });
            getCustomerarchivesList(data).then(res=>{
                console.log(res.data)
                if(res.errno == 0) {
                    this.Data = res.data.customerarchives_list
                    this.total = Number(res.data.record_count)
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
            this.isEdit = true
            // this.formServeDetail = row
            let data = this.$qs.stringify({ id: row.id });
            getCustomerarchivesDetail(data).then(res=>{
                if(res.errno==0) {
                    this.formServeDetail = res.data[0]
                    this.formServeDetail.yushou_yue=res.data[0].yushou_yue.substring(1)
                    this.formServeDetail.qiankuan_yue=res.data[0].qiankuan_yue.substring(1)
                    this.formServeDetail.credit_line=res.data[0].credit_line.substring(1)
                }
            })
        },
        deleteRow(index, rows) {
            this.$confirm("即将执行删除操作, 确认删除吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        })
        .then(() => {
            console.log(rows.id)
          let tmpData = this.$qs.stringify({ is_delete: 1, id: rows.id });
          editCustomerarchives(tmpData).then(res => {
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
.customerArchives{
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
.customerArchives >>> .el-dialog__body {
  padding: 0 20px;
}
.customerArchives >>>.el-dialog .el-form-item {
    float: right;
}
.el-row {
  border-top: 1px dashed #ccc;
}

</style>