<template>
    <div class="allocatingMaori">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>调拨</el-breadcrumb-item>
                <el-breadcrumb-item>调拨毛利</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <fieldset style="margin:10px 0;border-color:#fff;text-align:left">
                <legend>查询条件</legend>
                <el-row type="flex" justify="space-around" :gutter="10">
                    <el-col style="text-align:left" :span="6">
                        <el-radio-group v-model="radio" style="margin-top:5px;">
                            <el-radio style="margin-bottom:7px" :label="0">发货日期</el-radio><br>
                            <el-radio style="margin-bottom:7px" :label="1">收货日期</el-radio><br>
                            <el-date-picker
                        v-model="search3" size="small"
                        style="width:100%;margin-bottom:5px"
                        type="daterange"
                        align="right"
                        unlink-panels
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                        </el-radio-group>    
                    </el-col>
                    <el-col :span="4">
                        <el-select @change="chose" style="margin-bottom:5px" v-model="value4" size="small" placeholder="调出分店">
                            <el-option
                            v-for="item in options4"
                            :key="item.value4"
                            :label="item.label"
                            :value="item.value4">
                            </el-option>
                        </el-select> 
                        <el-select @change="chose" style="margin-bottom:5px" v-model="value5" size="small" placeholder="调入分店">
                            <el-option
                            v-for="item in options5"
                            :key="item.value3"
                            :label="item.label"
                            :value="item.value5">
                            </el-option>
                        </el-select> 
                        <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search"  size="mini"  placeholder="单号"/>
                    </el-col>
                    <el-col :span="4">
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search5"  size="mini"  placeholder="条形码"/>
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search2"  size="mini"  placeholder="货号"/>
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search4"  size="mini"  placeholder="商品名称"/>
                    </el-col>
                    <el-col :span="4">
                        <el-select @change="chose" style="margin-bottom:5px" v-model="value8" size="small" placeholder="分类汇总">
                            <el-option
                            v-for="item in options8"
                            :key="item.value8"
                            :label="item.label"
                            :value="item.value8">
                            </el-option>
                        </el-select> 
                        <el-select @change="chose" style="margin-bottom:5px" v-model="value2" size="small" placeholder="品牌汇总">
                            <el-option
                            v-for="item in options2"
                            :key="item.value2"
                            :label="item.label"
                            :value="item.value2">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4">
                    <el-input @input="chose" prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search1"  size="mini"  placeholder="分类"/>
                        <el-input @input="chose" prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search7"  size="mini"  placeholder="品牌"/>
                        <el-input @input="chose" prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search8"  size="mini"  placeholder="供应商编码"/>
                    </el-col>
                    <el-col :span="4"></el-col>
                    <el-col :span="3">
                        <el-button type="primary" size="small" @click="reset">刷 新</el-button><br>
                        <el-button icon="el-icon-tickets"  style="margin-top:5px" type="primary" size="small" @click="dialogShow=true">显示列</el-button>
                    </el-col>
                </el-row>				
			</fieldset>
            <!-- 按需选择列弹窗 -->
            <el-dialog
            title="按需选择列" class="chose" style="text-align:left"
            :visible.sync="dialogShow"
            :before-close="handleClose"
            width="200px">
                <el-checkbox v-model="maorishow.show1">调拨毛利id</el-checkbox><br>
                <el-checkbox v-model="maorishow.show2">调出店号</el-checkbox><br>
                <el-checkbox v-model="maorishow.show3">调出店名称</el-checkbox><br>
                <el-checkbox v-model="maorishow.show4">收货店号</el-checkbox><br>
                <el-checkbox v-model="maorishow.show5">收货店名称</el-checkbox><br>
                <el-checkbox v-model="maorishow.show6">条码</el-checkbox><br>
                <el-checkbox v-model="maorishow.show7">货号</el-checkbox><br>
                <el-checkbox v-model="maorishow.show8">商品名称</el-checkbox><br>
                <el-checkbox v-model="maorishow.show9">品牌编码</el-checkbox><br>
                <el-checkbox v-model="maorishow.show10">品牌名称</el-checkbox><br>
                <el-checkbox v-model="maorishow.show11">分类编码</el-checkbox><br>
                <el-checkbox v-model="maorishow.show12">分类名称</el-checkbox><br>
                <el-checkbox v-model="maorishow.show13">规格</el-checkbox><br>
                <el-checkbox v-model="maorishow.show14">发货数量</el-checkbox><br>
                <el-checkbox v-model="maorishow.show15">进货金额</el-checkbox><br>
                <el-checkbox v-model="maorishow.show16">发货售价金额</el-checkbox><br>
                <el-checkbox v-model="maorishow.show17">发货成本金额</el-checkbox><br>
                <el-checkbox v-model="maorishow.show18">发货毛利额</el-checkbox><br>
                <el-checkbox v-model="maorishow.show19">发货毛利率</el-checkbox><br>
                <el-checkbox v-model="maorishow.show20">收货数量</el-checkbox><br>
                <el-checkbox v-model="maorishow.show21">收货售价金额</el-checkbox><br>
                <el-checkbox v-model="maorishow.show22">收货成本金额</el-checkbox><br>
                <el-checkbox v-model="maorishow.show23">收货毛利额</el-checkbox><br>
                <el-checkbox v-model="maorishow.show24">收货毛利率</el-checkbox><br><br>
            </el-dialog>
            <!-- 新增弹出框 -->
            <el-dialog width="700px" title="新增" :visible.sync="dialogServeAdd">
                <el-form :model="formServeAdd"  style="text-align:center">
                    <el-row type="flex" justify="space-around"  style="text-align:center">
                        <el-col :span="7">
                            调拨毛利id<el-input v-model="formServeAdd.id"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            分站id<el-input v-model="formServeAdd.subsite_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            调出店号<el-input v-model="formServeAdd.from_subshop_id"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            调出店名称<el-input v-model="formServeAdd.from_subshop_name"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            收货店号<el-input v-model="formServeAdd.to_subshop_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            收货店名称<el-input v-model="formServeAdd.to_subshop_name"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            条码<el-input v-model="formServeAdd.serial_code"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            货号<el-input v-model="formServeAdd.product_sn"></el-input>
                        </el-col>
                        <el-col :span="7">
                            商品名称<el-input v-model="formServeAdd.goods_name"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            品牌编码<el-input v-model="formServeAdd.brand_id"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            品牌名称<el-input v-model="formServeAdd.brand_name"></el-input>
                        </el-col>
                        <el-col :span="7">
                            分类编码<el-input v-model="formServeAdd.cat_id"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            分类名称<el-input v-model="formServeAdd.cat_name"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            规格<el-input v-model="formServeAdd.attr_value"></el-input>
                        </el-col>
                        <el-col :span="7">
                            发货数量<el-input v-model="formServeAdd.fahuo_num"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            进货金额<el-input v-model="formServeAdd.jinhuo_money"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            发货售价金额<el-input v-model="formServeAdd.fh_shop_price"></el-input>
                        </el-col>
                        <el-col :span="7">
                            发货成本金额<el-input v-model="formServeAdd.fh_chengben_price"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            发货毛利额<el-input v-model="formServeAdd.fh_gross_profit"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            发货毛利率<el-input v-model="formServeAdd.fh_gross_interest_rate"></el-input>
                        </el-col>
                        <el-col :span="7">
                            收货数量<el-input v-model="formServeAdd.sh_num"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            收货售价金额<el-input v-model="formServeAdd.sh_shop_price"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            收货成本金额<el-input v-model="formServeAdd.sh_chengben_price"></el-input>
                        </el-col>
                        <el-col :span="7">
                            收货毛利额<el-input v-model="formServeAdd.sh_gross_profit"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            收货毛利率<el-input v-model="formServeAdd.sh_gross_interest_rate"></el-input>    
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeAdd = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="add(),dialogServeAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 详情弹出框 -->
            <el-dialog width="700px" title="详情" :visible.sync="dialogServeDetail">
                <el-form :model="formServeDetail"  style="text-align:center">
                    <!-- <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            调拨毛利id<el-input v-model="formServeDetail.id" disabled></el-input>   
                        </el-col>
                        <el-col :span="7">
                            分站id<el-input v-model="formServeDetail.subsite_id" disabled></el-input>
                        </el-col>
                        <el-col :span="7">
                            调出店号<el-input v-model="formServeDetail.from_subshop_id"></el-input>
                        </el-col>
                    </el-row>  -->
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            调出店名称<el-input v-model="formServeDetail.from_subshop_name"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            收货店号<el-input v-model="formServeDetail.to_subshop_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            收货店名称<el-input v-model="formServeDetail.to_subshop_name"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            条码<el-input v-model="formServeDetail.serial_code"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            货号<el-input v-model="formServeDetail.product_sn"></el-input>
                        </el-col>
                        <el-col :span="7">
                            名称<el-input v-model="formServeDetail.goods_name"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            品牌编码<el-input v-model="formServeDetail.brand_id"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            品牌名称<el-input v-model="formServeDetail.brand_name"></el-input>
                        </el-col>
                        <el-col :span="7">
                            分类编码<el-input v-model="formServeDetail.cat_id"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            分类名称<el-input v-model="formServeDetail.cat_name"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            规格<el-input v-model="formServeDetail.attr_value"></el-input>
                        </el-col>
                        <el-col :span="7">
                            发货数量<el-input v-model="formServeDetail.fahuo_num"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            进货金额<el-input v-model="formServeDetail.jinhuo_money"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            发货售价金额<el-input v-model="formServeDetail.fh_shop_price"></el-input>
                        </el-col>
                        <el-col :span="7">
                            发货成本金额<el-input v-model="formServeDetail.fh_chengben_price"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            发货毛利额<el-input v-model="formServeDetail.fh_gross_profit"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            发货毛利率<el-input v-model="formServeDetail.fh_gross_interest_rate"></el-input>
                        </el-col>
                        <el-col :span="7">
                            收货数量<el-input v-model="formServeDetail.sh_num"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            收货售价金额<el-input v-model="formServeDetail.sh_shop_price"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            收货成本金额<el-input v-model="formServeDetail.sh_chengben_price"></el-input>
                        </el-col>
                        <el-col :span="7">
                            收货毛利额<el-input v-model="formServeDetail.sh_gross_profit"></el-input>
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            收货毛利率<el-input v-model="formServeDetail.sh_gross_interest_rate"></el-input>    
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogServeDetail = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="edit(),dialogServeDetail = false">保存修改</el-button>
                </div>
            </el-dialog>
            <!-- 表格 -->
            <el-table
            :data="MaoriData.filter(data =>  {
            return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1})})"
            border stripe
            show-summary
            :row-style="{height:0}"  
            :cell-style="{padding:3}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            style="width: 100%">
                <el-table-column
                align="center"
                v-if="maorishow.show1"
                label="调拨毛利id">
                    <template slot-scope="scope">
                        <span>{{scope.row.id}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="maorishow.show2"
                label="调出店号">
                    <template slot-scope="scope">
                        <span>{{scope.row.from_subshop_id}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="130"
                v-if="maorishow.show3"
                label="调出店名称">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.from_subshop_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="maorishow.show4"
                label="收货店号">
                    <template slot-scope="scope">
                        <span>{{scope.row.to_subshop_id}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="130"
                v-if="maorishow.show5"
                label="收货店名称">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.to_subshop_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="150"
                v-if="maorishow.show6"
                label="条码">
                    <template slot-scope="scope">
                        <span>{{scope.row.serial_code}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="150"
                v-if="maorishow.show7"
                label="货号">
                    <template slot-scope="scope">
                        <span>{{scope.row.product_sn}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="200"
                v-if="maorishow.show8"
                label="商品名称">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.goods_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="maorishow.show9"
                label="品牌编码">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.brand_id"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="120"
                v-if="maorishow.show10"
                label="品牌名称">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.brand_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="90"
                v-if="maorishow.show11"
                label="分类编码">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.cat_id"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
               v-if="maorishow.show12" 
                label="分类名称">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.cat_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="maorishow.show13"
                label="规格">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.attr_value"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="fahuo_num"
                align="center"
                v-if="maorishow.show14"
                label="发货数量">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.fahuo_num"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="jinhuo_money"
                align="center"
                width="110"
                v-if="maorishow.show15"
                label="进货金额">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.jinhuo_money"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="fh_shop_price"
                align="center"
                width="110"
                v-if="maorishow.show16"
                label="发货售价金额">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.fh_shop_price"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="fh_chengben_price"
                align="center"
                width="110"
                v-if="maorishow.show17"
                label="发货成本金额">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.fh_chengben_price"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="fh_gross_profit"
                align="center"
                width="110"
                v-if="maorishow.show18"
                label="发货毛利额">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.fh_gross_profit"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="110"
                v-if="maorishow.show19"
                label="发货毛利率">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.fh_gross_interest_rate"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="sh_num"
                align="center"
                v-if="maorishow.show20"
                label="收货数量">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.sh_num"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="sh_shop_price"
                align="center"
                width="110"
                v-if="maorishow.show21"
                label="收货售价金额">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.sh_shop_price"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="sh_chengben_price"
                align="center"
                width="110"
                v-if="maorishow.show22"
                label="收货成本金额">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.sh_chengben_price"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="sh_gross_profit"
                align="center"
                width="110"
                v-if="maorishow.show23"
                label="收货毛利额">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.sh_gross_profit"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                width="110"
                v-if="maorishow.show24"
                label="收货毛利率">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.sh_gross_interest_rate"/>
                    </template>
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                width="120"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="edit(scope.row)">保存修改</el-button>
                        <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
                @current-change="handleCurrentChange"
                layout="total,prev, pager, next,jumper"
                :total="record_count">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {Maori,MaoriDe,MaoriAdd,MaoriEd} from '../../api/apiW' ;
export default {
    inject: ['reload'],
    data() {
        return {
            pages:1,
            dialogServeAdd:false,
            dialogServeDetail:false,
            dialogShow:false,
            record_count:0,
            maorishow:{
                show1:false,
                show2:false,
                show3:true,
                show4:true,
                show5:true,
                show6:false,
                show7:true,
                show8:true,
                show9:true,
                show10:true,
                show11:true,
                show12:true,
                show13:false,
                show14:true,
                show15:true,
                show16:true,
                show17:true,
                show18:true,
                show19:true,
                show20:true,
                show21:true,
                show22:true,
                show23:true,
                show24:true,
                show25:true,
            },
            search:'',
            search1:'',
            search2:'',
            search3:['2017-7-7','2019-9-9'],
            search4:'',
            search5:'',
            search6:'',
            search7:'',
            search8:'',
            search9:'',
            search10:'',
            radio:1,
            formServe:{
                name:"",
                marks:""
            },
            formServeAdd:{
                name:""
            },
            formServeDetail:{
                name:""
            },
            MaoriData:[],
            value: '' ,
            value1: '' ,
            value2: '' ,
            value3: '' ,
            value4: '' ,
            value5: '' ,
            value8: '' ,
            value9: '' ,
            value10: '' ,
            value11: '' ,
            options: [{
            value: '0',
            label: '现金券'
            }, {
            value: '1',
            label: '满减券'
            },{
            value: '2',
            label: '折扣券' 
            }],  
            options1: [{
            value1: '0',
            label: '商品'
            }, {
            value1: '1',
            label: '服务'
            },],  
            options2: [{
            value2: '0',
            label: '全部品牌'    
            },{
            value2: '7',
            label: '一级品牌'
            }, {
            value2: '1',
            label: '二级品牌'
            },],  
            options3: [{
            value3: '0',
            label: '未审核'
            }, {
            value3: '1',
            label: '已审核'
            },],  
            options4: [{
            value4: '0',
            label: '分店1'
            }, {
            value4: '1',
            label: '分店2'
            },],  
            options5: [{
            value5: '0',
            label: '分店1'
            }, {
            value5: '1',
            label: '分店2'
            },],
            options8: [{
            value8: '0',
            label: '分类1'
            }, {
            value8: '1',
            label: '分类2'
            },],
            options9: [{
            value9: '1',
            label: '未审核'
            }, {
            value9: '1',
            label: '已审核'
            },],
            options10: [{
            value10: '0',
            label: '类型1'
            }, {
            value10: '1',
            label: '类型2'
            },],
            options11: [{
            value11: '0',
            label: '未收货'
            }, {
            value11: '1',
            label:'已收货'
            },],
        }
    },
    methods:{
        init(page){
            let data=this.$qs.stringify({
                page:page,
                page_size:10,
            });
            this.data(data);
        },
        data(data){
            Maori(data).then(res=>{
                console.log(res.data.orders);
                this.record_count=Number(res.data.filter.record_count);
                for(let i=0;i<res.data.orders.length;i++){
                    let reg = new RegExp( /^￥/ , "g" );
                    res.data.orders[i].jinhuo_money=res.data.orders[i].jinhuo_money.replace(reg,"");
                    res.data.orders[i].fh_shop_price=res.data.orders[i].fh_shop_price.replace(reg,"");
                    res.data.orders[i].fh_chengben_price=res.data.orders[i].fh_chengben_price.replace(reg,"");
                    res.data.orders[i].fh_gross_profit=res.data.orders[i].fh_gross_profit.replace(reg,"");
                    res.data.orders[i].sh_shop_price=res.data.orders[i].sh_shop_price.replace(reg,"");
                    res.data.orders[i].sh_chengben_price=res.data.orders[i].sh_chengben_price.replace(reg,"");
                    res.data.orders[i].sh_gross_profit=res.data.orders[i].sh_gross_profit.replace(reg,"");
                }
                this.MaoriData=res.data.orders;
            });
        }, 
        chose(){
            let data=this.$qs.stringify({
                page:1,
                page_size:10,
                from_subshop_id:this.value4,
                to_subshop_id:this.value5,
                serial_code:this.search5,
                product_sn:this.search2,
                goods_name:this.search4,
                cat_id:this.value8,
                brand_id:this.value2,
                cat_name:this.search1,
                brand_name:this.search7,
                supplier_id:this.search8,
            });
            this.data(data);
        }, 
        handleClose(done){
            done();
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            erpTableSetting.maori=this.maorishow;
            localStorage.erpTableSetting=JSON.stringify(erpTableSetting);
        },     
        reset() {
            this.reload();
        },
        handleCurrentChange(val) {
            this.init(val);          
        },
        showDetails(row){//--------------详情
            let dataD = this.$qs.stringify({
                id:row.id
            });
            MaoriDe(dataD).then(res=>{
                console.log(res.data);
                this.formServeDetail=res.data;
            }); 
        },
        edit(row){//--------------修改
            let dataE=this.$qs.stringify(row);
            MaoriEd(dataE).then(res=>{
                console.log(res.errno);
                if(res.errno==0){
                    this.$message({
                        type: "success",
                        message: res.errmsg,
                        duration: 1000
                    });
                    //this.init(1);
                }else{
                    this.$message({
                        type: "error",
                        message: res.errmsg,
                        duration: 1000
                    });
                    this.init(1);
                }
            })
        },
        add(){//--------------添加
            let dataA=this.$qs.stringify(this.formServeAdd);
            MaoriAdd(dataA).then(res=>{
                if(res.errno==0){
                    this.$alert(res.errmsg)
                    this.reload();
                }else{
                    this.$alert(res.errmsg)
                }
            })
        },
        deleteRow(row) {//--------------删除
            let Message=confirm("确定删除此行数据？");
            if(Message){
                let data=this.$qs.stringify({
                    id:row.id,
                    is_delete:1
                }); 
                MaoriEd(data).then(res=>{
                    if(res.errno==0){
                        this.$alert("删除成功")
                        this.reload();
                    }else{
                        this.$alert("删除失败")
                    }
                });   
            }else{
                alert("用户取消操作");
            }
        }
    },
    created: function () {  
        if(localStorage.erpTableSetting!==undefined){
            console.log("yes");
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting); 
            if(erpTableSetting.maori!==undefined){
                this.maorishow=erpTableSetting.maori;
            }
        }else{
            console.log("no");
        }; 
        this.init(1); 
    }
}
</script>
<style scoped>
.allocatingMaori{
    margin: 10px;
}
/* 头部面包屑 */
.main-header {
  padding: 10px;
  background: #fff;
}
.main-header .el-breadcrumb {
  margin: 8px 0 0 10px;
}
/* 搜索操作 */
.main-table .el-form {
  padding-top: 10px;
  text-align: center;
}
.el-form .el-form-item {
  margin-bottom: 10px;
}

.el-form .el-form-item .el-input {
  width: 80%;
}
.el-input >>> .el-input__inner{
    border:none;
    text-align:center;
}
/* 分页器 */
.el-pagination {
  padding: 20px 0;
  text-align: right;
}

/* 新增弹出框 & 详情弹出框*/
.main-table>>>.el-dialog__body {
  padding: 0 20px;
}
.el-dialog__body .el-form {
  text-align: right;
}
.el-row{
    background:#F3F3F3;
    width:100%;
}
</style>