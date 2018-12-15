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
        <div style="margin:10px 0;text-align:center">
            <el-input  prefix-icon="el-icon-search" style="width:15%" v-model="search"  size="mini"  placeholder="输入关键字搜索"/>
            <el-input	size="small" v-model="orderDate" placeholder="点击选择客户" @focus="selectSupplier=true"></el-input>     
            <el-button icon="el-icon-tickets"  style="float:right;margin-right:20px" type="primary" size="small" @click="dialogShow=true">显示列</el-button>
            <el-button type="primary" size="small" @click="reset">刷新</el-button>
        </div>
        <!-- 按需选择列弹窗 -->
        <el-dialog
        title="按需选择列" style="text-align:left"
        :visible.sync="dialogShow"
        :before-close="handleClose"
        width="200px">
            <el-checkbox v-model="serveListshow.show1">单据id</el-checkbox><br>
            <el-checkbox v-model="serveListshow.show2">订单编号</el-checkbox><br>
            <el-checkbox v-model="serveListshow.show3">服务数量</el-checkbox><br>
            <el-checkbox v-model="serveListshow.show4">服务价格</el-checkbox><br>
            <el-checkbox v-model="serveListshow.show5">总金额</el-checkbox><br>
            <el-checkbox v-model="serveListshow.show6">客户名</el-checkbox><br>
            <el-checkbox v-model="serveListshow.show7">状态</el-checkbox><br>
            <el-checkbox v-model="serveListshow.show8">备注</el-checkbox><br><br>
        </el-dialog>
        <el-table
        :data="serveData.filter(data =>  {
            return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1})})"
        border
        :row-style="{height:0}"  
        :cell-style="{padding:0}"
        :header-row-style="{height:0}"  
        :header-cell-style="{padding:0}"
        style="width: 100%">
            <el-table-column
                prop="order_id"
                v-if="serveListshow.show1"
                align="center"
                label="单据id">
            </el-table-column>
            <el-table-column
                prop="order_sn"
                v-if="serveListshow.show2"
                align="center"
                label="订单编号">
            </el-table-column>
            <el-table-column
                prop="discount"
                v-if="serveListshow.show3"
                align="center"
                label="服务数量">
            </el-table-column>
            <el-table-column
                prop="goods_amount"
                v-if="serveListshow.show4"
                align="center"
                label="服务价格">
            </el-table-column>
            <el-table-column
                prop="goods_amount"
                v-if="serveListshow.show5"
                align="center"
                label="总金额">
            </el-table-column>                 
            <el-table-column
                prop="user_name"
                v-if="serveListshow.show6"
                align="center"
                label="客户名">
            </el-table-column>                 
            <el-table-column
                prop="status_name"
                v-if="serveListshow.show7"
                align="center"
                label="状态">
            </el-table-column> 
            <el-table-column
                prop="pay_note"
                v-if="serveListshow.show8"
                align="center"
                label="备注">
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
            layout="total,prev, pager, next,jumper"
            :total="record_count">
        </el-pagination>
    </div>
</template>
<style scoped>
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
        padding: 10px;
        background: #fff;
    }
    #serveList .main-header .el-breadcrumb {
        margin: 8px 0 0 10px;
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
        dialogShow:false,
        record_count:0,
        search:'',
        value: '',
        input:'',
        orderDate:'',
        orderId:'',
        pages:0,
        user_id:110,
        serveData: [],
        customerData: [],
        multipleSelection: [],
        goodsData:[],
        formDetail:{},
        serveListshow:{
            show1:true,
            show2:true,
            show3:true,
            show4:true,
            show5:true,
            show6:true,
            show7:true,
            show8:true,
        },
      }
    },
    methods:{
        init(page){
            serveList({params:{page:page,page_size:10}}).then(res=>{
                this.record_count=Number(res.data.filter.record_count);
                console.log(res.data);
                this.serveData=res.data.gather_list;
            })
        },
        reset(){
            this.reload();
        },
        handleClose(done) {
            done();
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            erpTableSetting.serveList=this.serveListshow;
            localStorage.erpTableSetting=JSON.stringify(erpTableSetting);
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
            this.init(val);
        },
        showDetails(row){
            itemorderDe({params:{order_id:row.order_id}}).then(res=>{
                this.formDetail=res.data;
                this.goodsData=res.data.order_goods;
            });
        }, 
    },
    created: function () { 
        if(localStorage.erpTableSetting!==undefined){
            console.log("yes");
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting); 
            if(erpTableSetting.serveList!==undefined){
                this.serveListshow=erpTableSetting.serveList;
            }
        }else{
            console.log("no");
        };
        this.init(1);
    }
  }
</script>