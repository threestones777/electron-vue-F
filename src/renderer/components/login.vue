<template>
  <div class="login-box">
      <div class="bg1"></div>
      <div class="bg2"></div>
      <img src="../assets/images/logo_words.png" class="logo-words">
     <div class="login">
        <img src="../assets/images/login_bg.png" class="float_bg">
        <img src="../assets/images/logo_welcome.png" class="logo_welcome">
        <div class="login-c">
          <div class="login-cr">
            <h2>美联智慧店管理系统</h2>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item prop="username" class="user-name">
                    <img src="../assets/images/user.png">
                    <el-input clearable placeholder="用户名" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password" class="password">
                    <img src="../assets/images/pass.png">
                    <el-input @keyup.enter.native="submitForm('ruleForm')" clearable placeholder="请输入密码" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="remember">
                    <el-checkbox v-model="checked">记住我</el-checkbox>
                </el-form-item>
                <el-form-item class="btn">
                    <el-button :disabled="isLogining" type="info" @click="submitForm('ruleForm')">登陆</el-button>
                </el-form-item>
                <div class="tips">登陆遇到问题?</div>
            </el-form>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { login } from "../api/api";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入帐号"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    }
    return {
      checked:false,
      ruleForm: {
        username: "18658138222",
        password: "123456"
      },
      rules: {
        username: [{ validator: validatePass, trigger: "blur" }],
        password: [{ validator: validatePass2, trigger: "blur" }]
      },
      isLogining:false
    }
  },
  mounted() {
    let dom = document.querySelector(".login")
    let html = document.getElementsByTagName("html")[0]
    let words = document.querySelector(".logo-words")
    let bg1 = document.querySelector(".logo-words")
    let H = document.body.clientHeight
    let winW = document.body.clientWidth
    dom.style.width = H / 0.75 + "px"
      if(H > 900) {
        html.style.fontSize = 28 + "px"
        words.style.left = "10%"
        words.style.top = "8%"
      }else if(H < 650) {
        words.style.top = "5%"
        words.style.left = "5%"
        html.style.fontSize = 24 + "px"
      }else {
        html.style.fontSize = 24 + "px"
        words.style.left = "10%"
        words.style.top = "8%"
      }
    console.log(html)
    window.onresize = function () {
      let H = document.body.clientHeight
      let winW = document.body.clientWidth
      dom.style.width = H / 0.75 + "px"
      if(H > 900) {
        html.style.fontSize = 28 + "px"
        words.style.left = "10%"
        words.style.top = "8%"
      }else if(H < 650) {
        words.style.top = "5%"
        words.style.left = "5%"
        html.style.fontSize = 24 + "px"
      }else {
        html.style.fontSize = 24 + "px"
        words.style.left = "10%"
        words.style.top = "8%"
      }
    }
  },
  methods: {
    submitForm(formName) {
      console.log(this.checked)
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isLogining = true
          let data = this.$qs.stringify(this.ruleForm);
          login(data).then(res => {
              if(res.errno == 0) {
                console.log(res)
                  this.$message({
                    showClose: true,
                    message: "登陆成功,即将跳转首页!",
                    duration:1500,
                    type: 'success'
                  })
                  
                  if(this.checked) {
                    localStorage.user_info = JSON.stringify({username:this.ruleForm.username,password:this.ruleForm.password})
                  }else {
                    localStorage.removeItem("user_info")
                  }
                  sessionStorage.user_id = res.data.user_id
                  setTimeout(() => {
                      this.isLogining = false
                      this.$router.replace("/")
                      
                  }, 1500);
              }else {
                  this.$message({
                    showClose: true,
                    message: res.errmsg,
                    duration:1500,
                    type:"error"
                  })
                  this.isLogining = false
              }
          }).catch(res=>{
            this.$message({
                showClose: true,
                message: '未知原因,请重新尝试',
                duration:1500,
                type:"error"
              })
            this.isLogining = false
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  created() {
    if(localStorage.user_info) {
      this.ruleForm = JSON.parse(localStorage.user_info),
      this.checked = true
    }else {
      this.ruleForm = {}
    }
  }
};
</script>

<style scoped>
@font-face{
  font-family: 'pingFangSC-Regular';
  src: url('../assets/PingFang.ttf');
  font-weight: normal;
  font-style: normal;
}
.login-box {
  width: 100%;
  height: 100vh;
  position: relative;
}
.logo-words {
  height: 2.2rem;
  position: absolute;
  z-index: 99;
}
.bg1, .bg2 {
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 0;
}
.bg1 {
  left: 0;
  background:#a7e3e1;
}
.bg2 {
  right: 0;
  background: rgb(239,249,249);
}
.login {
  background: rgb(239, 249, 249);
  background-size: 100% 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  min-width: 1024px;
  min-height: 768px;
  height: 100%;
}
.float_bg {
  position: absolute;
  left: -1px;
  z-index: 99;
  width: 50%;
  height: 100%;
}
.logo_welcome {
  position: absolute;
  left: 16%;
  top: 22%;
  z-index: 99;
}
.login-c {
  width: 72.65%;
  height: 59.2%;
  max-width: 800px;
  box-sizing: border-box;
  border-radius: 8px;
  position: absolute;
  left: 50%;
  top: 50.25%;
  box-shadow: 0 0 18px 0 #ddd;
  background: #fff;
  transform: translate(-50%,-50%);
  display: flex;
  justify-content: flex-end;
}
.login-c .login-cr {
  width: 50%;
  height: 100%;
  padding: 8% 5%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-c .login-cr h2 {
  font-size: 1rem;
  color: #37c2bd;
  font-family: "pingFangSC-Regular";
  font-weight: bold;
  text-align: center;
  margin-bottom: 2.70rem;
}
.login-c .el-form {
  width: 90%;
}
.login-c >>> .el-input__inner {
  padding-left: 1.91rem;
  border: none;
  font-size: 0.58rem;
  color: #999;
}
.el-form-item.user-name,
.el-form-item.password {
  border-bottom: 1px solid #37c2bd;
}
.el-form-item.user-name {
   margin-bottom: 1.25rem;
}
.el-form-item.password {
  margin-bottom: 1.2rem;
}
.el-form-item.btn {
   margin-bottom: 1.0rem;
}
.el-checkbox {
  color: #999;
}
.login-c >>> .el-checkbox__input {
  width: 15px;
  height: 15px;
}
.el-form-item.remember {
  padding-left: 8px;
  font-size: 0.58rem;
}
.login .login-c .el-input {
  width: 100%;
}
.login-c .el-form-item__content {
  position: relative;
}
.login-c >>> .el-checkbox__input.is-checked+.el-checkbox__label {
  color: #999!important;
}
.login-c .el-form-item__content img {
  position: absolute;
  left: 0.83rem;
  top: 50%;
  transform: translate(-50%,-50%);
  z-index: 1;
}
.btn >>> .el-form-item__content {
  display: flex;
  justify-content: center;
}
.el-button {
  width: 9rem;
  height: 1.67rem;
  font-size: 0.75rem;
  color: #fff;
  border: none;
  background: #37c2bd;
  border-radius: 30px;
  box-shadow: 0 2px 10px 2px rgba(60, 195, 190, 0.3);
}
.el-button--info:focus {
  background: #37c2bd
}
.el-button.is-disabled {
  box-shadow: 0 2px 10px 2px #c8c9cc;
}
.el-button:hover {
  background: rgba(60, 195, 190, 0.7);
}
.tips {
  text-align:right;
  color:#666;
  font-size:0.58rem;
  font-family: "pingFangSC-Regular";
}
</style>

