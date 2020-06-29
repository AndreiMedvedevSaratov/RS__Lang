/* eslint-disable no-prototype-builtins */
import axios from 'axios';
/** Instructions for working with actions
 * link https://vuex.vuejs.org/api/#actions
 */

/**
 * Замена getWordsData
 */
// eslint-disable-next-line arrow-parens, no-var, vars-on-top
var wordsArray;
// eslint-disable-next-line arrow-parens, no-var, vars-on-top
var imageArray;
// eslint-disable-next-line arrow-parens, no-var, vars-on-top
var count = [];

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
				// eslint-disable-next-line no-console
				console.log('Получил', response.data);
				response.data.map((item) => {
					// eslint-disable-next-line no-param-reassign
					item.word = item.word.toLowerCase();
					return item;
				});
				// eslint-disable-next-line arrow-parens, no-var, vars-on-top
				wordsArray = response.data.map(item => item.word);
				// eslint-disable-next-line arrow-parens, no-var, vars-on-top
				imageArray = response.data.map(item => item.image);
				// eslint-disable-next-line no-console
				console.dir('wordsArray', wordsArray);
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
	SPEAKIT_SPEAK: ({ state, dispatch }) => {
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

		recognition.onresult = (event) => {
			const last = event.results.length - 1;
			// eslint-disable-next-line no-undef
			console.dir(event.results);
			const sayWord = event.results[last][0].transcript.toLowerCase();
			const p = document.querySelector('.speech');
			p.textContent = sayWord;
			// eslint-disable-next-line no-undef
			// eslint-disable-next-line no-console
			console.log(wordsArray, sayWord, wordsArray.includes(sayWord));

			if (wordsArray.includes(sayWord)) {
				document.querySelector('.main__image').src = `${state.urlFiles}${imageArray[wordsArray.indexOf(sayWord)]}`;
				// eslint-disable-next-line prefer-destructuring
				document.getElementById(sayWord).style.opacity = '0.5';
				if (!count.includes(sayWord)) { count.push(sayWord); }

				// eslint-disable-next-line no-console
				console.log(count);
				// eslint-disable-next-line no-alert
				if (count.length === 20) {
					document.querySelectorAll('.card').forEach((item) => {
						// eslint-disable-next-line no-param-reassign
						item.style.opacity = '1';
						return item;
					});
					alert('youre win, good job! Your skill is pretty high');
					dispatch('speakit/GET_WORDS', { page: 2 }, { root: true });
				}
			}
		};
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
