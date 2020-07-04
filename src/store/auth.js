import axios from 'axios';

/** Instructions for working with actions
 * link https://vuex.vuejs.org/api/#actions
 */
const actions = {
	async AUTH_REQUEST({
		rootState, commit, dispatch,
	}) {
		commit('AUTH_REQUEST');
		const user = await axios.post(`${rootState.app.server}/signin`, {
			email: rootState.user.profile.email,
			password: rootState.user.profile.password,
		})
			.catch((err) => {
				commit('AUTH_ERROR', err.response);
				dispatch('ALERT', { status: 'error', data: err.response.data });
			});
		if (!user.data) return;

		axios.defaults.headers.common = { Authorization: `Bearer ${user.data.token}` };
		dispatch('user/USER_REQUEST', user.data.userId, { root: true });
		commit('AUTH_SUCCESS', user.data);
	},
	async AUTH_REFRESH_TOKEN({
		state, rootState, commit, dispatch,
	}) {
		commit('AUTH_REQUEST');

		await axios.get(`${rootState.app.server}/users/${rootState.user.profile.userId}/tokens`, {
			headers: {
				Authorization: `Bearer ${state.refreshToken}`,
			},
		})
			.then((user) => {
				console.log(user.data);
				console.log('new Token === old RefreshToken', user.data.token === state.refreshToken);
				// commit('AUTH_SUCCESS', user.data);
			})
			.catch((err) => {
				// commit('AUTH_ERROR', err.response);
				dispatch('ALERT', { status: 'error', data: err.response.data });
			});

		// if (!user.data) return;

		// axios.defaults.headers.common = { Authorization: `Bearer ${user.data.token}` };
		// dispatch('user/USER_REQUEST', user.data.userId, { root: true });
	},
	AUTH_LOGOUT({ commit }) {
		return new Promise(((resolve) => {
			commit('AUTH_LOGOUT');
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
	AUTH_SUCCESS: (state, user) => {
		state.status = 'success';
		state.token = user.token;
		state.refreshToken = user.refreshToken;
		localStorage.setItem('token', user.token);
		localStorage.setItem('refreshToken', user.refreshToken);
		localStorage.setItem('userId', user.userId);
	},
	AUTH_ERROR: (state) => {
		state.status = 'error';
		localStorage.removeItem('token');
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('userId');
	},
	AUTH_LOGOUT: (state) => {
		state.token = '';
		state.refreshToken = '';
		localStorage.removeItem('userId');
		localStorage.removeItem('token');
		localStorage.removeItem('refreshToken');
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
	refreshToken: localStorage.getItem('refreshToken') || '',
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
