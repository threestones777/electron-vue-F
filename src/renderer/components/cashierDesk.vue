<template>
    <div class="cashierDesk">
        <el-container>
        <el-header>
            <span @click="$router.push('/')">收银台</span>
        </el-header>
        <el-container>
            <el-aside width="400px">
                <el-tabs stretch v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="商品" name="first">
                        <el-table
                        :data="goodsTableData"
                        show-summary>
                        <el-table-column
                            prop="name"
                            label="商品名称">
                        </el-table-column>
                        <el-table-column
                            prop="number"
                            label="数量">
                        </el-table-column>
                        <el-table-column
                            prop="price"
                            label="金额">
                        </el-table-column>
                        <el-table-column
                        fixed="right"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button
                            @click.native.prevent="deleteRow(scope.$index, tableData)"
                            type="text"
                            size="small">
                            移除
                            </el-button>
                        </template>
                        </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="服务" name="second">
                        <el-table
                        :data="serveTableData">
                        <el-table-column
                            prop="name"
                            label="服务名称">
                        </el-table-column>
                        <el-table-column
                            prop="number"
                            label="数量">
                        </el-table-column>
                        <el-table-column
                            prop="price"
                            label="金额">
                        </el-table-column>
                        <el-table-column
                        fixed="right"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button
                            @click.native.prevent="deleteRow(scope.$index, tableData)"
                            type="text"
                            size="small">
                            移除
                            </el-button>
                        </template>
                        </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-aside>
            <el-container>
                <el-main>
                    <router-view></router-view>  
                </el-main>                
            </el-container>
        </el-container>
        <el-footer>
            <el-button type="success">清空</el-button>
            <el-button class="last-child" type="success">结账</el-button>
        </el-footer>
        </el-container>
    </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
      serveTableData:[
          {
              name:"服务一",
              number:888,
              price:888
          },
          {
              name:"服务二",
              number:888,
              price:888
          },
      ],
      goodsTableData:[
          {
              name:"商品一",
              number:888,
              price:888
          },
          {
              name:"商品二",
              number:888,
              price:888
          }
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      if(tab.label=="商品"){
          this.$router.push('/cashierDesk/goodsDesk')
      }else if(tab.label=="服务"){
          this.$router.push('/cashierDesk/serverDesk')
      }
    },
    deleteRow(index, rows) {
        rows.splice(index, 1);
    }
  },
  mounted:function(){
    this.$router.push('/cashierDesk/goodsDesk');
}
};

</script>
<style scoped>
.cashierDesk .el-header>span{
    font-size:28px;
    color:orange;
    position:relative;
    top:20px;
}
.cashierDesk .el-header{
    padding:10;
    background:black;
}
.el-aside {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.cashierDesk .el-main {
  width: 100%;
  background-color: #e9eef3;
  color: #333; 
}
.el-tab-pane{
    height:730px;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-aside {
    line-height: 0;
}
.el-footer{
    background: #C0C0C0;
    padding-top:10px;
}
.el-footer .last-child{
    float:right;
    
}
</style>
