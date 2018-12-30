<template>
    <div class="tradingInquiry">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>零售</el-breadcrumb-item>
                <el-breadcrumb-item> 流水查询</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <fieldset style="margin:10px 0;border-color:#fff;text-align:left">
                <legend>查询条件</legend>
                <el-row type="flex" justify="space-around" :gutter="10">
                    <el-col style="text-align:left" :span="4">
                        <el-checkbox @change="chose" v-model="check" true-label="0" false-label="1">查询今天数据</el-checkbox>
                        <el-date-picker
                        v-model="value7" size="mini" style="width:100%;margin:10px 0"
                        type="daterange" @change="chose"
                        align="right"
                        unlink-panels
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                        <!-- <el-checkbox v-model="check1">显示营业员列表</el-checkbox> -->
                    </el-col>
                    <el-col :span="3">
                        <el-select @change="chose" v-model="value" size="small" placeholder="优惠类型" style="margin-bottom:5px;">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select v-model="value1" size="small" placeholder="会员消费">
                            <el-option
                            v-for="item in options1"
                            :key="item.value1"
                            :label="item.label"
                            :value="item.value1">
                            </el-option>
                        </el-select> 
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-top:5px;margin-bottom:10px;" v-model="search7"  size="mini"  placeholder="商品名称"></el-input>
                    </el-col>
                    <el-col :span="3">
                        <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="search"  size="mini"  placeholder="单号"/>
                        <el-select  @change="chose" v-model="value5" size="small" placeholder="销售方式" style="margin-top:0px;width:100%">
                            <el-option
                            v-for="item in options5"
                            :key="item.value5"
                            :label="item.label"
                            :value="item.value5">
                            </el-option>
                        </el-select> 
                        <el-select @change="chose" v-model="value4" size="small" placeholder="标签" style="margin-top:5px">
                            <el-option
                            v-for="item in options4"
                            :key="item.value4"
                            :label="item.label"
                            :value="item.value4">
                            </el-option>
                        </el-select> 
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-top:5px;" v-model="search8"  size="mini"  placeholder="条码"></el-input>
                    </el-col>
                    <el-col :span="3">
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="search1"  size="mini"  placeholder="收银员">
                        </el-input>
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="search2"  size="mini"  placeholder="营业员">
                        </el-input>
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="search3"  size="mini"  placeholder="会员卡号">
                        </el-input>
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="search4"  size="mini"  placeholder="品牌">
                        </el-input>
                    </el-col>
                    <el-col :span="3">
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="search6"  size="mini"  placeholder="商品货号">
                        </el-input>
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="search5"  size="mini"  placeholder="分店区域">
                        </el-input>
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="search9"  size="mini"  placeholder="类别">
                        </el-input>
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="search10"  size="mini"  placeholder="供应商">
                        </el-input>
                    </el-col>
                    <el-col :span="3">
                    <!--  <el-select style="margin-bottom:5px" v-model="value2" size="small" placeholder="销售门店">
                            <el-option
                            v-for="item in options2"
                            :key="item.value2"
                            :label="item.label"
                            :value="item.value2">
                            </el-option>
                        </el-select> 
                        <el-select style="margin-bottom:5px" v-model="value3" size="small" placeholder="分店类型">
                            <el-option
                            v-for="item in options3"
                            :key="item.value3"
                            :label="item.label"
                            :value="item.value3">
                            </el-option>
                        </el-select>  -->
                        <el-select @change="chose" style="margin-bottom:5px" v-model="value6" size="small" placeholder="分公司">
                            <el-option
                            v-for="item in options6"
                            :key="item.value6"
                            :label="item.label"
                            :value="item.value6">
                            </el-option>
                        </el-select> 
                    <!--  <el-select v-model="value8" size="small" placeholder="分店标签">
                            <el-option
                            v-for="item in options8"
                            :key="item.value8"
                            :label="item.label"
                            :value="item.value8">
                            </el-option>
                        </el-select>  -->
                    </el-col>
                    <el-col :span="3">
                        <el-button type="primary" size="small" @click="reset">刷新</el-button><br>
                        <el-button icon="el-icon-tickets"  style="margin-top:5px" type="primary" size="small" @click="dialogShow=true">显示列</el-button>
                    </el-col>
                </el-row>				
			</fieldset>

            <!-- 按需选择列弹窗 -->
            <el-dialog
            title="按需选择列" class="chose"
            :visible.sync="dialogShow"
            :before-close="handleClose"
            width="300px">
                <el-checkbox v-model="tradingInquiryshow.show1">流水查账id</el-checkbox><br>
                <el-checkbox v-model="tradingInquiryshow.show2">分店名称</el-checkbox><br>
                <el-checkbox v-model="tradingInquiryshow.show3">机号</el-checkbox><br>
                <el-checkbox v-model="tradingInquiryshow.show4">小票单号</el-checkbox><br>
                <el-checkbox v-model="tradingInquiryshow.show5">销售时间</el-checkbox><br>
                <el-checkbox v-model="tradingInquiryshow.show6">添加时间</el-checkbox><br>
                <el-checkbox v-model="tradingInquiryshow.show7">收银员</el-checkbox><br>
                <el-checkbox v-model="tradingInquiryshow.show8">营业员id</el-checkbox><br>
                <el-checkbox v-model="tradingInquiryshow.show9">营业员名称</el-checkbox><br>
                <el-checkbox v-model="tradingInquiryshow.show10">货号</el-checkbox><br>
                <el-checkbox v-model="tradingInquiryshow.show11">条码</el-checkbox><br>
                <el-checkbox v-model="tradingInquiryshow.show12">商品名</el-checkbox><br>
                <el-checkbox v-model="tradingInquiryshow.show13">辅助属性</el-checkbox><br>
                <el-checkbox v-model="tradingInquiryshow.show14">数量</el-checkbox><br>
                <el-checkbox v-model="tradingInquiryshow.show15">原价</el-checkbox><br>
                <el-checkbox v-model="tradingInquiryshow.show16">售价</el-checkbox><br>
                <el-checkbox v-model="tradingInquiryshow.show17">金额</el-checkbox><br>
                <el-checkbox v-model="tradingInquiryshow.show18">总共优惠金额</el-checkbox><br>
                <el-checkbox v-model="tradingInquiryshow.show19">折扣率</el-checkbox><br>
                <el-checkbox v-model="tradingInquiryshow.show20">会员卡号</el-checkbox><br>
                <el-checkbox v-model="tradingInquiryshow.show21">销售方式</el-checkbox><br>
                <el-checkbox v-model="tradingInquiryshow.show22">品牌id</el-checkbox><br>
                <el-checkbox v-model="tradingInquiryshow.show23">品牌名称</el-checkbox><br>
                <el-checkbox v-model="tradingInquiryshow.show24">分类id</el-checkbox><br>
                <el-checkbox v-model="tradingInquiryshow.show25">分类名字</el-checkbox><br>
                <el-checkbox v-model="tradingInquiryshow.show26">供货商id</el-checkbox><br>
                <el-checkbox v-model="tradingInquiryshow.show27">供货商名称</el-checkbox><br><br>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="tradingData.filter(data =>  {
            return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1})})"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            show-summary
            :default-sort = "{prop: 'date', order: 'descending'}"
            style="width: 100%">
                <!-- <el-table-column
                prop="id"
                v-if="tradingInquiryshow.show1"
                align="center"
                label="流水查账id">
                </el-table-column> -->
                <el-table-column
                align="center"
                v-if="tradingInquiryshow.show2"
                label="分店名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.subshop_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="tradingInquiryshow.show3"
                label="机号">
                    <template slot-scope="scope">
                        <span>{{scope.row.ji_sn}}</span>                        
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="tradingInquiryshow.show4"
                label="小票单号">
                    <template slot-scope="scope">
                        <span>{{scope.row.ticket_sn}}</span>   
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                prop="xiaoshou_time"
                v-if="tradingInquiryshow.show5"
                sortable
                label="销售时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.xiaoshou_time}}</span>   
                    </template>
                </el-table-column>
                <el-table-column
                prop="add_time"
                align="center"
                v-if="tradingInquiryshow.show6"
                sortable
                label="添加时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.add_time}}</span>   
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="tradingInquiryshow.show7"
                label="收银员">
                    <template slot-scope="scope">
                        <span>{{scope.row.shouyin_user}}</span>   
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="tradingInquiryshow.show8"
                label="营业员id">
                    <template slot-scope="scope">
                        <span>{{scope.row.yingye_user_id}}</span>   
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="tradingInquiryshow.show9"
                label="营业员名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.yingye_user}}</span>   
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="tradingInquiryshow.show10"
                label="货号">
                    <template slot-scope="scope">
                        <span>{{scope.row.product_sn}}</span>   
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="tradingInquiryshow.show11"
                label="条码">
                    <template slot-scope="scope">
                        <span>{{scope.row.serial_cord}}</span>   
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="tradingInquiryshow.show12"
                label="商品名">
                    <template slot-scope="scope">
                        <span>{{scope.row.goods_name}}</span>   
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="tradingInquiryshow.show13"
                label="辅助属性">
                    <template slot-scope="scope">
                        <span>{{scope.row.attr_value}}</span>   
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                prop="number"
                v-if="tradingInquiryshow.show14"
                label="数量">
                </el-table-column>
                <el-table-column
                prop="old_price"
                align="center"
                v-if="tradingInquiryshow.show15"
                label="原价">
                    <template slot-scope="scope">
                        <span>{{scope.row.old_price}}</span>   
                    </template>
                </el-table-column>
                <el-table-column
                prop="shop_price"
                align="center"
                v-if="tradingInquiryshow.show16"
                label="售价">
                    <template slot-scope="scope">
                        <span>{{scope.row.shop_price}}</span>   
                    </template>
                </el-table-column>
                <el-table-column
                prop="price"
                align="center"
                v-if="tradingInquiryshow.show17"
                label="金额">
                    <template slot-scope="scope">
                        <span>{{scope.row.price}}</span>   
                    </template>
                </el-table-column>
                <el-table-column
                prop="sum_discount_price"
                align="center"
                v-if="tradingInquiryshow.show18"
                label="总共优惠金额">
                    <template slot-scope="scope">
                        <span>{{scope.row.sum_discount_price}}</span>   
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="tradingInquiryshow.show19"
                label="折扣率">
                    <template slot-scope="scope">
                        <span>{{scope.row.discount_rate}}</span>   
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="tradingInquiryshow.show20"
                label="会员卡号">
                    <template slot-scope="scope">
                        <span>{{scope.row.user_card}}</span>   
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="tradingInquiryshow.show21"
                label="销售方式">
                    <template slot-scope="scope">
                        <span>{{scope.row.method}}</span>   
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="tradingInquiryshow.show22"
                label="品牌id">
                    <template slot-scope="scope">
                        <span>{{scope.row.brand_id}}</span>   
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="tradingInquiryshow.show23"
                label="品牌名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.brand_name}}</span>   
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="tradingInquiryshow.show24"
                label="分类id">
                    <template slot-scope="scope">
                        <span>{{scope.row.cat_id}}</span>   
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="tradingInquiryshow.show25"
                label="分类名字">
                    <template slot-scope="scope">
                        <span>{{scope.row.cat_name}}</span>   
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="tradingInquiryshow.show26"
                label="供货商id">
                    <template slot-scope="scope">
                        <span>{{scope.row.supplier_id}}</span>   
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="tradingInquiryshow.show27"
                label="供货商名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.supplier_name}}</span>   
                    </template>
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="test(scope.$index,scope.row)">保存修改</el-button>
                        <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
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
import {tradingInquiry,tradingInquiryDe,tradingInquiryEd,tradingInquiryAdd} from '../../api/apiW';
import { setInterval } from 'timers';
export default {
    inject: ['reload'],
    data() {
        return {
            pages:1,
            dialogServeAdd:false,
            dialogServeDetail:false,
            dialogShow:false,
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
            search10:'',
            keywords:'',
            record_count:0,
            formServeAdd:{
                xiaoshou_time:new Date().getTime()/1000-86400,
                add_time:new Date().getTime()/1000-86400,
                shouyin_user:"",
                yingye_user_id:"",
                number:0,
                old_price:0,
                shop_price:0,
                price:0,
                sum_discount_price:0,
                discount_rate:0,
                brand_id:0,
                cat_id:0,
                supplier_id:0,
            },
            formServeDetail:{},
            tradingData:[],
            tradingInquiryshow:{
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
                show18:true,
                show19:true,
                show20:true,
                show21:true,
                show22: true,
                show23:true,
                show24:true,
                show25:true,
                show26:true,
                show27:true,
            },
            check:"0",
            check1:false,
            value: '' ,
            value1: '' ,
            value2: '' ,
            value3: '' ,
            value4: '' ,
            value5: '' ,
            value6: '' ,
            value7:['2017-7-7','2019-9-9',],
            value8: '' ,
            options: [{
            value: '0',
            label: '现金券'
            }, {
            value: '1',
            label: '满减券'
            },{
            value: '2',
            label: '折扣券' 
            }],  
            options1: [{
            value1: '选项1',
            label: '商品'
            }, {
            value1: '选项2',
            label: '服务'
            },],  
            options2: [{
            value2: '选项1',
            label: '门店1'
            }, {
            value2: '选项2',
            label: '门店2'
            },],  
            options3: [{
            value3: '选项1',
            label: '类型1'
            }, {
            value3: '选项2',
            label: '类型2'
            },],  
            options4: [{
            value4: '0',
            label: '标签1'
            }, {
            value4: '1',
            label: '标签2'
            },],  
            options5: [{
            value5: '线上',
            label: '线上'
            }, {
            value5: '零售',
            label: '零售'
            },], 
            options6: [{
            value6: '0',
            label: '分1'
            }, {
            value6: '1',
            label: '分2'
            },], 
            options8: [{
            value8: '选项1',
            label: '标签1'
            }, {
            value8: '选项2',
            label: '标签2'
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
            tradingInquiry(data).then(res=>{
                console.log(res.data);
                this.record_count=Number(res.data.filter.record_count);
                for(let i=0;i<res.data.inquiry_list.length;i++){
                    res.data.inquiry_list[i].old_price=res.data.inquiry_list[i].old_price.replace(/^￥/,"");
                    res.data.inquiry_list[i].shop_price=res.data.inquiry_list[i].shop_price.replace(/^￥/,"");
                    res.data.inquiry_list[i].price=res.data.inquiry_list[i].price.replace(/^￥/,"");
                    res.data.inquiry_list[i].sum_discount_price=res.data.inquiry_list[i].sum_discount_price.replace(/^￥/,"");
                };
                this.tradingData=res.data.inquiry_list;
            });
        },
        chose(){//-----------------选择查询
            let data=this.$qs.stringify({
                page:1,
                page_size:10,
                xiaoshou_time1:this.value7[0],
                xiaoshou_time2:this.value7[1],
                today:this.check,
                youhui_type:this.value,
                goods_name:this.search7,
                serial_cord:this.search8,
                method:this.value5,
                tag:this.value4,
                shouyin_user:this.search1,
                yingye_user:this.search2,
                user_card:this.search3,
                brand_name:this.search4,
                product_sn:this.search6,
                subshop_address:this.search5,
                cat_id:this.search9,
                supplier_name:this.search10,
                son_company:this.value6
            }); 
            this.data(data);
        },
        handleClose(done){
            done();
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            erpTableSetting.tradingInquiry=this.tradingInquiryshow;
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
        showDetails(row){//------------详情
            console.log(row.id);
            let dataD=this.$qs.stringify({
                id:row.id
            }); 
            tradingInquiryDe(dataD).then(res=>{
                console.log(res.data[0]);
                this.formServeDetail=res.data[0];
            });
        },
        edit(row){//----------------修改
            row.xiaoshou_time=this.dateConverter(row.xiaoshou_time);
            row.add_time=this.dateConverter(row.add_time);
            row.old_price=row.old_price.slice(1);
            row.shop_price=row.shop_price.slice(1);
            row.price=row.price.slice(1);
            row.sum_discount_price=row.sum_discount_price.slice(1);
            let dataE=this.$qs.stringify(row);
            tradingInquiryEd(dataE).then(res=>{
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
                    this.reload();
                }
            })
        },
        add(){//-------添加
            let dataA=this.$qs.stringify(this.formServeAdd);
            tradingInquiryAdd(dataA).then(res=>{
                if(res.errno==0){
                    this.$alert(res.errmsg)
                    this.reload();
                }else{
                    this.$alert(res.errmsg)
                }
            })
        },
        deleteRow(row) {
            let Message=confirm("确定删除此行数据？");
            if(Message){
                let data=this.$qs.stringify({
                    id:row.id,
                    is_delete:1
                }); 
                tradingInquiryEd(data).then(res=>{
                    if(res.errno==0){
                        this.$alert("删除成功")
                        this.reload();
                    }else{
                        this.$alert("删除失败")
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
            if(erpTableSetting.tradingInquiry!==undefined){
                this.tradingInquiryshow=erpTableSetting.tradingInquiry;
            }
        }else{
            console.log("no");
        }; 
        this.init(1);  
    }
}
</script>
<style scoped>
.tradingInquiry{
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