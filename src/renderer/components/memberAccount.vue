<template>
    <div class="memberAccount">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>编辑会员资料</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="会员名称">
                <el-input v-model="form.user_name"></el-input>
            </el-form-item>
            <el-form-item label="账户余额">
                <el-input disabled v-model="form.user_money">
                    <span slot="suffix" style="color:green">查看详细</span>
                </el-input>
            </el-form-item>
            <el-form-item label="冻结资金">
                <el-input disabled v-model="form.frozen_money">
                    <span slot="suffix" style="color:green">查看详细</span>
                </el-input>
            </el-form-item>
            <el-form-item label="等级积分">
                <el-input disabled v-model="form.rank_points">
                    <span slot="suffix" style="color:green">查看详细</span>
                </el-input>
            </el-form-item>
            <el-form-item label="消费积分">
                <el-input disabled v-model="form.pay_points">
                    <span slot="suffix" style="color:green">查看详细</span>
                </el-input>
            </el-form-item>
            <el-form-item label="电子邮件">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="手机">
                <el-input v-model="form.mobile_phone"></el-input>
            </el-form-item>
            <el-form-item label="新密码">
                <el-input v-model="form.newPass"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input v-model="form.rePass"></el-input>
            </el-form-item>
            <el-form-item label="用户等级名称">
                <el-input disabled v-model="rank"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="form.sex">
                    <el-radio label="0">保密</el-radio>
                    <el-radio label="1">男</el-radio>
                    <el-radio label="2">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="出生日期">
                <el-date-picker
                    v-model="form.birthday"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="信用额度">
                <el-input disabled v-model="form.credit_line"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名">
                <el-input v-model="form.real_name"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
                <el-input v-model="form.card"></el-input>
            </el-form-item>
            <el-form-item label="身份证正面">
                <input type="file" ref="ID1" id="imgSrc1" accept="image/*" @change="getImg"/>
                <el-card v-show="imgSrc1" :body-style="{height:'180px',padding:'10px',textAlign:'left'}" shadow="hover">
                    <img :src="imgSrc1" class="brandLogo">
                    <i class="el-icon-circle-close" @click="delImg('1')"></i>
                </el-card>
            </el-form-item>
            <el-form-item label="身份证反面">
                <input type="file" ref="ID2" id="imgSrc2" accept="image/*" @change="getImg"/>
                <el-card v-show="imgSrc2" :body-style="{height:'180px',padding:'10px',textAlign:'left'}" shadow="hover">
                    <img :src="imgSrc2" class="brandLogo">
                    <i class="el-icon-circle-close" @click="delImg('2')"></i>
                </el-card>
            </el-form-item>
            <el-form-item label="现居地">
                <el-cascader
                size="large"
                :options="options"
                v-model="homeAddress"
                @change="handleChange">
                </el-cascader>
                <!-- <el-input v-model="form.homeAddress"></el-input> -->
            </el-form-item>
            <el-form-item label="详细地址">
                <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="审核状态">
                <el-input disabled v-model="status"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button style="width:45%" type="primary" @click="onSubmit">保存</el-button>
                <el-button style="width:45%" type="primary" @click="reset">刷新</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { getMember,updateMemberInfo } from "../api/api";
import { regionData, CodeToText, TextToCode } from "element-china-area-data";
export default {
  data() {
    return {
      form: {},
      selected: "",
      rank: "",
      status: "",
      imgSrc1:'',
      imgSrc2:'',
      is_change:false,
      options: regionData,
      homeAddress: []
    };
  },
  methods: {
    initData() {
      // 获取列表
      let data = {
        subsite_id: 3,
        id: sessionStorage.user_id
      };
      getMember({ params: data }).then(res => {
        if (res.errno == 0) {
          this.form = res.data.user;

          // 省市区默认赋值,傻逼版
          let provinceNum = res.data.user.province;
          let cityNum = res.data.user.city;
          let districtNum = res.data.user.district;
          let arr = [];
          let searchedCity;
          let searchedDistrict;
          res.data.province_list.forEach((v, i) => {
            if (v.region_id == provinceNum) {
              for (let key in TextToCode) {
                if (key.indexOf(v.region_name) != -1) {
                  searchedCity = TextToCode[key];
                  arr.push(TextToCode[key].code);
                }
              }
            }
          });
          res.data.city_list.forEach((v, i) => {
            if (v.region_id == cityNum) {
              let city = v.region_name;
              for (let key in searchedCity) {
                if (key.indexOf(city) != -1) {
                  searchedDistrict = searchedCity[key];
                  arr.push(searchedCity[key].code);
                }
              }
            }
          });
          res.data.district_list.forEach((v, i) => {
            if (v.region_id == districtNum) {
              let district = v.region_name;
              for (let key in searchedDistrict) {
                if (key.indexOf(district) != -1) {
                  arr.push(searchedDistrict[key].code);
                }
              }
            }
          });
          this.homeAddress = arr;
          // 省市区默认赋值,傻逼版 结束

          this.status = res.data.user.status == 1 ? "已审核" : "未审核";
          for (let key in res.data.special_ranks) {
            if (res.data.user.user_rank == key) {
              this.rank = res.data.special_ranks[key];
            }
          }
        }
      });
    },
    getImg(e) {
        let file = e.target.files[0]
        let fileReader = new FileReader()
        let imgUrlBase64 = fileReader.readAsDataURL(file)
        fileReader.onload = (v) => {
            this[e.target.id] = v.target.result
        }
    },
    delImg(v) {
        this.$refs["ID"+v].value = ''
        this['imgSrc'+v] = ''
    },
    reset() {
      this.initData();
    },
    onSubmit() {
        let tmpData = this.$qs.stringify(this.form);
        updateMemberInfo(tmpData).then(res=>{
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
        })
      console.log(this.form);
    },
    handleChange(value, v) {
        this.is_change = true
    }
  },
  created() {
    this.initData();
  }
};
</script>

<style scoped>
.memberAccount {
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
.el-form {
  padding: 20px;
  background: #fff;
}
.memberAccount >>> .el-form-item__label {
  padding: 0 30px 0 0;
}
.memberAccount >>> .el-form-item {
  border-top: 1px dashed #ccc;
  margin-bottom: 0;
  padding: 16px 0;
}
.brandLogo {
    height: 100%;
}
.el-card {
    width: 50%;
    position: relative;
    transition: all 0.3s;
}
.el-icon-circle-close {
    color: red;
    font-size: 26px;
    position: absolute;
    right: 1%;
    top: 2%;
    transition: all 0.3s;
}
.el-icon-circle-close:hover {
    transform: rotate(180deg);
}
</style>
