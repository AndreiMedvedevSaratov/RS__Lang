import Vue from 'vue';
import Vuex from 'vuex';
import VueDragDrop from 'vue-drag-drop';
import app from './modules/app';
import user from './modules/user';

Vue.use(Vuex);
Vue.use(VueDragDrop);

export default new Vuex.Store({
	// Строгий режим. Все изменения проводить через мутацию (в режиме разработчика)
	strict: process.env.NODE_ENV !== 'production',
	modules: {
		app,
		user,
	},
});
