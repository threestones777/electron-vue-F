<template>
    <div class="supplierManage">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <!-- <h3>温州美联 管理中心</h3> -->
            <el-breadcrumb style="font-size:18px" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>设置</el-breadcrumb-item>
                <el-breadcrumb-item>供应商管理</el-breadcrumb-item>
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
                <!-- <div @click="dialogShow=true" class="card">
                    <i class="el-icon-tickets"></i>
                    <div>显示列</div>
                </div> -->
                <div @click="dialogSupplierAdd = true" class="card">
                    <i class="el-icon-plus"></i>
                    <div>新增</div>
                </div>
            </div>
        </div>
        <div class="main-table">
            <fieldset style="margin:10px 0;border-color: #fff;">
                <legend>查询条件</legend>
                <el-row type="flex" justify="space-around" :gutter="10">
                    <!-- <el-col style="text-align:left" :span="3">
                        <el-radio-group v-model="radio" style="margin-top:5px;">
                            <el-radio :label="1">单据审核日期</el-radio><br>
                            <el-radio :label="3">结算日期</el-radio><br>
                            <el-radio :label="4">不按日期</el-radio>
                        </el-radio-group>    
                    </el-col> -->
                    <el-col :span="4">
                        <!-- <el-date-picker
                        v-model="search3" size="small"
                        style="width:100%;margin-bottom:5px"
                        type="daterange"
                        align="right"
                        unlink-panels
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker> -->
                        <!-- <el-select v-model="value1" size="small" placeholder="状态">
                            <el-option
                            v-for="item in options1"
                            :key="item.value1"
                            :label="item.label"
                            :value="item.value1">
                            </el-option>
                        </el-select>  -->
                        <el-input @input="chose" prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="search"  size="mini"  placeholder="供应商名称"/>
                    </el-col>
                    <el-col :span="3">
                        <el-input @input="chose" prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="search1"  size="mini"  placeholder="联系人"/>
                    </el-col>
                    <el-col :span="3">
                        <el-input @input="chose" prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="search2"  size="mini"  placeholder="手机号"/>
                        <!-- <el-select v-model="value3" size="small" placeholder="分公司">
                            <el-option
                            v-for="item in options3"
                            :key="item.value3"
                            :label="item.label"
                            :value="item.value3">
                            </el-option>
                        </el-select>  -->
                        <!-- <el-select v-model="value2" size="small" placeholder="分店" style="margin-top:0px">
                            <el-option
                            v-for="item in options2"
                            :key="item.value2"
                            :label="item.label"
                            :value="item.value2">
                            </el-option>
                        </el-select> -->
                    </el-col>
                    <el-col :span="3">
                        <el-select @change="chose" v-model="value2" size="small" placeholder="分店" style="margin-top:0px">
                            <el-option
                            v-for="item in options2"
                            :key="item.value2"
                            :label="item.label"
                            :value="item.value2">
                            </el-option>
                        </el-select>
                        <!-- <el-button type="primary" size="small" @click="reset">刷新</el-button><br>
                        <el-button icon="el-icon-tickets"  style="margin-top:5px" type="primary" size="small" @click="dialogShow=true">显示列</el-button> -->
                    </el-col>
                    <el-col :span="11"></el-col>
                </el-row>
            </fieldset>
            <!-- 客户搜索 -->
            <!-- <el-form :inline="true" :model="formSupplier" class="demo-form-inline"> -->
                <!-- <el-form-item label="供应商名称">
                    <el-input	size="small" v-model="formSupplier.name" placeholder="供应商名称"></el-input>
                </el-form-item>
                <el-form-item label="客户编号">
                    <el-input	size="small" v-model="formSupplier.number" placeholder="客户编号"></el-input>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input	size="small" type="tel" v-model="formSupplier.contacts" placeholder="联系人"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input	size="small" type="tel" v-model="formSupplier.phone" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input	size="small" type="tel" v-model="formSupplier.marks" placeholder="备注信息"></el-input>
                </el-form-item> -->
                <!-- <el-form-item>
                    <el-input placeholder="请输入供应商名称" @input="search" v-model="keywords" style="width:50%;margin-right:10px" size="small">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                    <el-button type="primary" size="small" @click="dialogSupplierAdd = true">新增</el-button>
                    <el-button type="primary" size="small" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form> -->
            <!-- 新增供应商弹出框 -->
            <el-dialog width="760px" title="供应商新增" :visible.sync="dialogSupplierAdd">
                <el-form label-position="right" :model="formSupplierAdd" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="供应商名称">
                                <el-input v-model="formSupplierAdd.supplier_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="供应商编号">
                                <el-input v-model="formSupplierAdd.supplier_id" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系人">
                                <el-input v-model="formSupplierAdd.contacts_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>                        
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="联系电话">
                                <el-input v-model="formSupplierAdd.contacts_phone" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="供应商地址">
                                <el-input v-model="formSupplierAdd.address" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="社交账户">
                                <el-input v-model="formSupplierAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="邮箱地址">
                                <el-input v-model="formSupplierAdd.email" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="开户名">
                                <el-input v-model="formSupplierAdd.bank_account_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="开户行">
                                <el-input v-model="formSupplierAdd.bank_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>                        
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="银行账户">
                                <el-input v-model="formSupplierAdd.bank_account_number" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="税号">
                                <el-input v-model="formSupplierAdd.tax_registration_certificate" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>  
                        <el-col :span="8">
                            <el-form-item label="备注信息">
                                <el-input v-model="formSupplierAdd.supplier_desc" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>                      
                    </el-row> 
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogSupplierAdd = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="add(),dialogSupplierAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 供应商详情弹出框 -->
            <el-dialog width="760px" title="供应商详情" :visible.sync="dialogSupplierDetail">
                <el-form label-position="right" :model="formSupplierDetail" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="供应商名称">
                                <el-input v-model="formSupplierDetail.supplier_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="供应商编号">
                                <el-input v-model="formSupplierDetail.supplier_id" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系人">
                                <el-input v-model="formSupplierDetail.contacts_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>                        
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="联系电话">
                                <el-input v-model="formSupplierDetail.contacts_phone" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="供应商地址">
                                <el-input v-model="formSupplierDetail.address" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="社交账户">
                                <el-input v-model="formSupplierDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="邮箱地址">
                                <el-input v-model="formSupplierDetail.email" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="开户名">
                                <el-input v-model="formSupplierDetail.bank_account_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="开户行">
                                <el-input v-model="formSupplierDetail.bank_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>                        
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="银行账户">
                                <el-input v-model="formSupplierDetail.bank_account_number" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="税号">
                                <el-input v-model="formSupplierDetail.tax_registration_certificate" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>  
                        <el-col :span="8">
                            <el-form-item label="备注信息">
                                <el-input v-model="formSupplierDetail.supplier_desc" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>                      
                    </el-row> 
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogSupplierDetail = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="edit(),dialogSupplierDetail = false">保存修改</el-button>
                </div>
            </el-dialog>
            <!-- 供应商管理表格 -->
            <el-table
            :data="supplierMData"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            v-loading="loading"
            style="width: 100%">
                <el-table-column
                prop="supplier_name"
                align="center"
                label="供应商名称">
                </el-table-column>
                <el-table-column
                prop="supplier_id"
                align="center"
                label="供应商编号">
                </el-table-column>
                <el-table-column
                prop="contacts_name"
                align="center"
                label="联系人"
                width="180">
                </el-table-column>
                <el-table-column
                prop="contacts_phone"
                align="center"
                label="手机号"
                width="180">
                </el-table-column>
                <el-table-column
                prop="supplier_desc"
                align="center"
                label="备注信息">
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作"
                width="140">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="supplierDetail(scope.row),dialogSupplierDetail = true">详情</el-button>
                        <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
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
import {getsupplierList,getsupplierDetail,getsupplierAdd,getsupplierEd,getsupplierRmv} from '../../api/api'
export default {
    inject: ['reload'], 
    data() {
        return {
            page:0,
            page_size:10,
            total:0,
            loading:true,
            dialogSupplierAdd:false,
            dialogSupplierDetail:false,
            keywords:'',
            formSupplier:{
                name:"",
                number:"",
                contacts:"",
                phone:"",
                marks:""
            },
            formSupplierAdd:{},
            formSupplierDetail:{
                
            },
            supplierMData:[],
            search:'',
            search1:'',
            search2:'',
            search3:['2017-7-7','2019-9-9'],
            radio:4,
            value: '' ,
            value1: '' ,
            value2: '' ,
            value3: '' ,
            value4: '' ,
            options1: [{
            value1: '0',
            label: '未审核'
            }, {
            value1: '1',
            label: '已审核'
            },],
            options2: [{
            value2: '0',
            label: '0分店'
            }, {
            value2: '1',
            label: '1分店'
            },],
            options3: [{
            value3: '0',
            label: '分公司1'
            }, {
            value3: '1',
            label: '分公司2'
            },],
        }
    },
    methods:{
        initData() {
            let data =this.$qs.stringify({
                subsite_id:3,
                user_id:sessionStorage.user_id,
                page:this.page,
                page_size:this.page_size
            }) 
            this.data(data);
        },
        data(data){
            getsupplierList(data).then(res=>{
                console.log(res)
                if(res.errno == 0) {
                    this.supplierMData=res.data.supplier_list
                    this.total = Number(res.data.record_count);
                    this.loading = false
                }
            })
        },
        chose(){//-------------------选择查询
            let data =this.$qs.stringify({
                //subsite_id:3,
                //user_id:sessionStorage.user_id,
                page:this.page,
                page_size:this.page_size,
                supplier_name:this.search,
                contacts_name:this.search1,
                contacts_phone:this.search2,
                subshop_id:this.value2
            }) 
            this.data(data);
        },
        supplierDetail(v) {
            let data =this.$qs.stringify({
                supplier_id:v.supplier_id
            })
            getsupplierDetail(data).then(res=>{
                if(res.errno == 0) {
                    this.formSupplierDetail = res.data;
                }
            })
        },
        add(){
            let data =this.$qs.stringify(this.formSupplierAdd)
            getsupplierAdd(data).then(res=>{
                console.log(res);
                if(res.errno==0){
                    this.$alert(res.errmsg,{
                        callback:action=>{
                            this.reload();   
                        }
                    })
                }else{
                    this.$alert(res.errmsg)
                }
            });
        },
        edit(){
            let data =this.$qs.stringify(this.formSupplierDetail)
            getsupplierEd(data).then(res=>{
                console.log(res);
                if(res.errno==0){
                    this.$alert(res.errmsg,{
                        callback:action=>{
                            this.reload();   
                        }
                    })
                }else{
                    this.$alert(res.errmsg)
                }
            });
        },
        del(row){
            let Message=confirm("确定删除此行商品？");
            if(Message){
                let data =this.$qs.stringify({
                    supplier_id:row.supplier_id
                });
                getsupplierRmv(data).then(res=>{
                    console.log(res);
                    if(res.errno==0){
                        this.$alert(res.errmsg,{
                            callback:action=>{
                                this.reload();   
                            }
                        })
                    }else{
                        this.$alert(res.errmsg)
                    }
                });         
            }else{
                alert("用户取消操作");
            }
        },
        reset() {
            this.reload();
        },
        handleCurrentChange(val) {
            this.page = val
            this.initData()
        }
    },
    created() {
        this.initData()
    }
}
</script>
<style scoped>
.supplierManage{
    margin: 10px;
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
  text-align: right;
}

/* 新增客户弹出框 & 客户详情弹出框*/
.main-table>>>.el-dialog__body {
  padding: 0 20px;
}
.el-dialog__body .el-form {
  text-align: right;
}
.el-row{
    background:#F3F3F3;
    width:100%;
}
</style>
