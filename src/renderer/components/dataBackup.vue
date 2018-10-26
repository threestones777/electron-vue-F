<template>
    <div class="dataBackup">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>设置</el-breadcrumb-item>
                <el-breadcrumb-item>数据备份</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <!-- 账户搜索 -->
            <el-form :inline="true" :model="formServe" class="demo-form-inline">
                <el-form-item>
                    <el-button type="success" size="small">数据备份</el-button>
                    <el-button type="success" size="small">说明</el-button>
                    <el-button type="success" size="small">刷新</el-button>
                </el-form-item>
            </el-form>
            <!-- 服务管理表格 -->
            <el-table
            :data="ServeTableData"
            border
            style="width: 100%">
                <el-table-column
                prop="name"
                align="center"
                label="备份时间">
                </el-table-column>
                <el-table-column
                prop="marks"
                align="center"
                label="文件名称">
                </el-table-column>
                <el-table-column
                prop="marks"
                align="center"
                label="文件大小">
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作"
                width="240">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">恢复</el-button>
                        <el-button type="text" size="small">删除</el-button>
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
export default {
    data() {
        return {
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
            ServeTableData:[
                {
                name: "text",
                number: "text",
                contacts:"text",
                phone: "text",
                marks: "text"
                }
            ],
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
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    }
}
</script>
<style scoped>
.dataBackup{
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
