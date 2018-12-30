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
            <fieldset style="margin:10px 0;border-color:#fff;text-align:left">
                <legend>查询条件</legend>
                <el-row type="flex" justify="space-around" :gutter="10">
                    <el-col style="text-align:left" :span="3">
                        <el-radio-group @change="chose" v-model="radio" style="margin-top:5px;">
                            <el-radio label="dinghuo_time">订货日期</el-radio><br>
                            <el-radio label="dinghuo_check_time ">审核日期</el-radio><br>
                        </el-radio-group>    
                    </el-col>
                    <el-col style="text-align:left" :span="3">
                        <el-radio-group @change="chose" v-model="radio" style="margin-top:5px;">
                            <el-radio label="require_daohuo_time ">要求到货日期</el-radio><br>
                            <el-radio label="4">不按日期</el-radio>
                        </el-radio-group>    
                    </el-col>
                    <el-col :span="4">
                        <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search"  size="mini"  placeholder="订单号"/>
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search1"  size="mini"  placeholder="订货人"/>
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:0px;" v-model="search2"  size="mini"  placeholder="订货核对人"/>
                    </el-col>
                    <el-col :span="4">
                        <el-select @change="chose" v-model="value" size="small" placeholder="分店类型" style="margin-bottom:5px;">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select @change="chose" v-model="value1" size="small" placeholder="分店">
                            <el-option
                            v-for="item in options1"
                            :key="item.value1"
                            :label="item.label"
                            :value="item.value1">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4">
                        <el-select @change="chose" v-model="value4" size="small" placeholder="状态">
                            <el-option
                            v-for="item in options4"
                            :key="item.value4"
                            :label="item.label"
                            :value="item.value4">
                            </el-option>
                        </el-select> 
                    </el-col>
                    <el-col :span="5">
                        <el-date-picker
                        v-model="search3" size="small"
                        style="width:100%;margin-top:0px"
                        type="daterange" @change="chose"
                        align="right"
                        unlink-panels
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="primary" size="small" @click="reset">刷新</el-button><br>
                        <el-button icon="el-icon-tickets"  style="margin-top:5px" type="primary" size="small" @click="dialogShow=true">显示列</el-button>
                    </el-col>
                </el-row>				
			</fieldset>
            <!-- 按需选择列弹窗 -->
            <el-dialog
            title="按需选择列" class="chose" style="text-align:left"
            :visible.sync="dialogShow"
            :before-close="handleClose"
            width="200px">
                <el-checkbox v-model="distributionAnalysisshow.show1">id</el-checkbox><br>
                <el-checkbox v-model="distributionAnalysisshow.show2">状态</el-checkbox><br>
                <el-checkbox v-model="distributionAnalysisshow.show3">下单分店id</el-checkbox><br>
                <el-checkbox v-model="distributionAnalysisshow.show4">收货分店id</el-checkbox><br>
                <el-checkbox v-model="distributionAnalysisshow.show5">分店名字</el-checkbox><br>
                <el-checkbox v-model="distributionAnalysisshow.show6">单据编号</el-checkbox><br>
                <el-checkbox v-model="distributionAnalysisshow.show7">订货时间</el-checkbox><br>
                <el-checkbox v-model="distributionAnalysisshow.show8">订货人</el-checkbox><br>
                <el-checkbox v-model="distributionAnalysisshow.show9">订货核对时间</el-checkbox><br>
                <el-checkbox v-model="distributionAnalysisshow.show10">订货核对人</el-checkbox><br>
                <el-checkbox v-model="distributionAnalysisshow.show11">要求到货时间</el-checkbox><br>
                <el-checkbox v-model="distributionAnalysisshow.show12">备注</el-checkbox><br><br>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="distributionData.filter(data =>  {
            return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1})})"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            style="width: 100%">
                <el-table-column
                prop="id"
                align="center"
                v-if="distributionAnalysisshow.show1"
                label="id">
                </el-table-column>
                <el-table-column
                prop="status"
                align="center"
                v-if="distributionAnalysisshow.show2"
                label="状态">
                </el-table-column>
                <!-- <el-table-column
                prop="xiadan_subshop_id"
                align="center"
                v-if="distributionAnalysisshow.show3"
                label="下单分店id">
                </el-table-column>
                <el-table-column
                align="center"
                v-if="distributionAnalysisshow.show4"
                label="收货分店id">
                    <template slot-scope="scope">
                        <input v-model="scope.row.shouhuo_subshop_id"/>
                    </template>
                </el-table-column> -->
                <el-table-column
                align="center"
                v-if="distributionAnalysisshow.show5"
                label="分店名字">
                    <template slot-scope="scope">
                        <input v-model="scope.row.subshop_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="distributionAnalysisshow.show6"
                label="单据编号">
                    <template slot-scope="scope">
                        <input v-model="scope.row.bill_sn"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="dinghuo_time"
                align="center"
                v-if="distributionAnalysisshow.show7"
                label="订货时间">
                    <template slot-scope="scope">
                        <input v-model="scope.row.dinghuo_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="distributionAnalysisshow.show8"
                label="订货人">
                    <template slot-scope="scope">
                        <input v-model="scope.row.dinghuo_user"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="dinghuo_check_time"
                align="center"
                v-if="distributionAnalysisshow.show9"
                label="订货核对时间">
                    <template slot-scope="scope">
                        <input v-model="scope.row.dinghuo_check_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="distributionAnalysisshow.show10"
                label="订货核对人">
                    <template slot-scope="scope">
                        <input v-model="scope.row.dinghuo_check_user"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="require_daohuo_time"
                align="center"
                v-if="distributionAnalysisshow.show11"
                label="要求到货时间">
                    <template slot-scope="scope">
                        <input v-model="scope.row.require_daohuo_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="distributionAnalysisshow.show12"
                label="备注">
                    <template slot-scope="scope">
                        <input v-model="scope.row.remark"/>
                    </template>
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="edit(scope.row)">保存修改</el-button>
                        <el-button type="text" size="small" @click="getId(scope.row),dialogCheck = true">审核</el-button>
                        <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!------------------------------------- 审核弹窗 ---------------------------------->
            <el-dialog width="300px" title="订单审核" :visible.sync="dialogCheck">
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
                layout="total,prev, pager, next,jumper"
                :total="record_count">
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
            dialogShow:false,
            record_count:0,
            search:'',
            search1:'',
            search2:'',
            search3:['2017-7-7','2019-9-9'],
            formServe:{
                name:"",
                marks:""
            },
            formServeAdd:{
                status:"未审核",
                xiadan_subshop_id:0,
                shouhuo_subshop_id:0,
                dinghuo_time:new Date().getTime()/1000-86400,
                dinghuo_user:"",
                dinghuo_check_time:new Date().getTime()/1000-86400,
                dinghuo_check_user:"",
                require_daohuo_time:new Date().getTime()/1000-86400,
            },
            formServeDetail:{},
            distributionData:[],
            distributionAnalysisshow:{
                show1:false,
                show2:true,
                show3:true,
                show4:true,
                show5:true,
                show6:true,
                show7:true,
                show8:true,
                show9:true,
                show10:true,
                show11:true,
                show12:true,
            },
            radio:"4",
            value: '' ,
            value1: '' ,
            value3: '' ,
            value4: '' ,
            value5: '' ,
            value6: '' ,
            value7: '' ,
            options: [{
            value: '0',
            label: '类型1'
            }, {
            value: '1',
            label: '类型2'
            },],  
            options1: [{
            value1: '0',
            label: '0号店'
            }, {
            value1: '1',
            label: '1号店'
            },],
            options4: [{
            value4: '0',
            label: '未审核'
            }, {
            value4: '1',
            label: '已审核'
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
            distribution(data).then(res=>{
                console.log(res.data.peihuo_list);
                this.record_count=Number(res.data.filter.record_count);
                this.distributionData=res.data.peihuo_list;
            }); 
        },
        chose(){//--------------------选择查询
           let data=this.$qs.stringify({
                page:1,
                page_size:10,
                time_by:this.radio,
                dinghuo_user:this.search1,
                dinghuo_check_user:this.search2,
                subshop_type:this.value,
                xiadan_subshop_id:this.value1,
                status:this.value4,
                add_time1:this.search3[0],
                add_time2:this.search3[1],
            }); 
            this.data(data); 
        },
        handleClose(done){
            done();
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            erpTableSetting.distributionAnalysis=this.distributionAnalysisshow;
            localStorage.erpTableSetting=JSON.stringify(erpTableSetting);
        }, 
        dateConverter(str) { //-----------------------日期转秒数
            var arr = str.split(/[- : \/]/);
            var startDate = Date.parse(new Date(arr[0], arr[1]-1, arr[2]))/1000;
            return startDate;
        },  
        reset() {
            this.reload();
        },
        handleCurrentChange(val) {
            this.init(val);           
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
        edit(row){
           row.dinghuo_time=this.dateConverter(row.dinghuo_time);
           row.dinghuo_check_time=this.dateConverter(row.dinghuo_check_time);
           row.require_daohuo_time=this.dateConverter(row.require_daohuo_time);
            let dataE=this.$qs.stringify(row);
            distributionEd(dataE).then(res=>{
                console.log(res.data);
                if(res.errno==0){
                    this.$message({
                        type: "success",
                        message: res.errmsg,
                        duration: 1000
                    });
                    this.init(1); 
                }else{
                    this.$message({
                        type: "error",
                        message: res.errmsg,
                        duration: 1000
                    });
                    this.init(1); 
                }
            });            
        },
        add(){
            let dataA=this.$qs.stringify(this.formServeAdd);
            distributionAdd(dataA).then(res=>{
                console.log(res.data);
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
            });
        },
        deleteRow(row) {
            let Message=confirm("确定删除此行数据？");
            if(Message){
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
            }else{
                alert("用户取消操作");
            }
            
             
        }
    },
    created: function () {
        if(localStorage.erpTableSetting!==undefined){
            console.log("yes");
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting); 
            if(erpTableSetting.distributionAnalysis!==undefined){
                this.distributionAnalysisshow=erpTableSetting.distributionAnalysis;
            }
        }else{
            console.log("no");
        };  
        this.init(1);  
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
.el-table input{
    width:100%;
    height:34px;
    border:1px solid #DCDFE6;
    border-radius:4px;
    padding:2px;
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
</style>