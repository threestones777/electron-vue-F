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
                        <div style="padding:10px;background:#fff">
                            <el-row type="flex" justify="space-around" :gutter="10">
                                <el-col :span="24" style="text-align:left;margin-left:20px;">
                                   <p><img src="../assets/images/vip.png">游客：{{formVipTemp.name}}</p>
                                </el-col>
                            </el-row>
                            <el-row type="flex" justify="space-around" :gutter="10" style="margin-top:30px;">
                                <el-col :span="8">
                                   <p>余额：0.00</p>
                                </el-col>
                                <el-col :span="8">
                                    <p>等级：{{formVipTemp.user_rank}}</p> 
                                </el-col>
                                <el-col :span="8">
                                    <p>折扣：无</p>
                                </el-col>
                            </el-row>
                            <el-row type="flex" justify="space-around" :gutter="10" style="margin-top:40px;">
                                <el-col :span="8" style="padding-right:35px;">
                                   <span>收银员:</span> 
                                    <el-select size="small" style="position:relative;bottom:18px;left:75px;width:70%" v-model="value1">
                                        <el-option
                                        v-for="item in options1"
                                        :key="item.value1"
                                        :label="item.label"
                                        :value="item.value1">
                                        </el-option>
                                    </el-select> 
                                </el-col>
                                <el-col :span="8" style="padding-right:35px;">
                                   <span>营业员:</span> 
                                    <el-select id="assistant" ref="assistant" size="small" style="position:relative;bottom:18px;left:75px;width:70%" v-model="value2">
                                        <el-option
                                        v-for="item in options2"
                                        :key="item.value2"
                                        :label="item.label"
                                        :value="item.value2">
                                        </el-option>
                                    </el-select> 
                                </el-col>
                                <el-col :span="8">
                                    <p>积分：0</p>
                                </el-col>
                            </el-row>
                            <el-row type="flex" justify="space-around" :gutter="10" style="margin:5px 0 10px 0;">
                                <el-col :span="8">
                                   <p>新单：</p>
                                </el-col>
                                <el-col :span="8">
                                    <p>挂单：</p> 
                                </el-col>
                                <el-col :span="8">
                                    <p>退货：</p>
                                </el-col>
                            </el-row>
                        </div>
                        <el-tabs style="height:255px;overflow:auto;" v-model="activeName1" stretch @tab-click="handleClick1">
                            <el-tab-pane label="商品信息" name="goods">
                                <el-form ref="form" :model="formGood" label-width="80px">
                                    <el-row style="padding:0 10px" type="flex" justify="space-around" :gutter="10">
                                        <el-col :span="12">
                                            <el-form-item label="货号">
                                                <el-input size="small" v-model="formGood.goods_sn" placeholder="货号"></el-input>    
                                            </el-form-item> 
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="营业员">
                                                <el-input size="small" v-model="value2" placeholder="营业员"></el-input>    
                                            </el-form-item> 
                                        </el-col>
                                    </el-row>
                                    <el-row style="padding:0 10px" type="flex" justify="space-around" :gutter="10">
                                        <el-col :span="16">
                                            <el-form-item label="商品名称">
                                                <el-input size="small" v-model="formGood.goods_name" placeholder="商品名称"></el-input>    
                                            </el-form-item> 
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="单位">
                                                <el-input size="small" v-model="formGood.goods_name1" placeholder="单位"></el-input>    
                                            </el-form-item> 
                                        </el-col>
                                    </el-row>
                                    <el-row style="padding:0 10px" type="flex" justify="space-around" :gutter="10">
                                        <el-col :span="8">
                                            <el-form-item label="规格">
                                                <el-input size="small" v-model="formGood.goods_name" placeholder="规格"></el-input>    
                                            </el-form-item> 
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="最低售价">
                                                <el-input size="small" v-model="formGood.shop_price" placeholder="最低售价"></el-input>    
                                            </el-form-item> 
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="授权人">
                                                <el-input size="small" v-model="formGood.goods_name1" placeholder="授权人"></el-input>    
                                            </el-form-item> 
                                        </el-col>
                                    </el-row>
                                    <el-row style="padding:0 10px" type="flex" justify="space-around" :gutter="10">
                                        <el-col :span="8">
                                            <el-form-item label="价格">
                                                <el-input size="small" v-model="formGood.shop_price" placeholder="价格"></el-input>    
                                            </el-form-item> 
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="数量">
                                                <el-input size="small" v-model="formGood.goods_number" placeholder="数量"></el-input>    
                                            </el-form-item> 
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="折扣率">
                                                <el-input size="small" v-model="formGood.goods_number1" placeholder="折扣率"></el-input>    
                                            </el-form-item> 
                                        </el-col>
                                    </el-row>
                                    <el-row style="padding:0 10px" type="flex" justify="space-around" :gutter="10">
                                        <el-col :span="8">
                                            <el-form-item label="商品积分">
                                                <el-input size="small" v-model="formGood.integral" placeholder="商品积分"></el-input>    
                                            </el-form-item> 
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="类型">
                                                <el-input size="small" v-model="formGood.cat_name1" placeholder="类型"></el-input>    
                                            </el-form-item> 
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="备注">
                                                <el-input size="small" v-model="formGood.cat_name1" placeholder="备注"></el-input>    
                                            </el-form-item> 
                                        </el-col>
                                    </el-row>
                                </el-form>
                            </el-tab-pane>
                        </el-tabs>
                        <el-tabs style="height:385px;overflow:auto;" stretch v-model="activeName" @tab-click="handleClick">
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
                                    width="120"
                                    label="数量">
                                        <template slot-scope="scope">
                                            <el-input-number :min="1" :max="10" size="small" style="width:100%" v-model="scope.row.goods_number"></el-input-number>
                                        </template>
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
                                    label="数量">
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
                                    prop="goods_id"
                                    align="center"
                                    label="商品名称">
                                </el-table-column>
                                <el-table-column
                                    prop="goods_number"
                                    align="center"
                                    label="数量">
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
                                    <el-button
                                    @click.native.prevent="deleteRow(scope.$index, pickTableData)"
                                    type="text"
                                    size="small">
                                    移除
                                    </el-button>
                                    <el-button
                                    @click.native.prevent="settleAccounts"
                                    type="text"
                                    size="small">
                                    结算
                                    </el-button>
                                </template>
                                </el-table-column>
                                </el-table>
                            </el-tab-pane>
                        </el-tabs>
                        <div style="background:#fff;height:100px">
                            <div style="padding:30px 30px 0 30px">
                                <el-row type="flex" justify="space-around" :gutter="10">
                                    <el-col :span="5">
                                        <span style="display:inline-block;float:left">数量：<span id="totalNumber" style="color:#FF7815">0</span></span>    
                                    </el-col>
                                    <el-col :span="7">
                                        <span>优惠：￥0.00</span>
                                    </el-col>
                                    <el-col :span="7">
                                        <span>原价：￥0</span>
                                    </el-col>
                                    <el-col :span="7">
                                        <span style="display:inline-block;float:right;color:#FF7815" id="totalPrice">总价：￥0</span>
                                    </el-col>
                                </el-row>
                            </div>
                            <!--background=-->
                            <div style="padding:30px 30px 0 30px">
                                <!---->
                                <el-button class="last-child" type="primary" size="medium"  @click="settleAccounts">去结算</el-button>
                                <el-button style="float:right;margin-right:10px;" type="text" @click="clean">清空</el-button>
                            </div>
                        </div>
                    </el-aside>
                    <el-main>
                        <!--------------------------------- 会员 ---------------------------------------->
                        <div style="padding:20px;">
                            <el-button size="medium" style="background:#FF7815;color:#fff" @click="openVip"><img src="../assets/images/vip.png" style="vertical-align:middle;">&nbsp;&nbsp;会员</el-button>
                            <img src="../assets/images/scan.png" style="position:relative;top:5px;left:29%;z-index:7;">
                            <el-input ref="goods" placeholder=" 输入或扫描商品二维码" v-model="goodSn" style="width:30%;margin-right:50px" autofocus="autofocus" @keyup.enter.native="assistant" @blur="assistant"></el-input>
                            <el-input prefix-icon="el-icon-search" placeholder="商品名称/首拼字母/条形码" style="width:30%;"></el-input>
                        </div>
                        <goods-desk v-on:addGoods="addGoods" id="goodsDesk"></goods-desk>
                        <server-desk  v-on:addServer="addServer" id="serverDesk"></server-desk>
                        <buy-limit id="buyLimit"></buy-limit>
                        <div style="width:60%;position:absolute;top:920px;padding:5px;margin-top:0px;text-align:left;background:#F5F5F5;">
                            <el-row type="flex" justify="space-around" :gutter="2" style="margin-top:10px;background:#F5F5F5">
                                <el-col :span="3">
                                    <el-button size="mini">数量Q</el-button>    
                                </el-col>
                                <el-col :span="3">
                                    <el-button  size="mini">商品折扣O</el-button>
                                </el-col>
                                <el-col :span="3">
                                    <el-button size="mini" >数据交换J</el-button>
                                </el-col>
                                <el-col :span="3">
                                    <el-button size="mini" >删除U</el-button>    
                                </el-col>
                                <el-col :span="3">
                                    <el-button  size="mini">前台退货B</el-button>
                                </el-col>
                                <el-col :span="3">
                                    <el-button size="mini" >挂单P</el-button>
                                </el-col>
                                <el-col :span="3">
                                    <el-button  size="small">会员卡N</el-button>
                                </el-col>
                                <el-col :span="3">
                                    <el-button  size="small">营业员L</el-button>
                                </el-col>
                            </el-row>
                            <el-row type="flex" justify="space-around" :gutter="10" style="margin-top:10px;background:#F5F5F5">
                                <el-col :span="3">
                                    <el-button  size="small">赠送S</el-button>    
                                </el-col>
                                <el-col :span="3">
                                    <el-button  size="small">功能菜单M</el-button>   
                                </el-col>
                                <el-col :span="3">
                                    <el-button  size="small">退出Esc</el-button>
                                </el-col>
                                <el-col :span="3"></el-col>
                                <el-col :span="3"></el-col>
                                <el-col :span="3"></el-col>
                                <el-col :span="3"></el-col>
                                <el-col :span="3"></el-col>
                            </el-row>
                        </div>
                        <!-- 会员弹窗 -->
                        <el-dialog
                        title="会员信息"
                        :visible.sync="dialogVip"
                        width="400px">
                            <el-input id="writeVip" ref="input" v-model="vipNumber" placeholder="扫码/输入会员卡号或手机号" @keyup.enter.native="vipMsg" style="margin-bottom:10px"/>
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
                                <el-button type="primary" @click="vipMsg">确 定</el-button>
                            </span>
                        </el-dialog>
                        <!-- 营业员弹窗 -->
                        <el-dialog
                        title="营业员"
                        :visible.sync="dialogAssistant"
                        width="30%"
                        :before-close="handleClose">
                                <el-radio v-model="value2" label="刘晓娜" @change="changeAssistant">刘晓娜</el-radio>
                                <el-radio v-model="value2" label="小红" @change="changeAssistant">小红</el-radio>
                                <span slot="footer" class="dialog-footer">
                                    <el-button @click="dialogAssistant = false">取 消</el-button>
                                    <el-button type="primary" @click="changeAssistant(),dialogAssistant = false">确 定</el-button>
                                </span>
                        </el-dialog>
                        <!-- 功能菜单 -->
                       <el-dialog 
                        title="功能菜单" :visible.sync="dialogFunction" width="30%" style="text-align:center">
                            <el-button @click="()=>{this.dialogBack=true}">按单退货</el-button><br><br>
                            <el-button>重打印小票</el-button>
                        </el-dialog> 
                        <!-- 零售退货单 -->
                            <el-dialog
                            title="零售退货单"
                            :visible.sync="dialogBack"
                            width="700px"
                            border
                            :before-close="handleClose1">
                                <el-row type="flex" justify="space-around" :gutter="10">
                                    <el-col :span="8">
                                        <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="search"  size="mini"  placeholder="订单号"/>   
                                    </el-col>
                                    <el-col :span="6">
                                        <el-select v-model="value7" size="small" placeholder="分店">
                                            <el-option
                                            v-for="item in options7"
                                            :key="item.value7"
                                            :label="item.label"
                                            :value="item.value7">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="10">
                                        <el-date-picker
                                        v-model="value8"
                                        type="daterange" size="mini" style="width:100%"
                                        align="right"
                                        unlink-panels
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                        </el-date-picker>
                                    </el-col>
                                </el-row>
                                <el-table
                                :data="goodsBackData">
                                    <el-table-column
                                        prop="goods_id"
                                        align="center"
                                        label="商品名称">
                                    </el-table-column>
                                    <el-table-column
                                        prop="goods_number"
                                        align="center"
                                        width="120"
                                        label="数量">
                                    </el-table-column>
                                    <el-table-column
                                        prop="subtotal"
                                        align="center"
                                        label="总额">
                                    </el-table-column>
                                </el-table><br><br>
                                <el-row type="flex" justify="space-around" :gutter="10">
                                    <el-col :span="7">
                                        <span>数量：0</span>    
                                    </el-col>
                                    <el-col :span="7">
                                        <span>总额：￥0</span>
                                    </el-col>
                                    <el-col :span="7">
                                    </el-col>
                                </el-row>
                                <span slot="footer" class="dialog-footer">
                                    <el-button size="small" @click="dialogBack = false">取 消</el-button>
                                    <el-button size="small" type="primary" @click="dialogBack = false">退货</el-button>
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
import {getGoodsDeail} from '../api/api';
import goodsDesk from './goodsDesk'
import serverDesk from './serverDesk'
import buyLimit from './buyLimit'
import { setTimeout } from 'timers';
export default {
    inject: ['reload'],
  data() {
    return {
        autofocus:true,
        activeName: "first",
        activeName1: "goods",
        input:'', 
        goodSn:"",
        search:'',
        order_id:0, 
        dropdown:false,
        dialogVisible:false,
        dialogVip:false,
        dialogAssistant:false,
        dialogFunction:false,
        dialogBack:false,
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
        customer:'游客',
        customerPay:0,
        payments:"",
        goodsTableData:[],
        goodsBackData:[],
        serverTableData:[],
        pickTableData:[],
        tableData:[{
            name:'',
            content:``
        }],
        form:{
            value:true,
        },
        formVip:{},
        formVipTemp:{
            mobile:"18863739921",
            user_rank:0,
            surplus_amount:"43.7",
            discount:0,
            consignee:""

        },
        formGood:{},
        dataB:{},
        value:false, 
        value1:"001", 
        value2:"刘晓娜", 
        value7:"1号店",
        value8:"",
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
        autofocus:"autofocus",
        options1: [{
          value1: '001',
          label: '001'
        }, {
          value1: '002',
          label: '002'
        },],
        options2: [{
          value2: '刘晓娜',
          label: '刘晓娜'
        }, {
          value2: '小红',
          label: '小红'
        },],
        options7: [{
            value7: '选项1',
            label: '0号店'
            }, {
            value7: '选项2',
            label: '1号店'
        },],
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
        changeAssistant(){  //----------营业员改变后打开会员弹窗
            console.log(this.value2);
            this.dialogAssistant=false;
            setTimeout(()=>{this.openVip();},500)
            
        },
        openVip(){//-------------打开会员弹窗
                this.dialogVip=true;
                this.$nextTick(() => {this.$refs['input'].focus()});

        },
        vipMsg(){//----------------会员信息
            if(this.vipNumber!==""){
                    this.dialogVip = false;
                    this.formVipTemp.name=new Date().toLocaleDateString().replace("/","-").replace("/","-");
                    this.formVipTemp.mobile=this.vipNumber;
                    this.formVipTemp.user_rank=parseInt(Math.random()*10);
                    this.formVip=this.formVipTemp;
            }else{
                    this.$message({
                        type: "error",
                        message: "请输入会员卡号或手机号",
                        duration: 2000
                    });
            }
        },
        assistant(){
            if(this.goodSn==""){
                this.$message({
                        type: "error",
                        message: "请输入或扫描商品码",
                        duration: 2000
                    });
            }else{
                this.dialogAssistant=true;
                let dataA=this.$qs.stringify({
                    user_id:2,
                    goods_id:this.goodSn
                });
                cartAdd(dataA).then(res=>{//-------添加商品
                        console.log(res.errno);
                        this.cart();//-------刷新购物区列表
                });
                getGoodsDeail({params:{goods_id:this.goodSn}}).then(res=>{
                    console.log(res.data);
                    this.formGood=res.data;
                });
                this.goodSn="";
                //this.$nextTick(() => {this.$refs['assistant'].focus()});
            }
        },
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
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
    handleClick1(){

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
        document.getElementById("totalPrice").innerHTML="总价：￥"+sum.toFixed(2);
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
        setTimeout(()=>{this.openVip();},500)
    },
    handleClose1(done) {
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
        getGoodsDeail({params:{goods_id:item.goods_id}}).then(res=>{
            console.log(res.data);
            this.formGood=res.data;
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
    init(){
        document.getElementById("goodsDesk").style.display="block";
        document.getElementById("serverDesk").style.display="none";
        document.getElementById("buyLimit").style.display="none";
        document.getElementById("settleAccounts").style.display="none";
        document.getElementById("payMent").style.display="none";
        this.cart(); 
    },
  },
  mounted:function(){
        this.init(this);       //-------刷新购物区列表
        this.$nextTick(() => {this.$refs['goods'].focus()});
        let that=this;
        document.onkeydown = function(e){
            if(e.ctrlKey &&e.keyCode===78){   //------------------------ctrl+N 打开会员弹窗
                that.openVip();
            };
            if(e.ctrlKey &&e.keyCode===74){  //-------------------------------ctrl+J  数据交换(页面刷新)
                that.init(that);
                that.$nextTick(() => {that.$refs['goods'].focus()});  //-----聚焦
                that.$router.push('/temp');
            };
            if(e.keyCode===27){     //-------Esc 退出返回主页面
                that.$router.push('/');
            }
            if(e.ctrlKey&&e.keyCode===77){ //-------------------------ctrl+M 功能菜单
                console.log("功能菜单");
                that.dialogFunction=true;

            }
            if(e.ctrlKey&&e.keyCode===81){ //------------------------- ctrl+Q 数量
                console.log("数量");
            }
            if(e.ctrlKey&&e.keyCode===79){ //------------------------- ctrl+O 商品折扣
                console.log("商品折扣");
            }
            if(e.ctrlKey&&e.keyCode===66){ //------------------------- ctrl+B 前台退货
                console.log("前台退货");
                that.dialogBack=true;
            }
            if(e.ctrlKey&&e.keyCode===80){ //------------------------- ctrl+P 挂单
                console.log("挂单");
                that.activeName="third";
                that.pickTableData=that.goodsTableData;
                //that.goodsTableData=[];
            }
            if(e.ctrlKey&&e.keyCode===76){ //------------------------- ctrl+L 营业员 
                that.dialogAssistant=true;
                //that.$nextTick(() => {that.$refs['assistant'].focus()});
                //that.openVip(); 
                //document.getElementById("assistant").parentNode.classList.add("is-focus");
                //console.log(document.getElementById("assistant").parentNode);
                //that.$nextTick(() => {that.$refs['assistant'].select});
                //remarkable  something else in the label of something 商品折扣
            }
        }
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
        height:770px;
        overflow: auto;
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
    /* skkk bule */
</style>