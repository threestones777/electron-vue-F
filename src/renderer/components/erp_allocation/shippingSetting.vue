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
            <div style="margin:10px 0;text-align:center">
                <el-button icon="el-icon-tickets"  style="float:right;margin-right:20px" type="primary" size="small" @click="dialogShow=true">显示列</el-button>
                <el-input  prefix-icon="el-icon-search" style="width:15%" v-model="search"  size="mini"  placeholder="输入关键字搜索"/>
                <el-button type="primary" size="small" @click="add" icon="el-icon-plus"></el-button>
                <el-button type="primary" size="small" @click="reset">刷新</el-button>
            </div>
            <!-- 按需选择列弹窗 -->
            <el-dialog
            title="按需选择列" class="chose"
            :visible.sync="dialogShow"
            :before-close="handleClose"
            width="400px">
                <el-checkbox v-model="shippingSettingshow.show1">配送设置id</el-checkbox><br>
                <el-checkbox v-model="shippingSettingshow.show2">申请审核时将申请量赋值给发货量</el-checkbox><br>
                <el-checkbox v-model="shippingSettingshow.show3">调货申请时必须要总部审批才有效</el-checkbox><br>
                <el-checkbox v-model="shippingSettingshow.show4">调货申请，15天内未到的商品提醒</el-checkbox><br>
                <el-checkbox v-model="shippingSettingshow.show5">调货申请时允许申请量大于最高库存量</el-checkbox><br>
                <el-checkbox v-model="shippingSettingshow.show6">调货申请时允许选择所有仓库</el-checkbox><br>
                <el-checkbox v-model="shippingSettingshow.show7">调货申请时允许申请数量超过库存库存量</el-checkbox><br>
                <el-checkbox v-model="shippingSettingshow.show8">调货申请时允许门店查看参考</el-checkbox><br>
                <el-checkbox v-model="shippingSettingshow.show9">收货时允许量大于发货量</el-checkbox><br>
                <el-checkbox v-model="shippingSettingshow.show10">仓库发货审核时，收货门店自动收货审核</el-checkbox><br>
                <el-checkbox v-model="shippingSettingshow.show11">门店发货审核时收货店自动收货审核</el-checkbox><br>
                <el-checkbox v-model="shippingSettingshow.show12">发货审核时将发货量赋值给收货量</el-checkbox><br>
                <el-checkbox v-model="shippingSettingshow.show13">发货时，允许发货量大于申请量</el-checkbox><br>
                <el-checkbox v-model="shippingSettingshow.show14">发货时，当配送价低于成本价提示</el-checkbox><br>
                <el-checkbox v-model="shippingSettingshow.show15">发货时，当配送价低于成本价允许审核</el-checkbox><br>
                <el-checkbox v-model="shippingSettingshow.show16">发货时，直掉出库单价允许修改（配送价不是成本价时）</el-checkbox><br>
                <el-checkbox v-model="shippingSettingshow.show17">配送发货时必须先出库检验才可出库审核</el-checkbox><br>
                <el-checkbox v-model="shippingSettingshow.show18">配送收货时必须先收货检验才可以收货审核</el-checkbox><br>
                <el-checkbox v-model="shippingSettingshow.show19">直调出库显示收货库存数量</el-checkbox><br>
                <el-checkbox v-model="shippingSettingshow.show20">直调出库显示发货库存数量</el-checkbox><br>
                <el-checkbox v-model="shippingSettingshow.show21">直调出库，允许选择所有分店</el-checkbox><br>
                <el-checkbox v-model="shippingSettingshow.show21">调货申请单有效天数，最大60天，0表示不过期</el-checkbox><br><br>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="shippingSetData.filter(data =>  {
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
                v-if="shippingSettingshow.show1"
                align="center"
                label="配送设置id">                
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shippingSettingshow.show2"
                label="申请审核时将申请量赋值给发货量">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.apply_give_fahuo" true-label="0" false-label="1"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shippingSettingshow.show3"
                label="调货申请时必须要总部审批才有效">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.zongbu_check" true-label="0" false-label="1"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shippingSettingshow.show4"
                label="调货申请，15天内未到的商品提醒">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.weidao_tixing" true-label="0" false-label="1"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shippingSettingshow.show5"
                label="调货申请时允许申请量大于最高库存量">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.apply_gt_max" true-label="0" false-label="1"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shippingSettingshow.show6"
                label="调货申请时允许选择所有仓库">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.choose_all_store" true-label="0" false-label="1"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shippingSettingshow.show7"
                label="调货申请时允许申请数量超过库存库存量">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.apply_gt_kucun" true-label="0" false-label="1"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shippingSettingshow.show8"
                label="调货申请时允许门店查看参考">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.view_cankao" true-label="0" false-label="1"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shippingSettingshow.show9"
                label="收货时允许量大于发货量">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.sh_gt_fahuo" true-label="0" false-label="1"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shippingSettingshow.show10"
                label="仓库发货审核时，收货门店自动收货审核">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.store_auto_sh_check" true-label="0" false-label="1"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shippingSettingshow.show11"
                label="门店发货审核时收货店自动收货审核">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.shop_auto_sh_check" true-label="0" false-label="1"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shippingSettingshow.show12"
                label="发货审核时将发货量赋值给收货量">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.fahuo_give_shouhuo" true-label="0" false-label="1"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shippingSettingshow.show13"
                label="发货时，允许发货量大于申请量">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.fahuo_gt_apply" true-label="0" false-label="1"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shippingSettingshow.show14"
                label="发货时，当配送价低于成本价提示">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.ship_lt_chengben_ts" true-label="0" false-label="1"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shippingSettingshow.show15"
                label="发货时，当配送价低于成本价允许审核">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.ship_lt_chengben_check" true-label="0" false-label="1"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shippingSettingshow.show16"
                label="发货时，直掉出库单价允许修改（配送价不是成本价时）">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.allow_edit" true-label="0" false-label="1"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shippingSettingshow.show17"
                label="配送发货时必须先出库检验才可出库审核">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.chuku_test" true-label="0" false-label="1"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shippingSettingshow.show18"
                label="配送收货时必须先收货检验才可以收货审核">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.shouhuo_test" true-label="0" false-label="1"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shippingSettingshow.show19"
                label="直调出库显示收货库存数量">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.show_sh_kucun" true-label="0" false-label="1"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shippingSettingshow.show20"
                label="直调出库显示发货库存数量">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.show_fh_kucun" true-label="0" false-label="1"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shippingSettingshow.show21"
                label="直调出库，允许选择所有分店">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.choose_all_subshop" true-label="0" false-label="1"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shippingSettingshow.show22"
                label="调货申请单有效天数，最大60天，0表示不过期">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.effective_days" true-label="0" false-label="1"/>
                    </template>
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="edit(scope.row)">保存修改</el-button>
                        <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.row)">删除</el-button>
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
import {shippingSetting,shippingSettingDe,shippingSettingEd,shippingSettingAdd} from '../../api/apiW';
export default {
    inject: ['reload'],
    data() {
        return {
            pages:1,
            dialogServeAdd:false,
            dialogServeDetail:false,
            dialogShow:false,
            search:'',
            record_count:0,
            formServeAdd:{
                apply_give_fahuo:1,
                zongbu_check:1,
                weidao_tixing:1,
                apply_gt_max:1,
                choose_all_store:1,
                apply_gt_kucun:1,
                view_cankao:1,
                sh_gt_fahuo:1,
                store_auto_sh_check:1,
                shop_auto_sh_check:1,
                fahuo_give_shouhuo:1,
                fahuo_gt_apply:1,
                ship_lt_chengben_ts:1,
                ship_lt_chengben_check:1,
                allow_edit:1,
                chuku_test:1,
                shouhuo_test:1,
                show_sh_kucun:1,
                show_fh_kucun:1,
                choose_all_subshop:1,
                effective_days:1
            },
            formServeDetail:{},
            shippingSetData:[],
            shippingSettingshow:{
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
                show12:true,
                show13:true,
                show14:true,
                show15:true,
                show16:true,
                show17:true,
                show18:true,
                show19:true,
                show20:true,
                show21:true,
                show22:true,
            },
        }
    },
    methods:{
        init(page){
            let dataP=this.$qs.stringify({
                page:page,
                page_size:10,
            }); 
            shippingSetting(dataP).then(res=>{
                this.record_count=Number(res.data.filter.record_count);
                console.log(res.data);
                this.shippingSetData=res.data.orders;
            })
        },
        handleClose(done){
            done();
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            erpTableSetting.shippingSetting=this.shippingSettingshow;
            localStorage.erpTableSetting=JSON.stringify(erpTableSetting);
        },  
        reset() {
            this.reload();
        },
        handleCurrentChange(val) {
            this.init(val);          
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
        edit(row){//-------------------------------修改
            let dataE=this.$qs.stringify(row);
            shippingSettingEd(dataE).then(res=>{
                console.log(res.errno);
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
        add(){
            console.log("add");
            let data=this.$qs.stringify(this.formServeAdd);
            shippingSettingAdd(data).then(res=>{
                console.log(res.errno);
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
        deleteRow(row) {
           let Message=confirm("确定删除此行数据？");
            if(Message){
                let dataD=this.$qs.stringify({                    
                    id:row.id,
                    is_delete:1
                }); 
                shippingSettingEd(dataD).then(res=>{
                    this.$alert("删除成功");
                    this.reload();
                });
            }else{
                this.$alert("删除失败");
            }
        }
    },
    created: function () { 
        if(localStorage.erpTableSetting!==undefined){
            console.log("yes");
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting); 
            if(erpTableSetting.shippingSetting!==undefined){
                this.shippingSettingshow=erpTableSetting.shippingSetting;
            }
        }else{
            console.log("no");
        };
        this.init(1);
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
.chose .el-checkbox{
    margin-bottom:10px;
}
</style>