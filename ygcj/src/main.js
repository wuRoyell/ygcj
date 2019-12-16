import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import Routers from "@/router/router";
import "babel-polyfill";
import axios from "axios";
import iView from 'iview';
import store from '@/store/index';

import 'iview/dist/styles/iview.css';

import head from '@/components/head.vue';

import home from '@/components/home.vue';
import drag from '@/components/table-drag.vue';
import drag2 from '@/components/table-drag2.vue';
import drag3 from '@/components/tableDrag3.vue';
import drag33 from '@/components/table-drag3.vue';
import dragBt from '@/components/table-drag-btbz.vue';

import dragZs from '@/components/table-drag-zslist.vue';
import dragBl from '@/components/table-drag-bllist.vue';
import dragYb from '@/components/table-drag-yblist.vue';
import dragCx from '@/components/table-drag-cxlist.vue';
import dragTh from '@/components/table-drag-thtz.vue';
import dragYh from '@/components/table-drag-yhtz.vue';
import auditModal from '@/components/auditModal.vue';

import App from "./App.vue";
import echarts from 'echarts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from "@/service/service";
import util from "@/service/commonUtil";
import moment from 'moment';

import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css';
import VueCookie from 'vue-cookies';
import keepAliveConf from '@/assets/js/keepAliveConf.js'
import XLSX from 'xlsx/dist/xlsx.full.min.js';

import 'xlsx/dist/shim.min';


// console.log(XLSX,'777')
Vue.filter('time', function (value, formatString) {
    formatString = formatString || 'YYYY-MM-DD HH:mm';
    return moment(value).format(formatString);
})
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = http;
Vue.prototype.$commonUtil = util;

window.Vue = Vue



Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(iView);
Vue.use(ElementUI);
Vue.use(
    VueQuillEditor);
Vue.use(VueCookie);
Vue.prototype.$Message.config({
    top: 250,
    duration: 3
});
// 全局组件
Vue.component('headerPage', head);
Vue.component('tabDrag', drag);
Vue.component('jwde', home);
Vue.component('tabDragZs', dragZs);
Vue.component('tabDragBl', dragBl);
Vue.component('tabDragYb', dragYb);
Vue.component('tabDrag2', drag2)
Vue.component('tabDrag3', drag3)
Vue.component('tabDrag33', drag33)
Vue.component('auditModal', auditModal)
Vue.component('tabDragBt', dragBt)
Vue.component('tabDragCx', dragCx)
Vue.component('tabDragYh', dragYh)
Vue.component('tabDragTh', dragTh)
// 路由配置

const RouterConfig = {

    mode: "hash",
    routes: Routers
};
const router = new VueRouter(RouterConfig);

// 全局过滤器
Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
})
// 保留两位小数
Vue.filter('NumToFixed',function(value,type){
    if(type == 'right'){
        
        let num = Number(isNaN(value)?0:value).toFixed(2);

        return num;
    }else{
        return value;
    }
})
//隐去日期后面的时间
Vue.filter('time', function (date) {
    if (!date) return '';

    date = date.toString().substring(0, 10)
    return date
})

Vue.filter('type', function (status) {
    if (!status) return ''
    switch (status.toString()) {
        case '1':
            return '组团预报表'
        case '2':
            return '参团预报表'

        case '3':
            return '正式申请表'
    }
    return status
})
Vue.filter('yhType', function (status) {
    if (!status) return ''
    switch (status.toString()) {
        case '1':
            return '用汇申请表'
        case '2':
            return '用汇核销表'

        case '3':
            return '用汇通知书'
        case '4':
            return '退汇通知书'
    }
    return status
})

Vue.filter('money', function (value) {
    if (!value) return ''
    switch (value.toString()) {
        case '1':
            return '美元'
        case '2':
            return '英镑'
        case '3':
            return '欧元'
        case '4':
            return '日元'
        case '5':
            return '港币'

    }
})
//单据状态
Vue.filter('auditStatus', function (val) {
    if (val == 1) {
        return "新增待确认";
    } else if (val == 2) {
        return "已确认";
    } else if (val == 3) {
        return "已保存";
    } else if (val == 4) {
        return "待业务处室审核";
    } else if (val == 5) {
        return "业务处室已审";
    } else if (val == 6) {
        return "业务处退回";
    } else if (val == 7) {
        return "扎口处已审";
    } else if (val == 8) {
        return "扎口处退回";
    } else if (val == 99) {
        return "已删除";
    } else {
        return val;
    }

})
// 预报单据状态
Vue.filter('auditYbStatus', function (val) {
    if (val == 1) {
        return "新增待确认  ";
    } else if (val == 2) {
        return "已确认";
    }
   else {
        return val;
    }

})
Vue.filter('auditType', function (value) {
    if (!value) return ''
    switch (value.toString()) {
        case '1':
            return '组团单位表'
        case '2':
            return '参团单位表'
        case '3':
            return '正式经费申请表'
        case '4':
            return '日元'
    }
})
new Vue({
    render: h => h(App),
    router: router,
    store
}).$mount("#app");

// 路由拦截器
// router.beforeEach((to, from, next) => {
//     if (store.state.ifLogin) {
//         next()
//     } else {
//
//         let api = http.loginOut();
//         // console.log(api)
//         window.location.href =  api + '/login/sso'
//         // next()
//     }
// })
