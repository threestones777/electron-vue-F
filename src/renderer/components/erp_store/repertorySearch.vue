<template>
    <div id='repertorySearch'>
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>仓库</el-breadcrumb-item>
                <el-breadcrumb-item>库存查询</el-breadcrumb-item>
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
        :data="repertorySearchData"
        v-loading="loading"
        border
        :row-style="{height:0}"  
        :cell-style="{padding:0}"
        :header-row-style="{height:0}"  
        :header-cell-style="{padding:0}"
        style="width: 100%">
            <el-table-column
                prop="goods_thumb"
                align="center"
                label="商品图像">
                <template slot-scope="scope">
                    <img style="width:80px" :src="scope.row.goods_thumb">
                </template>
            </el-table-column>
            <el-table-column
                prop="goods_name"
                align="center"
                show-overflow-tooltip
                label="商品名称	">
            </el-table-column>
            <el-table-column
                prop="goods_sn"
                align="center"
                label="商品串码">
            </el-table-column>
            <el-table-column
                prop="pId"
                align="center"
                label="辅助属性">
            </el-table-column>
            <el-table-column
                prop="store_name"
                align="center"
                show-overflow-tooltip
                label="所属仓库">
                <template slot-scope="scope">
                    <span v-html="scope.row.store_name"></span>
                </template>
            </el-table-column>
            <el-table-column
                prop="stock_id"
                align="center"
                label="仓库货品id">
            </el-table-column>
            <el-table-column
                prop="pRemark"
                align="center"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showDetails(scope.row),dialogVisible = true">详情</el-button>
                    </template>
            </el-table-column>        
        </el-table>
        <!--弹窗-->        
        <el-dialog
            title="库存查询"
            :visible.sync="dialogVisible">
            <el-input	size="small" v-model="input" placeholder="开始时间"></el-input>
            <el-input	size="small" v-model="input" placeholder="结束时间"></el-input>
            <el-select	size="small" v-model="value" placeholder="单据类型">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button	size="small" type="primary">导出</el-button>
            <el-button	size="small" type="primary">刷新</el-button>  
            <el-table
                :data="entryExitData"
                v-loading="loading2"
                border
                max-height="400px"
                :row-style="{height:0}"  
                :cell-style="{padding:0}"
                :header-row-style="{height:0}"  
                :header-cell-style="{padding:0}"
                style="width: 100%;overflow:auto">
                <el-table-column
                    prop="book_id"
                    align="center"
                    label="序时簿id">
                </el-table-column>
                <el-table-column
                    prop="goods_name"
                    align="center"
                    show-overflow-tooltip
                    label="商品名称">
                </el-table-column>
                <el-table-column
                    prop="goods_sn"
                    align="center"
                    label="商品货号">
                </el-table-column>
                <el-table-column
                    prop="store_name"
                    align="center"
                    show-overflow-tooltip
                    label="库房名称">
                </el-table-column>
                <el-table-column
                    prop="inout_sn"
                    align="center"
                    label="出入库单号">
                </el-table-column>
                <el-table-column
                    prop="order_sn"
                    align="center"
                    label="关联订单号">
                </el-table-column>
                <el-table-column
                    prop="takegoods_man"
                    align="center"
                    label="提/交货人">
                </el-table-column>
                <el-table-column
                    prop="add_time"
                    align="center"
                    label="出入库日期">
                </el-table-column>
                <el-table-column
                    prop="number_shishou"
                    align="center"
                    label="出入库数	">
                </el-table-column>
                <el-table-column
                    prop="number_stock"
                    align="center"
                    label="库存数量">
                </el-table-column>
            </el-table>
            <el-pagination
                @current-change="handleCurrentChangeD"
                layout="total,prev, pager, next,jumper"
                :page_size="page_size2"
                :total="total2">
            </el-pagination> 
        </el-dialog>
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
    #repertorySearch{
        text-align:center;
        margin: 20px;
    }
    #repertorySearch .main-header{
        text-align:left;
        margin-bottom: 10px;
    }
    #repertorySearch .el-input{
        width:160px;
        margin-right:10px;
    }
    #repertorySearch .el-select{
        width:150px;
    }
    #repertorySearch .el-select>.el-input{
        width:100%;
    }
    #repertorySearch .el-table{
        margin-top:20px;
    }
    #repertorySearch .el-pagination{
        text-align: right;
        margin: 20px 0;
    }
    #repertorySearch .el-pagination__jump .el-input{
        width:50%;
    }
</style>
<script>
import axios from 'axios' ;
import { getRoomList, getRoomDetail } from "../../api/api";
export default {
    inject: ['reload'],
    data(){
        return {
            input:'',
            value:'',
            dialogVisible:false,
            keywords:'',
            options: [{
                value: '选项1',
                label: '默认设置'
            }],
            page: 1,
            page_size: 10,
            total: 0,
            loading: true,
            page2: 1,
            page_size2: 10,
            total2: 0,
            loading2: true,
            repertorySearchData: [],
            entryExitData: []
        }
    },
    methods:{
        search() {
            let data=this.$qs.stringify({
                goods_name:this.keywords
            });
            getRoomList(data).then(res => {
                console.log(res.data);
                if (res.errno == 0) {
                    this.repertorySearchData = res.data.stock_list.arr
                    this.total = Number(res.data.stock_list.record_count);
                    this.loading = false;
                }
            });
        }, 
        initData() {
        // 获取列表
            let data = {
                subsite_id: 3,
                user_id: sessionStorage.user_id,
                page: this.page,
                page_size: this.page_size
            }
            getRoomList(data).then(res => {
                console.log(res.data);
                if (res.errno == 0) {
                    this.repertorySearchData = res.data.stock_list.arr
                    this.total = Number(res.data.stock_list.record_count);
                    this.loading = false;
                }else {
                    this.$message({
                        type: "error",
                        message: res.errmsg,
                        duration: 1000
                    });
                    this.loading = false;
                }
            });
        },
        initDetail() {
            let data = {
                goods_sn:this.goods_sn,
                page:this.page2,
                page_size:this.page_size2
            }
            getRoomDetail({params:data}).then(res=>{
                console.log(res)
                if(res.errno==0) {
                    this.entryExitData=res.data.arr;
                    this.total2 = Number(res.data.record_count);
                    this.loading2 = false;
                }else {
                    this.$message({
                        type: "error",
                        message: res.errmsg,
                        duration: 1000
                    });
                    this.loading2 = false;
                }
            })
        },
        reset() {
            this.reload()
        },
        handleCurrentChange(val) {
            this.page = val;
            this.initData();
        },
        handleCurrentChangeD(val) {
            this.page2 = val;
            this.initDetail();
        },
        showDetails(row){//---------------详情点击事件
            this.goods_sn = row.goods_sn
            this.initDetail()
        }
    },
    created() {
        this.initData();
    }
}
</script>