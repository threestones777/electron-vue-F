<template>
    <div class="goodsProfitList">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>报表</el-breadcrumb-item>
                <el-breadcrumb-item>商品利润表</el-breadcrumb-item>
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
                    <el-button type="primary" size="small" @click="dialogServeAdd = true">新增</el-button>
                    <el-button type="primary" size="small" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form>
            <!-- 新增弹出框 formServeAdd-->
            <el-dialog width="700px" title="新增" :visible.sync="dialogServeAdd">
                <el-form :model="formServeAdd"  style="text-align:center">
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            id<el-input v-model="formServeAdd.id"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            商品id<el-input v-model="formServeAdd.goods_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            商品名称<el-input v-model="formServeAdd.goods_name"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            添加时间<el-input v-model="formServeAdd.add_time"></el-input> 
                        </el-col>
                        <el-col :span="7">
                            商品属性<el-input v-model="formServeAdd.attr_value"></el-input>
                        </el-col>
                        <el-col :span="7">
                            仓库Id<el-input v-model="formServeAdd.store_id"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            商品批次<el-input v-model="formServeAdd.goods_sn"></el-input> 
                        </el-col>
                        <el-col :span="7">
                            购物车id<el-input v-model="formServeAdd.cat_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            单位id<el-input v-model="formServeAdd.unit_id"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            品牌id<el-input v-model="formServeAdd.brand_id"></el-input> 
                        </el-col>
                        <el-col :span="7">
                            销售成本<el-input v-model="formServeAdd.xiaoshou_chengben"></el-input>
                        </el-col>
                        <el-col :span="7">
                            库存预警<el-input v-model="formServeAdd.warn_number"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            商品价格<el-input v-model="formServeAdd.shop_price"></el-input> 
                        </el-col>
                        <el-col :span="7">
                            零售价格<el-input v-model="formServeAdd.retail_price"></el-input> 
                        </el-col>
                        <el-col :span="7">
                            销售收入<el-input v-model="formServeAdd.xiaoshou_shouru"></el-input> 
                        </el-col>                        
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            仓库名称<el-input v-model="formServeAdd.store_name"></el-input>
                        </el-col>
                        <el-col :span="7">
                            单位名称<el-input v-model="formServeAdd.unit_name"></el-input>
                        </el-col>
                        <el-col :span="7">
                            品牌名称<el-input v-model="formServeAdd.brand_name"></el-input> 
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeAdd = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="add(),dialogServeAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 详情弹出框 -->
            <el-dialog width="700px" title="详情" :visible.sync="dialogServeDetail">
                <el-form :model="formServeDetail"  style="text-align:center">
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            id<el-input v-model="formServeDetail.id"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            商品id<el-input v-model="formServeDetail.goods_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            商品名称<el-input v-model="formServeDetail.goods_name"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            添加时间<el-input v-model="formServeDetail.add_time"></el-input> 
                        </el-col>
                        <el-col :span="7">
                            商品属性<el-input v-model="formServeDetail.attr_value"></el-input>
                        </el-col>
                        <el-col :span="7">
                            仓库Id<el-input v-model="formServeDetail.store_id"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            商品批次<el-input v-model="formServeDetail.goods_sn"></el-input> 
                        </el-col>
                        <el-col :span="7">
                            购物车id<el-input v-model="formServeDetail.cat_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            单位id<el-input v-model="formServeDetail.unit_id"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            品牌id<el-input v-model="formServeDetail.brand_id"></el-input> 
                        </el-col>
                        <el-col :span="7">
                            位置id<el-input v-model="formServeDetail.position_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            库存预警<el-input v-model="formServeDetail.warn_number"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            商品价格<el-input v-model="formServeDetail.shop_price"></el-input> 
                        </el-col>
                        <el-col :span="7">
                            仓库名称<el-input v-model="formServeDetail.store_name"></el-input>
                        </el-col>
                        <el-col :span="7">
                            单位名称<el-input v-model="formServeDetail.unit_name"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            品牌名称<el-input v-model="formServeDetail.brand_name"></el-input> 
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeDetail = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="edit(),dialogServeDetail = false">保存修改</el-button>
                </div>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="goodsProData"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            style="width: 100%">
                <el-table-column
                prop="id"
                align="center"
                label="id">
                </el-table-column>
                <el-table-column
                prop="goods_id"
                align="center"
                label="商品Id">
                </el-table-column>
                <el-table-column
                prop="goods_name"
                align="center"
                label="商品名称">
                </el-table-column>
                <el-table-column
                prop="add_time"
                align="center"
                label="添加时间">
                </el-table-column>
                <el-table-column
                prop="attr_value"
                align="center"
                label="属性">
                </el-table-column>
                <el-table-column
                prop="store_name"
                align="center"
                label="仓库名">
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showDetails(scope.row),dialogServeDetail = true">详情</el-button>
                        <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
                @current-change="handleCurrentChange"
                layout="prev, pager, next,jumper"
                :page-count="pages">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {goodsprofit,goodsprofitDe,goodsprofitEd,goodsprofitAdd} from '../../api/apiW' ;
export default {
    inject: ['reload'],
    data() {
        return {
            pages:1,
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
            formServeDetail:{},
            goodsProData:[],
        }
    },
    methods:{
        search() {
            let data=this.$qs.stringify({
                page:1,
                page_size:10,
                goods_name:this.keywords
            });
            goodsprofit(data).then(res=>{
                console.log(res.data);
                this.goodsProData=res.data.movereceipt_list;
            });
        },        
        reset() {
            this.reload();
        },
        handleCurrentChange(val) {
            console.log(val);          
        },
        showDetails(row){//--------------详情
            console.log(row.id);
            let dataD = this.$qs.stringify({
                id:row.id
            });
            goodsprofitDe(dataD).then(res=>{
                if(res.errno==0){
                    console.log(res.data[0]);
                    this.formServeDetail=res.data[0];
                }else{
                    this.dialogServeDetail=false;
                    alert("您查找的用户不存在");
                }
            });
        },
        edit(){//--------------修改
          console.log("xiugai");
          this.formServeDetail.shop_price=this.formServeDetail.shop_price.slice(1);
          let dataE=this.$qs.stringify(this.formServeDetail);
            goodsprofitEd(dataE).then(res=>{
                console.log(res.errno);
                if(res.errno==0){
                    this.$alert("修改成功")
                    this.reload();
                }else{
                    this.$alert("修改失败")
                }
            })
        },
        add(){//--------------添加
            console.log("add");
            let dataA=this.$qs.stringify(this.formServeAdd);
            goodsprofitAdd(dataA).then(res=>{
                if(res.errno==0){
                    this.$alert("添加成功")
                    this.reload();
                }else{
                    this.$alert("添加失败")
                }
            })
        },
        deleteRow(row) {//--------------删除
            console.log(row.id);
            let Message=confirm("确定删除此行数据？");
            if(Message){
                let data=this.$qs.stringify({
                    id:row.id,
                    is_delete:1
                }); 
                goodsprofitEd(data).then(res=>{
                    if(res.errno==0){
                        this.$alert("删除成功")
                        this.reload();
                    }else{
                        this.$alert("删除失败")
                    }
                });   
            }else{
                alert("用户取消操作");
            }
        }
    },
    created: function () {  
        goodsprofit().then(res=>{
          console.log(res.data);
          this.goodsProData=res.data.movereceipt_list;
        });
    }
}
</script>
<style scoped>
.goodsProfitList{
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
.main-table>>>.el-dialog__body {
  padding: 0 20px;
}
.el-dialog__body .el-form {
  text-align: right;
}
.el-row {
  border-top: 1px dashed #ccc;
}
</style>