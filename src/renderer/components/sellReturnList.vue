<template>
    <div id="shopReturnList">
        <div class="custM-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>销货</el-breadcrumb-item>
                <el-breadcrumb-item>销货退货单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--弹出窗口-->
        客户:<el-input v-model="orderDate" placeholder="请点击选择" @focus="selectSupplier=true"></el-input>        
        <el-dialog
        title="选择客户"
        :visible.sync="selectSupplier"
        width="95%"
        :before-close="handleClose">
            名称 :<el-input v-model="orderDate" placeholder="客户名称"></el-input>          
            编号 :<el-input v-model="orderDate" placeholder="客户编号"></el-input>          
            联系人 :<el-input v-model="orderDate" placeholder="联系人"></el-input>          
            手机号 :<el-input v-model="orderDate" placeholder="手机号"></el-input>          
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
                width="100">
                <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                prop="name"
                label="客户编号"
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="联系人"
                width="90">
                </el-table-column>
                <el-table-column
                prop="name"
                label="手机号"
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="生日"
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="客户地址"
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="客户积分"
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="社交账号"
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="邮箱地址"
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="开户名"
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="开户行"
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="银行账户"
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="税号"
                width="100">
                </el-table-column>
                <el-table-column
                prop="address"
                label="备注信息"
                show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </el-dialog> 
        <!---->
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
                prop="pCount"
                label="商品批次">
            </el-table-column>
            <el-table-column
                prop="pRemark"
                label="商品串码">
            </el-table-column>        
            <el-table-column
                prop="pMsg"
                label="数量">
            </el-table-column>
            <el-table-column
                prop="pProp"
                label="退货单价">
            </el-table-column>
            <el-table-column
                prop="pId"
                label="退货金额">
            </el-table-column>
            <el-table-column
                prop="pClass"
                label="备注信息">
            </el-table-column>    
        </el-table>
        <!--分页-->
        <el-pagination
            layout="prev, pager, next"
            :total="1000">
        </el-pagination>
        单据金额：<el-input v-model="input" placeholder="单据金额"></el-input>
        实际金额：<el-input v-model="input" placeholder="0"></el-input>
        实付金额：<el-input v-model="input" placeholder="请输入实付金额"></el-input><br><br>
        备注信息：<el-input v-model="input" placeholder="请输入备注信息"></el-input>
        制单人:
        <el-select v-model="value" placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select><br><br>
        结算账户:
        <el-select v-model="value" placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select> <br><br> 
        <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>      
    </div>
</template>
<style>
    #shopReturnList{
        text-align:center;
        margin: 20px;
    }
    #shopReturnList .el-dialog .el-input{
       width:10%;
    }
    #shopReturnList .custM-header{
        text-align:left;
    }
    #shopReturnList .el-select{
        width:100px;
    }
    #shopReturnList .el-input{
        width:200px;
    }
    #shopReturnList .el-table{
        margin:20px 0;
    } 
    #shopReturnList .el-pagination{
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
          label: '10条记录'
        }, {
          value: '选项2',
          label: '25条记录'
        }, {
          value: '选项3',
          label: '50条记录'
        }, {
          value: '选项4',
          label: '100条记录'
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