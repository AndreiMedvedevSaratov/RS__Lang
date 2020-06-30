/* eslint-disable no-console */
/* eslint-disable no-prototype-builtins */
import Vue from 'vue';
import axios from 'axios';

/** Instructions for working with actions
 * link https://vuex.vuejs.org/api/#actions
 */
const actions = {
	/** Notification function
	 * Parameters: error, warning, info, default
	 *
	 * Call in all modules
	 * dispatch('ALERT', { status: String, data: Object/String }, { root: true })
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
			if (typeof payload.data === 'string' || payload.message) text = payload.data || payload.message;
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

	/** Function gets words
	 * Parameters: page, group
	 *
	 * Call in all modules
	 * dispatch('APP_GET_WORDS', { page: Number, group: Number }, { root: true })
	 */
	async APP_GET_WORDS({
		rootState, commit, dispatch,
	}, payload) {
		const words = {
			page: 0,
			group: 0,
		};
		if (payload && payload.hasOwnProperty('page')) words.page = payload.page;
		if (payload && payload.hasOwnProperty('group')) words.group = payload.group;

		commit('APP_STATUS', 'loading');

		const wordsData = await axios.get(`${rootState.app.server}/words?page=${words.page}&group=${words.group}`)
			.catch((error) => {
				commit('APP_STATUS', 'error');
				dispatch('ALERT', {
					alert: true,
					status: 'error',
					message: `${error.response.statusText}: ${error.response.data}`,
				});
			});
		console.log('Get words', wordsData.data);
		commit('APP_GET_WORDS', wordsData.data);

		commit('APP_STATUS', 'success');
	},

	/** This function creates / updates statistics for a word based on its ID
	 * Parameters: method <optional>, wordId, wordStat
	 *
	 * method - 'post' <default, create>, 'put' <update>
	 *
	 * Call in all modules
	 * dispatch('APP_SET_USER_WORD_STAT',
	  { method: String, wordId: String, wordStat: Object }, { root: true })
	 */
	async APP_SET_USER_WORD_STAT({
		rootState, commit, dispatch,
	}, payload) {
		commit('APP_STATUS', 'loading');

		const wordData = await axios[payload.method || 'post'](
			`${rootState.app.server}/users/${rootState.user.profile.userId}/words/${payload.wordId}`,
			payload.wordStat,
		)
			.catch((error) => {
				commit('APP_STATUS', 'error');
				dispatch('ALERT', {
					alert: true,
					status: 'error',
					message: `${error.response.statusText}: ${error.response.data}`,
				});
			});
		console.log(`${payload.method === 'put' ? 'Обновил' : 'Создал'} статистику по слову`, wordData.data);
		commit('APP_SET_USER_WORD_STAT', wordData.data);

		commit('APP_STATUS', 'success');
	},

	/** The function gets statistics for a word via its ID or for all words saved on the user.
	 * Parameters: wordId <optional>
	 *
	 * Call in all modules
	 * dispatch('APP_GET_USER_WORD_STAT', wordId: String || null, { root: true })
	 */
	async APP_GET_USER_WORD_STAT({
		rootState, commit, dispatch,
	}, wordId) {
		commit('APP_STATUS', 'loading');

		const wordData = await axios.get(
			`${rootState.app.server}/users/${rootState.user.profile.userId}/words/${wordId || ''}`,
		)
			.catch((error) => {
				commit('APP_STATUS', 'error');
				dispatch('ALERT', {
					alert: true,
					status: 'error',
					message: `${error.response.statusText}: ${error.response.data}`,
				});
			});
		console.log('Получил статистику по слову(-ам)', wordData.data);
		commit('APP_SET_USER_WORD_STAT', wordData.data);

		commit('APP_STATUS', 'success');
	},

	/** The function deletes statistics for a word via its ID
	 * Parameters: wordId
	 *
	 * Call in all modules
	 * dispatch('APP_DELETE_USER_WORD_STAT', wordId: String, { root: true })
	 */
	async APP_DELETE_USER_WORD_STAT({
		rootState, commit, dispatch,
	}, wordId) {
		commit('APP_STATUS', 'loading');

		await axios.delete(
			`${rootState.app.server}/users/${rootState.user.profile.userId}/words/${wordId}`,
		)
			.catch((error) => {
				commit('APP_STATUS', 'error');
				dispatch('ALERT', {
					alert: true,
					status: 'error',
					message: `${error.response.statusText}: ${error.response.data}`,
				});
			});
		console.log(`Удалил статистику по слову с ID ${wordId}`);
		commit('APP_DELETE_USER_WORD_STAT');

		commit('APP_STATUS', 'success');
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
	APP_GET_WORDS: (state, words) => {
		state.words = words;
	},
	APP_SET_USER_WORD_STAT: (state, word) => {
		state.wordStat = word;
	},
	APP_DELETE_USER_WORD_STAT: (state) => {
		state.wordStat = [];
	},
	APP_STATUS: (state, status) => {
		if (status === 'loading' || status === 'success') {
			state.status = status;
		} else state.status = 'error';
	},
};
/**
 * Instructions for working with getters
 * link https://vuex.vuejs.org/api/#getters
 */
const getters = {
	getHtmlParameters: (state) => state.html,
	getWords: (state) => state.words,
	getWordStat: (state) => state.wordStat,
	getStatusLoadWithIcon: (state) => {
		const { status } = state;
		const loading = status === 'loading';
		const icon = status === 'success' ? 'mdi-check-circle' : 'mdi-close-circle';
		const message = status === 'success' ? "It's okay" : 'An error occurred';

		return {
			status, loading, message, icon,
		};
	},
};

const state = {
	status: 'success',
	server: 'https://afternoon-falls-25894.herokuapp.com',
	html: {
		main: {
			drawer: true,
		},
	},

	words: [],
	wordStat: [],
};

export default {
	// namespaced false. To make it available throughout the project without special pointers.
	namespaced: false,
	state,
	getters,
	actions,
	mutations,
};
