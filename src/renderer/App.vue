<template>
  <div id="app">
      <router-view/>
  </div>
</template>
<script>
export default {
  name: "meilian_electron_erp",
  provide() {
    // 注册一个局部组件刷新方法
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      //局部刷新页面
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  },
};
</script>
<style>
@import url("./assets/css/reset.css");
.el-aside::-webkit-scrollbar {
  display: none;
}
.el-menu--vertical {
  width: 200px;
}
.el-main {
  padding: 0 !important;
  background: rgb(243, 243, 243);
}
.el-badge__content {
  top: 30% !important;
}
.el-menu--collapse {
  width: 100px!important;
}
</style>