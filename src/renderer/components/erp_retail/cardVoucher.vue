<template>
    <div class="cardVoucher">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <!-- <h3>温州美联 管理中心</h3> -->
            <el-breadcrumb style="font-size:18px" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>核销</el-breadcrumb-item>
                <el-breadcrumb-item>卡券核销</el-breadcrumb-item>
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
                <el-form-item>
                    <el-input placeholder="请输入提货券类型" @input="search" v-model="keywords" style="width:75%;margin-right:10px" size="small">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                    <!-- <el-button type="primary" size="small" @click="dialogServeAdd = true">新增</el-button>
                    <el-button type="primary" size="small" @click="reset" icon="el-icon-loading">刷新</el-button> -->
                </el-form-item>
            </el-form>
            <!-- 新增弹出框 -->
            <el-dialog width="550px" title="新增" :visible.sync="dialogServeAdd">
                <el-form :model="formServeAdd">
                    <el-form-item label="类型名">
                        <el-input v-model="formServeAdd.type_name"></el-input>
                    </el-form-item>
                    <el-form-item label="金额">
                        <el-input v-model="formServeAdd.type_money"></el-input>
                    </el-form-item>                    
                    <el-form-item label="使用次数">
                        <el-input v-model="formServeAdd.type_money_count"></el-input>
                    </el-form-item>                    
                    <el-form-item label="使用起始日期">
                        <el-input v-model="formServeAdd.use_start_date"></el-input>
                    </el-form-item>                    
                    <el-form-item label="使用结束日期">
                        <el-input v-model="formServeAdd.use_end_date"></el-input>
                    </el-form-item>                    
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeAdd = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="add(),dialogServeAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 发放弹出框 -->
            <el-dialog width="450px" title="发放" :visible.sync="dialogIssue">                
                    本次发放数量：<el-input style="width:75%" v-model="send_sum"></el-input>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogIssue = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="issue(),dialogIssue = false">发 放</el-button>
                </div>
            </el-dialog>
            <!-- 查看弹出框 -->
            <el-dialog width="55%" title="查看" :visible.sync="dialogCheck">                
                  <el-table
                    ref="multipleTable"
                    :data="checkData"
                    border
                    :row-style="{height:0}"  
                    :cell-style="{padding:0}"
                    :header-row-style="{height:0}"  
                    :header-cell-style="{padding:0}"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    prop="tg_id"
                    label="编号">
                    </el-table-column>
                    <el-table-column
                    prop="tg_sn"
                    label="提货券号码">
                    </el-table-column>
                    <el-table-column
                    prop="tg_pwd"
                    label="密码">
                    </el-table-column>
                    <el-table-column
                    prop="is_used"
                    label="已使用次数">
                    </el-table-column>
                    <el-table-column
                    prop="used_time_format"
                    label="最后使用时间">
                    </el-table-column>
                    <el-table-column
                fixed="right"
                align="center"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" title="删除" @click="dele(scope.row)"  icon="el-icon-delete"></el-button>
                    </template>
                </el-table-column>
                </el-table> 
                <br>
                <el-button @click="allDelete">批量删除</el-button>
                 <el-pagination
                    @current-change="handleChecktChange"
                    layout="total,prev, pager, next,jumper"
                    :page-size="10"
                    :total="record_count">
                </el-pagination>
            </el-dialog>
            <!-- 详情弹出框 -->
            <el-dialog width="450px" title="详情" :visible.sync="dialogServeDetail">
                <el-form :model="formServeDetail">
                    <el-form-item label="类型id">
                        <el-input v-model="formServeDetail.type_id" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="类型名称">
                        <el-input v-model="formServeDetail.type_name"></el-input>
                    </el-form-item>
                    <el-form-item label="储值卡金额">
                        <el-input v-model="formServeDetail.type_money"></el-input>
                    </el-form-item>
                    <el-form-item label="可用次数">
                        <el-input v-model="formServeDetail.type_money_count"></el-input>
                    </el-form-item>
                    <el-form-item label="起始日期">
                        <el-date-picker v-model="formServeDetail.use_start_date" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束日期">
                        <el-date-picker v-model="formServeDetail.use_end_date" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeDetail = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="edit(),dialogServeDetail = false">保存修改</el-button>
                </div>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="cardVoucherData"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            style="width: 100%">
                <el-table-column
                prop="type_id"
                align="center"
                label="卡券id">
                </el-table-column>
                <el-table-column
                prop="type_name"
                align="center"
                label="卡券名">
                </el-table-column>
                <el-table-column
                prop="type_money"
                align="center"
                label="卡券金额">
                </el-table-column>
                <el-table-column
                prop="type_money_count"
                align="center"
                label="使用次数">
                </el-table-column>
                <el-table-column
                prop="send_count"
                align="center"
                label="发放数量">
                </el-table-column>
                <el-table-column
                prop="use_date_valid"
                align="center"
                label="有效日期">
                </el-table-column>
                <el-table-column
                prop="type_money_all"
                align="center"
                label="总金额">
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showDetails(scope.row),dialogServeDetail = true">详情</el-button>
                        <el-button type="text" size="small" @click="getId(scope.row),dialogIssue = true">发放</el-button>
                        <el-button type="text" size="small" @click="check(scope.row),dialogCheck = true">查看</el-button>
                        <el-button type="text" title="删除" @click="deleteRow(scope.row)"  icon="el-icon-delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
                @current-change="handleCurrentChange"
                layout="total,prev, pager, next,jumper"
                :page-size="10"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {cardVoucher,cardVoucherDe,cardVoucherAdd,cardVoucherIssue,cardVoucherEd,cardVoucherRmv,cardVoucherRmvB,cardVoucherAddDe} from '../../api/apiW';
export default {
    inject: ['reload'],
    data() {
        return {
            pages:1,
            total:0,
            record_count:0,
            dialogServeAdd:false,
            dialogIssue:false,
            dialogCheck:false,
            dialogServeDetail:false,
            type_id:0,
            send_sum:0,
            keywords:"", 
            formServe:{
                name:"",
                marks:""
            },
            formServeAdd:{},
            formServeDetail:{},
            formIssue:{},
            cardVoucherData:[],
            checkData:[],
            multipleSelection: []
        }
    },
    methods:{
        init(val){
            let data=this.$qs.stringify({
                page:val,
                page_size:10
            });
            cardVoucher(data).then(res=>{
                console.log(res.data);
                this.total=Number(res.data.filter.record_count);
                this.cardVoucherData=res.data.type_list;
            });
        },
        search() {
            let data=this.$qs.stringify({
                type_name:this.keywords
            });
            cardVoucher(data).then(res=>{
                console.log(res.data);
                this.total=Number(res.data.filter.record_count);
                this.cardVoucherData=res.data.type_list;
            });
        },        
        reset() {
            this.reload();
        },
        handleCurrentChange(val) {
            console.log(val); 
             this.init(val);         
        },
        handleChecktChange(val) {//--------------查看分页查询
            console.log(val);
            let dataC=this.$qs.stringify({
                tg_type:this.type_id,
                page:val,
                page_size:10
            });
            cardVoucherDe(dataC).then(res=>{
                console.log(res.data.vc_list);
                this.checkData=res.data.vc_list;   
                this.record_count=Number(res.data.filter.record_count);             
            })          
        },
        handleSelectionChange(val) {//--------------多选改变
            this.multipleSelection = val;
        },        
        showDetails(row){//--------------详情
            console.log(row.type_id);
            let dataD=this.$qs.stringify({
                tg_type:row.type_id
            });
            cardVoucherDe(dataD).then(res=>{
                console.log(res.data.vctype);
                this.formServeDetail=res.data.vctype;
                this.formServeDetail.use_start_date=new Date(this.formServeDetail.use_start_date*1000).toLocaleDateString();
                this.formServeDetail.use_end_date=new Date(this.formServeDetail.use_end_date*1000).toLocaleDateString();
            })
        },
        edit(){//--------------修改
            let dataE=this.$qs.stringify(this.formServeDetail);
            cardVoucherEd(dataE).then(res=>{
                console.log(res.errno);
                if(res.errno==0){
                    this.$alert(res.errmsg)
                    this.reload();
                }else{
                    this.$alert(res.errmsg)
                }
            })
        },
        getId(row){//--------------获取id
            this.type_id=row.type_id;
            console.log(this.type_id);
        },
        issue(row){//--------------发放2
            let dataI=this.$qs.stringify({
                type_id:this.type_id,
                send_sum:this.send_sum
            });
            cardVoucherIssue(dataI).then(res=>{
                if(res.errno==0){
                    this.$alert(res.errmsg)
                    this.reload();
                }else{
                    this.$alert(res.errmsg)
                }
            })
        },
        check(row){//--------------查看 
            this.type_id=row.type_id;
            let dataC=this.$qs.stringify({
                tg_type:this.type_id,
                page:1,
                page_size:10
            });
            cardVoucherDe(dataC).then(res=>{
                console.log(res.data.vc_list);
                this.checkData=res.data.vc_list;   
                this.record_count=Number(res.data.filter.record_count); 
            })
        },
        add(){//--------------添加
            let dataA=this.$qs.stringify(this.formServeAdd);
            cardVoucherAdd(dataA).then(res=>{
                if(res.errno==0){
                    this.$alert(res.errmsg)
                    this.reload();
                }else{
                    this.$alert(res.errmsg)
                }
            })
        },
        deleteRow(row) {//--------------删除提货券类型
            let Message=confirm("确定删除此行数据？");
            if(Message){
                let dataM=this.$qs.stringify({
                    id:row.type_id
                });
                cardVoucherRmv(dataM).then(res=>{
                    if(res.errno==0){
                        this.$alert(res.errmsg)
                        this.reload();
                    }else{
                        this.$alert(res.errmsg)
                    }
                })
            }else{
                alert("用户取消操作");
            }
        },
        dele(row) {//--------------删除提货券
            console.log(row.tg_id);
            let Message=confirm("确定删除此行数据？");
            if(Message){
                let dataM=this.$qs.stringify({
                    id:row.tg_id
                });
                cardVoucherRmvB(dataM).then(res=>{
                    if(res.errno==0){
                        this.$alert(res.errmsg,{
                            callback:action=>{
                                let dataC=this.$qs.stringify({
                                    tg_type:this.type_id,
                                    page:1,
                                    page_size:10
                                });
                                cardVoucherDe(dataC).then(res=>{
                                    console.log(res.data.vc_list);
                                    this.checkData=res.data.vc_list;   
                                    this.record_count=Number(res.data.filter.record_count); 
                                })
                            }
                        })
                    }else{
                        this.$alert(res.errmsg)
                    }
                })
            }else{
                alert("用户取消操作");
            } 
        },
        allDelete(row){//--------------批量删除
            console.log(this.multipleSelection);
            let checkboxes=[];
            for(let i=0;i<this.multipleSelection.length;i++){
                console.log(this.multipleSelection[i].tg_id);
                checkboxes.push(this.multipleSelection[i].tg_id);
            };
            console.log(checkboxes);
            let str=checkboxes.join(",");
            console.log(str);
            console.log(this.type_id);
            let Message=confirm("确定删除这些数据？");
            if(Message){
                let dataM=this.$qs.stringify({
                    checkboxes:JSON.stringify(checkboxes),
                    drop:1,
                    tg_type:this.type_id
                });
                cardVoucherAddDe(dataM).then(res=>{
                    if(res.errno==0){
                        this.$alert(res.errmsg,{
                            callback:action=>{
                                let dataC=this.$qs.stringify({
                                    tg_type:this.type_id,
                                    page:1,
                                    page_size:10
                                });
                                cardVoucherDe(dataC).then(res=>{
                                    console.log(res.data.vc_list);
                                    this.checkData=res.data.vc_list;   
                                    this.record_count=Number(res.data.filter.record_count); 
                                })
                            }
                        })
                    }else{
                        this.$alert(res.errmsg)
                    }
                })
            }else{
                alert("用户取消操作");
            }
        },
    },
    created: function () {  
        this.init(1);
    }
}
</script>
<style scoped>
.cardVoucher{
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