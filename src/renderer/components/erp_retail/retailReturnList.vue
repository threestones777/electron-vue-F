<template>
    <div id="retailReturnList">
        <div class="main-header">
            <!-- <h3>温州美联 管理中心</h3> -->
            <el-breadcrumb style="font-size:18px" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>零售</el-breadcrumb-item>
                <el-breadcrumb-item>零售退货单</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="operate-in">
                <!-- <div>
                <i class="el-icon-circle-plus"></i>
                <div>增加</div>
                </div>
                <div>
                <i class="el-icon-edit"></i>
                <div>编辑</div>
                </div>
                <div>
                <i class="el-icon-remove"></i>
                <div>删除</div>
                </div>
                <div>
                <i class="el-icon-circle-check"></i>
                <div>保存</div>
                </div>
                <div>
                <i class="el-icon-circle-close"></i>
                <div>取消</div>
                </div>
                <div>
                <i class="el-icon-view"></i>
                <div>审核</div>
                </div> 
                <div class="card">
                <i class="el-icon-search"></i>
                <div>查询</div>
                </div>
                <div class="card">
                <i class="el-icon-setting"></i>
                <div>功能</div>
                <b class="el-icon-caret-bottom"></b>
                </div>
                <div class="card">
                <i class="el-icon-printer"></i>
                <div>打印</div>
                <b class="el-icon-caret-bottom"></b>
                </div>
                <div class="card">
                <i class="el-icon-menu"></i>
                <div>设置</div>
                </div>
                <div class="card">
                <i class="el-icon-zoom-in"></i>
                <div>高级查询</div>
                </div>
                <div class="card">
                <el-dropdown trigger="click" placement="bottom" @command="handleExport">
                    <div class="card-title">
                    <i class="el-icon-download"></i>
                    <div>导入/导出</div>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="in">导入</el-dropdown-item>
                    <el-dropdown-item command="xlsx-out">导出为excel</el-dropdown-item>
                    <el-dropdown-item command="csv-out">导出为csv</el-dropdown-item>
                    <el-dropdown-item command="txt-out">导出为txt</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <b class="el-icon-caret-bottom"></b>
                </div>-->
                <div @click="reset" class="card">
                    <i class="el-icon-loading"></i>
                    <div>刷新</div>
                </div>
                <div @click="dialogShow=true" class="card">
                    <i class="el-icon-tickets"></i>
                    <div>显示列</div>
                </div>
            </div>
        </div>
        <div style="margin:10px 0;text-align:center">
            <!-- <el-input	size="small" v-model="orderDate" placeholder="请点击选择供应商" @focus="selectSupplier=true"></el-input> -->
            <!-- <el-button icon="el-icon-tickets"  style="float:right;margin-right:20px" type="primary" size="small" @click="dialogShow=true">显示列</el-button> -->
            <el-input  prefix-icon="el-icon-search" style="width:15%" v-model="search"  size="mini"  placeholder="输入关键字搜索"/>
            <!-- <el-button type="primary" size="small" @click="reset">刷新</el-button> -->
        </div>   
        <!-- 按需选择列弹窗 -->
        <el-dialog
        title="按需选择列" style="text-align:left"
        :visible.sync="dialogShow"
        :before-close="handleClose"
        width="300px">
            <el-checkbox v-model="retailReturnshow.show1">退款单id</el-checkbox><br>
            <el-checkbox v-model="retailReturnshow.show2">退款单编号</el-checkbox><br>
            <el-checkbox v-model="retailReturnshow.show3">添加日期</el-checkbox><br>
            <el-checkbox v-model="retailReturnshow.show4">应退金额</el-checkbox><br>
            <el-checkbox v-model="retailReturnshow.show5">实退金额</el-checkbox><br>
            <el-checkbox v-model="retailReturnshow.show6">制单人</el-checkbox><br>
            <el-checkbox v-model="retailReturnshow.show7">客户名</el-checkbox><br>
            <el-checkbox v-model="retailReturnshow.show8">退换状态</el-checkbox><br>
            <el-checkbox v-model="retailReturnshow.show9">状态名</el-checkbox><br>
            <el-checkbox v-model="retailReturnshow.show10">备注信息</el-checkbox><br><br>
        </el-dialog>    
        <!--弹出窗口-->
        <el-dialog
        title="选择供应商"
        :visible.sync="selectSupplier"
        width="95%">
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
        :data="retailReturnData.filter(data =>  {
        return Object.keys(data).some(key => {
        return String(data[key]).toLowerCase().indexOf(search) > -1})})"
        border stripe
        show-summary
        :row-style="{height:0}"  
        :cell-style="{padding:0}"
        :header-row-style="{height:0}"  
        :header-cell-style="{padding:0}"
        :default-sort = "{prop: 'date', order: 'descending'}"
        style="width: 100%">
            <el-table-column
                prop="back_id"
                v-if="retailReturnshow.show1"
                align="center"
                label="退款单id">
            </el-table-column>
            <el-table-column
                v-if="retailReturnshow.show2"
                align="center"
                label="退款单编号">
                <template slot-scope="scope">
                    <p v-html="scope.row.order_id"></p>
                </template>
            </el-table-column>
            <el-table-column
                prop="add_time"
                v-if="retailReturnshow.show3"
                align="center"
                sortable
                label="添加日期">
            </el-table-column>        
            <el-table-column
                prop="refund_money_1"
                v-if="retailReturnshow.show4"
                align="center"
                label="应退金额">
            </el-table-column>        
            <el-table-column
                prop="refund_money_2"
                v-if="retailReturnshow.show5"
                align="center"
                label="实退金额">
            </el-table-column>        
            <el-table-column
                v-if="retailReturnshow.show6"
                align="center"
                label="制单人">
                <template slot-scope="scope">
                    <p v-html="scope.row.action_user"></p>
                </template> 
            </el-table-column>        
            <el-table-column
                v-if="retailReturnshow.show7"
                align="center"
                label="客户名">
                <template slot-scope="scope">
                    <p v-html="scope.row.user_name"></p>
                </template> 
            </el-table-column>        
            <el-table-column
                prop="status_back_val"
                v-if="retailReturnshow.show8"
                align="center"
                width="220"
                label="退换状态">
                <template slot-scope="scope">
                    <p v-html="scope.row.status_back_val"></p>
                </template>
            </el-table-column>
            <el-table-column
                prop="status_name"
                v-if="retailReturnshow.show9"
                align="center"
                label="状态名">
            </el-table-column>
            <el-table-column
                v-if="retailReturnshow.show10"
                align="center"
                label="备注信息">
                <template slot-scope="scope">
                    <p v-html="scope.row.postscript"></p>
                </template> 
            </el-table-column>   
            <el-table-column
            fixed="right"
            align="center"
            label="相关操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="showDetails(scope.row),dialogDetail = true">商品详情</el-button>
                </template>
            </el-table-column>  
        </el-table>
        <!-------------------------------------------------------- 详情弹窗 ---------------------------------------------------------------->
        <el-dialog width="800px" title="零售退货单商品详情" :visible.sync="dialogDetail">
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
                        <span>{{scope.row.back_goods_number}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="商品编码">
                    <template slot-scope="scope">
                        <span>{{scope.row.goods_sn}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="属性">
                    <template slot-scope="scope">
                        <span>{{scope.row.goods_attr}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="价格">
                    <template slot-scope="scope">
                        <span>{{scope.row.back_goods_price}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="库存">
                    <template slot-scope="scope">
                        <span>{{scope.row.goods_number}}</span>
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
<style scope>
    #retailReturnList{
        text-align:center;
        margin: 10px;
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
.card-title {
  text-align: center;
}
.card-title:focus {
  outline: none;
}
.card {
  transition: all 0.3s;
  padding: 5px 0;
}
.card:hover {
  border-radius:7px;
  transform: translateY(-2px);
  box-shadow: 0px 2px 5px 4px rgba(0, 0, 0,0.1)
}
.card:hover i,
.card:hover div,
.card:hover b {
  color: #409EFF;
}
.operate-in {
  display: flex;
  margin-top: 12px;
}
.operate-in > div {
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
}
.operate-in > div div {
  font-size: 16px;
}
.operate-in i {
  font-size: 30px;
}
.operate-in b {
  font-size: 16px;
  position: absolute;
  top: 20%;
  right: 5%;
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
        dialogShow:false,
        search:'',
        record_count:0,
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
        formDetail:{},
        retailReturnshow:{
            show1:false,
            show2:true,
            show3:true,
            show4:true,
            show5:true,
            show6:true,
            show7:true,
            show8:true,
            show9:true,
            show10:true,
        },
      }
    },
    methods:{
        init(page){//-----------------初始化数据
            this.data(page);
        }, 
        data(page){
            retailReturnList({params:{page:page,page_size:10}}).then(res=>{
                this.record_count=Number(res.data.filter.record_count);
                console.log(res.data);
                for(let i=0;i<res.data.back.length;i++){
                    res.data.back[i].refund_money_1=res.data.back[i].refund_money_1.replace(/^￥/,"");
                    res.data.back[i].refund_money_2=res.data.back[i].refund_money_2.replace(/^￥/,"");
                };
                this.retailReturnData=res.data.back;
            })
        },
        reset(){
            this.reload();
        },
        handleClose(done) {
            done();
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            erpTableSetting.retailReturnList=this.retailReturnshow;
            localStorage.erpTableSetting=JSON.stringify(erpTableSetting);
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleCurrentChange(val) {
            this.init(val);   
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
        if(localStorage.erpTableSetting!==undefined){
            console.log("yes");
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting); 
            if(erpTableSetting.retailReturnList!==undefined){
                this.retailReturnshow=erpTableSetting.retailReturnList;
            }
        }else{
            console.log("no");
        };
        this.init(1);
    }
  }
</script>