import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import router from './router/router'
import {registerInterceptor} from '@/utils/api';

Vue.use(ElementUI);
Vue.prototype.axios = axios;
Vue.config.productionTip = false;
registerInterceptor();
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
