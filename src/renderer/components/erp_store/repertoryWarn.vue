<template>
    <div id='repertoryWarn'>
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>仓库</el-breadcrumb-item>
                <el-breadcrumb-item>库存预警</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- <el-input	size="small" v-model="input" placeholder="商品名称"></el-input>
        <el-input	size="small" v-model="input" placeholder="商品编号"></el-input>
        <el-select	size="small" v-model="value" placeholder="所属仓库">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-input	size="small" v-model="input" placeholder="全部分类"></el-input> -->
        <el-input placeholder="请输入商品名称" @input="search" v-model="keywords" style="width:20%;margin-right:10px" size="small">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
        <el-button	size="small" type="primary">导出</el-button>
        <el-button	size="small" type="primary" @click="reset">刷新</el-button>
        <!--表单-->
        <el-table
        :data="repertoryWarnData"
        border
        :row-style="{height:0}"  
        :cell-style="{padding:0}"
        :header-row-style="{height:0}"  
        :header-cell-style="{padding:0}"
        max-height="700"
        v-loading="loading"
        style="width: 100%">
            <el-table-column
                show-overflow-tooltip
                prop="goods_name"
                label="商品名称	">
            </el-table-column>
            <el-table-column
                prop="pId"
                label="辅助属性">
            </el-table-column>
            <el-table-column
                prop="store_name"
                label="所属仓库	">
            </el-table-column>
            <el-table-column
                prop="goods_number"
                label="库存数量">
            </el-table-column>
            <el-table-column
                prop="goods_sn"
                label="商品串码">
            </el-table-column>
            <el-table-column
                prop=""
                label="商品批次">
            </el-table-column>
            <el-table-column
                prop="stock_id"
                label="商品编号">
            </el-table-column>
            <el-table-column
                prop=""
                label="商品分类">
            </el-table-column>
            <el-table-column
                prop=""
                label="商品单位">
            </el-table-column>
            <el-table-column
                prop=""
                label="商品货拉">
            </el-table-column>
            <el-table-column
                prop="warn_number"
                label="库存预警">
            </el-table-column>     
        </el-table>
        <!--分页显示-->        
        <el-pagination
            @current-change="handleCurrentChange"
            layout="total,prev, pager, next,jumper"
            :page_size="page_size"
            :total="total">
        </el-pagination>        
    </div>
</template>
<style>
    #repertoryWarn{
        text-align:center;
        margin: 20px;
    }
    #repertoryWarn .main-header{
        text-align:left;
        margin-bottom: 10px;
    }
    #repertoryWarn .el-input{
        width:10%;
    }
    #repertoryWarn .el-select{
        width:10%;
    }
    #repertoryWarn .el-select>.el-input{
        width:100%;
    }
    #repertoryWarn .el-table{
        margin-top:20px;
    }
    #repertoryWarn .el-pagination{
        text-align: right;
        margin: 20px 0;
    }
    #repertoryWarn .el-pagination__jump .el-input{
        width:50%;
    }
</style>
<script>
import { getRoomwarningList } from "../../api/api";
export default {
    inject: ['reload'], 
    data(){
        return {
            input:'',
            value:'',
            page: 1,
            page_size: 10,
            loading: true,
            keywords:'',
            total: 0,
            options: [{
                value: '选项1',
                label: '默认设置'
            }],
            repertoryWarnData: []
        }
    },
    methods:{
        reset(){
            this.reload();
        },
        search() {
            getRoomwarningList({params:{goods_name:this.keywords}}).then(res => {
                console.log(res.data);
                if (res.errno == 0) {
                this.repertoryWarnData = res.data.stock_list.arr;
                this.total = Number(res.data.stock_list.record_count);
                this.loading = false;
                }
            });
        },
        initData() {//----------------------------------获取列表
        let data = {
            subsite_id: 3,
            user_id: sessionStorage.user_id,
            page: this.page,
            page_size: this.page_size
        };
            getRoomwarningList({params:data}).then(res => {
                console.log(res.data);
                if (res.errno == 0) {
                this.repertoryWarnData = res.data.stock_list.arr;
                this.total = Number(res.data.stock_list.record_count);
                this.loading = false;
                }
            });
        },
        handleCurrentChange(val) {
            this.page = val;
            this.initData();
        }
    },
    created() {
        this.initData();
    }
}
</script>