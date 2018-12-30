<template>
    <div class="adjustmentOrder">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>仓库</el-breadcrumb-item>
                <el-breadcrumb-item>成本调整单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <fieldset style="margin:10px 0;border-color: #fff;">
                <legend>查询条件</legend>
                <el-row type="flex" justify="space-around" :gutter="10">
                    <el-col style="text-align:left" :span="3">
                        <el-radio-group v-model="radio" style="margin-top:5px;">
                            <el-radio :label="1">制单日期</el-radio><br>
                            <el-radio :label="2">审核日期</el-radio><br>
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
                        <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="search"  size="mini"  placeholder="订单号"/>
                    </el-col>
                    <el-col :span="4">
                        <el-select v-model="value1" size="small" placeholder="状态">
                            <el-option
                            v-for="item in options1"
                            :key="item.value1"
                            :label="item.label"
                            :value="item.value1">
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
                        <el-select v-model="value3" size="small" placeholder="分公司">
                            <el-option
                            v-for="item in options3"
                            :key="item.value3"
                            :label="item.label"
                            :value="item.value3">
                            </el-option>
                        </el-select> 
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
                        <el-button type="primary" size="small" @click="reset">刷新</el-button><br>
                        <el-button icon="el-icon-tickets"  style="margin-top:5px" type="primary" size="small" @click="dialogShow=true">显示列</el-button>
                    </el-col>
                </el-row>
            </fieldset>
                
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
                    placement="bottom"
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
                        layout="total,prev, pager, next,jumper"
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
            :data="Data"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            v-loading="loading"
            style="width: 100%">
                <el-table-column
                prop="add_time"
                align="center"
                label="制单日期">
                </el-table-column>
                <el-table-column
                prop="bill_sn"
                align="center"
                label="调整单编号">
                </el-table-column>
                <el-table-column
                prop="admin_name"
                align="center"
                label="调整人">
                </el-table-column>
                <el-table-column
                prop="reason"
                align="center"
                label="调整原因">
                </el-table-column>
                <el-table-column
                prop="subshop_name"
                align="center"
                label="分店名称">
                </el-table-column>
                <el-table-column
                prop="remark"
                align="center"
                label="备注">
                </el-table-column>
                <el-table-column
                prop="status"
                align="center"
                width="80"
                label="审核状态">
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                width="140"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="addGoods(scope.row)">增改商品</el-button>
                        <el-button type="text" size="small" @click="showDetails(scope.row),dialogServeDetail = true">修改单据</el-button>
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
            options4: [{
            value4: '选项1',
            label: '类型1'
            }, {
            value4: '选项2',
            label: '类型2'
            },],
        }
    },
    methods:{
        /* search() {
            let data=this.$qs.stringify({
                bill_sn:this.keywords
            });
            getAdjustmentorderList(data).then(res => {
                console.log(res.data);
                if (res.errno == 0) {
                    this.Data = res.data.orders;
                    this.total = Number(res.data.record_count);
                    this.loading = false;
                }
            });
        }, */
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
            getAdjustmentorderList(tmpData).then(res => {
                console.log(res.data);
                if (res.errno == 0) {
                this.Data = res.data.orders;
                this.total = Number(res.data.record_count);
                this.loading = false;
                }
            });
        },
        getList() { // 获取全局商品列表
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
        this.formServe = {}
            this.initData();
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
        this.initData();
    }
}
</script>
<style scoped>
.adjustmentOrder{
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