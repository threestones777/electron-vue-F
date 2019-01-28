<template>
    <div class="cashierCheck">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <!-- <h3>温州美联 管理中心</h3> -->
            <el-breadcrumb style="font-size:18px" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>零售</el-breadcrumb-item>
                <el-breadcrumb-item>收银对账</el-breadcrumb-item>
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
                    <el-col style="text-align:left" :span="5">
                        <!-- <el-checkbox v-model="radio">查询今天数据</el-checkbox> -->
                        <el-date-picker
                        v-model="value7" size="mini" style="width:100%;margin-top:10px"
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
                        <el-select @change="chose" v-model="value" size="small" placeholder="收银员" style="margin-bottom:5px;">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select @change="chose" v-model="value1" size="small" placeholder="支付方式">
                            <el-option
                            v-for="item in options1"
                            :key="item.value1"
                            :label="item.label"
                            :value="item.value1">
                            </el-option>
                        </el-select>    
                    </el-col>
                    <el-col :span="4">
                        <el-select @change="chose" v-model="value5" size="small" placeholder="分店类型" style="margin-top:0px;width:100%">
                            <el-option
                            v-for="item in options5"
                            :key="item.value5"
                            :label="item.label"
                            :value="item.value5">
                            </el-option>
                        </el-select> 
                        <el-select @change="chose" v-model="value4" size="small" placeholder="分店" style="margin-top:5px">
                            <el-option
                            v-for="item in options4"
                            :key="item.value4"
                            :label="item.label"
                            :value="item.value4">
                            </el-option>
                        </el-select> 
                    </el-col>
                    <el-col :span="4">
                        <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="search"  size="mini"  placeholder="营业员"/>
                        <!-- <el-input @input="chose" v-model="search2"  prefix-icon="el-icon-search" style="width:100%"  size="mini"  placeholder="分店区域"/> -->
                    </el-col>
                    <el-col :span="4"></el-col>
                    <el-col :span="3">
                        <el-button type="primary" size="small" @click="reset">刷新</el-button><br>
                        <el-button icon="el-icon-tickets"  style="margin-top:5px" type="primary" size="small" @click="dialogShow=true">显示列</el-button>
                    </el-col>
                </el-row>				
			</fieldset>

            <!-- 按需选择列弹窗 -->
            <el-dialog
            title="按需选择列"
            :visible.sync="dialogShow"
            :before-close="handleClose"
            width="300px">
                <el-checkbox v-model="cashierCheckshow.show1">收银对账id</el-checkbox><br>
                <el-checkbox v-model="cashierCheckshow.show2">分店id</el-checkbox><br>
                <el-checkbox v-model="cashierCheckshow.show3">日期</el-checkbox><br>
                <el-checkbox v-model="cashierCheckshow.show4">分店名称</el-checkbox><br>
                <el-checkbox v-model="cashierCheckshow.show5">收银员</el-checkbox><br>
                <el-checkbox v-model="cashierCheckshow.show6">收款总额</el-checkbox><br>
                <el-checkbox v-model="cashierCheckshow.show7">现金</el-checkbox><br>
                <el-checkbox v-model="cashierCheckshow.show8">银行卡</el-checkbox><br>
                <el-checkbox v-model="cashierCheckshow.show9">储值卡</el-checkbox><br>
                <el-checkbox v-model="cashierCheckshow.show10">储值卡充值金额</el-checkbox><br>
                <el-checkbox v-model="cashierCheckshow.show11">积分付款</el-checkbox><br>
                <el-checkbox v-model="cashierCheckshow.show12">礼券</el-checkbox><br>
                <el-checkbox v-model="cashierCheckshow.show13">付款</el-checkbox><br>
                <el-checkbox v-model="cashierCheckshow.show14">微信</el-checkbox><br>
                <el-checkbox v-model="cashierCheckshow.show15">支付宝</el-checkbox><br>
                <el-checkbox v-model="cashierCheckshow.show16">抹零金额</el-checkbox><br>
                <el-checkbox v-model="cashierCheckshow.show17">总金额</el-checkbox><br>
                <el-checkbox v-model="cashierCheckshow.show18">总单数</el-checkbox><br>
                <el-checkbox v-model="cashierCheckshow.show19">客单价</el-checkbox><br>
                <el-checkbox v-model="cashierCheckshow.show20">销售金额</el-checkbox><br>
                <el-checkbox v-model="cashierCheckshow.show21">销售客单数</el-checkbox><br>
                <el-checkbox v-model="cashierCheckshow.show22">销售客单金额</el-checkbox><br>
                <el-checkbox v-model="cashierCheckshow.show23">退货金额</el-checkbox><br>
                <el-checkbox v-model="cashierCheckshow.show24">退货客单数</el-checkbox><br>
                <el-checkbox v-model="cashierCheckshow.show25">退货客单价</el-checkbox><br><br>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="cashierCheckData.filter(data =>  {
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
                align="center"
                v-if="cashierCheckshow.show1"
                label="收银对账id">
                </el-table-column>
                <el-table-column
                prop="subshop_id"
                v-if="cashierCheckshow.show2"
                align="center"
                label="分店id">
                </el-table-column> -->
                <el-table-column
                prop="add_time"
                align="center"
                v-if="cashierCheckshow.show3"
                sortable
                label="日期">
                    <template slot-scope="scope">
                        <span >{{scope.row.add_time}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="cashierCheckshow.show4"
                label="分店名称">
                    <template slot-scope="scope">
                        <span >{{scope.row.subshop_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="cashierCheckshow.show5"
                label="收银员">
                    <template slot-scope="scope">
                        <span >{{scope.row.adminid}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                prop="total_price"
                v-if="cashierCheckshow.show6"
                label="收款总额">
                    <!-- <template slot-scope="scope">
                        <input v-model="scope.row.total_price">
                    </template> -->
                </el-table-column>
                <el-table-column
                align="center"
                prop="cash"
                v-if="cashierCheckshow.show7"
                label="现金">
                    <!-- <template slot-scope="scope">
                        <input v-model="scope.row.cash">
                    </template> -->
                </el-table-column>
                <el-table-column
                align="center"
                v-if="cashierCheckshow.show8"
                label="银行卡">
                    <template slot-scope="scope">
                        <span >{{scope.row.bank_card}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="cashierCheckshow.show9" 
                label="储值卡">
                    <template slot-scope="scope">
                        <span >{{scope.row.value_card}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                prop="chongzhi_price"
                v-if="cashierCheckshow.show10"
                label="储值卡充值金额">
                    <!-- <template slot-scope="scope">
                        <input v-model="scope.row.chongzhi_price">
                    </template> -->
                </el-table-column>
                <el-table-column
                align="center"
                prop="integral"
                v-if="cashierCheckshow.show11"
                label="积分付款">
                    <!-- <template slot-scope="scope">
                        <input v-model="scope.row.integral">
                    </template> -->
                </el-table-column>
                <el-table-column
                align="center"
                prop="gift_card"
                v-if="cashierCheckshow.show12"
                label="礼券">
                    <!-- <template slot-scope="scope">
                        <input v-model="scope.row.gift_card">
                    </template> -->
                </el-table-column>
                <el-table-column
                align="center"
                prop="payment"
                v-if="cashierCheckshow.show13"
                label="支付方式">
                    <!-- <template slot-scope="scope">
                        <input v-model="scope.row.payment">
                    </template> -->
                </el-table-column>
                <el-table-column
                align="center"
                prop="weixin"
                v-if="cashierCheckshow.show14"
                label="微信">
                    <!-- <template slot-scope="scope">
                        <input v-model="scope.row.weixin">
                    </template> -->
                </el-table-column>
                <el-table-column
                align="center"
                prop="zhifubao"
                v-if="cashierCheckshow.show15"
                label="支付宝">
                    <!-- <template slot-scope="scope">
                        <input v-model="scope.row.zhifubao">
                    </template> -->
                </el-table-column>
                <el-table-column
                align="center"
                prop="moling_price"
                v-if="cashierCheckshow.show16"
                label="抹零金额">
                    <!-- <template slot-scope="scope">
                        <input v-model="scope.row.moling_price">
                    </template> -->
                </el-table-column>
                <el-table-column
                align="center"
                prop="sum_price"
                v-if="cashierCheckshow.show17"
                label="总金额">
                    <!-- <template slot-scope="scope">
                        <input v-model="scope.row.sum_price">
                    </template> -->
                </el-table-column>
                <el-table-column
                align="center"
                prop="sum_num"
                v-if="cashierCheckshow.show18"
                label="总单数">
                    <!-- <template slot-scope="scope">
                        <input v-model="scope.row.sum_num">
                    </template> -->
                </el-table-column>
                <el-table-column
                align="center"
                prop="per_price"
                v-if="cashierCheckshow.show19"
                label="客单价">
                    <!-- <template slot-scope="scope">
                        <input v-model="scope.row.per_price">
                    </template> -->
                </el-table-column>
                <el-table-column
                align="center"
                prop="xiaoshou_price"
                v-if="cashierCheckshow.show20"
                label="销售金额">
                    <!-- <template slot-scope="scope">
                        <input v-model="scope.row.xiaoshou_price">
                    </template> -->
                </el-table-column>
                <el-table-column
                align="center"
                prop="xiaoshou_per_num"
                v-if="cashierCheckshow.show21"
                label="销售客单数">
                    <!-- <template slot-scope="scope">
                        <input v-model="scope.row.xiaoshou_per_num">
                    </template> -->
                </el-table-column>
                <el-table-column
                align="center"
                prop="xiaoshou_per_price"
                v-if="cashierCheckshow.show22"
                label="销售客单金额">
                    <!-- <template slot-scope="scope">
                        <input v-model="scope.row.xiaoshou_per_price">
                    </template> -->
                </el-table-column>
                <el-table-column
                align="center"
                prop="back_price"
                v-if="cashierCheckshow.show23"
                label="退货金额">
                    <!-- <template slot-scope="scope">
                        <input v-model="scope.row.back_price">
                    </template> -->
                </el-table-column>
                <el-table-column
                align="center"
                prop="back_per_num"
                v-if="cashierCheckshow.show24"
                label="退货客单数">
                    <!-- <template slot-scope="scope">
                        <input v-model="scope.row.back_per_num">
                    </template> -->
                </el-table-column>
                <el-table-column
                align="center"
                prop="back_per_price"
                v-if="cashierCheckshow.show25"
                label="退货客单价">
                    <!-- <template slot-scope="scope">
                        <input v-model="scope.row.back_per_price">
                    </template> -->
                </el-table-column>
                <!-- <el-table-column
                fixed="right"
                align="center"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="savEdit(scope.row)">保存修改</el-button>
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
import {cashierCheck,cashierCheckDe,cashierCheckAdd,cashierCheckEd} from '../../api/apiW';
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
            radio:false,
            keywords:'',
            record_count:0,
            formServeAdd:{
                name:""
            },
            formDetails:{},
            cashierCheckData:[],
            cashierCheckshow:{
                show1:false,
                show2:false,
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
                show22:true,
                show23:true,
                show24:true,
                show25:true,
            },
            value: '' ,
            value1: '' ,
            value3: '' ,
            value4: '' ,
            value5: '' ,
            value6: '' ,
            value7: '' ,
            options: [{
            value: '0',
            label: '全部' 
            },{
            value: '001',
            label: '001'
            }, {
            value: '8848',
            label: '002'
            },],  
            options1: [{
            value1: '1',
            label: '现金'
            }, {
            value1: '2',
            label: '银行卡'
            },{
            value1: '3',
            label: '扫码'
            }],  
            options3: [{
            value3: '选项1',
            label: '分公司1'
            }, {
            value3: '选项2',
            label: '分公司2'
            },],  
            options4: [{
            value4: '0',
            label: '0分店'
            }, {
            value4: '1',
            label: '1分店'
            },],  
            options5: [{
            value5: '0',
            label: '店1'
            }, {
            value5: '1',
            label: '店2'
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
            cashierCheck(data).then(res=>{
                console.log(res.data);
                this.record_count=Number(res.data.filter.record_count);
                this.cashierCheckData=res.data.cashiercheck_list;
            }) 
        }, 
        chose(){//-----------------选择查询
            let data=this.$qs.stringify({
                page:1,
                page_size:10,
                adminid:this.value,
                subshop_id:this.value4,
                payment:this.value1,
                subshop_type:this.value5,
                subshop_address:this.search2,
                add_time1:this.value7[0],
                add_time2:this.value7[1],
            }); 
            this.data(data);
        },
        handleClose(done){
            done();
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            erpTableSetting.cashierCheck=this.cashierCheckshow;
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
        showDetails(row){//--------------------------详情
            console.log(row.id);
            let data=this.$qs.stringify({
                id:row.id,
            }); 
            cashierCheckDe(data).then(res=>{
                console.log(res.data);
                this.formDetails=res.data[0];
                this.formDetails.add_time=new Date(this.formDetails.add_time*1000).toLocaleDateString();
            });
        },
        savEdit(row){//--------------------------修改
            row.add_time=this.dateConverter(row.add_time); 
            let dataE=this.$qs.stringify(row);
            cashierCheckEd(dataE).then(res=>{
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
        add(){  
            this.formServeAdd.add_time=this.dateConverter(this.formServeAdd.add_time);       
            let dataA=this.$qs.stringify(this.formServeAdd);
            cashierCheckAdd(dataA).then(res=>{
                console.log(res.errno);
                this.reload();
            })
        },
        deleteRow(row) {
            let Message=confirm("确定删除此行数据？");
            if(Message){
                let data=this.$qs.stringify({
                    id:row.id,
                    is_delete:1
                }); 
                cashierCheckEd(data).then(res=>{
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
            if(erpTableSetting.cashierCheck!==undefined){
                this.cashierCheckshow=erpTableSetting.cashierCheck;
            }
        }else{
            console.log("no");
        };  
        this.init(1);   
    }
}
</script>
<style scoped>
.cashierCheck{
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
</style>