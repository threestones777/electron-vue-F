<template>
    <div class="allocatingQuery">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <!-- <h3>温州美联 管理中心</h3> -->
            <el-breadcrumb style="font-size:18px" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>调拨</el-breadcrumb-item>
                <el-breadcrumb-item>调拨查询</el-breadcrumb-item>
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
        <div class="main-table">
            <fieldset style="margin:10px 0;border-color:#fff;text-align:left">
                <legend>查询条件</legend>
                <el-row type="flex" justify="space-around" :gutter="10">
                    <el-col style="text-align:left" :span="4">
                        <el-radio-group @change="chose" v-model="radio" style="margin-top:5px;">
                            <el-radio style="margin-bottom:7px" label="apply">申请日期</el-radio><br>
                            <el-radio style="margin-bottom:7px" label="fahuo_time">发货日期</el-radio><br>
                            <el-radio style="margin-bottom:7px" label="shouhuo_time">收货日期</el-radio><br>
                        </el-radio-group>
                        <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search"  size="mini"  placeholder="单号"/>
                    </el-col>
                    <el-col :span="5">
                        <el-date-picker
                        v-model="search3" size="small"
                        style="width:100%;margin-bottom:5px"
                        type="daterange" @change="chose"
                        align="right"
                        unlink-panels
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                        <el-select @change="chose" style="margin-bottom:5px" v-model="value4" size="small" placeholder="调出分店">
                            <el-option
                            v-for="item in options4"
                            :key="item.value4"
                            :label="item.label"
                            :value="item.value4">
                            </el-option>
                        </el-select>
                        <el-select @change="chose" style="margin-bottom:5px" v-model="value5" size="small" placeholder="调入分店">
                            <el-option
                            v-for="item in options5"
                            :key="item.value3"
                            :label="item.label"
                            :value="item.value5">
                            </el-option>
                        </el-select>
                        <!-- <el-select @change="chose" style="margin-bottom:5px" v-model="value6" size="small" placeholder="标签">
                            <el-option
                            v-for="item in options6"
                            :key="item.value6"
                            :label="item.label"
                            :value="item.value6">
                            </el-option>
                        </el-select> -->
                    </el-col>
                    <el-col :span="4">
                    <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search5"  size="mini"  placeholder="条形码"/>
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search2"  size="mini"  placeholder="货号"/>
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search4"  size="mini"  placeholder="商品名称"/>
                    </el-col>
                    <el-col :span="4">
                        <el-select @change="chose" style="margin-bottom:5px" v-model="value8" size="small" placeholder="分类汇总">
                            <el-option
                            v-for="item in options8"
                            :key="item.value8"
                            :label="item.label"
                            :value="item.value8">
                            </el-option>
                        </el-select>
                        <el-select @change="chose" style="margin-bottom:5px" v-model="value2" size="small" placeholder="品牌汇总">
                            <el-option
                            v-for="item in options2"
                            :key="item.value2"
                            :label="item.label"
                            :value="item.value2">
                            </el-option>
                        </el-select>
                        <el-select @change="chose" style="margin-bottom:5px" v-model="value3" size="small" placeholder="状态">
                            <el-option
                            v-for="item in options3"
                            :key="item.value3"
                            :label="item.label"
                            :value="item.value3">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4">
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search1"  size="mini"  placeholder="分类名称"/>
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search7"  size="mini"  placeholder="品牌名称"/>
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search8"  size="mini"  placeholder="供应商编码"/>
                    </el-col>
                    <el-col :span="4">
                    <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search6"  size="mini"  placeholder="发货人"/>
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search9"  size="mini"  placeholder="拣货人"/>
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search10"  size="mini"  placeholder="检验员"/>
                    </el-col>
                    <el-col :span="3">
                        <!-- <el-button type="primary" size="small" @click="reset">刷 新</el-button><br>
                        <el-button icon="el-icon-tickets"  style="margin-top:5px" type="primary" size="small" @click="dialogShow=true">显示列</el-button> -->
                    </el-col>
                </el-row>
			</fieldset>

            <!-- 按需选择列弹窗 -->
            <el-dialog
            title="按需选择列" style="text-align:left"
            :visible.sync="dialogShow"
            :before-close="handleClose"
            width="200px">
                <el-checkbox v-model="allocatingQueryshow.show1">调拨查询id</el-checkbox><br>
                <el-checkbox v-model="allocatingQueryshow.show2">调出店号</el-checkbox><br>
                <el-checkbox v-model="allocatingQueryshow.show3">调出店名称</el-checkbox><br>
                <el-checkbox v-model="allocatingQueryshow.show4">收货店号</el-checkbox><br>
                <el-checkbox v-model="allocatingQueryshow.show5">收货店名称</el-checkbox><br>
                <el-checkbox v-model="allocatingQueryshow.show6">条码</el-checkbox><br>
                <el-checkbox v-model="allocatingQueryshow.show7">货号</el-checkbox><br>
                <el-checkbox v-model="allocatingQueryshow.show8">商品名称</el-checkbox><br>
                <el-checkbox v-model="allocatingQueryshow.show9">品牌id</el-checkbox><br>
                <el-checkbox v-model="allocatingQueryshow.show10">品牌名</el-checkbox><br>
                <el-checkbox v-model="allocatingQueryshow.show11">分类id</el-checkbox><br>
                <el-checkbox v-model="allocatingQueryshow.show12">分类名</el-checkbox><br>
                <el-checkbox v-model="allocatingQueryshow.show13">规格</el-checkbox><br>
                <el-checkbox v-model="allocatingQueryshow.show14">申请数量</el-checkbox><br>
                <el-checkbox v-model="allocatingQueryshow.show15">申请金额</el-checkbox><br>
                <el-checkbox v-model="allocatingQueryshow.show16">申请售价金额</el-checkbox><br>
                <el-checkbox v-model="allocatingQueryshow.show17">发货数量</el-checkbox><br>
                <el-checkbox v-model="allocatingQueryshow.show18">发货金额</el-checkbox><br>
                <el-checkbox v-model="allocatingQueryshow.show19">收货数量</el-checkbox><br>
                <el-checkbox v-model="allocatingQueryshow.show20">收货金额</el-checkbox><br>
                <el-checkbox v-model="allocatingQueryshow.show21">收货售价金额</el-checkbox><br>
                <el-checkbox v-model="allocatingQueryshow.show22">供应商id</el-checkbox><br>
                <el-checkbox v-model="allocatingQueryshow.show23">调出店号</el-checkbox><br>
                <el-checkbox v-model="allocatingQueryshow.show24">供应商名称</el-checkbox><br>
                <el-checkbox v-model="allocatingQueryshow.show25">发货售价金额</el-checkbox><br><br>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="allocatData.filter(data =>  {
            return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1})})"
            border stripe
            show-summary
            :row-style="{height:0}"
            :cell-style="{padding:3}"
            :header-row-style="{height:0}"
            :header-cell-style="{padding:0}"
            style="width: 100%">
                <el-table-column
                align="center"
                v-if="allocatingQueryshow.show1"
                label="	调拨查询id">
                    <template slot-scope="scope">
                        <span>{{scope.row.id}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="allocatingQueryshow.show2"
                label="调出店号">
                    <template slot-scope="scope">
                        <span>{{scope.row.from_subshop_id}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="110"
                v-if="allocatingQueryshow.show3"
                label="调出店名称">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.from_subshop_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="allocatingQueryshow.show4"
                label="收货店号">
                    <template slot-scope="scope">
                        <span>{{scope.row.to_subshop_id}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="110"
                v-if="allocatingQueryshow.show5"
                label="收货店名称">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.to_subshop_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="150"
                v-if="allocatingQueryshow.show6"
                label="条码">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.serial_code"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="150"
                v-if="allocatingQueryshow.show7"
                label="货号">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.product_sn"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="150"
                v-if="allocatingQueryshow.show8"
                label="商品名称">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.goods_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="allocatingQueryshow.show9"
                label="品牌id">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.brand_id"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="150"
                v-if="allocatingQueryshow.show10"
                label="品牌名">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.brand_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="allocatingQueryshow.show11"
                label="分类id">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.cat_id"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="allocatingQueryshow.show12"
                label="分类名">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.cat_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="150"
                v-if="allocatingQueryshow.show13"
                label="规格">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.attr_value"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="apply_num"
                align="center"
                v-if="allocatingQueryshow.show14"
                label="申请数量">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.apply_num"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="apply_money"
                align="center"
                width="100"
                v-if="allocatingQueryshow.show15"
                label="申请金额">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.apply_money"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="apply_shop_price"
                align="center"
                width="100"
                v-if="allocatingQueryshow.show16"
                label="申请售价金额">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.apply_shop_price"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="fahuo_num"
                align="center"
                v-if="allocatingQueryshow.show17"
                label="发货数量">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.fahuo_num"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="fahuo_shop_price"
                align="center"
                width="100"
                v-if="allocatingQueryshow.show18"
                label="发货金额">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.fahuo_money"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="fahuo_shop_price"
                align="center"
                width="100"
                v-if="allocatingQueryshow.show25"
                label="发货售价金额">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.fahuo_shop_price"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="shouhuo_num"
                align="center"
                v-if="allocatingQueryshow.show19"
                label="收货数量">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.shouhuo_num"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="shouhuo_money"
                align="center"
                width="100"
                v-if="allocatingQueryshow.show20"
                label="收货金额">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.shouhuo_money"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="shouhuo_shop_price"
                align="center"
                width="100"
                v-if="allocatingQueryshow.show21"
                label="收货售价金额">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.shouhuo_shop_price"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="allocatingQueryshow.show22"
                label="供应商id">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.supplier_id"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="allocatingQueryshow.show23"
                label="调出店号">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.from_subshop_id"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="140"
                v-if="allocatingQueryshow.show24"
                label="供应商名称">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.supplier_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                width="120"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="edit(scope.row)">保存修改</el-button>
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
import {allocat,allocatDe,allocatAdd,allocatEd} from '../../api/apiW' ;
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
            search3:['2018-4-3','2019-9-9'],
            search4:'',
            search5:'',
            search6:'',
            search7:'',
            search8:'',
            search9:'',
            search10:'',
            radio:"apply",
            record_count:0,
            formServeAdd:{
                from_subshop_id:0,
                to_subshop_id:0,
                brand_id:0,
                cat_id:0,
                apply_num:0,
                apply_money:0,
                apply_shop_price:0,
                fahuo_num:0,
                fahuo_money:0,
                fahuo_shop_price:0,
                shouhuo_num:0,
                shouhuo_money:0,
                shouhuo_shop_price:0,
                supplier_id:0,
            },
            formServeDetail:{},
            allocatData:[],
            allocatingQueryshow:{
                show1:false,
                show2:false,
                show3:true,
                show4:false,
                show5:true,
                show6:true,
                show7:true,
                show8:true,
                show9:false,
                show10:true,
                show11:false,
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
                show23:false,
                show24:true,
                show25:true,
            },
            value: '' ,
            value1: '' ,
            value2: '' ,
            value3: '' ,
            value4: '' ,
            value5: '' ,
            value6: '' ,
            value7: '' ,
            value8: '' ,
            value9: '' ,
            value10: '' ,
            value11: '' ,
            options2: [{
            value2: '0',
            label: '品牌1'
            }, {
            value2: '1',
            label: '品牌2'
            },],
            options3: [{
            value3: '0',
            label: '未审核'
            }, {
            value3: '1',
            label: '已审核'
            },],
            options4: [{
            value4: '0',
            label: '调出分店1'
            }, {
            value4: '1',
            label: '调出分店2'
            },],
            options5: [{
            value5: '0',
            label: '调入分店1'
            }, {
            value5: '1',
            label: '调入分店2'
            },],
            options6: [{
            value6: '0',
            label: '调出分店'
            }, {
            value6: '1',
            label: '调入分店'
            },],
            options8: [{
            value8: '3',
            label: '分类1'
            }, {
            value8: '7',
            label: '分类2'
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
            allocat(data).then(res=>{
                console.log(res.data);
                this.record_count=Number(res.data.filter.record_count);
                for(let i=0;i<res.data.orders.length;i++){
                    let reg = new RegExp( /^￥/ , "g" )
                    res.data.orders[i].apply_money=res.data.orders[i].apply_money.replace(reg,"");
                    res.data.orders[i].apply_shop_price=res.data.orders[i].apply_shop_price.replace(reg,"");;
                    res.data.orders[i].fahuo_money=res.data.orders[i].fahuo_money.replace(reg,"");
                    res.data.orders[i].fahuo_shop_price=res.data.orders[i].fahuo_shop_price.replace(reg,"");
                    res.data.orders[i].shouhuo_money=res.data.orders[i].shouhuo_money.replace(reg,"");        
                    res.data.orders[i].shouhuo_shop_price=res.data.orders[i].shouhuo_shop_price.replace(reg,"");   
                }
                this.allocatData=res.data.orders;
            });
        },
        chose(){//-----------------选择查询
            let data=this.$qs.stringify({
                page:1,
                page_size:10,
                time_by:this.radio,
                add_time1:this.search3[0],
                add_time2:this.search3[1],
                from_subshop_id:this.value4,
                to_subshop_id:this.value5,
                tags:this.value6,
                serial_code:this.search5,
                product_sn:this.search2,
                goods_name:this.search4,
                cat_id:this.value8,
                brand_id:this.value2,
                status:this.value3,
                cat_name:this.search1,
                brand_name:this.search7,
                supplier_id:this.search8,
                fahuo_user:this.search6,
                shipper:this.search9,
                check_user:this.search10,
            });
            this.data(data);
        },
        handleClose(done){
            done();
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            erpTableSetting.allocatingQuery=this.allocatingQueryshow;
            localStorage.erpTableSetting=JSON.stringify(erpTableSetting);
        },
        reset() {
            this.reload();
        },
        handleCurrentChange(val) {
            this.init(val);
        },
        add(){//--------------添加
            let dataA=this.$qs.stringify(this.formServeAdd);
            allocatAdd(dataA).then(res=>{
                if(res.errno==0){
                    this.$alert(res.errmsg)
                    this.reload();
                }else{
                    this.$alert(res.errmsg)
                }
            })
        },
        showDetails(row){//--------------详情
            console.log(row.id);
            let dataD = this.$qs.stringify({
                id:row.id
            });
            allocatDe(dataD).then(res=>{
                console.log(res.data);
                this.formServeDetail=res.data;
            });
        },
        edit(row){//--------------修改
            let dataE=this.$qs.stringify(row);
            allocatEd(dataE).then(res=>{
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
        deleteRow(row) {
            let Message=confirm("确定删除此行数据？");
            if(Message){
                let data=this.$qs.stringify({
                    id:row.id,
                    is_delete:1
                });
                allocatEd(data).then(res=>{
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
        }
    },
    created: function () {
        if(localStorage.erpTableSetting!==undefined){
            console.log("yes");
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            if(erpTableSetting.allocatingQuery!==undefined){
                this.allocatingQueryshow=erpTableSetting.allocatingQuery;
            }
        }else{
            console.log("no");
        };
        this.init(1);
    }
}
</script>
<style scoped>
.allocatingQuery{
    margin: 10px;
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
.el-input >>> .el-input__inner{
    border:none;
    text-align:center;
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