<template>
    <div id='dataInit'>
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>报表</el-breadcrumb-item>
                <el-breadcrumb-item>数据初始化</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="notice">
            <h1>功能须知</h1>
            <p>1.数据初始化将重新统计商品类型的单据数据。</p>
            <p>2.初始化操作很耗费系统资源，建议闲暇时执行。</p>
            <p>3.初始化过程中禁止对系统其他模块进行操作。</p>
            <p>4.操作过程中须保持互联网通讯，请勿手动终止。</p>
            <p>5.如操作过程中断，需重新执行初始化操作。</p>
            <p>6.如果在使用过程中遇到问题，请联系客服解决。</p>
            <el-button type="primary">开始初始化</el-button>
        </div>
    </div>
</template>
<style>
    #dataInit{
        margin: 20px;
    }
    #dataInit .main-header{
        text-align:left;
        margin-bottom: 10px;
        padding: 10px;
        background: #fff;
    }
    #dataInit .main-header .el-breadcrumb {
        margin: 8px 0 0 10px;
    }
    #dataInit .notice{
        margin:0 auto; 
        width:30%; 
        margin-top:150px;
    }
</style>
