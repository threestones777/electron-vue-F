<template>
  <div id="repertoryCheck">
    <div class="main-header">
      <h3>温州美联 管理中心</h3>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item>仓库</el-breadcrumb-item>
        <el-breadcrumb-item>库存盘点</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- <el-input size="small" v-model="formsearch.goods_name" placeholder="商品名称"></el-input>
    <el-input size="small" v-model="formsearch.bill_sn" placeholder="商品编号"></el-input>
    <el-input size="small" v-model="formsearch.goods_id" placeholder="商品id"></el-input> -->
    <el-input placeholder="请输入商品名称" @input="search" v-model="keywords" style="width:20%;margin-right:10px" size="small">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
    <!-- <el-button size="small" type="success">导出</el-button> -->
    <el-button size="small" type="primary" @click="addNew">新增盘点商品</el-button>
    <el-button size="small" type="primary" @click="reset">刷新</el-button>
    <!-- 全局商品列表弹出 -->
    <el-dialog width="900px" title="商品列表" :visible.sync="dialogServeAdd">
      <!-- 商品搜索 -->
      <el-form :inline="true" :model="formGoods" class="demo-form-inline">
        <el-form-item label>
          <el-input size="small" v-model="formGoods.add_time1" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-input size="small" v-model="formGoods.bill_sn" placeholder="编号"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-input size="small" v-model="formGoods.status" placeholder="状态"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="goodsSearch">搜索</el-button>
        </el-form-item>
      </el-form>
      <!-- 商品表格 -->
      <el-table
        :row-style="{height:0}"
        :cell-style="{padding:0}"
        :header-row-style="{height:0}"
        :header-cell-style="{padding:0}"
        @current-change="handleCurrentChange2"
        border
        highlight-current-row
        v-loading="loading2"
        :data="goodsList"
      >
        <el-table-column show-overflow-tooltip prop="goods_name" align="center" label="商品名称"></el-table-column>
        <el-table-column prop="goods_sn" align="center" label="商品编号"></el-table-column>
        <el-table-column prop="shop_price" align="center" label="商品价格"></el-table-column>
        <el-table-column prop="cat_name" align="center" label="分类名"></el-table-column>
        <el-table-column show-overflow-tooltip prop="brand_name" align="center" label="品牌名"></el-table-column>
        <el-table-column prop="goods_number" align="center" label="库存"></el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        @current-change="handleCurrentChange3"
        layout="total,prev, pager, next,jumper"
        :page_size="page_size2"
        :total="total2"
      ></el-pagination>
      <el-button class="btn-b" type="primary" @click="getDone" size="small">确认</el-button>
    </el-dialog>
    <!--表单-->
    <el-table
      :data="repertoryCheckData"
      :row-style="{height:0}"
      :cell-style="{padding:0}"
      :header-row-style="{height:0}"
      :header-cell-style="{padding:0}"
      v-loading="loading"
      max-height="700"
      border
      style="width: 100%;">
      <el-table-column show-overflow-tooltip prop="goods_name" align="center" label="商品名称"></el-table-column>
      <el-table-column prop="goods_sn" align="center" label="商品编号"></el-table-column>
      <el-table-column prop="warn_number" align="center" label="库存预警"></el-table-column>
      <el-table-column prop="store_name" align="center" label="仓库名">
        <template slot-scope="scope">
          <span v-html="scope.row.store_name"></span>
        </template>
      </el-table-column>
      <el-table-column prop="brand_name" align="center" label="品牌名"></el-table-column>
      <el-table-column prop="brand_name" align="center" label="分类名"></el-table-column>
      <el-table-column prop="unit" align="center" label="单位"></el-table-column>
      <el-table-column prop="stock_number" align="center" label="当前库存"></el-table-column>
      <el-table-column prop="pandian_stock" align="center" label="盘点库存">
        <template slot-scope="scope" style="width:100%">
          <el-input-number
            @blur="editDone(scope.row)"
            :controls="false"
            v-model="scope.row.pandian_stock"
            :min="0"
          />
        </template>
      </el-table-column>
      <el-table-column prop="pandian_yingkui" align="center" label="盘点盈亏"></el-table-column>
      <el-table-column align="center" label="操作" width="100px">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="check(scope.row)"
            type="text"
          >{{scope.row.status==0?'审核':'反审核'}}</el-button>
          <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页显示-->
    <el-pagination
      @current-change="handleCurrentChange"
      layout="total,prev, pager, next,jumper"
      :page_size="page_size"
      :total="total"
    ></el-pagination>
  </div>
</template>
<style>
    #repertoryCheck{
        text-align:center;
        margin: 20px;
    }
    #repertoryCheck .main-header{
        text-align:left;
        margin-bottom: 10px;
    }
    #repertoryCheck .el-input{
        width:10%;
    }
    #repertoryCheck .el-select{
        width:10%;
    }
    #repertoryCheck .el-select>.el-input{
        width:100%;
    }
    #repertoryCheck .el-table{
        margin-top:20px;
    }
    #repertoryCheck .el-pagination{
        text-align: right;
        margin: 20px 0;
    }
    #repertoryCheck .el-pagination__jump .el-input{
        width:50%;
    }
    #repertoryCheck .el-input-number {
        width: 100%;
    }
    #repertoryCheck .el-input-number .el-input {
        width: 100%;
    }
    #repertoryCheck .btn-b {
        margin-bottom: 10px;
        float: right;
    }
    #repertoryCheck .el-dialog__body .el-input {
        width: 100%;
    }
    #repertoryCheck .el-dialog__body {
        padding: 0 20px;
        overflow: hidden;
    }
    #repertoryCheck .el-dialog__body .el-table {
        margin-top: 0;
    }
</style>
<script>
import { getRoomcheckList,editRoomcheck,addRoomcheck,delRoomcheck,checkRoomcheck,getGoodsList } from "../../api/api";
export default {
    data(){
        return {
            input:'',
            value:'',
            page: 1,
            page_size: 10,
            total: 0,
            page2: 1,
            page_size2: 10,
            total2: 0,
            keywords:"",
            dialogServeAdd:false,
            loading: true,
            loading2: true,
            formGoods:{},
            formsearch:{},
            goodsList:[],
            repertoryCheckData: []
        }
    },
    methods:{
        search() {
            getRoomcheckList({params:{goods_name:this.keywords}}).then(res=>{
                console.log(res.data)
                if(res.errno == 0) {
                    this.repertoryCheckData = res.data.room_check_list;
                    this.total2 = Number(res.data.record_count);
                    this.loading2 = false;
                }
            }) 
        }, 
        getList() { // 获取全局商品列表
            let data = {
                subsite_id: 3,
                user_id: sessionStorage.user_id,
                page: this.page2,
                page_size: this.page_size2
            };
            getGoodsList({params:data}).then(res=>{
                console.log(res.data)
                if(res.errno == 0) {
                    this.goodsList = res.data.goods;
                    this.total2 = Number(res.data.record_count);
                    this.loading2 = false;
                }
            })
        },
        initData(obj) {
            // 获取列表
            let data = {
                subsite_id: 3,
                // user_id: sessionStorage.user_id,
                page: this.page,
                page_size: this.page_size
            };
            if(obj) {
                data = Object.assign(data,obj)
            }
            getRoomcheckList({params:data}).then(res => {
                console.log(res.data);
                if (res.errno == 0) {
                this.repertoryCheckData = res.data.room_check_list;
                this.total = Number(res.data.record_count);
                this.loading = false;
                }else {
                    this.$message({
                        type: "error",
                        message: res.errmsg,
                        duration: 1000
                    });
                    this.loading = false;
                }
            });
        },
        editDone(row) { // 失去焦点编辑
            let data = this.$qs.stringify({
                id:row.id,
                pandian_stock:row.pandian_stock
            })
            editRoomcheck(data).then(res=>{
                if (res.errno == 0) {
                    this.$message({
                    type: "success",
                    message: "修改成功!",
                    duration: 500
                    });
                } else {
                    this.$message({
                        type: "error",
                    message: res.errmsg,
                    duration: 1000
                    });
                }
                this.initData();
            }).catch(res=>{
                this.$message({
                    type: "error",
                  message: '未知错误',
                  duration: 1000
                });
                this.initData();
            })
        },
        check(row) { // 审核/反审核
            console.log([row.id])
            let data = this.$qs.stringify({
                ids:JSON.stringify([row.id]),
                status:Number(!Number(row.status))
            })
            checkRoomcheck(data).then(res=>{
                if (res.errno == 0) {
                } else {
                    this.$message({
                    type: "error",
                    message: res.errmsg,
                    duration: 1000
                    });
                }
                this.initData();
            }).catch(res=>{
                this.$message({
                  type: "error",
                  message: '未知错误',
                  duration: 1000
                });
                this.initData();
            })
        },
        goodsSearch() {

        },
        getDone() { // 选择商品添加至视图
            let data = this.$qs.stringify({
                goods_id:this.selectGood,
            })
            addRoomcheck(data).then(res=>{
                if (res.errno == 0) {
                        this.$message({
                        type: "success",
                        message: "新增成功!",
                        duration: 500
                        });
                } else {
                    this.$message({
                    type: "error",
                    message: res.errmsg,
                    duration: 1000
                    });
                }
                this.initData();
                this.dialogServeAdd = false
            }).catch(res=>{
                this.$message({
                    type: "error",
                  message: '未知错误',
                  duration: 1000
                });
                this.initData();
                this.dialogServeAdd = false
            })
        },
        addNew() { // 获取全局商品列表
            this.getList()
            this.dialogServeAdd = true
        },
        deleteRow(rows) { // 删除单据
            this.$confirm("即将执行删除操作, 确认删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                console.log(rows.id)
                let tmpData = this.$qs.stringify({id:rows.id})
                delRoomcheck(tmpData)
                .then(res => {
                    if (res.errno == 0) {
                    this.$message({
                        type: "success",
                        message: "删除成功!",
                        duration: 1000
                    });
                    this.initData();
                    }else {
                        this.$message({
                        type: "error",
                        message: res.errmsg,
                        duration: 1000
                    });
                    }
                }).catch(res=>{
                    this.$message({
                        type: "error",
                        message: "未知错误!",
                        duration: 1000
                    });
                })
            }).catch(res => {
                console.log("用户取消删除");
            })
        },
        reset() {
            this.formsearch = {}
            this.initData()
        },
        handleCurrentChange(val) { // 盘点分页
            this.page = val;
            this.initData(this.formsearch);
        },
        handleCurrentChange3(val) { // 全局商品列表分页
            this.page2 = val;
            this.getList();
        },
        handleCurrentChange2(val) { // 确认商品
            this.selectGood = val.goods_id
        },
        formSearch() {
            this.initData(this.formsearch);
        }

    },
    created() {
        this.initData();
    }

}
</script>