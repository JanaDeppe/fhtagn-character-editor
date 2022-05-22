// CSS
import 'material-design-icons-iconfont/dist/material-design-icons.css';

// Libraries
import { createApp } from 'vue';
import { createPinia } from 'pinia';

// Components
import App from './App.vue';
import router from '@/router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
