<template>
    <div id='alwaysUse'>
        <div class="custM-header">
            <h3>温州美联 管理中心</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>报表</el-breadcrumb-item>
                <el-breadcrumb-item>常用功能</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="alwaySuse">
            <div>
                <h1>购货相关</h1><br>
                <el-switch
                    v-model="value3"
                    active-text="购货单">
                </el-switch>
            </div>
            <div>
                <h1>销货相关</h1><br>
                <el-switch
                    v-model="value3"
                    active-text="购货单">
                </el-switch>
            </div>
            <div>
                <h1>零售相关</h1><br>
                <el-switch
                    v-model="value3"
                    active-text="购货单">
                </el-switch>
            </div>
            <div>
                <h1>仓库相关</h1><br>
                <el-switch
                    v-model="value3"
                    active-text="购货单">
                </el-switch>
            </div>
            <div>
                <h1>仓库相关</h1><br>
                <el-switch
                    v-model="value3"
                    active-text="购货单">
                </el-switch>
            </div>
            <div>
                <h1>基础资料</h1><br>
                <el-switch
                    v-model="value3"
                    active-text="购货单">
                </el-switch>
            </div>
            <div>
                <h1>辅助资料</h1><br>
                <el-switch
                    v-model="value3"
                    active-text="购货单">
                </el-switch>
            </div>
            <div>
                <h1>数据报表</h1><br>
                <el-switch
                    v-model="value3"
                    active-text="购货单">
                </el-switch>
            </div>
            <div>
                <h1>高级设置</h1><br>
                <el-switch
                    v-model="value3"
                    active-text="购货单">
                </el-switch>
            </div>
        </div>
    </div>
</template>
<style>
    #alwaysUse{
        margin:20px;
    }
    #alwaysUse .alwaySuse{
        margin:0 auto; 
        width:80%; 
    }
    #alwaysUse .alwaySuse>div{
       border-bottom:1px dotted gray;
       padding:10px;
    }
</style>
<script>
  export default {
    data() {
      return {
        value3: true
      }
    }
  };
</script>