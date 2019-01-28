<template>
    <div class="supplierPayAnalysis">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>资金</el-breadcrumb-item>
                <el-breadcrumb-item>供应商账期分析</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!-- 搜索条件区域 -->
        <!-- <div class="search-area">
        <fieldset>
            <legend>查询条件</legend>
            <div class="out-box">
            <fieldset class="date-radio">
                <legend>日期类型</legend>
                <el-radio-group v-model="radio">
                    <el-radio :label="0">单据审核日期</el-radio>
                    <el-radio :label="1">应结日期</el-radio>
                    <el-radio :label="2">不按日期</el-radio>
                </el-radio-group>
            </fieldset>
            <div class="content-r">
                <div class="date-area">
                <el-date-picker
                    v-model="timeValue"
                    type="daterange"
                    range-separator="~"
                    size="small"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                ></el-date-picker>
                </div>
                <el-form :inline="true" :model="formServe">
                <div>
                    <el-form-item label="供应商">
                    <el-input size="mini" v-model="formServe.user">
                        <i class="el-icon-more" slot="append"></i>
                    </el-input>
                    </el-form-item>
                    <el-form-item label="类型">
                    <el-select size="mini" v-model="formServe.staus">
                        <el-option label="类型一" value="shanghai"></el-option>
                        <el-option label="类型二" value="beijing"></el-option>
                    </el-select>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="分公司">
                    <el-select size="mini" v-model="formServe.region">
                        <el-option label="公司一" value="0"></el-option>
                        <el-option label="公司二" value="2"></el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="分店">
                    <el-select size="mini" v-model="formServe.region">
                        <el-option label="分店一" value="0"></el-option>
                        <el-option label="分店二" value="2"></el-option>
                    </el-select>
                    </el-form-item>
                </div>
                </el-form>
            </div>
            </div>
        </fieldset>
        </div> -->

        <div class="main-table">
            <fieldset style="margin:10px 0;border-color: #fff;">
                <legend>查询条件</legend>
                <el-row type="flex" justify="space-around" :gutter="10">
                    <el-col style="text-align:left" :span="3">
                        <el-radio-group v-model="radio" style="margin-top:5px;">
                            <el-radio :label="1">单据审核日期</el-radio><br>
                            <el-radio :label="2">应结日期</el-radio><br>
                            <el-radio :label="4">不按日期</el-radio>
                        </el-radio-group>    
                    </el-col>
                    <el-col :span="5">
                        <el-date-picker
                        v-model="search3" size="small"
                        style="width:100%;margin-top:0px"
                        type="daterange"
                        align="right"
                        unlink-panels
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </el-col>
                    <el-col :span="4">
                        <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="search"  size="mini"  placeholder="供应商"/>
                        <el-select v-model="value1" size="small" placeholder="类型">
                            <el-option
                            v-for="item in options1"
                            :key="item.value1"
                            :label="item.label"
                            :value="item.value1">
                            </el-option>
                        </el-select> 
                    </el-col>
                    <el-col :span="4">
                        <el-select v-model="value3" size="small" placeholder="分公司">
                            <el-option
                            v-for="item in options3"
                            :key="item.value3"
                            :label="item.label"
                            :value="item.value3">
                            </el-option>
                        </el-select> 
                        <el-select v-model="value2" size="small" placeholder="分店" style="margin-top:5px">
                            <el-option
                            v-for="item in options2"
                            :key="item.value2"
                            :label="item.label"
                            :value="item.value2">
                            </el-option>
                        </el-select>
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
                <el-checkbox v-model="supplierPayshow.show1">单号</el-checkbox><br>
                <el-checkbox v-model="supplierPayshow.show2">供应商</el-checkbox><br>
                <el-checkbox v-model="supplierPayshow.show3">店名</el-checkbox><br>
                <el-checkbox v-model="supplierPayshow.show4">应付金额</el-checkbox><br>
                <el-checkbox v-model="supplierPayshow.show5">已付金额</el-checkbox><br>
                <el-checkbox v-model="supplierPayshow.show6">已优惠金额</el-checkbox><br>
                <el-checkbox v-model="supplierPayshow.show7">未付金额</el-checkbox><br>
                <el-checkbox v-model="supplierPayshow.show8">应结日期</el-checkbox><br>
                <el-checkbox v-model="supplierPayshow.show9">最近收款日期</el-checkbox><br>
                <el-checkbox v-model="supplierPayshow.show10">供应商id</el-checkbox><br>
                <el-checkbox v-model="supplierPayshow.show11">备注</el-checkbox><br><br>
            </el-dialog>
            <!-- 搜索 -->
            <!-- <el-form :inline="true" :model="formServe" class="demo-form-inline">
                <el-form-item>
                    <el-input placeholder="请输入供应商id" @input="search" v-model="keywords" style="width:50%;margin-right:10px" size="small">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                    <el-button type="primary" size="small" @click="add">新增</el-button>
                    <el-button type="primary" size="small" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form> -->
            <!-- 新增弹出框 -->
            <el-dialog width="450px" title="新增" :visible.sync="dialogServeAdd">
                <el-form :model="formServeAdd">
                    <el-form-item label="编号">
                        <el-input v-model="formServeAdd.price"></el-input>
                    </el-form-item>
                    <el-form-item label="备注信息">
                        <el-input v-model="formServeAdd.servePrice"></el-input>
                    </el-form-item>                    
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogServeAdd = false">取 消</el-button>
                    <el-button type="primary" @click="dialogServeAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 详情弹出框 -->
            <el-dialog width="900px" title="客户信息" :visible.sync="dialogServeDetail">
                <el-form label-position="left" ref="form" :model="formServeDetail" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="单号">
                                <el-input v-model="formServeDetail.bill_sn" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="店名">
                                <el-input v-model="formServeDetail.subshop_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="供应商">
                                <el-input v-model="formServeDetail.supplier_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="应付金额" prop="yingfu_price" :rules="rule">
                                <el-input-number v-model="formServeDetail.yingfu_price" :precision="2" :min="0"></el-input-number>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="已付金额" prop="yifu_price" :rules="rule">
                                <el-input-number v-model="formServeDetail.yifu_price" :precision="2" :min="0"></el-input-number>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="已优惠金额" prop="discount_price" :rules="rule">
                                <el-input-number v-model="formServeDetail.discount_price" :precision="2" :min="0"></el-input-number>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="未付金额" prop="weifu_price" :rules="rule">
                                <el-input-number v-model="formServeDetail.weifu_price" :precision="2" :min="0"></el-input-number>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="应结日期">
                                <el-input disabled v-model="formServeDetail.yingjie_time" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="最近收款日期">
                                <el-input disabled v-model="formServeDetail.near_shoukuan_time" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="修改人">
                                <el-input disabled v-model="formServeDetail.admin_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="备注">
                                <el-input v-model="formServeDetail.remark" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeDetail = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="editDone('form')">保存</el-button>
                </div>
            </el-dialog>


            <!-- 显示列和排序模块 -->
            <div style="text-align:right">
                <el-button @click="dialogColumnDiy=true" size="small" icon="el-icon-tickets">显示列</el-button>
                <el-dropdown :hide-on-click="false" @command="handleCommand">
                <el-button size="small" icon="el-icon-sort">排序
                    <i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <div class="ddd">
                    <div class="ccc">
                        <el-dropdown-item command="0">
                        <i v-show="sortSelected==0" class="el-icon-check el-icon--left"></i>更新时间
                        </el-dropdown-item>
                        <el-dropdown-item command="1">
                        <i v-show="sortSelected==1" class="el-icon-check el-icon--left"></i>录入时间
                        </el-dropdown-item>
                        <el-dropdown-item command="2">
                        <i v-show="sortSelected==2" class="el-icon-check el-icon--left"></i>利润
                        </el-dropdown-item>
                        <el-dropdown-item command="3">
                        <i v-show="sortSelected==3" class="el-icon-check el-icon--left"></i>总数量
                        </el-dropdown-item>
                        <el-dropdown-item command="4">
                        <i v-show="sortSelected==4" class="el-icon-check el-icon--left"></i>状态
                        </el-dropdown-item>
                        <el-dropdown-item command="5">
                        <i v-show="sortSelected==5" class="el-icon-check el-icon--left"></i>付款方式
                        </el-dropdown-item>
                        <el-dropdown-item command="6">
                        <i v-show="sortSelected==6" class="el-icon-check el-icon--left"></i>其他
                        </el-dropdown-item>
                        <div class="aaa">
                        <el-dropdown-item divided command="0">
                            <i v-show="defaultSort==0" class="el-icon-check el-icon--left"></i>顺序
                        </el-dropdown-item>
                        <el-dropdown-item command="1">
                            <i v-show="defaultSort==1" class="el-icon-check el-icon--left"></i>倒叙
                        </el-dropdown-item>
                        </div>
                    </div>
                    </div>
                </el-dropdown-menu>
                </el-dropdown>
            </div>

            <!-- 显示列弹窗 -->
            <el-dialog
                class="columnDialog"
                width="300px"
                title="自定义显示列"
                v-dialogDrag
                :visible.sync="dialogColumnDiy"
            >
                <el-table :data="columnData" style="width: 100%">
                <el-table-column width="60" align="center" label="显示">
                    <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.isChecked"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="列名"></el-table-column>
                </el-table>
            </el-dialog>

            <!-- 表格 -->
            <el-table
            :data="Data"
            border stripe
            show-summary
            :row-style="{height:0}"  
            :cell-style="{padding:3}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            v-loading="loading"
            style="width: 100%">
                <el-table-column
                align="center"
                width="190"
                v-if="supplierPayshow.show1"
                label="单号">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.bill_sn"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="130"
                v-if="supplierPayshow.show2"                
                label="供应商">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.supplier_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="supplierPayshow.show3"
                label="店名">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.subshop_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="yingfu_price"
                align="center"
                v-if="supplierPayshow.show4"
                label="应付金额">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.yingfu_price"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="yifu_price"
                align="center"
                v-if="supplierPayshow.show5"
                label="已付金额">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.yifu_price"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="discount_price"
                align="center"
                v-if="supplierPayshow.show6"
                label="已优惠金额">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.discount_price"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="weifu_price"
                align="center"
                v-if="supplierPayshow.show7"
                label="未付金额">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.weifu_price"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="130"
                v-if="supplierPayshow.show8"
                label="应结日期">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.yingjie_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="130"
                v-if="supplierPayshow.show9"
                label="最近收款日期">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.near_shoukuan_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="supplierPayshow.show10"
                label="供应商id">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.supplier_id"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="130"
                v-if="supplierPayshow.show11"
                label="备注">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.remark"/>
                    </template>
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作"
                width="120">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="edit(scope.row)">保存修改</el-button>
                        <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
                @current-change="handleCurrentChange"
                layout="total,prev,pager,next,jumper"
                :page_size="page_size"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {
  getSupplierpayanalysisList,
  getSupplierpayanalysisDetail,
  addSupplierpayanalysis,
  editSupplierpayanalysis
} from "../../api/api";
export default {
    data() {
        return {
            page:1,
            page_size:10,
            total:0,
            loading:true,
            isEdit:false,
            sortSelected: 0, // 排序hover框上部份 默认按第一个排序
            defaultSort: 0, // 排序hover框下部份 默认顺序排序
            radio: 0, // 筛选日期默认选项
            timeValue: "", // 起止时间
            dialogColumnDiy: false, // 自定义显示列弹窗
            columnData: [
                // 自定义列的数据
                {
                name: "单号",
                prop: "bill_sn",
                isChecked: true
                },
                {
                name: "费用代码",
                prop: "fee_code",
                isChecked: true
                },
                {
                name: "费用名称",
                prop: "fee_name",
                isChecked: true
                },
                {
                name: "机构名称",
                prop: "jigou_name",
                isChecked: false
                }
            ],
            dialogServeAdd:false,
            dialogServeDetail:false,
            dialogShow:false,
            supplierPayshow:{
                show1:true,
                show2:true,
                show3:true,
                show4:true,
                show5:true,
                show6:true,
                show7:true,
                show8:true,
                show9:true,
                show10:false,
                show11:true,
            },
            keywords:'',
            formServe:{
                name:"",
                marks:""
            },
            formServeAdd:{
                name:""
            },
            formServeDetail:{
                
            },
            Data:[],
            rule: [{ required: true, message: "不能为空" }],
            search:'',
            search3:['2017-7-7','2019-9-9'],
            radio:4,
            value: '' ,
            value1: '' ,
            value2: '' ,
            value3: '' ,
            value4: '' ,
            options1: [{
            value1: '选项1',
            label: '未审核'
            }, {
            value1: '选项2',
            label: '已审核'
            },],
            options2: [{
            value2: '选项1',
            label: '0分店'
            }, {
            value2: '选项2',
            label: '1分店'
            },],
            options3: [{
            value3: '选项1',
            label: '分公司1'
            }, {
            value3: '选项2',
            label: '分公司2'
            },],
        }
    },
    methods:{
        handleClose(done){
            done();
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            erpTableSetting.supplierPay=this.supplierPayshow;
            localStorage.erpTableSetting=JSON.stringify(erpTableSetting);
        },
        changeColumn() {
            this.columnData = this.columnData;
            console.log(this.columnData);
        },
        handleCommand(e) {
            console.log(e);
            this.sortSelected = e;
        },
        initData() { //------------------------获取列表
            let data = this.$qs.stringify({
                subsite_id:3,
                user_id:sessionStorage.user_id,
                page:this.page,
                page_size:this.page_size
            })
            getSupplierpayanalysisList(data).then(res=>{
                console.log(res.data)
                if(res.errno == 0) {
                   for(let i=0;i<res.data.orders.length;i++){
                       res.data.orders[i].yingfu_price=res.data.orders[i].yingfu_price.replace(/^￥/,"");
                       res.data.orders[i].yifu_price=res.data.orders[i].yifu_price.replace(/^￥/,"");
                       res.data.orders[i].discount_price=res.data.orders[i].discount_price.replace(/^￥/,"");
                       res.data.orders[i].weifu_price=res.data.orders[i].weifu_price.replace(/^￥/,"");
                   }; 
                    this.Data = res.data.orders
                    this.total = Number(res.data.record_count)
                    this.loading = false
                }
            })
        },
        add() {
            this.isEdit = false;
            this.formServeDetail = {};
            if (this.$refs.form) {
                this.$refs.form.resetFields();
            }
            this.dialogServeDetail = true;
            },
            dateConverter(str) { //-----------------------日期转秒数
                var arr = str.split(/[- : \/]/);
                var startDate = Date.parse(new Date(arr[0], arr[1]-1, arr[2]))/1000;
                return startDate;
            },
            edit(row){//-------------------------------修改
                if(row.yingjie_time!==""){
                    row.yingjie_time=this.dateConverter(row.yingjie_time);
                }else{
                    row.yingjie_time=new Date().getTime()/1000-86400;
                }
                if(row.near_shoukuan_time!==""){
                    row.near_shoukuan_time=this.dateConverter(row.near_shoukuan_time);
                }else{
                    row.near_shoukuan_time=new Date().getTime()/1000-86400;
                }
                let data=this.$qs.stringify(row);
                editSupplierpayanalysis(data).then(res=>{
                    if (res.errno == 0) {
                        this.$message({
                            type: "success",
                            message: "修改成功!",
                            duration: 1000
                        });
                        this.initData();
                    } else {
                        this.$message({
                            type: "error",
                            message: res.errmsg,
                            duration: 1000
                        });
                        this.initData();
                    }
                });
            },
            editDone(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                if (this.isEdit) {
                    this.formServeDetail.yingjie_time = parseInt(new Date() / 1000);
                    this.formServeDetail.near_shoukuan_time = parseInt(new Date() / 1000);
                    let tmpData = this.$qs.stringify(this.formServeDetail);
                    editSupplierpayanalysis(tmpData).then(res => {
                    if (res.errno == 0) {
                        this.$message({
                        type: "success",
                        message: "修改成功!",
                        duration: 1000
                        });
                        this.initData();
                    } else {
                        this.$message({
                        type: "error",
                        message: res.errmsg,
                        duration: 1000
                        });
                    }
                    this.dialogServeDetail = false;
                    });
                } else {
                    this.formServeDetail.adminid = 2;
                    this.formServeDetail.supplier_id = 2;
                    this.formServeDetail.yingjie_time = parseInt(new Date() / 1000);
                    this.formServeDetail.near_shoukuan_time = parseInt(new Date() / 1000);
                    let tmpData = this.$qs.stringify(this.formServeDetail);
                    addSupplierpayanalysis(tmpData).then(res => {
                    if (res.errno == 0) {
                        this.$message({
                        type: "success",
                        message: "添加成功!",
                        duration: 1000
                        });
                        this.initData();
                    } else {
                        this.$message({
                        type: "error",
                        message: res.errmsg,
                        duration: 1000
                        });
                    }
                    this.dialogServeDetail = false;
                    });
                }
                }
            });
        },   
        reset() {
            this.initData()
        },
        handleCurrentChange(val) {
            this.page = val
            this.initData()   
        },
        showDetails(row){
            this.isEdit = true
            let data = this.$qs.stringify({id:row.id})
            getSupplierpayanalysisDetail(data).then(res=>{
                if(res.errno == 0) {
                    this.formServeDetail = res.data
                    this.formServeDetail.yingfu_price = res.data.yingfu_price.substring(1);
                    this.formServeDetail.yifu_price = res.data.yifu_price.substring(1);
                    this.formServeDetail.discount_price = res.data.discount_price.substring(1);
                    this.formServeDetail.weifu_price = res.data.weifu_price.substring(1);
                }
            })
        },
        deleteRow(index, data) {
            this.$confirm("即将执行删除操作, 确认删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                let tmpData = this.$qs.stringify({is_delete:1})
                editSupplierpayanalysis(tmpData)
                .then(res => {
                    if (res.errno == 0) {
                    this.$message({
                        type: "success",
                        message: "删除成功!",
                        duration: 1000
                    });
                    this.initData();
                    }
                })
            }).catch(res => {
                console.log("用户取消删除");
            })
        }
    },
    created() {
        if(localStorage.erpTableSetting!==undefined){
            console.log("yes");
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting); 
            if(erpTableSetting.supplierPay!==undefined){
                this.supplierPayshow=erpTableSetting.supplierPay;
            }
        }else{
            console.log("no");
        };
        this.initData()
    }
}
</script>
<style scoped>
.supplierPayAnalysis{
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

/* 搜索操作 */
fieldset {
  border-color: #fff;
  padding: 0 0 6px 6px;
}
.out-box {
  display: flex;
  align-items: center;
}
.search-area {
  margin: 10px 0;
}
.date-radio {
  width: 120px;
}
.date-area {
  width: 220px;
}
.content-r,
/* .el-form {
  display: flex;
  align-items: center;
} */
.content-r .el-form {
  flex-wrap: wrap;
  flex: 1;
}
.content-r .el-form > div {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.content-r >>> .el-input {
  width: 120px;
}
.content-r >>> .el-input-group__append {
  width: 30px;
  padding: 0;
}
.out-box .content-r .el-form-item {
  margin: 0;
  margin-left: 20px;
  text-align: center;
}
.el-date-editor {
  width: 100% !important;
}
.el-radio-group {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.date-radio .el-radio {
  margin-left: 0;
  line-height: 24px;
}
.main-table .el-form {
  padding-top: 10px;
  text-align: center;
}
.el-form .el-form-item {
  margin-bottom: 10px;
}

/* 显示列和排序 */
.ddd {
  position: relative;
  height: 200px;
}
.ccc {
  height: 200px;
  overflow: auto;
  text-align: left;
}

.aaa {
  width: 100%;
  position: absolute;
  bottom: 0;
  transform: translateY(100%);
  background: #fff;
}
.el-dropdown-menu__item {
  padding: 0;
  position: relative;
  padding: 0 20px;
}
.ccc i,
.aaa .el-dropdown-menu__item i {
  position: absolute;
  left: 4%;
  top: 50%;
  transform: translateY(-50%);
}
.agencyTransaction >>> .columnDialog .el-dialog__body {
  padding: 0;
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
.supplierPayAnalysis >>> .el-dialog__body {
  padding: 0 20px;
}
.main-table >>> .el-dialog__body .el-form-item__content {
  width: 180px;
  text-align: right;
}

.main-table >>> .el-dialog__body .el-form-item {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.main-table >>> .el-dialog__body .el-form-item .el-form-item__label {
  flex: 1;
  box-sizing: border-box;
  padding: 0;
  padding-left: 10px;
  text-align: left;
}
.main-table >>> .el-dialog__body .el-date-editor,
.main-table >>> .el-dialog__body .el-input-number {
  width: 100%;
}
.el-row{
    background:#F3F3F3;
    width:100%;
}

</style>