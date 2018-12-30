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
        <fieldset style="margin:10px 0;border-color:#fff;text-align:left">
            <legend>查询条件</legend>
            <el-row type="flex" justify="space-around" :gutter="10">
                <el-col style="text-align:left" :span="4">
                    <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search"  size="mini"  placeholder="条码"/>    
                    <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search1"  size="mini"  placeholder="货号"/>    
                    <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search2"  size="mini"  placeholder="名称"/>    
                    <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search3"  size="mini"  placeholder="规格"/>    
                        
                </el-col>
                <el-col style="text-align:left" :span="4">
                    <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search4"  size="mini"  placeholder="品牌"/>    
                    <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search5"  size="mini"  placeholder="分类编码"/>    
                    <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search6"  size="mini"  placeholder="供应商编码"/>    
                    <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search7"  size="mini"  placeholder="供应商名称"/>    
                        
                </el-col>
                <el-col :span="4">
                    <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search8"  size="mini"  placeholder="采购组"/> 
                    <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search9"  size="mini"  placeholder="分店区域"/> 
                    <el-date-picker
                    v-model="search10" size="small"
                    style="width:100%;margin-bottom:5px"
                    type="daterange"
                    align="right"
                    unlink-panels
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                    <el-select v-model="value" size="mini" placeholder="分店标签" style="margin-top:0px;width:100%">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="value1" size="mini" placeholder="类别汇总" style="margin-top:0px;width:100%">
                        <el-option
                        v-for="item in options1"
                        :key="item.value1"
                        :label="item.label"
                        :value="item.value1">
                        </el-option>
                    </el-select>
                    <el-select v-model="value2" size="mini" placeholder="品牌汇总" style="margin-top:5px;width:100%">
                        <el-option
                        v-for="item in options2"
                        :key="item.value2"
                        :label="item.label"
                        :value="item.value2">
                        </el-option>
                    </el-select>
                    <el-select v-model="value3" size="mini" placeholder="ABC类型" style="margin-top:5px;width:100%">
                        <el-option
                        v-for="item in options3"
                        :key="item.value3"
                        :label="item.label"
                        :value="item.value3">
                        </el-option>
                    </el-select>
                    <el-select v-model="value4" size="mini" placeholder="标签" style="margin-top:5px;width:100%">
                        <el-option
                        v-for="item in options4"
                        :key="item.value4"
                        :label="item.label"
                        :value="item.value4">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select style="margin-bottom:5px" v-model="value5" size="small" placeholder="店号">
                        <el-option
                        v-for="item in options5"
                        :key="item.value5"
                        :label="item.label"
                        :value="item.value5">
                        </el-option>
                    </el-select> 
                    <el-select style="margin-bottom:5px" v-model="value6" size="small" placeholder="分公司">
                        <el-option
                        v-for="item in options6"
                        :key="item.value6"
                        :label="item.label"
                        :value="item.value6">
                        </el-option>
                    </el-select> 
                    <el-select style="margin-bottom:5px" v-model="value7" size="small" placeholder="店类型">
                        <el-option
                        v-for="item in options7"
                        :key="item.value7"
                        :label="item.label"
                        :value="item.value7">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" size="small" @click="reset">刷新</el-button><br>
                    <el-button icon="el-icon-tickets"  style="margin-top:5px" type="primary" size="small" @click="dialogShow=true">显示列</el-button>
                </el-col>
            </el-row>            
        </fieldset>

        <!-- <el-input placeholder="请输入商品名称" @input="search" v-model="keywords" style="width:20%;margin-right:10px" size="small">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
        <el-button	size="small" type="primary">导出</el-button>
        <el-button	size="small" type="primary" @click="reset">刷新</el-button> -->
        <!--表单-->
        <el-table
        :data="repertorySearchData.filter(data =>  {
            return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1})})"
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
<style scoped>
    #repertorySearch{
        text-align:center;
        margin: 20px;
    }
    #repertorySearch .main-header{
        text-align:left;
        margin-bottom: 10px;
        padding: 10px;
        background: #fff;
    }
    #repertorySearch .main-header .el-breadcrumb {
        margin: 8px 0 0 10px;
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
    .el-row{
        background:#F3F3F3;
        width:100%;
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
            search:'',
            search1:'',
            search2:'',
            search3:'',
            search4:'',
            search5:'',
            search6:'',
            search7:'',
            search8:'',
            search9:'',
            search10:'',
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
            entryExitData: [],
            value: '' ,
            value1: '' ,
            value2: '' ,
            value3: '' ,
            value4: '' ,
            value5: '' ,
            value6: '' ,
            value7: '' ,
            value8: '' ,
            value9: '' ,
            value10: '' ,
            value11: '' ,
            options: [{
            value: '选项1',
            label: '现金券'
            }, {
            value: '选项2',
            label: '满减券'
            },{
            value: '选项3',
            label: '折扣券' 
            }],  
            options1: [{
            value1: '选项1',
            label: '商品'
            }, {
            value1: '选项2',
            label: '服务'
            },],  
            options2: [{
            value2: '选项1',
            label: '分店1'
            }, {
            value2: '选项2',
            label: '分店2'
            },],  
            options3: [{
            value3: '选项1',
            label: '公司1'
            }, {
            value3: '选项2',
            label: '公司2'
            },],  
            options4: [{
            value4: '选项1',
            label: '标签1'
            }, {
            value4: '选项2',
            label: '标签2'
            },],  
            options5: [{
            value5: '选项1',
            label: '类型1'
            }, {
            value5: '选项2',
            label: '类型2'
            },], 
            options6: [{
            value6: '选项1',
            label: '类型1'
            }, {
            value6: '选项2',
            label: '类型2'
            },], 
            options7: [{
            value7: '选项1',
            label: '未发货'
            }, {
            value7: '选项2',
            label: '已发货'
            },],
        }
    },
    methods:{
        initData() {
            let data =this.$qs.stringify({//----------------- 获取列表
                subsite_id: 3,
                user_id: sessionStorage.user_id,
                page: this.page,
                page_size: this.page_size
            }) ;
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
            getRoomDetail({params:{
                goods_sn:this.goods_sn,
                page:this.page2,
                page_size:this.page_size2
            }}).then(res=>{
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