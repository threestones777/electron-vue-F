<template>
  <div id="goodsProfitList">
    <div class="custM-header">
        <h3>温州美联 管理中心</h3>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item>报表</el-breadcrumb-item>
            <el-breadcrumb-item>商品利润表</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <el-input v-model="orderDate" placeholder="商品名称/首字母"></el-input>
    <el-input v-model="orderDate" placeholder="开始日期"></el-input>
    <el-input v-model="orderDate" placeholder="结束日期"></el-input>
    <el-button type="success">搜索</el-button>
    <el-button type="success">导出</el-button>
    <el-button type="success">刷新</el-button>
    <el-table
      :data="tableData"
      style="width: 100%">
        <el-table-column
            prop="pMsg"
            align="center"
            label="商品名称">
        </el-table-column>
        <el-table-column
            prop="pProp"
            align="center"
            label="辅助属性">
        </el-table-column>
        <el-table-column
            prop="pId"
            align="center"
            label="所属仓库">
        </el-table-column>
        <el-table-column
            prop="pId"
            align="center"
            label="商品批次">
        </el-table-column>     
        <el-table-column
            prop="pId"
            align="center"
            label="销货金额">
        </el-table-column>     
        <el-table-column
            prop="pId"
            align="center"
            label="零售金额">
        </el-table-column>     
        <el-table-column
            prop="pId"
            align="center"
            label="销售收入">
        </el-table-column>     
        <el-table-column
            prop="pId"
            align="center"
            label="销售成本">
        </el-table-column>     
        <el-table-column
            prop="pId"
            align="center"
            label="销售毛利">
        </el-table-column>     
        <el-table-column
            prop="pId"
            align="center"
            label="销售毛利率">
        </el-table-column>     
    </el-table>
    <!--分页显示-->
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </div>                                
  </div>
</template>
<style>
    #goodsProfitList{
        text-align:center;
        margin: 20px;
    }
    #goodsProfitList .custM-header{
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
    #goodsProfitList .el-input{
        width:200px;
    }
    #goodsProfitList .el-table{
      margin:20px 0;
    }
    #goodsProfitList .el-upload{
      margin:20px 0;
    }
    #goodsProfitList .el-pagination{
        text-align: right;
        margin:20px 0;
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