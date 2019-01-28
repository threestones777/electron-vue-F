import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import VueAxios from 'vue-axios' 
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import qs from 'qs' // post请求 处理插件
import FileSaver from "file-saver"
import XLSX from "xlsx"
import QRCode from 'qrcodejs2' // 二维码插件
import echarts from 'echarts'
import './tools/dialog-drag.js' // 自定义element-ui 的dialog可拖拽指令
Vue.prototype.$echarts = echarts // 原型挂载百度echarts图表
Vue.use(ElementUI)
Vue.use(VueAxios,axios)
Vue.prototype.$qs = qs // 原型挂载post请求head头问题的方法
Vue.prototype.$exportExcel = exportExcel
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

Vue.prototype.$qrcode = (code) => { // 挂载生成二维码函数
    let qrcode = new QRCode('qrcode',{
        width: 200, // 设置宽度，单位像素
        height: 200, // 设置高度，单位像素
        text: code   // 设置二维码内容或跳转地址
    })
}
function exportExcel(id,name) { // 导出为Excel表格插件
    var fix = document.querySelector('.el-table__fixed');
    var fixr = document.querySelector('.el-table__fixed-right');
    var table = document.querySelector(id)
    var wb;
    if (fix || fixr) {
        if(fix) {
          wb = XLSX.utils.table_to_book(table.removeChild(fix));
          table.appendChild(fix);
        }else {
          wb = XLSX.utils.table_to_book(table.removeChild(fixr));
          table.appendChild(fixr);
        }
    }else {
        wb = XLSX.utils.table_to_book(table);
    }
    var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
    });
    try {
        FileSaver.saveAs(
            new Blob([wbout], {
                type: "application/octet-stream"
            }),
            name +".xlsx"
        );
    } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
    }
    console.log(table);
    return wbout;
  }