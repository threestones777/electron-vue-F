<template>
    <div class="shippingSetting">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>调拨</el-breadcrumb-item>
                <el-breadcrumb-item>配送设置</el-breadcrumb-item>
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
                    <el-button type="primary" size="small" @click="dialogServeAdd = true">新增</el-button>
                    <el-button type="primary" size="small" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form>
            <!-- 新增弹出框 -->
            <el-dialog width="450px" title="新增" :visible.sync="dialogServeAdd">
                <el-form :model="formServeDetail"><!-- 
                    <el-form-item label="配送设置id">
                        <el-input v-model="formServeAdd.id" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="分站id">
                        <el-input v-model="formServeAdd.subsite_id" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="店铺id">
                        <el-input v-model="formServeAdd.subshop_id" disabled></el-input>
                    </el-form-item> -->
                    <el-form-item align="left">
                        <el-checkbox label="申请审核时将申请量赋值给发货量"  v-model="formServeAdd.apply_give_fahuo" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="调货申请时必须要总部审批才有效"  v-model="formServeAdd.zongbu_check" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="调货申请，15天内未到的商品提醒"  v-model="formServeAdd.weidao_tixing" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="调货申请时允许申请量大于最高库存量"  v-model="formServeAdd.apply_gt_max" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="调货申请时允许选择所有仓库"  v-model="formServeAdd.choose_all_store" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="调货申请时允许申请数量超过库存库存量"  v-model="formServeAdd.apply_gt_kucun" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="调货申请时允许门店查看参考"  v-model="formServeAdd.view_cankao" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="收货时允许量大于发货量"  v-model="formServeAdd.sh_gt_fahuo" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="仓库发货审核时，收货门店自动收货审核"  v-model="formServeAdd.store_auto_sh_check" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="门店发货审核时收货店自动收货审核"  v-model="formServeAdd.shop_auto_sh_check" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="发货审核时将发货量赋值给收货量"  v-model="formServeAdd.fahuo_give_shouhuo" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="发货时，允许发货量大于申请量"  v-model="formServeAdd.fahuo_gt_apply" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="发货时，当配送价低于成本价提示"  v-model="formServeAdd.ship_lt_chengben_ts" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="发货时，当配送价低于成本价允许审核"  v-model="formServeAdd.ship_lt_chengben_check" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="发货时，直掉出库单价允许修改（配送价不是成本价时）"  v-model="formServeAdd.allow_edit" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="配送发货时必须先出库检验才可出库审核"  v-model="formServeAdd.chuku_test" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="配送收货时必须先收货检验才可以收货审核"  v-model="formServeAdd.shouhuo_test" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="直调出库显示收货库存数量"  v-model="formServeAdd.show_sh_kucun" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="直调出库显示发货库存数量"  v-model="formServeAdd.show_fh_kucun" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="直调出库，允许选择所有分店"  v-model="formServeAdd.choose_all_subshop" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="调货申请单有效天数，最大60天，0表示不过期"  v-model="formServeAdd.effective_days" true-label="0" false-label="1"/>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeAdd = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="add(),dialogServeAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 详情弹出框 -->
            <el-dialog width="450px" title="详情" :visible.sync="dialogServeDetail">
                <el-form :model="formServeDetail">
                    <!-- <el-form-item label="配送设置id">
                        <el-input v-model="formServeDetail.id" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="分站id">
                        <el-input v-model="formServeDetail.subsite_id" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="店铺id">
                        <el-input v-model="formServeDetail.subshop_id" disabled></el-input>
                    </el-form-item> -->
                    <el-form-item align="left">
                        <el-checkbox label="申请审核时将申请量赋值给发货量"  v-model="formServeDetail.apply_give_fahuo" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="调货申请时必须要总部审批才有效"  v-model="formServeDetail.zongbu_check" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="调货申请，15天内未到的商品提醒"  v-model="formServeDetail.weidao_tixing" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="调货申请时允许申请量大于最高库存量"  v-model="formServeDetail.apply_gt_max" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="调货申请时允许选择所有仓库"  v-model="formServeDetail.choose_all_store" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="调货申请时允许申请数量超过库存库存量"  v-model="formServeDetail.apply_gt_kucun" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="调货申请时允许门店查看参考"  v-model="formServeDetail.view_cankao" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="收货时允许量大于发货量"  v-model="formServeDetail.sh_gt_fahuo" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="仓库发货审核时，收货门店自动收货审核"  v-model="formServeDetail.store_auto_sh_check" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="门店发货审核时收货店自动收货审核"  v-model="formServeDetail.shop_auto_sh_check" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="发货审核时将发货量赋值给收货量"  v-model="formServeDetail.fahuo_give_shouhuo" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="发货时，允许发货量大于申请量"  v-model="formServeDetail.fahuo_gt_apply" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="发货时，当配送价低于成本价提示"  v-model="formServeDetail.ship_lt_chengben_ts" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="发货时，当配送价低于成本价允许审核"  v-model="formServeDetail.ship_lt_chengben_check" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="发货时，直掉出库单价允许修改（配送价不是成本价时）"  v-model="formServeDetail.allow_edit" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="配送发货时必须先出库检验才可出库审核"  v-model="formServeDetail.chuku_test" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="配送收货时必须先收货检验才可以收货审核"  v-model="formServeDetail.shouhuo_test" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="直调出库显示收货库存数量"  v-model="formServeDetail.show_sh_kucun" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="直调出库显示发货库存数量"  v-model="formServeDetail.show_fh_kucun" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="直调出库，允许选择所有分店"  v-model="formServeDetail.choose_all_subshop" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="调货申请单有效天数，最大60天，0表示不过期"  v-model="formServeDetail.effective_days" true-label="0" false-label="1"/>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeDetail = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="edit(),dialogServeDetail = false">保存修改</el-button>
                </div>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="shippingSetData"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            style="width: 100%">
                <el-table-column
                prop="id"
                align="center"
                label="配送设置id">                
                </el-table-column>
                <el-table-column
                align="center"
                label="申请审核时将申请量赋值给发货量">
                    <template slot-scope="scope">
                        <span>{{scope.row.apply_give_fahuo==0?"是":"否"}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                label="调货申请时允许选择所有仓库">
                    <template slot-scope="scope">
                        <span>{{scope.row.choose_all_store==0?"是":"否"}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                label="收货时允许量大于发货量">
                    <template slot-scope="scope">
                        <span>{{scope.row.sh_gt_fahuo==0?"是":"否"}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showDetails(scope.row),dialogServeDetail = true">详情</el-button>
                        <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, Data)">删除</el-button>
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
import {shippingSetting,shippingSettingDe,shippingSettingEd,shippingSettingAdd} from '../../api/apiW';
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
            formServeAdd:{
                name:""
            },
            formServeDetail:{},
            shippingSetData:[],
        }
    },
    methods:{
        serveSearch() {
            console.log("开启搜索");
        },        
        reset() {
            this.reload();
        },
        handleCurrentChange(val) {
            console.log(val);          
        },
        showDetails(row){
            console.log(row.id);
            let dataD=this.$qs.stringify({
                id:row.id
            }); 
            shippingSettingDe(dataD).then(res=>{
                console.log(res.data);
                this.formServeDetail=res.data;
            })
        },
        edit(){//-------------------------------修改
            let dataE=this.$qs.stringify(this.formServeDetail);
            shippingSettingEd(dataE).then(res=>{
                console.log(res.errno);
                if(res.errno==0){
                    alert("修改成功");
                    this.reload();
                }else if(res.errno==1){
                    alert("修改失败");
                }
            })
        },
        add(){
            console.log("add");
        },
        deleteRow(row) {
           console.log(row.id);
        }
    },
    created: function () {  
        let dataP=this.$qs.stringify({
            page:1,
            page_size:10,
        }); 
        shippingSetting(dataP).then(res=>{
            this.pages=Math.ceil(res.data.filter.record_count/10);
            console.log(res.data);
            this.shippingSetData=res.data.orders;
        })
    }
}
</script>
<style scoped>
.shippingSetting{
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