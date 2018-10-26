<template>
    <div id="systemParameter">
        <div class="main-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">主页</el-breadcrumb-item>
                <el-breadcrumb-item>设置</el-breadcrumb-item>
                <el-breadcrumb-item>系统参数</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-tabs type="border-card">
            <el-tab-pane label="基础信息">
                系统名称：<el-input v-model="input"></el-input><br>
                公司名称：<el-input v-model="input"></el-input><br>
                公司电话：<el-input v-model="input"></el-input><br>
                公司地址：<el-input v-model="input"></el-input><br>
                <el-button type="success">保存基础信息</el-button>
            </el-tab-pane>
            <el-tab-pane label="功能设置">
                默认阀值:<el-input v-model="input"></el-input><br>
                首页报表天数:<el-input v-model="input"></el-input><br>
                默认结算账户:<el-select v-model="value" placeholder="卡克">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select><br><br>
                默认打印纸张:<el-select v-model="value" placeholder="卡克">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select><br><br>
                <div>
                    制单人可选：
                    <el-radio v-model="radio" label="1">开启</el-radio>
                    <el-radio v-model="radio" label="2">关闭</el-radio>&nbsp;&nbsp;&nbsp;&nbsp;（开启后制单人可选，反之则为登录账户）
                </div><br><br>
                <div>
                    审核功能：
                    <el-radio v-model="radio" label="1">开启</el-radio>
                    <el-radio v-model="radio" label="2">关闭</el-radio>&nbsp;&nbsp;&nbsp;&nbsp;（开启后单据需经过审核才会发生数据变化）
                </div><br><br>
                <div>
                    串码功能：
                    <el-radio v-model="radio" label="1">开启</el-radio>
                    <el-radio v-model="radio" label="2">关闭</el-radio>&nbsp;&nbsp;&nbsp;&nbsp;（开启后录入单据时将启用串码功能）
                </div><br><br>
                <div>
                    批次功能：
                    <el-radio v-model="radio" label="1">开启</el-radio>
                    <el-radio v-model="radio" label="2">关闭</el-radio>&nbsp;&nbsp;&nbsp;&nbsp;（开启后录入单据时将启用批次功能）
                </div><br><br>
                <div>
                    隔行背景：
                    <el-radio v-model="radio" label="1">开启</el-radio>
                    <el-radio v-model="radio" label="2">关闭</el-radio>&nbsp;&nbsp;&nbsp;&nbsp;（开启后数据表格将加上隔行背景）
                </div><br><br>
                <el-button type="success">保存功能设置</el-button>
            </el-tab-pane>
            <el-tab-pane label="收银设置">
                <div>
                    收银功能：
                    <el-radio v-model="radio" label="1">开启</el-radio>
                    <el-radio v-model="radio" label="2">关闭</el-radio>&nbsp;&nbsp;&nbsp;&nbsp;（开启后将启用收银台功能）
                </div><br><br>
                收银标题：<el-input v-model="input" style="width:220px"></el-input><br>
                默&nbsp;&nbsp;认&nbsp;&nbsp;客&nbsp;&nbsp;户&nbsp;&nbsp;：<el-select v-model="value" placeholder="千克">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select><br><br>
                默认收银账户：<el-select v-model="value" placeholder="千克">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select><br><br>
                默认收款账户：<el-select v-model="value" placeholder="千克">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select><br><br>
                自动打印小票：<el-select v-model="value" placeholder="千克">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select><br><br>
                <el-button type="success">保存功能设置</el-button>
            </el-tab-pane>
            <el-tab-pane label="编码规则">编码规则</el-tab-pane>
        </el-tabs>
    </div>
</template>
<style>
#systemParameter{
    margin: 20px;
}
.main-header {
  padding: 10px;
  background: #fff;
}
.main-header .el-breadcrumb {
  margin: 8px 0 0 10px;
}
#systemParameter .el-tab-pane{
    padding:20px;
}
#systemParameter .el-tab-pane>.el-input{
    width:80%;
    margin:30px;
}
#systemParameter .el-tab-pane>.el-button{
    position:relative;
    left:50px;
}
</style>
<script>
export default {
    data(){
        return {
            input:'',
            value:'',
            radio:'1',
            options: [{
          value: '选项1',
          label: '默认'
        }]
        }
    }
}
</script>

