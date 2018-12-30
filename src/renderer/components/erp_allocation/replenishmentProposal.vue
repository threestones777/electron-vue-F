<template>
    <div class="replenishmentProposal">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>调拨</el-breadcrumb-item>
                <el-breadcrumb-item>补货建议</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <fieldset style="margin:10px 0;border-color:#fff;text-align:left">
                <legend>查询条件</legend>
                <el-row type="flex" justify="space-around" :gutter="10">
                    <el-col style="text-align:left" :span="6">
                        <el-date-picker
                        v-model="search3" size="small"
                        style="width:100%;margin-top:0px"
                        type="daterange" @change="chose"
                        align="right"
                        unlink-panels
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </el-col>
                    <el-col :span="4">
                        <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search"  size="mini"  placeholder="商品货号"/>
                        <!-- <el-input  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search1"  size="mini"  placeholder="商品名称"/> -->
                        <el-input @input="chose" prefix-icon="el-icon-search" style="width:100%;margin-bottom:0px;" v-model="search2"  size="mini"  placeholder="条码"/>
                    </el-col>
                    <el-col :span="4">
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search4"  size="mini"  placeholder="品牌"/>
                        <el-input @input="chose"  prefix-icon="el-icon-search" style="width:100%;margin-bottom:5px;" v-model="search5"  size="mini"  placeholder="类别"/>
                        <el-input @input="chose" prefix-icon="el-icon-search" style="width:100%;margin-bottom:0px;" v-model="search6"  size="mini"  placeholder="供应商"/>
                    </el-col>
                    <el-col :span="4">
                        <el-select @change="chose" v-model="value" size="small" placeholder="分公司" style="margin-bottom:5px;">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select @change="chose" v-model="value1" size="small" placeholder="销售门店">
                            <el-option
                            v-for="item in options1"
                            :key="item.value1"
                            :label="item.label"
                            :value="item.value1">
                            </el-option>
                        </el-select>
                        <el-select @change="chose" v-model="value4" size="small" placeholder="分店类型">
                            <el-option
                            v-for="item in options4"
                            :key="item.value4"
                            :label="item.label"
                            :value="item.value4">
                            </el-option>
                        </el-select> 
                    </el-col>
                    <el-col :span="4"></el-col>
                    <el-col :span="3">
                        <el-button type="primary" size="small" @click="reset">刷 新</el-button><br>
                        <el-button icon="el-icon-tickets"  style="margin-top:5px" type="primary" size="small" @click="dialogShow=true">显示列</el-button>
                    </el-col>
                    <el-col :span="5"></el-col>
                </el-row>				
			</fieldset>
            <!-- 按需选择列弹窗 -->
            <el-dialog
            title="按需选择列" class="chose" style="text-align:left"
            :visible.sync="dialogShow"
            :before-close="handleClose"
            width="200px">
                <el-checkbox v-model="replenishmentProposalshow.show1">补货量建议id</el-checkbox><br>
                <el-checkbox v-model="replenishmentProposalshow.show2">分店名称</el-checkbox><br>
                <el-checkbox v-model="replenishmentProposalshow.show3">条码</el-checkbox><br>
                <el-checkbox v-model="replenishmentProposalshow.show4">添加日期</el-checkbox><br>
                <el-checkbox v-model="replenishmentProposalshow.show5">货号</el-checkbox><br>
                <el-checkbox v-model="replenishmentProposalshow.show6">品牌id</el-checkbox><br>
                <el-checkbox v-model="replenishmentProposalshow.show7">分类</el-checkbox><br>
                <el-checkbox v-model="replenishmentProposalshow.show8">供应商id</el-checkbox><br>
                <el-checkbox v-model="replenishmentProposalshow.show9">供货商名称</el-checkbox><br>
                <el-checkbox v-model="replenishmentProposalshow.show10">送货周期</el-checkbox><br>
                <el-checkbox v-model="replenishmentProposalshow.show11">进货规格</el-checkbox><br>
                <el-checkbox v-model="replenishmentProposalshow.show12">单位</el-checkbox><br>
                <el-checkbox v-model="replenishmentProposalshow.show13">规格</el-checkbox><br>
                <el-checkbox v-model="replenishmentProposalshow.show14">成本价</el-checkbox><br>
                <el-checkbox v-model="replenishmentProposalshow.show15">总金额</el-checkbox><br>
                <el-checkbox v-model="replenishmentProposalshow.show16">本周销量</el-checkbox><br>
                <el-checkbox v-model="replenishmentProposalshow.show17">上周销量</el-checkbox><br>
                <el-checkbox v-model="replenishmentProposalshow.show18">第三周销量</el-checkbox><br>
                <el-checkbox v-model="replenishmentProposalshow.show19">可销量</el-checkbox><br>
                <el-checkbox v-model="replenishmentProposalshow.show20">第四周销量</el-checkbox><br>
                <el-checkbox v-model="replenishmentProposalshow.show21">本月销量</el-checkbox><br>
                <el-checkbox v-model="replenishmentProposalshow.show22">上月销量</el-checkbox><br>
                <el-checkbox v-model="replenishmentProposalshow.show23">上上月销量</el-checkbox><br>
                <el-checkbox v-model="replenishmentProposalshow.show24">最小安全库存</el-checkbox><br>
                <el-checkbox v-model="replenishmentProposalshow.show25">最大安全库存</el-checkbox><br>
                <el-checkbox v-model="replenishmentProposalshow.show26">可销天数</el-checkbox><br>
                <el-checkbox v-model="replenishmentProposalshow.show27">采购在途量</el-checkbox><br>
                <el-checkbox v-model="replenishmentProposalshow.show28">调拨在途量</el-checkbox><br>
                <el-checkbox v-model="replenishmentProposalshow.show29">建议订货量</el-checkbox><br><br>
            </el-dialog>
            <!-- 新增弹出框 -->
            <el-dialog width="700px" title="新增" :visible.sync="dialogServeAdd">
                <el-form :model="formServeAdd"  style="text-align:center">
                    <!-- <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            补货量建议id<el-input v-model="formServeAdd.id" disabled></el-input>  
                        </el-col>
                        <el-col :span="7">
                            分店id<el-input v-model="formServeAdd.subshop_id" disabled></el-input>
                        </el-col>
                        <el-col :span="7">
                            站id<el-input v-model="formServeAdd.subsite_id" disabled></el-input>
                        </el-col>
                    </el-row>  -->
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            分店名称<el-input v-model="formServeAdd.subshop_name"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            条码<el-input v-model="formServeAdd.serial_code"></el-input>
                        </el-col>
                        <el-col :span="7">
                            商品名称<el-input v-model="formServeAdd.goods_name"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            货号<el-input v-model="formServeAdd.product_sn"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            品牌id<el-input v-model="formServeAdd.brand_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            分类 <el-input v-model="formServeAdd.cat_id"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            供应商id<el-input v-model="formServeAdd.supplier_id"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            供货商名称<el-input v-model="formServeAdd.supplier_name"></el-input>
                        </el-col>
                        <el-col :span="7">
                            送货周期<el-input v-model="formServeAdd.delivery_cycle"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            进货规格 <el-input v-model="formServeAdd.jinhuo_attr"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            单位<el-input v-model="formServeAdd.unit"></el-input>
                        </el-col>
                        <el-col :span="7">
                            规格<el-input v-model="formServeAdd.attr_value"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            成本价<el-input v-model="formServeAdd.chengben_price"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            总金额<el-input v-model="formServeAdd.total_money"></el-input>
                        </el-col>
                        <el-col :span="7">
                            本周销量<el-input v-model="formServeAdd.this_week_sale"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            上周销量<el-input v-model="formServeAdd.last_week_sale"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            第三周销量<el-input v-model="formServeAdd.third_week_sale"></el-input>
                        </el-col>
                        <el-col :span="7">
                            可销量<el-input v-model="formServeAdd.marketable_num"></el-input>  
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                             第四周销量<el-input v-model="formServeAdd.fourth_week_sale"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            本月销量<el-input v-model="formServeAdd.this_month_sale"></el-input>
                        </el-col>
                        <el-col :span="7">
                            上月销量<el-input v-model="formServeAdd.last_month_sale"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                             上上月销量<el-input v-model="formServeAdd.third_month_sale"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            最小安全库存<el-input v-model="formServeAdd.min_safe_kucun"></el-input>
                        </el-col>
                        <el-col :span="7">
                            最大安全库存<el-input v-model="formServeAdd.max_safe_kucun"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                             可销天数 <el-input v-model="formServeAdd.marketable_days"></el-input>  
                        </el-col>
                        <el-col :span="7">
                            采购在途量<el-input v-model="formServeAdd.purchase_on_way"></el-input>
                        </el-col>
                        <el-col :span="7">
                            调拨在途量<el-input v-model="formServeAdd.move_on_way"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            建议订货量<el-input v-model="formServeAdd.suggest_dh_num"></el-input>
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
                            补货量建议id<el-input v-model="formServeDetail.id" disabled></el-input>  
                        </el-col>
                        <el-col :span="7">
                            分店id<el-input v-model="formServeDetail.subshop_id" disabled></el-input>
                        </el-col>
                        <el-col :span="7">
                            站id<el-input v-model="formServeDetail.subsite_id" disabled></el-input>
                        </el-col>
                    </el-row>  -->
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            分店名称<el-input v-model="formServeDetail.subshop_name"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            条码<el-input v-model="formServeDetail.serial_code"></el-input>
                        </el-col>
                        <el-col :span="7">
                            商品名称<el-input v-model="formServeDetail.goods_name"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            货号 <el-input v-model="formServeDetail.product_sn"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            品牌id<el-input v-model="formServeDetail.brand_id"></el-input>
                        </el-col>
                        <el-col :span="7">
                            分类 <el-input v-model="formServeDetail.cat_id"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            供应商id<el-input v-model="formServeDetail.supplier_id"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            供货商名称<el-input v-model="formServeDetail.supplier_name"></el-input>
                        </el-col>
                        <el-col :span="7">
                            送货周期<el-input v-model="formServeDetail.delivery_cycle"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            进货规格 <el-input v-model="formServeDetail.jinhuo_attr"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            单位<el-input v-model="formServeDetail.unit"></el-input>
                        </el-col>
                        <el-col :span="7">
                            规格<el-input v-model="formServeDetail.attr_value"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            成本价<el-input v-model="formServeDetail.chengben_price"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            总金额<el-input v-model="formServeDetail.total_money"></el-input>
                        </el-col>
                        <el-col :span="7">
                            本周销量<el-input v-model="formServeDetail.this_week_sale"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            上周销量<el-input v-model="formServeDetail.last_week_sale"></el-input>    
                        </el-col>
                        <el-col :span="7">
                            第三周销量<el-input v-model="formServeDetail.third_week_sale"></el-input>
                        </el-col>
                        <el-col :span="7">
                            可销量<el-input v-model="formServeDetail.marketable_num"></el-input>  
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                             第四周销量<el-input v-model="formServeDetail.fourth_week_sale"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            本月销量<el-input v-model="formServeDetail.this_month_sale"></el-input>
                        </el-col>
                        <el-col :span="7">
                            上月销量<el-input v-model="formServeDetail.last_month_sale"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                             上上月销量<el-input v-model="formServeDetail.third_month_sale"></el-input>   
                        </el-col>
                        <el-col :span="7">
                            最小安全库存<el-input v-model="formServeDetail.min_safe_kucun"></el-input>
                        </el-col>
                        <el-col :span="7">
                            最大安全库存<el-input v-model="formServeDetail.max_safe_kucun"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                             可销天数 <el-input v-model="formServeDetail.marketable_days"></el-input>  
                        </el-col>
                        <el-col :span="7">
                            <el-input v-model="formServeDetail.purchase_on_way"></el-input>
                        </el-col>
                        <el-col :span="7">
                            调拨在途量<el-input v-model="formServeDetail.move_on_way"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="7">
                            建议订货量<el-input v-model="formServeDetail.suggest_dh_num"></el-input>
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
            :data="ProposalData.filter(data =>  {
            return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1})})"
            border
            show-summary
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            style="width:100%">
                <el-table-column
                prop="id"
                align="center"
                v-if="replenishmentProposalshow.show1"
                label="补货量建议id">
                </el-table-column>
                <el-table-column
                align="center"
                v-if="replenishmentProposalshow.show2"
                label="分店名称">
                    <template slot-scope="scope">
                        <input v-model="scope.row.subshop_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="replenishmentProposalshow.show3"
                label="条码">
                    <template slot-scope="scope">
                        <input v-model="scope.row.serial_code"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="replenishmentProposalshow.show4"
                label="添加日期">
                    <template slot-scope="scope">
                        <input v-model="scope.row.add_time"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="replenishmentProposalshow.show5"
                label="货号">
                    <template slot-scope="scope">
                        <input v-model="scope.row.product_sn"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="replenishmentProposalshow.show6"
                label="品牌id">
                    <template slot-scope="scope">
                        <input v-model="scope.row.brand_id"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="replenishmentProposalshow.show7"
                label="分类">
                    <template slot-scope="scope">
                        <input v-model="scope.row.cat_id"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="replenishmentProposalshow.show8"
                label="供应商id">
                    <template slot-scope="scope">
                        <input v-model="scope.row.supplier_id"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="replenishmentProposalshow.show9"
                label="供货商名称">
                    <template slot-scope="scope">
                        <input v-model="scope.row.supplier_name"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="replenishmentProposalshow.show10"
                label="送货周期">
                    <template slot-scope="scope">
                        <input v-model="scope.row.delivery_cycle"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="replenishmentProposalshow.show11"
                label="进货规格">
                    <template slot-scope="scope">
                        <input v-model="scope.row.jinhuo_attr"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="replenishmentProposalshow.show12"
                label="单位">
                    <template slot-scope="scope">
                        <input v-model="scope.row.unit"/>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                v-if="replenishmentProposalshow.show13"
                label="规格">
                    <template slot-scope="scope">
                        <input v-model="scope.row.attr_value"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="chengben_price"
                align="center"
                v-if="replenishmentProposalshow.show14"
                label="成本价">
                    <template slot-scope="scope">
                        <input v-model="scope.row.chengben_price"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="total_money"
                align="center"
                v-if="replenishmentProposalshow.show15"
                label="总金额">
                    <template slot-scope="scope">
                        <input v-model="scope.row.total_money"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="this_week_sale"
                align="center"
                v-if="replenishmentProposalshow.show16"
                label="本周销量">
                    <template slot-scope="scope">
                        <input v-model="scope.row.this_week_sale"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="last_week_sale"
                align="center"
                v-if="replenishmentProposalshow.show17"
                label="上周销量">
                    <template slot-scope="scope">
                        <input v-model="scope.row.last_week_sale"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="third_week_sale"
                align="center"
                v-if="replenishmentProposalshow.show18"
                label="第三周销量">
                    <template slot-scope="scope">
                        <input v-model="scope.row.third_week_sale"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="marketable_num"
                align="center"
                v-if="replenishmentProposalshow.show19"
                label="可销量">
                    <template slot-scope="scope">
                        <input v-model="scope.row.marketable_num"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="fourth_week_sale"
                align="center"
                v-if="replenishmentProposalshow.show20"
                label="第四周销量">
                    <template slot-scope="scope">
                        <input v-model="scope.row.fourth_week_sale"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="this_month_sale"
                align="center"
                v-if="replenishmentProposalshow.show21"
                label="本月销量">
                    <template slot-scope="scope">
                        <input v-model="scope.row.this_month_sale"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="last_month_sale"
                align="center"
                v-if="replenishmentProposalshow.show22"
                label="上月销量">
                    <template slot-scope="scope">
                        <input v-model="scope.row.last_month_sale"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="third_month_sale"
                align="center"
                v-if="replenishmentProposalshow.show23"
                label="上上月销量">
                    <template slot-scope="scope">
                        <input v-model="scope.row.third_month_sale"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="min_safe_kucun"
                align="center"
                v-if="replenishmentProposalshow.show24"
                label="最小安全库存">
                    <template slot-scope="scope">
                        <input v-model="scope.row.min_safe_kucun"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="max_safe_kucun"
                align="center"
                v-if="replenishmentProposalshow.show25"
                label="最大安全库存">
                    <template slot-scope="scope">
                        <input v-model="scope.row.max_safe_kucun"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="marketable_days"
                align="center"
                v-if="replenishmentProposalshow.show26"
                label="可销天数">
                    <template slot-scope="scope">
                        <input v-model="scope.row.marketable_days"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="purchase_on_way"
                align="center"
                v-if="replenishmentProposalshow.show27"
                label="采购在途量">
                    <template slot-scope="scope">
                        <input v-model="scope.row.purchase_on_way"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="move_on_way"
                align="center"
                v-if="replenishmentProposalshow.show28"
                label="调拨在途量">
                    <template slot-scope="scope">
                        <input v-model="scope.row.move_on_way"/>
                    </template>
                </el-table-column>
                <el-table-column
                prop="suggest_dh_num"
                align="center"
                v-if="replenishmentProposalshow.show29"
                label="建议订货量">
                    <template slot-scope="scope">
                        <input v-model="scope.row.suggest_dh_num"/>
                    </template>
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
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
import {Proposal,ProposalDe,ProposalEd,ProposalAdd} from '../../api/apiW' ;
export default {
    inject: ['reload'],
    data() {
        return {
            pages:1,
            dialogServeAdd:false,
            dialogServeDetail:false,
            dialogShow:false,
            record_count:0,
            replenishmentProposalshow:{
                show1:false,
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
                show26:true,
                show27:true,
                show28:true,
                show29:true,
            },
            search:'',
            search1:'',
            search2:'',
            search3:['2017-7-7','2019-9-9'],
            search4:'',
            search5:'',
            search6:'',
            formServeAdd:{
                goods_id:0,
                brand_id:0,
                cat_id:0,
                supplier_id:0,
                unit:0,
                chengben_price:0,
                total_money:0,
                this_week_sale:0,
                last_week_sale:0,
                third_week_sale:0,
                fourth_week_sale:0,
                this_month_sale:0,
                last_month_sale:0,
                third_month_sale:0,
                min_safe_kucun:0,
                max_safe_kucun:0,
                marketable_days:0,
                purchase_on_way:0,
                move_on_way:0,
                marketable_num:0,
                suggest_dh_num:0, 
            },
            formServeDetail:{},
            ProposalData:[],
            radio:3,
            value: '' ,
            value1: '' ,
            value3: '' ,
            value4: '' ,
            value5: '' ,
            value6: '' ,
            value7: '' ,
            options: [{
            value: '0',
            label: '公司1'
            }, {
            value: '1',
            label: '公司2'
            },],  
            options1: [{
            value1: '0',
            label: '门店1'
            }, {
            value1: '1',
            label: '门店2'
            },],
            options4: [{
            value4: '0',
            label: '类型1'
            }, {
            value4: '1',
            label: '类型2'
            },],
        }
    },
    methods:{
        init(page){//-----------------初始化数据
            let data=this.$qs.stringify({
                page:page,
                page_size:10,
            }); 
            this.data(data);  
        },
        data(data){
            Proposal(data).then(res=>{
                for(let i=0;i<res.data.orders.length;i++){
                    let reg = new RegExp( /^￥/ , "g" );
                    res.data.orders[i].chengben_price=res.data.orders[i].chengben_price.replace(reg,"");
                    res.data.orders[i].total_money=res.data.orders[i].total_money.replace(reg,"");
                };
                this.record_count=Number(res.data.filter.record_count);
                this.ProposalData=res.data.orders;
            });
        },
        chose(){//----------------选择查询
            let data=this.$qs.stringify({
                page:1,
                page_size:10,
                addtime1:this.search3[0],
                addtime2:this.search3[1],
                serial_code:this.search2,
                brand_name:this.search4,
                cat_name:this.search5,
                supplier_name:this.search6,
                son_company:this.value,
                subshop_id:this.value1,
                subshop_type:this.value4,
            }); 
            this.data(data); 
        },
        handleClose(done){
            done();
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            erpTableSetting.replenishmentProposal=this.replenishmentProposalshow;
            localStorage.erpTableSetting=JSON.stringify(erpTableSetting);
        }, 
        reset() {
            this.reload();
        },
        handleCurrentChange(val) {
            this.init(val);          
        },
        showDetails(row){//--------------详情
            console.log(row.id);
            let dataD = this.$qs.stringify({
                id:row.id
            });
            ProposalDe(dataD).then(res=>{
                if(res.errno==0){
                    console.log(res.data);
                    this.formServeDetail=res.data;
                }else{
                    this.dialogServeDetail=false;
                    alert("您查找的用户不存在");
                }
            });
        },
        edit(row){//--------------修改
            /* row.chengben_price=row.chengben_price.slice(1);
            row.total_money=row.total_money.slice(1); */
            let dataE=this.$qs.stringify(row);
            ProposalEd(dataE).then(res=>{
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
            ProposalAdd(dataA).then(res=>{
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
            })
        },
        deleteRow(row) {//--------------删除
            let Message=confirm("确定删除此行数据？");
            if(Message){
                let data=this.$qs.stringify({
                    id:row.id,
                    is_delete:1
                }); 
                ProposalEd(data).then(res=>{
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
            if(erpTableSetting.replenishmentProposal!==undefined){
                this.replenishmentProposalshow=erpTableSetting.replenishmentProposal;
            }
        }else{
            console.log("no");
        };   
        this.init(1);    
    }
}
</script>
<style scoped>
.replenishmentProposal{
    margin: 20px;
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
/* 分页器 */
.el-pagination {
  padding: 20px 0;
  text-align: right;
}
.el-table input{
    width:100%;
    height:34px;
    border:1px solid #DCDFE6;
    border-radius:4px;
    padding:2px;
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