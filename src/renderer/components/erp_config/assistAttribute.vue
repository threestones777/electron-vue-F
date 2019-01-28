<template>
  <div class="assistAttribute">
    <!-- 头部面包屑 -->
    <div class="main-header">
      <!-- <h3>温州美联 管理中心</h3> -->
      <el-breadcrumb style="font-size:18px" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>辅助属性</el-breadcrumb-item>
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
      <!-- 属性搜索 -->
      <el-form :inline="true" :model="formServe" class="demo-form-inline">
        <el-form-item label>
          <el-input size="small" v-model="formServe.name" placeholder="属性名称"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-input size="small" type="tel" v-model="formServe.marks" placeholder="备注信息"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="primary" size="small" @click="serveSearch">搜索</el-button> -->
          <!-- <el-button type="primary" size="small" @click="add">新增</el-button>
          <el-button type="primary" size="small" @click="reset">刷新</el-button> -->
        </el-form-item>
      </el-form>
      <!-- 新增属性弹出框 -->
      <el-dialog width="450px" title="品牌管理新增" :visible.sync="dialogServeAdd">
        <el-form :model="formServeAdd">
          <el-form-item label="属性名称">
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

      <!-- 属性详情弹出框 -->
      <el-dialog width="860px" title="属性详情" :visible.sync="dialogServeDetail">
        <el-form ref="form" :model="formServeDetail">
          <el-row>
            <el-col :span="8">
              <el-form-item label="属性名称">
                <el-input v-model="formServeDetail.attr_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属分类">
                    <el-popover
                    ref="popover"
                    placement="top"
                    width="160"
                    trigger="focus"
                    v-model="visible">
                        <el-tree :data="dataTree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                        <el-button type="primary" style="width:100%" size="mini">确认</el-button>
                    </el-popover>
                <el-input v-popover:popover v-model="formServeDetail.cat_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="录入方式">
                <el-select v-model="formServeDetail.attr_input_type" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <!-- <el-input v-model="formServeDetail.attr_values"></el-input> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item class="radio" label="是否多选">
                <el-radio-group v-model="formServeDetail.attr_type">
                  <el-radio label="0">否</el-radio>
                  <el-radio label="1">是</el-radio>
                </el-radio-group>
                <!-- <el-input v-model="formServeDetail.attr_name"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="检索方式">
                <el-select v-model="formServeDetail.attr_index" placeholder="请选择">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <!-- <el-input v-model="formServeDetail.attr_name"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="radio" label="是否关联">
                <el-radio-group v-model="formServeDetail.is_linked">
                  <el-radio label="0">不关联</el-radio>
                  <el-radio label="1">关联</el-radio>
                </el-radio-group>
                <!-- <el-input v-model="formServeDetail.attr_values"></el-input> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="排序">
                <el-input-number :controls="false" v-model="formServeDetail.sort_order" :min="0"></el-input-number>
                <!-- <el-input v-model="formServeDetail.sort_order"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="属性值" class="tag">
                <el-tag
                  :key="tag"
                  v-for="tag in dynamicTags"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                >{{tag}}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                ></el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">新增</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogServeDetail = false">取 消</el-button>
          <el-button size="small" type="primary" @click="editDone('form')">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 属性管理表格 -->
      <el-table
        :data="AttributeData"
        border stripe
        :row-style="{height:0}"
        :cell-style="{padding:7}"
        :header-row-style="{height:0}"
        :header-cell-style="{padding:0}"
        v-loading="loading"
        style="width: 100%">
        <el-table-column 
        prop="attr_name" 
        align="center" 
        label="属性名称">
        </el-table-column>
        <el-table-column 
        prop="cat_name" 
        align="center" 
        label="分类名称">
        </el-table-column>
        <el-table-column 
        prop="attr_type" 
        align="center" 
        label="是否多选">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.attr_type" true-label="1" false-label="0"/>
          </template>
        </el-table-column>
        <el-table-column 
        prop="attr_index" 
        align="center" 
        label="是否可检索">
          <template slot-scope="scope">
            <el-select v-model="scope.row.attr_index" placeholder="请选择">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </template>
        </el-table-column>
        <el-table-column 
        prop="is_linked" 
        align="center" 
        label="是否关联">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.is_linked" true-label="1" false-label="0"/>
          </template>
        </el-table-column>
        <el-table-column 
        prop="sort_order" 
        align="center" 
        label="排序">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.sort_order" true-label="1" false-label="0"/>
          </template>
        </el-table-column>
        <el-table-column 
        prop="attr_input_type" 
        align="center" 
        label="录入方式">
          <template slot-scope="scope">
            <el-select v-model="scope.row.attr_input_type" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>
          </template>
        </el-table-column>
        <el-table-column 
        fixed="right" 
        align="center" 
        label="相关操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row)">保存修改</el-button>
            <el-button type="text" size="small" @click="showDetails(scope.row),dialogServeDetail = true">详情</el-button>
            <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, AttributeData)"
            >删除</el-button>
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
  getAssistAttributeList,
  getAssistAttributeDetail,
  addAssistAttribute,
  editAssistAttribute,
  delAssistAttribute,
  getGoodsCate
} from "../../api/api";
export default {
  data() {
    return {
      page: 1,
      page_size: 10,
      total: 0,
      loading: true,
      isEdit:false,
      visible:false,
      dialogServeAdd: false,
      dialogServeDetail: false,
      attr_name: "",
      cat_name: "",
      value:"",
      value2:"",
      formServe: {},
      dataTree:[], // 分类树状图
      formServeAdd: {},
      formServeDetail: {},
      AttributeData: [],
      defaultProps:{
          children: 'son',
          label: 'cat_name'
      },
      options: [
        // 录入方式
        {
          value: "0",
          label: "手工输入"
        },
        {
          value: "1",
          label: "选择输入"
        },
        {
          value: "2",
          label: "多行文本输入"
        }
      ],
      options2: [//-------------- 检索方式
        {
          value: "0",
          label: "无需检索"
        },
        {
          value: "1",
          label: "关键词检索"
        },
        {
          value: "2",
          label: "范围检索"
        }
      ],
      dynamicTags: [],
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    initData() {
      // 获取辅助属性列表
      let data = {
        subsite_id: 3,
        user_id: sessionStorage.user_id,
        page: this.page,
        page_size: this.page_size
      };
      getAssistAttributeList({ params: data }).then(res => {
        console.log(res);
        if (res.errno == 0) {
          this.AttributeData = res.data.item;
          this.total = Number(res.data.record_count);
          this.loading = false;
        }
      });
    },
    getCat() {
      // 获取商品分类数据
      getGoodsCate({ paranms: { user_id: sessionStorage.user_id } }).then(
        res => {
          if (res.errno == 0) {
            console.log(res.data)
            this.dataTree = res.data;
          }
        }
      );
    },
    formatter(row) {
      switch (row.attr_index) {
        case "0":
          return "无需检索";
          break;
        case "1":
          return "关键字检索";
          break;
        case "2":
          return "范围检索";
          break;
      }
    },
    add() {
        this.isEdit = false;
        this.formServeDetail = {};
        this.dynamicTags = []
        if (this.$refs.form) {
            this.$refs.form.resetFields();
        }
        this.dialogServeDetail = true;
    },
    edit(row){//-----------------------保存修改
      let data=this.$qs.stringify(row);
      editAssistAttribute(data).then(res=>{
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
      });
    },
    editDone(formName) {
        this.$refs[formName].validate(valid => {
            if (valid) {
                if (this.isEdit) {
                    this.formServeDetail.attr_values = JSON.stringify(this.dynamicTags)
                    let tmpData = this.$qs.stringify(this.formServeDetail);
                    editAssistAttribute(tmpData).then(res => {
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
                    this.formServeDetail.attr_values = JSON.stringify(this.dynamicTags)
                    let tmpData = this.$qs.stringify(this.formServeDetail);
                    addAssistAttribute(tmpData).then(res => {
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
    serveSearch() {},
    reset() {
      this.initData();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.initData();
    },
    showDetails(row) { //  获取详情
        this.isEdit = true
      getAssistAttributeDetail({ params: { attr_id: row.attr_id } }).then(res => {
          if (res.errno == 0) {
            console.log(res);
            this.formServeDetail = res.data;
            this.dynamicTags = res.data.attr_values?JSON.parse(res.data.attr_values):[];
          }else {
              this.$message({
                type: "error",
                message: res.errmsg,
                duration: 1000
                });
          }
        }
      );
    },
    deleteRow(index, rows) { // 删除属性
      this.$confirm("即将执行删除操作, 确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let tmpData = this.$qs.stringify({ 
          cat_id: data.cat_id
        });
        delAssistAttribute(tmpData)
          .then(res => {
            if (res.errno == 0) {
              this.$message({
                type: "success",
                message: "删除成功!",
                duration: 1000
              });
            }else {
                this.$message({
                type: "error",
                message: res.errmsg,
                duration: 1000
                });
            }
            this.initData();
          })
      }).catch(res => {
          console.log("用户取消删除");
      })
    },

    handleClose(tag) { // 删除标签
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() { // 回车新增标签
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleNodeClick(val) { // 点击分类树
        console.log(val)
    }
  },
  created() {
    this.initData();
    this.getCat()
  }
};
</script>
<style scoped>
.assistAttribute {
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
  padding: 20px 0;
  text-align: right;
}

/* 新增账户弹出框 & 账户详情弹出框*/
.main-table >>> .el-dialog__body {
  padding: 0 20px;
}
.main-table >>> .el-dialog__body .el-form-item__content {
  width: 180px;
  text-align: right;
}
.main-table >>> .el-dialog__body .el-form-item.tag .el-form-item__content {
  width: 85%;
  text-align: left;
}
.main-table >>> .el-dialog__body .el-form-item.radio .el-form-item__content {
  text-align: left;
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
.el-tag + .el-tag {
  margin-left: 6px;
}
.button-new-tag {
  margin-left: 6px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 80px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
