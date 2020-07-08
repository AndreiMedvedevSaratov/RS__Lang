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
		commit('USER_DATA', userData.data);
		commit('USER_SUCCESS');
	},

	async USER_UPDATE_EMAIL_PASSWORD({
		state, rootState, commit, dispatch,
	}) {
		const data = {
			email: state.profile.email,
			password: state.profile.password,
		};
		commit('USER_REQUEST');
		await axios.put(`${rootState.app.server}/users/${state.profile.userId}`, data)
			.then((userData) => {
				console.log('Обновил данные пользователя', userData.data);
				commit('USER_DATA', userData.data);
				commit('USER_SUCCESS');
			})
			.catch((error) => {
				commit('USER_ERROR');
				dispatch('ALERT', { status: 'error', data: error.response.data }, { root: true });
			});
	},

	async USER_DELETE({
		state, rootState, commit, dispatch,
	}) {
		commit('USER_REQUEST');
		await axios.delete(`${rootState.app.server}/users/${state.profile.userId}`)
			.catch((error) => {
				commit('USER_ERROR');
				dispatch('ALERT', { status: 'error', data: error.response.data }, { root: true });
			});

		commit('USER_LOGOUT');
		commit('USER_SUCCESS');
		dispatch('AUTH_LOGOUT', null, { root: true });
		dispatch('ALERT', { status: 'info', message: 'Your profile was successfully deleted!' }, { root: true });
	},

	async USER_SIGNUP({
		state, rootState, commit, dispatch,
	}) {
		commit('USER_REQUEST');
		const user = { email: state.profile.email, password: state.profile.password };
		await axios.post(`${rootState.app.server}/users`, user)
			.then((response) => {
				commit('USER_DATA', response);
				commit('USER_SUCCESS');
				dispatch('AUTH_REQUEST', user, { root: true });
			})
			.catch((error) => {
				commit('USER_ERROR');
				dispatch('ALERT', { status: 'error', data: error.response.data }, { root: true });
			});
	},

	/**
	 * Function for getting/updating statistics
	 *
	 * @param {object} [payload]
	 * @param {string} [payload.method=get]
	 * @example dispatch('user/USER_GET_SET_STATISTICS', { root: true })
	 */
	async USER_GET_SET_STATISTICS({
		state, rootState, commit, dispatch,
	}, payload) {
		commit('USER_REQUEST', 'loading');

		const method = payload && payload.method ? payload.method : 'get';

		await axios[method](
			`${rootState.app.server}/users/${state.profile.userId}/statistics`, (method === 'put' ? state.statistics : null),
		).then((statistics) => {
			console.log(statistics.data);
			commit('USER_STATISTICS', statistics.data);
			commit('USER_SUCCESS');
		}).catch((error) => {
			commit('USER_ERROR', 'error');
			dispatch('ALERT', {
				alert: true,
				status: 'error',
				message: `${error.response.statusText}: ${error.response.data}`,
			}, { root: true });
		});
	},

	/**
	 * Function for getting/updating settings
	 *
	 * @param {object} [payload]
	 * @param {string} [payload.method=get]
	 * @example dispatch('user/USER_GET_SET_STATISTICS', { root: true })
	 */
	async USER_GET_SET_SETTINGS({
		state, rootState, commit, dispatch,
	}, payload) {
		commit('USER_REQUEST', 'loading');

		const method = payload && payload.method ? payload.method : 'get';

		await axios[method](
			`${rootState.app.server}/users/${state.profile.userId}/settings`, (method === 'put' ? state.settings : null),
		).then((settings) => {
			console.log(settings.data);
			commit('USER_SETTINGS', settings.data);
			commit('USER_SUCCESS');
		}).catch((error) => {
			commit('USER_ERROR', 'error');
			dispatch('ALERT', {
				alert: true,
				status: 'error',
				message: `${error.response.statusText}: ${error.response.data}`,
			}, { root: true });
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
	USER_SUCCESS: (state) => {
		state.status = 'success';
	},
	USER_DATA: (state, payload) => {
		state.profile.userId = payload.id;
		state.profile.email = payload.email;
		state.profile.password = '';
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
	USER_STATISTICS: (state, statistics) => {
		state.statistics = statistics;
	},
	USER_SETTINGS: (state, settings) => {
		state.settings = settings;
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
	getStatistics: (state) => state.statistics,
	getSetting: (state) => state.settings,
};

const state = {
	status: '',
	profile: {
		userId: localStorage.getItem('userId'),
		email: '',
		password: '',
	},
	statistics: {
		learnedWords: 500,
		optional: {

		},
	},
	settings: {
		wordsPerDay: 0,
		optional: {},
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
