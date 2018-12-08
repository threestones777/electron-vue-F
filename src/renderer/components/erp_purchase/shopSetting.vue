<template>
    <div class="shopSetting">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>购货</el-breadcrumb-item>
                <el-breadcrumb-item>采购设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <!-- 搜索 -->
            <el-form :inline="true" :model="formServe" class="demo-form-inline">
                <!-- <el-form-item label="">
                    <el-input size="small" v-model="formServe.name" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input size="small" type="tel" v-model="formServe.marks" placeholder="编号"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input size="small" type="tel" v-model="formServe.marks" placeholder="备注信息"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <!-- <el-button type="success" size="small" @click="serveSearch">搜索</el-button> -->
                    <el-button type="primary" size="small" @click="dialogAdd=true">新增</el-button>
                    <el-button type="primary" size="small" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form>
            <!-- 添加弹出框 -->
            <el-dialog width="450px" title="采购设置" :visible.sync="dialogAdd">
                <el-form :model="formAdd">
                    <!-- <el-form-item label="店号">
                        <el-input v-model="formDetail.subshop_id" disabled></el-input>
                    </el-form-item> -->
                    <el-form-item label="有效天数">
                        <el-input v-model="formAdd.valid_days"></el-input>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="必须按照订单采购"  v-model="formAdd.is_accord_order" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="进货价格异常时不显示"  v-model="formAdd.not_show_abnormal" true-label="0" false-label="1"/>
                    </el-form-item>                    
                    <el-form-item align="left">
                        <el-checkbox label="日结时是否自动删除未审核采购订单"  v-model="formAdd.auto_remove_order" true-label="0" false-label="1"/>
                    </el-form-item>                    
                    <el-form-item align="left">
                        <el-checkbox label="日结时是否自动删除未审核采购退货单"  v-model="formAdd.auto_remove_backorder" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="必须按供货商订货" v-model="formAdd.is_accord_supplier" true-label="0" false-label="1"/>
                    </el-form-item>                    
                    <el-form-item align="left">
                        <el-checkbox label="进货价大于成本价时提示"  v-model="formAdd.buy_gt_chengben" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="进货价大于档案进价时提示"  v-model="formAdd.buy_gt_dangan" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="进货价大于成本时不能审核"  v-model="formAdd.buy_gt_chengben_check" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="进货价大于档案进价不能审核"  v-model="formAdd.buy_gt_dangan_check" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="退货数量大于库存时提示"  v-model="formAdd.tuihuo_gt_kucun" true-label="0" false-label="1"/>
                    </el-form-item>                    
                    <el-form-item align="left">
                        <el-checkbox label="退货价格小于成本价时提示"  v-model="formAdd.tuihuo_lt_chengben" true-label="0" false-label="1"/>
                    </el-form-item>                    
                    <el-form-item align="left">
                        <el-checkbox label="采购订单时订货数量不赋值给收货数量"  v-model="formAdd.dinghuo_give_shouhuo" true-label="0" false-label="1"/>
                    </el-form-item>                    
                    <el-form-item align="left">
                        <el-checkbox label="进货价格以商品资料进价为准" v-model="formAdd.by_goods_price" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="进货时默认进价为0，手工输入进价" v-model="formAdd.default_ling" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="进货时手工输入进价" v-model="formAdd.by_hand" true-label="0" false-label="1"/>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="small" @click="dialogAdd = false">取 消</el-button>
                    <el-button size="small" type="primary" @click="add(),dialogAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 详情弹出框 -->
            <el-dialog width="450px" title="采购设置" :visible.sync="dialogServeDetail">
                <el-form :model="formDetail">
                    <!-- <el-form-item label="店号">
                        <el-input v-model="formDetail.subshop_id" disabled></el-input>
                    </el-form-item> -->
                    <el-form-item label="有效天数">
                        <el-input v-model="formDetail.valid_days"></el-input>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="必须按照订单采购"  v-model="formDetail.is_accord_order" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="进货价格异常时不显示"  v-model="formDetail.not_show_abnormal" true-label="0" false-label="1"/>
                    </el-form-item>                    
                    <el-form-item align="left">
                        <el-checkbox label="日结时是否自动删除未审核采购订单"  v-model="formDetail.auto_remove_order" true-label="0" false-label="1"/>
                    </el-form-item>                    
                    <el-form-item align="left">
                        <el-checkbox label="日结时是否自动删除未审核采购退货单"  v-model="formDetail.auto_remove_backorder" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="必须按供货商订货" v-model="formDetail.is_accord_supplier" true-label="0" false-label="1"/>
                    </el-form-item>                    
                    <el-form-item align="left">
                        <el-checkbox label="进货价大于成本价时提示"  v-model="formDetail.buy_gt_chengben" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="进货价大于档案进价时提示"  v-model="formDetail.buy_gt_dangan" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="进货价大于成本时不能审核"  v-model="formDetail.buy_gt_chengben_check" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="进货价大于档案进价不能审核"  v-model="formDetail.buy_gt_dangan_check" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="退货数量大于库存时提示"  v-model="formDetail.tuihuo_gt_kucun" true-label="0" false-label="1"/>
                    </el-form-item>                    
                    <el-form-item align="left">
                        <el-checkbox label="退货价格小于成本价时提示"  v-model="formDetail.tuihuo_lt_chengben" true-label="0" false-label="1"/>
                    </el-form-item>                    
                    <el-form-item align="left">
                        <el-checkbox label="采购订单时订货数量不赋值给收货数量"  v-model="formDetail.dinghuo_give_shouhuo" true-label="0" false-label="1"/>
                    </el-form-item>                    
                    <el-form-item align="left">
                        <el-checkbox label="进货价格以商品资料进价为准" v-model="formDetail.by_goods_price" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="进货时默认进价为0，手工输入进价" v-model="formDetail.default_ling" true-label="0" false-label="1"/>
                    </el-form-item>
                    <el-form-item align="left">
                        <el-checkbox label="进货时手工输入进价" v-model="formDetail.by_hand" true-label="0" false-label="1"/>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="small" @click="dialogServeDetail = false">取 消</el-button>
                    <el-button size="small" type="primary" @click="savEdit(),dialogServeDetail = false">保 存</el-button>
                </div>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="shopSetData"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            style="width: 100%">
                <el-table-column
                prop="subshop_id"
                align="center"
                label="店号">
                </el-table-column>
                <el-table-column
                prop="valid_days"
                align="center"
                label="有效天数">
                </el-table-column>                
                <el-table-column
                align="center"
                label="必须按照订单采购">
                    <template slot-scope="scope">
                        <span>{{scope.row.is_accord_order==0?"是":"否"}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                label="进货价格异常时不显示">
                    <template slot-scope="scope">
                        <span>{{scope.row.not_show_abnormal==0?"是":"否"}}</span>
                    </template>
                </el-table-column>                
                <el-table-column
                align="center"
                label="必须按供货商订货">
                    <template slot-scope="scope">
                        <span>{{scope.row.is_accord_supplier==0?"是":"否"}}</span>
                    </template>
                </el-table-column>                
                <el-table-column
                align="center"
                label="进货价大于成本价时提示">
                    <template slot-scope="scope">
                        <span>{{scope.row.buy_gt_chengben==0?"是":"否"}}</span>
                    </template>
                </el-table-column>                
                <el-table-column
                align="center"
                label="进货价大于档案进价时提示">
                    <template slot-scope="scope">
                        <span>{{scope.row.buy_gt_dangan==0?"是":"否"}}</span>
                    </template>                    
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showDetails(scope.row),dialogServeDetail = true">详情</el-button>
                        <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index,shopSetData)">删除</el-button>
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
import {shopSetting,shopSettingEdit,shopSettingDe,shopSettingAdd} from '../../api/apiW';
export default {
    inject: ['reload'],
    data() {
        return {
            pages:1,
            dialogServeAdd:false,
            dialogServeDetail:false,
            dialogAdd:false,
            formServe:{
                name:"",
                marks:""
            },
            formServeAdd:{
                name:""
            },
            formAdd:{},
            formDetail:{},
            shopSetData:[],
        }
    },
    methods:{       
        add(){
            let data=this.$qs.stringify(this.formAdd);
            shopSettingAdd(data).then(res=>{
                if(res.errno==0){
                    this.$alert(res.errmsg)
                    this.reload();
                }else{
                    this.$alert(res.errmsg)
                }
            });
        },       
        reset() {
            this.reload();
        },
        handleCurrentChange(val) {
            let dataP=this.$qs.stringify({
                page:val,
                page_size:10,
            }); 
            shopSetting(dataC).then(res=>{
                console.log(res.data);
                this.shopSetData=res.data.orders;
            })         
        },
        showDetails(row){
            console.log(row.id);
            let dataD = this.$qs.stringify({
                id:row.id
            });
            shopSettingDe(dataD).then(res=>{
                if(res.errno==0){
                    console.log(res.data);
                    this.formDetail=res.data[0];
                }else{
                    this.dialogServeDetail=false;
                    alert("您查找的用户不存在");
                }
            });
        },
        savEdit(){
            let data =this.$qs.stringify(this.formDetail)
            shopSettingEdit(data).then(res=>{
                console.log(res.errno);
                if(res.errno==0){
                    this.$alert(res.errmsg)
                    this.reload();
                }else{
                    this.$alert(res.errmsg)
                }
            })
        },
        deleteRow(index, rows) {
            let Message=confirm("确定删除此行数据？");
            if(Message){
                rows.splice(index, 1);                
            }else{
                alert("用户取消操作");
            }
            
        }
    },
    created: function () { 
        let dataP=this.$qs.stringify({
            page:1,
            page_size:10,
        }); 
        shopSetting().then(res=>{
            this.pages=Math.ceil(res.data.filter.record_count/10);
            console.log(this.pages);
            shopSetting(dataP).then(res=>{
                console.log(res.data);
                this.shopSetData=res.data.orders;
            })
        })  
    }
}
</script>
<style scoped>
.shopSetting{
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