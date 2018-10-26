<template>
    <div class="supplierManage">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>设置</el-breadcrumb-item>
                <el-breadcrumb-item>供应商管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <!-- 客户搜索 -->
            <el-form :inline="true" :model="formSupplier" class="demo-form-inline">
                <el-form-item label="供应商名称">
                    <el-input v-model="formSupplier.name" placeholder="供应商名称"></el-input>
                </el-form-item>
                <el-form-item label="客户编号">
                    <el-input v-model="formSupplier.number" placeholder="客户编号"></el-input>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input type="tel" v-model="formSupplier.contacts" placeholder="联系人"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input type="tel" v-model="formSupplier.phone" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="tel" v-model="formSupplier.marks" placeholder="备注信息"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" size="small" @click="supplierSearch">搜索</el-button>
                    <el-button type="success" size="small" @click="dialogSupplierAdd = true">新增</el-button>
                    <el-button type="success" size="small">导入</el-button>
                    <el-button type="success" size="small">导出</el-button>
                    <el-button type="success" size="small" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form>
            <!-- 新增供应商弹出框 -->
            <el-dialog width="760px" title="供应商新增" :visible.sync="dialogSupplierAdd">
                <el-form label-position="right" :model="formSupplierAdd" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="供应商名称">
                                <el-input v-model="formSupplierAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="供应商编号">
                                <el-input v-model="formSupplierAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="供应商地址">
                                <el-input v-model="formSupplierAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="开户名">
                                <el-input v-model="formSupplierAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="开户行">
                                <el-input v-model="formSupplierAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="银行账户">
                                <el-input v-model="formSupplierAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="税号">
                                <el-input v-model="formSupplierAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系人">
                                <el-input v-model="formSupplierAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系电话">
                                <el-input v-model="formSupplierAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="社交账户">
                                <el-input v-model="formSupplierAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="邮箱地址">
                                <el-input v-model="formSupplierAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="备注信息">
                                <el-input v-model="formSupplierAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogSupplierAdd = false">取 消</el-button>
                    <el-button type="primary" @click="dialogSupplierAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 供应商详情弹出框 -->
            <el-dialog width="760px" title="供应商新增" :visible.sync="dialogSupplierDetail">
                <el-form label-position="right" :model="formSupplierDetail" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="供应商名称">
                                <el-input v-model="formSupplierDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="供应商编号">
                                <el-input v-model="formSupplierDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="供应商地址">
                                <el-input v-model="formSupplierDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="开户名">
                                <el-input v-model="formSupplierDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="开户行">
                                <el-input v-model="formSupplierDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="银行账户">
                                <el-input v-model="formSupplierDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="税号">
                                <el-input v-model="formSupplierDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系人">
                                <el-input v-model="formSupplierDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系电话">
                                <el-input v-model="formSupplierDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="社交账户">
                                <el-input v-model="formSupplierDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="邮箱地址">
                                <el-input v-model="formSupplierDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="备注信息">
                                <el-input v-model="formSupplierDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogSupplierDetail = false">取 消</el-button>
                    <el-button type="primary" @click="dialogSupplierDetail = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 供应商管理表格 -->
            <el-table
            :data="supplierTableData"
            border
            style="width: 100%">
                <el-table-column
                prop="name"
                align="center"
                label="供应商名称">
                </el-table-column>
                <el-table-column
                prop="number"
                align="center"
                label="供应商编号"
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
                        <el-button type="text" size="small" @click="dialogSupplierDetail = true">详情</el-button>
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
            dialogSupplierAdd:false,
            dialogSupplierDetail:false,
            formSupplier:{
                name:"淘宝",
                number:88888888,
                contacts:"马云",
                phone:18888888888,
                marks:"我不喜欢钱,我对钱没有兴趣..."
            },
            formSupplierAdd:{
                name:""
            },
            formSupplierDetail:{
                name:""
            },
            supplierTableData:[
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
        supplierSearch() {

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
.supplierManage{
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

/* 新增客户弹出框 & 客户详情弹出框*/
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
