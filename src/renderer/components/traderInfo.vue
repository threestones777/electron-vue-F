<template>
  <div class="traderInfo">
    <!-- 头部面包屑 -->
    <div class="main-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
        <el-breadcrumb-item>商户资料编辑</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="operate-in">
        <div class="card" @click.stop="resetForm('ruleForm')">
          <i :class="'el-icon-refresh'"></i>
          <div>重置</div>
        </div>
        <div class="card" @click.stop="submitForm('ruleForm')">
          <i class="el-icon-circle-check-outline"></i>
          <div>确认修改</div>
        </div>
        <div class="card">
          <el-dropdown placement="bottom" @command="handleChangeShop">
            <div class="card-title">
              <i class="el-icon-sort"></i>
              <b class="el-icon-caret-bottom"></b>
              <div>切换店铺</div>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item,index) in shopList" :key="index" :command="item.subshop_id">{{item.subshop_name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          
        </div>
      </div>
    </div>

    <div class="main-content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="门店名称：" prop="subshop_name">
          <el-input clearable style="width:50%;" v-model="ruleForm.subshop_name" placeholder="门店名称最长支持20个字"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：" prop="contacts_phone">
          <el-input clearable style="width:50%;" v-model.number="ruleForm.contacts_phone" placeholder="请输入电话号码">
            <template slot="prepend">+86</template>
          </el-input>
        </el-form-item>
        <el-form-item label="所属区域：" prop="arr_address">
          <el-cascader
            size="large"
            placeholder="请选择省市区"
            :options="options2"
            @change="handleChange"
            v-model="ruleForm.arr_address"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址：" prop="address">
          <el-input
            clearable
            id="suggestId"
            style="width:60%;"
            v-model="ruleForm.address"
            placeholder="请填写详细地址,以便买家联系"
          ></el-input>
          <div id="searchResultPanel" style="border:1px solid #c0c0c0;height:auto;display:none"></div>
          <!-- <el-button>确认位置</el-button> -->
        </el-form-item>
        <el-form-item label="地图定位：">
          <div id="l-map" style="height:600px;"></div>
        </el-form-item>
        <el-form-item label="门店照片：" required>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :auto-upload="false"
            :limit="1"
            ref="upload"
            accept="image/*"
            :on-exceed="exceed"
            :file-list="imgList"
            :on-change="beforeAvatarUpload"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <div class="tips">只接受图片格式,且大小不能超过2M。</div>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="subshop_img">
          </el-dialog>
        </el-form-item>
        <el-form-item label="营业时间：">
          <div class="work-time">
            <el-time-select
              style="width:15%;"
              placeholder="起始时间"
              v-model="open_time.start_time"
              :picker-options="{
                    start: '00:00',
                    step: '00:15',
                    end: '24:00'
                  }"
            ></el-time-select>
            <span>&nbsp;&nbsp;至&nbsp;&nbsp;</span>
            <el-time-select
              style="width:15%;"
              placeholder="结束时间"
              v-model="open_time.end_time"
              :picker-options="{
                    start: '00:00',
                    step: '00:15',
                    end: '24:00',
                  }"
            ></el-time-select>
            <el-checkbox-group style="margin-left:10px;" v-model="open_time.week" size="medium">
              <el-checkbox-button :label="1">周一</el-checkbox-button>
              <el-checkbox-button :label="2">周二</el-checkbox-button>
              <el-checkbox-button :label="3">周三</el-checkbox-button>
              <el-checkbox-button :label="4">周四</el-checkbox-button>
              <el-checkbox-button :label="5">周五</el-checkbox-button>
              <el-checkbox-button :label="6">周六</el-checkbox-button>
              <el-checkbox-button :label="7">周日</el-checkbox-button>
            </el-checkbox-group>
            <!-- <div style="margin-left:10px;">
              <el-button type="text">确认</el-button>
              <el-button type="text">取消</el-button>
            </div> -->
          </div>
          <div class="tips">默认08:30~20:30,周一至周五,不符合请修改!</div>
        </el-form-item>
        <el-form-item label="商家推荐：">
          <el-input
            :maxlength="200"
            style="width:50%"
            type="textarea"
            v-model="ruleForm.subshop_desc"
            placeholder="您可以简述门店的商品或者活动，也可以向买家陈述特色服务。列如，免费停车和WIFI！ (最多200个字)"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { getShopInfo, setShopInfo } from "../api/api";
let regionList = require("../assets/region.json")
export default {
  data() {
    return {
      ruleForm: {
        subshop_name: "",
        contacts_phone: "",
        arr_address: [],
        address: "",
        subshop_img: '',
        subshop_id:'',
        subshop_desc:'', // 门店简述
      },
      
      shopList: [], // 该站下的分店列表

      // 地图相关
      longitude: 0,
      latitude: 0,

      // 营业时间相关
      open_time:{
        start_time: "08:30",
        end_time: "20:30",
        week: [1, 2, 3, 4, 5], // 营业周集合
      },
      


      // 上传图片相关
      subshop_img: "", // 图片预览地址
      dialogVisible: false, // 图片上传预览弹窗
      imgList:[],

      // 省市区相关
      options2:regionList,

      // 校验规则
      rules: {
        subshop_name: [
          { required: true, message: "请输入门店名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度最长为20个字符", trigger: "blur" }
        ],
        arr_address: [
          { required: true, message: "请选择所属区域", trigger: "change" }
        ],
        address: [
          { required: true, message: "请填写详细地址", trigger: "blur" }
        ],
        /* time: [
          { required: true, message: "请填写门店营业时间", trigger: "blur" }
        ], */
        contacts_phone: [
          {
            required: true,
            pattern: /^1\d{10}$/,
            message: "请输入正确的11位手机号",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    initData(id) {
      let tmpdata = {
        user_id: sessionStorage.user_id
      };
      
      if(id) {
        tmpdata.id = id
      }
      let data = this.$qs.stringify(tmpdata);
      getShopInfo(data).then(res => {
        console.log(res.data);
        if (res.errno == 0) {
          this.longitude = Number(res.data.lng);
          this.latitude = Number(res.data.lat);
          this.shopList = res.data.shop_list;
          this.open_time = res.data.open_time;
          this.ruleForm.subshop_name = res.data.subshop_name;
          this.ruleForm.contacts_phone = res.data.contacts_phone;
          this.ruleForm.arr_address = res.data.arr_address;
          this.ruleForm.address = res.data.address;
          this.ruleForm.subshop_id = res.data.subshop_id;
          this.ruleForm.subshop_desc = res.data.subshop_desc;
          if(res.data.subshop_img) {
            this.imgList = []
            this.imgList.push({url:"http://source.guimishuo1.com" + res.data.subshop_img})
          }
          // 用经纬度设置地图中心点
          this.$map.clearOverlays(); //清除标注
          var new_point = new BMap.Point(this.longitude, this.latitude);
          this.$map.centerAndZoom(new_point, 18);
          var marker = new BMap.Marker(new_point); // 创建标注
          this.$map.addOverlay(marker); // 将标注添加到地图中
          this.$map.panTo(new_point);
        }
      });
    },
    handleChangeShop(e) { // 切换店铺
      this.$nextTick(() => {
        this.$refs.upload.clearFiles();
      });
      this.initData(e)
    },
    beforeAvatarUpload(file, list) {
      // 上传之前限制格式和大小
      if (file.raw.type.indexOf("image/") == -1) {
        list.pop();
        this.$message.error("只能选择图片格式!");
        return;
      }
      if (file.size / 1024 / 1024 > 2) {
        list.pop();
        this.$message.error("上传图片大小不能超过 2MB!");
        return;
      }
      var reader=new FileReader();
      reader.readAsDataURL(file.raw)
      reader.onload=()=>{
        this.ruleForm.subshop_img = reader.result;
      }
      /* this.imgList = list */
    },
    exceed(files, fileList) {
      this.$message.error("已达上传上限!");
    },
    handleRemove(file, fileList) {
      // 移除预览图片处理业务
      this.imgList.pop()
      this.ruleForm.subshop_img = ''
    },
    handlePictureCardPreview(file) {
      // 预览图片处理业务
      this.subshop_img = file.url;
      this.dialogVisible = true;
    },
    handleChange(e) {
      // 省市区更改时处理业务
      
    },
    submitForm(formName) {
      // 提交表单
      if(!this.ruleForm.subshop_img && !this.imgList[0]) {
        this.$message.error("请上传门店照片!");
        return
      }else if(this.imgList[0] && !this.ruleForm.subshop_img) {
        delete this.ruleForm.subshop_img
        console.log("222")
      }else {
        console.log("333")
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.start_time = this.open_time.start_time
          this.ruleForm.end_time = this.open_time.end_time
          this.ruleForm.week = JSON.stringify(this.open_time.week)
          this.ruleForm.province = this.ruleForm.arr_address[0]
          this.ruleForm.city = this.ruleForm.arr_address[1]
          this.ruleForm.district = this.ruleForm.arr_address[2]
          this.ruleForm.lat  = this.latitude
          this.ruleForm.lng = this.longitude
          let data = this.$qs.stringify(this.ruleForm)
          /* console.log(this.ruleForm)
          return */
          setShopInfo(data).then(res=>{
            if(res.errno == 0) {
              this.$message.success(res.errmsg);
            }else {
              this.$message.error("失败!");
            }
            this.initData(this.ruleForm.subshop_id)
          })
        } else {
          console.log(this.ruleForm);
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.subshop_img = ''
      this.initData()
    }
  },
  mounted() {
    let that = this;
    // 百度地图API功能
    function G(id) {
      return document.getElementById(id);
    }
    var map = new BMap.Map("l-map");
    this.$map = map
    map.centerAndZoom("杭州", 12); // 初始化地图,设置城市和地图级别。第一个参数可以使用坐标点=>new BMap.Point(116.404, 39.915)
    map.enableScrollWheelZoom(true); // 设置是否可以滚轮缩放
    var ac = new BMap.Autocomplete({
      //建立一个自动完成的对象
      input: "suggestId",
      location: map
    });
   /*  map.addEventListener("click", e => {
      //获取地图坐标
      this.longitude = e.point.lng;
      this.latitude = e.point.lat;
    }); */

    // 以下为 "搜索"定位 copy的代码
    ac.addEventListener("onhighlight", function(e) {
      //鼠标放在下拉列表上的事件
      var str = "";
      var _value = e.fromitem.value;
      var value = "";
      if (e.fromitem.index > -1) {
        value =
          _value.province +
          _value.city +
          _value.district +
          _value.street +
          _value.business;
      }
      str =
        "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
      value = "";
      if (e.toitem.index > -1) {
        _value = e.toitem.value;
        value =
          _value.province +
          _value.city +
          _value.district +
          _value.street +
          _value.business;
      }
      str +=
        "<br />ToItem<br />index = " +
        e.toitem.index +
        "<br />value = " +
        value;
      G("searchResultPanel").innerHTML = str;
    });

    var myValue;
    ac.addEventListener("onconfirm", function(e) {
      //鼠标点击下拉列表后的事件
      var _value = e.item.value;
      myValue =
        /* _value.province +
        _value.city +
        _value.district + */
        _value.street + _value.business;
      G("searchResultPanel").innerHTML =
        "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
      that.ruleForm.address = myValue;
      setPlace();
    });

    function setPlace() {
      map.clearOverlays(); //清除地图上所有覆盖物
      function myFun() {
        var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
          that.longitude = pp.lng,
          that.latitude = pp.lat,
          console.log(pp)
          map.centerAndZoom(pp, 18);
          map.addOverlay(new BMap.Marker(pp)); //添加标注
      }
      var local = new BMap.LocalSearch(map, {
        //智能搜索
        onSearchComplete: myFun
      });
      local.search(myValue);
    }
  },
  created() {
    this.initData();
  }
};
</script>
<style scoped>
.traderInfo {
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
.main-header .el-breadcrumb span {
  font-size: 18px;
}
/*  操作栏 */
.card-title {
  text-align: center;
}
.card-title:focus {
  outline: none;
}
.card {
  transition: all 0.3s;
  padding: 5px 0;
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0px 2px 5px 4px rgba(0, 0, 0, 0.1);
}
.card:hover i,
.card:hover div,
.card:hover b {
  color: #6cf;
}
.operate-in {
  display: flex;
  margin-top: 12px;
}
.operate-in > div {
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
}
.operate-in > div div {
  font-size: 16px;
}
.operate-in i {
  font-size: 30px;
}
.operate-in b {
  font-size: 16px;
  position: absolute;
  top: 20%;
  right: 5%;
}
.el-button {
  margin: 0 !important;
}

/* 资料编辑主体部分 */
.main-content {
  margin: 20px 0;
  padding: 20px;
  background: #fff;
}
.work-time {
  display: flex;
}
</style>
