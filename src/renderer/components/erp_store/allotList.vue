<template>
  <div id="allotList">
    <div class="main-header">
        <!-- <h3>温州美联 管理中心</h3> -->
        <el-breadcrumb style="font-size:18px" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item>仓库</el-breadcrumb-item>
            <el-breadcrumb-item>调拨单</el-breadcrumb-item>
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
                <!-- <div @click="dialogShow=true" class="card">
                    <i class="el-icon-tickets"></i>
                    <div>显示列</div>
                </div> -->
                <div @click="formAdd={},dialogAdd=true" class="card">
                    <i class="el-icon-plus"></i>
                    <div>新增</div>
                </div>
            </div>
    </div>
    <div class="main-table">
            <!-- 单据搜索 -->
            <el-form :inline="true" :model="formServe" class="demo-form-inline">
                <!-- <el-form-item>
                    <el-date-picker
                    v-model="formServe.time"
                    type="daterange"
                    clearable
                    size="small"
                    range-separator="至"
                    value-format="timestamp"
                    format="yyyy 年 MM 月 dd 日"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-input size="small" clearable v-model="formServe.inout_sn" placeholder="编号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input size="small" v-model="formServe.keyword" placeholder="关键词"></el-input>
                </el-form-item> -->
                <!-- <el-form-item>
                    <el-button type="success" size="small" @click="serveSearch">搜索</el-button> 
                    <el-button type="primary" size="small" @click="formAdd={},dialogAdd=true">新增单据</el-button>
                    <el-button type="primary" size="small" @click="reset">刷新</el-button>
                </el-form-item>-->
            </el-form>

            <!--增改商品弹出框 -->
            <el-dialog width="900px" title="增改商品" :visible.sync="dialogServeAdd">
                <!-- 全局商品列表弹出卡片 -->
                <el-popover
                    placement="bottom"
                    v-model="visible"
                    trigger="click">
                    <!-- 商品搜索 -->
                    <el-form :inline="true" :model="formGoods" class="demo-form-inline">
                        <el-form-item label="">
                            <el-input size="small" v-model="formGoods.add_time1" placeholder="名称"></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-input size="small" v-model="formGoods.bill_sn" placeholder="编号"></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-input size="small" v-model="formGoods.status" placeholder="状态"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" size="small" @click="goodsSearch">搜索</el-button>
                        </el-form-item>
                    </el-form>
                    <!-- 商品表格 -->
                    <el-table
                    :row-style="{height:0}"  
                    :cell-style="{padding:0}"
                    :header-row-style="{height:0}"  
                    :header-cell-style="{padding:0}"
                    @selection-change="handleSelectionChange"
                    border
                    v-loading="loading2"
                    :data="goodsList">
                        <el-table-column type="selection"></el-table-column>
                        <el-table-column show-overflow-tooltip prop="goods_name" align="center" label="商品名称"></el-table-column>
                        <el-table-column prop="goods_sn" align="center" label="商品编号"></el-table-column>
                        <el-table-column prop="shop_price" align="center" label="商品价格"></el-table-column>
                        <el-table-column prop="cat_name" align="center" label="分类名"></el-table-column>
                        <el-table-column prop="brand_name" align="center" label="品牌名"></el-table-column>
                        <el-table-column prop="goods_number" align="center" label="库存"></el-table-column>
                    </el-table>
                    <!-- 分页器 -->
                    <el-pagination
                        @current-change="handleCurrentChange2"
                        layout="total,prev, pager, next,jumper"
                        :page_size="page_size2"
                        :total="total2">
                    </el-pagination>
                    <el-button class="btn-b" type="success" @click="getDone" size="small">确认</el-button>
                    <el-button :disabled="status!=0" class="btn-t" slot="reference" @click="getList" type="success" size="small">新增商品</el-button>
                    <el-button class="btn-t" slot="reference" @click="addGoods()" type="success" size="small">刷新</el-button>
                </el-popover>
				<div>
					<el-table
						:data="bn_goodsList"
						border
						max-height="500px"
						style="overflow:scroll"
						:row-style="{height:0}"  
						:cell-style="{padding:0}"
						:header-row-style="{height:0}"  
						:header-cell-style="{padding:0}">
						<el-table-column
						prop="goods_name"
						align="center"
						show-overflow-tooltip
						label="商品名称">
						</el-table-column>
						<el-table-column
						prop="goods_sn"
						align="center"
						label="商品编号">
						</el-table-column>
						<el-table-column
						prop="attr_value"
						align="center"
						label="默认属性">
						</el-table-column>
						<el-table-column
						prop="number_shishou"
						align="center"
						label="实收数量">
						<template slot-scope="scope">
							<el-input-number :disabled="status!=0" size="small" :controls="false" v-model="scope.row.number_shishou" :min="0"></el-input-number>
						</template>
						</el-table-column>
						<el-table-column
						prop="number_yingshou"
						align="center"
						label="应收数量">
							<template slot-scope="scope">
								<el-input-number :disabled="status!=0" size="small" :controls="false" v-model="scope.row.number_yingshou" :min="0"></el-input-number>
							</template>
						</el-table-column>
						<el-table-column
						align="center"
						width="120"
						label="相关操作">
							<template slot-scope="scope">
								<el-button :disabled="status!=0" type="text" size="small" @click="editGoods(scope.row)">提交修改</el-button>
								<el-button :disabled="status!=0" type="text" size="small" @click="deleteGoods(scope.row)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
            </el-dialog>

            <!-- 单据详情弹出框 -->
            <el-dialog width="840px" title="单据信息" :visible.sync="dialogServeDetail">
                <el-form label-position="right" ref="form" :model="formServeDetail" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="单据日期">
                                <el-input disabled v-model="formServeDetail.add_time" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="仓库名">
                                <el-input disabled v-model="formServeDetail.store_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="入库仓库名">
                                <el-input disabled v-model="formServeDetail.move_store_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="状态">
                                <el-input disabled v-model="formServeDetail.inout_status_name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="制单人">
                                <el-input disabled :model="formServeDetail.admin_name==false?'无':1" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
							<el-table
								:data="inout_info"
								border
								:row-style="{height:0}"  
								:cell-style="{padding:0}"
								:header-row-style="{height:0}"  
								:header-cell-style="{padding:0}"
								v-loading="loading3"
								style="width: 100%">
								<el-table-column
								prop="add_time"
								align="center"
								label="操作时间">
								</el-table-column>
								<el-table-column
								prop="inout_sn"
								align="center"
								label="出入库编号">
								</el-table-column>
								<el-table-column
								prop="inout_type"
								align="center"
								label="出入库类型">
								</el-table-column>
								<el-table-column
								prop="admin_name"
								align="center"
								label="操作人">
								</el-table-column>
								<el-table-column
								prop="status_name"
								align="center"
								label="单据状态">
								</el-table-column>
							</el-table>
                        </el-col>
                    </el-row>
                </el-form>
				
                <!-- <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogServeDetail = false">取 消</el-button>
                    <el-button type="primary" @click="editDone('form')">保存</el-button>
                </div> -->
            </el-dialog>

			<!-- 新增单据弹出框 -->
            <el-dialog width="840px" title="新增单据" :visible.sync="dialogAdd">
                <el-form label-position="right" ref="form" :model="formAdd" :inline="true" class="demo-form-inline">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="出库仓库" prop="store_id_out" :rules="rule">
                                <el-select clearable v-model="formAdd.store_id_out" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.store_id"
                                    :label="item.store_name"
                                    :value="item.store_id">
                                    </el-option>
                                </el-select>
                                <!-- <el-input @focus="getStore(),inOrOut='out',dialogStore=true" v-model="formAdd.store_name_out" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="入库仓库" prop="store_id_in" :rules="rule">
                                <el-select clearable v-model="formAdd.store_id_in" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.store_id"
                                    :label="item.store_name"
                                    :value="item.store_id">
                                    </el-option>
                                </el-select>
                                <!-- <el-input @focus="getStore(),inOrOut='in',dialogStore=true" v-model="formAdd.store_name_in" autocomplete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="备注">
                                <el-input v-model="formAdd.remark" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogAdd = false">取 消</el-button>
                    <el-button type="primary" @click="addDone('form')">确认</el-button>
                </div>
            </el-dialog>

            <!-- 单据表格 -->
            <el-table
				:data="Data"
				border
				:row-style="{height:0}"  
				:cell-style="{padding:0}"
				:header-row-style="{height:0}"  
				:header-cell-style="{padding:0}"
				v-loading="loading"
				style="width: 100%">
                <el-table-column
                prop="add_time"
                align="center"
                label="添加时间">
                </el-table-column>
                <el-table-column
                prop="store_name"
                align="center"
                label="仓库名">
                <template slot-scope="scope">
                  <span v-html="scope.row.store_name"></span>
                </template>
                </el-table-column>
                <el-table-column
                prop="move_store_name"
                align="center"
                label="移动仓库名">
                <template slot-scope="scope">
                  <span v-html="scope.row.move_store_name"></span>
                </template>
                </el-table-column>
                <el-table-column
                prop="user_out_name"
                align="center"
                label="出库管理员">
                </el-table-column>
                <el-table-column
                prop="user_in_name"
                align="center"
                label="入库管理员">
                </el-table-column>
                <el-table-column
                prop="inout_status_name"
                align="center"
                width="80"
                label="状态">
                </el-table-column>
                <el-table-column
                fixed="right"
                align="center"
                width="140"
                label="相关操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="addGoods(scope.row)">增改商品</el-button>
                        <el-button type="text" size="small" @click="showDetails(scope.row),dialogServeDetail = true">单据详情</el-button>
                        <el-button type="text" size="small" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
                        <el-button type="text" v-if="scope.row.status==0" size="small" @click="changeStatus(scope.row)">出库审核</el-button>
                        <el-button type="text" v-if="scope.row.status==1" size="small" @click="changeStatus(scope.row)">入库审核</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 单据分页器 -->
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
import {
  getAllocationList,
  getAllocationDetail,
  addAllocation,
  editAllocation,
  delAllocation,
  addAllocationGoods,
  editAllocationGoods,
  delAllocationGoods,
  checkoutAllocation,
  checkinAllocation,
  getGoodsList,
  getStoreList
} from "../../api/api";
export default {
    data() {
        return {
            page: 1,
            page_size: 10,
            total: 0,
			loading: true,
			
            page2: 1,
            page_size2: 10,
            total2: 0,
			loading2: true,

            page3: 1,
            page_size3: 10,
            total3: 0,
			loading4: true,

			loading3:true,
            isEdit: false,
			visible:false,
			status:'',
			inOrOut:'in',
			currentStroe:'',
			dialogAdd:false,
			dialogStore:false,
            dialogServeAdd:false,
            dialogServeDetail:false,
            formServe:{}, // 单据搜索
            formAdd:{}, // 新增
            formGoods:{},// 全局商品搜索
            formServeDetail:{}, //单据详情
            bn_goodsList:[],// 单据拥有的商品列表数据
            Data:[], // 单据列表数据
            move_id:'', // 将要增改的单据id
            goodsList:[], // 供选择的全局商品列表数据
			selectedGoods:[], // 选中的商品
			inout_info:[], // 详情内操作信息
            options:[],
            rule: [{ required: true, message: "不能为空" }],
        }
    },
    methods:{
        initData(obj) {
            // 获取列表
            let data = {
                subsite_id: 3,
                user_id: sessionStorage.user_id,
                page: this.page,
                page_size: this.page_size
            };
            if(obj) {
                data = Object.assign(data,obj)
            }
            getAllocationList({params:data}).then(res => {
                console.log(res.data);
                if (res.errno == 0) {
                this.Data = res.data.arr;
                this.total = Number(res.data.record_count);
                this.loading = false;
                }
            });
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
		
        getDone() { // 将选中的商品添加至该单据拥有的商品列表中
            let data = this.$qs.stringify({
                move_id:this.move_id,
                goods_ids : JSON.stringify(this.selectedGoods)
            });
            addAllocationGoods(data).then(res=>{
                if(res.errno == 0) {
                    this.addGoods()
                    this.visible = false
                }else {
                    this.$message({
                        type: "error",
                        message: res.errmsg,
                        duration: 1000
                    });
                }
            })
		},
		
        addGoods(v) { // 获取单据内商品列表
            if(v) {
				this.move_id = v.move_id
			  	this.status = v.status
            }
            let data = {
				move_id:this.move_id
            };
            getAllocationDetail({params:data}).then(res=>{
				console.log(res.data)
                if(res.errno == 0) {
					this.bn_goodsList = res.data.goods_list
					this.dialogServeAdd = true
                }
            })
		},
		
		changeStatus(v) { // 更改审核状态
			this.$confirm('请选择审核类型,确认或拒绝都将无法撤回,请检查确认后操作!', '审核操作', {
				distinguishCancelAndClose: true,
				confirmButtonText: '审核通过',
				cancelButtonText: '审核拒绝'
			})
			.then(() => {
				if(v.status==0) {
					this.handleChange(1,checkoutAllocation,v)
				}else if(v.status == 1) {
					this.handleChange(2,checkinAllocation,v)
				}
			})
			.catch(action => {
				if(action == 'cancel') {
					if(v.status==0) {
						this.handleChange(4,checkoutAllocation,v)
					}else if(v.status == 1) {
						this.handleChange(3,checkinAllocation,v)
					}
				}
			});
		},
		
		handleChange(status,fun,v) { // 请求函数封装
			let data = this.$qs.stringify({
				move_id:v.move_id,
				status:status
			});
			fun(data).then(res=>{
				if (res.errno == 0) {
					this.$message({
					type: "success",
					message: "操作成功!",
					duration: 1000
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
			})
		},

        goodsSearch() { // 商品搜索

		},
		
        editGoods(row) { // 更改商品信息
            if(row.number_shishou==0) {
                this.$message({
                    type: "error",
                    message: "不能为0或空值!",
                    duration: 1000
                });
                return
            }
            let data = this.$qs.stringify({
                move_id:this.move_id,
                book_id : row.book_id,
                number_yingshou:row.number_yingshou,
                number_shishou:row.number_shishou
            });
            editAllocationGoods(data).then(res=>{
                if(res.errno ==0) {
					this.$message({
						type: "success",
						message: "修改完成",
						duration: 1000
					});
                }else {
					this.$message({
						type: "error",
						message: res.errmsg,
						duration: 1000
					});
				}
                this.addGoods()
            }).catch(res=>{
				this.$message({
					type: "error",
					message: "未知错误",
					duration: 1000
				});
			})
		},
		
        addDone(formName) { // 确认添加单据
            this.$refs[formName].validate(valid => {
                if(valid) {
                    let data = this.$qs.stringify(this.formAdd);
                    addAllocation(data).then(res=>{
                        if(res.errno == 0) {
                            this.$message({
                                type: "success",
                                message: "新增成功",
                                duration: 1000
                            });
                        }else {
                            this.$message({
                                type: "error",
                                message: res.errmsg,
                                duration: 1000
                            });
                        }
                        this.dialogAdd = false
                        this.initData()
                    }).catch(res=>{
                        this.$message({
                            type: "error",
                            message: '未知错误',
                            duration: 1000
                        });
                        this.dialogAdd = false
			        })
                }
            })
			
		},
		
        handleSelectionChange(v) { // 商品选择
            let arr = []
            v.forEach((v,i)=>{
                arr.push(v.goods_id)
            })
            this.selectedGoods = arr
		},
		
        serveSearch() { // 单据搜索
            if(this.formServe.time) {
                this.formServe.add_time1 = parseInt(this.formServe.time[0]/1000)
                this.formServe.add_time2 = parseInt(this.formServe.time[1]/1000)
            }
            this.initData(this.formServe)
		},
		      
        reset() { // 刷新
            this.formServe = {}
            this.initData();
		},
		
        handleCurrentChange(val) { // 单据分页
            this.page = val;
            this.initData()
		},
		
        handleCurrentChange2(val) { // 全局商品列表分页
            this.page2 = val;
            this.getList();
		},
		handleCurrentChange3(val) { // 全局商品列表分页
			this.currentStroe = val
		},
        handleCurrentChange4(val) { // 全局商品列表分页
            this.page3 = val;
            this.getStore();
		},
		
        showDetails(row){ // 单据详情
            this.isEdit = true;
            let data = { move_id: row.move_id };
            getAllocationDetail({params:data}).then(res => {
                if (res.errno == 0) {
                this.formServeDetail = res.data.move_info;
				this.inout_info = res.data.inout_info;
				this.loading3 = false
                // console.log(res.data.data)
                }
            });
		},
		
        deleteRow(index, rows) { // 删除单据
            this.$confirm("即将执行删除操作, 确认删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                console.log(rows.id)
                let tmpData = this.$qs.stringify({move_id:rows.move_id})
                delAllocation(tmpData)
                .then(res => {
                    if (res.errno == 0) {
                    this.$message({
                        type: "success",
                        message: "删除成功!",
                        duration: 1000
                    });
                    this.initData();
                    }
                })
            }).catch(res => {
                console.log("用户取消删除");
            })
		},
		
        deleteGoods(row) { // 删除单据内商单个商品
            let tmpData = this.$qs.stringify({
              move_id:this.move_id,
              book_id:row.book_id
            })
            delAllocationGoods(tmpData).then(res=>{
                if(res.errno ==0) {
                    this.$message({
                        type: "success",
                        message: "删除成功!",
                        duration: 1000
					});
					this.addGoods()
                }else {
                    this.$message({
                        type: "error",
                        message: res.errmsg,
                        duration: 1000
                    });
                }
            })
		},
    },
    created() {
        this.initData();
        getStoreList().then(res=>{
			if(res.errno==0) {
				this.options = res.data
			}else {
                console.log(res)
            }
		})
    }
}
</script>
<style scoped>
#allotList{
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

/* 分页器 */
.el-pagination {
  padding: 20px 0;
  text-align: right;
}

/* 新增弹出框 & 详情弹出框*/
#allotList >>> .el-dialog__body {
  padding: 0 20px;
  overflow: auto;
}
.main-table >>> .el-dialog__body .el-form-item__content {
  width: 180px;
  text-align: right;
}
.main-table >>> .el-dialog__body .el-form-item.time .el-form-item__content {
    width: 80%;
}
.main-table >>> .el-dialog__body .el-form-item {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.main-table >>> .el-dialog__body .el-form-item .el-form-item__label {
  flex: 1;
  box-sizing: border-box;
  padding: 0;
  padding-left: 10px;
  text-align: left;
}
.main-table >>> .el-dialog__body .el-date-editor,
.main-table >>> .el-dialog__body .el-input-number {
  width: 100%;
}
.el-row {
  border-top: 1px dashed #ccc;
}
.btn-t {
    float: right;
    margin: 0 0 10px 0;
}
.btn-b {
    float: right;
    margin: 10px 0 0 0;
}
</style>