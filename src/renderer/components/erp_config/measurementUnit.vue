<template>
    <div class="measurementUnit">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <!-- <h3>温州美联 管理中心</h3> -->
            <el-breadcrumb style="font-size:18px" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>设置</el-breadcrumb-item>
                <el-breadcrumb-item>计量单位</el-breadcrumb-item>
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
                <div @click="()=>{formServeAdd= {};dialogAdd = true}" class="card">
                    <i class="el-icon-plus"></i>
                    <div>新增</div>
                </div>
            </div> 
        </div>
        <div class="main-table">
            <!-- 账户搜索 -->
            <el-form :inline="true" :model="formServe" class="demo-form-inline">
                <!-- <el-form-item label="">
                    <el-input	size="small" v-model="formServe.name" placeholder="单位名称"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input	size="small" v-model="formServe.marks" placeholder="单位信息"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input	size="small" v-model="formServe.marks" placeholder="备注信息"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <el-input placeholder="请输入账户名称" @input="search" style="width:70%;margin-right:10px" size="small">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                    <!-- <el-button type="primary" size="small" @click="()=>{formServeAdd= {};dialogAdd = true}">新增</el-button>
                    <el-button type="primary" size="small" @click="reset">刷新</el-button> -->
                </el-form-item>
            </el-form>
            <!-- 新增计量单位弹出框 -->
            <el-dialog width="450px" title="分类新增" :visible.sync="dialogAdd">
                <el-form :model="formServeAdd">
                    <el-form-item label="单位名称">
                        <el-input v-model="formServeAdd.unit_name"></el-input>
                    </el-form-item>
                    <el-form-item label="单位编号">
                        <el-input v-model="formServeAdd.unit_id"></el-input>
                    </el-form-item>
                    <el-form-item label="备注信息">
                        <el-input v-model="formServeAdd.remark"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogAdd = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="addUnitDone">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 计量单位 详情弹出框 -->
            <el-dialog width="450px" title="分类详情" :visible.sync="dialogDetail">
                <el-form :model="formServeDetail">
                    <el-form-item label="单位名称">
                        <el-input v-model="formServeDetail.unit_name"></el-input>
                    </el-form-item>
                    <el-form-item label="单位编号">
                        <el-input v-model="formServeDetail.unit_id"></el-input>
                    </el-form-item>
                    <el-form-item label="备注信息">
                        <el-input v-model="formServeDetail.remark"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogDetail = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="editUnitDone">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 计量单位表格 -->
            <el-table
            :data="unitData.filter(data =>  {
            return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1})})"
            border stripe
            :row-style="{height:0}"  
            :cell-style="{padding:7}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            v-loading="loading"
            style="width: 100%">
                <!-- <el-table-column
                prop="id"
                align="center"
                label="单位id">
                </el-table-column> -->
                <el-table-column
                prop="unit_name"
                align="center"
                label="单位名称">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.unit_name" />
                    </template>
                </el-table-column>
                <el-table-column
                prop="unit_id"
                align="center"
                label="单位编号">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.unit_id" />
                    </template>
                </el-table-column>
                <el-table-column
                prop="remark"
                align="center"
                label="备注信息">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.remark" />
                    </template>
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="edit(scope.row)">保存修改</el-button>
                        <el-button type="text" @click="delUnitDone(scope.row)" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next,jumper"
                :total="unitData.length"
                :page-size="page_size">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {getUnitList,editUnit,addUnit,delUnit} from '../../api/api'
export default {
    inject: ['reload'],
    data() {
        return {
            page:1,
            page_size:10,
            total:0,
            loading:true,
            dialogAdd:false,
            dialogDetail:false,
            search:'',
            formServe:{
                name:"",
                marks:""
            },
            formServeAdd:{

            },
            formServeDetail:{
            },
            unitData:[],
        }
    },
    methods:{
        initData() { // 获取计量单位列表
            let data = {
                //subsite_id:3,
                //user_id:sessionStorage.user_id,
                page:this.page,
                page_size:this.page_size
            }
            getUnitList({params:data}).then(res=>{
                console.log(res)
                if(res.errno == 0) {
                    this.unitData=res.data.orders;
                    // this.total = Number(res.data.record_count)
                    this.loading = false
                }
            })
        },
        addUnitDone() { // 确认添加
            let data = this.$qs.stringify(this.formServeAdd)
            addUnit(data).then(res=>{
                if (res.errno == 0) {
                    this.$message({
                        showClose: true,
                  message: "添加成功!",
                  duration: 1000,
                  type: "success"
                });
                this.initData();
              }else {
                  this.$message({
                    showClose: true,
                    message: "添加失败!",
                    duration: 1000,
                    type: "error"
                });
              }
                this.dialogAdd = false
            })
        },
        edit(row){//----------------修改
            let data=this.$qs.stringify(row);
            editUnit(data).then(res=>{
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
                    this.initData();
                }
            });
        },
        emitDetail(v) { // 传数据给详情页
            this.formServeDetail = v
        },
        editUnitDone() { // 确认修改
            let data = this.$qs.stringify(this.formServeDetail)
            editUnit(data).then(res=>{
                if (res.errno == 0) {
                    this.$alert(res.data.message,{
                        callback:action=>{
                            this.initData();
                        }
                    });
                }else {
                    this.$alert(res.errmsg);
                }
                this.dialogDetail = false
            })
        },
        delUnitDone(row) {
            console.log(row.id);
            this.$confirm("即将执行删除操作, 确认删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                let tmpData = {
                    //user_id: sessionStorage.user_id,
                    id: row.id
                };
                delUnit({ params: tmpData })
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
        /* search() {
            getUnitList({params:{
                page:1,
                page_size:10,
                unit_name:this.keywords
            }}).then(res=>{
                console.log(res)
                if(res.errno == 0) {
                    this.unitData=res.data.orders;
                    this.loading = false
                }
            })
        },  */
         ServeSearchIn() {
            console.log("submit!");
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
.measurementUnit{
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
/* 分页器 */
.el-pagination {
  padding: 20px 0;
  text-align: right;
}
.el-table .el-input >>> .el-input__inner{
    border:none;
    text-align:center;
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
