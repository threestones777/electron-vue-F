<template>
    <div class="sellProfitList">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <!-- <h3>温州美联 管理中心</h3> -->
            <el-breadcrumb style="font-size:18px" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>报表</el-breadcrumb-item>
                <el-breadcrumb-item>销售利润表</el-breadcrumb-item>
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
                <!-- <div @click="dialogShow=true" class="card">
                    <i class="el-icon-tickets"></i>
                    <div>显示列</div>
                </div> -->
                <div @click="dialogServeAdd = true" class="card">
                    <i class="el-icon-plus"></i>
                    <div>新增</div>
                </div>
            </div>
        </div>
        <div class="main-table">
            <!-- 搜索 -->
            <el-form :inline="true" :model="formServe" class="demo-form-inline">
                <!-- <el-form-item label="">
                    <el-input	size="small" v-model="formServe.name" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input	size="small" type="tel" v-model="formServe.marks" placeholder="编号"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input	size="small" type="tel" v-model="formServe.marks" placeholder="备注信息"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <el-input placeholder="请输入单据类型" @input="search" v-model="keywords" style="width:70%;margin-right:10px" size="small">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                    <!-- <el-button type="primary" size="small" @click="dialogServeAdd = true">新增</el-button>
                    <el-button type="primary" size="small" @click="reset">刷新</el-button> -->
                </el-form-item>
            </el-form>
            <!-- 新增弹出框 formServeAdd-->
            <el-dialog width="700px" title="新增" :visible.sync="dialogServeAdd">
                <el-form :model="formServeAdd"  style="text-align:center">
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            销售利润表id<el-input v-model="formServeAdd.id" disabled></el-input>    
                        </el-col>
                        <el-col :span="7">
                            单据日期<el-input placeholder="日期自动生成" v-model="formServeAdd.add_time" disabled></el-input>
                        </el-col>
                        <el-col :span="7">
                            单据类型<el-input v-model="formServeAdd.type"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            单据编号<el-input v-model="formServeAdd.bill_sn"></el-input> 
                        </el-col>
                        <el-col :span="7">
                            客户名<el-input v-model="formServeAdd.user_name"></el-input>
                        </el-col>
                        <el-col :span="7">
                            用户id<el-input v-model="formServeAdd.user_id"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            制单人<el-input v-model="formServeAdd.adminer"></el-input> 
                        </el-col>
                        <el-col :span="7">
                            数量<el-input v-model="formServeAdd.number"></el-input>
                        </el-col>
                        <el-col :span="7">
                            销售收入<el-input v-model="formServeAdd.xiaoshou_shouru"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            销售成本<el-input v-model="formServeAdd.xiaoshou_chengben"></el-input> 
                        </el-col>
                        <el-col :span="7">
                            销售毛利<el-input v-model="formServeAdd.xiaoshou_maoli"></el-input>
                        </el-col>
                        <el-col :span="7">
                            毛利率<el-input v-model="formServeAdd.gross_interest_rate"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            优惠金额<el-input v-model="formServeAdd.discount"></el-input> 
                        </el-col>
                        <el-col :span="7">
                            销售净利润<el-input v-model="formServeAdd.xiaoshou_net_profit"></el-input>
                        </el-col>
                        <el-col :span="7">
                            净利润率<el-input v-model="formServeAdd.net_interest_rate"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            应收金额<el-input v-model="formServeAdd.yingshou_price"></el-input> 
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeAdd = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="add(),dialogServeAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 详情弹出框 -->
            <el-dialog width="700px" title="详情" :visible.sync="dialogServeDetail">
                <el-form :model="formServeDetail"  style="text-align:center">
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            销售利润表id<el-input v-model="formServeDetail.id"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            单据日期<el-input v-model="formServeDetail.add_time"></el-input>
                        </el-col>
                        <el-col :span="7">
                            单据类型<el-input v-model="formServeDetail.type"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            单据编号<el-input v-model="formServeDetail.bill_sn"></el-input> 
                        </el-col>
                        <el-col :span="7">
                            客户名<el-input v-model="formServeDetail.user_name"></el-input>
                        </el-col>
                        <el-col :span="7">
                            用户id<el-input v-model="formServeDetail.user_id"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            制单人<el-input v-model="formServeDetail.adminer"></el-input> 
                        </el-col>
                        <el-col :span="7">
                            数量<el-input v-model="formServeDetail.number"></el-input>
                        </el-col>
                        <el-col :span="7">
                            销售收入<el-input v-model="formServeDetail.xiaoshou_shouru"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            销售成本<el-input v-model="formServeDetail.xiaoshou_chengben"></el-input> 
                        </el-col>
                        <el-col :span="7">
                            销售毛利<el-input v-model="formServeDetail.xiaoshou_maoli"></el-input>
                        </el-col>
                        <el-col :span="7">
                            毛利率<el-input v-model="formServeDetail.gross_interest_rate"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            优惠金额<el-input v-model="formServeDetail.discount"></el-input> 
                        </el-col>
                        <el-col :span="7">
                            销售净利润<el-input v-model="formServeDetail.xiaoshou_net_profit"></el-input>
                        </el-col>
                        <el-col :span="7">
                            净利润率<el-input v-model="formServeDetail.net_interest_rate"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            应收金额<el-input v-model="formServeDetail.yingshou_price"></el-input> 
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeDetail = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="edit(),dialogServeDetail = false">保存修改</el-button>
                </div>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="sellProData"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            style="width:100%">
                <el-table-column
                prop="id"
                align="center"
                label="销售利润表id">
                </el-table-column>
                <el-table-column
                prop="addtime"
                align="center"
                label="单据日期">
                </el-table-column>
                <el-table-column
                prop="type"
                align="center"
                label="单据类型">
                </el-table-column>
                <el-table-column
                prop="bill_sn"
                align="center"
                label="单据编号">
                </el-table-column>
                <el-table-column
                prop="user_name"
                align="center"
                label="客户名">
                </el-table-column>  
                <el-table-column
                prop="number"
                align="center"
                label="数量">
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showDetails(scope.row),dialogServeDetail = true">详情</el-button>
                        <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
                @current-change="handleCurrentChange"
                layout="prev, pager, next,jumper"
                :page-count="pages">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {profitform,profitformDe,profitformAdd,profitformEd} from '../../api/apiW';
export default {
    inject: ['reload'],
    data() {
        return {
            pages:1,
            dialogServeAdd:false,
            dialogServeDetail:false,
            keywords:'',
            formServe:{
                name:"",
                marks:""
            },
            formServeAdd:{
                name:""
            },
            formServeDetail:{},
            sellProData:[],
        }
    },
    methods:{
        dateConverter(str) { //-----------------------日期转秒数
            var arr = str.split(/[- : \/]/);
            var startDate = Date.parse(new Date(arr[0], arr[1]-1, arr[2]))/1000;
            return startDate;
        },
        search() {
            let data=this.$qs.stringify({
                page:1,
                page_size:10,
                type:this.keywords
            });
            profitform(data).then(res=>{
            console.log(res.data);
            this.sellProData=res.data.orders;
            });
        },         
        reset() {
            this.reload();
        },
        handleCurrentChange(val) {
            console.log(val);          
        },
        showDetails(row){//--------------详情
            console.log(row.id);
            let dataD = this.$qs.stringify({
                id:row.id
            });
            profitformDe(dataD).then(res=>{
                if(res.errno==0){
                    console.log(res.data[0]);
                    this.formServeDetail=res.data[0];
                    this.formServeDetail.add_time=new Date(this.formServeDetail.add_time*1000).toLocaleDateString();
                }else{
                    this.dialogServeDetail=false;
                    alert("您查找的用户不存在");
                }
            });
        },
        edit(){//--------------修改
            this.formServeDetail.xiaoshou_shouru=this.formServeDetail.xiaoshou_shouru.slice(1);
            this.formServeDetail.xiaoshou_chengben=this.formServeDetail.xiaoshou_chengben.slice(1);
            this.formServeDetail.xiaoshou_maoli=this.formServeDetail.xiaoshou_maoli.slice(1);
            this.formServeDetail.discount=this.formServeDetail.discount.slice(1);
            let dataE=this.$qs.stringify(this.formServeDetail);
            profitformEd(dataE).then(res=>{
                console.log(res.errno);
                if(res.errno==0){
                    this.$alert("修改成功")
                    this.reload();
                }else{
                    this.$alert("修改失败")
                }
            })
        },
        add(){//--------------添加
            let dataA=this.$qs.stringify(this.formServeAdd);
            profitformAdd(dataA).then(res=>{
                if(res.errno==0){
                    this.$alert("添加成功")
                    this.reload();
                }else{
                    this.$alert("添加失败")
                }
            })
        },
        deleteRow(row) {//--------------删除
            let Message=confirm("确定删除此行数据？");
            if(Message){
                let data=this.$qs.stringify({
                    id:row.id,
                    is_delete:1
                }); 
                profitformEd(data).then(res=>{
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
        profitform().then(res=>{
          console.log(res.data);
          this.sellProData=res.data.orders;
        });
    }
}
</script>
<style scoped>
.sellProfitList{
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

/* 新增弹出框 & 详情弹出框*/
.main-table>>>.el-dialog__body {
  padding: 0 20px;
}
.el-dialog__body .el-form {
  text-align: right;
}
.el-row {
  border-top: 1px dashed #ccc;
}
</style>