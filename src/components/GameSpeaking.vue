<template lang="pug">
	div( class="game" )
		v-row( class="main" )
			video(
				class="video"
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
				id="btn"
				value="Start a conversation"
				) Start a conversation
			snack()
			div(
				ref="answer"
				)
			v-col(
				class="chat"
				ref="chat"
				) Chat:
				div(
					ref="chatWrap"
					id="chatWrap"
				)
					p(class=''
							ref="speech"
							)
			div( v-if="loading" class="load") Loading... please wait...
				v-progress-linear(
						indeterminate
						rounded
						color="blue darken-2"
						)
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import snack from './modal/rulesSpeaking.vue';

/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	name: 'Speaking',
	components: {
		snack,
	},
	props: [],
	data: () => ({
		step: 0,
		status: '',
		isAnswer: [
			'Yes, actually I am lost! How did you know?',
			'Am I? Oh, now I understand why I couldnt find anything.',
			'I want to eat at a restaurant by the beach.',
			'Yes, I see the restaurants now! Thanks for your help!',
			'Yes, Im looking for the Wallis Hotel.',
			'I could use any information you have!',
			'How do I get on the highway?',
			'What exit do I get off?',
			'Where did you go?',
			'What did you do there?',
			'Which museums did you go to?',
			'That sounds great!',
			'I would like to change money please.',
			'Its my first day here, so I want to buy money, please.',
			'I dont know. What are your rates?',
			'Great! Then Ill change all my money!',
		],
		videoIsEnded: false,
		count_error: 0,
		recognition: '',
		loading: false,
		round: 1,
	}),
	computed: {
		...mapGetters({
			words: 'getWords',
			urlFiles: 'getUrlFiles',
			getShortStatistics: 'showShortStatistics',
		}),
	},
	watch: {},
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
			offStatistics: 'SHOW_SHORT_STATISTICS',
		}),
		...mapActions({
			getWords: 'APP_GET_USER_WORDS_AGGREGATED',
			alert: 'ALERT',
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

			this.count_error = 0;
			this.recognition.addEventListener('result', (event) => {
				const last = event.results.length - 1;
				const sayWord = event.results[last][0].transcript.toLowerCase();
				const p = document.createElement('p');
				p.className = 'black white--text';
				p.ref = `speech${this.step}`;
				p.textContent = sayWord;
				document.getElementById('chatWrap').append(p);
				this.recognition.onend = () => this.recognition.stop();
				setTimeout(() => {
					this.clear();
				}, 1500);
				if (this.step === 4 || this.step === 8 || this.step === 12) {
					setTimeout(() => {
						this.clear();
						this.round += 1;
						alert(`go on the round ${this.round}`);
					}, 1500);
				}
				if (this.step === 15) {
					setTimeout(() => {
						alert('you win');
					}, 1500);
				}
			});
			this.recognition.start();
		},
		video() {
			this.$refs.video.play();
			this.$refs.video.onended = () => {
				this.answer();
				this.speak();
				this.step += 1;
				this.$refs.src.setAttribute('src', `./assets/video/${this.step}.mp4`);
				this.loading = true;
				this.$refs.video.load();
				setTimeout(() => {
					this.loading = false;
				}, 500);
			};
		},
		answer() {
			const div = document.createElement('div');
			div.className = 'answer';
			div.ref = `answer${this.step}`;
			div.textContent = this.isAnswer[this.step];
			document.getElementById('chatWrap').append(div);
		},
		clear() {
			const div = document.createElement('div');
			div.id = 'chatWrap';
			document.getElementById('chatWrap').replaceWith(div);
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
	height: auto;
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
	top: 0px;
}

.answer {
	position: relative;
	display: block;
	top: 10px;
	left: 150px;
	color: #1976d2;
	text-align: center;
}

#btn {
	display: block;
	width: 200px;
	height: 60px;
	top: 10px;
	border-radius: 5px;
	color: white;
	align-items: center;
	background: #1976d2;
	position: relative;
	left: 50%;
	transform: translate(-50%, 0);
}
.load {
	position: relative;
	top: 40px;
	color: #1976d2;
}
.chat {
	border: 2px solid #1976d2;
	border-radius: 5px;
	position: relative;
	top: 40px;
	width: 300px;
	color: #1976d2;
	left: 50%;
	transform: translate(-50%, 0);
}
</style>
