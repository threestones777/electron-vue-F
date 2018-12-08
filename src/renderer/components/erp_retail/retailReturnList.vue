<template>
    <div id="retailReturnList">
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>零售</el-breadcrumb-item>
                <el-breadcrumb-item>零售退货单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="">
                    <el-input	size="small" v-model="orderDate" placeholder="请点击选择客户" @focus="selectSupplier=true"></el-input>      
                </el-form-item>
                <!-- <el-form-item label="">
                    <el-input	size="small" v-model="orderDate" placeholder="单据日期"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input	size="small" v-model="orderId" placeholder="单据编号"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <!-- <el-button	size="small" type="primary">提交单据</el-button> -->
                    <el-button	size="small" type="primary" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form>          
        <!--弹出窗口-->
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
                label="供应商名称"
                width="100">
                </el-table-column>
                <el-table-column
                prop="supplier_id"
                label="供应商编号"
                width="100">
                </el-table-column>
                <el-table-column
                prop="contacts_name"
                label="联系人"
                width="90">
                </el-table-column>
                <el-table-column
                prop="contacts_phone"
                label="联系电话"
                width="100">
                </el-table-column>
                <el-table-column
                prop="address"
                label="供应商地址"
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="社交账户"
                width="100">
                </el-table-column>
                <el-table-column
                prop="email"
                label="邮箱地址"
                width="100">
                </el-table-column>
                <el-table-column
                prop="bank_name"
                label="开户名"
                width="100">
                </el-table-column>
                <el-table-column
                prop="bank_account_name"
                label="开户行"
                width="100">
                </el-table-column>
                <el-table-column
                prop="bank_account_number"
                label="银行账户"
                width="100">
                </el-table-column>
                <el-table-column
                prop="tax_registration_certificate"
                label="税号"
                width="100">
                </el-table-column>
                <el-table-column
                prop="contacts_name"
                label="姓名"
                width="90">
                </el-table-column>
                <el-table-column
                prop="supplier_desc"
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
        <el-table
        :data="retailReturnData"
        border
        :row-style="{height:0}"  
        :cell-style="{padding:0}"
        :header-row-style="{height:0}"  
        :header-cell-style="{padding:0}"
        style="width: 100%">
            <el-table-column
                prop="back_id"
                align="center"
                label="退款单id">
            </el-table-column>
            <el-table-column
                prop="order_id"
                align="center"
                label="退款单编号">
            </el-table-column>
            <el-table-column
                prop="add_time"
                align="center"
                label="添加日期">
            </el-table-column>        
            <el-table-column
                prop="status_back_val"
                align="center"
                label="退换状态">
            </el-table-column>
            <el-table-column
                prop="status_name"
                align="center"
                label="状态名">
            </el-table-column>
            <el-table-column
                prop="postscript"
                align="center"
                label="备注信息">
            </el-table-column>   
            <el-table-column
            fixed="right"
            align="center"
            label="相关操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="showDetails(scope.row),dialogDetail = true">详情</el-button>
                </template>
            </el-table-column>  
        </el-table>
        <!-------------------------------------------------------- 详情弹窗 ---------------------------------------------------------------->
        <el-dialog width="800px" title="零售退货单详情" :visible.sync="dialogDetail">
            <el-form :model="formDetail" class="detail" style="text-align:center">
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        退款单id<el-input v-model="formDetail.back_id"></el-input>    
                    </el-col>
                    <el-col :span="7">
                        退款单编号<el-input v-model="formDetail.order_sn"></el-input>
                    </el-col>
                    <el-col :span="7">
                        日期<el-input v-model="formDetail.add_time"></el-input>
                    </el-col>
                </el-row>                
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        应退金额<el-input v-model="formDetail.refund_money_1"></el-input>    
                    </el-col>
                    <el-col :span="7">
                        实退金额<el-input v-model="formDetail.refund_money_2"></el-input>
                    </el-col>
                    <el-col :span="7">
                        制单人<br><el-input v-model="formDetail.action_user"></el-input>
                    </el-col>
                </el-row>                
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        客户名<el-input v-model="formDetail.user_name"></el-input>    
                    </el-col>
                    <el-col :span="7">
                        退换状态<el-input v-model="formDetail.status_back_val"></el-input>
                    </el-col>
                    <el-col :span="7">
                        状态名<el-input v-model="formDetail.status_name"></el-input>
                    </el-col>
                </el-row>                
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        备注<el-input v-model="formDetail.postscript"></el-input>    
                    </el-col>
                </el-row>                
            </el-form><br>
            <h1>单据商品</h1><br>
            <el-table
            :data="goodsData"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            style="width: 100%">
                <el-table-column
                    prop="goods_id"
                    align="center"
                    label="商品id">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="商品名">
                    <template slot-scope="scope">
                        <span :title="scope.row.goods_name">{{scope.row.goods_name.slice(0,7)+"..."}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="数量">
                    <template slot-scope="scope">
                        <el-input size="mini" style="width:80%" v-model="scope.row.back_goods_number"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="商品编码">
                    <template slot-scope="scope">
                        <el-input size="mini" style="width:80%" v-model="scope.row.goods_sn"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="属性">
                    <template slot-scope="scope">
                        <el-input size="mini" style="width:80%" v-model="scope.row.goods_attr"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="价格">
                    <template slot-scope="scope">
                        <el-input size="mini" style="width:80%" v-model="scope.row.back_goods_price"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="库存">
                    <template slot-scope="scope">
                        <el-input size="mini" style="width:80%" v-model="scope.row.goods_number"></el-input>
                    </template>
                </el-table-column>   
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogDetail = false">取 消</el-button>
                <el-button size="small" type="primary" @click="dialogDetail = false">确定</el-button>
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
<style scope>
    #retailReturnList{
        text-align:center;
        margin: 20px;
    }
    #retailReturnList .el-dialog .el-input{
       width:10%;
    }
    #retailReturnList .main-header{
        text-align:left;
        margin-bottom: 10px;
        padding:10px;
        background:#fff;
    }
    #retailReturnList .main-header .el-breadcrumb {
        margin: 8px 0 0 10px;
    }
    #retailReturnList .el-select{
        width:100px;
    }
    #retailReturnList .el-input{
        width:160px;
    }
    #retailReturnList .el-table{
        margin:20px 0;
    } 
    #retailReturnList .el-pagination{
        text-align: right;
        margin: 20px 0;
    }
    #retailReturnList .el-upload{
        margin:20px 0;
    }
    #retailReturnList .el-pagination__jump .el-input{
        width:50%;
    }
    #retailReturnList .el-form-item{
        margin-bottom: -10px;
    }
    #retailReturnList .el-form .el-form-item .el-input {
        width: 80%;
    }
    #retailReturnList .detail .el-input{
        width:100%;
    }
    #retailReturnList .detail .el-row{
        border-bottom: 1px dotted #DCDFE6;
    }
</style>    
<script>
import {retailReturnList,supplier} from '../../api/api' ;
import {reretailReturnDe} from '../../api/apiW' ;
  export default {
      inject: ['reload'],
    data() {
      return {
        selectSupplier:false,
        dialogDetail:false,
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
        retailReturnData: [],
        SupplierData: [],
        multipleSelection: [],
        goodsData:[],
        formDetail:{}
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
        handleCurrentChange(val) {
            console.log(val);
            retailReturnList({params:{page:val,page_size:10}}).then(res=>{
                console.log(res.data);
                this.retailReturnData=res.data.back;
            })      
        },
        supplier(){
            this.SupplierData=[];
            supplier({params:{supplier_id:this.supplier_id}}).then(res=>{
                console.log(res.data);
                this.SupplierData.push(res.data);
            })
        },
        showDetails(row){
            reretailReturnDe({params:{back_id:row.back_id}}).then(res=>{
                this.formDetail=res.data;
                this.goodsData=res.data.back_goods;
            });
        },
    },
    created: function () {
        retailReturnList({params:{page:1,page_size:10}}).then(res=>{
            this.pages=Math.ceil(res.data.filter.record_count/10);
            console.log(res.data);
            this.retailReturnData=res.data.back;
        })
    }
  }
</script>