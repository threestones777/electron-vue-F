<template>
    <div id="index">
        <div id="indexH3">
           <h3>温州美联 管理中心</h3>
        </div>        
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="4" style="background:#F5F7FA;padding:7px">
                <div>
                    <p><b>购货总量(本月)：</b><span>{{totalPurchase.total_purchase_goods}}</span></p>
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
                    <p><b>库存预警(本月)：</b><span>{{totalPurchase.warn_goods_number}}</span></p>
					<p><b>默认阈值(本月)：</b><span>{{totalPurchase.kucun_goods_number}}</span></p>
                </div>
            </el-col>
            <el-col :span="6" style="background:#F5F7FA;padding:7px">
                <div>
                    <p><b>客户欠款(本月)：</b><span>{{totalPurchase.kehu_arrears}}</span></p>
					<p><b>供应商欠款(本月)：</b><span>{{totalPurchase.supplier_arrears}}</span></p>
                </div>
            </el-col>
        </el-row>
        <!--Tab标签切换-->
        <el-tabs type="border-card" @tab-click="handleClick">
            <el-tab-pane label="用户数据趋势">
                <div id="first" style="width:800px;height:600px;margin:0 auto;"></div>
            </el-tab-pane>
            <el-tab-pane label="用户来源">
                <div id="two" style="width:800px;height:600px;margin:0 auto;"></div>
            </el-tab-pane>
            <el-tab-pane label="月复购率">
                <div id="three" style="width:800px;height:600px;margin:0 auto;"></div>
            </el-tab-pane>
            <!-- <el-tab-pane label="零售">
                <div style="height:600px;">
                    <el-table
                    :data="retailReturnData" border
                    style="width: 100%">
                        <el-table-column
                            prop="back_id"
                            align="center"
                            label="商品信息">
                        </el-table-column>
                        <el-table-column
                            prop="order_id"
                            align="center"
                            label="商品批次">
                        </el-table-column>
                        <el-table-column
                            prop="add_time"
                            align="center"
                            label="商品串码">
                        </el-table-column>        
                        <el-table-column
                            prop="pMsg"
                            align="center"
                            label="数量">
                        </el-table-column>
                        <el-table-column
                            prop=""
                            align="center"
                            label="退货单价">
                        </el-table-column>
                        <el-table-column
                            prop="refund_money_2"
                            align="center"
                            label="退货金额">
                        </el-table-column>
                        <el-table-column
                            prop="postscript"
                            align="center"
                            label="备注信息">
                        </el-table-column>    
                    </el-table>
                    <el-pagination
                        @current-change="handleCurrentChange4"
                        layout="prev, pager, next,jumper" style="float:right;margin-top:10px;"
                        :page-count="pages4">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="服务">
                <div style="height:600px;">
                    <el-table
                    :data="serveData" border
                    style="width: 100%">
                        <el-table-column
                            prop="user_name"
                            align="center"
                            label="服务项目">
                        </el-table-column>
                        <el-table-column
                            prop="discount"
                            align="center"
                            label="服务数量">
                        </el-table-column>
                        <el-table-column
                            prop="goods_amount"
                            align="center"
                            label="服务价格">
                        </el-table-column>
                        <el-table-column
                            prop="goods_amount"
                            align="center"
                            label="总金额">
                        </el-table-column>                 
                        <el-table-column
                            prop="status_name"
                            align="center"
                            label="备注信息">
                        </el-table-column>        
                    </el-table>
                    <el-pagination
                        @current-change="handleCurrentChange5"
                        layout="prev, pager, next,jumper" style="float:right;margin-top:10px;"
                        :page-count="pages5">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="仓库">
                <div style="height:600px;">
                    <el-table
                    :data="repertoryMData"
                    border
                    style="width: 100%">
                        <el-table-column
                        prop="store_name"
                        align="center"
                        label="仓库名称">
                        </el-table-column>
                        <el-table-column
                        prop="store_id"
                        align="center"
                        label="仓库编号"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="mianji"
                        align="center"
                        label="联系人"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="mianji"
                        align="center"
                        label="手机号"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="marks"
                        align="center"
                        label="备注信息">
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        @current-change="handleCurrentChange6"
                        layout="prev, pager, next,jumper" style="float:right;margin-top:10px;"
                        :page-count="pages6">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="资金">
                <div style="height:600px;">
                    <el-table
                    :data="moneyInData" border
                    style="width: 100%">
                        <el-table-column
                            prop="order_sn"
                            align="center"
                            label="结算账户">
                        </el-table-column>
                        <el-table-column
                            prop="order_amount"
                            align="center"
                            label="结算金额">
                        </el-table-column>
                        <el-table-column
                            prop="status_name"
                            align="center"
                            label="备注信息">
                        </el-table-column>    
                    </el-table>
                    <el-pagination
                    @current-change="handleCurrentChange7"
                        layout="prev, pager, next,jumper" style="float:right;margin-top:10px;"
                        :page-count="pages7">
                    </el-pagination>
                </div>
            </el-tab-pane> -->
        </el-tabs>
        <!--底部输入-->
        
    </div>
</template>
<style>
    #index{
        margin:20px;
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
</style>
<script>
import axios from 'axios' ;
import {userdatatrend,userfrom,repeatpurchase} from '../api/api';
export default {
  data() {
    return {
        input: '',
        options: [{
          value: '选项1',
          label: '选项1'
        }, {
          value: '选项2',
          label: '选项2'
        }, {
          value: '选项3',
          label: '选项3'
        }, {
          value: '选项4',
          label: '选项4'
        },],
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
    }
  },
    methods:{
        handleClick(tab, event) {
            if(tab.label=="用户数据趋势"){
                //console.log("用户数据趋势");
            }else if(tab.label=="用户来源"){
                userfrom().then(res=>{
                    console.log(res.data);
                    this.userfrom=res.data;
                    this.drawLine2();
                });
            }else if(tab.label=="月复购率"){
                let data=this.$qs.stringify({
                    type:"month",
                    limit:7
                });
                repeatpurchase(data).then(res=>{
                    console.log(res.data.data);
                    this.repeatpurchase=res.data.data;
                    this.drawLine3();
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
                legend: {
                    left: 'left',
                    data: ['新增会员数', '微信访客数','消费顾客数']
                },
                xAxis: {
                    type: 'category',
                    splitLine: {show: false},
                    data: ['星期一', '星期二', '星期三', '星期四','星期五', '星期六', '星期日',]
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
                        name: '新增会员数',
                        type: 'line',
                        data: this.newMembers
                    },
                    {
                        name: '微信访客数',
                        type: 'line',
                        data: this.wechatVisitors
                    },
                    {
                        name: '消费顾客数',
                        type: 'line',
                        data: this.numberCustomers
                    }
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
                    data: ['2018/6', '2018/7', '2018/8', '2018/9', '2018/10', '2018/11', '2018/12']
                },
                yAxis: {
                    type: 'value',
                    name:"%"
                },
                series: [{
                    name:"月复购率",
                    data: this.repeatpurchase,
                    type: 'line',
                    smooth: true
                }]
            }); 
        },

    },
    mounted: function () { 
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
        })
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