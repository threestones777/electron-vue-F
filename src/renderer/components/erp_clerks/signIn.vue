<template>
    <div class="Approval">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>职员</el-breadcrumb-item>
                <el-breadcrumb-item>签到</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <!-- 搜索 -->
            <el-form :inline="true" :model="formServe" class="demo-form-inline">
                <el-form-item label="">
                    <el-input @input="chose" size="small" v-model="formServe.name" placeholder="人" prefix-icon="el-icon-search"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-date-picker
                    v-model="formServe.date"
                    type="date" @change="chose" size="small"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <!-- <el-form-item label="">
                    <el-input size="small" type="tel" v-model="formServe.marks" placeholder="备注信息" prefix-icon="el-icon-search"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <!-- <el-button type="primary" size="small" @click="serveSearch">搜索</el-button> -->
                    <el-button type="primary" size="small" @click="add">签到</el-button>
                    <el-button type="primary" size="small" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form>
            <!-- 新增弹出框 -->
            <el-dialog width="450px" title="新增" :visible.sync="dialogServeAdd">
                <el-form :model="formServeAdd">
                    <el-form-item label="编号">
                        <el-input v-model="formServeAdd.price"></el-input>
                    </el-form-item>
                    <el-form-item label="备注信息">
                        <el-input v-model="formServeAdd.servePrice"></el-input>
                    </el-form-item>                    
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogServeAdd = false">取 消</el-button>
                    <el-button type="primary" @click="dialogServeAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 详情弹出框 -->
            <el-dialog width="450px" title="详情" :visible.sync="dialogServeDetail">
                <el-form :model="formServeDetail">
                    <el-form-item label="编号">
                        <el-input v-model="formServeDetail.servePrice"></el-input>
                    </el-form-item>
                    <el-form-item label="编号">
                        <el-input v-model="formServeDetail.servePrice"></el-input>
                    </el-form-item>
                    <el-form-item label="编号">
                        <el-input v-model="formServeDetail.servePrice"></el-input>
                    </el-form-item>
                    <el-form-item label="编号">
                        <el-input v-model="formServeDetail.servePrice"></el-input>
                    </el-form-item>
                    <el-form-item label="备注信息">
                        <el-input v-model="formServeDetail.marks"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogServeDetail = false">取 消</el-button>
                    <el-button type="primary" @click="dialogServeDetail = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="Data"
            border
            style="width: 100%">
                <el-table-column
                prop="sign_in"
                align="center"
                label="签到日期">
                </el-table-column>
                <el-table-column
                prop="format_sign_in"
                align="center"
                label="签到时间">
                </el-table-column>
                <el-table-column
                prop="sign_back"
                align="center"
                label="签退日期">
                </el-table-column>
                <el-table-column
                prop="format_sign_back"
                align="center"
                label="签退时间">
                </el-table-column>
                <el-table-column
                prop="clerk_name"
                align="center"
                label="签到人">
                </el-table-column>
                <!-- <el-table-column
                fixed="right"
                align="center"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showDetails(scope.row),dialogServeDetail = true">详情</el-button>
                        <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, Data)">删除</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
            <!-- 分页器 -->
            <el-pagination
                @current-change="handleCurrentChange"
                layout="total,prev, pager, next,jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {signIn,signList} from '../../api/api' ;
export default {
    inject:['reload'],
    data() {
        return {
            page:1,
            total:1,
            dialogServeAdd:false,
            dialogServeDetail:false,
            formServe:{
                name:"",
                date:""
            },
            formServeAdd:{
                name:""
            },
            formServeDetail:{
                name:""
            },
            Data:[],
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
            signList(data).then(res=>{
                this.total = Number(res.data.record_count);
                for(let i=0;i<res.data.sign_list.length;i++){
                    res.data.sign_list[i].sign_in=new Date(res.data.sign_list[i].sign_in*1000).toLocaleDateString().replace(/\//g,'-');
                    res.data.sign_list[i].sign_back=new Date(res.data.sign_list[i].sign_back*1000).toLocaleDateString().replace(/\//g,'-');
                    console.log(res.data.sign_list[i].sign_in);
                };
                this.Data=res.data.sign_list;
            });  
        },
        chose(){
            let data=this.$qs.stringify({
                page:1,
                page_size:10,
                clerk_name:this.formServe.name,
                sign_in:this.formServe.date,
            });
            this.data(data);
        },
        add(){//--------------------签到
            signIn().then(res=>{
                console.log(res.data);
                if(res.errno==0){
                    this.$message({
                        type: "success",
                        message: res.errmsg,
                        duration: 1000
                    });
                    this.init(1);
                }
            });
        },
        serveSearch() {
            console.log("开启搜索");
        },        
        reset() {
            this.reload();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);          
        },
        showDetails(row){
            console.log(row);
        },
        deleteRow(index, rows) {
            rows.splice(index, 1);
        }
    },
    mounted: function () {  
           this.init(1);
    }
}
</script>
<style scoped>
.Approval{
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