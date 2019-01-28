<template>
    <div class="adjustmentOrder">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <!-- <h3>温州美联 管理中心</h3> -->
            <el-breadcrumb style="font-size:18px" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>仓库</el-breadcrumb-item>
                <el-breadcrumb-item>成本调整单</el-breadcrumb-item>
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
                <div @click="add" class="card">
                    <i class="el-icon-plus"></i>
                    <div>新增</div>
                </div>
            </div>
        </div>
        <div class="main-table">
            <fieldset style="margin:10px 0;border-color: #fff;">
                <legend>查询条件</legend>
                <el-row type="flex" justify="space-around" :gutter="10">
                    <el-col style="text-align:left" :span="3">
                        <el-radio-group @change="chose" v-model="radio" style="margin-top:5px;">
                            <el-radio label="add_time">制单日期</el-radio><br>
                            <el-radio label="check_time">审核日期</el-radio><br>
                            <el-radio label="3">不按日期</el-radio>
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
                        <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:0px;" v-model="search"  size="mini"  placeholder="订单号"/>
                        <el-select v-model="value4" size="small" placeholder="分店类型" style="margin-top:5px">
                            <el-option
                            v-for="item in options4"
                            :key="item.value4"
                            :label="item.label"
                            :value="item.value4">
                            </el-option>
                        </el-select> 
                    </el-col>
                    <el-col :span="3">
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
                    <el-col :span="3">
                        <!-- <el-select @change="chose" v-model="value3" size="small" placeholder="分公司">
                            <el-option
                            v-for="item in options3"
                            :key="item.value3"
                            :label="item.label"
                            :value="item.value3">
                            </el-option>
                        </el-select>  -->
                        <!-- <el-select v-model="value4" size="small" placeholder="分店类型" style="margin-top:5px">
                            <el-option
                            v-for="item in options4"
                            :key="item.value4"
                            :label="item.label"
                            :value="item.value4">
                            </el-option>
                        </el-select>  -->
                    </el-col>
                    <el-col :span="3">
                        <!-- <el-button type="primary" size="small" @click="reset">刷新</el-button><br>
                        <el-button type="primary" size="small" style="margin-top:5px" @click="add">新增单据</el-button>
                        <el-button icon="el-icon-tickets"  style="margin-top:5px" type="primary" size="small" @click="dialogShow=true">显示列</el-button> -->
                    </el-col>
                    <el-col :span="4"></el-col>
                </el-row>
            </fieldset>
            <!-- 按需选择列弹窗 -->
            <el-dialog
            title="按需选择列" class="chose" style="text-align:left"
            :visible.sync="dialogShow"
            :before-close="handleClose"
            width="200px">
                <el-checkbox v-model="adjustmentshow.show1">制单日期</el-checkbox><br>
                <el-checkbox v-model="adjustmentshow.show2">调整单编号</el-checkbox><br>
                <el-checkbox v-model="adjustmentshow.show3">调整人</el-checkbox><br>
                <el-checkbox v-model="adjustmentshow.show4">调整原因</el-checkbox><br>
                <el-checkbox v-model="adjustmentshow.show5">分店名称</el-checkbox><br>
                <el-checkbox v-model="adjustmentshow.show6">审核状态</el-checkbox><br>
                <el-checkbox v-model="adjustmentshow.show7">审核人</el-checkbox><br>
                <el-checkbox v-model="adjustmentshow.show10">制单日期</el-checkbox><br>
                <el-checkbox v-model="adjustmentshow.show8">审核日期</el-checkbox><br>
                <el-checkbox v-model="adjustmentshow.show9">备注</el-checkbox><br><br>
            </el-dialog>  
            <!-- <el-form :inline="true" :model="formServe" class="demo-form-inline">
                <el-form-item>
                    <el-input placeholder="请输入调整单编号" @input="search" v-model="keywords" style="width:50%;margin-right:10px" size="small">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                    <el-button type="primary" size="small" @click="add">新增单据</el-button>
                    <el-button type="primary" size="small" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form> -->
            <!--增改商品弹出框 -->
            <el-dialog width="900px" title="增改商品" :visible.sync="dialogServeAdd">
                <!-- 全局商品列表弹出卡片 -->
                <el-popover
                    placement="left"
                    v-model="visible"
                    trigger="click">
                    <!-- 商品搜索 -->
                    <el-form :inline="true" :model="formGoods" class="demo-form-inline">
                        <el-form-item label="">
                            <el-input size="small" v-model="formGoods.add_time1" placeholder="名称"></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-input size="small" v-model="formGoods.bill_sn" placeholder="编号"></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-input size="small" v-model="formGoods.status" placeholder="状态"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="small" @click="goodsSearch">搜索</el-button>
                        </el-form-item>
                    </el-form>
                    <!-- 商品表格 -->
                    <el-table
                    :row-style="{height:0}"
                    :cell-style="{padding:0}"
                    :header-row-style="{height:0}"  
                    :header-cell-style="{padding:0}"
                    @selection-change="handleSelectionChange"
                    border
                    v-loading="loading2"
                    :data="goodsList">
                        <el-table-column type="selection"></el-table-column>
                        <el-table-column show-overflow-tooltip prop="goods_name" align="center" label="商品名称"></el-table-column>
                        <el-table-column prop="goods_sn" align="center" label="商品编号"></el-table-column>
                        <el-table-column prop="shop_price" align="center" label="商品价格"></el-table-column>
                        <el-table-column prop="cat_name" align="center" label="分类名"></el-table-column>
                        <el-table-column show-overflow-tooltip prop="brand_name" align="center" label="品牌名"></el-table-column>
                        <el-table-column prop="goods_number" align="center" label="库存"></el-table-column>
                    </el-table>
                    <!-- 分页器 -->
                    <el-pagination
                        @current-change="handleCurrentChange2"
                        layout="total,prev,pager,next,jumper"
                        :page_size="page_size2"
                        :total="total2">
                    </el-pagination>
                    <el-button class="btn-b" type="primary" @click="getDone" size="small">确认</el-button>
                    <el-button class="btn-t" slot="reference" @click="getList" type="primary" size="small">新增商品</el-button>
                </el-popover>
                <el-table
                    :data="bn_goodsList"
                    border
                    :row-style="{height:0}"  
                    :cell-style="{padding:0}"
                    :header-row-style="{height:0}"  
                    :header-cell-style="{padding:0}"
                    style="width: 100%">
                    <el-table-column
                    prop="goods_name"
                    align="center"
                    show-overflow-tooltip
                    label="商品名称">
                    </el-table-column>
                    <el-table-column
                    prop="product_sn"
                    align="center"
                    label="商品编号">
                    </el-table-column>
                    <el-table-column
                    prop="subshop_name"
                    align="center"
                    label="店铺名称">
                    </el-table-column>
                    <el-table-column
                    prop="attr_value"
                    align="center"
                    label="默认属性">
                    </el-table-column>
                    <el-table-column
                    prop="price"
                    align="center"
                    label="调整价格">
                    <template slot-scope="scope">
                        <el-input-number size="small" :controls="false" :precision="2" v-model="scope.row.price" :min="0"></el-input-number>
                        <!-- <el-input size="small" v-model.number="scope.row.price"></el-input> -->
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="cat_name"
                    align="center"
                    label="分类名">
                    </el-table-column>
                    <el-table-column
                    prop="brand_name"
                    align="center"
                    label="品牌名">
                    </el-table-column>
                    <el-table-column
                    prop="tiaozheng_number"
                    align="center"
                    label="调整数量">
                    <template slot-scope="scope">
                        <el-input-number size="small" :controls="false" v-model="scope.row.tiaozheng_number" :min="0"></el-input-number>
                        <!-- <el-input size="small" v-model.number="scope.row.tiaozheng_number"></el-input> -->
                    </template>
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    align="center"
                    width="120"
                    label="相关操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="editGoods(scope.row)">提交修改</el-button>
                            <el-button type="text" size="small" @click="deleteGoods(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table><br><br>
            </el-dialog>
            <!-- 新增/修改单据弹出框 -->
            <el-dialog width="840px" title="单据操作" :visible.sync="dialogServeDetail">
                <el-form label-position="right" ref="form" :model="formServeDetail" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="调整原因">
                                <el-input v-model="formServeDetail.reason" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="分店名称">
                                <el-input v-model="formServeDetail.subshop_name" autocomplete="off"></el-input>
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
                    <el-button @click="dialogServeDetail = false">取 消</el-button>
                    <el-button type="primary" @click="editDone('form')">保存</el-button>
                </div>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="Data.filter(data =>  {
            return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1})})"
            border stripe
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            v-loading="loading"
            style="width: 100%">
                <el-table-column
                prop="add_time"
                align="center"
                v-if="adjustmentshow.show1"
                label="制单日期">
                </el-table-column>
                <el-table-column
                prop="bill_sn"
                align="center"
                v-if="adjustmentshow.show2"
                label="调整单编号">
                </el-table-column>
                <el-table-column
                prop="adminid"
                align="center"
                v-if="adjustmentshow.show3"
                label="调整人">
                    <template slot-scope="scope">
                        <span>{{scope.row.adminid}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="reason"
                align="center"
                width="150"
                v-if="adjustmentshow.show4"
                label="调整原因">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.reason"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="subshop_name"
                align="center"
                v-if="adjustmentshow.show5"
                label="分店名称">
                </el-table-column>
                <el-table-column
                prop="status"
                align="center"
                v-if="adjustmentshow.show6"
                label="审核状态">
                </el-table-column>
                <el-table-column
                prop="check_user"
                align="center"
                v-if="adjustmentshow.show7"
                label="审核人">
                </el-table-column>
                <el-table-column
                prop="add_time"
                align="center"
                v-if="adjustmentshow.show10"
                label="制单日期">
                </el-table-column>
                <el-table-column
                prop="check_time"
                align="center"
                v-if="adjustmentshow.show8"
                label="审核日期">
                </el-table-column>
                <el-table-column
                prop="remark"
                align="center"
                v-if="adjustmentshow.show9"
                label="备注">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.remark"/>
                    </template>
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                width="140"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="addGoods(scope.row)">增改商品</el-button>
                        <el-button type="text" size="small" @click="edit(scope.row)">修改单据</el-button>
                        <el-button type="text" size="small" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
                        <el-button type="text" size="small" @click="changeStatus(scope.row)">{{scope.row.status=="未审核"?"审核":"反审核"}}</el-button>
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
  getAdjustmentorderList,
  getAdjustmentorderDetail,
  addAdjustmentorder,
  editAdjustmentorder,
  getAdjustmentorderGoodsList,
  addAdjustmentorderGoods,
  editAdjustmentorderGoods,
  delAdjustmentorderGoods,
  checkAdjustmentorder,
  getGoodsList
} from "../../api/api";
export default {
    inject: ['reload'],
    data() {
        return {
            page: 1,
            page_size: 10,
            loading: true,
            total: 0,
            page2: 1,
            page_size2: 10,
            loading2: true,
            total2: 0,
            isEdit: false,
            visible:false,
            dialogServeAdd:false,
            dialogServeDetail:false,
            dialogShow:false,
            adjustmentshow:{
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
            },
            keywords:'',
            formServe:{}, // 单据搜索
            formGoods:{},// 全局商品搜索
            formServeDetail:{}, //单据详情
            bn_goodsList:[],// 单据拥有的商品列表数据
            Data:[], // 单据列表数据
            bn_id:'', // 将要增改的单据id
            goodsList:[], // 供选择的全局商品列表拘束
            selectedGoods:[], // 选中的商品
            search:'',
            search3:['2017-7-7','2019-9-9'],
            radio:"3",
            value: '' ,
            value1: '' ,
            value2: '' ,
            value3: '' ,
            value4: '' ,
            options1: [{
            value1: '0',
            label: '未审核'
            }, {
            value1: '1',
            label: '已审核'
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
        handleClose(done){
            done();
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            erpTableSetting.adjustment=this.adjustmentshow;
            localStorage.erpTableSetting=JSON.stringify(erpTableSetting);
        },
        initData(obj) {
            // 获取列表
            let data = {
                subsite_id: 3,
                user_id: sessionStorage.user_id,
                page: this.page,
                page_size: this.page_size
            };
            if(obj) {
                data = Object.assign(data,obj)
            }
            let tmpData = this.$qs.stringify(data)
            this.data(tmpData);
        },
        data(data){
            getAdjustmentorderList(data).then(res => {
                console.log(res.data);
                if (res.errno == 0) {
                this.Data = res.data.orders;
                this.total = Number(res.data.record_count);
                this.loading = false;
                }
            }); 
        },
        chose(){
            let data=this.$qs.stringify({
                subsite_id: 3,
                user_id: sessionStorage.user_id,
                page: 1,
                page_size: 10,
                time_by:this.radio,
                add_time1:this.search3[0],
                add_time2:this.search3[1],
                status:this.value1,
                subshop_id:this.value2,
                son_company:this.value3,
                subshop_type:this.value4,
            });
            this.data(data);
        },
        getList() { //---------------获取全局商品列表
            let data = {
                subsite_id: 3,
                user_id: sessionStorage.user_id,
                page: this.page2,
                page_size: this.page_size2
            };
            getGoodsList({params:data}).then(res=>{
                console.log(res.data)
                if(res.errno == 0) {
                    this.goodsList = res.data.goods;
                    this.total2 = Number(res.data.record_count);
                    this.loading2 = false;
                }
            })
        },
        getDone() { // 将选中的商品添加至该单据拥有的商品列表中
            let data = this.$qs.stringify({
                id:this.bn_id,
                goods_ids : JSON.stringify(this.selectedGoods)
            });
            addAdjustmentorderGoods(data).then(res=>{
                if(res.errno == 0) {
                    this.addGoods()
                    this.visible = false
                }else {
                    this.$message({
                        type: "error",
                        message: res.errmsg,
                        duration: 1000
                    });
                }
            })
        },
        addGoods(v) { // 获取单据内商品列表
            if(v) {
                this.bn_id = v.id
            }
            let data = this.$qs.stringify({
                id:this.bn_id
            });
            getAdjustmentorderGoodsList(data).then(res=>{
                console.log(res)
                if(res.errno == 0) {
                    this.bn_goodsList = res.data
                }
            })
            this.dialogServeAdd = true
        },
        changeStatus(v) { // 更改审核状态
            let data = this.$qs.stringify({
                id:v.id,
                status:v.status=="未审核"?1:0
            });
            checkAdjustmentorder(data).then(res=>{
                if (res.errno == 0) {
                    this.$message({
                    type: "success",
                    message: "操作成功!",
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
        },
        goodsSearch() { // 商品搜索

        },
        editGoods(row) { // 更改商品信息
            if(row.price==0 || !row.price || row.tiaozheng_number==0) {
                this.$message({
                    type: "error",
                    message: "不能为0或空值!",
                    duration: 1000
                });
                return
            }
            let data = this.$qs.stringify({
                bill_sn:row.bill_sn,
                goods_id : row.goods_id,
                price:row.price,
                tiaozheng_number:row.tiaozheng_number
            });
            console.log(data)
            editAdjustmentorderGoods(data).then(res=>{
                if(res.errno ==0) {
                    this.addGoods()
                }
            })
        },
        add() { // 打开 添加单据 弹出框
            this.isEdit = false;
            this.formServeDetail = {};
            if (this.$refs.form) {
                this.$refs.form.resetFields();
            }
            this.dialogServeDetail = true;
        },
        edit(row){
            let Data = this.$qs.stringify(row);
            editAdjustmentorder(Data).then(res=>{
                console.log(res);
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
        editDone(formName) { // 添加/编辑 单据
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.isEdit) {
                        // this.formServeDetail.status = 0;
                        // this.formServeDetail.add_time = parseInt(new Date() / 1000);
                        // this.formServeDetail.check_time = parseInt(new Date() / 1000);
                        let tmpData = this.$qs.stringify(this.formServeDetail);
                        editAdjustmentorder(tmpData).then(res => {
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
                        // this.formServeDetail.status = 0;
                        // this.formServeDetail.adminid = 2;
                        // this.formServeDetail.check_user = 2;
                        // this.formServeDetail.add_time = parseInt(new Date() / 1000);
                        // this.formServeDetail.check_time = parseInt(new Date() / 1000);
                        let tmpData = this.$qs.stringify(this.formServeDetail);
                        addAdjustmentorder(tmpData).then(res => {
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
        handleSelectionChange(v) { // 商品选择
            let arr = []
            v.forEach((v,i)=>{
                arr.push(v.goods_id)
            })
            this.selectedGoods = arr
        },
        serveSearch() { // 单据搜索
            if(this.formServe.time) {
                this.formServe.add_time1 = parseInt(this.formServe.time[0]/1000)
                this.formServe.add_time2 = parseInt(this.formServe.time[1]/1000)
            }
            this.initData(this.formServe)
        },        
        reset() { // 刷新
            this.reload();
        },
        handleCurrentChange(val) { // 分页
            this.page = val;
            this.initData()
        },
        handleCurrentChange2(val) { // 全局商品列表分页
            this.page2 = val;
            this.getList();
        },
        showDetails(row){ // 单据详情
            this.isEdit = true;
            let data = this.$qs.stringify({ id: row.id });
            getAdjustmentorderDetail(data).then(res => {
                if (res.errno == 0) {
                this.formServeDetail = res.data;
                // this.formServeDetail.shop_price = res.data.shop_price.substring(1);
                // this.formServeDetail.time = [+new Date(this.formServeDetail.start_time),+new Date(this.formServeDetail.end_time)];
                }
            });
        },
        deleteRow(index, rows) { // 删除单据
            this.$confirm("即将执行删除操作, 确认删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                console.log(rows.id)
                let tmpData = this.$qs.stringify({is_delete:0,id:rows.id})
                editAdjustmentorder(tmpData)
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
        },
        deleteGoods(row) { // 删除单据内商单个商品
            let tmpData = this.$qs.stringify({bill_sn:row.bill_sn,goods_id:row.goods_id})
            delAdjustmentorderGoods(tmpData).then(res=>{
                if(res.errno ==0) {
                    this.$message({
                        type: "success",
                        message: "删除成功!",
                        duration: 1000
                    });
                    this.addGoods();
                }
            })
        }
    },
    created() {
        if(localStorage.erpTableSetting!==undefined){
            console.log("yes");
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting); 
            if(erpTableSetting.adjustment!==undefined){
                this.adjustmentshow=erpTableSetting.adjustment;
            }
        }else{
            console.log("no"); 
        };
        this.initData();
    }
}
</script>
<style scoped>
.adjustmentOrder{
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
.adjustmentOrder >>> .el-dialog__body {
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
.btn-t {
    float: right;
    margin: 0 0 10px 0;
}
.btn-b {
    float: right;
    margin: 10px 0 0 0;
}
</style>