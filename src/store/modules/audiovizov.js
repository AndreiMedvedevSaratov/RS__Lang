/* eslint-disable no-prototype-builtins */
import axios from 'axios';
/** Instructions for working with actions
 * link https://vuex.vuejs.org/api/#actions
 */

/**
 * Замена getWordsData
 */
const actions = {
	async GET_WORDS({
		rootState, commit, dispatch,
	}, payload) {
		const words = {
			page: 0,
			group: 0,
		};
		if (payload && payload.hasOwnProperty('page')) words.page = payload.page;
		if (payload && payload.hasOwnProperty('group')) words.group = payload.group;

		commit('AUDIOVIZOV_REQUEST');

		await axios.get(`${rootState.app.server}/words?page=${words.page}&group=${words.group}`)
			.then((response) => {
				// eslint-disable-next-line no-console
				// console.log('Получил', response.data);
				commit('AUDIOVIZOV_GET_WORDS_SUCCESS', response.data);
			})
			.catch((error) => {
				commit('AUDIOVIZOV_ERROR');
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
	AUDIOVIZOV_REQUEST: (state) => {
		state.status = 'loading';
	},
	AUDIOVIZOV_GET_WORDS_SUCCESS: (state, words) => {
		state.status = 'success';
		state.words = words;
	},
	AUDIOVIZOV_SET_IMAGE_AND_AUDIO: (state, payload) => {
		// console.log('Выбрали', payload);
		state.urlImage = payload.image;
		const audio = new Audio(payload.audio);
		audio.play();
	},
	AUDIOVIZOV_ERROR: (state) => {
		state.status = 'error';
	},
};

/**
 * Instructions for working with getters
 * link https://vuex.vuejs.org/api/#getters
 */
const getters = {
	getUrlImage: (state) => state.urlImage,
	getWords: (state) => state.words,
	getUrlFiles: (state) => state.urlFiles,
};

const state = {
	status: '',
	words: [],
	urlFiles: 'https://raw.githubusercontent.com/Dream-Team-42/rslang-data/master/',
	urlImage: './assets/default-english.jpg',
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
