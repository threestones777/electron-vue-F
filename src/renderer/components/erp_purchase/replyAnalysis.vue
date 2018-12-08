<template>
    <div class="replyAnalysis">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>购货</el-breadcrumb-item>
                <el-breadcrumb-item>补货分析</el-breadcrumb-item>
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
            <el-dialog width="550px" title="新增" :visible.sync="dialogServeAdd">
                <el-form :model="formServeAdd">
                    <!-- <el-form-item label="补货分析id">
                        <el-input v-model="formServeAdd.id"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺id">
                        <el-input v-model="formServeAdd.subshop_id"></el-input>
                    </el-form-item>               
                    <el-form-item label="分站id">
                        <el-input v-model="formServeAdd.subsite_id"></el-input>
                    </el-form-item>  -->    
                    <el-form-item label="状态">
                        <el-input v-model="formServeAdd.status"></el-input>
                    </el-form-item>                    
                    <el-form-item label="门店名称">
                        <el-input v-model="formServeAdd.subshop_name"></el-input>
                    </el-form-item>                    
                    <el-form-item label="单号">
                        <el-input v-model="formServeAdd.bill_sn"></el-input>
                    </el-form-item>                    
                    <el-form-item label="订货日期">
                        <el-input v-model="formServeAdd.add_time"></el-input>
                    </el-form-item>                    
                    <el-form-item label="订货操作人">
                        <el-input v-model="formServeAdd.adminid"></el-input>
                    </el-form-item>                    
                    <el-form-item label="订单审核日期">
                        <el-input v-model="formServeAdd.check_time"></el-input>
                    </el-form-item>                    
                    <el-form-item label="订货审核人">
                        <el-input v-model="formServeAdd.check_adminid"></el-input>
                    </el-form-item>                    
                    <el-form-item label="要求到货日期">
                        <el-input v-model="formServeAdd.require_time"></el-input>
                    </el-form-item>                    
                    <el-form-item label="备注">
                        <el-input v-model="formServeAdd.remark"></el-input>
                    </el-form-item>                    
                    <el-form-item label="扩展字段">
                        <el-input v-model="formServeAdd.ml_data"></el-input>
                    </el-form-item>                
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeAdd = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="add(),dialogServeAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 详情弹出框 -->
            <el-dialog width="600px" title="补货分析详情" :visible.sync="dialogServeDetail">
                <el-form :model="formDetail">
                    <!-- <el-form-item label="补货分析id">
                        <el-input v-model="formDetail.id" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="店铺id">
                        <el-input v-model="formDetail.subshop_id" disabled></el-input>
                    </el-form-item>                    
                    <el-form-item label="分站id">
                        <el-input v-model="formDetail.subsite_id" disabled></el-input>
                    </el-form-item>                 
                    <el-form-item label="状态">
                        <el-input v-model="formDetail.status"></el-input>
                    </el-form-item>   -->                     
                    <el-form-item label="门店名称">
                        <el-input v-model="formDetail.subshop_name"></el-input>
                    </el-form-item>                    
                    <el-form-item label="单号">
                        <el-input v-model="formDetail.bill_sn"></el-input>
                    </el-form-item>                    
                    <el-form-item label="订货日期">
                        <el-input v-model="formDetail.add_time"></el-input>
                    </el-form-item>                    
                    <el-form-item label="订货操作人">
                        <el-input v-model="formDetail.adminid"></el-input>
                    </el-form-item>                    
                    <el-form-item label="订单审核日期">
                        <el-input v-model="formDetail.check_time"></el-input>
                    </el-form-item>                    
                    <el-form-item label="订货审核人">
                        <el-input v-model="formDetail.check_adminid"></el-input>
                    </el-form-item>                    
                    <el-form-item label="要求到货日期">
                        <el-input v-model="formDetail.require_time"></el-input>
                    </el-form-item>                    
                    <el-form-item label="备注">
                        <el-input v-model="formDetail.remark"></el-input>
                    </el-form-item>                    
                    <el-form-item label="扩展字段">
                        <el-input v-model="formDetail.ml_data"></el-input>
                    </el-form-item>                
                </el-form>                
                <div slot="footer" class="dialog-footer">
                    <el-button size="small" @click="dialogServeDetail = false">取 消</el-button>
                    <el-button size="small" type="primary" @click="edit(),dialogServeDetail = false">保存修改</el-button>
                </div>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="replyAnData"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            style="width: 100%">
                <el-table-column
                prop="id"
                align="center"
                label="补货分析id">
                </el-table-column>                
                <el-table-column
                prop="subshop_id"
                align="center"
                label="店铺id">
                </el-table-column>
                <el-table-column
                prop="subshop_name"
                align="center"
                label="门店名称">
                </el-table-column>
                <el-table-column
                prop="bill_sn"
                align="center"
                label="	单号">
                </el-table-column>
                <el-table-column
                prop="add_time"
                align="center"
                label="订货日期">
                </el-table-column>
                <el-table-column
                prop="adminid"
                align="center"
                label="订货操作人">
                </el-table-column>
                <el-table-column
                prop="remark"
                align="center"
                label="备注">
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
import {replyAnalysis,replyAnalysisDe,replyAnalysisAdd,replyAnalysisEd} from '../../api/apiW' ;
export default {
    inject: ['reload'],
    data() {
        return {
            pages:1,
            dialogServeAdd:false,
            dialogServeDetail:false,
            formServe:{
                name:"",
                marks:""
            },
            keywords:'',
            formServeAdd:{},
            formDetail:{},
            replyAnData:[],
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
            replyAnalysis(data).then(res=>{
                this.pages=Math.ceil(res.data.filter.record_count/10);
                console.log(res.data);
                this.replyAnData=res.data.orders;
            })
        },           
        reset() {
            this.reload();
        },
        handleCurrentChange(val) {//翻页
            console.log(val); 
            let dataC= this.$qs.stringify({
                subsite_id:3,
                subshop_id:0,
                page:val,
                page_size:10,
            }); 
            replyAnalysis(dataC).then(res=>{
                console.log(res.data);
                this.replyAnData=res.data.orders;
            })      
        },
        showDetails(row){//-------详情
            console.log(row.id);
            let data=this.$qs.stringify({
                id:row.id,
                subsite_id:3,
                subshop_id:0
            });
            replyAnalysisDe(data).then(res=>{
                console.log(res.data);
                this.formDetail=res.data;
                console.log(this.formDetail);
            });

        },
        edit(){//-------修改
            this.formDetail.add_time=this.dateConverter(this.formDetail.add_time);
            this.formDetail.check_time=this.dateConverter(this.formDetail.check_time);
            this.formDetail.require_time=this.dateConverter(this.formDetail.require_time);
            let dataE=this.$qs.stringify(this.formDetail)
            replyAnalysisEd(dataE).then(res=>{
                if(res.errno==0){
                    this.$message({
                        type: "success",
                        message: res.errmsg,
                        duration: 2000
                    });
                    this.reload();
                }else{
                    this.$message({
                        type: "error",
                        message: res.errmsg,
                        duration: 2000
                    });
                }
            })
        },
        add(){//添加
            this.formServeAdd.add_time=this.dateConverter(this.formServeAdd.add_time);
            this.formServeAdd.check_time=this.dateConverter(this.formServeAdd.check_time);
            this.formServeAdd.require_time=this.dateConverter(this.formServeAdd.require_time);
            let data =this.$qs.stringify(this.formServeAdd)
            replyAnalysisAdd(data).then(res=>{
                console.log(res.errno);
                if(res.errno==0){
                    this.$message({
                        type: "success",
                        message: res.errmsg,
                        duration: 2000
                    });
                    this.reload();
                }else{
                    this.$message({
                        type: "error",
                        message: res.errmsg,
                        duration: 2000
                    });
                }
            })
        },
        deleteRow(row) {
            let Message=confirm("确定删除此行数据？");
            if(Message){
                console.log(row.id);
                let data=this.$qs.stringify({
                    id:row.id,
                    is_delete:1
                }); 
                replyAnalysisEd(data).then(res=>{
                    console.log(res.data);
                    if(res.errno==0){
                        this.$message({
                            type: "success",
                            message: "删除成功",
                            duration: 2000
                        });
                        this.reload();
                    }else{
                        this.$message({
                            type: "error",
                            message:"删除失败",
                            duration: 2000
                        });
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
        replyAnalysis(dataP).then(res=>{
            this.pages=Math.ceil(res.data.filter.record_count/10);
            console.log(res.data);
            this.replyAnData=res.data.orders;
        })
    }
}
</script>
<style scoped>
.replyAnalysis{
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