import Vue from 'vue';
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import router from './router';
import {$axios} from "./untils/index";
import store from "./store/index"
/**将elementUI申明为全局组件*/
Vue.prototype.$axios=$axios;    /**将请求方法挂载到原型上*/
Vue.use(ElementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
