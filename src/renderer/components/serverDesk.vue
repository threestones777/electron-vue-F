<template>
    <div id="serverDesk">
        <div class="title">
            <span>服务</span>
            <el-input v-model="input"></el-input>
            <el-button type="success">搜索</el-button>
        </div>
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="6">
                <div class="goodsT">
                    <p>server</p>
                    <span>2000元</span>
                </div>
            </el-col>            
            <el-col :span="6">
                <div class="goodsT">
                    <p>工时费</p>
                    <span>1000元</span>
                </div>
            </el-col>            
        </el-row>
    </div>
</template>
<style>
    #serverDesk{
        height:830px;
        margin:20px;
    }
    #serverDesk .el-row{
        margin-top:20px;
    }
    #serverDesk>.title{        
        border-bottom:1px dotted gray;
        padding-bottom:30px;
    }
    #serverDesk>div>span{
        font-size:30px;
        display: inline-block;
        padding:10px 0 0 0;
    }
    #serverDesk .el-button{
        float:right;
    }
    #serverDesk .el-input{
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