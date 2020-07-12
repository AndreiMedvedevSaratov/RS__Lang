/* eslint-disable no-prototype-builtins */
/** Instructions for working with actions
 * link https://vuex.vuejs.org/api/#actions
 */

const actions = {
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
				if (!state.count.includes(sayWord)) {
					state.count.push(sayWord);
					const getCorrectWord = getters.getWordsArray.find((item) => item.word === sayWord);
					if (getCorrectWord !== undefined) dispatch('APP_WORD_PROCESSING', { word: getCorrectWord, right: true, offDate: true });
				}

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
					dispatch('ALERT', { data: 'Youre win, good job! Your skill is pretty high' });
					state.gameLevel += 1;
					dispatch('APP_GET_USER_WORDS_AGGREGATED', {
						page: state.gameLevel,
						filter: {
							$or: [
								{
									userWord: { $ne: null },
								},
								{
									userWord: null,
								},
							],
						},
					}, { root: true });
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
	getSrcVideo: (state) => state.srcVideo,
	getWordsArray: (state) => state.words.map((item) => item.word.toLowerCase()),
	getImageArray: (state) => state.words.map((item) => item.image),
	gameStatus: (state) => state.gameStatus,
	gameLevel: (state) => state.gameLevel,
};

const state = {
	status: '',
	urlImage: './assets/default-english.jpg',
	srcVideo: './assets/video/first.mp4',
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
