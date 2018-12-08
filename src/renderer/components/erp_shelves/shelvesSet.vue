<template>
    <div class="shelvesSet">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>货架</el-breadcrumb-item>
                <el-breadcrumb-item>货架设置</el-breadcrumb-item>
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
            <el-dialog width="700px" title="货架信息" :visible.sync="dialogServeDetail">
                <el-form label-position="left" ref="form" :model="formServeDetail" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="货架编号">
                                <el-input v-model="formServeDetail.huojia_sn" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="长度(cm)" prop="longs" :rules="rule">
                                <el-input v-model.number="formServeDetail.longs" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="宽度(cm)" prop="width" :rules="rule">
                                <el-input v-model.number="formServeDetail.width" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="高(cm)" prop="height" :rules="rule">
                                <el-input v-model.number="formServeDetail.height" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="层数" prop="layer_num" :rules="rule">
                                <el-input-number v-model="formServeDetail.layer_num" :min="1"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.layer_num" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="8" v-show="isEdit">
                            <el-form-item label="修改时间">
                                <el-input disabled v-model="formServeDetail.edit_time" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col> -->
                    </el-row>
                    <!-- <el-row v-show="isEdit">
                        <el-col :span="8">
                            <el-form-item label="审核时间">
                                <el-input disabled v-model="formServeDetail.check_time" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row> -->
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="resetDialog('form'),dialogServeDetail = false">取 消</el-button>
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
                prop="huojia_sn"
                align="center"
                label="货架编号">
                </el-table-column>
                <el-table-column
                prop="longs"
                align="center"
                label="长度(cm)">
                </el-table-column>
                <el-table-column
                prop="width"
                align="center"
                label="宽度(cm)">
                </el-table-column>
                <el-table-column
                prop="height"
                align="center"
                label="高(cm)">
                </el-table-column>
                <el-table-column
                prop="layer_num"
                align="center"
                label="层数">
                </el-table-column>
                <el-table-column
                prop="edit_time"
                align="center"
                label="修改时间">
                </el-table-column>
                <el-table-column
                prop="check_time"
                align="center"
                label="审核时间">
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
  getShelfsetList,
  getShelfsetDetail,
  addShelfset,
  editShelfset
} from "../../api/api";
export default {
    inject: ['reload'],
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
            rule:[
                { required: true, message: '不能为空'},
                { type: 'number', message: '必须为数字'}
            ]
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
            getShelfsetList(data).then(res=>{
                console.log(res.data)
                if(res.errno == 0) {
                    this.Data = res.data.shelfset_list
                    this.total = Number(res.data.record_count)
                    this.loading = false
                }
            })
        },
        editDone(formName) { // 编辑/添加
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    if(this.isEdit) {
                        this.formServeDetail.edit_time = parseInt(+new Date()/1000)
                        this.formServeDetail.check_time = parseInt(+new Date()/1000)
                        let tmpData = this.$qs.stringify(this.formServeDetail)
                        editShelfset(tmpData).then(res=>{
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
                        this.formServeDetail.layer_num = 3
                        this.formServeDetail.edit_user = 2
                        this.formServeDetail.check_user = 2
                        this.formServeDetail.edit_time = parseInt(+new Date()/1000)
                        this.formServeDetail.check_time = parseInt(+new Date()/1000)
                        let tmpData = this.$qs.stringify(this.formServeDetail)
                        addShelfset(tmpData).then(res=>{
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
        add() { // 切换为添加模式
            this.isEdit = false
            this.formServeDetail = {}
            this.dialogServeDetail = true
        },
        serveSearch() {
            console.log("开启搜索");
        },        
        reset() {
            this.reload()
        },
        resetDialog(formName) { // 清除验证红框
            this.$refs[formName].resetFields();
        },
        handleCurrentChange(val) { //分页
            this.page = val
            this.initData()   
        },
        showDetails(row){ // 详细信息
            this.isEdit = true
            let data = this.$qs.stringify({ id: row.id });
            getShelfsetDetail(data).then(res=>{
                if(res.errno==0) {
                    this.formServeDetail = res.data[0]
                    this.formServeDetail.longs=Number(this.formServeDetail.longs)
                    this.formServeDetail.width=Number(this.formServeDetail.width)
                    this.formServeDetail.height=Number(this.formServeDetail.height)
                }
            })
        },
        deleteRow(index, rows) { // 删除
            this.$confirm("即将执行删除操作, 确认删除吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        })
        .then(() => {
            console.log(rows.id)
          let tmpData = this.$qs.stringify({ is_delete: 1, id: rows.id });
          editShelfset(tmpData).then(res => {
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
.shelvesSet{
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
.shelvesSet >>> .el-dialog__body {
  padding: 0 20px;
}
.main-table >>> .el-dialog__body .el-form-item__content {
    width: 130px;
    text-align: right;
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
.main-table>>>.el-dialog__body .el-date-editor,
.main-table>>>.el-dialog__body .el-input-number {
    width: 100%;
}
.el-row {
  border-top: 1px dashed #ccc;
}

</style>