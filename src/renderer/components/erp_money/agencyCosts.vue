<template>
    <div class="agencyCosts">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>资金</el-breadcrumb-item>
                <el-breadcrumb-item>机构费用</el-breadcrumb-item>
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
                <div>
                    <el-radio :label="0">修改日期</el-radio>
                    <el-radio :label="1">审核日期</el-radio>
                </div>
                <div>
                    <el-radio :label="2">开始日期</el-radio>
                    <el-radio :label="3">结束日期</el-radio>
                </div>
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
                        <el-form-item label="单号">
                        <el-input size="mini" v-model="formServe.user"></el-input>
                        </el-form-item>
                        <el-form-item label="费用描述">
                        <el-select size="mini" v-model="formServe.staus">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="合同号">
                        <el-input size="mini" v-model="formServe.user"></el-input>
                        </el-form-item>
                        <el-form-item label="机构">
                            <el-input size="mini" v-model="formServe.user">
                                <i class="el-icon-more" slot="append"></i>
                            </el-input>
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
                        <el-select size="mini" v-model="formServe.staus">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
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
                            <el-radio :label="1">修改日期</el-radio><br>
                            <el-radio :label="2">审核日期</el-radio><br>
                            <el-radio :label="3">开始日期</el-radio>
                        </el-radio-group>    
                    </el-col>
                    <el-col style="text-align:left" :span="3">
                        <el-radio-group v-model="radio" style="margin-top:5px;">
                            <el-radio :label="4">结束日期</el-radio><br>
                            <el-radio :label="5">不按日期</el-radio><br>
                        </el-radio-group>    
                    </el-col>
                    <el-col :span="5">
                        <el-date-picker
                        v-model="search3" size="small"
                        style="width:100%;margin-bottom:5px"
                        type="daterange"
                        align="right"
                        unlink-panels
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                        <el-select v-model="value1" size="small" placeholder="状态">
                            <el-option
                            v-for="item in options1"
                            :key="item.value1"
                            :label="item.label"
                            :value="item.value1">
                            </el-option>
                        </el-select> 
                    </el-col>
                    <el-col :span="3">
                        <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="search"  size="mini"  placeholder="单号"/>
                        <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="search"  size="mini"  placeholder="合同号"/>
                    </el-col>
                    <el-col :span="3">
                        <el-select v-model="value" size="small" placeholder="费用描述">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select> 
                        <el-input  prefix-icon="el-icon-search" style="width:100%;margin-top:5px;" v-model="search"  size="mini"  placeholder="机构"/>
                    </el-col>
                    <el-col :span="3">
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
                    <el-col :span="4">
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
                <el-checkbox v-model="agencyCostshow.show1">单号</el-checkbox><br>
                <el-checkbox v-model="agencyCostshow.show2">店名</el-checkbox><br>
                <el-checkbox v-model="agencyCostshow.show3">费用描述</el-checkbox><br>
                <el-checkbox v-model="agencyCostshow.show4">合同号</el-checkbox><br>
                <el-checkbox v-model="agencyCostshow.show5">开始日期</el-checkbox><br>
                <el-checkbox v-model="agencyCostshow.show6">结束日期</el-checkbox><br>
                <el-checkbox v-model="agencyCostshow.show7">状态</el-checkbox><br>
                <el-checkbox v-model="agencyCostshow.show8">修改日期</el-checkbox><br>
                <el-checkbox v-model="agencyCostshow.show9">修改人</el-checkbox><br>
                <el-checkbox v-model="agencyCostshow.show10">审核时间</el-checkbox><br>
                <el-checkbox v-model="agencyCostshow.show11">备注</el-checkbox><br><br>
            </el-dialog>
            <!-- 搜索 -->
            <!-- <el-form :inline="true" :model="formServe" class="demo-form-inline">
                <el-form-item>
                    <el-input placeholder="请输入单号" @input="search" v-model="keywords" style="width:50%;margin-right:10px" size="small">
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
            <el-dialog width="810px" title="机构费用" :visible.sync="dialogServeDetail">
                <el-form :disabled="formServeDetail.status=='已审核'" label-position="left" ref="form" :model="formServeDetail">
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
                            <el-form-item label="修改人">
                                <el-input disabled v-model="formServeDetail.admin_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="费用描述">
                                <el-input v-model="formServeDetail.fee_desc" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item class="time" label="起止日期" prop="time" :rules="rule">
                                <el-date-picker
                                v-model="formServeDetail.time"
                                type="daterange"
                                range-separator="至"
                                value-format="timestamp"
                                format="yyyy 年 MM 月 dd 日"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="合同号">
                                <el-input v-model="formServeDetail.hetong_sn" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="状态">
                                <el-input disabled v-model="formServeDetail.status" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="修改日期">
                                <el-input disabled v-model="formServeDetail.add_time" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="审核时间">
                                <el-input disabled v-model="formServeDetail.check_time" autocomplete="off"></el-input>
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
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            v-loading="loading"
            style="width: 100%">
                <el-table-column
                prop="bill_sn"
                align="center"
                v-if="agencyCostshow.show1"
                label="单号">
                </el-table-column>
                <el-table-column
                prop="subshop_name"
                align="center"
                v-if="agencyCostshow.show2"
                label="店名">
                </el-table-column>
                <el-table-column
                prop="fee_desc"
                align="center"
                v-if="agencyCostshow.show3"
                label="费用描述">
                </el-table-column>
                <el-table-column
                prop="hetong_sn"
                align="center"
                v-if="agencyCostshow.show4"
                label="合同号">
                </el-table-column>
                <el-table-column
                prop="start_time"
                align="center"
                v-if="agencyCostshow.show5"
                label="开始日期">
                </el-table-column>
                <el-table-column
                prop="end_time"
                align="center"
                v-if="agencyCostshow.show6"
                label="结束日期">
                </el-table-column>
                <el-table-column
                prop="status"
                align="center"
                v-if="agencyCostshow.show7"
                label="状态">
                </el-table-column>
                <el-table-column
                prop="add_time"
                align="center"
                v-if="agencyCostshow.show8"
                label="修改日期">
                </el-table-column>
                <el-table-column
                prop="admin_name"
                align="center"
                v-if="agencyCostshow.show9"
                label="修改人">
                </el-table-column>
                <el-table-column
                prop="check_time"
                align="center"
                v-if="agencyCostshow.show10"
                label="审核时间">
                </el-table-column>
                <el-table-column
                prop="remark"
                align="center"
                v-if="agencyCostshow.show11"
                label="备注">
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作"
                width="90">
                    <template slot-scope="scope">
                        <el-button  :disabled="scope.row.status=='已审核'" type="text" size="small" @click="showDetails(scope.row),dialogServeDetail=true">保存修改</el-button>
                        <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, scope.row)">删除</el-button>
                        <el-button :disabled="scope.row.status=='已审核'" type="text" size="small" @click.native.prevent="checkRow(scope.row)">审核</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
                @current-change="handleCurrentChange"
                layout="total,prev, pager, next,jumper"
                :page_size="page_size"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {
  getAgencycostsList,
  getAgencycostsDetail,
  addAgencycosts,
  editAgencycosts,
  checkAgencycosts
} from "../../api/api";
export default {
    data() {
        return {
            page:1,
            page_size:10,
            total:0,
            isEdit:false,
            loading:true,
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
            agencyCostshow:{
                show1:true,
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
            options: [{
            value: '选项1',
            label: '未审核'
            }, {
            value: '选项2',
            label: '已审核'
            },],
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
            erpTableSetting.agencyCost=this.agencyCostshow;
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
        initData() { // 获取列表
            let data = this.$qs.stringify({
                subsite_id:3,
                user_id:sessionStorage.user_id,
                page:this.page,
                page_size:this.page_size
            })
            getAgencycostsList(data).then(res=>{
                console.log(res.data)
                if(res.errno == 0) {
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
        edit(row){
            let data=this.$qs.stringify(row);
            editAgencycosts(data).then(res=>{
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
            });
        },
        editDone(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                if (this.isEdit) {
                    this.formServeDetail.status = 0;
                    this.formServeDetail.add_time = parseInt(new Date() / 1000);
                    this.formServeDetail.check_time = parseInt(new Date() / 1000);
                    this.formServeDetail.start_time = parseInt(this.formServeDetail.time[0] / 1000);
                    this.formServeDetail.end_time = parseInt(this.formServeDetail.time[1] / 1000);
                    let tmpData = this.$qs.stringify(this.formServeDetail);
                    editAgencycosts(tmpData).then(res => {
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
                    this.formServeDetail.status = 0;
                    this.formServeDetail.adminid = 2;
                    this.formServeDetail.check_user = 2;
                    this.formServeDetail.add_time = parseInt(new Date() / 1000);
                    this.formServeDetail.check_time = parseInt(new Date() / 1000);
                    this.formServeDetail.start_time = parseInt(this.formServeDetail.time[0] / 1000);
                    this.formServeDetail.end_time = parseInt(this.formServeDetail.time[1] / 1000);
                    let tmpData = this.$qs.stringify(this.formServeDetail);
                    addAgencycosts(tmpData).then(res => {
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
        /* search() {
            let data=this.$qs.stringify({
                page:1,
                page_size:10,
                bill_sn:this.keywords
            });
            getAgencycostsList(data).then(res=>{
                console.log(res.data)
                if(res.errno == 0) {
                    this.Data = res.data.orders
                    this.total = Number(res.data.record_count)
                    this.loading = false
                }
            })
        },  */       
        reset() {
            this.initData()
        },
        handleCurrentChange(val) {
            this.page = val
            this.initData()   
        },
        checkRow(row) {
            this.$confirm("审核后将无法对该条目进行任何编辑删除操作, 确认审核吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(() => {
                let tmpData = this.$qs.stringify({ id: row.id });
                checkAgencycosts(tmpData).then(res=>{
                    if (res.errno == 0) {
                        this.$message({
                            type: "success",
                            message: "审核成功!",
                            duration: 1000
                        });
                    } else {
                        this.$message({
                            type: "error",
                            message: res.errmsg,
                            duration: 1000
                        });
                    }
                    this.initData();
                })
            })
            .catch(res => {
                console.log("用户取消删除");
            });
            
        },
        showDetails(row){
            this.isEdit = true;
            let data = this.$qs.stringify({ id: row.id });
            getAgencycostsDetail(data).then(res => {
                if (res.errno == 0) {
                this.formServeDetail = res.data;
                this.formServeDetail.time = [+new Date(this.formServeDetail.start_time),+new Date(this.formServeDetail.end_time)];
                }
            });
        },
        deleteRow(index, rows) {
            this.$confirm("即将执行删除操作, 确认删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(() => {
            console.log(rows.id);
            let tmpData = this.$qs.stringify({ is_delete: 1, id: rows.id });
            editAgencycosts(tmpData).then(res => {
                if (res.errno == 0) {
                this.$message({
                    type: "success",
                    message: "删除成功!",
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
            });
            })
            .catch(res => {
            console.log("用户取消删除");
            });
        }
    },
    created() {
        if(localStorage.erpTableSetting!==undefined){
            console.log("yes");
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting); 
            if(erpTableSetting.agencyCost!==undefined){
                this.agencyCostshow=erpTableSetting.agencyCost;
            }
        }else{
            console.log("no");
        };
        this.initData()
    }
}
</script>
<style scoped>
.agencyCosts{
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
  width: 220px;
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
/* .el-radio-group {
  display: flex;
} */
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


/* 分页器 */
.el-pagination {
  padding: 20px 0;
  text-align: right;
}

/* 新增弹出框 & 详情弹出框*/
.agencyCosts >>> .el-dialog__body {
  padding: 0 20px;
}
.main-table >>> .el-dialog__body .el-form-item__content {
  width: 180px;
  text-align: right;
}
.main-table >>> .el-dialog__body .el-form-item.time .el-form-item__content {
    width: 80%;
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