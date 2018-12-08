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
                    <el-button type="primary" size="small" @click="dialogServeAdd = true">新增</el-button>
                    <el-button type="primary" size="small" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form>
            <!-- 新增弹出框 -->
            <el-dialog width="700px" title="新增" :visible.sync="dialogServeAdd">
                <el-form :model="formServeAdd" style="text-align:center">
                    <el-row type="flex" justify="space-around">
                        <!-- <el-col :span="7">
                            店号<el-input v-model="formServeAdd.id"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            分站id<el-input v-model="formServeAdd.subsite_id"></el-input>
                        </el-col> -->
                        <el-col :span="7">
                            小票标题<el-input v-model="formServeAdd.ticket_title"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            小票副标题<el-input v-model="formServeAdd.ticket_subtitle"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            打印店名字<el-input v-model="formServeAdd.print_subshop_name"></el-input>
                        </el-col>
                        <el-col :span="7">
                            打印店地址<el-input v-model="formServeAdd.print_subshop_address"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            不打印小票编号<el-input v-model="formServeAdd.not_print_sn"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            打印分店订货电话<el-input v-model="formServeAdd.print_subshop_dh"></el-input>
                        </el-col>
                        <el-col :span="7">
                            打印分店传真<el-input v-model="formServeAdd.print_subshop_fax"></el-input>
                        </el-col>
                    </el-row> 
                   <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            打印分店客服<el-input v-model="formServeAdd.print_subshop_kefu"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            尾页空行<el-input v-model="formServeAdd.footer_konghang"></el-input>
                        </el-col>
                        <el-col :span="7">
                            打印纸宽度<el-input v-model="formServeAdd.print_width"></el-input>
                        </el-col>
                    </el-row>               
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            右打印设置<el-input v-model="formServeAdd.right_config"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            打印营业员编码<el-input v-model="formServeAdd.print_clerk_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            打印营业员名称<el-input v-model="formServeAdd.print_clerk_name"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            打印营业员信息<el-input v-model="formServeAdd.print_clerk_info"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            特价商品打印原单价<el-input v-model="formServeAdd.print_old_price"></el-input>
                        </el-col>
                        <el-col :span="7">
                            尾页打印节省金额<el-input v-model="formServeAdd.print_save_money"></el-input>
                        </el-col>
                    </el-row>                 
                   <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            打印积分<el-input v-model="formServeAdd.print_integral"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            打印会员名称<el-input v-model="formServeAdd.print_user_name"></el-input>
                        </el-col>
                        <el-col :span="7">
                            打印商品全称和货号<el-input v-model="formServeAdd.print_product_id"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                           打印商品全称和条形码<el-input v-model="formServeAdd.print_txm"></el-input>     
                        </el-col>
                        <el-col :span="7">
                            促销备注打印行数<el-input v-model="formServeAdd.remark_hangshu"></el-input>
                        </el-col>
                        <el-col :span="7">
                            小票结束词1<el-input v-model="formServeAdd.end_word1"></el-input>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="small" @click="dialogServeAdd = false">取 消</el-button>
                    <el-button size="small" type="primary" @click="add(),dialogServeAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 详情弹出框 -->
            <el-dialog width="700px" title="零售设置" :visible.sync="dialogServeDetail">
                <el-form :model="formDetail" style="text-align:center">
                    <el-row type="flex" justify="space-around">
                        <!-- <el-col :span="7">
                            店号<el-input v-model="formDetail.id" disabled></el-input>    
                        </el-col>
                        <el-col :span="7">
                            分站id<el-input v-model="formDetail.subsite_id" disabled></el-input>
                        </el-col> -->
                        <el-col :span="7">
                            小票标题<el-input v-model="formDetail.ticket_title"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            小票副标题<el-input v-model="formDetail.ticket_subtitle"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            打印店名字<el-input v-model="formDetail.print_subshop_name"></el-input>
                        </el-col>
                        <el-col :span="7">
                            打印店地址<el-input v-model="formDetail.print_subshop_address"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            不打印小票编号<el-input v-model="formDetail.not_print_sn"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            打印分店订货电话<el-input v-model="formDetail.print_subshop_dh"></el-input>
                        </el-col>
                        <el-col :span="7">
                            打印分店传真<el-input v-model="formDetail.print_subshop_fax"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            打印分店客服<el-input v-model="formDetail.print_subshop_kefu"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            尾页空行<el-input v-model="formDetail.footer_konghang"></el-input>
                        </el-col>
                        <el-col :span="7">
                            右打印设置<el-input v-model="formDetail.right_config"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            打印营业员编码<el-input v-model="formDetail.print_clerk_id"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            打印营业员名称<el-input v-model="formDetail.print_clerk_name"></el-input>
                        </el-col>
                        <el-col :span="7">
                            打印营业员信息<el-input v-model="formDetail.print_clerk_info"></el-input>
                        </el-col>
                    </el-row>              
                    <!-- <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            <el-input v-model="formDetail.print_integral"></el-input>    
                        </el-col>
                    </el-row>  -->
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="small" @click="dialogServeDetail = false">取 消</el-button>
                    <el-button size="small" type="primary" @click="savEdit(),dialogServeDetail = false">保 存</el-button>
                </div>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="retailsetData"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            style="width: 100%">
                <el-table-column
                prop="id"
                align="center"
                label="编号">
                </el-table-column>
                <el-table-column
                prop="print_subshop_name"
                align="center"
                label="打印店名字">
                </el-table-column>                
                <el-table-column
                prop="print_subshop_address"
                align="center"
                label="打印店地址">
                </el-table-column>
                <el-table-column
                prop="ticket_title"
                align="center"
                label="小票标题">
                </el-table-column>                
                <el-table-column
                align="center"
                label="打印分店订货电话">
                    <template slot-scope="scope">
                        <span>{{scope.row.print_subshop_dh==0?"是":"否"}}</span>
                    </template>
                </el-table-column>                
                <el-table-column
                align="center"
                label="打印分店传真">
                    <template slot-scope="scope">
                        <span>{{scope.row.print_subshop_fax==0?"是":"否"}}</span>
                    </template>
                </el-table-column>                
                <el-table-column
                align="center"
                label="打印营业员名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.print_clerk_name==0?"是":"否"}}</span>
                    </template>                    
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showDetails(scope.row),dialogServeDetail = true">详情</el-button>
                        <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.row)">删除</el-button>
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
import {retailSetting,retailSettingDe,retailSettingAdd,retailSettingEd} from '../../api/apiW';
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
            formDetail:{},
            retailsetData:[],
        }
    },
    methods:{       
        serveSearch() {
            console.log("开启搜索");
        },        
        reset() {
            console.log("刷新");
            this.reload();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`); 
            let dataP=this.$qs.stringify({
                page:val,
                page_size:10,
            }); 
            shopSetting(dataC).then(res=>{
                console.log(res.data);
                this.shopSetData=res.data.orders;
            })         
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
        savEdit(){//-------修改
            let data =this.$qs.stringify(this.formDetail)
            retailSettingEd(data).then(res=>{
                console.log(res.errno);
                if(res.errno==0){
                    console.log("修改成功");
                    this.reload();
                }else{
                    console.log("修改失败");
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
                    this.reload();
                });
            }else{
                alert(row.id);
            }
            
        }
    },
    created: function () { 
        let dataP=this.$qs.stringify({
            page:1,
            page_size:10,
        }); 
        retailSetting().then(res=>{
            this.pages=Math.ceil(res.data.filter.record_count/10);
            console.log("总共"+this.pages+"页");
            retailSetting(dataP).then(res=>{
                console.log(res.data.retailsetting_list);
                this.retailsetData=res.data.retailsetting_list;
            })
        })  
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