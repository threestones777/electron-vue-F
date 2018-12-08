<template>
    <div id="integralExchange">
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>零售</el-breadcrumb-item>
                <el-breadcrumb-item>积分兑换</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--弹出窗口-->
        <el-input	size="small" v-model="orderDate" placeholder="请点击选择客户" @focus="selectSupplier=true"></el-input>        
        <el-dialog
        title="选择供应商"
        :visible.sync="selectSupplier"
        width="95%"
        :before-close="handleClose">
            名称 :<el-input	size="small" v-model="orderDate" placeholder="供应商名称"></el-input>          
            编号 :<el-input	size="small" v-model="supplier_id" placeholder="供应商编号"></el-input>          
            联系人 :<el-input	size="small" v-model="orderDate" placeholder="联系人"></el-input>          
            联系电话 :<el-input	size="small" v-model="orderDate" placeholder="联系电话"></el-input>          
            备注信息 :<el-input	size="small" v-model="orderDate" placeholder="备注信息"></el-input> 
            <el-button	size="small" type="primary" @click="supplier">搜索</el-button>
            <el-table
            ref="multipleTable"
            :data="SupplierData"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                prop="supplier_name"
                align="center"
                label="供应商名称"
                width="100">
                </el-table-column>
                <el-table-column
                prop="supplier_id"
                align="center"
                label="供应商编号"
                width="100">
                </el-table-column>
                <el-table-column
                prop="contacts_name"
                align="center"
                label="联系人"
                width="90">
                </el-table-column>
                <el-table-column
                prop="contacts_phone"
                align="center"
                label="联系电话"
                width="100">
                </el-table-column>
                <el-table-column
                prop="address"
                align="center"
                label="供应商地址"
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                align="center"
                label="社交账户"
                width="100">
                </el-table-column>
                <el-table-column
                prop="email"
                align="center"
                label="邮箱地址"
                width="100">
                </el-table-column>
                <el-table-column
                prop="bank_name"
                align="center"
                label="开户名"
                width="100">
                </el-table-column>
                <el-table-column
                prop="bank_account_name"
                align="center"
                label="开户行"
                width="100">
                </el-table-column>
                <el-table-column
                prop="bank_account_number"
                align="center"
                label="银行账户"
                width="100">
                </el-table-column>
                <el-table-column
                prop="tax_registration_certificate"
                align="center"
                label="税号"
                width="100">
                </el-table-column>
                <el-table-column
                prop="contacts_name"
                align="center"
                label="姓名"
                width="90">
                </el-table-column>
                <el-table-column
                prop="supplier_desc"
                align="center"
                label="备注信息"
                show-overflow-tooltip>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button	size="small" @click="selectSupplier=false">取 消</el-button>
                <el-button	size="small" type="primary" @click="selectSupplier=false">确 定</el-button>
            </span>
        </el-dialog> 
        <!---->
        <!-- <el-input	size="small" v-model="orderDate" placeholder="单据日期"></el-input>
        <el-input	size="small" v-model="orderId" placeholder="单据编号"></el-input>
        <el-button	size="small" type="primary">提交单据</el-button> -->
        <el-button	size="small" type="primary" @click="dialogAdd=true">新增</el-button>
        <el-button	size="small" type="primary" @click="reset">刷新</el-button>
        <!-- 新增采购订单弹窗 -->
        <el-dialog
        title="新增"
        :visible.sync="dialogAdd"
        width="700px">
            <el-form :model="formAdd" class="detail">
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        积分兑换id<el-input v-model="formAdd.id" disabled></el-input>    
                    </el-col>
                    <el-col :span="7">
                        单号<el-input v-model="formAdd.bill_sn"></el-input>
                    </el-col>
                    <el-col :span="7">
                        商品货号<el-input v-model="formAdd.goods_sn"></el-input>
                    </el-col>
                </el-row>                
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        商品名称<el-input v-model="formAdd.goods_name"></el-input>    
                    </el-col>
                    <el-col :span="7">
                        礼品属性<el-input v-model="formAdd.attr_value"></el-input>
                    </el-col>
                    <el-col :span="7">
                        积分下线<br><el-input v-model="formAdd.floor_integral"></el-input>
                    </el-col>
                </el-row>                
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        兑换积分<el-input v-model="formAdd.integral"></el-input>    
                    </el-col>
                    <el-col :span="7">
                        兑换数量<el-input v-model="formAdd.number"></el-input>
                    </el-col>
                    <el-col :span="7">
                        兑换总积分<el-input v-model="formAdd.sum_integral"></el-input>
                    </el-col>
                </el-row>                
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        开始日期<el-input v-model="formAdd.start_time"></el-input>    
                    </el-col>
                    <el-col :span="7">
                        结束日期<el-input v-model="formAdd.end_time"></el-input>
                    </el-col>
                    <el-col :span="7">
                        会员类别<el-input v-model="formAdd.type"></el-input>
                    </el-col>
                </el-row>                
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        每人限量<el-input v-model="formAdd.per_num"></el-input>    
                    </el-col>
                    <el-col :span="7">
                        总限量<el-input v-model="formAdd.sum_num"></el-input>
                    </el-col>
                    <el-col :span="7">
                        备注<el-input v-model="formAdd.remark"></el-input>
                    </el-col>
                </el-row>                
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        修改日期<el-input v-model="formAdd.edit_time"></el-input>    
                    </el-col>
                    <el-col :span="7">
                        修改人<el-input v-model="formAdd.adminid"></el-input>
                    </el-col>
                    <el-col :span="7">
                        审核日期<el-input v-model="formAdd.check_time"></el-input>
                    </el-col>
                </el-row>                
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        分站id<el-input v-model="formAdd.subsite_id" disabled></el-input>    
                    </el-col>
                    <el-col :span="7">
                        修改人名称<el-input v-model="formAdd.admin_name"></el-input>
                    </el-col>
                </el-row>  
            </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="dialogAdd = false">取 消</el-button>
            <el-button size="small" type="primary" @click="add(),dialogAdd = false">确 定</el-button>
        </span>
        </el-dialog>
        <el-table
        :data="integralData"
        border
        :row-style="{height:0}"  
        :cell-style="{padding:0}"
        :header-row-style="{height:0}"  
        :header-cell-style="{padding:0}"
        style="width: 100%">
            <el-table-column
                prop="id"
                align="center"
                label="积分兑换id">
            </el-table-column>
            <el-table-column
                prop="bill_sn"
                align="center"
                label="单号">
            </el-table-column>
            <el-table-column
                prop="goods_name"
                align="center"
                label="商品名称">
            </el-table-column>       
            <el-table-column
                prop="attr_value"
                align="center"
                label="礼品属性">
            </el-table-column>            
            <el-table-column
                prop="start_time"
                align="center"
                label="开始日期">
            </el-table-column>
            <el-table-column
                prop="end_time"
                align="center"
                label="结束日期">
            </el-table-column>                
            <el-table-column
                prop="remark"
                align="center"
                label="备注">
            </el-table-column> 
            <el-table-column
            fixed="right"
            align="center"
            label="相关操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="showDetails(scope.row),dialogDetail = true">详情</el-button>
                    <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
                </template>
            </el-table-column>        
        </el-table>
        <!-------------------------------------------------------- 详情弹窗 ---------------------------------------------------------------->
        <el-dialog width="800px" title="积分兑换详情" :visible.sync="dialogDetail">
            <el-button type="text" icon="el-icon-edit" @click="openEdit" class="openEdit">编辑</el-button>
            <el-form id="form" :model="formDetail" class="detail" style="text-align:center" :disabled="forbidden">
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        积分兑换id<el-input v-model="formDetail.id" disabled></el-input>    
                    </el-col>
                    <el-col :span="7">
                        单号<el-input v-model="formDetail.bill_sn"></el-input>
                    </el-col>
                    <el-col :span="7">
                        商品货号<el-input v-model="formDetail.goods_sn"></el-input>
                    </el-col>
                </el-row>                
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        商品名称<el-input v-model="formDetail.goods_name"></el-input>    
                    </el-col>
                    <el-col :span="7">
                        礼品属性<el-input v-model="formDetail.attr_value"></el-input>
                    </el-col>
                    <el-col :span="7">
                        积分下线<br><el-input v-model="formDetail.floor_integral"></el-input>
                    </el-col>
                </el-row>                
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        兑换积分<el-input v-model="formDetail.integral"></el-input>    
                    </el-col>
                    <el-col :span="7">
                        兑换数量<el-input v-model="formDetail.number"></el-input>
                    </el-col>
                    <el-col :span="7">
                        兑换总积分<el-input v-model="formDetail.sum_integral"></el-input>
                    </el-col>
                </el-row>                
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        开始日期<el-input v-model="formDetail.start_time"></el-input>    
                    </el-col>
                    <el-col :span="7">
                        结束日期<el-input v-model="formDetail.end_time"></el-input>
                    </el-col>
                    <el-col :span="7">
                        会员类别<el-input v-model="formDetail.type"></el-input>
                    </el-col>
                </el-row>                
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        每人限量<el-input v-model="formDetail.per_num"></el-input>    
                    </el-col>
                    <el-col :span="7">
                        总限量<el-input v-model="formDetail.sum_num"></el-input>
                    </el-col>
                    <el-col :span="7">
                        备注<el-input v-model="formDetail.remark"></el-input>
                    </el-col>
                </el-row>                
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        修改日期<el-input v-model="formDetail.edit_time"></el-input>    
                    </el-col>
                    <el-col :span="7">
                        修改人<el-input v-model="formDetail.adminid"></el-input>
                    </el-col>
                    <el-col :span="7">
                        审核日期<el-input v-model="formDetail.check_time"></el-input>
                    </el-col>
                </el-row>                
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        分站id<el-input v-model="formDetail.subsite_id" disabled></el-input>    
                    </el-col>
                    <el-col :span="7">
                        修改人名称<el-input v-model="formDetail.admin_name"></el-input>
                    </el-col>
                </el-row>                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogDetail = false">取 消</el-button>
                <el-button size="small" type="primary" @click="dialogDetail = false" id="sure">确定</el-button>
                <el-button size="small" type="primary" @click="edit(),dialogDetail = false" id="edit">保存修改</el-button>
            </div>
        </el-dialog>  
        <!--分页-->
        <el-pagination
            @current-change="handleCurrentChange"
            layout="prev, pager, next,jumper"
            :page-count="pages">
        </el-pagination>
    </div>
</template>
<style scoped>
    #integralExchange{
        text-align:center;
        margin: 20px;
    }
    #integralExchange .el-dialog .el-input{
       width:10%;
    }
    #integralExchange .main-header{
        text-align:left;
        margin-bottom: 10px;
    }
    #integralExchange .el-select{
        width:100px;
    }
    #integralExchange .el-input{
        width:160px;
        margin:5px 20px 0 0;
    }
    #integralExchange .el-table{
        margin:15px 0;
    } 
    #integralExchange .el-pagination{
        text-align: right;
        margin: 20px 0;
    }
    #integralExchange .el-pagination__jump .el-input{
        width:50%;
    }
    #integralExchange .detail .el-input{
        width:100%;
    }
    #integralExchange .detail .el-row{
        border-top:1px dashed #ccc;
    }
    #integralExchange #edit{
        display:none;
    }
    #integralExchange .openEdit{
        position: relative;
        left:340px;
    }
</style>    
<script>
import {supplier} from '../../api/api' ;
import {integraList,integraListDe,integraListEd,integraListAdd} from '../../api/apiW' ;
  export default {
    inject: ['reload'],
    data() {
      return {
        selectSupplier:false,
        dialogDetail:false,
        dialogAdd:false,
        options: [{
          value: '选项1',
          label: '10条记录'
        }, {
          value: '选项2',
          label: '25条记录'
        }, {
          value: '选项3',
          label: '50条记录'
        }, {
          value: '选项4',
          label: '100条记录'
        }],
        value: '',
        input:'',
        orderDate:'',
        orderId:'',
        supplier_id:'2',
        pages:0,
        forbidden:true,
        integralData: [],
        SupplierData: [],
        formDetail:{},
        formAdd:{},
        multipleSelection: []
      }
    },
    methods:{
        reset(){
            this.reload();
        },
        handleClose(done) {
            done();
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleCurrentChange(val) {//--------------------------分页跳转
            let data=this.$qs.stringify({
                page:val,
                page_size:10
            });
            integraList(data).then(res=>{
                console.log(res.data);
                this.pages=Math.ceil(res.data.filter.record_count/10);
                this.integralData=res.data.creditsexchange_list;
            }) 
        },
        supplier(){//-----------------------------选择供应商
            this.SupplierData=[];
            supplier({params:{supplier_id:this.supplier_id}}).then(res=>{
                console.log(res.data);
                this.SupplierData.push(res.data);
            })
        },
        add(){//-----------------------新增
            let data=this.$qs.stringify(this.formAdd);
            integraListAdd(data).then(res=>{
                console.log(res);
                if(res.errno==0){
                    this.$alert(res.errmsg,{
                        callback:action=>{
                            this.reload();    
                        }
                    })
                }else{
                    this.$alert(res.errmsg)
                }
            });
        },
        showDetails(row){//-----------------------详情
            let data=this.$qs.stringify({
                id:row.id
            });
            integraListDe(data).then(res=>{
                this.formDetail=res.data;
                this.goodsData=res.data.purchase_goods;
            });
        },  
        openEdit(){//-----------------------切换编辑状态
            let sure=document.getElementById("sure")
            let edit=document.getElementById("edit")
            switch(this.forbidden){
                case true:this.forbidden=false;
                    sure.style.display="none";
                    edit.style.display="inline-block";
                    break;
                case false:
                    this.forbidden=true;
                    sure.style.display="inline-block";
                    edit.style.display="none";
                    break;
            }
        },
        edit(){//---------------------------------修改
            let data=this.$qs.stringify(this.formDetail);
            integraListEd(data).then(res=>{
                console.log(res);
                if(res.errno==0){
                    this.$alert(res.errmsg,{
                        callback:action=>{
                            this.reload();    
                        }
                    })
                }else{
                    this.$alert(res.errmsg)
                }
            });
        },
        deleteRow(row){//---------------------------------删除
            let Message=confirm("确定删除此行商品？");
            if(Message){
                let data=this.$qs.stringify({
                    id:row.id,
                    is_delete:1
                });
                integraListEd(data).then(res=>{
                    console.log(res);
                    if(res.errno==0){
                        this.$alert(res.errmsg,{
                            callback:action=>{
                                this.reload();    
                            }
                        })
                    }else{
                        this.$alert(res.errmsg)
                    }
                });         
            }else{
                alert("用户取消操作");
            }
        },
    },
    created:function(){
        let data=this.$qs.stringify({
            page:1,
            page_size:10
        });
        integraList(data).then(res=>{
            console.log(res.data);
            this.pages=Math.ceil(res.data.filter.record_count/10);
            this.integralData=res.data.creditsexchange_list;
        })
    }
  }
</script>