<template>
    <div class="combinationSplitting">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>仓库</el-breadcrumb-item>
                <el-breadcrumb-item>组合拆分</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <fieldset style="margin:10px 0;border-color:#fff;text-align:left">
                <legend>查询条件</legend>
                <el-row type="flex" justify="space-around" :gutter="10">
                    <el-col style="text-align:left" :span="2">
                        <el-radio-group @change="chose" v-model="radio" style="margin-top:5px;">
                            <el-radio label="add_time">新建日期</el-radio><br>
                            <el-radio label="check_time" style="margin-top:20px;">审核日期</el-radio>
                        </el-radio-group>    
                    </el-col>
                    <el-col :span="5">
                        <el-date-picker
                        v-model="search3" size="small"
                        style="width:100%;margin-top:0px"
                        type="daterange" @change="chose"
                        align="right"
                        unlink-panels
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </el-col>
                    <el-col :span="4">
                            <el-input  prefix-icon="el-icon-search" style="margin-bottom:5px;" v-model="search"  size="mini"  placeholder="单号"/>
                            <el-input @input="chose"  prefix-icon="el-icon-search" v-model="search1"  size="mini"  placeholder="货号"/>
                    </el-col>
                    <el-col :span="4">
                        <el-select @change="chose" v-model="value" size="small" placeholder="方式">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select> 
                        <el-select @change="chose" v-model="value1" size="small" placeholder="状态" style="margin-top:5px;">
                            <el-option
                            v-for="item in options1"
                            :key="item.value1"
                            :label="item.label"
                            :value="item.value1">
                            </el-option>
                        </el-select> 
                        <el-select @change="chose" v-model="value2" size="small" placeholder="分店类型" style="margin-top:5px;">
                            <el-option
                            v-for="item in options2"
                            :key="item.value2"
                            :label="item.label"
                            :value="item.value2">
                            </el-option>
                        </el-select> 
                    </el-col>
                    <el-col :span="4">
                        <el-select @change="chose" v-model="value3" size="small" placeholder="分店" style="margin-top:5px">
                            <el-option
                            v-for="item in options3"
                            :key="item.value3"
                            :label="item.label"
                            :value="item.value3">
                            </el-option>
                        </el-select> 
                        <el-select @change="chose" v-model="value4" size="small" placeholder="分公司" style="margin-top:5px">
                            <el-option
                            v-for="item in options4"
                            :key="item.value4"
                            :label="item.label"
                            :value="item.value4">
                            </el-option>
                        </el-select> 
                        
                    </el-col>
                    <el-col :span="3">
                        <el-button type="primary" size="small" @click="reset">刷 新</el-button><br>
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
                <el-checkbox v-model="Splitshow.show1">分店名称</el-checkbox><br>
                <el-checkbox v-model="Splitshow.show2">单号</el-checkbox><br>
                <el-checkbox v-model="Splitshow.show3">状态</el-checkbox><br>
                <el-checkbox v-model="Splitshow.show4">条码</el-checkbox><br>
                <el-checkbox v-model="Splitshow.show5">货号</el-checkbox><br>
                <el-checkbox v-model="Splitshow.show6">商品名称</el-checkbox><br>
                <el-checkbox v-model="Splitshow.show7">单位</el-checkbox><br>
                <el-checkbox v-model="Splitshow.show8">数量</el-checkbox><br>
                <el-checkbox v-model="Splitshow.show9">进价</el-checkbox><br>
                <el-checkbox v-model="Splitshow.show10">进价金额</el-checkbox><br>
                <el-checkbox v-model="Splitshow.show11">成本金额</el-checkbox><br>
                <el-checkbox v-model="Splitshow.show12">成本价</el-checkbox><br>
                <el-checkbox v-model="Splitshow.show13">制单日期</el-checkbox><br>
                <el-checkbox v-model="Splitshow.show14">审核日期</el-checkbox><br>
                <el-checkbox v-model="Splitshow.show15">制单人</el-checkbox><br><br>
            </el-dialog>
            <!-- <el-form :inline="true" :model="formServe" class="demo-form-inline">
                <el-form-item>
                    <el-input placeholder="请输入单号" @input="search" v-model="keywords" style="width:50%;margin-right:10px" size="small">
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
                    <el-button type="primary" @click="dialogServeAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 详情弹出框 -->
            <el-dialog width="860px" title="组合拆分" :visible.sync="dialogServeDetail">
                <el-form label-position="right" ref="form" :
                ="formServeDetail" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="状态">
                                <el-input disabled v-model="formServeDetail.status" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="分店名称">
                                <el-input v-model="formServeDetail.subshop_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="单号">
                                <el-input v-model="formServeDetail.bill_sn" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="条码">
                                <el-input v-model="formServeDetail.serial_code" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="货号">
                                <el-input v-model="formServeDetail.product_sn" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="商品名称">
                                <el-input v-model="formServeDetail.goods_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="单位">
                                <el-input-number v-model="formServeDetail.unit" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.unit" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="数量" prop="goods_number" :rules="rule">
                                <el-input-number v-model="formServeDetail.goods_number" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.goods_number" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="进价" prop="jinhuo_price" :rules="rule">
                                <el-input-number v-model="formServeDetail.jinhuo_price" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.jinhuo_price" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="进价金额" prop="jinhuo_money" :rules="rule">
                                <el-input-number v-model="formServeDetail.jinhuo_money" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.jinhuo_money" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="成本金额" prop="chengben_money" :rules="rule">
                                <el-input-number v-model="formServeDetail.chengben_money" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.chengben_money" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="成本价" prop="chengben_prict" :rules="rule">
                                <el-input-number v-model="formServeDetail.chengben_prict" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.chengben_prict" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="制单日期">
                                <el-input disabled v-model="formServeDetail.add_time" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="审核日期">
                                <el-input disabled v-model="formServeDetail.check_time" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="制单人">
                                <el-input disabled v-model="formServeDetail.admin_name" autocomplete="off"></el-input>
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
            :data="Data.filter(data =>  {
            return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1})})"
            border stripe
            show-summary
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            v-loading="loading"
            style="width: 100%">
                <el-table-column
                prop="subshop_name"
                align="center"
                v-if="Splitshow.show1"
                label="分店名称">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.subshop_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="bill_sn"
                align="center"
                v-if="Splitshow.show2"
                label="单号">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.bill_sn"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="status"
                align="center"
                v-if="Splitshow.show3"
                label="状态">
                </el-table-column>
                <el-table-column
                prop="serial_code"
                align="center"
                v-if="Splitshow.show4"
                label="条码">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.serial_code"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="product_sn"
                align="center"
                v-if="Splitshow.show5"
                label="货号">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.product_sn"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="goods_name"
                align="center"
                v-if="Splitshow.show6"
                label="商品名称">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.goods_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="Splitshow.show7"
                label="单位">
                    <template slot-scope="scope">
                        <input v-model="scope.row.unit">
                    </template>
                </el-table-column>
                <el-table-column
                prop="goods_number"
                align="center"
                v-if="Splitshow.show8"
                label="数量">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.goods_number"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="jinhuo_price"
                align="center"
                v-if="Splitshow.show9"
                label="进价">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.jinhuo_price"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="jinhuo_money"
                align="center"
                v-if="Splitshow.show10"
                label="进价金额">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.jinhuo_money"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="chengben_money"
                align="center"
                v-if="Splitshow.show11"
                label="成本金额">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.chengben_money"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="chengben_prict"
                align="center"
                v-if="Splitshow.show12"
                label="成本价">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.chengben_prict"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="add_time"
                align="center"
                v-if="Splitshow.show13"
                label="制单日期">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.add_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="check_time"
                align="center"
                v-if="Splitshow.show14"
                label="审核日期">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.check_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="Splitshow.show15"
                label="制单人">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.admin_name"/>
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
  getCombinationsplittingList,
  getCombinationsplittingDetail,
  addCombinationsplitting,
  editCombinationsplitting
} from "../../api/api";
export default {
    inject: ['reload'],
  data() {
    return {
        page: 1,
        page_size: 10,
        loading: true,
        total: 0,
        isEdit: false,
        dialogServeAdd: false,
        dialogServeDetail: false,
        dialogShow:false,
        Splitshow:{
            show1:false,
            show2:true,
            show3:true,
            show4:true,
            show5:true,
            show6:true,
            show7:false,
            show8:true,
            show9:true,
            show10:true,
            show11:true,
            show12:true,
            show13:true,
            show14:true,
            show15:true,
        },
      keywords:'',
      search:'',
      search1:'',
      search3:['2017-7-7','2019-9-9'],
      radio:"add_time",
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
      value: '0',
      label: '方式1'
      }, {
      value: '1',
      label: '方式2'
      },],  
      options1: [{
      value1: '0',
      label: '未审核'
      }, {
      value1: '1',
      label: '已审核'
      },],
      options2: [{
      value2: '0',
      label: '0号分店'
      }, {
      value2: '1',
      label: '1号分店'
      },],
      options3: [{
      value3: '0',
      label: '发卡店1'
      }, {
      value3: '1',
      label: '发卡店2'
      },],
      options4: [{
      value4: '0',
      label: '分1'
      }, {
      value4: '0',
      label: '分2'
      },],
    };
  },
  methods: {
    dateConverter(str) { //-----------------------日期转秒数
        var arr = str.split(/[- : \/]/);
        var startDate = Date.parse(new Date(arr[0], arr[1]-1, arr[2]))/1000;
        return startDate;
    },
    handleClose(done){
        done();
        let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
        erpTableSetting.Split=this.Splitshow;
        localStorage.erpTableSetting=JSON.stringify(erpTableSetting);
    },
    initData() {//----------------------- 获取列表
        let data = this.$qs.stringify({
            subsite_id: 3,
            user_id: sessionStorage.user_id,
            page: this.page,
            page_size: this.page_size
        });
        this.data(data);
    },
    data(data){
        getCombinationsplittingList(data).then(res => {
            console.log(res.data);
            if (res.errno == 0) {
                for(let i=0;i<res.data.orders.length;i++){
                    res.data.orders[i].jinhuo_price=res.data.orders[i].jinhuo_price.replace(/^￥/,"");
                    res.data.orders[i].jinhuo_money=res.data.orders[i].jinhuo_money.replace(/^￥/,"");
                    res.data.orders[i].chengben_money=res.data.orders[i].chengben_money.replace(/^￥/,"");
                    res.data.orders[i].chengben_prict=res.data.orders[i].chengben_prict.replace(/^￥/,"");
                };
            this.Data = res.data.orders;
            this.total = Number(res.data.record_count);
            this.loading = false;
            }
        });
    },
    chose(){//---------------------选择查询
        let data = this.$qs.stringify({
            subsite_id: 3,
            user_id: sessionStorage.user_id,
            page: 1,
            page_size: 10,
            time_by:this.radio,
            add_time1:this.search3[0],
            add_time2:this.search3[1],
            product_sn:this.search1,
            mode:this.value,
            status:this.value1,
            subshop_type:this.value2,
            subshop_id:this.value3,
            son_company:this.value4,
        });
        this.data(data);
    },
    add() {
      this.isEdit = false;
      this.formServeDetail = {};
      if (this.$refs.form) {
        this.$refs.form.resetFields();
      }
      this.dialogServeDetail = true;
    },
    edit(row){//----------------------保存修改
        row.status=="未审核"?row.status=0:row.status=1;
        if(row.add_time!==""){
            row.add_time=this.dateConverter(row.add_time);
        }else{
            row.add_time=new Date().getTime()/1000-86400;
        }
        if(row.check_time!==""){
            row.check_time=this.dateConverter(row.check_time);
        }else{
            row.check_time=new Date().getTime()/1000-86400;
        }
        let Data = this.$qs.stringify(row);
        editCombinationsplitting(Data).then(res=>{
            console.log(res);
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
    /* editDone(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isEdit) {
            this.formServeDetail.status = 0;
            this.formServeDetail.add_time = parseInt(new Date() / 1000);
            this.formServeDetail.check_time = parseInt(new Date() / 1000);
            let tmpData = this.$qs.stringify(this.formServeDetail);
            editCombinationsplitting(tmpData).then(res => {
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
            this.formServeDetail.status = 0;
            this.formServeDetail.adminid = 2;
            this.formServeDetail.check_user = 2;
            this.formServeDetail.add_time = parseInt(new Date() / 1000);
            this.formServeDetail.check_time = parseInt(new Date() / 1000);
            let tmpData = this.$qs.stringify(this.formServeDetail);
            addCombinationsplitting(tmpData).then(res => {
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
    }, */
    /* search() {
        let data=this.$qs.stringify({
            bill_sn:this.keywords
        });
        getCombinationsplittingList(data).then(res => {
            console.log(res.data);
            if (res.errno == 0) {
                this.Data = res.data.orders;
                this.total = Number(res.data.record_count);
                this.loading = false;
            }
        });
    }, */
    reset() {
      this.reload();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.initData();
    },
    showDetails(row) {
        this.isEdit = true;
      let data = this.$qs.stringify({ id: row.id });
      getCombinationsplittingDetail(data).then(res => {
        if (res.errno == 0) {
          this.formServeDetail = res.data;
          this.formServeDetail.jinhuo_price = res.data.jinhuo_price.substring(1);
          this.formServeDetail.jinhuo_money = res.data.jinhuo_money.substring(1);
          this.formServeDetail.chengben_money = res.data.chengben_money.substring(1);
          this.formServeDetail.chengben_prict = res.data.chengben_prict.substring(1);
        //   this.formServeDetail.time = [+new Date(this.formServeDetail.start_time),+new Date(this.formServeDetail.end_time)];
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
          editCombinationsplitting(tmpData).then(res => {
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
            if(erpTableSetting.Split!==undefined){
                this.Splitshow=erpTableSetting.Split;
            }
        }else{
            console.log("no");
        }; 
    this.initData();
  }
};
</script>
<style scoped>
.combinationSplitting {
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
.el-input >>> .el-input__inner{
    border:none;
}

/* 分页器 */
.el-pagination {
  padding: 20px 0;
  text-align: right;
}
/* 新增弹出框 & 详情弹出框*/
.main-table >>> .el-dialog__body {
  padding: 0 20px;
}
.main-table >>> .el-dialog__body .el-form-item__content {
  width: 180px;
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
.main-table >>> .el-dialog__body .el-input-number {
  width: 100%;
}
.el-row{
    background:#F3F3F3;
    width:100%;
}
</style>