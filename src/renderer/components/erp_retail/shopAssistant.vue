<template>
    <div class="shopAssistant">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>零售</el-breadcrumb-item>
                <el-breadcrumb-item>营业员</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <div style="margin:10px 0;text-align:center">
                <el-button icon="el-icon-tickets"  style="float:right;margin-right:20px" type="primary" size="small" @click="dialogShow=true">显示列</el-button>
                <el-input  prefix-icon="el-icon-search" style="width:15%" v-model="search"  size="mini"  placeholder="输入关键字搜索"/>
                <el-button type="primary" size="small" @click="dialogServeAdd=true" icon="el-icon-plus"></el-button>
                <el-button type="primary" size="small" @click="reset">刷新</el-button>
            </div>
            <!-- 按需选择列弹窗 -->
            <el-dialog
            title="按需选择列" style="text-align:left"
            :visible.sync="dialogShow"
            :before-close="handleClose"
            width="200px">
                <el-checkbox v-model="shopAssistantshow.show1">员工id</el-checkbox><br>
                <el-checkbox v-model="shopAssistantshow.show2">昵称</el-checkbox><br>
                <el-checkbox v-model="shopAssistantshow.show3">职员名</el-checkbox><br>
                <el-checkbox v-model="shopAssistantshow.show4">手机号码</el-checkbox><br>
                <el-checkbox v-model="shopAssistantshow.show5">密码</el-checkbox><br>
                <el-checkbox v-model="shopAssistantshow.show6">备注信息</el-checkbox><br><br>
            </el-dialog>   
            <!-- 新增弹出框 -->
            <el-dialog width="450px" title="新增" :visible.sync="dialogServeAdd">
                <el-form :model="formServeAdd">
                    <el-form-item label="手机号">
                        <el-input v-model="formServeAdd.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称">
                        <el-input v-model="formServeAdd.nickname"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeAdd = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="add(),dialogServeAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="assistantData.filter(data =>  {
            return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1})})"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:3}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            style="width: 100%">
                <el-table-column
                prop="id"
                v-if="shopAssistantshow.show1"
                align="center"
                label="员工id">
                </el-table-column>
                <el-table-column
                prop="nickname"
                v-if="shopAssistantshow.show2"
                align="center"
                label="昵称">
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shopAssistantshow.show3"
                label="职员名">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.name"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shopAssistantshow.show4"
                label="手机号码">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.mobile"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shopAssistantshow.show5"
                label="密码">
                    <template slot-scope="scope">
                        <input type="password" v-model="scope.row.password"/>
                        <el-button type="text" icon="el-icon-view" style="position:absolute;bottom:15%;left:70%;" @click="showPwd"></el-button>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="shopAssistantshow.show6"
                label="备注信息">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.remark"/>
                    </template>
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
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
import {shopassistant,shopassistantDe,shopassistantEd,shopassistantAdd,shopassistantRmv} from '../../api/apiW' ;
export default {
    inject: ['reload'],
    data() {
        return {
            recordPage:1,
            pages:1,
            dialogServeAdd:false,
            dialogServeDetail:false,
            dialogShow:false,
            search:'',
            record_count:0,
            formServeAdd:{
                mobile:"",
                password:"",
                remark:"",
            },
            formServeDetail:{},
            assistantData:[],
            shopAssistantshow:{
                show1:true,
                show2:true,
                show3:true,
                show4:true,
                show5:true,
                show6:true,
            },
        }
    },
    methods:{
        init(page){//-----------------初始化数据
            let data=this.$qs.stringify({
                page:page,
                page_size:10,
            }); 
            shopassistant(data).then(res=>{
                this.record_count=Number(res.data.filter.record_count);
                this.assistantData=res.data.clerk_list;
            }); 
        }, 
        showPwd(){
            console.log(event.currentTarget.previousElementSibling);
            let pwd=event.currentTarget.previousElementSibling;
            pwd.type=="text"?pwd.type="password":pwd.type="text";
        },
        handleClose(done) {
            done();
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            erpTableSetting.shopAssistant=this.shopAssistantshow;
            localStorage.erpTableSetting=JSON.stringify(erpTableSetting);
        },
        /* search() {
            let data=this.$qs.stringify({
                nickname:this.keywords
            });
            shopassistant(data).then(res=>{
                this.assistantData=res.data.clerk_list;
            });
        },  */        
        reset() {
            this.reload();
        },
        handleCurrentChange(val) {
            this.init(val);  
            this.recordPage=val;    
        },
        showDetails(row){//------------------------详情
            console.log(row.id);
            let dataD = this.$qs.stringify({
                id:row.id,
            });
            shopassistantDe(dataD).then(res=>{
                if(res.errno==0){
                    console.log(res.data);
                    this.formServeDetail=res.data;
                }else{
                    this.dialogServeDetail=false;
                    alert("您查找的用户不存在");
                }
            });

        },
        edit(row){//--------------修改
            let dataE=this.$qs.stringify(row);
            shopassistantEd(dataE).then(res=>{
                console.log(res.errno);
                if(res.errno==0){
                    this.$message({
                        type: "success",
                        message: res.errmsg,
                        duration: 1000
                    });
                    this.init(this.recordPage);
                }else{
                    this.$message({
                        type: "error",
                        message: res.errmsg,
                        duration: 1000
                    });
                    this.init(this.recordPage);
                }
            })
        },
        add(){//--------------添加
            let dataA=this.$qs.stringify(this.formServeAdd);
            shopassistantAdd(dataA).then(res=>{
                if(res.errno==0){
                    this.$message({
                        type: "success",
                        message: res.data.message,
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
        deleteRow(row) {//--------------删除
            let Message=confirm("确定删除此行数据？");
            if(Message){
                let data=this.$qs.stringify({
                    id:row.id,
                    is_delete:1
                }); 
                shopassistantRmv(data).then(res=>{
                    if(res.errno==0){
                        this.$alert(res.errmsg);
                        this.reload();
                    }else{
                        this.$alert(res.errmsg);
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
            if(erpTableSetting.shopAssistant!==undefined){
                this.shopAssistantshow=erpTableSetting.shopAssistant;
            }
        }else{
            console.log("no");
        };
        this.init(this.recordPage);       
    }
}
</script>
<style scoped>
.shopAssistant{
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
.el-table .el-input >>> .el-input__inner{
    border:none;
    text-align:center;
}
/* 分页器 */
.el-pagination {
  padding: 20px 0;
  text-align: right;
}
.el-table input{
    width:100%;
    height:34px;
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