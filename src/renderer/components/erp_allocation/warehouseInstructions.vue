<template>
    <div class="warehouseInstructions">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>调拨</el-breadcrumb-item>
                <el-breadcrumb-item>退仓指令</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <fieldset style="margin:10px 0;border-color:#fff;text-align:left">
                <legend>查询条件</legend>
                <el-row type="flex" justify="space-around" :gutter="10">
                    <el-col style="text-align:left" :span="3">
                        <el-radio-group @change="chose" v-model="radio" style="margin-top:5px;">
                            <el-radio label="add_time">制单日期</el-radio><br>
                            <el-radio label="check_time">审核日期</el-radio><br>
                            <el-radio label="handle_time">处理日期</el-radio><br>
                            <el-radio label="4">不按日期</el-radio>
                        </el-radio-group>    
                    </el-col>
                    <el-col :span="6">
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
                    <el-col :span="4">
                        <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search"  size="mini"  placeholder="订单号"/>
                        <el-input @input="chose" prefix-icon="el-icon-search" style="width:100%" v-model="value"  size="mini"  placeholder="退至配送中心"/>
                    </el-col>
                    <el-col :span="4">
                        <el-select @change="chose" v-model="value1" size="small" placeholder="状态">
                            <el-option
                            v-for="item in options1"
                            :key="item.value1"
                            :label="item.label"
                            :value="item.value1">
                            </el-option>
                        </el-select> 
                        <el-select @change="chose" v-model="value2" size="small" placeholder="分店" style="margin-top:5px">
                            <el-option
                            v-for="item in options2"
                            :key="item.value2"
                            :label="item.label"
                            :value="item.value2">
                            </el-option>
                        </el-select> 
                    </el-col>
                    <el-col :span="4">
                        <el-select @change="chose" v-model="value3" size="small" placeholder="分公司">
                            <el-option
                            v-for="item in options3"
                            :key="item.value3"
                            :label="item.label"
                            :value="item.value3">
                            </el-option>
                        </el-select> 
                        <el-select @change="chose" v-model="value4" size="small" placeholder="分店类型" style="margin-top:5px">
                            <el-option
                            v-for="item in options4"
                            :key="item.value4"
                            :label="item.label"
                            :value="item.value4">
                            </el-option>
                        </el-select> 
                    </el-col>
                    <el-col :span="3">
                        <el-button type="primary" size="small" @click="reset">刷新</el-button><br>
                        <el-button icon="el-icon-tickets"  style="margin-top:5px" type="primary" size="small" @click="dialogShow=true">显示列</el-button>
                    </el-col>
                    <el-col :span="10"></el-col>
                </el-row>				
			</fieldset>
            <!-- 按需选择列弹窗 -->
            <el-dialog
            title="按需选择列" class="chose" style="text-align:left"
            :visible.sync="dialogShow"
            :before-close="handleClose"
            width="200px">
                <el-checkbox v-model="warehouseInshow.show1">分店id</el-checkbox><br>
                <el-checkbox v-model="warehouseInshow.show2">编号</el-checkbox><br>
                <el-checkbox v-model="warehouseInshow.show3">退至店号</el-checkbox><br>
                <el-checkbox v-model="warehouseInshow.show4">退至店号名称</el-checkbox><br>
                <el-checkbox v-model="warehouseInshow.show5">单据编号</el-checkbox><br>
                <el-checkbox v-model="warehouseInshow.show6">状态</el-checkbox><br>
                <el-checkbox v-model="warehouseInshow.show7">要求处理时间</el-checkbox><br>
                <el-checkbox v-model="warehouseInshow.show8">制单人</el-checkbox><br>
                <el-checkbox v-model="warehouseInshow.show9">核对时间</el-checkbox><br>
                <el-checkbox v-model="warehouseInshow.show10">核对人</el-checkbox><br>
                <el-checkbox v-model="warehouseInshow.show11">处理时间</el-checkbox><br>
                <el-checkbox v-model="warehouseInshow.show12">处理人</el-checkbox><br>
                <el-checkbox v-model="warehouseInshow.show13">相关单号</el-checkbox><br>
                <el-checkbox v-model="warehouseInshow.show14">售价金额</el-checkbox><br>
                <el-checkbox v-model="warehouseInshow.show15">分店名</el-checkbox><br>
                <el-checkbox v-model="warehouseInshow.show16">备注</el-checkbox><br>
                <el-checkbox v-model="warehouseInshow.show17">制单人姓名</el-checkbox><br><br>
            </el-dialog>
            <!-- 新增弹出框 -->
            <el-dialog width="700px" title="新增" :visible.sync="dialogServeAdd">
                <el-form :model="formServeAdd"  style="text-align:center">
                    <!-- <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            分店id<el-input v-model="formServeAdd.subshop_id"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            分站id<el-input v-model="formServeAdd.subsite_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            分店名<el-input v-model="formServeAdd.subshop_name"></el-input>
                        </el-col>
                    </el-row> -->  
                   <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                           退至店号<el-input v-model="formServeAdd.to_subshop_id"></el-input>     
                        </el-col>
                        <el-col :span="7">
                            退至店号名称<el-input v-model="formServeAdd.to_shipping_name"></el-input>
                        </el-col>
                        <el-col :span="7">
                            单据编号<el-input v-model="formServeAdd.bill_sn"></el-input>
                        </el-col>
                    </el-row>  
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            状态<el-input v-model="formServeAdd.status"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            要求处理时间<el-input v-model="formServeAdd.require_handle_time"></el-input>
                        </el-col>
                        <el-col :span="7">
                            制单人<el-input v-model="formServeAdd.adminid"></el-input>
                        </el-col>
                    </el-row>  
                   <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            核对时间<el-input v-model="formServeAdd.check_time"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            核对人<el-input v-model="formServeAdd.check_user"></el-input>
                        </el-col>
                        <el-col :span="7">
                            处理时间 <el-input v-model="formServeAdd.handle_time"></el-input>
                        </el-col>
                    </el-row>  
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            处理人<el-input v-model="formServeAdd.handle_user"></el-input>  
                        </el-col>
                        <el-col :span="7">
                            相关单号<el-input v-model="formServeAdd.relevant_sn"></el-input>
                        </el-col>
                        <el-col :span="7">
                            售价金额<el-input v-model="formServeAdd.shop_price"></el-input>
                        </el-col>
                    </el-row>  
                   <el-row type="flex" justify="space-around">
                       <el-col :span="7">
                            分店名<el-input v-model="formServeAdd.subshop_name"></el-input>
                        </el-col>
                        <el-col :span="7">
                            备注<el-input v-model="formServeAdd.remark"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            制单人姓名<el-input v-model="formServeAdd.admin_name"></el-input>
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
                            分店id<el-input v-model="formServeDetail.subshop_id" disabled></el-input>    
                        </el-col>
                        <el-col :span="7">
                            分站id<el-input v-model="formServeDetail.subsite_id" disabled></el-input>
                        </el-col>
                        <el-col :span="7">
                            分店名<el-input v-model="formServeDetail.subshop_name"></el-input>
                        </el-col>
                    </el-row> -->  
                   <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                           退至店号<el-input v-model="formServeDetail.to_subshop_id"></el-input>     
                        </el-col>
                        <el-col :span="7">
                            退至店号名称<el-input v-model="formServeDetail.to_shipping_name"></el-input>
                        </el-col>
                        <el-col :span="7">
                            单据编号<el-input v-model="formServeDetail.bill_sn"></el-input>
                        </el-col>
                    </el-row>  
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            状态<el-input v-model="formServeDetail.status"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            要求处理时间<el-input v-model="formServeDetail.require_handle_time"></el-input>
                        </el-col>
                        <el-col :span="7">
                            制单人<el-input v-model="formServeDetail.adminid"></el-input>
                        </el-col>
                    </el-row>  
                   <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            核对时间<el-input v-model="formServeDetail.check_time"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            核对人<el-input v-model="formServeDetail.check_user"></el-input>
                        </el-col>
                        <el-col :span="7">
                            处理时间 <el-input v-model="formServeDetail.handle_time"></el-input>
                        </el-col>
                    </el-row>  
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            处理人<el-input v-model="formServeDetail.handle_user"></el-input>  
                        </el-col>
                        <el-col :span="7">
                            相关单号<el-input v-model="formServeDetail.relevant_sn"></el-input>
                        </el-col>
                        <el-col :span="7">
                            售价金额<el-input v-model="formServeDetail.shop_price"></el-input>
                        </el-col>
                    </el-row>  
                   <el-row type="flex" justify="space-around">
                       <el-col :span="7">
                            分店名<el-input v-model="formServeDetail.subshop_name"></el-input>
                        </el-col>
                        <el-col :span="7">
                            备注<el-input v-model="formServeDetail.remark"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            制单人姓名<el-input v-model="formServeDetail.admin_name"></el-input>
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
            :data="warehouseInData.filter(data =>  {
            return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1})})"
            border
            show-summary
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            style="width: 100%">
                <el-table-column
                align="center"
                v-if="warehouseInshow.show1"
                label="分店id">
                    <template slot-scope="scope">
                        <span>{{scope.row.subshop_id}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="warehouseInshow.show2"
                label="编号">   
                    <template slot-scope="scope">
                        <span>{{scope.row.id}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="warehouseInshow.show3"
                label="退至店号">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.to_subshop_id"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="110"
                v-if="warehouseInshow.show4"
                label="退至店号名称">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.to_shipping_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="warehouseInshow.show5"
                width="160"
                label="单据编号">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.bill_sn"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="100"
                v-if="warehouseInshow.show6"
                label="状态">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.status"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="warehouseInshow.show7"
                width="130"
                label="要求处理时间">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.require_handle_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="65"
                v-if="warehouseInshow.show8"
                label="制单人">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.adminid"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="130"
                v-if="warehouseInshow.show9"
                label="核对时间">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.check_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="65"
                v-if="warehouseInshow.show10"
                label="核对人">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.check_user"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="130"
                v-if="warehouseInshow.show11"
                label="处理时间">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.handle_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="65"
                v-if="warehouseInshow.show12"
                label="处理人">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.handle_user"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="150"
                v-if="warehouseInshow.show13"
                label="相关单号">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.relevant_sn"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="shop_price"
                align="center"
                width="110"
                v-if="warehouseInshow.show14"
                label="售价金额">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.shop_price"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="120"
                v-if="warehouseInshow.show15"
                label="分店名">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.subshop_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="120"
                v-if="warehouseInshow.show17"
                label="制单人姓名">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.admin_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="warehouseInshow.show16"
                label="备注">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.remark"/>
                    </template>
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                width="120"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="edit(scope.row)">保存修改</el-button>
                        <el-button type="text" size="small" @click="check(scope.row)">审核</el-button>
                        <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
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
import {warehouseIn,warehouseInDe,warehouseInAdd,warehouseInEd,warehouseCh} from '../../api/apiW' ;
export default {
    inject: ['reload'],
    data() {
        return {
            pages:1,
            dialogServeAdd:false,
            dialogServeDetail:false,
            dialogShow:false,
            record_count:0,
            warehouseInshow:{
                show1:false,
                show2:false,
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
                show13:false,
                show14:true,
                show15:true,
                show16:true,
                show17:true,
            },
            formServe:{
                name:"",
                marks:""
            },
            search:'',
            search3:['2017-7-7','2019-9-9'],
            radio:"4",
            value: '' ,
            value1: '' ,
            value2: '' ,
            value3: '' ,
            value4: '' ,
            formServeAdd:{},
            formServeDetail:{},
            warehouseInData:[],
            options: [{
            value: '0',
            label: '中心1'
            }, {
            value: '1',
            label: '中心2'
            },],  
            options1: [{
            value1: '0',
            label: '未退货'
            }, {
            value1: '1',
            label: '已退货'
            },],
            options2: [{
            value2: '0',
            label: '0分店'
            }, {
            value2: '1',
            label: '1分店'
            },],
            options3: [{
            value3: '0',
            label: '分公司1'
            }, {
            value3: '1',
            label: '分公司2'
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
        init(page){
            let data=this.$qs.stringify({
                page:page,
                page_size:10,
            });
            this.data(data); 
        },
        data(data){
            warehouseIn(data).then(res=>{
                console.log(res.data);
                this.record_count=Number(res.data.filter.record_count);
                this.warehouseInData=res.data.ware_list;
            }); 
        },
        chose(){
            let data=this.$qs.stringify({
                page:1,
                page_size:10,
                time_by:this.radio,
                add_time1:this.search3[0],
                add_time2:this.search3[1],
                to_shipping_name:this.value,
                status:this.value1,
                subshop_id:this.value2,
                son_company:this.value3,
                subshop_type:this.value4,
            });
            this.data(data); 
        },
        handleClose(done){
            done();
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            erpTableSetting.warehouseIn=this.warehouseInshow;
            localStorage.erpTableSetting=JSON.stringify(erpTableSetting);
        }, 
        dateConverter(str) { //-----------------------日期转秒数
            var arr = str.split(/[-:\/]/);
            var startDate = Date.parse(new Date(arr[0], arr[1]-1, arr[2]))/1000;
            return startDate;
        },
        serveSearch() {//--------------搜索
            console.log("开启搜索");
        },        
        reset() {
            this.reload();
        },
        handleCurrentChange(val) {
            this.init(val);          
        },
        showDetails(row){//--------------详情
            let dataD = this.$qs.stringify({
                id:row.id
            });
            warehouseInDe(dataD).then(res=>{
                console.log(res.data);
                this.formServeDetail=res.data;
            });
        },
        edit(row){//--------------修改
            row.require_handle_time=this.dateConverter(row.require_handle_time);
            row.check_time=this.dateConverter(row.check_time);
            row.handle_time=this.dateConverter(row.handle_time);
            let dataE=this.$qs.stringify(row);
            warehouseInEd(dataE).then(res=>{
                console.log(res.errno);
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
            })
        },
        add(){//--------------添加
            this.formServeAdd.require_handle_time=this.dateConverter(this.formServeAdd.require_handle_time);
            this.formServeAdd.check_time=this.dateConverter(this.formServeAdd.check_time);
            this.formServeAdd.handle_time=this.dateConverter(this.formServeAdd.handle_time);
            let dataA=this.$qs.stringify(this.formServeAdd);
            warehouseInAdd(dataA).then(res=>{
                if(res.errno==0){
                    this.$alert(res.errmsg)
                    this.reload();
                }else{
                    this.$alert(res.errmsg)
                }
            })
        },
        check(row){//------------------审核
            if(row.status=="未审核"){
                let dataC=this.$qs.stringify({
                    id:row.id,
                    status:1
                });
                warehouseCh(dataC).then(res=>{
                    console.log(res);
                    this.reload();
                });
            }else if(row.status=="已审核"){
                let dataC=this.$qs.stringify({
                    id:row.id,
                    status:0
                });
                warehouseCh(dataC).then(res=>{
                    console.log(res);
                    this.reload();
                });
            }
            
        },
        deleteRow(row) {//--------------删除
            let Message=confirm("确定删除此行数据？");
            if(Message){
                let data=this.$qs.stringify({
                    id:row.id,
                    is_delete:1
                }); 
                warehouseInEd(data).then(res=>{
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
            if(erpTableSetting.warehouseIn!==undefined){
                this.warehouseInshow=erpTableSetting.warehouseIn;
            }
        }else{
            console.log("no");
        }; 
        this.init(1);
    }
}
</script>
<style scoped>
.warehouseInstructions{
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
.el-input >>> .el-input__inner{
    border:none;
    text-align:center;
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
</style>