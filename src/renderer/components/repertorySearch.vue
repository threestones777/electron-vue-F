<template>
    <div id='repertorySearch'>
        <div class="custM-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>仓库</el-breadcrumb-item>
                <el-breadcrumb-item>库存查询</el-breadcrumb-item>
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
        <el-button type="success">刷新</el-button>
        <!--表单-->
        <el-table
        :data="tableData"
        style="width: 100%">
            <el-table-column
                prop="pPic"
                label="商品图像">
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
                label="所属仓库">
            </el-table-column>
            <el-table-column
                prop="pCount"
                label="库存数量">
            </el-table-column>
            <el-table-column
                prop="pCount"
                label="商品串码">
            </el-table-column>
            <el-table-column
                prop="pCount"
                label="商品批次">
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
                label="商品单位">
            </el-table-column>
            <el-table-column
                prop="pCount"
                label="商品品牌">
            </el-table-column>
            <el-table-column
                prop="pCount"
                label="条形码">
            </el-table-column>
            <el-table-column
                prop="pCount"
                label="规格型号">
            </el-table-column>
            <el-table-column
                prop="pCount"
                label="商品货拉">
            </el-table-column>
            <el-table-column
                prop="pCount"
                label="库存预警">
            </el-table-column>
            <el-table-column
                prop="pRemark"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="dialogVisible = true">详情</el-button>
                    </template>
            </el-table-column>        
        </el-table>
        <!--弹窗-->        
        <el-dialog
            title="商品出入库明细"
            :visible.sync="dialogVisible"
            width="80%"
            :before-close="handleClose">
            <el-input v-model="input" placeholder="开始时间"></el-input>
            <el-input v-model="input" placeholder="结束时间"></el-input>
            <el-select v-model="value" placeholder="单据类型">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button type="success">导出</el-button>
            <el-button type="success">刷新</el-button>  
            <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column
                    prop="pPic"
                    label="操作时间">
                </el-table-column>
                <el-table-column
                    prop="pProp"
                    label="单据类型	">
                </el-table-column>
                <el-table-column
                    prop="pId"
                    label="单据编号">
                </el-table-column>
                <el-table-column
                    prop="pClass"
                    label="商品数量">
                </el-table-column>        
            </el-table>
        </el-dialog>
        <!--分页显示-->        
        <el-pagination
            layout="prev, pager, next"
            :total="1000">
        </el-pagination>        
    </div>
</template>
<style>
    #repertorySearch{
        text-align:center;
        margin: 20px;
    }
    #repertorySearch .custM-header{
        text-align:left;
    }
    #repertorySearch .el-input{
        width:10%;
    }
    #repertorySearch .el-select{
        width:10%;
    }
    #repertorySearch .el-select>.el-input{
        width:100%;
    }
    #repertorySearch .el-table{
        margin-top:20px;
    }
    #repertorySearch .el-pagination{
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
            dialogVisible:false,
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
    },
    methods:{
        handleClose(done) {
            done();
        }
    }
}
</script>