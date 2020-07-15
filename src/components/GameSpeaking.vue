<template lang="pug">
	div( class="game" )

		v-row( class="main" )
			v-col
				video(
					class="main__image"
					ref="video"
				)
					source(
						ref="src"
						:src="`./assets/video/${this.step}.mp4`"
						type="video/mp4"
					)
				v-btn(
					@click="video()"
					tile
					block
				) Начать разговор

			v-col(
				class="indigo lighten-4"
				ref="chat"
			) Чат
				div(
					class="amber darken-4"
					ref="answer"
				)
				p(
					class=''
					ref="speech"
				)
		div( class="main" )
			video(
				class="video"
				controls
				id="video"
				)
				source(
					:src="myVideosForGame[step]"
					type="video/mp4"
					)
			div(
				class="answer"
			)
			input(
				type="button"
				value="Speaking"
				@click="video()"
				id="btn"
				)
			p(
				class='speech'
				)
			div( v-if="loading"
				class="load" ) Loading... please wait...
				v-progress-linear(
					indeterminate
					rounded
					color="blue darken-2"
					)
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	name: 'Speaking',
	components: {},
	props: [],
	data: () => ({
		step: 0,
		status: '',
		isAnswer: ['Yes, actually I am lost! How did you know?', '1', '2', '3'],
		videoIsEnded: false,
		count_error: 0,
		recognition: '',
		loading: false,
	}),
	computed: {
		...mapGetters({
			words: 'getWords',
			urlFiles: 'getUrlFiles',
			getShortStatistics: 'showShortStatistics',
		}),
	},
	watch: {
		// videoIsEnded() {
		// 	this.speak();
		// 	this.answer();
		// 	this.videoIsEnded = false;
		// 	this.step += 1;
		// 	console.log(this.step);
		// 	this.$refs.src.setAttribute('src', `./assets/video/${this.step}.mp4`);
		// 	this.$refs.video.load();
		// },
	},
	created() {},
	mounted() {
		this.loading = true;
		setTimeout(() => {
			this.loading = false;
		}, 2500);
		this.appHtml([
			{ one: 'main', key: 'drawer', value: false },
			{ one: 'main', key: 'breadcrumbs', value: false },
			{ one: 'app', key: 'background', value: 'blue darken-2' },
			{ one: 'app', key: 'colorWhite', value: true },
		]);
	},
	beforeDestroy() {
		this.appHtml([
			{ one: 'main', key: 'drawer', value: true },
			{ one: 'main', key: 'breadcrumbs', value: true },
			{ one: 'app', key: 'background', value: 'grey lighten-5' },
			{ one: 'app', key: 'colorWhite', value: false },
		]);
	},
	methods: {
		...mapMutations({
			appHtml: 'EDIT_HTML',
			video: 'speaking/SPEAKING_VIDEO',
			answer: 'speaking/SPEAKING_ANSWER',
			speak: 'speaking/SPEAKING_SPEAK',
			appHtml: 'EDIT_HTML',
			offStatistics: 'SHOW_SHORT_STATISTICS',
		}),
		...mapActions({
			getWords: 'APP_GET_USER_WORDS_AGGREGATED',
			alert: 'ALERT',
			wordProcessing: 'APP_WORD_PROCESSING',
		}),
		speak() {
			const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
			this.recognition = new SpeechRecognition();
			this.recognition.lang = 'en-US';
			this.recognition.continuos = false;
			this.recognition.interimResults = false;
			this.recognition.maxAlternatives = 1;
			this.recognition.onerror = (event) => {
				console.log(`It's error! ${event.error}`);
				this.count_error += 1;
				if (this.count_error > 100) this.recognition.onend = () => this.recognition.stop();
			};
			// this.recognition.onend = () => this.recognition.start();

			this.count_error = 0;
			this.recognition.addEventListener('result', (event) => {
				const last = event.results.length - 1;
				const sayWord = event.results[last][0].transcript.toLowerCase();
				const p = document.createElement('p');
				p.className = 'black white--text';
				p.ref = `speech${this.step}`;
				p.textContent = sayWord;
				this.$refs.chat.append(p);
				// this.$refs.speech.textContent = sayWord;
				this.recognition.onend = () => this.recognition.stop();
			});
			this.recognition.start();
		},
		video() {
			if (this.step >= 4) return;
			this.$refs.video.play();
			this.$refs.video.onended = () => {
				this.speak();
				this.answer();
				this.step += 1;
				console.log(this.step);
				this.$refs.src.setAttribute('src', `./assets/video/${this.step}.mp4`);
				this.$refs.video.load();
			};
		},
		answer() {
			const div = document.createElement('div');
			div.className = 'amber darken-4';
			div.ref = `answer${this.step}`;
			div.textContent = this.isAnswer[this.step];
			this.$refs.chat.append(div);
		},
	},
};
</script>

<style lang="scss" scoped>
.game {
	height: 100vh;
	box-sizing: border-box;
}
p {
	margin: 0;
}
.main {
	position: relative;
	width: 100%;
	height: 450px;
	display: flex;
	justify-content: center;
	flex-direction: column;
}
.video {
	position: relative;
	width: 300px;
	height: 300px;
	display: flex;
	margin: 0 auto;
	align-items: center;
	border-radius: 5px;
}

.answer {
	position: relative;
	display: block;
	top: 10px;
	color: #1976D2;
	text-align: center;
}

#btn {
	display: block;
	width: 150px;
	height: 60px;
	top: 20px;
	border-radius: 5px;
	color: white;
	align-items: center;
	background: #1976D2;
	position: relative;
	left: 50%;
	transform: translate(-50%, 0);
}
.load {
	position: relative;
	top: 20px;
	color: #1976D2;
}
</style>
