<template>
    <div class="transferApplication">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>调拨</el-breadcrumb-item>
                <el-breadcrumb-item>调货申请</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <fieldset style="margin:10px 0;border-color:#fff;text-align:left">
                <legend>查询条件</legend>
                <el-row type="flex" justify="space-around" :gutter="10">
                    <el-col style="text-align:left" :span="3">
                        <el-radio-group @change="chose" v-model="radio" style="margin-top:5px;">
                            <el-radio label="apply_time">申请日期</el-radio><br>
                            <el-radio label="fahuo_time">发货日期</el-radio><br>
                            <el-radio label="shouhuo_time">收货日期</el-radio>
                        </el-radio-group>    
                    </el-col>
                    <el-col style="text-align:left" :span="3">
                        <el-radio-group @change="chose" v-model="radio" style="margin-top:5px;">
                        <el-radio label="require_arrival_time">要求到货日期</el-radio><br>
                        <el-radio label="5">不按日期</el-radio>
                    </el-radio-group>    
                    </el-col>
                    <el-col :span="4">
                        <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="search"  size="mini"  placeholder="订单号"/>
                    </el-col>
                    <el-col :span="4">
                        <el-select @change="chose" v-model="value" size="small" placeholder="申请状态" style="margin-bottom:5px;">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4">
                        <el-select @change="chose" v-model="value1" size="small" placeholder="发货状态">
                            <el-option
                            v-for="item in options1"
                            :key="item.value1"
                            :label="item.label"
                            :value="item.value1">
                            </el-option>
                        </el-select> 
                        <el-select @change="chose" v-model="value4" size="small" placeholder="收货状态" style="margin-top:5px">
                            <el-option
                            v-for="item in options4"
                            :key="item.value4"
                            :label="item.label"
                            :value="item.value4">
                            </el-option>
                        </el-select> 
                    </el-col>
                    <el-col :span="5">
                        <el-date-picker
                        v-model="search3" size="small"
                        style="width:100%;margin-top:0px"
                        type="daterange" @change="chose"
                        align="right"
                        unlink-panels
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="primary" size="small" @click="reset">刷 新</el-button><br>
                        <el-button icon="el-icon-tickets"  style="margin-top:5px" type="primary" size="small" @click="dialogShow=true">显示列</el-button>
                    </el-col>
                </el-row>				
			</fieldset>

            <!-- 按需选择列弹窗 -->
            <el-dialog
            title="按需选择列" class="chose" style="text-align:left"
            :visible.sync="dialogShow"
            :before-close="handleClose"
            width="200px">
                <el-checkbox v-model="transferApplicationshow.show1">id</el-checkbox><br>
                <el-checkbox v-model="transferApplicationshow.show2">状态</el-checkbox><br>
                <el-checkbox v-model="transferApplicationshow.show3">发货店号</el-checkbox><br>
                <el-checkbox v-model="transferApplicationshow.show4">发货店名</el-checkbox><br>
                <el-checkbox v-model="transferApplicationshow.show5">收货店号</el-checkbox><br>
                <el-checkbox v-model="transferApplicationshow.show6">收货店名</el-checkbox><br>
                <el-checkbox v-model="transferApplicationshow.show7">单据编号</el-checkbox><br>
                <el-checkbox v-model="transferApplicationshow.show8">单据类型</el-checkbox><br>
                <el-checkbox v-model="transferApplicationshow.show9">要求到货日期</el-checkbox><br>
                <el-checkbox v-model="transferApplicationshow.show10">金额</el-checkbox><br>
                <el-checkbox v-model="transferApplicationshow.show11">申请人</el-checkbox><br>
                <el-checkbox v-model="transferApplicationshow.show12">申请日期</el-checkbox><br>
                <el-checkbox v-model="transferApplicationshow.show13">发货人</el-checkbox><br>
                <el-checkbox v-model="transferApplicationshow.show14">发货时间</el-checkbox><br>
                <el-checkbox v-model="transferApplicationshow.show15">收货人</el-checkbox><br>
                <el-checkbox v-model="transferApplicationshow.show16">收货时间</el-checkbox><br>
                <el-checkbox v-model="transferApplicationshow.show17">备注</el-checkbox><br><br>
            </el-dialog>
            <!-- 详情弹出框 -->
            <el-dialog width="800px" title="调货申请详情" :visible.sync="dialogServeDetail">
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
                        label="申请数量">
                        <template slot-scope="scope">
                            <el-input size="mini" style="width:100%" v-model="scope.row.apply_num"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="申请金额">
                        <template slot-scope="scope">
                            <el-input size="mini" style="width:100%" v-model="scope.row.apply_money"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="申请售价金额">
                        <template slot-scope="scope">
                            <el-input size="mini" style="width:100%" v-model="scope.row.apply_shop_price" disabled></el-input>
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
                </el-table><br><br>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="transferAppData.filter(data =>  {
            return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1})})"
            border
            show-summary
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            style="width: 100%">
                <el-table-column
                align="center"
                v-if="transferApplicationshow.show1"
                label="id">
                    <template slot-scope="scope">
                        <span>{{scope.row.id}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="transferApplicationshow.show2"
                label="状态">
                    <template slot-scope="scope">
                        <span>{{scope.row.status}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="transferApplicationshow.show3"
                label="发货店号">
                    <template slot-scope="scope">
                        <span>{{scope.row.from_subshop_id}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="transferApplicationshow.show4"
                label="发货店名">
                    <template slot-scope="scope">
                        <span>{{scope.row.from_subshop_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="transferApplicationshow.show5"
                label="收货店号">
                    <template slot-scope="scope">
                        <input v-model="scope.row.to_subshop_id"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="transferApplicationshow.show6"
                label="收货店名">
                    <template slot-scope="scope">
                        <input v-model="scope.row.to_subshop_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="transferApplicationshow.show7"
                label="单据编号">
                    <template slot-scope="scope">
                        <input v-model="scope.row.bill_sn"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="transferApplicationshow.show8"
                label="单据类型">
                    <template slot-scope="scope">
                        <input v-model="scope.row.type"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="transferApplicationshow.show9"
                label="要求到货日期">
                    <template slot-scope="scope">
                        <input v-model="scope.row.require_arrival_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="money"
                align="center"
                v-if="transferApplicationshow.show10"
                label="金额">
                    <template slot-scope="scope">
                        <input v-model="scope.row.money"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="transferApplicationshow.show11"
                label="申请人">
                    <template slot-scope="scope">
                        <input v-model="scope.row.apply_user"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="transferApplicationshow.show12"
                label="申请日期">
                    <template slot-scope="scope">
                        <input v-model="scope.row.apply_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="transferApplicationshow.show13"
                label="发货人">
                    <template slot-scope="scope">
                        <input v-model="scope.row.fahuo_user"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="transferApplicationshow.show14"
                label="发货时间">
                    <template slot-scope="scope">
                        <input v-model="scope.row.fahuo_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="transferApplicationshow.show15"
                label="收货人">
                    <template slot-scope="scope">
                        <input v-model="scope.row.shouhuo_user"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="transferApplicationshow.show16"
                label="收货时间">
                    <template slot-scope="scope">
                        <input v-model="scope.row.shouhuo_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="transferApplicationshow.show17"
                label="备注">
                    <template slot-scope="scope">
                        <input v-model="scope.row.remark"/>
                    </template>
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="edit(scope.row)">保存修改</el-button>
                        <el-button type="text" size="small" @click="showDetails(scope.row),dialogServeDetail = true">商品详情</el-button>
                        <el-button type="text" size="small" @click="getId(scope.row),dialogCheck = true">审核</el-button>
                        <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
    <!------------------------------------------------------- 审核弹窗 ------------------------------------------------>
            <el-dialog width="30%" title="订单审核" :visible.sync="dialogCheck">
                <el-radio-group v-model="status">
                    <el-radio :label="0">未审核</el-radio>
                    <el-radio :label="1">已审核</el-radio>
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
                     <el-table-column
                    fixed="right"
                    align="center"
                    label="相关操作">
                        <template slot-scope="scope">
                            <el-button size="medium" type="text" @click="addGoods(scope.row),dialogAddGoods = false" icon="el-icon-circle-plus-outline">添加</el-button>
                        </template>
                    </el-table-column>    
                </el-table>
            <el-pagination
                @current-change="handleCurrentChangeG"
                layout="prev, pager, next,jumper"
                :page-count="pagesG">
            </el-pagination>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogAddGoods = false">取 消</el-button>
                <el-button size="small" type="primary" @click="dialogAddGoods = false">确定</el-button>
            </span>
            </el-dialog>
            <!-- 分页器 -->
            <el-pagination
                @current-change="handleCurrentChange"
                layout="total,prev, pager, next,jumper"
                :total="record_count">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {getGoodsList} from '../../api/api';
import {transfer,transferDe,transferEd,transferAdd,transferGoods,transferAddG,transferEdG,transferRmv,transferChe} from '../../api/apiW' ;
import { setInterval } from 'timers';
export default {
    inject: ['reload'], 
    data() {
        return {
            pages:1,
            pagesG:1,
            bill_sn:0,
            id:0,
            status:"未审核",
            dialogServeAdd:false,
            dialogServeDetail:false,
            dialogAddGoods:false,
            dialogCheck:false,
            dialogShow:false,
            record_count:0,
            search:'',
            search3:['2017-7-7','2019-9-9'],
            radio:"5",
            value: '' ,
            value1: '' ,
            value3: '' ,
            value4: '' ,
            value5: '' ,
            value6: '' ,
            value7: '' ,
            formServeAdd:{
                type:0,
                status:"未审核",
                from_subshop_id:0,
                from_subshop_name:"",
                to_subshop_id:0,
                to_subshop_name:"",
                require_arrival_time:new Date().getTime()/1000-86400,
                money:0,
                apply_user:0,
                apply_time:new Date().getTime()/1000-86400,
                fahuo_user:0,
                fahuo_time:new Date().getTime()/1000-86400,
                shouhuo_user:0,
                shouhuo_time:new Date().getTime()/1000-86400,
            },
            formServeDetail:{},
            goodsData:[],
            goodsListData:[],
            transferAppData:[],
            transferApplicationshow:{
                show1:true,
                show2:true,
                show3:true,
                show4:true,
                show5:true,
                show6:true,
                show7:true,
                show8:true,
                show9:true,
                show10:true,
                show11:true,
                show12:true,
                show13:true,
                show14:true,
                show15:true,
                show16:true,
                show17:true,
            },
            options: [{
            value: '0',
            label: '未审核'
            }, {
            value: '1',
            label: '已审核'
            },{
            value: '2',
            label: '审核驳回'
            }],  
            options1: [{
            value1: '0',
            label: '未发货'
            }, {
            value1: '1',
            label: '已发货'
            },],
            options4: [{
            value4: '0',
            label: '未收货'
            }, {
            value4: '1',
            label: '已收货'
            },],
        }
    },
    methods:{
        init(page){//-----------------初始化数据
            let data=this.$qs.stringify({
                page:page,
                page_size:10,
            }); 
            this.data(data);  
        }, 
        data(data){
            transfer(data).then(res=>{
                console.log(res.data.transfer_list);
                this.record_count=Number(res.data.filter.record_count);
                this.transferAppData=res.data.transfer_list;
            }) 
        },
        chose(){//-----------------选择查询
            let data=this.$qs.stringify({
                page:1,
                page_size:10,
                time_by:this.radio,
                status:this.value,
                fahuo_status:this.value1,
                shouhuo_status:this.value4,
                add_time1:this.search3[0],
                add_time2:this.search3[1],
            }); 
            this.data(data);  
        },
        handleClose(done){
            done();
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            erpTableSetting.transferApplication=this.transferApplicationshow;
            localStorage.erpTableSetting=JSON.stringify(erpTableSetting);
        }, 
        dateConverter(str) { //-----------------------日期转秒数
            var arr = str.split(/[-:\/]/);
            var startDate = Date.parse(new Date(arr[0], arr[1]-1, arr[2]))/1000;
            return startDate;
        },      
        reset() {
            this.reload();
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
        getGoods(){//--------------------------------获取商品列表
            getGoodsList({params:{page:1,page_size:10}}).then(res=>{
                console.log(res.data.goods);
                this.goodsListData=res.data.goods;
                this.pagesG=Math.ceil(res.data.filter.record_count/10);
            })
        },
        goodsList(){
            let dataG = this.$qs.stringify({
                    bill_sn:this.bill_sn
                });
                transferGoods(dataG).then(res=>{
                    console.log(res.data);
                    this.goodsData=res.data;
                });
        },
        getId(row){//-----------------------保存id
            this.id=row.id;
            this.status=(row.status=="未审核"?0:(row.status=="已审核"?1:(row.status=="审核驳回"?2:0)));
            console.log(this.status);
        },
        checkSta(){//------------------审核
            let dataC=this.$qs.stringify({
                id:this.id,
                status:this.status
            });
            transferChe(dataC).then(res=>{
                console.log(res);
                this.reload();
            });
        },
        addGoods(row){//---------------------------------添加商品
            let dataA=this.$qs.stringify({
                bill_sn:this.bill_sn,
                goods_id:row.goods_id
            });
            transferAddG(dataA).then(res=>{
                console.log(res);
                if(res.errno==0){
                    this.$message({
                        type: "success",
                        message: res.errmsg,
                        duration: 1000
                    });
                    this.goodsList();
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
            row.bill_sn=this.bill_sn;
            console.log(row);
            let data=this.$qs.stringify(row);
            transferEdG(data).then(res=>{
                console.log(res);
                if(res.errno==0){
                    this.$message({
                        type: "success",
                        message: res.data.message,
                        duration: 1000
                    });
                    this.goodsList();    
                }else{
                    this.$message({
                        type: "error",
                        message: res.errmsg,
                        duration: 1000
                    });
                }
            });
        },
        showDetails(row){//-------------------------详情
            console.log(row.id);
            this.bill_sn=row.bill_sn;
            let dataD = this.$qs.stringify({
                id:row.id
            });
            transferDe(dataD).then(res=>{
                console.log(res.data);
                this.formServeDetail=res.data;
            });
            this.goodsList();
        },
        edit(row){//--------------修改
            if(row.require_arrival_time!==""){
                row.require_arrival_time=this.dateConverter(row.require_arrival_time);
            }else{
                row.require_arrival_time=new Date().getTime()/1000-86400;
            };
            if(row.apply_time!==""){
                row.apply_time=this.dateConverter(row.apply_time);
            }else{
                row.apply_time=new Date().getTime()/1000-86400;
            };
            if(row.fahuo_time!==""){
                row.fahuo_time=this.dateConverter(row.fahuo_time);
            }else{
                row.fahuo_time=new Date().getTime()/1000-86400;
            };
            if(row.shouhuo_time!==""){
                row.shouhuo_time=this.dateConverter(row.shouhuo_time);
            }else{
                row.shouhuo_time=new Date().getTime()/1000-86400;
            };
            let dataE=this.$qs.stringify(row);
            transferEd(dataE).then(res=>{
                console.log(res.errno);
                if(res.errno==0){
                    this.$message({
                        type: "success",
                        message: res.errmsg,
                        duration: 1000
                    });
                    this.init(1);
                }else{
                    this.$message({
                        type: "error",
                        message: res.errmsg,
                        duration: 1000
                    });
                    this.init(1);
                }
            })
        },
        add(){//--------------添加
            let dataA=this.$qs.stringify(this.formServeAdd);
            transferAdd(dataA).then(res=>{
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
            })
        },
        deleteGoods(row){//---------------------------删除商品
            let Message=confirm("确定删除此行商品？");
            if(Message){
                let dataD=this.$qs.stringify({
                    bill_sn:this.bill_sn,
                    goods_id:row.goods_id
                });
                transferRmv(dataD).then(res=>{
                    console.log(res);
                    if(res.errno==0){
                        this.$alert(res.data.msg,{
                            callback:action=>{
                                this.goodsList();
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
        deleteRow(row) {//--------------删除
            let Message=confirm("确定删除此行数据？");
            if(Message){
                let data=this.$qs.stringify({
                    id:row.id,
                    is_delete:1
                }); 
                transferEd(data).then(res=>{
                    if(res.errno==0){
                        this.$alert("删除成功",{
                            callback:action=>{
                                this.reload();
                            }
                        })
                    }else{
                        this.$alert("删除失败")
                    }
                });   
            }else{
                alert("用户取消操作");
            }
        }
    },
    created: function () { 
        if(localStorage.erpTableSetting!==undefined){
            console.log("yes");
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting); 
            if(erpTableSetting.transferApplication!==undefined){
                this.transferApplicationshow=erpTableSetting.transferApplication;
            }
        }else{
            console.log("no");
        };
        this.init(1); 
    }
}
</script>
<style scoped>
.transferApplication{
    text-align:center;
    margin: 20px;
}
.transferApplication .addGoods{
        float:right;
        position:relative;
        bottom:15px;
}
/* 头部面包屑 */
.main-header {
    text-align: left;
    padding: 10px;
    background: #fff;
}
.main-header .el-breadcrumb {
  margin: 8px 0 0 10px;
}
/* 搜索操作 */
.main-table .el-form {
  padding-top: 10px;
  text-align: center;
}
.el-form .el-form-item {
  margin-bottom: 10px;
}

.el-form .el-form-item .el-input {
  width: 80%;
}

/* 分页器 */
.el-pagination {
  padding: 20px 0;
  text-align: right;
}
.el-table input{
    width:100%;
    height:34px;
    border:1px solid #DCDFE6;
    border-radius:4px;
    padding:2px;
}
/* 新增弹出框 & 详情弹出框*/
.main-table>>>.el-dialog__body {
  padding: 0 20px;
}
.el-dialog__body .el-form {
  text-align: right;
}
.el-row{
    background:#F3F3F3;
    width:100%;
}
.chose .el-checkbox{
    margin-bottom:10px;
}
</style>