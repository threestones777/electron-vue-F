<template>
    <div id="buyLimit">
        <div class="title">
            <span>挂单</span>
            <el-row :gutter="20" style="width:400px;position:relative;left:-15px;top:5px;margin-top:0px;float:right;">
                <el-col :span="6"><el-button type="text" style="color:black">删除</el-button></el-col>
                <el-col :span="6"><el-button type="text" style="color:black">挂单</el-button></el-col>
                <el-col :span="6"><el-button type="text" style="color:black">提单</el-button></el-col>
                <el-col :span="6"><el-button type="text" style="color:black">清空</el-button></el-col>
            </el-row>
        </div>
        <div style="background:#F5F5F5">
            <!-- <div style="padding:20px;">
                <el-button size="medium" style="background:#FF7815;color:#fff"><img src="../assets/images/vip.png" style="vertical-align:middle;">&nbsp;&nbsp;会员</el-button>
                <img src="../assets/images/scan.png" style="position:relative;top:5px;left:30px;z-index:7;">
                <el-input placeholder="     输入或扫描商品二维码" style="margin-right:50px"></el-input>
                <el-input prefix-icon="el-icon-search" placeholder="商品名称/首拼字母/条形码"></el-input>
            </div> -->
            <div style="margin:20px">
                <h1 style="font-size:22px;font-weight:bold;">商品列表</h1>
                <el-col :span="5">
                    <el-card shadow="hover">
                        <img src="../assets/images/goods.png" style="width:100%;margin-bottom:10px;">
                        <span style="font-weight:bold">商品1</span>
                        <span style="float:right;color:#FF7815;">￥590</span>
                        <p style="color:#999999;margin:10px;">库存：56</p>
                       <p style="color:#999999;margin:10px;">位置：一号仓库</p>
                    </el-card>
                </el-col>
                
            </div>
            
        </div>
    </div>
</template>
<style>
    #buyLimit{
        border:1px solid #f4f4f4;
    }
    #buyLimit .el-row{
        margin-top:20px;
    }
    #buyLimit>.title{        
        background:  #FFF;
        padding-bottom:15px;
        height:50px;
    }
    #buyLimit>div>span{
        font-size:30px;
        font-weight:bold;
        display: inline-block;
        position: relative;
        top:20px;
        right:-15px;
    }
    #buyLimit .el-input{
        width:30%;
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