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
            <!-- 搜索 -->
            <el-form :inline="true" :model="formServe" class="demo-form-inline">
                <!-- <el-form-item label="">
                    <el-input	size="small" v-model="formServe.name" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input	size="small" type="tel" v-model="formServe.marks" placeholder="编号"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input	size="small" type="password" placeholder="备注信息"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <el-input placeholder="请输入营业员昵称" @input="search" v-model="keywords" style="width:50%;margin-right:10px" size="small">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                    <el-button type="primary" size="small" @click="dialogServeAdd = true">新增</el-button>
                    <el-button type="primary" size="small" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form>
            <!-- 新增弹出框 -->
            <el-dialog width="450px" title="新增" :visible.sync="dialogServeAdd">
                <el-form :model="formServeAdd">
                    <el-form-item label="昵称">
                        <el-input v-model="formServeAdd.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="职员名">
                        <el-input v-model="formServeAdd.name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="formServeAdd.password"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="formServeAdd.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="formServeAdd.remark"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeAdd = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="add(),dialogServeAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 详情弹出框 -->
            <el-dialog width="450px" title="详情" :visible.sync="dialogServeDetail">
                <el-form :model="formServeDetail">
                    <el-form-item label="职员名">
                        <el-input v-model="formServeDetail.name"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称">
                        <el-input v-model="formServeDetail.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="formServeDetail.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="formServeDetail.remark"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="formServeDetail.password"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeDetail = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="edit(),dialogServeDetail = false">保存修改</el-button>
                </div>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="assistantData"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            style="width: 100%">
                <el-table-column
                prop="id"
                align="center"
                label="员工id">
                </el-table-column>
                <el-table-column
                prop="nickname"
                align="center"
                label="昵称">
                </el-table-column>
                <el-table-column
                prop="name"
                align="center"
                label="账户">
                </el-table-column>
                <el-table-column
                prop="mobile"
                align="center"
                label="手机号码"
                width="180">
                </el-table-column>
                <el-table-column
                prop="remark"
                align="center"
                label="备注信息">
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
import {shopassistant,shopassistantDe,shopassistantEd,shopassistantAdd,shopassistantRmv} from '../../api/apiW' ;
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
            formServeDetail:{
                name:""
            },
            assistantData:[],
        }
    },
    methods:{
        search() {
            let data=this.$qs.stringify({
                nickname:this.keywords
            });
            shopassistant(data).then(res=>{
                this.assistantData=res.data.clerk_list;
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
        edit(){//--------------修改
            let dataE=this.$qs.stringify(this.formServeDetail);
            shopassistantEd(dataE).then(res=>{
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
            console.log("add");
            let dataA=this.$qs.stringify(this.formServeAdd);
            shopassistantAdd(dataA).then(res=>{
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
                shopassistantRmv(data).then(res=>{
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
        shopassistant().then(res=>{
            this.assistantData=res.data.clerk_list;
        });       
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