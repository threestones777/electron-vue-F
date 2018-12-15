<template>
    <div class="retailSetting">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>零售</el-breadcrumb-item>
                <el-breadcrumb-item>零售设置</el-breadcrumb-item>
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
                <el-checkbox v-model="retailSettingshow.show1">编号</el-checkbox><br>
                <el-checkbox v-model="retailSettingshow.show2">打印店名字</el-checkbox><br>
                <el-checkbox v-model="retailSettingshow.show3">打印店地址</el-checkbox><br>
                <el-checkbox v-model="retailSettingshow.show4">小票标题</el-checkbox><br>
                <el-checkbox v-model="retailSettingshow.show5">不打印小票编号</el-checkbox><br>
                <el-checkbox v-model="retailSettingshow.show6">打印分店订货电话</el-checkbox><br>
                <el-checkbox v-model="retailSettingshow.show7">打印分店传真</el-checkbox><br>
                <el-checkbox v-model="retailSettingshow.show8">打印分店客服</el-checkbox><br>
                <el-checkbox v-model="retailSettingshow.show9">尾页空行</el-checkbox><br>
                <el-checkbox v-model="retailSettingshow.show10">右打印设置</el-checkbox><br>
                <el-checkbox v-model="retailSettingshow.show11">打印营业员编码</el-checkbox><br>
                <el-checkbox v-model="retailSettingshow.show12">打印营业员名称</el-checkbox><br>
                <el-checkbox v-model="retailSettingshow.show13">打印营业员信息</el-checkbox><br>
                <el-checkbox v-model="retailSettingshow.show14">特价商品打印原单价</el-checkbox><br>
                <el-checkbox v-model="retailSettingshow.show15">尾页打印节省金额</el-checkbox><br>
                <el-checkbox v-model="retailSettingshow.show16">打印积分</el-checkbox><br>
                <el-checkbox v-model="retailSettingshow.show17">打印会员名称</el-checkbox><br>
                <el-checkbox v-model="retailSettingshow.show18">打印商品全称和货号</el-checkbox><br>
                <el-checkbox v-model="retailSettingshow.show19">打印商品全称和条形码</el-checkbox><br>
                <el-checkbox v-model="retailSettingshow.show20">促销备注打印行数</el-checkbox><br>
                <el-checkbox v-model="retailSettingshow.show21">小票结束词1</el-checkbox><br><br>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="retailsetData.filter(data =>  {
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
                align="center"
                v-if="retailSettingshow.show1"
                label="编号">
                </el-table-column>
                <el-table-column
                align="center"
                v-if="retailSettingshow.show2"
                label="打印店名字">
                    <template slot-scope="scope">
                        <input v-model="scope.row.print_subshop_name">
                    </template>
                </el-table-column>                
                <el-table-column
                align="center"
                v-if="retailSettingshow.show3"
                label="打印店地址">
                    <template slot-scope="scope">
                        <input v-model="scope.row.print_subshop_address">
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="retailSettingshow.show4"
                label="小票标题">
                    <template slot-scope="scope">
                        <input v-model="scope.row.ticket_title">
                    </template>
                </el-table-column>                
                <el-table-column
                align="center"
                v-if="retailSettingshow.show5"
                label="不打印小票编号">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.not_print_sn" true-label="0" false-label="1"/>
                    </template>
                </el-table-column>                
                <el-table-column
                align="center"
                v-if="retailSettingshow.show6"
                label="打印分店订货电话">
                    <template slot-scope="scope">
                        <input v-model="scope.row.print_subshop_dh">
                    </template>
                </el-table-column>                
                <el-table-column
                align="center"
                v-if="retailSettingshow.show7"
                label="打印分店传真">
                    <template slot-scope="scope">
                        <input v-model="scope.row.print_subshop_fax">
                    </template>
                </el-table-column>                
                <el-table-column
                align="center"
                v-if="retailSettingshow.show8"
                label="打印分店客服">
                    <template slot-scope="scope">
                        <input v-model="scope.row.print_subshop_kefu">
                    </template>
                </el-table-column>                
                <el-table-column
                align="center"
                v-if="retailSettingshow.show9"
                label="尾页空行">
                    <template slot-scope="scope">
                        <input type="number" v-model="scope.row.footer_konghang" />
                    </template>
                </el-table-column>                
                <el-table-column
                align="center"
                v-if="retailSettingshow.show10"
                label="右打印设置">
                    <template slot-scope="scope">
                        <input v-model="scope.row.right_config">
                    </template>
                </el-table-column>                
                <el-table-column
                align="center"
                v-if="retailSettingshow.show11"
                label="打印营业员编码">
                    <template slot-scope="scope">
                        <input v-model="scope.row.print_clerk_id">
                    </template>
                </el-table-column>                
                <el-table-column
                align="center"
                v-if="retailSettingshow.show12"
                label="打印营业员名称">
                    <template slot-scope="scope">
                        <input v-model="scope.row.print_clerk_name">
                    </template>                    
                </el-table-column>
                <el-table-column
                align="center"
                v-if="retailSettingshow.show13"
                label="打印营业员信息">
                    <template slot-scope="scope">
                        <input v-model="scope.row.print_clerk_info">
                    </template> 
                </el-table-column>                   
                <el-table-column
                align="center"
                v-if="retailSettingshow.show14"
                label="特价商品打印原单价">
                    <template slot-scope="scope">
                        <input v-model="scope.row.print_old_price">
                    </template> 
                </el-table-column>                   
                <el-table-column
                align="center"
                v-if="retailSettingshow.show15"
                label="尾页打印节省金额">
                    <template slot-scope="scope">
                        <input v-model="scope.row.print_save_money">
                    </template>  
                </el-table-column>                  
                <el-table-column
                align="center"
                v-if="retailSettingshow.show16"
                label="打印积分">
                    <template slot-scope="scope">
                        <input v-model="scope.row.print_integral">
                    </template> 
                </el-table-column>                   
                <el-table-column
                align="center"
                v-if="retailSettingshow.show17"
                label="打印会员名称">
                    <template slot-scope="scope">
                        <input v-model="scope.row.print_user_name">
                    </template>  
                </el-table-column>                  
                <el-table-column
                align="center"
                v-if="retailSettingshow.show18"
                label="打印商品全称和货号">
                    <template slot-scope="scope">
                        <input v-model="scope.row.print_product_id">
                    </template>  
                </el-table-column>                  
                <el-table-column
                align="center"
                v-if="retailSettingshow.show19"
                label="打印商品全称和条形码">
                    <template slot-scope="scope">
                        <input v-model="scope.row.print_txm">
                    </template> 
                </el-table-column>                   
                <el-table-column
                align="center"
                v-if="retailSettingshow.show20"
                label="促销备注打印行数">
                    <template slot-scope="scope">
                        <input v-model="scope.row.remark_hangshu">
                    </template>                    
                </el-table-column>
                <el-table-column
                align="center"
                v-if="retailSettingshow.show21"
                label="小票结束词1">
                    <template slot-scope="scope">
                        <input v-model="scope.row.end_word1" />
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
            retailsetData:[],
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
                this.retailsetData=res.data.retailsetting_list;
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
                id:row.id
            });
            retailSettingDe(dataD).then(res=>{
                console.log(res.data);
                this.formDetail=res.data;
            })
        },
        savEdit(row){//-------修改
            let data =this.$qs.stringify(row)
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
.el-row {
  border-top: 1px dashed #ccc;
}
</style>