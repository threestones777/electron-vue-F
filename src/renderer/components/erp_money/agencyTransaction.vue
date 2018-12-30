<template>
  <div class="agencyTransaction">
    <!-- 头部面包屑 -->
    <div class="main-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
        <el-breadcrumb-item>资金</el-breadcrumb-item>
        <el-breadcrumb-item>机构来往账款</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="operate-in">
        <div>
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
        <div>
          <i class="el-icon-search"></i>
          <div>查询</div>
        </div>
        <div>
          <i class="el-icon-setting"></i>
          <div>功能</div>
          <b class="el-icon-caret-bottom"></b>
        </div>
        <div>
          <i class="el-icon-printer"></i>
          <div>打印</div>
          <b class="el-icon-caret-bottom"></b>
        </div>
        <div>
          <i class="el-icon-menu"></i>
          <div>设置</div>
        </div>
        <div>
          <i class="el-icon-zoom-in"></i>
          <div>高级查询</div>
        </div>
        <div>
          <i class="el-icon-refresh"></i>
          <div>导入/导出</div>
          <b class="el-icon-caret-bottom"></b>
        </div>
      </div>
    </div>
    <!-- 搜索条件区域 -->
    <div class="search-area">
      <fieldset>
        <legend>查询条件</legend>
        <div class="out-box">
          <fieldset class="date-radio">
            <legend>日期类型</legend>
            <el-radio-group v-model="radio">
              <div>
                <el-radio :label="0">单据审核日期</el-radio>
                <el-radio :label="1">结算日期</el-radio>
              </div>
              <div>
                <el-radio :label="2">应结日期</el-radio>
                <el-radio :label="3">不按日期</el-radio>
              </div>
            </el-radio-group>
          </fieldset>
          <div class="content-r">
            <div class="date-area">
              <el-date-picker
                v-model="timeValue"
                type="daterange"
                range-separator="~"
                size="small"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
            <el-form :inline="true" :model="formServe">
              <div>
                <el-form-item label="机构">
                  <el-input size="mini" v-model="formServe.user">
                    <i class="el-icon-more" slot="append"></i>
                  </el-input>
                </el-form-item>
                <el-form-item label="费用代码">
                  <el-input size="mini" v-model="formServe.user">
                    <i class="el-icon-more" slot="append"></i>
                  </el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="分公司">
                  <el-select size="mini" v-model="formServe.region">
                    <el-option label="公司一" value="0"></el-option>
                    <el-option label="公司二" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="状态">
                  <el-select size="mini" v-model="formServe.staus">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </div>
      </fieldset>
    </div>


    <div class="main-table">
      <!-- 搜索 -->
      <!-- <el-form :inline="true" :model="formServe" class="demo-form-inline">
                <el-form-item>
                    <el-input placeholder="请输入机构名称" @input="search" v-model="keywords" style="width:50%;margin-right:10px" size="small">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                    <el-button type="primary" size="small" @click="add">新增</el-button>
                    <el-button type="primary" size="small" @click="reset">刷新</el-button>
                </el-form-item>
      </el-form>-->
      <!-- 新增弹出框 -->
      <!-- <el-dialog width="450px" title="新增" :visible.sync="dialogServeAdd">
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
      </el-dialog>-->
      <!-- 详情弹出框 -->
      <!-- <el-dialog width="990px" title="客户信息" :visible.sync="dialogServeDetail">
                <el-form label-position="left" ref="form" :model="formServeDetail" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="单号">
                                <el-input v-model="formServeDetail.bill_sn" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="店名">
                                <el-input v-model="formServeDetail.subshop_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="机构名称">
                                <el-input v-model="formServeDetail.jigou_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="费用代码">
                                <el-input v-model="formServeDetail.fee_code" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="费用名称">
                                <el-input v-model="formServeDetail.fee_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="应收金额" prop="yingshou_price" :rules="rule">
                                <el-input-number v-model="formServeDetail.yingshou_price" :precision="2" :min="0"></el-input-number>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="已收金额" prop="yishou_price" :rules="rule">
                                <el-input-number v-model="formServeDetail.yishou_price" :precision="2" :min="0"></el-input-number>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="优惠金额" prop="discount_price" :rules="rule">
                                <el-input-number v-model="formServeDetail.discount_price" :precision="2" :min="0"></el-input-number>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="未收金额" prop="weishou_price" :rules="rule">
                                <el-input-number v-model="formServeDetail.weishou_price" :precision="2" :min="0"></el-input-number>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="应收日期">
                                <el-input disabled v-model="formServeDetail.yingjie_time" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="最近收款日期">
                                <el-input disabled v-model="formServeDetail.last_jiesuan_time" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="最近收款单号">
                                <el-input v-model="formServeDetail.last_jiesuan_sn" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="审核时间">
                                <el-input disabled v-model="formServeDetail.check_time" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="备注">
                                <el-input v-model="formServeDetail.remark" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeDetail = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="editDone('form')">保存</el-button>
                </div>
      </el-dialog>-->
      
      <!-- 显示列和排序模块 -->
      <div style="text-align:right">
        <el-button @click="dialogColumnDiy=true" size="small" icon="el-icon-tickets">显示列</el-button>
        <el-dropdown :hide-on-click="false" @command="handleCommand">
          <el-button size="small" icon="el-icon-sort">排序
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <div class="ddd">
              <div class="ccc">
                <el-dropdown-item command="0">
                  <i v-show="sortSelected==0" class="el-icon-check el-icon--left"></i>更新时间
                </el-dropdown-item>
                <el-dropdown-item command="1">
                  <i v-show="sortSelected==1" class="el-icon-check el-icon--left"></i>录入时间
                </el-dropdown-item>
                <el-dropdown-item command="2">
                  <i v-show="sortSelected==2" class="el-icon-check el-icon--left"></i>利润
                </el-dropdown-item>
                <el-dropdown-item command="3">
                  <i v-show="sortSelected==3" class="el-icon-check el-icon--left"></i>总数量
                </el-dropdown-item>
                <el-dropdown-item command="4">
                  <i v-show="sortSelected==4" class="el-icon-check el-icon--left"></i>状态
                </el-dropdown-item>
                <el-dropdown-item command="5">
                  <i v-show="sortSelected==5" class="el-icon-check el-icon--left"></i>付款方式
                </el-dropdown-item>
                <el-dropdown-item command="6">
                  <i v-show="sortSelected==6" class="el-icon-check el-icon--left"></i>其他
                </el-dropdown-item>
                <div class="aaa">
                  <el-dropdown-item divided command="0">
                    <i v-show="defaultSort==0" class="el-icon-check el-icon--left"></i>顺序
                  </el-dropdown-item>
                  <el-dropdown-item command="1">
                    <i v-show="defaultSort==1" class="el-icon-check el-icon--left"></i>倒叙
                  </el-dropdown-item>
                </div>
              </div>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <!-- 显示列弹窗 -->
      <el-dialog
        class="columnDialog"
        width="300px"
        title="自定义显示列"
        v-dialogDrag
        :visible.sync="dialogColumnDiy"
      >
        <el-table :data="columnData" style="width: 100%">
          <el-table-column width="60" align="center" label="显示">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.isChecked"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="列名"></el-table-column>
        </el-table>
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
        style="width: 100%;margin-top:5px"
      >
        <el-table-column
          v-for="(item, index) in columnData"
          :key="index"
          v-if="item.isChecked"
          :prop="item.prop"
          align="center"
          :label="item.name"
        ></el-table-column>
        <!-- <el-table-column
                prop="fee_code"
                align="center"
                label="费用代码">
                </el-table-column>
                <el-table-column
                prop="fee_name"
                align="center"
                label="费用名称">
                </el-table-column>
                <el-table-column
                prop="jigou_name"
                align="center"
                label="机构名称">
                </el-table-column>
                <el-table-column
                prop="subshop_name"
                align="center"
                label="店名">
                </el-table-column>
                <el-table-column
                prop="yingshou_price"
                align="center"
                label="应收金额">
                </el-table-column>
                <el-table-column
                prop="yishou_price"
                align="center"
                label="已收金额">
                </el-table-column>
                <el-table-column
                prop="discount_price"
                align="center"
                label="优惠金额">
                </el-table-column>
                <el-table-column
                prop="weishou_price"
                align="center"
                label="未收金额">
                </el-table-column>
                <el-table-column
                prop="yingjie_time"
                align="center"
                label="应收日期">
                </el-table-column>
                <el-table-column
                prop="last_jiesuan_time"
                align="center"
                label="最近收款日期">
                </el-table-column>
                <el-table-column
                prop="last_jiesuan_sn"
                align="center"
                label="最近收款单号">
                </el-table-column>
                <el-table-column
                prop="check_time"
                align="center"
                label="审核日期">
                </el-table-column>
                <el-table-column
                prop="remark"
                align="center"
                label="备注">
        </el-table-column>-->
        <!-- <el-table-column
                fixed="right"
                align="center"
                label="相关操作"
                width="90">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showDetails(scope.row),dialogServeDetail = true">详情</el-button>
                        <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, scope.row)">删除</el-button>
                    </template>
        </el-table-column>-->
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        @current-change="handleCurrentChange"
        layout="total,prev, pager, next,jumper"
        :page_size="page_size"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import {
  getAagencytranstionList,
  getAagencytranstionDetail,
  addAagencytranstion,
  editAagencytranstion
} from "../../api/api";
export default {
  data() {
    return {
      page: 1,
      page_size: 10,
      total: 0,
      isEdit: false,
      loading: true,
      sortSelected: 0, // 排序hover框上部份 默认按第一个排序
      defaultSort: 0, // 排序hover框下部份 默认顺序排序
      radio: 0, // 筛选日期默认选项
      timeValue: "", // 起止时间
      dialogColumnDiy: false, // 自定义显示列弹窗
      dialogServeAdd: false,
      dialogServeDetail: false,
      keywords: "",
      formServe: {
        name: "",
        marks: ""
      },
      formServeAdd: {
        name: ""
      },
      formServeDetail: {},
      columnData: [
        // 自定义列的数据
        {
          name: "单号",
          prop: "bill_sn",
          isChecked: true
        },
        {
          name: "费用代码",
          prop: "fee_code",
          isChecked: true
        },
        {
          name: "费用名称",
          prop: "fee_name",
          isChecked: true
        },
        {
          name: "机构名称",
          prop: "jigou_name",
          isChecked: false
        }
      ],
      Data: [],
      rule: [{ required: true, message: "不能为空" }]
    };
  },
  methods: {
    changeColumn() {
      this.columnData = this.columnData;
      console.log(this.columnData);
    },
    handleCommand(e) {
      console.log(e);
      this.sortSelected = e;
    },
    initData() {
      // 获取列表
      let data = this.$qs.stringify({
        subsite_id: 3,
        user_id: sessionStorage.user_id,
        page: this.page,
        page_size: this.page_size
      });
      getAagencytranstionList(data).then(res => {
        console.log(res.data);
        if (res.errno == 0) {
          this.Data = res.data.agencytranstion_list;
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
            this.formServeDetail.yingjie_time = parseInt(new Date() / 1000);
            this.formServeDetail.last_jiesuan_time = parseInt(
              new Date() / 1000
            );
            this.formServeDetail.check_time = parseInt(new Date() / 1000);
            let tmpData = this.$qs.stringify(this.formServeDetail);
            editAagencytranstion(tmpData).then(res => {
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
            this.formServeDetail.last_jiesuan_user = 2;
            this.formServeDetail.yingjie_time = parseInt(new Date() / 1000);
            this.formServeDetail.last_jiesuan_time = parseInt(
              new Date() / 1000
            );
            this.formServeDetail.check_time = parseInt(new Date() / 1000);
            let tmpData = this.$qs.stringify(this.formServeDetail);
            addAagencytranstion(tmpData).then(res => {
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
      let data = this.$qs.stringify({
        page: 1,
        page_size: 10,
        jigou_name: this.keywords
      });
      getAagencytranstionList(data).then(res => {
        console.log(res.data);
        if (res.errno == 0) {
          this.Data = res.data.agencytranstion_list;
          this.total = Number(res.data.record_count);
          this.loading = false;
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
      let data = this.$qs.stringify({ id: row.id });
      getAagencytranstionDetail(data).then(res => {
        if (res.errno == 0) {
          this.formServeDetail = res.data;
          this.formServeDetail.discount_price = res.data.discount_price.substring(
            1
          );
          this.formServeDetail.yingshou_price = res.data.yingshou_price.substring(
            1
          );
          this.formServeDetail.yishou_price = res.data.yishou_price.substring(
            1
          );
          this.formServeDetail.weishou_price = res.data.weishou_price.substring(
            1
          );
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
          editAagencytranstion(tmpData).then(res => {
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
  },
  // beforeDestroy() {
  //     alert("aaaa")
  // },
  // beforeRouteLeave: function(to, from, next) {
  //   next(false);
  //   this.$confirm("请确认当前页面已保存,未保存离开将失去当前编辑?", "提示", {
  //     confirmButtonText: "仍要离开",
  //     cancelButtonText: "返回检查",
  //     type: "warning"
  //   })
  //     .then(() => {
  //       next();
  //     })
  //     .catch(res => {
  //       console.log("取消离开");
  //     });
  // }
};
</script>
<style scoped>
.agencyTransaction {
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
.main-header .el-breadcrumb span {
  font-size: 18px;
}
/*  操作栏 */
.operate-in {
  display: flex;
  margin-top: 12px;
}
.operate-in > div {
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
}
.operate-in > div div {
  font-size: 16px;
}
.operate-in i {
  font-size: 30px;
}
.operate-in b {
  font-size: 16px;
  position: absolute;
  top: 20%;
  right: 5%;
}
/* 搜索操作 */
fieldset {
  border-color: #fff;
  padding: 0 0 6px 6px;
}
.out-box {
  display: flex;
  align-items: center;
}
.search-area {
  margin: 10px 0;
}
.date-radio {
  width: 220px;
}
.date-area {
  width: 220px;
}
.content-r,
.el-form {
  display: flex;
  align-items: center;
}
.content-r .el-form {
  flex-wrap: wrap;
  flex: 1;
}
.content-r .el-form > div {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.content-r >>> .el-input {
  width: 120px;
}
.content-r >>> .el-input-group__append {
  width: 30px;
  padding: 0;
}
.out-box .content-r .el-form-item {
  margin: 0;
  margin-left: 20px;
  text-align: center;
}
.el-date-editor {
  width: 100% !important;
}
.el-radio-group {
  display: flex;
}
.date-radio .el-radio {
  margin-left: 0;
  line-height: 24px;
}
.main-table .el-form {
  padding-top: 10px;
  text-align: center;
}
.el-form .el-form-item {
  margin-bottom: 10px;
}

/* 显示列和排序 */
.ddd {
  position: relative;
  height: 200px;
}
.ccc {
  height: 200px;
  overflow: auto;
  text-align: left;
}

.aaa {
  width: 100%;
  position: absolute;
  bottom: 0;
  transform: translateY(100%);
  background: #fff;
}
.el-dropdown-menu__item {
  padding: 0;
  position: relative;
  padding: 0 20px;
}
.ccc i,
.aaa .el-dropdown-menu__item i {
  position: absolute;
  left: 4%;
  top: 50%;
  transform: translateY(-50%);
}
.agencyTransaction >>> .columnDialog .el-dialog__body {
  padding: 0;
}

/* 分页器 */
.el-pagination {
  padding: 20px 0;
  text-align: right;
}

/* 新增弹出框 & 详情弹出框*/
.agencyTransaction >>> .el-dialog__body {
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
.main-table >>> .el-dialog__body .el-date-editor,
.main-table >>> .el-dialog__body .el-input-number {
  width: 100%;
}
.el-row {
  border-top: 1px dashed #ccc;
}
</style>