<template>
    <div class="purchaseReceive">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>购货</el-breadcrumb-item>
                <el-breadcrumb-item>采购收货</el-breadcrumb-item>  
            </el-breadcrumb>
        </div>
        <fieldset style="margin:10px 0;border-color:#fff;text-align:left">
            <legend>查询条件</legend>
            <el-row type="flex" style="padding-bottom:0px;" justify="space-around" :gutter="10">
                <el-col :span="7">
                    <el-row type="flex" justify="space-around" :gutter="5">
                        <el-col :span="12">
                            <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="search"  size="mini"  placeholder="输入订单号"/>
                            <el-select @change="chose" v-model="value" size="small" placeholder="结算类型" style="margin-bottom:5px;">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="12">
                            <el-select @change="chose" v-model="value1" size="small" placeholder="分店" style="margin-bottom:5px;">
                                <el-option
                                v-for="item in options1"
                                :key="item.value1"
                                :label="item.label"
                                :value="item.value1">
                                </el-option>
                            </el-select>
                            <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%" v-model="search1"  size="mini"  placeholder="金额"/>
                        </el-col>
                    </el-row> 
                    <!-- <el-row type="flex" justify="space-around" style="margin-top:0px;">
                        <el-col :span="24">
                            <el-input  prefix-icon="el-icon-search" style="width:100%;" v-model="search1"  size="mini"  placeholder="备注"/>
                        </el-col>
                    </el-row> -->
                </el-col>
                <el-col :span="7">
                    <el-row type="flex" justify="space-around" :gutter="5">
                        <el-col :span="12">
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search2"  size="mini"  placeholder="实际收货人"/>
                        <el-date-picker
                            v-model="search6" size="small" @change="chose"
                            type="date" style="width:100%"
                            value-format="yyyy-MM-dd"
                            placeholder="进货日期">
                            </el-date-picker>
                        <!-- <el-input  prefix-icon="el-icon-search" style="width:100%;margin-top:5px" v-model="search7"  size="mini"  placeholder="供应商编码"/>  -->
                        <!-- <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-top:10px;" v-model="search3"  size="mini"  placeholder="审核人"/>  -->
                        </el-col>
                        <el-col :span="12">
                            <el-date-picker
                            v-model="search8" size="small" @change="chose"
                            type="date" style="width:100%"
                            value-format="yyyy-MM-dd"
                            placeholder="实际到货日期">
                            </el-date-picker>
                            <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-top:5px" v-model="search4"  size="mini"  placeholder="业务员"/> 
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="7">
                    <el-row type="flex" justify="space-around" :gutter="5">
                        <el-col :span="12">
                            <el-date-picker
                            v-model="search9" size="small" @change="chose"
                            type="date" style="width:100%"
                            value-format="yyyy-MM-dd"
                            placeholder="预定到货日期">
                            </el-date-picker>
                            <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-top:5px" v-model="search5"  size="mini"  placeholder="对方单号"/> 
                        </el-col>
                        <el-col :span="12">
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="3" style="padding-left:30px;">
                    <el-button style="margin-top:10px;" type="primary" size="small" @click="reset">刷新</el-button><br>
                    <el-button icon="el-icon-tickets"  style="margin-top:10px" type="primary" size="small" @click="dialogShow=true">显示列</el-button>
                </el-col>
            </el-row>            
        </fieldset>
 
    <div  style="text-align:left;margin-top:10px">
            <el-input size="small" style="width:15%;" placeholder="请输入商品主条码"  v-model="formServeAdd.main_tm" autofocus/>
            <el-input size="small" v-model="formServeAdd.sh_goods_number"  style="width:15%;" placeholder="请输入数量"></el-input>
            <el-button type="primary" size="small" @click="add">添加</el-button>
            <el-button type="primary" size="small" @click="saveData" id="save" :disabled="save">保存</el-button>
            <el-button type="primary" size="small" @click="check">审核</el-button>
            <!-- <el-button type="primary" size="small" @click="edit">修改</el-button> -->
        </div>
            
        <div class="main-table" style="margin-top:10px">
            <!-- 按需选择列弹窗 -->
            <el-dialog
            title="按需选择列" class="chose"
            :visible.sync="dialogShow"
            :before-close="handleClose"
            width="300px">
                <!-- <el-checkbox v-model="purchaseReceiveshow.show1">采购收货id</el-checkbox><br> -->
                <el-checkbox v-model="purchaseReceiveshow.show2">促销</el-checkbox><br>
                <el-checkbox v-model="purchaseReceiveshow.show3">主条码</el-checkbox><br>
                <el-checkbox v-model="purchaseReceiveshow.show4">标配</el-checkbox><br>
                <el-checkbox v-model="purchaseReceiveshow.show5">ABC</el-checkbox><br>
                <el-checkbox v-model="purchaseReceiveshow.show6">货号</el-checkbox><br>
                <!-- <el-checkbox v-model="purchaseReceiveshow.show30">商品id</el-checkbox><br> -->
                <el-checkbox v-model="purchaseReceiveshow.show7">名称</el-checkbox><br>
                <el-checkbox v-model="purchaseReceiveshow.show8">规格</el-checkbox><br>
                <el-checkbox v-model="purchaseReceiveshow.show9">售价</el-checkbox><br>
                <el-checkbox v-model="purchaseReceiveshow.show10">进货折扣</el-checkbox><br>
                <el-checkbox v-model="purchaseReceiveshow.show11">收货进价</el-checkbox><br>
                <el-checkbox v-model="purchaseReceiveshow.show12">箱数</el-checkbox><br>
                <el-checkbox v-model="purchaseReceiveshow.show13">数量</el-checkbox><br>
                <el-checkbox v-model="purchaseReceiveshow.show14">赠送数量</el-checkbox><br>
                <el-checkbox v-model="purchaseReceiveshow.show15">收货金额</el-checkbox><br>
                <el-checkbox v-model="purchaseReceiveshow.show16">收货赠送金额</el-checkbox><br>
                <el-checkbox v-model="purchaseReceiveshow.show17">收货售价金额</el-checkbox><br>
                <el-checkbox v-model="purchaseReceiveshow.show18">订货箱数</el-checkbox><br>
                <el-checkbox v-model="purchaseReceiveshow.show19">订货数量</el-checkbox><br>
                <el-checkbox v-model="purchaseReceiveshow.show20">订货赠送数量</el-checkbox><br>
                <el-checkbox v-model="purchaseReceiveshow.show21">订货赠送金额</el-checkbox><br>
                <el-checkbox v-model="purchaseReceiveshow.show22">订货金额</el-checkbox><br>
                <el-checkbox v-model="purchaseReceiveshow.show23">箱装数</el-checkbox><br>
                <el-checkbox v-model="purchaseReceiveshow.show24">毛利额</el-checkbox><br>
                <el-checkbox v-model="purchaseReceiveshow.show25">毛利率</el-checkbox><br>
                <el-checkbox v-model="purchaseReceiveshow.show26">批发价</el-checkbox><br>
                <el-checkbox v-model="purchaseReceiveshow.show27">单位</el-checkbox><br>
                <el-checkbox v-model="purchaseReceiveshow.show28">生产日期</el-checkbox><br>
                <el-checkbox v-model="purchaseReceiveshow.show29">失效日期</el-checkbox><br><br>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="purchaseReData.filter(data =>{
            return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1})})"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:7}"
            show-summary
            style="width: 100%">
                <el-table-column
                v-if="purchaseReceiveshow.show2"
                prop="is_primot"
                align="center"
                width="50"
                :filters="[{text:'促销',value:'0'},{text:'非促销',value:'1'}]"
                :filter-method="filterHandler"
                label="促销">
                    <template slot-scope="scope">
                       <el-checkbox v-model="scope.row.is_primot" true-label="0" false-label="1"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="150"
                v-if="purchaseReceiveshow.show3"
                label="主条码">
                    <template slot-scope="scope">
                        <input v-model="scope.row.main_tm">
                    </template>
                </el-table-column>
                <el-table-column
                v-if="purchaseReceiveshow.show4"
                align="center"
                label="标配">
                    <template slot-scope="scope">
                        <input v-model="scope.row.standard">
                    </template>
                </el-table-column>
                <el-table-column
                v-if="purchaseReceiveshow.show5"
                align="center"
                label="ABC">
                    <template slot-scope="scope">
                        <input v-model="scope.row.ABC">
                    </template>
                </el-table-column>
                <el-table-column
                v-if="purchaseReceiveshow.show6"
                align="center"
                label="货号">
                    <template slot-scope="scope">
                        <input v-model="scope.row.product_id">
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="purchaseReceiveshow.show7"
                width="250"
                label="名称">
                    <template slot-scope="scope">
                        <input v-model="scope.row.goods_name">
                    </template>
                </el-table-column>
                <el-table-column
                v-if="purchaseReceiveshow.show8"
                align="center"
                label="规格">
                    <template slot-scope="scope">
                        <input v-model="scope.row.attr_value">
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                prop="shop_price"
                v-if="purchaseReceiveshow.show9"
                label="售价">
                    <template slot-scope="scope">
                        <input v-model="scope.row.shop_price">
                    </template>
                </el-table-column>
                <el-table-column
                v-if="purchaseReceiveshow.show10"
                align="center"
                width="50"
                label="进货折扣">
                    <template slot-scope="scope">
                        <input v-model="scope.row.discount">
                    </template>
                </el-table-column>
                <el-table-column
                v-if="purchaseReceiveshow.show11"
                align="center"
                label="收货进价">
                    <template slot-scope="scope">
                        <input v-model="scope.row.sh_jinjia">
                    </template>
                </el-table-column>
                <el-table-column
                prop="sh_box_number"
                v-if="purchaseReceiveshow.show12"
                align="center"
                width="50"
                label="箱数">
                    <template slot-scope="scope">
                        <input v-model="scope.row.sh_box_number">
                    </template>
                </el-table-column>
                <el-table-column
                v-if="purchaseReceiveshow.show13"
                align="center"
                prop="sh_goods_number"
                width="50"
                label="数量">
                    <template slot-scope="scope">
                        <input v-model="scope.row.sh_goods_number">
                    </template>
                </el-table-column>
                <el-table-column
                v-if="purchaseReceiveshow.show14"
                prop="sh_give_number"
                align="center"
                width="50"
                label="赠送数量">
                    <template slot-scope="scope">
                        <input v-model="scope.row.sh_give_number">
                    </template>
                </el-table-column>
                <el-table-column
                v-if="purchaseReceiveshow.show15"
                prop="sh_money"
                align="center"
                label="收货金额">
                    <template slot-scope="scope">
                        <input v-model="scope.row.sh_money">
                    </template>
                </el-table-column>
                <el-table-column
                v-if="purchaseReceiveshow.show16"
                align="center"
                label="收货赠送金额">
                    <template slot-scope="scope">
                        <input v-model="scope.row.sh_give_money">
                    </template>
                </el-table-column>
                <el-table-column
                v-if="purchaseReceiveshow.show17"
                align="center"
                label="收货售价金额">
                    <template slot-scope="scope">
                        <input v-model="scope.row.sh_shoujia">
                    </template>
                </el-table-column>
                <el-table-column
                v-if="purchaseReceiveshow.show18"
                align="center"
                prop="dh_box_number"
                width="50"
                label="订货箱数">
                    <template slot-scope="scope">
                        <input v-model="scope.row.dh_box_number">
                    </template>
                </el-table-column>
                <el-table-column
                v-if="purchaseReceiveshow.show19"
                align="center"
                width="50"
                prop="dh_goods_number"
                label="订货数量">
                    <template slot-scope="scope">
                        <input v-model="scope.row.dh_goods_number">
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                prop="dh_give_number"
                v-if="purchaseReceiveshow.show20"
                width="50"
                label="订货赠送数量">
                    <template slot-scope="scope">
                        <input v-model="scope.row.dh_give_number">
                    </template>
                </el-table-column>
                <el-table-column
                v-if="purchaseReceiveshow.show21"
                align="center"
                label="订货赠送金额">
                    <template slot-scope="scope">
                        <input v-model="scope.row.dh_give_money">
                    </template>
                </el-table-column>
                <el-table-column
                v-if="purchaseReceiveshow.show22"
                align="center"
                label="订货金额">
                    <template slot-scope="scope">
                        <input v-model="scope.row.dh_money">
                    </template>
                </el-table-column>
                <el-table-column
                v-if="purchaseReceiveshow.show23"
                align="center"
                prop="box_in_number"
                width="50"
                label="箱装数">
                    <template slot-scope="scope">
                        <input v-model="scope.row.box_in_number">
                    </template>
                </el-table-column>
                <el-table-column
                v-if="purchaseReceiveshow.show24"
                align="center"
                label="毛利额">
                    <template slot-scope="scope">
                        <input v-model="scope.row.gross_profit">
                    </template>
                </el-table-column>
                <el-table-column
                v-if="purchaseReceiveshow.show25"
                align="center"
                prop="gross_interest_rate"
                label="毛利率">
                    <template slot-scope="scope">
                        <input v-model="scope.row.gross_interest_rate">
                    </template>
                </el-table-column>
                <el-table-column
                v-if="purchaseReceiveshow.show26"
                align="center"
                label="批发价">
                    <template slot-scope="scope">
                        <input v-model="scope.row.wholesale_price">
                    </template>
                </el-table-column>
                <el-table-column
                v-if="purchaseReceiveshow.show27"
                align="center"
                width="50"
                label="单位">
                    <template slot-scope="scope">
                        <input v-model="scope.row.supplier_id">
                    </template>
                </el-table-column>
                <el-table-column
                v-if="purchaseReceiveshow.show28"
                align="center"
                width="100"
                label="生产日期">
                    <template slot-scope="scope">
                        <input v-model="scope.row.production_date">
                    </template>
                </el-table-column>
                <el-table-column
                v-if="purchaseReceiveshow.show29"
                align="center"
                width="100"
                label="失效日期">
                    <template slot-scope="scope">
                        <input v-model="scope.row.expiry_date">
                    </template>
                </el-table-column>
                <!-- <el-table-column
                fixed="right"
                align="center"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="edit(scope.row)">保存修改</el-button>
                        <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
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
import {purchaseReceive,purchaseReDe,purchaseReAdd,purchaseReEd} from '../../api/apiW' ;
export default {
    inject: ['reload'], 
    data() {
        return {
            pages:1,
            dialogServeAdd:false,
            dialogServeDetail:false,
            dialogShow:false,
            keywords:'',
            record_count:0,
            search:'',
            search1:'',
            search2:'',
            search3:'',
            search4:'',
            search5:'',
            search6:'',
            search7:'',
            search8:'',
            search9:'',
            value:'',
            value1:'',
            formServeAdd:{
                main_tm:"",
                sh_goods_number:"",
            },
            save:false,
            formDetail:{},
            purchaseReData:[],
            purchaseReceiveshow:{
                show1:false,
                show2:true,
                show3:true,
                show4:true,
                show5:true,
                show6:true,
                show7:false,
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
                show18:true,
                show19:true,
                show20:true,
                show21:true,
                show22:true,
                show23:true,
                show24:true,
                show25:true,
                show26:true,
                show27:true,
                show28:true,
                show29:true,
                show30:true,
            },
            options: [{
            value: '0',
            label: '未收货'
            }, {
            value: '1',
            label: '已收货'
            },],  
            options1: [{
            value1: '0',
            label: '0号店'
            }, {
            value1: '1',
            label: '1号店'
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
            purchaseReceive(data).then(res=>{
                this.record_count=Number(res.data.filter.record_count);
                console.log(res.data);
                this.purchaseReData=res.data.orders;
            }) 
        },
        chose(){  //--------------------选择查询
            let data=this.$qs.stringify({
                page:1,
                page_size:10,
                status:this.value,
                subshop_id:this.value1,
                sh_money:this.search1,
                sh_user:this.search2,
                purchase_date:this.search6,
               real_arrive_time:this.search8,
               expect_arrive_time:this.search9,
               salesman:this.search4,
               duifang_sn:this.search5

            });
            console.log(this.value);
            this.data(data);
        },
        handleClose(done){
            done();
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            erpTableSetting.purchaseReceive=this.purchaseReceiveshow;
            localStorage.erpTableSetting=JSON.stringify(erpTableSetting);
        },
        dateConverter(str) { //-----------------------日期转秒数
            var arr = str.split(/[- : \/]/);
            var startDate = Date.parse(new Date(arr[0], arr[1]-1, arr[2]))/1000;
            return startDate;
        }, 
        reset() {
            this.reload();
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        handleCurrentChange(val) {
            this.init(val);  
        },
        add(){//---------------------添加
            //this.formServeAdd.sh_goods_number=Number(this.formServeAdd.sh_goods_number);
            if(this.formServeAdd.main_tm!==""){
                let data =this.$qs.stringify(this.formServeAdd)
                purchaseReAdd(data).then(res=>{
                    if(res.errno==0){
                        this.$alert(res.errmsg)
                        this.reload();
                    }else{
                        this.$alert(res.errmsg)
                    }
                    this.reload();
                })
            }else{
                this.$message({
                    type: "error",
                    message: "主条码不能为空",
                    duration: 1000
                });
            }
                 
        },
        check(){
            this.$message({
                type: "success",
                message:"审核完成",
                duration: 1000
            });
        },
        showDetails(row){//------------------详情
            console.log(row.id);
            let data=this.$qs.stringify({
                subsite_id:3,
                subshop_id:0,
                id:row.id
            });
            purchaseReDe(data).then(res=>{
                console.log(res.data);
                this.formDetail=res.data;
            })
        },
        saveData(){//----------------保存
            console.log(this.purchaseReData[0]);
            let input=document.querySelectorAll(".el-table input");
            console.log(document.querySelectorAll(".el-table input"));
            for(let i=0;i<input.length;i++){
                input[i].disabled="true";
            };
            this.save=true;
            this.purchaseReData[0].shop_price=this.purchaseReData[0].shop_price.slice(1);
            this.purchaseReData[0].sh_jinjia=this.purchaseReData[0].sh_jinjia.slice(1);
            this.purchaseReData[0].sh_money=this.purchaseReData[0].sh_money.slice(1);
            this.purchaseReData[0].sh_give_money=this.purchaseReData[0].sh_give_money.slice(1);
            this.purchaseReData[0].sh_shoujia=this.purchaseReData[0].sh_shoujia.slice(1);
            this.purchaseReData[0].dh_give_money=this.purchaseReData[0].dh_give_money.slice(1);
            this.purchaseReData[0].dh_money=this.purchaseReData[0].dh_money.slice(1);
            this.purchaseReData[0].gross_profit=this.purchaseReData[0].gross_profit.slice(1);
            this.purchaseReData[0].wholesale_price=this.purchaseReData[0].wholesale_price.slice(1);
            if(this.purchaseReData[0].production_date!==""){
                this.purchaseReData[0].production_date=this.dateConverter(this.purchaseReData[0].production_date);
            };
            if(this.purchaseReData[0].expiry_date!==""){
                this.purchaseReData[0].expiry_date=this.dateConverter(this.purchaseReData[0].expiry_date); 
            }
            let dataE=this.$qs.stringify(this.purchaseReData[0])
            purchaseReEd(dataE).then(res=>{
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
        edit(){//--------------修改
            //this.save==true?this.save=false:this.save=true;
            if(this.save==true){
                this.save=false;
                let input=document.querySelectorAll(".el-table input");
                console.log(document.querySelectorAll(".el-table input"));
                for(let i=0;i<input.length;i++){
                    input[i].disabled="";
                };
            }else{
                this.save=true;
                let input=document.querySelectorAll(".el-table input");
                console.log(document.querySelectorAll(".el-table input"));
                for(let i=0;i<input.length;i++){
                    input[i].disabled="true";
                };
            }
        },
        deleteRow(row) {//---------------删除
                let data=this.$qs.stringify({
                    id:row.id,
                    is_delete:1
                }); 
                purchaseReEd(data).then(res=>{
                    if(res.errno==0){
                       // this.$alert("删除成功")
                        this.reload();
                    }else{
                       // this.$alert("删除失败")
                    }
                });  
            /* let Message=confirm("确定删除此行数据？");
            if(Message){
                console.log(row.id);
                let data=this.$qs.stringify({
                    id:row.id,
                    is_delete:1
                }); 
                purchaseReEd(data).then(res=>{
                    if(res.errno==0){
                        this.$alert("删除成功")
                        this.reload();
                    }else{
                        this.$alert("删除失败")
                    }
                });   
            }else{
                alert("用户取消操作");
            } */
        }
    },
    created: function () {  
        if(localStorage.erpTableSetting!==undefined){
            console.log("yes");
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting); 
            if(erpTableSetting.purchaseReceive!==undefined){
                this.purchaseReceiveshow=erpTableSetting.purchaseReceive;
            }
        }else{
            console.log("no");
        }
        this.init(1);
    }
}
</script>
<style scoped>
.purchaseReceive{
    margin: 20px;
}
/* 头部面包屑 */
.main-header {
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
.el-table input{
    width:100%;
    height:34px;
    border:1px solid #DCDFE6;
    border-radius:4px;
    padding:2px;
}
/* 分页器 */
.el-pagination {
  padding: 20px 0;
  text-align: right;
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
</style>