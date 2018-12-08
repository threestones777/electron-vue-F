<template>
    <div class="dataAuthorize">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>设置</el-breadcrumb-item>
                <el-breadcrumb-item>数据授权</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <!-- 账户搜索 -->
            <el-form :inline="true" :model="formServe" class="demo-form-inline">
                <!-- <el-form-item label="">
                    <el-input	size="small" v-model="formServe.name" placeholder="职员名称"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input	size="small" v-model="formServe.name" placeholder="职员账户"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <el-input placeholder="请输入职员名称" @input="search" v-model="keywords" style="width:60%;margin-right:10px" size="small">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                    <el-button type="primary" size="small" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form>
            <!-- 详情弹出框 -->
            <el-dialog width="450px" title="数据授权详情" :visible.sync="dialogServeDetail">
                <el-form :model="formServeDetail">
                    <el-form-item label="客户">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="供应商">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="仓库">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="制单人">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="资金账户">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeDetail = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="dialogServeDetail = false">保存</el-button>
                </div>
            </el-dialog>
            <!-- 数据授权表格 -->
            <el-table
            :data="dataA"
            border
            v-loading="loading"
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
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next,jumper"
                :total="total"
                :page-size="page_size">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {getWorkerList} from '../../api/api'
export default {
    data() {
        return {
            page:1,
            page_size:10,
            total:0,
            loading:true,
            dialogServeAdd:false,
            dialogServeDetail:false,
            keywords:'',
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
            dataA:[],
            options: [{
                value: '选项1',
                label: '默认值'
            }],
        }
    },
    methods:{
        initData() { // 获取职员列表
            let data = {
                subsite_id:3,
                user_id:sessionStorage.user_id,
                page:this.page,
                page_size:this.page_size
            }
            getWorkerList({params:data}).then(res=>{
                console.log(res)
                if(res.errno == 0) {
                    this.dataA=res.data.clerk_list
                    this.total = Number(res.data.record_count)
                    this.loading = false
                }
            })
        },
        search() {
            let data=this.$qs.stringify({
                page:1,
                page_size:10,
                nickname:this.keywords
            });
            getWorkerList(data).then(res=>{
                console.log(res)
                if(res.errno == 0) {
                    this.dataA=res.data.clerk_list
                    this.total = Number(res.data.record_count)
                    this.loading = false
                }
            })
        }, 
        ServeSearchIn() {
            console.log("submit!");
        },
        reset() {

        },
        handleSizeChange(val) {
            this.page = val
           this.initData()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
        
    },
    created() {
        this.initData()
    }
}
</script>
<style scoped>
/* 头部面包屑 */
.dataAuthorize{
    margin: 20px;
}
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
