<template>
    <div class="tradingInquiry">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>零售</el-breadcrumb-item>
                <el-breadcrumb-item> 流水查询</el-breadcrumb-item>
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
                    <el-input placeholder="请输入分店id" @input="search" v-model="keywords" style="width:50%;margin-right:10px" size="small">
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
                            流水查账id<el-input v-model="formServeAdd.id" disabled></el-input>   
                        </el-col>
                        <el-col :span="7">
                            分站id<el-input v-model="formServeAdd.subsite_id" disabled></el-input>
                        </el-col>
                        <el-col :span="7">
                            分店id<el-input v-model="formServeAdd.subshop_id" disabled></el-input>
                        </el-col>
                    </el-row> -->
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            分店名称<el-input v-model="formServeAdd.subshop_name"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            机号<el-input v-model="formServeAdd.ji_sn"></el-input>
                        </el-col>
                        <el-col :span="7">
                            小票单号<el-input v-model="formServeAdd.ticket_sn"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            销售时间<el-input v-model="formServeAdd.xiaoshou_time"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            时间<el-input v-model="formServeAdd.add_time"></el-input>
                        </el-col>
                        <el-col :span="7">
                            收银员<el-input v-model="formServeAdd.shouyin_user"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            营业员id<el-input v-model="formServeAdd.yingye_user_id"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            营业员名称<el-input v-model="formServeAdd.yingye_user"></el-input>
                        </el-col>
                        <el-col :span="7">
                            货号<el-input v-model="formServeAdd.product_sn"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            条码<el-input v-model="formServeAdd.serial_cord"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            商品名<el-input v-model="formServeAdd.goods_name"></el-input>
                        </el-col>
                        <el-col :span="7">
                            辅助属性<el-input v-model="formServeAdd.attr_value"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            数量<el-input v-model="formServeAdd.number"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            原价<el-input v-model="formServeAdd.old_price"></el-input>
                        </el-col>
                        <el-col :span="7">
                            售价<el-input v-model="formServeAdd.shop_price"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            金额<el-input v-model="formServeAdd.price"></el-input>
                        </el-col>
                        <el-col :span="7">
                            总共优惠金额<el-input v-model="formServeAdd.sum_discount_price"></el-input>
                        </el-col>
                        <el-col :span="7">
                            折扣率<el-input v-model="formServeAdd.discount_rate"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            会员卡号<el-input v-model="formServeAdd.user_card"></el-input>
                        </el-col>
                        <el-col :span="7">
                            销售方式<el-input v-model="formServeAdd.method"></el-input>
                        </el-col>
                        <el-col :span="7">
                            品牌id<el-input v-model="formServeAdd.brand_id"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            品牌名字<el-input v-model="formServeAdd.brand_name"></el-input>
                        </el-col>
                        <el-col :span="7">
                            分类id<el-input v-model="formServeAdd.cat_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            分类名字<el-input v-model="formServeAdd.cat_name"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            供货商id<el-input v-model="formServeAdd.supplier_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            供货商名称<el-input v-model="formServeAdd.supplier_name"></el-input>
                        </el-col>
                        <el-col :span="7"></el-col>
                    </el-row>                     
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeAdd = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="add(),dialogServeAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 详情弹出框 -->
            <el-dialog width="700px" title="详情" :visible.sync="dialogServeDetail">
                <el-form :model="formServeDetail" style="text-align:center">
                    <!-- <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            流水查账id<el-input v-model="formServeDetail.id" disabled></el-input>   
                        </el-col>
                        <el-col :span="7">
                            分站id<el-input v-model="formServeDetail.subsite_id" disabled></el-input>
                        </el-col>
                        <el-col :span="7">
                            分店id<el-input v-model="formServeDetail.subshop_id" disabled></el-input>
                        </el-col>
                    </el-row> -->
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            分店名称<el-input v-model="formServeDetail.subshop_name"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            机号<el-input v-model="formServeDetail.ji_sn"></el-input>
                        </el-col>
                        <el-col :span="7">
                            小票单号<el-input v-model="formServeDetail.ticket_sn"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            销售时间<el-input v-model="formServeDetail.xiaoshou_time"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            时间<el-input v-model="formServeDetail.add_time"></el-input>
                        </el-col>
                        <el-col :span="7">
                            收银员<el-input v-model="formServeDetail.shouyin_user"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            营业员id<el-input v-model="formServeDetail.yingye_user_id"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            营业员名称<el-input v-model="formServeDetail.yingye_user"></el-input>
                        </el-col>
                        <el-col :span="7">
                            货号<el-input v-model="formServeDetail.product_sn"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            条码<el-input v-model="formServeDetail.serial_cord"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            商品名<el-input v-model="formServeDetail.goods_name"></el-input>
                        </el-col>
                        <el-col :span="7">
                            辅助属性<el-input v-model="formServeDetail.attr_value"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            数量<el-input v-model="formServeDetail.number"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            原价<el-input v-model="formServeDetail.old_price"></el-input>
                        </el-col>
                        <el-col :span="7">
                            售价<el-input v-model="formServeDetail.shop_price"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            金额<el-input v-model="formServeDetail.price"></el-input>
                        </el-col>
                        <el-col :span="7">
                            总共优惠金额<el-input v-model="formServeDetail.sum_discount_price"></el-input>
                        </el-col>
                        <el-col :span="7">
                            折扣率<el-input v-model="formServeDetail.discount_rate"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            会员卡号<el-input v-model="formServeDetail.user_card"></el-input>
                        </el-col>
                        <el-col :span="7">
                            销售方式<el-input v-model="formServeDetail.method"></el-input>
                        </el-col>
                        <el-col :span="7">
                            品牌id<el-input v-model="formServeDetail.brand_id"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            品牌名字<el-input v-model="formServeDetail.brand_name"></el-input>
                        </el-col>
                        <el-col :span="7">
                            分类id<el-input v-model="formServeDetail.cat_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            分类名字<el-input v-model="formServeDetail.cat_name"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            供货商id<el-input v-model="formServeDetail.supplier_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            供货商名称<el-input v-model="formServeDetail.supplier_name"></el-input>
                        </el-col>
                        <el-col :span="7"></el-col>
                    </el-row>                   
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeDetail = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="edit(),dialogServeDetail = false">保存修改</el-button>
                </div>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="tradingData"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            style="width: 100%">
                <el-table-column
                prop="id"
                align="center"
                label="流水查账id">
                </el-table-column>
                <el-table-column
                prop="ticket_sn"
                align="center"
                label="小票单号">
                </el-table-column>
                <el-table-column
                prop="xiaoshou_time"
                align="center"
                label="销售时间"
                width="180">
                </el-table-column>
                <el-table-column
                prop="add_time"
                align="center"
                label="时间">
                </el-table-column>
                <el-table-column
                prop="goods_name"
                align="center"
                label="商品名">
                </el-table-column>
                <el-table-column
                prop="attr_value"
                align="center"
                label="辅助属性"
                width="180">
                </el-table-column>
                <el-table-column
                prop="number"
                align="center"
                label="数量">
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
import {tradingInquiry,tradingInquiryDe,tradingInquiryEd,tradingInquiryAdd} from '../../api/apiW';
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
            tradingData:[],
        }
    },
    methods:{
        dateConverter(str) { //-----------------------日期转秒数
            var arr = str.split(/[-:\/]/);
            var startDate = Date.parse(new Date(arr[0], arr[1]-1, arr[2]))/1000;
            return startDate;
        }, 
        search() {
            let data=this.$qs.stringify({
                subshop_id:this.keywords
            });
            tradingInquiry(data).then(res=>{
                console.log(res.data)
                this.tradingData=res.data.inquiry_list;
            }); 
        },        
        reset() {
            this.reload();
        },
        handleCurrentChange(val) {
            console.log(val);          
        },
        showDetails(row){//-------详情
            console.log(row.id);
            let dataD=this.$qs.stringify({
                id:row.id
            }); 
            tradingInquiryDe(dataD).then(res=>{
                console.log(res.data[0]);
                this.formServeDetail=res.data[0];
            });
        },
        edit(){//-------修改
            this.formServeDetail.xiaoshou_time=this.dateConverter(this.formServeDetail.xiaoshou_time);
            this.formServeDetail.add_time=this.dateConverter(this.formServeDetail.add_time);
            this.formServeDetail.old_price=this.formServeDetail.old_price.slice(1);
            this.formServeDetail.shop_price=this.formServeDetail.shop_price.slice(1);
            this.formServeDetail.price=this.formServeDetail.price.slice(1);
            this.formServeDetail.sum_discount_price=this.formServeDetail.sum_discount_price.slice(1);
            let dataE=this.$qs.stringify(this.formServeDetail);
            tradingInquiryEd(dataE).then(res=>{
                if(res.errno==0){
                    this.$alert(res.errmsg)
                    this.reload();
                }else{
                    this.$alert(res.errmsg)
                }
            })
        },
        add(){//-------添加
            this.formServeAdd.xiaoshou_time=this.dateConverter(this.formServeAdd.xiaoshou_time);
            this.formServeAdd.add_time=this.dateConverter(this.formServeAdd.add_time);
            let dataA=this.$qs.stringify(this.formServeAdd);
            tradingInquiryAdd(dataA).then(res=>{
                if(res.errno==0){
                    this.$alert(res.errmsg)
                    this.reload();
                }else{
                    this.$alert(res.errmsg)
                }
            })
        },
        deleteRow(row) {
            let Message=confirm("确定删除此行数据？");
            if(Message){
                let data=this.$qs.stringify({
                    id:row.id,
                    is_delete:1
                }); 
                tradingInquiryEd(data).then(res=>{
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
        tradingInquiry().then(res=>{
            console.log(res.data)
            this.tradingData=res.data.inquiry_list;
        });  
    }
}
</script>
<style scoped>
.tradingInquiry{
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