<template>
    <div id="goodsDesk">
        <div class="title">
            <span>商品</span>
            <el-input v-model="input"></el-input>
            <el-button type="success">搜索</el-button>
        </div>
        <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6">
                <div class="goodsT">
                    <p>测试1</p>
                    <span>一号仓库/无</span>
                    <span>2000元</span>
                </div>
            </el-col>            
            <el-col :span="6">
                <div class="goodsT">
                    <p>测试2</p>
                    <span>一号仓库/无</span>
                    <span>2000元</span>
                </div>
            </el-col>            
            <el-col :span="6">
                <div class="goodsT">
                    <p>测试3</p>
                    <span>一号仓库/无</span>
                    <span>2000元</span>
                </div>
            </el-col>            
            <el-col :span="6">
                <div class="goodsT">
                    <p>测试4</p>
                    <span>一号仓库/无</span>
                    <span>2000元</span>
                </div>
            </el-col>            
            <el-col :span="6">
                <div class="goodsT">
                    <p>测试5</p>
                    <span>一号仓库/无</span>
                    <span>1000元</span>
                </div>
            </el-col>            
        </el-row>
    </div>
</template>
<style>
    #goodsDesk{
        height:830px;
        margin:20px;
    }
    #goodsDesk .el-row{
        margin-top:20px;
    }
    #goodsDesk>.title{        
        border-bottom:1px dotted gray;
        padding-bottom:30px;
    }
    #goodsDesk>div>span{
        font-size:30px;
        font-weight:bold;
        display: inline-block;
        padding:10px 0 0 0;
    }
    #goodsDesk .el-button{
        float:right;
    }
    #goodsDesk .el-input{
        float:right;
        width:300px;
    }   
    .goodsT{
        width:70%;
        border:1px solid #CFCFCF;
        padding:10px;
    } 
</style>
<script>
export default {
    data(){
        return {
            input:''
        }
    }
}
</script>
