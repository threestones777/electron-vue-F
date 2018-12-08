<template>
    <div class="vipProfile">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>会员</el-breadcrumb-item>
                <el-breadcrumb-item>会员档案</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <!-- 搜索 -->
            <el-form :inline="true" :model="formServe" class="demo-form-inline">
                <!-- <el-form-item label="">
                    <el-input	size="small" v-model="formServe.name" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input	size="small" type="tel" v-model="formServe.marks" placeholder="编号"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input	size="small" type="tel" v-model="formServe.marks" placeholder="备注信息"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <el-input placeholder="请输入姓名" @input="search" v-model="keywords" style="width:50%;margin-right:10px" size="small">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                    <el-button type="primary" size="small" @click="add">新增</el-button>
                    <el-button type="primary" size="small" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form>
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
            <el-dialog width="1000px" title="会员档案" :visible.sync="dialogServeDetail">
                <el-form label-position="left" ref="form" :model="formServeDetail" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="姓名">
                                <el-input v-model="formServeDetail.user_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="会员卡号" prop="user_card" :rules="rule2">
                                <el-input v-model.number="formServeDetail.user_card" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="有效期截至" prop="end_valid" :rules="rule">
                                <el-date-picker
                                v-model="formServeDetail.end_valid"
                                type="date"
                                :picker-options="pickerOptions"
                                value-format="timestamp"
                                format="yyyy 年 MM 月 dd 日"
                                placeholder="选择日期时间">
                                </el-date-picker>
                                <!-- <el-input v-model="formServeDetail.end_valid" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="发卡日期">
                                <el-input disabled v-model="formServeDetail.add_time" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="发卡店名">
                                <el-input v-model="formServeDetail.subshop_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="属性">
                                <el-input v-model="formServeDetail.attr_value" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="生日">
                                <el-date-picker
                                v-model="formServeDetail.birthday"
                                type="date"
                                value-format="timestamp"
                                format="yyyy 年 MM 月 dd 日"
                                placeholder="选择日期时间">
                                </el-date-picker>
                                <!-- <el-input v-model="formServeDetail.birthday" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="修改日期">
                                <el-input disabled v-model="formServeDetail.edit_time" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="累计消费额" prop="sum_xiaofei_price" :rules="rule">
                                <el-input-number v-model="formServeDetail.sum_xiaofei_price" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.sum_xiaofei_price" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="累计消费次数" prop="xiaofei_num" :rules="rule">
                                <el-input-number v-model="formServeDetail.xiaofei_num" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.xiaofei_num" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="可用积分" prop="available_integral" :rules="rule">
                                <el-input-number v-model="formServeDetail.available_integral" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.available_integral" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="已兑换积分" prop="used_integral" :rules="rule">
                                <el-input-number v-model="formServeDetail.used_integral" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.used_integral" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="最后销售日期" prop="last_xiaoshou_time" :rules="rule">
                                <el-date-picker
                                v-model="formServeDetail.last_xiaoshou_time"
                                type="date"
                                value-format="timestamp"
                                format="yyyy 年 MM 月 dd 日"
                                placeholder="选择日期时间">
                                </el-date-picker>
                                <!-- <el-input v-model="formServeDetail.last_xiaoshou_time" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeDetail = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="editDone('form')">保存</el-button>
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
                prop="user_name"
                align="center"
                label="姓名">
                </el-table-column>
                <el-table-column
                prop="user_card"
                align="center"
                label="会员卡号">
                </el-table-column>
                <el-table-column
                prop="end_valid"
                align="center"
                label="有效期截至">
                </el-table-column>
                <el-table-column
                prop="add_time"
                align="center"
                label="发卡日期">
                </el-table-column>
                <el-table-column
                prop="subshop_name"
                align="center"
                label="发卡店名">
                </el-table-column>
                <el-table-column
                prop="attr_value"
                align="center"
                label="属性">
                </el-table-column>
                <el-table-column
                prop="birthday"
                align="center"
                label="生日">
                </el-table-column>
                <el-table-column
                prop="edit_time"
                align="center"
                label="修改日期">
                </el-table-column>
                <el-table-column
                prop="sum_xiaofei_price"
                align="center"
                label="累计消费额">
                </el-table-column>
                <el-table-column
                prop="xiaofei_num"
                align="center"
                label="累计消费次数">
                </el-table-column>
                <el-table-column
                prop="available_integral"
                align="center"
                label="可用积分">
                </el-table-column>
                <el-table-column
                prop="used_integral"
                align="center"
                label="已兑换积分">
                </el-table-column>
                <el-table-column
                prop="last_xiaoshou_time"
                align="center"
                label="最后销售日期">
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                width="90"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showDetails(scope.row),dialogServeDetail = true">详情</el-button>
                        <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, Data)">删除</el-button>
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
  getVipprofileList,
  getVipprofileDetail,
  addVipprofile,
  editVipprofile
} from "../../api/api";
export default {
  data() {
    return {
      page: 1,
      page_size: 10,
      loading: true,
      total: 0,
      isEdit:false,
      dialogServeAdd: false,
      dialogServeDetail: false,
      keywords:'',
      formServe: {
        name: "",
        marks: ""
      },
      pickerOptions:{
          disabledDate(time) {
            return time.getTime() < Date.now() - 3600*24*1000;
          }
      },
      formServeAdd: {
        name: ""
      },
      formServeDetail: {
        name: ""
      },
      Data: [
        {
          name: "text"
        }
      ],
      rule: [{ required: true, message: "不能为空" }],
      rule2: [{ required: true, message: "不能为空" },{type:'number',message:'必须为数字'}]
    };
  },
  methods: {
    initData() {
      // 获取列表
      let data = this.$qs.stringify({
        subsite_id: 3,
        user_id: sessionStorage.user_id,
        page: this.page,
        page_size: this.page_size
      });
      getVipprofileList(data).then(res => {
        console.log(res.data);
        if (res.errno == 0) {
          this.Data = res.data.orders;
          this.total = Number(res.data.record_count);
          this.loading = false;
        }
      });
    },
    add() {
      this.isEdit = false;
      this.formServeDetail = {}
      if(this.$refs.form) {
        this.$refs.form.resetFields()
      }
      this.dialogServeDetail = true;
    },
    editDone(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isEdit) {
            this.formServeDetail.status = 0;
            this.formServeDetail.add_time = parseInt(+new Date() / 1000);
            this.formServeDetail.edit_time = parseInt(+new Date() / 1000);
            this.formServeDetail.end_valid = parseInt(this.formServeDetail.end_valid / 1000);
            this.formServeDetail.last_xiaoshou_time = parseInt(this.formServeDetail.last_xiaoshou_time / 1000);
            let tmpData = this.$qs.stringify(this.formServeDetail);
            editVipprofile(tmpData).then(res => {
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
              this.dialogServeDetail = false;
            });
          } else {
            this.formServeDetail.adminid = 2;
            this.formServeDetail.edit_user = 2;
            this.formServeDetail.status = 0;
            this.formServeDetail.sex = 1;
            this.formServeDetail.add_time = parseInt(+new Date() / 1000);
            this.formServeDetail.edit_time = parseInt(+new Date() / 1000);
            this.formServeDetail.end_valid = parseInt(this.formServeDetail.end_valid / 1000);
            this.formServeDetail.last_xiaoshou_time = parseInt(this.formServeDetail.last_xiaoshou_time / 1000);
            let tmpData = this.$qs.stringify(this.formServeDetail);
            addVipprofile(tmpData).then(res => {
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
    search() {
        let data=this.$qs.stringify({
            user_name:this.keywords
        });
        getVipprofileList(data).then(res => {
            console.log(res.data);
            if (res.errno == 0) {
            this.Data = res.data.orders;
            this.total = Number(res.data.record_count);
            this.loading = false;
            }
        });
    }, 
    reset() {
      this.initData()
    },
    handleCurrentChange(val) {
      this.page = val;
      this.initData();
    },
    showDetails(row) {
      this.isEdit = true;
      // this.formServeDetail = row
      let data = this.$qs.stringify({ id: row.id });
      getVipprofileDetail(data).then(res => {
        if (res.errno == 0) {
          this.formServeDetail = res.data;
          this.formServeDetail.sum_xiaofei_price = res.data.sum_xiaofei_price.substring(1);
          this.formServeDetail.last_xiaoshou_time = +new Date(res.data.last_xiaoshou_time);
          this.formServeDetail.end_valid = +new Date(res.data.end_valid);
          this.formServeDetail.user_card = Number(res.data.user_card);
        //   this.formServeDetail.base_price = res.data.base_price.substring(1);
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
          console.log(rows.id);
          let tmpData = this.$qs.stringify({ is_delete: 1, id: rows.id });
          editVipprofile(tmpData).then(res => {
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
    }
  },
  created() {
    this.initData();
  }
};
</script>
<style scoped>
.vipProfile {
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
    width: 200px;
    text-align: right;
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
.main-table>>>.el-dialog__body .el-date-editor,
.main-table>>>.el-dialog__body .el-input-number {
    width: 100%;
}
.el-row {
  border-top: 1px dashed #ccc;
}
</style>