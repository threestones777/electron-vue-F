<template>
  <div id="shopOderList">
    <div class="custM-header">
        <h3>温州美联 管理中心</h3>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item>购货</el-breadcrumb-item>
            <el-breadcrumb-item>采购订单</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    单据日期 :<el-input v-model="orderDate"></el-input>
    单据编号 :<el-input v-model="orderId"></el-input>
    <el-button type="success">提交单据</el-button>
    <el-button type="success">重新载入</el-button>
    <el-table
      :data="tableData"
      style="width: 100%">
        <el-table-column
            prop="pMsg"
            label="商品信息">
        </el-table-column>
        <el-table-column
            prop="pProp"
            label="辅助属性">
        </el-table-column>
        <el-table-column
            prop="pId"
            label="商品编号	">
        </el-table-column>
        <el-table-column
            prop="pClass"
            label="商品分类	">
        </el-table-column>
        <el-table-column
            prop="pCount"
            label="数量">
        </el-table-column>
        <el-table-column
            prop="pRemark"
            label="备注信息">
        </el-table-column>        
    </el-table>
    <!--分页显示-->
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </div>
    <!---->    
    <el-upload
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload> 
    制单人:
    <el-select v-model="value" placeholder="请选择">
      <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      </el-option>
    </el-select> 
    备注信息：<el-input v-model="input" placeholder="请输入备注信息"></el-input>                             
  </div>
</template>
<style>
    #shopOderList{
        text-align:center;
        margin: 20px;
    }
    #shopOderList .custM-header{
        text-align:left;
    }
    .custM-header {
        padding: 10px;
        background: #fff;
        margin:20px 0;
    }
    .custM-header .el-breadcrumb {
        margin: 10px 0;
    }
    #shopOderList .el-input{
        width:200px;
    }
    #shopOderList .el-table{
      margin:20px 0;
    }
    #shopOderList .el-upload{
      margin:20px 0;
    }
    #shopOderList .el-pagination{
        text-align: right;
    }
</style>

<script>
export default {
  data() {
    return {
      input:'',
      orderDate:'',
      orderId:'',
      tableData: [{
            pMsg: 'text',
            pProp: 'text',
            pId: 'text',
            pClass: 'text',
            pCount: 'text',
            pRemark: 'text'
          }],
      options: [{
          value: '选项1',
          label: '选项1'
        }, {
          value: '选项2',
          label: '选项2'
        }, {
          value: '选项3',
          label: '选项3'
        }, {
          value: '选项4',
          label: '选项4'
        },],
        value: '',
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
    }
  },
  methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
}
</script>