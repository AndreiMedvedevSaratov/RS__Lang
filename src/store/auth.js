import axios from 'axios';

/** Instructions for working with actions
 * link https://vuex.vuejs.org/api/#actions
 */
const actions = {
	async AUTH_REQUEST({
		rootState, commit, dispatch,
	}) {
		commit('AUTH_REQUEST');
		await axios.post(`${rootState.app.server}/signin`, {
			email: rootState.user.profile.email,
			password: rootState.user.profile.password,
		})
			.then((response) => {
				localStorage.setItem('token', response.data.token);
				commit('AUTH_SUCCESS', response.data);
				axios.defaults.headers.common.Authorization = response.data.token;

				commit('user/USER_SUCCESS', response.data, { root: true });
			})
			.catch((err) => {
				commit('AUTH_ERROR', err.response);
				localStorage.removeItem('token');
				dispatch('ALERT', { status: 'error', data: err.response.data });
			});
	},
	AUTH_LOGOUT({ commit }) {
		return new Promise(((resolve) => {
			commit('AUTH_LOGOUT');
			localStorage.removeItem('token');
			resolve();
		}));
	},

};

/**
 * Instructions for working with mutations
 * link https://vuex.vuejs.org/guide/mutations.html
 */
const mutations = {
	AUTH_REQUEST: (state) => {
		state.status = 'loading';
	},
	AUTH_SUCCESS: (state, payload) => {
		state.status = 'success';
		state.token = payload.token;
	},
	AUTH_ERROR: (state) => {
		state.status = 'error';
	},
	AUTH_LOGOUT: (state) => {
		state.token = '';
	},
};

/**
 * Instructions for working with getters
 * link https://vuex.vuejs.org/api/#getters
 */
const getters = {
	isAuthenticated: (state) => !!state.token,
	authStatus: (state) => state.status,
	isLoading: (state) => state.status === 'loading',
};

const state = {
	token: localStorage.getItem('token') || '',
	status: '',
};

export default {
	// namespaced false. To make it available throughout the project without special pointers.
	namespaced: false,
	state,
	getters,
	actions,
	mutations,
};
