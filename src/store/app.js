/* eslint-disable no-underscore-dangle */
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
			console.log('APP_GET_WORDS', wordsData.data);
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

		await axios.get(
			`${rootState.app.server}/words/count?&group=${words.group}&wordsPerExampleSentenceLTE=${words.wordsPerExampleSentenceLTE || ''}&wordsPerPage=${words.wordsPerPage || ''}`,
		).then((wordsData) => {
			console.log('Get count words', wordsData.data);
			commit('APP_GET_COUNT_WORDS_IN_GROUP', wordsData.data);
			commit('APP_STATUS', 'success');
		})
			.catch((error) => {
				commit('APP_STATUS', 'error');
				dispatch('ALERT', {
					alert: true,
					status: 'error',
					message: `${error.response.statusText}: ${error.response.data}`,
				});
			});
	},

	/**
	 * Function gets word
	 *
	 * @param {object} payload
	 * @param {string} payload.wordId
	 * @param {string} [payload.noAssets=true]
	 * @example dispatch('APP_GET_WORDS', {payload.wordId}, { root: true })
	 */
	async APP_GET_WORD({
		rootState, commit, dispatch,
	}, payload) {
		commit('APP_STATUS', 'loading');

		await axios.get(
			`${rootState.app.server}/words/${payload.wordId}?noAssets=${payload.noAssets || 'true'}`,
		).then((wordsData) => {
			console.log('Get word', wordsData.data);
			commit('APP_GET_WORD', wordsData.data);
			commit('APP_STATUS', 'success');
		}).catch((error) => {
			commit('APP_STATUS', 'error');
			dispatch('ALERT', {
				alert: true,
				status: 'error',
				message: `${error.response.statusText}: ${error.response.data}`,
			});
		});
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

		await axios[payload.method || 'post'](
			`${rootState.app.server}/users/${rootState.user.profile.userId}/words/${payload.wordId}`,
			payload.wordStat,
		).then((wordData) => {
			console.log(`${payload.method === 'put' ? 'Обновил' : 'Создал'} статистику по слову`, wordData.data);
			commit('APP_SET_USER_WORD_STAT', wordData.data);
			commit('APP_STATUS', 'success');
		}).catch((error) => {
			commit('APP_STATUS', 'error');
			dispatch('ALERT', {
				alert: true,
				status: 'error',
				message: `${error.response.statusText}: ${error.response.data}`,
			});
		});
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

		await axios.get(
			`${rootState.app.server}/users/${rootState.user.profile.userId}/words/${wordId || ''}`,
		).then((wordData) => {
			console.log('Получил статистику по слову(-ам)', wordData.data);
			commit('APP_GET_USER_WORD_STAT', wordData.data);
			commit('APP_STATUS', 'success');
		})
			.catch((error) => {
				commit('APP_STATUS', 'error');
				dispatch('ALERT', {
					alert: true,
					status: 'error',
					message: `${error.response.statusText}: ${error.response.data}`,
				});
			});
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

		const res = await axios.delete(
			`${rootState.app.server}/users/${rootState.user.profile.userId}/words/${wordId}`,
		).catch((error) => {
			commit('APP_STATUS', 'error');
			dispatch('ALERT', {
				alert: true,
				status: 'error',
				message: `${error.response.statusText}: ${error.response.data}`,
			});
		});
		console.log(`Удалил статистику по слову с ID ${wordId}`, res);
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
			page: '',
			wordsPerPage: '',
			filter: '',
		};

		if (payload && payload.hasOwnProperty('wordsPerPage')) words.wordsPerPage = payload.wordsPerPage;
		if (payload && payload.hasOwnProperty('group')) words.group = payload.group;
		if (payload && payload.hasOwnProperty('page')) words.page = payload.page;
		if (payload && payload.hasOwnProperty('filter')) words.filter = JSON.stringify(payload.filter);

		await axios.get(
			`${rootState.app.server}/users/${rootState.user.profile.userId}/aggregatedWords?group=${words.group}&page=${words.page}&wordsPerPage=${words.wordsPerPage}&filter=${words.filter}`,
		).then((wordsData) => {
			commit('APP_GET_WORDS', wordsData.data[0].paginatedResults);
			if (wordsData.data[0].paginatedResults.length > 0) {
				commit('APP_GET_WORDS_COUNT', wordsData.data[0].totalCount[0].count);
			} else commit('APP_GET_WORDS_COUNT', 0);
			console.log('aggregatedWords', wordsData.data[0]);

			commit('APP_STATUS', 'success');
		}).catch((error) => {
			commit('APP_STATUS', 'error');
			dispatch('ALERT', {
				alert: true,
				status: 'error',
				message: `${error.response.statusText}: ${error.response.data}`,
			});
		});
	},

	/**
	 * This function gets one user aggregated word
	 *
	 * @param {string} wordId
	 * @example dispatch('APP_GET_USER_WORD_AGGREGATED', wordId, { root: true })
	 */
	async APP_GET_USER_WORD_AGGREGATED({
		rootState, commit, dispatch,
	}, wordId) {
		commit('APP_STATUS', 'loading');

		await axios.get(
			`${rootState.app.server}/users/${rootState.user.profile.userId}/aggregatedWords/${wordId}`,
		).then((word) => {
			commit('APP_GET_WORD', word.data[0]);
			console.log('aggregatedWord', word.data[0]);

			commit('APP_STATUS', 'success');
		}).catch((error) => {
			commit('APP_STATUS', 'error');
			dispatch('ALERT', {
				alert: true,
				status: 'error',
				message: `${error.response.statusText}: ${error.response.data}`,
			});
		});
	},

	/**
	 * Function for creating / updating and saving word statistics
	 *
	 * @param {object} payload
	 * @param {object} payload.word
	 * @param {boolean} payload.right
	 * @param {boolean} [payload.offDate=false]
	 * @example dispatch('APP_WORD_PROCESSING', { word, right }, { root: true })
	 */
	async APP_WORD_PROCESSING({
		state, commit, dispatch,
	}, payload) {
		commit('STATISTIC_WORD', payload.word);
		commit('RIGHT_CHOICE_WORD', payload.right);
		if (!payload.offDate) commit('NEXT_TRAIN_TIME');
		await dispatch('APP_SET_USER_WORD_STAT', {
			method: state.wordHasStat ? 'put' : 'post',
			wordId: payload.word._id,
			wordStat: state.wordStat,
		});
	},
};

/**
 * Instructions for working with mutations
 * link https://vuex.vuejs.org/guide/mutations.html
 */
const mutations = {
	EDIT_HTML: (state, payload) => {
		payload.forEach((item) => {
			state.html[item.one][item.key] = item.value;
		});
	},
	APP_GET_WORDS: (state, words) => {
		state.words = words;
	},
	APP_GET_WORDS_COUNT: (state, count) => {
		state.countWords = count;
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
			state.wordsStat = words;
			return;
		}
		state.wordsStat.push(words);
	},
	APP_SET_USER_WORD_STAT: (state, word) => {
		const ind = state.wordsStat.indexOf(word.wordId);
		if (!ind === -1) return state.wordsStat.push(word);
		return state.wordsStat.splice(ind, 1);
	},
	APP_DELETE_USER_WORD_STAT: (state, wordId) => {
		// TODO: Что то тут не так, удаляет не то
		state.wordsStat.splice(state.wordsStat.indexOf(wordId), 1);
	},
	APP_STATUS: (state, status) => {
		if (status === 'loading' || status === 'success') {
			state.status = status;
		} else state.status = 'error';
	},
	APP_SHOW_SETTING: (state) => {
		state.showSetting = !state.showSetting;
	},
	SHOW_SHORT_STATISTICS: (state) => {
		state.showShortStatistics = !state.showShortStatistics;
	},
	SHOW_ALERT: (state) => {
		state.showAlert = !state.showAlert;
	},
	STATISTIC_WORD: (state, word) => {
		if (word.userWord && (word.userWord.optional || word.userWord.difficulty)) {
			state.wordHasStat = true;
			const { optional } = word.userWord;
			state.wordStat.optional = {
				name: word.word,
				learnGroup: optional.learnGroup || 1,
				isDelete: optional.isDelete || false,
				allRepeats: optional.allRepeats || 0,
				successRepeats: optional.successRepeats || 0,
				previousTrain: optional.previousTrain || new Date(),
				nextTrain: optional.nextTrain || new Date(),
			};
		} else {
			state.wordHasStat = false;
			state.wordStat = {
				optional: {
					name: word.word,
					learnGroup: 1,
					isDelete: false,
					allRepeats: 0,
					successRepeats: 0,
					previousTrain: new Date(),
					nextTrain: new Date(),
				},
			};
		}
	},
	RIGHT_CHOICE_WORD: (state, right) => {
		const minLearnLevel = 0;
		const maxLearnLevel = 5;
		const { optional } = state.wordStat;
		if (right) {
			optional.learnGroup = optional.learnGroup < maxLearnLevel
				? optional.learnGroup += 1
				: maxLearnLevel;
			optional.successRepeats += 1;
		} else {
			optional.learnGroup = optional.learnGroup > minLearnLevel
				? optional.learnGroup -= 1
				: minLearnLevel;
		}
		optional.allRepeats += 1;
	},
	NEXT_TRAIN_TIME: (state) => {
		const { optional } = state.wordStat;
		const breakInDays = [0, 1, 2, 7, 18];
		const formDate = (dateD) => dateD.toJSON().replace(/T.+/, '');
		const date = new Date();
		optional.previousTrain = formDate(date);

		switch (optional.learnGroup) {
		case 1:
			date.setDate(date.getDate() + breakInDays[0]);
			break;
		case 2:
			date.setDate(date.getDate() + breakInDays[1]);
			break;
		case 3:
			date.setDate(date.getDate() + breakInDays[2]);
			break;
		case 4:
			date.setDate(date.getDate() + breakInDays[3]);
			break;
		case 5:
			date.setDate(date.getDate() + breakInDays[4]);
			break;
		default:
		}
		optional.nextTrain = formDate(date);
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
	getWordsStat: (state) => state.wordsStat,
	getStatusLoadWithIcon: (state) => {
		const { status } = state;
		const loading = status === 'loading';
		const icon = status === 'success' ? 'mdi-check-circle' : 'mdi-close-circle';
		const message = status === 'success' ? "It's okay" : 'An error occurred';

		return {
			status, loading, message, icon,
		};
	},
	getServerUrl: (state) => state.server,
	getUrlFiles: (state) => state.urlFiles,
	getUrlImage: (state) => state.urlImage,
	showShortStatistics: (state) => state.showShortStatistics,
	showAlert: (state) => state.showAlert,
	showSetting: (state) => state.showSetting,
};

const state = {
	status: 'success',
	server: 'https://afternoon-falls-25894.herokuapp.com',
	// urlFiles: 'https://kagafon-rslang-data.netlify.app/',
	urlFiles: 'https://raw.githubusercontent.com/Dream-Team-42/rslang-data/master/',
	urlImage: './assets/default-english.jpg',
	html: {
		main: {
			drawer: true,
			background: '',
			breadcrumbs: true,
		},
		app: {
			background: 'grey lighten-5',
			colorWhite: false,
		},
	},

	words: [],
	countWords: 0,
	wordsStat: [],
	wordStat: {
		optional: {
			name: '',
			learnGroup: 1,
			isDelete: false,
			allRepeats: 0,
			successRepeats: 0,
			previousTrain: '',
			nextTrain: '',
		},
	},
	wordHasStat: false,

	showShortStatistics: false,
	showAlert: false,
	showSetting: false,
};

export default {
	// namespaced false. To make it available throughout the project without special pointers.
	namespaced: false,
	state,
	getters,
	actions,
	mutations,
};
