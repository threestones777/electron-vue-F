<template>
    <div id="sellCheckList">
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>报表</el-breadcrumb-item>
                <el-breadcrumb-item>销货对账单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- <el-input	size="small" v-model="orderDate" placeholder="单据编号"></el-input>
        <el-input	size="small" v-model="orderDate" placeholder="开始日期"></el-input>
        <el-input	size="small" v-model="orderDate" placeholder="结束日期"></el-input>  -->       
        <el-input	size="small" v-model="orderDate" placeholder="全部客户" @focus="selectSupplier=true"></el-input>        
        <!--弹出窗口-->
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
                <el-button @click="selectSupplier=false">取 消</el-button>
                <el-button type="primary" @click="selectSupplier=false">确 定</el-button>
            </span>
        </el-dialog> 
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
        </el-select> -->        
        <el-input placeholder="请输入单据编号" @input="search" v-model="keywords" style="width:20%;margin-right:10px" size="small">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
        <!-- <el-button	size="small" type="primary">导出</el-button> -->
        <el-button	size="small" type="primary" @click="reset">刷新</el-button>
        <el-table
        v-loading="loading"
        :data="sellCheckData"
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
                label="购买客户">
            </el-table-column>
            <el-table-column
                prop="pClass"
                align='center'
                label="结算账户">
            </el-table-column>
            <el-table-column
                prop="order_amount"
                align='center'
                label="单据金额">
            </el-table-column>
            <el-table-column
                prop="order_amount"
                align='center'
                label="优惠金额">
            </el-table-column>        
            <el-table-column
                prop="order_amount"
                align='center'
                label="实付金额">
            </el-table-column>
            <el-table-column
                prop="admin"
                align='center'
                label="制单人">
            </el-table-column>               
            <el-table-column
                prop="order_status"
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
        <el-dialog width="80%" title="销货单详情" :visible.sync="dialogDetail">
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
            :data="sellCheckDeData"
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
                    prop="pProp"
                    label="所属仓库">
                </el-table-column>
                <el-table-column
                    prop="pId"
                    label="当前库存">
                </el-table-column>
                <el-table-column
                    prop="goods_info[0].goods_sn"
                    label="商品编码">
                </el-table-column>                  
                <el-table-column
                    prop="pRemark"
                    label="商品单位">
                </el-table-column>        
                <el-table-column
                    prop="pRemark"
                    label="商品货拉">
                </el-table-column>        
                <el-table-column
                    prop="pRemark"
                    label="赠送积分">
                </el-table-column>        
                <el-table-column
                    prop="add_time"
                    label="零售名称">
                </el-table-column>        
                <el-table-column
                    prop="pRemark"
                    label="商品批次">
                </el-table-column>        
                <el-table-column
                    prop="goods_info[0].goods_sn"
                    label="商品串码">
                </el-table-column>        
                <el-table-column
                    prop="goods_info[0].goods_number"
                    label="数量">
                </el-table-column>        
                <el-table-column
                    prop="goods_info[0].goods_price"
                    label="销售单价">
                </el-table-column>        
                <el-table-column
                    prop="pRemark"
                    label="折扣（数量）">
                </el-table-column>        
                <el-table-column
                    prop="pRemark"
                    label="销货金额">
                </el-table-column>        
                <el-table-column
                    prop="nav.admin"
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
    #sellCheckList{
        text-align:center;
        margin: 20px;
    }
    #sellCheckList .main-header{
        text-align:left;
        margin-bottom:10px;
        padding: 10px;
        background: #fff;
    }
    #sellCheckList .main-header .el-breadcrumb {
        margin: 8px 0 0 10px;
    }
    #sellCheckList .el-select{
        width:100px;
    }
    #sellCheckList .el-input{
        width:100px;
    }
    #sellCheckList .el-table{
        margin:20px 0;
    } 
    #sellCheckList .el-pagination{
        text-align: right;
        margin: 20px 0;
    }
    #sellCheckList .el-pagination__jump .el-input{
        width:50%;
    }
</style>    
<script>
import axios from 'axios' ;
import {getSalebillList} from '../../api/api'
import {salebillDetail} from '../../api/apiW'
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
          value: '选项',
          label: '默认值'
        }],
        value: '',
        input:'',
        orderDate:'',
        orderId:'',
        customerData:[],
        user_id:110,
        sellCheckData: [],
        sellCheckDeData: [],
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
            getSalebillList({params:{
                page:1,
                page_size:10,
                order_sn:this.keywords
            }}).then(res=>{
                console.log(res.data)
                if(res.errno == 0) {
                this.sellCheckData=res.data.orders;
                this.total = Number(res.data.record_count)
                this.loading = false
                }
            })
        }, 
        reset(){
            this.reload();
        },
        initData() { // 获取销货列表
            let data = {
                subsite_id:3,
                user_id:sessionStorage.user_id,
                page:this.page,
                page_size:this.page_size
            }
            getSalebillList({params:data}).then(res=>{
                console.log(res.data)
                if(res.errno == 0) {
                this.sellCheckData=res.data.orders;
                this.total = Number(res.data.record_count)
                this.loading = false
                }
            })
        },
        handleClose(done) {
            done();
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        showDetails(row){
            this.sellCheckDeData=[];
            salebillDetail({params:{ order_id: row.order_id }}).then(res => {
                console.log(res.data.nav);
                this.sellCheckDeData.push(res.data);
            });
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
