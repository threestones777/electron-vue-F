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
            <el-form ref="form" :model="shopSetData">
               <el-form-item style="text-align:left">
                   <p style="margin-left:10%">
                       采购订单有效天数:
                       <el-input-number size="small" v-model="shopSetData.valid_days" controls-position="right" :min="1" :max="60"></el-input-number>天（注:最大60天）
                   </p>
                    <el-checkbox style="float:left;margin-left:10%;" v-model="shopSetData.is_accord_order" true-label="0" false-label="1">必须按照订单采购</el-checkbox><br>
                    <el-checkbox style="float:left;margin-left:10%;" v-model="shopSetData.not_show_abnormal" true-label="0" false-label="1">进货价格异常时不显示</el-checkbox><br>
                    <el-checkbox style="float:left;margin-left:10%;" v-model="shopSetData.auto_remove_order" true-label="0" false-label="1">日结时是否自动删除未审核采购订单</el-checkbox><br>
                    <el-checkbox style="float:left;margin-left:10%;" v-model="shopSetData.auto_remove_backorder" true-label="0" false-label="1">日结时是否自动删除未审核采购退货单</el-checkbox><br>
                    <el-checkbox style="float:left;margin-left:10%;" v-model="shopSetData.is_accord_supplier" true-label="0" false-label="1">必须按供货商订货</el-checkbox><br>
                    <el-checkbox style="float:left;margin-left:10%;" v-model="shopSetData.buy_gt_chengben" true-label="0" false-label="1">进货价大于成本价时提示</el-checkbox><br>
                    <el-checkbox style="float:left;margin-left:10%;" v-model="shopSetData.buy_gt_dangan" true-label="0" false-label="1">进货价大于档案进价时提示</el-checkbox><br>
                    <el-checkbox style="float:left;margin-left:10%;" v-model="shopSetData.buy_gt_chengben_check" true-label="0" false-label="1">进货价大于成本时不能审核</el-checkbox><br>
                    <el-checkbox style="float:left;margin-left:10%;" v-model="shopSetData.buy_gt_dangan_check" true-label="0" false-label="1">进货价大于档案进价不能审核</el-checkbox><br>
                    <el-checkbox style="float:left;margin-left:10%;" v-model="shopSetData.tuihuo_gt_kucun" true-label="0" false-label="1">退货数量大于库存时提示</el-checkbox><br>
                    <el-checkbox style="float:left;margin-left:10%;" v-model="shopSetData.tuihuo_lt_chengben" true-label="0" false-label="1">退货价格小于成本价时提示</el-checkbox><br>
                    <el-checkbox style="float:left;margin-left:10%;" v-model="shopSetData.dinghuo_give_shouhuo" true-label="0" false-label="1">采购订单时订货数量不赋值给收货数量</el-checkbox><br>
                    <!-- <h1  style="float:left;margin-left:40%">进货价格确定</h1><br>  -->
                    <el-checkbox style="float:left;margin-left:10%;" v-model="shopSetData.by_goods_price" true-label="0" false-label="1">进货价格以商品资料进价为准</el-checkbox><br>
                    <el-checkbox style="float:left;margin-left:10%;" v-model="shopSetData.default_ling" true-label="0" false-label="1">进货时默认进价为0，手工输入进价</el-checkbox><br>
                    <el-checkbox style="float:left;margin-left:10%;" v-model="shopSetData.by_hand" true-label="0" false-label="1">进货时手工输入进价</el-checkbox><br>
                </el-form-item> 
            </el-form>
            <el-button type="primary" style="float:right;margin-right:50%" @click="savEdit">保存修改</el-button>
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
                show1:false,
                show2:true,
                show3:false,
                show4:false,
                show5:false,
                show6:false,
                show7:false,
                show8:true,
                show9:true,
                show10:false,
                show11:false,
                show12:true,
                show13:true,
                show14:false,
                show15:false,
                show16:false,
                show17:false,
            },
            formServeAdd:{
                name:""
            },
            formAdd:{},
            formDetail:{},
            shopSetData:{},
            shopSetData1:[],
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
                //this.record_count=Number(res.data.filter.record_count);
                this.shopSetData=res.data.orders[0];
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
        savEdit(){
            //console.log(row);
            let data =this.$qs.stringify(this.shopSetData)
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