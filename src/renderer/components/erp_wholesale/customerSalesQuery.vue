<template>
    <div class="customerSalesQuery">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>批发</el-breadcrumb-item>
                <el-breadcrumb-item>客户销售查询</el-breadcrumb-item>
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
                    <el-input placeholder="请输入用户名" @input="search" v-model="keywords" style="width:50%;margin-right:10px" size="small">
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
                    <el-button	size="small" @click="dialogServeAdd = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="dialogServeAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 详情弹出框 -->
            <el-dialog width="700px" title="客户销售查询" :visible.sync="dialogServeDetail">
                <el-form label-position="left" ref="form" :model="formServeDetail" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="用户名">
                                <el-input v-model="formServeDetail.user_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="销售量" prop="xiaoshou_num" :rules="rule">
                                <el-input-number v-model="formServeDetail.xiaoshou_num" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.xiaoshou_num" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="销售金额" prop="xiaoshou_price" :rules="rule">
                                <el-input-number v-model="formServeDetail.xiaoshou_price" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.xiaoshou_price" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="赠送量" prop="give_num" :rules="rule">
                                <el-input-number v-model="formServeDetail.give_num" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.give_num" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="退货量" prop="back_num" :rules="rule">
                                <el-input-number v-model="formServeDetail.back_num" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.back_num" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="退货金额" prop="back_price" :rules="rule">
                                <el-input-number v-model="formServeDetail.back_price" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.back_price" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="退货赠送量" prop="back_give_num" :rules="rule">
                                <el-input-number v-model="formServeDetail.back_give_num" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.back_give_num" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="小计数量" prop="sum_num" :rules="rule">
                                <el-input-number v-model="formServeDetail.sum_num" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.sum_num" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="小计金额" prop="sum_price" :rules="rule">
                                <el-input-number v-model="formServeDetail.sum_price" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.sum_price" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="毛利率" prop="gross_interest_rate" :rules="rule">
                                <el-input-number v-model="formServeDetail.gross_interest_rate" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.gross_interest_rate" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="不含税销售额" prop="not_shui_xiaoshou" :rules="rule">
                                <el-input-number v-model="formServeDetail.not_shui_xiaoshou" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.not_shui_xiaoshou" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="税额" prop="shui_price" :rules="rule">
                                <el-input-number v-model="formServeDetail.shui_price" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.shui_price" autocomplete="off"></el-input> -->
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
                label="用户名">
                </el-table-column>
                <el-table-column
                prop="xiaoshou_num"
                align="center"
                label="销售量">
                </el-table-column>
                <el-table-column
                prop="xiaoshou_price"
                align="center"
                label="销售金额">
                </el-table-column>
                <el-table-column
                prop="give_num"
                align="center"
                label="赠送量">
                </el-table-column>
                <el-table-column
                prop="back_num"
                align="center"
                label="退货量">
                </el-table-column>
                <el-table-column
                prop="back_price"
                align="center"
                label="退货金额">
                </el-table-column>
                <el-table-column
                prop="back_give_num"
                align="center"
                label="退货赠送量">
                </el-table-column>
                <el-table-column
                prop="sum_num"
                align="center"
                label="小计数量">
                </el-table-column>
                <el-table-column
                prop="sum_price"
                align="center"
                label="小计金额">
                </el-table-column>
                <el-table-column
                prop="gross_interest_rate"
                align="center"
                label="毛利率">
                </el-table-column>
                <el-table-column
                prop="not_shui_xiaoshou"
                align="center"
                label="不含税销售额">
                </el-table-column>
                <el-table-column
                prop="shui_price"
                align="center"
                label="税额">
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作"
                width="90">
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
  getCustomersalesqueryList,
  getCustomersalesqueryDetail,
  addCustomersalesquery,
  editCustomersalesquery
} from "../../api/api";
export default {
  data() {
    return {
      page: 1,
      page_size: 10,
      total: 0,
      loading: true,
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
      formServeDetail: {},
      Data: [],
      rule: [{ required: true, message: "不能为空" }]
    };
  },
  methods: {
    initData() {
      // 获取列表
      let data = this.$qs.stringify({
        subsite_id: 3,
        // user_id: sessionStorage.user_id,
        page: this.page,
        page_size: this.page_size
      });
      getCustomersalesqueryList(data).then(res => {
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
      this.formServeDetail = {};
      this.dialogServeDetail = true;
    },
    editDone(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isEdit) {
            let tmpData = this.$qs.stringify(this.formServeDetail);
            editCustomersalesquery(tmpData).then(res => {
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
            this.formServeDetail.user_id = 2;
            let tmpData = this.$qs.stringify(this.formServeDetail);
            addCustomersalesquery(tmpData).then(res => {
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
      getCustomersalesqueryList(data).then(res => {
        console.log(res.data);
        if (res.errno == 0) {
          this.Data = res.data.orders;
          this.total = Number(res.data.record_count);
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
        this.isEdit = true
      // this.formServeDetail = row
      let data = this.$qs.stringify({ id: row.id });
      getCustomersalesqueryDetail(data).then(res => {
        if (res.errno == 0) {
          this.formServeDetail = res.data[0];
          this.formServeDetail.xiaoshou_price = res.data[0].xiaoshou_price.substring(1);
          this.formServeDetail.back_price = res.data[0].back_price.substring(1);
          this.formServeDetail.sum_price = res.data[0].sum_price.substring(1);
          this.formServeDetail.not_shui_xiaoshou = res.data[0].not_shui_xiaoshou.substring(1);
          this.formServeDetail.shui_price = res.data[0].shui_price.substring(1);
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
          editCustomersalesquery(tmpData).then(res => {
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
.customerSalesQuery {
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
.customerSalesQuery >>> .el-dialog__body {
  padding: 0 20px;
}
.customerSalesQuery >>> .el-dialog .el-form-item {
  float: right;
}
.el-row {
  border-top: 1px dashed #ccc;
}
</style>