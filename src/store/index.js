import Vue from 'vue';
import Vuex from 'vuex';
// eslint-disable-next-line import/no-cycle
import app from './modules/app';
import user from './modules/user';
import speakit from './modules/speakit';

Vue.use(Vuex);

export default new Vuex.Store({
	// Строгий режим. Все изменения проводить через мутацию (в режиме разработчика)
	strict: process.env.NODE_ENV !== 'production',
	modules: {
		app,
		user,
		speakit,
	},
});
