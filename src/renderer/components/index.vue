<template>
    <div id="index">
        <div id="indexH3">
           <h3>温州美联 管理中心</h3>
        </div>        
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <p><b>购货总量(本月)：</b><span>{{totalPurchase.total_purchase_goods}}</span></p>
					<p><b>购货金额(本月)：</b><span>{{totalPurchase.total_purchase_money}}</span></p>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <p><b>销售总额(本月)：</b><span>{{totalPurchase.total_order_goods}}</span></p>
					<p><b>销售金额(本月)：</b><span>{{totalPurchase.total_order_sales}}</span></p>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <p><b>库存总量(本月)：</b><span>{{totalPurchase.kucun_goods_number}}</span></p>
					<p><b>库存成本(本月)：</b><span>{{totalPurchase.kucun_chengben_price}}</span></p>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <p><b>库存预警(本月)：</b><span>{{totalPurchase.warn_goods_number}}</span></p>
					<p><b>默认阈值(本月)：</b><span>{{totalPurchase.kucun_goods_number}}</span></p>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <p><b>客户欠款(本月)：</b><span>{{totalPurchase.kehu_arrears}}</span></p>
					<p><b>供应商欠款(本月)：</b><span>{{totalPurchase.supplier_arrears}}</span></p>
                </div>
            </el-col>
        </el-row>
        <!--Tab标签切换-->
        <el-tabs type="border-card" @tab-click="handleClick">
            <el-tab-pane label="购货">
                <div style="height:600px;">
                    <el-table
                        :data="shopBuyData" border
                        style="width: 100%"
                        :default-sort = "{prop: 'date', order: 'descending'}">
                        <el-table-column
                        prop="purchase_sn"
                        label="商品信息"
                        sortable>
                        </el-table-column>
                        <el-table-column
                        prop=""
                        label="辅助属性"
                        sortable>
                        </el-table-column>
                        <el-table-column
                        prop="store_name"
                        label="所入仓库（批量）"
                        sortable>
                        </el-table-column>
                        <el-table-column
                        prop="purchase_sn"
                        label="商品编号"
                        sortable>
                        </el-table-column>
                        <el-table-column
                        prop=""
                        label="条形码"
                        sortable>
                        </el-table-column>
                        <el-table-column
                        prop=""
                        label="库存警告"
                        sortable>
                        </el-table-column>
                        <el-table-column
                        prop=""
                        label="赠送积分"
                        sortable>
                        </el-table-column>
                        <el-table-column
                        prop=""
                        label="商品串码"
                        sortable>
                        </el-table-column>
                        <el-table-column
                        prop="number"
                        label="数量"
                        sortable>
                        </el-table-column>
                        <el-table-column
                        prop="real_pay_money"
                        label="购货单价"
                        sortable>
                        </el-table-column>
                        <el-table-column
                        prop="money"
                        label="购货金额"
                        sortable>
                        </el-table-column>
                        <el-table-column
                        prop=""
                        label="商品批次"
                        sortable>
                        </el-table-column>
                        <el-table-column
                        prop="note"
                        label="备注信息"
                        sortable>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        @current-change="handleCurrentChange1"
                        layout="prev, pager, next,jumper" style="float:right;margin-top:10px;"
                        :page-count="pages1">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="采购">
                <div style="height:600px;">
                    <el-table
                    :data="shopOderData" border
                    style="width: 100%">
                        <el-table-column
                            prop="purchase_sn"
                            align="center"
                            label="商品信息">
                        </el-table-column>
                        <el-table-column
                            prop="purchase_sn"
                            align="center"
                            label="辅助属性">
                        </el-table-column>
                        <el-table-column
                            prop="purchase_id"
                            align="center"
                            label="商品编号	">
                        </el-table-column>
                        <el-table-column
                            prop=""
                            align="center"
                            label="商品分类">
                        </el-table-column>
                        <el-table-column
                            prop=""
                            align="center"
                            label="数量">
                        </el-table-column>
                        <el-table-column
                            prop="note"
                            align="center"
                            label="备注信息">
                        </el-table-column>        
                    </el-table>
                    <!--分页显示-->
                    <el-pagination
                        @current-change="handleCurrentChange2"
                        layout="prev, pager, next,jumper" style="float:right;margin-top:10px;"
                        :page-count="pages2">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="销售">
                <div style="height:600px;">
                    <el-table
                    :data="sellListData" border
                    style="width: 100%">
                        <el-table-column
                            prop="goods_id"
                            align="center"
                            label="商品信息">
                        </el-table-column>
                        <el-table-column
                            prop="store_name"
                            align="center"
                            label="所属仓库">
                        </el-table-column>
                        <el-table-column
                            prop="goods_number"
                            align="center"
                            label="当前库存">
                        </el-table-column>
                        <el-table-column
                            prop="store_number"
                            align="center"
                            label="辅助属性">
                        </el-table-column>
                        <el-table-column
                            prop="goods_name"
                            align="center"
                            label="商品编码	">
                        </el-table-column>
                        <el-table-column
                            prop="pCount"
                            align="center"
                            label="商品单位">
                        </el-table-column>
                        <el-table-column
                            prop="pRemark"
                            align="center"
                            label="商品批次">
                        </el-table-column>        
                        <el-table-column
                            prop="goods_name"
                            align="center"
                            label="商品串码">
                        </el-table-column>
                        <el-table-column
                            prop="pProp"
                            align="center"
                            label="数量	">
                        </el-table-column>
                        <el-table-column
                            prop="goods_price"
                            align="center"
                            label="销货单价">
                        </el-table-column>
                        <el-table-column
                            prop="goods_price"
                            align="center"
                            label="折扣（批量）">
                        </el-table-column>
                        <el-table-column
                            prop="goods_price"
                            align="center"
                            label="货金额">
                        </el-table-column>                  
                        <el-table-column
                            prop="pRemark"
                            align="center"
                            label="备注信息">
                        </el-table-column>        
                    </el-table>
                    <!--分页-->
                    <el-pagination
                        @current-change="handleCurrentChange3"
                        layout="prev, pager, next,jumper" style="float:right;margin-top:10px;"
                        :page-count="pages3">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="零售">
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
                    <!--分页-->
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
                    <!--分页-->
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
                    <!-- 分页器 -->
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
                    <!--分页-->
                    <el-pagination
                    @current-change="handleCurrentChange7"
                        layout="prev, pager, next,jumper" style="float:right;margin-top:10px;"
                        :page-count="pages7">
                    </el-pagination>
                </div>
            </el-tab-pane>
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
        pages7:1
    }
  },
    methods:{
        handleClick(tab, event) {
            if(tab.label=="购货"){
                axios.get('http://api.guimishuo1.com/erp/purchase/lists')
                    .then((res) =>{
                        console.log(res.data.data);
                        this.pages1=Math.ceil(res.data.data.filter.record_count/7);//计算页数
                        axios.get('http://api.guimishuo1.com/erp/purchase/lists?page=1&page_size=7')
                            .then((res) =>{
                                console.log(res.data.data.gather_list);
                                this.shopBuyData=res.data.data.gather_list;
                            }, function (error) {
                                console.log(error);
                        }); 
                    }, function (error) {
                        console.log(error);  
                });
            }else if(tab.label=="采购"){
                console.log("采购");
                axios.get('http://api.guimishuo1.com/erp/opurchase/lists')
                    .then((res) =>{
                        console.log(res.data.data);
                        this.pages2=Math.ceil(res.data.data.gather_list.length/7);
                        axios.get('http://api.guimishuo1.com/erp/opurchase/lists')
                            .then((res) =>{
                                console.log(res.data.data.gather_list);
                                this.shopOderData=res.data.data.gather_list;
                            }, function (error) {
                                console.log(error);
                        }); 
                    }, function (error) {
                        console.log(error);  
                });
            }else if(tab.label=="销售"){
                axios.get('http://api.guimishuo1.com/erp/sale/lists')
                    .then((res) =>{
                        console.log(res.data.data);
                        this.pages3=Math.ceil(res.data.data.record_count/7);
                        axios.get('http://api.guimishuo1.com/erp/sale/lists?page=1&page_size=7')
                            .then((res) =>{
                                console.log(res.data.data.orders);
                                this.sellListData=res.data.data.orders;
                            }, function (error) {
                                console.log(error);
                        }); 
                    }, function (error) {
                        console.log(error);  
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
        handleCurrentChange1(val) {
            console.log(`当前页: ${val}`);
        },
        handleCurrentChange2(val) {
            console.log(`当前页: ${val}`);
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
        }
    },
    mounted: function () { 
        axios.get('http://api.guimishuo1.com/erp/purchase/lists')
            .then((res) =>{
                console.log(res.data.data);
                this.pages=Math.ceil(res.data.data.filter.record_count/7);//计算页数
                axios.get('http://api.guimishuo1.com/erp/purchase/lists?page=1&page_size=7')
                    .then((res) =>{
                        console.log(res.data.data.gather_list);
                        this.shopBuyData=res.data.data.gather_list;
                    }, function (error) {
                        console.log(error);
                }); 
            }, function (error) {
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