<template>
    <div class="moveReceipt">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>仓库</el-breadcrumb-item>
                <el-breadcrumb-item>移仓单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <fieldset style="margin:10px 0;border-color:#fff;text-align:left">
                <legend>查询条件</legend>
                <el-row type="flex" justify="space-around" :gutter="10">
                    <el-col :span="5">
                        <el-date-picker
                        v-model="search3" size="small"
                        style="width:100%;margin-top:20px"
                        type="daterange"
                        align="right"
                        unlink-panels
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </el-col>
                    <el-col :span="4">
                        <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search"  size="mini"  placeholder="订单号"/>
                        <el-select v-model="value2" size="small" placeholder="分店">
                            <el-option
                            v-for="item in options2"
                            :key="item.value2"
                            :label="item.label"
                            :value="item.value2">
                            </el-option>
                        </el-select> 
                    </el-col>
                    <el-col :span="4">
                        <el-select v-model="value1" size="small" placeholder="状态">
                            <el-option
                            v-for="item in options1"
                            :key="item.value1"
                            :label="item.label"
                            :value="item.value1">
                            </el-option>
                        </el-select> 
                        <el-select v-model="value5" size="small" placeholder="移出仓" style="margin-top:5px">
                            <el-option
                            v-for="item in options5"
                            :key="item.value5"
                            :label="item.label"
                            :value="item.value5">
                            </el-option>
                        </el-select> 
                    </el-col>
                    <el-col :span="4">
                        <el-select v-model="value3" size="small" placeholder="分公司">
                            <el-option
                            v-for="item in options3"
                            :key="item.value3"
                            :label="item.label"
                            :value="item.value3">
                            </el-option>
                        </el-select> 
                        <el-select v-model="value4" size="small" placeholder="分店类型" style="margin-top:5px">
                            <el-option
                            v-for="item in options4"
                            :key="item.value4"
                            :label="item.label"
                            :value="item.value4">
                            </el-option>
                        </el-select> 
                    </el-col>
                    <el-col :span="3">
                        <el-button type="primary" size="small" @click="reset">刷新</el-button><br>
                        <el-button icon="el-icon-tickets"  style="margin-top:5px" type="primary" size="small" @click="dialogShow=true">显示列</el-button>
                    </el-col>
                </el-row>          
            </fieldset>

            <!-- <el-form :inline="true" :model="formServe" class="demo-form-inline">
                <el-form-item>
                    <el-input placeholder="请输入单据编号" @input="search" v-model="keywords" style="width:50%;margin-right:10px" size="small">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                    <el-button type="primary" size="small" @click="add">新增</el-button>
                    <el-button type="primary" size="small" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form> -->
            <!-- 新增弹出框 -->
            <el-dialog width="450px" title="新增" :visible.sync="dialogServeAdd">
                <el-form :model="formServeAdd">
                    <el-form-item label="编号">
                        <el-input v-model="formServeAdd.price"></el-input>
                    </el-form-item>
                    <el-form-item label="备注信息">
                        <el-input v-model="formServeAdd.servePrice"></el-input>
                    </el-form-item>                    
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogServeAdd = false">取 消</el-button>
                    <el-button type="primary" @click="dialogServeAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 详情弹出框 -->
            <el-dialog width="300px" title="详情" :visible.sync="dialogServeDetail">
                <el-form :model="formServeDetail" ref="form">
                    <el-form-item label="分店名字">
                        <el-input v-model="formServeDetail.subshop_name"></el-input>
                    </el-form-item>
                    <el-form-item label="单据编号">
                        <el-input v-model="formServeDetail.bill_sn"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="操作日期">
                        <el-input disabled v-model="formServeDetail.add_time"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-input disabled v-model="formServeDetail.status"></el-input>
                    </el-form-item> -->
                    <!-- <el-form-item label="操作人">
                        <el-input disabled v-model="formServeDetail.admin_name"></el-input>
                    </el-form-item> -->
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeDetail = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="editDone('form')">确 定</el-button>
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
                prop="subshop_name"
                align="center"
                label="分店名字">
                </el-table-column>
                <el-table-column
                prop="bill_sn"
                align="center"
                label="单据编号">
                </el-table-column>
                <el-table-column
                prop="add_time"
                align="center"
                label="操作日期">
                </el-table-column>
                <el-table-column
                prop="status"
                align="center"
                label="状态">
                </el-table-column>
                <el-table-column
                prop="admin_name"
                align="center"
                label="操作人">
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showDetails(scope.row),dialogServeDetail = true">详情</el-button>
                        <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
                @current-change="handleCurrentChange"
                layout="total,prev, pager, next,jumper"
                :page_size="page_size"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {
  getMovereceiptList,
  getMovereceiptDetail,
  addMovereceipt,
  editMovereceipt
} from "../../api/api";
export default {
  data() {
    return {
      page: 1,
      page_size: 10,
      loading: true,
      total: 0,
      isEdit: false,
      dialogServeAdd: false,
      dialogServeDetail: false,
      keywords:'',
      formServe: {
        name: "",
        marks: ""
      },
      formServeAdd: {
        name: ""
      },
      formServeDetail: {},
      Data: [],
      rule: [{ required: true, message: "不能为空" }],
      search:'',
            search3:['2017-7-7','2019-9-9'],
            radio:4,
            value: '' ,
            value1: '' ,
            value2: '' ,
            value3: '' ,
            value4: '' ,
            value5: '' ,
            options1: [{
            value1: '选项1',
            label: '未审核'
            }, {
            value1: '选项2',
            label: '已审核'
            },],
            options2: [{
            value2: '选项1',
            label: '0分店'
            }, {
            value2: '选项2',
            label: '1分店'
            },],
            options3: [{
            value3: '选项1',
            label: '分公司1'
            }, {
            value3: '选项2',
            label: '分公司2'
            },],
            options4: [{
            value4: '选项1',
            label: '类型1'
            }, {
            value4: '选项2',
            label: '类型2'
            },],
            options5: [{
            value5: '选项1',
            label: '仓1'
            }, {
            value5: '选项2',
            label: '仓2'
            },],
    };
  },
  methods: {
    initData() {
      let data = this.$qs.stringify({//------------------- 获取列表
        subsite_id: 3,
        user_id: sessionStorage.user_id,
        page: this.page,
        page_size: this.page_size
      });
      getMovereceiptList(data).then(res => {
        console.log(res.data);
        if (res.errno == 0) {
          this.Data = res.data.movereceipt_list;
          this.total = Number(res.data.record_count);
          this.loading = false;
        }
      });
    },
    add() {
      this.isEdit = false;
      this.formServeDetail = {};
      if (this.$refs.form) {
        this.$refs.form.resetFields();
      }
      this.dialogServeDetail = true;
    },
    editDone(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isEdit) {
            this.formServeDetail.status = 0;
            this.formServeDetail.add_time = parseInt(new Date() / 1000);
            let data = this.$qs.stringify(this.formServeDetail);
            editMovereceipt(data).then(res => {
              if (res.errno == 0) {
                this.$message({
                  showClose: true,
                  message: "修改成功",
                  duration: 1000,
                  type: "success"
                });
              } else {
                  this.$message({
                      showClose: true,
                  message: res.errmsg,
                  duration: 1000,
                  type: "error"
                });
              }
              this.initData();
              this.dialogServeDetail = false;
            });
          } else {
            this.formServeDetail.status = 0;
            this.formServeDetail.from_store = 5;
            this.formServeDetail.to_store = 2;
            this.formServeDetail.adminid = 2;
            this.formServeDetail.add_time = parseInt(new Date() / 1000);
            let tmpData = this.$qs.stringify(this.formServeDetail);
            console.log(this.formServeDetail)
            addMovereceipt(tmpData).then(res => {
              if (res.errno == 0) {
                this.$message({
                  type: "success",
                  message: "添加成功!",
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
              this.dialogServeDetail = false;
            });
          }
        }
      });
    },
    /* search() {
      let data=this.$qs.stringify({
          bill_sn:this.keywords
      });
      getMovereceiptList(data).then(res => {
        console.log(res.data);
        if (res.errno == 0) {
          this.Data = res.data.movereceipt_list;
          this.total = Number(res.data.record_count);
          this.loading = false;
        }
      });
    }, */
    reset() {
      this.initData();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.initData();
    },
    showDetails(row) {
      this.isEdit = true;
      let data = this.$qs.stringify({ id: row.id });
      getMovereceiptDetail(data).then(res => {
        if (res.errno == 0) {
          this.formServeDetail = res.data;
          // this.formServeDetail.shop_price = res.data.shop_price.substring(1);
          // this.formServeDetail.time = [+new Date(this.formServeDetail.start_time),+new Date(this.formServeDetail.end_time)];
        }
      });
    },
    deleteRow(index, rows) {
      this.$confirm("即将执行删除操作, 确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
            console.log(rows.id)
          let tmpData = this.$qs.stringify({ is_delete: 1, id: rows.id });
          editMovereceipt(tmpData).then(res => {
            if (res.errno == 0) {
              this.$message({
                type: "success",
                message: "删除成功!",
                duration: 1000
              });
              this.initData();
            }else {
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
    }
  },
  created() {
    this.initData();
  }
};
</script>
<style scoped>
.moveReceipt {
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

/* 分页器 */
.el-pagination {
  padding: 20px 0;
  text-align: right;
}

/* 新增弹出框 & 详情弹出框*/
.main-table >>> .el-dialog__body {
  padding: 0 20px;
}
.main-table >>> .el-dialog__body .el-form-item__content {
  width: 180px;
  text-align: right;
}
.main-table >>> .el-dialog__body .el-form-item.time .el-form-item__content {
    width: 80%;
}
.main-table >>> .el-dialog__body .el-form-item {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.main-table >>> .el-dialog__body .el-form-item .el-form-item__label {
  flex: 1;
  box-sizing: border-box;
  padding: 0;
  padding-left: 10px;
  text-align: left;
}
.main-table >>> .el-dialog__body .el-date-editor,
.main-table >>> .el-dialog__body .el-input-number {
  width: 100%;
}
.el-row{
    background:#F3F3F3;
    width:100%;
}
</style>