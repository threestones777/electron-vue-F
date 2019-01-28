<template>
    <div class="replyAnalysis">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <!-- <h3>温州美联 管理中心</h3> -->
            <el-breadcrumb style="font-size:18px" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>购货</el-breadcrumb-item>
                <el-breadcrumb-item>补货分析</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="operate-in">
                <div @click="reset" class="card">
                    <i class="el-icon-loading"></i>
                    <div>刷新</div>
                </div>
                <div @click="dialogShow=true" class="card">
                    <i class="el-icon-tickets"></i>
                    <div>显示列</div>
                </div>
            </div>
        </div>
        <fieldset style="margin:10px 0;border-color:#fff;text-align:left">
            <legend>查询条件</legend>
            <el-row type="flex" justify="space-around" :gutter="10">
                <el-col style="text-align:left" :span="3">
                <!--  <h3 >日期类型</h3> -->
                    <el-radio-group @change="chose" v-model="radio" style="margin-top:5px;">
                        <el-radio label="add_time">订货日期</el-radio><br>
                        <el-radio label="check_time">审核日期</el-radio><br>
                        <el-radio label="require_time">要求到货日期</el-radio><br>
                        <el-radio label="9">不按日期</el-radio>
                    </el-radio-group>    
                </el-col>
                <el-col :span="5">
                    <el-date-picker
                    v-model="search3" size="small"
                    style="width:100%;margin-top:30px"
                    type="daterange" @change="chose"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </el-col>
                <el-col :span="4">
                    <el-input  prefix-icon="el-icon-search" style="width:100%;margin-top:30px;" v-model="search"  size="mini"  placeholder="输入单号"/>
                </el-col>
                <el-col :span="4">
                    <el-select @change="chose" style="margin-top:30px;" v-model="value1" size="small" placeholder="分店">
                        <el-option
                        v-for="item in options1"
                        :key="item.value1"
                        :label="item.label"
                        :value="item.value1">
                        </el-option>
                    </el-select>    
                </el-col>
                <el-col :span="4">
                    <el-select @change="chose" v-model="value4" size="small" placeholder="分店类型" style="margin-top:30px;width:100%;">
                        <el-option
                        v-for="item in options4"
                        :key="item.value4"
                        :label="item.label"
                        :value="item.value4">
                        </el-option>
                    </el-select> 
                </el-col>
                <el-col :span="4">
                    <!-- <el-button type="primary" size="small" @click="reset">刷新</el-button><br>
                    <el-button icon="el-icon-tickets"  style="margin-top:5px" type="primary" size="small" @click="dialogShow=true">显示列</el-button> -->
                </el-col>
            </el-row>            
        </fieldset>

        <div class="main-table" style="margin-top:10px;">
            <!-- 按需选择列弹窗 -->
            <el-dialog
            title="按需选择列" class="chose"
            :visible.sync="dialogShow"
            :before-close="handleClose"
            width="300px">
                <el-checkbox v-model="replyAnalysisshow.show1">补货分析id</el-checkbox><br>
                <el-checkbox v-model="replyAnalysisshow.show2">店铺id</el-checkbox><br>
                <el-checkbox v-model="replyAnalysisshow.show3">门店名称</el-checkbox><br>
                <el-checkbox v-model="replyAnalysisshow.show4">单号</el-checkbox><br>
                <el-checkbox v-model="replyAnalysisshow.show5">订货日期</el-checkbox><br>
                <el-checkbox v-model="replyAnalysisshow.show6">订货操作人</el-checkbox><br>
                <el-checkbox v-model="replyAnalysisshow.show7">要求到货日期</el-checkbox><br>
                <el-checkbox v-model="replyAnalysisshow.show8">备注</el-checkbox><br><br>
            </el-dialog>    
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
                    <el-button	size="small" type="primary" @click="dialogServeAdd = false">确 定</el-button>
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
                    <!-- <el-form-item label="订单审核日期">
                        <el-input v-model="formDetail.check_time"></el-input>
                    </el-form-item>                    
                    <el-form-item label="订货审核人">
                        <el-input v-model="formDetail.check_adminid"></el-input>
                    </el-form-item>         -->            
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
            :data="replyAnData.filter(data =>  {
            return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1})})"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="tableRowStyle"
            style="width: 100%">
                <!-- <el-table-column
                prop="id"
                v-if="replyAnalysisshow.show1"
                align="center"
                label="补货分析id">
                </el-table-column>                
                <el-table-column
                prop="subshop_id"
                v-if="replyAnalysisshow.show2"
                align="center"
                label="店铺id">
                </el-table-column> -->
                <el-table-column
                prop="subshop_name"
                align="center"
                v-if="replyAnalysisshow.show3"
                label="门店名称">
                </el-table-column>
                <el-table-column
                align="center"
                prop="bill_sn"
                v-if="replyAnalysisshow.show4"
                label="单号">
                </el-table-column>
                <el-table-column
                align="center"
                prop="add_time"
                v-if="replyAnalysisshow.show5"
                label="订货日期">
                </el-table-column>
                <el-table-column
                align="center"
                prop="adminid"
                v-if="replyAnalysisshow.show6"
                label="订货操作人">
                </el-table-column>
                <el-table-column
                align="center"
                prop="check_time"
                label="订单审核日期">
                </el-table-column>
                <el-table-column
                align="center"
                prop="check_adminid"
                label="订货审核人">
                </el-table-column>
                <el-table-column
                align="center"
                prop="require_time"
                v-if="replyAnalysisshow.show7"
                label="要求到货日期">
                </el-table-column>
                <el-table-column
                v-if="replyAnalysisshow.show8"
                align="center"
                prop="remark"
                label="备注">
                </el-table-column>
                <!-- <el-table-column
                fixed="right"
                align="center"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="edit(scope.row)">保存修改</el-button>
                        <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
            <!-- 分页器 -->
            <el-pagination
                @current-change="handleCurrentChange"
                layout="total,prev, pager, next,jumper"
                :total="record_count">
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
            dialogShow:false,
            record_count:0,
            keywords:'',
            search:'',
            search1:'',
            search2:'',
            search3:['2017-7-7','2018-8-8'],
            value: '' ,
            value1: '' ,
            value3: '' ,
            value4: '' ,
            radio:"9",
            formServeAdd:{
                status:0,
                add_time:new Date().getTime()/1000,
                adminid:0,
                check_time:new Date().getTime()/1000,
                check_adminid:0,
                require_time:new Date().getTime()/1000

            },
            formDetail:{},
            replyAnData:[],
            replyAnalysisshow:{
                show1:false,
                show2:false,
                show3:true,
                show4:true,
                show5:true,
                show6:true,
                show7:true,
                show8:true,
            }, 
            options1: [{
            value1: '0',
            label: '0号店'
            }, {
            value1: '1',
            label: '1号店'
            },],
            options4: [{
            value4: '0',
            label: '类型1'
            }, {
            value4: '1',
            label: '类型2'
            },],  
        }
    },
    methods:{
        init(page){//-----------------初始化数据
            let data=this.$qs.stringify({
                page:page,
                page_size:10,
            }); 
            this.data(data);
        },
        data(data){
            replyAnalysis(data).then(res=>{
                this.record_count=Number(res.data.filter.record_count);
                console.log(res.data);
                this.replyAnData=res.data.orders;
            })  
        },
        chose(){//-------------------选择查询
            let data=this.$qs.stringify({
                page:1,
                page_size:10,
                time_by:this.radio,
                add_time1:this.search3[0],
                add_time2:this.search3[1],
                subshop_id:this.value1,
                subshop_type:this.value4,
            }); 
            this.data(data);
        },
        handleClose(done){
            done();
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            erpTableSetting.replyAnalysis=this.replyAnalysisshow;
            localStorage.erpTableSetting=JSON.stringify(erpTableSetting);
        },
        dateConverter(str) { //-----------------------日期转秒数
            var arr = str.split(/[- : \/]/);
            var startDate = Date.parse(new Date(arr[0], arr[1]-1, arr[2]))/1000;
            return startDate;
        },           
        reset() {//-------刷新
            this.reload();
        },
        handleCurrentChange(val) {//-----翻页
            this.init(val); 
        },
        showDetails(row){//--------------详情
            console.log(row.id);
            let data=this.$qs.stringify({
                id:row.id,
                subsite_id:3,
                subshop_id:0,
                subsite_id:1,
            });
            replyAnalysisDe(data).then(res=>{
                console.log(res.data);
                this.formDetail=res.data;
                console.log(this.formDetail);
            });
        },
        edit(row){//-------------------修改
            row.add_time=this.dateConverter(row.add_time);
            row.check_time=this.dateConverter(row.check_time);
            row.require_time=this.dateConverter(row.require_time);
            let dataE=this.$qs.stringify(row)
            replyAnalysisEd(dataE).then(res=>{
                if(res.errno==0){
                    this.$message({
                        type: "success",
                        message: res.errmsg,
                        duration: 1000
                    });
                    this.reload();
                }else{
                    this.$message({
                        type: "error",
                        message: res.errmsg,
                        duration: 1000
                    });
                }
            })
        },
        add(){//--------------添加
            /* this.formServeAdd.add_time=this.dateConverter(this.formServeAdd.add_time);
            this.formServeAdd.check_time=this.dateConverter(this.formServeAdd.check_time);
            this.formServeAdd.require_time=this.dateConverter(this.formServeAdd.require_time); */
            let data =this.$qs.stringify(this.formServeAdd)
            replyAnalysisAdd(data).then(res=>{
                console.log(res.errno);
                if(res.errno==0){
                    this.$alert(res.errmsg);
                    this.reload();
                }else{
                    this.$alert(res.errmsg);
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
                        this.$alert(res.errmsg);
                        this.reload();
                    }else{
                        this.$alert(res.errmsg);
                    }
                });    
            }else{
                alert("用户取消操作");
            }
        },
        tableRowStyle({ row, rowIndex }) {
            return 'background-color:#949494;color:#fff;'
        },
    },
    created: function () {  
        if(localStorage.erpTableSetting!==undefined){
            console.log("yes");
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting); 
            if(erpTableSetting.replyAnalysis!==undefined){
                this.replyAnalysisshow=erpTableSetting.replyAnalysis;
            }
        }else{
            console.log("no");
        }
        this.init(1);
        
    }
}
</script>
<style scoped>
.replyAnalysis{
    margin: 10px;
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
.el-table input{
    width:100%;
    height:34px;
    border:1px solid #DCDFE6;
    border-radius:4px;
    padding:2px;
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
.el-row{
    background:#F3F3F3;
    width:100%;
}
.card-title {
  text-align: center;
}
.card-title:focus {
  outline: none;
}
.card {
  transition: all 0.3s;
  padding: 5px 0;
}
.card:hover {
  border-radius:7px;
  transform: translateY(-2px);
  box-shadow: 0px 2px 5px 4px rgba(0, 0, 0,0.1)
}
.card:hover i,
.card:hover div,
.card:hover b {
  color: #409EFF;
}
.operate-in {
  display: flex;
  margin-top: 12px;
}
.operate-in > div {
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
}
.operate-in > div div {
  font-size: 16px;
}
.operate-in i {
  font-size: 30px;
}
.operate-in b {
  font-size: 16px;
  position: absolute;
  top: 20%;
  right: 5%;
}
</style>