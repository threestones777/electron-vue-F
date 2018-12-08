<template>
    <div class="distributionAnalysis">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>调拨</el-breadcrumb-item>
                <el-breadcrumb-item>配货分析</el-breadcrumb-item>
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
                <el-form :model="formServeAdd"  style="text-align:center">
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
                    </el-row> --> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            下单分店id<el-input v-model="formServeAdd.xiadan_subshop_id"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            收货分店id<el-input v-model="formServeAdd.shouhuo_subshop_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            分店名字<el-input v-model="formServeAdd.subshop_name"></el-input>
                        </el-col>
                    </el-row>
                   <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                             单据编号<el-input v-model="formServeAdd.bill_sn"></el-input>   
                        </el-col>
                        <el-col :span="7">
                           订货时间<el-input v-model="formServeAdd.dinghuo_time"></el-input>  
                        </el-col>
                        <el-col :span="7">
                            订货人<el-input v-model="formServeAdd.dinghuo_user"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                             订货核对时间<el-input v-model="formServeAdd.dinghuo_check_time"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            订货核对人<el-input v-model="formServeAdd.dinghuo_check_user"></el-input>
                        </el-col>
                        <el-col :span="7">
                            要求到货时间<el-input v-model="formServeAdd.require_daohuo_time"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
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
            <el-dialog width="700px" title="详情" :visible.sync="dialogServeDetail">
                <el-form :model="formServeDetail"  style="text-align:center">
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
                            下单分店id<el-input v-model="formServeDetail.xiadan_subshop_id"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            收货分店id<el-input v-model="formServeDetail.shouhuo_subshop_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            分店名字<el-input v-model="formServeDetail.subshop_name"></el-input>
                        </el-col>
                    </el-row>
                   <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                             单据编号<el-input v-model="formServeDetail.bill_sn"></el-input>   
                        </el-col>
                        <el-col :span="7">
                           订货时间<el-input v-model="formServeDetail.dinghuo_time"></el-input>  
                        </el-col>
                        <el-col :span="7">
                            订货人<el-input v-model="formServeDetail.dinghuo_user"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                             订货核对时间<el-input v-model="formServeDetail.dinghuo_check_time"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            订货核对人<el-input v-model="formServeDetail.dinghuo_check_user"></el-input>
                        </el-col>
                        <el-col :span="7">
                            要求到货时间<el-input v-model="formServeDetail.require_daohuo_time"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            备注<el-input v-model="formServeDetail.remark"></el-input> 
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
            :data="distributionData"
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
                prop="bill_sn"
                align="center"
                label="单据编号">
                </el-table-column>
                <el-table-column
                prop="require_daohuo_time"
                align="center"
                label="要求到货时间">
                </el-table-column>
                <el-table-column
                prop="subshop_name"
                align="center"
                label="分店名字">
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
            <!------------------------------------- 审核弹窗 ---------------------------------->
            <el-dialog width="30%" title="订单审核" :visible.sync="dialogCheck">
                <el-radio-group v-model="status">
                    <el-radio :label="0">未审核</el-radio>
                    <el-radio :label="1">已审核</el-radio>
                </el-radio-group>              
                <div slot="footer" class="dialog-footer">
                    <el-button size="small" @click="dialogCheck = false">取 消</el-button>
                    <el-button size="small" type="primary" @click="checkSta(),dialogCheck = false">保存审核</el-button>
                </div>
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
import {distribution,distributionDe,distributionEd,distributionAdd,distributionCh} from '../../api/apiW';
export default {
    inject: ['reload'],
    data() {
        return {
            pages:1,
            status:0,
            dialogServeAdd:false,
            dialogServeDetail:false,
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
            distributionData:[],
        }
    },
    methods:{
        dateConverter(str) { //-----------------------日期转秒数
            var arr = str.split(/[- : \/]/);
            var startDate = Date.parse(new Date(arr[0], arr[1]-1, arr[2]))/1000;
            return startDate;
        },
        search() {
            let data=this.$qs.stringify({
                bill_sn:this.keywords
            });
            distribution(data).then(res=>{
                console.log(res.data.peihuo_list);
                this.distributionData=res.data.peihuo_list;
            }); 
        },        
        reset() {
            this.reload();
        },
        handleCurrentChange(val) {
            console.log(val);         
        },
        showDetails(row){//------------------详情
            console.log(row.id);
            let dataD=this.$qs.stringify({
                id:row.id
            });
            distributionDe(dataD).then(res=>{
                this.formServeDetail=res.data;
                console.log(res.data);  
            });
        },
        getId(row){//-----------------------保存id
            this.id=row.id;
            this.status=(row.status=="未审核"?0:(row.status=="已审核"?1:0));
            console.log(this.status);
        },
        checkSta(){//------------------审核
            let dataC=this.$qs.stringify({
                id:this.id,
                status:this.status
            });
            distributionCh(dataC).then(res=>{
                console.log(res);
                this.reload();
            });
        },
        edit(){
           this.formServeDetail.dinghuo_time=this.dateConverter(this.formServeDetail.dinghuo_time);
           this.formServeDetail.dinghuo_check_time=this.dateConverter(this.formServeDetail.dinghuo_check_time);
           this.formServeDetail.require_daohuo_time=this.dateConverter(this.formServeDetail.require_daohuo_time);
            let dataE=this.$qs.stringify(this.formServeDetail);
            distributionEd(dataE).then(res=>{
                console.log(res.data);
                if(res.errno==0){
                    this.$alert(res.errmsg)
                    this.reload();
                }else{
                    this.$alert(res.errmsg)
                }
            });            
        },
        add(){
            console.log("添加");
            this.formServeAdd.dinghuo_time=this.dateConverter(this.formServeAdd.dinghuo_time);
            this.formServeAdd.dinghuo_check_time=this.dateConverter(this.formServeAdd.dinghuo_check_time);
            this.formServeAdd.require_daohuo_time=this.dateConverter(this.formServeAdd.require_daohuo_time);
            let dataA=this.$qs.stringify(this.formServeAdd);
            distributionAdd(dataA).then(res=>{
                console.log(res.data);
                if(res.errno==0){
                    this.$alert(res.errmsg)
                    this.reload();
                }else{
                    this.$alert(res.errmsg)
                }
            });
        },
        deleteRow(row) {
            let dataE=this.$qs.stringify({
                id:row.id,
                is_delete:1
            });
            distributionEd(dataE).then(res=>{
                if(res.errno==0){
                    this.$alert("删除成功")
                    this.reload();
                }else{
                    this.$alert("删除失败")
                }
            }); 
        }
    },
    created: function () {  
        distribution().then(res=>{
            console.log(res.data.peihuo_list);
            this.distributionData=res.data.peihuo_list;
        });   
    }
}
</script>
<style scoped>
.distributionAnalysis{
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