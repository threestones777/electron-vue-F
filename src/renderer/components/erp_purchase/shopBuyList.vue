<template>
    <div id="shopBuyList">
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>购货</el-breadcrumb-item>
                <el-breadcrumb-item>购货单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>        
        <!--弹出窗口-->
         <el-input	size="small" v-model="orderDate" placeholder="请点击选择供应商" @focus="selectSupplier=true"></el-input>        
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
            <el-button	size="small" type="primary" @click="supplier">搜索</el-button><br><br>
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
        <!--<el-input	size="small" v-model="orderDate" placeholder="单据日期"></el-input>
        <el-input	size="small" v-model="orderId" placeholder="单据编号"></el-input>
        <el-button	size="small" type="primary">提交单据</el-button> -->
        <el-button	size="small" type="primary" @click="reset">刷新</el-button><br><br>       
        <el-table
            :data="shopBuyData"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:7}"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}">
            <el-table-column
            prop="purchase_id"
            label="购货单id"
            sortable>
            </el-table-column>
            <el-table-column
            prop="purchase_sn"
            label="购货单编号"
            sortable>
            </el-table-column>
            <el-table-column
            prop="purchase_sn"
            label="采购单编号"
            sortable>
            </el-table-column>
            <el-table-column
            prop="add_time"
            label="日期"
            sortable>
            </el-table-column>
            <el-table-column
            prop="money"
            label="金额"
            sortable>
            </el-table-column>
            <el-table-column
            prop="real_money"
            label="实际金额"
            sortable>
            </el-table-column>
            <el-table-column
            prop="note"
            label="备注信息"
            sortable>
            </el-table-column>
            <el-table-column
            fixed="right"
            align="center"
            label="相关操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="showDetails(scope.row),dialogDetail = true">详情</el-button>
                </template>
            </el-table-column> 
        </el-table><br> <br>
        <!-------------------------------------------------------- 详情弹窗 ---------------------------------------------------------------->
        <el-dialog width="800px" title="购货单详情" :visible.sync="dialogDetail">
            <el-form :model="formDetail" class="detail" style="text-align:center">
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        单据sn<el-input v-model="formDetail.purchase_id"></el-input>    
                    </el-col>
                    <el-col :span="7">
                        采购单编号<el-input v-model="formDetail.purchase_sn"></el-input>
                    </el-col>
                    <el-col :span="7">
                        供货商编号<el-input v-model="formDetail.supplier_id"></el-input>
                    </el-col>
                </el-row>                
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        添加时间<el-input v-model="formDetail.add_time"></el-input>    
                    </el-col>
                    <el-col :span="7">
                        单据金额<el-input v-model="formDetail.money"></el-input>
                    </el-col>
                    <el-col :span="7">
                        备注<br><el-input v-model="formDetail.real_money"></el-input>
                    </el-col>
                </el-row>                
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        退货时间<el-input v-model="formDetail.real_pay_money"></el-input>    
                    </el-col>
                    <el-col :span="7">
                        状态名<el-input v-model="formDetail.note"></el-input>
                    </el-col>
                    <el-col :span="7">
                        管理员id<el-input v-model="formDetail.adminid"></el-input>
                    </el-col>
                </el-row>                
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        管理员名称<el-input v-model="formDetail.admin_name"></el-input>    
                    </el-col>
                    <el-col :span="7">
                        供应商名称<el-input v-model="formDetail.supplier_name"></el-input>
                    </el-col>
                </el-row>                
            </el-form><br>
            <h1>单据商品</h1><br><br>
            <el-table
            :data="goodsData"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            style="width: 100%">
                <el-table-column
                    prop="id"
                    align="center"
                    label="id">
                </el-table-column>
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
                        <el-input size="mini" style="width:80%" v-model="scope.row.number"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="价格">
                    <template slot-scope="scope">
                        <el-input size="mini" style="width:80%" v-model="scope.row.per_price"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="属性">
                    <template slot-scope="scope">
                        <el-input size="mini" style="width:80%" v-model="scope.row.attr_value"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="仓库">
                    <template slot-scope="scope">
                        <el-input size="mini" style="width:80%" v-model="scope.row.store_id"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="备注">
                    <template slot-scope="scope">
                        <el-input size="mini" style="width:80%" v-model="scope.row.note"></el-input>
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
<style scoped>
    #shopBuyList{
        text-align:center;
        margin: 20px;
    }
    #shopBuyList .el-dialog .el-input{
       width:10%;
    }
    #shopBuyList .main-header{
        text-align:left;
        margin-bottom:10px;
        padding:10px;
        background:#fff;
    }
    #shopBuyList .main-header .el-breadcrumb {
        margin: 8px 0 0 10px;
    }
    #shopBuyList .el-select{
        width:100px;
    }
    #shopBuyList .el-input{
        width:150px;
    }
    #shopBuy .el-table{
        margin:20px 0;
    } 
    #shopBuyList .el-pagination{
        text-align: right;
        margin:20px 0 50px 0;
    }
    #shopBuyList .el-pagination__jump .el-input{
        width:50%;
    }
    #shopBuyList .detail .el-input{
        width:100%;
    }
</style>    
<script>
import {shopBuyList,supplier} from '../../api/api' ;
import {purchaseDe} from '../../api/apiW' ;
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
        pages:0,
        total:7,
        value: '',
        input:'',
        orderDate:'',
        orderId:'',
        supplier_id:'2',
        tableData: [{
          date: 'text',
          name: 'text',
          address: 'text'
        }],
        SupplierData: [],
        shopBuyData: [],
        multipleSelection: [],
        formDetail:{},
        goodsData:[]
      }
    },
    methods:{
        handleClose(done) {
            done();
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        reset() {
            this.reload();
        },
        handleCurrentChange(val) {//-----------------------------分页查询数据
            console.log(val);
            shopBuyList({params:{page:val,page_size:10}}).then(res=>{
                console.log(res.data);
                this.shopBuyData=res.data.gather_list;
            }) 
        },
        supplier(){//----------------------------获取供应商
            this.SupplierData=[];
            console.log(this.supplier_id);
            supplier({params:{supplier_id:this.supplier_id}}).then(res=>{
                console.log(res.data);
                this.SupplierData.push(res.data);
            })
        },
        formatter(row, column) {
            return row.address;
        }, 
        showDetails(row){//----------------------------详情
            purchaseDe({params:{purchase_sn:row.purchase_sn}}).then(res=>{
                this.formDetail=res.data;
                this.goodsData=res.data.purchase_goods;
            });
        },       
    },
    created:function(){
        shopBuyList({params:{page:1,page_size:10}}).then(res=>{
            this.pages=Math.ceil(res.data.filter.record_count/10);
            this.shopBuyData=res.data.gather_list;
        })
    }
  }
</script>