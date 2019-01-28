<template>
    <div class="retailSetting">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <!-- <h3>温州美联 管理中心</h3> -->
            <el-breadcrumb style="font-size:18px;" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>零售</el-breadcrumb-item>
                <el-breadcrumb-item>零售设置</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="operate-in">
                <div @click="reset" class="card">
                    <i class="el-icon-loading"></i>
                    <div>刷新</div>
                </div>
                <div @click="savEdit" class="card">
                    <i class="el-icon-tickets"></i>
                    <div>保存修改</div>
                </div>
            </div>
        </div>
        <div class="main-table">
            <el-form ref="form" :model="retailsetData">
               <el-form-item style="text-align:left">
                    <el-row type="flex" justify="center" :gutter="10">
                       <el-col :span="3"></el-col>
                        <el-col :span="6">
                            小票标题:<el-input size="small" style="width:70%" v-model="retailsetData.ticket_title"></el-input>  
                        </el-col>
                        <el-col :span="6">
                            小票副标题:<el-input size="small" style="width:70%"  v-model="retailsetData.ticket_subtitle"></el-input>
                        </el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                    </el-row>
                    <el-row type="flex" justify="center" :gutter="10">
                       <el-col :span="3"></el-col>
                        <el-col :span="6">
                            <el-checkbox style="float:left;" v-model="retailsetData.print_subshop_name" true-label="0" false-label="1">打印店名字</el-checkbox>
                        </el-col>
                        <el-col :span="6">
                            <el-checkbox style="float:left;" v-model="retailsetData.print_subshop_address" true-label="0" false-label="1">打印店地址</el-checkbox>
                        </el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                    </el-row>
                    <el-row type="flex" justify="center" :gutter="10">
                       <el-col :span="3"></el-col>
                        <el-col :span="6">
                            <el-checkbox style="float:left;" v-model="retailsetData.not_print_sn" true-label="0" false-label="1">不打印小票编号</el-checkbox> 
                        </el-col>
                        <el-col :span="6">
                            <el-checkbox style="float:left;" v-model="retailsetData.print_subshop_dh" true-label="0" false-label="1">打印分店订货电话</el-checkbox>
                        </el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                    </el-row>
                    <el-row type="flex" justify="center" :gutter="10">
                       <el-col :span="3"></el-col>
                        <el-col :span="6">
                            <el-checkbox style="float:left;" v-model="retailsetData.print_subshop_fax" true-label="0" false-label="1">打印分店传真</el-checkbox>
                        </el-col>
                        <el-col :span="6">
                            <el-checkbox style="float:left;" v-model="retailsetData.print_subshop_kefu" true-label="0" false-label="1">打印分店客服</el-checkbox>
                        </el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                    </el-row>
                    <el-row type="flex" justify="center" :gutter="10">
                       <el-col :span="3"></el-col>
                        <el-col :span="6">
                            尾页空行:<el-input size="small" style="width:70%" v-model="retailsetData.footer_konghang"></el-input>
                        </el-col>
                        <el-col :span="6">
                            打印纸宽度:<el-input size="small" style="width:70%" v-model="retailsetData.print_width"></el-input>
                        </el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                    </el-row>
                    <el-row type="flex" justify="center" :gutter="10">
                       <el-col :span="3"></el-col>
                        <el-col :span="6">
                            右打印设置:<el-input size="small" style="width:65%" v-model="retailsetData.right_config"></el-input>
                        </el-col>
                        <el-col :span="6"></el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                    </el-row>
                    <el-row type="flex" justify="center" :gutter="10">
                       <el-col :span="3"></el-col>
                        <el-col :span="6">
                            <el-checkbox style="float:left;" v-model="retailsetData.print_clerk_id" true-label="0" false-label="1">打印营业员编码</el-checkbox>
                        </el-col>
                        <el-col :span="6">
                            <el-checkbox style="float:left;" v-model="retailsetData.print_clerk_name" true-label="0" false-label="1">打印营业员名称</el-checkbox>
                        </el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                    </el-row>
                    <el-row type="flex" justify="center" :gutter="10">
                       <el-col :span="3"></el-col>
                        <el-col :span="6">
                            <el-checkbox style="float:left;" v-model="retailsetData.print_clerk_info" true-label="0" false-label="1">打印营业员信息</el-checkbox>
                        </el-col>
                        <el-col :span="6">
                            <el-checkbox style="float:left;" v-model="retailsetData.print_old_price" true-label="0" false-label="1">特价商品打印原单价</el-checkbox>
                        </el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                    </el-row>
                    <el-row type="flex" justify="center" :gutter="10">
                       <el-col :span="3"></el-col>
                        <el-col :span="6">
                            <el-checkbox style="float:left;" v-model="retailsetData.print_save_money" true-label="0" false-label="1">尾页打印节省金额</el-checkbox>
                        </el-col>
                        <el-col :span="6">
                            <el-checkbox style="float:left;" v-model="retailsetData.print_integral" true-label="0" false-label="1">打印积分</el-checkbox>
                        </el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                    </el-row>
                    <el-row type="flex" justify="center" :gutter="10">
                       <el-col :span="3"></el-col>
                        <el-col :span="6">
                            <el-checkbox style="float:left;" v-model="retailsetData.print_user_name" true-label="0" false-label="1">打印会员名称</el-checkbox>
                        </el-col>
                        <el-col :span="6">
                            <el-checkbox style="float:left;" v-model="retailsetData.print_product_id" true-label="0" false-label="1">打印商品全称和货号</el-checkbox>
                        </el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                    </el-row>
                    <el-row type="flex" justify="center" :gutter="10">
                       <el-col :span="3"></el-col>
                        <el-col :span="6">
                            <el-checkbox style="float:left;" v-model="retailsetData.print_txm" true-label="0" false-label="1">打印商品全称和条形码</el-checkbox>
                        </el-col>
                        <el-col :span="6"></el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                    </el-row>
                    <el-row type="flex" justify="center" :gutter="10">
                       <el-col :span="3"></el-col>
                        <el-col :span="9">
                            促销备注打印行数:<el-input size="small" style="width:70%" v-model="retailsetData.remark_hangshu"></el-input>
                        </el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                    </el-row>
                    <el-row type="flex" justify="center" :gutter="10">
                       <el-col :span="3"></el-col>
                        <el-col :span="6">
                            小票结束词1:<el-input size="small" style="width:65%" v-model="retailsetData.end_word1"></el-input>
                        </el-col>
                        <el-col :span="6">
                            小票结束词2:<el-input size="small" style="width:65%" v-model="retailsetData.end_word2"></el-input>
                        </el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                    </el-row>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import {retailSetting,retailSettingDe,retailSettingAdd,retailSettingEd} from '../../api/apiW';
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
            formServeAdd:{},
            formDetail:{},
            retailsetData:{},
            retailSettingshow:{
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
            },
        }
    },
    methods:{
        init(page){//-----------------初始化数据
            let data=this.$qs.stringify({
                page:page,
                page_size:10,
            }); 
            retailSetting(data).then(res=>{
                this.record_count=Number(res.data.filter.record_count);
                console.log(res.data.retailsetting_list);
                this.retailsetData=res.data.retailsetting_list[0];
            })
        }, 
        handleClose(done){
            done();
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            erpTableSetting.retailSetting=this.retailSettingshow;
            localStorage.erpTableSetting=JSON.stringify(erpTableSetting);
        },      
        reset() {
            this.reload();
        },
        handleCurrentChange(val) {
            this.init(val);      
        },
        showDetails(row){//-------详情
            console.log(row.id);
            let dataD=this.$qs.stringify({
                subsite_id:3,
                subshop_id:0,
                id:row.id,
            });
            retailSettingDe(dataD).then(res=>{
                console.log(res.data);
                this.formDetail=res.data;
            })
        },
        savEdit(){//-----------------修改
            let data =this.$qs.stringify(this.retailsetData)
            retailSettingEd(data).then(res=>{
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
        add(){//-------添加
            let data =this.$qs.stringify(this.formServeAdd)
            retailSettingAdd(data).then(res=>{
                console.log(res.errno);
                this.reload();
            })
        },
        deleteRow(row) {//-------删除一行数据        
            let Message=confirm("确定删除此行数据？");
            if(Message){
                let dataD=this.$qs.stringify({                    
                    id:row.id,
                    is_delete:1
                }); 
                retailSettingEd(dataD).then(res=>{
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
            if(erpTableSetting.retailSetting!==undefined){
                this.retailSettingshow=erpTableSetting.retailSetting;
            }
        }else{
            console.log("no");
        };
        this.init(1);
    }
}
</script>
<style scoped>
.retailSetting{
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
.el-table input{
    width:100%;
    height:34px;
    border:1px solid #DCDFE6;
    border-radius:4px;
    padding:2px;
}
/* 新增弹出框 & 详情弹出框*/
.main-table>>>.el-dialog__body {
  padding: 0 20px;
}
.el-dialog__body .el-form {
  text-align: right;
}
.card-title {
  text-align: center;
}
.card-title:focus {
  outline: none;
}
.card {
  transition: all 0.3s;
  padding: 5px 0;
}
.card:hover {
  border-radius:7px;
  transform: translateY(-2px);
  box-shadow: 0px 2px 5px 4px rgba(0, 0, 0,0.1)
}
.card:hover i,
.card:hover div,
.card:hover b {
  color: #6cf;
}
.operate-in {
  display: flex;
  margin-top: 12px;
}
.operate-in > div {
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
}
.operate-in > div div {
  font-size: 16px;
}
.operate-in i {
  font-size: 30px;
}
.operate-in b {
  font-size: 16px;
  position: absolute;
  top: 20%;
  right: 5%;
}
.el-row{
    padding:5px;
}
</style>