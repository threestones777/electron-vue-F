<template>
    <div class="purchaseReceive">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>购货</el-breadcrumb-item>
                <el-breadcrumb-item>采购收货</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <!-- 搜索 -->
            <el-form :inline="true" :model="formServe" class="demo-form-inline">
                <!-- <el-form-item label="">
                    <el-input size="small" v-model="formServe.name" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input size="small" type="tel" v-model="formServe.marks" placeholder="编号"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input size="small" type="tel" v-model="formServe.marks" placeholder="备注信息"></el-input>
                </el-form-item>-->
                <el-form-item> 
                    <el-input placeholder="请输入店铺id" @input="search" v-model="keywords" style="width:50%;margin-right:10px" size="small">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                    <el-button type="primary" size="small" @click="dialogServeAdd = true">新增</el-button>
                    <el-button type="primary" size="small" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form>
            <!-- 新增弹出框 -->
            <el-dialog width="700px" title="新增" :visible.sync="dialogServeAdd">
                <el-form :model="formServeAdd" style="text-align:center">
                    <!-- <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            采购收货id<el-input v-model="formServeAdd.id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            店铺id<el-input v-model="formServeAdd.subshop_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            分站id<el-input v-model="formServeAdd.subsite_id"></el-input>
                        </el-col>
                    </el-row> -->
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7" style="padding-top:25px;">
                            <el-checkbox v-model="formServeAdd.is_primot" true-label="0" false-label="1">促销</el-checkbox>
                        </el-col>
                        <el-col :span="7">
                            主条码<el-input v-model="formServeAdd.main_tm"></el-input>
                        </el-col>
                        <el-col :span="7">
                            标配<el-input v-model="formServeAdd.standard"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            ABC<el-input v-model="formServeAdd.ABC"></el-input>
                        </el-col>
                        <el-col :span="7">
                            货号<el-input v-model="formServeAdd.product_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            名称<el-input v-model="formServeAdd.goods_name"></el-input>
                        </el-col>
                    </el-row>                
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            规格<el-input v-model="formServeAdd.attr_value"></el-input>
                        </el-col>
                        <el-col :span="7">
                            售价<el-input v-model="formServeAdd.shop_price"></el-input>
                        </el-col>
                        <el-col :span="7">
                            进货折扣<el-input v-model="formServeAdd.discount"></el-input>
                        </el-col>
                    </el-row>                
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            收货进价<el-input v-model="formServeAdd.sh_jinjia"></el-input>
                        </el-col>
                        <el-col :span="7">
                            箱数<el-input v-model="formServeAdd.sh_box_number"></el-input>
                        </el-col>
                        <el-col :span="7">
                            数量<el-input v-model="formServeAdd.sh_goods_number"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            赠送数量<el-input v-model="formServeAdd.sh_give_number"></el-input>
                        </el-col>
                        <el-col :span="7">
                            收货金额<el-input v-model="formServeAdd.sh_money"></el-input>
                         </el-col>
                        <el-col :span="7">
                            收货赠送金额<el-input v-model="formServeAdd.sh_give_money"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            收货售价金额<el-input v-model="formServeAdd.sh_shoujia"></el-input>
                        </el-col>
                        <el-col :span="7">
                            订货箱数<el-input v-model="formServeAdd.dh_box_number"></el-input>
                        </el-col>
                        <el-col :span="7">
                            订货数量<el-input v-model="formServeAdd.dh_goods_number"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            订货赠送数量<el-input v-model="formServeAdd.dh_give_number"></el-input>
                        </el-col>
                        <el-col :span="7">
                            订货赠送金额<el-input v-model="formServeAdd.dh_give_money"></el-input>
                        </el-col>
                        <el-col :span="7">
                            订货金额<el-input v-model="formServeAdd.dh_money"></el-input>
                        </el-col>
                    </el-row>                 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            箱装数<el-input v-model="formServeAdd.box_in_number"></el-input>
                        </el-col>
                        <el-col :span="7">
                            毛利额<el-input v-model="formServeAdd.gross_profit"></el-input>
                        </el-col>
                        <el-col :span="7">
                            毛利率<el-input v-model="formServeAdd.gross_interest_rate"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            批发价<el-input v-model="formServeAdd.wholesale_price"></el-input>
                        </el-col>
                        <el-col :span="7">
                            单位<el-input v-model="formServeAdd.supplier_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            生产日期<el-input v-model="formServeAdd.production_date"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            失效日期<el-input v-model="formServeAdd.expiry_date"></el-input>
                        </el-col>
                        <el-col :span="7">
                            扩展字段<el-input v-model="formServeAdd.ml_data"></el-input>
                        </el-col>
                        <el-col :span="7"></el-col>
                    </el-row>                  
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="small" @click="dialogServeAdd = false">取 消</el-button>
                    <el-button size="small" type="primary" @click="add(),dialogServeAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 详情弹出框 -->
            <el-dialog width="700px" title="采购收货详情" :visible.sync="dialogServeDetail">
                <el-form :model="formDetail" style="text-align:center">
                    <!-- <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            采购收货id<el-input v-model="formDetail.id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            店铺id<el-input v-model="formDetail.subshop_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            分站id<el-input v-model="formDetail.subsite_id"></el-input>
                        </el-col>
                    </el-row> -->
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7" style="padding-top:25px;">
                            <el-checkbox v-model="formDetail.is_primot" true-label="0" false-label="1">促销</el-checkbox>
                        </el-col>
                        <el-col :span="7">
                            主条码<el-input v-model="formDetail.main_tm"></el-input>
                        </el-col>
                        <el-col :span="7">
                            标配<el-input v-model="formDetail.standard"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            ABC<el-input v-model="formDetail.ABC"></el-input>
                        </el-col>
                        <el-col :span="7">
                            货号<el-input v-model="formDetail.product_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            名称<el-input v-model="formDetail.goods_name"></el-input>
                        </el-col>
                    </el-row>                
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            规格<el-input v-model="formDetail.attr_value"></el-input>
                        </el-col>
                        <el-col :span="7">
                            售价<el-input v-model="formDetail.shop_price"></el-input>
                        </el-col>
                        <el-col :span="7">
                            进货折扣<el-input v-model="formDetail.discount"></el-input>
                        </el-col>
                    </el-row>                
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            收货进价<el-input v-model="formDetail.sh_jinjia"></el-input>
                        </el-col>
                        <el-col :span="7">
                            箱数<el-input v-model="formDetail.sh_box_number"></el-input>
                        </el-col>
                        <el-col :span="7">
                            数量<el-input v-model="formDetail.sh_goods_number"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            赠送数量<el-input v-model="formDetail.sh_give_number"></el-input>
                        </el-col>
                        <el-col :span="7">
                            收货金额<el-input v-model="formDetail.sh_money"></el-input>
                         </el-col>
                        <el-col :span="7">
                            收货赠送金额<el-input v-model="formDetail.sh_give_money"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            收货售价金额<el-input v-model="formDetail.sh_shoujia"></el-input>
                        </el-col>
                        <el-col :span="7">
                            订货箱数<el-input v-model="formDetail.dh_box_number"></el-input>
                        </el-col>
                        <el-col :span="7">
                            订货数量<el-input v-model="formDetail.dh_goods_number"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            订货赠送数量<el-input v-model="formDetail.dh_give_number"></el-input>
                        </el-col>
                        <el-col :span="7">
                            订货赠送金额<el-input v-model="formDetail.dh_give_money"></el-input>
                        </el-col>
                        <el-col :span="7">
                            订货金额<el-input v-model="formDetail.dh_money"></el-input>
                        </el-col>
                    </el-row>                 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            箱装数<el-input v-model="formDetail.box_in_number"></el-input>
                        </el-col>
                        <el-col :span="7">
                            毛利额<el-input v-model="formDetail.gross_profit"></el-input>
                        </el-col>
                        <el-col :span="7">
                            毛利率<el-input v-model="formDetail.gross_interest_rate"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            批发价<el-input v-model="formDetail.wholesale_price"></el-input>
                        </el-col>
                        <el-col :span="7">
                            单位<el-input v-model="formDetail.supplier_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            生产日期<el-input v-model="formDetail.production_date"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            失效日期<el-input v-model="formDetail.expiry_date"></el-input>
                        </el-col>
                        <el-col :span="7">
                            扩展字段<el-input v-model="formDetail.ml_data"></el-input>
                        </el-col>
                        <el-col :span="7"></el-col>
                    </el-row>                  
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="small" @click="dialogServeDetail = false">取 消</el-button> 
                    <el-button size="small" type="primary" @click="edit(),dialogServeDetail = false">保存修改</el-button>
                </div>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="purchaseReData"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:7}"
            style="width: 100%">
                <el-table-column
                prop="id"
                align="center"
                label="采购收货id">
                </el-table-column>
                <el-table-column
                prop="is_primot"
                align="center"
                label="促销">
                    <template slot-scope="scope">
                        <span>{{scope.row.is_primot==0?"是":"否"}}</span>                        
                    </template>
                </el-table-column>
                <el-table-column
                prop="main_tm"
                align="center"
                label="主条码">
                </el-table-column>
                <el-table-column
                prop="standard"
                align="center"
                label="标配">
                </el-table-column>
                <el-table-column
                prop="subshop_id"
                align="center"
                label="店铺id">
                </el-table-column>
                <el-table-column
                align="center"
                label="名称">
                    <template slot-scope="scope">
                        <span :title="scope.row.goods_name">{{scope.row.goods_name.slice(0,7)+"..."}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="attr_value"
                align="center"
                label="规格">
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
import {purchaseReceive,purchaseReDe,purchaseReAdd,purchaseReEd} from '../../api/apiW' ;
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
            formServeAdd:{},
            formDetail:{},
            purchaseReData:[],
        }
    },
    methods:{
        dateConverter(str) { //-----------------------日期转秒数
            var arr = str.split(/[- : \/]/);
            var startDate = Date.parse(new Date(arr[0], arr[1]-1, arr[2]))/1000;
            return startDate;
        }, 
        reset() {
            this.reload();
        },
        search() {
            let data=this.$qs.stringify({
                page:1,
                page_size:10,
                subshop_id:this.keywords
            });
            purchaseReceive(data).then(res=>{
                this.pages=Math.ceil(res.data.filter.record_count/10);
                console.log(res.data);
                this.purchaseReData=res.data.orders;
            })
        }, 
        handleCurrentChange(val) {
            console.log(val);  
            let dataC= this.$qs.stringify({
                subsite_id:3,
                subshop_id:0,
                page:val,
                page_size:10,
            }); 
            purchaseReceive(dataC).then(res=>{
                console.log(res.data);
                this.purchaseReData=res.data.orders;
            })          
        },
        Add(){//添加
            let data =this.$qs.stringify(this.formServeAdd)
            purchaseReAdd(data).then(res=>{
                console.log(res.errno);
                this.reload();
            })
        },
        showDetails(row){//------------------详情
            console.log(row.id);
            let data=this.$qs.stringify({
                subsite_id:3,
                subshop_id:0,
                id:row.id
            });
            purchaseReDe(data).then(res=>{
                console.log(res.data);
                this.formDetail=res.data;
            })
        },
        edit(){//----------------修改
            this.formDetail.shop_price=this.formDetail.shop_price.slice(1);
            this.formDetail.sh_jinjia=this.formDetail.sh_jinjia.slice(1);
            this.formDetail.sh_money=this.formDetail.sh_money.slice(1);
            this.formDetail.sh_give_money=this.formDetail.sh_give_money.slice(1);
            this.formDetail.sh_shoujia=this.formDetail.sh_shoujia.slice(1);
            this.formDetail.dh_give_money=this.formDetail.dh_give_money.slice(1);
            this.formDetail.dh_money=this.formDetail.dh_money.slice(1);
            this.formDetail.gross_profit=this.formDetail.gross_profit.slice(1);
            this.formDetail.wholesale_price=this.formDetail.wholesale_price.slice(1);
            this.formDetail.production_date=this.dateConverter(this.formDetail.production_date);
            this.formDetail.expiry_date=this.dateConverter(this.formDetail.expiry_date);
            let dataE=this.$qs.stringify(this.formDetail)
            purchaseReEd(dataE).then(res=>{
                if(res.errno==0){
                    this.$alert(res.errmsg)
                    this.reload();
                }else{
                    this.$alert(res.errmsg)
                }
            })
        },
        add(){
            this.formServeAdd.production_date=this.dateConverter(this.formServeAdd.production_date);
            this.formServeAdd.expiry_date=this.dateConverter(this.formServeAdd.expiry_date);
            let data =this.$qs.stringify(this.formServeAdd)
            purchaseReAdd(data).then(res=>{
                console.log(res.errno);
                if(res.errno==0){
                    this.$alert(res.errmsg)
                    this.reload();
                }else{
                    this.$alert(res.errmsg)
                }
            })
        },
        deleteRow(row) {//---------------删除
            let Message=confirm("确定删除此行数据？");
            if(Message){
                console.log(row.id);
                let data=this.$qs.stringify({
                    id:row.id,
                    is_delete:1
                }); 
                purchaseReEd(data).then(res=>{
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
        let dataP=this.$qs.stringify({
            subsite_id:3,
            subshop_id:0,
            page:1,
            page_size:10,
        });
        purchaseReceive(dataP).then(res=>{
            this.pages=Math.ceil(res.data.filter.record_count/10);
            console.log(res.data);
            this.purchaseReData=res.data.orders;
        })
    }
}
</script>
<style scoped>
.purchaseReceive{
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