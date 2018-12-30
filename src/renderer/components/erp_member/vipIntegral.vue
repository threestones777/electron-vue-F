<template>
    <div class="vipIntegral">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>会员</el-breadcrumb-item>
                <el-breadcrumb-item>会员积分</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <fieldset style="margin:10px 0;border-color:#fff;text-align:left">
                <legend>查询条件</legend>
                <el-row type="flex" justify="space-around" :gutter="10">
                    <el-col style="text-align:left" :span="2">
                        <el-radio-group v-model="radio" style="margin-top:5px;">
                            <el-radio :label="1">开始日期</el-radio><br>
                            <el-radio :label="2">审核日期</el-radio><br>
                            <el-radio :label="3">修改日期</el-radio>
                        </el-radio-group>    
                    </el-col>
                    <el-col style="text-align:left" :span="3">
                        <el-radio-group v-model="radio" style="margin-top:5px;">
                            <el-radio :label="4">最后销售日期</el-radio><br>
                            <el-radio :label="5">不按日期</el-radio>
                        </el-radio-group>    
                    </el-col>
                    <el-col :span="5">
                        <el-date-picker
                        v-model="search3" size="small"
                        style="width:100%;margin-top:0px"
                        type="daterange"
                        align="right"
                        unlink-panels
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                        <el-row type="flex" style="margin-top:5px;padding:0;" justify="space-around" :gutter="10">
                            <el-col :span="12">
                                <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="value"  size="mini"  placeholder="会员卡号"/>
                            </el-col>
                            <el-col :span="12">
                                <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="value"  size="mini"  placeholder="姓名"/>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="4">
                    <el-select v-model="value2" size="small" placeholder="卡类型">
                            <el-option
                            v-for="item in options2"
                            :key="item.value2"
                            :label="item.label"
                            :value="item.value2">
                            </el-option>
                        </el-select> 
                        <el-select v-model="value3" size="small" placeholder="发卡店" style="margin-top:5px">
                            <el-option
                            v-for="item in options3"
                            :key="item.value4"
                            :label="item.label"
                            :value="item.value3">
                            </el-option>
                        </el-select> 
                        <el-select v-model="value4" size="small" placeholder="分公司" style="margin-top:5px">
                            <el-option
                            v-for="item in options4"
                            :key="item.value4"
                            :label="item.label"
                            :value="item.value4">
                            </el-option>
                        </el-select> 
                    </el-col>
                    <el-col :span="4">
                    <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="search1"  size="mini"  placeholder="修改人"/>
                    <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="search1"  size="mini"  placeholder="审核人"/>
                        <el-select v-model="value1" size="small" placeholder="卡状态">
                            <el-option
                            v-for="item in options1"
                            :key="item.value1"
                            :label="item.label"
                            :value="item.value1">
                            </el-option>
                        </el-select> 
                    </el-col>
                    <el-col :span="3">
                        <el-button type="primary" size="small" @click="reset">刷 新</el-button><br>
                        <el-button type="primary" size="small" style="margin-top:5px" @click="add">新增</el-button><br>
                        <el-button icon="el-icon-tickets"  style="margin-top:5px" type="primary" size="small" @click="dialogShow=true">显示列</el-button>
                    </el-col>
                </el-row>				
			</fieldset>
            <!-- 按需选择列弹窗 -->
            <el-dialog
            title="按需选择列" class="chose" style="text-align:left"
            :visible.sync="dialogShow"
            :before-close="handleClose"
            width="200px">
                <el-checkbox v-model="vipIntegralshow.show1">姓名</el-checkbox><br>
                <el-checkbox v-model="vipIntegralshow.show2">会员卡号</el-checkbox><br>
                <el-checkbox v-model="vipIntegralshow.show3">卡类型</el-checkbox><br>
                <el-checkbox v-model="vipIntegralshow.show4">性别</el-checkbox><br>
                <el-checkbox v-model="vipIntegralshow.show5">可用积分</el-checkbox><br>
                <el-checkbox v-model="vipIntegralshow.show6">发卡时间</el-checkbox><br>
                <el-checkbox v-model="vipIntegralshow.show7">已兑换积分</el-checkbox><br>
                <el-checkbox v-model="vipIntegralshow.show8">累计消费额</el-checkbox><br>
                <el-checkbox v-model="vipIntegralshow.show9">累计消费次数</el-checkbox><br>
                <el-checkbox v-model="vipIntegralshow.show10">有效期截至</el-checkbox><br>
                <el-checkbox v-model="vipIntegralshow.show11">最后销售日期</el-checkbox><br><br>
            </el-dialog>
            <!-- <el-form :inline="true" :model="formServe" class="demo-form-inline">
                <el-form-item>
                    <el-input placeholder="请输入会员卡号" @input="search" v-model="keywords" style="width:50%;margin-right:10px" size="small">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                    <el-button type="primary" size="small" @click="add">新增</el-button>
                    <el-button type="primary" size="small" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form> -->
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
                    <el-button @click="dialogServeAdd = false">取 消</el-button>
                    <el-button type="primary" @click="add">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 详情弹出框 -->
            <el-dialog width="960px" title="会员积分" :visible.sync="dialogServeDetail">
                <el-form label-position="left" ref="form" :model="formServeDetail" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="姓名">
                                <el-input v-model="formServeDetail.user_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="会员卡号">
                                <el-input v-model="formServeDetail.user_card" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="卡类型">
                                <el-input v-model="formServeDetail.type" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="可用积分" prop="integral" :rules="rule">
                                <el-input-number v-model="formServeDetail.integral" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.integral" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="发卡时间">
                                <el-input disabled v-model="formServeDetail.add_time" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="已兑换积分" prop="used_integral" :rules="rule">
                                <el-input-number v-model="formServeDetail.used_integral" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.used_integral" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="累计消费额" prop="xiaofei_price" :rules="rule">
                                <el-input-number v-model="formServeDetail.xiaofei_price" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.xiaofei_price" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="累计消费数" prop="xiaofei_num" :rules="rule">
                                <el-input-number v-model="formServeDetail.xiaofei_num" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.xiaofei_num" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="有效期截至">
                                <el-input disabled v-model="formServeDetail.end_time" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="最后销售日期">
                                <el-input disabled v-model="formServeDetail.last_xiaoshou_time" autocomplete="off"></el-input>
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
            show-summary
            :row-style="{height:0}"  
            :cell-style="{padding:7}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            v-loading="loading"
            style="width: 100%">
                <el-table-column
                align="center"
                v-if="vipIntegralshow.show1"
                label="姓名">
                    <template slot-scope="scope">
                        <input v-model="scope.row.user_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="vipIntegralshow.show2"
                label="会员卡号">
                    <template slot-scope="scope">
                        <input v-model="scope.row.user_card"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="vipIntegralshow.show3"
                label="卡类型">
                    <template slot-scope="scope">
                        <input v-model="scope.row.type"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="vipIntegralshow.show4"
                label="性别">
                <template slot-scope="scop">
                    <span>{{scop.row.sex==1?"男":"女"}}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="integral"
                align="center"
                v-if="vipIntegralshow.show5"
                label="可用积分">
                    <template slot-scope="scope">
                        <input v-model="scope.row.integral"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="vipIntegralshow.show6"
                label="发卡时间">
                    <template slot-scope="scope">
                        <input v-model="scope.row.add_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="used_integral"
                align="center"
                v-if="vipIntegralshow.show7"
                label="已兑换积分">
                    <template slot-scope="scope">
                        <input v-model="scope.row.used_integral"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="xiaofei_price"
                align="center"
                v-if="vipIntegralshow.show8"
                label="累计消费额">
                    <template slot-scope="scope">
                        <input v-model="scope.row.xiaofei_price"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="xiaofei_num"
                align="center"
                v-if="vipIntegralshow.show9"
                label="累计消费次数">
                    <template slot-scope="scope">
                        <input v-model="scope.row.xiaofei_num"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="vipIntegralshow.show10"
                label="有效期截至">
                    <template slot-scope="scope">
                        <input v-model="scope.row.end_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="vipIntegralshow.show11"
                label="最后销售日期">
                    <template slot-scope="scope">
                        <input v-model="scope.row.last_xiaoshou_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                width="90"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="edit(scope.row)">保存修改</el-button>
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
  getVipintegralList,
  getVipintegralDetail,
  addVipintegral,
  editVipintegral
} from "../../api/api";
export default {
  data() {
    return {
        page: 1,
        page_size: 10,
        loading: true,
        total: 0,
        isEdit:false,
        dialogServeAdd: false,
        dialogServeDetail: false,
        dialogShow:false,
        vipIntegralshow:{
            show1:false,
            show2:true,
            show3:true,
            show4:true,
            show5:true,
            show6:true,
            show7:true,
            show8:true,
            show9:true,
            show10:true,
            show11:true,
        },
      keywords:'',
      search:'',
      search1:'',
      search3:['2017-7-7','2019-9-9'],
      radio:5,
      value: '' ,
      value1: '' ,
      value2: '' ,
      value3: '' ,
      value4: '' ,
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
      Data: [],
      rule: [{ required: true, message: "不能为空" }],
      options: [{
      value: '选项1',
      label: '审核'
      }, {
      value: '选项2',
      label: '未审核'
      },],  
      options1: [{
      value1: '选项1',
      label: '未激活'
      }, {
      value1: '选项2',
      label: '已激活'
      },],
      options2: [{
      value2: '选项1',
      label: '类型1'
      }, {
      value2: '选项2',
      label: '类型2'
      },],
      options3: [{
      value3: '选项1',
      label: '发卡店1'
      }, {
      value3: '选项2',
      label: '发卡店2'
      },],
      options4: [{
      value4: '选项1',
      label: '分1'
      }, {
      value4: '选项2',
      label: '分2'
      },],
    };
  },
  methods: {
        handleClose(done){
            done();
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            erpTableSetting.vipIntegral=this.vipIntegralshow;
            localStorage.erpTableSetting=JSON.stringify(erpTableSetting);
        },
    initData() {
      // 获取列表
      let data = this.$qs.stringify({
        subsite_id: 3,
        user_id: sessionStorage.user_id,
        page: this.page,
        page_size: this.page_size
      });
      getVipintegralList(data).then(res => {
        console.log(res.data);
        if (res.errno == 0) {
            this.total = Number(res.data.record_count);
            for(let i=0;i<res.data.orders.length;i++){
                //let reg = new RegExp( /^￥/ , "g" );
                res.data.orders[i].xiaofei_price=res.data.orders[i].xiaofei_price.replace(/^￥/,"");
            }
          this.Data = res.data.orders;
          this.loading = false;
        }
      });
    },
    dateConverter(str) { //-----------------------日期转秒数
        var arr = str.split(/[- : \/]/);
        var startDate = Date.parse(new Date(arr[0], arr[1]-1, arr[2]))/1000;
        return startDate;
    },
    add() {
      this.isEdit = false;
      this.formServeDetail = {}
      if(this.$refs.form) {
        this.$refs.form.resetFields()
      }
      this.dialogServeDetail = true;
    },
    edit(row){
        console.log(row);
        let reg = new RegExp( /^￥/ , "g" );
        row.xiaofei_price=row.xiaofei_price.replace(reg,"");
        if(row.add_time!==""){
            row.add_time=this.dateConverter(row.add_time);
        }else{
            row.add_time=new Date().getTime()/1000-86400;
        }
        if(row.end_time!==""){
            row.end_time=this.dateConverter(row.end_time);
        }else{
            row.end_time=new Date().getTime()/1000-86400;
        }
        if(row.last_xiaoshou_time!==""){
            row.last_xiaoshou_time=this.dateConverter(row.last_xiaoshou_time);
        }else{
            row.last_xiaoshou_time=new Date().getTime()/1000-86400;
        }
        let data=this.$qs.stringify(row);
        editVipintegral(data).then(res=>{
            console.log(res);
            if(res.errno==0){
                this.$message({
                    type: "success",
                    message: res.errmsg,
                    duration: 1000
                });
                this.initData()
            }else{
                this.$message({
                    type: "error",
                    message: res.errmsg,
                    duration: 1000
                });
                this.initData()
            }
        });
    },
    editDone(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isEdit) {
            this.formServeDetail.add_time =parseInt(+new Date(this.formServeDetail.add_time)/1000);
            this.formServeDetail.end_time =parseInt(+new Date(this.formServeDetail.end_time)/1000);
            this.formServeDetail.last_xiaoshou_time = parseInt(+new Date(this.formServeDetail.last_xiaoshou_time)/1000);
            let tmpData = this.$qs.stringify(this.formServeDetail);
            editVipintegral(tmpData).then(res => {
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
            this.formServeDetail.sex = 1;
            this.formServeDetail.add_time = parseInt(+new Date() / 1000);
            this.formServeDetail.end_time = parseInt(+new Date() / 1000);
            this.formServeDetail.last_xiaoshou_time = parseInt(+new Date() / 1000);
            let tmpData = this.$qs.stringify(this.formServeDetail);
            addVipintegral(tmpData).then(res => {
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
    /* search() {
      let data=this.$qs.stringify({
          user_card:this.keywords
      });
      getVipintegralList(data).then(res => {
        console.log(res.data);
        if (res.errno == 0) {
          this.Data = res.data.orders;
          this.total = Number(res.data.record_count);
          this.loading = false;
        }
      });
    }, */ 
    reset() {
      this.initData()
    },
    handleCurrentChange(val) {
      this.page = val;
      this.initData();
    },
    showDetails(row) {
      this.isEdit = true;
      // this.formServeDetail = row
      let data = this.$qs.stringify({ id: row.id });
      getVipintegralDetail(data).then(res => {
        if (res.errno == 0) {
          this.formServeDetail = res.data[0];
          this.formServeDetail.xiaofei_price = res.data[0].xiaofei_price.substring(1);
        //   this.formServeDetail.last_xiaoshou_time = +new Date(res.data.last_xiaoshou_time);
        //   this.formServeDetail.end_valid = +new Date(res.data.end_valid);
        //   this.formServeDetail.user_card = Number(res.data.user_card);
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
          editVipintegral(tmpData).then(res => {
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
        if(localStorage.erpTableSetting!==undefined){
            console.log("yes");
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting); 
            if(erpTableSetting.vipIntegral!==undefined){
                this.vipIntegralshow=erpTableSetting.vipIntegral;
            }
        }else{
            console.log("no");
        }; 
        this.initData();
    }
};
</script>
<style scoped>
.vipIntegral {
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
.main-table>>>.el-dialog__body .el-date-editor,
.main-table>>>.el-dialog__body .el-input-number {
    width: 100%;
}
.el-row{
    background:#F3F3F3;
    width:100%;
}
</style>