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
        <fieldset style="margin:10px 0;border-color:#fff;text-align:left">
                <legend>查询条件</legend>
                <el-row type="flex" justify="space-around" :gutter="10">
                    <el-col style="text-align:left" :span="3">
                        <el-radio-group v-model="radio" style="margin-top:5px;">
                        <el-radio :label="3">订货日期</el-radio><br>
                        <el-radio :label="6">要求到货日期</el-radio><br>
                        <el-radio :label="9">不按日期</el-radio>
                    </el-radio-group>    
                    </el-col>
                    <el-col :span="4">
                        <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="search"  size="mini"  placeholder="订单号"/>
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%" v-model="search11"  size="mini"  placeholder="供应商编码"/>
                    </el-col>
                    <el-col :span="4">
                        <el-select @change="check" v-model="value" size="small" placeholder="审核" style="margin-bottom:5px;">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select @change="chose" v-model="value1" size="small" placeholder="分店">
                            <el-option
                            v-for="item in options1"
                            :key="item.value1"
                            :label="item.label"
                            :value="item.value1">
                            </el-option>
                        </el-select>    
                    </el-col>
                    <el-col :span="5">
                        <el-date-picker
                        v-model="search3" size="small"
                        style="width:100%;margin-top:0px"
                        type="daterange"
                        align="right"
                        unlink-panels
                        @change="chose"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                        <el-select @change="chose" v-model="value5" size="small" placeholder="订单状态" style="margin-top:5px;width:100%">
                            <el-option
                            v-for="item in options5"
                            :key="item.value5"
                            :label="item.label"
                            :value="item.value5">
                            </el-option>
                        </el-select> 
                    </el-col>
                    <el-col :span="4">
                        <el-select @change="chose" v-model="value4" size="small" placeholder="分店类型" style="margin-top:30px">
                            <el-option
                            v-for="item in options4"
                            :key="item.value4"
                            :label="item.label"
                            :value="item.value4">
                            </el-option>
                        </el-select> 
                    </el-col>
                    <el-col :span="3">
                        <el-button type="primary" size="small" @click="reset">刷新</el-button><br>
                        <el-button icon="el-icon-tickets"  style="margin-top:5px" type="primary" size="small" @click="dialogShow=true">显示列</el-button>
                    </el-col>
                </el-row>
			</fieldset>

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
                <el-checkbox v-model="shopOdershow.show3">店号</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show4">下单分店</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show5">订单状态</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show6">供应商编码</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show7">供应商名称</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show8">订货日期</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show9">预定到货日期</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show10">金额</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show11">采购组</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show12">联系人</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show13">手机</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show14">电话</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show15">订货员</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show16">审核员</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show17">制单人</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show18">状态</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show19">备注</el-checkbox><br><br>
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
      :summary-method="getSummaries"
      show-summary
      style="width: 100%">
        <!-- <el-table-column
            prop="purchase_id"
            v-if="shopOdershow.show1"
            align="center"
            label="采购单id">
        </el-table-column> -->
        <el-table-column
            prop="purchase_sn"
            v-if="shopOdershow.show2"
            align="center"
            label="采购单编号">
        </el-table-column>
        <el-table-column
            v-if="shopOdershow.show3"
            align="center"
            label="店号">
        </el-table-column>
        <el-table-column
            v-if="shopOdershow.show4"
            align="center"
            label="下单分店">
        </el-table-column>
        <el-table-column
            v-if="shopOdershow.show5"
            align="center"
            label="订单状态">
        </el-table-column>
        <el-table-column
            v-if="shopOdershow.show6"
            align="center"
            label="供应商编码">
        </el-table-column>
        <el-table-column
            v-if="shopOdershow.show7"
            align="center"
            label="供应商名称">
        </el-table-column>
        <el-table-column
            prop="add_time"
            v-if="shopOdershow.show8"
            align="center"
            sortable
            label="订货日期">
        </el-table-column>
        <el-table-column
            v-if="shopOdershow.show9"
            align="center"
            label="预定到货日期">
        </el-table-column>
        <el-table-column
            v-if="shopOdershow.show10"
            align="center"
            label="金额">
        </el-table-column>
        <el-table-column
            v-if="shopOdershow.show11"
            align="center"
            label="采购组">
        </el-table-column>
        <el-table-column
            v-if="shopOdershow.show12"
            align="center"
            label="联系人">
        </el-table-column>
        <el-table-column
            v-if="shopOdershow.show13"
            align="center"
            label="手机">
        </el-table-column>
        <el-table-column
            v-if="shopOdershow.show14"
            align="center"
            label="电话">
        </el-table-column>
        <el-table-column
            v-if="shopOdershow.show15"
            align="center"
            label="订货员">
        </el-table-column>
        <el-table-column
            v-if="shopOdershow.show16"
            align="center"
            label="审核员">
        </el-table-column>
        <el-table-column
            prop="admin_name"
            v-if="shopOdershow.show17"
            align="center"
            label="制单人">
        </el-table-column>
        <!-- <el-table-column
            prop="status"
            v-if="shopOdershow.show18"
            align="center"
            :filters="[{ text: '未审核', value: '0' }, { text: '审核通过', value: '1' },{ text: '审核驳回', value: '2' }]"
            :filter-method="filterHandler"
            label="状态">
            <template slot-scope="scope">
                {{scope.row.status==0?"未审核":scope.row.status==1?"审核通过":scope.row.status==2?"审核驳回":"未知状态"}}
            </template>
        </el-table-column> -->
        <el-table-column
            align="center"
            prop="note"
            v-if="shopOdershow.show19"
            label="备注">
        </el-table-column>
        <el-table-column
        fixed="right"
        align="center"
        label="相关操作">
            <template slot-scope="scope">
                <!-- <el-button type="text" size="small" @click="edit(scope.row)">保存修改</el-button> -->
                <el-button type="text" size="small" @click="showDetails(scope.row),dialogDetail = true">订单详情</el-button>
                <!-- <el-button type="text" size="small" @click="getId(scope.row),dialogCheck = true">审核</el-button> -->
                <!-- <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button> -->
            </template>
        </el-table-column>       
    </el-table>
    <!-------------------------------------------------------- 详情弹窗 ---------------------------------------------------------------->
    <el-dialog width="95%" title="订单详情" :visible.sync="dialogDetail">
        <!-- <el-button size="small" type="primary" class="addGoods" @click="getGoods(),dialogAddGoods=true">添加商品</el-button> -->

        <el-row type="flex" style="padding-bottom:0px;" justify="space-around" :gutter="10">
            <el-col :span="8">
                <el-row type="flex" justify="space-around" :gutter="5">
                    <el-col :span="12">
                        <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="search"  size="mini"  placeholder="输入订单号"/>
                        <el-select v-model="value6" size="small" placeholder="结算类型" style="margin-bottom:5px;">
                            <el-option
                            v-for="item in options6"
                            :key="item.value6"
                            :label="item.label"
                            :value="item.value6">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="12">
                        <el-select v-model="value7" size="small" placeholder="分店" style="margin-bottom:5px;">
                            <el-option
                            v-for="item in options7"
                            :key="item.value7"
                            :label="item.label"
                            :value="item.value7">
                            </el-option>
                        </el-select>
                        <el-input  prefix-icon="el-icon-search" style="width:100%" v-model="search1"  size="mini"  placeholder="金额"/>
                    </el-col>
                </el-row> 
                <!-- <el-row type="flex" justify="space-around" style="margin-top:0px;">
                    <el-col :span="24">
                        <el-input  prefix-icon="el-icon-search" style="width:100%;" v-model="search1"  size="mini"  placeholder="备注"/>
                    </el-col>
                </el-row> -->
            </el-col>
            <el-col :span="8">
                <el-row type="flex" justify="space-around" :gutter="5">
                    <el-col :span="12">
                    <el-input  prefix-icon="el-icon-search" style="width:100%;" v-model="search2"  size="mini"  placeholder="实际收货人"/>
                    <el-input  prefix-icon="el-icon-search" style="width:100%;margin-top:10px;" v-model="search3"  size="mini"  placeholder="审核人"/> 
                    </el-col>
                    <el-col :span="12">
                        <el-date-picker
                        v-model="search8" size="small"
                        type="date" style="width:100%"
                        value-format="yyyy-MM-dd"
                        placeholder="实际到货日期">
                        </el-date-picker>
                        <el-input  prefix-icon="el-icon-search" style="width:100%;margin-top:5px" v-model="search4"  size="mini"  placeholder="业务员"/> 
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="8">
                <el-row type="flex" justify="space-around" :gutter="5">
                    <el-col :span="12">
                        <el-date-picker
                        v-model="search9" size="small"
                        type="date" style="width:100%"
                        value-format="yyyy-MM-dd"
                        placeholder="预定到货日期">
                        </el-date-picker>
                        <el-input  prefix-icon="el-icon-search" style="width:100%;margin-top:5px" v-model="search5"  size="mini"  placeholder="对方单号"/> 
                    </el-col>
                    <el-col :span="12">
                        <el-input  prefix-icon="el-icon-search" style="width:100%;margin-top:5px" v-model="search6"  size="mini"  placeholder="进货"/> 
                        <el-input  prefix-icon="el-icon-search" style="width:100%;margin-top:5px" v-model="search7"  size="mini"  placeholder="供应商编码"/> 
                    </el-col>
                </el-row>
            </el-col>
        </el-row>

        <el-table
        :data="goodsData"
        border
        :row-style="{height:0}" 
        :cell-style="{padding:0}"
        :header-row-style="{height:0}"  
        :header-cell-style="{padding:0}"
        style="width: 100%">
           <!--  <el-table-column
                prop="id"
                align="center"
                label="id">
            </el-table-column> -->
            <!-- <el-table-column
                prop="goods_id"
                align="center"
                label="商品id">
            </el-table-column> -->
            <el-table-column
                align="center"
                width="160"
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
                prop=""
                align="center"
                label="标配">
            </el-table-column>
            <el-table-column
                prop=""
                align="center"
                label="售价">
            </el-table-column>
            <el-table-column
                align="center"
                prop=""
                label="属性">
            </el-table-column>
            <el-table-column
                prop=""
                align="center"
                label="赠送数量">
            </el-table-column>
            <el-table-column
                prop=""
                align="center"
                label="收货金额">
            </el-table-column>
            <el-table-column
                prop=""
                align="center"
                label="收货赠送金额">
            </el-table-column>
            <el-table-column
                prop="number"
                align="center"
                label="订货箱数">
            </el-table-column>
            <el-table-column
                prop=""
                align="center"
                label="订货数量">
            </el-table-column>
            <el-table-column
                prop=""
                align="center"
                label="订货赠送数量">
            </el-table-column>
            <el-table-column
                prop=""
                align="center"
                label="订货赠送金额">
            </el-table-column>
            <el-table-column
                prop=""
                align="center"
                label="毛利额">
            </el-table-column>
            <el-table-column
                prop=""
                align="center"
                label="毛利率">
            </el-table-column>
            <el-table-column
                prop=""
                align="center"
                label="批发价">
            </el-table-column>
            <el-table-column
                align="center"
                prop=""
                label="备注">
            </el-table-column>
            <!-- <el-table-column
            fixed="right"
            align="center"
            label="相关操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editGoods(scope.row)" icon="el-icon-edit"></el-button>
                    <el-button type="text" size="small" @click="deleteGoods(scope.row)" icon="el-icon-delete"></el-button>
                </template>
            </el-table-column>   -->     
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
    .el-row{
        background:#F3F3F3;
        width:100%;
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
            search:'',
            search1:'',
            search2:'',
            search3:['2017-07-07','2019-09-09'],
            search4:'',
            search5:'',
            search6:'',
            search7:'',
            search8:'',
            search9:'',
            search11:'',
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
            value1: '' ,
            value3: '' ,
            value4: '' ,
            value5: '' ,
            value6: '' ,
            value7: '' ,
            radio:3,
            multipleSelection: [] ,
            arr:[],
            shopOdershow:{
                show1:true,
                show2:true,
                show3:false,
                show4:true,
                show5:false,
                show6:true,
                show7:false,
                show8:true,
                show9:true,
                show10:false,
                show11:false,
                show12:false,
                show13:true,
                show14:false,
                show15:true,
                show16:false,
                show17:true,
                show18:false,
                show19:true,
            }, 
            options: [{
            value: '1',
            label: '审核'
            }, {
            value: '0',
            label: '未审核'
            },],  
            options1: [{
            value1: '0',
            label: '0号店'
            }, {
            value1: '1',
            label: '1号店'
            },],  
            options3: [{
            value3: '选项1',
            label: '分公司1'
            }, {
            value3: '选项2',
            label: '分公司2'
            },],  
            options4: [{
            value4: '0',
            label: '类型1'
            }, {
            value4: '1',
            label: '类型2'
            },],  
            options5: [{
            value5: '2',
            label: '已收货'
            }, {
            value5: '3',
            label: '已退货'
            },],  
            options6: [{
            value6: '选项1',
            label: '类型1'
            }, {
            value6: '选项2',
            label: '类型2'
            },],  
            options7: [{
            value7: '选项1',
            label: '0号店'
            }, {
            value7: '选项2',
            label: '1号店'
            },],
        }
    },
    methods: { 
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
            if (index === 0) {
                sums[index] = '合计';
                return;
            }
            const values = data.map(item => Number(item[column.property]));
            /* if (!values.every(value => isNaN(value))) {
                sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                    return prev + curr;
                } else {
                    return prev;
                }
                }, 0);
                sums[index] += '';
            } else {
                sums[index] = '';
            } */
            });
            return sums;
        },
        init(page){//-----------------初始化数据
            let data=this.$qs.stringify({
                page:page,
                page_size:10
            });
            shopOderList(data).then(res=>{
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
            //console.log("add");
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
        check(){//------------------选择审核状态
            let data=this.$qs.stringify({
                page:1,
                page_size:10,
                status:this.value
            });
            this.data(data);
            console.log(this.value);
        },
        data(data){
            shopOderList(data).then(res=>{
                this.record_count=Number(res.data.filter.record_count);
                console.log(res.data);
                this.shopOderData=res.data.gather_list;
            })
        },
        chose(){  //------------------选择日期
            let data=this.$qs.stringify({
                page:1,
                page_size:10,
                start_time:this.search3[0],
                end_time:this.search3[1],
                subshop_id:this.value1,
                supplier_name:this.search11,
                status:this.value5,
                subshop_type:this.value4
            });
            this.data(data);
            console.log(this.search3);
        },
        /* branch(){//------------------选择分店
            let data=this.$qs.stringify({
                page:1,
                page_size:10,
                subshop_id:this.value1
            });
            this.data(data);
            console.log(this.value1);
        }, */
        /* supplier(){//------------------选择供应商编码
            let data=this.$qs.stringify({
                page:1,
                page_size:10,
                supplier_name:this.search11
            });
            this.data(data);
            console.log(this.search11);
        }, */
        /* orderStatus(){//------------------选择订单状态
            let data=this.$qs.stringify({
                page:1,
                page_size:10,
                status:this.value5
            });
            this.data(data);
            console.log(this.value5);
        },
        branchStyle(){//------------------选择分店类型
            let data=this.$qs.stringify({
                page:1,
                page_size:10,
                subshop_type:this.value4
            });
            this.data(data);
            console.log(this.value4);
        }, */
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