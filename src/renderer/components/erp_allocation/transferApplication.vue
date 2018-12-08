<template>
    <div class="transferApplication">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>调拨</el-breadcrumb-item>
                <el-breadcrumb-item>调货申请</el-breadcrumb-item>
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
                    <el-input placeholder="请输入单据编号" @input="search" v-model="keywords" style="width:50%;margin-right:10px" size="small">
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
                            id<el-input v-model="formServeAdd.id" disabled></el-input>    
                        </el-col>
                        <el-col :span="7">
                            分站id<el-input v-model="formServeAdd.subsite_id" disabled></el-input>
                        </el-col>
                        <el-col :span="7">
                            状态<el-input v-model="formServeAdd.status"></el-input>
                        </el-col>
                    </el-row>  -->
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            发货店号<el-input v-model="formServeAdd.from_subshop_id"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            发货店名<el-input v-model="formServeAdd.from_subshop_name"></el-input>
                        </el-col>
                        <el-col :span="7">
                            收货店号<el-input v-model="formServeAdd.to_subshop_id"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            收货店名<el-input v-model="formServeAdd.to_subshop_name"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            单据编号<el-input v-model="formServeAdd.bill_sn"></el-input>
                        </el-col>
                        <el-col :span="7">
                            单据类型<el-input v-model="formServeAdd.type"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            要求到货日期 <el-input v-model="formServeAdd.require_arrival_time"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            金额 <el-input v-model="formServeAdd.money"></el-input>
                        </el-col>
                        <el-col :span="7">
                            申请人<el-input v-model="formServeAdd.apply_user"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            申请日期<el-input v-model="formServeAdd.apply_time"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            发货人<el-input v-model="formServeAdd.fahuo_user"></el-input>
                        </el-col>
                        <el-col :span="7">
                            发货时间<el-input v-model="formServeAdd.fahuo_time"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            收货人 <el-input v-model="formServeAdd.shouhuo_user"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            收货时间<el-input v-model="formServeAdd.shouhuo_time"></el-input>
                        </el-col>
                        <el-col :span="7">
                            备注<el-input v-model="formServeAdd.remark"></el-input>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeAdd = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="add(),dialogServeAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 详情弹出框 -->
            <el-dialog width="800px" title="调货申请详情" :visible.sync="dialogServeDetail">
                <el-form :model="formServeDetail" style="text-align:center"> 
                    <!-- <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            id<el-input v-model="formServeDetail.id" disabled></el-input>    
                        </el-col>
                        <el-col :span="7">
                            分站id<el-input v-model="formServeDetail.subsite_id" disabled></el-input>
                        </el-col>
                        <el-col :span="7">
                            状态<el-input v-model="formServeDetail.status"></el-input>
                        </el-col>
                    </el-row>  -->
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            发货店号<el-input v-model="formServeDetail.from_subshop_id"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            发货店名<el-input v-model="formServeDetail.from_subshop_name"></el-input>
                        </el-col>
                        <el-col :span="7">
                            收货店号<el-input v-model="formServeDetail.to_subshop_id"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            收货店名<el-input v-model="formServeDetail.to_subshop_name"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            单据编号<el-input v-model="formServeDetail.bill_sn"></el-input>
                        </el-col>
                        <el-col :span="7">
                            单据类型<el-input v-model="formServeDetail.type"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            要求到货日期 <el-input v-model="formServeDetail.require_arrival_time"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            金额 <el-input v-model="formServeDetail.money"></el-input>
                        </el-col>
                        <el-col :span="7">
                            申请人<el-input v-model="formServeDetail.apply_user"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            申请日期<el-input v-model="formServeDetail.apply_time"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            发货人<el-input v-model="formServeDetail.fahuo_user"></el-input>
                        </el-col>
                        <el-col :span="7">
                            发货时间<el-input v-model="formServeDetail.fahuo_time"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            收货人 <el-input v-model="formServeDetail.shouhuo_user"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            收货时间<el-input v-model="formServeDetail.shouhuo_time"></el-input>
                        </el-col>
                        <el-col :span="7">
                            备注<el-input v-model="formServeDetail.remark"></el-input>
                        </el-col>
                    </el-row>
                </el-form><br>
                <div class="dialog-footer" style="position:relative;left:300px">
                    <el-button 	size="small" @click="dialogServeDetail = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="edit(),dialogServeDetail = false">保存修改</el-button>
                </div>
                <br><hr style="border:1px dashed #DCDFE6"><br>
                <h1 style="text-align:center">单据商品</h1>
                <el-button size="small" type="primary" class="addGoods" @click="getGoods(),dialogAddGoods=true">添加商品</el-button>
                <el-table
                :data="goodsData"
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
                        label="商品id">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="商品名">
                        <template slot-scope="scope">
                            <span :title="scope.row.goods_name">{{scope.row.goods_name.slice(0,7)+"..."}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="申请数量">
                        <template slot-scope="scope">
                            <el-input size="mini" style="width:100%" v-model="scope.row.apply_num"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="申请金额">
                        <template slot-scope="scope">
                            <el-input size="mini" style="width:100%" v-model="scope.row.apply_money"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="申请售价金额">
                        <template slot-scope="scope">
                            <el-input size="mini" style="width:100%" v-model="scope.row.apply_shop_price" disabled></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    align="center"
                    label="相关操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="editGoods(scope.row)" icon="el-icon-edit"></el-button>
                            <el-button type="text" size="small" @click="deleteGoods(scope.row)" icon="el-icon-delete"></el-button>
                        </template>
                    </el-table-column>       
                </el-table><br><br>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="transferAppData"
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
                prop="status"
                align="center"
                label="状态">
                </el-table-column>
                <el-table-column
                prop="from_subshop_id"
                align="center"
                label="发货店号"
                width="180">
                </el-table-column>
                <el-table-column
                prop="bill_sn"
                align="center"
                label="单据编号">
                </el-table-column>
                <el-table-column
                prop="require_arrival_time"
                align="center"
                label="要求到货日期">
                </el-table-column>
                <el-table-column
                prop="money"
                align="center"
                label="金额">
                </el-table-column>
                <el-table-column
                prop="fahuo_time"
                align="center"
                label="发货时间">
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showDetails(scope.row),dialogServeDetail = true">详情</el-button>
                        <el-button type="text" size="small" @click="getId(scope.row),dialogCheck = true">审核</el-button>
                        <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
    <!------------------------------------------------------- 审核弹窗 ------------------------------------------------>
            <el-dialog width="30%" title="订单审核" :visible.sync="dialogCheck">
                <el-radio-group v-model="status">
                    <el-radio :label="0">未审核</el-radio>
                    <el-radio :label="1">已审核</el-radio>
                    <el-radio :label="2">审核驳回</el-radio>
                </el-radio-group>              
                <div slot="footer" class="dialog-footer">
                    <el-button size="small" @click="dialogCheck = false">取 消</el-button>
                    <el-button size="small" type="primary" @click="checkSta(),dialogCheck = false">保存审核</el-button>
                </div>
            </el-dialog>
            <!----------------------------- 添加商品弹窗 -------------------------------------->
            <el-dialog
            title="商品列表"
            :visible.sync="dialogAddGoods"
            width="700px">
            <el-table
                :data="goodsListData"
                border
                :row-style="{height:0}"  
                :cell-style="{padding:0}"
                :header-row-style="{height:0}"  
                :header-cell-style="{padding:0}"
                style="width: 100%">
                    <el-table-column
                        prop="goods_id"
                        align="center"
                        label="商品id">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="商品名">
                        <template slot-scope="scope">
                            <span :title="scope.row.goods_name">{{scope.row.goods_name.slice(0,7)+"..."}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="number"
                        align="center"
                        label="数量">
                    </el-table-column>
                    <el-table-column
                        prop="attr_value"
                        align="center"
                        label="属性">
                    </el-table-column>
                    <el-table-column
                        prop="note"
                        align="center"
                        label="备注">
                    </el-table-column> 
                     <el-table-column
                    fixed="right"
                    align="center"
                    label="相关操作">
                        <template slot-scope="scope">
                            <el-button size="medium" type="text" @click="addGoods(scope.row),dialogAddGoods = false" icon="el-icon-circle-plus-outline">添加</el-button>
                        </template>
                    </el-table-column>    
                </el-table>
            <el-pagination
                @current-change="handleCurrentChangeG"
                layout="prev, pager, next,jumper"
                :page-count="pagesG">
            </el-pagination>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogAddGoods = false">取 消</el-button>
                <el-button size="small" type="primary" @click="dialogAddGoods = false">确定</el-button>
            </span>
            </el-dialog>
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
import {getGoodsList} from '../../api/api';
import {transfer,transferDe,transferEd,transferAdd,transferGoods,transferAddG,transferEdG,transferRmv,transferChe} from '../../api/apiW' ;
export default {
    inject: ['reload'], 
    data() {
        return {
            pages:1,
            pagesG:1,
            bill_sn:0,
            id:0,
            status:"未审核",
            dialogServeAdd:false,
            dialogServeDetail:false,
            dialogAddGoods:false,
            dialogCheck:false,
            keywords:'',
            formServe:{
                name:"",
                marks:""
            },
            formServeAdd:{
                name:""
            },
            formServeDetail:{},
            goodsData:[],
            goodsListData:[],
            transferAppData:[],
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
                bill_sn:this.keywords
            });
            transfer(data).then(res=>{
                console.log(res.data);
                this.transferAppData=res.data.transfer_list;
            }) 
        },        
        reset() {
            this.reload();
        },
        handleCurrentChange(val) {
            console.log(val);          
        },
        handleCurrentChangeG(val) {
            console.log(val);
            getGoodsList({params:{page:val,page_size:10}}).then(res=>{
                console.log(res.data.goods);
                this.goodsListData=res.data.goods;
                this.pagesG=Math.ceil(res.data.filter.record_count/10);
            })
        },
        selectionChange(val) {
            this.multipleSelection = val;
            console.log(this.multipleSelection);
            this.arr=[];
            for(let i=0;i<this.multipleSelection.length;i++){
                this.arr.push(this.multipleSelection[i].goods_id);
            };
                console.log(this.arr);
        },
        getGoods(){//--------------------------------获取商品列表
            getGoodsList({params:{page:1,page_size:10}}).then(res=>{
                console.log(res.data.goods);
                this.goodsListData=res.data.goods;
                this.pagesG=Math.ceil(res.data.filter.record_count/10);
            })
        },
        goodsList(){
            let dataG = this.$qs.stringify({
                    bill_sn:this.bill_sn
                });
                transferGoods(dataG).then(res=>{
                    console.log(res.data);
                    this.goodsData=res.data;
                });
        },
        getId(row){//-----------------------保存id
            this.id=row.id;
            this.status=(row.status=="未审核"?0:(row.status=="已审核"?1:(row.status=="审核驳回"?2:0)));
            console.log(this.status);
        },
        checkSta(){//------------------审核
            let dataC=this.$qs.stringify({
                id:this.id,
                status:this.status
            });
            transferChe(dataC).then(res=>{
                console.log(res);
                this.reload();
            });
        },
        addGoods(row){//---------------------------------添加商品
            let dataA=this.$qs.stringify({
                bill_sn:this.bill_sn,
                goods_id:row.goods_id
            });
            transferAddG(dataA).then(res=>{
                console.log(res);
                if(res.errno==0){
                    this.$alert(res.data.message,{
                        callback:action=>{
                            this.goodsList();
                               
                        }
                    })
                }else{
                    this.$alert(res.errmsg)
                }
            });
        },
        editGoods(row){//---------------------------修改商品
            row.bill_sn=this.bill_sn;
            console.log(row);
            let data=this.$qs.stringify(row);
            transferEdG(data).then(res=>{
                console.log(res);
                if(res.errno==0){
                    this.$alert(res.data.message,{
                        callback:action=>{
                            this.goodsList();    
                        }
                    })
                }else{
                    this.$alert(res.errmsg)
                }
            });
        },
        showDetails(row){//-------------------------详情
            console.log(row.id);
            this.bill_sn=row.bill_sn;
            let dataD = this.$qs.stringify({
                id:row.id
            });
            transferDe(dataD).then(res=>{
                console.log(res.data);
                this.formServeDetail=res.data;
            });
            this.goodsList();
        },
        edit(){//--------------修改
            this.formServeDetail.require_arrival_time=this.dateConverter(this.formServeDetail.require_arrival_time);
            this.formServeDetail.apply_time=this.dateConverter(this.formServeDetail.apply_time);
            this.formServeDetail.fahuo_time=this.dateConverter(this.formServeDetail.fahuo_time);
            this.formServeDetail.shouhuo_time=this.dateConverter(this.formServeDetail.shouhuo_time);
            let dataE=this.$qs.stringify(this.formServeDetail);
            transferEd(dataE).then(res=>{
                console.log(res.errno);
                if(res.errno==0){
                    this.$alert(res.errmsg,{
                        callback:action=>{
                            this.reload();
                        }
                    })
                }else{
                    this.$alert(res.errmsg)
                }
            })
        },
        add(){//--------------添加
            let dataA=this.$qs.stringify(this.formServeAdd);
            transferAdd(dataA).then(res=>{
                if(res.errno==0){
                    this.$alert(res.errmsg,{
                        callback:action=>{
                            this.reload();
                        }
                    })
                }else{
                    this.$alert(res.errmsg)
                }
            })
        },
        deleteGoods(row){//---------------------------删除商品
            let Message=confirm("确定删除此行商品？");
            if(Message){
                let dataD=this.$qs.stringify({
                    bill_sn:this.bill_sn,
                    goods_id:row.goods_id
                });
                transferRmv(dataD).then(res=>{
                    console.log(res);
                    if(res.errno==0){
                        this.$alert(res.data.msg,{
                            callback:action=>{
                                this.goodsList();
                            }
                        })
                    }else{
                        this.$alert(res.errmsg)
                    }
                });         
            }else{
                alert("用户取消操作");
            }
        },
        deleteRow(row) {//--------------删除
            let Message=confirm("确定删除此行数据？");
            if(Message){
                let data=this.$qs.stringify({
                    id:row.id,
                    is_delete:1
                }); 
                transferEd(data).then(res=>{
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
        transfer().then(res=>{
            console.log(res.data);
            this.transferAppData=res.data.transfer_list;
        })   
    }
}
</script>
<style scoped>
.transferApplication{
    text-align:center;
    margin: 20px;
}
.transferApplication .addGoods{
        float:right;
        position:relative;
        bottom:15px;
}
/* 头部面包屑 */
.main-header {
    text-align: left;
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