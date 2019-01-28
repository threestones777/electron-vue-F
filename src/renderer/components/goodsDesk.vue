<template>
    <div id="goodsDesk">
        <div style="background:#fff">
            <div style="margin:10px 20px 0 20px">
                <h1 style="position:absolute;top:50px;left:380px;">
                    <img src="./../assets/images/search.png" style="position:absolute;left:10px;top:10px;z-index:20;">
                    <el-input id="test" v-model="goodsSe" @input="goodsSearch" placeholder="商品名称/首拼字母/条形码" style="width:250px;"></el-input>
                </h1>
                <div>
                    <el-card @click.native="addGoods(index)" shadow="hover" style="width:200px;margin:20px 20px 0 20px;display:inline-block" v-for="(goods,index) in goodsForms" :key="index">
                        <img :src="goods.goods_img" style="width:100%;height:100px;margin-bottom:10px;" :title="goods.goods_id"  class="getId"/>
                        <span style="font-size:16px;font-weight:bold;display:block;height:32px;overflow:hidden" :title="goods.goods_name">{{goods.goods_name}}</span>
                        <span style="font-size:16px;color:#FF7815;display:block;margin-top:10px;">￥{{goods.shop_price}}</span>
                        <p style="font-size:16px;color:#999999;margin-top:10px;">库存：{{goods.goods_number}}</p>
                        <!-- <p style="color:#999999;margin-top:10px;">积分：{{goods.integral}}</p> -->
                    </el-card>
                </div>
                <br><br>
                <div style="height:50px;margin:0 auto;">
                    <el-pagination style="text-align:center"
                        @current-change="handleCurrentChange"
                        layout="total,prev, pager, next,jumper"
                        :page-size="8"
                        :total="total">
                    </el-pagination>
                </div>
                    
            </div>            
        </div>
    </div>
</template>
<style>
    #goodsDesk{
        height:800px;
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
    /* #goodsDesk .el-pagination{
        float:right;
    } */
    #test{
        padding-left:40px; 
    }
</style>
<script>
import {goodsDesk,cart} from '../api/apiW' ;
export default {
    data(){
        return {
            input:'',
            total:0,
            goodsSe:'',
            goodsForms:[],
        }
    },
    methods:{
        init(page){
            let data=this.$qs.stringify({
                page:page,
                page_size:8
            });
            this.data(data);
        },
        data(data){
            goodsDesk(data).then(res=>{
                console.log(res.data.goods);
                this.total = Number(res.data.record_count);
                this.goodsForms=res.data.goods;
                console.log(this.goodsForms);
            });
        },
        handleCurrentChange(val) {
            this.init(val);  
        },
        addGoods(index){
            let id=document.getElementsByClassName('getId')[index].title;
            console.log("商品ID"+id);
            goodsDesk().then(res=>{ //传递商品信息
                console.log(res.data.goods[index]); 
                const goodsData = res.data.goods[index];
                //this.$emit('addGoods', goodsData);
                this.$emit('addGoods', id);
            });
        },
        goodsSearch(){
            let data=this.$qs.stringify({
                page:1,
                page_size:8,
                goods_name:this.goodsSe,
            });
            this.data(data);
        },
    },
    created:function(){
        this.init(1);
    }
}
</script>