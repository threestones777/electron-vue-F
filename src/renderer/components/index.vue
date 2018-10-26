<template>
    <div id="index">
        <div id="indexH3">
           <h3>温州美联 管理中心</h3>
        </div>        
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <p><b>购货总量(本月)：</b><span>2132123</span></p>
					<p><b>购货金额(本月)：</b><span>2132123</span></p>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <p><b>销售总额(本月)：</b><span>2132123</span></p>
					<p><b>销售金额(本月)：</b><span>2132123</span></p>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <p><b>库存总量(本月)：</b><span>2132123</span></p>
					<p><b>库存成本(本月)：</b><span>2132123</span></p>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <p><b>库存预警(本月)：</b><span>2132123</span></p>
					<p><b>默认阈值(本月)：</b><span>2132123</span></p>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <p><b>客户欠款(本月)：</b><span>2132123</span></p>
					<p><b>供应商欠款(本月)：</b><span>2132123</span></p>
                </div>
            </el-col>
        </el-row>
        <!--Tab标签切换-->
        <el-tabs type="border-card">
            <el-tab-pane label="购货">
                <div style="height:500px;">购货</div>
            </el-tab-pane>
            <el-tab-pane label="采购">
                <div style="height:500px;">采购</div>
            </el-tab-pane>
            <el-tab-pane label="销售">
                <div style="height:500px;">销售</div>
            </el-tab-pane>
            <el-tab-pane label="零售">
                <div style="height:500px;">零售</div>
            </el-tab-pane>
            <el-tab-pane label="服务">
                <div style="height:500px;">服务</div>
            </el-tab-pane>
            <el-tab-pane label="仓库">
                <div style="height:500px;">仓库</div>
            </el-tab-pane>
            <el-tab-pane label="资金">
                <div style="height:500px;">资金</div>
            </el-tab-pane>
        </el-tabs>
        <!--底部输入-->
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    单据金额：<el-input v-model="input" placeholder="单据金额"></el-input>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    实付金额：<el-input v-model="input" placeholder="请输入实付金额"></el-input>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    制单人:<el-input v-model="input" placeholder="管理员"></el-input>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="indeEelCol">
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    结算账户:
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    扣除积分：<el-input v-model="input" placeholder="请输入扣除积分"></el-input>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    备注信息：<el-input v-model="input" placeholder="请输入备注信息"></el-input>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<style>
    #index{
        margin:20px;
    }
    #indexH3{
        background:#fff;
        padding:10px 0 20px 5px;
        margin-bottom:25px;
    }
  .el-main{
    text-align:left;
    line-height:20px;
}
    .bg-purple {
    background: #fff;
  }
  .el-row{
      margin-top:0px;
      background:#fff;
      padding:10px;
  }
  .indeEelCol{
      border:1px dotted #E7EAEC;
      padding:10px;
  }
  .el-tabs{
      margin:20px;
  }
</style>
<script>
export default {
  data() {
    return {
      input: '',
      options: [{
          value: '选项1',
          label: '选项1'
        }, {
          value: '选项2',
          label: '选项2'
        }, {
          value: '选项3',
          label: '选项3'
        }, {
          value: '选项4',
          label: '选项4'
        },],
        value: ''
    }
  }
}
</script>