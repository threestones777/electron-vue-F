<template>
    <div class="authoritySet">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>设置</el-breadcrumb-item>
                <el-breadcrumb-item>权限设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <!-- 账户搜索 -->
            <el-form :inline="true" :model="formServe">
                <!-- <el-form-item label="">
                    <el-input	size="small" clearable v-model="formServe.nickname" placeholder="职员名称"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input	size="small" clearable v-model="formServe.name" placeholder="职员账号"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <el-input placeholder="请输入职员名称" @input="search" v-model="keywords" style="width:60%;margin-right:10px" size="small">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                    <el-button type="primary" size="small" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form>
            <!-- 权限选择弹出框 -->
            <el-dialog width="80%" title="权限查/改" :visible.sync="dialogServeDetail">
              <el-tree
                :data="data2"
                show-checkbox
                ref="tree"
                :default-checked-keys='defaultKey'
                :check-strictly='check_strictly'
                :default-expanded-keys="defaultExpanded"
                node-key="action_code"
                @check-change="onchange"
                style="height:65vh;overflow:auto"
                :props="defaultProps">
              </el-tree>
              <el-button :disabled="authEdit" size="medium" style="float:right;margin:0 5px 5px 0" type="primary" @click="getCheckedNodes">提交设置</el-button>
            </el-dialog>
            <!-- 权限设置表格 -->
            <el-table
            :data="setData"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            v-loading="loading"
            style="width: 100%">
                <el-table-column
                prop="nickname"
                align="center"
                label="职员名称">
                </el-table-column>
                <el-table-column
                prop="name"
                align="center"
                label="职员账户">
                </el-table-column>
                <el-table-column
                prop="mobile"
                align="center"
                label="手机号码">
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                label="相关操作"
                width="240">
                    <template slot-scope="scope">
                        <el-button :disabled="authDetail" type="text" size="small" @click="setRight(scope.row)">分配权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next,jumper"
                :total="total"
                :page-size="page_size">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {
  getQuanxianList,
  getQuanxianDetail,
  editQuanxian,
  getQuanxianOne,
  getSubAuthority
} from "../../api/api";
export default {
  data() {
    return {
      page: 1,
      page_size: 10,
      total: 0,
      loading: true,
      authDetail:true, // 详情权限
      authEdit:true, // 编辑权限
      dialogServeDetail: false,
      keywords:'',
      defaultKey: [],
      defaultExpanded: [],
      formServe: {},
      setData: [],
      data2: [],
      action_id:0,
      parent_action:0,
      check_strictly: true,
      defaultProps: {
        // 节点显示规则
        children: "priv",
        label: "value"
      }
    };
  },
  methods: {
    search() {
      getQuanxianList({ params:{
        page:1,
        page_size:10,
        nickname:this.keywords
      }}).then(res => {
        console.log(res);
        if (res.errno == 0) {
          this.setData = res.data.clerk_list;
          this.total = Number(res.data.record_count);
          this.loading = false;
        }
      });
    }, 
    initData() {
      // 获取职员列表
      let data = {
        subsite_id: 3,
        user_id: sessionStorage.user_id,
        page: this.page,
        page_size: this.page_size,
        nickname: this.formServe.nickname,
        name: this.formServe.name
      };
      getQuanxianList({ params: data }).then(res => {
        console.log(res);
        if (res.errno == 0) {
          this.setData = res.data.clerk_list;
          this.total = Number(res.data.record_count);
          this.loading = false;
        }
      });
    },
    onchange(v,i) { // 后台数据和需要传的参数等 和 element-ui组件 不完全匹配 之 曲线救国法
      let data = this.$refs.tree.getNode(v.action_code)
      while (data.parent.key && i) { // 当前节点选中,向上节点选中;当前节点取消,不影响上级
        data.parent.checked = true
        data = data.parent
      }
      (function aaa() { // 父节点取消选中,子节点全部取消选中,父节点选中则不影响(循环自调用,即递归)
        if(data.childNodes.length && !i) {
          data.childNodes.forEach((v,i)=>{
            v.checked = false
            data = v
            aaa()
          })
        }
      })()
    },
    setRight(row) {
      // 权限详情 查改
      this.action_id = row.id
      this.check_strictly = true;
      console.log(row.id)
      let data = this.$qs.stringify({
        id: row.id,
        user_id: sessionStorage.user_id
      });
      getQuanxianDetail(data).then(res => {
        if (res.errno == 0) {
          this.data2 = res.data[0];
          this.setDefaultExpanded(res);
          this.setDefaultKey(res);
          // console.log(this.defaultExpanded)
          this.dialogServeDetail = true;
        }
      });
    },
    getCheckedNodes() { // 确认修改权限
      // 获取已选中节点的权限名
      let selected = this.$refs.tree.getCheckedNodes(false,true)
      let tmpArr = []
      selected.forEach((v,i)=>{
        tmpArr.push(v.action_code)
      })
      console.log(tmpArr.join()+",")
      let data = this.$qs.stringify({
        id:this.action_id,
        action_list:tmpArr.join()+","
      })
      editQuanxian(data).then(res=>{
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
        this.dialogServeDetail = false
      }).catch(res=>{
        this.$message({
          type: "error",
            message: "未知错误",
            duration: 1000
        });
        this.dialogServeDetail = false
      })
    },
    setDefaultExpanded(res) {
      // 设置默认展开节点
      let arr = [];
      res.data[0].forEach((v, i) => {
        arr.push(v.action_code);
      });
      this.defaultExpanded = arr;
    },
    setDefaultKey(res) {
      // 设置默认勾选权限节点
      let arr = res.data[1].split(",");
      arr.pop();
      this.defaultKey = arr;
    },
    serveSearch() { // 搜索
      this.initData()
    },
    reset() {
      this.formServe.name = "";
      this.formServe.nickname = "";
      this.initData();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.initData();
    },
    getAuthority() {
      let data = this.$qs.stringify({
        id:this.parent_action,
        user_id:sessionStorage.user_id
      })
      getSubAuthority(data).then(res=>{
        if(res.errno == 0) {
          res.data.forEach((v,i)=>{
            switch (v.value) {
              case '详情':
                  this.authDetail = false
                break;
              case '修改':
                  this.authEdit = false
                break;
            }
          })
        }
      })
    }
  },
  created() {
    this.parent_action = this.$route.query.action_id
    this.initData();
    this.getAuthority()
  }
};
</script>
<style scoped>
.authoritySet {
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

/* 新增账户弹出框 & 账户详情弹出框*/
.main-table >>> .el-dialog__body {
  padding: 0 20px;
  overflow: hidden;
}
.el-dialog__body .el-form {
  text-align: right;
}
.el-row {
  border-top: 1px dashed #ccc;
}
.el-tree {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
