<template>
  <div class="test" style="overflow:auto">
    <iframe src="http://www.guimishuo1.com/site/login" id="mobsf"></iframe>
    <div id="back-back" @click="back">单击返回<br/>按住右键拖拽</div>
  </div>
</template>

<script>
import { test } from "../api/api";
/* Vue.directive("drag", {
  // 当指令绑定到元素上的时候执行
  bind(el, binding) {
    // console.log('bind');
    // 当前指令绑定的dom元素
    //console.log(el);
    // 指令传入的参数、修饰符、值  v-指令名称:参数.修饰符=值
    // console.log(binding)

    el.onmousedown = function(e) {
      let disX = e.clientX - el.offsetLeft;
      let disY = e.clientY - el.offsetTop;
      document.onmousemove = function(e) {
        let L = e.clientX - disX;
        let T = e.clientY - disY;

        if (binding.modifiers.limit) {
          if (L < 0) {
            L = 0;
          }
        }

        el.style.left = L + "px";
        el.style.top = T + "px";
      };

      document.onmouseup = function() {
        document.onmousemove = null;
      };

      return false;
    };
  }
}); */
export default {
  data() {
    return {
      hasmove: false
    };
  },
  methods: {
    drag(el) {
      var tag = document.getElementById(el);
      var clientW = document.body.clientWidth;
      var clientH = document.body.clientHeight;
      tag.onmousedown = function(e) {
        var e = e || window.event;
        var disX = tag.offsetLeft;
        var disY = tag.offsetTop;
        var x = e.pageX - disX;
        var y = e.pageY - disY;
        var width = tag.offsetWidth;
        var height = tag.offsetHeight;
        document.onmousemove = function(e) {
          var e = e || window.event;
          var left = e.pageX - x;
          var top = e.pageY - y;
          if (left < 0) {
            left = 0;
          }
          if (top < 0) {
            top = 0;
          }
          if (left >= clientW - width) {
            left = clientW - width;
          }
          if (top >= clientH - height) {
            top = clientH - height;
          }
          tag.style.left = left + "px";
          tag.style.top = top + "px";
        };
      };
      document.onmouseup = function() {
        document.onmousedown = null;
        document.onmousemove = null;
      };
    },
    back(e) {
      this.$router.back();
    }
  },
  mounted() {
    this.$nextTick(() => {
      const mobsf = document.getElementById("mobsf");
      const test = document.querySelector(".el-main");
      const deviceHeight = test.clientHeight;
      mobsf.style.height = deviceHeight + "px";
    });
    this.drag("back-back")
  }
};
</script>

<style>
#mobsf {
  width: 100%;
  height: 100%;
  border: 0;
  box-sizing: border-box;
}
#back-back {
  width: 80px;
  height: 80px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 50%;
  background: pink;
  position: absolute;
  left: 10%;
  top: 10%;
  user-select: none;
}
</style>
