<template>
    <div id="sellProfitList">
        <div class="custM-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>报表</el-breadcrumb-item>
                <el-breadcrumb-item>销售利润表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-select v-model="value" placeholder="全部单据">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select> 
        <!--弹出窗口-->
        <el-input v-model="orderDate" placeholder="全部客户" @focus="selectSupplier=true"></el-input>        
        <el-dialog
        title="选择客户"
        :visible.sync="selectSupplier"
        width="95%"
        :before-close="handleClose">
            名称 :<el-input v-model="orderDate" placeholder="客户名称"></el-input>          
            编号 :<el-input v-model="orderDate" placeholder="客户编号"></el-input>          
            联系人 :<el-input v-model="orderDate" placeholder="联系人"></el-input>          
            联系电话 :<el-input v-model="orderDate" placeholder="联系电话"></el-input>          
            备注信息 :<el-input v-model="orderDate" placeholder="备注信息"></el-input> 
            <el-button type="success">搜索</el-button>
            <el-table
            ref="multipleTable"
            :data="tableData3"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                label="客户名称"
                align='center'
                width="100">
                <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                prop="name"
                label="客户编号"
                align='center'
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="联系人"
                align='center'
                width="90">
                </el-table-column>
                <el-table-column
                prop="name"
                label="联系电话"
                align='center'
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="生日"
                align='center'
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="客户地址"
                align='center'
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="客户积分"
                align='center'
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="社交账户"
                align='center'
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="邮箱地址"
                align='center'
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="开户名"
                align='center'
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="开户行"
                align='center'
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="银行账户"
                align='center'
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="税号"
                align='center'
                width="100">
                </el-table-column>
                <el-table-column
                prop="address"
                label="备注信息"
                align='center'
                show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </el-dialog> 
        <!---->               
        <el-select v-model="value" placeholder="全部制单人">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>      
        <el-button type="success">搜索</el-button>
        <el-button type="success">导出</el-button>
        <el-button type="success">刷新</el-button>
        <el-table
        :data="tableData"
        style="width: 100%">
            <el-table-column
                prop="pMsg"
                align='center'
                label="单据日期">
            </el-table-column>
            <el-table-column
                prop="pProp"
                align='center'
                label="单据类型">
            </el-table-column>
            <el-table-column
                prop="pId"
                align='center'
                label="单据编码">
            </el-table-column>
            <el-table-column
                prop="pClass"
                align='center'
                label="客户">
            </el-table-column>
            <el-table-column
                prop="pCount"
                align='center'
                label="制单人">
            </el-table-column>
            <el-table-column
                prop="pRemark"
                align='center'
                label="数量">
            </el-table-column>        
            <el-table-column
                prop="pMsg"
                align='center'
                label="销售收入">
            </el-table-column>
            <el-table-column
                prop="pId"
                align='center'
                label="销售成本">
            </el-table-column>               
            <el-table-column
                prop="pRemark"
                align='center'
                label="销售毛利">
            </el-table-column>      
            <el-table-column
                prop="pRemark"
                align='center'
                label="毛利率">
            </el-table-column>      
            <el-table-column
                prop="pRemark"
                align='center'
                label="优惠金额">
            </el-table-column>      
            <el-table-column
                prop="pRemark"
                align='center'
                label="销售净利润">
            </el-table-column>      
            <el-table-column
                prop="pRemark"
                align='center'
                label="净利润率">
            </el-table-column>      
            <el-table-column
                prop="pRemark"
                align='center'
                label="应收金额">
            </el-table-column>      
            <el-table-column
                prop="pRemark"
                align='center'
                label="实收金额">
            </el-table-column>      
            <el-table-column
                prop="pRemark"
                align='center'
                label="单据备注">
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
    #sellProfitList{
        text-align:center;
        margin: 20px;
    }
    #sellProfitList .el-dialog .el-input{
       width:10%;
    }
    #sellProfitList .custM-header{
        text-align:left;
    }
    #sellProfitList .el-select{
        width:100px;
    }
    #sellProfitList .el-input{
        width:100px;
    }
    #sellProfitList .el-table{
        margin:20px 0;
    } 
    #sellProfitList .el-pagination{
        text-align: right;
        margin: 20px 0;
    }
</style>    
<script>
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
        tableData: [{
            pMsg: 'text',
            pProp: 'text',
            pId: 'text',
            pClass: 'text',
            pCount: 'text',
            pRemark: 'text'
          }],
          tableData3: [{
          date: 'text',
          name: 'text',
          address: 'text'
        }],
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
    }
  }
</script>
