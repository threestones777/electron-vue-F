<template>
    <div class="productSize">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>货架</el-breadcrumb-item>
                <el-breadcrumb-item>商品尺寸</el-breadcrumb-item>
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
            <el-dialog width="1000px" title="商品尺寸" :visible.sync="dialogServeDetail">
                <el-form label-position="left" ref="form" :model="formServeDetail" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="主条码">
                                <el-input v-model="formServeDetail.main_tm" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="货号">
                                <el-input v-model="formServeDetail.product_sn" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="商品名称">
                                <el-input v-model="formServeDetail.goods_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="商品长cm" prop="goods_long" :rules="rule">
                                <el-input v-model.number="formServeDetail.goods_long" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="商品宽/厚cm" prop="goods_width" :rules="rule">
                                <el-input v-model.number="formServeDetail.goods_width" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="商品高cm" prop="goods_height" :rules="rule">
                                <el-input v-model.number="formServeDetail.goods_height" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="箱宽cm" prop="box_width" :rules="rule">
                                <el-input v-model.number="formServeDetail.box_width" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="箱长cm" prop="box_long" :rules="rule">
                                <el-input v-model.number="formServeDetail.box_long" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="箱高cm" prop="box_height" :rules="rule">
                                <el-input v-model.number="formServeDetail.box_height" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="售价" prop="shop_price" :rules="rule">
                                <el-input-number v-model="formServeDetail.shop_price" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.shop_price" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="会员价" prop="member_price" :rules="rule">
                                <el-input-number v-model="formServeDetail.member_price" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.member_price" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="箱装数" prop="box_in_num" :rules="rule">
                                <el-input v-model.number="formServeDetail.box_in_num" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="单位" prop="unit" :rules="rule">
                                <el-input-number v-model.number="formServeDetail.unit" :min="1"></el-input-number>
                                <!-- <el-input v-model.number="formServeDetail.unit" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="厂家货号">
                                <el-input v-model="formServeDetail.changjia_sn" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="品牌">
                                <el-input v-model="formServeDetail.brand_name" autocomplete="off"></el-input>
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
                prop="main_tm"
                align="center"
                label="主条码">
                </el-table-column>
                <el-table-column
                prop="product_sn"
                align="center"
                label="货号">
                </el-table-column>
                <el-table-column
                prop="goods_name"
                align="center"
                label="商品名称">
                </el-table-column>
                <el-table-column
                prop="goods_long"
                align="center"
                label="商品长cm">
                </el-table-column>
                <el-table-column
                prop="goods_width"
                align="center"
                label="商品宽/厚(cm)">
                </el-table-column>
                <el-table-column
                prop="goods_height"
                align="center"
                label="商品高(cm)">
                </el-table-column>
                <el-table-column
                prop="box_width"
                align="center"
                label="箱宽(cm)">
                </el-table-column>
                <el-table-column
                prop="box_long"
                align="center"
                label="箱长(cm)">
                </el-table-column>
                <el-table-column
                prop="box_height"
                align="center"
                label="箱高(cm)">
                </el-table-column>
                <el-table-column
                prop="shop_price"
                align="center"
                label="售价">
                </el-table-column>
                <el-table-column
                prop="member_price"
                align="center"
                label="会员价">
                </el-table-column>
                <el-table-column
                prop="box_in_num"
                align="center"
                label="箱装数">
                </el-table-column>
                <el-table-column
                prop="unit"
                align="center"
                label="单位">
                </el-table-column>
                <el-table-column
                prop="changjia_sn"
                align="center"
                label="厂家货号">
                </el-table-column>
                <el-table-column
                prop="brand_name"
                align="center"
                label="品牌">
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
  getProductsizeList,
  getProductsizeDetail,
  addProductsize,
  editProductsize
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
            keywords:"",
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
            getProductsizeList(data).then(res=>{
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
                        let tmpData = this.$qs.stringify(this.formServeDetail)
                        editProductsize(tmpData).then(res=>{
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
                        this.formServeDetail.supplier_id = 2
                        this.formServeDetail.edit_time = parseInt(+new Date()/1000)
                        this.formServeDetail.check_time = parseInt(+new Date()/1000)
                        let tmpData = this.$qs.stringify(this.formServeDetail)
                        addProductsize(tmpData).then(res=>{
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
        add() {
            this.isEdit = false
            this.formServeDetail = {}
            this.dialogServeDetail = true
        },
        search() {
            let data=this.$qs.stringify({
                goods_name:this.keywords
            });
            getProductsizeList(data).then(res=>{
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
        showDetails(row){
            this.isEdit = true
            // this.formServeDetail = row
            let data = this.$qs.stringify({ id: row.id });
            getProductsizeDetail(data).then(res=>{
                if(res.errno==0) {
                    this.formServeDetail = res.data
                    this.formServeDetail.goods_long=Number(res.data.goods_long)
                    this.formServeDetail.goods_width=Number(res.data.goods_width)
                    this.formServeDetail.goods_height=Number(res.data.goods_height)
                    this.formServeDetail.box_width=Number(res.data.box_width)
                    this.formServeDetail.box_long=Number(res.data.box_long)
                    this.formServeDetail.box_height=Number(res.data.box_height)
                    this.formServeDetail.shop_price=res.data.shop_price.substring(1)
                    this.formServeDetail.member_price=res.data.member_price.substring(1)
                    this.formServeDetail.box_in_num=Number(res.data.box_in_num)
                    this.formServeDetail.unit=Number(res.data.unit)
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
          editProductsize(tmpData).then(res => {
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
.productSize{
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
.productSize >>> .el-dialog__body {
  padding: 0 20px;
}
.productSize >>> .el-dialog .el-form-item {
    float: right;
}
.el-row {
  border-top: 1px dashed #ccc;
}

</style>