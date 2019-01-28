<template>
    <div class="sysMessage">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <!-- <h3>温州美联 管理中心</h3> -->
            <el-breadcrumb style="font-size:18px;" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>系统消息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!-- 消息列表 -->
        <el-table
            :data="tableData"
            algin="center"
            max-height="700"
            stripe
            @selection-change="handleSelectionChange"
            :default-sort = "{prop: 'time', order: 'descending'}"
            style="width: 100%">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            label="发件人"
            prop="from_user_name"
            width="200"
            :formatter="formateUser">
            </el-table-column>
            <el-table-column
            label="消息类型"
            :filters="[{text: '交易消息', value: '交易消息'}, {text: '系统消息', value: '系统消息'},{text: '店铺消息', value: '店铺消息'},{text: '交流消息', value: '交流消息'}]"
            :filter-method="filterHandler"
            prop="msg_type">
            </el-table-column>
            <el-table-column
            label="主题"
            :formatter="formateTitle"
            prop="msg_title">
            </el-table-column>
            <el-table-column
            label="消息时间"
            prop="date"
            sortable
            width="200">
            </el-table-column>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <span style="font-weight:600">消息详情:</span>
                    <span>{{ props.row.msg_content }}</span>
                    <el-button class="fr" @click="emitMsg(props.row)" type="primary" icon="el-icon-edit" circle></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 删除消息 -->
        <el-button @click="delMsg" :disabled="!delArr.length" v-show="tableData.length" type="danger" icon="el-icon-delete" circle></el-button>

        <!-- 分页器 -->
        <el-pagination
            @current-change="handleCurrentChange"
            layout="total,prev, pager, next,jumper"
            align="center"
            :page-size="page_size"
            :total="total">
        </el-pagination>

        <!-- 回复弹出框 -->
        <el-dialog title="回复" :visible.sync="dialogFormVisible" width="25%">
        <el-form :model="form" :rules="rules" ref="ruleForm">
            <el-form-item label="收信人" :label-width="formLabelWidth">
                <el-input disabled v-model="form.user_name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="消息标题" :label-width="formLabelWidth" prop="title">
                <el-input v-model="form.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="消息类型" :label-width="formLabelWidth">
            <el-select v-model="form.type">
                <el-option label="交易消息" value="3"></el-option>
                <el-option label="系统消息" value="1"></el-option>
                <el-option label="店铺消息" value="2"></el-option>
                <el-option label="交流消息" :selected="true" value="4"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="消息内容" :label-width="formLabelWidth" prop="content">
                <el-input v-model="form.content" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="sendMsg('ruleForm')">确 定</el-button>
        </div>
        </el-dialog>
    </div>
</template>

<script>
import { getSysMsgList, replyMsg, delMsg } from "../api/api";
export default {
  data() {
    return {
      page: 1,
      page_size: 15,
      total: 0,
      delArr: [],
      tableData: [],
      dialogFormVisible: false,
      form: {
        user_name: "",
        title: "",
        type: "1",
        content: "",
        to_uid: ""
      },
      rules: {
        title: [{ required: true, message: "不能为空", trigger: "blur" }],
        content: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      formLabelWidth: "80px"
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      // 获取消息列表
      getSysMsgList({
        params: {
          page: this.page,
          page_size: this.page_size,
          user_id: sessionStorage.getItem("user_id")
        }
      }).then(res => {
        if (res.errno == 0) {
          this.tableData = res.data.list;
          this.total = Number(res.data.record_count);
        }
      });
    },
    delMsg() {
      // 消息删除
      let data = this.$qs.stringify({
          user_id:sessionStorage.getItem("user_id"),
          msgid:JSON.stringify(this.delArr)
      })
      delMsg(data).then(res=>{
          if(res.errno==0) {
              this.$message({
                showClose: true,
                message: "删除成功!",
                duration:1000,
                type: 'success'
            })
            this.initData()
          }else {
               this.$message({
                showClose: true,
                message: "删除失败!",
                duration:1000,
                type: 'error'
            })
          }
      })
    },
    sendMsg(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.form.user_id = sessionStorage.getItem("user_id");
          let data = this.$qs.stringify(this.form);
          replyMsg(data).then(res => {
              if(res.errno == 0) {
                  this.$message({
                    showClose: true,
                    message: "回复成功!",
                    duration:1000,
                    type: 'success'
                  })
                  this.dialogFormVisible = false
              }else {
                  this.$message({
                      showClose: true,
                    message: "回复失败!",
                    duration:1000,
                    type: 'error'
                  })
                  this.dialogFormVisible = false
              }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      console.log(this.form);
    },
    emitMsg(data) {
      this.form.title = "";
      this.form.content = "";
      this.form.type = "1";
      this.form.user_name = data.from_user_name;
      this.form.to_uid = data.from_uid;
      this.dialogFormVisible = true;
    },
    handleCurrentChange(val) {
      // 实现翻页
      this.page = val;
      this.initData();
    },
    filterHandler(value, row, column) {
      // 消息类型过滤器
      return row.msg_type == value;
    },
    handleSelectionChange(val) {
      let tmpArr = [];
      val.forEach((v, i) => {
        tmpArr.push(Number(v.msgid));
      });
      this.delArr = tmpArr;
    },
    formateUser(row, column) {
      // 过滤from_user_name为空 的消息
      if (!row.from_user_name) {
        return "美联官方";
      } else {
        return row.from_user_name;
      }
    },
    formateTitle(row, column) {
      // 过滤msg_title 为空 的消息
      if (!row.msg_title) {
        return "签到提醒";
      } else {
        return row.msg_title;
      }
    }
  }
};
</script>

<style scoped>
.sysMessage {
  margin: 10px;
  position: relative;
}
/* 头部面包屑 */
.main-header {
  padding: 10px;
  margin-bottom: 20px;
  background: #fff;
}
.main-header .el-breadcrumb {
  margin: 8px 0 0 10px;
}

.sysMessage >>> .el-table__expanded-cell {
  background: #eee;
}
.sysMessage >>> .el-table__expanded-cell:hover {
  background: #eee !important;
}
.sysMessage > .el-button {
  position: absolute;
  top: 11%;
  right: 2%;
}
.sysMessage >>> .el-dialog__body {
  padding: 0 15px;
}
</style>
