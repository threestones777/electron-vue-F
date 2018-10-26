<template>
    <div id="integralExchange">
        <div class="custM-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>零售</el-breadcrumb-item>
                <el-breadcrumb-item>积分兑换</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--弹出窗口-->
        客户 :<el-input v-model="orderDate" placeholder="请点击选择" @focus="selectSupplier=true"></el-input>        
        <el-dialog
        title="选择供应商"
        :visible.sync="selectSupplier"
        width="95%"
        :before-close="handleClose">
            名称 :<el-input v-model="orderDate" placeholder="供应商名称"></el-input>          
            编号 :<el-input v-model="orderDate" placeholder="供应商编号"></el-input>          
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
                label="供应商名称"
                width="100">
                <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                prop="name"
                label="供应商编号"
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="联系人"
                width="90">
                </el-table-column>
                <el-table-column
                prop="name"
                label="联系电话"
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="供应商地址"
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="社交账户"
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
                prop="pProp"
                label="所需积分">
            </el-table-column>
            <el-table-column
                prop="pId"
                label="商品批次">
            </el-table-column>       
            <el-table-column
                prop="pMsg"
                label="商品串码">
            </el-table-column>            
            <el-table-column
                prop="pId"
                label="数量	">
            </el-table-column>
            <el-table-column
                prop="pClass"
                label="总积分">
            </el-table-column>                
            <el-table-column
                prop="pRemark"
                label="备注信息">
            </el-table-column>        
        </el-table>
        <!--分页-->
        <el-pagination
            layout="prev, pager, next"
            :total="1000">
        </el-pagination>
        单据积分：<el-input v-model="input" placeholder="单据积分"></el-input>
        实际金额：<el-input v-model="input" placeholder="0"></el-input>
        实付积分：<el-input v-model="input" placeholder="实付积分"></el-input><br><br>
        客户积分：<el-input v-model="input" placeholder="客户积分"></el-input>        
        制单人:
        <el-select v-model="value" placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select><br><br> 
        备注信息：<el-input v-model="input" placeholder="请输入备注信息"></el-input><br><br>
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
    #integralExchange{
        text-align:center;
        margin: 20px;
    }
    #integralExchange .el-dialog .el-input{
       width:10%;
    }
    #integralExchange .custM-header{
        text-align:left;
    }
    #integralExchange .el-select{
        width:100px;
    }
    #integralExchange .el-input{
        width:200px;
    }
    #integralExchange .el-table{
        margin:20px 0;
    } 
    #integralExchange .el-pagination{
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
