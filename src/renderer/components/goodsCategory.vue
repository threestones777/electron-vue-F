<template>
    <div class="goodsCategory">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>设置</el-breadcrumb-item>
                <el-breadcrumb-item>商品类别</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <!-- 账户搜索 -->
            <el-form :inline="true" :model="formServe" class="demo-form-inline">
                <el-form-item label="">
                    <el-input v-model="formServe.name" placeholder="分类名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" size="small" @click="serveSearch">搜索</el-button>
                    <el-button type="success" size="small" @click="dialogServeAdd = true">新增</el-button>
                    <el-button type="success" size="small" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form>
            <!-- 新增类别弹出框 -->
            <el-dialog width="450px" title="商品类别新增" :visible.sync="dialogServeAdd">
                <el-form :model="formServeAdd">
                    <el-form-item label="仓库名称">
                        <el-input v-model="formServeAdd.price"></el-input>
                    </el-form-item>
                    <el-form-item label="仓库编码">
                        <el-input v-model="formServeAdd.servePrice"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人">
                        <el-input v-model="formServeAdd.marks"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <el-input v-model="formServeAdd.price"></el-input>
                    </el-form-item>
                    <el-form-item label="仓库地址">
                        <el-input v-model="formServeAdd.servePrice"></el-input>
                    </el-form-item>
                    <el-form-item label="备注信息">
                        <el-input v-model="formServeAdd.marks"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogServeAdd = false">取 消</el-button>
                    <el-button type="primary" @click="dialogServeAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 分类详情弹出框 -->
            <el-dialog width="450px" title="分类详情" :visible.sync="dialogServeDetail">
                <el-form :model="formServeDetail">
                    <el-form-item label="分类名称">
                        <el-input v-model="formServeDetail.price"></el-input>
                    </el-form-item>
                    <el-form-item label="所属分类">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
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
            <!-- 商品分类表格 -->
            <el-table
            :data="categoryData"
            border
            style="width: 100%">
                <el-table-column
                prop="cat_name"
                align="center"
                label="分类名称">
                </el-table-column>
                <el-table-column
                prop="name"
                align="center"
                label="所属分类"
                width="180">
                </el-table-column>
                <el-table-column
                prop="cat_desc"
                align="center"
                label="分类介绍">
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作"
                width="240">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="dialogServeDetail = true">详情</el-button>
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
import axios from 'axios' ;
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
                price:"",
                marks:"",
            },
            categoryData:[],
            options: [{
                value: '选项1',
                label: '默认值'
            }],
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
    },
    mounted: function () { 
        axios.post('http://api.guimishuo1.com/erp/category/lists')
    .then((res) =>{
        console.log(res.data.data);
        for(var i in res.data.data){
            this.categoryData.push(res.data.data[i]);
        }        
            console.log(this.categoryData[0]);
    }, function (error) {
            console.log(error)
        })
    }
}
</script>
<style scoped>
.goodsCategory{
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
