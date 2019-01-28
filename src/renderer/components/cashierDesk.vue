<template>
    <div class="cashierDesk">
        <el-container>
            <el-header>
                <div style="float:left;margin-top:20px;">
                    <img style="vertical-align:sub" src="../assets/images/log.png" >
                    <span style="font-size:23px;font-weight:bold;color:#fff">新零售收银台</span>
                </div>
                <div style="float:right;color:#FFF;font-size:16px;margin-top:10px;">
                    <span>
                            <el-select @change="changeCashier" size="small" style="width:120px" v-model="value3">
                                <el-option
                                v-for="item in options3"
                                :key="item.value3"
                                :label="item.label"
                                :value="item.value3">
                                </el-option>
                            </el-select> 
                    </span>
                    <span>
                        <span>收银员:</span> 
                        <el-select @change="changeCashier" size="small" style="width:100px;" v-model="id">
                            <el-option
                            v-for="item in options1"
                            :key="item.id"
                            :label="item.nickname"
                            :value="item.id">
                            </el-option>
                        </el-select> 
                        <!-- <select style="width:120px;height:32px;border-radius:7px;background:#43C0C2;border:1px solid #fff;color:#fff;" @change="test">
                            <option :value ="cas.id" v-for="(cas,index) in options1" :key="index">{{cas.nickname}}</option>
                        </select> -->
                    </span>
                    <span>
                        营业员：<input style="width:70px;height:32px;border-radius:5px;font-size:12px;background:#43C0C2;color:#fff;border:1px solid #fff;padding-left:7px;" size="small" v-model="value2" @focus="showAssistant" placeholder="营业员"/>
                    </span>
                    <span @click="$router.push('/')" style="margin-left:40px">
                        <img style="vertical-align:middle" src="../assets/images/back.png">
                        <el-button type="text">返回</el-button>
                    </span>
                </div>           
            </el-header>
            <el-main>
                <el-container style="height:100%">
                    <el-aside width="570px" height="100%">
                        <div style="padding:10px;background:#fff">
                            <el-row type="flex" justify="space-around" :gutter="10">
                                <el-col :span="12" style="text-align:left;margin-left:20px;">
                                   <p style="font-size:16px;"><img src="../assets/images/vip.png">会员：{{formVipTemp.consignee}}</p>
                                </el-col>
                                <el-col :span="10">
                                    <el-button size="small" style="background:#FF7815;color:#fff;float:right" @click="openVip"><img src="../assets/images/vip.png" style="vertical-align:middle;">&nbsp;&nbsp;会员</el-button>
                                </el-col>
                                <el-col :span="2"></el-col>
                            </el-row>
                            <el-row type="flex" justify="space-around" :gutter="10" style="margin-top:20px;">
                                <el-col :span="8">
                                   <p>
                                       <img style="vertical-align:middle"  src="../assets/images/money.png">
                                       <span style="font-size:16px;">余额：{{formVipTemp.user_money}}</span>
                                    </p>
                                </el-col>
                                <el-col :span="8">
                                    <p>
                                       <img style="vertical-align:middle"  src="../assets/images/rank.png">
                                       <span style="font-size:16px;">等级：{{formVipTemp.rank_name}}</span>
                                    </p>
                                </el-col>
                            </el-row>
                            <el-row type="flex" justify="space-around" :gutter="10" style="margin-top:40px;">
                                <el-col :span="8">
                                    <p>
                                        <img style="vertical-align:middle"  src="../assets/images/intergal.png">
                                        <span style="font-size:16px;">优惠：{{formVipTemp.discount==10?'无':formVipTemp.discount+"折"}}</span>
                                    </p>
                                </el-col>
                                <!-- <el-col :span="8" style="padding-right:35px;">
                                   <span>收银员:</span> 
                                    <el-select @change="changeCashier" size="small" style="position:relative;bottom:18px;left:75px;width:70%" v-model="id">
                                        <el-option
                                        v-for="item in options1"
                                        :key="item.id"
                                        :label="item.nickname"
                                        :value="item.id">
                                        </el-option>
                                    </el-select> 
                                </el-col> -->
                                <!-- <el-col :span="8" style="padding-right:35px;">
                                    营业员：<el-input style="position:relative;bottom:18px;left:75px;width:70%;" size="small" v-model="value2" @focus="showAssistant" placeholder="营业员"/> -->
                                   <!-- <span>营业员:</span> 
                                    <el-select id="assistant" ref="assistant" size="small" style="position:relative;bottom:18px;left:75px;width:70%" v-model="value2">
                                        <el-option
                                        v-for="item in options2"
                                        :key="item.value2"
                                        :label="item.label"
                                        :value="item.value2">
                                        </el-option>
                                    </el-select>
                                </el-col> -->
                                <el-col :span="8">
                                    <p>
                                        <img style="vertical-align:middle"  src="../assets/images/intergal.png">
                                        <span style="font-size:16px;">积分：{{formVipTemp.rank_points}}</span>
                                    </p>
                                </el-col>
                            </el-row>
                        </div>
                        <!--  @cell-click="editCartNumber" -->
                        <el-tabs style="height:72%;overflow:auto;" stretch v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="购物区" name="first">
                                <el-table
                                :data="goodsTableData">
                                <el-table-column
                                    prop="goods_name"
                                    align="center"
                                    label="商品名称">
                                    <template slot-scope="scope">
                                        <span :title="scope.row.goods_name">{{scope.row.goods_name.slice(0,7)+"..."}}</span>
                                    </template>
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
                                            <el-input-number @change="editCartNumber(scope.row)" :min="1" :max="100000" size="small" style="width:100%" v-model="scope.row.goods_number"></el-input-number>
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
                                    prop="goods_name"
                                    align="center"
                                    label="商品名称">
                                    <template slot-scope="scope">
                                        <span :title="scope.row.goods_name">{{scope.row.goods_name.slice(0,7)+"..."}}</span>
                                    </template>
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
                                        <template slot-scope="scope">
                                            <el-input-number @change="editCartNumber(scope.row)" :min="1" :max="100000" size="small" style="width:100%" v-model="scope.row.goods_number"></el-input-number>
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
                            <el-tab-pane label="挂单区" name="third">
                                <el-table
                                :data="pickTableData">
                                <el-table-column
                                    prop="goods_name"
                                    align="center"
                                    label="商品名称">
                                    <template slot-scope="scope">
                                        <span :title="scope.row.goods_name">{{scope.row.goods_name.slice(0,7)+"..."}}</span>
                                    </template>
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
                                <el-button style="float:right;margin:10px;" size="small" @click="cancelP">取消挂起</el-button>
                            </el-tab-pane>
                        </el-tabs>
                        <div style="background:#fff;height:100px">
                            <div style="padding:30px 30px 0 30px">
                                <el-row type="flex" justify="space-around" :gutter="10">
                                    <el-col :span="5">
                                        <span style="font-size:16px;display:inline-block;float:left">数量：<span id="totalNumber" style="color:#FF7815">0</span></span>    
                                    </el-col>
                                    <el-col :span="6">
                                        <span style="font-size:16px;" id="discount">优惠：￥</span>
                                    </el-col>
                                    <el-col :span="7">
                                        <span style="font-size:16px;" id="oriPrice">原价：￥0</span>
                                    </el-col>
                                    <el-col :span="7">
                                        <span style="font-size:16px;display:inline-block;float:right;color:#FF7815" id="totalPrice">总价：￥0</span>
                                    </el-col>
                                </el-row>
                            </div>
                            <div style="padding:30px 30px 0 30px">
                                <!---->
                                <el-button class="last-child" style="background:#FC8F3D;color:#fff" size="medium"  @click="settleAccounts">结算+</el-button>
                                <el-button class="last-child" style="background:#3CACAD;margin-right:10px;color:#fff" size="medium"  @click="pickTable">挂单</el-button>
                                <el-button size="small" style="float:left;margin-right:10px;background:#43C0C2;color:#fff" @click="clean">清空</el-button>
                            </div>
                        </div>
                    </el-aside>
                    <el-main>
                        <!--settleAccounts-->
                        <el-dialog
                        id="pay"
                        title="订单结算"
                        :visible.sync="dialogPay"
                        width="750px"
                        :before-close="handleClose">
                        <el-row style="margin:0;" type="flex" justify="space-around" :gutter="10">
                            <el-col style="padding:20px" :span="16">
                                <el-row type="flex" justify="space-around" :gutter="10">
                                    <el-col :span="6">
                                        <span>满减</span>  
                                    </el-col>
                                    <el-col :span="18">
                                        无
                                    </el-col>
                                </el-row> <br>
                                <el-row type="flex" justify="space-around" :gutter="10">
                                    <el-col :span="6">
                                        <span>优惠券</span>  
                                    </el-col>
                                    <el-col :span="18">
                                        <el-select size="small" v-model="value7" placeholder="请选择">
                                            <el-option
                                            v-for="item in options7"
                                            :key="item.value7"
                                            :label="item.label"
                                            :value="item.value7">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-row> <br>
                                <el-row type="flex" justify="space-around" :gutter="10">
                                    <el-col :span="6">
                                        <span>积分抵现</span>  
                                    </el-col>
                                    <el-col :span="18">
                                        <el-input size="small" style="width:60%" v-model="jfpay"/>
                                        <i class="el-icon-success" style="color:#FB7401"></i>
                                        <span>可抵扣￥0.00元</span>
                                    </el-col>
                                </el-row> <br>
                                <el-row type="flex" justify="space-around" :gutter="10">
                                    <el-col :span="6">
                                        <span>优惠</span>  
                                    </el-col>
                                    <el-col :span="18">
                                        无
                                    </el-col>
                                </el-row> <br>
                                <el-row type="flex" justify="space-around" :gutter="10">
                                    <el-col :span="6">
                                        <span>赠送积分</span>  
                                    </el-col>
                                    <el-col :span="18">
                                        <span>0</span>
                                    </el-col>
                                </el-row> <br>
                                <el-row type="flex" justify="space-around" :gutter="10">
                                    <el-col :span="6">
                                        <span>备注信息</span>  
                                    </el-col>
                                    <el-col :span="18">
                                        <textarea name="" id="" cols="30" rows="7">
                                            
                                        </textarea>
                                    </el-col>
                                </el-row> <br><br>    
                                <el-button size="small" @click="()=>{dialogPay=false;this.clean();}" class="diaButn">取消订单</el-button>
                                <!-- <el-button size="small" class="diaButn" style="background:#3CACAD;color:#fff;"  @click="pickTable">挂单</el-button>         -->
                            </el-col>
                            <el-col :span="8" style="background:#F3F3F3;padding:20px;">
                                <p style="font-size:23px;margin-bottom:10px;font-weight:bold;">应付款：</p>
                                    <h1>
                                        <span v-if="spShow" style="color:#FF654D;font-size:23px;display:inline-block;height:32px">￥{{customerPay}}</span>
                                        <p style="margin-bottom:7px;">
                                            <el-input size="small" v-if="btShow" v-model="customerPay">
                                                <el-button slot="append" @click="sureGoods">确定</el-button>
                                            </el-input>
                                        </p>
                                    </h1>
                                <p><el-button size="small" style="background:#FE9C03;color:#fff" @click="changePrice">改价</el-button></p><br>
                                <p style="font-size:23px;margin-bottom:10px;font-weight:bold;">支付方式</p><br>
                                <el-row style="background:#F3F3F3" type="flex" :gutter="10" justify="space-between">
                                    <el-col :span="7">
                                        <el-card id="net" class="payChose" style="background:#fff">
                                            <img src="../assets/images/scan1.png"><br>
                                            扫码
                                        </el-card>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-card id="net"  class="payChose" @click.native="netPay">
                                            <img src="../assets/images/yue.png"><br>
                                            余额
                                        </el-card>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-card id="net" @click.native="cashierPay"  class="payChose" style="background:#FFF8E8">
                                            <img src="../assets/images/dollor.png"><br>
                                            现金
                                        </el-card>
                                    </el-col>
                                </el-row> <br><br>
                                <div id="netMoney" style="display:none;height:140px;">
                                    <el-row style="margin-left:0px;background:#F3F3F3" type="flex" :gutter="10">
                                        <el-col style="padding-top:7px;" :span="10">
                                        <span style="font-size:18px;">余额付款</span>
                                        </el-col>
                                        <el-col :span="14">
                                            <span style="display:inline-block;font-size:20px;margin-top:5px;">{{realpay}}</span>
                                        </el-col>
                                    </el-row> <br><br>
                                    <el-button size="small" style="width:200px;background:#FE9C03;color:#fff" @click="yuePay">确 定</el-button>
                                </div>
                                <div id="cashier" style="display:block;height:140px;">
                                    <el-row style="margin-left:0px;background:#F3F3F3" type="flex" :gutter="10">
                                        <el-col style="padding-top:7px;" :span="8">
                                            <span style="font-size:18px;">实收款</span>
                                        </el-col>
                                        <el-col :span="16">
                                            <el-input v-model="realpay" @input="retrMon"></el-input>
                                        </el-col>
                                    </el-row> <br>
                                    <el-row style="margin-left:0px;background:#F3F3F3" type="flex" :gutter="10">
                                        <el-col style="padding-top:7px;" :span="8">
                                        <span style="font-size:18px;">应找零</span>
                                        </el-col>
                                        <el-col :span="16">
                                            <span style="display:inline-block;font-size:20px;margin-top:5px;">{{returnPay}}</span>
                                        </el-col>
                                    </el-row> <br><br>
                                    <el-button size="small" style="width:200px;background:#FE9C03;color:#fff" @click="finishPay">确 定</el-button>
                                </div>
                            </el-col>
                        </el-row> 
                        </el-dialog>
                        <!--------------------------------- 会员  ---------------------------------------->
                        
                        <el-row type="flex" justify="space-around" style="height:950px">
                            <el-col :span="21">
                                <div id="scanGoods" style="padding:20px;position:relative;width:300px; ">
                                    <img src="../assets/images/scan.png" style="position:relative;top:37px;left:5%;z-index:7;">
                                    <el-input id="test1" ref="goods" placeholder=" 输入或扫描商品条形码" v-model="goodSn" @keyup.enter.native="assistant" style="width:100%;margin-right:50px;" autofocus="autofocus"></el-input>
                                </div>
                                <goods-desk v-on:addGoods="addGoods" id="goodsDesk"></goods-desk>
                                <server-desk  v-on:addServer="addServer" id="serverDesk"></server-desk>
                                <buy-limit id="buyLimit"></buy-limit>    
                            </el-col>
                            <el-col :span="3" style="text-align:center;padding-top:10px;" >
                                <el-button size="small" style="width:80%;background:#7D94FA;color:#fff" @click="()=>{this.init();this.$nextTick(() => {this.$refs['goods'].focus()});this.$router.push('/temp');}">数据交换J</el-button><br><br>
                                <el-button size="small" style="width:80%;background:#7FD4CF;color:#fff" @click="()=>{this.openVip();}">会员N</el-button><br><br>
                                <el-button size="small" style="width:80%;background:#2A83FB;color:#fff" @click="()=>{this.$router.push('/');}">退出Esc</el-button><br><br>
                                <el-button size="small" style="width:80%;background:#F66C6C;color:#fff" @click="()=>{this.dialogFunction=true;}">功能菜单M</el-button><br><br>
                                <el-button size="small" style="width:80%;background:#FBAF7D;color:#fff" disabled>数量Q</el-button><br><br>
                                <el-button size="small" style="width:80%;background:#7BB3FE;color:#fff" disabled>商品折扣O</el-button><br><br>
                                <el-button size="small" style="width:80%;background:#FC5FB2;color:#fff" @click="dialogBack=true;">前台退货B</el-button><br><br>
                                <el-button size="small" style="width:80%;background:#2A83FB;color:#fff" @click="()=>{this.activeName='third';this.pickTableData=this.goodsTableData;}">挂单P</el-button><br><br>
                                <el-button size="small" style="width:80%;background:#7FD4CF;color:#fff" @click="()=>{this.getAssistants();}">营业员L</el-button><br><br>
                                
                            </el-col>
                        </el-row> 
                        
                        
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
                        <!-- 注册弹窗 -->
                        <el-dialog
                        title="会员注册"
                        :visible.sync="dialogRegister"
                        width="400px">
                        <el-input v-model="vipNumber"/>
                        <el-button style="float:right;position:relative;bottom:35px;right:10px;" size="small" type="text" @click="getCode">点击获取验证码</el-button>
                        <el-input  v-model="securityCode" placeholder="请输入验证码"/>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogRegister = false">取 消</el-button>
                            <el-button type="primary" @click="register">确 定</el-button>
                        </span>
                        </el-dialog>
                        <!-- 营业员弹窗 -->
                        <el-dialog
                        title="营业员"
                        :visible.sync="dialogAssistant"
                        width="40%"
                        :before-close="handleClose">
                                <el-radio v-model="value2" :label="assis"  v-for="(assis,index) in assistants" :key="index" @change="changeAssistant"></el-radio>
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

                    </el-main>
                </el-container>
            </el-main>            
        </el-container>
    </div>
</template>
<script>
import {cart,cartAdd,editCartN,cartDel,clearcart,checkout,createOrder,priceChange,cashPay,cashierList,sendMobileCode,register,balancepay,pickData,cancelPick,saleclerklist} from '../api/apiW';
import {getGoodsDeail,getWorkerList,getcustomerList} from '../api/api';
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
        spShow:true,
        btShow:false,
        vipBtn:false,
        dropdown:false,
        dialogVisible:false,
        dialogVip:false,
        dialogRegister:false,
        dialogAssistant:false,
        dialogFunction:false,
        dialogBack:false,
        dialogPay:false,
        vipNumber:"18658138222",
        securityCode:'',
        tem_order_id:"",
        arr:[],
        discount:0,
        serverDiscount:0,
        totalPrice:0,
        total:"",
        money:0,
        serverMoney:0,
        realpay:0,
        serverRealpay:0,
        changeMoney:0,
        serverChangeMoney:0,
        payMoney:0,
        customer:'',
        customerPay:0,
        returnPay:0,
        payments:"",
        user_id:0,
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
            consignee:"",
            user_money:0,
            rank_name:'',
            rank_points:0,
            discount:10,
        },
        formGood:{},
        dataB:{},
        jfpay:0,
        value:false, 
        id:"", 
        value2:"", 
        value3:"美联滨江店", 
        value7:"无可用优惠券",
        value8:"",
        orPrice:"",
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
        options1: [],
        options2: [{
          value2: '刘晓娜',
          label: '刘晓娜'
        }, {
          value2: '小红',
          label: '小红'
        },],
        options3: [{
          value3: 1,
          label: '美联滨江店'
        }, {
          value3: 2,
          label: '美联西湖店'
        },],
        options7: [{
            value7: '0',
            label: '无可用优惠券'
            }, {
            value7: '1',
            label: '无'
        },],
        payments: '',          
        tableData:[{}],
        tempData:{},
        assistants:[],//-------营业员列表
        value7:"",
        caSelect:[],
    };
  },
  components:{
      goodsDesk,
      serverDesk,
      buyLimit
  },
  methods: {
      test(){
          console.log(this.value7);
      },
        showAssistant(){//------------选择营业员
            this.dialogAssistant=true;
            saleclerklist().then(res=>{
                this.assistants=[];
                for(let i=0;i<res.data.length;i++){
                    this.assistants.push(res.data[i].nickname);
                    //this.assistants.push(res.data[i].id);
                    //this.ids.push(res.data[i].id);
                };
                console.log(res.data);
            });
        },
        cashier(){//--------------------收银员列表
            cashierList().then(res=>{
                console.log(res.data);
                this.options1=res.data;
                console.log(this.options1);
            });
        },
        changeCashier(){//-------------
            localStorage.cashierId=this.id;
        },
        changeAssistant(){  //----------营业员改变后打开会员弹窗
            console.log(this.value2);
            localStorage.assist=this.value2;
            //this.dialogAssistant=false;
            //setTimeout(()=>{this.openVip();},500)
        },
        openVip(){//-------------打开会员弹窗
                this.dialogVip=true;
                //this.$nextTick(() => {this.$refs['input'].focus()});

        },
        vipMsg(){//----------------会员信息
            if(this.vipNumber!==""){
                    this.dialogVip = false;
                    let data=this.$qs.stringify({
                        user_mobile_phone:this.vipNumber,
                    });
                    getcustomerList(data).then(res=>{
                        if(res.errno==0){
                            console.log(res.data.user_list[0].consignee);
                            this.formVipTemp.consignee=res.data.user_list[0].real_name;
                            this.formVipTemp.user_money=res.data.user_list[0].user_money;
                            this.formVipTemp.rank_name=res.data.user_list[0].rank_name;
                            this.formVipTemp.rank_points=res.data.user_list[0].rank_points;
                            this.formVipTemp.discount=res.data.user_list[0].discount/10;
                            this.user_id=res.data.user_list[0].user_id;
                            this.formVip=this.formVipTemp;
                            localStorage.phone=this.vipNumber;
                            this.cart();
                            this.activeName='first';
                            if(this.user_id==localStorage.user_id){
                                this.pickTableData=JSON.parse(localStorage.pickTableData);
                            }else{
                                this.pickTableData=[];
                            };                       
                        }else{
                            this.dialogRegister=true;
                            localStorage.phone=this.vipNumber;
                        };
                    });
                    //this.vipBtn=true;
                    //this.cart();
            }else{
                    this.$message({
                        type: "error",
                        message: "请输入会员卡号或手机号",
                        duration: 2000
                    });
            }
        },
        getCode(){//------------------注册获取验证码
            let data=this.$qs.stringify({
                mobile_phone:this.vipNumber
            });
            sendMobileCode(data).then(res=>{
                console.log(res);
            });
        },
        register(){//--------------注册
            let data=this.$qs.stringify({
                mobile_phone:this.vipNumber,
                mobile_code:this.securityCode
            });
            register(data).then(res=>{
                console.log(res);
            });
            this.dialogRegister = false;
        },
        assistant(){//--------------------输入商品条形码
            if(this.goodSn==""){
                this.$message({
                        type: "error",
                        message: "请输入或扫描商品条形码",
                        duration: 2000
                    });
            }else{
                let dataA=this.$qs.stringify({
                    user_id:this.user_id,
                    barcode:this.goodSn,
                });
                cartAdd(dataA).then(res=>{//-------添加商品
                    if(res.errno==0){
                        this.$message({
                            type: "success",
                            message: res.errmsg,
                            duration: 1000
                        });
                        this.cart();//-------刷新购物区列表
                    }else{
                        this.$message({
                            type: "error",
                            message: res.errmsg,
                            duration: 1000
                        });
                    };
                });
                getGoodsDeail({params:{goods_id:this.goodSn}}).then(res=>{
                    console.log(res.data);
                    this.formGood=res.data;
                });
                this.goodSn="";
                //this.showAssistant();
                //this.$nextTick(() => {this.$refs['assistant'].focus()});
            }
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
          //document.getElementById("settleAccounts").style.display="none"
      }else if(tab.label=="服务区"){
          document.getElementById("goodsDesk").style.display="none"
          document.getElementById("serverDesk").style.display="block"
          //document.getElementById("buyLimit").style.display="none"
          //document.getElementById("settleAccounts").style.display="none"
      }else if(tab.label=="挂单区"){
          document.getElementById("goodsDesk").style.display="block"
          document.getElementById("serverDesk").style.display="none"
          //document.getElementById("buyLimit").style.display="block"
          //document.getElementById("settleAccounts").style.display="none"
      }
    },
    handleClick1(){

    },
    settleAccounts(){//-------跳转到结算
        this.dialogPay=true;
        this.returnPay=0;
        //document.getElementById("goodsDesk").style.display="none"
        document.getElementById("serverDesk").style.display="none"
        //document.getElementById("buyLimit").style.display="none"
        //document.getElementById("settleAccounts").style.display="block" 
        let dataO=this.$qs.stringify({
            user_id:this.user_id,
            postscript:7,
            phone:localStorage.phone,
            cashier:localStorage.cashierId,
            sale_clerk:this.value2
        });
        createOrder(dataO).then(res=>{
            this.order_id=res.data.order_id;
            console.log(this.order_id);
            this.money=res.data.real_goods_price;
            //this.money=this.totalPrice;
            this.serverMoney=res.data.virtual_goods_price;
            //this.realpay=this.money-this.discount;
            this.realpay=this.total-this.discount;
            this.serverRealpay=this.serverMoney-this.serverDiscount;
            this.changeMoney=this.realpay;
            this.serverChangeMoney=this.serverRealpay;
            this.payMoney=Number(this.realpay+this.serverRealpay);
            //this.customerPay=this.payMoney;
            this.customerPay=this.total;
        });
        localStorage.phone="";
    },
    netPay(){//-----------余额支付
        document.getElementById("netMoney").style.display="block";
        document.getElementById("cashier").style.display="none";
    },
    cashierPay(){//----------------现金支付
        document.getElementById("netMoney").style.display="none";
        document.getElementById("cashier").style.display="block";
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
        //let total=sum.toFixed(2)-youhui;
        document.getElementById("oriPrice").innerHTML="原价：￥"+this.orPrice;
        document.getElementById("totalPrice").innerHTML="总价：￥"+this.total;
        let youhui=(this.orPrice-this.total).toFixed(2);
        document.getElementById("discount").innerHTML="优惠：￥"+youhui;
        this.totalPrice=this.total;
    },
    getNumber(){//---------------------------计算件数
        let sum=0;
        for(let i in this.goodsTableData){
            let number=parseInt(this.goodsTableData[i].goods_number);
           sum+=number;
        }
            document.getElementById("totalNumber").innerHTML=sum;         
    },
    cart(){//-----------------this.user_id
        cart({params:{user_id:this.user_id}}).then(res=>{ 
            console.log(res.data.goods_list);
            this.goodsTableData=res.data.goods_list;
            this.orPrice=res.data.total.shop_price.slice(1);
            this.total=res.data.total.goods_price.slice(1);
            this.getSummaries();
            this.getNumber();
        })
    },
    deleteGoods(row) {//--------删除购物车商品
        console.log(row.rec_id);        
        cartDel({params:{user_id:this.user_id,rec_id:row.rec_id}}).then(res=>{
            console.log(res);
            this.cart();//-------刷新购物区列表
        });
    },
    handleClose(done) {
        done();
        //setTimeout(()=>{this.openVip();},500)
    },
    handleClose1(done) {
        done();
    },
    addGoods: function (item) { //回调方法，接收子组件传的参数
        console.log("$$"+item);
        let dataA=this.$qs.stringify({
            user_id:this.user_id,
            //goods_id:item.goods_id,
            goods_id:item
        });
        cartAdd(dataA).then(res=>{//-------添加商品
                console.log(res.errno);
                this.cart();//-------刷新购物区列表
        });
        // getGoodsDeail({params:{goods_id:item.goods_id}}).then(res=>{
        //     console.log(res.data);
        //     this.formGood=res.data;
        // });
    },
    editCartNumber(row){//-----------------修改购物车商品数量
        editCartN({params:{
            rec_id:row.rec_id,
            user_id:this.user_id,
            goods_number:row.goods_number,
        }}).then(res=>{
            this.cart();
        });
    },
    addServer: function (item) { //回调方法，接收子组件传的参数
      console.log(item.goods_id);
      let dataA=this.$qs.stringify({
          user_id:this.user_id,
          goods_id:item.goods_id
      });
      cartAdd(dataA).then(res=>{//-------添加服务
            console.log(res.errno);
            this.cart();//-------刷新购物区列表
      });
    },
    clean(){//----------------------清空购物车
        clearcart({params:{
            user_id:this.user_id,
        }}).then(res=>{
            console.log(res.data);
            this.cart();//-------刷新购物区列表
        });
    },
    sureGoods(){//---------商品手动改价后确定
        console.log(this.changeMoney);        
        let dataC=this.$qs.stringify({
            order_id:this.order_id,
            //real_goods_price:this.changeMoney
            real_goods_price:this.customerPay
        });
        priceChange(dataC).then(res=>{
            console.log(res);
            //this.payMoney=Number(this.changeMoney)+Number(this.serverChangeMoney);
            this.realpay=this.customerPay;
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
    pickTable(){//-------挂单
        this.activeName='third';
        localStorage.pickTableData=JSON.stringify(this.goodsTableData);
        this.pickTableData=JSON.parse(localStorage.pickTableData);
        console.log(this.pickTableData);
        this.dialogPay=false;
        pickData({params:{user_id:this.user_id,}}).then(res=>{
            console.log(res.data.tem_order_id);
            localStorage.tem_order_id=res.data.tem_order_id;
            localStorage.user_id=this.user_id;
            this.goodsTableData=[];
                // this.init(this);
                // this.$nextTick(() => {this.$refs['goods'].focus()});  //-----聚焦
                // this.$router.push('/temp');
        });
    },
    cancelP(){//-----------取消挂单
        cancelPick({params:{user_id:localStorage.user_id,tem_order_id:localStorage.tem_order_id}}).then(res=>{
            console.log(res);
            this.pickTableData=[];
            localStorage.pickTableData="";
            this.init(this);
            that.$router.push('/temp');
        });
    },
    yuePay(){//------------------余额支付
        let dataF=this.$qs.stringify({
            order_id:this.order_id,
            money:this.customerPay,
            user_id:this.user_id,
        });
        balancepay(dataF).then(res=>{
            console.log(res);
            this.$alert(res.errmsg+',付款金额：'+res.data.pay+'元', '付款通知');
            this.$router.push('/temp');
        });
    },
    finishPay(){//--------现金支付
        this.dialogPay=false;
        console.log(this.customerPay);
        console.log(this.order_id);
        let dataF=this.$qs.stringify({
            order_id:this.order_id,
            money:this.customerPay,
            user_id:this.user_id,
        });
        cashPay(dataF).then(res=>{
            this.$alert(res.errmsg+',付款金额：'+res.data.pay+'元', '付款通知');
            this.$router.push('/temp');
        });
    },
    retrMon(){
        this.returnPay=(this.realpay-this.customerPay).toFixed(1);
    },
    init(){
        document.getElementById("goodsDesk").style.display="block";
        document.getElementById("serverDesk").style.display="none";
        document.getElementById("buyLimit").style.display="none";
        //document.getElementById("settleAccounts").style.display="none";
        //document.getElementById("payMent").style.display="none";
        this.cart(); 
    },
    getAssistants(){
        this.dialogAssistant=true;
        getWorkerList().then(res=>{
            this.assistants=[];
            for(let i=0;i<res.data.clerk_list.length;i++){
                this.assistants.push(res.data.clerk_list[i].nickname);
            };
        });
    },
    changePrice(){
        this.spShow===false?this.spShow=true:this.spShow=false;
        this.btShow===true?this.btShow=false:this.btShow=true;
    },
  },
  mounted:function(){
        this.id=localStorage.cashierId;
        this.value2=localStorage.assist;
        // if(this.pickTableData!==undefined){
        //     this.pickTableData=JSON.parse(localStorage.pickTableData);
        // }else{
        //     console.log("无挂起");
        // };
        //this.clean();
        this.init(this);       //-------刷新购物区列表
        this.$nextTick(() => {this.$refs['goods'].focus()});
        this.cashier();
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
                that.getAssistants(that);
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
        font-weight:bold;
        color:#fff;
    }
    .cashierDesk .el-header{
        padding:10;
        background:#43C0C2;
        text-align:right;
    }
    .el-aside {
        background-color: #F4F4F4;
        color: #333;
        text-align: center;
        line-height: 200px;
    }
    .el-tabs__item.is-active{
        color:#25A599;
    }
    .cashierDesk .el-main {
        color: #333; 
        background:#fff;
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
    .el-table input{
        border:1px solid #DCDFE6;
        border-radius:4px;
        padding:2px;
    }
    .el-header .el-select >>> .el-input__inner{
        background:#43C0C2;
        color:#fff;
    }
    #pay >>> .el-dialog  > .el-dialog__header{
        border-bottom:3px solid #3EACAD;
    }
    #pay >>> .el-dialog  > .el-dialog__header>span{
        font-size:28px;
        font-weight: bold;
    }
    #pay >>> .el-dialog   .el-dialog__body{
        padding:0;
    }
    #scanGoods .el-input >>> .el-input__inner{
        padding-left:40px;
    }
    .diaButn{
        color:#3EACAD;
        width:150px;
        height:50px;
        font-size:20px;
        border:1px solid #3EACAD;
    }
    .payChose{
        display:inline-block;
        border:1px solid #E7E7E7;
        padding:5px 7px;
        text-align:center;
        font-size:16px;
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
    .shortCut{
        font-size:14px;
        color:#FF842A;
    }
    #net >>>.el-card__body{
        padding:0; 
    }
</style>