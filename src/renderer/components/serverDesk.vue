<template>
    <div id="serverDesk">
        <div style="background:#F5F5F5">
            <!-- <div style="padding:20px;">
                <el-button size="medium" style="background:#FF7815;color:#fff"><img src="../assets/images/vip.png" style="vertical-align:middle;">&nbsp;&nbsp;会员</el-button>
                <img src="../assets/images/scan.png" style="position:relative;top:5px;left:30px;z-index:7;">
                <el-input placeholder="     输入或扫描商品二维码" style="margin-right:50px"></el-input>
                <el-input prefix-icon="el-icon-search" placeholder="商品名称/首拼字母/条形码"></el-input>
            </div> -->
            <div style="margin:0px;background:#fff">
                <!-- <h1 style="font-size:22px;font-weight:bold;">服务列表</h1> -->
                <el-card @click.native="addServer
                (index)" shadow="hover" style="width:19%;margin:20px 20px 0 20px;display:inline-block" v-for="(server,index) in serverForms" :key="index">
                    <img src="../assets/images/goods.png" style="width:100%;margin-bottom:10px;" :title="server.goods_id"  class="getId"/>
                    <span style="font-size:16px;font-weight:bold;display:block;height:31px;overflow:hidden" :title="server.goods_name">{{server.goods_name}}</span>
                    <span style="font-size:16px;color:#FF7815;display:block;margin-top:10px;">￥{{server.shop_price}}</span>
                    <p style="font-size:16px;color:#999999;margin-top:10px;">库存：{{server.goods_id}}</p>
                    <!-- <p style="font-size:16px;color:#999999;margin-top:10px;">位置：{{server.goods_id}}</p> -->
                </el-card>
            </div>            
        </div>
    </div>
</template>
<style>
    #serverDesk{
        background:#fff;
        height:800px;
    }
    #serverDesk .el-row{
        margin-top:20px;
    }
    #serverDesk>.title{        
        background:  #FFF;
        padding-bottom:15px;
        height:50px;
    }
    #serverDesk>div>span{
        font-size:30px;
        font-weight:bold;
        display: inline-block;
        position: relative;
        top:20px;
        right:-15px;
    }
    #serverDesk .el-input{
        width:30%;
    }
</style>
<script>
import {serverDesk} from '../api/apiW' ;
export default {
    data(){
        return {
            input:'',
            serverForms:[]
        }
    },
    methods:{
        addServer(index){
            let id=document.getElementsByClassName('getId')[index].title;
            console.log("服务ID"+id);
            serverDesk().then(res=>{ //传递服务信息
                console.log(res.data.goods_list[index]); 
                const serverData = res.data.goods_list[index];
                this.$emit('addServer', serverData);
            });
        }
    },
    created:function(){
        serverDesk().then(res=>{
            console.log(res.data);
            this.serverForms=res.data.goods_list;
            console.log(this.serverForms);
        });
    }
}
</script>