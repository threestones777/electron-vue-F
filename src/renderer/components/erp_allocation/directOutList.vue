<template>
    <div class="directOutList">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>调拨</el-breadcrumb-item>
                <el-breadcrumb-item>直调出库单</el-breadcrumb-item>
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
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            style="width: 100%">
                <el-table-column
                prop="id"
                align="center"
                v-if="directOutListshow.show1"
                label="id">
                </el-table-column>
                <el-table-column
                prop="to_subshop_id"
                align="center"
                v-if="directOutListshow.show2"
                label="收货店号">
                </el-table-column>
                <el-table-column
                align="center"
                v-if="directOutListshow.show3"
                label="收货店名">
                    <template slot-scope="scope">
                        <input v-model="scope.row.to_subshop_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="directOutListshow.show4"
                label="单号">
                    <template slot-scope="scope">
                        <input v-model="scope.row.bill_sn"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="directOutListshow.show5"
                label="单据类型">
                    <template slot-scope="scope">
                        <input v-model="scope.row.type"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="directOutListshow.show6"
                label="要求到货日期">
                    <template slot-scope="scope">
                        <input v-model="scope.row.require_daohuo_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="directOutListshow.show7"
                label="金额">
                    <template slot-scope="scope">
                        <input v-model="scope.row.money"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="directOutListshow.show8"
                label="成本金额">
                    <template slot-scope="scope">
                        <input v-model="scope.row.chengben_price"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="directOutListshow.show9"
                label="数量">
                    <template slot-scope="scope">
                        <input v-model="scope.row.number"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="directOutListshow.show10"
                label="申请人">
                    <template slot-scope="scope">
                        <input v-model="scope.row.apply_user"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="directOutListshow.show11"
                label="申请时间">
                    <template slot-scope="scope">
                        <input v-model="scope.row.apply_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="directOutListshow.show12"
                label="发货人">
                    <template slot-scope="scope">
                        <input v-model="scope.row.fahuo_user"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="directOutListshow.show13"
                label="发货时间">
                    <template slot-scope="scope">
                        <input v-model="scope.row.fahuo_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="directOutListshow.show14"
                label="收货人">
                    <template slot-scope="scope">
                        <input v-model="scope.row.shouhuo_user"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="directOutListshow.show15"
                label="收货时间">
                    <template slot-scope="scope">
                        <input v-model="scope.row.shouhuo_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="directOutListshow.show16"
                label="拣货人">
                    <template slot-scope="scope">
                        <input v-model="scope.row.jianhuo_user"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="directOutListshow.show17"
                label="状态">
                    <template slot-scope="scope">
                        <input v-model="scope.row.status"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="directOutListshow.show18"
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
            record_count:0,
            formServe:{
                
            },
            formServeAdd:{
                type:0,
                require_daohuo_time:Math.ceil(new Date().getTime()/1000-172800),
                /* 
                status:1,
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
                show16:true,
                show17:true,
                show18:true,
            },
        }
    },
    methods:{
        init(page){
            let data=this.$qs.stringify({
                page:page,
                page_size:10,
            });
            directOut(data).then(res=>{
                console.log(res.data);
            this.record_count=Number(res.data.filter.record_count);
            this.directOutData=res.data.orders;
            }); 
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
            row.money=row.money.slice(1);
            row.chengben_price=row.chengben_price.slice(1);
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
        },
        sendGoods(row){//--------------发货
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
    margin: 20px;
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
.el-row {
  border-top: 1px dashed #ccc;
}
</style>