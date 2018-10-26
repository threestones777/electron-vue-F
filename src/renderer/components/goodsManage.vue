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
                <el-form-item label="供应商名称">
                    <el-input v-model="formGoods.name" placeholder="供应商名称/首字母"></el-input>
                </el-form-item>
                <el-form-item label="条形码">
                    <el-input v-model="formGoods.barCodes" placeholder="条形码"></el-input>
                </el-form-item>
                <el-form-item label="规格型号">
                    <el-input type="tel" v-model="formGoods.type" placeholder="规格型号"></el-input>
                </el-form-item>
                <el-form-item label="全部分类">
                    <el-input type="tel" v-model="formGoods.allCategory" placeholder="全部分类"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" size="small" @click="goodsSearch">搜索</el-button>
                    <el-button type="success" size="small" @click="dialogGoodsAdd = true">新增</el-button>
                    <el-button type="success" size="small">导入</el-button>
                    <el-button type="success" size="small">导出</el-button>
                    <el-button type="success" size="small" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form>
            <!-- 新增商品弹出框 -->
            <el-dialog width="1000px" title="商品管理新增" :visible.sync="dialogGoodsAdd">
                  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="基础信息" name="first">
                        <el-form label-position="right" :model="formGoodsAdd" :inline="true" class="demo-form-inline">
                            <el-row>
                                <el-col :span="6">
                                    <el-form-item label="商品名称">
                                        <el-input v-model="formGoodsAdd.name" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="商品分类">
                                        <el-select v-model="formGoodsAdd.name" placeholder="请选择">
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
                                        <el-input v-model="formGoodsAdd.name" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6">
                                    <el-form-item label="条形码">
                                        <el-input v-model="formGoodsAdd.name" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="商品拉货">
                                        <el-input v-model="formGoodsAdd.name" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="商品品牌">
                                        <el-select v-model="formGoodsAdd.name" placeholder="请选择">
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
                                    <el-form-item label="商品单价">
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
                                        <el-option label="商品一" value="shanghai"></el-option>
                                        <el-option label="商品二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="辅助属性" name="second">配置管理</el-tab-pane>
                    <el-tab-pane label="图文详情" name="third">角色管理</el-tab-pane>
                </el-tabs>
                
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogGoodsAdd = false">取 消</el-button>
                    <el-button type="primary" @click="dialogGoodsAdd = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 商品详情弹出框 -->
            <el-dialog width="1000px" title="商品详情" :visible.sync="dialogGoodsDetail">
                  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="基础信息" name="first">
                        <el-form label-position="right" :model="formGoodsDetail" :inline="true" class="demo-form-inline">
                            <el-row>
                                <el-col :span="6">
                                    <el-form-item label="商品名称">
                                        <el-input v-model="formGoodsDetail.name" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="商品分类">
                                        <el-select v-model="formGoodsDetail.name" placeholder="请选择">
                                        <el-option label="选项一" value="shanghai"></el-option>
                                        <el-option label="选项二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="规格型号">
                                        <el-input v-model="formGoodsDetail.name" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="商品编码">
                                        <el-input v-model="formGoodsDetail.name" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6">
                                    <el-form-item label="条形码">
                                        <el-input v-model="formGoodsDetail.name" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="商品拉货">
                                        <el-input v-model="formGoodsDetail.name" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="商品品牌">
                                        <el-select v-model="formGoodsDetail.name" placeholder="请选择">
                                        <el-option label="品牌一" value="shanghai"></el-option>
                                        <el-option label="品牌二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="默认仓库">
                                        <el-select v-model="formGoodsDetail.name" placeholder="请选择">
                                        <el-option label="仓库一" value="shanghai"></el-option>
                                        <el-option label="仓库二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6">
                                    <el-form-item label="商品单价">
                                        <el-select v-model="formGoodsDetail.name" placeholder="请选择">
                                        <el-option label="单价一" value="shanghai"></el-option>
                                        <el-option label="单价二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="购货价格">
                                        <el-input v-model="formGoodsDetail.name" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="销货价格">
                                        <el-input v-model="formGoodsDetail.name" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                 <el-col :span="6">
                                    <el-form-item label="零售价格">
                                        <el-input v-model="formGoodsDetail.name" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6">
                                    <el-form-item label="库存预警">
                                        <el-input v-model="formGoodsDetail.name" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="赠送积分">
                                        <el-input v-model="formGoodsDetail.name" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="备注信息">
                                        <el-input v-model="formGoodsDetail.name" autocomplete="off"></el-input>
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
                            </el-row>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="辅助属性" name="second">配置管理</el-tab-pane>
                    <el-tab-pane label="图文详情" name="third">角色管理</el-tab-pane>
                </el-tabs>
                
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogGoodsDetail = false">取 消</el-button>
                    <el-button type="primary" @click="dialogGoodsDetail = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 供应商管理表格 -->
            <el-table
            :data="goodsTableData"
            border
            style="width: 100%">
                <el-table-column prop="name" align="center" label="商品名称"/>
                <el-table-column prop="number" align="center" label="商品编号"/>
                <el-table-column prop="category" align="center" label="商品分类"/>
                <el-table-column prop="unit" align="center" label="商品单位"/>
                <el-table-column prop="brand" align="center" label="商品品牌"/>
                <el-table-column prop="repertory" align="center" label="默认仓库"/>
                <el-table-column prop="priceBuy" align="center" label="购货价格"/>
                <el-table-column prop="priceSell" align="center" label="销货价格"/>
                <el-table-column prop="priceRetail" align="center" label="零售价格"/>
                <el-table-column prop="barCodes" align="center" label="条形码"/>
                <el-table-column prop="type" align="center" label="规格型号"/>
                <el-table-column prop="repertoryWarn" align="center" label="库存预警"/>
                <el-table-column prop="goodsCargo" align="center" label="商品货拉"/>
                <el-table-column prop="integral" align="center" label="商品积分"/>
                <el-table-column prop="marks" align="center" label="备注信息"/>
                <el-table-column fixed="right" align="center" label="相关操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="dialogGoodsDetail = true">详情</el-button>
                        <el-button type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="200">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: 'first',
            dialogGoodsAdd:false,
            dialogGoodsDetail:false,
            formGoods:{
                name:"淘宝",
                barCodes:88888888,
                type:"未知",
                allCategory:"我不喜欢钱,我对钱没有兴趣..."
            },
            formGoodsAdd:{
                name:""
            },
            formGoodsDetail:{
                name:""
            },
            goodsTableData:[
                {
                name: "淘宝",
                number: "88888888",
                contacts:"马云",
                phone: "18888888888",
                marks: "我不喜欢钱,我对钱没有兴趣..."
                }
            ]
        }
    },
    methods:{
        goodsSearch() {

        },
        reset() {

        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
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
  text-align: center;
}

/* 新增客户弹出框 & 客户详情弹出框*/
.main-table>>>.el-dialog__body {
  padding: 0 20px;
}
.el-dialog__body .el-form {
  text-align: right;
}
.el-row {
  border-top: 1px dashed #ccc;
}

/* 积分详情弹出框 */
.el-form .el-form-item .el-select{
  width: 130px;
}
</style>
