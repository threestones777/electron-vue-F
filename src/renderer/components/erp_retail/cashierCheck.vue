<template>
    <div class="cashierCheck">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>零售</el-breadcrumb-item>
                <el-breadcrumb-item>收银对账</el-breadcrumb-item>
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
            <!-- 新增弹出框formServeAdd -->
            <el-dialog width="700px" title="新增" :visible.sync="dialogServeAdd">
                <el-form :model="formServeAdd" style="text-align:center">
                    <!-- <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            收银对账id<el-input v-model="formServeAdd.id" disabled></el-input>   
                        </el-col>
                        <el-col :span="7">
                            分店id <el-input v-model="formServeAdd.subshop_id" disabled></el-input>
                        </el-col>
                        <el-col :span="7">
                            分站id<el-input v-model="formServeAdd.subsite_id" disabled></el-input>
                        </el-col>
                    </el-row>  -->
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            日期<el-input v-model="formServeAdd.add_time"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            分店名称<el-input v-model="formServeAdd.subshop_name"></el-input>
                        </el-col>
                        <el-col :span="7">
                            收银员<el-input v-model="formServeAdd.adminid"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            收款总额<el-input  v-model="formServeAdd.total_price"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            现金<el-input v-model="formServeAdd.cash"></el-input>
                        </el-col>
                        <el-col :span="7">
                            银行卡<el-input v-model="formServeAdd.bank_card"></el-input>
                        </el-col>
                    </el-row> <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            储值卡<el-input v-model="formServeAdd.value_card"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            储值卡充值金额<el-input v-model="formServeAdd.chongzhi_price"></el-input>
                        </el-col>
                        <el-col :span="7">
                            积分付款<el-input v-model="formServeAdd.integral"></el-input>
                        </el-col>
                    </el-row> <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            礼券<el-input v-model="formServeAdd.gift_card"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            支付方式<el-input v-model="formServeAdd.payment"></el-input>
                        </el-col>
                        <el-col :span="7">
                            微信<el-input v-model="formServeAdd.weixin"></el-input>
                        </el-col>
                    </el-row><el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            支付宝<el-input v-model="formServeAdd.zhifubao"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            抹零金额<el-input v-model="formServeAdd.moling_price"></el-input>
                        </el-col>
                        <el-col :span="7">
                            总金额<el-input v-model="formServeAdd.sum_price"></el-input>
                        </el-col>
                    </el-row> <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            总单数<el-input v-model="formServeAdd.sum_num"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            客单价<el-input v-model="formServeAdd.per_price"></el-input>
                        </el-col>
                        <el-col :span="7">
                            销售金额<el-input v-model="formServeAdd.xiaoshou_price"></el-input>
                        </el-col>
                    </el-row> <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            销售客单数<el-input v-model="formServeAdd.xiaoshou_per_num"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            销售客单金额<el-input v-model="formServeAdd.xiaoshou_per_price"></el-input>
                        </el-col>
                        <el-col :span="7">
                            退货金额<el-input v-model="formServeAdd.back_price"></el-input>
                        </el-col>
                    </el-row> <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            退货客单数<el-input v-model="formServeAdd.back_per_num"></el-input>  
                        </el-col>
                        <el-col :span="7">
                            退货客单价<el-input v-model="formServeAdd.back_per_price"></el-input>
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
            <el-dialog width="700px" title="收银对账详情" :visible.sync="dialogServeDetail">
                <el-form :model="formDetails" style="text-align:center">
                    <!-- <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            收银对账id<el-input v-model="formDetails.id" disabled></el-input>   
                        </el-col>
                        <el-col :span="7">
                            分店id <el-input v-model="formDetails.subshop_id" disabled></el-input>
                        </el-col>
                        <el-col :span="7">
                            分站id<el-input v-model="formDetails.subsite_id" disabled></el-input>
                        </el-col>
                    </el-row> --> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            日期<el-input v-model="formDetails.add_time"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            分店名称<el-input v-model="formDetails.subshop_name"></el-input>
                        </el-col>
                        <el-col :span="7">
                            收银员<el-input v-model="formDetails.adminid"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            收款总额<el-input  v-model="formDetails.total_price"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            现金<el-input v-model="formDetails.cash"></el-input>
                        </el-col>
                        <el-col :span="7">
                            银行卡<el-input v-model="formDetails.bank_card"></el-input>
                        </el-col>
                    </el-row> <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            储值卡<el-input v-model="formDetails.value_card"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            储值卡充值金额<el-input v-model="formDetails.chongzhi_price"></el-input>
                        </el-col>
                        <el-col :span="7">
                            积分付款<el-input v-model="formDetails.integral"></el-input>
                        </el-col>
                    </el-row> <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            礼券<el-input v-model="formDetails.gift_card"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            支付方式<el-input v-model="formDetails.payment"></el-input>
                        </el-col>
                        <el-col :span="7">
                            微信<el-input v-model="formDetails.weixin"></el-input>
                        </el-col>
                    </el-row><el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            支付宝<el-input v-model="formDetails.zhifubao"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            抹零金额<el-input v-model="formDetails.moling_price"></el-input>
                        </el-col>
                        <el-col :span="7">
                            总金额<el-input v-model="formDetails.sum_price"></el-input>
                        </el-col>
                    </el-row> <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            总单数<el-input v-model="formDetails.sum_num"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            客单价<el-input v-model="formDetails.per_price"></el-input>
                        </el-col>
                        <el-col :span="7">
                            销售金额<el-input v-model="formDetails.xiaoshou_price"></el-input>
                        </el-col>
                    </el-row> <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            销售客单数<el-input v-model="formDetails.xiaoshou_per_num"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            销售客单金额<el-input v-model="formDetails.xiaoshou_per_price"></el-input>
                        </el-col>
                        <el-col :span="7">
                            退货金额<el-input v-model="formDetails.back_price"></el-input>
                        </el-col>
                    </el-row> <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            退货客单数<el-input v-model="formDetails.back_per_num"></el-input>  
                        </el-col>
                        <el-col :span="7">
                            退货客单价<el-input v-model="formDetails.back_per_price"></el-input>
                        </el-col>
                        <el-col :span="7"></el-col>
                    </el-row>               
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeDetail = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="savEdit(),dialogServeDetail = false">保 存 修 改</el-button>
                </div>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="cashierCheckData"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            style="width: 100%">
                <el-table-column
                prop="id"
                align="center"
                label="收银对账id">
                </el-table-column>
                <el-table-column
                prop="add_time"
                align="center"
                label="日期">
                </el-table-column>
                <el-table-column
                prop="subshop_id"
                align="center"
                label="分店id">
                </el-table-column>
                <el-table-column
                prop="subshop_name"
                align="center"
                label="分店名称">
                </el-table-column>
                <el-table-column
                prop="adminid"
                align="center"
                label="收银员">
                </el-table-column>
                <el-table-column
                prop="total_price"
                align="center"
                label="收款总额">
                </el-table-column>
                <el-table-column
                prop="cash"
                align="center"
                label="现金">
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
import {cashierCheck,cashierCheckDe,cashierCheckAdd,cashierCheckEd} from '../../api/apiW';
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
            formDetails:{},
            cashierCheckData:[],
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
            cashierCheck(data).then(res=>{
                console.log(res.data);
                this.cashierCheckData=res.data.cashiercheck_list;
            })
        },         
        reset() {
            this.reload();
        },
        handleCurrentChange(val) {
            console.log(val);          
        },
        showDetails(row){//--------------------------详情
            console.log(row.id);
            let data=this.$qs.stringify({
                id:row.id,
            }); 
            cashierCheckDe(data).then(res=>{
                console.log(res.data);
                this.formDetails=res.data[0];
                this.formDetails.add_time=new Date(this.formDetails.add_time*1000).toLocaleDateString();
            });
        },
        savEdit(){//--------------------------修改
        this.formDetails.total_price=this.formDetails.total_price.slice(1);
        this.formDetails.cash=this.formDetails.cash.slice(1);
        this.formDetails.chongzhi_price=this.formDetails.chongzhi_price.slice(1);
        this.formDetails.integral=this.formDetails.integral.slice(1);
        this.formDetails.moling_price=this.formDetails.moling_price.slice(1);
        this.formDetails.sum_price=this.formDetails.sum_price.slice(1);
        this.formDetails.per_price=this.formDetails.per_price.slice(1);
        this.formDetails.xiaoshou_price=this.formDetails.xiaoshou_price.slice(1);
        this.formDetails.xiaoshou_per_price=this.formDetails.xiaoshou_per_price.slice(1);
        this.formDetails.back_price=this.formDetails.back_price.slice(1);
        this.formDetails.back_per_price=this.formDetails.back_per_price.slice(1);
        this.formDetails.add_time=this.dateConverter(this.formDetails.add_time);
            let dataE=this.$qs.stringify(this.formDetails);
            cashierCheckEd(dataE).then(res=>{
                if(res.errno==0){
                    this.$alert(res.errmsg)
                    this.reload();
                }else{
                    this.$alert(res.errmsg)
                }
            })
        },
        add(){  
            this.formServeAdd.add_time=this.dateConverter(this.formServeAdd.add_time);       
            let dataA=this.$qs.stringify(this.formServeAdd);
            cashierCheckAdd(dataA).then(res=>{
                console.log(res.errno);
                this.reload();
            })
        },
        deleteRow(row) {
            let Message=confirm("确定删除此行数据？");
            if(Message){
                let data=this.$qs.stringify({
                    id:row.id,
                    is_delete:1
                }); 
                cashierCheckEd(data).then(res=>{
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
        cashierCheck().then(res=>{
            console.log(res.data);
            this.cashierCheckData=res.data.cashiercheck_list;
        })    
    }
}
</script>
<style scoped>
.cashierCheck{
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