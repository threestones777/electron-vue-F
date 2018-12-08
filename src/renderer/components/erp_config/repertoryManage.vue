<template>
  <div class="repertoryManage">
    <!-- 头部面包屑 -->
    <div class="main-header">
      <h3>温州美联 管理中心</h3>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main-table">
      <!-- 仓库搜索 -->
      <el-form :inline="true" :model="formRepertory" class="demo-form-inline">
        <!-- <el-form-item label="仓库名称">
          <el-input size="small" clearable v-model="formRepertory.store_name" placeholder="仓库名称"></el-input>
        </el-form-item>
        <el-form-item label="仓库编号">
          <el-input size="small" clearable v-model="formRepertory.store_id" placeholder="仓库编号"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-input placeholder="请输入仓库名称" @input="search" v-model="keywords" style="width:50%;margin-right:10px" size="small">
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
          <el-button type="primary" size="small" @click="add">新增</el-button>
          <el-button type="primary" size="small" @click="reset">刷新</el-button>
        </el-form-item>
      </el-form>
      <!-- 仓库增改弹出框 -->
      <el-dialog width="910px" title="仓库详情" :visible.sync="dialogRepertoryDetail">
        <el-form
          label-position="right"
          ref="form"
          :model="formRepertoryDetail"
        >
          <el-row>
            <el-col :span="8">
                <el-form-item label="父仓库" prop="parent_id" :rules="rule">
                    <el-select :disabled="isEdit" clearable v-model="formRepertoryDetail.parent_id" placeholder="请选择父级仓库">
                        <el-option
                        v-for="item in faStore"
                        :key="item.store_id"
                        :label="item.store_name"
                        :value="item.store_id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="子仓库名" prop="store_name" :rules="rule">
                <el-input v-model="formRepertoryDetail.store_name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="仓库地址" prop="homeAddress" :rules="rule">
                  <el-cascader
                    size="large"
                    :options="options"
                    v-model="formRepertoryDetail.homeAddress"
                    @change="handleChange">
                </el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="备注信息">
                <el-input v-model="formRepertoryDetail.remark" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="面积" prop="mianji" :rules="rule">
                  <el-input-number :controls="false" v-model="formRepertoryDetail.mianji" :precision="2" :min="0"></el-input-number>
                <!-- <el-input v-model="formRepertoryDetail.mianji" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="库管管理">
                <!-- <el-select @change="change" clearable v-model="admin_ids" multiple placeholder="请选择">
                    <el-option
                    v-for="item in list_adminer"
                    :key="item.adminid"
                    :label="item.user_name"
                    :value="item.adminid">
                    </el-option>
                </el-select> -->

                <el-popover placement="right" trigger="click">
                    <el-table
                    :data="list_adminer"
                    :row-style="{height:0}"
                    :cell-style="{padding:0}"
                    :header-row-style="{height:0}"
                    :header-cell-style="{padding:0}"
                    border
                    ref="multipleTable"
                    @selection-change="handleSelectionChange"
                    >
                    <el-table-column align="center" type="selection"></el-table-column>
                    <el-table-column align="center" prop="user_name" label="用户名"></el-table-column>
                    </el-table>
                    <el-button slot="reference">查/改库管</el-button>
                </el-popover>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-show="isEdit">
            <el-col :span="8">
                <el-form-item label="管理员列表">
                    <el-popover placement="right" trigger="hover">
                        <el-table
                        :data="admin_list"
                        :row-style="{height:0}"
                        :cell-style="{padding:0}"
                        :header-row-style="{height:0}"
                        :header-cell-style="{padding:0}"
                        border
                        >
                        <el-table-column align="center" prop="user_name" label="用户名"></el-table-column>
                        </el-table>
                        <el-button slot="reference">查看管理员</el-button>
                    </el-popover>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogRepertoryDetail = false">取 消</el-button>
          <el-button size="small" type="primary" @click="editDone('form')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 仓库管理表格 -->
      <el-table
        :data="repertoryMData"
        border
        :row-style="{height:0}"
        :cell-style="{padding:0}"
        :header-row-style="{height:0}"
        :header-cell-style="{padding:0}"
        v-loading="loading"
        style="width: 100%"
      >
        <el-table-column prop="store_name" align="center" label="仓库名称"></el-table-column>
        <el-table-column prop="store_id" align="center" label="仓库编号" width="180"></el-table-column>
        <el-table-column prop="mianji" align="center" label="面积" width="180"></el-table-column>
        <el-table-column align="center" label="地址">
          <template
            slot-scope="scope"
          >{{scope.row.province_name+scope.row.city_name+scope.row.district_name}}</template>
        </el-table-column>
        <el-table-column fixed="right" align="center" label="相关操作" width="240">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="repertoryDetail(scope.row)"
            >详情</el-button>
            <el-button type="text" @click.native.prevent="deleteRow(scope.row)" size="small">删除</el-button>
          </template>
        </el-table-column>
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
  getRepertoryList,
  getRepertoryDetail,
  delRepertory,
  addRepertory,
  editRepertory,
  getRepertoryData
} from "../../api/api";
import { regionData, CodeToText, TextToCode } from "element-china-area-data";
export default {
  data() {
    return {
      page: 1,
      page_size: 10,
      total: 0,
      loading: true,
      isEdit:false,
      keywords:'',
      dialogRepertoryAdd: false,
      dialogRepertoryDetail: false,
      formRepertory: {},
      formRepertoryDetail: {},
      repertoryMData: [],
      admin_list: [], // 管理员列表
      list_adminer: [], // 总库管列表
      options: regionData, // 省市区插件数据
      faStore:[], // 父仓库列表
      admin_ids:[],
      selectedKuguan:[],
      rule: [{ required: true, message: "不能为空" }],

    };
  },
  methods: {
    search() {
      let data=this.$qs.stringify({
          
      });
      getRepertoryList({ params:{
        page:1,
        page_size:10,
        store_name:this.keywords
      }}).then(res => {
        console.log(res);
        if (res.errno == 0) {
          this.repertoryMData = res.data.store_list;
          this.total = Number(res.data.record_count);
          this.loading = false;
        }
      });
  }, 
    initData(sub) {
      // 获取仓库列表
      let data = {
        subsite_id: 3,
        user_id: sessionStorage.user_id,
        page: this.page,
        page_size: this.page_size
      };
      if (sub) {
        data = Object.assign(data, sub);
      }
      getRepertoryList({ params: data }).then(res => {
        console.log(res);
        if (res.errno == 0) {
          this.repertoryMData = res.data.store_list;
          this.total = Number(res.data.record_count);
          this.loading = false;
        }
      });
    },
    // change(val) {
    //     console.log(val)
    //     // this.$set(this.formRepertoryDetail,'admin_ids',val)
    //     this.admin_ids = val
    // },
    getAllData(sid='') { // 获取一些可选择的数据
        let tmpData = this.$qs.stringify({
            sid
        });
        getRepertoryData(tmpData).then(res => {
            if (res.errno == 0) {
                this.list_adminer = res.data.res_admin
                this.faStore = res.data.store_list
            } else {
                this.$message({
                type: "error",
                message: res.errmsg,
                duration: 1000
                });
            }
        });
    },
    add() { // 添加前置操作
        this.isEdit = false;
        this.formRepertoryDetail = {};
        if (this.$refs.form) {
            this.$refs.form.resetFields();
            this.$refs.multipleTable.clearSelection()
        }
        this.dialogRepertoryDetail = true;
    },
    editDone(formName) { // 增/改
        if(!this.selectedKuguan.length) {
            this.$message({
                type: "error",
                message: '库管为必选项!',
                duration: 1000
            });
            return
        }
        this.$refs[formName].validate(valid => {
            if (valid) {
                let province = CodeToText[this.formRepertoryDetail.homeAddress[0]]
                let city = CodeToText[this.formRepertoryDetail.homeAddress[1]]
                let district = CodeToText[this.formRepertoryDetail.homeAddress[2]]
                let data = {
                    parent_id:this.formRepertoryDetail.parent_id,
                    store_name:this.formRepertoryDetail.store_name,
                    province:province.substr(0,province.length-1),
                    city:city.substr(0,city.length-1),
                    district:district.substr(0,district.length-1),
                    mianji:this.formRepertoryDetail.mianji,
                    admin_id:JSON.stringify(this.selectedKuguan),
                    remark:this.formRepertoryDetail.remark?this.formRepertoryDetail.remark:'',
                }
                if (this.isEdit) {
                    data.store_id = this.formRepertoryDetail.store_id
                    editRepertory(this.$qs.stringify(data)).then(res => {
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
                    this.dialogRepertoryDetail = false;
                    });
                } else {
                    addRepertory(this.$qs.stringify(data)).then(res => {
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
                    this.dialogRepertoryDetail = false;
                    });
                }
            }
        });
    },
    repertoryDetail(v) { // 详情
        this.dialogRepertoryDetail = true
        this.$nextTick(()=>{
            this.$refs.multipleTable.clearSelection()
        })
        this.isEdit = true
        getRepertoryDetail({ params: { id: v.store_id } }).then(res => {
        if (res.errno == 0) {
          console.log(res.data);
          this.formRepertoryDetail = res.data.store;
          this.admin_list = res.data.admin_list;

          res.data.list_adminer.forEach((v,i)=>{
              this.list_adminer.forEach((v2,i2)=>{
                  if(v.admin_id == v2.adminid) {
                    this.$refs.multipleTable.toggleRowSelection(v2)
                  }
              })
          })

          let province = res.data.province_name
          let city = res.data.city_name
          let district = res.data.district_name
          let arr = []
          for (let key in TextToCode) {
              if(key.indexOf(province) != -1) {
                  arr.push(TextToCode[key].code)
                  let tmpProvince = TextToCode[key]
                  for (let key2 in tmpProvince) {
                      if(key2.indexOf(city) != -1) {
                          arr.push(TextToCode[key][key2].code)
                          let tmpCity = TextToCode[key][key2]
                          for (const key3 in tmpCity) {
                              if(key3.indexOf(district) != -1) {
                                  arr.push(TextToCode[key][key2][key3].code)
                              }
                          }
                      }
                  }
              }
          }
          this.formRepertoryDetail.homeAddress = arr
        }else {
            this.$message({
                type: "error",
                message: res.errmsg,
                duration: 1000
            });
        }
      });
    },
    repertorySearch() {
      this.initData(this.formRepertory);
    },
    reset() {
      this.formRepertory = {};
      this.initData();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.initData(this.formRepertory);
    },
    handleChange() {
        
    },
    handleSelectionChange(val) { // 设置已选择的库管
        let arr = []
        val.forEach((v,i)=>{
            arr.push(v.adminid)
        })
        this.selectedKuguan = arr
    },
    deleteRow(rows) { // 删除仓库
        this.$confirm("即将执行删除操作, 确认删除吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        })
        .then(() => {
            console.log(rows.id);
            let tmpData = { id: rows.store_id };
            delRepertory({params:tmpData}).then(res => {
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
    this.getAllData()
  }
};
</script>
<style scoped>
.repertoryManage {
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
  margin-top: 20px;
  text-align: right;
}

/* 新增仓库弹出框 & 仓库详情弹出框*/
.main-table >>> .el-dialog__body {
  padding: 0 20px;
}
.main-table >>> .el-dialog__body .el-form-item__content {
  width: 200px;
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
.main-table >>> .el-dialog__body .el-button,
.main-table >>> .el-dialog__body .el-input-number {
  width: 100%;
}
.el-row {
  border-top: 1px dashed #ccc;
}
</style>