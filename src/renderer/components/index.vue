<template>
    <div id="index">
        <!-- <div id="indexH3">
           <h3>温州美联 管理中心</h3>
        </div>         -->
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="20">
                <!--  -->
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="12">
                        <p class="bigP">支付金额</p>
                        <p class="littP">￥{{todayMoney}}</p>
                        <span class="littSpan">昨日全天：￥{{yesterdayMoney}}</span>
                        <div id="first" style="width:100%;;height:200px;margin:0 auto;"></div>
                    </el-col>
                    <el-col style="background:#F8F8F8;" :span="12">
                        <el-row style="background:#F8F8F8;" type="flex" class="row-bg" justify="space-around">
                            <el-col style="padding:25px" :span="12">
                                <p class="bigP">访客数</p>
                                <p class="littP">{{todayVisitor}}</p>
                                <span class="littSpan">昨日全天：{{yesterdayVisitor}}</span>
                            </el-col>
                            <el-col style="padding:25px" :span="12">
                                <p class="bigP">浏览量</p>
                                <p class="littP">{{todayVisitor}}</p>
                                <span class="littSpan">昨日全天：{{yesterdayVisitor}}</span>
                            </el-col>
                        </el-row>
                        <el-row style="background:#F8F8F8;" type="flex" class="row-bg" justify="space-around">
                            <el-col style="padding:25px" :span="12">
                                <p class="bigP">支付订单数</p>
                                <p class="littP">{{todayOrders}}</p>
                                <span class="littSpan">昨日全天：{{yesterdayOrders}}</span>
                            </el-col>
                            <el-col style="padding:25px" :span="12">
                                <p class="bigP">支付人数</p>
                                <p class="littP">{{todayPaid}}</p>
                                <span class="littSpan">昨日全天：{{yesterdayPaid}}</span>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <!--  -->
                <el-row style="background:#F5F7FA;padding:0;" type="flex" class="row-bg" justify="space-around">
                    <el-tabs style="width:100%;margin:20px 10px 0 10px;" type="border-card" @tab-click="handleClick">
                        <el-tab-pane label="运营视窗">
                            <el-row type="flex" class="row-bg" justify="space-around">
                                <el-col style="border:1px solid #F5F7FA;padding:10px" :span="6">
                                    <p class="bigP">支付金额</p>
                                    <p class="littP">￥{{todayMoney}}</p>
                                    <p class="littSpan">前一日：￥{{yesterdayMoney}}</p>
                                    <p class="littSpan">上一周：￥{{lastWeekMoney}}</p>
                                </el-col>
                                <el-col style="border:1px solid #F5F7FA;padding:10px" :span="6">
                                    <p class="bigP">访问支付转化率</p>
                                    <p class="littP">0%</p>
                                    <p class="littSpan">前一日：0</p>
                                    <p class="littSpan">上一周：0</p>
                                </el-col>
                                <el-col style="border:1px solid #F5F7FA;padding:10px" :span="6">
                                    <p class="bigP">订单数</p>
                                    <p class="littP">{{todayOrders}}</p>
                                    <p class="littSpan">前一日：{{yesterdayOrders}}</p>
                                    <p class="littSpan">上一周：{{lastWeekOrders}}</p>
                                </el-col>
                                <el-col style="border:1px solid #F5F7FA;padding:10px" :span="6">
                                    <p class="bigP">支付人数</p>
                                    <p class="littP">{{todayPaid}}</p>
                                    <p class="littSpan">前一日：{{yesterdayPaid}}</p>
                                    <p class="littSpan">上一周：{{lastWeekOrders}}</p>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg" justify="space-around">
                                <div id="three" style="width:100%;height:300px;margin:0 auto;"></div>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="管理视窗">
                            <div id="two" style="width:100%;height:472px;margin:0 auto;"></div>
                        </el-tab-pane>
                    </el-tabs>
                </el-row>
            </el-col>
            <el-col style="padding:3px;background:#F3F3F3" :span="4">
                <div style="background:#fff;padding:7px;">
                    <h1 class="bigP">待办事项</h1><br>
                    <p style="font-size:16px;">1、..我司xxx,....</p>
                    <p style="font-size:16px;">2、......</p>
                    <p style="font-size:16px;">3、......</p>
                    <p style="font-size:16px;">4、......</p>
                </div>
                <el-row style="margin-top:20px;" type="flex" class="row-bg" justify="space-around">
                    <el-col style="text-align:center;" :span="6">
                        <img style="width:90%;" src="../assets/images/phone.png">
                    </el-col>
                    <el-col :span="18">
                        <p class="bigP">在线客服</p>
                        <p style="font-size:16px;">电话：0571-86857988</p>
                    </el-col>
                </el-row>
                <el-row style="margin-top:20px;" type="flex" class="row-bg" justify="space-around">
                    <el-col style="text-align:center;" :span="6">
                        <img style="width:90%;" src="../assets/images/desk.png">
                    </el-col>
                    <el-col :span="18">
                        <p class="bigP">桌面在线客服</p>
                        <a style="font-size:16px;" href="https://cn.bing.com/" target="_blank">网址</a>
                    </el-col>
                </el-row>
                <div style="background:#fff;padding:7px;margin-top:20px;">
                    <h1 class="bigP">产品动态</h1><br>
                    <p style="font-size:16px;">1、..市长xxx,....</p>
                    <p style="font-size:16px;">2、......</p>
                    <p style="font-size:16px;">3、......</p>
                    <p style="font-size:16px;">4、......</p>
                </div>
            </el-col>
        </el-row>
        <!-- <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="4" style="background:#F5F7FA;padding:7px">
                <div>
                    <p><b>购货总量(本月)：</b><span>{{totalPurchase.total_purchase_goods===false?0:totalPurchase.total_purchase_goods}}</span></p>
					<p><b>购货金额(本月)：</b><span>{{totalPurchase.total_purchase_money}}</span></p>
                </div>
            </el-col>
            <el-col :span="4" style="background:#F5F7FA;padding:7px">
                <div>
                    <p><b>销售总额(本月)：</b><span>{{totalPurchase.total_order_goods}}</span></p>
					<p><b>销售金额(本月)：</b><span>{{totalPurchase.total_order_sales}}</span></p>
                </div>
            </el-col>
            <el-col :span="4" style="background:#F5F7FA;padding:7px">
                <div>
                    <p><b>库存总量(本月)：</b><span>{{totalPurchase.kucun_goods_number}}</span></p>
					<p><b>库存成本(本月)：</b><span>{{totalPurchase.kucun_chengben_price}}</span></p>
                </div>
            </el-col>
            <el-col :span="4" style="background:#F5F7FA;padding:7px">
                <div>
                    <p><b>库存预警(本月)：</b><span>{{totalPurchase.warn_goods_number===false?0:totalPurchase.warn_goods_number}}</span></p>
					<p><b>默认阈值(本月)：</b><span>{{totalPurchase.kucun_goods_number}}</span></p>
                </div>
            </el-col>
            <el-col :span="6" style="background:#F5F7FA;padding:7px">
                <div>
                    <p><b>客户欠款(本月)：</b><span>{{totalPurchase.kehu_arrears}}</span></p>
					<p><b>供应商欠款(本月)：</b><span>{{totalPurchase.supplier_arrears}}</span></p>
                </div>
            </el-col>
        </el-row> -->
        <!--Tab标签切换-->
        <!-- <el-tabs type="border-card" @tab-click="handleClick">
            <el-tab-pane label="用户数据趋势">
                <div id="first" style="width:800px;height:600px;margin:0 auto;"></div>
            </el-tab-pane>
            <el-tab-pane label="用户来源">
                <div id="two" style="width:800px;height:600px;margin:0 auto;"></div>
            </el-tab-pane>
            <el-tab-pane label="月复购率">
                <div id="three" style="width:800px;height:600px;margin:0 auto;"></div>
            </el-tab-pane>
        </el-tabs> -->
        <!--底部输入-->
        
    </div>
</template>
<style scoped>
    #index{
        margin:10px;
    }
    #indexH3{
        background:#fff;
        padding:10px 0 20px 5px;
        margin-bottom:25px;
    }
  .el-main{
    text-align:left;
    line-height:20px;
}
    .bg-purple {
    background: #fff;
  }
  .el-row{
      margin-top:0px;
      background:#fff;
      padding:10px;
  }
  .indeEelCol{
      border:1px dotted #E7EAEC;
      padding:10px;
  }
  .el-tabs{
      margin:20px;
  }
    p{
        margin-bottom:10px;
    }
    .bigP{
        font-size:18px;
        font-weight:bold;
    }
    .littP{
        font-size:24px;
        color:#409EFF;
    }
    .littSpan{
        font-size:14px;
        color:#D0C3C0;
    }
    .triangle{
        width:0;height:0;
        border:49px solid transparent;
        border-top:49px solid #409EFF;
        border-bottom:49px solid red;
        border-radius: 50%;
    }
    .myCanvas:hover{
        border:1px solid red;
        transform:rotate3d(0,0,90,90deg) translate(-70px,0px) rotate(90deg);;
        transition:2s linear;
    };
</style>
<script>
import axios from 'axios' ;
import {userdatatrend,userfrom,repeatpurchase,indexCounts} from '../api/api';
import { setInterval, setTimeout } from 'timers';
export default {
  data() {
    return {
        input: '',
        value: '',
        totalPurchase:{},
        shopBuyData:[],
        shopOderData:[],
        sellListData:[],
        retailReturnData:[],
        repertoryMData:[],
        serveData:[],
        moneyInData:[],
        pages1:1,
        pages2:1,
        pages3:1,
        pages4:1,
        pages5:1,
        pages6:1,
        pages7:1,
        newMembers:[],
        wechatVisitors:[],
        numberCustomers:[],
        userfrom:[],
        repeatpurchase:[],
        todayMoney:0,
        yesterdayMoney:0,
        lastWeekMoney:0,
        todayVisitor:0,
        yesterdayVisitor:0,
        todayOrders:0,
        yesterdayOrders:0,
        lastWeekOrders:0,
        todayPaid:0,
        yesterdayPaid:0,
    }
  },
    methods:{
        handleClick(tab, event) {
            if(tab.label=="用户数据趋势"){
            }else if(tab.label=="用户来源"){
                userfrom().then(res=>{
                    console.log(res.data);
                    this.userfrom=res.data;
                    this.drawLine2();
                });
            }else if(tab.label=="管理视窗"){
                userfrom().then(res=>{
                    console.log(res.data);
                    this.userfrom=res.data;
                    this.drawLine2();
                });
            }else if(tab.label=="零售"){
                axios.get('http://api.guimishuo1.com/erp/reretail/lists')
                    .then((res) =>{
                        console.log(res.data.data);
                        this.pages4=Math.ceil(res.data.data.filter.record_count/7);
                        axios.get('http://api.guimishuo1.com/erp/reretail/lists?page=1&page_size=7')
                            .then((res) =>{
                                console.log(res.data.data.back);
                                this.retailReturnData=res.data.data.back;
                            }, function (error) {
                                console.log(error);
                        }); 
                    }, function (error) {
                        console.log(error);  
                });
            }else if(tab.label=="服务"){
                axios.get('http://api.guimishuo1.com/erp/itemorder/lists')
                    .then((res) =>{
                        console.log(res.data.data);
                        this.pages5=Math.ceil(res.data.data.filter.record_count/7);
                        axios.get('http://api.guimishuo1.com/erp/itemorder/lists?page=1&page_size=7')
                            .then((res) =>{
                                console.log(res.data.data.gather_list);
                                this.serveData=res.data.data.gather_list;
                            }, function (error) {
                                console.log(error);
                        }); 
                    }, function (error) {
                        console.log(error);  
                });
            }else if(tab.label=="仓库"){
                axios.get('http://api.guimishuo1.com/erp/roommanage/lists')
                    .then((res) =>{
                        console.log(res.data);
                        this.pages6=Math.ceil(res.data.data.filter.record_count/7);//计算页数
                        axios.get('http://api.guimishuo1.com/erp/roommanage/lists?page=1&page_size=7')
                            .then((res) =>{
                                console.log(res.data.data.store_list);
                                this.repertoryMData=res.data.data.store_list;
                            }, function (error) {
                                console.log(error);
                        }); 
                    }, function (error) {
                        console.log(error);  
                }); 
            }else if(tab.label=="资金"){
                axios.get('http://api.guimishuo1.com/erp/gather/lists')
                    .then((res) =>{
                        console.log(res.data.data);
                        this.pages7=Math.ceil(res.data.data.filter.record_count/7);//计算页数
                        axios.get('http://api.guimishuo1.com/erp/gather/lists?page=1&page_size=7')
                            .then((res) =>{
                                console.log(res.data.data.gather_list);
                                this.moneyInData=res.data.data.gather_list;
                            }, function (error) {
                                console.log(error);
                        }); 
                    }, function (error) {
                        console.log(error);  
                });
            }
        },    
        handleCurrentChange3(val) {
            console.log(`当前页: ${val}`);
            axios.get(`http://api.guimishuo1.com/erp/sale/lists?page=${val}&page_size=7`)
            .then((res) =>{
                console.log(res.data.data.orders);
                this.sellListData=res.data.data.orders;
            }, function (error) {
                console.log(error);
            });
        },
        handleCurrentChange4(val) {
            console.log(`当前页: ${val}`);
            axios.get(`http://api.guimishuo1.com/erp/reretail/lists?page=${val}&page_size=7`)
            .then((res) =>{
                console.log(res.data.data.back);
                this.retailReturnData=res.data.data.back;
            }, function (error) {
                console.log(error);
            }); 
        },
        handleCurrentChange5(val) {
            console.log(`当前页: ${val}`);
            axios.get(`http://api.guimishuo1.com/erp/itemorder/lists?page=${val}&page_size=7`)
            .then((res) =>{
            console.log(res.data.data.gather_list);
            this.serveData=res.data.data.gather_list;
            }, function (error) {
                console.log(error);
            })
        },
        handleCurrentChange6(val) {
            console.log(`当前页: ${val}`);
            axios.get(`http://api.guimishuo1.com/erp/roommanage/lists?page=${val}&page_size=7`)
            .then((res) =>{
                console.log(res.data.data.store_list);
                this.repertoryMData=res.data.data.store_list;
            }, function (error) {
                console.log(error);
            });
        },
        handleCurrentChange7(val) {
            console.log(`当前页: ${val}`);
            axios.get(`http://api.guimishuo1.com/erp/gather/lists?page=${val}&page_size=7`)
            .then((res) =>{
                console.log(res.data.data.gather_list);
                this.moneyInData=res.data.data.gather_list;
            }, function (error) {
                console.log(error);
            });
        },
        drawLine(){
            let first = this.$echarts.init(document.getElementById('first'))
            // 绘制图表
            first.setOption({
                title: {
                    text: '',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c}'
                },
                // legend: {
                //     left: 'left',
                //     data: ['新增会员数', '微信访客数','消费顾客数']
                // },
                xAxis: {
                    type: 'category',
                    splitLine: {show: false},
                    data: ['1', '2', '3', '4','5', '6', '7','8', '9', '10', '11','12', '13', '14','15', '16', '17', '18','19', '20', '21','22', '23',  '24','25', '26', '27','28','29']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        name: '支付金额',
                        type: 'line',
                        //data: this.newMembers,
                        data: [98,49,35,21,56,7,21,77,42,28,84,91,14,63,70,77,105,112,56,7,21,77,42,28,84,91,49,35,77],
                        smooth:true,
                    },
                    // {
                    //     name: '微信访客数',
                    //     type: 'line',
                    //     data: this.wechatVisitors
                    // },
                    // {
                    //     name: '消费顾客数',
                    //     type: 'line',
                    //     data: this.numberCustomers
                    // }
                ]
            }); 
        },
        drawLine2(){
            // 基于准备好的dom，初始化echarts实例
            let two = this.$echarts.init(document.getElementById('two'))
            // 绘制图表
            two.setOption({
                title : {
                    text: '用户来源',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['应用端','手机端','电脑端']
                },
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:this.userfrom,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }); 
        },
        drawLine3(){
            let three = this.$echarts.init(document.getElementById('three'))
            three.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: `{a} <br/>{b} : {c}`
                },
                xAxis: {
                    type: 'category',
                    data: ['2018/8', '2018/9', '2018/10', '2018/11', '2018/12', '2019/1', '2019/2']
                },
                yAxis: {
                    type: 'value',
                    name:"%"
                },
                series: [{
                    name:"访问支付转化率",
                    data: this.repeatpurchase,
                    type: 'line',
                    smooth: true
                }]
            }); 
        },
    },
    mounted: function () { 
        indexCounts().then(res=>{
            console.log(res.data);
            this.todayMoney=res.data.today.money_paid;
            this.todayVisitor=res.data.today.user_visit;
            this.todayOrders=res.data.today.order_paid;
            this.todayPaid=res.data.today.user_paid;
            this.yesterdayMoney=res.data.yesterday.money_paid;
            this.yesterdayVisitor=res.data.yesterday.user_visit;
            this.yesterdayOrders=res.data.yesterday.order_paid;
            this.yesterdayPaid=res.data.yesterday.user_paid;
            this.lastWeekMoney=res.data.last_week.money_paid;
            this.lastWeekOrders=res.data.last_week.order_paid;
        });
        let data=this.$qs.stringify({
            type:"week",
            limit:7
        });
        userdatatrend(data).then(res=>{
            console.log(res.data);
            this.newMembers=res.data[0].data;
            this.wechatVisitors=res.data[1].data;
            this.numberCustomers=res.data[2].data;
            this.drawLine();
        });

        let data1=this.$qs.stringify({
            type:"week",
            limit:7
        });
        // repeatpurchase(data1).then(res=>{
        //     console.log(res.data.data);
        //     this.repeatpurchase=res.data.data;
        //     this.drawLine3();
        // });
        axios.post('http://api.guimishuo1.com/erp/datastatistics/repeatpurchase',data1).then((res)=>{
            console.log(res.data.data.data);
            this.repeatpurchase=res.data.data.data;
            this.drawLine3();
        }).catch((error)=>{
            console.log(error);
        });


        axios.post('http://api.guimishuo1.com/erp/index/index')
            .then((res) =>{
                console.log(res.data.data);
                this.totalPurchase=res.data.data;
                console.log(this.totalPurchase.warn_goods_number);
            }, function (error) {
                console.log(error);
            });
    }
}
</script>