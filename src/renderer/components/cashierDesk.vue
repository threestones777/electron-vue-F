<template>
    <div class="cashierDesk">
        <el-container>
            <el-header>
                <div style="float:right;color:#FFF;font-size:16px;margin-top:10px;">
                    <span>您好，游客</span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span>当前门店： 美联商城 - 美联智慧收银台</span>
                    <el-button @click="$router.push('/')" type="text">退出</el-button>
                </div>           
            </el-header>
            <el-main>
                <el-container style="height:100%">
                    <el-aside width="520px" height="100%">
                        <div class="details">
                            <div style="margin-bottom:40px;">
                                <p><img src="../assets/images/vip.png">游客</p>
                            </div>
                            <div style="display:inline-block">
                                <span style="display:inline-block;margin:0 120px 40px 0">余额：0.00</span><br>
                                <span>等级：默认等级</span>
                            </div>
                            <div style="display:inline-block">
                                <span style="display:inline-block;margin:0 120px 40px 0">优惠：无</span><br>
                                <span>积分：0</span>
                            </div>
                        </div>
                        <el-tabs stretch v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="购物区" name="first">
                                <el-table
                                :data="goodsTableData">
                                <el-table-column
                                    prop="goods_id"
                                    align="center"
                                    label="商品名称">
                                </el-table-column>
                                <el-table-column
                                    prop="goods_price"
                                    align="center"
                                    label="单价">
                                </el-table-column>
                                <el-table-column
                                    prop="goods_number"
                                    align="center"
                                    label="件/重">
                                </el-table-column>
                                <el-table-column
                                    prop="subtotal"
                                    align="center"
                                    label="总额">
                                </el-table-column>
                                <el-table-column
                                fixed="right"
                                label="操作">
                                <template slot-scope="scope">
                                    <el-button @click="deleteGoods(scope.row)" type="text" size="small"> 移除 </el-button>
                                </template>
                                </el-table-column>
                                </el-table>                                
                            </el-tab-pane>
                            <el-tab-pane label="服务区" name="second">
                                <el-table
                                :data="goodsTableData">
                                <el-table-column
                                    prop="goods_id"
                                    align="center"
                                    label="商品名称">
                                </el-table-column>
                                <el-table-column
                                    prop="goods_price"
                                    align="center"
                                    label="单价">
                                </el-table-column>
                                <el-table-column
                                    prop="goods_number"
                                    align="center"
                                    label="件/重">
                                </el-table-column>
                                <el-table-column
                                    prop="subtotal"
                                    align="center"
                                    label="总额">
                                </el-table-column>
                                <el-table-column
                                fixed="right"
                                label="操作">
                                <template slot-scope="scope">
                                    <el-button @click="deleteGoods(scope.row)" type="text" size="small"> 移除 </el-button>
                                </template>
                                </el-table-column>
                                </el-table>
                            </el-tab-pane>
                            <el-tab-pane label="挂单区" name="third">
                                <el-table
                                :data="pickTableData">
                                <el-table-column
                                    prop="name"
                                    align="center"
                                    label="服务名称">
                                </el-table-column>
                                <el-table-column
                                    prop="number"
                                    align="center"
                                    label="数量">
                                </el-table-column>
                                <el-table-column
                                    prop="price"
                                    align="center"
                                    label="金额">
                                </el-table-column>
                                <el-table-column
                                fixed="right"
                                label="操作">
                                <template slot-scope="scope">
                                    <el-button
                                    @click.native.prevent="deleteRow(scope.$index, pickTableData)"
                                    type="text"
                                    size="small">
                                    移除
                                    </el-button>
                                </template>
                                </el-table-column>
                                </el-table>
                            </el-tab-pane>
                        </el-tabs>
                        <div style="height:100px;background:#fff;">
                            <div style="padding:30px 30px 0 30px">
                                <span style="display:inline-block;float:left">合计<span id="totalNumber" style="color:#FF7815">0</span>件</span>
                                <span style="display:inline-block;float:right;color:#FF7815" id="totalPrice">￥0</span>
                            </div>
                            <div style="padding:30px 30px 0 30px">
                                <img @click="dialogVisible = true" src="../assets/images/setting.png" style="float:left"/>
                                <!-- 设置弹窗 -->
                                <el-dialog
                                title="表格设置"
                                :visible.sync="dialogVisible"
                                width="30%" height="300px"
                                :before-close="handleClose">
                                <el-form ref="form" :model="form">
                                    <el-form-item>
                                        <el-row style="background:#F5F5F5;border:1px solid #E6E6E6" :gutter="20">
                                            <el-col :span="12">名称</el-col>
                                            <el-col :span="12" style="border-left:1px solid #E6E6E6">配置</el-col>
                                        </el-row>
                                    </el-form-item>                                   
                                    <el-form-item>
                                        <el-row :gutter="20" style="border:1px solid #E6E6E6;border-top:1px solid transparent">
                                            <el-col :span="12">所属仓库</el-col>
                                            <el-col :span="12" style="border-left:1px solid #E6E6E6">
                                                <el-switch v-model="form.value" active-color="#13ce66" active-text="显示" inactive-color="#F5F5F5"> </el-switch>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>                                   
                                    <el-form-item>
                                        <el-row :gutter="20" style="border:1px solid #E6E6E6;border-top:1px solid transparent">
                                            <el-col :span="12">当前库存</el-col>
                                            <el-col :span="12" style="border-left:1px solid #E6E6E6">
                                                <el-switch v-model="form.value1" active-color="#13ce66" active-text="显示" inactive-color="#F5F5F5"> </el-switch>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>                                   
                                    <el-form-item>
                                        <el-row :gutter="20" style="border:1px solid #E6E6E6;border-top:1px solid transparent">
                                            <el-col :span="12">辅助属性</el-col>
                                            <el-col :span="12" style="border-left:1px solid #E6E6E6">
                                                <el-switch v-model="form.value2" active-color="#13ce66" active-text="显示" inactive-color="#F5F5F5"> </el-switch>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>                                   
                                    <el-form-item>
                                        <el-row :gutter="20" style="border:1px solid #E6E6E6;border-top:1px solid transparent">
                                            <el-col :span="12">商品品牌</el-col>
                                            <el-col :span="12" style="border-left:1px solid #E6E6E6">
                                                <el-switch v-model="form.value3" active-color="#13ce66" active-text="显示" inactive-color="#F5F5F5"> </el-switch>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>                                   
                                    <el-form-item>
                                        <el-row :gutter="20" style="border:1px solid #E6E6E6;border-top:1px solid transparent">
                                            <el-col :span="12">商品编号</el-col>
                                            <el-col :span="12" style="border-left:1px solid #E6E6E6">
                                                <el-switch v-model="form.value4" active-color="#13ce66" active-text="显示" inactive-color="#F5F5F5"> </el-switch>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>                                   
                                    <el-form-item>
                                        <el-row :gutter="20" style="border:1px solid #E6E6E6;border-top:1px solid transparent">
                                            <el-col :span="12">商品分类</el-col>
                                            <el-col :span="12" style="border-left:1px solid #E6E6E6">
                                                <el-switch v-model="form.value5" active-color="#13ce66" active-text="显示" inactive-color="#F5F5F5"> </el-switch>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>                                   
                                    <el-form-item>
                                        <el-row :gutter="20" style="border:1px solid #E6E6E6;border-top:1px solid transparent">
                                            <el-col :span="12">规格型号</el-col>
                                            <el-col :span="12" style="border-left:1px solid #E6E6E6">
                                                <el-switch v-model="form.value6" active-color="#13ce66" active-text="显示" inactive-color="#F5F5F5"> </el-switch>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>                                   
                                    <el-form-item>
                                        <el-row :gutter="20" style="border:1px solid #E6E6E6;border-top:1px solid transparent">
                                            <el-col :span="12">条形码</el-col>
                                            <el-col :span="12" style="border-left:1px solid #E6E6E6">
                                                <el-switch v-model="form.value7" active-color="#13ce66" active-text="显示" inactive-color="#F5F5F5"> </el-switch>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>                                   
                                    <el-form-item>
                                        <el-row :gutter="20" style="border:1px solid #E6E6E6;border-top:1px solid transparent">
                                            <el-col :span="12">商品单位</el-col>
                                            <el-col :span="12" style="border-left:1px solid #E6E6E6">
                                                <el-switch v-model="form.value8" active-color="#13ce66" active-text="显示" inactive-color="#F5F5F5"> </el-switch>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>                                   
                                    <el-form-item>
                                        <el-row :gutter="20" style="border:1px solid #E6E6E6;border-top:1px solid transparent">
                                            <el-col :span="12">库存预警</el-col>
                                            <el-col :span="12" style="border-left:1px solid #E6E6E6">
                                                <el-switch v-model="form.value9" active-color="#13ce66" active-text="显示" inactive-color="#F5F5F5"> </el-switch>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>                                   
                                    <el-form-item>
                                        <el-row :gutter="20" style="border:1px solid #E6E6E6;border-top:1px solid transparent">
                                            <el-col :span="12">商品货拉</el-col>
                                            <el-col :span="12" style="border-left:1px solid #E6E6E6">
                                                <el-switch v-model="form.value10" active-color="#13ce66" active-text="显示" inactive-color="#F5F5F5"> </el-switch>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>                                   
                                    <el-form-item>
                                        <el-row :gutter="20" style="border:1px solid #E6E6E6;border-top:1px solid transparent">
                                            <el-col :span="12">赠送积分</el-col>
                                            <el-col :span="12" style="border-left:1px solid #E6E6E6">
                                                <el-switch v-model="form.value11" active-color="#13ce66" active-text="显示" inactive-color="#F5F5F5"> </el-switch>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>                                   
                                    <el-form-item>
                                        <el-row :gutter="20" style="border:1px solid #E6E6E6;border-top:1px solid transparent">
                                            <el-col :span="12">零售名称</el-col>
                                            <el-col :span="12" style="border-left:1px solid #E6E6E6">
                                                <el-switch v-model="form.value12" active-color="#13ce66" active-text="显示" inactive-color="#F5F5F5"> </el-switch>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>                                   
                                    <el-form-item>
                                        <el-row :gutter="20" style="border:1px solid #E6E6E6;border-top:1px solid transparent">
                                            <el-col :span="12">折扣额</el-col>
                                            <el-col :span="12" style="border-left:1px solid #E6E6E6">
                                                <el-switch v-model="form.value13" active-color="#13ce66" active-text="显示" inactive-color="#F5F5F5"> </el-switch>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>                                   
                                </el-form>
                                <span slot="footer" class="dialog-footer">
                                    <el-button @click="dialogVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                                </span>
                                </el-dialog>
                                <el-button class="last-child" type="primary" size="medium"  @click="settleAccounts">去结算</el-button>
                                <el-button style="float:right;margin-right:10px;" type="text" @click="clean">清空</el-button>
                            </div>
                        </div>
                    </el-aside>
                    <el-main>
                        <!--------------------------------- 会员 ---------------------------------------->
                        <div style="padding:20px;">
                            <el-button size="medium" style="background:#FF7815;color:#fff" @click="dialogVip=true"><img src="../assets/images/vip.png" style="vertical-align:middle;">&nbsp;&nbsp;会员</el-button>
                            <img src="../assets/images/scan.png" style="position:relative;top:5px;left:30px;z-index:7;">
                            <el-input placeholder="     输入或扫描商品二维码" style="width:30%;margin-right:50px"></el-input>
                            <el-input prefix-icon="el-icon-search" placeholder="商品名称/首拼字母/条形码" style="width:30%;"></el-input>
                        </div>
                        <goods-desk v-on:addGoods="addGoods" id="goodsDesk"></goods-desk>
                        <server-desk  v-on:addServer="addServer" id="serverDesk"></server-desk>
                        <buy-limit id="buyLimit"></buy-limit>
                        <!-- 会员弹窗 -->
                        <el-dialog
                        title="设置会员信息"
                        :visible.sync="dialogVip"
                        width="400px">
                        <el-input v-model="vipNumber" placeholder="扫码/输入会员卡号或手机号" style="margin-bottom:10px"></el-input>
                        <el-row type="flex" justify="space-around" :gutter="3" style="margin-bottom:3px">
                            <el-col :span="8">
                                <el-button class="code" @click="vipCode(1)">1</el-button>  
                            </el-col>
                            <el-col :span="8">
                                <el-button class="code" @click="vipCode(2)">2</el-button>
                            </el-col>
                            <el-col :span="8">
                                <el-button class="code" @click="vipCode(3)">3</el-button>  
                            </el-col>
                        </el-row>  
                        <el-row type="flex" justify="space-around" :gutter="3" style="margin-bottom:3px">
                            <el-col :span="8">
                                <el-button class="code" @click="vipCode(4)">4</el-button>  
                            </el-col>
                            <el-col :span="8">
                                <el-button class="code" @click="vipCode(5)">5</el-button>
                            </el-col>
                            <el-col :span="8">
                                <el-button class="code" @click="vipCode(6)">6</el-button>  
                            </el-col>
                        </el-row>  
                        <el-row type="flex" justify="space-around" :gutter="3" style="margin-bottom:3px">
                            <el-col :span="8">
                                <el-button class="code" @click="vipCode(7)">7</el-button>  
                            </el-col>
                            <el-col :span="8">
                                <el-button class="code" @click="vipCode(8)">8</el-button>
                            </el-col>
                            <el-col :span="8">
                                <el-button class="code" @click="vipCode(9)">9</el-button>  
                            </el-col>
                        </el-row>  
                        <el-row type="flex" justify="space-around" :gutter="3" style="margin-bottom:3px">
                            <el-col :span="8">
                                <el-button class="code" @click="vipCode('.')">.</el-button>  
                            </el-col>
                            <el-col :span="8">
                                <el-button class="code" @click="vipCode(0)">0</el-button>
                            </el-col>
                            <el-col :span="8">
                                <el-button icon="el-icon-d-arrow-left" class="code" @click="vipCodeDe"></el-button>  
                            </el-col>
                        </el-row>  
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVip = false">取 消</el-button>
                            <el-button type="primary" @click="dialogVip = false">确 定</el-button>
                        </span>
                        </el-dialog>
                        <!--------------------------------------结账------------------------------------------>
                        <div id="settleAccounts">
                            <div style="border-bottom:1px solid gray;padding:20px;">
                                <span>结账信息</span>            
                            </div>
                            <el-row :gutter="70" style="margin:0px;">
                                <el-col :span="12">
                                    <h1 style="padding:20px;float:left">商品价格</h1>
                                    <el-input v-model="money"><template slot="prepend">单据金额</template></el-input>
                                    <el-input v-model="discount"><template slot="prepend">优惠金额</template></el-input>
                                    <el-input v-model="realpay"><template slot="prepend">应收金额</template></el-input>
                                    <el-input><template slot="prepend">备注信息</template></el-input>
                                    <el-input v-model="changeMoney">
                                        <template slot="prepend">手动改价</template>
                                        <template slot="append"> <el-button  size=small @click="sureGoods">确定</el-button></template>
                                    </el-input>
                                </el-col>
                                <el-col :span="12">
                                    <h1 style="padding:20px;float:left">服务价格</h1>
                                    <el-input v-model="serverMoney"><template slot="prepend">单据金额</template></el-input>
                                    <el-input><template slot="prepend">优惠金额</template></el-input>
                                    <el-input v-model="serverRealpay"><template slot="prepend">应收金额</template></el-input>
                                    <el-input><template slot="prepend">备注信息</template></el-input>
                                    <el-input v-model="serverChangeMoney">
                                        <template slot="prepend">手动改价</template>
                                        <template slot="append"> <el-button  size=small @click="sureServer">确定</el-button></template>
                                    </el-input>
                                </el-col>
                            </el-row>
                            <el-row style="margin:10px;">
                                <el-col :span="24" class="payMsg">
                                    <h1 style="padding:20px;float:left">支付信息</h1>
                                    <el-input v-model="customer"><template slot="prepend">购买客户</template></el-input>
                                    <el-input v-model="payMoney"><template slot="prepend">结算金额</template></el-input>
                                    <el-input v-model="customerPay"><template slot="prepend">客户付款</template></el-input>
                                    <el-input><template slot="prepend">找零金额</template></el-input>
                                    <el-input><template slot="prepend">赠送积分</template></el-input>
                                    <el-input  v-model="customer"><template slot="prepend">结算账户</template></el-input>
                                    <el-input><template slot="prepend">组合支付</template></el-input>
                                    <el-switch
                                    v-model="value"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949" @change="showMsg">
                                    </el-switch>
                                </el-col>
                            </el-row>
                            <el-row id="payMent">
                                <el-row style="padding:0 20px">
                                    <el-col :span="6" class="pay"><span>结算账户</span></el-col>
                                    <el-col :span="6" class="pay"><span>结算金额</span></el-col>
                                    <el-col :span="6" class="pay"><span>支付码</span></el-col>
                                    <el-col :span="6" class="pay pay2"><span>操作</span></el-col>
                                </el-row>
                                <el-row style="padding:0 20px;">
                                    <el-col :span="6" class="pay"><span>刷卡</span></el-col>
                                    <el-col :span="6" class="pay"><el-input size="small" placeholder="请输入结算金额"></el-input></el-col>
                                    <el-col :span="6" class="pay"><el-input size="small" placeholder="请输入支付码"></el-input></el-col>
                                    <el-col :span="6" class="pay pay2"><el-button type="text" icon="el-icon-success">确定</el-button></el-col>
                                </el-row>
                                <el-row style="padding:0 20px">
                                    <el-col :span="6" class="pay"><span>支付宝</span></el-col>
                                    <el-col :span="6" class="pay"><el-input size="small" placeholder="请输入结算金额"></el-input></el-col>
                                    <el-col :span="6"  class="pay"><el-input size="small" placeholder="请输入支付码"></el-input></el-col>
                                    <el-col :span="6" class="pay pay2"><el-button type="text" icon="el-icon-success">确定</el-button></el-col>
                                </el-row>
                                <el-row style="padding:0 20px;">
                                    <el-col :span="6" class="pay pay1"><span>微信</span></el-col>
                                    <el-col :span="6" class="pay pay1"><el-input size="small" placeholder="请输入结算金额"></el-input></el-col>
                                    <el-col :span="6" class="pay pay1"><el-input size="small" placeholder="请输入支付码"></el-input></el-col>
                                    <el-col :span="6" class="pay pay3"><el-button type="text" icon="el-icon-success">确定</el-button></el-col>
                                </el-row>
                                <!-- <el-col :span="24">
                                    <el-button @click="add" style="float:right;position:relative;top:40px;right:30px;z-index:7;" size="mini" icon="el-icon-circle-plus-outline" circle></el-button>
                                    el-row
                                    <el-table
                                    border
                                    :data="tableData"
                                    style="width:100%">
                                        <el-table-column
                                            align="center"
                                            label="结算账户">
                                            <template slot-scope="scope">
                                                  <el-select v-model="payments" placeholder="请选择">
                                                    <el-option
                                                    v-for="item in options"
                                                    :key="item.payments"
                                                    :label="item.label"
                                                    :value="item.payments">
                                                    </el-option>
                                                </el-select>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            align="center"
                                            label="结算金额">
                                            <template slot-scope="scope"> 
                                                <el-input size="small" placeholder="请输入结算金额"></el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            align="center"
                                            label="支付码">
                                            <template slot-scope="scope"> <div v-html="scope.row.codes"></div></template>
                                        </el-table-column>
                                        <el-table-column
                                        fixed="right"
                                        label="操作" 
                                        width="100">
                                            <template slot-scope="scope">
                                                <el-button  @click.native.prevent="deleteRow(scope.$index, tableData)" icon="el-icon-delete"></el-button>                            
                                            </template>
                                        </el-table-column>
                                    </el-table> 
                                </el-col>-->
                            </el-row>
                            <el-button class="last-child" style="margin:20px;" type="primary" size="medium" @click="finishPay">结算</el-button>
                        </div>
                    </el-main>
                </el-container>
            </el-main>            
        </el-container>
    </div>
</template>
<script>
import {cart,cartAdd,cartDel,clearcart,checkout,createOrder,priceChange,cashPay} from '../api/apiW';
import goodsDesk from './goodsDesk'
import serverDesk from './serverDesk'
import buyLimit from './buyLimit'
export default {
  data() {
    return {
        activeName: "first",
        input:'', 
        order_id:0, 
        dialogVisible:false,
        dialogVip:false,
        vipNumber:"",
        arr:[],
        discount:0,
        serverDiscount:0,
        money:0,
        serverMoney:0,
        realpay:0,
        serverRealpay:0,
        changeMoney:0,
        serverChangeMoney:0,
        payMoney:0,
        customer:'游客1234567',
        customerPay:0,
        payments:"",
        goodsTableData:[],
        serverTableData:[],
        pickTableData:[],
        tableData:[{
            name:'',
            content:``
        }],
        form:{
            value:true,
        },
        dataB:{},
        value:false, 
        options: [{
          payments: 'pos',
          label: '刷卡'
        }, {
          payments: 'alipay',
          label: '支付宝'
        }, {
          payments: 'weixin',
          label: '微信'
        }],
        payments: '',          
            tableData:[{}],
            tempData:{}
    };
  },
  components:{
      goodsDesk,
      serverDesk,
      buyLimit
  },
  methods: {
    vipCode(val){
        this.arr=this.vipNumber.split("");
        console.log(this.arr);
        this.arr.push(val);
        console.log(this.arr);
        this.vipNumber=this.arr.join("");
    },
    vipCodeDe(){
        this.arr=this.vipNumber.split("");
        this.arr.pop();
        console.log(this.arr);
        this.vipNumber=this.arr.join("");
    },
    handleClick(tab, event) {
      if(tab.label=="购物区"){
          document.getElementById("goodsDesk").style.display="block"
          document.getElementById("serverDesk").style.display="none"
          //document.getElementById("buyLimit").style.display="none"
          document.getElementById("settleAccounts").style.display="none"
      }else if(tab.label=="服务区"){
          document.getElementById("goodsDesk").style.display="none"
          document.getElementById("serverDesk").style.display="block"
          //document.getElementById("buyLimit").style.display="none"
          document.getElementById("settleAccounts").style.display="none"
      }else if(tab.label=="挂单区"){
          document.getElementById("goodsDesk").style.display="block"
          document.getElementById("serverDesk").style.display="none"
          //document.getElementById("buyLimit").style.display="block"
          document.getElementById("settleAccounts").style.display="none"
      }
    },
    settleAccounts(){//-------跳转到结算
        document.getElementById("goodsDesk").style.display="none"
        document.getElementById("serverDesk").style.display="none"
        //document.getElementById("buyLimit").style.display="none"
        document.getElementById("settleAccounts").style.display="block" 
        let dataO=this.$qs.stringify({
            user_id:sessionStorage.user_id,
            postscript:7
        });
        createOrder(dataO).then(res=>{
            this.order_id=res.data.order_id;
            console.log(this.order_id);
            this.money=res.data.real_goods_price;
            this.serverMoney=res.data.virtual_goods_price;
            this.realpay=this.money-this.discount;
            this.serverRealpay=this.serverMoney-this.serverDiscount;
            this.changeMoney=this.realpay;
            this.serverChangeMoney=this.serverRealpay;
            this.payMoney=Number(this.realpay+this.serverRealpay);
            this.customerPay=this.payMoney;
        });
    },
    showMsg(){//-----------组合支付
            console.log(this.value);
            if(this.value===true){
                document.getElementById("payMent").style.display="block";
            }else if(this.value===false){
                document.getElementById("payMent").style.display="none";
            }
        },
        /* add(){//-------添加支付
            this.tableData.push(this.tempData);
        },
        deleteRow(index, rows) {
            rows.splice(index, 1);
        }, */
    getSummaries() {//-----------------------计算总金额
        let sum=0;
        for(let i in this.goodsTableData){
            let price=parseFloat(this.goodsTableData[i].subtotal.slice(1));
            console.log(price);           
           sum+=price;
        }
        console.log(sum);
        document.getElementById("totalPrice").innerHTML="￥"+sum.toFixed(2);
    },
    getNumber(){//---------------------------计算件数
        let sum=0;
        for(let i in this.goodsTableData){
            let number=parseInt(this.goodsTableData[i].goods_number);
           sum+=number;
        }
            document.getElementById("totalNumber").innerHTML=sum;         
    },
    cart(){
        cart({params:{user_id:2}}).then(res=>{ 
            console.log(res.data.goods_list);
            this.goodsTableData=res.data.goods_list;
            this.getSummaries();
            this.getNumber();
        })
    },
    deleteGoods(row) {//--------删除购物车商品
        console.log(row.rec_id);        
        cartDel({params:{user_id:2,rec_id:row.rec_id}}).then(res=>{
            console.log(res);
            this.cart();//-------刷新购物区列表
        });
    },
    handleClose(done) {
        done();
    },
    addGoods: function (item) { //回调方法，接收子组件传的参数
      console.log(item.goods_id);
      let dataA=this.$qs.stringify({
          user_id:2,
          goods_id:item.goods_id
      });
      cartAdd(dataA).then(res=>{//-------添加商品
            console.log(res.errno);
            this.cart();//-------刷新购物区列表
      });
    },
    addServer: function (item) { //回调方法，接收子组件传的参数
      console.log(item.goods_id);
      let dataA=this.$qs.stringify({
          user_id:2,
          goods_id:item.goods_id
      });
      cartAdd(dataA).then(res=>{//-------添加服务
            console.log(res.errno);
            this.cart();//-------刷新购物区列表
      });
    },
    clean(){//-------清空购物车
        clearcart().then(res=>{
            console.log(res.data);
            this.cart();//-------刷新购物区列表
        });
    },
    sureGoods(){//---------商品手动改价后确定
        console.log(this.changeMoney);        
        let dataC=this.$qs.stringify({
            order_id:this.order_id,
            real_goods_price:this.changeMoney
        });
        priceChange(dataC).then(res=>{
            console.log(res);
            this.payMoney=Number(this.changeMoney)+Number(this.serverChangeMoney);
            this.customerPay=this.payMoney;
        });
    },
    sureServer(){//-------服务手动改价后确定
        console.log(this.serverChangeMoney);        
        let dataC=this.$qs.stringify({
            order_id:this.order_id,
            virtual_goods_price:this.ServerChangeMoney
        });
        priceChange(dataC).then(res=>{
            console.log(res);
            this.payMoney=Number(this.changeMoney)+Number(this.serverChangeMoney);
            this.customerPay=this.payMoney;
        });
    },
    finishPay(){//--------完成结算
        console.log(this.customerPay);
        console.log(this.order_id);
        let dataF=this.$qs.stringify({
            order_id:this.order_id,
            money:this.customerPay,
            user_id:2,
        });
        cashPay(dataF).then(res=>{
            this.$alert(res.errmsg+',付款金额：'+res.data.all+'元', '付款通知');
        });
    },
  },
  mounted:function(){
        document.getElementById("goodsDesk").style.display="block";
        document.getElementById("serverDesk").style.display="none";
        document.getElementById("buyLimit").style.display="none";
        document.getElementById("settleAccounts").style.display="none";
        document.getElementById("payMent").style.display="none";
        this.cart();//-------刷新购物区列表
  },
};
</script>
<style scoped>
    .cashierDesk .details{
        padding:25px 25px 40px 25px;    
        text-align:left; 
        background-color: #fff; 
    } 
    .cashierDesk .el-header .el-button{
        font-size:16px;
        margin-left:60px;
        font-weight:bold;
        color:#fff;
    }
    .cashierDesk .el-header{
        padding:10;
        background:black;
        text-align:left;
    }
    .el-aside {
    background-color: #F4F4F4;
    color: #333;
    text-align: center;
    line-height: 200px;
    height:100%;
    }
    .el-tabs__item.is-active{
        color:#25A599;
    }
    .cashierDesk .el-main {
    height:100%;
    border:1px solid #e9eef3;
    color: #333; 
    }
    body > .el-container {
    margin-bottom: 40px;
    }
    .el-aside {
        line-height: 0;
    }
    .el-footer{
        background: #C0C0C0;
        padding-top:10px;
        height:100px;
    }
    .last-child{
        float:right;  
        width:130px;    
        border:none;  
    }
    img:hover{
        cursor:pointer;
    }
    .el-dialog{
        height:300px;
    }
    .el-row{
        padding:0px;
    }
    .el-form-item{
        margin-bottom: 0px;
    }
    .payMsg .el-input{
        float:left;
        margin-left:20px;
        width:96%;
    }
    #settleAccounts{
        background:#fff;
    }
    #settleAccounts .el-col .el-input{
        margin-bottom:10px;
    }
    #settleAccounts .el-switch{
        position: relative;
        top:370px;
        left:20px;
    }
    #settleAccounts #payMent{
        text-align:center;
        padding-bottom:20px;
    }
    #settleAccounts #payMent .pay{
       border-left:1px solid #DCDFE6;
       border-top:1px solid #DCDFE6;
       padding:20px;
       height:70px;
    }
    #settleAccounts #payMent .pay1{
        border-bottom:1px solid #DCDFE6;
    }
    #settleAccounts #payMent .pay2{
        border-right:1px solid #DCDFE6;
    }
    #settleAccounts #payMent .pay3{
        border-right:1px solid #DCDFE6;
        border-bottom:1px solid #DCDFE6;
    }
    .cashierDesk .code{
        width:100%;
        height:50px;
        font-size:20px;
    }
</style>