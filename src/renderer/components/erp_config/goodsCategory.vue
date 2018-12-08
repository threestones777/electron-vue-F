<template>
    <div class="goodsCategory">
        <!-- 头部面包屑 -->
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>设置</el-breadcrumb-item>
                <el-breadcrumb-item>商品类别</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-table">
            <!-- 分类搜索 -->
            <el-form :inline="true" class="search">
                <el-form-item>
                    <el-input
                    placeholder="输入关键字进行过滤" size="small"
                    clearable
                    v-model="filterText">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button	size="small" class="fr" type="primary" @click="e=>addTopCate(e)">新增顶级分类</el-button>
                    <el-button	size="small" class="fr" type="primary" @click="reset">刷新</el-button>
                </el-form-item>
            </el-form>
            <!-- 商品分类树状图 -->
            <el-popover
            placement="top"
            width="160"
            ref="popo"
            v-model="visible">
                <el-form :model="formInline" :rules="rules" ref="ruleForm">
                    <el-form-item label="分类名称:" prop="cat_name">
                        <el-input v-model="formInline.cat_name" placeholder="要添加的分类名称"></el-input>
                    </el-form-item>
                    <el-form-item label="备注:" prop="cat_desc">
                        <el-input v-model="formInline.cat_desc" placeholder="备注"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addDone('ruleForm')">确定</el-button>
                        <el-button type="primary" @click="visible = false">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-popover>
            <div class="block">
                <el-tree
                :data="dataList"
                node-key="cat_id"
                ref="tree"
                :auto-expand-parent="false"
                :default-expanded-keys="openedArr"
                @node-expand="setCheckedKeys"
                @node-collapse="removeCheckedKeys"
                :props="defaultProps"
                :filter-node-method="filterNode"
                :expand-on-click-node="false">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <span>
                        <el-button
                            type="text"
                            size="mini"
                            @click="(e) => append(data,e)">
                            添加子分类
                        </el-button>
                        <el-button
                            type="text"
                            size="mini"
                            @click="(e) => change(data,e)">
                            修改
                        </el-button>
                        <el-button
                            type="text"
                            size="mini"
                            @click="() => remove(data)">
                            删除
                        </el-button>
                    </span>
                </span>
                </el-tree>
            </div>
        </div>
    </div>
</template>
<script>
import {
  getGoodsCate,
  addGoodsCate,
  delGoodsCate,
  editGoodsCate
} from "../../api/api";
export default {
  data() {
    return {
      filterText: "", // 过滤文字绑定
      openedArr: [], // 已打开的节点id
      defaultProps: {
        // 设置树状图显示规则
        children: "son",
        label: "cat_name"
      },
      visible: false, // 添加框显示或隐藏
      formInline: {
        // 添加分类表单
        cat_name: "",
        cat_desc: "",
        isEdit: false,
        user_id: sessionStorage.user_id
      },
      dataList: [], // 商品分类列表
      rules: {
        // 非空规则
        cat_name: [{ required: true, message: "不能为空", trigger: "blur" }],
        cat_desc: [{ required: true, message: "不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    initData() {
      // 获取商品分类数据
      getGoodsCate({ paranms: { user_id: sessionStorage.user_id } }).then(
        res => {
          if (res.errno == 0) {
            console.log(res.data)
            this.dataList = res.data;
          }
        }
      );
    },
    setCheckedKeys(v) {
      // 设置已打开的节点
      this.openedArr.push(v.cat_id);
    },
    removeCheckedKeys(value) {
      // 修复已经打开过但是关闭后 打开其他分类时 之前打开过的会一起打开的逻辑bug
      let res = this.openedArr.filter((v, i) => {
        return v != value.cat_id;
      });
      this.openedArr = [...new Set(res)];
      // console.log(this.openedArr);
    },
    append(data, c) {
      // 添加分类传数据
      console.log(data);
      this.formInline.cat_name = "";
      this.formInline.cat_desc = "";
      this.formInline.isEdit = false;
      this.$refs.popo.$refs.popper.style.left = c.pageX + "px";
      this.$refs.popo.$refs.popper.style.top = c.pageY + "px";
      this.visible = true;
      this.formInline.parent_id = data.cat_id;
    },
    addTopCate(c) {
      // 设置顶级分类父id为0
      this.formInline.cat_name = "";
      this.formInline.isEdit = false;
      this.formInline.cat_desc = "";
      this.$refs.popo.$refs.popper.style.left = c.pageX / 2 + "px";
      this.$refs.popo.$refs.popper.style.top = c.pageY + "px";
      this.visible = true;
      this.formInline.parent_id = 0;
    },
    addDone(formName) {
      // 确认添加分类&修改分类

      this.$refs[formName].validate(valid => {
        if (valid) {
          let tmpData = this.$qs.stringify(this.formInline);
          if (this.formInline.isEdit) {
            editGoodsCate(tmpData).then(res=>{
              if (res.errno == 0) {
                this.$message({
                  showClose: true,
                  message: "分类修改成功!",
                  duration: 1000,
                  type: "success"
                });
                this.initData();
                this.visible = false;
              }else {
                this.$message({
                  showClose: true,
                  message: "分类修改失败!",
                  duration: 1000,
                  type: "error"
                });
              }
            })
          } else {
            addGoodsCate(tmpData).then(res => {
              if (res.errno == 0) {
                this.$message({
                  showClose: true,
                  message: "分类添加成功!",
                  duration: 1000,
                  type: "success"
                });
                this.initData();
                this.visible = false;
              }else {
                this.$message({
                  showClose: true,
                  message: "分类添加失败!",
                  duration: 1000,
                  type: "error"
                });
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    filterNode(value, data) {
      // 过滤分类
      if (!value) return true;
      return data.cat_name.indexOf(value) !== -1;
    },
    change(a, c) {
      // 修改分类
      this.formInline.cat_name = a.cat_name;
      this.formInline.cat_desc = a.cat_desc;
      this.formInline.cat_id = a.cat_id;
      this.formInline.parent_id = a.parent_id;
      this.formInline.isEdit = true;
      this.$refs.popo.$refs.popper.style.left = c.pageX + "px";
      this.$refs.popo.$refs.popper.style.top = c.pageY + "px";
      this.visible = true;
    },
    remove(data) {
      // 删除分类
      this.$confirm("即将执行删除操作, 确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let tmpData = { 
          user_id: sessionStorage.user_id,
          cat_id: data.cat_id
        };
        delGoodsCate({ params: tmpData })
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
    reset() {
      this.initData()
    },
  },
  created() {
    this.initData();
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  }
};
</script>
<style scoped>
.goodsCategory {
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

.main-table .el-form.search {
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
}
.goodsCategory >>> .el-form.search .el-form-item:first-of-type {
  width: 70%;
}
.goodsCategory >>> .el-form.search .el-form-item:last-of-type {
  width: 30%;
}
.goodsCategory >>> .el-form.search .el-form-item:last-of-type .el-form-item__content {
  display: flex;
  justify-content: space-between;
}
.goodsCategory >>> .el-form.search .el-form-item .el-form-item__content {
  width: 100%;
}
.el-tree {
  padding: 20px 0;
}
</style>
