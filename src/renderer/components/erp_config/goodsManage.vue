<template>
    <div class="goodsManage">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>设置</el-breadcrumb-item>
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            </el-breadcrumb>
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
                    <el-input placeholder="请输入商品名称/编号" @input="search" v-model="keywords" style="width:50%;margin-right:10px" size="small">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                    <el-button type="primary" size="small" @click="dialogGoodsAdd = true">新增</el-button>
                    <!-- <el-button type="primary" size="small">导入</el-button>
                    <el-button type="primary" @click="toExcel" size="small">导出</el-button> -->
                    <el-button type="primary" size="small" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form>
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
                    <el-button	size="small" type="primary" @click="dialogGoodsAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 商品详情弹出框 -->
            <el-dialog width="900px" title="商品详情" :visible.sync="dialogGoodsDetail">
                  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="基础信息" name="first">
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
                                <!-- <el-col :span="6">
                                    <el-form-item label="备注信息">
                                        <el-input v-model="formGoodsDetail.name" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col> -->
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
                            <!-- <el-row>
                                <el-col :span="6">
                                    <el-form-item label="库存预警">
                                        <el-input v-model="formGoodsDetail.warn_number" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="串码商品">
                                        <el-select v-model="formGoodsDetail.name" placeholder="请选择">
                                        <el-option label="商品一" value="shanghai"></el-option>
                                        <el-option label="商品二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col> 
                            </el-row>-->
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
                    </el-tab-pane>
                    <el-tab-pane style="overflow:auto;height:50vh" label="图文详情" name="third">
                        <div v-html="goods_desc"></div>
                    </el-tab-pane>
                </el-tabs>
                <div slot="footer" class="dialog-footer">
                    <el-button	size="small" @click="dialogGoodsDetail = false">取 消</el-button>
                    <el-button	size="small" type="primary" @click="edit(),dialogGoodsDetail = false">保存修改</el-button>
                </div>
            </el-dialog>
            <!-- 供应商管理表格 -->
            <el-table
            :data="goodsData"
            border
            v-loading="loading"
            id="goodsManage"
            :row-style="{height:0}"  
            :cell-style="{padding:0}"
            :header-row-style="{height:0}"  
            :header-cell-style="{padding:0}"
            tooltip-placement="right"
            style="width: 100%">
                <el-table-column fixed show-overflow-tooltip prop="goods_name" align="center" label="商品名称"/>
                <el-table-column show-overflow-tooltip prop="goods_sn" align="center" label="商品编号"/>
                <el-table-column prop="cat_name" align="center" label="商品分类"/>
                <el-table-column show-overflow-tooltip prop="brand_name" align="center" label="商品品牌"/>
                <el-table-column prop="chengben_price" align="center" label="成本价" width="60"/>
                <el-table-column prop="shop_price" align="center" label="本店售价" width="60"/>
                <el-table-column prop="txm" align="center" label="条形码"/>
                <el-table-column prop="warn_number" align="center" label="预警数量" width="60"/>
                <el-table-column prop="goods_number" align="center" label="库存" width="60"/>
                <el-table-column prop="integral" align="center" label="赠送积分" width="60"/>
                <el-table-column fixed="right" align="center" label="相关操作" width="90">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="goodsDetail(scope.row),dialogGoodsDetail = true">详情</el-button>
                        <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
                @current-change="handleCurrentChange"
                layout="total,prev, pager, next,jumper"
                :page_size="page_size"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import editer from '../../tools/editer'
import {getGoodsList,getGoodsDeail,getGoodsCate,getBrandList,getGoodsAdd,getGoodsEd} from '../../api/api'
export default {
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
        }
    },
    methods:{
        edit(){
            let data =this.$qs.stringify(this.formGoodsDetail)
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
        initData(obj) { // 获取商品列表
          let data = {
              subsite_id:3,
              user_id:sessionStorage.user_id,
              page:this.page,
              page_size:this.page_size,
          }
          if(obj) {
              Object.assign(data,obj)
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
        goodsDetail(v) {
            getGoodsDeail({params:{goods_id:v.goods_id}}).then(res=>{
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
            this.formGoods ={}
            this.initData()
        },
        toExcel() {
            this.$exportExcel("#goodsManage")
        },
        handleCurrentChange(val) {
            this.page = val
            this.initData(this.formGoods)
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
        this.initData()
        this.getCat()
        this.getBrand()
    }
}
</script>
<style scoped>
.goodsManage{
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
  width: 130px;
}

/* 分页器 */
.el-pagination {
  margin-top: 20px;
  text-align: right;
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
/* 积分详情弹出框 */
.el-form .el-form-item .el-select{
  width: 130px;
}
</style>