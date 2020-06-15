import axios from 'axios';
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
		},
		{
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				localStorage.setItem('token', response.token);
				commit('AUTH_SUCCESS', response);
				dispatch('user/USER_REQUEST', null, { root: true });
			})
			.catch((err) => {
				commit('AUTH_ERROR', err);
				localStorage.removeItem('token');
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
		state.hasLoadedOnce = true;
	},
	AUTH_ERROR: (state) => {
		state.status = 'error';
		state.hasLoadedOnce = true;
	},
	AUTH_LOGOUT: (state) => {
		state.token = '';
	},
	CLOSE_DIALOG: (state, value) => {
		state.dialogFormAuth = value;
	},
};

/**
 * Instructions for working with getters
 * link https://vuex.vuejs.org/api/#getters
 */
const getters = {
	isAuthenticated: (state) => !!state.token,
	authStatus: (state) => state.status,
	dialogFormAuth: (state) => state.dialogFormAuth,
};

const state = {
	server: 'https://afternoon-falls-25894.herokuapp.com',
	token: localStorage.getItem('token') || '',
	status: '',
	hasLoadedOnce: false,
};

export default {
	// namespaced false. To make it available throughout the project without special pointers.
	namespaced: false,
	state,
	getters,
	actions,
	mutations,
};
