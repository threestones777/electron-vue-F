<template>
    <div id='companyDebtList'>
        <div class="custM-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>报表</el-breadcrumb-item>
                <el-breadcrumb-item>往来单位欠款表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-input v-model="input" placeholder="单位编号"></el-input>
        <el-input v-model="input" placeholder="单位名称"></el-input>
        <el-select v-model="value" placeholder="客户">
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
                label="单位编号">
            </el-table-column>
            <el-table-column
                prop="pProp"
                align='center'
                label="单位名称">
            </el-table-column>
            <el-table-column
                prop="pId"
                align='center'
                label="单位类型">
            </el-table-column>
            <el-table-column
                prop="pClass"
                align='center'
                label="欠款金额">
            </el-table-column>        
        </el-table>
        <!--分页显示-->        
        <el-pagination
            layout="prev, pager, next"
            :total="1000">
        </el-pagination>        
    </div>
</template>
<style>
    #companyDebtList{
        text-align:center;
        margin: 20px;
    }
    #companyDebtList .custM-header{
        text-align:left;
    }
    #companyDebtList .el-input{
        width:10%;
    }
    #companyDebtList .el-select{
        width:10%;
    }
    #companyDebtList .el-select>.el-input{
        width:100%;
    }
    #companyDebtList .el-table{
        margin-top:20px;
    }
    #companyDebtList .el-pagination{
        text-align: right;
        margin: 20px 0;
    }
</style>

<script>
export default {
    data(){
        return {
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