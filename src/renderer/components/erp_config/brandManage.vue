<template>
    <div class="brandManage">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <!-- <h3>温州美联 管理中心</h3> -->
            <el-breadcrumb style="font-size:18px" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>商品</el-breadcrumb-item>
                <el-breadcrumb-item>品牌管理</el-breadcrumb-item>
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
                <div @click="add" class="card">
                    <i class="el-icon-plus"></i>
                    <div>新增</div>
                </div>
            </div>
        </div>
        <div class="main-table">
            <!-- 账户搜索 -->
            <el-form :inline="true" :model="formServe" class="demo-form-inline">
                <!-- <el-form-item label="">
                    <el-input	size="small" v-model="formServe.brand_name" placeholder="品牌名称"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input	size="small" type="tel" v-model="formServe.brand_id" placeholder="品牌编号"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input	size="small" type="tel" v-model="formServe.marks" placeholder="备注信息"></el-input>
                </el-form-item> -->
                 <!-- <el-form-item>
                   <el-button type="primary" size="small" @click="serveSearch">搜索</el-button> -->
                    <!-- <el-button type="primary" size="small" @click="add">新增</el-button>
                    <el-button type="primary" size="small" @click="reset">刷新</el-button>
                </el-form-item> -->
            </el-form>
            <!-- 新增品牌弹出框 -->
            <el-dialog width="450px" title="品牌管理" :visible.sync="dialogServeAdd">
                <el-form :model="formServeAdd" ref="formServeAdd">
                    <el-form-item label="品牌名" prop="brand_name" :rules="rule">
                        <el-input v-model="formServeAdd.brand_name"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌url" prop="site_url" :rules="rule">
                        <el-input v-model="formServeAdd.site_url"></el-input>
                    </el-form-item>                    
                    <el-form-item label="品牌描述" prop="brand_desc" :rules="rule">
                        <el-input v-model="formServeAdd.brand_desc" type="textarea" autosize></el-input>
                    </el-form-item>                    
                     <!-- <el-form-item label="logo图片" prop="brand_logo" :rules="rule2">
                        <input type="file" id="brandLogo" ref="brandLogo" accept="image/*" @change="getImg"/>
                        <el-card v-show="imgSrc" :body-style="{height:'180px',padding:'10px',textAlign:'center'}" shadow="hover">
                            <img :src="imgSrc" class="brandLogo">
                            <i class="el-icon-circle-close" @click="delImg"></i>
                        </el-card>
                    </el-form-item> -->
                    <el-form-item label="是否显示" prop="is_show" :rules="rule">
                        <el-radio-group v-model="formServeAdd.is_show">
                            <el-radio :label="1">显示</el-radio>
                            <el-radio :label="0">不显示</el-radio>
                        </el-radio-group>
                    </el-form-item>                    
                    <el-form-item label="排序" prop="sort_order" :rules="rule">
                        <el-input-number v-model="formServeAdd.sort_order" :min="0"></el-input-number>
                    </el-form-item>                    
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeAdd = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="addDone('formServeAdd')">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 品牌管理表格 -->
            <el-table
            :data="brandData"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            v-loading="loading"
            style="width: 100%">
                <el-table-column
                prop="brand_name"
                align="center"
                label="品牌名称">
                </el-table-column>
                <el-table-column
                prop="brand_id"
                align="center"
                label="品牌编号"
                width="80">
                </el-table-column>
                <el-table-column
                prop="brand_desc"
                align="center"
                show-overflow-tooltip
                label="品牌描述">
                </el-table-column>
                <el-table-column
                prop="edit_time"
                :formatter="formatter"
                align="center"
                label="编辑时间">
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作"
                width="240">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showDetails(scope.row),dialogServeAdd= true">详情</el-button>
                        <el-button type="text" @click="delBrandDone(scope.row)" size="small">删除</el-button>
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
import {getBrandList,getBrandDetail,editBrand,addBrand,delBrand} from '../../api/api'

export default {
    data() {
        var validateImg = (rule, value, callback) => {
            if (this.imgSrc == '') {
                callback(new Error('不能为空'));
            } else {
                callback();
            }
        };
        return {
            page:1,
            page_size:10,
            total:0,
            loading:true,
            isEdit:false,
            dialogServeAdd:false,
            imgSrc:'',
            value:'',
            is_show:"1",
            formServe:{},
            formServeAdd:{},
            brandData:[],
            rule: [{ required: true, message: "不能为空" }],
            rule2:[{ required: true, validator: validateImg, trigger: 'change'}]
        }
    },
    methods:{
        initData() { // 获取品牌列表
          let data = {
              subsite_id:3,
              user_id:sessionStorage.user_id,
              page:this.page,
              page_size:this.page_size,
          }
            getBrandList({params:data}).then(res=>{
            console.log(res)
            if(res.errno == 0) {
                this.brandData=res.data.brand
                this.total = Number(res.data.record_count)
                this.loading = false
                }
            })
        },
        delImg() {
            this.$refs.brandLogo.value = ''
            this.imgSrc = ''
        },
        add() {
            this.formServeAdd = {}
            this.isEdit = false
            this.dialogServeAdd = true
            // this.$nextTick(()=>{
            //     this.$refs.formAdd.resetFields()
            //     this.$refs.brandLogo.value = ''
            // })
            this.imgSrc = ''
        },
        addDone(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if(this.isEdit) {
                        this.formServeAdd.brand_logo = this.imgSrc
                        let tmpData = this.$qs.stringify(this.formServeAdd);
                        editBrand(tmpData).then(res=>{
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
                            }
                            this.dialogServeAdd = false;
                        })
                    }else {
                        this.formServeAdd.brand_logo = this.imgSrc
                        let tmpData = this.$qs.stringify(this.formServeAdd);
                        addBrand(tmpData).then(res=>{
                            if (res.errno == 0) {
                                this.$message({
                                type: "success",
                                message: res.data.message,
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
                            this.dialogServeAdd = false;
                        })
                    }
                }
            })
        },
        getImg(e) { // 获取logo base64 字符串
            let file = e.target.files[0]
            let fileReader = new FileReader()
            let imgUrlBase64 = fileReader.readAsDataURL(file)
            fileReader.onload = (v) => {
                this.imgSrc = v.target.result
            }
        },
        delBrandDone(v) {
            this.$confirm("即将执行删除操作, 确认删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                let tmpData = { 
                user_id: sessionStorage.user_id,
                brand_id: v.brand_id
                };
                delBrand({ params: tmpData })
                .then(res => {
                    if (res.errno == 0) {
                    this.$message({
                        type: "success",
                        message: "删除成功!",
                        duration: 1000
                    });
                    this.initData();
                    }
                })
            }).catch(res => {
                console.log("用户取消删除");
            })
        },
        formatter(e,c) {
            let d = new Date(e.edit_time*1000)
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
            var hour = d.getHours();
            var minutes = d.getMinutes();
            var seconds = d.getSeconds();
            return year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
        },
        serveSearch() {
            this.initData()
        },
        ServeSearchIn() {
            console.log("submit!");
        },
        reset() {
            this.initData()
        },
        showDetails(row) {
            this.isEdit = true;
            getBrandDetail({params:{id: row.brand_id}}).then(res => {
                if (res.errno == 0) {
                this.formServeAdd = res.data;
                this.imgSrc = res.data.brand_logo;
                //   this.formServeDetail.base_price = res.data.base_price.substring(1);
                }
            });
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
.brandManage{
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

.brandLogo {
    height: 100%;
}
.el-card {
    position: relative;
    transition: all 0.3s;
}
.el-icon-circle-close {
    color: red;
    font-size: 26px;
    position: absolute;
    right: 1%;
    top: 2%;
    transition: all 0.3s;
}
.el-icon-circle-close:hover {
    transform: rotate(180deg);
}
</style>
