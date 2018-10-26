<template>
    <div class="repertoryManage">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>设置</el-breadcrumb-item>
                <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <!-- 仓库搜索 -->
            <el-form :inline="true" :model="formRepertory" class="demo-form-inline">
                <el-form-item label="仓库名称">
                    <el-input v-model="formRepertory.name" placeholder="仓库名称"></el-input>
                </el-form-item>
                <el-form-item label="仓库编号">
                    <el-input v-model="formRepertory.number" placeholder="仓库编号"></el-input>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input type="tel" v-model="formRepertory.contacts" placeholder="联系人"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input type="tel" v-model="formRepertory.phone" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="tel" v-model="formRepertory.marks" placeholder="备注信息"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" size="small" @click="repertorySearch">搜索</el-button>
                    <el-button type="success" size="small" @click="dialogRepertoryAdd = true">新增</el-button>
                    <el-button type="success" size="small" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form>
            <!-- 新增仓库弹出框 -->
            <el-dialog width="760px" title="仓库新增" :visible.sync="dialogRepertoryAdd">
                <el-form label-position="right" :model="formRepertoryAdd" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="仓库名称">
                                <el-input v-model="formRepertoryAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="仓库编号">
                                <el-input v-model="formRepertoryAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="仓库地址">
                                <el-input v-model="formRepertoryAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="联系人">
                                <el-input v-model="formRepertoryAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系电话">
                                <el-input v-model="formRepertoryAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="备注信息">
                                <el-input v-model="formRepertoryAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogRepertoryAdd = false">取 消</el-button>
                    <el-button type="primary" @click="dialogRepertoryAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 仓库详情弹出框 -->
            <el-dialog width="760px" title="仓库详情" :visible.sync="dialogRepertoryDetail">
                <el-form label-position="right" :model="formRepertoryDetail" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="仓库名称">
                                <el-input v-model="formRepertoryDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="仓库编号">
                                <el-input v-model="formRepertoryDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="仓库地址">
                                <el-input v-model="formRepertoryDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="联系人">
                                <el-input v-model="formRepertoryDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系电话">
                                <el-input v-model="formRepertoryDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="备注信息">
                                <el-input v-model="formRepertoryDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogRepertoryDetail = false">取 消</el-button>
                    <el-button type="primary" @click="dialogRepertoryDetail = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 仓库管理表格 -->
            <el-table
            :data="RepertoryTableData"
            border
            style="width: 100%">
                <el-table-column
                prop="name"
                align="center"
                label="仓库名称">
                </el-table-column>
                <el-table-column
                prop="number"
                align="center"
                label="仓库编号"
                width="180">
                </el-table-column>
                <el-table-column
                prop="contacts"
                align="center"
                label="联系人"
                width="180">
                </el-table-column>
                <el-table-column
                prop="phone"
                align="center"
                label="手机号"
                width="180">
                </el-table-column>
                <el-table-column
                prop="marks"
                align="center"
                label="备注信息">
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作"
                width="240">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="dialogRepertoryDetail = true">详情</el-button>
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
            dialogRepertoryAdd:false,
            dialogRepertoryDetail:false,
            formRepertory:{
                name:"淘宝",
                number:88888888,
                contacts:"马云",
                phone:18888888888,
                marks:"我不喜欢钱,我对钱没有兴趣..."
            },
            formRepertoryAdd:{
                name:""
            },
            formRepertoryDetail:{
                name:""
            },
            RepertoryTableData:[
                {
                name: "淘宝",
                number: "88888888",
                contacts:"马云",
                phone: "18888888888",
                marks: "我不喜欢钱,我对钱没有兴趣..."
                }
            ]
        }
    },
    methods:{
        repertorySearch() {

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
.repertoryManage{
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
  width: 130px;
}

/* 分页器 */
.el-pagination {
  margin-top: 20px;
  text-align: center;
}

/* 新增仓库弹出框 & 仓库详情弹出框*/
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
