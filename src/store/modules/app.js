import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import router from '../../router';

/** Instructions for working with actions
 * link https://vuex.vuejs.org/api/#actions
 */
const actions = {
	async AUTH_REQUEST({
		state, rootState, commit,
	}) {
		commit('AUTH_REQUEST');
		await axios.post(`${state.server}/signin`, {
			email: rootState.user.profile.email,
			password: rootState.user.profile.password,
		})
			.then((response) => {
				localStorage.setItem('token', response.data.token);
				commit('AUTH_SUCCESS', response.data);
				axios.defaults.headers.common.Authorization = response.data.token;

				commit('user/USER_SUCCESS', response.data, { root: true });
				router.push('/');
			})
			.catch((err) => {
				commit('AUTH_ERROR', err.response);
				localStorage.removeItem('token');
			});
	},
	AUTH_LOGOUT({ commit }) {
		return new Promise(((resolve) => {
			commit('AUTH_LOGOUT');
			localStorage.removeItem('token');
			router.push('/login');
			resolve();
		}));
	},
	ALERT({ state }, payload) {
		state.error = {
			alert: payload.alert,
			status: payload.status,
			message: payload.message,
		};
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
	AUTH_ERROR: (state, payload) => {
		state.status = 'error';
		state.error = {
			alert: true,
			status: state.status,
			message: `${payload.statusText}: ${payload.data}`,
		};
	},
	AUTH_LOGOUT: (state) => {
		state.token = '';
	},
	ERROR_ALERT: (state, value) => {
		state.error.alert = value;
	},
};

/**
 * Instructions for working with getters
 * link https://vuex.vuejs.org/api/#getters
 */
const getters = {
	isAuthenticated: (state) => !!state.token,
	authStatus: (state) => state.status,
	getError: (state) => state.error,
};

const state = {
	server: 'https://afternoon-falls-25894.herokuapp.com',
	token: localStorage.getItem('token') || '',
	status: '',
	error: {
		alert: false,
		status: 'error',
		message: '',
	},
};

export default {
	// namespaced false. To make it available throughout the project without special pointers.
	namespaced: false,
	state,
	getters,
	actions,
	mutations,
};
