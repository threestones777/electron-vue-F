<template>
    <div class="giftManagement">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <!-- <h3>温州美联 管理中心</h3> -->
            <el-breadcrumb style="font-size:18px" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>会员</el-breadcrumb-item>
                <el-breadcrumb-item>礼品管理</el-breadcrumb-item>
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
                <div @click="dialogShow=true" class="card">
                    <i class="el-icon-tickets"></i>
                    <div>显示列</div>
                </div>
                <div @click="add" class="card">
                    <i class="el-icon-plus"></i>
                    <div>新增</div>
                </div>
            </div>
        </div>
        <div class="main-table">
            <fieldset style="margin:10px 0;border-color:#fff;text-align:left">
                <legend>查询条件</legend>
                <el-row type="flex" justify="space-around" :gutter="10">
                    <el-col style="text-align:left" :span="2">
                        <el-radio-group @change="chose" v-model="radio" style="margin-top:5px;">
                            <el-radio label="start_time">开始日期</el-radio><br>
                            <el-radio label="end_time">审核日期</el-radio><br>
                            <el-radio label="check_time">结束日期</el-radio>
                        </el-radio-group>    
                    </el-col>
                    <el-col style="text-align:left" :span="3">
                        <el-radio-group @change="chose" v-model="radio" style="margin-top:5px;">
                        <el-radio label="4">今日有效</el-radio><br>
                        <el-radio label="5">不按日期</el-radio>
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
                        <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="search"  size="mini"  placeholder="属性"/>
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="value"  size="mini"  placeholder="单号"/>
                    </el-col>
                    <el-col :span="4">
                      <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="search1"  size="mini"  placeholder="商品名称"/>
                        <el-select @change="chose" v-model="value1" size="small" placeholder="分店">
                            <el-option
                            v-for="item in options1"
                            :key="item.value1"
                            :label="item.label"
                            :value="item.value1">
                            </el-option>
                        </el-select> 
                    </el-col>
                    <el-col :span="4">
                      <el-select @change="chose" v-model="value2" size="small" placeholder="状态" >
                            <el-option
                            v-for="item in options2"
                            :key="item.value2"
                            :label="item.label"
                            :value="item.value2">
                            </el-option>
                        </el-select> 
                        <el-select @change="chose" v-model="value4" size="small" placeholder="礼品属性" style="margin-top:5px">
                            <el-option
                            v-for="item in options4"
                            :key="item.value4"
                            :label="item.label"
                            :value="item.value4">
                            </el-option>
                        </el-select> 
                    </el-col>
                    <el-col :span="3">
                        <!-- <el-button type="primary" size="small" @click="reset">刷 新</el-button><br>
                        <el-button type="primary" size="small" style="margin-top:5px" @click="add">新增</el-button><br>
                        <el-button icon="el-icon-tickets"  style="margin-top:5px" type="primary" size="small" @click="dialogShow=true">显示列</el-button> -->
                    </el-col>
                </el-row>      
            </fieldset>
            <!-- 按需选择列弹窗 -->
            <el-dialog
            title="按需选择列" class="chose" style="text-align:left"
            :visible.sync="dialogShow"
            :before-close="handleClose"
            width="200px">
                <el-checkbox v-model="giftMashow.show1">单号</el-checkbox><br>
                <el-checkbox v-model="giftMashow.show2">等级</el-checkbox><br>
                <el-checkbox v-model="giftMashow.show3">商品名称</el-checkbox><br>
                <el-checkbox v-model="giftMashow.show4">状态</el-checkbox><br>
                <el-checkbox v-model="giftMashow.show5">礼品属性</el-checkbox><br>
                <el-checkbox v-model="giftMashow.show6">积分下限</el-checkbox><br>
                <el-checkbox v-model="giftMashow.show7">兑换积分</el-checkbox><br>
                <el-checkbox v-model="giftMashow.show8">开始日期</el-checkbox><br>
                <el-checkbox v-model="giftMashow.show9">结束日期</el-checkbox><br>
                <el-checkbox v-model="giftMashow.show10">售价</el-checkbox><br>
                <el-checkbox v-model="giftMashow.show11">每人限量</el-checkbox><br>
                <el-checkbox v-model="giftMashow.show12">总限量</el-checkbox><br><br>
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
            <el-dialog width="840px" title="礼品管理" :visible.sync="dialogServeDetail">
                <el-form label-position="left" ref="form" :model="formServeDetail" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="单号">
                                <el-input v-model="formServeDetail.bill_sn" autocomplete="off"></el-input>
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
                          <el-form-item label="总限量" prop="sun_num" :rules="rule">
                                <el-input-number v-model="formServeDetail.sun_num" :min="0"></el-input-number>
                            </el-form-item>
                            <!-- <el-form-item label="状态">
                                <el-input disabled v-model="formServeDetail.status" autocomplete="off"></el-input>
                            </el-form-item> -->
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="礼品属性">
                                <el-input v-model="formServeDetail.attr_value" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="积分下限" prop="floor_integral" :rules="rule">
                                <el-input-number v-model="formServeDetail.floor_integral" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.floor_integral" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="兑换积分" prop="integral" :rules="rule">
                                <el-input-number v-model="formServeDetail.integral" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.integral" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item class="time" label="起止日期" prop="time" :rules="rule">
                                <el-date-picker
                                v-model="formServeDetail.time"
                                type="daterange"
                                range-separator="至"
                                value-format="timestamp"
                                format="yyyy 年 MM 月 dd 日"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                                </el-date-picker>
                                <!-- <el-input v-model="formServeDetail.end_time" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="售价" prop="shop_price" :rules="rule">
                                <el-input-number v-model="formServeDetail.shop_price" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.shop_price" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="每人限量" prop="per_num" :rules="rule">
                                <el-input-number v-model="formServeDetail.per_num" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.per_num" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="8">
                            <el-form-item label="总限量" prop="sun_num" :rules="rule">
                                <el-input-number v-model="formServeDetail.sun_num" :min="0"></el-input-number>
                            </el-form-item>
                        </el-col> -->
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
            :cell-style="{padding:3}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            v-loading="loading"
            style="width: 100%">
                <el-table-column
                align="center"
                width="100"
                v-if="giftMashow.show1"
                label="单号">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.bill_sn"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="giftMashow.show2"
                label="等级">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.user_rank"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="100"
                v-if="giftMashow.show3"
                label="商品名称">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.goods_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="100"
                v-if="giftMashow.show4"
                label="状态">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.status"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="100"
                v-if="giftMashow.show5"
                label="礼品属性">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.attr_value"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="floor_integral"
                align="center"
                width="100"
                v-if="giftMashow.show6"
                label="积分下限">
                   <template slot-scope="scope">
                        <el-input v-model="scope.row.floor_integral"/>
                    </template> 
                </el-table-column>
                <el-table-column
                prop="pay_points"
                align="center"
                width="100"
                v-if="giftMashow.show7"
                label="兑换积分">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.pay_points"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="130"
                v-if="giftMashow.show8"
                label="开始日期">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.start_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="130"
                v-if="giftMashow.show9"
                label="结束日期">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.end_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="shop_price"
                align="center"
                width="100"
                v-if="giftMashow.show10"
                label="售价">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.shop_price"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="per_num"
                align="center"
                v-if="giftMashow.show11"
                label="每人限量">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.per_num"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="sun_num"
                align="center"
                width="100"
                v-if="giftMashow.show12"
                label="总限量">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.sun_num"/>
                    </template>
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作"
                width="120">
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
  getGiftmanagementList,
  getGiftmanagementDetail,
  addGiftmanagement,
  editGiftmanagement
} from "../../api/api";
export default {
    inject:['reload'],
  data() {
    return {
        page: 1,
        page_size: 10,
        total: 0,
        loading: true,
        isEdit: false,
        dialogServeAdd: false,
        dialogServeDetail: false,
        dialogShow:false,
        giftMashow:{
            show1:false,
            show2:true,
            show3:true,
            show4:true,
            show5:true,
            show6:true,
            show7:true,
            show8:true,
            show9:true,
            show10:false,
            show11:false,
            show12:true,            
        },
      search:'',
      search1:'',
      search3:['2017-7-7','2019-9-9'],
      radio:"5",
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
      formServeDetail: {},
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
      value1: '0',
      label: '0分店'
      }, {
      value1: '1',
      label: '1分店'
      },],
      options2: [{
      value2: '0',
      label: '未审核'
      }, {
      value2: '1',
      label: '已审核'
      },],
      options4: [{
      value4: '0',
      label: '属性1'
      }, {
      value4: '1',
      label: '属性2'
      },],
    };
  },
  methods: {
        handleClose(done){
            done();
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            erpTableSetting.giftManage=this.giftMashow;
            localStorage.erpTableSetting=JSON.stringify(erpTableSetting);
        },
      dateConverter(str) { //-----------------------日期转秒数
        var arr = str.split(/[- : \/]/);
        var startDate = Date.parse(new Date(arr[0], arr[1]-1, arr[2]))/1000;
        return startDate;
    },
    initData() {// ---------------获取列表
        let data = this.$qs.stringify({
            subsite_id: 3,
            user_id: sessionStorage.user_id,
            page: this.page,
            page_size: this.page_size
        });
        this.data(data);
    },
    data(data){
        getGiftmanagementList(data).then(res => {
            console.log(res.data);
            if (res.errno == 0) {
                this.total = Number(res.data.record_count);
                for(let i=0;i<res.data.orders.length;i++){
                    res.data.orders[i].shop_price=res.data.orders[i].shop_price.replace(/^￥/,"");
                }
                this.Data = res.data.orders;
                this.loading = false;
            }
        });
    },
    chose(){//-------------------选择查询
        let data = this.$qs.stringify({
            subsite_id: 3,
            user_id: sessionStorage.user_id,
            page: 1,
            page_size: 10,
            time_by:this.radio,
            add_time1:this.search3[0],
            add_time2:this.search3[1],
            bill_sn:this.value,
            goods_name:this.search1,
            subshop_id:this.value1,
            status:this.value2,
            attr_value:this.value4,
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
    edit(row){
        console.log(row);
        row.status=row.status=="未审核"?0:1;
        if(row.start_time!==""){
            row.start_time=this.dateConverter(row.start_time);
        }else{
            row.start_time=new Date().getTime()/1000-86400;
        }
        if(row.end_time!==""){
            row.end_time=this.dateConverter(row.end_time);
        }else{
            row.end_time=new Date().getTime()/1000-86400;
        }
        let dataE=this.$qs.stringify(row);
        editGiftmanagement(dataE).then(res=>{
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
                this.initData();
            }
        })
    },
    editDone(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isEdit) {
            this.formServeDetail.status = 0;
            this.formServeDetail.start_time = parseInt(this.formServeDetail.time[0] / 1000);
            this.formServeDetail.end_time = parseInt(this.formServeDetail.time[1] / 1000);
            let tmpData = this.$qs.stringify(this.formServeDetail);
            editGiftmanagement(tmpData).then(res => {
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
            this.formServeDetail.pay_points = 0;
            this.formServeDetail.start_time = parseInt(this.formServeDetail.time[0] / 1000);
            this.formServeDetail.end_time = parseInt(this.formServeDetail.time[1] / 1000);
            let tmpData = this.$qs.stringify(this.formServeDetail);
            addGiftmanagement(tmpData).then(res => {
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
          bill_sn:this.keywords
      });
      getGiftmanagementList(data).then(res => {
        console.log(res.data);
        if (res.errno == 0) {
          this.Data = res.data.orders;
          this.total = Number(res.data.record_count);
          this.loading = false;
        }
      });
  },  */
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
      getGiftmanagementDetail(data).then(res => {
        if (res.errno == 0) {
          this.formServeDetail = res.data;
          this.formServeDetail.shop_price = res.data.shop_price.substring(1);
          this.formServeDetail.time = [+new Date(this.formServeDetail.start_time),+new Date(this.formServeDetail.end_time)];
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
          editGiftmanagement(tmpData).then(res => {
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
            if(erpTableSetting.giftManage!==undefined){
                this.giftMashow=erpTableSetting.giftManage;
            }
        }else{
            console.log("no");
        }; 
        this.initData();
  }
};
</script>
<style scoped>
.giftManagement {
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

/* 新增弹出框 & 详情弹出框*/
.giftManagement >>> .el-dialog__body {
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
.el-input >>> .el-input__inner{
    border:none;
    text-align:center;
}
</style>