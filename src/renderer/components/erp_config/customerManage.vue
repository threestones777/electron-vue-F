<template>
    <div class="customerManage">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>设置</el-breadcrumb-item>
                <el-breadcrumb-item>客户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <el-form :inline="true" :model="formCustomer" class="demo-form-inline">
                <el-form-item>
                    <!-- <el-button type="primary" size="small" @click="customerSearch">搜索</el-button> -->
                    <el-button type="primary" size="small" @click="dialogCustomerAdd = true">新增</el-button>
                    <!-- <el-button type="primary" size="small">导入</el-button>
                    <el-button type="primary" size="small">导出</el-button> -->
                    <el-button type="primary" size="small" @click="reset">刷 新</el-button>
                </el-form-item>
            </el-form>
            <!-- 新增客户弹出框 -->
            <el-dialog width="760px" title="客户新增" :visible.sync="dialogCustomerAdd">
                <el-form label-position="right" :model="formCustomerAdd" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="客户名称">
                                <el-input v-model="formCustomerAdd.user_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系人">
                                <el-input v-model="formCustomerAdd.contacts" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="客户编号">
                                <el-input v-model="formCustomerAdd.user_id" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="手机号">
                                <el-input v-model="formCustomerAdd.mobile_phone" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="客户生日">
                                <el-input v-model="formCustomerAdd.birthday" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="客户地址">
                                <el-input v-model="formCustomerAdd.address" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="客户积分">
                                <el-input v-model="formCustomerAdd.rank_points" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="开户名">
                                <el-input v-model="formCustomerAdd.bank_username" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="开户行">
                                <el-input v-model="formCustomerAdd.bank_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="银行账户">
                                <el-input v-model="formCustomerAdd.bank_cardnum" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="税号">
                                <el-input v-model="formCustomerAdd.duty_number" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="社交帐号">
                                <el-input v-model="formCustomerAdd.social" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="邮箱地址">
                                <el-input v-model="formCustomerAdd.email" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="备注信息">
                                <el-input v-model="formCustomerAdd.remark" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogCustomerAdd = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="add(),dialogCustomerAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 客户详情弹出框 -->
            <el-dialog width="760px" title="客户信息编辑" :visible.sync="dialogCustomerDetail">
                <el-form label-position="right" :model="formCustomerDetail" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="客户名称">
                                <el-input v-model="formCustomerDetail.user_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系人">
                                <el-input v-model="formCustomerDetail.contacts" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="客户编号">
                                <el-input v-model="formCustomerDetail.user_id" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="手机号">
                                <el-input v-model="formCustomerDetail.mobile_phone" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="客户生日">
                                <el-input v-model="formCustomerDetail.birthday" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="客户地址">
                                <el-input v-model="formCustomerDetail.address" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="客户积分">
                                <el-input v-model="formCustomerDetail.rank_points" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="开户名">
                                <el-input v-model="formCustomerDetail.bank_username" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="开户行">
                                <el-input v-model="formCustomerDetail.bank_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="银行账户">
                                <el-input v-model="formCustomerDetail.bank_cardnum" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="税号">
                                <el-input v-model="formCustomerDetail.duty_number" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="社交帐号">
                                <el-input v-model="formCustomerDetail.social" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="邮箱地址">
                                <el-input v-model="formCustomerDetail.email" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="备注信息">
                                <el-input v-model="formCustomerDetail.remark" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogCustomerDetail = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="edit(),dialogCustomerDetail = false">保存</el-button>
                </div>
            </el-dialog>
            <!-- 积分详情弹出框 -->
            <el-dialog width="880px" title="积分详情-报表" class="integral" :visible.sync="dialogIntegralDetail">
                <el-form :inline="true" :model="formIntegral" class="demo-form-inline">
                    <el-form-item>
                        <el-date-picker
                        v-model="value"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="formIntegral.docType" placeholder="单据类型">
                            <el-option label="单据一" value="doc1"></el-option>
                            <el-option label="单据二" value="doc2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="formIntegral.integralType" placeholder="积分类型">
                            <el-option label="积分一" value="integral1"></el-option>
                            <el-option label="积分二" value="integral2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <!-- <el-button type="primary" size="small" @click="integralSearch">搜索</el-button> -->
                        <el-button type="primary" size="small">导入</el-button>
                        <el-button type="primary" size="small" @click="reset">刷新</el-button>
                    </el-form-item>
                </el-form>
                <el-table
                :data="integralTableData"
                border
                style="width: 100%">
                    <el-table-column
                    prop="oprateTime"
                    align="center"
                    label="操作时间">
                    </el-table-column>
                    <el-table-column
                    prop="doctype"
                    align="center"
                    label="单据类型">
                    </el-table-column>
                    <el-table-column
                    prop="docNumber"
                    align="center"
                    label="单据编号">
                    </el-table-column>
                    <el-table-column
                    prop="oprateIntegral"
                    align="center"
                    label="积分操作">
                    </el-table-column>
                    <el-table-column
                    prop="integralNow"
                    align="center"
                    label="本次积分">
                    </el-table-column>
                    <el-table-column
                    prop="marks"
                    align="center"
                    label="备注信息">
                    </el-table-column>
                </el-table>
                <el-pagination
                    @current-change="handleCurrentChange"
                    layout="prev, pager, next"
                    :page-count="page">
                </el-pagination>
            </el-dialog>
            <!-- 积分操作弹出框 -->
            <el-dialog width="400px" title="积分操作" class="integral" :visible.sync="dialogIntegralOperate">
                <el-form :model="formIntegralOperate">
                    <el-form-item label="操作类型">
                        <el-radio-group v-model="formIntegralOperate.type">
                        <el-radio label="增加积分"></el-radio>
                        <el-radio label="减少积分"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="积分数值">
                    <el-input v-model="formIntegralOperate.number" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="备注信息">
                    <el-input v-model="formIntegralOperate.marks" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogIntegralOperate = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="dialogIntegralOperate = false">保 存</el-button>
                </div>
            </el-dialog>

            <!-- 客户管理表格 -->
            <el-table
            :data="customerTableData"
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
                label="客户名称">
                </el-table-column>
                <el-table-column
                prop="user_id"
                align="center"
                label="客户编号"
                width="180">
                </el-table-column>
                <el-table-column
                prop="mobile_phone"
                align="center"
                label="手机号"
                width="180">
                </el-table-column>
                <el-table-column
                prop="email"
                align="center"
                label="邮箱">
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作"
                width="240">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showCustomerDetails(scope.row.user_id),dialogCustomerDetail = true">客户详情</el-button>
                        <!-- <el-button type="text" size="small" @click="dialogIntegralDetail = true">积分详情</el-button>
                        <el-button type="text" size="small" @click="dialogIntegralOperate = true">积分操作</el-button> -->
                        <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
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
import { getcustomerList, getcustomerDetail,getcustomerEd,getcustomerRmv,getcustomerAdd} from "../../api/api";
export default {
  data() {
    return {
      page: 1,
      page_size: 10,
      total: 0,
      loading: true,
      customerTableData: [],
      integralTableData: [
        // 积分详情内表格数据
        {
          oprateTime: "2018-08-08",
          doctype: "单据一",
          docNumber: "88888888",
          oprateIntegral: "",
          integralNow: 888888,
          marks: "大吉大利"
        },
        {
          oprateTime: "2018-08-08",
          doctype: "单据一",
          docNumber: "88888888",
          oprateIntegral: "",
          integralNow: 888888,
          marks: "大吉大利"
        }
      ],
      dialogCustomerAdd: false, // 新增客户弹出框
      dialogCustomerDetail: false, // 客户详情弹出框
      dialogIntegralDetail: false, //积分详情弹出框
      dialogIntegralOperate: false, // 积分操作弹出框
      formLabelWidth: "120px",
      formCustomer: {
        // 客户搜索模块表单数据
        name: "",
        phone: "",
        number: "",
        maks: ""
      },
      formCustomerAdd: {},
      formCustomerDetail: {
        // 客户详情表单数据
      },
      formIntegralOperate: {
        // 积分操作表单数据
        type: "减少积分",
        number: 8,
        marks: ""
      },
      formIntegral: {
        // 积分详情内积分搜索表单数据
        docType: "",
        integralType: ""
      },
      pickerOptions: {
        // 日期选择器插件快捷选择功能数据
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value: ""
    };
  },
  methods: {
        add(){
            let data =this.$qs.stringify(this.formCustomerAdd)
            getcustomerAdd(data).then(res=>{
                console.log(res);
                if(res.errno==0){
                    this.$alert(res.errmsg,{
                        callback:action=>{
                            this.formCustomerAdd={};
                            this.reload();  
                        }
                    })
                }else{
                    this.$alert(res.errmsg)
                    this.formCustomerAdd={};
                }
            });
        },
        edit(){
            let data =this.$qs.stringify(this.formCustomerDetail)
            getcustomerEd(data).then(res=>{
                console.log(res);
                if(res.errno==0){
                    this.$alert(res.errmsg,{
                        callback:action=>{
                            this.initData()
                        }
                    })
                }else{
                    this.$alert(res.errmsg)
                }
            });
      },
      del(row){
            let Message=confirm("确定删除此行商品？");
            if(Message){
                let data =this.$qs.stringify({
                    id:row.user_id,
                });
                getcustomerRmv(data).then(res=>{
                    console.log(res);
                    if(res.errno==0){
                        this.$alert(res.errmsg,{
                            callback:action=>{
                                this.initData()
                            }
                        })
                    }else{
                        this.$alert(res.errmsg)
                    }
                });        
            }else{
                alert("用户取消操作");
            }
      },
    initData() {
      // 获取客户列表
      let data = {
        subsite_id: 3,
        user_id: sessionStorage.user_id,
        page: this.page,
        page_size: this.page_size
      };
      getcustomerList({ params: data }).then(res => {
        console.log(res);
        if (res.errno == 0) {
          this.customerTableData = res.data.user_list;
          this.total = Number(res.data.record_count);
          this.loading = false;
        }
      });
    },
    customerSearch() {
      console.log("submit!");
    },
    integralSearch() {
      console.log("submit!");
    },
    reset() {
      this.initData()
    },
    handleCurrentChange(val) {
      // 翻页
      this.page = val;
      this.initData();
    },
    showCustomerDetails(v) {
      // 客户详情
      getcustomerDetail(v).then(res => {
        this.formCustomerDetail = res.data;
      });
    }
  },
  created: function() {
    this.initData();
  }
};
</script>
<style scoped>
.customerManage {
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
  width: 150px;
}

/* 分页器 */
.el-pagination {
  /* margin-top: 20px; */
  padding: 20px 0;
  text-align: right;
}

/* 新增客户弹出框 & 客户详情弹出框*/
.customerManage >>> .el-dialog__body {
  padding: 0 20px;
}
.el-dialog__body .el-form {
  text-align: right;
}
.el-dialog__wrapper.integral .el-dialog__body .el-form {
  text-align: left;
}
.el-row {
  border-top: 1px dashed #ccc;
}

.el-dialog .el-row:last-of-type .el-col:last-of-type .el-form-item .el-input {
  width: 380px;
}

/* 积分详情弹出框 */
.el-form .el-form-item .el-select {
  width: 120px;
}
</style>