<template>
    <div class="shelfDisplay">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>货架</el-breadcrumb-item>
                <el-breadcrumb-item>货架陈列</el-breadcrumb-item>
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
                    <el-input placeholder="请输入商品名称" @input="search" v-model="keywords" style="width:50%;margin-right:10px" size="small">
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
            <el-dialog width="700px" title="详情" :visible.sync="dialogServeDetail">
                <el-form label-position="left" ref="form" :model="formServeDetail" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="店名">
                                <el-input v-model="formServeDetail.subshop_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="货架号">
                                <el-input v-model="formServeDetail.shelves_sn" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="序列号">
                                <el-input v-model="formServeDetail.serial_number" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="货架区域">
                                <el-input v-model="formServeDetail.area" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="货号">
                                <el-input v-model="formServeDetail.product_sn" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="条码">
                                <el-input v-model="formServeDetail.serial_code" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="商品名称">
                                <el-input v-model="formServeDetail.goods_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="规格">
                                <el-input v-model="formServeDetail.attr_value" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="售价" prop="shop_price" :rules="rule">
                                <el-input-number v-model="formServeDetail.shop_price" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.shop_price" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="品牌名称">
                                <el-input v-model="formServeDetail.brand_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="类别名称">
                                <el-input v-model="formServeDetail.cat_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="每排陈列数" prop="per_row_display" :rules="rule">
                                <el-input v-model="formServeDetail.per_row_display" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="陈列排数" prop="display_num" :rules="rule">
                                <el-input v-model="formServeDetail.display_num" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="修改日期">
                                <el-input disabled v-model="formServeDetail.edit_time" autocomplete="off"></el-input>
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
                prop="subshop_name"
                align="center"
                label="店名">
                </el-table-column>
                <el-table-column
                prop="shelves_sn"
                align="center"
                label="货架号">
                </el-table-column>
                <el-table-column
                prop="serial_number"
                align="center"
                label="序列号">
                </el-table-column>
                <el-table-column
                prop="area"
                align="center"
                label="货架区域">
                </el-table-column>
                <el-table-column
                prop="product_sn"
                align="center"
                label="货号">
                </el-table-column>
                <el-table-column
                prop="serial_code"
                align="center"
                label="条码">
                </el-table-column>
                <el-table-column
                prop="goods_name"
                align="center"
                label="商品名称">
                </el-table-column>
                <el-table-column
                prop="attr_value"
                align="center"
                label="规格">
                </el-table-column>
                <el-table-column
                prop="shop_price"
                align="center"
                label="售价">
                </el-table-column>
                <el-table-column
                prop="brand_name"
                align="center"
                label="品牌名称">
                </el-table-column>
                <el-table-column
                prop="cat_name"
                align="center"
                label="类别名称">
                </el-table-column>
                <el-table-column
                prop="per_row_display"
                align="center"
                label="每排陈列数量">
                </el-table-column>
                <el-table-column
                prop="display_num"
                align="center"
                label="陈列排数">
                </el-table-column>
                <el-table-column
                prop="edit_time"
                align="center"
                label="修改日期">
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
  getShelfdisplayList,
  getShelfdisplayDetail,
  addShelfdisplay,
  editShelfdisplay
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
                user_id:sessionStorage.user_id,
                page:this.page,
                page_size:this.page_size
            })
            getShelfdisplayList(data).then(res=>{
            console.log(res.data)
            if(res.errno == 0) {
                    this.Data = res.data.orders
                    this.total = Number(res.data.record_count)
                    this.loading = false
                }
            })
        },
        editDone(formName) {
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    if(this.isEdit) {
                        this.formServeDetail.edit_time = parseInt(+new Date()/1000)
                        let tmpData = this.$qs.stringify(this.formServeDetail)
                        editShelfdisplay(tmpData).then(res=>{
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
                        this.formServeDetail.serial_number = 2
                        this.formServeDetail.brand_id = 5
                        this.formServeDetail.cat_id = 1913
                        this.formServeDetail.edit_time = parseInt(+new Date()/1000)
                        let tmpData = this.$qs.stringify(this.formServeDetail)
                        addShelfdisplay(tmpData).then(res=>{
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
                goods_name:this.keywords
            });
            getShelfdisplayList(data).then(res=>{
                console.log(res.data)
                if(res.errno == 0) {
                    this.Data = res.data.orders
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
        add() {
            this.isEdit = false
            this.formServeDetail = {}
            this.dialogServeDetail = true

        },
        showDetails(row){
            this.isEdit = true
            // this.formServeDetail = row
            let data = this.$qs.stringify({ id: row.id });
            getShelfdisplayDetail(data).then(res=>{
                if(res.errno==0) {
                    this.formServeDetail = res.data
                    this.formServeDetail.shop_price=res.data.shop_price.substring(1)
                    this.formServeDetail.per_row_display = Number(res.data.per_row_display)
                    this.formServeDetail.display_num = Number(res.data.display_num)
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
          let tmpData = this.$qs.stringify({ is_delete: 1, id: rows.id });
          editShelfdisplay(tmpData).then(res => {
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
.shelfDisplay{
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
.shelfDisplay >>> .el-dialog__body {
  padding: 0 20px;
}
.shelfDisplay >>>.el-dialog .el-form-item {
    float: right;
}
.el-row {
  border-top: 1px dashed #ccc;
}

</style>