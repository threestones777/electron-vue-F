<template>
    <div class="shopPartition">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>货架</el-breadcrumb-item>
                <el-breadcrumb-item>店铺分区</el-breadcrumb-item>
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
            <el-dialog width="380px" title="店铺分区" :visible.sync="dialogServeDetail">
                <el-form :model="formServeDetail">
                    <el-form-item label="地区名字">
                        <el-input v-model="formServeDetail.area_name"></el-input>
                    </el-form-item>
                    <el-form-item label="修改时间">
                        <el-input disabled v-model="formServeDetail.edit_time"></el-input>
                    </el-form-item>                    
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeDetail = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="editDone">保存</el-button>
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
                prop="area_name"
                align="center"
                label="地区名字">
                </el-table-column>
                <el-table-column
                prop="edit_time"
                align="center"
                label="修改时间">
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
  getShoppartitionList,
  getShoppartitionDetail,
  addShoppartition,
  editShoppartition,
addShelfset
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
            getShoppartitionList(data).then(res=>{
            console.log(res.data)
            if(res.errno == 0) {
                    this.Data = res.data.shoppartition_list
                    this.total = Number(res.data.record_count)
                    this.loading = false
                }
            })
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
            this.isEdit = true
            // this.formServeDetail = row
            let data = this.$qs.stringify({ id: row.id });
            getShoppartitionDetail(data).then(res=>{
                if(res.errno==0) {
                    this.formServeDetail = res.data
                }
            })
        },
        add() {
            this.formServeDetail.area_name = ''
            this.formServeDetail.edit_time = ''
            this.dialogServeDetail = true
        },
        editDone() {
            if(this.isEdit) {
                this.formServeDetail.edit_time = parseInt(+new Date()/1000)
                console.log(this.formServeDetail)
                let tmpData = this.$qs.stringify(this.formServeDetail);
                editShoppartition(tmpData).then(res=>{
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
                this.formServeDetail.edit_time = parseInt(+new Date()/1000)
                this.formServeDetail.arae_id = ''
                this.formServeDetail.edit_user = ''
                let tmpData = this.$qs.stringify(this.formServeDetail);
                addShoppartition(tmpData).then(res=>{
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
          editShoppartition(tmpData).then(res => {
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
.shopPartition{
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
  width: 80%;
}

/* 分页器 */
.el-pagination {
  padding: 20px 0;
  text-align: right;
}

/* 新增弹出框 & 详情弹出框*/
.shopPartition >>> .el-dialog__body {
  padding: 0 20px;
}
/* .shopPartition >>>.el-dialog .el-form-item {
    float: right;
} */
.el-row {
  border-top: 1px dashed #ccc;
}

</style>