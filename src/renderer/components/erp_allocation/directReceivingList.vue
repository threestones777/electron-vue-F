<template>
    <div class="directReceivingList">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>调拨</el-breadcrumb-item>
                <el-breadcrumb-item>直调收货单</el-breadcrumb-item>
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
                    <el-input placeholder="请输入单号" @input="search" v-model="keywords" style="width:50%;margin-right:10px" size="small">
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
                            直调收货单id<el-input v-model="formServeAdd.id" disabled></el-input>  
                        </el-col>
                        <el-col :span="7">
                            状态<el-input v-model="formServeAdd.status"></el-input>
                        </el-col>
                        <el-col :span="7">
                            发货店号<el-input v-model="formServeAdd.from_subshop_id"></el-input>
                        </el-col>
                    </el-row> -->
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            发货分店<el-input v-model="formServeAdd.from_subshop_name"></el-input>  
                        </el-col>
                        <el-col :span="7">
                            收货分店<el-input v-model="formServeAdd.to_subshop_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            收货店名<el-input v-model="formServeAdd.to_subshop_name"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            单号<el-input v-model="formServeAdd.bill_sn"></el-input>  
                        </el-col>
                        <el-col :span="7">
                            单据类型<el-input v-model="formServeAdd.type"></el-input>
                        </el-col>
                        <el-col :span="7">
                            要求到货日期<el-input v-model="formServeAdd.require_arrival_time"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            金额<el-input v-model="formServeAdd.money"></el-input>  
                        </el-col>
                        <el-col :span="7">
                            申请人<el-input v-model="formServeAdd.apply_user"></el-input>
                        </el-col>
                        <el-col :span="7">
                            申请日期<el-input v-model="formServeAdd.apply_time"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            发货人<el-input v-model="formServeAdd.fahuo_user	"></el-input>  
                        </el-col>
                        <el-col :span="7">
                            发货日期<el-input v-model="formServeAdd.fahuo_time"></el-input>
                        </el-col>
                        <el-col :span="7">
                            收货人<el-input v-model="formServeAdd.shouhuo_user"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            收货时间<el-input v-model="formServeAdd.shouhuo_time"></el-input>  
                        </el-col>
                        <el-col :span="7">
                            备注<el-input v-model="formServeAdd.remark"></el-input>
                        </el-col>
                        <el-col :span="7">
                            拣货员<el-input v-model="formServeAdd.jianhuo_user"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            检验员<el-input v-model="formServeAdd.jianyan_user"></el-input>  
                        </el-col>
                        <!-- <el-col :span="7">
                            分站id<el-input v-model="formServeAdd.subsite_id" disabled></el-input>
                        </el-col> -->
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
                            直调收货单id<el-input v-model="formServeDetail.id" disabled></el-input>  
                        </el-col>
                        <el-col :span="7">
                            状态<el-input v-model="formServeDetail.status"></el-input>
                        </el-col>
                        <el-col :span="7">
                            发货店号<el-input v-model="formServeDetail.from_subshop_id"></el-input>
                        </el-col>
                    </el-row> -->
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            发货分店<el-input v-model="formServeDetail.from_subshop_name"></el-input>  
                        </el-col>
                        <el-col :span="7">
                            收货分店<el-input v-model="formServeDetail.to_subshop_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            收货店名<el-input v-model="formServeDetail.to_subshop_name"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            单号<el-input v-model="formServeDetail.bill_sn"></el-input>  
                        </el-col>
                        <el-col :span="7">
                            单据类型<el-input v-model="formServeDetail.type"></el-input>
                        </el-col>
                        <el-col :span="7">
                            要求到货日期<el-input v-model="formServeDetail.require_arrival_time"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            金额<el-input v-model="formServeDetail.money"></el-input>  
                        </el-col>
                        <el-col :span="7">
                            申请人<el-input v-model="formServeDetail.apply_user"></el-input>
                        </el-col>
                        <el-col :span="7">
                            申请日期<el-input v-model="formServeDetail.apply_time"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            发货人<el-input v-model="formServeDetail.fahuo_user	"></el-input>  
                        </el-col>
                        <el-col :span="7">
                            发货日期<el-input v-model="formServeDetail.fahuo_time"></el-input>
                        </el-col>
                        <el-col :span="7">
                            收货人<el-input v-model="formServeDetail.shouhuo_user"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            收货时间<el-input v-model="formServeDetail.shouhuo_time"></el-input>  
                        </el-col>
                        <el-col :span="7">
                            备注<el-input v-model="formServeDetail.remark"></el-input>
                        </el-col>
                        <el-col :span="7">
                            拣货员<el-input v-model="formServeDetail.jianhuo_user"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            检验员<el-input v-model="formServeDetail.jianyan_user"></el-input>  
                        </el-col>
                        <!-- <el-col :span="7">
                            分站id<el-input v-model="formServeDetail.subsite_id" disabled></el-input>
                        </el-col> -->
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeDetail = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="edit(),dialogServeDetail = false">保存修改</el-button>
                </div>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="directReceData"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            style="width: 100%">
                <el-table-column
                prop="id"
                align="center"
                label="直调收货单id">
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
                prop="from_subshop_name"
                align="center"
                label="发货分店">
                </el-table-column>
                <el-table-column
                prop="to_subshop_id"
                align="center"
                label="收货分店">
                </el-table-column>
                <el-table-column
                prop="bill_sn"
                align="center"
                label="单号">
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showDetails(scope.row),dialogServeDetail = true">详情</el-button>
                        <el-button type="text" size="small" @click="receiveGoods(scope.row)">收货</el-button>
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
import {directRece,directReceDe,directReceAdd,directReceEd,directReceRec} from '../../api/apiW' ;
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
            directReceData:[],
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
            directRece(data).then(res=>{
                console.log(res.data);
            this.directReceData=res.data.orders;
            });
        },         
        reset() {
            this.reload();
        },
        handleCurrentChange(val) {
            console.log(val);          
        },
        receiveGoods(row){//--------------收货
            console.log(row.id+"*"+row.status);
            let dataD = this.$qs.stringify({
                id:row.id,
                status:1
            });
            directReceRec(dataD).then(res=>{
                this.$alert(res.errmsg);
            });

        },
        showDetails(row){//--------------详情
            console.log(row.id);
            let dataD = this.$qs.stringify({
                id:row.id
            });
            directReceDe(dataD).then(res=>{
                if(res.errno==0){
                    console.log(res.data);
                    this.formServeDetail=res.data;
                }else{
                    this.dialogServeDetail=false;
                    alert("您查找的用户不存在");
                }
            });
        },
        add(){//--------------添加
            this.formServeAdd.require_arrival_time=this.dateConverter(this.formServeAdd.require_arrival_time);
            this.formServeAdd.apply_time=this.dateConverter(this.formServeAdd.apply_time);
            this.formServeAdd.fahuo_time=this.dateConverter(this.formServeAdd.fahuo_time);
            this.formServeAdd.shouhuo_time=this.dateConverter(this.formServeAdd.shouhuo_time);
            let dataA=this.$qs.stringify(this.formServeAdd);
            directReceAdd(dataA).then(res=>{
                if(res.errno==0){
                    this.$alert(res.errmsg)
                    this.reload();
                }else{
                    this.$alert(res.errmsg)
                }
            })
        },
        edit(){//--------------修改
            this.formServeDetail.money=this.formServeDetail.money.slice(1);
            this.formServeDetail.require_arrival_time=this.dateConverter(this.formServeDetail.require_arrival_time);
            this.formServeDetail.apply_time=this.dateConverter(this.formServeDetail.apply_time);
            this.formServeDetail.fahuo_time=this.dateConverter(this.formServeDetail.fahuo_time);
            this.formServeDetail.shouhuo_time=this.dateConverter(this.formServeDetail.shouhuo_time);
            this.formServeDetail.status=this.formServeDetail.status=="未审核"?0:1;
            let dataE=this.$qs.stringify(this.formServeDetail);
            directReceEd(dataE).then(res=>{
                console.log(res.errno);
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
                directReceEd(data).then(res=>{
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
        directRece().then(res=>{
            console.log(res.data);
           this.directReceData=res.data.orders;
        });    
    }
}
</script>
<style scoped>
.directReceivingList{
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