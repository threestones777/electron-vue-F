<template>
    <div class="directReceivingList">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>调拨</el-breadcrumb-item>
                <el-breadcrumb-item>直调收货单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <div style="margin:10px 0;text-align:center">
                <el-button icon="el-icon-tickets"  style="float:right;margin-right:20px" type="primary" size="small" @click="dialogShow=true">显示列</el-button>
                <el-input  prefix-icon="el-icon-search" style="width:15%" v-model="search"  size="mini"  placeholder="输入关键字搜索"/>
                <el-button type="primary" size="small" @click="add" icon="el-icon-plus"></el-button>
                <el-button type="primary" size="small" @click="reset">刷新</el-button>
            </div>
            <!-- 按需选择列弹窗 -->
            <el-dialog
            title="按需选择列" style="text-align:left"
            :visible.sync="dialogShow"
            :before-close="handleClose"
            width="200px">
                <el-checkbox v-model="directReceivingListshow.show1">直调收货单id</el-checkbox><br>
                <el-checkbox v-model="directReceivingListshow.show2">状态</el-checkbox><br>
                <el-checkbox v-model="directReceivingListshow.show3">发货店号</el-checkbox><br>
                <el-checkbox v-model="directReceivingListshow.show4">发货分店名</el-checkbox><br>
                <el-checkbox v-model="directReceivingListshow.show5">收货分店</el-checkbox><br>
                <el-checkbox v-model="directReceivingListshow.show6">收货店名</el-checkbox><br>
                <el-checkbox v-model="directReceivingListshow.show7">单号</el-checkbox><br>
                <el-checkbox v-model="directReceivingListshow.show8">单据类型</el-checkbox><br>
                <el-checkbox v-model="directReceivingListshow.show9">金额</el-checkbox><br>
                <el-checkbox v-model="directReceivingListshow.show10">申请人</el-checkbox><br>
                <el-checkbox v-model="directReceivingListshow.show11">申请日期</el-checkbox><br>
                <el-checkbox v-model="directReceivingListshow.show12">发货人</el-checkbox><br>
                <el-checkbox v-model="directReceivingListshow.show13">发货日期</el-checkbox><br>
                <el-checkbox v-model="directReceivingListshow.show14">收货人</el-checkbox><br>
                <el-checkbox v-model="directReceivingListshow.show15">收货时间</el-checkbox><br>
                <el-checkbox v-model="directReceivingListshow.show16">备注</el-checkbox><br>
                <el-checkbox v-model="directReceivingListshow.show17">拣货员</el-checkbox><br>
                <el-checkbox v-model="directReceivingListshow.show18">检验员</el-checkbox><br><br>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="directReceData.filter(data =>  {
            return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1})})"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            style="width: 100%">
                <el-table-column
                prop="id"
                align="center"
                v-if="directReceivingListshow.show1"
                label="直调收货单id">
                </el-table-column>
                <el-table-column
                prop="status"
                v-if="directReceivingListshow.show2"
                align="center"
                label="状态">
                    <template slot-scope="scope">
                        <input v-model="scope.row.status"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="from_subshop_id"
                align="center"
                v-if="directReceivingListshow.show3"
                label="发货店号">
                </el-table-column>
                <el-table-column
                align="center"
                v-if="directReceivingListshow.show4"
                label="发货分店名">
                    <template slot-scope="scope">
                        <input v-model="scope.row.from_subshop_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="directReceivingListshow.show5"
                label="收货分店">
                    <template slot-scope="scope">
                        <input v-model="scope.row.to_subshop_id"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="directReceivingListshow.show6"
                label="收货店名">
                    <template slot-scope="scope">
                        <input v-model="scope.row.to_subshop_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="bill_sn"
                align="center"
                v-if="directReceivingListshow.show7"
                label="单号">
                    <template slot-scope="scope">
                        <input v-model="scope.row.bill_sn"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="directReceivingListshow.show8"
                label="单据类型">
                    <template slot-scope="scope">
                        <input v-model="scope.row.type"/>
                    </template>
                </el-table-column>
                <!-- <el-table-column
                align="center"
                label="要求到货日期">
                    <template slot-scope="scope">
                        <input v-model="scope.row.require_arrival_time"/>
                    </template>
                </el-table-column> -->
                <el-table-column
                align="center"
                v-if="directReceivingListshow.show9"
                label="金额">
                    <template slot-scope="scope">
                        <input v-model="scope.row.money"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="directReceivingListshow.show10"
                label="申请人">
                    <template slot-scope="scope">
                        <input v-model="scope.row.apply_user"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="directReceivingListshow.show11"
                label="申请日期">
                    <template slot-scope="scope">
                        <input v-model="scope.row.apply_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="directReceivingListshow.show12"
                label="发货人">
                    <template slot-scope="scope">
                        <input v-model="scope.row.fahuo_user"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="directReceivingListshow.show13"
                label="发货日期">
                    <template slot-scope="scope">
                        <input v-model="scope.row.fahuo_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="directReceivingListshow.show14"
                label="收货人">
                    <template slot-scope="scope">
                        <input v-model="scope.row.shouhuo_user"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="directReceivingListshow.show15"
                label="收货时间">
                    <template slot-scope="scope">
                        <input v-model="scope.row.shouhuo_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="directReceivingListshow.show16"
                label="备注">
                    <template slot-scope="scope">
                        <input v-model="scope.row.remark"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="directReceivingListshow.show17"
                label="拣货员">
                    <template slot-scope="scope">
                        <input v-model="scope.row.jianhuo_user"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="directReceivingListshow.show18"
                label="检验员">
                    <template slot-scope="scope">
                        <input v-model="scope.row.jianyan_user"/>
                    </template>
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="edit(scope.row)">保存修改</el-button>
                        <el-button type="text" size="small" @click="receiveGoods(scope.row)">收货</el-button>
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
import {directRece,directReceDe,directReceAdd,directReceEd,directReceRec} from '../../api/apiW' ;
export default {
    inject: ['reload'],
    data() {
        return {
            pages:1,
            dialogServeAdd:false,
            dialogServeDetail:false,
            dialogShow:false,
            search:'',
            record_count:0,
            formServe:{},
            formServeAdd:{
                status:0,
                from_subshop_id:0,
                to_subshop_id:0,
                type:1,
                money:0,
                apply_user:0,
                apply_time:new Date().getTime()/1000-86400,
                fahuo_user:0,
                fahuo_time:new Date().getTime()/1000-86400,
                shouhuo_user:0,
                shouhuo_time:new Date().getTime()/1000-86400,
                jianhuo_user:0,
                number:0,

            },
            formServeDetail:{},
            directReceData:[],
            directReceivingListshow:{
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
                show16:true,
                show17:true,
                show18:true,
            },
        }
    },
    methods:{
        init(page){//-----------------初始化数据
            let data=this.$qs.stringify({
                page:page,
                page_size:10,
            }); 
            directRece(data).then(res=>{
                console.log(res.data);
                this.record_count=Number(res.data.filter.record_count);
                this.directReceData=res.data.orders;
            });  
        }, 
        handleClose(done){
            done();
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            erpTableSetting.directReceivingList=this.directReceivingListshow;
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
            console.log(val);
            this.init(val);            
        },
        receiveGoods(row){//--------------收货
            console.log(row.id+"*"+row.status);
            let dataD = this.$qs.stringify({
                id:row.id,
                status:1
            });
            directReceRec(dataD).then(res=>{
                this.$alert(res.errmsg);
            });

        },
        showDetails(row){//--------------详情
            console.log(row.id);
            let dataD = this.$qs.stringify({
                id:row.id
            });
            directReceDe(dataD).then(res=>{
                if(res.errno==0){
                    console.log(res.data);
                    this.formServeDetail=res.data;
                }else{
                    this.dialogServeDetail=false;
                    alert("您查找的用户不存在");
                }
            });
        },
        add(){//--------------添加
            /* this.formServeAdd.require_arrival_time=this.dateConverter(this.formServeAdd.require_arrival_time);
            this.formServeAdd.apply_time=this.dateConverter(this.formServeAdd.apply_time);
            this.formServeAdd.fahuo_time=this.dateConverter(this.formServeAdd.fahuo_time);
            this.formServeAdd.shouhuo_time=this.dateConverter(this.formServeAdd.shouhuo_time); */
            let dataA=this.$qs.stringify(this.formServeAdd);
            directReceAdd(dataA).then(res=>{
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
        edit(row){//--------------修改
            row.money=row.money.slice(1);
            //row.require_arrival_time=this.dateConverter(row.require_arrival_time);
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
            //row.status=row.status=="未审核"?0:1;
            let dataE=this.$qs.stringify(row);
            directReceEd(dataE).then(res=>{
                console.log(res.errno);
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
        deleteRow(row) {//--------------删除
            let Message=confirm("确定删除此行数据？");
            if(Message){
                let data=this.$qs.stringify({
                    id:row.id,
                    is_delete:1
                }); 
                directReceEd(data).then(res=>{
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
            if(erpTableSetting.directReceivingList!==undefined){
                this.directReceivingListshow=erpTableSetting.directReceivingList;
            }
        }else{
            console.log("no");
        }; 
        this.init(1);  
    }
}
</script>
<style scoped>
.directReceivingList{
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
.el-row {
  border-top: 1px dashed #ccc;
}
</style>