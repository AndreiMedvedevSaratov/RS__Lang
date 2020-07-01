/* eslint-disable no-console */
/* eslint-disable no-prototype-builtins */
import Vue from 'vue';
import axios from 'axios';

/** Instructions for working with actions
 * link https://vuex.vuejs.org/api/#actions
 */
const actions = {
	/**
	 * Notification function
	 *
	 * @param {object} payload
	 * @param {string} [payload.status='default'] - error, warning, info, default
	 * @param {(object|string)} payload.data
	 * @param {string} [payload.message]
	 * @example dispatch('ALERT', { status: error, data: {Object} || text }, { root: true })
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

	/**
	 * Function gets words
	 *
	 * @param {object} [payload]
	 * @param {number} [payload.page=0]
	 * @param {number} [payload.group=0]
	 * @param {number} [payload.wordsPerExampleSentenceLTE]
	 * @param {number} [payload.wordsPerPage]
	 * @example dispatch('APP_GET_WORDS', { page: 1, group: 1 }, { root: true })
	 */
	async APP_GET_WORDS({
		rootState, commit, dispatch,
	}, payload) {
		const words = {
			page: 0,
			group: 0,
			wordsPerExampleSentenceLTE: '',
			wordsPerPage: '',
		};
		if (payload && payload.hasOwnProperty('page')) words.page = payload.page;
		if (payload && payload.hasOwnProperty('group')) words.group = payload.group;
		if (payload && payload.hasOwnProperty('wordsPerExampleSentenceLTE')) words.wordsPerExampleSentenceLTE = payload.wordsPerExampleSentenceLTE;
		if (payload && payload.hasOwnProperty('wordsPerExampleSentenceLTE') && payload.hasOwnProperty('wordsPerPage')) words.wordsPerPage = payload.wordsPerPage;

		commit('APP_STATUS', 'loading');

		const wordsData = await axios.get(
			`${rootState.app.server}/words?page=${words.page}&group=${words.group}&wordsPerExampleSentenceLTE=${words.wordsPerExampleSentenceLTE}&wordsPerPage=${words.wordsPerPage}`,
		)
			.catch((error) => {
				commit('APP_STATUS', 'error');
				dispatch('ALERT', {
					alert: true,
					status: 'error',
					message: `${error.response.statusText}: ${error.response.data}`,
				});
			});
		if (wordsData) {
			console.log('Get words', wordsData.data);
			commit('APP_GET_WORDS', wordsData.data);
		}

		commit('APP_STATUS', 'success');
	},

	/**
	 * Function gets count words in group
	 *
	 * @param {object} [payload]
	 * @param {number} [payload.group=0]
	 * @param {number} [payload.wordsPerExampleSentenceLTE]
	 * @param {number} [payload.wordsPerPage]
	 * @example dispatch('APP_GET_WORDS', { page: 1, group: 1 }, { root: true })
	 */
	async APP_GET_COUNT_WORDS_IN_GROUP({
		rootState, commit, dispatch,
	}, payload) {
		const words = {
			group: 0,
		};
		if (payload && payload.hasOwnProperty('group')) words.group = payload.group;
		if (payload && payload.hasOwnProperty('wordsPerExampleSentenceLTE')) words.wordsPerExampleSentenceLTE = payload.wordsPerExampleSentenceLTE;
		if (payload && payload.hasOwnProperty('wordsPerExampleSentenceLTE') && payload.hasOwnProperty('wordsPerPage')) words.wordsPerPage = payload.wordsPerPage;

		commit('APP_STATUS', 'loading');

		const wordsData = await axios.get(
			`${rootState.app.server}/words/count?&group=${words.group}&wordsPerExampleSentenceLTE=${words.wordsPerExampleSentenceLTE || ''}&wordsPerPage=${words.wordsPerPage || ''}`,
		)
			.catch((error) => {
				commit('APP_STATUS', 'error');
				dispatch('ALERT', {
					alert: true,
					status: 'error',
					message: `${error.response.statusText}: ${error.response.data}`,
				});
			});
		if (wordsData) {
			console.log('Get count words', wordsData.data);
			commit('APP_GET_COUNT_WORDS_IN_GROUP', wordsData.data);
		}

		commit('APP_STATUS', 'success');
	},

	/**
	 * Function gets word
	 *
	 * @param {string} wordId
	 * @example dispatch('APP_GET_WORDS', wordId, { root: true })
	 */
	async APP_GET_WORD({
		rootState, commit, dispatch,
	}, wordId) {
		commit('APP_STATUS', 'loading');

		const wordsData = await axios.get(
			`${rootState.app.server}/words/${wordId}`,
		)
			.catch((error) => {
				commit('APP_STATUS', 'error');
				dispatch('ALERT', {
					alert: true,
					status: 'error',
					message: `${error.response.statusText}: ${error.response.data}`,
				});
			});
		if (wordsData) {
			console.log('Get word', wordsData.data);
			commit('APP_GET_WORD', wordsData.data);
		}

		commit('APP_STATUS', 'success');
	},

	/**
	 * This function creates / updates statistics for a word based on its ID
	 *
	 * @param {object} payload
	 * @param {number} payload.wordId
	 * @param {number} payload.wordStat
	 * @param {number} [payload.method='post'] - 'post' <default, create>, 'put' <update>
	 * @example dispatch('APP_SET_USER_WORD_STAT',
	 *				{ wordId: String, wordStat: {Object} }, { root: true })
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
		if (wordData) {
			console.log(`${payload.method === 'put' ? 'Обновил' : 'Создал'} статистику по слову`, wordData.data);
			commit('APP_SET_USER_WORD_STAT', wordData.data);
		}

		commit('APP_STATUS', 'success');
	},

	/**
	 * The function gets statistics for a word via its ID or for all words saved on the user.
	 *
	 * @param {number} [wordId]
	 * @example dispatch('APP_GET_USER_WORD_STAT', wordId: String || null, { root: true })
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
		if (wordData.data.length > 0) {
			console.log('Получил статистику по слову(-ам)', wordData.data);
			commit('APP_GET_USER_WORD_STAT', wordData.data);
		}

		commit('APP_STATUS', 'success');
	},

	/**
	 * The function deletes statistics for a word via its ID
	 *
	 * @param {number} wordId
	 * @example dispatch('APP_DELETE_USER_WORD_STAT', wordId: String, { root: true })
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
		commit('APP_DELETE_USER_WORD_STAT', wordId);

		commit('APP_STATUS', 'success');
	},

	/**
	 * This function gets all user aggregated words
	 *
	 * @param {object} payload
	 * @param {number} [payload.group=0]
	 * @param {number} [payload.wordsPerPage]
	 * @param {number} payload.filter
	 * @example dispatch('APP_GET_USER_WORDS_AGGREGATED',
	 *				{ filter: JSON.stringify({ userWord: null }), { root: true })
	 */
	async APP_GET_USER_WORDS_AGGREGATED({
		rootState, commit, dispatch,
	}, payload) {
		commit('APP_STATUS', 'loading');
		const words = {
			group: 0,
			wordsPerPage: '',
			filter: '',
		};

		if (payload && payload.hasOwnProperty('wordsPerPage')) words.wordsPerPage = payload.wordsPerPage;
		if (payload && payload.hasOwnProperty('group')) words.group = payload.group;
		if (payload && payload.hasOwnProperty('filter')) words.filter = JSON.stringify(payload.filter);

		const wordData = await axios.get(
			`${rootState.app.server}/users/${rootState.user.profile.userId}/aggregatedWords?group=${words.group}&wordsPerPage=${words.wordsPerPage}&filter=${words.filter}`,
		)
			.catch((error) => {
				commit('APP_STATUS', 'error');
				dispatch('ALERT', {
					alert: true,
					status: 'error',
					message: `${error.response.statusText}: ${error.response.data}`,
				});
			});
		console.log('aggregatedWords', wordData.data);
		// if (wordData.data.length > 0) {
		// 	console.log('Получил статистику по слову(-ам)', wordData.data);
		// 	commit('APP_GET_USER_WORD_STAT', wordData.data);
		// }

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
		state.countWords = state.words.length;
	},
	APP_GET_WORD: (state, word) => {
		state.words = [];
		state.words.push(word);
		state.countWords = state.words.length;
	},
	APP_GET_COUNT_WORDS_IN_GROUP: (state, data) => {
		state.countWords = data.count;
	},
	APP_GET_USER_WORD_STAT: (state, words) => {
		if (words.length > 1) {
			state.wordStat = words;
			return;
		}
		state.wordStat.push(words);
	},
	APP_SET_USER_WORD_STAT: (state, word) => {
		const ind = state.wordStat.indexOf(word.wordId);
		if (!ind === -1) return state.wordStat.push(word);
		return state.wordStat.splice(ind, 1);
	},
	APP_DELETE_USER_WORD_STAT: (state, wordId) => {
		state.wordStat.splice(state.wordStat.indexOf(wordId), 1);
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
	getCountWords: (state) => state.countWords,
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
	countWords: [],
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
