<template>
    <div class="customerComplaint">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>会员</el-breadcrumb-item>
                <el-breadcrumb-item>客户投诉</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <!-- 搜索 -->
            <el-form :inline="true" :model="formServe" class="search">
                <!-- <el-form-item label="">
                    <el-input	size="small" v-model="formServe.user_name" placeholder="请选择客户" @focus="visible=true,isOut=true,getCustomer()"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input	size="small" type="tel" v-model="formServe.marks" placeholder="编号"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input	size="small" type="tel" v-model="formServe.marks" placeholder="备注信息"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <el-input placeholder="请输入管理员id" @input="search" v-model="keywords" style="width:50%;margin-right:10px" size="small">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                    <el-button type="primary" size="small" @click="add">新增</el-button>
                    <el-button type="primary" size="small" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form>
             <!-- 全局客户列表弹出 -->
            <el-dialog
                width="780px"
                title="选择客户"
                :visible.sync="visible">
                <!-- 客户搜索 -->
                <el-form :inline="true" :model="formcustomer" class="demo-form-inline">
                    <el-form-item label="">
                        <el-input size="small" v-model="formcustomer.add_time1" placeholder="名称"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-input size="small" v-model="formcustomer.bill_sn" placeholder="编号"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-input size="small" v-model="formcustomer.status" placeholder="状态"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="customerSearch">搜索</el-button>
                    </el-form-item>
                </el-form>
                <!-- 客户表格 -->
                <el-table
                    :row-style="{height:0}"  
                    :cell-style="{padding:0}"
                    :header-row-style="{height:0}"  
                    :header-cell-style="{padding:0}"
                    @current-change="handleCurrentChange3"
                    border
                    highlight-current-row
                    v-loading="loading2"
                    :data="customerList">
                    <el-table-column prop="user_name" align="center" label="客户名称"></el-table-column>
                    <el-table-column prop="user_id" align="center" label="客户编号"></el-table-column>
                    <el-table-column prop="mobile_phone" align="center" label="手机号"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="email" align="center" label="邮箱"></el-table-column>
                </el-table>
                <!-- 分页器 -->
                <el-pagination
                    @current-change="handleCurrentChange2"
                    layout="total,prev, pager, next,jumper"
                    :page_size="page_size2"
                    :total="total2">
                </el-pagination>
                <el-button class="btn-b" type="primary" @click="selectCustomer" size="small">确认</el-button>
            </el-dialog>
            <!-- 新增弹出框 -->
            <el-dialog width="500px" title="客户投诉" :visible.sync="dialogServeAdd">
                <div class="edit" v-show="isShow">
                    <el-button type="primary" @click="isShow=false,isEdit=true" size="small">进入编辑</el-button>
                </div>
                <el-form :model="formServeAdd" ref="formAdd">
                    <el-form-item label="客户名称：">
                        <el-input disabled :clearable="clearable" placeholder="请选择客户(必填项)" style="width:200px" v-model="formServeAdd.user_name"></el-input>
                            <el-button class="btn-t" :disabled="isShow" @click="getCustomer(),isOut=false,visible=true" type="primary" size="small">选择客户</el-button>
                            <el-button class="btn-t" :disabled="isShow" @click="resetName" type="primary" size="small">重置</el-button>
                    </el-form-item>
                    <el-form-item label="投诉主题：">
                        <el-input :disabled="isShow" style="width:220px" v-model="formServeDetail.theme" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="投诉时间：" prop="complaint_time" :rules="rule">
                        <el-date-picker
                        v-model="formServeAdd.complaint_time"
                        type="date"
                        :disabled="isShow"
                        value-format="yyyy-MM-dd"
                        format="yyyy 年 MM 月 dd 日"
                        placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="投诉类型：" prop="type" :rules="rule">
                        <el-select :disabled="isShow" v-model="formServeAdd.type" placeholder="请选择投诉类型">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="紧急程度：" prop="emergency" :rules="rule">
                        <el-select :disabled="isShow" v-model="formServeAdd.emergency" placeholder="请选择紧急程度">
                            <el-option
                            v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="投诉方式：" prop="complaint_mode" :rules="rule">
                        <el-select :disabled="isShow" v-model="formServeAdd.complaint_mode" placeholder="请选择投诉方式">
                            <el-option
                            v-for="item in options3"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="联系电话：">
                        <el-input-number :disabled="isShow" :controls="false" v-model="formServeAdd.mobile" :max="11" :min="11"></el-input-number>
                    </el-form-item>
                    <el-form-item label="投诉内容：">
                        <el-input
                        :disabled="isShow"
                        type="textarea"
                        autosize
                        style="width:80%"
                        placeholder="跟进结果"
                        v-model="formServeAdd.complaint_content">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="评论：" v-show="isShow">
                        <el-button type="text" @click="showCmt">展开查看评论</el-button>
                        <el-button type="text" v-show="isCmtShow" @click="open3()">评论该跟进</el-button>
                        <div v-if="isCmtShow">
                            <div class="cmt" v-for="(v,i) in cmtList" :key="i">
                                <div class="cmt-t">
                                    <span>{{v.user_name}} 于 {{v.comment_time}} 评论</span>
                                    <div>
                                        <el-button class="reply" type="text" @click="open3(v.id)">快捷回复</el-button>
                                        <el-button v-show="v.commentator==user_id" class="reply" type="text" @click="delCmt(v.id)">删除</el-button>
                                    </div>
                                </div>
                                <div class="cmt-c">
                                    {{v.comment_content}}
                                </div>
                                <div class="cmt-b">
                                    <div class="cmt-in" v-for="(item,index) in v.son" :key="index">
                                        <div class="cmt-int">
                                            <span>{{item.user_name}} 于 {{item.comment_time}} 回复</span>
                                            <el-button v-show="item.commentator==user_id" class="reply" type="text" @click="delCmt(item.id)">删除</el-button>
                                        </div>
                                        <div class="cmt-inc">
                                            {{item.comment_content}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div v-show="!cmtList">暂时没有评论</div>
                        </div>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" v-show="!isShow">
                    <el-button @click="dialogServeAdd = false">取 消</el-button>
                    <el-button type="primary" @click="addDone('formAdd')">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 详情弹出框 -->
            <el-dialog width="450px" title="客户投诉" :visible.sync="dialogServeDetail">
                <el-form :model="formServeDetail" label-position="left">
                    <el-form-item label="录入时间：">
                        <span>由 {{formServeDetail.admin_name }} 于 {{formServeDetail.addtime}} 录入</span>
                    </el-form-item>
                    <el-form-item label="最后修改：">
                        <span>修改次数:{{formServeDetail.update_num}}</span>
                    </el-form-item>
                    <el-form-item label="客户名称：">
                        <span>{{formServeDetail.user_name}}</span>
                    </el-form-item>
                    <el-form-item label="跟进时间：">
                        <span></span>
                    </el-form-item>
                    <el-form-item label="备注信息：">
                        <el-input v-model="formServeDetail.marks"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeDetail = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="dialogServeDetail = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="Data"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            v-loading="loading"
            style="width: 100%">
                <el-table-column
                prop="adminid"
                align="center"
                label="管理员id">
                </el-table-column>
                <el-table-column
                prop="user_name"
                align="center"
                label="客户名称">
                </el-table-column>
                <el-table-column
                prop="theme"
                align="center"
                label="投诉主题">
                </el-table-column>
                <el-table-column
                prop="emergency"
                align="center"
                :formatter="formatter"
                label="紧急程度">
                </el-table-column>
                <el-table-column
                prop="admin_name"
                align="center"
                label="录入人">
                </el-table-column>
                <el-table-column
                prop="entry_time"
                align="center"
                label="录入时间">
                </el-table-column>
                <el-table-column
                prop="status"
                align="center"
                :formatter="formatter2"
                label="处理状态">
                </el-table-column>
                <el-table-column
                prop="fuzeren_name"
                align="center"
                label="负责人">
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showDetails(scope.row),dialogServeAdd = true">详情</el-button>
                        <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.row)">删除</el-button>
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
import {
  getCustomercomplainList,
  getCustomercomplainDetail,
  addCustomercomplain,
  editCustomercomplain,
  getCustomercomplainCmtList,
  replyCustomercomplainCmt,
  delCustomercomplainCmt,
  getcustomerList //客户列表
} from "../../api/api";
export default {
  data() {
    return {
      page: 1,
      page_size: 10,
      total: 0,
      loading: true,
      keywords:'',
      page2: 1,
      page_size2: 10,
      total2: 0,
      loading2: true,
      value: "",
      clearable: false,
      isShow: false,//是否是禁止编辑的详情查看状态(为false时也可能是处于添加状态,所以不能作为编辑的flag),
      isEdit:false,//是否是编辑状态
      isCmtShow: false,
      visible: false,
      user_id: 0,
      dialogServeAdd: false,
      dialogServeDetail: false,
      formServe: {},
      formcustomer: {},
      formServeAdd: {},
      formServeDetail: {},
      Data: [],
      isOut:false, // 是否是在跟进搜索时打开的客户选择框
      detail_id: "", // 详情操作的跟进id
      selected: null, // 已选择的客户信息数据
      customerList: [], //全局的客户列表数据
      cmtList: [], //评论列表
      rule: [{ required: true, message: "不能为空" }],
      options: [
        {
          value: "0",
          label: "产品投诉"
        },
        {
          value: "1",
          label: "服务投诉"
        },
        {
          value: "2",
          label: "客户意见"
        },
        {
          value: "3",
          label: "客户意见"
        }
      ],
      options2: [
        {
          value: "0",
          label: "非常紧急"
        },
        {
          value: "1",
          label: "紧急"
        },
        {
          value: "2",
          label: "一般"
        }
      ],
      options3: [
        {
          value: "0",
          label: "电话"
        },
        {
          value: "1",
          label: "邮件"
        },
        {
          value: "2",
          label: "网上留言"
        },
        {
          value: "3",
          label: "在线客服"
        },
        {
          value: "4",
          label: "其他"
        }
      ]
    };
  },
  methods: {
    initData(obj) {
      // 获取跟进列表
      let data = {
        subsite_id: 3,
        // user_id: sessionStorage.user_id,
        page: this.page,
        page_size: this.page_size
      };
      if(obj) {
        data = Object.assign(data,obj)
      }
      getCustomercomplainList(this.$qs.stringify(data)).then(res => {
        console.log(res);
        if (res.errno == 0) {
          this.Data = res.data.orders;
          this.total = Number(res.data.record_count);
          this.loading = false;
        }
      });
    },
    delCmt(v) {
      // 删除评论
      this.$confirm("即将执行删除操作,评论及回复都会删除,确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let tmpData = this.$qs.stringify({ subsite_id: 3, id: v });
          delCustomercomplainCmt(tmpData).then(res => {
            if (res.errno == 0) {
              this.$message({
                type: "success",
                message: "删除成功!",
                duration: 1000
              });
              this.showCmt();
            } else {
              this.$message({
                type: "error",
                message: res.errmsg,
                duration: 1000
              });
            }
          });
        })
        .catch(res => {
          console.log("用户取消删除");
        });
    },
    open3(v) {
      // 快捷回复
      this.$prompt("请输入回复内容", null, {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (value.trim() == "") {
            this.$message({
              type: "error",
              message: "请不要回复空内容哦!"
            });
            return;
          }
          let data;
          if (!v) {
            data = {
              commentator: sessionStorage.user_id,
              main_id: this.detail_id,
              comment_content: value
            };
          } else {
            data = {
              commentator: sessionStorage.user_id,
              parent_id: v ? v : 0,
              comment_content: value
            };
          }
          console.log(data);
          replyCustomercomplainCmt(this.$qs.stringify(data)).then(res => {
            if (res.errno == 0) {
              this.$message({
                type: "success",
                message: "成功!"
              });
            } else {
              this.$message({
                type: "error",
                message: res.errmsg
              });
            }
            this.showCmt();
          });
          console.log(value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消回复"
          });
        });
    },
    showCmt() {
      // 展开并请求评论列表
      let data = this.$qs.stringify({
        subsite_id: 3,
        main_id: this.detail_id
      });
      getCustomercomplainCmtList(data).then(res => {
        console.log(res);
        console.log(this.detail_id);
        if (res.errno == 0) {
          this.cmtList = res.data.son;
          this.isCmtShow = true;
        }
      });
    },
    add() {
      // 打开添加弹框
      this.isShow = false;
      this.isEdit = false;
      this.formServeAdd = {};
      if (this.$refs.formAdd) {
        this.$refs.formAdd.resetFields();
      }
      this.dialogServeAdd = true;
    },
    getCustomer() {
      // 获取客户列表
      let data = {
        subsite_id: 3,
        // user_id: sessionStorage.user_id,
        page: this.page2,
        page_size: this.page_size2
      };
      getcustomerList({ params: data }).then(res => {
        console.log(res);
        if (res.errno == 0) {
          this.customerList = res.data.user_list;
          this.total2 = Number(res.data.record_count);
          this.loading2 = false;
        }
      });
    },
    search() {
      let data=this.$qs.stringify({
          adminid:this.keywords
      });
      getCustomercomplainList(data).then(res => {
        console.log(res);
        if (res.errno == 0) {
          this.Data = res.data.orders;
          this.total = Number(res.data.record_count);
          this.loading = false;
        }
      });
  }, 
    customerSearch() {
      // 客户搜索
    },
    serveSearch() {
      // 跟进搜索
      this.initData(this.formServe)
      console.log(this.formServe);
    },
    reset() {
      // 刷新
      this.formServe = {};
      this.initData();
    },
    handleCurrentChange(val) {
      // 跟进列表翻页
      this.page = val
      this.initData()
    },
    handleCurrentChange2(val) {
      // 全局客户列表翻页
      this.page2 = val
      this.getCustomer()
    },
    handleCurrentChange3(val) {
      // 已选客户数据
      this.selected = val;
    },
    showDetails(row) {
      // 跟进详情
      this.isShow = true;
      this.isCmtShow = false;
      this.detail_id = row.id;
      let data = this.$qs.stringify({ id: row.id });
      getCustomercomplainDetail(data).then(res => {
        if (res.errno == 0) {
          console.log(res);
          this.formServeAdd = res.data[0];
        }
      });
    },
    deleteRow(rows) {
      // 删除跟进
      this.$confirm("即将执行删除操作, 确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let tmpData = this.$qs.stringify({ id: rows.id, is_delete: 1 });
          editCustomercomplain(tmpData).then(res => {
            if (res.errno == 0) {
              this.$message({
                type: "success",
                message: "删除成功!",
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
          });
        })
        .catch(res => {
          console.log("用户取消删除");
        });
    },
    addDone(formName) {
      // 确认添加跟进 及 编辑跟进
      if (!this.formServeAdd.user_name) {
        this.$message({
          type: "error",
          message: "客户不能为空!",
          duration: 1000
        });
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
            if(this.isEdit) {
                console.log("111")
                this.formServeAdd.id = this.detail_id
                let tmpData = this.$qs.stringify(this.formServeAdd);
                editCustomercomplain(tmpData).then(res=>{
                    if (res.errno == 0) {
                        this.$message({
                        type: "success",
                        message: "编辑成功!",
                        duration: 1000
                        });
                    } else {
                        this.$message({
                        type: "error",
                        message: res.errmsg,
                        duration: 1000
                        });
                    }
                    this.dialogServeAdd = false;
                    this.initData();
                })
            }else {
                console.log("222")
                let tmpData = this.$qs.stringify(this.formServeAdd);
                addCustomercomplain(tmpData).then(res => {
                  if (res.errno == 0) {
                    this.$message({
                      type: "success",
                      message: "添加成功!",
                      duration: 1000
                    });
                  } else {
                    this.$message({
                      type: "error",
                      message: res.errmsg,
                      duration: 1000
                    });
                  }
                  this.dialogServeAdd = false;
                  this.initData();
                });
            }
        }
      });
    },
    selectCustomer() {
      // 将选择的客户加入视图
      if (this.selected) {
        if(this.isOut) {
          this.formServe.user_name = this.selected.user_name;
          this.formServe.user_id = this.selected.user_id;
        }
        this.formServeAdd.user_name = this.selected.user_name;
        this.formServeAdd.user_id = this.selected.user_id;
      }
      this.visible = false;
      this.clearable = false;
    },
    resetName() {
      // 重置按钮(曲线救国)
      this.clearable = true;
      delete this.formServeAdd.user_name;
      delete this.formServeAdd.user_id;
    },
    formatter(row, column) {
      switch (row.emergency) {
        case "0":
          return "非常紧急";
          break;
        case "1":
          return "紧急";
          break;
        case "2":
          return "一般";
          break;
      }
    },
    formatter2(row, column) {
      switch (row.status) {
        case "0":
          return "等待处理";
          break;
        case "1":
          return "已取消";
          break;
        case "2":
          return "未解决";
          break;
        case "3":
          return "已处理";
          break;
      }
    }
  },
  created() {
    this.initData();
    this.user_id = sessionStorage.user_id;
  }
};
</script>
<style scoped>
.customerComplaint {
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
.main-table .el-form.search {
  padding-top: 10px;
  text-align: center;
}
.el-form.search .el-form-item {
  margin-bottom: 10px;
}

/* 分页器 */
.el-pagination {
  padding: 20px 0;
  text-align: right;
}

/* 新增弹出框 & 详情弹出框*/
.main-table >>> .el-dialog__body {
  padding: 0 20px;
  overflow: hidden;
}
.btn-b {
  float: right;
  margin-bottom: 5px;
}
.el-form-item {
  border-top: 1px dashed #ccc;
  padding: 10px 0;
  margin-bottom: 0;
}
.edit {
  width: 100%;
  margin-bottom: 6px;
  text-align: right;
}
.cmt {
  width: 100%;
  padding: 0 5px;
  box-sizing: border-box;
  border-radius: 6px;
  background: #eee;
  display: flex;
  margin-bottom: 5px;
  flex-direction: column;
}
.cmt-int {
  display: flex;
  justify-content: space-between;
}
.cmt .cmt-b {
  width: 95%;
  display: flex;
  flex-direction: column;
  align-self: flex-end;
}
.cmt .cmt-t {
  display: flex;
  justify-content: space-between;
}
.cmt .cmt-b .reply {
  align-self: flex-end;
}
.cmt .cmt-b .cmt-in {
  padding: 0 5px;
  margin-bottom: 4px;
  box-sizing: border-box;
  background: #ccc;
  border-radius: 6px;
}
</style>