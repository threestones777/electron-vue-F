<template>
    <div class="directOutList">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <!-- <h3>温州美联 管理中心</h3> -->
            <el-breadcrumb style="font-size:18px" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>调拨</el-breadcrumb-item>
                <el-breadcrumb-item>直调出库单</el-breadcrumb-item>
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
                    <el-col style="text-align:left" :span="3">
                        <el-radio-group @change="chose" v-model="radio" style="margin-top:5px;">
                            <el-radio style="margin-bottom:7px" label="apply_time ">申请日期</el-radio><br>
                            <el-radio style="margin-bottom:7px" label="fahuo_time ">发货日期</el-radio><br>
                            <el-radio style="margin-bottom:7px" label="shouhuo_time ">收货日期</el-radio><br>
                            <el-radio style="margin-bottom:7px" label="require_arrival_time ">要求到货日期</el-radio><br>
                            <el-radio label="5">不按日期</el-radio><br>
                        </el-radio-group>    
                    </el-col>
                    <el-col :span="4">
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
                        <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search"  size="mini"  placeholder="单号"/>
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search1"  size="mini"  placeholder="条码"></el-input>
                        <el-select @change="chose" v-model="value5" size="small" placeholder="单据类型" style="margin-top:0px;width:100%">
                            <el-option
                            v-for="item in options5"
                            :key="item.value5"
                            :label="item.label"
                            :value="item.value5">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3">
                        <!-- <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="search2"  size="mini"  placeholder="收货店区域"> -->
                        <el-input @input="chose" prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search10"  size="mini"  placeholder="商品货号"/>
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search4"  size="mini"  placeholder="商品名称"/>
                        <el-input @input="chose" prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search5"  size="mini"  placeholder="备注"/>
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:0px;" v-model="search9"  size="mini"  placeholder="发货人">
                        </el-input>
                    </el-col>
                    <el-col :span="3">
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search6"  size="mini"  placeholder="申请人">
                        </el-input>
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search7"  size="mini"  placeholder="检验员">
                        </el-input>
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search8"  size="mini"  placeholder="拣货人">
                        </el-input>
                    </el-col>
                    <el-col :span="3">
                        <el-select @change="chose" style="margin-bottom:5px" v-model="value2" size="small" placeholder="发货分店">
                            <el-option
                            v-for="item in options2"
                            :key="item.value2"
                            :label="item.label"
                            :value="item.value2">
                            </el-option>
                        </el-select> 
                        <!-- <el-select @change="chose" style="margin-bottom:5px" v-model="value3" size="small" placeholder="发货分公司">
                            <el-option
                            v-for="item in options3"
                            :key="item.value3"
                            :label="item.label"
                            :value="item.value3">
                            </el-option>
                        </el-select>  -->
                        <el-select @change="chose" style="margin-bottom:5px" v-model="value6" size="small" placeholder="发货店类型">
                            <el-option
                            v-for="item in options6"
                            :key="item.value6"
                            :label="item.label"
                            :value="item.value6">
                            </el-option>
                        </el-select> 
                        <el-select @change="chose" v-model="value7" size="small" placeholder="发货状态">
                            <el-option
                            v-for="item in options7"
                            :key="item.value7"
                            :label="item.label"
                            :value="item.value7">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3">
                        <el-select @change="chose" style="margin-bottom:5px" v-model="value8" size="small" placeholder="收货分店">
                            <el-option
                            v-for="item in options8"
                            :key="item.value8"
                            :label="item.label"
                            :value="item.value8">
                            </el-option>
                        </el-select> 
                        <!-- <el-select @change="chose" style="margin-bottom:5px" v-model="value9" size="small" placeholder="收货分公司">
                            <el-option
                            v-for="item in options9"
                            :key="item.value9"
                            :label="item.label"
                            :value="item.value9">
                            </el-option>
                        </el-select>  -->
                        <el-select @change="chose" style="margin-bottom:5px" v-model="value10" size="small" placeholder="收货店类型">
                            <el-option
                            v-for="item in options10"
                            :key="item.value10"
                            :label="item.label"
                            :value="item.value10">
                            </el-option>
                        </el-select>
                        <el-select @change="chose" v-model="value11" size="small" placeholder="收货状态">
                            <el-option
                            v-for="item in options11"
                            :key="item.value11"
                            :label="item.label"
                            :value="item.value11">
                            </el-option>
                        </el-select> 
                    </el-col>
                    <el-col :span="3">
                        <!-- <el-button type="primary" size="small" @click="reset">刷新</el-button><br>
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
                <el-checkbox v-model="directOutListshow.show1">id</el-checkbox><br>
                <el-checkbox v-model="directOutListshow.show2">收货店号</el-checkbox><br>
                <el-checkbox v-model="directOutListshow.show3">收货店名</el-checkbox><br>
                <el-checkbox v-model="directOutListshow.show4">单号</el-checkbox><br>
                <el-checkbox v-model="directOutListshow.show5">单据类型</el-checkbox><br>
                <el-checkbox v-model="directOutListshow.show6">要求到货日期</el-checkbox><br>
                <el-checkbox v-model="directOutListshow.show7">金额</el-checkbox><br>
                <el-checkbox v-model="directOutListshow.show8">成本金额</el-checkbox><br>
                <el-checkbox v-model="directOutListshow.show9">数量</el-checkbox><br>
                <el-checkbox v-model="directOutListshow.show10">申请人</el-checkbox><br>
                <el-checkbox v-model="directOutListshow.show11">申请时间</el-checkbox><br>
                <el-checkbox v-model="directOutListshow.show12">发货人</el-checkbox><br>
                <el-checkbox v-model="directOutListshow.show13">发货时间</el-checkbox><br>
                <el-checkbox v-model="directOutListshow.show14">收货人</el-checkbox><br>
                <el-checkbox v-model="directOutListshow.show15">收货时间</el-checkbox><br>
                <el-checkbox v-model="directOutListshow.show16">拣货人</el-checkbox><br>
                <el-checkbox v-model="directOutListshow.show17">状态</el-checkbox><br>
                <el-checkbox v-model="directOutListshow.show18">备注</el-checkbox><br><br>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="directOutData.filter(data =>  {
            return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1})})"
            border stripe
            show-summary
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            style="width: 100%">
                <el-table-column
                align="center"
                v-if="directOutListshow.show1"
                label="id">
                    <template slot-scope="scope">
                        <span>{{scope.row.id}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="directOutListshow.show2"
                label="收货店号">
                    <template slot-scope="scope">
                        <span>{{scope.row.to_subshop_id}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="100"
                v-if="directOutListshow.show3"
                label="收货店名">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.to_subshop_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="100"
                v-if="directOutListshow.show4"
                label="单号">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.bill_sn"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="100"
                v-if="directOutListshow.show5"
                label="单据类型">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.type"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="160"
                v-if="directOutListshow.show6"
                label="要求到货日期">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.require_daohuo_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="money"
                align="center"
                width="100"
                v-if="directOutListshow.show7"
                label="金额">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.money"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="chengben_price"
                align="center"
                width="100"
                v-if="directOutListshow.show8"
                label="成本金额">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.chengben_price"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="number"
                align="center"
                width="100"
                v-if="directOutListshow.show9"
                label="数量">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.number"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="100"
                v-if="directOutListshow.show10"
                label="申请人">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.apply_user"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="160"
                v-if="directOutListshow.show11"
                label="申请时间">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.apply_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="100"
                v-if="directOutListshow.show12"
                label="发货人">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.fahuo_user"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="160"
                v-if="directOutListshow.show13"
                label="发货时间">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.fahuo_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="100"
                v-if="directOutListshow.show14"
                label="收货人">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.shouhuo_user"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="160"
                v-if="directOutListshow.show15"
                label="收货时间">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.shouhuo_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="100"
                v-if="directOutListshow.show16"
                label="拣货人">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.jianhuo_user"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="100"
                v-if="directOutListshow.show17"
                label="状态">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.status"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="100"
                v-if="directOutListshow.show18"
                label="备注">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.remark"/>
                    </template>
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                width="100"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="edit(scope.row)">保存修改</el-button>
                        <el-button type="text" size="small" @click="sendGoods(scope.row)">发货</el-button>
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
import {directOut,directOutDe,directOutAdd,directOutEd,directOutSend} from '../../api/apiW' ;
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
            search3:['2017-7-7','2019-9-9'],
            search4:'',
            search5:'',
            search6:'',
            search7:'',
            search8:'',
            search9:'',
            search10:'',
            search11:'',
            radio:"5",
            record_count:0,
            formServe:{
                
            },
            formServeAdd:{
                type:0,
                require_daohuo_time:Math.ceil(new Date().getTime()/1000-172800),
                /*status:1,
                from_subshop_id:0,
                from_subshop_name:阿斯蒂芬,
                to_subshop_id:1,
                to_subshop_name:范德萨12,
                bill_sn:asd5f4654sdaf6a77,
                type:0,
                require_arrival_time:1567958400,
                money:98.0,
                chengben_price:69.0,
                number:67,
                apply_user:12,
                apply_time:1567958400,
                fahuo_user:17,
                fahuo_time:1567958400,
                shouhuo_user:4,
                shouhuo_time:1567958400,
                remark:啊大厦所啥大所大所大所大所多,
                subsite_id:231,
                require_daohuo_time:1567958400, 
                */
            },
            formServeDetail:{},
            directOutData:[],
            directOutListshow:{
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
                show11:true,
                show12:true,
                show13:true,
                show14:true,
                show15:true,
                show16:false,
                show17:false,
                show18:true,
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
            options: [{
            value: '选项1',
            label: '现金券'
            }, {
            value: '选项2',
            label: '满减券'
            },{
            value: '选项3',
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
            value2: '0',
            label: '分店1'
            }, {
            value2: '1',
            label: '分店2'
            },],  
            options3: [{
            value3: '0',
            label: '公司1'
            }, {
            value3: '1',
            label: '公司2'
            },],  
            options4: [{
            value4: '选项1',
            label: '标签1'
            }, {
            value4: '选项2',
            label: '标签2'
            },],  
            options5: [{
            value5: '0',
            label: '类型1'
            }, {
            value5: '1',
            label: '类型2'
            },], 
            options6: [{
            value6: '0',
            label: '类型1'
            }, {
            value6: '1',
            label: '类型2'
            },], 
            options7: [{
            value7: '0',
            label: '未发货'
            }, {
            value7: '1',
            label: '已发货'
            },],
            options8: [{
            value8: '0',
            label: '0分店'
            }, {
            value8: '1',
            label: '1分店'
            },],
            options9: [{
            value9: '0',
            label: '1公司'
            }, {
            value9: '1',
            label: '2公司'
            },],
            options10: [{
            value10: '0',
            label: '类型1'
            }, {
            value10: '1',
            label: '类型2'
            },],
            options11: [{
            value11: '0',
            label: '未收货'
            }, {
            value11: '1',
            label: '已收货'
            },],
        }
    },
    methods:{
        init(page){
            let data=this.$qs.stringify({
                page:page,
                page_size:10,
            });
            this.data(data);
        },
        data(data){
            directOut(data).then(res=>{
                console.log(res.data);
                this.record_count=Number(res.data.filter.record_count);
                for(let i=0;i<res.data.orders.length;i++){
                    let reg = new RegExp( /^￥/ , "g" );
                    res.data.orders[i].money=res.data.orders[i].money.replace(reg,"");
                    res.data.orders[i].chengben_price=res.data.orders[i].chengben_price.replace(reg,"");
                };
                this.directOutData=res.data.orders;
            }); 
        },
        chose(){//--------------------选择查询
            let data=this.$qs.stringify({
                page:1,
                page_size:10,
                time_by:this.radio,
                add_time1:this.search3[0],
                add_time2:this.search3[1],
                barcode:this.search1,
                type:this.value5,
                tosubshop_address:this.search2,
                product_sn:this.search10,
                goods_name:this.search4,
                remark:this.search5,
                apply_user:this.search6,
                check_user:this.search7,
                jianhuo_user:this.search8,
                fahuo_user:this.search9,
                from_subshop_id:this.value2,
                fahuo_son_company:this.value3,
                fahuo_subshop_type:this.value6,
                fahuo_status:this.value7,
                to_subshop_id:this.value8,
                shouhuo_son_company:this.value9,
                shouhuo_subshop_type:this.value10,
                shouhuo_status:this.value11,
            });
            this.data(data);
        },
        handleClose(done){
            done();
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            erpTableSetting.directOutList=this.directOutListshow;
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
        showDetails(row){//--------------详情
            console.log(row.id);
            let dataD = this.$qs.stringify({
                id:row.id
            });
            directOutDe(dataD).then(res=>{
                console.log(res.data);
                this.formServeDetail=res.data;
            });
        },
        edit(row){ //--------------修改
            if(row.require_daohuo_time!==""){
                row.require_daohuo_time=this.dateConverter(row.require_daohuo_time);
            }else{
                row.require_daohuo_time=new Date().getTime()/1000-86400;
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
            directOutEd(dataE).then(res=>{
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
            /* this.formServeAdd.require_daohuo_time=this.dateConverter(this.formServeAdd.require_daohuo_time);
            this.formServeAdd.apply_time=this.dateConverter(this.formServeAdd.apply_time);
            this.formServeAdd.fahuo_time=this.dateConverter(this.formServeAdd.fahuo_time);
            this.formServeAdd.shouhuo_time=this.dateConverter(this.formServeAdd.shouhuo_time);  */
            let dataA=this.$qs.stringify(this.formServeAdd);
            directOutAdd(dataA).then(res=>{
                if(res.errno==0){
                    this.$alert(res.errmsg)
                    this.reload();
                }else{
                    this.$alert(res.errmsg)
                }
            })
            //this.reload();
        },
        sendGoods(row){//------------------发货
            console.log(row.id+"*"+row.status);
            let dataD = this.$qs.stringify({
                id:row.id,
                status:1
            });
            directOutSend(dataD).then(res=>{
                if(res.errno==1){
                    this.$message({
                        type: "error",
                        message:"订单已发货",
                        duration: 1000
                    });
                }else{
                    this.$message({
                        type: "success",
                        message: "发货成功",
                        duration: 1000
                    });
                    this.reload ();
                }
            });

        },
        deleteRow(row) {//--------------删除
            let Message=confirm("确定删除此行数据？");
            if(Message){
                let data=this.$qs.stringify({
                    id:row.id,
                    is_delete:1
                }); 
                directOutEd(data).then(res=>{
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
            if(erpTableSetting.directOutList!==undefined){
                this.directOutListshow=erpTableSetting.directOutList;
            }
        }else{
            console.log("no");
        }; 
        this.init(1);   
    }
}
</script>
<style scoped>
.directOutList{
    text-align: center;
    margin: 10px;
}
/* 头部面包屑 */
.main-header {
  padding: 10px;
  background: #fff;
  text-align: left;
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