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
            width="300px">
                <el-checkbox v-model="shopSettingshow.show1">编号</el-checkbox><br>
                <el-checkbox v-model="shopSettingshow.show2">有效天数</el-checkbox><br>
                <el-checkbox v-model="shopSettingshow.show3">必须按照订单采购</el-checkbox><br>
                <el-checkbox v-model="shopSettingshow.show4">进货价格异常时不显示</el-checkbox><br>
                <el-checkbox v-model="shopSettingshow.show5">日结时是否自动删除未审核采购订单</el-checkbox><br>
                <el-checkbox v-model="shopSettingshow.show6">日结时是否自动删除未审核采购退货单</el-checkbox><br>
                <el-checkbox v-model="shopSettingshow.show7">必须按供货商订货</el-checkbox><br>
                <el-checkbox v-model="shopSettingshow.show8">进货价大于成本价时提示</el-checkbox><br>
                <el-checkbox v-model="shopSettingshow.show9">进货价大于档案进价时提示</el-checkbox><br>
                <el-checkbox v-model="shopSettingshow.show10">进货价大于成本时不能审核</el-checkbox><br>
                <el-checkbox v-model="shopSettingshow.show11">进货价大于档案进价不能审核</el-checkbox><br>
                <el-checkbox v-model="shopSettingshow.show12">退货数量大于库存时提示</el-checkbox><br>
                <el-checkbox v-model="shopSettingshow.show13">退货价格小于成本价时提示</el-checkbox><br>
                <el-checkbox v-model="shopSettingshow.show14">采购订单时订货数量不赋值给收货数量</el-checkbox><br>
                <el-checkbox v-model="shopSettingshow.show15">进货价格以商品资料进价为准</el-checkbox><br>
                <el-checkbox v-model="shopSettingshow.show16">进货时默认进价为0，手工输入进价</el-checkbox><br>
                <el-checkbox v-model="shopSettingshow.show17">进货时手工输入进价</el-checkbox><br><br>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="shopSetData.filter(data =>  {
            return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1})})"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}">
                <el-table-column
                prop="id"
                align="center"
                v-if="shopSettingshow.show1"
                label="编号">
                </el-table-column>
                <el-table-column
                prop="valid_days"
                align="center"
                sortable
                v-if="shopSettingshow.show2"
                label="有效天数">
                    <template slot-scope="scope">
                        <input v-model="scope.row.valid_days">
                    </template>
                </el-table-column>                
                <el-table-column
                align="center"
                v-if="shopSettingshow.show3"
                label="必须按照订单采购">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.is_accord_order" true-label="0" false-label="1"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shopSettingshow.show4"
                label="进货价格异常时不显示">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.not_show_abnormal" true-label="0" false-label="1"/>
                    </template>
                </el-table-column>                
                <el-table-column
                align="center"
                v-if="shopSettingshow.show5"
                label="日结时是否自动删除未审核采购订单">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.auto_remove_order" true-label="0" false-label="1"/>
                    </template>
                </el-table-column>                
                <el-table-column
                align="center"
                v-if="shopSettingshow.show6"
                label="日结时是否自动删除未审核采购退货单">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.auto_remove_backorder" true-label="0" false-label="1"/>
                    </template>
                </el-table-column>                
                <el-table-column
                align="center"
                v-if="shopSettingshow.show7"
                label="必须按供货商订货">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.is_accord_supplier" true-label="0" false-label="1"/>
                    </template>
                </el-table-column>                
                <el-table-column
                align="center"
                v-if="shopSettingshow.show8"
                label="进货价大于成本价时提示">
                    <template slot-scope="scope">
                        <el-checkbox  v-model="scope.row.buy_gt_chengben" true-label="0" false-label="1"/>
                    </template>
                </el-table-column>                
                <el-table-column
                align="center"
                v-if="shopSettingshow.show9"
                label="进货价大于档案进价时提示">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.buy_gt_dangan" true-label="0" false-label="1"/>
                    </template>                    
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shopSettingshow.show10"
                label="进货价大于成本时不能审核">
                    <template slot-scope="scope">
                        <el-checkbox  v-model="scope.row.buy_gt_chengben_check" true-label="0" false-label="1"/>
                    </template>                    
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shopSettingshow.show11"
                label="进货价大于档案进价不能审核">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.buy_gt_dangan_check" true-label="0" false-label="1"/>
                    </template>                    
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shopSettingshow.show12"
                label="退货数量大于库存时提示">
                    <template slot-scope="scope">
                       <el-checkbox v-model="scope.row.tuihuo_gt_kucun" true-label="0" false-label="1"/>               
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shopSettingshow.show13"
                label="退货价格小于成本价时提示">
                    <template slot-scope="scope">
                       <el-checkbox v-model="scope.row.tuihuo_lt_chengben" true-label="0" false-label="1"/>               
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shopSettingshow.show14"
                label="采购订单时订货数量不赋值给收货数量">
                    <template slot-scope="scope">
                        <el-checkbox  v-model="scope.row.dinghuo_give_shouhuo" true-label="0" false-label="1"/>  
                    </template>          
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shopSettingshow.show15"
                label="进货价格以商品资料进价为准">
                    <template slot-scope="scope">
                        <el-checkbox  v-model="scope.row.by_goods_price" true-label="0" false-label="1"/>  
                    </template>          
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shopSettingshow.show16"
                label="进货时默认进价为0，手工输入进价">
                    <template slot-scope="scope">
                        <el-checkbox  v-model="scope.row.default_ling" true-label="0" false-label="1"/>  
                    </template>          
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shopSettingshow.show17"
                label="进货时手工输入进价">
                    <template slot-scope="scope">
                        <el-checkbox  v-model="scope.row.by_hand" true-label="0" false-label="1"/>  
                    </template>          
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="savEdit(scope.row)">保存修改</el-button>
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
import {shopSetting,shopSettingEdit,shopSettingDe,shopSettingAdd} from '../../api/apiW';
export default {
    inject: ['reload'],
    data() {
        return {
            pages:1,
            dialogShow:false,
            dialogServeAdd:false,
            dialogServeDetail:false,
            dialogAdd:false,
            record_count:0,
            shopSettingshow:{
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
            },
            formServeAdd:{
                name:""
            },
            formAdd:{},
            formDetail:{},
            shopSetData:[],
            search:''
        }
    },
    methods:{
        init(page){//-----------------初始化数据
            let data=this.$qs.stringify({
                page:page,
                page_size:10,
            }); 
            shopSetting(data).then(res=>{
                console.log(res.data);
                this.record_count=Number(res.data.filter.record_count);
                this.shopSetData=res.data.orders;
            })
        }, 
        handleClose(done){
            done();
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            erpTableSetting.shopSetting=this.shopSettingshow;
            localStorage.erpTableSetting=JSON.stringify(erpTableSetting);
        },
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
        savEdit(row){
            console.log(row);
            let data =this.$qs.stringify(row)
            shopSettingEdit(data).then(res=>{
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
            console.log(row);
            let Message=confirm("确定删除此行数据？");
            if(Message){
                let data =this.$qs.stringify({
                    id:row.id,
                    is_delete:1
                })
                shopSettingEdit(data).then(res=>{
                    console.log(res.errno);
                    if(res.errno==0){
                        this.$alert(res.errmsg);
                        this.reload();
                    }else{
                        this.$alert(res.errmsg);
                    }
                })                
            }else{
                alert("用户取消操作");
            } 
            
        }
    },
    created: function () { 
        if(localStorage.erpTableSetting!==undefined){
            console.log("yes");
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting); 
            if(erpTableSetting.shopSetting!==undefined){
                this.shopSettingshow=erpTableSetting.shopSetting;
            }
        }else{
            console.log("no");
        }
        this.init(1);        
    }
}
</script>
<style scoped>
.chose .el-checkbox{
    margin-bottom:10px;
}
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
.el-table input{
    width:100%;
    height:34px;
    border:1px solid #DCDFE6;
    border-radius:4px;
    padding:2px;
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