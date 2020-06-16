import axios from 'axios';
/** Instructions for working with actions
 * link https://vuex.vuejs.org/api/#actions
 */
const actions = {
	async USER_REQUEST({
		state, rootState, commit, dispatch,
	}, user) {
		commit('USER_REQUEST');
		commit('USER_SUCCESS', user);

		await axios.get(`${rootState.app.server}/users/${state.profile.userId}`)
			.then((response) => {
				console.log('Получил', response);
			})
			.catch(() => {
				commit('USER_ERROR');
				dispatch('AUTH_LOGOUT', null, { root: true });
			});
	},
	async USER_SIGNUP({
		state, rootState, commit, dispatch,
	}) {
		commit('USER_REQUEST');
		const user = { email: state.profile.email, password: state.profile.password };
		await axios.post(`${rootState.app.server}/signup`, user)
			.then((response) => {
				commit('USER_SUCCESS', response);
				dispatch('AUTH_REQUEST', user, { root: true });
			})
			.catch(() => {
				commit('USER_ERROR');
			})
			.then(() => {
				state.profile.password = '';
			});
	},
};

/**
 * Instructions for working with mutations
 * link https://vuex.vuejs.org/guide/mutations.html
 */
const mutations = {
	USER_REQUEST: (state) => {
		state.status = 'loading';
	},
	USER_SUCCESS: (state, payload) => {
		state.status = 'success';
		state.profile.userId = payload.userId ? payload.userId : state.profile.userId;
		state.profile.email = payload.email ? payload.email : state.profile.email;
	},
	USER_ERROR: (state) => {
		state.status = 'error';
	},
	USER_LOGOUT: (state) => {
		state.profile = {
			userId: '',
			email: '',
			password: '',
		};
	},

	USER_FORM: (state, payload) => {
		state.profile[payload.key] = payload.value;
	},
};

/**
 * Instructions for working with getters
 * link https://vuex.vuejs.org/api/#getters
 */
const getters = {
	getProfile: (state) => state.profile,
	isProfileLoaded: (state) => !!state.profile.name,
};

const state = {
	status: '',
	profile: {
		userId: '',
		email: 'Nurlan@mail.ru',
		password: 'Gfhjkm_123',
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
