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
				ref="chat-wrapper"
			) Чат
				div(
					id="chat"
				)
					div(
						class="amber darken-4"
						ref="answer"
					)
					p(
						class=''
						ref="speech"
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
		// Перед началом игры изменим стиль страницы
		this.appHtml([
			// свернем меню
			{ one: 'main', key: 'drawer', value: false },
			// Уберем хлебные крошки
			{ one: 'main', key: 'breadcrumbs', value: false },
			{ one: 'main', key: 'background', value: 'indigo lighten-5' },
			// Изменим цвет header по таблице цветов
			// https://vuetifyjs.com/en/styles/colors/#sass-color-pack
			{ one: 'app', key: 'background', value: 'indigo darken-4' },
			// Изменим цвет текста на белый в header
			{ one: 'app', key: 'colorWhite', value: true },
		]);
	},
	beforeDestroy() {
		// Перед закрытием страницы возращаем настройки обратно
		this.appHtml([
			{ one: 'main', key: 'drawer', value: true },
			{ one: 'main', key: 'breadcrumbs', value: true },
			{ one: 'main', key: 'background', value: '' },
			{ one: 'app', key: 'background', value: 'grey lighten-5' },
			{ one: 'app', key: 'colorWhite', value: false },
		]);
	},
	methods: {
		...mapMutations({
			appHtml: 'EDIT_HTML',
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
			this.recognition.onend = () => this.recognition.start();

			this.count_error = 0;
			this.recognition.addEventListener('result', (event) => {
				const last = event.results.length - 1;
				const sayWord = event.results[last][0].transcript.toLowerCase();
				const p = document.createElement('p');
				p.className = 'black white--text';
				p.ref = `speech${this.step}`;
				p.textContent = sayWord;
				document.getElementById('chat').append(p);
				this.recognition.onend = () => this.recognition.stop();
				if (this.step === 4 || this.step === 8 || this.step === 12) {
					setTimeout(() => {
						this.clear();
						alert('go on the next round');
					}, 1500);
				}
				if (this.step === 16) {
					setTimeout(() => {
						this.clear();
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
			document.getElementById('chat').append(div);
		},
		clear() {
			const div = document.createElement('div');
			div.id = 'chat';
			document.getElementById('chat').replaceWith(div);
		},
	},
};
</script>

<style lang="scss" scoped>
.game {
	height: 100%;
	padding: 0 15%;
	box-sizing: border-box;

	p {
		margin: 0;
	}

	.main {
		height: 80%;

		&__image {
			padding: 2% 0;
			max-width: 300px;
			display: block;
			margin: 0 auto;
			align-items: center;
		}
	}

	.answer {
		display: block;
	}
}
</style>
