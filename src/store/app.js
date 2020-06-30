import Vue from 'vue';
// import axios from 'axios';

/** Instructions for working with actions
 * link https://vuex.vuejs.org/api/#actions
 */
const actions = {
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
};

/**
 * Instructions for working with mutations
 * link https://vuex.vuejs.org/guide/mutations.html
 */
const mutations = {
	EDIT_HTML: (state, payload) => {
		state.html[payload.one][payload.key] = payload.value;
	},
};

/**
 * Instructions for working with getters
 * link https://vuex.vuejs.org/api/#getters
 */
const getters = {
	isHtml: (state) => state.html,
};

const state = {
	server: 'https://afternoon-falls-25894.herokuapp.com',
	html: {
		main: {
			drawer: true,
		},
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
