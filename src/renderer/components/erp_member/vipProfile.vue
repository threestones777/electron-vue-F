<template>
    <div class="vipProfile">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>会员</el-breadcrumb-item>
                <el-breadcrumb-item>会员档案</el-breadcrumb-item>
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
                        <el-row type="flex" style="margin:5px 0px 0px;padding:0;" justify="space-around" :gutter="10">
                            <el-col :span="12">
                                <el-input  prefix-icon="el-icon-search" style="width:100%;padding:0px;" v-model="value"  size="mini"  placeholder="会员卡号"/>
                            </el-col>
                            <el-col :span="12">
                                <el-input  prefix-icon="el-icon-search" style="width:100%;padding:0px;" v-model="search"  size="mini"  placeholder="姓名"/>
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
                    <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="search2"  size="mini"  placeholder="审核人"/>
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
                        <el-button type="primary"  style="margin-top:5px" size="small" @click="add">新增</el-button><br>
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
                <el-checkbox v-model="vipProfileshow.show1">姓名</el-checkbox><br>
                <el-checkbox v-model="vipProfileshow.show2">状态</el-checkbox><br>
                <el-checkbox v-model="vipProfileshow.show3">会员卡号</el-checkbox><br>
                <el-checkbox v-model="vipProfileshow.show4">会员等级</el-checkbox><br>
                <el-checkbox v-model="vipProfileshow.show5">有效期截至</el-checkbox><br>
                <el-checkbox v-model="vipProfileshow.show6">发卡日期</el-checkbox><br>
                <el-checkbox v-model="vipProfileshow.show7">发卡店名</el-checkbox><br>
                <el-checkbox v-model="vipProfileshow.show8">属性</el-checkbox><br>
                <el-checkbox v-model="vipProfileshow.show9">生日</el-checkbox><br>
                <el-checkbox v-model="vipProfileshow.show10">修改日期</el-checkbox><br>
                <el-checkbox v-model="vipProfileshow.show11">累计消费额</el-checkbox><br>
                <el-checkbox v-model="vipProfileshow.show12">累计消费次数</el-checkbox><br>
                <el-checkbox v-model="vipProfileshow.show13">可用积分</el-checkbox><br>
                <el-checkbox v-model="vipProfileshow.show14">已兑换积分</el-checkbox><br>
                <el-checkbox v-model="vipProfileshow.show15">最后销售日期</el-checkbox><br><br>
            </el-dialog>
            <!-- <el-form :inline="true" :model="formServe" class="demo-form-inline">
                <el-form-item>
                    <el-input placeholder="请输入姓名" @input="search" v-model="keywords" style="width:50%;margin-right:10px" size="small">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                    <el-button type="primary" size="small" @click="add">新增</el-button>
                    <el-button type="primary" size="small" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form> -->
            <!-- 详情弹出框 -->
            <el-dialog width="1000px" title="会员档案" :visible.sync="dialogServeDetail">
                <el-form label-position="left" ref="form" :model="formServeDetail" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="姓名">
                                <el-input v-model="formServeDetail.user_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="会员卡号" prop="user_card" :rules="rule2">
                                <el-input v-model.number="formServeDetail.user_card" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="有效期截至" prop="end_valid" :rules="rule">
                                <el-date-picker
                                v-model="formServeDetail.end_valid"
                                type="date"
                                :picker-options="pickerOptions"
                                value-format="timestamp"
                                format="yyyy 年 MM 月 dd 日"
                                placeholder="选择日期时间">
                                </el-date-picker>
                                <!-- <el-input v-model="formServeDetail.end_valid" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="发卡日期">
                                <el-input disabled v-model="formServeDetail.add_time" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="发卡店名">
                                <el-input v-model="formServeDetail.subshop_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="属性">
                                <el-input v-model="formServeDetail.attr_value" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="生日">
                                <el-date-picker
                                v-model="formServeDetail.birthday"
                                type="date"
                                value-format="timestamp"
                                format="yyyy 年 MM 月 dd 日"
                                placeholder="选择日期时间">
                                </el-date-picker>
                                <!-- <el-input v-model="formServeDetail.birthday" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="修改日期">
                                <el-input disabled v-model="formServeDetail.edit_time" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="累计消费额" prop="sum_xiaofei_price" :rules="rule">
                                <el-input-number v-model="formServeDetail.sum_xiaofei_price" :precision="2" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.sum_xiaofei_price" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="累计消费次数" prop="xiaofei_num" :rules="rule">
                                <el-input-number v-model="formServeDetail.xiaofei_num" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.xiaofei_num" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="可用积分" prop="available_integral" :rules="rule">
                                <el-input-number v-model="formServeDetail.available_integral" :min="0"></el-input-number>
                                <!-- <el-input v-model="formServeDetail.available_integral" autocomplete="off"></el-input> -->
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
                            <el-form-item label="最后销售日期" prop="last_xiaoshou_time" :rules="rule">
                                <el-date-picker
                                v-model="formServeDetail.last_xiaoshou_time"
                                type="date"
                                value-format="timestamp"
                                format="yyyy 年 MM 月 dd 日"
                                placeholder="选择日期时间">
                                </el-date-picker>
                                <!-- <el-input v-model="formServeDetail.last_xiaoshou_time" autocomplete="off"></el-input> -->
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
            border
            show-summary
            :row-style="{height:0}"  
            :cell-style="{padding:7}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            v-loading="loading"
            style="width: 100%">
                <el-table-column
                v-if="vipProfileshow.show1"
                align="center"
                label="姓名">
                    <template slot-scope="scope">
                        <input v-model="scope.row.user_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="vipProfileshow.show2"
                label="状态">
                    <template slot-scope="scope">
                        <input v-model="scope.row.status"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="vipProfileshow.show3"
                label="会员卡号">
                    <template slot-scope="scope">
                        <input v-model="scope.row.user_card"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="vipProfileshow.show4"
                label="会员等级">
                    <template slot-scope="scope">
                        <input v-model="scope.row.user_rank"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="vipProfileshow.show5"
                label="有效期截至">
                    <template slot-scope="scope">
                        <input v-model="scope.row.end_valid"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="vipProfileshow.show6"
                label="发卡日期">
                    <template slot-scope="scope">
                        <input v-model="scope.row.add_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="vipProfileshow.show7"
                label="发卡店名">
                    <template slot-scope="scope">
                        <input v-model="scope.row.subshop_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="vipProfileshow.show8"
                label="属性">
                    <template slot-scope="scope">
                        <input v-model="scope.row.attr_value"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="vipProfileshow.show9"
                label="生日">
                    <template slot-scope="scope">
                        <input v-model="scope.row.birthday"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="vipProfileshow.show10"
                label="修改日期">
                    <template slot-scope="scope">
                        <input v-model="scope.row.edit_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="sum_xiaofei_price"
                align="center"
                v-if="vipProfileshow.show11"
                label="累计消费额">
                    <template slot-scope="scope">
                        <input v-model="scope.row.sum_xiaofei_price"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="vipProfileshow.show12"
                label="累计消费次数">
                    <template slot-scope="scope">
                        <input v-model="scope.row.xiaofei_num"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="vipProfileshow.show13"
                label="可用积分">
                    <template slot-scope="scope">
                        <input v-model="scope.row.available_integral"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="vipProfileshow.show14"
                label="已兑换积分">
                    <template slot-scope="scope">
                        <input v-model="scope.row.used_integral"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="vipProfileshow.show15"
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
                        <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, Data)">删除</el-button>
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
  getVipprofileList,
  getVipprofileDetail,
  addVipprofile,
  editVipprofile,
delLogs
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
        vipProfileshow:{
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
            show12:true,
            show13:true,
            show14:true,
            show15:true,
        },
      keywords:'',
      search:'',
      search1:'',
      search2:'',
      search3:['2017-7-7','2019-9-9'],
      radio:3,
      value: '' ,
      value1: '' ,
      value2: '' ,
      value3: '' ,
      value4: '' ,
      formServe: {
        name: "",
        marks: ""
      },
      pickerOptions:{
          disabledDate(time) {
            return time.getTime() < Date.now() - 3600*24*1000;
          }
      },
      formAdd: {
        //user_name:"leilei",
        user_card:764676345,
        /* 
        user_rank:4,
        status:0,
        end_valid:1546185600,
        add_time:1541606400,
        subshop_id:0,
        subshop_name:"",
        adminid:0,
        attr_value:"",
        sex:0,
        birthday:910454400,
        edit_time:1546012800,
        edit_user:0,
        sum_xiaofei_price:100070.0,
        xiaofei_num:0,
        available_integral:455,
        used_integral:6200,
        last_xiaoshou_time:1541606400 
        */
      },
      formServeDetail: {
        name: ""
      },
      Data: [
        {
          name: "text"
        }
      ],
      rule: [{ required: true, message: "不能为空" }],
      rule2: [{ required: true, message: "不能为空" },{type:'number',message:'必须为数字'}],
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
            erpTableSetting.vipProfile=this.vipProfileshow;
            localStorage.erpTableSetting=JSON.stringify(erpTableSetting);
        },
    initData() {//--------------- 获取列表
      let data = this.$qs.stringify({
        subsite_id: 3,
        user_id: sessionStorage.user_id,
        page: this.page,
        page_size: this.page_size
      });
      getVipprofileList(data).then(res => {
        console.log(res.data);
        if (res.errno == 0) {
            this.total = Number(res.data.record_count);
            for(let i=0;i<res.data.orders.length;i++){
                res.data.orders[i].sum_xiaofei_price=res.data.orders[i].sum_xiaofei_price.replace(/^￥/,"");
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
        /* let data=this.$qs.stringify(this.formAdd);
        addVipprofile().then(res=>{
            console.log(res);
        }); */
      this.isEdit = false;
      this.formServeDetail = {}
      if(this.$refs.form) {
        this.$refs.form.resetFields()
      }
      this.dialogServeDetail = true;
    },
    edit(row){//--------------修改
        /* let reg = new RegExp( /^￥/ , "g" );
        row.sum_xiaofei_price=row.sum_xiaofei_price.replace(reg,""); */
        row.status=row.status=="未审核"?0:1;
        if(row.end_valid!==""){
            row.end_valid=this.dateConverter(row.end_valid);
        }else{
            row.end_valid=new Date().getTime()/1000-86400;
        }
        if(row.add_time!==""){
            row.add_time=this.dateConverter(row.add_time);
        }else{
            row.add_time=new Date().getTime()/1000-86400;
        }
        if(row.birthday!==""){
            row.birthday=this.dateConverter(row.birthday);
        }else{
            row.birthday=new Date().getTime()/1000-86400;
        }
        if(row.edit_time!==""){
            row.edit_time=this.dateConverter(row.edit_time);
        }else{
            row.edit_time=new Date().getTime()/1000-86400;
        }
        if(row.last_xiaoshou_time!==""){
            row.last_xiaoshou_time=this.dateConverter(row.last_xiaoshou_time);
        }else{
            row.last_xiaoshou_time=new Date().getTime()/1000-86400;
        }
        let dataE=this.$qs.stringify(row);
        console.log(row);
        editVipprofile(dataE).then(res=>{
            console.log(res.errno);
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
        })
    },
    editDone(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isEdit) {
            this.formServeDetail.status = 0;
            this.formServeDetail.add_time = parseInt(+new Date() / 1000);
            this.formServeDetail.edit_time = parseInt(+new Date() / 1000);
            this.formServeDetail.end_valid = parseInt(this.formServeDetail.end_valid / 1000);
            this.formServeDetail.last_xiaoshou_time = parseInt(this.formServeDetail.last_xiaoshou_time / 1000);
            let tmpData = this.$qs.stringify(this.formServeDetail);
            editVipprofile(tmpData).then(res => {
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
            this.formServeDetail.adminid = 2;
            this.formServeDetail.edit_user = 2;
            this.formServeDetail.status = 0;
            this.formServeDetail.user_rank = 0;
            this.formServeDetail.sex = 1;
            this.formServeDetail.add_time = parseInt(+new Date() / 1000);
            this.formServeDetail.edit_time = parseInt(+new Date() / 1000);
            this.formServeDetail.end_valid = parseInt(this.formServeDetail.end_valid / 1000);
            this.formServeDetail.last_xiaoshou_time = parseInt(this.formServeDetail.last_xiaoshou_time / 1000);
            let tmpData = this.$qs.stringify(this.formServeDetail);
            addVipprofile(tmpData).then(res => {
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
            user_name:this.keywords
        });
        getVipprofileList(data).then(res => {
            console.log(res.data);
            if (res.errno == 0) {
            this.Data = res.data.orders;
            this.total = Number(res.data.record_count);
            this.loading = false;
            }
        });
    },  */
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
      getVipprofileDetail(data).then(res => {
        if (res.errno == 0) {
          this.formServeDetail = res.data;
          this.formServeDetail.sum_xiaofei_price = res.data.sum_xiaofei_price.substring(1);
          this.formServeDetail.last_xiaoshou_time = +new Date(res.data.last_xiaoshou_time);
          this.formServeDetail.end_valid = +new Date(res.data.end_valid);
          this.formServeDetail.user_card = Number(res.data.user_card);
        //   this.formServeDetail.base_price = res.data.base_price.substring(1);
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
          editVipprofile(tmpData).then(res => {
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
            if(erpTableSetting.vipProfile!==undefined){
                this.vipProfileshow=erpTableSetting.vipProfile;
            }
        }else{
            console.log("no");
        }; 
    this.initData();
  }
};
</script>
<style scoped>
.vipProfile {
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