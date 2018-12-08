<template>
    <div class="vipSetting">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>会员</el-breadcrumb-item>
                <el-breadcrumb-item>会员设置</el-breadcrumb-item>
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
                    <el-input placeholder="请输入会员等级" @input="search" v-model="keywords" style="width:50%;margin-right:10px" size="small">
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
            <el-dialog width="1030px" title="会员设置" :visible.sync="dialogServeDetail">
                <el-form label-position="left" ref="form" :model="formServeDetail" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="等级">
                                <el-input v-model="formServeDetail.user_rank" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="优惠率" prop="discount_rate" :rules="rule">
                                <el-input-number v-model="formServeDetail.discount_rate" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.discount_rate" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="制卡人">
                                <el-input v-model="formServeDetail.admin_name" autocomplete="off"></el-input>
                            </el-form-item>
                            <!-- <el-form-item label="状态">
                                <el-input disabled v-model="formServeDetail.status" autocomplete="off"></el-input>
                            </el-form-item> -->
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="辅助属性">
                                <el-input v-model="formServeDetail.attr_value" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="消费额度" prop="xiaofei_quota" :rules="rule">
                                <el-input-number v-model="formServeDetail.xiaofei_quota" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.xiaofei_quota" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="积分额度" prop="integral_quota" :rules="rule">
                                <el-input-number v-model="formServeDetail.integral_quota" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.integral_quota" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="积分现金" prop="integral_price" :rules="rule">
                                <el-input-number v-model="formServeDetail.integral_price" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.integral_price" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="积分规则">
                                <el-input v-model="formServeDetail.integral_rule" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="金额基数" prop="base_price" :rules="rule">
                                <el-input-number v-model="formServeDetail.base_price" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.base_price" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="每月第几天" prop="month_day" :rules="rule">
                                <el-input-number v-model="formServeDetail.month_day" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.month_day" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="月积分倍率" prop="month_bei_intgral" :rules="rule">
                                <el-input-number v-model="formServeDetail.month_bei_intgral" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.month_bei_intgral" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="每周第几天" prop="week_day" :rules="rule">
                                <el-input-number v-model="formServeDetail.week_day" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.week_day" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="周积分倍率" prop="week_bei_integral" :rules="rule">
                                <el-input-number v-model="formServeDetail.week_bei_integral" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.week_bei_integral" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="生日积分倍率" prop="birthday_bei_integral" :rules="rule">
                                <el-input-number v-model="formServeDetail.birthday_bei_integral" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.birthday_bei_integral" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="生日月积分倍率" prop="birthday_month_bei" :rules="rule">
                                <el-input-number v-model="formServeDetail.birthday_month_bei" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.birthday_month_bei" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!-- <el-row>
                        <el-col :span="8">
                            <el-form-item label="制卡日期">
                                <el-input disabled v-model="formServeDetail.add_time" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="制卡人">
                                <el-input v-model="formServeDetail.admin_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row> -->
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
            v-loading="loading"
            style="width: 100%">
                <el-table-column
                prop="user_rank"
                align="center"
                label="等级">
                </el-table-column>
                <el-table-column
                prop="discount_rate"
                align="center"
                label="优惠率">
                </el-table-column>
                <el-table-column
                prop="status"
                align="center"
                label="状态">
                </el-table-column>
                <el-table-column
                prop="attr_value"
                align="center"
                label="辅助属性">
                </el-table-column>
                <el-table-column
                prop="xiaofei_quota"
                align="center"
                label="消费额度">
                </el-table-column>
                <el-table-column
                prop="integral_quota"
                align="center"
                label="积分额度">
                </el-table-column>
                <el-table-column
                prop="integral_price"
                align="center"
                label="积分现金">
                </el-table-column>
                <el-table-column
                prop="integral_rule"
                align="center"
                label="积分规则">
                </el-table-column>
                <el-table-column
                prop="base_price"
                align="center"
                label="金额基数">
                </el-table-column>
                <el-table-column
                prop="month_day"
                align="center"
                label="每月第几天">
                </el-table-column>
                <el-table-column
                prop="month_bei_intgral"
                align="center"
                label="每月几倍积分">
                </el-table-column>
                <el-table-column
                prop="week_day"
                align="center"
                label="每周第几天">
                </el-table-column>
                <el-table-column
                prop="week_bei_integral"
                align="center"
                label="每周几倍积分">
                </el-table-column>
                <el-table-column
                prop="birthday_bei_integral"
                align="center"
                label="生日几倍积分">
                </el-table-column>
                <el-table-column
                prop="birthday_month_bei"
                align="center"
                label="生日月几倍积分">
                </el-table-column>
                <el-table-column
                prop="add_time"
                align="center"
                label="制卡日期">
                </el-table-column>
                <el-table-column
                prop="admin_name"
                align="center"
                label="制卡人">
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
  getVipsettingList,
  getVipsettingDetail,
  addVipsetting,
  editVipsetting
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
      rule: [{ required: true, message: "不能为空" }]
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
        getVipsettingList(data).then(res => {
            console.log(res.data);
            if (res.errno == 0) {
            this.Data = res.data.vipsetting_list;
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
            let tmpData = this.$qs.stringify(this.formServeDetail);
            editVipsetting(tmpData).then(res => {
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
            this.formServeDetail.type_id = 2;
            this.formServeDetail.status = 0;
            this.formServeDetail.add_time = parseInt(+new Date() / 1000);
            let tmpData = this.$qs.stringify(this.formServeDetail);
            addVipsetting(tmpData).then(res => {
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
            user_rank:this.keywords
        });
        getVipsettingList(data).then(res => {
            console.log(res.data);
            if (res.errno == 0) {
            this.Data = res.data.vipsetting_list;
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
      let data = this.$qs.stringify({ type_id: row.type_id });
      getVipsettingDetail(data).then(res => {
        if (res.errno == 0) {
          this.formServeDetail = res.data;
          this.formServeDetail.xiaofei_quota = res.data.xiaofei_quota.substring(1);
          this.formServeDetail.base_price = res.data.base_price.substring(1);
        }
      });
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    }
  },
  created() {
    this.initData();
  }
};
</script>
<style scoped>
.vipSetting {
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
  width: 80%;
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
.vipSetting >>> .el-dialog .el-input {
  width: 100% !important;
}
.el-dialog__body .el-form {
  text-align: right;
}
.el-row {
  border-top: 1px dashed #ccc;
}
</style>