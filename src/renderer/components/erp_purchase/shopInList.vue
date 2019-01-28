<template>
    <div id='shopInList'>
        <div class="main-header">
            <!-- <h3>温州美联 管理中心</h3> -->
            <el-breadcrumb style="font-size:18px"  separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>采购</el-breadcrumb-item>
                <el-breadcrumb-item>采购入库单</el-breadcrumb-item>
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
                <div @click="dialogAdd=true" class="card">
                    <i class="el-icon-plus"></i>
                    <div>添加订单</div>
                </div>
            </div>
        </div>
        <div style="margin:10px 0;text-align:center">
            <!-- <el-button icon="el-icon-tickets"  style="float:right;margin-right:20px" type="primary" size="small" @click="dialogShow=true">显示列</el-button> -->
            <el-input  prefix-icon="el-icon-search" style="width:15%" v-model="search"  size="mini"  placeholder="输入关键字搜索"/>
            <!-- <el-button type="primary" size="small" @click="reset">刷新</el-button> -->
        </div>
        <!-- 按需选择列弹窗 -->
        <el-dialog
        title="按需选择列" class="chose" style="text-align:left"
        :visible.sync="dialogShow"
        :before-close="handleClose"
        width="300px">
            <el-checkbox v-model="shopInshow.show1">单据id</el-checkbox><br>
            <el-checkbox v-model="shopInshow.show2">单据编号</el-checkbox><br>
            <el-checkbox v-model="shopInshow.show3">提交货人</el-checkbox><br>
            <el-checkbox v-model="shopInshow.show4">入库状态</el-checkbox><br>
            <el-checkbox v-model="shopInshow.show5">仓库名</el-checkbox><br>
            <el-checkbox v-model="shopInshow.show6">管理员</el-checkbox><br>
            <el-checkbox v-model="shopInshow.show7">入库类型</el-checkbox><br>
            <el-checkbox v-model="shopInshow.show8">日期详情</el-checkbox><br>
        </el-dialog>
        <!--表单-->
        <el-table
        :data="shopInData.filter(data =>  {
            return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1})})"
        border
        :row-style="{height:0}"  
        :cell-style="{padding:0}"
        :header-row-style="{height:0}"  
        :header-cell-style="tableRowStyle"
        :default-sort = "{prop: 'date', order: 'descending'}">
        style="width: 100%">
            <el-table-column
                prop="rec_id"
                align="center"
                v-if="shopInshow.show1"
                label="单据id">
            </el-table-column>
            <el-table-column
                prop="inout_sn"
                align="center"
                v-if="shopInshow.show2"
                label="单据编号">
            </el-table-column>
            <el-table-column
                v-if="shopInshow.show3"
                align="center"
                label="提交货人">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.takegoods_man" />
                </template>
            </el-table-column>
            <el-table-column
                prop="inout_status_name"
                align="center"
                v-if="shopInshow.show4"
                :filters="[{text: '入库单录入中', value: '入库单录入中'},{text: '等待主管审核', value: '等待主管审核'},{text: '审核通过', value: '审核通过'},{text: '审核不通过', value: '审核不通过'}]"
                :filter-method="filterHandler"
                label="入库状态">
            </el-table-column>
            <el-table-column
                prop="store_name"
                align="center"
                width="135"
                v-if="shopInshow.show5"
                label="仓库名">
                    <template slot-scope="scope">
                        <p v-html="scope.row.store_name"></p>
                    </template>
            </el-table-column>
            <el-table-column
                prop="admin_name"
                align="center"
                v-if="shopInshow.show6"
                label="管理员">
            </el-table-column>
            <el-table-column
                prop="inout_type_name"
                align="center"
                v-if="shopInshow.show7"
                label="入库类型">
            </el-table-column>
            <el-table-column
                prop="add_time"
                align="center"
                v-if="shopInshow.show8"
                sortable
                label="日期详情">
            </el-table-column>
            <el-table-column
                align="center"
                label="相关操作">
                    <template slot-scope="scope">
                        <!-- <el-button type="text" size="small" @click="print=true">打印</el-button> -->
                        <el-button type="text" size="small" @click="edit(scope.row)">保存修改</el-button>
                        <el-button type="text" size="small" @click="showDetails(scope.row),dialogDetail = true">商品详情</el-button>
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
                 <!-- <el-col :span="7">
                    仓库id<el-input v-model="formAdd.store_id" ></el-input>    
                </el-col>  -->
                <!-- <el-col :span="10">
                    关联采购订单id<el-input v-model="formAdd.purchase_id" ></el-input>
                </el-col>
                <el-col :span="10">
                    关联采购订单编号<el-input v-model="formAdd.purchase_sn" ></el-input>    
                </el-col> -->
            </el-row> 
            <el-row type="flex" justify="space-around">
                <el-col :span="10">
                    关联采购订单编号<el-input v-model="formAdd.purchase_sn" ></el-input>    
                </el-col>
                <el-col :span="10">
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
        <!-- <el-dialog width="50%" title="采购入库单-打印" :visible.sync="print" :before-close="handleClose">
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
        </el-dialog> -->
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
        <el-dialog width="770px" title="采购入库详情" :visible.sync="dialogDetail">
            <el-button size="small" type="primary" class="addGoods" @click="getGoods(),dialogAddGoods=true">添加商品</el-button>
            <el-table
            :data="shopDeData"
            border stripe
            show-summary
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
                <!-- <el-table-column
                    prop="book_id"
                    align="center"
                    label="商品条目id">
                </el-table-column> -->
                <el-table-column
                    align="center"
                    label="属性名">
                    <template slot-scope="scope">
                        <span>{{scope.row.attr_name}}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column
                    prop="attr_value"
                    align="center"
                    label="属性值id">
                </el-table-column> -->
                <el-table-column
                    prop="number_yingshou"
                    align="center"
                    label="应收数量">
                    <template slot-scope="scope">
                        <span>{{scope.row.number_yingshou}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="number_shishou"
                    label="实收数量">
                    <template slot-scope="scope">
                        <span>{{scope.row.number_shishou}}</span>
                    </template>
                </el-table-column> 
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作">
                    <template slot-scope="scope">
                        <!-- <el-button type="text" size="small" @click="editGoods(scope.row)" icon="el-icon-edit"></el-button> -->
                        <el-button type="text" size="small" @click="deleteGoods(scope.row)" icon="el-icon-delete"></el-button>
                    </template>
                </el-table-column>       
            </el-table>    
             <span slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogDetail=false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="dialogDetail=false">确定</el-button>
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
            layout="total,prev, pager, next,jumper"
            :total="record_count">
        </el-pagination>        
    </div>
</template>
<style scoped>
    #shopInList{
        text-align:center;
        margin: 10px;
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
    .el-table .el-input >>> .el-input__inner{
        border:none;
        text-align:center;
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
            dialogShow:false,
            record_count:0,
            print:false,
            keywords:'',
            orderDate:'',
            orderId:'',
            supplier_id:'2',
            search:"",
            shopDeData: [],
            pages:1,
            pagesG:1,
            rec_id:0,
            status:1,
            shopInData: [],
            formDetail:{},
            formAdd:{
                store_id:38,
            },
            SupplierData: [],
            goodsListData:[],
            multipleSelection:[],
            arr:[],
            shopInshow:{
                show1:false,
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
            shopInList({params:{page:page,page_size:10}}).then(res=>{
                this.record_count=Number(res.data.filter.record_count);
                console.log(res.data);
                this.shopInData=res.data.arr;
            })  
        }, 
        reset(){
            this.reload();
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        handleClose(done) {
            done();
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            erpTableSetting.shopInList=this.shopInshow;
            localStorage.erpTableSetting=JSON.stringify(erpTableSetting);
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
            this.init(val);
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
        edit(row){//------------------------------修改订单
            let data=this.$qs.stringify(row);
            shopInListEd(data).then(res=>{
                if(res.errno==0){
                    this.$message({
                        type: "success",
                        message: res.data.message,
                        duration: 1000
                    });
                    this.reload();    
                }else{
                    this.$message({
                        type: "error",
                        message: res.errmsg,
                        duration: 1000
                    });
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
                    this.$message({
                        type: "success",
                        message: res.data.message,
                        duration: 1000
                    });
                    this.detailGoods();    
                }else{
                    this.$message({
                        type: "error",
                        message: res.errmsg,
                        duration: 1000
                    });
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
                        this.$alert(res.errmsg,{
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
                    this.$message({
                        type: "success",
                        message: res.data.message,
                        duration: 1000
                    });
                    this.reload();  
                }else{
                    this.$message({
                        type: "error",
                        message: res.errmsg,
                        duration: 1000
                    });
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
        },
        tableRowStyle({ row, rowIndex }) {
            return 'background-color:#949494;color:#fff;'
        },
    },
    created: function () { 
        if(localStorage.erpTableSetting!==undefined){
            console.log("yes");
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting); 
            if(erpTableSetting.shopInList!==undefined){
                this.shopInshow=erpTableSetting.shopInList;
            }
        }else{
            console.log("no");
        };
        this.init(1);
    }
}
</script>