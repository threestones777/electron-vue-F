<template>
  <div id="shopOderList">
    <div class="main-header">
        <!-- <h3>温州美联 管理中心</h3> -->
        <el-breadcrumb style="font-size:18px;" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item>购货</el-breadcrumb-item>
            <el-breadcrumb-item>采购订单</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="operate-in">
            <div @click="reset" class="card">
                <i class="el-icon-loading"></i>
                <div>刷新</div>
            </div>
            <div @click="dialogShow=true" class="card">
                <i class="el-icon-tickets"></i>
                <div>显示列</div>
            </div>
            <div @click="getBillSn" class="card">
                <i class="el-icon-plus"></i>
                <div>添加订单</div>
            </div>
        </div> 

    </div>
    <div style="margin:10px 0;text-align:center">
        <fieldset style="margin:10px 0;border-color:#fff;text-align:left">
            <legend>查询条件</legend>
            <el-row type="flex" justify="space-around" :gutter="10">
                <el-col style="text-align:left" :span="3">
                    <el-radio-group v-model="radio" style="margin-top:5px;">
                    <el-radio :label="3">订货日期</el-radio><br>
                    <!-- <el-radio :label="6">要求到货日期</el-radio><br> -->
                    <el-radio :label="9">不按日期</el-radio>
                </el-radio-group>    
                </el-col>
                <el-col :span="5">
                    <el-date-picker
                    v-model="search3" size="small"
                    style="width:100%;margin-top:0px"
                    type="daterange"
                    align="right"
                    unlink-panels
                    @change="chose"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                    <el-input  prefix-icon="el-icon-search" style="width:100%;margin-top:5px;" v-model="search"  size="mini"  placeholder="订单号"/>
                </el-col>
                <el-col :span="4">
                    <el-select @change="chose" v-model="value4" size="small" placeholder="分店类型" style="margin-top:0px">
                        <el-option
                        v-for="item in options4"
                        :key="item.value4"
                        :label="item.label"
                        :value="item.value4">
                        </el-option>
                    </el-select> 
                    <!--  -->
                    <el-select @change="chose" style="margin-top:5px" v-model="value1" size="small" placeholder="分店">
                        <el-option
                        v-for="item in options1"
                        :key="item.value1"
                        :label="item.label"
                        :value="item.value1">
                        </el-option>
                    </el-select>    
                </el-col>
                <el-col :span="4">
                    <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%" v-model="search11"  size="mini"  placeholder="供应商编码"/>
                    <el-select @change="chose" v-model="value" size="small" placeholder="审核" style="margin-top:5px;">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <!-- <el-select @change="chose" v-model="value5" size="small" placeholder="订单状态" style="margin-top:5px;width:100%">
                        <el-option
                        v-for="item in options5"
                        :key="item.value5"
                        :label="item.label"
                        :value="item.value5">
                        </el-option>
                    </el-select>  -->
                </el-col>
                <!-- <el-col :span="3">
                    <el-button type="primary" size="small" @click="reset">刷新</el-button><br>
                    <el-button type="primary" size="small" style="margin-top:5px;" @click="add">新增</el-button><br>
                    <el-button icon="el-icon-tickets"  style="margin-top:5px" type="primary" size="small" @click="dialogShow=true">显示列</el-button>
                </el-col> -->
                <el-col :span="7">
                   
                </el-col>
            </el-row>
        </fieldset>
        <!-- <div  style="text-align:left;margin-top:10px">
            <el-input placeholder="单据编号" size="small" v-model="billSn" @focus="getBillSn"></el-input>
            <el-button type="primary" size="small" @click="getBillSn">添加订单</el-button>
        </div> -->
            <!-- <el-button type="primary" size="small" @click="saveData" id="save" :disabled="save">保存</el-button> 
           <el-button type="primary" size="small" @click="check">审核</el-button>
            <el-button type="primary" size="small" @click="edit">修改</el-button> -->
    </div>
    <!-- 按需选择列弹窗 -->
            <el-dialog
            style="text-align:left;"
            title="按需选择列" class="chose"
            :visible.sync="dialogShow"
            :before-close="handleClose"
            width="300px">
                <!-- <el-checkbox v-model="shopOdershow.show1">采购单id</el-checkbox><br> -->
                <el-checkbox v-model="shopOdershow.show2">采购单编号</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show3">店号</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show4">下单分店</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show5">订单状态</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show6">供应商编码</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show7">供应商名称</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show8">订货日期</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show9">预定到货日期</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show10">金额</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show11">实际金额</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show12">实际支付金额</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show13">手机</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show14">电话</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show15">订货员</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show16">审核员</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show17">制单人</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show18">状态</el-checkbox><br>
                <el-checkbox v-model="shopOdershow.show19">备注</el-checkbox><br><br>
            </el-dialog>
    <el-table
      :data="shopOderData.filter(data =>  {
        return Object.keys(data).some(key => {
        return String(data[key]).toLowerCase().indexOf(search) > -1})})"
      border stripe
      :row-style="{height:0}"
      :cell-style="{padding:0}"
      :header-row-style="{height:0}"  
      :header-cell-style="tableRowStyle"
      style="width: 100%">
        <!-- <el-table-column
            prop="purchase_id"
            v-if="shopOdershow.show1"
            align="center"
            label="采购单id">
        </el-table-column> -->
        <el-table-column
            prop="purchase_sn"
            v-if="shopOdershow.show2"
            align="center"
            label="采购单编号">
        </el-table-column>
        <el-table-column
            v-if="shopOdershow.show3"
            align="center"
            label="店号">
        </el-table-column>
        <el-table-column
            v-if="shopOdershow.show4"
            align="center"
            label="下单分店">
        </el-table-column>
        <el-table-column
            v-if="shopOdershow.show5"
            align="center"
            label="订单状态">
        </el-table-column>
        <el-table-column
            v-if="shopOdershow.show6"
            align="center"
            label="供应商编码">
        </el-table-column>
        <el-table-column
            v-if="shopOdershow.show7"
            align="center"
            label="供应商名称">
                <template slot-scope="scope">
                    <span>{{scope.row.supplier_name}}</span>
                </template>
        </el-table-column>
        <el-table-column
            prop="add_time"
            v-if="shopOdershow.show8"
            align="center"
            sortable
            label="订货日期">
        </el-table-column>
        <el-table-column
            v-if="shopOdershow.show9"
            align="center"
            label="预定到货日期">
        </el-table-column>
        <el-table-column
            prop="money"
            v-if="shopOdershow.show10"
            align="center"
            label="金额">
            <template slot-scope="scope">
                <span style="color:#B58900">{{scope.row.money}}</span>
            </template>
        </el-table-column>
        <el-table-column
            prop="real_money"
            v-if="shopOdershow.show11"
            align="center"
            label="实际金额">
        </el-table-column>
        <el-table-column
            prop="real_pay_money"
            v-if="shopOdershow.show12"
            align="center"
            label="实际支付金额">
        </el-table-column>
        <el-table-column
            v-if="shopOdershow.show13"
            align="center"
            label="手机">
        </el-table-column>
        <el-table-column
            v-if="shopOdershow.show14"
            align="center"
            label="电话">
        </el-table-column>
        <el-table-column
            v-if="shopOdershow.show15"
            align="center"
            label="订货员">
        </el-table-column>
        <el-table-column
            v-if="shopOdershow.show16"
            align="center"
            label="审核员">
        </el-table-column>
        <el-table-column
            prop="admin_name"
            v-if="shopOdershow.show17"
            align="center"
            label="制单人">
        </el-table-column>
        <el-table-column
            prop="status"
            align="center"
            label="状态">
            <!-- <template slot-scope="scope">
                {{scope.row.status==0?"未审核":scope.row.status==1?"审核通过":scope.row.status==2?"审核驳回":"未知状态"}}
            </template> -->
        </el-table-column>
        <el-table-column
            prop="status_name"
            v-if="shopOdershow.show18"
            align="center"
            label="状态名">
        </el-table-column>
        <el-table-column
            align="center"
            prop="note"
            v-if="shopOdershow.show19"
            label="备注">
        </el-table-column>
        <el-table-column
        fixed="right"
        align="center"
        width="120"
        label="相关操作">
            <template slot-scope="scope">
                <!-- <el-button type="text" size="small" @click="edit(scope.row)">保存修改</el-button> -->
                <el-button type="text" size="small" @click="showDetails(scope.row),dialogDetail = true">订单详情</el-button>
                <el-button type="text" :disabled="scope.row.status!=='0'" size="small" @click="getId(scope.row),dialogCheck = true">审核</el-button>
                <el-button type="text" :disabled="scope.row.status!=='0'" size="small" @click="deleteRow(scope.row)">删除</el-button>
            </template>
        </el-table-column>       
    </el-table>
    <!---------------------------------- 详情弹窗 ---------------------------------------->
    <el-dialog width="90%" title="订单详情" :visible.sync="dialogDetail" :before-close="handleClose1">
        <!-- <el-input disabled placeholder="单据编号" size="small" v-model="billSn"></el-input>
        <el-input disabled placeholder="单据id" size="small" v-model="purchase_id"></el-input>
        <el-button size="small" type="primary" class="addGoods" @click="getGoods(),dialogAddGoods=true">添加商品</el-button>

        <el-input ref="txm" size="small" style="width:15%;" placeholder="请输入商品条形码"  v-model="formServeAdd.main_tm" @keyup.native.enter="checkGood"/>
        <el-input ref="num" :disabled="number" size="small" v-model="formServeAdd.sh_goods_number"  style="width:15%;" placeholder="请输入数量" @keyup.native.enter="changeNum"></el-input> -->
        <el-button icon="el-icon-zoom-in" @click="()=>{goodsData.push(tempData)}" round></el-button>
        <el-table
        :data="goodsData"
        border stripe
        show-summary
        :row-style="{height:0}" 
        :cell-style="{padding:1}"
        :header-row-style="{height:0}"  
        :header-cell-style="{padding:0}"
        style="width: 100%">
            <el-table-column
                align="center"
                width="150"
                label="商品--扫描枪录入">
                <template slot-scope="scope">
                    <el-input style="width:100%;" v-model="scope.row.goods_sn"/>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                width="160"
                label="仓库">
                <template slot-scope="scope">
                    <el-input style="width:100%;" v-model="scope.row.goods_sn1"/>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="数量">
                <template slot-scope="scope">
                    <el-input style="width:100%;" v-model="scope.row.goods_sn2"/>
                </template>
            </el-table-column>
             <el-table-column
                align="center"
                label="购货单价">
                <template  slot-scope="scope">
                    <el-input style="width:100%;" v-model="scope.row.goods_sn3"/>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="含税单价">
                <template slot-scope="scope">
                    <el-input style="width:100%;" v-model="scope.row.goods_sn4"/>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="折扣率（批量）">
                <template slot-scope="scope">
                    <el-input style="width:100%;" v-model="scope.row.goods_sn5"/>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="折扣额（批量）">
                <template slot-scope="scope">
                    <el-input style="width:100%;"  v-model="scope.row.goods_sn6"/>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="金额">
                <template slot-scope="scope">
                    <el-input style="width:100%;" v-model="scope.row.goods_sn7"/>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="税率（%）">
                <template slot-scope="scope">
                    <el-input style="width:100%;" v-model="scope.row.goods_sn8"/>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="税额">
                <template  slot-scope="scope">
                    <el-input style="width:100%;" v-model="scope.row.goods_sn19"/>
                </template>
            </el-table-column>
            <el-table-column
                width="110"
                align="center"
                label="价税合计">
                <template  slot-scope="scope">
                    <el-input style="width:100%;" v-model="scope.row.goods_sn10"/>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="备注">
                <template slot-scope="scope">
                    <el-input style="width:100%;"  v-model="scope.row.goods_sn11"/>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="关联采购订单号">
                <template slot-scope="scope">
                    <el-input style="width:100%;" v-model="scope.row.goods_sn12"/>
                </template>
            </el-table-column>
            <el-table-column
            fixed="right"
            align="center"
            label="相关操作">
                <template slot-scope="scope">
                    <!-- <el-button type="text" size="small" @click="editGoods(scope.row)" icon="el-icon-edit"></el-button> -->
                    <el-button type="text" size="small" @click="deleteGoods(scope.row)" icon="el-icon-delete"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button size="small" type="primary" @click="dialogDetail = false">保存</el-button>
            <el-button size="small" type="primary" @click="()=>{this.reload()}">审核</el-button>
        </div>
    </el-dialog>
    <!------------------------------------ 审核弹窗 ------------------------------------>
    <el-dialog width="340px" title="订单审核" :visible.sync="dialogCheck">
        <el-radio-group v-model="status">
            <el-radio :label="0">未审核</el-radio>
            <el-radio :label="1">审核通过</el-radio>
            <!-- <el-radio :label="4">审核驳回</el-radio> -->
        </el-radio-group>              
        <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="dialogCheck = false">取 消</el-button>
            <el-button size="small" type="primary" @click="checkSta(),dialogCheck = false">保存审核</el-button>
        </div>
    </el-dialog>
    <!----------------------------- 无条形码添加商品弹窗 -------------------------------------->
    <el-dialog
    title="手动添加商品"
    :visible.sync="dialogAddGoods"
    width="700px">
        <el-form label-position="right" :model="formGoodsAdd" :inline="true" class="demo-form-inline">
            <el-row type="flex" justify="space-around" :gutter="10">
                <el-col :span="7">
                    商品名称<el-input v-model="formGoodsAdd.goods_name" autocomplete="off"></el-input>    
                </el-col>
                <el-col :span="7">
                    商品分类<el-select v-model="formGoodsAdd.cat_id" placeholder="请选择">
                            <el-option label="选项一" value="护手霜"></el-option>
                            <el-option label="选项二" value="面膜"></el-option>
                        </el-select>
                </el-col>
                <el-col :span="7">
                    规格型号<el-input v-model="formGoodsAdd.name" autocomplete="off"></el-input>
                </el-col>
            </el-row>
            <el-row type="flex" justify="space-around" :gutter="10">
                <el-col :span="7">
                    商品编码 <el-input v-model="formGoodsAdd.goods_sn" autocomplete="off"></el-input>   
                </el-col>
                <el-col :span="7">
                    条形码<el-input v-model="formGoodsAdd.txm" autocomplete="off"></el-input>
                </el-col>
                <el-col :span="7">
                    商品货位<el-input v-model="formGoodsAdd.name" autocomplete="off"></el-input>
                </el-col>
            </el-row>
            <el-row type="flex" justify="space-around" :gutter="10">
                <el-col :span="7">
                    商品品牌<el-select v-model="formGoodsAdd.brand_id" placeholder="请选择">
                            <el-option label="品牌一" value="shanghai"></el-option>
                            <el-option label="品牌二" value="beijing"></el-option>
                        </el-select>
                </el-col>
                <el-col :span="7">
                    默认仓库<el-select v-model="formGoodsAdd.name" placeholder="请选择">
                            <el-option label="仓库一" value="shanghai"></el-option>
                            <el-option label="仓库二" value="beijing"></el-option>
                        </el-select>
                </el-col>
                <el-col :span="7">
                    市场价格<el-input v-model="formGoodsAdd.market_price" autocomplete="off"></el-input>
                </el-col>
            </el-row>
            <el-row type="flex" justify="space-around" :gutter="10">
                <el-col :span="7">
                    成本价格<el-input v-model="formGoodsAdd.chengben_price" autocomplete="off"></el-input>
                </el-col>
                <el-col :span="7">
                    促销价格<el-input v-model="formGoodsAdd.promote_price" autocomplete="off"></el-input>
                </el-col>
                <el-col :span="7">
                    零售价格<el-input v-model="formGoodsAdd.shop_price" autocomplete="off"></el-input>
                </el-col>
            </el-row>
            <el-row type="flex" justify="space-around" :gutter="10">
                <el-col :span="7">
                    库存预警<el-input v-model="formGoodsAdd.warn_number" autocomplete="off"></el-input>    
                </el-col>
                <el-col :span="7">
                    赠送积分<el-input v-model="formGoodsAdd.give_integral" autocomplete="off"></el-input>
                </el-col>
                <el-col :span="7">
                    备注信息<el-input v-model="formGoodsAdd.name" autocomplete="off"></el-input>
                </el-col>
            </el-row>
            <el-row type="flex" justify="space-around" :gutter="10">
                <el-col :span="7">
                    串码商品<el-select v-model="formGoodsAdd.name" placeholder="请选择">
                            <el-option label="是" value="0"></el-option>
                            <el-option label="否" value="1"></el-option>
                        </el-select>  
                </el-col>
                <el-col :span="7"></el-col>
                <el-col :span="7"></el-col>
            </el-row>
        </el-form>
    <!-- <el-table
        :data="goodsListData"
        ref="multipleTable"
        border
        :row-style="{height:0}"  
        :cell-style="{padding:0}"
        :header-row-style="{height:0}"  
        :header-cell-style="{padding:0}"
        @selection-change="selectionChange"
        style="width: 100%">
            <el-table-column
            type="selection">
            </el-table-column>
            <el-table-column
                prop="goods_id"
                align="center"
                label="商品id">
            </el-table-column>
            <el-table-column
                align="center"
                label="商品名">
                <template slot-scope="scope">
                    <span :title="scope.row.goods_name">{{scope.row.goods_name.slice(0,7)+"..."}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="number"
                align="center"
                label="数量">
            </el-table-column>
            <el-table-column
                prop="attr_value"
               align="center"
                label="属性">
            </el-table-column>
            <el-table-column
                prop="note"
                align="center"
                label="备注">
            </el-table-column>    
        </el-table>
    <el-pagination
        @current-change="handleCurrentChangeG"
        layout="prev, pager, next,jumper"
        :page-count="pagesG">
    </el-pagination> -->
    <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogAddGoods = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handAdd(),dialogAddGoods = false">添加商品</el-button>
    </span>
    </el-dialog>
    <!--分页显示-->
    <el-pagination
        @current-change="handleCurrentChange"
        layout="total,prev,pager,next,jumper"
        :total="record_count">
    </el-pagination>
  </div>
</template>
<style scoped>
    #shopOderList{
        /* text-align:center; */
        margin: 10px;
    }
    #shopOderList .main-header{
        text-align:left;
        margin-bottom:10px;
        padding:10px;
        background:#fff;
    }
    #shopOderList .main-header .el-breadcrumb {
        margin: 8px 0 0 10px;
    }
    #shopOderList .el-input{
        width:200px;
    }
    #shopOderList .el-table{
      margin:20px 0;
    }
    #shopOderList .el-upload{
      margin:20px 0;
    }
    #shopOderList .el-pagination{
        text-align: right;
        margin:20px 0 50px 0;
    }
    #shopOderList .el-pagination__jump .el-input{
        width:50%;
    }
    #shopOderList .addGoods{
        float:right;
        position:relative;
        bottom:15px;
    }
    .el-table input{
        width:100%;
        height:46px;
    }
    .el-row{
        background:#F3F3F3;
        width:100%;
    }
    .card-title {
    text-align: center;
    }
    .card-title:focus {
    outline: none;
    }
    .card {
    transition: all 0.3s;
    padding: 5px 0;
    }
    .card:hover {
    border-radius:7px;
    transform: translateY(-2px);
    box-shadow: 0px 2px 5px 4px rgba(0, 0, 0,0.1)
    }
    .card:hover i,
    .card:hover div,
    .card:hover b {
    color: #409EFF;
    }
    .operate-in {
    display: flex;
    margin-top: 12px;
    }
    .operate-in > div {
    width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    position: relative;
    }
    .operate-in > div div {
    font-size: 16px;
    }
    .operate-in i {
    font-size: 30px;
    }
    .operate-in b {
    font-size: 16px;
    position: absolute;
    top: 20%;
    right: 5%;
    }
</style>
<script>
import {shopOderList,getGoodsList,getGoodsDeail} from '../../api/api';
import {shopOderListDe,shopOderListCh,shopOderAddG,shopOderEdG,shopOderDeG,shopOderEd,shopOderAdd,shopOderRm,shopOderQueryBcode,addGoodsByHand} from '../../api/apiW' ;
export default {
    inject: ['reload'], 
    data() {
        return {
            dialogDetail:false,
            dialogCheck:false,
            dialogAddGoods:false,
            dialogAdd:false,
            dialogShow:false,
            record_count:0,
            search:'',
            search1:'',
            search2:'',
            search3:['2017-07-07','2019-09-09'],
            search4:'',
            search5:'',
            search6:'',
            search7:'',
            search8:'',
            search9:'',
            search11:'',
            billSn:'',
            status:0,
            number:true,
            purchase_id:0,
            goods_id:0,
            goods_sn:"",
            purchase_sn:0,
            input:'',
            orderDate:'',
            orderId:'',
            pages:1,
            pagesG:1,
            goodsData:[],
            tempData:{
                goods_sn:'',
                goods_sn1:'',
                goods_sn2:'',
                goods_sn3:'',
                goods_sn4:'',
                goods_sn5:'',
                goods_sn6:'',
                goods_sn7:'',
                goods_sn8:'',
                goods_sn19:'',
                goods_sn10:'',
                goods_sn11:'',
                goods_sn12:'',
            },
            goodsListData:[],
            shopOderData: [],
            formDetail:{},
            tempData:{},
            formGoodsAdd:{},
            formServeAdd:{
                main_tm:"",
                sh_goods_number:"",
            },
            formAdd:{},
            value: '' ,
            value1: '0' ,
            value3: '' ,
            value4: '' ,
            value5: '' ,
            value6: '' ,
            value7: '' ,
            radio:3,
            loading:true,
            multipleSelection: [] ,
            arr:[],
            shopOdershow:{
                show1:false,
                show2:true,
                show3:false,
                show4:true,
                show5:false,
                show6:true,
                show7:false,
                show8:true,
                show9:true,
                show10:false,
                show11:false,
                show12:false,
                show13:true,
                show14:false,
                show15:true,
                show16:false,
                show17:true,
                show18:false,
                show19:true,
            }, 
            options: [{
            value: '1',
            label: '已审核'
            }, {
            value: '0',
            label: '未审核'
            },],  
            options1: [{
            value1: '0',
            label: '0号店'
            }, {
            value1: '1',
            label: '1号店'
            },],  
            options3: [{
            value3: '0',
            label: '分公司1'
            }, {
            value3: '1',
            label: '分公司2'
            },],  
            options4: [{
            value4: '0',
            label: '类型1'
            }, {
            value4: '1',
            label: '类型2'
            },],  
            options5: [{
            value5: '2',
            label: '已收货'
            }, {
            value5: '3',
            label: '已退货'
            },],  
            options6: [{
            value6: '0',
            label: '类型1'
            }, {
            value6: '1',
            label: '类型2'
            },],  
            options7: [{
            value7: '0',
            label: '0号店'
            }, {
            value7: '1',
            label: '1号店'
            },],
        }
    },
    methods: { 
        init(page){//-----------------初始化数据
            let data=this.$qs.stringify({
                page:page,
                page_size:10
            });
            this.data(data);
        },
        data(data){
            shopOderList(data).then(res=>{
                this.record_count=Number(res.data.filter.record_count);
                console.log(res.data);
                this.shopOderData=res.data.gather_list;
            })
        }, 
        handleClose(done){
            done();
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            erpTableSetting.shopOderList=this.shopOdershow;
            localStorage.erpTableSetting=JSON.stringify(erpTableSetting); 
        },
        handleClose1(done){
            done();
            this.billSn="";
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        reset(){//----------刷新
            this.reload() ;
        },  
        handleCurrentChange(val) {
            this.init(val);
        },
        handleCurrentChangeG(val) {
            console.log(val);
            getGoodsList({params:{page:val,page_size:10}}).then(res=>{
                console.log(res.data.goods);
                this.goodsListData=res.data.goods;
                this.pagesG=Math.ceil(res.data.filter.record_count/10);
            })
        },
        selectionChange(val) {
            this.multipleSelection = val;
            console.log(this.multipleSelection);
            this.arr=[];
            for(let i=0;i<this.multipleSelection.length;i++){
                this.arr.push(this.multipleSelection[i].goods_id);
            };
                console.log(this.arr);
        },
        getBillSn(){//-------------------获取订单编号
            this.add();
            this.billSn="";
            this.purchase_id=0;
            let data=this.$qs.stringify({
                page:1,
                page_size:10,
            });
            shopOderList(data).then(res=>{
                this.record_count=Number(res.data.filter.record_count);
                this.billSn=res.data.gather_list[0].purchase_sn;
                this.purchase_id=res.data.gather_list[0].purchase_id;
                this.shopOderData=res.data.gather_list;
                this.dialogDetail=true;
                this.$nextTick(() => {this.$refs['txm'].focus()});
            });
        },
        checkGood(){//---------------条形码查询商品
            let data=this.$qs.stringify({
                barcode:this.formServeAdd.main_tm,
                purchase_sn:this.billSn,
            });
            shopOderQueryBcode(data).then(res=>{
                if(res.errno==0){
                    console.log(res.data.goods_sn);
                    this.goods_sn=res.data.goods_sn;
                    this.number=false;
                    this.$nextTick(() => {this.$refs['num'].focus()});
                }else{
                    this.$message({
                        type: "error",
                        message:"条形码不存在，请手动添加商品",
                        duration: 1000
                    });
                    this.dialogAddGoods=true;
                };
            });
        },
        changeNum(){//------------------输入商品数量
            this.arr=[],
            this.arr.push(this.goods_sn);
            this.addGoods();
             this.$nextTick(() => {this.$refs['txm'].focus()});
        },
        add(){//-------------------------添加订单
            let data=this.$qs.stringify(this.formServeAdd);
            shopOderAdd(data).then(res=>{
                if(res.errno==0){
                    this.$message({
                        type: "success",
                        message: res.data.message,
                        duration: 1000
                    });
                    //this.init(1);
                    this.detailGoods();
                }else{
                    this.$message({
                        type: "error",
                        message: res.data.message,
                        duration: 1000
                    });
                }
            });
        },
        detailGoods(){//------------------
            shopOderListDe({params:{purchase_sn:this.billSn}}).then(res=>{
                console.log(res);
                this.formDetail=res.data;
                this.goodsData=res.data.purchase_goods;
                this.tempData={};
                this.formServeAdd.main_tm="";
                this.formServeAdd.sh_goods_number="";
            });
        },
        detailGoods1(){//------------------找到最后商品
            shopOderListDe({params:{purchase_sn:this.billSn}}).then(res=>{
                this.tempData=res.data.purchase_goods[res.data.purchase_goods.length-1];
                console.log(this.tempData);
                //商品信息
                getGoodsDeail({params:{goods_id:this.tempData.goods_id}}).then(res=>{
                    //console.log(res.data);
                    if(res.data==false){
                        this.tempData.number=this.formServeAdd.sh_goods_number;
                        //赋值信息
                        let data=this.$qs.stringify(this.tempData);
                        shopOderEdG(data).then(res=>{
                            console.log(res);
                            if(res.errno==0){
                                this.$message({
                                    type: "success",
                                    message: res.errmsg,
                                    duration: 1000
                                });
                                this.detailGoods();    
                            }else{
                                this.$message({
                                    type: "error",
                                    message:res.errmsg,
                                    duration: 1000
                                });
                            }
                        });
                    }else{
                        this.tempData.attr_value=res.data.brand_name;
                        this.tempData.per_price=res.data.shop_price;
                        this.tempData.number=this.formServeAdd.sh_goods_number;
                        //-------赋值信息
                        let data=this.$qs.stringify(this.tempData);
                        shopOderEdG(data).then(res=>{
                            console.log(res);
                            if(res.errno==0){
                                this.$message({
                                    type: "success",
                                    message: res.errmsg,
                                    duration: 1000
                                });
                                this.detailGoods();    
                            }else{
                                this.$message({
                                    type: "error",
                                    message: res.errmsg,
                                    duration: 1000
                                });
                            }
                        });
                    };
                });
            });
        },
        handAdd(){//----------------手动添加商品
            let data=this.$qs.stringify(this.formGoodsAdd);
            addGoodsByHand(data).then(res=>{
                console.log(res.data.goods_sn);
                this.goods_sn=res.data.goods_sn;
                this.number=false;
                this.$nextTick(() => {this.$refs['num'].focus()});
            });
        },
        showDetails(row){//-----------------------订单详情
            this.purchase_id=row.purchase_id;
            this.purchase_sn=row.purchase_sn;
            this.billSn=row.purchase_sn;
            this.detailGoods();
        },
        getId(row){//-----------------------保存id
            this.purchase_id=row.purchase_id;
            this.status=Number(row.status);
        },
        checkSta(){//--------------------审核
            let data=this.$qs.stringify({
                purchase_id:this.purchase_id,
                status:this.status
            });
            shopOderListCh(data).then(res=>{
                console.log(res);
            });
        },
        check(){//------------------选择审核状态
            let data=this.$qs.stringify({
                page:1,
                page_size:10,
                status:this.value
            });
            this.data(data);
            console.log(this.value);
        },
        data(data){
            shopOderList(data).then(res=>{
                this.record_count=Number(res.data.filter.record_count);
                console.log(res.data);
                this.shopOderData=res.data.gather_list;
            })
        },
        chose(){  //------------------选择查询
            let data=this.$qs.stringify({
                page:1,
                page_size:10,
                addtime_start:this.search3[0],
                addtime_end:this.search3[1],
                //subshop_id:this.value1,
                //supplier_name:this.search11,
                status:this.value,
                //subshop_type:this.value4
            });
            this.data(data);
            console.log(this.search3);
        },
        getGoods(){//--------------------------------获取商品列表
            getGoodsList({params:{page:1,page_size:10}}).then(res=>{
                console.log(res.data.goods);
                this.goodsListData=res.data.goods;
                this.pagesG=Math.ceil(res.data.filter.record_count/10);
            })
        },
        addGoods(){//---------------------------------添加商品
            let dataA=this.$qs.stringify({
                purchase_id:this.purchase_id,
                goods_sns:JSON.stringify(this.arr)
            });
            shopOderAddG(dataA).then(res=>{
                console.log(res);
                if(res.errno==0){
                   this.$message({
                        type: "success",
                        message: res.data.message,
                        duration: 1000
                    });
                    //this.detailGoods();    
                    this.detailGoods1();    
                }else{
                    this.$message({
                        type: "error",
                        message: res.errmsg,
                        duration: 1000
                    });
                    this.detailGoods1();    
                }
            });
        },
        edit(row){//---------------------------------修改订单
            let data=this.$qs.stringify(row);
            shopOderEd(data).then(res=>{
                console.log(res);
                if(res.errno==0){
                    this.$message({
                        type: "success",
                        message: res.errmsg,
                        duration: 1000
                    });
                    this.reload();    
                }else{
                    this.$message({
                        type: "error",
                        message: res.errmsg,
                        duration: 1000
                    });
                }
            });
        },
        editGoods(row){//---------------------------修改商品
            row.purchase_sn=this.billSn;
            console.log(row);
            let data=this.$qs.stringify(row);
            shopOderEdG(data).then(res=>{
                console.log(res);
                if(res.errno==0){
                    this.$message({
                        type: "success",
                        message: res.errmsg,
                        duration: 1000
                    });
                    this.detailGoods();    
                }else{
                    this.$message({
                        type: "error",
                        message: res.errmsg,
                        duration: 1000
                    });
                }
            });
        },
        deleteGoods(row){//---------------------------删除商品
            //row.purchase_sn=this.billSn;
            //console.log(this.purchase_sn);
            console.log(row.goods_sn);
            let Message=confirm("确定删除此行商品？");
            if(Message){
                let dataD=this.$qs.stringify({
                    purchase_sn:this.billSn,
                    goods_sn:row.goods_sn
                });
                shopOderDeG(dataD).then(res=>{
                    console.log(res);
                    if(res.errno==0){
                        this.$message({
                            type: "success",
                            message: res.data.message,
                            duration: 1000
                        });
                        this.detailGoods();    
                    }else{
                        this.$message({
                            type: "error",
                            message: res.errmsg,
                            duration: 1000
                        });
                    }
                });         
            }else{
                alert("用户取消操作");
            }
        },
        deleteRow(row){//---------------------------删除订单
            console.log(row.purchase_id);
            let Message=confirm("确定删除此行商品？");
            if(Message){
                let dataD=this.$qs.stringify({
                    purchase_id:row.purchase_id
                });
                shopOderRm(dataD).then(res=>{
                    console.log(res);
                    if(res.errno==0){
                        this.$message({
                            type: "success",
                            message: res.data.message,
                            duration: 1000
                        });
                        this.init(1);   
                    }else{
                        this.$message({
                            type: "error",
                            message: res.errmsg,
                            duration: 1000
                        });
                    }
                });         
            }else{
                alert("用户取消操作");
            }
        },
        tableRowStyle({ row, rowIndex }) {
        return 'background-color:#949494;color:#fff;'
    },
    },
    created: function () { 
        if(localStorage.erpTableSetting!==undefined){
            console.log("yes");
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting); 
            if(erpTableSetting.shopOderList!==undefined){
                this.shopOdershow=erpTableSetting.shopOderList;
            }
        }else{
            console.log("no");
        }
        this.init(1);
    }
}
</script>