import '@/assets/scss/main.scss';
import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import store from './store';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

const token = localStorage.getItem('token');

if (token) axios.defaults.headers.common.Authorization = token;

new Vue({
	store,
	router,
	vuetify,
	render: (h) => h(App),
}).$mount('#app');
