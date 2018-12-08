<template>
    <div id="serveList">
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>零售</el-breadcrumb-item>
                <el-breadcrumb-item>服务订单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--弹出窗口-->
        <el-input	size="small" v-model="orderDate" placeholder="点击选择客户" @focus="selectSupplier=true"></el-input>        
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
            <el-button	size="small" type="success" @click="customer">搜索</el-button>
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
                <el-button	size="small" type="success" @click="selectSupplier=false">确 定</el-button>
            </span>
        </el-dialog> 
        <!---->
        <!-- <el-input	size="small" v-model="orderDate" placeholder="单据日期"></el-input>
        <el-input	size="small" v-model="orderId" placeholder="单据编号"></el-input>
        <el-button	size="small" type="success">提交单据</el-button> -->
        <el-button	size="small" type="primary" @click="reset">刷新</el-button>
        <el-table
        :data="serveData"
        border
        :row-style="{height:0}"  
        :cell-style="{padding:0}"
        :header-row-style="{height:0}"  
        :header-cell-style="{padding:0}"
        style="width: 100%">
            <el-table-column
                prop="user_name"
                align="center"
                label="服务项目">
            </el-table-column>
            <el-table-column
                prop="discount"
                align="center"
                label="服务数量">
            </el-table-column>
            <el-table-column
                prop="goods_amount"
                align="center"
                label="服务价格">
            </el-table-column>
            <el-table-column
                prop="goods_amount"
                align="center"
                label="总金额">
            </el-table-column>                 
            <el-table-column
                prop="status_name"
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
        <el-dialog width="800px" title="服务订单详情" :visible.sync="dialogDetail">
            <el-form :model="formDetail" class="detail" style="text-align:center">
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        单据id<el-input v-model="formDetail.order_id"></el-input>    
                    </el-col>
                    <el-col :span="7">
                        订单编号<el-input v-model="formDetail.order_sn"></el-input>
                    </el-col>
                    <el-col :span="7">
                        单据日期<el-input v-model="formDetail.add_time"></el-input>
                    </el-col>
                </el-row>                
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        单据备注<el-input v-model="formDetail.pay_note"></el-input>    
                    </el-col>
                    <el-col :span="7">
                        单据金额<el-input v-model="formDetail.goods_amount"></el-input>
                    </el-col>
                    <el-col :span="7">
                        优惠金额<br><el-input v-model="formDetail.discount"></el-input>
                    </el-col>
                </el-row>                
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        客户名<el-input v-model="formDetail.user_name"></el-input>    
                    </el-col>
                    <el-col :span="7">
                        制单人<el-input v-model="formDetail.admin_name"></el-input>
                    </el-col>
                    <el-col :span="7">
                        状态<el-input v-model="formDetail.status_name"></el-input>
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
                    prop="goods_id"
                    align="center"
                    label="商品id">
                </el-table-column>
                <el-table-column
                    prop="goods_sn"
                    align="center"
                    label="商品编号">
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
                    label="商品数量">
                    <template slot-scope="scope">
                        <el-input size="mini" style="width:70%" v-model="scope.row.goods_number"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="单价">
                    <template slot-scope="scope">
                        <el-input size="mini" style="width:70%" v-model="scope.row.goods_price"></el-input>
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
<style>
    #serveList{
        text-align:center;
        margin: 20px;
    }
    #serveList .el-dialog .el-input{
       width:10%;
    }
    #serveList .main-header{
        text-align:left;
        margin-bottom: 10px;
    }
    #serveList .el-select{
        width:100px;
    }
    #serveList .el-input{
        width:160px;
        margin:5px 20px 0 0;
    }
    #serveList .el-table{
        text-align:center;
        margin:15px 0;
    } 
    #serveList .el-pagination{
        text-align: right;
        margin: 20px 0;
    }
    #serveList .el-pagination__jump .el-input{
        width:50%;
    }
    #serveList .detail .el-input{
        width:100%;
    }
</style>    
<script>
import {serveList,customer} from '../../api/api' ;
import {itemorderDe} from '../../api/apiW' ;
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
        pages:0,
        user_id:110,
        serveData: [],
        customerData: [],
        tableData3: [{
          date: 'text',
          name: 'text',
          address: 'text'
        }],
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
        customer(){
            this.customerData=[];
            customer({params:{user_id:this.user_id}}).then(res=>{
                console.log(res.data);
                this.customerData.push(res.data);
            })
        },
        handleCurrentChange(val) {
            console.log(val);
            serveList({params:{page:val,page_size:10}}).then(res=>{
                console.log(res.data);
                this.serveData=res.data.gather_list;
            })
        },
        showDetails(row){
            itemorderDe({params:{order_id:row.order_id}}).then(res=>{
                this.formDetail=res.data;
                this.goodsData=res.data.order_goods;
            });
        }, 
    },
    created: function () { 
        serveList({params:{}}).then(res=>{
            this.pages=Math.ceil(res.data.filter.record_count/10);
            serveList({params:{page:1,page_size:10}}).then(res=>{
                console.log(res.data);
                this.serveData=res.data.gather_list;
            })
        })
    }
  }
</script>