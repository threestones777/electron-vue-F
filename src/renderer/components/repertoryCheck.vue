<template>
    <div id='repertoryCheck'>
        <div class="custM-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>仓库</el-breadcrumb-item>
                <el-breadcrumb-item>库存盘点</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-input v-model="input" placeholder="商品名称"></el-input>
        <el-input v-model="input" placeholder="商品编号"></el-input>
        <el-select v-model="value" placeholder="所属仓库">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-input v-model="input" placeholder="全部分类"></el-input>
        <el-button type="success">搜索</el-button>
        <el-button type="success">导出</el-button>
        <el-button type="success">生成盘点单据</el-button>
        <el-button type="success">刷新</el-button>
        <!--表单-->
        <el-table
        :data="tableData"
        style="width: 100%">
            <el-table-column
                prop="pPic"
                label="所属仓库">
            </el-table-column>
            <el-table-column
                prop="pProp"
                label="商品名称	">
            </el-table-column>
            <el-table-column
                prop="pId"
                label="辅助属性">
            </el-table-column>
            <el-table-column
                prop="pClass"
                label="商品品牌">
            </el-table-column>
            <el-table-column
                prop="pCount"
                label="商品编号">
            </el-table-column>
            <el-table-column
                prop="pCount"
                label="商品分类">
            </el-table-column>
            <el-table-column
                prop="pCount"
                label="规格型号">
            </el-table-column>
            <el-table-column
                prop="pCount"
                label="条形码">
            </el-table-column>
            <el-table-column
                prop="pCount"
                label="商品单位">
            </el-table-column>
            <el-table-column
                prop="pCount"
                label="库存预警">
            </el-table-column>
            <el-table-column
                prop="pCount"
                label="商品货拉">
            </el-table-column>
            <el-table-column
                prop="pCount"
                label="赠送积分">
            </el-table-column>
            <el-table-column
                prop="pCount"
                label="零售名称">
            </el-table-column>
            <el-table-column
                prop="pCount"
                label="商品批次">
            </el-table-column>
            <el-table-column
                prop="pCount"
                label="商品串码">
            </el-table-column>
            <el-table-column
                prop="pRemark"
                label="当前库存">
            </el-table-column>        
            <el-table-column
                prop="pRemark"
                label="盘点库存">
            </el-table-column>        
            <el-table-column
                prop="pRemark"
                label="盘点盈亏">
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
    #repertoryCheck{
        text-align:center;
        margin: 20px;
    }
    #repertoryCheck .custM-header{
        text-align:left;
    }
    #repertoryCheck .el-input{
        width:10%;
    }
    #repertoryCheck .el-select{
        width:10%;
    }
    #repertoryCheck .el-select>.el-input{
        width:100%;
    }
    #repertoryCheck .el-table{
        margin-top:20px;
    }
    #repertoryCheck .el-pagination{
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