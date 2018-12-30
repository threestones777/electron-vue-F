<template>
    <div class="valueCard">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>会员</el-breadcrumb-item>
                <el-breadcrumb-item>储值卡</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <!-- 搜索 -->            
            <el-form :inline="true" :model="formServe" class="demo-form-inline">                
                <el-form-item>
                    <el-input placeholder="请输入类型名称" @input="search" v-model="keywords" style="width:50%;margin-right:10px" size="small">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                    <el-button type="primary" size="small" @click="dialogServeAdd = true">新增</el-button>
                    <el-button type="primary" size="small" @click="reset">刷新</el-button>
                    <el-button icon="el-icon-tickets" type=primary size="small" @click="dialogShow=true">显示列</el-button>
                </el-form-item>
            </el-form>
            <!-- 按需选择列弹窗 -->
            <el-dialog
            title="按需选择列" class="chose" style="text-align:left"
            :visible.sync="dialogShow"
            :before-close="handleClose"
            width="200px">
                <el-checkbox v-model="valueCardshow.show1">类型id</el-checkbox><br>
                <el-checkbox v-model="valueCardshow.show2">类型名称</el-checkbox><br>
                <el-checkbox v-model="valueCardshow.show3">卡积分</el-checkbox><br>
                <el-checkbox v-model="valueCardshow.show4">发放数量</el-checkbox><br>
                <el-checkbox v-model="valueCardshow.show5">开始日期</el-checkbox><br>
                <el-checkbox v-model="valueCardshow.show6">结束日期</el-checkbox><br><br>
            </el-dialog>
            <!-- 新增弹出框 -->
            <el-dialog width="550px" title="新增" :visible.sync="dialogServeAdd">
                <el-form :model="formServeAdd">
                    <el-form-item label="类型名">
                        <el-input v-model="formServeAdd.type_name"></el-input>
                    </el-form-item>
                    <el-form-item label="卡积分">
                        <el-input v-model="formServeAdd.type_integral"></el-input>
                    </el-form-item>                   
                    <el-form-item label="起始日期">
                        <el-date-picker v-model="formServeAdd.use_start_date" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>                    
                    <el-form-item label="结束日期">
                        <el-date-picker v-model="formServeAdd.use_end_date" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>                    
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeAdd = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="add(),dialogServeAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 发放弹出框 -->
            <el-dialog width="450px" title="发放" :visible.sync="dialogIssue">                
                    本次发放数量：<el-input style="width:75%" v-model="send_sum"></el-input>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogIssue = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="issue(),dialogIssue = false">发 放</el-button>
                </div>
            </el-dialog>
            <!-- 查看弹出框 -->
            <el-dialog width="65%" title="查看" :visible.sync="dialogCheck">                
                  <el-table
                    ref="multipleTable"
                    :data="checkData"
                    border
                  :row-style="{height:0}"  
                  :cell-style="{padding:0}"
                  :header-row-style="{height:0}"  
                  :header-cell-style="{padding:0}"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    prop="id"
                    label="编号">
                    </el-table-column>
                    <el-table-column
                    prop="sex"
                    label="性别">
                    </el-table-column>
                    <el-table-column
                    prop="card_sn"
                    label="卡号">
                    </el-table-column>
                    <el-table-column
                    prop="password"
                    label="储值卡密码">
                    </el-table-column>
                    <el-table-column
                    prop="status"
                    label="状态">
                    </el-table-column>
                    <el-table-column
                    prop="last_xiaoshou_time"
                    label="最后销售日期">
                    </el-table-column>
                    <el-table-column
                fixed="right"
                align="center"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" title="详情" @click="checkDetail(scope.row),dialogCheckDetail=true"  icon="el-icon-more"></el-button>
                        <el-button type="text" title="删除" @click="checkDele(scope.row)"  icon="el-icon-delete"></el-button>
                    </template>
                </el-table-column>
                </el-table> 
                <!-- <el-button @click="allDelete">批量删除</el-button> -->
                 <el-pagination
                    @current-change="handleChecktChange"
                    layout="total,prev, pager, next,jumper"
                    :total="record_count">
                </el-pagination>
            </el-dialog>
            <!-- 查看详情弹出框 -->
            <el-dialog
              title="提示"
              :visible.sync="dialogCheckDetail"
              width="450px">
                <el-form :model="checkDetails" ref="checkDetails" :rules="rules">
                    <el-form-item label="储值卡id">
                        <el-input v-model="checkDetails.id" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="修改人" prop="edit_user">
                      <el-input v-model.number="checkDetails.edit_user"></el-input>
                    </el-form-item>
                    <el-form-item label="卡号" style="margin-top:20px">
                        <el-input v-model="checkDetails.card_sn"></el-input>
                    </el-form-item>
                    <el-form-item label="卡积分">
                        <el-input v-model="checkDetails.type_integral"></el-input>
                    </el-form-item>
                    <el-form-item label="卡状态">
                        <el-input v-model="checkDetails.status"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                      <el-input v-model="checkDetails.sex"></el-input>
                    </el-form-item>
                    <el-form-item label="储值卡密码">
                      <el-input v-model="checkDetails.password"></el-input>
                    </el-form-item>                    
                    <el-form-item label="发卡日期">
                        <el-date-picker v-model="checkDetails.add_time" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeDetail = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="checkEdit(),dialogServeDetail = false">保存修改</el-button>
                </div>
            </el-dialog>
            <!-- 类型详情弹出框 -->
            <el-dialog width="450px" title="详情" :visible.sync="dialogServeDetail">
                <el-form :model="formServeDetail">
                    <el-form-item label="类型id">
                        <el-input v-model="formServeDetail.type_id" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="类型名称">
                        <el-input v-model="formServeDetail.type_name"></el-input>
                    </el-form-item>
                    <el-form-item label="卡积分">
                        <el-input v-model="formServeDetail.type_integral"></el-input>
                    </el-form-item>
                    <el-form-item label="发放数量">
                        <el-input v-model="formServeDetail.send_count" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="起始日期">
                        <el-date-picker v-model="formServeDetail.use_start_date" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束日期">
                        <el-date-picker v-model="formServeDetail.use_end_date" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeDetail = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="edit(),dialogServeDetail = false">保存修改</el-button>
                </div>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="valueCardTypeData"
            border
            show-summary
            :row-style="{height:0}"  
            :cell-style="{padding:7}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            style="width: 100%">
                <el-table-column
                prop="type_id"
                align="center"
                v-if="valueCardshow.show1"
                label="类型id">                  
                </el-table-column>
                <el-table-column
                prop="type_name"
                align="center"
                v-if="valueCardshow.show2"
                label="类型名称">
                  <template slot-scope="scope">
                        <input v-model="scope.row.type_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="type_integral"
                align="center"
                v-if="valueCardshow.show3"
                label="卡积分">
                  <template slot-scope="scope">
                        <input v-model="scope.row.type_integral"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="send_count"
                align="center"
                v-if="valueCardshow.show4"
                label="发放数量">
                </el-table-column>
                <el-table-column
                prop="use_start_date"
                align="center"
                v-if="valueCardshow.show5"
                label="开始日期">
                  <template slot-scope="scope">
                        <input v-model="scope.row.use_start_date"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="use_end_date"
                align="center"
                v-if="valueCardshow.show6"
                label="结束日期">
                    <template slot-scope="scope">
                        <input v-model="scope.row.use_end_date"/>
                    </template>
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="edit(scope.row)">保存修改</el-button>
                        <el-button type="text" size="small" @click="getId(scope.row),dialogIssue = true">发放</el-button>
                        <el-button type="text" size="small" @click="check(scope.row),dialogCheck = true">查看</el-button>
                        <!-- <el-button type="text" title="删除" @click="deleteRow(scope.row)"  icon="el-icon-delete"></el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
                @current-change="handleCurrentChange"
                layout="prev, pager, next,jumper"
                :page-count="pages">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {
  valueCardType,
  valueCardTypeDe,
  valueCardTypeEd,
  valueCardTypeAdd,
  valueCardIssue,
  valueCard,
  valueCardDe,
  valueCardEd
} from "../../api/apiW";
export default {
  inject: ["reload"],
  data() {
    var checkEdit_user = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("修改人不能为空且大于0的数字"));
      }else{
         if(value<0){
           return callback(new Error("大于0的数字"));
         }
      }
    };
    return {
      rules: {
        edit_user: [
          {validator: checkEdit_user,}
        ]
      },
      pages: 1,
      record_count: 0,
      dialogServeAdd: false,
      dialogIssue: false,
      dialogCheck: false,
      dialogCheckDetail: false,
      dialogServeDetail: false,
      dialogShow:false,
      valueCardshow:{
          show1:false,
          show2:true,
          show3:true,
          show4:true,
          show5:true,
          show6:true,
      },
      type_id: 0,
      id:0,
      send_sum: 0,
      keywords:"",
      formServe: {
        name: "",
        marks: ""
      },
      formServeAdd: {},
      formServeDetail: {},
      checkDetails: {},
      formIssue: {},
      valueCardTypeData: [],
      checkData: [],
      multipleSelection: []
    };
  },
  methods: {
    init(page){
      let data=this.$qs.stringify({
          page:page,
          page_size:10,
      }); 
      valueCardType(data).then(res => {
        console.log(res.data);
        this.valueCardTypeData = res.data.orders;
      });
    },
    handleClose(done){
        done();
        /* let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
        erpTableSetting.valueCard=this.valueCardshow;
        localStorage.erpTableSetting=JSON.stringify(erpTableSetting); */
    },
    search() {
      let data=this.$qs.stringify({
          type_name:this.keywords
      });
      valueCardType(data).then(res => {
        console.log(res.data);
        this.valueCardTypeData = res.data.orders;
      });
  }, 
    reset() {
      this.reload();
    },
    handleCurrentChange(val) {
      this.init(val);
    },
    handleChecktChange(val) {//--------------查看的 分页查询
      console.log(val);
      let dataC = this.$qs.stringify({
        type_id: this.type_id,
        page: val,
        page_size: 10
      });
      valueCard(dataC).then(res => {
        console.log(res.data.orders);
        this.checkData = res.data.orders;
        this.record_count = Number(res.data.filter.record_count);
      });
    },
    handleSelectionChange(val) {//--------------多选改变
      this.multipleSelection = val;
    },
    showDetails(row) {//--------------详情
      console.log(row.type_id);
      let dataD = this.$qs.stringify({
        type_id: row.type_id
      });
      valueCardTypeDe(dataD).then(res => {
        console.log(res.data[0]);
        this.formServeDetail = res.data[0];
      });
    },
    edit(row) {//--------------修改
      console.log("修改");
      let dataE = this.$qs.stringify(row);
      valueCardTypeEd(dataE).then(res => {
        console.log(res.errno);
        if (res.errno == 0) {
            this.$message({
                type: "success",
                message: res.errmsg,
                duration: 1000
            });
          this.init(1);
        } else {
            this.$message({
                type: "error",
                message: res.errmsg,
                duration: 1000
            });
            this.init(1);
        }
      });
    },
    getId(row) {//--------------获取id
      this.type_id = row.type_id;
      console.log(this.type_id);
    },
    issue(row) {//--------------发放2
      let dataI = this.$qs.stringify({
        type_id: this.type_id,
        send_sum: this.send_sum
      });
      valueCardIssue(dataI).then(res => {
        if (res.errno == 0) {
          this.$message({
              type: "success",
              message: res.errmsg,
              duration: 1000
          });
          this.init(1);
          this.send_sum=0;
        } else {
          this.$message({
              type: "error",
              message: res.errmsg,
              duration: 1000
          });
          this.init(1);
        }
      });
    },
    check(row) {//--------------查看
      this.type_id = row.type_id;
      let dataC = this.$qs.stringify({
        type_id: this.type_id,
        page: 1,
        page_size: 10
      });
      valueCard(dataC).then(res => {
        console.log(res.data.orders);
        this.checkData = res.data.orders;
        this.record_count = Number(res.data.filter.record_count);
      });
    },
    checkDetail(row) {//--------------查看 详情
      console.log(this.type_id);
      console.log(this.id);
      this.id=row.id;
      let dataCD = this.$qs.stringify({
        type_id: this.type_id,
        id: this.id
      });
      valueCardDe(dataCD).then(res => {
        console.log(res.data[0]);
        this.checkDetails = res.data[0];
      });
    },
    checkEdit() {//--------------查看 修改
      console.log("查看修改");
      this.checkDetails.status = this.checkDetails.status == "未使用" ? 0 : 1;
      this.checkDetails.sex = this.checkDetails.sex == "保密" ? 0 : 1;
      let dataCE = this.$qs.stringify(this.checkDetails);
      valueCardEd(dataCE).then(res => {
        console.log(res.errno);
        if (res.errno == 0) {
          this.$alert(res.errmsg);
          this.reload();
        } else {
          this.$alert(res.errmsg);
        }
      });
    },
    checkDele(row){//--------------查看 删除
      this.id=row.id;
      console.log(this.id+"*"+this.type_id);
      let dataCD = this.$qs.stringify({
        type_id: this.type_id,
        id: this.id,
        is_delete:1,
        edit_user:1
      });
      valueCardEd(dataCD).then(res => {
        console.log(res.errno);
        if (res.errno == 0) {
          this.$alert(res.errmsg); 
          this.reload(); 
        } else {
          this.$alert(res.errmsg);
        }
      });
    },
    add() {//--------------添加
      let dataA = this.$qs.stringify(this.formServeAdd);
      valueCardTypeAdd(dataA).then(res => {
        if (res.errno == 0) {
          this.$alert(res.errmsg);
          this.reload();
        } else {
          this.$alert(res.errmsg);
        }
      });
    },
    /* deleteRow(row) {//--------------删除提货券类型
            let Message=confirm("确定删除此行数据？");
            if(Message){
                let dataM=this.$qs.stringify({
                    is_delete:1
                });
                valueCardTypeEd(dataM).then(res=>{
                    if(res.errno==0){
                        this.$alert(res.errmsg)
                        this.reload();
                    }else{
                        this.$alert(res.errmsg)
                    }
                })
            }else{
                alert("用户取消操作");
            }
        }, */
    dele(row) {//--------------删除提货券
      console.log(row.tg_id);
      let Message = confirm("确定删除此行数据？");
      if (Message) {
        let dataM = this.$qs.stringify({
          id: row.tg_id
        });
        cardVoucherRmvB(dataM).then(res => {
          if (res.errno == 0) {
            this.$alert(res.errmsg, {
              callback: action => {
                let dataC = this.$qs.stringify({
                  tg_type: this.type_id,
                  page: 1,
                  page_size: 10
                });
                cardVoucherDe(dataC).then(res => {
                  console.log(res.data.vc_list);
                  this.checkData = res.data.vc_list;
                  this.record_count = Number(res.data.filter.record_count);
                });
              }
            });
          } else {
            this.$alert(res.errmsg);
          }
        });
      } else {
        alert("用户取消操作");
      }
    },
    allDelete(row) {//--------------批量删除
      console.log(this.multipleSelection);
      let checkboxes = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        console.log(this.multipleSelection[i].tg_id);
        checkboxes.push(this.multipleSelection[i].tg_id);
      }
      console.log(checkboxes);
      let str = checkboxes.join(",");
      console.log(str);
      console.log(this.type_id);
      let Message = confirm("确定删除这些数据？");
      if (Message) {
        let dataM = this.$qs.stringify({
          checkboxes: JSON.stringify(checkboxes),
          drop: 1,
          tg_type: this.type_id
        });
        cardVoucherAddDe(dataM).then(res => {
          if (res.errno == 0) {
            this.$alert(res.errmsg, {
              callback: action => {
                let dataC = this.$qs.stringify({
                  tg_type: this.type_id,
                  page: 1,
                  page_size: 10
                });
                cardVoucherDe(dataC).then(res => {
                  console.log(res.data.vc_list);
                  this.checkData = res.data.vc_list;
                  this.record_count = Number(res.data.filter.record_count);
                });
              }
            });
          } else {
            this.$alert(res.errmsg);
          }
        });
      } else {
        alert("用户取消操作");
      }
    }
  },
  created: function() {
    if(localStorage.erpTableSetting!==undefined){
        console.log("yes");
        let erpTableSetting=JSON.parse(localStorage.erpTableSetting); 
        if(erpTableSetting.valueCard!==undefined){
            this.valueCardshow=erpTableSetting.valueCard;
        }
    }else{
        console.log("no");
    }; 
    this.init(1);
  }
};
</script>
<style scoped>
.valueCard {
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
.el-table input{
    width:100%;
    height:34px;
    border:1px solid #DCDFE6;
    border-radius:4px;
    padding:2px;
}
/* 新增弹出框 & 详情弹出框*/
.main-table >>> .el-dialog__body {
  padding: 0 20px;
}
.el-dialog__body .el-form {
  text-align: right;
}
.el-row {
  border-top: 1px dashed #ccc;
}
</style>