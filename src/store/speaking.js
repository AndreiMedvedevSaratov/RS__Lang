/* eslint-disable no-prototype-builtins */
/** Instructions for working with actions
 * link https://vuex.vuejs.org/api/#actions
 */

const actions = {

};

/**
 * Instructions for working with mutations
 * link https://vuex.vuejs.org/guide/mutations.html
 */
const mutations = {
	SPEAKING_ANSWER: (state) => {
		document.querySelector('.answer').textContent = state.answer;
	},
	SPEAKING_SPEAK: () => {
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
			recognition.onend = () => recognition.stop();
		});
		recognition.start();
	},
	SPEAKING_VIDEO: (state) => {
		const video = document.getElementById('video');
		video.addEventListener('ended', () => {
			state.videoIsEnded = true;
		});
		video.play();
	},
};

const getters = {
	getSrcVideo: (state) => state.srcVideo,
	getAnswer: (state) => state.answer,
	getVideoIsEnded: (state) => state.videoIsEnded,
};

const state = {
	status: '',
	srcVideo: './assets/video/first.mp4',
	answer: 'Yes, actually I am lost! How did you know?',
	videoIsEnded: false,
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
