<template>
    <div id='shopInList'>
        <div class="custM-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>购货</el-breadcrumb-item>
                <el-breadcrumb-item>采购入库单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-input v-model="input" placeholder="商品名称/首拼"></el-input>
        <el-input v-model="input" placeholder="单据编号"></el-input>
        <el-select v-model="value" placeholder="全部制单人">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-input v-model="input" placeholder="开始时间"></el-input>
        <el-input v-model="input" placeholder="结束时间"></el-input>
        <el-select v-model="value" placeholder="入库状态">
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
        <!--表单-->
        <el-table
        :data="tableData"
        style="width: 100%">
            <el-table-column
                prop="pMsg"
                label="单据日期">
            </el-table-column>
            <el-table-column
                prop="pProp"
                label="单据编号	">
            </el-table-column>
            <el-table-column
                prop="pId"
                label="制单人">
            </el-table-column>
            <el-table-column
                prop="pClass"
                label="入库状态	">
            </el-table-column>
            <el-table-column
                prop="pCount"
                label="单据备注">
            </el-table-column>
            <el-table-column
                prop="pRemark"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="print=true">打印</el-button>
                        <el-button type="text" size="small" @click="dialogDetail = true">详情</el-button>
                    </template>
            </el-table-column>        
        </el-table>
        <!--打印弹窗-->        
        <el-dialog width="50%" title="采购入库单-打印" :visible.sync="print" :before-close="handleClose">
            <div class="print">
                <h3>如果您需要打印样式，请参考以下说明操作</h3>
                <p>1.在线打印及设计需安装扩展程序，您可点击下方按钮，然后按照提示安装即可</p>
                <p>2.系统在初始化时已经带有打印样式，如不满足您的实际需求，请点击设计报表后保存即可</p>
                <p>3.默认纸张可在系统设置中选择，表格数据内容会自动分页，除表格内容外的元素均可修改</p>
                <p>4.如您在设计单据的过程中误操作导致表格样式错乱，您可点击下方恢复默认按钮即可恢复</p>
                <p>5.请使用谷歌内核浏览器或IE11以上版本，360浏览器、腾讯浏览器等请开启急速模式</p>
                <p>6.如您在设计报表样式中遇到问题，可到APE软件官网寻求解决方案</p>
                <p>7.在线打印及设计需安装扩展程序，您可点击下方按钮，然后按照提示安装即可</p>
            </div>
            <div>
                <el-button type="success">打印报表</el-button>
                <el-button>设计报表</el-button>
                <el-button type="info">恢复默认</el-button>
            </div>
        </el-dialog>
        <!--详情弹窗-->        
        <el-dialog width="80%" title="采购入库单详情" :visible.sync="dialogDetail">
            <!--供应商弹窗-->            
            供应商 :<el-input v-model="orderDate" placeholder="请点击选择" @focus="selectSupplier=true"></el-input>        
            <el-dialog title="选择供应商" :visible.sync="selectSupplier" width="75%" :modal-append-to-body='false' :before-close="handleClose">
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
                    label="所属仓库">
                </el-table-column>
                <el-table-column
                    prop="pId"
                    label="当前库存">
                </el-table-column>
                <el-table-column
                    prop="pClass"
                    label="商品编码	">
                </el-table-column>
                <el-table-column
                    prop="pCount"
                    label="商品分类">
                </el-table-column>
                <el-table-column
                    prop="pRemark"
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
                    label="退货单价	">
                </el-table-column>
                <el-table-column
                    prop="pCount"
                    label="退货金额">
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
        <!--分页显示-->        
        <el-pagination
            layout="prev, pager, next"
            :total="1000">
        </el-pagination>        
    </div>
</template>
<style>
    #shopInList{
        text-align:center;
        margin: 20px;
    }
    #shopInList .custM-header{
        text-align:left;
    }
    #shopInList .el-input{
        width:10%;
    }
    #shopInList .el-select{
        width:10%;
    }
    #shopInList .el-select>.el-input{
        width:100%;
    }
    #shopInList .el-table{
        margin-top:20px;
    }
    #shopInList .el-pagination{
        text-align: right;
        margin: 20px 0;
    }
    .print{
        text-align: left;
        margin-bottom:40px;
    }
    .print>h3{
        font-size:20px;
        font-weight:bold;
        margin:10px;
    }
    .print p{
        margin:5px;
    }
</style>
<script>
export default {
    data(){
        return {
            input:'',
            value:'',
            dialogDetail:false,
            selectSupplier:false,
            print:false,
            orderDate:'',
            orderId:'',
            options: [{
          value: '选项1',
          label: '默认设置'
            }],
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
