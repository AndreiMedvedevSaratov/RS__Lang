/* eslint-disable no-console */
/* eslint-disable no-prototype-builtins */
import Vue from 'vue';
import axios from 'axios';

/** Instructions for working with actions
 * link https://vuex.vuejs.org/api/#actions
 */
const actions = {
	/** Function notification ALERT
	 * Parameters: error, warning, info, default
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

	/** Function get words
	 * Parameters: page, group
	 *
	 * Call in all modules
	 * dispatch('APP_GET_WORDS', { page: 'page', group: 'group' }, { root: true })
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
	},

	/** Function creates statistics for a word by its ID
	 * Parameters: wordId, wordStat
	 *
	 * Call in all modules
	 * dispatch('APP_CREATE_USER_WORD_STAT',
	  { wordStat: 'wordStat', wordStat: 'wordStat' }, { root: true })
	 */
	async APP_CREATE_USER_WORD_STAT({
		rootState, commit, dispatch,
	}, payload) {
		commit('APP_STATUS', 'loading');

		const wordData = await axios.post(`${rootState.app.server}/users/${rootState.app.profile.userId}/words/${payload.wordId}`, payload.wordStat)
			.catch((error) => {
				commit('APP_STATUS', 'error');
				dispatch('ALERT', {
					alert: true,
					status: 'error',
					message: `${error.response.statusText}: ${error.response.data}`,
				});
			});
		console.log('Создал', wordData.data);
		commit('APP_CREATE_USER_WORD_STAT', wordData.data);
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
	APP_CREATE_USER_WORD_STAT: (state, word) => {
		state.wordStat = word;
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
	isHtml: (state) => state.html,
};

const state = {
	server: 'https://afternoon-falls-25894.herokuapp.com',
	html: {
		main: {
			drawer: true,
		},
	},

	words: [],
	wordStat: {},
};

export default {
	// namespaced false. To make it available throughout the project without special pointers.
	namespaced: false,
	state,
	getters,
	actions,
	mutations,
};
