<template>
    <div class="replenishmentProposal">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>调拨</el-breadcrumb-item>
                <el-breadcrumb-item>补货建议</el-breadcrumb-item>
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
                    <el-input placeholder="请输入货号" @input="search" v-model="keywords" style="width:50%;margin-right:10px" size="small">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                    <el-button type="primary" size="small" @click="dialogServeAdd = true">新增</el-button>
                    <el-button type="primary" size="small" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form>
            <!-- 新增弹出框 -->
            <el-dialog width="700px" title="新增" :visible.sync="dialogServeAdd">
                <el-form :model="formServeAdd"  style="text-align:center">
                    <!-- <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            补货量建议id<el-input v-model="formServeAdd.id" disabled></el-input>  
                        </el-col>
                        <el-col :span="7">
                            分店id<el-input v-model="formServeAdd.subshop_id" disabled></el-input>
                        </el-col>
                        <el-col :span="7">
                            站id<el-input v-model="formServeAdd.subsite_id" disabled></el-input>
                        </el-col>
                    </el-row>  -->
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                             分店名称<el-input v-model="formServeAdd.subshop_name"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            条码<el-input v-model="formServeAdd.serial_code"></el-input>
                        </el-col>
                        <el-col :span="7">
                            商品名称<el-input v-model="formServeAdd.goods_name"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            货号<el-input v-model="formServeAdd.product_sn"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            品牌id<el-input v-model="formServeAdd.brand_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            分类 <el-input v-model="formServeAdd.cat_id"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                             供应商id<el-input v-model="formServeAdd.supplier_id"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            供货商名称<el-input v-model="formServeAdd.supplier_name"></el-input>
                        </el-col>
                        <el-col :span="7">
                            送货周期<el-input v-model="formServeAdd.delivery_cycle"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            进货规格 <el-input v-model="formServeAdd.jinhuo_attr"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            单位<el-input v-model="formServeAdd.unit"></el-input>
                        </el-col>
                        <el-col :span="7">
                            规格<el-input v-model="formServeAdd.attr_value"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            成本价<el-input v-model="formServeAdd.chengben_price"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            总金额<el-input v-model="formServeAdd.total_money"></el-input>
                        </el-col>
                        <el-col :span="7">
                            本周销量<el-input v-model="formServeAdd.this_week_sale"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            上周销量<el-input v-model="formServeAdd.last_week_sale"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            第三周销量<el-input v-model="formServeAdd.third_week_sale"></el-input>
                        </el-col>
                        <el-col :span="7">
                            可销量<el-input v-model="formServeAdd.marketable_num"></el-input>  
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                             第四周销量<el-input v-model="formServeAdd.fourth_week_sale"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            本月销量<el-input v-model="formServeAdd.this_month_sale"></el-input>
                        </el-col>
                        <el-col :span="7">
                            上月销量<el-input v-model="formServeAdd.last_month_sale"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                             上上月销量<el-input v-model="formServeAdd.third_month_sale"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            最小安全库存<el-input v-model="formServeAdd.min_safe_kucun"></el-input>
                        </el-col>
                        <el-col :span="7">
                            最大安全库存<el-input v-model="formServeAdd.max_safe_kucun"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                             可销天数 <el-input v-model="formServeAdd.marketable_days"></el-input>  
                        </el-col>
                        <el-col :span="7">
                            采购在途量<el-input v-model="formServeAdd.purchase_on_way"></el-input>
                        </el-col>
                        <el-col :span="7">
                            调拨在途量<el-input v-model="formServeAdd.move_on_way"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            建议订货量<el-input v-model="formServeAdd.suggest_dh_num"></el-input>
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
                            补货量建议id<el-input v-model="formServeDetail.id" disabled></el-input>  
                        </el-col>
                        <el-col :span="7">
                            分店id<el-input v-model="formServeDetail.subshop_id" disabled></el-input>
                        </el-col>
                        <el-col :span="7">
                            站id<el-input v-model="formServeDetail.subsite_id" disabled></el-input>
                        </el-col>
                    </el-row>  -->
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                             分店名称<el-input v-model="formServeDetail.subshop_name"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            条码<el-input v-model="formServeDetail.serial_code"></el-input>
                        </el-col>
                        <el-col :span="7">
                            商品名称<el-input v-model="formServeDetail.goods_name"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            货号 <el-input v-model="formServeDetail.product_sn"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            品牌id<el-input v-model="formServeDetail.brand_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            分类 <el-input v-model="formServeDetail.cat_id"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                             供应商id<el-input v-model="formServeDetail.supplier_id"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            供货商名称<el-input v-model="formServeDetail.supplier_name"></el-input>
                        </el-col>
                        <el-col :span="7">
                            送货周期<el-input v-model="formServeDetail.delivery_cycle"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            进货规格 <el-input v-model="formServeDetail.jinhuo_attr"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            单位<el-input v-model="formServeDetail.unit"></el-input>
                        </el-col>
                        <el-col :span="7">
                            规格<el-input v-model="formServeDetail.attr_value"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            成本价<el-input v-model="formServeDetail.chengben_price"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            总金额<el-input v-model="formServeDetail.total_money"></el-input>
                        </el-col>
                        <el-col :span="7">
                            本周销量<el-input v-model="formServeDetail.this_week_sale"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            上周销量<el-input v-model="formServeDetail.last_week_sale"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            第三周销量<el-input v-model="formServeDetail.third_week_sale"></el-input>
                        </el-col>
                        <el-col :span="7">
                            可销量<el-input v-model="formServeDetail.marketable_num"></el-input>  
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                             第四周销量<el-input v-model="formServeDetail.fourth_week_sale"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            本月销量<el-input v-model="formServeDetail.this_month_sale"></el-input>
                        </el-col>
                        <el-col :span="7">
                            上月销量<el-input v-model="formServeDetail.last_month_sale"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                             上上月销量<el-input v-model="formServeDetail.third_month_sale"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            最小安全库存<el-input v-model="formServeDetail.min_safe_kucun"></el-input>
                        </el-col>
                        <el-col :span="7">
                            最大安全库存<el-input v-model="formServeDetail.max_safe_kucun"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                             可销天数 <el-input v-model="formServeDetail.marketable_days"></el-input>  
                        </el-col>
                        <el-col :span="7">
                            采购在途量<el-input v-model="formServeDetail.purchase_on_way"></el-input>
                        </el-col>
                        <el-col :span="7">
                            调拨在途量<el-input v-model="formServeDetail.move_on_way"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            建议订货量<el-input v-model="formServeDetail.suggest_dh_num"></el-input>
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
            :data="ProposalData"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            style="width:100%">
                <el-table-column
                prop="id"
                align="center"
                label="	补货量建议id">
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
                prop="product_sn"
                align="center"
                label="货号">
                </el-table-column>
                <el-table-column
                prop="cat_id"
                align="center"
                label="分类">
                </el-table-column>
                <el-table-column
                prop="supplier_name"
                align="center"
                label="供货商名称">
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
import {Proposal,ProposalDe,ProposalEd,ProposalAdd} from '../../api/apiW' ;
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
            formServeDetail:{},
            ProposalData:[],
        }
    },
    methods:{
        search() {
            let data=this.$qs.stringify({
                product_sn:this.keywords
            });
            Proposal(data).then(res=>{
                console.log(res.data);
                this.ProposalData=res.data.orders;
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
            ProposalDe(dataD).then(res=>{
                if(res.errno==0){
                    console.log(res.data);
                    this.formServeDetail=res.data;
                }else{
                    this.dialogServeDetail=false;
                    alert("您查找的用户不存在");
                }
            });
        },
        edit(){//--------------修改
            this.formServeDetail.chengben_price=this.formServeDetail.chengben_price.slice(1);
            this.formServeDetail.total_money=this.formServeDetail.total_money.slice(1);
            let dataE=this.$qs.stringify(this.formServeDetail);
            ProposalEd(dataE).then(res=>{
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
            ProposalAdd(dataA).then(res=>{
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
                ProposalEd(data).then(res=>{
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
        Proposal().then(res=>{
            console.log(res.data);
           this.ProposalData=res.data.orders;
        });    
    }
}
</script>
<style scoped>
.replenishmentProposal{
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