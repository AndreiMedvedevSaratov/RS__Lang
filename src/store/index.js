import Vue from 'vue';
import Vuex from 'vuex';
import app from './app';
import auth from './auth';
import user from './user';
import speakit from './speakit';
import speaking from './speaking';
import audiovizov from './modules/audiovizov';

Vue.use(Vuex);

export default new Vuex.Store({
	// Строгий режим. Все изменения проводить через мутацию (в режиме разработчика)
	strict: process.env.NODE_ENV !== 'production',
	modules: {
		auth,
		app,
		user,
		speakit,
		speaking,
		audiovizov,
	},
});
