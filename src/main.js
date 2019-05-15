// CSS
import './app.scss';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import Vue from 'vue';
import Notifications from 'vue-notification';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Notifications);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
