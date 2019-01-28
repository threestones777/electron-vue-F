<template>
    <div id="shopReturnList">
        <div class="main-header">
            <!-- <h3>温州美联 管理中心</h3> -->
            <el-breadcrumb style="font-size:18px" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>购货</el-breadcrumb-item>
                <el-breadcrumb-item>采购退货</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="operate-in">
                <div @click="reset" class="card">
                    <i class="el-icon-loading"></i>
                    <div>刷新</div>
                </div>
                <div @click="test(),dialogShow=true" class="card">
                    <i class="el-icon-tickets"></i>
                    <div>显示列</div>
                </div>
                <div @click="()=>{dialogAdd=true}" class="card">
                    <i class="el-icon-plus"></i>
                    <div>添加订单</div>
                </div>
            </div>
        </div>
        <fieldset style="margin:10px 0;border-color:#fff;text-align:left">
            <legend>查询条件</legend>
            <el-row type="flex" style="padding-bottom:0px;" justify="space-around" :gutter="10">
            <el-col :span="6">
                <el-row type="flex" justify="space-around" :gutter="5">
                    <el-col :span="12">
                        <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:10px;" v-model="search"  size="mini"  placeholder="输入订单号"/>
                        <el-select @change="chose" v-model="value" size="small" placeholder="结算类型" style="margin-bottom:5px;width:100%">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="12">
                        <el-select @change="chose" v-model="value1" size="small" placeholder="分店" style="margin-bottom:5px;width:100%">
                            <el-option
                            v-for="item in options1"
                            :key="item.value1"
                            :label="item.label"
                            :value="item.value1">
                            </el-option>
                        </el-select>
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%" v-model="search1"  size="mini"  placeholder="金额"/>
                    </el-col>
                </el-row> 
            </el-col>
            <el-col :span="6">
                <el-row type="flex" justify="space-around" :gutter="5">
                    <el-col :span="12">
                    <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;" v-model="search2"  size="mini"  placeholder="实际退货人"/>
                    <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-top:10px;" v-model="search3"  size="mini"  placeholder="审核人"/> 
                    </el-col>
                    <el-col :span="12">
                        <el-date-picker
                        v-model="search8" size="small" @change="chose"
                        type="date" style="width:100%"
                        value-format="yyyy-MM-dd"
                        placeholder="实际到货日期">
                        </el-date-picker>
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-top:5px" v-model="search4"  size="mini"  placeholder="业务员"/> 
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="6">
                <el-row type="flex" justify="space-around" :gutter="5">
                    <el-col :span="12">
                        <el-date-picker
                        v-model="search9" size="small" @change="chose"
                        type="date" style="width:100%"
                        value-format="yyyy-MM-dd"
                        placeholder="预定到货日期">
                        </el-date-picker>
                        <!-- <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-top:5px" v-model="search5"  size="mini"  placeholder="对方单号"/>  -->
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-top:5px" v-model="search7"  size="mini"  placeholder="供应商编码"/> 
                    </el-col>
                    <el-col :span="12">
                        <el-date-picker
                        v-model="search6" size="small" @change="chose"
                        type="date" style="width:100%"
                        value-format="yyyy-MM-dd"
                        placeholder="退货日期">
                        </el-date-picker>
                    </el-col>
                </el-row>
            </el-col>
            <!-- <el-col :span="3" style="padding-left:30px;">
                <el-button style="margin-top:10px;" type="primary" size="small" @click="reset">刷新</el-button><br>
                <el-button type="primary" size="small" @click="()=>{dialogAdd=true}">添加</el-button><br>
                <el-button icon="el-icon-tickets"  style="margin-top:10px" type="primary" size="small" @click="dialogShow=true">显示列</el-button>
            </el-col> -->
            <el-col :span="6"></el-col>
        </el-row>
        </fieldset>
        <!-- <div style="text-align:left;margin-top:10px;">
            <el-input size="small" style="width:15%;" placeholder="请输入商品主条码"  v-model="formAdd.purchase_sn" autofocus/>
            <el-input size="small" v-model="formAdd.remark"  style="width:15%;" placeholder="备注"></el-input>
            <el-button type="primary" size="small" @click="add">添加</el-button>
        </div> -->
            <!-- <el-button type="primary" size="small" @click="saveData" id="save" :disabled="save">保存</el-button>
            <el-button type="primary" size="small" @click="check">审核</el-button> -->
            <!-- <el-button type="primary" size="small" @click="edit">修改</el-button> -->
        <!-- 按需选择列弹窗 -->
            <el-dialog
            title="按需选择列" style="text-align:left" class="chose"
            :visible.sync="dialogShow"
            :before-close="handleClose"
            width="300px">
                <el-checkbox v-model="shopReturnshow.show1">单据id</el-checkbox><br>
                <el-checkbox v-model="shopReturnshow.show2">单据sn</el-checkbox><br>
                <el-checkbox v-model="shopReturnshow.show3">采购单编号</el-checkbox><br>
                <el-checkbox v-model="shopReturnshow.show4">状态</el-checkbox><br>
                <el-checkbox v-model="shopReturnshow.show5">状态名</el-checkbox><br>
                <el-checkbox v-model="shopReturnshow.show6">单据金额</el-checkbox><br>
                <el-checkbox v-model="shopReturnshow.show7">退货时间</el-checkbox><br>
                <el-checkbox v-model="shopReturnshow.show8">退货人</el-checkbox><br>
                <el-checkbox v-model="shopReturnshow.show9">退货审核人</el-checkbox><br>
                <el-checkbox v-model="shopReturnshow.show10">审核日期</el-checkbox><br>
                <el-checkbox v-model="shopReturnshow.show11">备注</el-checkbox><br>
                <el-checkbox v-model="shopReturnshow.show12">电话</el-checkbox><br>
                <el-checkbox v-model="shopReturnshow.show13">联系人</el-checkbox><br>
                <el-checkbox v-model="shopReturnshow.show14">手机</el-checkbox><br>
            </el-dialog>
        <!-- <el-dialog
        title="选择供应商"
        :visible.sync="selectSupplier"
        width="95%"
        :before-close="handleClose">
            名称 :<el-input	size="small" v-model="orderDate" placeholder="供应商名称"></el-input>          
            编号 :<el-input	size="small" v-model="supplier_id" placeholder="供应商编号"></el-input>          
            联系人 :<el-input	size="small" v-model="orderDate" placeholder="联系人"></el-input>          
            联系电话 :<el-input	size="small" v-model="orderDate" placeholder="联系电话"></el-input>          
            备注信息 :<el-input	size="small" v-model="orderDate" placeholder="备注信息"></el-input> 
            <el-button	size="small" type="primary" @click="supplier">搜索</el-button>
            <el-table
            ref="multipleTable"
            :data="SupplierData"
            border
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                prop="supplier_name"
                label="供应商名称"
                width="100">
                </el-table-column>
                <el-table-column
                prop="supplier_id"
                label="供应商编号"
                width="100">
                </el-table-column>
                <el-table-column
                prop="contacts_name"
                label="联系人"
                width="90">
                </el-table-column>
                <el-table-column
                prop="contacts_phone"
                label="联系电话"
                width="100">
                </el-table-column>
                <el-table-column
                prop="address"
                label="供应商地址"
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="社交账户"
                width="100">
                </el-table-column>
                <el-table-column
                prop="email"
                label="邮箱地址"
                width="100">
                </el-table-column>
                <el-table-column
                prop="bank_name"
                label="开户名"
                width="100">
                </el-table-column>
                <el-table-column
                prop="bank_account_name"
                label="开户行"
                width="100">
                </el-table-column>
                <el-table-column
                prop="bank_account_number"
                label="银行账户"
                width="100">
                </el-table-column>
                <el-table-column
                prop="tax_registration_certificate"
                label="税号"
                width="100">
                </el-table-column>
                <el-table-column
                prop="contacts_name"
                label="姓名"
                width="90">
                </el-table-column>
                <el-table-column
                prop="supplier_desc"
                label="备注信息"
                show-overflow-tooltip>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button	size="small" @click="selectSupplier=false">取 消</el-button>
                <el-button	size="small" type="primary" @click="selectSupplier=false">确 定</el-button>
            </span>
        </el-dialog> --> 
        <!-- 新增购货退货单弹窗 -->
        <el-dialog
        title="新增采购退货单"
        :visible.sync="dialogAdd"
        width="700px">
            <el-form :model="formAdd" class="detail">
                <el-row type="flex" justify="space-around">
                    <el-col :span="7">
                        采购订单sn<input class="spe" v-model="formAdd.purchase_sn" ref="input" @blur="exam" @input="()=>{this.status=0}"/>
                    </el-col>
                    <el-col :span="7">
                        备注<el-input v-model="formAdd.remark"></el-input>
                    </el-col>
                </el-row> 
            </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="dialogAdd = false">取 消</el-button>
            <el-button size="small" type="primary" @click="add(),dialogAdd = false" :disabled="status===1">添加</el-button>
        </span>
        </el-dialog>
        <el-table
        :data="shopReturnData.filter(data =>  {
        return Object.keys(data).some(key => {
        return String(data[key]).toLowerCase().indexOf(search) > -1})})"
        border stripe
        :row-style="{height:0}"  
        :cell-style="{padding:0}"
        :header-row-style="{height:0}"  
        :header-cell-style="tableRowStyle"
        show-summary
        style="width: 100%">
            <el-table-column
                align="center"
                width="175"
                label="单据编号">
                    <template slot-scope="scope">
                        <span>{{scope.row.purchase_sn}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                label="标配">
                    <template slot-scope="scope">
                        <span>{{scope.row.standard}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="status_name"
                align="center"
                label="状态名">
                </el-table-column>
                <el-table-column
                align="center"
                width="130"
                label="货号">
                    <template slot-scope="scope">
                        <span>{{scope.row.product_id}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="120"
                label="名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.goods_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                label="规格">
                    <template slot-scope="scope">
                        <span>{{scope.row.attr_value}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                prop="money"
                label="售价">
                    <template slot-scope="scope">
                        <span style="color:#B58900">{{scope.row.money}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="50"
                label="退货折扣">
                    <template slot-scope="scope">
                        <span>{{scope.row.discount}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                label="退货进价">
                    <template slot-scope="scope">
                        <span>{{scope.row.sh_jinjia}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                label="箱数">
                    <template slot-scope="scope">
                        <span>{{scope.row.sh_box_number}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                label="数量">
                    <template slot-scope="scope">
                        <span>{{scope.row.sh_goods_number}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                label="赠送数量">
                    <template slot-scope="scope">
                        <span>{{scope.row.sh_give_number}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                label="退货金额">
                    <template slot-scope="scope">
                        <span>{{scope.row.sh_money}}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column
                align="center"
                label="收货赠送金额">
                    <template slot-scope="scope">
                        <input v-model="scope.row.sh_give_money">
                    </template>
                </el-table-column> -->
                <el-table-column
                align="center"
                label="退货售价金额">
                    <template slot-scope="scope">
                        <span>{{scope.row.sh_shoujia}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                label="退货箱数">
                    <template slot-scope="scope">
                        <span>{{scope.row.dh_box_number}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                label="退货数量">
                    <template slot-scope="scope">
                        <span>{{scope.row.dh_goods_number}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                label="退货赠送数量">
                    <template slot-scope="scope">
                        <span>{{scope.row.dh_give_number}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                label="退货赠送金额">
                    <template slot-scope="scope">
                        <span>{{scope.row.dh_give_money}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                label="退货金额">
                    <template slot-scope="scope">
                        <span>{{scope.row.dh_money}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                label="箱装数">
                    <template slot-scope="scope">
                        <span>{{scope.row.box_in_number}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                label="毛利额">
                    <template slot-scope="scope">
                        <span>{{scope.row.gross_profit}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                label="毛利率">
                    <template slot-scope="scope">
                        <span>{{scope.row.gross_interest_rate}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                label="批发价">
                    <template slot-scope="scope">
                        <span>{{scope.row.wholesale_price}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="50"
                label="单位">
                    <template slot-scope="scope">
                        <span>{{scope.row.supplier_id}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="100"
                label="退货时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.back_time}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="100"
                label="失效日期">
                    <template slot-scope="scope">
                        <span>{{scope.row.expiry_date}}</span>
                    </template>
                </el-table-column>
            <el-table-column
                fixed="right"
                align="center"
                width="120"
                label="相关操作">
                    <template slot-scope="scope">
                       <el-button type="text" size="small" @click="showDetails(scope.row),dialogDetail=true">商品详情</el-button>
                       <!-- <el-button type="text" size="small" @click="edit(scope.row)">保存修改</el-button> -->
                        <el-button :disabled="scope.row.status_name!=='未审核'" type="text" size="small" @click="getId(scope.row)">审核</el-button>
                        <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button> 
                    </template>
                </el-table-column>   
        </el-table>
    <!------------------ 详情弹窗 ---------------------------------------->
    <el-dialog width="800px" title="采购退货单详情" :visible.sync="dialogDetail">
        <el-button style="float:right;margin-bottom:10px;" size="small" type="primary" class="addGoods" @click="getGoods(),dialogAddGoods=true">添加商品</el-button>
        <el-table
        :data="goodsData"
        border stripe
        :row-style="{height:0}"  
        :cell-style="{padding:0}"
        :header-row-style="{height:0}"  
        :header-cell-style="{padding:0}"
        show-summary
        style="width: 100%">
            <!-- <el-table-column
                prop="id"
                align="center"
                label="id">
            </el-table-column>
            <el-table-column
                prop="goods_id"
                align="center"
                label="商品id">
            </el-table-column> -->
            <el-table-column
                align="center"
                label="商品名">
                <template slot-scope="scope">
                    <span :title="scope.row.goods_name">{{scope.row.goods_name.slice(0,7)+"..."}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="goods_sn"
                align="center"
                label="商品条码">
                <template slot-scope="scope">
                    <span>{{scope.row.goods_sn}}</span>
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
                label="标配">
            </el-table-column>
            <el-table-column
                prop="shop_price"
                align="center"
                label="售价">
            </el-table-column>
            <el-table-column
                prop="sh_price"
                align="center"
                label="收货进价">
            </el-table-column>
            <el-table-column
                prop="amount"
                align="center"
                label="箱数">
            </el-table-column>
            <el-table-column
                prop="giveNumber"
                align="center"
                label="赠送数量">
            </el-table-column>
            <el-table-column
                prop="shDmoney"
                align="center"
                label="收货金额">
            </el-table-column>
            <el-table-column
                prop="sh_money"
                align="center"
                label="收货赠送金额">
            </el-table-column>
            <el-table-column
                prop="dh_number"
                align="center"
                label="订货箱数">
            </el-table-column>
            <el-table-column
                prop="dh_amount"
                align="center"
                label="订货数量">
            </el-table-column>
            <el-table-column
                prop="dh_givenumber"
                align="center"
                label="订货赠送数量">
            </el-table-column>
            <el-table-column
                prop="dh_givemoney"
                align="center"
                label="订货赠送金额">
            </el-table-column>
            <el-table-column
                prop="mori_money"
                align="center"
                label="毛利额">
            </el-table-column>
            <el-table-column
                prop="mori_lv"
                align="center"
                label="毛利率">
            </el-table-column>
            <el-table-column
                prop="whole_sale"
                align="center"
                label="批发价">
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
            <el-button size="small" @click="dialogDetail = false">取 消</el-button>
            <el-button size="small" type="primary" @click="dialogDetail = false">确定</el-button>
        </div>
    </el-dialog>
    <!------------------------------------ 审核弹窗 ------------------------>
    <el-dialog width="30%" title="订单审核" :visible.sync="dialogCheck">
        <el-radio-group @change="checkSta"  v-model="status">
            <el-radio :label="0">未审核</el-radio>
            <el-radio :label="1">已审核</el-radio>
            <el-radio :label="2">已退货</el-radio>
        </el-radio-group> 
    </el-dialog>
    <!----------------------------- 添加商品弹窗 -------------------------------------->
    <el-dialog
    title="商品列表"
    :visible.sync="dialogAddGoods"
    width="700px">
    <el-table
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
                prop="attr_value"
                align="center"
                label="属性">
            </el-table-column>
            <el-table-column
                prop="number"
                align="center"
                label="数量">
            </el-table-column>
            <el-table-column
                prop="per_price"
                align="center"
                label="单个金额">
            </el-table-column>
            <el-table-column
                prop="money"
                align="center"
                label="总金额">
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
    </el-pagination>
    <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogAddGoods = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addGoods(),dialogAddGoods = false">添加商品</el-button>
    </span>
    </el-dialog>
        <!--分页-->
        <el-pagination
            @current-change="handleCurrentChange"
            layout="total,prev, pager, next,jumper"
            :total="record_count">
        </el-pagination>
    </div>
</template>
<style scoped>
    .el-row{
        background:#F3F3F3;
        width:100%;
    }
    .chose .el-checkbox{
        margin-bottom:10px;
    }
    #shopReturnList{
        text-align:center;
        margin: 10px;
    }
    #shopReturnList .el-dialog .el-input{
       width:10%;
    }
    #shopReturnList .main-header{
        text-align:left;
        margin-bottom: 10px;
        padding:10px;
        background:#fff;
    }
    #shopReturnList .main-header .el-breadcrumb {
        margin: 8px 0 0 10px;
    }
    #shopReturnList .el-select{
        width:100px;
    }
    #shopReturnList .el-input{
        width:160px;
        margin-right:10px;
    }
    #shopReturnList .el-table{
        margin:20px 0;
    } 
    #shopReturnList .el-pagination{
        text-align: right;
        margin: 20px 0 50px 0;
    }
    #shopReturnList .el-pagination__jump .el-input{
        width:50%;
    }
    #shopReturnList .detail .el-input{
        width:100%;
    }
    #shopReturnList .detail .el-row{
        border-bottom: 1px dotted #DCDFE6;
    }/* 
    #shopReturnList .addGoods{
        float:right;
        position:relative;
        bottom:15px;
    } */
    .el-table input{
        width:100%;
        height:34px;
        border-radius:4px;
        padding:2px;
    }
    .spe{
        border:1px solid #DCDFE6;
        height:38px;
        border-radius:4px;
        padding:0 15px
    }
    .spe:focus{
        border:1px solid #409EFF;
        outline-color: #fff;
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
import {shopReturnList,supplier,getGoodsList} from '../../api/api' ;
import {repurchaseDe,repurchaseAddG,repurchaseEdG,repurchaseRmv,repurchaseCh,repurchaseAdd,repurchaseBa,repurchaseDel,shopOderListDe} from '../../api/apiW' ;
  export default {
    inject: ['reload'],
    data() {
      return {
        selectSupplier:false,
        dialogDetail:false,
        dialogAddGoods:false,
        dialogCheck:false,
        dialogAdd:false,
        value: '',
        record_count:0,
        dialogShow:false,
        search:'',
        search1:'',
        search2:'',
        search3:'',
        search4:'',
        search5:'',
        search6:'',
        search7:'',
        search8:'',
        search9:'',
        input:'',
        save:false,
        orderDate:'',
        orderId:'',
        supplier_id:'2',
        id:0,
        value: '' ,
        value1: '' ,
        value3: '' ,
        value4: '' ,
        radio:3,
        shopReturnData: [],
        status:1,
        pages:1,
        pagesG:1,
        back_sn:0,
        purchase_sn:0,
        SupplierData: [],
        formDetail:{},
        formAdd:{
            purchase_sn:"",
            remark:""
        },
        goodsData:[],
        goodsListData:[],
        getGoodsList:[],
        multipleSelection: [],
        isCheck:false,
        shopReturnshow:{
            show1:true,
            show2:true,
            show3:true,
            show4:true,
            show5:true,
            show6:true,
            show7:true,
            show8:true,
            show9:true,
            show10:true,
            show11:true,
            show12:true,
            show13:true,
            show14:true,
        },
        options: [{
            value: '1',
            label: '未审核'
            }, {
            value: '2',
            label: '已退货'
            },],  
            options1: [{
            value1: '0',
            label: '0号店'
            }, {
            value1: '1',
            label: '1号店'
            },],  
            options3: [{
            value3: '选项1',
            label: '分公司1'
            }, {
            value3: '选项2',
            label: '分公司2'
            },],  
            options4: [{
            value4: '选项1',
            label: '类型1'
            }, {
            value4: '选项2',
            label: '类型2'
            },],
      }
    },
    methods:{
        test(){
            //var my={id:"1",name:"惠济路",sex:'女'};
            var my=[1,2,3,4,5];
            my.money=1500;
            for(var i of my){
                console.log(i);
                //console.log(my[i]);
            }
        },
        init(page){//-----------------初始化数据
            let data=this.$qs.stringify({
                page:page,
                page_size:10,
            });
            shopReturnList(data).then(res=>{
                this.record_count=Number(res.data.filter.record_count);
                this.shopReturnData=res.data.list;
            }) 
        }, 
        reset(){//--------------刷新
            this.reload();
        },
        handleClose(done) {
            done();
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            erpTableSetting.shopReturnList=this.shopReturnshow;
            localStorage.erpTableSetting=JSON.stringify(erpTableSetting);
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        data(data){
            shopReturnList(data).then(res=>{
                this.record_count=Number(res.data.filter.record_count);
                this.shopReturnData=res.data.list;
            }) 
        },
        chose(){//------------------------选择查询
            let data=this.$qs.stringify({
                page:1,
                page_size:10,
                status:this.value,
                subshop_id:this.value1,
                money:this.search1,
                back_user:this.search2,
                check_user:this.search3,
                real_arrive_time:this.search8,
                sales_man:this.search4,
                expect_arrive_time:this.search9,
                duifang_sn:this.search5,
                back_time:this.search6,
                supplier_name:this.search7,
            }); 
            this.data(data); 
        },
        open(){//---------打开
            this.dialogAdd=true;
            this.$nextTick(()=>{this.refs['input'].focus()});
            this.$nextTick(() => {this.$refs['input'].focus()})
        },
        exam(){
            if(this.formAdd.purchase_sn==""){
                //this.$alert("购货单号不能为空");
                this.status=1;
            }else{
                this.status=0;
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        selectionChange(val) {
            this.multipleSelection = [];
            this.multipleSelection = val;
            console.log(this.multipleSelection);
            this.arr=[];
            for(let i=0;i<this.multipleSelection.length;i++){
                this.arr.push(this.multipleSelection[i].goods_id);
            };
                console.log(this.arr);
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
        supplier(){
            this.SupplierData=[];
            console.log(this.supplier_id);
            supplier({params:{supplier_id:this.supplier_id}}).then(res=>{
                console.log(res.data);
                this.SupplierData.push(res.data);
            })
        },
        detailGoods(){
            repurchaseDe({params:{id:this.id}}).then(res=>{
                this.formDetail=res.data;
                this.goodsData=res.data.goods;
            });
        },
        add(){//------------------------------添加订单
            console.log(this.formAdd);
            if(this.formAdd.purchase_sn!==""){
               let data=this.$qs.stringify(this.formAdd);
                repurchaseAdd(data).then(res=>{
                    if(res.errno==0){
                        this.$alert(res.data.message,{
                            callback:action=>{
                                this.reload(); 
                                this.formAdd.purchase_sn=""; 
                            }
                        })
                    }else{
                        this.$alert(res.errmsg);
                        this.formAdd.purchase_sn=""; 
                    }
                }); 
            }else{
                this.$message({
                    type: "error",
                    message: "主条码不能为空",
                    duration: 1000
                });
            };
                
        },
        showDetails(row){//------------------------------详情
            this.id=row.id;
            this.back_sn=row.back_sn;
            this.purchase_sn=row.purchase_sn;
            this.detailGoods();
        },
        getId(row){//-----------------------保存id
            this.back_sn=row.back_sn;
            this.status=Number(row.status);
            if(row.status_name=="已退货"){
                this.$message({
                    type: "error",
                    message: "已退货，不能审核",
                    duration: 1000
                });
                this.isCheck=true;
            }else{
                this.dialogCheck=true;
            }

        },
        back(){//--------------------------退货
            let data=this.$qs.stringify({
                back_sn:this.back_sn
            });
            repurchaseBa(data).then(res=>{
                console.log(res);
                if(res.errno==0){
                    this.$alert(res.data.message,{
                        callback:action=>{
                            this.reload();    
                        }
                    })
                }else{
                    this.$alert(res.errmsg)
                }
            });
        },
        checkSta(){//------------------审核
            this.dialogCheck = false;
            let dataC=this.$qs.stringify({
                back_sn:this.back_sn,
                status:this.status
            });
            repurchaseCh(dataC).then(res=>{
                if(res.errno==0){
                    this.$message({
                        type: "error",
                        message: res.data.message,
                        duration: 1000
                    });
                }else{
                    this.$message({
                        type: "error",
                        message: res.errmsg,
                        duration: 1000
                    });
                };
                this.reload();
            });
                
        },
        getGoods(){//--------------------------------获取商品列表
            shopOderListDe({params:{purchase_sn:this.purchase_sn}}).then(res=>{
                console.log(res.data.goods);
                this.goodsListData=res.data.purchase_goods;
            })
        },
        addGoods(){//---------------------------------添加商品
            let dataA=this.$qs.stringify({
                id:this.id,
                goods_id:JSON.stringify(this.arr)
            });
            repurchaseAddG(dataA).then(res=>{
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
        },
        editGoods(row){//---------------------------修改商品
            console.log(row);
            let data=this.$qs.stringify(row);
            repurchaseEdG(data).then(res=>{
                console.log(res);
                if(res.errno==0){
                    this.$alert(res.data.message,{
                        callback:action=>{
                            this.detailGoods();    
                        }
                    })
                }else{
                    this.$alert(res.errmsg);
                }
            });
        },
        deleteGoods(row){//---------------------------删除商品
            console.log(row.back_sn);
            console.log(row.id);
            let Message=confirm("确定删除此行商品？");
            if(Message){
                let dataD=this.$qs.stringify({
                    back_sn:row.back_sn,
                    id:row.id
                });
                repurchaseRmv(dataD).then(res=>{
                    console.log(res);
                    if(res.errno==0){
                        this.$alert(res.data.message,{
                            callback:action=>{
                                this.detailGoods();    
                            }
                        })
                    }else{
                        this.$alert(res.errmsg)
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
                    back_sn:row.back_sn
                });
                repurchaseDel(dataD).then(res=>{
                    console.log(res);
                    if(res.errno==0){
                        this.$alert(res.data.message,{
                            callback:action=>{
                                this.reload();    
                            }
                        })
                    }else{
                        this.$alert(res.errmsg)
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
            if(erpTableSetting.shopReturnList!==undefined){
                this.shopReturnshow=erpTableSetting.shopReturnList;
            }
        }else{
            console.log("no");
        }
        this.init(1);
    },    
  }
</script>