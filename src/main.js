/* eslint-disable no-underscore-dangle */
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

// Проверка на устарешний токен и замена его на новый без повторной авторизации
axios.interceptors.response.use((response) => response, (error) => {
	const originalRequest = error.config;
	if (error.response.status === 401 && originalRequest.url === `${store.getters.getServerUrl}/users/${store.getters['user/getProfile'].userId}/tokens`) {
		store.dispatch('AUTH_LOGOUT');
		router.push('/login');
		store.dispatch('ALERT', { status: 'error', message: 'Произошла ошибка с получением нового токена, просьба авторизоватся в ручную!' });
		return Promise.reject(error);
	}
	if (error.response.status === 401 && !originalRequest._retry) {
		originalRequest._retry = true;
		return store.dispatch('AUTH_REFRESH_TOKEN')
			.then((res) => {
				if (res.status === 201) axios(originalRequest);
			});
	}
	return Promise.reject(error);
});

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
