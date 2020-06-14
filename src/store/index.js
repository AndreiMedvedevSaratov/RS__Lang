import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';

Vue.use(Vuex);

export default new Vuex.Store({
	// Строгий режим. Все изменения проводить через мутацию (в режиме разработчика)
	strict: process.env.NODE_ENV !== 'production',
	modules: {
		app,
	},
});
