<template>
    <div id="sellReturnCheckList">
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>报表</el-breadcrumb-item>
                <el-breadcrumb-item>销货退货对账单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
       <!--  <el-input	size="small" v-model="orderDate" placeholder="单据编号"></el-input>
        <el-input	size="small" v-model="orderDate" placeholder="开始日期"></el-input>
        <el-input	size="small" v-model="orderDate" placeholder="结束日期"></el-input>  -->       
        <!--弹出窗口-->
        <el-input	size="small" v-model="orderDate" placeholder="全部客户" @focus="selectSupplier=true"></el-input>        
        <el-dialog
        title="选择客户"
        :visible.sync="selectSupplier"
        width="95%"
        :before-close="handleClose">
            名称 :<el-input	size="small" v-model="orderDate" placeholder="客户名称"></el-input>          
            编号 :<el-input	size="small" v-model="user_id" placeholder="客户编号"></el-input>          
            联系人 :<el-input	size="small" v-model="orderDate" placeholder="联系人"></el-input>          
            手机号 :<el-input	size="small" v-model="orderDate" placeholder="手机号"></el-input>          
            备注信息 :<el-input	size="small" v-model="orderDate" placeholder="备注信息"></el-input> 
            <el-button	size="small" type="primary" @click="customer">搜索</el-button>
            <el-table
            ref="multipleTable"
            :data="customerData"
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
                prop="user_name"
                label="客户名称"
                width="100">
                </el-table-column>
                <el-table-column
                prop="user_id"
                label="客户编号"
                width="100">
                </el-table-column>
                <el-table-column
                prop="real_name"
                label="联系人"
                width="90">
                </el-table-column>
                <el-table-column
                prop="mobile_phone"
                label="手机号"
                width="100">
                </el-table-column>
                <el-table-column
                prop="birthday"
                label="生日"
                width="100">
                </el-table-column>
                <el-table-column
                prop="address"
                label="客户地址"
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="客户积分"
                width="100">
                </el-table-column>
                <el-table-column
                prop="visit_count"
                label="社交账号"
                width="100">
                </el-table-column>
                <el-table-column
                prop="email"
                label="邮箱地址"
                width="100">
                </el-table-column>
                <el-table-column
                prop="real_name"
                label="开户名"
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="开户行"
                width="100">
                </el-table-column>
                <el-table-column
                prop="card"
                label="银行账户"
                width="100">
                </el-table-column>
                <el-table-column
                prop=""
                label="税号"
                width="100">
                </el-table-column>
                <el-table-column
                prop=""
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
        <el-input placeholder="请输入单据编号" @input="search" v-model="keywords" style="width:20%;margin-right:10px" size="small">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
        <!-- <el-button	size="small" type="primary">导出</el-button> -->
        <el-button	size="small" type="primary" @click="reset">刷新</el-button>
        <el-table
        v-loading="loading"
        :data="sellReturnCheckData"
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
                prop="order_sn"
                align='center'
                label="单据编号">
            </el-table-column>
            <el-table-column
                prop="pId"
                align='center'
                label="供应商">
            </el-table-column>
            <el-table-column
                prop="consignee"
                align='center'
                label="结算账户	">
            </el-table-column>
            <el-table-column
                prop="refund_money_1"
                align='center'
                label="单据金额">
            </el-table-column>
            <el-table-column
                prop="refund_money_1"
                align='center'
                label="实际金额">
            </el-table-column>        
            <el-table-column
                prop="pMsg"
                align='center'
                label="实付金额">
            </el-table-column>
            <el-table-column
                prop="consignee"
                align='center'
                label="制单人">
            </el-table-column>               
            <el-table-column
                prop="status_money"
                align='center'
                label="付款状态">
            </el-table-column>
            <el-table-column
                prop="pRemark"
                align='center'
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showDetails(scope.row),dialogDetail = true">详情</el-button>
                        <!-- <el-button type="text" size="small" @click="capitalOperation = true">资金操作</el-button> -->
                    </template>
            </el-table-column>         
        </el-table>
        <!--资金操作弹窗-->        
        <!-- <el-dialog width="50%" title="资金操作" :visible.sync="capitalOperation">
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
        <el-dialog width="80%" title="销货退货对账单详情" :visible.sync="dialogDetail">
            <!--客户弹窗-->            
            客户 :<el-input v-model="orderDate" placeholder="请点击选择" @focus="select=true"></el-input>        
            <el-dialog
            title="选择客户"
            :visible.sync="select"
            width="75%" :append-to-body="true" align="center"
            :before-close="handleClose">
                名称 :<el-input v-model="orderDate" placeholder="客户名称" style="width:10%"></el-input>          
                编号 :<el-input v-model="user_id" placeholder="客户编号" style="width:10%"></el-input>          
                联系人 :<el-input v-model="orderDate" placeholder="联系人" style="width:10%"></el-input>          
                联系电话 :<el-input v-model="orderDate" placeholder="联系电话" style="width:10%"></el-input>          
                备注信息 :<el-input v-model="orderDate" placeholder="备注信息" style="width:10%"></el-input> 
                <el-button type="primary" @click="customer">搜索</el-button>
                <el-table
                ref="multipleTable"
                :data="customerData"
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
                    prop="user_name"
                    label="客户名称"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="user_id"
                    label="客户编号"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="real_name"
                    label="联系人"
                    width="90">
                    </el-table-column>
                    <el-table-column
                    prop="mobile_phone"
                    label="手机号"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="birthday"
                    label="生日"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="客户地址"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="客户积分"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="visit_count"
                    label="社交账号"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="email"
                    label="邮箱地址"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="real_name"
                    label="开户名"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="开户行"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="card"
                    label="银行账户"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop=""
                    label="税号"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop=""
                    label="备注信息"
                    show-overflow-tooltip>
                    </el-table-column>
                </el-table>
            </el-dialog> 
            <!---->
            单据日期 :<el-input v-model="orderDate"></el-input>
            单据编号 :<el-input v-model="orderId"></el-input>
            <el-button type="primary">反审核数据</el-button>
            <el-button type="primary">重新载入</el-button>
            <el-table
            :data="salebillDetailData"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            style="width: 100%">
                <el-table-column
                    prop="goods_info[0].goods_name"
                    label="商品信息">
                </el-table-column>
                <el-table-column
                    prop="back.order_sn"
                    label="商品批次">
                </el-table-column>
                <el-table-column
                    prop="back.order_sn"
                    label="商品串码">
                </el-table-column>                  
                <el-table-column
                    prop=""
                    label="数量">
                </el-table-column>        
                <el-table-column
                    prop="back.refund_money_1"
                    label="退货单价">
                </el-table-column>        
                <el-table-column
                    prop="back.refund_money_2"
                    label="退货金额">
                </el-table-column>      
                <el-table-column
                    prop=""
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
<style>
    #sellReturnCheckList{
        text-align:center;
        margin:20px;
    }
    #sellReturnCheckList .main-header{
        text-align:left;
        margin-bottom: 10px;
        padding: 10px;
        background: #fff;
    }
    #sellReturnCheckList .main-header .el-breadcrumb {
        margin: 8px 0 0 10px;
    }
    #sellReturnCheckList .el-select{
        width:100px;
    }
    #sellReturnCheckList .el-input{
        width:100px;
    }
    #sellReturnCheckList .el-table{
        margin:20px 0;
    } 
    #sellReturnCheckList .el-pagination{
        text-align: right;
        margin: 20px 0;
    }
    #sellReturnCheckList .el-pagination__jump .el-input{
        width:50%;
    }
</style>    
<script>
import axios from 'axios' ;
import {getResalebillList} from '../../api/api'
import {getResalebillDetail} from '../../api/apiW'
  export default {
    inject: ['reload'],
    data() {
      return {
        page:1,
        page_size:10,
        total:0,
        loading:true,
        dialogDetail:false,
        select:false,
        selectSupplier:false,
        capitalOperation:false,
        keywords:'',
        options: [{
          value: '选项1',
          label: '默认值'
        }],
        value: '',
        input:'',
        orderDate:'',
        orderId:'',
        user_id:110,
        sellReturnCheckData: [],
        customerData: [],
        salebillDetailData: [],
          tableData3: [{
          date: 'text',
          name: 'text',
          address: 'text'
        }],
        multipleSelection: []
      }
    },
    methods:{
        search() {
            getResalebillList({params:{
                page:1,
                page_size:10,
                order_sn:this.keywords
            }}).then(res=>{
                console.log(res)
                if(res.errno == 0) {
                this.sellReturnCheckData=res.data.back
                this.total = Number(res.data.record_count)
                this.loading = false
                }
            })
        }, 
        reset(){
            this.reload();
        },
        initData() { // 获取客户列表
            let data = {
                subsite_id:3,
                user_id:sessionStorage.user_id,
                page:this.page,
                page_size:this.page_size
            }
            getResalebillList({params:data}).then(res=>{
                console.log(res)
                if(res.errno == 0) {
                this.sellReturnCheckData=res.data.back
                this.total = Number(res.data.record_count)
                this.loading = false
                }
            })
        },
        showDetails(row){
            this.salebillDetailData=[];
            getResalebillDetail({params:{ back_id: row.back_id }}).then(res => {
                console.log(res.data);
                this.salebillDetailData.push(res.data);
            });
        },
        handleClose(done) {
            done();
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        customer(){
            this.customerData=[];
            axios.get('http://api.guimishuo1.com/erp/customer/view?user_id='+this.user_id)
            .then((res) =>{
                console.log(res.data.data);
                this.customerData.push(res.data.data); 
                console.log(this.customerData);
            }, function (error) {
                console.log(error);
            });
        },
        handleCurrentChange(val) {
           this.page = val
            this.initData()
        }
    },
    created: function () { 
      this.initData()
    },
  }
</script>
