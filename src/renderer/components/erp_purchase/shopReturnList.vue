<template>
    <div id="shopReturnList">
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>购货</el-breadcrumb-item>
                <el-breadcrumb-item>购货退货单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--弹出窗口-->
        <div style="margin:10px 0;text-align:center">
            <el-input	size="small" v-model="orderDate" placeholder="请点击选择供应商" @focus="selectSupplier=true"></el-input> 
            <el-button icon="el-icon-tickets"  style="float:right;margin-right:20px" type="primary" size="small" @click="dialogShow=true">显示列</el-button>
            <el-input  prefix-icon="el-icon-search" style="width:15%" v-model="search"  size="mini"  placeholder="输入关键字搜索"/>
            <el-button type="primary" size="small" @click="open" icon="el-icon-plus"></el-button>
            <el-button type="primary" size="small" @click="reset">刷新</el-button>
        </div>
        <!-- 按需选择列弹窗 -->
            <el-dialog
            title="按需选择列" style="text-align:left" class="chose"
            :visible.sync="dialogShow"
            :before-close="handleClose"
            width="300px">
                <el-checkbox v-model="shopReturnshow.show1">单据id</el-checkbox><br>
                <el-checkbox v-model="shopReturnshow.show2">单据sn</el-checkbox><br>
                <el-checkbox v-model="shopReturnshow.show3">采购单编号</el-checkbox><br>
                <el-checkbox v-model="shopReturnshow.show4">状态</el-checkbox><br>
                <el-checkbox v-model="shopReturnshow.show5">状态名</el-checkbox><br>
                <el-checkbox v-model="shopReturnshow.show6">单据金额</el-checkbox><br>
                <el-checkbox v-model="shopReturnshow.show7">退货时间</el-checkbox><br>
                <el-checkbox v-model="shopReturnshow.show8">备注</el-checkbox><br>
            </el-dialog>
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
        <!-- 新增购货退货单弹窗 -->
        <el-dialog
        title="新增购货退货单"
        :visible.sync="dialogAdd"
        width="700px">
            <el-form :model="formAdd" class="detail">
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        采购订单sn<input class="spe" v-model="formAdd.purchase_sn" ref="input" @blur="exam" @input="()=>{this.status=0}"/>
                    </el-col>
                    <el-col :span="7">
                        备注<el-input v-model="formAdd.remark" ></el-input>
                    </el-col>
                </el-row> 
            </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="dialogAdd = false">取 消</el-button>
            <el-button size="small" type="primary" @click="add(),dialogAdd = false" :disabled="status===1">添加</el-button>
        </span>
        </el-dialog>
        <el-table
        :data="shopReturnData.filter(data =>  {
            return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1})})"
        border
        :row-style="{height:0}"  
        :cell-style="{padding:0}"
        :header-row-style="{height:0}"  
        :header-cell-style="{padding:0}"
        style="width: 100%">
            <el-table-column
                prop="id"
                align="center"
                v-if="shopReturnshow.show1"
                label="单据id">
            </el-table-column>
            <el-table-column
                prop="back_sn"
                align="center"
                v-if="shopReturnshow.show2"
                label="单据sn">
            </el-table-column>
            <el-table-column
                prop="purchase_sn"
                align="center"
                v-if="shopReturnshow.show3"
                label="采购单编号">
            </el-table-column>
            <el-table-column
                prop="status"
                align="center"
                v-if="shopReturnshow.show4"
                label="状态">
            </el-table-column>
            <el-table-column
                prop="status_name"
                align="center"
                v-if="shopReturnshow.show5"
                :filters="[{text: '未审核', value: '未审核'},{text: '已退货', value: '已退货'}]"
                :filter-method="filterHandler"
                label="状态名">
            </el-table-column>
            <el-table-column
                prop="money"
                align="center"
                v-if="shopReturnshow.show6"
                label="单据金额">
            </el-table-column>
            <el-table-column
                prop="back_time"
                align="center"
                v-if="shopReturnshow.show7"
                label="退货时间">
            </el-table-column> 
            <el-table-column
                prop="remark"
                align="center"
                v-if="shopReturnshow.show8"
                label="备注">
            </el-table-column> 
            <el-table-column
                fixed="right"
                align="center"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showDetails(scope.row),dialogDetail = true">详情</el-button>
                        <el-button type="text" size="small" @click="getId(scope.row),dialogCheck = true">审核</el-button>
                        <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
                    </template>
                </el-table-column>        
        </el-table>
    <!-------------------------------------------------------- 详情弹窗 ---------------------------------------------------------------->
    <el-dialog width="800px" title="购货退货单详情" :visible.sync="dialogDetail">
        <el-button size="small" type="primary" class="addGoods" @click="getGoods(),dialogAddGoods=true">添加商品</el-button>
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
                label="备注">
                <template slot-scope="scope">
                    <el-input size="mini" style="width:80%" v-model="scope.row.note"></el-input>
                </template>
            </el-table-column>
            <el-table-column
            fixed="right"
            align="center"
            label="相关操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editGoods(scope.row)" icon="el-icon-edit"></el-button>
                    <el-button type="text" size="small" @click="deleteGoods(scope.row)" icon="el-icon-delete"></el-button>
                </template>
            </el-table-column>       
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="dialogDetail = false">取 消</el-button>
            <el-button size="small" type="primary" @click="back(),dialogDetail = false">退货</el-button>
        </div>
    </el-dialog>
    <!---------------------------------------------- 审核弹窗 ------------------------>
    <el-dialog width="30%" title="订单审核" :visible.sync="dialogCheck">
        <el-radio-group v-model="status">
            <el-radio :label="0">未审核</el-radio>
            <!-- <el-radio :label="1" disabled>已审核</el-radio> -->
            <el-radio :label="2">已退货</el-radio>
        </el-radio-group>              
        <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="dialogCheck = false">取 消</el-button>
            <el-button size="small" type="primary" @click="checkSta(),dialogCheck = false">保存审核</el-button>
        </div>
    </el-dialog>
    <!----------------------------- 添加商品弹窗 -------------------------------------->
    <el-dialog
    title="商品列表"
    :visible.sync="dialogAddGoods"
    width="700px">
    <el-table
        :data="goodsListData"
        ref="multipleTable"
        border
        :row-style="{height:0}"  
        :cell-style="{padding:0}"
        :header-row-style="{height:0}"  
        :header-cell-style="{padding:0}"
        @selection-change="selectionChange"
        style="width: 100%">
            <el-table-column
            type="selection">
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
                prop="number"
                align="center"
                label="数量">
            </el-table-column>
            <el-table-column
                prop="attr_value"
                align="center"
                label="属性">
            </el-table-column>
            <el-table-column
                prop="note"
                align="center"
                label="备注">
            </el-table-column>    
        </el-table>
    <el-pagination
        @current-change="handleCurrentChangeG"
        layout="prev, pager, next,jumper"
        :page-count="pagesG">
    </el-pagination>
    <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogAddGoods = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addGoods(),dialogAddGoods = false">添加商品</el-button>
    </span>
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
.chose .el-checkbox{
    margin-bottom:10px;
}
    #shopReturnList{
        text-align:center;
        margin: 20px;
    }
    #shopReturnList .el-dialog .el-input{
       width:10%;
    }
    #shopReturnList .main-header{
        text-align:left;
        margin-bottom: 10px;
        padding:10px;
        background:#fff;
    }
    #shopReturnList .main-header .el-breadcrumb {
        margin: 8px 0 0 10px;
    }
    #shopReturnList .el-select{
        width:100px;
    }
    #shopReturnList .el-input{
        width:160px;
        margin-right:10px;
    }
    #shopReturnList .el-table{
        margin:20px 0;
    } 
    #shopReturnList .el-pagination{
        text-align: right;
        margin: 20px 0 50px 0;
    }
    #shopReturnList .el-pagination__jump .el-input{
        width:50%;
    }
    #shopReturnList .detail .el-input{
        width:100%;
    }
    #shopReturnList .detail .el-row{
        border-bottom: 1px dotted #DCDFE6;
    }/* 
    #shopReturnList .addGoods{
        float:right;
        position:relative;
        bottom:15px;
    } */
    .spe{
        border:1px solid #DCDFE6;
        height:38px;
        border-radius:4px;
        padding:0 15px
    }
    .spe:focus{
        border:1px solid #409EFF;
        outline-color: #fff;
    }
</style>    
<script>
import {shopReturnList,supplier,getGoodsList} from '../../api/api' ;
import {repurchaseDe,repurchaseAddG,repurchaseEdG,repurchaseRmv,repurchaseCh,repurchaseAdd,repurchaseBa,repurchaseDel,shopOderListDe} from '../../api/apiW' ;
  export default {
    inject: ['reload'],
    data() {
      return {
        selectSupplier:false,
        dialogDetail:false,
        dialogAddGoods:false,
        dialogCheck:false,
        dialogAdd:false,
        value: '',
        record_count:0,
        dialogShow:false,
        search:"",
        input:'',
        orderDate:'',
        orderId:'',
        supplier_id:'2',
        id:0,
        shopReturnData: [],
        status:1,
        pages:1,
        pagesG:1,
        back_sn:0,
        purchase_sn:0,
        SupplierData: [],
        formDetail:{},
        formAdd:{
            purchase_sn:"",
            remark:""
        },
        goodsData:[],
        goodsListData:[],
        getGoodsList:[],
        multipleSelection: [],
        shopReturnshow:{
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
        init(page){//-----------------初始化数据
            shopReturnList({params:{page:page,page_size:10}}).then(res=>{
                this.record_count=Number(res.data.filter.record_count);
                this.shopReturnData=res.data.list;
            }) 
        }, 
        reset(){
            this.reload();
        },
        handleClose(done) {
            done();
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            erpTableSetting.shopReturnList=this.shopReturnshow;
            localStorage.erpTableSetting=JSON.stringify(erpTableSetting);
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        open(){
            this.dialogAdd=true;
            this.$nextTick(() => {this.$refs['input'].focus()})
        },
        exam(){
            if(this.formAdd.purchase_sn==""){
                //this.$alert("购货单号不能为空");
                this.status=1;
            }else{
                this.status=0;
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        selectionChange(val) {
            this.multipleSelection = [];
            this.multipleSelection = val;
            console.log(this.multipleSelection);
            this.arr=[];
            for(let i=0;i<this.multipleSelection.length;i++){
                this.arr.push(this.multipleSelection[i].goods_id);
            };
                console.log(this.arr);
        },
        handleCurrentChange(val) {
            this.init(val);
        },
        handleCurrentChangeG(val) {
            console.log(val);
            getGoodsList({params:{page:val,page_size:10}}).then(res=>{
                console.log(res.data.goods);
                this.goodsListData=res.data.goods;
                this.pagesG=Math.ceil(res.data.filter.record_count/10);
            })
        },
        supplier(){
            this.SupplierData=[];
            console.log(this.supplier_id);
            supplier({params:{supplier_id:this.supplier_id}}).then(res=>{
                console.log(res.data);
                this.SupplierData.push(res.data);
            })
        },
        detailGoods(){
            repurchaseDe({params:{id:this.id}}).then(res=>{
                this.formDetail=res.data;
                this.goodsData=res.data.goods;
            });
        },
        add(){//------------------------------添加订单
            console.log(this.formAdd);
            let data=this.$qs.stringify(this.formAdd);
            repurchaseAdd(data).then(res=>{
                if(res.errno==0){
                this.$alert(res.data.message,{
                    callback:action=>{
                        this.reload(); 
                        this.formAdd.purchase_sn=""; 
                    }
                })
            }else{
                this.$alert(res.errmsg);
                this.formAdd.purchase_sn=""; 
            }
            });
        },
        showDetails(row){//------------------------------详情
            this.id=row.id;
            this.back_sn=row.back_sn;
            this.purchase_sn=row.purchase_sn;
            this.detailGoods();
        },
        getId(row){//-----------------------保存id
            this.back_sn=row.back_sn;
            this.status=Number(row.status);
        },
        back(){//--------------------------退货
            let data=this.$qs.stringify({
                back_sn:this.back_sn
            });
            repurchaseBa(data).then(res=>{
                console.log(res);
                if(res.errno==0){
                    this.$alert(res.data.message,{
                        callback:action=>{
                            this.reload();    
                        }
                    })
                }else{
                    this.$alert(res.errmsg)
                }
            });
        },
        checkSta(){//------------------审核
            let dataC=this.$qs.stringify({
                back_sn:this.back_sn,
                status:this.status
            });
            repurchaseCh(dataC).then(res=>{
                this.$alert(res.data.message)
                this.reload();
            });
        },
        getGoods(){//--------------------------------获取商品列表
            shopOderListDe({params:{purchase_sn:this.purchase_sn}}).then(res=>{
                console.log(res.data.goods);
                this.goodsListData=res.data.purchase_goods;
            })
        },
        addGoods(){//---------------------------------添加商品
            let dataA=this.$qs.stringify({
                id:this.id,
                goods_id:JSON.stringify(this.arr)
            });
            repurchaseAddG(dataA).then(res=>{
                console.log(res);
                if(res.errno==0){
                    this.$alert(res.data.message,{
                        callback:action=>{
                            this.detailGoods();    
                        }
                    })
                }else{
                    this.$alert(res.errmsg)
                }
            });
        },
        editGoods(row){//---------------------------修改商品
            console.log(row);
            let data=this.$qs.stringify(row);
            repurchaseEdG(data).then(res=>{
                console.log(res);
                if(res.errno==0){
                    this.$alert(res.data.message,{
                        callback:action=>{
                            this.detailGoods();    
                        }
                    })
                }else{
                    this.$alert(res.errmsg);
                }
            });
        },
        deleteGoods(row){//---------------------------删除商品
            console.log(row.back_sn);
            console.log(row.id);
            let Message=confirm("确定删除此行商品？");
            if(Message){
                let dataD=this.$qs.stringify({
                    back_sn:row.back_sn,
                    id:row.id
                });
                repurchaseRmv(dataD).then(res=>{
                    console.log(res);
                    if(res.errno==0){
                        this.$alert(res.data.message,{
                            callback:action=>{
                                this.detailGoods();    
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
        deleteRow(row){//---------------------------删除订单
            console.log(row.purchase_id);
            let Message=confirm("确定删除此行商品？");
            if(Message){
                let dataD=this.$qs.stringify({
                    back_sn:row.back_sn
                });
                repurchaseDel(dataD).then(res=>{
                    console.log(res);
                    if(res.errno==0){
                        this.$alert(res.data.message,{
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
    created: function () { 
        if(localStorage.erpTableSetting!==undefined){
            console.log("yes");
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting); 
            if(erpTableSetting.shopReturnList!==undefined){
                this.shopReturnshow=erpTableSetting.shopReturnList;
            }
        }else{
            console.log("no");
        }
        this.init(1);
    },    
  }
</script>