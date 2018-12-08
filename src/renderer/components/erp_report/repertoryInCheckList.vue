<template>
    <div id="repertoryInCheckList">
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>报表</el-breadcrumb-item>
                <el-breadcrumb-item>采购入库对账单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- <el-input	size="small" v-model="orderDate" placeholder="单据编号"></el-input>
        <el-input	size="small" v-model="orderDate" placeholder="开始日期"></el-input>
        <el-input	size="small" v-model="orderDate" placeholder="结束日期"></el-input> -->        
        <el-input	size="small" v-model="orderDate" placeholder="全部供应商" @focus="selectSupplier=true"></el-input>        
        <!--弹出窗口-->
        <el-dialog
            title="选择供应商"
            :visible.sync="selectSupplier"
            width="95%"
            :before-close="handleClose">
            名称 :<el-input v-model="orderDate" placeholder="供应商名称"></el-input>          
            编号 :<el-input v-model="supplier_id" placeholder="供应商编号"></el-input>          
            联系人 :<el-input v-model="orderDate" placeholder="联系人"></el-input>          
            联系电话 :<el-input v-model="orderDate" placeholder="联系电话"></el-input>          
            备注信息 :<el-input v-model="orderDate" placeholder="备注信息"></el-input> 
            <el-button type="primary" @click="supplier">搜索</el-button>
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
                <el-button @click="selectSupplier=false">取 消</el-button>
                <el-button type="primary" @click="selectSupplier=false">确 定</el-button>
            </span>
        </el-dialog> 
        <!---->
        <!-- <el-select	size="small" v-model="value" placeholder="付款状态">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>        
        <el-select	size="small" v-model="value" placeholder="结算账户">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>        
        <el-select	size="small" v-model="value" placeholder="操作用户">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>        
        <el-button	size="small" type="primary">搜索</el-button>
        <el-button	size="small" type="primary">导出</el-button> -->
        <el-button	size="small" type="primary" @click="reset">刷新</el-button>
        <el-table
            :data="repertoryInCheckData"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            style="width: 100%">
            <el-table-column
                prop="add_time"
                align='center'
                label="单据日期">
            </el-table-column>
            <el-table-column
                prop="purchase_sn"
                align='center'
                label="单据编号">
            </el-table-column>
            <el-table-column
                prop="supplier_name"
                align='center'
                label="供应商">
            </el-table-column>
            <el-table-column
                prop=""
                align='center'
                label="结算账户	">
            </el-table-column>
            <el-table-column
                prop="money"
                align='center'
                label="单据金额">
            </el-table-column>
            <el-table-column
                prop="money"
                align='center'
                label="实际金额">
            </el-table-column>        
            <el-table-column
                prop="money"
                align='center'
                label="实付金额">
            </el-table-column>
            <el-table-column
                prop="admin_name"
                align='center'
                label="制单人">
            </el-table-column>               
            <el-table-column
                prop="status_name"
                align='center'
                label="付款状态">
            </el-table-column>
            <el-table-column
                align='center'
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showDetails(scope.row),dialogDetail = true">详情</el-button>
                        <!-- <el-button type="text" size="small" @click="capitalOperation = true" >资金操作</el-button> -->
                    </template>
            </el-table-column>         
        </el-table>
        <!--资金操作弹窗-->        
        <!-- <el-dialog width="80%" title="资金操作" :visible.sync="capitalOperation">
            <div class="capital">
                资金金额：<el-input style="width:30%"></el-input>
                实付金额：<el-input style="width:30%"></el-input>
                <hr style="border:1px dashed #DCDFE6"/>
                结算账户：<el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select><br><br>
                结算账户：<el-input style="width:30%"></el-input>
                结算金额：<el-input style="width:30%"></el-input>   
                <hr style="border:1px dashed #DCDFE6"/>  
                    <el-table
                    :data="tableData3"
                    border
                    :row-style="{height:0}"  
                    :cell-style="{padding:0}"
                    :header-row-style="{height:0}"  
                    :header-cell-style="{padding:0}"
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="操作时间"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="结算账户"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="结算金额">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="制单人"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="备注信息"
                        width="180">
                    </el-table-column>
                    <el-table-column
                prop="pRemark"
                align='center'
                label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">删除</el-button>
                    </template>
            </el-table-column> 
                    </el-table>           
            </div>
        </el-dialog> -->
        <!--详情弹窗-->        
        <el-dialog width="80%" title="采购入库单详情" :visible.sync="dialogDetail">
            <!--供应商弹窗-->            
            供应商 :<el-input v-model="orderDate" placeholder="请点击选择" @focus="select=true"></el-input>        
            <el-dialog
                title="选择供应商"
                :visible.sync="select"
                width="75%" :append-to-body="true" align="center"
                :before-close="handleClose">
                名称 :<el-input v-model="orderDate" placeholder="供应商名称" style="width:10%"></el-input>          
                编号 :<el-input v-model="supplier_id" placeholder="供应商编号" style="width:10%"></el-input>          
                联系人 :<el-input v-model="orderDate" placeholder="联系人" style="width:10%"></el-input>          
                联系电话 :<el-input v-model="orderDate" placeholder="联系电话" style="width:10%"></el-input>          
                备注信息 :<el-input v-model="orderDate" placeholder="备注信息" style="width:10%"></el-input> 
                <el-button type="primary" @click="supplier">搜索</el-button>
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
                    <el-button @click="select=false">取 消</el-button>
                    <el-button type="primary" @click="select=false">确 定</el-button>
                </span>
            </el-dialog> 
            <!---->
            单据日期 :<el-input v-model="orderDate"></el-input>
            单据编号 :<el-input v-model="orderId"></el-input>
            <el-button type="primary">反审核数据</el-button>
            <el-button type="primary">重新载入</el-button>
            <el-table
                v-loading="loading"
                :data="repertoryInCheckDetailsData"
                border
                :row-style="{height:0}"  
                :cell-style="{padding:0}"
                :header-row-style="{height:0}"  
                :header-cell-style="{padding:0}"
                style="width: 100%">
                <el-table-column
                    prop="purchase_sn"
                    label="商品信息">
                </el-table-column>
                <el-table-column
                    prop="add_time"
                    label="辅助属性">
                </el-table-column>
                <el-table-column
                    prop="purchase_goods[0].store_name"
                    label="所入仓库（批量）">
                </el-table-column>
                <el-table-column
                    prop="purchase_goods[0].goods_sn"
                    label="商品串码">
                </el-table-column>                  
                <el-table-column
                    prop="purchase_goods[0].number"
                    label="数量">
                </el-table-column>        
                <el-table-column
                    prop="money"
                    label="采购单价">
                </el-table-column>        
                <el-table-column
                    prop="real_money"
                    label="采购金额">
                </el-table-column>        
                <el-table-column
                    prop="purchase_goods[0].goods_sn"
                    label="商品批次">
                </el-table-column>        
                <el-table-column
                    prop="note"
                    label="备注信息">
                </el-table-column>        
            </el-table>
            <!--分页-->
            <el-pagination
                layout="prev, pager, next,jumper"
                :page-count="page">
            </el-pagination>
        </el-dialog>
        <!--分页-->
        <el-pagination
            @current-change="handleCurrentChange"
            layout="total, prev, pager, next,jumper"
            :total="total"
            :page-size="page_size">
        </el-pagination>     
    </div>
</template>    
<script>
import axios from 'axios' ;
import {getRpurchasebillList,getRpurchasebillDetail,getsupplierList} from '../../api/api'
  export default {
    inject: ['reload'], 
    data() {
      return {
        page:1,
        page_size:10,
        total:0,
        loading:true,
        purchase_id:'',
        dialogDetail:false,
        select:false,
        selectSupplier:false,
        capitalOperation:false,
        options: [{
          value: '选项1',
          label: '默认值'
        }],
        value: '',
        input:'',
        orderDate:'',
        orderId:'',
        supplier_id:'2',
        repertoryInCheckData: [],
        SupplierData:[],
        repertoryInCheckDetailsData:[],
        tableData3: [{
          date: 'text',
          name: 'text',
          address: 'text'
        }],
        multipleSelection: []
      }
    },
    methods:{
        reset(){
            this.reload();
        },
        initData() { // 获取入库单列表
          let data = {
              subsite_id:3,
              user_id:sessionStorage.user_id,
              page:this.page,
              page_size:this.page_size
          }
        getRpurchasebillList({params:data}).then(res=>{
            console.log(res)
            if(res.errno == 0) {
                this.repertoryInCheckData=res.data.arr;
                this.total = Number(res.data.record_count)
                this.loading = false
                }
            })
        },
        handleClose(done) {
            done();
            this.SupplierData=[];
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleCurrentChange(val) {
            this.page = val
            this.initData()
        },
        supplier(){
          this.SupplierData=[];
          console.log(this.supplier_id);
          axios.get('http://api.guimishuo1.com/erp/supplier/view?supplier_id='+this.supplier_id)
            .then((res)=>{
                console.log(res.data.data);
                this.SupplierData.push(res.data.data);          
            },function(error){
                console.log(error);
            });
        },
        showDetails(row){
            this.repertoryInCheckDetailsData=[];
            console.log(row.purchase_id);
            axios.get('http://api.guimishuo1.com/erp/rpurchasebill/view?purchase_id='+row.purchase_id)
                .then((res) =>{
                    console.log(res.data.data);
                    this.repertoryInCheckDetailsData.push(res.data.data);
                }, function (error) {
                    console.log(error);
            }); 
        } 
    },
    created: function () { 
      this.initData()
    },
  }
</script>
<style>
    #repertoryInCheckList{
        text-align:center;
        margin: 20px;
    }
    #repertoryInCheckList .main-header{
        text-align:left;
        margin-bottom: 10px;
        padding: 10px;
        background: #fff;
    }
    #repertoryInCheckList .main-header .el-breadcrumb {
        margin: 8px 0 0 10px;
        }
    #repertoryInCheckList .el-select{
        width:100px;
    }
    #repertoryInCheckList .el-input{
        width:100px;
    }
    #repertoryInCheckList .el-table{
        margin:20px 0;
    } 
    #repertoryInCheckList .el-pagination{
        text-align: right;
        margin: 20px 0;
    }
    #repertoryInCheckList .el-pagination__jump .el-input{
        width:50%;
    }
</style>
