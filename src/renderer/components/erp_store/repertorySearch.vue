<template>
    <div id='repertorySearch'>
        <div class="main-header">
            <!-- <h3>温州美联 管理中心</h3> -->
            <el-breadcrumb style="font-size:18px" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>仓库</el-breadcrumb-item>
                <el-breadcrumb-item>库存查询</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="operate-in">
                <!-- <div>
                <i class="el-icon-circle-plus"></i>
                <div>增加</div>
                </div>
                <div>
                <i class="el-icon-edit"></i>
                <div>编辑</div>
                </div>
                <div>
                <i class="el-icon-remove"></i>
                <div>删除</div>
                </div>
                <div>
                <i class="el-icon-circle-check"></i>
                <div>保存</div>
                </div>
                <div>
                <i class="el-icon-circle-close"></i>
                <div>取消</div>
                </div>
                <div>
                <i class="el-icon-view"></i>
                <div>审核</div>
                </div> 
                <div class="card">
                <i class="el-icon-search"></i>
                <div>查询</div>
                </div>
                <div class="card">
                <i class="el-icon-setting"></i>
                <div>功能</div>
                <b class="el-icon-caret-bottom"></b>
                </div>
                <div class="card">
                <i class="el-icon-printer"></i>
                <div>打印</div>
                <b class="el-icon-caret-bottom"></b>
                </div>
                <div class="card">
                <i class="el-icon-menu"></i>
                <div>设置</div>
                </div>
                <div class="card">
                <i class="el-icon-zoom-in"></i>
                <div>高级查询</div>
                </div>
                <div class="card">
                <el-dropdown trigger="click" placement="bottom" @command="handleExport">
                    <div class="card-title">
                    <i class="el-icon-download"></i>
                    <div>导入/导出</div>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="in">导入</el-dropdown-item>
                    <el-dropdown-item command="xlsx-out">导出为excel</el-dropdown-item>
                    <el-dropdown-item command="csv-out">导出为csv</el-dropdown-item>
                    <el-dropdown-item command="txt-out">导出为txt</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <b class="el-icon-caret-bottom"></b>
                </div>-->
                <div @click="reset" class="card">
                    <i class="el-icon-loading"></i>
                    <div>刷新</div>
                </div>
                <div @click="dialogShow=true" class="card">
                    <i class="el-icon-tickets"></i>
                    <div>显示列</div>
                </div>
                <!-- <div @click="add" class="card">
                    <i class="el-icon-plus"></i>
                    <div>新增</div>
                </div> -->
            </div>
        </div>
        <fieldset style="margin:10px 0;border-color:#fff;text-align:left">
            <legend>查询条件</legend>
            <el-row type="flex" justify="space-around" :gutter="10">
                <el-col style="text-align:left" :span="3">
                    <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search"  size="mini"  placeholder="条码"/>    
                    <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search1"  size="mini"  placeholder="货号"/>    
                </el-col>
                <el-col style="text-align:left" :span="3">
                    <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search4"  size="mini"  placeholder="品牌"/>    
                    <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search5"  size="mini"  placeholder="分类编码"/> 
                    <!-- <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search6"  size="mini"  placeholder="供应商编码"/>     -->
                </el-col>
                
                <el-col :span="3">
                    <el-select @change="chose" v-model="value1" size="mini" placeholder="类别汇总" style="margin-top:0px;width:100%">
                        <el-option
                        v-for="item in options1"
                        :key="item.value1"
                        :label="item.label"
                        :value="item.value1">
                        </el-option>
                    </el-select>
                    <el-select @change="chose" v-model="brand_id" size="mini" placeholder="品牌汇总" style="margin-top:5px;width:100%">
                        <el-option
                        v-for="item in options2"
                        :key="item.brand_id"
                        :label="item.brand_name"
                        :value="item.brand_id">
                        </el-option>
                    </el-select>
                    <!-- <el-select v-model="value3" size="mini" placeholder="ABC类型" style="margin-top:5px;width:100%">
                        <el-option
                        v-for="item in options3"
                        :key="item.value3"
                        :label="item.label"
                        :value="item.value3">
                        </el-option>
                    </el-select> -->
                    <!-- <el-select v-model="value4" size="mini" placeholder="标签" style="margin-top:5px;width:100%">
                        <el-option
                        v-for="item in options4"
                        :key="item.value4"
                        :label="item.label"
                        :value="item.value4">
                        </el-option>
                    </el-select> -->
                </el-col>
                <el-col :span="3">
                    <el-select @change="chose" style="margin-bottom:5px" v-model="value5" size="mini" placeholder="店号">
                        <el-option
                        v-for="item in options5"
                        :key="item.value5"
                        :label="item.label"
                        :value="item.value5">
                        </el-option>
                    </el-select> 
                    <!-- <el-select style="margin-bottom:5px" v-model="value6" size="small" placeholder="分公司">
                        <el-option
                        v-for="item in options6"
                        :key="item.value6"
                        :label="item.label"
                        :value="item.value6">
                        </el-option>
                    </el-select>  -->
                    <el-select @change="chose" style="margin-bottom:5px" v-model="value7" size="mini" placeholder="店类型">
                        <el-option
                        v-for="item in options7"
                        :key="item.value7"
                        :label="item.label"
                        :value="item.value7">
                        </el-option>
                    </el-select>
                    <!-- <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search3"  size="mini"  placeholder="规格"/>   -->
                </el-col>
                <el-col style="margin-left:15px;" :span="3">
                    <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search2"  size="mini"  placeholder="商品名称"/> 
                    <!-- <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search8"  size="mini"  placeholder="采购组"/>  -->
                    <!-- <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search9"  size="mini"  placeholder="分店区域"/>  -->
                    <!-- <el-date-picker
                    v-model="search10" size="small"
                    style="width:100%;margin-bottom:5px"
                    type="daterange"
                    align="right"
                    unlink-panels
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker> -->
                    <!-- <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search7"  size="mini"  placeholder="供应商名称"/>  -->
                    <!-- <el-select v-model="value" size="mini" placeholder="分店标签" style="margin-top:0px;width:100%"> 
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>-->
                </el-col>
                <el-col :span="9">
                    <!-- <el-button type="primary" size="small" @click="reset">刷新</el-button><br>
                    <el-button icon="el-icon-tickets"  style="margin-top:5px" type="primary" size="small" @click="dialogShow=true">显示列</el-button> -->
                </el-col>
            </el-row>            
        </fieldset>
        <!-- 按需选择列弹窗 -->
        <el-dialog
        title="按需选择列" class="chose" style="text-align:left"
        :visible.sync="dialogShow"
        :before-close="handleClose"
        width="200px">
            <el-checkbox v-model="repertorySearchshow.show1">商品图像</el-checkbox><br>
            <el-checkbox v-model="repertorySearchshow.show2">商品名称</el-checkbox><br>
            <el-checkbox v-model="repertorySearchshow.show3">商品串码</el-checkbox><br>
            <el-checkbox v-model="repertorySearchshow.show4">辅助属性</el-checkbox><br>
            <el-checkbox v-model="repertorySearchshow.show5">所属仓库</el-checkbox><br>
            <el-checkbox v-model="repertorySearchshow.show6">库存数量</el-checkbox><br><br>
        </el-dialog>
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
                v-if="repertorySearchshow.show1"
                label="商品图像">
                <template slot-scope="scope">
                    <img style="width:80px" :src="scope.row.goods_thumb">
                </template>
            </el-table-column>
            <el-table-column
                prop="goods_name"
                align="center"
                v-if="repertorySearchshow.show2"
                show-overflow-tooltip
                label="商品名称">
            </el-table-column>
            <el-table-column
                prop="goods_sn"
                align="center"
                v-if="repertorySearchshow.show3"
                label="商品串码">
            </el-table-column>
            <el-table-column
                prop="pId"
                align="center"
                v-if="repertorySearchshow.show4"
                label="辅助属性">
            </el-table-column>
            <el-table-column
                prop="store_name"
                align="center"
                v-if="repertorySearchshow.show5"
                show-overflow-tooltip
                label="所属仓库">
                <template slot-scope="scope">
                    <span v-html="scope.row.store_name"></span>
                </template>
            </el-table-column>
            <el-table-column
                prop="attr_stock[0].store_number"
                align="center"
                v-if="repertorySearchshow.show6"
                label="库存数量">
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
            width="700px"
            :visible.sync="dialogVisible">
            <el-date-picker @change="detailChose" size="small"
            v-model="value77" style="width:250px;"
            type="daterange"
            align="right"
            unlink-panels
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>
            <!-- <el-input	size="small" v-model="input" placeholder="开始时间"></el-input>
            <el-input	size="small" v-model="input" placeholder="结束时间"></el-input> -->
            <!-- <el-select	size="small" v-model="value" placeholder="单据类型">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button	size="small" type="primary">导出</el-button> -->
            <el-button	size="small" type="primary" @click="detailReset">刷新</el-button>
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
                :total="total2">
            </el-pagination> 
        </el-dialog>
        <!--分页显示-->        
        <el-pagination
            @current-change="handleCurrentChange"
            layout="total,prev, pager, next,jumper"
            :total="total">
        </el-pagination>        
    </div>
</template>
<style scoped>
    #repertorySearch{
        text-align:center;
        margin: 10px;
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
            dialogShow:false,
            repertorySearchshow:{
                show1:true,
                show2:true,
                show3:true,
                show4:true,
                show5:true,
                show6:true,
            },
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
            brand_id:'',
            value: '' ,
            value1: '' ,
            value2: '' ,
            value3: '' ,
            value4: '' ,
            value5: '' ,
            value6: '' ,
            value7: '' ,
            value77: '' ,
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
            value1: '1',
            label: '商品'
            }, {
            value1: '0',
            label: '服务'
            },],  
            options2: [],  
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
            options6: [{
            value6: '选项1',
            label: '类型1'
            }, {
            value6: '选项2',
            label: '类型2'
            },], 
            options5: [{
            value5: '0',
            label: '0号店'
            }, {
            value5: '1',
            label: '1号店'
            },], 
            options7: [{
            value7: '0',
            label: '类型1'
            }, {
            value7: '1',
            label: '类型2'
            },],
        }
    },
    methods:{
        handleClose(done){
            done();
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            erpTableSetting.repertorySearch=this.repertorySearchshow;
            localStorage.erpTableSetting=JSON.stringify(erpTableSetting);
        },
        initData() {
            let data =this.$qs.stringify({//----------------- 获取列表
                //subsite_id: 3,
                //user_id: sessionStorage.user_id,
                page: this.page,
                page_size: this.page_size,
            }) ;
            this.data(data);
        },
        data(data){
            getRoomList(data).then(res => {
                this.options2=res.data.brand;
                console.log(this.options2);
                this.options2.forEach((value)=>{
                    console.log(value);
                });
                // for(var i of this.options2){
                //     console.log(i.brand_name);
                //     //console.log(i);
                //     //console.log(this.options2[i].brand_name);
                // };
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
        chose(){//-------------选择查询
            let data=this.$qs.stringify({
                page:1,
                page_size:10,
                brand_name:this.search4,
                goods_name:this.search2,
                goods_sn:this.search1,
                cat_id:this.search5,
                is_real:this.value1,
                subshop_id:this.value5,
                subshop_type:this.value7,
                brand_id:this.brand_id,
            }); 
            this.data(data); 
        },
        initDetail() {//----------详情
            let data=this.$qs.stringify({
                goods_sn:this.goods_sn,
                page:this.page2,
                page_size:this.page_size2
            });
            getRoomDetail(data).then(res=>{
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
        detailChose(){//--------------详情查询
            let data=this.$qs.stringify({
                goods_sn:this.goods_sn,
                add_time1:this.value77[0],
                add_time2:this.value77[1],
            });
            getRoomDetail(data).then(res=>{
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
        detailReset(){//---------详情刷新
            this.initDetail();
            this.value77="";
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
        if(localStorage.erpTableSetting!==undefined){
            console.log("yes");
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting); 
            if(erpTableSetting.repertorySearch!==undefined){
                this.repertorySearchshow=erpTableSetting.repertorySearch;
            }
        }else{
            console.log("no");
        };
        this.initData();
    }
}
</script>