<template>
    <div class="storeDirectApplications">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <!-- <h3>温州美联 管理中心</h3> -->
            <el-breadcrumb style="font-size:18px" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>调拨</el-breadcrumb-item>
                <el-breadcrumb-item>店间直调申请</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="operate-in">
                <!-- <div>
                <i class="el-icon-circle-plus"></i>
                <div>增加</div>
                </div>
                <div>
                <i class="el-icon-edit"></i>
                <div>编辑</div>
                </div>
                <div>
                <i class="el-icon-remove"></i>
                <div>删除</div>
                </div>
                <div>
                <i class="el-icon-circle-check"></i>
                <div>保存</div>
                </div>
                <div>
                <i class="el-icon-circle-close"></i>
                <div>取消</div>
                </div>
                <div>
                <i class="el-icon-view"></i>
                <div>审核</div>
                </div> 
                <div class="card">
                <i class="el-icon-search"></i>
                <div>查询</div>
                </div>
                <div class="card">
                <i class="el-icon-setting"></i>
                <div>功能</div>
                <b class="el-icon-caret-bottom"></b>
                </div>
                <div class="card">
                <i class="el-icon-printer"></i>
                <div>打印</div>
                <b class="el-icon-caret-bottom"></b>
                </div>
                <div class="card">
                <i class="el-icon-menu"></i>
                <div>设置</div>
                </div>
                <div class="card">
                <i class="el-icon-zoom-in"></i>
                <div>高级查询</div>
                </div>
                <div class="card">
                <el-dropdown trigger="click" placement="bottom" @command="handleExport">
                    <div class="card-title">
                    <i class="el-icon-download"></i>
                    <div>导入/导出</div>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="in">导入</el-dropdown-item>
                    <el-dropdown-item command="xlsx-out">导出为excel</el-dropdown-item>
                    <el-dropdown-item command="csv-out">导出为csv</el-dropdown-item>
                    <el-dropdown-item command="txt-out">导出为txt</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <b class="el-icon-caret-bottom"></b>
                </div>-->
                <div @click="reset" class="card">
                    <i class="el-icon-loading"></i>
                    <div>刷新</div>
                </div>
                <div @click="dialogShow=true" class="card">
                    <i class="el-icon-tickets"></i>
                    <div>显示列</div>
                </div>
                <div @click="dialogServeAdd=true" class="card">
                    <i class="el-icon-plus"></i>
                    <div>新增</div>
                </div>
            </div>

        </div>
        <div class="main-table">
            <fieldset style="margin:10px 0;border-color:#fff;text-align:left">
                <legend>查询条件</legend>
                <el-row type="flex" justify="space-around" :gutter="10">
                    <el-col style="text-align:left" :span="3">
                        <el-radio-group @change="chose" v-model="radio" style="margin-top:5px;">
                            <el-radio label="apply_time">申请日期</el-radio><br>
                            <el-radio label="fahuo_time">发货日期</el-radio><br>
                            <el-radio label="shouhuo_time">收货日期</el-radio>
                        </el-radio-group>    
                    </el-col>
                    <el-col style="text-align:left" :span="3">
                        <el-radio-group @change="chose" v-model="radio" style="margin-top:5px;">
                        <el-radio label="arrival_time">要求到货日期</el-radio><br>
                        <el-radio label="5">不按日期</el-radio>
                    </el-radio-group>    
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
                        <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="search"  size="mini"  placeholder="订单号"/>
                        <el-select @change="chose" v-model="value" size="small" placeholder="申请状态" style="margin-bottom:5px;">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3">
                        <el-select @change="chose" v-model="value1" size="small" placeholder="发货状态">
                            <el-option
                            v-for="item in options1"
                            :key="item.value1"
                            :label="item.label" 
                            :value="item.value1">
                            </el-option>
                        </el-select> 
                        <el-select @change="chose" v-model="value2" size="small" placeholder="收货状态" style="margin-top:5px">
                            <el-option
                            v-for="item in options2"
                            :key="item.value2"
                            :label="item.label"
                            :value="item.value2">
                            </el-option>
                        </el-select> 
                    </el-col>
                    <el-col :span="3">
                        <el-select @change="chose" v-model="value3" size="small" placeholder="发货分店">
                            <el-option
                            v-for="item in options3"
                            :key="item.value3"
                            :label="item.label"
                            :value="item.value3">
                            </el-option>
                        </el-select> 
                        <el-select @change="chose" v-model="value4" size="small" placeholder="收货分店" style="margin-top:5px">
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
                        <el-button type="primary"  style="margin-top:5px" size="small" @click="dialogServeAdd=true">新增</el-button><br>
                        <el-button icon="el-icon-tickets"  style="margin-top:5px" type="primary" size="small" @click="dialogShow=true">显示列</el-button> -->
                    </el-col>
                </el-row>				
			</fieldset>
            <!-- 按需选择列弹窗 -->
            <el-dialog
            title="按需选择列" class="chose" style="text-align:left"
            :visible.sync="dialogShow"
            :before-close="handleClose"
            width="200px">
                <el-checkbox v-model="storeDirectApplicationsshow.show1">编号</el-checkbox><br>
                <el-checkbox v-model="storeDirectApplicationsshow.show2">状态</el-checkbox><br>
                <el-checkbox v-model="storeDirectApplicationsshow.show3">发货店号</el-checkbox><br>
                <el-checkbox v-model="storeDirectApplicationsshow.show4">发货店名</el-checkbox><br>
                <el-checkbox v-model="storeDirectApplicationsshow.show5">单据编号</el-checkbox><br>
                <el-checkbox v-model="storeDirectApplicationsshow.show6">单据类型</el-checkbox><br>
                <el-checkbox v-model="storeDirectApplicationsshow.show7">要求到货日期</el-checkbox><br>
                <el-checkbox v-model="storeDirectApplicationsshow.show8">申请人</el-checkbox><br>
                <el-checkbox v-model="storeDirectApplicationsshow.show9">申请时间</el-checkbox><br>
                <el-checkbox v-model="storeDirectApplicationsshow.show10">发货人</el-checkbox><br>
                <el-checkbox v-model="storeDirectApplicationsshow.show11">发货时间</el-checkbox><br>
                <el-checkbox v-model="storeDirectApplicationsshow.show12">收货人</el-checkbox><br>
                <el-checkbox v-model="storeDirectApplicationsshow.show13">收货时间</el-checkbox><br>
                <el-checkbox v-model="storeDirectApplicationsshow.show14">备注</el-checkbox><br><br>
            </el-dialog>
            <!-- 新增弹出框 -->
            <el-dialog width="700px" title="新增" :visible.sync="dialogServeAdd">
                <el-form :model="formServeAdd">
                    <el-form-item>
                        <!-- <el-row type="flex" class="row-bg" justify="space-between">
                            <el-col :span="7" align="center">分站id:<el-input v-model="formServeAdd.subsite_id" disabled></el-input></el-col>
                            <el-col :span="7" align="center">编号:<br/><el-input v-model="formServeAdd.id" disabled></el-input></el-col>
                            <el-col :span="7" align="center">状态:<br/><el-input v-model="formServeAdd.status"></el-input></el-col>
                        </el-row> -->
                    </el-form-item>
                    <el-form-item>
                        <el-row type="flex" class="row-bg" justify="space-between">
                            <el-col :span="7" align="center">发货店号:<el-input v-model="formServeAdd.from_subshop_id" ></el-input></el-col>
                            <el-col :span="7" align="center">发货店名:<el-input v-model="formServeAdd.from_subshop_name" ></el-input></el-col>
                            <el-col :span="7" align="center">收货店号:<el-input v-model="formServeAdd.to_subshop_id"></el-input></el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-row type="flex" class="row-bg" justify="space-between">
                            <el-col :span="7" align="center">收货店名:<el-input v-model="formServeAdd.to_subahop_name" ></el-input></el-col>
                            <el-col :span="7" align="center">单据编号:<el-input v-model="formServeAdd.bill_sn" ></el-input></el-col>
                            <el-col :span="7" align="center">单据类型:<el-input v-model="formServeAdd.type"></el-input></el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-row type="flex" class="row-bg" justify="space-between">
                            <el-col :span="7" align="center">要求到货日期:<el-input v-model="formServeAdd.arrival_time" ></el-input></el-col>
                            <el-col :span="7" align="center">申请人:<el-input v-model="formServeAdd.apply_user" ></el-input></el-col>
                            <el-col :span="7" align="center">申请时间:<el-input v-model="formServeAdd.apply_time"></el-input></el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-row type="flex" class="row-bg" justify="space-between">
                            <el-col :span="7" align="center">发货人:<el-input v-model="formServeAdd.fahuo_user" ></el-input></el-col>
                            <el-col :span="7" align="center">发货时间:<el-input v-model="formServeAdd.fahuo_time" ></el-input></el-col>
                            <el-col :span="7" align="center">收货人:<el-input v-model="formServeAdd.shouhuo_user"></el-input></el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-row type="flex" class="row-bg" justify="space-around">
                            <el-col :span="7" align="center">状态:<br/><el-input v-model="formServeAdd.status"></el-input></el-col>
                            <el-col :span="7" align="center">收货时间:<el-input v-model="formServeAdd.shouhuo_time" ></el-input></el-col>
                            <el-col :span="7" align="center">备注:<br><el-input v-model="formServeAdd.remark" ></el-input></el-col>
                        </el-row>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeAdd = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="add(),dialogServeAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 详情弹窗 -->
            <el-dialog width="700px" title="详情" :visible.sync="dialogServeDetail">
                <el-form :model="formServeDetail">
                    <el-form-item>
                        <!-- <el-row type="flex" class="row-bg" justify="space-between">
                            <el-col :span="7" align="center">分站id:<el-input v-model="formServeDetail.subsite_id" disabled></el-input></el-col>
                            <el-col :span="7" align="center">编号:<br/><el-input v-model="formServeDetail.id" disabled></el-input></el-col>
                            <el-col :span="7" align="center">状态:<br/><el-input v-model="formServeDetail.status"></el-input></el-col>
                        </el-row> -->
                    </el-form-item>
                    <el-form-item>
                        <el-row type="flex" class="row-bg" justify="space-between">
                            <el-col :span="7" align="center">发货店号:<el-input v-model="formServeDetail.from_subshop_id" ></el-input></el-col>
                            <el-col :span="7" align="center">发货店名:<el-input v-model="formServeDetail.from_subshop_name" ></el-input></el-col>
                            <el-col :span="7" align="center">收货店号:<el-input v-model="formServeDetail.to_subshop_id"></el-input></el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-row type="flex" class="row-bg" justify="space-between">
                            <el-col :span="7" align="center">收货店名:<el-input v-model="formServeDetail.to_subahop_name" ></el-input></el-col>
                            <el-col :span="7" align="center">单据编号:<el-input v-model="formServeDetail.bill_sn" ></el-input></el-col>
                            <el-col :span="7" align="center">单据类型:<el-input v-model="formServeDetail.type"></el-input></el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-row type="flex" class="row-bg" justify="space-between">
                            <el-col :span="7" align="center">要求到货日期:<el-input v-model="formServeDetail.arrival_time" ></el-input></el-col>
                            <el-col :span="7" align="center">申请人:<el-input v-model="formServeDetail.apply_user" ></el-input></el-col>
                            <el-col :span="7" align="center">申请时间:<el-input v-model="formServeDetail.apply_time"></el-input></el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-row type="flex" class="row-bg" justify="space-between">
                            <el-col :span="7" align="center">发货人:<el-input v-model="formServeDetail.fahuo_user" ></el-input></el-col>
                            <el-col :span="7" align="center">发货时间:<el-input v-model="formServeDetail.fahuo_time" ></el-input></el-col>
                            <el-col :span="7" align="center">收货人:<el-input v-model="formServeDetail.shouhuo_user"></el-input></el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-row type="flex" class="row-bg" justify="space-around">
                            <el-col :span="7" align="center">收货时间:<el-input v-model="formServeDetail.shouhuo_time" ></el-input></el-col>
                            <el-col :span="7" align="center">备注:<br><el-input v-model="formServeDetail.remark" ></el-input></el-col>
                        </el-row>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeDetail = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="edit(),dialogServeDetail = false">保存修改</el-button>
                </div>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="storeDirectData.filter(data =>  {
            return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1})})"
            border stripe
            show-summary
            :row-style="{height:0}"  
            :cell-style="{padding:3}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            style="width: 100%">
                <el-table-column
                align="center"
                v-if="storeDirectApplicationsshow.show1"
                label="编号">
                    <template slot-scope="scope">
                        <span>{{scope.row.id}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="storeDirectApplicationsshow.show2"
                label="申请状态">
                    <template slot-scope="scope">
                        <span>{{scope.row.apply_status}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="storeDirectApplicationsshow.show3"
                label="发货店号">
                    <template slot-scope="scope">
                        <span>{{scope.row.from_subshop_id}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="130"
                v-if="storeDirectApplicationsshow.show4"
                label="发货店名">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.from_subshop_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                v-if="storeDirectApplicationsshow.show5"
                align="center"
                width="150"
                label="单据编号">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.bill_sn"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="storeDirectApplicationsshow.show6"
                label="单据类型">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.type"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="125"
                v-if="storeDirectApplicationsshow.show7"
                label="要求到货日期">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.arrival_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="110"
                v-if="storeDirectApplicationsshow.show8"
                label="申请人">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.apply_user"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="125"
                v-if="storeDirectApplicationsshow.show9"
                label="申请时间">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.apply_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="storeDirectApplicationsshow.show10"
                label="发货人">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.fahuo_user"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="125"
                v-if="storeDirectApplicationsshow.show11"
                label="发货时间">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.fahuo_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="storeDirectApplicationsshow.show12"
                label="收货人">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.shouhuo_user"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="125"
                v-if="storeDirectApplicationsshow.show13"
                label="收货时间">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.shouhuo_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="storeDirectApplicationsshow.show14"
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
import {storeDirect,storeDirectDe,storeDirectEd,storeDirectAdd} from '../../api/apiW' ;
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
            search3:['2017-7-7','2019-9-9'],
            radio:"5",
            value: '' ,
            value1: '' ,
            value2: '' ,
            value3: '' ,
            value4: '' ,
            storeDirectApplicationsshow:{
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
                show13:false,
                show14:true,
            },
            formServe:{
                name:"",
                marks:""
            },
            formServeAdd:{
                name:""
            },
            formServeDetail:{
                name:""
            },
            storeDirectData:[],
            options: [{
            value: '0',
            label: '已审核'
            }, {
            value: '0',
            label: '未审核'
            },],  
            options1: [{
            value1: '0',
            label: '未发货'
            }, {
            value1: '1',
            label: '已发货'
            },],
            options2: [{
            value2: '0',
            label: '未收货'
            }, {
            value2: '1',
            label: '已收货'
            },],
            options3: [{
            value3: '0',
            label: '发货分店1'
            }, {
            value3: '1',
            label: '发货分店2'
            },],
            options4: [{
            value4: '0',
            label: '收货分店1'
            }, {
            value4: '1',
            label: '收货分店2'
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
            storeDirect(data).then(res=>{
                console.log(res.data);
                this.record_count=Number(res.data.filter.record_count);
                this.storeDirectData=res.data.storedirect_list;
            }); 
        },
        chose(){
            let data=this.$qs.stringify({
                page:1,
                page_size:10,
                time_by:this.radio,
                add_time1:this.search3[0],
                add_time2:this.search3[1],
                apply_status:this.value,
                fahuo_status:this.value1,
                shouhuo_status:this.value2,
                from_subshop_id:this.value3,
                to_subshop_id:this.value4,
            }); 
            this.data(data);
        },
        handleClose(done){
            done();
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            erpTableSetting.storeDirectApplications=this.storeDirectApplicationsshow;
            localStorage.erpTableSetting=JSON.stringify(erpTableSetting);
        }, 
        dateConverter(str) { //-----------------------日期转秒数
            var arr = str.split(/[-:\/]/);
            var startDate = Date.parse(new Date(arr[0], arr[1]-1, arr[2]))/1000;
            return startDate;
        },     
        reset() {
           this.reload();
        },
        handleCurrentChange(val) {
            this.init(val);          
        },
        showDetails(row){//--------------详情
            console.log(row.id);
            let dataD = this.$qs.stringify({
                id:row.id
            });
            storeDirectDe(dataD).then(res=>{
                if(res.errno==0){
                    console.log(res.data);
                    this.formServeDetail=res.data;
                }else{
                    this.dialogServeDetail=false;
                    alert("您查找的用户不存在");
                }
            });
        },
        edit(row){//--------------修改
            row.arrival_time=this.dateConverter(row.arrival_time);
            row.apply_time=this.dateConverter(row.apply_time);
            row.fahuo_time=this.dateConverter(row.fahuo_time);
            row.shouhuo_time=this.dateConverter(row.shouhuo_time);
            row.status=="未审核"?row.status=0:row.status=1;
            let dataE=this.$qs.stringify(row);
            storeDirectEd(dataE).then(res=>{
                console.log(res.errno);
                if(res.errno==0){
                    this.$message({
                        type: "success",
                        message: res.errmsg,
                        duration: 1000
                    });
                    this.init();
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
            this.formServeAdd.arrival_time=this.dateConverter(this.formServeAdd.arrival_time);
            this.formServeAdd.apply_time=this.dateConverter(this.formServeAdd.apply_time);
            this.formServeAdd.fahuo_time=this.dateConverter(this.formServeAdd.fahuo_time);
            this.formServeAdd.shouhuo_time=this.dateConverter(this.formServeAdd.shouhuo_time);
            let dataA=this.$qs.stringify(this.formServeAdd);
            storeDirectAdd(dataA).then(res=>{
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
                storeDirectEd(data).then(res=>{
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
            if(erpTableSetting.storeDirectApplications!==undefined){
                this.storeDirectApplicationsshow=erpTableSetting.storeDirectApplications;
            }
        }else{
            console.log("no");
        };    
        this.init(1);
    }
}
</script>
<style scoped>
.storeDirectApplications{
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
.el-table .el-input >>> .el-input__inner{
    border:none;
    text-align:center;
}
</style>