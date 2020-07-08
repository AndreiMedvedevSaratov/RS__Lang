/* eslint-disable no-prototype-builtins */
import axios from 'axios';
/** Instructions for working with actions
 * link https://vuex.vuejs.org/api/#actions
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

		commit('SPEAKIT_REQUEST');

		await axios.get(`${rootState.app.server}/words?page=${words.page}&group=${words.group}`)
			.then((response) => {
				commit('SPEAKIT_GET_WORDS_SUCCESS', response.data);
			})
			.catch((error) => {
				commit('SPEAKIT_ERROR');
				dispatch('ALERT', {
					alert: true,
					status: 'error',
					message: `${error.response.statusText}: ${error.response.data}`,
				}, { root: true });
			});
	},
	SPEAKIT_SPEAK: ({ state, getters, dispatch }) => {
		state.gameStatus = true;
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		const recognition = new SpeechRecognition();
		recognition.lang = 'en-US';
		recognition.continuos = false;
		recognition.interimResults = false;
		recognition.maxAlternatives = 1;
		recognition.onerror = (event) => {
			console.log(`It's error! ${event.error}`);
		};
		recognition.onend = () => recognition.start();

		recognition.addEventListener('result', (event) => {
			const last = event.results.length - 1;
			const sayWord = event.results[last][0].transcript.toLowerCase();
			const p = document.querySelector('.speech');
			p.textContent = sayWord;

			if (getters.getWordsArray.includes(sayWord)) {
				document.querySelector('.main__image').src = `${state.urlFiles}${getters.getImageArray[getters.getWordsArray.indexOf(sayWord)]}`;
				document.getElementById(sayWord).style.opacity = '0.5';
				if (!state.count.includes(sayWord)) { state.count.push(sayWord); }

				if (state.count.length === 20) {
					const cards = document.querySelectorAll('.card');
					for (let i = 0; i < cards.length; i += 1) {
						cards[i].style.opacity = '';
					}
					// document.querySelectorAll('.card').forEach((item) => {
					// 	// eslint-disable-next-line no-param-reassign
					// 	item.style.opacity = '1';
					// 	return item;
					// });
					alert('youre win, good job! Your skill is pretty high');
					state.gameLevel += 1;
					dispatch('speakit/GET_WORDS', { page: state.gameLevel }, { root: true });
					recognition.onend = () => recognition.stop();
					state.count.length = 0;
				}
			}
		});
		recognition.start();
	},
};

/**
 * Instructions for working with mutations
 * link https://vuex.vuejs.org/guide/mutations.html
 */
const mutations = {
	SPEAKIT_REQUEST: (state) => {
		state.status = 'loading';
	},
	SPEAKIT_GET_WORDS_SUCCESS: (state, words) => {
		state.status = 'success';
		state.words = words;
	},
	SPEAKIT_SET_IMAGE_AND_AUDIO: (state, payload) => {
		console.log('Выбрали', payload);
		state.urlImage = payload.image;
		const audio = new Audio(payload.audio);
		audio.play();
	},
	SPEAKIT_ERROR: (state) => {
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
	getWordsArray: (state) => state.words.map((item) => item.word.toLowerCase()),
	getImageArray: (state) => state.words.map((item) => item.image),
	gameStatus: (state) => state.gameStatus,
	gameLevel: (state) => state.gameLevel,
};

const state = {
	status: '',
	words: [],
	urlFiles: 'https://raw.githubusercontent.com/Dream-Team-42/rslang-data/master/',
	urlImage: './assets/default-english.jpg',
	count: [],
	gameStatus: false,
	gameLevel: 0,
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
