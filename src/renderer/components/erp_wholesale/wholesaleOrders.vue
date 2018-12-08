<template>
    <div class="wholesaleOrders">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>批发</el-breadcrumb-item>
                <el-breadcrumb-item>批发订单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <!-- 搜索 -->
            <el-form :inline="true" :model="formServe" class="demo-form-inline">
                <!-- <el-form-item label="">
                    <el-input 	size="small" v-model="formServe.name" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input	size="small" type="tel" v-model="formServe.marks" placeholder="编号"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input	size="small" type="tel" v-model="formServe.marks" placeholder="备注信息"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <el-input placeholder="请输入订单编号" @input="search" v-model="keywords" style="width:50%;margin-right:10px" size="small">
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
            <el-dialog width="700px" title="批发订单" :visible.sync="dialogServeDetail">
                <el-form label-position="left" ref="form" :model="formServeDetail" :inline="true" class="demo-form-inline">
                    <el-row>
                        <!-- <el-col :span="8">
                            <el-form-item label="状态">
                                <el-input disabled v-model="formServeDetail.status" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="8">
                            <el-form-item label="制单人姓名">
                                <el-input v-model="formServeDetail.admin_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="订单编号">
                                <el-input v-model="formServeDetail.bill_sn" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="客户名称">
                                <el-input v-model="formServeDetail.user_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="紧急程度">
                                <el-input v-model="formServeDetail.urgency" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="要求到货时间" prop="require_arrival_time" :rules="[{ required: true, message: '不能为空' }]">
                                <el-date-picker style="width:200px"
                                v-model="formServeDetail.require_arrival_time"
                                type="datetime"
                                value-format="timestamp"
                                placeholder="选择日期时间">
                                </el-date-picker>
                                <!-- <el-input v-model="formServeDetail.require_arrival_time" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="金额" prop="money" :rules="rule">
                                <el-input-number v-model="formServeDetail.money" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.money" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="优惠金额" prop="discount_price" :rules="rule">
                                <el-input-number v-model="formServeDetail.discount_price" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.discount_price" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="销售组">
                                <el-input v-model="formServeDetail.sales_group" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="备注">
                                <el-input v-model="formServeDetail.remark" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="8">
                            <el-form-item label="订单时间">
                                <el-input disabled v-model="formServeDetail.add_time" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col> -->
                    </el-row>
                    <!-- <el-row>
                        <el-col :span="8">
                            <el-form-item label="核对时间">
                                <el-input disabled v-model="formServeDetail.check_time" autocomplete="off"></el-input>
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
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            v-loading="loading"
            style="width: 100%">
                <el-table-column
                prop="status"
                align="center"
                label="状态">
                </el-table-column>
                <el-table-column
                prop="bill_sn"
                align="center"
                label="订单编号">
                </el-table-column>
                <el-table-column
                prop="user_name"
                align="center"
                label="客户名称">
                </el-table-column>
                <el-table-column
                prop="urgency"
                align="center"
                label="紧急程度">
                </el-table-column>
                <el-table-column
                prop="require_arrival_time"
                align="center"
                label="要求到货时间">
                </el-table-column>
                <el-table-column
                prop="money"
                align="center"
                label="金额">
                </el-table-column>
                <el-table-column
                prop="discount_price"
                align="center"
                label="优惠金额">
                </el-table-column>
                <el-table-column
                prop="sales_group"
                align="center"
                label="销售组">
                </el-table-column>
                <el-table-column
                prop="add_time"
                align="center"
                label="订单时间">
                </el-table-column>
                <el-table-column
                prop="check_time"
                align="center"
                label="核对时间">
                </el-table-column>
                <el-table-column
                prop="remark"
                align="center"
                label="备注">
                </el-table-column>
                <el-table-column
                prop="admin_name"
                align="center"
                label="制单人姓名">
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
  getWholesaleordersList,
  getWholesaleordersDetail,
  addWholesaleorders,
  editWholesaleorders
} from "../../api/api";
export default {
  data() {
    return {
      page: 1,
      page_size: 10,
      total: 0,
      loading: true,
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
      rule: [
        { required: true, message: "不能为空" },
        { type: "number", message: "必须为数字值" }
      ]
    };
  },
  methods: {
    initData() {
      // 获取列表
      let data = this.$qs.stringify({
        subsite_id: 3,
        //   user_id:sessionStorage.user_id,
        page: this.page,
        page_size: this.page_size
      });
      getWholesaleordersList(data).then(res => {
        console.log(res.data);
        if (res.errno == 0) {
          this.Data = res.data.wholesaleorder_list;
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
        console.log(this.formServeDetail.require_arrival_time)
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isEdit) {
              this.formServeDetail.require_arrival_time = parseInt(this.formServeDetail.require_arrival_time/1000)
              this.formServeDetail.add_time = parseInt(+new Date()/1000)
              this.formServeDetail.check_time = parseInt(+new Date()/1000)
              console.log(this.formServeDetail)
            let tmpData = this.$qs.stringify(this.formServeDetail);
            editWholesaleorders(tmpData).then(res => {
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
              this.formServeDetail.require_arrival_time = parseInt(this.formServeDetail.require_arrival_time/1000)
              this.formServeDetail.add_time = parseInt(+new Date()/1000)
              this.formServeDetail.check_time = parseInt(+new Date()/1000)
              this.formServeDetail.status = 0
              this.formServeDetail.user_id = 2
              this.formServeDetail.adminid = 2
              this.formServeDetail.order_user = 2
              this.formServeDetail.check_user = 2
            let tmpData = this.$qs.stringify(this.formServeDetail);
            addWholesaleorders(tmpData).then(res => {
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
          bill_sn:this.keywords
      });
      getWholesaleordersList(data).then(res => {
        console.log(res.data);
        if (res.errno == 0) {
          this.Data = res.data.wholesaleorder_list;
          this.total = Number(res.data.record_count);
        }
      });
    }, 
    reset() {
      this.initData();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.initData();
    },
    showDetails(row) {
      this.isEdit = true;
      //   this.formServeDetail = row;
      let data = this.$qs.stringify({ id: row.id });
      getWholesaleordersDetail(data).then(res => {
        if (res.errno == 0) {
          this.formServeDetail = res.data;
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
          editWholesaleorders(tmpData).then(res => {
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
.wholesaleOrders {
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
.wholesaleOrders >>> .el-dialog__body {
  padding: 0 20px;
}
.wholesaleOrders >>> .el-dialog .el-form-item {
  float: right;
}
.el-row {
  border-top: 1px dashed #ccc;
}
</style>