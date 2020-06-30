import '@/assets/scss/main.scss';
import Vue from 'vue';
import axios from 'axios';
import VueToast from 'vue-toast-notification';
import App from './App.vue';
import store from './store';
import router from './router';
import vuetify from './plugins/vuetify';

// Import one of available themes
// import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.config.productionTip = false;

Vue.use(VueToast);

// axios.defaults.withCredentials = true;
const token = localStorage.getItem('token');
if (token) axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

new Vue({
	router,
	store,
	vuetify,
	render: (h) => h(App),
}).$mount('#app');

// store.subscribeAction((action) => {
// 	console.info('Сработал Action', action);
// });
// store.subscribe((mutation) => {
// 	console.info('Сработал Mutation ', mutation);
// });
