<template>
  <div id="operateLogs">
    <div class="main-header">
      <h3>温州美联 管理中心</h3>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item>报表</el-breadcrumb-item>
        <el-breadcrumb-item>操作日志</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-select size="small" clearable v-model="formsearch.admin_ip" placeholder="请选择ip">
      <el-option v-for="item in options2" :key="item" :label="item" :value="item"></el-option>
    </el-select>
    <el-select size="small" clearable v-model="formsearch.user_id" placeholder="请选择客户">
      <el-option
        v-for="item in options"
        :key="item.user_id"
        :label="item.user_name"
        :value="item.user_id"
      ></el-option>
    </el-select>
    <!-- <el-date-picker
      size="small"
      v-model="formsearch.time"
      clearable
      type="daterange"
      range-separator="至"
      value-format="timestamp"
      format="yyyy 年 MM 月 dd 日"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    ></el-date-picker> -->
    <el-input placeholder="请输入管理员id" @input="search" v-model="keywords" style="width:20%;margin-right:10px" size="small">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
    <el-button size="small" @click="deleteRow" type="primary">批量删除</el-button>
    <el-button size="small" type="primary" @click="reset">刷新</el-button>
    <el-table
      :data="logData"
      border
      :row-style="{height:0}"
      :cell-style="{padding:0}"
      @selection-change="handleSelectionChange"
      :header-row-style="{height:0}"
      :header-cell-style="{padding:0}"
      v-loading="loading"
      style="width: 100%"
    >
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column prop="user_id" align="center" label="管理员id"></el-table-column>
      <el-table-column prop="log_time" align="center" label="操作时间"></el-table-column>
      <el-table-column prop="log_info" align="center" show-overflow-tooltip label="操作内容"></el-table-column>
      <el-table-column prop="user_name" align="center" label="操作用户"></el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next,jumper"
      :total="total"
      :page-size="page_size"
    ></el-pagination>
  </div>
</template>
   
<script>
import { getLogList,delLogs } from "../../api/api";
export default {
  data() {
    return {
      page: 1,
      page_size: 15,
      total: 0,
      loading: true,
      selectSupplier: false,
      keywords:'',
      options: [],
      options2: [],
      formsearch: {},
      logData: [],
      selecteLog: []
    };
  },
  methods: {
    search() {
      getLogList({ params:{
        page:1,
        page_size:10,
        user_id:this.keywords
      } }).then(res => {
        console.log(res);
        if (res.errno == 0) {
          this.logData = res.data.log_list.list;
          this.options = res.data.user_list;
          this.options2 = res.data.ip_list;
          this.total = Number(res.data.log_list.record_count);
          this.loading = false;
        }
      });
    }, 
    initData(obj) {
      // 获取日志列表
      let data = {
        subsite_id: 3,
        page: this.page,
        page_size: this.page_size
      };
      if (obj) {
        Object.assign(data, obj);
      }
      getLogList({ params: data }).then(res => {
        console.log(res);
        if (res.errno == 0) {
          this.logData = res.data.log_list.list;
          this.options = res.data.user_list;
          this.options2 = res.data.ip_list;
          this.total = Number(res.data.log_list.record_count);
          this.loading = false;
        }
      });
    },
    /* search() {
      this.formsearch.start_time = this.formsearch.time?parseInt(this.formsearch.time[0] / 1000):'';
      this.formsearch.end_time = this.formsearch.time?parseInt(this.formsearch.time[1] / 1000):'';
      this.initData(this.formsearch);
    }, */
    reset() {
      this.time = "";
      this.admin_ip = "";
      this.user_id = "";
      this.initData();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.formsearch.start_time = this.formsearch.time?parseInt(this.formsearch.time[0] / 1000):'';
      this.formsearch.end_time = this.formsearch.time?parseInt(this.formsearch.time[1] / 1000):'';
      this.initData(this.formsearch);
    },
    handleSelectionChange(val) {
      val.forEach((v,i)=>{
          this.selecteLog.push(v.log_id)
      })
    },
    deleteRow() { // 批量删除
            this.$confirm("即将执行删除操作, 确认删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                let tmpData = this.$qs.stringify({log_ids:JSON.stringify(this.selecteLog)})
                delLogs(tmpData)
                .then(res => {
                    if (res.errno == 0) {
                    this.$message({
                        type: "success",
                        message: "删除成功!",
                        duration: 1000
                    });
                    }else {
                        this.$message({
                            type: "error",
                            message: res.errmsg,
                            duration: 1000
                        });
                    }
                    this.initData();
                })
            }).catch(res => {
                console.log("用户取消删除");
            })
        },
  },
  created() {
    this.initData();
  }
};
</script>
<style>
#operateLogs {
  text-align: center;
  margin: 20px;
}
#operateLogs .el-dialog .el-input {
  width: 10%;
}
#operateLogs .main-header {
  text-align: left;
  margin-bottom: 10px;
}
#operateLogs .el-input {
  width: 160px;
}
#operateLogs .el-table {
  margin: 20px 0;
}
#operateLogs .el-pagination {
  text-align: right;
  margin: 20px 0;
}
</style> 