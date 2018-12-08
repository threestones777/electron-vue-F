<template>
    <div class="allocatingMaori">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>调拨</el-breadcrumb-item>
                <el-breadcrumb-item>调拨毛利</el-breadcrumb-item>
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
            <!-- 新增弹出框 -->
            <el-dialog width="700px" title="新增" :visible.sync="dialogServeAdd">
                <el-form :model="formServeAdd"  style="text-align:center">
                    <el-row type="flex" justify="space-around"  style="text-align:center">
                        <el-col :span="7">
                            调拨毛利id<el-input v-model="formServeAdd.id"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            分站id<el-input v-model="formServeAdd.subsite_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            调出店号<el-input v-model="formServeAdd.from_subshop_id"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            调出店名称<el-input v-model="formServeAdd.from_subshop_name"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            收货店号<el-input v-model="formServeAdd.to_subshop_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            收货店名称<el-input v-model="formServeAdd.to_subshop_name"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            条码<el-input v-model="formServeAdd.serial_code"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            货号<el-input v-model="formServeAdd.product_sn"></el-input>
                        </el-col>
                        <el-col :span="7">
                            名称<el-input v-model="formServeAdd.goods_name"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            品牌编码<el-input v-model="formServeAdd.brand_id"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            品牌名称<el-input v-model="formServeAdd.brand_name"></el-input>
                        </el-col>
                        <el-col :span="7">
                            分类编码<el-input v-model="formServeAdd.cat_id"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            分类名称<el-input v-model="formServeAdd.cat_name"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            规格<el-input v-model="formServeAdd.attr_value"></el-input>
                        </el-col>
                        <el-col :span="7">
                            发货数量<el-input v-model="formServeAdd.fahuo_num"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            进货金额<el-input v-model="formServeAdd.jinhuo_money"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            发货售价金额<el-input v-model="formServeAdd.fh_shop_price"></el-input>
                        </el-col>
                        <el-col :span="7">
                            发货成本金额<el-input v-model="formServeAdd.fh_chengben_price"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            发货毛利额<el-input v-model="formServeAdd.fh_gross_profit"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            发货毛利率<el-input v-model="formServeAdd.fh_gross_interest_rate"></el-input>
                        </el-col>
                        <el-col :span="7">
                            收货数量<el-input v-model="formServeAdd.sh_num"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            收货售价金额<el-input v-model="formServeAdd.sh_shop_price"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            收货成本金额<el-input v-model="formServeAdd.sh_chengben_price"></el-input>
                        </el-col>
                        <el-col :span="7">
                            收货毛利额<el-input v-model="formServeAdd.sh_gross_profit"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            收货毛利率<el-input v-model="formServeAdd.sh_gross_interest_rate"></el-input>    
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
                    <!-- <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            调拨毛利id<el-input v-model="formServeDetail.id" disabled></el-input>   
                        </el-col>
                        <el-col :span="7">
                            分站id<el-input v-model="formServeDetail.subsite_id" disabled></el-input>
                        </el-col>
                        <el-col :span="7">
                            调出店号<el-input v-model="formServeDetail.from_subshop_id"></el-input>
                        </el-col>
                    </el-row>  -->
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            调出店名称<el-input v-model="formServeDetail.from_subshop_name"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            收货店号<el-input v-model="formServeDetail.to_subshop_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            收货店名称<el-input v-model="formServeDetail.to_subshop_name"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            条码<el-input v-model="formServeDetail.serial_code"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            货号<el-input v-model="formServeDetail.product_sn"></el-input>
                        </el-col>
                        <el-col :span="7">
                            名称<el-input v-model="formServeDetail.goods_name"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            品牌编码<el-input v-model="formServeDetail.brand_id"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            品牌名称<el-input v-model="formServeDetail.brand_name"></el-input>
                        </el-col>
                        <el-col :span="7">
                            分类编码<el-input v-model="formServeDetail.cat_id"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            分类名称<el-input v-model="formServeDetail.cat_name"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            规格<el-input v-model="formServeDetail.attr_value"></el-input>
                        </el-col>
                        <el-col :span="7">
                            发货数量<el-input v-model="formServeDetail.fahuo_num"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            进货金额<el-input v-model="formServeDetail.jinhuo_money"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            发货售价金额<el-input v-model="formServeDetail.fh_shop_price"></el-input>
                        </el-col>
                        <el-col :span="7">
                            发货成本金额<el-input v-model="formServeDetail.fh_chengben_price"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            发货毛利额<el-input v-model="formServeDetail.fh_gross_profit"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            发货毛利率<el-input v-model="formServeDetail.fh_gross_interest_rate"></el-input>
                        </el-col>
                        <el-col :span="7">
                            收货数量<el-input v-model="formServeDetail.sh_num"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            收货售价金额<el-input v-model="formServeDetail.sh_shop_price"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            收货成本金额<el-input v-model="formServeDetail.sh_chengben_price"></el-input>
                        </el-col>
                        <el-col :span="7">
                            收货毛利额<el-input v-model="formServeDetail.sh_gross_profit"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            收货毛利率<el-input v-model="formServeDetail.sh_gross_interest_rate"></el-input>    
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
            :data="MaoriData"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            style="width: 100%">
                <el-table-column
                prop="id"
                align="center"
                label="调拨毛利id">
                </el-table-column>
                <el-table-column
                prop="from_subshop_id"
                align="center"
                label="调出店号">
                </el-table-column>
                <el-table-column
                prop="from_subshop_name"
                align="center"
                label="调出店名称">
                </el-table-column>
                <el-table-column
                align="center"
                label="	商品名称">
                    <template slot-scope="scope">
                        <span :title="scope.row.goods_name">{{scope.row.goods_name.slice(0,7)+"..."}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="to_subshop_name"
                align="center"
                label="	收货店名称">
                </el-table-column>
                <el-table-column
                prop="serial_code"
                align="center"
                label="	条码">
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
import {Maori,MaoriDe,MaoriAdd,MaoriEd} from '../../api/apiW' ;
export default {
    inject: ['reload'],
    data() {
        return {
            pages:1,
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
                name:""
            },
            MaoriData:[],
        }
    },
    methods:{
        search() {
            let data=this.$qs.stringify({
                goods_name:this.keywords
            });
            Maori(data).then(res=>{
                console.log(res.data);
                this.MaoriData=res.data.orders;
            }); 
        },         
        reset() {
            this.reload();
        },
        handleCurrentChange(val) {
            console.log(val);          
        },
        showDetails(row){//--------------详情
            let dataD = this.$qs.stringify({
                id:row.id
            });
            MaoriDe(dataD).then(res=>{
                console.log(res.data);
                this.formServeDetail=res.data;
            }); 
        },
        edit(){//--------------修改
            this.formServeDetail.jinhuo_money=this.formServeDetail.jinhuo_money.slice(1);
            this.formServeDetail.fh_shop_price=this.formServeDetail.fh_shop_price.slice(1);
            this.formServeDetail.fh_chengben_price=this.formServeDetail.fh_chengben_price.slice(1);
            this.formServeDetail.fh_gross_profit=this.formServeDetail.fh_gross_profit.slice(1);
            this.formServeDetail.sh_shop_price=this.formServeDetail.sh_shop_price.slice(1);
            this.formServeDetail.sh_chengben_price=this.formServeDetail.sh_chengben_price.slice(1);
            this.formServeDetail.sh_gross_profit=this.formServeDetail.sh_gross_profit.slice(1);
            let dataE=this.$qs.stringify(this.formServeDetail);
            MaoriEd(dataE).then(res=>{
                console.log(res.errno);
                if(res.errno==0){
                    this.$alert(res.errmsg)
                    this.reload();
                }else{
                    this.$alert(res.errmsg)
                }
            })
        },
        add(){//--------------添加
            let dataA=this.$qs.stringify(this.formServeAdd);
            MaoriAdd(dataA).then(res=>{
                if(res.errno==0){
                    this.$alert(res.errmsg)
                    this.reload();
                }else{
                    this.$alert(res.errmsg)
                }
            })
        },
        deleteRow(row) {//--------------删除
            let Message=confirm("确定删除此行数据？");
            if(Message){
                let data=this.$qs.stringify({
                    id:row.id,
                    is_delete:1
                }); 
                MaoriEd(data).then(res=>{
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
        Maori().then(res=>{
            console.log(res.data);
            this.MaoriData=res.data.orders;
        });    
    }
}
</script>
<style scoped>
.allocatingMaori{
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