import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lodash';
import 'element-ui/lib/theme-chalk/index.css'
import lang from 'element-ui/lib/locale/lang/ru-RU';
import locale from 'element-ui/lib/locale';
import Element from 'element-ui';

Vue.config.productionTip = false;

locale.use(lang);
Vue.use(Element);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
