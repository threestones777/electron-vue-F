<template>
    <div class="login">
        <div class="login-t">
            <img src="../assets/images/logo.png">
            <img src="../assets/images/logo_word1.png">
            <img src="../assets/images/logo_word2.png">
        </div>
        <div class="login-c">
            <h2>美联智慧店管理系统</h2>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item prop="username">
                    <img src="../assets/images/user.png">
                    <el-input clearable placeholder="用户名" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <img src="../assets/images/pass.png">
                    <el-input @keyup.enter.native="submitForm('ruleForm')" clearable placeholder="请输入密码" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="checked">记住我</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button :disabled="isLogining" type="info" @click="submitForm('ruleForm')">登陆</el-button>
                </el-form-item>
                <div style="text-align:right;color:#666">登陆遇到问题?</div>
            </el-form>
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
                    localStorage.user_id = res.data.user_id
                    sessionStorage.user_id = res.data.user_id
                  }else {
                    sessionStorage.user_id = res.data.user_id
                  }
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
                message: '未知原因,登陆失败',
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
  }
};
</script>

<style scoped>
.login {
  height: 100vh;
  background: url("../assets/images/login_bg.png") no-repeat center;
  background-size: 100% 100%;
  position: relative;
}
.login-t {
  height: 200px;
  line-height: 200px;
  padding-left: 8%;
}
.login-t img {
  margin-right: 10px;
  height: 20%;
  vertical-align: middle;
}
.login-c {
  width: 500px;
  padding: 0 50px 40px 50px;
  box-sizing: border-box;
  border-radius: 8px;
  position: absolute;
  left: 50%;
  top: 50%;
  background: #fff;
  transform: translate(-50%,-50%);
  box-shadow: 6px 6px 5px #ccc;
}
.login-c h2 {
  height: 120px;
  line-height: 120px;
  font-size: 24px;
  text-align: center;
  font-weight: 600;
}
.login-c >>> .el-input__inner {
  padding-left: 68px;
}
.login .login-c .el-input {
  width: 100%;
}
.login-c .el-form-item__content {
  position: relative;
}
.login-c .el-form-item:nth-of-type(2),
.login-c .el-form-item:nth-of-type(3) {
  margin-bottom: 10px;
}
.login-c .el-form-item__content img {
  position: absolute;
  left: 34px;
  top: 50%;
  transform: translate(-50%,-50%);
  z-index: 1;
}
.el-button {
  width: 100%;
  font-size: 16px;
  background: #000;
}
</style>

