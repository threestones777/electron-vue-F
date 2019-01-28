<template>
    <div class="serveManage">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <!-- <h3>温州美联 管理中心</h3> -->
            <el-breadcrumb style="font-size:18px" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>设置</el-breadcrumb-item>
                <el-breadcrumb-item>服务管理</el-breadcrumb-item>
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
                <div @click="dialogServeAdd = true" class="card">
                    <i class="el-icon-plus"></i>
                    <div>新增</div>
                </div>
            </div>
        </div>
        <div class="main-table">
            <!-- 账户搜索 -->
            <el-form :inline="true" :model="formServe" class="demo-form-inline">
                <!-- <el-form-item label="项目名称">
                    <el-input	size="small" v-model="formServe.name" placeholder="项目名称"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input	size="small" type="tel" v-model="formServe.marks" placeholder="备注信息"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <el-input placeholder="请输入服务名称" v-model="search" style="width:70%;margin-right:10px" size="small">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                    <!-- <el-button type="primary" size="small" @click="dialogServeAdd = true">新增</el-button>
                    <el-button type="primary" size="small" @click="reset">刷新</el-button> -->
                </el-form-item>
            </el-form>
            <!-- 新增服务弹出框 -->
            <el-dialog width="450px" title="服务管理新增" :visible.sync="dialogServeAdd">
                <el-form :model="formServeAdd">
                    <el-form-item label="工时费">
                        <el-input v-model="formServeAdd.price"></el-input>
                    </el-form-item>
                    <el-form-item label="服务价格">
                        <el-input v-model="formServeAdd.servePrice"></el-input>
                    </el-form-item>
                    <el-form-item label="备注信息">
                        <el-input v-model="formServeAdd.marks"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeAdd = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="dialogServeAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 服务详情弹出框 -->
            <el-dialog width="450px" title="服务详情" :visible.sync="dialogServeDetail">
                <el-form :model="formServeDetail" ref="form">
                    <el-form-item label="服务名称" prop="goods_name" :rules="rule">
                        <el-input v-model="formServeDetail.goods_name"></el-input>
                    </el-form-item>
                    <el-form-item label="服务价格" prop="shop_price" :rules="rule">
                        <el-input-number v-model="formServeDetail.shop_price" :precision="2" :min="0"></el-input-number>
                        <!-- <el-input v-model="formServeDetail.shop_price"></el-input> -->
                    </el-form-item>
                    <el-form-item label="简介" prop="goods_brief" :rules="rule">
                        <el-input v-model="formServeDetail.goods_brief"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" >
                    <el-button	size="small" @click="dialogServeDetail = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="editDone('form')">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 服务管理表格 -->
            <el-table
            :data="serveMData.filter(data =>  {
            return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1})})"
            show-summary
            border stripe
            :row-style="{height:0}"  
            :cell-style="{padding:7}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            v-loading="loading"
            style="width: 100%">
                <el-table-column
                show-overflow-tooltip
                prop="goods_name"
                align="center"
                label="服务名称">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.goods_name"/>
                  </template>
                </el-table-column>
                <el-table-column
                prop="shop_price"
                align="center"
                label="服务价格">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.shop_price"/>
                  </template>
                </el-table-column>
                <el-table-column
                show-overflow-tooltip
                prop="goods_brief"
                align="center"
                label="简介">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.goods_brief"/>
                  </template>
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="edit(scope.row)">保存修改</el-button>
                        <el-button type="text" size="small"  @click='deleteRow(scope.$index, scope.row)'>删除</el-button>
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
import { getItemList,getItemDetail,editItem,delItem } from "../../api/api";
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
      search:'',
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
      serveMData: [],
      rule: [{ required: true, message: "不能为空" }],
    };
  },
  methods: {
    initData() {
      // 获取服务列表
      let data = {
        subsite_id: 3,
        // user_id: sessionStorage.user_id,
        page: this.page,
        page_size: this.page_size,
      };
      getItemList({ params: data }).then(res => {
        console.log(res);
        if (res.errno == 0) {
          for(let i=0;i<res.data.orders.length;i++){
            res.data.orders[i].shop_price=res.data.orders[i].shop_price.replace(/^￥/,"");
          };
          this.serveMData = res.data.orders;
          this.total = Number(res.data.record_count);
          this.loading = false;
        }
      });
    },
    edit(row){//---------------------修改
      let data=this.$qs.stringify(row);
      editItem(data).then(res=>{
        if (res.data.orders == "修改成功") {
          this.$message({
            type: "success",
            message: res.data.orders,
            duration: 1500
          });
          this.initData();
        } else {
          this.$message({
            type: "error",
            message:res.data.orders,
            duration: 1500
          });
          this.initData();
        }
      });
    },
    editDone(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isEdit) {
            let tmpData = this.$qs.stringify(this.formServeDetail);
            editItem(tmpData).then(res => {
              console.log(res)
              if (res.data.orders == "修改成功") {
                this.$message({
                  type: "success",
                  message: res.data.orders,
                  duration: 2000
                });
                this.initData();
              } else {
                this.$message({
                  type: "error",
                  message:res.data.orders,
                  duration: 2000
                });
              }
              this.dialogServeDetail = false;
            });
          }
        }
      });
    },
    reset() {
      this.initData();
    },
    showDetails(row) {
      this.isEdit = true;
      let data = this.$qs.stringify({ goods_id: row.goods_id });
      getItemDetail(data).then(res => {
        if (res.errno == 0) {
          console.log(res)
          this.formServeDetail = res.data.orders
          this.formServeDetail.shop_price = res.data.orders.shop_price.substring(1)
          this.formServeDetail.goods_id = row.goods_id
        }
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.initData();
    },
    deleteRow(index, rows) {
      this.$confirm("即将执行删除操作, 确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(rows.id);
          let tmpData = this.$qs.stringify({ goods_id: rows.goods_id});
          delItem(tmpData).then(res => {
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
.serveManage {
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
.el-input >>> .el-input__inner{
    border:none;
    text-align:center;
}
/* 分页器 */
.el-pagination {
  padding: 20px 0;
  text-align: right;
}
.el-input >>> .el-input__inner{
    padding:0;
}
/* 新增账户弹出框 & 账户详情弹出框*/
.main-table >>> .el-dialog__body {
  padding: 0 20px;
}
.main-table >>> .el-dialog__body .el-form-item__content {
    width: 300px;
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
