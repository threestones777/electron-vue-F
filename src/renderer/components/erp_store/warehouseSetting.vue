<template>
    <div class="warehouseSetting">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>仓库</el-breadcrumb-item>
                <el-breadcrumb-item>仓库设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <!-- 搜索 -->
            <el-form :inline="true" :model="formServe" class="demo-form-inline">
                <el-form-item label="">
                    <el-input	size="small" v-model="formServe.name" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input	size="small" type="tel" v-model="formServe.marks" placeholder="编号"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input	size="small" type="tel" v-model="formServe.marks" placeholder="备注信息"></el-input>
                </el-form-item>
                <el-form-item>
                    <!-- <el-button type="success" size="small" @click="serveSearch">搜索</el-button> -->
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
                    <el-button @click="dialogServeAdd = false">取 消</el-button>
                    <el-button type="primary" @click="dialogServeAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 详情弹出框 -->
            <el-dialog width="920px" title="仓库设置" :visible.sync="dialogServeDetail">
                <el-form label-position="left" ref="form" :model="formServeDetail" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="库存提示数量" prop="kucun_tishi" :rules="rule">
                                <el-input-number v-model="formServeDetail.kucun_tishi" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.kucun_tishi" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="禁出库线" prop="kucun_jinzhi" :rules="rule">
                                <el-input-number v-model="formServeDetail.kucun_jinzhi" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.kucun_jinzhi" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="禁出库售价线" prop="pf_lt_shoujia" :rules="rule">
                                <el-input-number v-model="formServeDetail.pf_lt_shoujia" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.pf_lt_shoujia" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="批发订单" prop="dinghuo_give_fahuo" :rules="rule">
                                <el-input-number v-model="formServeDetail.dinghuo_give_fahuo" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.dinghuo_give_fahuo" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="简单盘点" prop="simple_pandian" :rules="rule">
                                <el-input-number v-model="formServeDetail.simple_pandian" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.simple_pandian" autocomplete="off"></el-input> -->
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
                prop="kucun_tishi"
                align="center"
                label="库存提示数量">
                </el-table-column>
                <el-table-column
                prop="kucun_jinzhi"
                align="center"
                label="禁出库线">
                </el-table-column>
                <el-table-column
                prop="pf_lt_shoujia"
                align="center"
                label="禁出库售价线(元)">
                </el-table-column>
                <el-table-column
                prop="dinghuo_give_fahuo"
                align="center"
                label="批发订单">
                </el-table-column>
                <el-table-column
                prop="simple_pandian"
                align="center"
                label="简单盘点">
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
  getWarehousesettingList,
  getWarehousesettingDetail,
  addWarehousesetting,
  editWarehousesetting
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
            rule: [{ required: true, message: "不能为空" }],
        }
    },
    methods:{
        initData() { // 获取列表
          let data = this.$qs.stringify({
              subsite_id:3,
              user_id:sessionStorage.user_id,
              page:this.page,
              page_size:this.page_size
          })
            getWarehousesettingList(data).then(res=>{
            console.log(res.data)
            if(res.errno == 0) {
                    this.Data = res.data.warehouseset_list
                    this.total = Number(res.data.record_count)
                    this.loading = false
                }
            })
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
                        editWarehousesetting(tmpData).then(res => {
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
                        addWarehousesetting(tmpData).then(res => {
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
        serveSearch() {
            console.log("开启搜索");
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
            let data = this.$qs.stringify({ id: row.id });
            getWarehousesettingDetail(data).then(res => {
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
            let tmpData = this.$qs.stringify({ is_delete: 1, id: rows.id });
            editWarehousesetting(tmpData).then(res => {
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
.warehouseSetting {
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
.warehouseSetting >>> .el-dialog__body {
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