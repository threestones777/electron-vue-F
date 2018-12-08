<template>
    <div id='shopInList'>
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>购货</el-breadcrumb-item>
                <el-breadcrumb-item>采购入库单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- <el-input	size="small" v-model="input" placeholder="商品名称/首拼"></el-input>
        <el-input	size="small" v-model="input" placeholder="单据编号"></el-input>
        <el-select	size="small" v-model="value" placeholder="全部制单人">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-input	size="small" v-model="input" placeholder="开始时间"></el-input>
        <el-input	size="small" v-model="input" placeholder="结束时间"></el-input>
        <el-select	size="small" v-model="value" placeholder="入库状态">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select> -->
        <el-input placeholder="请输入提交货人" @input="search" v-model="keywords" style="width:20%;margin-right:10px" size="small">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
        <!-- <el-button	size="small" type="primary">导出</el-button> -->
        <el-button	size="small" type="primary" @click="dialogAdd=true">新增</el-button>
        <el-button	size="small" type="primary" @click="reset">刷新</el-button>
        <!--表单-->
        <el-table
        :data="shopInData"
        border
        :row-style="{height:0}"  
        :cell-style="{padding:0}"
        :header-row-style="{height:0}"  
        :header-cell-style="{padding:0}"
        style="width: 100%">
            <el-table-column
                prop="rec_id"
                label="单据id">
            </el-table-column>
            <el-table-column
                prop="inout_sn"
                label="单据编号">
            </el-table-column>
            <el-table-column
                prop="takegoods_man"
                label="提交货人">
            </el-table-column>
            <el-table-column
                prop="inout_status_name"
                label="入库状态">
            </el-table-column>
            <el-table-column
                prop="pCount"
                label="单据备注">
            </el-table-column>
            <el-table-column
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="print=true">打印</el-button>
                        <el-button type="text" size="small" @click="showDetails(scope.row),dialogDetail = true">详情</el-button>
                        <el-button type="text" size="small" @click="getId(scope.row),dialogCheck = true">审核</el-button>
                        <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
                    </template>
            </el-table-column>        
        </el-table>
        <!-- 新增采购入库单弹窗 -->
    <el-dialog
    title="新增"
    :visible.sync="dialogAdd"
    width="700px">
        <el-form :model="formAdd">
            <el-row type="flex" justify="space-around">
                <el-col :span="7">
                    仓库id<el-input v-model="formAdd.store_id" ></el-input>    
                </el-col>
                <el-col :span="7">
                    关联采购订单id<el-input v-model="formAdd.purchase_id" ></el-input>
                </el-col>
                <el-col :span="7">
                    关联采购订单编号<el-input v-model="formAdd.purchase_sn" ></el-input>    
                </el-col>
            </el-row> 
            <el-row type="flex" justify="space-around">
                <el-col :span="7">
                    提交货人<el-input v-model="formAdd.takegoods_man" ></el-input>
                </el-col>
            </el-row> 
        </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogAdd = false">取 消</el-button>
        <el-button size="small" type="primary" @click="add(),dialogAdd = false">确 定</el-button>
    </span>
    </el-dialog>
        <!--打印弹窗-->        
        <el-dialog width="50%" title="采购入库单-打印" :visible.sync="print" :before-close="handleClose">
            <div class="print">
                <h3>如果您需要打印样式，请参考以下说明操作</h3>
                <p>1.在线打印及设计需安装扩展程序，您可点击下方按钮，然后按照提示安装即可</p>
                <p>2.系统在初始化时已经带有打印样式，如不满足您的实际需求，请点击设计报表后保存即可</p>
                <p>3.默认纸张可在系统设置中选择，表格数据内容会自动分页，除表格内容外的元素均可修改</p>
                <p>4.如您在设计单据的过程中误操作导致表格样式错乱，您可点击下方恢复默认按钮即可恢复</p>
                <p>5.请使用谷歌内核浏览器或IE11以上版本，360浏览器、腾讯浏览器等请开启急速模式</p>
                <p>6.如您在设计报表样式中遇到问题，可到APE软件官网寻求解决方案</p>
                <p>7.在线打印及设计需安装扩展程序，您可点击下方按钮，然后按照提示安装即可</p>
            </div>
            <div>
                <el-button	size="small" type="primary">打印报表</el-button>
                <el-button	size="small">设计报表</el-button>
                <el-button	size="small" type="info">恢复默认</el-button>
            </div>
        </el-dialog>
        <!------------------------------------------------------- 审核弹窗 ------------------------------------------------>
        <el-dialog width="600px" title="订单审核" :visible.sync="dialogCheck">
            <el-radio-group v-model="status">
                <el-radio :label="1">出库单录入中</el-radio>
                <el-radio :label="2">等待主管审核</el-radio>
                <el-radio :label="3">审核通过</el-radio>
                <el-radio :label="4">审核不通过</el-radio>
            </el-radio-group>              
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogCheck = false">取 消</el-button>
                <el-button size="small" type="primary" @click="checkSta(),dialogCheck = false">保存审核</el-button>
            </div>
        </el-dialog>
        <!--详情弹窗-->        
        <el-dialog width="770px" title="采购入库单详情" :visible.sync="dialogDetail">
            <!--供应商弹窗-->            
            供应商 :<el-input	size="small" v-model="orderDate" placeholder="请点击选择" @focus="selectSupplier=true"></el-input>        
            <el-dialog title="选择供应商" :visible.sync="selectSupplier" width="75%" :before-close="handleClose" :append-to-body="true" align="center">
                名称 :<el-input	size="small" v-model="orderDate" placeholder="供应商名称" style="width:10%"></el-input>          
                编号 :<el-input	size="small" v-model="supplier_id" placeholder="供应商编号" style="width:10%"></el-input>          
                联系人 :<el-input	size="small" v-model="orderDate" placeholder="联系人" style="width:10%"></el-input>          
                联系电话 :<el-input	size="small" v-model="orderDate" placeholder="联系电话" style="width:10%"></el-input>          
                备注信息 :<el-input	size="small" v-model="orderDate" placeholder="备注信息" style="width:10%"></el-input> 
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
            单据日期 :<el-input	size="small" v-model="orderDate"></el-input>
            单据编号 :<el-input	size="small" v-model="orderId"></el-input>
            <!-- <el-button	size="small" type="primary">提交单据</el-button>
            <el-button	size="small" type="primary">重新载入</el-button> -->
            <el-form :model="formDetail">
                <el-row type="flex" justify="space-around">
                    <!-- <el-col :span="7">
                        单据id<el-input v-model="formDetail.rec_id" disabled></el-input>    
                    </el-col> -->
                    <el-col :span="7">
                        仓库名<el-input v-model="formDetail.store_name"></el-input>    
                    </el-col>
                    <el-col :span="7">
                        编码<el-input v-model="formDetail.inout_sn"></el-input>
                    </el-col>
                    <el-col :span="7">
                        状态<el-input v-model="formDetail.inout_status"></el-input>
                    </el-col>
                </el-row>                
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        仓库id<el-input v-model="formDetail.store_id"></el-input>    
                    </el-col>
                    <el-col :span="7">
                        管理员id<el-input v-model="formDetail.adminer_id"></el-input>
                    </el-col>
                    <el-col :span="7">
                        类型<el-input v-model="formDetail.inout_type"></el-input>
                    </el-col>
                </el-row>                
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        入库模式<el-input v-model="formDetail.inout_mode"></el-input>    
                    </el-col>
                    <el-col :span="7">
                        订单id<el-input v-model="formDetail.order_id"></el-input>
                    </el-col>
                    <el-col :span="7">
                        订单编码<el-input v-model="formDetail.order_sn"></el-input>
                    </el-col>
                </el-row>                
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        提交货人<el-input v-model="formDetail.takegoods_man"></el-input>    
                    </el-col>
                    <el-col :span="7">
                        今日<el-input v-model="formDetail.today_sn"></el-input>
                    </el-col>
                    <el-col :span="7">
                        添加日期<el-input v-model="formDetail.add_date"></el-input>
                    </el-col>
                </el-row>                
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        添加时间<el-input v-model="formDetail.add_time"></el-input>    
                    </el-col>
                    <el-col :span="7">
                        move_id<el-input v-model="formDetail.move_id"></el-input>
                    </el-col>
                    <el-col :span="7">
                        分店id<el-input v-model="formDetail.subshop_id"></el-input>
                    </el-col>
                </el-row>                
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        仓库<el-input v-model="formDetail.store_type_id"></el-input>    
                    </el-col>
                    <el-col :span="7">
                        分站id<el-input v-model="formDetail.subsite_id"></el-input>
                    </el-col>
                    <el-col :span="7">
                        管理员<el-input v-model="formDetail.admin_name"></el-input>
                    </el-col>
                </el-row>                
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        类型名<el-input v-model="formDetail.inout_type_name"></el-input>
                    </el-col>
                    <el-col :span="7">
                        添加时间详情<el-input v-model="formDetail.add_time_date"></el-input>
                    </el-col>
                </el-row>               
            </el-form><br>
            <h1>单据商品</h1>
            <el-button size="small" type="primary" class="addGoods" @click="getGoods(),dialogAddGoods=true">添加商品</el-button>
            <el-table
            :data="shopDeData"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            style="width: 100%">
                <el-table-column
                    prop="goods_thumb"
                    align="center"
                    label="商品">
                    <template slot-scope="scope">
                        <img :src="scope.row.goods_thumb" style="width:50%;">
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="商品名">
                    <template slot-scope="scope">
                        <span :title="scope.row.goods_name">{{scope.row.goods_name.slice(0,7)+"..."}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="book_id"
                    align="center"
                    label="商品条目id">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="属性名">
                    <template slot-scope="scope">
                        <el-input size="mini" style="width:100%" v-model="scope.row.attr_name"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="attr_value"
                    align="center"
                    label="属性值id">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="应收数量">
                    <template slot-scope="scope">
                        <el-input size="mini" style="width:100%" v-model="scope.row.number_yingshou"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="实收数量">
                    <template slot-scope="scope">
                        <el-input size="mini" style="width:100%" v-model="scope.row.number_shishou"></el-input>
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
             <span slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogDetail=false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="edit(),dialogDetail=false">保存修改</el-button>
                </span>       
            <!-------------------------------------------------------- 添加商品弹窗 ---------------------------------------------------------------->
            <el-dialog
            title="商品列表"  :append-to-body="true"
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
        </el-dialog>       
        <!--分页显示-->        
        <el-pagination
            @current-change="handleCurrentChange"
            layout="prev, pager, next,jumper"
            :page-count="pages">
        </el-pagination>        
    </div>
</template>
<style>
    #shopInList{
        text-align:center;
        margin: 20px;
    }
    #shopInList .main-header{
        text-align:left;
        margin-bottom: 10px;
        padding:10px;
        background:#fff;
    }
    #shopInList .main-header .el-breadcrumb {
        margin: 8px 0 0 10px;
    }
    #shopInList .el-input{
        width:10%;
    }
    #shopInList .el-select{
        width:10%;
    }
    #shopInList .el-select>.el-input{
        width:100%;
    }
    #shopInList .el-table{
        margin-top:20px;
    }
    #shopInList .el-pagination{
        text-align: right;
        margin: 20px 0;
    }
    .print{
        text-align: left;
        margin-bottom:40px;
    }
    .print>h3{
        font-size:20px;
        font-weight:bold;
        margin:10px;
    }
    .print p{
        margin:5px;
    }
    #shopInList .el-pagination__jump .el-input{
        width:50%;
    }
    #shopInList .el-row .el-input{
        width:100%;
    }
    #shopInList .el-row .el-col{
        border-top:1px dotted #DCDFE6;
    }
    #shopInList .addGoods{
        float:right;
        position:relative;
        bottom:15px;
    }
</style>
<script>
import {shopInList,supplier,getGoodsList} from '../../api/api';
import {shopInListDe,shopInListAddG,shopInListEdG,shopInListDeG,shopInListCh,shopInListAdd,shopInListEd,shopInListRmv} from '../../api/apiW';
export default {
    inject: ['reload'], 
    data(){
        return {
            input:'',
            value:'',
            dialogDetail:false,
            dialogAddGoods:false,
            dialogCheck:false,
            dialogAdd:false,
            selectSupplier:false,
            print:false,
            keywords:'',
            orderDate:'',
            orderId:'',
            supplier_id:'2',
            options: [{
                value: '选项1',
                label: '默认设置'
            }],
            shopDeData: [],
            pages:1,
            pagesG:1,
            rec_id:0,
            status:0,
            shopInData: [],
            formDetail:{},
            formAdd:{},
            SupplierData: [],
            goodsListData:[],
            multipleSelection:[],
            arr:[]
        }
    },
    methods:{
        reset(){
            this.reload();
        },
         search() {
            shopInList({params:{takegoods_man:this.keywords}}).then(res=>{
                console.log(res.data);
                //this.total=Number(res.data.filter.record_count);
                this.shopInData=res.data.arr;
            });
        },    
        handleClose(done) {
            done();
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleCurrentChangeG(val) {
            console.log(val);
            getGoodsList({params:{page:val,page_size:10}}).then(res=>{
                console.log(res.data.goods);
                this.goodsListData=res.data.goods;
                this.pagesG=Math.ceil(res.data.filter.record_count/10);
            })
        },
        selectionChange(val) {
            this.multipleSelection = val;
            console.log(this.multipleSelection);
            this.arr=[];
            for(let i=0;i<this.multipleSelection.length;i++){
                this.arr.push(this.multipleSelection[i].goods_id);
            };
                console.log(this.arr);
        },
        handleCurrentChange(val) {
            console.log(val);
            shopInList({params:{page:val,page_size:10}}).then(res=>{
                console.log(res.data);
                this.shopInData=res.data.arr;
            })              
        },
        add(){//------------------------------添加订单
            console.log("add");
            let data=this.$qs.stringify(this.formAdd);
            shopInListAdd(data).then(res=>{
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
        edit(){//------------------------------修改订单
            let data=this.$qs.stringify(this.formDetail);
            shopInListEd(data).then(res=>{
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
        detailGoods(){
            let dataD = this.$qs.stringify({
                id:this.rec_id
            });
            shopInListDe(dataD).then(res=>{
                console.log(res.data);
                this.formDetail=res.data;
                this.shopDeData=res.data.goods_list;
            });
        },
        getGoods(){//--------------------------------获取商品列表
            getGoodsList({params:{page:1,page_size:10}}).then(res=>{
                console.log(res.data.goods);
                this.goodsListData=res.data.goods;
                this.pagesG=Math.ceil(res.data.filter.record_count/10);
            })
        },
        addGoods(){//---------------------------------添加商品
            let dataA=this.$qs.stringify({
                rec_id:this.rec_id,
                goods_ids:JSON.stringify(this.arr)
            });
            shopInListAddG(dataA).then(res=>{
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
            row.rec_id=this.rec_id;
            console.log(row);
            let data=this.$qs.stringify(row);
            shopInListEdG(data).then(res=>{
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
        deleteGoods(row){//---------------------------删除商品
            console.log(this.rec_id);
            console.log(row.book_id);
            let Message=confirm("确定删除此行商品？");
            if(Message){
                let dataD=this.$qs.stringify({
                    rec_id:this.rec_id,
                    book_id:row.book_id
                });
                shopInListDeG(dataD).then(res=>{
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
            console.log(row.rec_id);
            let Message=confirm("确定删除此行商品？");
            if(Message){
                let dataD=this.$qs.stringify({
                    rec_id:row.rec_id
                });
                shopInListRmv(dataD).then(res=>{
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
        showDetails(row){//---------详情
            this.shopDeData=[];
            this.rec_id=row.rec_id
             this.detailGoods();
        },
        getId(row){//-----------------------保存id
            this.rec_id=row.rec_id;
            this.status=Number(row.inout_status);
            console.log(this.rec_id+"*"+this.status);
        },
        checkSta(){//------------------审核
            let dataC=this.$qs.stringify({
                rec_id:this.rec_id,
                status:this.status
            });
            shopInListCh(dataC).then(res=>{
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
        supplier(){
          this.SupplierData=[];
          console.log(this.supplier_id);
            supplier({params:{supplier_id:this.supplier_id}}).then(res=>{
                console.log(res.data);
                this.SupplierData.push(res.data);
            })
        }
    },
    created: function () { 
        shopInList({params:{page:1,page_size:10}}).then(res=>{
            this.pages=Math.ceil(res.data.filter.record_count/10);
            console.log(res.data);
            this.shopInData=res.data.arr;
        })
    }
}
</script>