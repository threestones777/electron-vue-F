<template>
    <div class="goodsManage">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <!-- <h3>温州美联 管理中心</h3> -->
            <el-breadcrumb style="font-size:18px" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>商品</el-breadcrumb-item>
                <el-breadcrumb-item id="title">商品管理</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="operate-in">
                <!-- <div>
                <i class="el-icon-circle-plus"></i>
                <div>增加</div>
                </div>
                <div>
                <i class="el-icon-edit"></i>
                <div>编辑</div>
                </div>
                <div>
                <i class="el-icon-remove"></i>
                <div>删除</div>
                </div>
                <div>
                <i class="el-icon-circle-check"></i>
                <div>保存</div>
                </div>
                <div>
                <i class="el-icon-circle-close"></i>
                <div>取消</div>
                </div>
                <div>
                <i class="el-icon-view"></i>
                <div>审核</div>
                </div> 
                <div class="card">
                <i class="el-icon-search"></i>
                <div>查询</div>
                </div>
                <div class="card">
                <i class="el-icon-setting"></i>
                <div>功能</div>
                <b class="el-icon-caret-bottom"></b>
                </div>
                <div class="card">
                <i class="el-icon-printer"></i>
                <div>打印</div>
                <b class="el-icon-caret-bottom"></b>
                </div>
                <div class="card">
                <i class="el-icon-menu"></i>
                <div>设置</div>
                </div>
                <div class="card">
                <i class="el-icon-zoom-in"></i>
                <div>高级查询</div>
                </div>
                <div class="card">
                <el-dropdown trigger="click" placement="bottom" @command="handleExport">
                    <div class="card-title">
                    <i class="el-icon-download"></i>
                    <div>导入/导出</div>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="in">导入</el-dropdown-item>
                    <el-dropdown-item command="xlsx-out">导出为excel</el-dropdown-item>
                    <el-dropdown-item command="csv-out">导出为csv</el-dropdown-item>
                    <el-dropdown-item command="txt-out">导出为txt</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <b class="el-icon-caret-bottom"></b>
                </div>-->
                <div @click="reset" class="card">
                    <i class="el-icon-loading"></i>
                    <div>刷新</div>
                </div>
                <div @click="dialogShow=true" class="card">
                    <i class="el-icon-tickets"></i>
                    <div>显示列</div>
                </div>
                <div @click="()=>{dialogGoodsAdd = true;activeName='first'}" class="card">
                    <i class="el-icon-plus"></i>
                    <div>新增</div>
                </div>
                <div @click="dialogExport=true" class="card">
                    <i class="el-icon-download"></i>
                    <div>导出</div>
                </div>
            </div>
        </div>
        <div class="main-table">
            <!-- 搜索 -->
            <el-form :inline="true" :model="formGoods" class="demo-form-inline">
                <!-- <el-form-item label="商品名">
                    <el-input size="small" v-model="formGoods.keyword" placeholder="商品名/支持模糊搜索"></el-input>
                </el-form-item> -->
                <!-- <el-form-item label="品牌">
                    <el-popover
                    ref="popover2"
                    placement="top"
                    width="450"
                    trigger="focus"
                    v-model="visible2">
                        <el-table
                        :data="brandData"
                        border
                        highlight-current-row
                        @current-change="handleCurrentChange3"
                        v-loading='loading2'
                        :row-style="{height:0}"  
                        :cell-style="{padding:0}"
                        :header-row-style="{height:0}"  
                        :header-cell-style="{padding:0}"
                        >
                            <el-table-column property="brand_name" align="center" label="品牌名"></el-table-column>
                            <el-table-column property="brand_desc" align="center" label="品牌描述"></el-table-column>
                        </el-table>
                        <el-pagination
                            @current-change="handleCurrentChange2"
                            layout="total,prev, pager, next,jumper"
                            :page_size="page_size2"
                            :total="total2">
                        </el-pagination>
                        <el-button @click="setBrandId" type="primary" style="width:100%" size="mini">确认</el-button>
                    </el-popover>
                    <el-input disabled size="small" v-popover:popover2 v-model="formGoods.brand_name" placeholder="点击选择品牌"></el-input>
                </el-form-item>
                <el-form-item label="分类">
                    <el-popover
                    ref="popover"
                    placement="top"
                    width="160"
                    trigger="focus"
                    v-model="visible">
                        <el-tree highlight-current accordion :data="dataTree" :props="defaultProps" @current-change="handleNodeClick"></el-tree>
                        <el-button :disabled="flag" @click="setCatId" type="primary" style="width:100%" size="mini">确认</el-button>
                    </el-popover>
                    <el-input size="small" disabled v-popover:popover v-model="formGoods.cat_name" placeholder="点击选择分类"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <el-input placeholder="请输入商品名称/编号" @input="search" v-model="keywords" style="width:70%;margin-right:10px" size="small">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                    <!-- <el-button type="primary" size="small" @click="dialogGoodsAdd = true">新增</el-button> -->
                    <!-- <el-button type="primary" size="small">导入</el-button> -->
                    <!-- <el-button type="primary" @click="toExcel" size="small">导出</el-button> -->
                    <!-- <el-button type="primary" size="small" @click="reset">刷新</el-button>
                    <el-button type="primary" size="small" @click="dialogShow=true">显示列</el-button> -->
                </el-form-item>
            </el-form>
            <!-- 导出选择弹窗 -->
            <el-dialog
            title="导出选择" class="chose" style="text-align:left"
            :visible.sync="dialogExport"
            :before-close="handleClose"
            width="300px">
                <el-radio-group v-model="exportPages">
                    <el-radio :label="page_size">当前页</el-radio>
                    <el-radio :label="total">全部</el-radio>
                </el-radio-group>
                <span slot="footer" class="dialog-footer">
                    <el-button size="small" @click="dialogExport = false">取 消</el-button>
                    <el-button size="small" type="primary" @click="toExcel(),dialogExport = false">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 按需选择列弹窗 -->
            <el-dialog
            title="按需选择列" class="chose" style="text-align:left"
            :visible.sync="dialogShow"
            :before-close="handleClose"
            width="200px">
                <el-checkbox v-model="goodsManageshow.show1">商品名称</el-checkbox><br>
                <el-checkbox v-model="goodsManageshow.show2">商品编号</el-checkbox><br>
                <el-checkbox v-model="goodsManageshow.show3">商品分类</el-checkbox><br>
                <el-checkbox v-model="goodsManageshow.show4">商品品牌</el-checkbox><br>
                <el-checkbox v-model="goodsManageshow.show5">成本价</el-checkbox><br>
                <el-checkbox v-model="goodsManageshow.show6">本店售价</el-checkbox><br>
                <el-checkbox v-model="goodsManageshow.show7">条形码</el-checkbox><br>
                <el-checkbox v-model="goodsManageshow.show8">预警数量</el-checkbox><br>
                <el-checkbox v-model="goodsManageshow.show9">库存</el-checkbox><br>
                <el-checkbox v-model="goodsManageshow.show10">赠送积分</el-checkbox><br><br>
            </el-dialog>
            <!-- 新增商品弹出框 -->
            <el-dialog width="900px" title="商品管理新增" :visible.sync="dialogGoodsAdd">
                  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="基础信息" name="first">
                        <el-form label-position="right" :model="formGoodsAdd" :inline="true" class="demo-form-inline">
                            <el-row>
                                <el-col :span="6">
                                    <el-form-item label="商品名称">
                                        <el-input v-model="formGoodsAdd.goods_name" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="商品分类">
                                        <el-select v-model="formGoodsAdd.cat_id" placeholder="请选择">
                                        <el-option label="选项一" value="shanghai"></el-option>
                                        <el-option label="选项二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="规格型号">
                                        <el-input v-model="formGoodsAdd.name" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="商品编码">
                                        <el-input v-model="formGoodsAdd.goods_sn" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6">
                                    <el-form-item label="条形码">
                                        <el-input v-model="formGoodsAdd.txm" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="商品货位">
                                        <el-input v-model="formGoodsAdd.name" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="商品品牌">
                                        <el-select v-model="formGoodsAdd.brand_id" placeholder="请选择">
                                        <el-option label="品牌一" value="shanghai"></el-option>
                                        <el-option label="品牌二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="默认仓库">
                                        <el-select v-model="formGoodsAdd.name" placeholder="请选择">
                                        <el-option label="仓库一" value="shanghai"></el-option>
                                        <el-option label="仓库二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6">
                                    <el-form-item label="商品单位">
                                        <el-select v-model="formGoodsAdd.name" placeholder="请选择">
                                        <el-option label="单价一" value="shanghai"></el-option>
                                        <el-option label="单价二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="购货价格">
                                        <el-input v-model="formGoodsAdd.name" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="销货价格">
                                        <el-input v-model="formGoodsAdd.name" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                 <el-col :span="6">
                                    <el-form-item label="零售价格">
                                        <el-input v-model="formGoodsAdd.name" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6">
                                    <el-form-item label="库存预警">
                                        <el-input v-model="formGoodsAdd.name" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="赠送积分">
                                        <el-input v-model="formGoodsAdd.name" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="备注信息">
                                        <el-input v-model="formGoodsAdd.name" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="串码商品">
                                        <el-select v-model="formGoodsAdd.name" placeholder="请选择">
                                        <el-option label="是" value="0"></el-option>
                                        <el-option label="否" value="1"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="辅助属性" name="second">配置管理</el-tab-pane>
                    <el-tab-pane label="图文详情" name="third">
                        <editer></editer>
                    </el-tab-pane>
                </el-tabs>
                
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogGoodsAdd = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="add(),dialogGoodsAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 商品详情弹出框 -->
            <el-dialog width="900px" title="商品详情" :visible.sync="dialogGoodsDetail">
                  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <!-- <el-tab-pane label="基础信息" name="first">
                        <el-form label-position="right" :model="formGoodsDetail" :inline="true" class="demo-form-inline">
                            <el-row>
                                <el-col :span="6">
                                    <el-form-item label="商品名称">
                                        <el-input v-model="formGoodsDetail.goods_name" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="库存预警">
                                        <el-input v-model="formGoodsDetail.warn_number" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="规格型号">
                                        <el-input v-model="formGoodsDetail.attr_value" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="商品编码">
                                        <el-input v-model="formGoodsDetail.goods_sn" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6">
                                    <el-form-item label="条形码">
                                        <el-input v-model="formGoodsDetail.txm" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="库存">
                                        <el-input v-model="formGoodsDetail.goods_number" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="商品品牌">
                                        <el-input v-model="formGoodsDetail.brand_name" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="默认仓库">
                                        <el-input v-model="formGoodsDetail.store_name" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6">
                                    <el-form-item label="商品单价">
                                        <el-input v-model="formGoodsDetail.shop_price" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="购货价格">
                                        <el-input v-model="formGoodsDetail.chengben_price" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="销货价格">
                                        <el-input v-model="formGoodsDetail.shop_price" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                 <el-col :span="6">
                                    <el-form-item label="零售价格">
                                        <el-input v-model="formGoodsDetail.shop_price" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="辅助属性" name="second">
                        <el-table
                        border
                        :data="attrData">
                        <el-table-column
                            prop="goods_attr_id"
                            align="center"
                            label="商品属性id">
                        </el-table-column>
                        <el-table-column
                            prop="attr_id"
                            align="center"
                            label="属性id">
                        </el-table-column>
                        <el-table-column
                            prop="attr_value"
                            align="center"
                            label="属性值">
                        </el-table-column>
                        </el-table>
                    </el-tab-pane> -->
                    <el-tab-pane style="overflow:auto;height:50vh" label="图文详情" name="third">
                        <div v-html="goods_desc"></div>
                    </el-tab-pane>
                </el-tabs><br><br>
                <!-- <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogGoodsDetail = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="edit(),dialogGoodsDetail = false">保存修改</el-button>
                </div> -->
            </el-dialog>
            <!-- 商品管理表格 -->
            <el-table
            :data="goodsData"
            border stripe
            show-summary
            v-loading="loading"
            id="goodsManage"
            :row-style="{height:0}"  
            :cell-style="{padding:7}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            tooltip-placement="right"
            style="width: 100%">
                <el-table-column 
                show-overflow-tooltip 
                prop="goods_name" 
                align="center" 
                v-if="goodsManageshow.show1"
                label="商品名称">
                </el-table-column>
                <el-table-column 
                align="center" 
                v-if="goodsManageshow.show2"
                label="商品编号">
                    <template slot-scope="scope">
                        <el-input v-if="hide" v-model="scope.row.goods_sn" />
                        <span v-if="show">{{scope.row.goods_sn}}</span>
                    </template>
                </el-table-column>
                <el-table-column 
                prop="cat_name" 
                align="center" 
                v-if="goodsManageshow.show3"
                label="商品分类">
                    <template slot-scope="scope">
                        <span>{{scope.row.cat_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column 
                show-overflow-tooltip
                prop="brand_name" 
                align="center" 
                v-if="goodsManageshow.show4"
                label="商品品牌">
                    <template slot-scope="scope">
                        <span>{{scope.row.brand_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column 
                prop="chengben_price" 
                align="center" 
                v-if="goodsManageshow.show5"
                label="成本价">
                    <template slot-scope="scope">
                        <el-input v-if="hide" v-model="scope.row.chengben_price"/>
                        <span v-if="show">{{scope.row.chengben_price}}</span>
                    </template>
                </el-table-column>
                <el-table-column 
                prop="shop_price" 
                align="center" 
                v-if="goodsManageshow.show6"
                label="本店售价" >
                    <template slot-scope="scope">
                        <el-input v-if="hide" v-model="scope.row.shop_price" />
                        <span v-if="show">{{scope.row.shop_price}}</span>
                    </template>
                </el-table-column>
                <el-table-column 
                align="center" 
                v-if="goodsManageshow.show7"
                label="条形码">
                    <template slot-scope="scope">
                        <el-input v-if="hide" v-model="scope.row.txm" />
                        <span v-if="show">{{scope.row.txm}}</span>
                    </template>
                </el-table-column>
                <el-table-column 
                prop="warn_number" 
                align="center" 
                v-if="goodsManageshow.show8"
                label="预警数量">
                    <template slot-scope="scope">
                        <el-input v-if="hide" v-model="scope.row.warn_number" />
                        <span v-if="show">{{scope.row.warn_number}}</span>
                    </template>
                </el-table-column>
                <el-table-column 
                prop="goods_number" 
                align="center" 
                v-if="goodsManageshow.show9"
                label="库存">
                    <template slot-scope="scope">
                        <el-input v-if="hide" v-model="scope.row.goods_number" />
                        <span v-if="show">{{scope.row.goods_number}}</span>
                    </template>
                </el-table-column>
                <el-table-column 
                align="center" 
                v-if="goodsManageshow.show10"
                label="赠送积分">
                    <template slot-scope="scope">
                        <span>{{scope.row.integral}}</span>
                    </template>
                </el-table-column>
                <el-table-column 
                fixed="right" 
                align="center" 
                width="200"
                v-if="hide"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="edit(scope.row)">保存修改</el-button>
                        <el-button type="text" size="small" @click="goodsDetail(scope.row),dialogGoodsDetail=true">商品详情</el-button>
                        <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
                @current-change="handleCurrentChange"
                layout="total,prev, pager, next,jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import editer from '../../tools/editer'
import {getGoodsList,getGoodsDeail,getGoodsCate,getBrandList,getGoodsAdd,getGoodsEd} from '../../api/api'
import { setInterval, setTimeout } from 'timers';
export default {
    inject:['reload'],
    components:{
        editer
    },
    data() {
        return {
            page:1,
            page_size:10,
            total:0,
            loading:true,
            page2:1,
            page_size2:10,
            total2:0,
            loading2:true,
            activeName: 'first',
            visible:false,
            visible2:false,
            flag:true,
            dialogGoodsAdd:false,
            dialogGoodsDetail:false,
            dialogShow:false,
            goodsManageshow:{
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
            },
            keywords:'',
            goods_desc:'',
            attrData:[],
            formGoods:{},
            formGoodsAdd:{},
            formGoodsDetail:{},
            goodsData:[],
            selectCat:{},
            dataTree:[], // 商品分类
            brandData:[], // 品牌列表
            defaultProps:{
                children: 'son',
                label: 'cat_name'
            },
            dialogExport:false,
            exportPages:10,
            show:false,
            hide:true,
            title:'',
        }
    },
    methods:{
        handleClose(done){
            done();
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting);
            erpTableSetting.goodsManage=this.goodsManageshow;
            localStorage.erpTableSetting=JSON.stringify(erpTableSetting);
        },
        add(){//-----------新增商品
            let data=this.$qs.stringify(this.formGoodsAdd);
            getGoodsAdd(data).then(res=>{
                console.log(res);
            });
        },
        edit(row){//--------------修改
            let data =this.$qs.stringify(row)
            getGoodsEd(data).then(res=>{
                console.log(res);
                if(res.errno==0){
                    this.$message({
                        type: "success",
                        message: res.errmsg,
                        duration: 1000
                    });
                    this.initData()
                }else{
                    this.$message({
                        type: "error",
                        message: res.errmsg,
                        duration: 1000
                    });
                    this.initData()
                }
            });
        },
        del(row){
            let Message=confirm("确定删除此行商品？");
            if(Message){
                let data =this.$qs.stringify({
                    goods_id:row.goods_id,
                    is_delete:1
                });
                getGoodsEd(data).then(res=>{
                    console.log(res);
                    if(res.errno==0){
                        this.$alert(res.errmsg,{
                            callback:action=>{
                                this.initData()
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
        search() {
            getGoodsList({params:{
                page:1,
                page_size:10,
                keyword:this.keywords
            }}).then(res=>{
                console.log(res)
                if(res.errno == 0) {
                    this.goodsData = res.data.goods
                    this.total = Number(res.data.record_count)
                    this.loading = false
                }
            })
        }, 
        initData(page,page_size) { // 获取商品列表
          let data = {
              subsite_id:3,
              user_id:sessionStorage.user_id,
              page:page,
              page_size:page_size,
          }
            getGoodsList({params:data}).then(res=>{
                console.log(res)
                if(res.errno == 0) {
                    this.goodsData = res.data.goods
                    this.total = Number(res.data.record_count)
                    this.loading = false
                }
            })
        },
        getCat() {
            // 获取商品分类数据
            getGoodsCate({ paranms: { user_id: sessionStorage.user_id } }).then(
                res => {
                if (res.errno == 0) {
                    console.log(res.data)
                    this.dataTree = res.data;
                }
                }
            );
        },
        getBrand() { // 获取品牌列表
            let data = {
                subsite_id:3,
                user_id:sessionStorage.user_id,
                page:this.page2,
                page_size:this.page_size2,
            }
            getBrandList({params:data}).then(res=>{
            console.log(res)
            if(res.errno == 0) {
                this.brandData=res.data.brand
                this.total2 = Number(res.data.record_count)
                this.loading2 = false
                }
            })
        },
        goodsDetail(row) {
            getGoodsDeail({params:{goods_id:row.goods_id}}).then(res=>{
                console.log(res)
                if(res.errno == 0) {
                    this.formGoodsDetail = res.data
                    this.goods_desc = res.data.goods_desc
                    this.attrData = res.data.arrt
                }
            })
        },
        goodsSearch() {
            this.initData(this.formGoods)
        },
        reset() {
            this.reload();
        },
        toExcel() {
            this.title=document.querySelector("#title>.el-breadcrumb__inner").innerHTML;
            console.log(this.title);
            if(this.exportPages==this.total){
                let data = {
                    subsite_id:3,
                    user_id:sessionStorage.user_id,
                    page:this.page,
                    page_size:this.exportPages,
                };
                getGoodsList({params:data}).then(res=>{
                    console.log(res)
                    if(res.errno == 0) {
                        this.goodsData = res.data.goods
                        this.total = Number(res.data.record_count)
                        this.loading = false;
                        this.show=true;
                        this.hide=false;
                        setTimeout(()=>{
                            this.$exportExcel("#goodsManage",this.title);
                            this.show=false;
                            this.hide=true;
                            this.initData(this.page,this.page_size);
                        },500);
                    }
                })
            }else{
                this.show=true;
                this.hide=false;
                setTimeout(()=>{
                    this.$exportExcel("#goodsManage",this.title);
                    this.show=false;
                    this.hide=true;
                },500);
            };
        },
        handleCurrentChange(val) {
            this.page = val
            this.initData(val,this.page_size)
        },
        handleCurrentChange2(val) {
            this.page2 = val
            this.getBrand()
        },
        handleCurrentChange3(val) {
            this.selectBrand = val
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleNodeClick(val) { // 点击分类树
            this.flag = Boolean(val.son)
            if(!val.son) {
                console.log(val)
                this.selectCat = val
            }
        },
        setCatId() {
            if(this.selectCat) {
                this.formGoods.cat_name = this.selectCat.cat_name
                this.formGoods.cat_id = this.selectCat.cat_id
                this.visible = false
            }
        },
        setBrandId() {
            if(this.selectBrand) {
                this.formGoods.brand_name = this.selectBrand.brand_name
                this.formGoods.brand_id = this.selectBrand.brand_id
                this.visible2 = false
            }
        }
    },
    created() {
        if(localStorage.erpTableSetting!==undefined){
            console.log("yes");
            let erpTableSetting=JSON.parse(localStorage.erpTableSetting); 
            if(erpTableSetting.goodsManage!==undefined){
                this.goodsManageshow=erpTableSetting.goodsManage;
            }
        }else{
            console.log("no");
        };
        this.initData(this.page,this.page_size);
        this.getCat()
        this.getBrand()
    }
}
</script>
<style scoped>
.goodsManage{
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
  width: 130px;
}

/* 分页器 */
.el-pagination {
  margin-top: 20px;
  text-align: right;
}
.el-input >>> .el-input__inner{
    padding:0;
}
/* 新增客户弹出框 & 客户详情弹出框*/
.main-table>>>.el-dialog__body {
  padding: 0 20px;
}
.el-dialog__body .el-form {
  text-align: right;
}
.el-row {
  border-bottom: 1px dashed #ccc;
}
.el-tabs {
    margin: 0;
}
.el-table .el-input >>> .el-input__inner{
    border:none;
    text-align:center;
}
/* 积分详情弹出框 */
.el-form .el-form-item .el-select{
  width: 130px;
}
</style>