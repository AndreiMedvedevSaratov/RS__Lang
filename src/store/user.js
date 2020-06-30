import axios from 'axios';
/** Instructions for working with actions
 * link https://vuex.vuejs.org/api/#actions
 */
const actions = {
	async USER_REQUEST({
		state, rootState, commit, dispatch,
	}, userId) {
		commit('USER_REQUEST');
		const userData = await axios.get(`${rootState.app.server}/users/${userId || state.profile.userId}`)
			.catch((error) => {
				commit('USER_ERROR');
				dispatch('ALERT', { status: 'error', data: error.response.data }, { root: true });
			});
		console.log('Получил данные пользователя', userData.data);
		commit('USER_SUCCESS', userData.data);
	},
	async USER_SIGNUP({
		state, rootState, commit, dispatch,
	}) {
		commit('USER_REQUEST');
		const user = { email: state.profile.email, password: state.profile.password };
		await axios.post(`${rootState.app.server}/users`, user)
			.then((response) => {
				commit('USER_SUCCESS', response);
				dispatch('AUTH_REQUEST', user, { root: true });
			})
			.catch((error) => {
				commit('USER_ERROR');
				dispatch('ALERT', { status: 'error', data: error.response.data }, { root: true });
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
	USER_LOGOUT: (state) => {
		state.profile = {
			userId: '',
			email: '',
			password: '',
		};
	},
	USER_ERROR: (state) => {
		state.status = 'error';
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
	isLoading: (state) => state.status === 'loading',
};

const state = {
	status: '',
	profile: {
		userId: localStorage.getItem('userId'),
		email: '',
		password: '',
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
