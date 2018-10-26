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
            <!-- 客户搜索 -->
            <el-form :inline="true" :model="formCustomer" class="demo-form-inline">
                <el-form-item label="客户名称">
                    <el-input v-model="formCustomer.name" placeholder="客户名称"></el-input>
                </el-form-item>
                <el-form-item label="客户编号">
                    <el-input v-model="formCustomer.number" placeholder="客户编号"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input type="tel" v-model="formCustomer.phone" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="tel" v-model="formCustomer.marks" placeholder="备注信息"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" size="small" @click="customerSearch">搜索</el-button>
                    <el-button type="success" size="small" @click="dialogCustomerAdd = true">新增</el-button>
                    <el-button type="success" size="small">导入</el-button>
                    <el-button type="success" size="small">导出</el-button>
                    <el-button type="success" size="small" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form>
            <!-- 新增客户弹出框 -->
            <el-dialog width="760px" title="客户新增" :visible.sync="dialogCustomerAdd">
                <el-form label-position="right" :model="formCustomerAdd" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="客户名称">
                                <el-input v-model="formCustomerAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系人">
                                <el-input v-model="formCustomerAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="客户编号">
                                <el-input v-model="formCustomerAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="手机号">
                                <el-input v-model="formCustomerAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="客户生日">
                                <el-input v-model="formCustomerAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="客户地址">
                                <el-input v-model="formCustomerAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="客户积分">
                                <el-input v-model="formCustomerAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="开户名">
                                <el-input v-model="formCustomerAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="开户行">
                                <el-input v-model="formCustomerAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="银行账户">
                                <el-input v-model="formCustomerAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="税号">
                                <el-input v-model="formCustomerAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="社交帐号">
                                <el-input v-model="formCustomerAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="邮箱地址">
                                <el-input v-model="formCustomerAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="备注信息">
                                <el-input v-model="formCustomerAdd.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogCustomerAdd = false">取 消</el-button>
                    <el-button type="primary" @click="dialogCustomerAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 客户详情弹出框 -->
            <el-dialog width="760px" title="客户信息编辑" :visible.sync="dialogCustomerDetail">
                <el-form label-position="right" :model="formCustomerDetail" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="客户名称">
                                <el-input v-model="formCustomerDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系人">
                                <el-input v-model="formCustomerDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="客户编号">
                                <el-input v-model="formCustomerDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="手机号">
                                <el-input v-model="formCustomerDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="客户生日">
                                <el-input v-model="formCustomerDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="客户地址">
                                <el-input v-model="formCustomerDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="客户积分">
                                <el-input v-model="formCustomerDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="开户名">
                                <el-input v-model="formCustomerDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="开户行">
                                <el-input v-model="formCustomerDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="银行账户">
                                <el-input v-model="formCustomerDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="税号">
                                <el-input v-model="formCustomerDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="社交帐号">
                                <el-input v-model="formCustomerDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="邮箱地址">
                                <el-input v-model="formCustomerDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="备注信息">
                                <el-input v-model="formCustomerDetail.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogCustomerDetail = false">取 消</el-button>
                    <el-button type="primary" @click="dialogCustomerDetail = false">保存</el-button>
                </div>
            </el-dialog>
            <!-- 积分详情弹出框 -->
            <el-dialog width="880px" title="积分详情-报表" class="integral" :visible.sync="dialogIntegralDetail">
                <el-form :inline="true" :model="formIntegral" class="demo-form-inline">
                    <el-form-item>
                        <el-date-picker
                        v-model="value7"
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
                        <el-button type="success" size="small" @click="integralSearch">搜索</el-button>
                        <el-button type="success" size="small">导入</el-button>
                        <el-button type="success" size="small" @click="reset">刷新</el-button>
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
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="1"
                :page-sizes="[5, 10, 20, 50]"
                :page-size="5"
                layout="total, sizes, prev, pager, next, jumper"
                :total="200">
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
                    <el-button @click="dialogIntegralOperate = false">取 消</el-button>
                    <el-button type="primary" @click="dialogIntegralOperate = false">保 存</el-button>
                </div>
            </el-dialog>

            <!-- 客户管理表格 -->
            <el-table
            :data="customerTableData"
            border
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
                        <el-button type="text" size="small" @click="dialogCustomerDetail = true">客户详情</el-button>
                        <el-button type="text" size="small" @click="dialogIntegralDetail = true">积分详情</el-button>
                        <el-button type="text" size="small" @click="dialogIntegralOperate = true">积分操作</el-button>
                        <el-button type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="200">
            </el-pagination>
        </div>
    </div>
</template>

<script>   
import axios from 'axios' 
export default {
  data() {
    return {
      customerTableData:[],
      integralTableData:[ // 积分详情内表格数据
          {
          oprateTime: "2018-08-08",
          doctype: "单据一",
          docNumber: "88888888",
          oprateIntegral:"",
          integralNow:888888,
          marks: "大吉大利"
        },
         {
          oprateTime: "2018-08-08",
          doctype: "单据一",
          docNumber: "88888888",
          oprateIntegral:"",
          integralNow:888888,
          marks: "大吉大利"
        }
      ],
      dialogCustomerAdd: false, // 新增客户弹出框
      dialogCustomerDetail:false, // 客户详情弹出框
      dialogIntegralDetail:false, //积分详情弹出框
      dialogIntegralOperate:false, // 积分操作弹出框
      formLabelWidth: "120px",
      formCustomer: { // 客户搜索模块表单数据
        name: "",
        phone: "",
        number: "",
        maks: ""
      },
      formCustomerAdd: { // 新增客户表单数据
        name: ""
      },
      formCustomerDetail:{ // 客户详情表单数据
        name:""
      },
      formIntegralOperate:{ // 积分操作表单数据
        type:'减少积分',
        number:8,
        marks:''
      },
      formIntegral:{ // 积分详情内积分搜索表单数据
        docType:'',
        integralType:''
      },
     pickerOptions: { // 日期选择器插件快捷选择功能数据
        shortcuts: [{
        text: '最近一周',
        onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
        }
        }, {
        text: '最近一个月',
        onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
        }
        }, {
        text: '最近三个月',
        onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
        }
        }]
      },
      value7: '',
    }
  },
  mounted: function () { 
    axios.post('http://api.guimishuo1.com/erp/customer/lists')
    .then((res) =>{
      console.log(res.data.data.user_list);
      this.customerTableData=res.data.data.user_list;
      console.log(this.customerTableData[0]);

    }, function (error) {
      console.log(error)
    })
  },
  methods: {
    customerSearch() {      
      console.log("submit!");
    },
    integralSearch() {
      console.log("submit!");
    },
    reset() {
      console.log("reset!");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style scoped>
.customerManage{
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
  text-align: center;
}

/* 新增客户弹出框 & 客户详情弹出框*/
.cusM-table>>>.el-dialog__body {
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
.el-form .el-form-item .el-select{
  width: 120px;
}

</style>