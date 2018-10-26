<template>
    <div id="shopBuyList">
        <div class="custM-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>购货</el-breadcrumb-item>
                <el-breadcrumb-item>购货单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="spb">
            <span>每页</span>
            <el-select v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <!--弹出窗口-->
        供应商 :<el-input v-model="orderDate" placeholder="请点击选择" @focus="selectSupplier=true"></el-input>        
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
                prop="name"
                label="姓名"
                width="90">
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
        <el-button type="success">重新载入</el-button><br> <br>       
        <el-table
            :data="tableData"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
            >
            <el-table-column
            prop="date"
            label="商品信息"
            sortable>
            </el-table-column>
            <el-table-column
            prop="name"
            label="辅助属性"
            sortable>
            </el-table-column>
            <el-table-column
            prop="date"
            label="所入仓库（批量）"
            sortable>
            </el-table-column>
            <el-table-column
            prop="name"
            label="商品编号"
            sortable>
            </el-table-column>
            <el-table-column
            prop="date"
            label="条形码"
            sortable>
            </el-table-column>
            <el-table-column
            prop="name"
            label="库存警告"
            sortable>
            </el-table-column>
            <el-table-column
            prop="date"
            label="赠送积分"
            sortable>
            </el-table-column>
            <el-table-column
            prop="name"
            label="商品串码"
            sortable>
            </el-table-column>
            <el-table-column
            prop="date"
            label="数量"
            sortable>
            </el-table-column>
            <el-table-column
            prop="name"
            label="购货单价"
            sortable>
            </el-table-column>
            <el-table-column
            prop="date"
            label="购货金额"
            sortable>
            </el-table-column>
            <el-table-column
            prop="name"
            label="商品批次"
            sortable>
            </el-table-column>
            <el-table-column
            prop="date"
            label="备注信息"
            sortable>
            </el-table-column>
        </el-table><br> <br>  
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
    #shopBuyList{
        text-align:center;
        margin: 20px;
    }
    #shopBuyList .spb{
        text-align: left;
        margin-bottom:20px;
    }
    #shopBuyList .el-dialog .el-input{
       width:10%;
    }
    #shopBuyList .custM-header{
        text-align:left;
    }
    #shopBuyList .el-select{
        width:100px;
    }
    #shopBuyList .el-input{
        width:200px;
    }
    #shopBuy .el-table{
        margin:20px 0;
    } 
    #shopBuyList .el-pagination{
        text-align: right;
        margin-bottom:20px;
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
          date: 'text',
          name: 'text',
          address: 'text'
        }],
        tableData3: [{
          date: 'text',
          name: 'text',
          address: 'text',
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
      },
      formatter(row, column) {
        return row.address;
      }
    }
  }
</script>