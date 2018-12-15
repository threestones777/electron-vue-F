<template>
  <div id="shopOderList">
    <div class="main-header">
        <h3>温州美联 管理中心</h3>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item>购货</el-breadcrumb-item>
            <el-breadcrumb-item>采购订单</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div style="margin:10px 0;text-align:center">
            <el-button icon="el-icon-tickets"  style="float:right;margin-right:20px" type="primary" size="small" @click="dialogShow=true">显示列</el-button>
            <el-input  prefix-icon="el-icon-search" style="width:15%" v-model="search"  size="mini"  placeholder="输入关键字搜索"/>
            <el-button type="primary" size="small" @click="add" icon="el-icon-plus"></el-button>
            <el-button type="primary" size="small" @click="reset">刷新</el-button>
    </div>
    <!-- 按需选择列弹窗 -->
            <el-dialog
            style="text-align:left;"
            title="按需选择列" class="chose"
            :visible.sync="dialogShow"
            :before-close="handleClose"
            width="300px">
                <el-checkbox v-model="shopOdershow.show1">采购单id</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show2">采购单编号</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show3">日期</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show4">制单人</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show5">状态</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show6">备注</el-checkbox><br><br>
            </el-dialog>
    <el-table
      :data="shopOderData.filter(data =>  {
            return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1})})"
      border
      :row-style="{height:0}"  
      :cell-style="{padding:0}"
      :header-row-style="{height:0}"  
      :header-cell-style="{padding:0}"
      :default-sort = "{prop: 'date', order: 'descending'}"
      style="width: 100%">
        <el-table-column
            prop="purchase_id"
            v-if="shopOdershow.show1"
            align="center"
            label="采购单id">
        </el-table-column>
        <el-table-column
            prop="purchase_sn"
            v-if="shopOdershow.show2"
            align="center"
            label="采购单编号">
        </el-table-column>
        <el-table-column
            prop="add_time"
            v-if="shopOdershow.show3"
            align="center"
            sortable
            label="日期	">
        </el-table-column>
        <el-table-column
            prop="admin_name"
            v-if="shopOdershow.show4"
            align="center"
            label="制单人">
        </el-table-column>
        <el-table-column
            prop="status"
            v-if="shopOdershow.show5"
            align="center"
            :filters="[{ text: '未审核', value: '0' }, { text: '审核通过', value: '1' },{ text: '审核驳回', value: '2' }]"
            :filter-method="filterHandler"
            label="状态">
            <template slot-scope="scope">
                {{scope.row.status==0?"未审核":scope.row.status==1?"审核通过":scope.row.status==2?"审核驳回":"未知状态"}}
            </template>
        </el-table-column>
        <el-table-column
            align="center"
            v-if="shopOdershow.show6"
            label="备注">
            <template slot-scope="scope">
                <input v-model="scope.row.note">
            </template>
        </el-table-column>
        <el-table-column
        fixed="right"
        align="center"
        label="相关操作">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="edit(scope.row)">保存修改</el-button>
                <el-button type="text" size="small" @click="showDetails(scope.row),dialogDetail = true">商品详情</el-button>
                <el-button type="text" size="small" @click="getId(scope.row),dialogCheck = true">审核</el-button>
                <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
            </template>
        </el-table-column>       
    </el-table>
    <!-------------------------------------------------------- 详情弹窗 ---------------------------------------------------------------->
    <el-dialog width="800px" title="商品详情" :visible.sync="dialogDetail">
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
                    <el-input size="mini" style="width:100%" v-model="scope.row.number"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="属性">
                <template slot-scope="scope">
                    <el-input size="mini" style="width:100%" v-model="scope.row.attr_value"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="备注">
                <template slot-scope="scope">
                    <el-input size="mini" style="width:100%" v-model="scope.row.note"></el-input>
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
            <el-button size="small" type="primary" @click="dialogDetail = false">确定</el-button>
        </div>
    </el-dialog>
    <!------------------------------------------------------- 审核弹窗 ------------------------------------------------>
    <el-dialog width="30%" title="订单审核" :visible.sync="dialogCheck">
        <el-radio-group v-model="status">
            <el-radio :label="0">未审核</el-radio>
            <el-radio :label="1">审核通过</el-radio>
            <el-radio :label="2">审核驳回</el-radio>
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
    <!--分页显示-->
    <el-pagination
        @current-change="handleCurrentChange"
        layout="total,prev, pager, next,jumper"
        :total="record_count">
    </el-pagination>
  </div>
</template>
<style scoped>
    #shopOderList{
        text-align:center;
        margin: 20px;
    }
    #shopOderList .main-header{
        text-align:left;
        margin-bottom:10px;
        padding:10px;
        background:#fff;
    }
    #shopOderList .main-header .el-breadcrumb {
        margin: 8px 0 0 10px;
    }
    #shopOderList .el-input{
        width:200px;
    }
    #shopOderList .el-table{
      margin:20px 0;
    }
    #shopOderList .el-upload{
      margin:20px 0;
    }
    #shopOderList .el-pagination{
        text-align: right;
        margin:20px 0 50px 0;
    }
    #shopOderList .el-pagination__jump .el-input{
        width:50%;
    }
    #shopOderList .addGoods{
        float:right;
        position:relative;
        bottom:15px;
    }
    .el-table input{
        width:100%;
        height:34px;
        border:1px solid #DCDFE6;
        border-radius:4px;
        padding:2px;
    }
</style>
<script>
import {shopOderList,getGoodsList} from '../../api/api';
import {shopOderListDe,shopOderListCh,shopOderAddG,shopOderEdG,shopOderDeG,shopOderEd,shopOderAdd,shopOderRm} from '../../api/apiW' ;
export default {
    inject: ['reload'], 
    data() {
        return {
            dialogDetail:false,
            dialogCheck:false,
            dialogAddGoods:false,
            dialogAdd:false,
            dialogShow:false,
            record_count:0,
            search:"",
            status:0,
            purchase_id:0,
            purchase_sn:0,
            input:'',
            orderDate:'',
            orderId:'',
            pages:1,
            pagesG:1,
            goodsData:[],
            goodsListData:[],
            shopOderData: [],
            formDetail:{},
            formAdd:{},
            value: '' ,
            multipleSelection: [] ,
            arr:[],
            shopOdershow:{
                show1:true,
                show2:true,
                show3:true,
                show4:true,
                show5:true,
                show6:true,
            },   
        }
    },
    methods: { 
        init(page){//-----------------初始化数据
            shopOderList({params:{page:page,page_size:10}}).then(res=>{
                this.record_count=Number(res.data.filter.record_count);
                console.log(res.data);
                this.shopOderData=res.data.gather_list;
            })
        }, 
        handleClose(done){
            done();
           let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            erpTableSetting.shopOderList=this.shopOdershow;
            localStorage.erpTableSetting=JSON.stringify(erpTableSetting); 
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        reset(){
            this.reload() ;
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
        selectionChange(val) {
            this.multipleSelection = val;
            console.log(this.multipleSelection);
            this.arr=[];
            for(let i=0;i<this.multipleSelection.length;i++){
                this.arr.push(this.multipleSelection[i].goods_id);
            };
                console.log(this.arr);
        },
        add(){//------------------------------添加订单
            console.log("add");
            let data=this.$qs.stringify(this.formAdd);
            shopOderAdd(data).then(res=>{
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
            shopOderListDe({params:{purchase_sn:this.purchase_sn}}).then(res=>{
                console.log(res);
                this.formDetail=res.data;
                this.goodsData=res.data.purchase_goods;
            });
        },
        showDetails(row){//------------------------------详情
            this.purchase_id=row.purchase_id;
            this.purchase_sn=row.purchase_sn;
            this.detailGoods();
        },
        getId(row){//-----------------------保存id
            this.purchase_id=row.purchase_id;
            this.status=Number(row.status);
        },
        checkSta(){//------------------审核
            let dataC=this.$qs.stringify({
                purchase_id:this.purchase_id,
                status:this.status
            });
            shopOderListCh(dataC).then(res=>{
                console.log(res);
                this.reload();
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
                purchase_id:this.purchase_id,
                goods_ids:JSON.stringify(this.arr)
            });
            shopOderAddG(dataA).then(res=>{
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
        edit(row){//---------------------------------修改订单
            let data=this.$qs.stringify(row);
            shopOderEd(data).then(res=>{
                console.log(res);
                if(res.errno==0){
                    this.$message({
                        type: "success",
                        message: res.errmsg,
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
        editGoods(row){//---------------------------修改商品
            row.purchase_sn=this.purchase_sn;
            console.log(row);
            let data=this.$qs.stringify(row);
            shopOderEdG(data).then(res=>{
                console.log(res);
                if(res.errno==0){
                    this.$message({
                        type: "success",
                        message: res.errmsg,
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
            console.log(this.purchase_sn);
            console.log(row.id);
            let Message=confirm("确定删除此行商品？");
            if(Message){
                let dataD=this.$qs.stringify({
                    purchase_sn:this.purchase_sn,
                    id:row.id
                });
                shopOderDeG(dataD).then(res=>{
                    console.log(res);
                    if(res.errno==0){
                        this.$alert(res.data.message,{
                            callback:action=>{
                                this.detailGoods();    
                            }
                        })
                    }else{
                        this.$alert(res.data.message)
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
                    purchase_id:row.purchase_id
                });
                shopOderRm(dataD).then(res=>{
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
            if(erpTableSetting.shopOderList!==undefined){
                this.shopOdershow=erpTableSetting.shopOderList;
            }
        }else{
            console.log("no");
        }
        this.init(1);
    }
}
</script>