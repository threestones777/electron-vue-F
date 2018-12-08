<template>
    <div id='codeFollowList'>
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>报表</el-breadcrumb-item>
                <el-breadcrumb-item>串码跟踪表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- <el-input	size="small" v-model="input" placeholder="商品名称/首拼"></el-input>
        <el-input	size="small" v-model="input" placeholder="串码"></el-input>
        <el-select	size="small" v-model="value" placeholder="全部状态">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select> -->
        <el-input placeholder="请输入商品名称" @input="search" v-model="keywords" style="width:20%;margin-right:10px" size="small">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
        <!-- <el-button	size="small" type="primary">导出</el-button> -->
        <el-button	size="small" type="primary" @click="reset">刷新</el-button>
        <!--表单-->
        <el-table
        v-loading="loading"
        :data="codeFollowData"
        border
        :row-style="{height:0}"  
        :cell-style="{padding:0}"
        :header-row-style="{height:0}"  
        :header-cell-style="{padding:0}"
        style="width: 100%">
            <el-table-column
                prop="goods_name"
                align='center'
                label="商品名称">
            </el-table-column>
            <el-table-column
                prop="goods_attr"
                align='center'
                label="辅助属性">
            </el-table-column>
            <el-table-column
                prop="serial_code"
                align='center'
                label="串码">
            </el-table-column>
            <el-table-column
                prop="status"
                align='center'
                label="串码状态">
            </el-table-column>
            <el-table-column
                align='center'
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showDetails(scope.row),dialogDetail = true">详情</el-button>
                    </template>
            </el-table-column>        
        </el-table>
        <!--详情弹窗-->        
        <el-dialog width="50%" title="串码出入库明细" :visible.sync="dialogDetail">
            <!---->            
            <el-row type="flex" justify="space-around">
                <el-col :span="7">
                    商品名称 :<el-input v-model="orderDate" placeholder="无" :disabled="!Boolean(orderDate)"></el-input>
                </el-col>
                <el-col :span="7">
                    辅助属性 :<el-input v-model="orderAttr" placeholder="无" :disabled="!Boolean(orderAttr)"></el-input>
                </el-col>
                <el-col :span="7">
                    串码 :<el-input v-model="orderId" placeholder="无" :disabled="!Boolean(orderId)"></el-input>
                </el-col>
            </el-row>
            <el-table
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            :data="codeFollowDetailsData"
            style="width: 100%">
                <el-table-column
                    prop="add_time"
                    align="center"
                    label="单据时间">
                </el-table-column>
                <el-table-column
                    prop="bill_type"
                    align="center"
                    label="单据类型">
                </el-table-column>
                <el-table-column
                    prop="bill_sn"
                    align="center"
                    label="单据编码">
                </el-table-column>       
            </el-table>
            <!--分页-->
            <el-pagination  
                @current-change="handleCurrentChange"              
                layout="prev, pager, next,jumper"
                :page-count="page">
            </el-pagination>               
        </el-dialog>
        <!--分页显示-->        
        <el-pagination
            @current-change="handleCurrentChange"
            layout="total, prev, pager, next,jumper"
            :total="total"
            :page-size="page_size">
        </el-pagination>        
    </div>
</template>
<script>
import {getSerialformList,getSerialformDetail} from '../../api/api'
export default {
    inject: ['reload'],
    data(){
        return {
            page:1,
            page_size:10,
            total:0,
            loading:true,
            dialogDetail:false,
            keywords:'',
            orderDate:'',
            orderAttr:'',
            orderId:'',
            input:'',
            value:'',
            options: [{
                value: '选项1',
                label: '默认设置'
            }],
            codeFollowData: [],
            codeFollowDetailsData: []
        }
    },
    methods:{
        search() {//-------------------搜索
            getSerialformList({params:{
                page:1,
                page_size:10,
                goods_name:this.keywords
            }}).then(res=>{
                console.log(res)
                if(res.errno == 0) {
                    this.codeFollowData=res.data.serial_list
                    this.total = Number(res.data.record_count)
                    this.loading = false
                }
            })
        }, 
        reset(){
            this.reload();
        },
        initData() { //------------------获取列表
            let data = {
                subsite_id:3,
                user_id:sessionStorage.user_id,
                page:this.page,
                page_size:this.page_size
            }
            getSerialformList({params:data}).then(res=>{
                console.log(res)
                if(res.errno == 0) {
                    this.codeFollowData=res.data.serial_list
                    this.total = Number(res.data.record_count)
                    this.loading = false
                }
            })
        },
        handleCurrentChange(val) {
            this.page = val
            this.initData()
        },
        showDetails(row){
            console.log(row.serial_id);
            getSerialformDetail({params:{serial_id:row.serial_id}}).then(res=>{
                if(res.errno==0) {
                    this.codeFollowDetailsData = res.data.list;
                    this.orderDate = res.data.goods_name
                    this.orderAttr = res.data.orderAttr
                    this.orderId = res.data.serial_code
                }
            })
        } 
    },
    created: function () { 
      this.initData()
    },
}
</script>
<style>
    #codeFollowList{
        text-align:center;
        margin: 20px;
    }
    #codeFollowList .main-header{
        text-align:left;
        margin-bottom: 10px;
        padding: 10px;
        background: #fff;
    }
    #codeFollowList .main-header .el-breadcrumb {
        margin: 8px 0 0 10px;
    }
    #codeFollowList .el-input{
        width:160px;
        margin-top:10px;
    }
    #codeFollowList .el-select{
        width:10%;
    }
    #codeFollowList .el-select>.el-input{
        width:100%;
    }
    #codeFollowList .el-table{
        margin-top:10px;
    }
    #codeFollowList .el-pagination{
        text-align: right;
        margin: 20px 0;
    }
    #codeFollowList .el-pagination__jump .el-input{
        width:50%;
    }
</style>