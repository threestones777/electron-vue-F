<template>
    <div id="goodsDesk">
        <div class="title">
            <span>商品</span>
            <!-- <el-row :gutter="20" style="width:400px;position:relative;left:-15px;top:5px;margin-top:0px;float:right;">
                <el-col :span="6"><el-button type="text" style="color:black">删除</el-button></el-col>
                <el-col :span="6"><el-button type="text" style="color:black">挂单</el-button></el-col>
                <el-col :span="6"><el-button type="text" style="color:black">提单</el-button></el-col>
                <el-col :span="6"><el-button type="text" style="color:black">清空</el-button></el-col>
            </el-row> -->
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
                <el-card @click.native="addGoods(index)" shadow="hover" style="width:19%;margin:20px 20px 0 20px;display:inline-block" v-for="(goods,index) in goodsForms" :key="index">
                    <img src="../assets/images/goods.png" style="width:100%;margin-bottom:10px;" :title="goods.goods_id"  class="getId"/>
                    <span style="font-weight:bold;display:block;height:20px;overflow:hidden" :title="goods.goods_name">{{goods.goods_name}}</span>
                    <span style="color:#FF7815;display:block;margin-top:10px;">￥{{goods.shop_price}}</span>
                    <p style="color:#999999;margin-top:10px;">库存：{{goods.goods_number}}</p>
                    <p style="color:#999999;margin-top:10px;">位置：{{goods.integral}}</p>
                </el-card>
            </div>            
        </div>
    </div>
</template>
<style>
    #goodsDesk{
        border:1px solid #f4f4f4;
    }
    #goodsDesk .el-row{
        margin-top:20px;
    }
    #goodsDesk>.title{        
        background:  #FFF;
        padding-bottom:15px;
        height:50px;
    }
    #goodsDesk>div>span{
        font-size:30px;
        font-weight:bold;
        display: inline-block;
        position: relative;
        top:20px;
        right:-15px;
    }
    #goodsDesk .el-input{
        width:30%;
    }
</style>
<script>
import {goodsDesk,cart} from '../api/apiW' ;
export default {
    data(){
        return {
            input:'',
            goodsForms:[]
        }
    },
    methods:{
        addGoods(index){
            let id=document.getElementsByClassName('getId')[index].title;
            console.log("商品ID"+id);
            goodsDesk().then(res=>{ //传递商品信息
                console.log(res.data.goods[index]); 
                const goodsData = res.data.goods[index];
                this.$emit('addGoods', goodsData);
            });
        }
    },
    created:function(){
        goodsDesk().then(res=>{
            console.log(res.data.goods);
            this.goodsForms=res.data.goods;
            console.log(this.goodsForms);
        });
    }
}
</script>