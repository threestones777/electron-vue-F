<template>
    <div id="serverCheckList">
        <div class="custM-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>报表</el-breadcrumb-item>
                <el-breadcrumb-item>服务对账单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-input v-model="orderDate" placeholder="单据编号"></el-input>
        <el-input v-model="orderDate" placeholder="开始日期"></el-input>
        <el-input v-model="orderDate" placeholder="结束日期"></el-input>        
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
                label="单据编号">
            </el-table-column>
            <el-table-column
                prop="pId"
                align='center'
                label="供应商">
            </el-table-column>
            <el-table-column
                prop="pClass"
                align='center'
                label="结算账户	">
            </el-table-column>
            <el-table-column
                prop="pCount"
                align='center'
                label="单据金额">
            </el-table-column>
            <el-table-column
                prop="pRemark"
                align='center'
                label="优惠金额">
            </el-table-column>        
            <el-table-column
                prop="pMsg"
                align='center'
                label="实付金额">
            </el-table-column>
            <el-table-column
                prop="pId"
                align='center'
                label="制单人">
            </el-table-column>               
            <el-table-column
                prop="pRemark"
                align='center'
                label="付款状态">
            </el-table-column>
            <el-table-column
                prop="pRemark"
                align='center'
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="dialogDetail = true">详情</el-button>
                        <el-button type="text" size="small" @click="capitalOperation = true">资金操作</el-button>
                    </template>
            </el-table-column>         
        </el-table>
        <!--资金操作弹窗-->        
        <el-dialog width="80%" title="资金操作" :visible.sync="capitalOperation">
            <div class="capital">
                资金金额：<el-input style="width:30%"></el-input>
                实付金额：<el-input style="width:30%"></el-input>
                <hr style="border:1px dashed #DCDFE6"/>
                结算账户：<el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select><br><br>
                结算账户：<el-input style="width:30%"></el-input>
                结算金额：<el-input style="width:30%"></el-input>   
                <hr style="border:1px dashed #DCDFE6"/>  
                    <el-table
                    :data="tableData3"
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="操作时间"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="结算账户"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="结算金额">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="制单人"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="备注信息"
                        width="180">
                    </el-table-column>
                    <el-table-column
                prop="pRemark"
                align='center'
                label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">删除</el-button>
                    </template>
            </el-table-column> 
                    </el-table>           
            </div>
        </el-dialog>
        <!--详情弹窗-->        
        <el-dialog width="80%" title="服务订单详情" :visible.sync="dialogDetail">
            <!--客户弹窗-->            
            客户 :<el-input v-model="orderDate" placeholder="请点击选择" @focus="select=true"></el-input>        
            <el-dialog
            title="选择客户"
            :visible.sync="select"
            width="75%" :modal-append-to-body='false'
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
                    label="联系电话"
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
            <el-button type="success">反审核数据</el-button>
            <el-button type="success">重新载入</el-button>
            <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column
                    prop="pMsg"
                    label="服务项目">
                </el-table-column>
                <el-table-column
                    prop="pId"
                    label="服务数量">
                </el-table-column>
                <el-table-column
                    prop="pCount"
                    label="商品串码">
                </el-table-column>                  
                <el-table-column
                    prop="pRemark"
                    label="服务价格">
                </el-table-column>        
                <el-table-column
                    prop="pRemark"
                    label="总金额">
                </el-table-column>    
                <el-table-column
                    prop="pRemark"
                    label="备注信息">
                </el-table-column> 
                <el-table-column
                prop="pRemark"
                align='center'
                label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">删除</el-button>
                    </template>
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
        </el-dialog>
        <!--分页-->
        <el-pagination
            layout="prev, pager, next"
            :total="1000">
        </el-pagination>     
    </div>
</template>
<style>
    #serverCheckList{
        text-align:center;
        margin: 20px;
    }
    #serverCheckList .custM-header{
        text-align:left;
    }
    #serverCheckList .el-select{
        width:100px;
    }
    #serverCheckList .el-input{
        width:100px;
    }
    #serverCheckList .el-table{
        margin:20px 0;
    } 
    #serverCheckList .el-pagination{
        text-align: right;
        margin: 20px 0;
    }
</style>    
<script>
  export default {
    data() {
      return {
        dialogDetail:false,
        select:false,
        selectSupplier:false,
        capitalOperation:false,
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
