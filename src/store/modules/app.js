import Vue from 'vue';
import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import router from '../../router';

/** Instructions for working with actions
 * link https://vuex.vuejs.org/api/#actions
 */
const actions = {
	async AUTH_REQUEST({
		state, rootState, commit, dispatch,
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
				dispatch('ALERT', { status: 'error', data: err.response.data });
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

	/** Function notification ALERT
	 * Events: error, warning, info, default
	 *
	 * Call in all modules
	 * dispatch('ALERT', { status: 'error', data: error.response.data }, { root: true })
	 */
	ALERT(state, payload) {
		const status = payload.status ? payload.status : 'default';
		let position = 'bottom-right';
		let text = '';

		switch (status) {
		case 'error':
			if (typeof payload.data === 'object') {
				let count = 1;
				payload.data.error.errors.forEach((element) => {
					// eslint-disable-next-line no-plusplus
					text += `${count++}) ${element.message} </br>`;
				});
			}
			if (typeof payload.data === 'string') text = payload.data;
			break;
		case 'warning':
			text = payload.data;
			position = 'bottom';
			break;
		case 'info':
			text = payload.data;
			position = 'top-right';
			break;
		default:
			text = payload.data;
			position = 'top';
			break;
		}

		Vue.$toast.open({
			message: text,
			type: status,
			duration: 10000,
			position,
		});
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
};

const state = {
	server: 'https://afternoon-falls-25894.herokuapp.com',
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
