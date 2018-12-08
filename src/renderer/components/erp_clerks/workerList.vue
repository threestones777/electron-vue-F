<template>
    <div class="workerList">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>设置</el-breadcrumb-item>
                <el-breadcrumb-item>职员列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <!-- 职员搜索 -->
            <el-form :inline="true" :model="formServe" class="demo-form-inline">
                <!-- <el-form-item label="">
                    <el-input	size="small" v-model="formServe.name" placeholder="职员帐号"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input	size="small" type="tel" v-model="formServe.nickname" placeholder="职员昵称"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input	size="small" type="tel" v-model="formServe.remark" placeholder="职员备注"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <el-input placeholder="请输入职员名称" @input="search" v-model="keywords" style="width:50%;margin-right:10px" size="small">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                    <el-button type="primary" size="small" @click="dialogServeAdd = true">新增</el-button>
                    <el-button type="primary" size="small" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form>
            <!-- 职员管理新增弹出框 -->
            <el-dialog width="450px" title="职员管理新增" :visible.sync="dialogServeAdd">
                <el-form :model="formServeAdd" ref="formServeAdd" :rules="rules">
                    <el-form-item label="职员名称" prop="nickname">
                        <el-input v-model="formServeAdd.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="职员账号" prop="name">
                        <el-input v-model="formServeAdd.name"></el-input>
                    </el-form-item>                    
                    <el-form-item label="职员密码" prop="password">
                        <el-input :type="toggleType?'password':'text'" v-model="formServeAdd.password">
                            <i slot="suffix" @click="toggleType=!toggleType" :class="['el-input__icon','el-icon-view',toggleType?'':'active']"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="备注信息">
                        <el-input v-model="formServeAdd.remark"></el-input>
                    </el-form-item>                    
                    <el-form-item label="手机号" prop="mobile">
                        <el-input type="phone" v-model="formServeAdd.mobile"></el-input>
                    </el-form-item>                    
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="resetForm('formServeAdd')">取 消</el-button>
                    <el-button	size="small" type="primary" @click="workerAdd('formServeAdd')">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 职员详情弹出框 -->
            <el-dialog width="520px" title="职员详情/修改" :visible.sync="dialogServeDetail">
                <el-form :model="formServeDetail" ref="formServeDetail" :rules="isChangePass?rules2:rules3" >
                    <el-form-item label="职员名称" prop="nickname">
                        <el-input v-model="formServeDetail.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="职员账户" prop="name">
                        <el-input v-model="formServeDetail.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="mobile">
                        <el-input v-model="formServeDetail.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="旧密码" prop="oldPassInput" v-show="isChangePass">
                        <el-input v-model="formServeDetail.oldPassInput" :type="toggleType?'password':'text'">
                            <i slot="suffix" @click="toggleType=!toggleType" :class="['el-input__icon','el-icon-view',toggleType?'':'active']"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPass" v-show="isChangePass">
                        <el-input v-model="formServeDetail.newPass" :type="toggleType?'password':'text'">
                            <i slot="suffix" @click="toggleType=!toggleType" :class="['el-input__icon','el-icon-view',toggleType?'':'active']"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="新密码确认" prop="password" v-show="isChangePass">
                        <el-input v-model="formServeDetail.password" :type="toggleType?'password':'text'">
                            <i slot="suffix" @click="toggleType=!toggleType" :class="['el-input__icon','el-icon-view',toggleType?'':'active']"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="备注信息" prop="remark">
                        <el-input v-model="formServeDetail.remark"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button class="fl" @click="changePass">{{isChangePass?'不修改密码':'修改密码'}}</el-button>
                    <el-button	size="small" @click="resetForm('formServeDetail')">取 消</el-button>
                    <el-button	size="small" type="primary" @click="edit('formServeDetail')">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 职员管理表格 -->
            <el-table
            :data="clerkData"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            v-loading="loading"
            style="width: 100%">
                <el-table-column
                prop="nickname"
                align="center"
                label="职员名称">
                </el-table-column>
                <el-table-column
                prop="name"
                align="center"
                label="职员账号"
                width="180">
                </el-table-column>
                <el-table-column
                prop="mobile"
                align="center"
                label="手机号码"
                width="180">
                </el-table-column>
                <el-table-column
                prop="remark"
                align="center"
                label="备注信息">
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作"
                width="240">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="detail(scope.row)">详情</el-button>
                        <el-button type="text" size="small" @click="del(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
                @current-change="handleCurrentChange"
                :total="total"
                layout="total, prev, pager, next,jumper"
                :page-size="page_size">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {getWorkerList,addWorker,delWorker,editWorker} from '../../api/api'
export default {
    inject: ['reload'], 
    data() {
        var validateMobile = (rule, value, callback) => { // 手机号自定义规则
            if (!value || value.trim()=='') {
                return callback(new Error('手机号不能为空'));
            }else if(!Number(value)) {
                return callback(new Error('手机号必须为数字'));
            }else if(!(/^1[34578]\d{9}$/.test(value))){
                return callback(new Error('手机号格式有误'));
            }
            callback()
        }
        var validateOldPass= (rule, value, callback)=>{ // 旧密码正确性检测
            if(!value || value.trim()=='') {
                return callback(new Error('密码不能为空'));
            }else if(value != this.formServeDetail.oldPass) {
                return callback(new Error('旧密码不正确'));
            }
            callback()
        }
        var validatePass = (rule, value, callback) => { // 新密码正确性校验
            if (value === '') {
            callback(new Error('请输入密码'));
            } else {
            if (this.formServeDetail.password !== '') {
                this.$refs.formServeDetail.validateField('password');
            }
            callback();
            }
        }
        var validatePass2 = (rule, value, callback) => { // 再次输入的密码校验
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.formServeDetail.newPass) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        }
        return {
            page:1, // 页数
            page_size:10, // 每页显示的条数
            total:0, // 总条数
            toggleType:true, // 密码显隐
            dialogServeAdd:false, // 新增框显隐
            dialogServeDetail:false, // 修改框显隐
            isChangePass:true, // 是否修改密码
            loading:true, // 表格加载动画
            formServe:{ // 搜索框数据
                name:"",
                nickname:'',
                remark:""
            },
            formServeAdd:{ // 新增框数据
                name:"",
                nickname:'',
                password:'',
                remark:'',
                mobile:'',
                subsite_id:3
            },
            formServeDetail:{ // 修改框数据
                id:'',
                name:"",
                nickname:'',
                oldPassInput:'',
                oldPass:'',
                newPass:'',
                password:'',
                remark:'',
                mobile:'',
                subsite_id:3
            },
            sb:"adadad",
            keywords:'',
            clerkData:[], // 初始页面数据
            rules: {  // 新增框校验规则
                name: [
                    { required: true, message: '账户名不能为空', trigger: 'blur' },
                ],
                nickname: [
                    { required: true, message: '昵称不能为空', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                ],
                mobile: [
                    { required: true, validator: validateMobile, trigger: 'blur' },
                ],
            },
            rules2: { // 修改框校验规则1
                name: [
                    { required: true, message: '账户名不能为空', trigger: 'blur' },
                ],
                nickname: [
                    { required: true, message: '昵称不能为空', trigger: 'blur' },
                ],
                password: [
                    { required: true, validator: validatePass2, trigger: 'blur' },
                ],
                oldPassInput: [
                    { required: true, validator: validateOldPass, trigger: 'blur' },
                ],
                newPass: [
                    { required: true, validator: validatePass, trigger: 'blur' },
                ],
                mobile: [
                    { required: true, validator: validateMobile, trigger: 'blur' },
                ],
            },
            rules3: { // 修改框校验规则2
                name: [
                    { required: true, message: '账户名不能为空', trigger: 'blur' },
                ],
                nickname: [
                    { required: true, message: '昵称不能为空', trigger: 'blur' },
                ],
                mobile: [
                    { required: true, validator: validateMobile, trigger: 'blur' },
                ],
            }
        }
    },
    methods:{
        search() {
            let data=this.$qs.stringify({
                nickname:this.keywords
            });
            getWorkerList(data).then(res=>{
                if(res.errno==0) {
                    console.log(res)
                    this.clerkData = res.data.clerk_list
                    this.total = Number(res.data.record_count)
                    this.formServe.name = ''
                    this.formServe.nickname = ''
                    this.formServe.remark = ''
                    this.loading = false
                }
            })
        }, 
        initData() { // 获取职员数据
            let data = {
                user_id:sessionStorage.user_id,
                page:this.page,
                page_size:this.page_size,
                name:this.formServe.name,
                nickname:this.formServe.nickname,
                remark:this.formServe.remark
            }
            getWorkerList(data).then(res=>{
                if(res.errno==0) {
                    console.log(res)
                    this.clerkData = res.data.clerk_list
                    this.total = Number(res.data.record_count)
                    this.formServe.name = ''
                    this.formServe.nickname = ''
                    this.formServe.remark = ''
                    this.loading = false
                }
            })
        },
        workerAdd(val) { // 新增职员
            this.$refs[val].validate(valid=>{
                if(valid) {
                    this.formServeAdd.user_id = sessionStorage.user_id
                    let tmpData = this.$qs.stringify(this.formServeAdd)
                    addWorker(tmpData).then(res=>{
                        if(res.errno == 0) {
                            this.$message({
                                showClose: true,
                                message: "新增成功!",
                                duration: 1000,
                                type: "success"
                            });
                            this.dialogServeAdd = false
                            this.initData()
                        }else {
                            this.$message({
                                showClose: true,
                                message: res.errmsg,
                                duration: 1000,
                                type: "error"
                            });
                            this.dialogServeAdd = false
                        }
                    })
                }
            })
        },
        del(v) { // 删除职员
            this.$confirm("即将执行删除操作, 确认删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                let tmpData = {
                    user_id: sessionStorage.user_id,
                    id: v
                };
                delWorker({ params: tmpData })
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
        detail(v) { // 详情/修改职员
            this.formServeDetail.nickname = v.nickname
            this.formServeDetail.id = v.id
            this.formServeDetail.name = v.name
            this.formServeDetail.remark = v.remark
            this.formServeDetail.mobile = v.mobile
            this.formServeDetail.oldPass = v.password
            this.dialogServeDetail = true
        },
        edit(val) { // 确认修改职员
            this.$refs[val].validate(valid=>{
                if(valid) {
                     this.formServeDetail.user_id = sessionStorage.user_id
                    let data =this.$qs.stringify(this.formServeDetail)
                    editWorker(data).then(res=>{
                        if(res.errno == 0) {
                            this.$message({
                                showClose: true,
                                message: "修改成功!",
                                duration: 1000,
                                type: "success"
                            });
                            this.initData()
                            this.$refs["formServeDetail"].resetFields()
                            this.dialogServeDetail = false
                        }else {
                            this.$message({
                                showClose: true,
                                message: res.errmsg,
                                duration: 1000,
                                type: "error"
                            });
                            this.dialogServeDetail = false
                        }
                    })
                }
            })
        },
        resetForm(val) { // 点取消重置表单
            this.dialogServeAdd = false
            this.dialogServeDetail = false
            this.formServeAdd.remark = ''
            this.$refs[val].resetFields()
        },
        serveSearch() { // 搜索(未完成)
            this.initData()
        },
        reset() { // 刷新
            this.reload();
        },
        changePass() { // 控制密码框显隐
            this.$refs["formServeDetail"].resetFields()
            this.isChangePass= !this.isChangePass
            if(!this.isChangePass) {
                this.formServeDetail.password = this.formServeDetail.oldPass
            }
        },
        handleCurrentChange(val) { // 分页
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
/* 头部面包屑 */
.workerList{
    margin: 20px;
}
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
.active {
    color: #6cf;
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
.el-row {
  border-top: 1px dashed #ccc;
}

</style>
sty