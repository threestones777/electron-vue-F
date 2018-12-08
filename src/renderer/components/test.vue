<template>
    <div class="test" style="overflow:auto">
        <iframe src="http://www.guimishuo1.com/site/login" id="mobsf"></iframe>
    </div>
</template>

<script>
import { test } from "../api/api";
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    this.$nextTick(() => {
      function changeMobsfIframe() {
        const mobsf = document.getElementById("mobsf");
        const test = document.querySelector(".el-main");
        const deviceHeight = test.clientHeight;
        mobsf.style.height = deviceHeight +"px";
      }
      changeMobsfIframe();
    });
  }
};
</script>

<style>
    #mobsf {
        width: 100%;
        border: 0;
        box-sizing: border-box;
    }
</style>
