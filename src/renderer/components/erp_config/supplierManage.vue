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
                <el-form-item>
                    <el-input placeholder="请输入供应商名称" @input="search" v-model="keywords" style="width:50%;margin-right:10px" size="small">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                    <el-button type="primary" size="small" @click="dialogSupplierAdd = true">新增</el-button>
                    <!-- <el-button type="primary" size="small">导入</el-button>
                    <el-button type="primary" size="small">导出</el-button> -->
                    <el-button type="primary" size="small" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form>
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
                label="供应商编号"
                width="180">
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
            supplierMData:[]
        }
    },
    methods:{
        search() {
            let data =this.$qs.stringify({
                supplier_name:this.keywords
            })
           getsupplierList(data).then(res=>{
                console.log(res)
                if(res.errno == 0) {
                    this.supplierMData=res.data.supplier_list
                    this.total = Number(res.data.record_count)
                    this.loading = false
                }
            })
        }, 
        initData() {
            let data =this.$qs.stringify({
                subsite_id:3,
                user_id:sessionStorage.user_id,
                page:this.page,
                page_size:this.page_size
            }) 
            getsupplierList(data).then(res=>{
                console.log(res)
                if(res.errno == 0) {
                    this.supplierMData=res.data.supplier_list
                    this.total = Number(res.data.record_count)
                    this.loading = false
                }
            })
        },
        supplierDetail(v) {
            let data =this.$qs.stringify({
                supplier_id:v.supplier_id
            })
            getsupplierDetail(data).then(res=>{
                if(res.errno == 0) {
                    this.formSupplierDetail = res.data
                }
            })
        },
        add(){
            console.log("add");
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
            console.log("edit");
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
  text-align: right;
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
