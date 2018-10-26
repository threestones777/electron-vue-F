<template>
    <div id="operateLogs">
        <div class="custM-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>报表</el-breadcrumb-item>
                <el-breadcrumb-item>操作日志</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-input v-model="orderDate" placeholder="操作内容"></el-input>
        <el-select v-model="value" placeholder="全部客户">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-input v-model="orderDate" placeholder="开始日期"></el-input>
        <el-input v-model="orderDate" placeholder="结束日期"></el-input>       
        <el-button type="success">搜索</el-button>
        <el-button type="success">清空日志</el-button>
        <el-button type="success">刷新</el-button>
        <el-table
        :data="logData"
        style="width: 100%">
            <el-table-column
                prop="log_time"
                align='center'
                label="操作时间">
            </el-table-column>
            <el-table-column
                prop="log_info"
                align='center'
                label="操作内容">
            </el-table-column>
            <el-table-column
                prop="user_name"
                align='center'
                label="操作用户">
            </el-table-column>        
        </el-table>
        <!--分页-->
        <el-pagination
            layout="prev, pager, next"
            :total="1000">
        </el-pagination>     
    </div>
</template>
<style>
    #operateLogs{
        text-align:center;
        margin:20px;
    }
    #operateLogs .el-dialog .el-input{
       width:10%;
    }
    #operateLogs .custM-header{
        text-align:left;
    }
    #operateLogs .el-select{
        width:100px;
    }
    #operateLogs .el-input{
        width:100px;
    }
    #operateLogs .el-table{
        margin:20px 0;
    } 
    #operateLogs .el-pagination{
        text-align: right;
        margin: 20px 0;
    }
</style>    
<script>
import axios from 'axios' ;
  export default {
    data() {
      return {
        selectSupplier:false,
        options: [{
          value: '选项1',
          label: '默认值'
        }],
        value: '',
        input:'',
        orderDate:'',
        orderId:'',
        logData: [],
        multipleSelection: []
      }
    },
    methods:{
        handleClose(done) {
            done();
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
      }
    },
    mounted: function () { 
        axios.get('http://api.guimishuo1.com/erp/log/lists')
    .then((res) =>{
        console.log(res.data.data.log_list);
        this.logData=res.data.data.log_list;
        console.log(this.logData[0]);
    }, function (error) {
            console.log(error)
        })
    }
  }
</script>
