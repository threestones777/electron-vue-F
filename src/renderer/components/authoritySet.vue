<template>
    <div class="authoritySet">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>设置</el-breadcrumb-item>
                <el-breadcrumb-item>权限设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <!-- 账户搜索 -->
            <el-form :inline="true" :model="formServe" class="demo-form-inline">
                <el-form-item label="">
                    <el-input v-model="formServe.name" placeholder="职员名称"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="formServe.name" placeholder="职员账户"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" size="small" @click="serveSearch">搜索</el-button>
                    <el-button type="success" size="small" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form>
            <!-- 权限选择弹出框 -->
            <el-dialog width="80%" title="选择客户" :visible.sync="dialogServeDetail">
                  <el-table
                    :data="tableData3"
                    style="width: 100%">
                    <el-table-column
                    prop="name"
                    align="center"
                    label="功能名称">
                    </el-table-column>
                    <el-table-column
                    label="新增" align="center">
                        <template slot-scope="scope"> <div v-html="scope.row.html"></div></template>
                    </el-table-column>
                    <el-table-column
                    label="删除" align="center">
                        <template slot-scope="scope"> <div v-html="scope.row.html"></div></template>
                    </el-table-column>
                    <el-table-column
                    label="修改" align="center">
                        <template slot-scope="scope"> <div v-html="scope.row.html"></div></template>
                    </el-table-column>
                    <el-table-column
                    label="报表" align="center">
                        <template slot-scope="scope"> <div v-html="scope.row.html"></div></template>
                    </el-table-column>
                    <el-table-column
                    label="审核" align="center">
                        <template slot-scope="scope"> <div v-html="scope.row.html"></div></template>
                    </el-table-column>
                </el-table>
            </el-dialog>
            <!-- 权限设置表格 -->
            <el-table
            :data="setData"
            border
            style="width: 100%">
                <el-table-column
                prop="nickname"
                align="center"
                label="职员名称">
                </el-table-column>
                <el-table-column
                prop="name"
                align="center"
                label="职员账户">
                </el-table-column>
                <el-table-column
                prop="mobile"
                align="center"
                label="手机号码">
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作"
                width="240">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="dialogServeDetail = true">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="200">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import axios from 'axios' 
export default {
    data() {
        return {
            dialogServeAdd:false,
            dialogServeDetail:false,
            value:'',
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
            setData:[],
            options: [{
                value: '选项1',
                label: '默认值'
            }],
            tableData3: [
                {
                name: '购货单',
                html:'<input type="checkbox"/>',
                },
                
            ]
        }
    },
    methods:{
        serveSearch() {

        },
        ServeSearchIn() {
            console.log("submit!");
        },
        reset() {

        },
        handleSizeChange(val) {
            console.log(`每页 ${val}条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    },
    mounted: function () { 
    axios.post('http://api.guimishuo1.com/erp/clerk/lists')
    .then((res) =>{
      console.log(res.data.data.clerk_list);
      this.setData=res.data.data.clerk_list;
    }, function (error) {
      console.log(error)
    })
  },
}
</script>
<style scoped>
.authoritySet{
    margin:20px;
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
  text-align: center;
}

/* 新增账户弹出框 & 账户详情弹出框*/
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
