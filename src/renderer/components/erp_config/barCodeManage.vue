<template>
  <div class="barCodeManage">
    <!-- 头部面包屑 -->
    <div class="main-header">
      <!-- <h3>温州美联 管理中心</h3> -->
      <el-breadcrumb style="font-size:18px" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>条码管理</el-breadcrumb-item>
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
                <div @click="add" class="card">
                    <i class="el-icon-plus"></i>
                    <div>新增</div>
                </div>
      </div>
    </div>
    <div class="main-table">
      <!-- 账户搜索 -->
      <el-form :inline="true" :model="formServe" class="demo-form-inline">
        <!-- <el-form-item>
          <el-input size="small" clearable v-model="formServe.bar_code" placeholder="条码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input size="small" clearable v-model="formServe.taypes" placeholder="条码类型"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-input placeholder="请输入商品名称" @input="search" v-model="keywords" style="width:70%;margin-right:10px" size="small">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
          <!-- <el-button type="primary" size="small" @click="add">新增</el-button> -->
          <!-- <el-button type="primary" size="small">导入</el-button>
          <el-button type="primary" size="small">导出</el-button> -->
          <!-- <el-button type="primary" size="small" @click="reset">刷新</el-button> -->
        </el-form-item>
      </el-form>
      <!-- 新增条码弹出框 -->
      <el-dialog width="450px" title="条码管理新增" :visible.sync="dialogServeAdd">
        <el-form :model="formServeAdd">
          <el-form-item label="条码名称">
            <el-input v-model="formServeAdd.price"></el-input>
          </el-form-item>
          <el-form-item label="条码内容">
            <el-input v-model="formServeAdd.price"></el-input>
          </el-form-item>
          <el-form-item label="备注信息">
            <el-input v-model="formServeAdd.servePrice"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogServeAdd = false">取 消</el-button>
          <el-button size="small" type="primary" @click="dialogServeAdd = false">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 图像弹出框 -->
      <el-dialog id="dialog" width="250px" title="条码图像" :visible.sync="dialogPic">
        <div id="qrcode" ref="qrcode"></div><br><br>
      </el-dialog>
      <!-- 服务详情弹出框 -->
      <el-dialog width="450px" title="分类详情" :visible.sync="dialogServeDetail">
        <el-form ref="form" :model="formServeDetail">
          <el-form-item label="商品名">
            <el-input @focus="getList(),dialogGoods=true" v-model="formServeDetail.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="条码内容">
              <el-input-number style="width:100%" :controls="false" v-model="formServeDetail.bar_code" :min="0"></el-input-number>
            <!-- <el-input v-model="formServeDetail.bar_code"></el-input> -->
          </el-form-item>
          <el-form-item label="条码属性值">
            <el-input v-model="formServeDetail.taypes"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogServeDetail = false">取 消</el-button>
          <el-button size="small" type="primary" @click="editDone('form')">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 全局商品弹出框 -->
      <el-dialog width="800px" title="商品选择" :visible.sync="dialogGoods">
           <!-- 商品搜索 -->
            <el-form :inline="true" :model="formGoods">
                <el-form-item label="">
                    <el-input size="small" v-model="formGoods.add_time1" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input size="small" v-model="formGoods.bill_sn" placeholder="编号"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input size="small" v-model="formGoods.status" placeholder="状态"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="goodsSearch">搜索</el-button>
                </el-form-item>
            </el-form>
            <!-- 商品表格 -->
            <el-table
                :row-style="{height:0}"  
                :cell-style="{padding:0}"
                :header-row-style="{height:0}"  
                :header-cell-style="{padding:0}"
                highlight-current-row
                @current-change="handleCurrentChange3"
                border
                v-loading="loading2"
                :data="goodsList">
                <el-table-column show-overflow-tooltip prop="goods_name" align="center" label="商品名称"></el-table-column>
                <el-table-column prop="goods_sn" align="center" label="商品编号"></el-table-column>
                <el-table-column prop="shop_price" align="center" label="商品价格"></el-table-column>
                <el-table-column prop="cat_name" align="center" label="分类名"></el-table-column>
                <el-table-column show-overflow-tooltip prop="brand_name" align="center" label="品牌名"></el-table-column>
                <el-table-column prop="goods_number" align="center" label="库存"></el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
                @current-change="handleCurrentChange2"
                layout="total,prev, pager, next,jumper"
                :page_size="page_size2"
                :total="total2">
            </el-pagination>
            <el-button style="float:right;margin-bottom:5px;" type="primary" @click="getDone" size="small">确认</el-button>
      </el-dialog>
      <!-- 条码管理表格 -->
      <el-table
        :data="barCodeData"
        border stripe
        :row-style="{height:0}"
        :cell-style="{padding:7}"
        :header-row-style="{height:0}"
        :header-cell-style="{padding:0}"
        v-loading="loading"
        style="width: 100%">
        <el-table-column 
        prop="goods_name" 
        align="center" 
        show-overflow-tooltip 
        label="商品名">
        </el-table-column>
        <el-table-column 
        prop="bar_code" 
        align="center" 
        label="条码内容">
        </el-table-column>
        <el-table-column 
        prop="taypes" 
        align="center" 
        label="条码属性值">
          <template slot-scope="scope">
            <el-input v-model="scope.row.taypes" />
          </template>
        </el-table-column>
        <el-table-column fixed="right" align="center" label="相关操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="showCode(scope.row)">图像</el-button><!-- 
            <el-button type="text" size="small" @click="emitDetail(scope.row),dialogServeDetail = true">详情</el-button> -->
            <el-button type="text" size="small" @click="edit(scope.row)">保存修改</el-button>
            <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next,jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import {
  getCodeList,
  getCodeDetail,
  editCode,
  addCode,
  delCode,
  getGoodsList
} from "../../api/api";
export default {
  data() {
    return {
      page: 1,
      page_size: 10,
      total: 0,
      loading: true,
      page2: 1,
      page_size2: 10,
      total2: 0,
      loading2: true,
      dialogServeAdd: false,
      dialogGoods:false,
      dialogServeDetail: false,
      keywords:'',
      dialogPic: false,
      formServe: {},
      formServeAdd: {},
      formGoods:{},
      formServeDetail: {},
      barCodeData: [],
      goodsList:[],
      selectGoods:null
    };
  },
  methods: {
    search() {
      getCodeList({ params:{
        page:1,
          page_size:10,
          bar_code:this.keywords
      }}).then(res => {
        console.log(res);
        if (res.errno == 0) {
          this.barCodeData = res.data.code_list;
          this.total = Number(res.data.record_count);
          this.loading = false;
        }
      });
    }, 
    initData() {
      // 获取条码列表
      let data = {
        subsite_id: 3,
        user_id: sessionStorage.user_id,
        page: this.page,
        page_size: this.page_size,
        bar_code: this.formServe.bar_code,
        taypes: this.formServe.taypes
      };
      getCodeList({ params: data }).then(res => {
        console.log(res);
        if (res.errno == 0) {
          this.barCodeData = res.data.code_list;
          this.total = Number(res.data.record_count);
          this.loading = false;
        }
      });
    },
    getList() { // 获取全局商品列表
        let data = {
            subsite_id: 3,
            user_id: sessionStorage.user_id,
            page: this.page2,
            page_size: this.page_size2
        };
        getGoodsList({params:data}).then(res=>{
            console.log(res.data)
            if(res.errno == 0) {
                this.goodsList = res.data.goods;
                this.total2 = Number(res.data.record_count);
                this.loading2 = false;
            }
        })
    },
    showCode(v) {
      // 显示二维码
      this.dialogPic = true;
      this.$nextTick(() => {
        let dom = document.getElementById("qrcode");
        let imgs = document.querySelector("#qrcode > img");
        if (imgs) {
          dom.removeChild(imgs);
        }
        this.$qrcode(v.bar_code);
      });
    },
    getDone() {
        if(this.selectGoods) {
            this.formServeDetail.goods_name = this.selectGoods.goods_name
            this.formServeDetail.goods_id = this.selectGoods.goods_id
        }
        this.dialogGoods = false
    },
    add() { // 打开 添加单据 弹出框
        this.isEdit = false;
        this.formServeDetail = {};
        if (this.$refs.form) {
            this.$refs.form.resetFields();
        }
        this.dialogServeDetail = true;
    },
    edit(row){//----------------------保存修改
      let data=this.$qs.stringify(row);
      editCode(data).then(res=>{
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
    editDone(formName) { // 添加/编辑 单据
        this.$refs[formName].validate(valid => {
            if (valid) {
                if (this.isEdit) {
                    let tmpData = this.$qs.stringify(this.formServeDetail);
                    editCode(tmpData).then(res => {
                    if (res.errno == 0) {
                        this.$message({
                        type: "success",
                        message: "修改成功!",
                        duration: 1000
                        });
                    } else {
                        this.$message({
                            type: "error",
                        message: res.errmsg,
                        duration: 1000
                        });
                    }
                    this.initData();
                    this.dialogServeDetail = false;
                    });
                } else {
                    let tmpData = this.$qs.stringify(this.formServeDetail);
                    addCode(tmpData).then(res => {
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
                    this.initData();
                    this.dialogServeDetail = false;
                    });
                }
            }
        });
    },
    emitDetail(v) {
        this.isEdit = true;
        let data = { id: v.id };
        getCodeDetail({params:data}).then(res => {
            console.log(res)
            if (res.errno == 0) {
                this.formServeDetail = res.data;
            }else {
                this.$message({
                    type: "error",
                    message: res.errmsg,
                    duration: 1000
                });
            }
        });
    },
    serveSearch() {
      this.initData();
    },
    goodsSearch() {

    },
    ServeSearchIn() {
      console.log("submit!");
    },
    reset() {
      this.formServe.taypes = "";
      this.formServe.bar_code = "";
      this.initData();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.initData();
    },
    handleCurrentChange2(val) {
      this.page2 = val;
      this.initData();
    },
    handleCurrentChange3(val) {
        this.selectGoods = val
    },
    deleteRow(rows) {
      this.$confirm("即将执行删除操作, 确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let tmpData = this.$qs.stringify({ id: rows.id });
          delCode(tmpData).then(res => {
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
.barCodeManage {
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
  padding: 10px 0;
  text-align: right;
}
.el-table .el-input >>> .el-input__inner{
    border:none;
    text-align:center;
}
.main-table >>> .el-dialog #qrcode img {
  margin: 10px auto;
}
/* 新增账户弹出框 & 账户详情弹出框*/
.main-table >>> .el-dialog__body {
  padding: 0 20px;
  overflow: hidden;
}
.main-table >>> .el-dialog__wrapper#dialog .el-dialog__body {
  padding: 0 20px;
}

.el-select {
  width: 80%;
}
</style>
