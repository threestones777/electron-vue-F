<template>
    <div id='codeFollowList'>
        <div class="custM-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>报表</el-breadcrumb-item>
                <el-breadcrumb-item>串码跟踪表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-input v-model="input" placeholder="商品名称/首拼"></el-input>
        <el-input v-model="input" placeholder="串码"></el-input>
        <el-select v-model="value" placeholder="全部状态">
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
                prop="pPic"
                align='center'
                label="商品名称">
            </el-table-column>
            <el-table-column
                prop="pProp"
                align='center'
                label="辅助属性">
            </el-table-column>
            <el-table-column
                prop="pId"
                align='center'
                label="串码">
            </el-table-column>
            <el-table-column
                prop="pClass"
                align='center'
                label="串码状态">
            </el-table-column>
            <el-table-column
                prop="pRemark"
                align='center'
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="dialogDetail = true">详情</el-button>
                    </template>
            </el-table-column>        
        </el-table>
        <!--详情弹窗-->        
        <el-dialog width="80%" title="串码出入库明细" :visible.sync="dialogDetail">
            <!---->
            商品名称 :<el-input v-model="orderDate"></el-input>
            辅助属性 :<el-input v-model="orderId" placeholder="无"></el-input>
            串码 :<el-input v-model="orderId" placeholder="111"></el-input>
            <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column
                    prop="pMsg"
                    align="center"
                    label="单据时间">
                </el-table-column>
                <el-table-column
                    prop="pId"
                    align="center"
                    label="单据类型">
                </el-table-column>
                <el-table-column
                    prop="pCount"
                    align="center"
                    label="单据编码">
                </el-table-column>       
            </el-table>
            <!--分页-->
            <el-pagination
                layout="prev, pager, next"
                :total="1000">
            </el-pagination>               
        </el-dialog>
        <!--分页显示-->        
        <el-pagination
            layout="prev, pager, next"
            :total="1000">
        </el-pagination>        
    </div>
</template>
<style>
    #codeFollowList{
        text-align:center;
        margin: 20px;
    }
    #codeFollowList .custM-header{
        text-align:left;
    }
    #codeFollowList .el-input{
        width:10%;
    }
    #codeFollowList .el-select{
        width:10%;
    }
    #codeFollowList .el-select>.el-input{
        width:100%;
    }
    #codeFollowList .el-table{
        margin-top:20px;
    }
    #codeFollowList .el-pagination{
        text-align: right;
        margin: 20px 0;
    }
</style>

<script>
export default {
    data(){
        return {
            dialogDetail:false,
            orderDate:'',
            orderId:'',
            input:'',
            value:'',
            options: [{
          value: '选项1',
          label: '默认设置'
            }],
        tableData: [{
            pPic:'text',
            pMsg: 'text',
            pProp: 'text',
            pId: 'text',
            pClass: 'text',
            pCount: 'text',
            pRemark: 'text'
          }]
        }
    }
}
</script>