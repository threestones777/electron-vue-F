<template>
    <div class="ticketPrinter">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>硬件</el-breadcrumb-item>
                <el-breadcrumb-item>小票打印机</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <div class="print-t">
                <el-button type="success" size="small" @click="add">新增</el-button>
                <el-button type="success" size="small" @click="reset">刷新</el-button>
            </div>
            <!-- 详情/新增弹出框 -->
            <el-dialog width="880px" title="打印机信息" :visible.sync="dialogServeDetail">
                <el-form label-position="left" ref="form" :model="formServeDetail" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="打印机编号">
                                <el-input disabled v-model="formServeDetail.printer_id" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="自定义编号">
                                <el-input v-model="formServeDetail.origin_id" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="分站名称">
                                <el-input disabled v-model="formServeDetail.subsite_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="连锁店名称">
                                <el-select v-model="formServeDetail.subshop_id" clearable placeholder="请选择">
                                    <el-option
                                    v-for="(v,i) in options"
                                    :key="i"
                                    :label="v.subshop_name"
                                    :value="v.subshop_id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="终端号">
                                <el-input v-model="formServeDetail.access_token" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="密钥">
                                <el-input v-model="formServeDetail.machine_code" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="是否在线" class="radio">
                                <el-radio-group v-model="formServeDetail.is_online">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="是否可用" class="radio">
                                <el-radio-group v-model="formServeDetail.is_available">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="时间">
                                <el-input disabled v-model="formServeDetail.time" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="选择模板">
                                <el-input v-model="formServeDetail.template_id" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogServeDetail = false">取 消</el-button>
                    <el-button type="primary" @click="editDone('form')">保存</el-button>
                </div>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="Data"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            v-loading="loading"
            style="width: 100%">
                <el-table-column
                prop="printer_id"
                align="center"
                width="70"
                label="打印机编号">
                </el-table-column>
                <el-table-column
                prop="origin_id"
                align="center"
                width="70"
                label="自定义编号">
                </el-table-column>
                <el-table-column
                prop="subsite_name"
                align="center"
                label="分站名称">
                </el-table-column>
                <el-table-column
                prop="subshop_name"
                align="center"
                label="连锁店名称">
                </el-table-column>
                <el-table-column
                prop="access_token"
                align="center"
                label="终端号">
                </el-table-column>
                <el-table-column
                prop="machine_code"
                align="center"
                label="密钥">
                </el-table-column>
                <el-table-column
                prop="is_online"
                align="center"
                width="60"
                label="是否在线">
                <template slot-scope="scope">
                    {{scope.row.is_online==1?"是":"否"}}
                </template>
                </el-table-column>
                <el-table-column
                prop="is_available"
                align="center"
                width="60"
                label="是否可用">
                <template slot-scope="scope">
                    {{scope.row.is_online==1?"是":"否"}}
                </template>
                </el-table-column>
                <el-table-column
                prop="time"
                align="center"
                label="时间">
                </el-table-column>
                <el-table-column
                prop="template_id"
                align="center"
                label="选择模板">
                <template slot-scope="scope">
                    已选择{{scope.row.template_id}}号模板
                </template>
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                width="90"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showDetails(scope.row),dialogServeDetail = true">详情</el-button>
                        <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <!-- <el-pagination
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next,jumper"
                :total="total"
                :page-size="page_size">
            </el-pagination> -->
        </div>
    </div>
</template>
<script>
import { getHardwareprintList,addHardwareprint,editHardwareprint } from "../../api/api";
export default {
    data() {
        return {
            loading: true,
            isEdit:false,
            dialogServeDetail:false,
            options:[],
            formServeDetail:{},
            Data:[],
        }
    },
    methods:{
        initData() {
            // 获取列表
            let data = this.$qs.stringify({
                subsite_id: 3,
                user_id: sessionStorage.user_id,
                // page: this.page,
                // page_size: this.page_size
            });
            getHardwareprintList(data).then(res => {
                console.log(res.data);
                if (res.errno == 0) {
                this.Data = res.data.list;
                this.options = res.data.subshop;
                this.total = Number(res.data.record_count);
                this.loading = false;
                }
            });
        },
        add() {
            this.isEdit = false;
            this.formServeDetail = {};
            if (this.$refs.form) {
                this.$refs.form.resetFields();
            }
            this.dialogServeDetail = true;
        },
        editDone(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                if (this.isEdit) {
                    console.log(this.formServeDetail)
                    this.formServeDetail.id = this.formServeDetail.printer_id
                    this.formServeDetail.time = parseInt(+new Date() / 1000);
                    let tmpData = this.$qs.stringify(this.formServeDetail);
                    editHardwareprint(tmpData).then(res => {
                        console.log(res)
                    if (res.errno == 0) {
                        this.$message({
                        type: "success",
                        message: "修改成功!",
                        duration: 1000
                        });
                        this.initData();
                    } else {
                        this.$message({
                        type: "error",
                        message: res.errmsg,
                        duration: 1000
                        });
                        this.initData()
                    }
                    this.dialogServeDetail = false;
                    });
                } else {
                    let tmpData = this.$qs.stringify(this.formServeDetail);
                    addHardwareprint(tmpData).then(res => {
                    if (res.errno == 0) {
                        this.$message({
                        type: "success",
                        message: "添加成功!",
                        duration: 1000
                        });
                        this.initData();
                    } else {
                        this.$message({
                        type: "error",
                        message: res.errmsg,
                        duration: 1000
                        });
                    }
                    this.dialogServeDetail = false;
                    });
                }
                }
            });
        },
        reset() {
            this.initData()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);          
        },
        showDetails(row){
            this.isEdit = true
            delete row.is_delete
            this.formServeDetail = row
            console.log(row)
        },
        deleteRow(index, rows) {
        this.$confirm("即将执行删除操作, 确认删除吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        })
            .then(() => {
            console.log(rows.printer_id);
            let tmpData = this.$qs.stringify({ is_delete: 1, id: rows.printer_id});
            editHardwareprint(tmpData).then(res => {
                if (res.errno == 0) {
                this.$message({
                    type: "success",
                    message: "删除成功!",
                    duration: 1000
                });
                this.initData();
                } else {
                this.$message({
                    type: "error",
                    message: res.errmsg,
                    duration: 1000
                });
                }
            });
            })
            .catch(res => {
            console.log("用户取消删除");
            });
        }
    },
    mounted: function () {  
        this.initData()
    }
}
</script>
<style scoped>
.ticketPrinter{
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
.print-t {
    display: flex;
    margin: 6px 10px;
    justify-content: space-between;
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
.main-table >>> .el-dialog__body .el-form-item__content {
    width: 180px;
    text-align: right;
}
.main-table >>> .el-dialog__body .el-form-item {
    width: 100%;
    display: flex;
    margin-bottom: 0;
    justify-content: flex-end;
}
.main-table >>> .el-dialog__body .el-form-item .el-form-item__label {
    flex: 1;
    box-sizing: border-box;
    padding: 0;
    padding-left: 10px;
    text-align: left;
}
.main-table >>> .el-dialog__body .el-form-item.radio .el-form-item__content {
    text-align: left;
}
.main-table>>>.el-dialog__body .el-date-editor,
.main-table>>>.el-dialog__body .el-input-number {
    width: 100%;
}
.el-row {
  border-top: 1px dashed #ccc;
}
</style>