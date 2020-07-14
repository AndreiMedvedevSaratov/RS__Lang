<template lang="pug">
	div( class="game" )

		v-row( class="main" )
			v-col
				video(
					class="main__image"
					controls
					ref="video"
				)
					source(
						:src="myVideosForGame[step]"
						type="video/mp4"
					)
				v-btn(
					@click="video()"
					tile
					block
				) Начать разговор

			v-col( class="indigo lighten-4" ) Чат
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
		myVideosForGame: ['./assets/video/first.mp4', './assets/video/second.mp4'],
		step: 0,

		status: '',
		srcVideo: './assets/video/first.mp4',
		isAnswer: 'Yes, actually I am lost! How did you know?',
		videoIsEnded: false,
		count_error: 0,
	}),
	computed: {
		...mapGetters({
			words: 'getWords',
			urlFiles: 'getUrlFiles',
			getShortStatistics: 'showShortStatistics',
		}),
	},
	watch: {
		videoIsEnded() {
			this.answer();
			this.speak();
			this.videoIsEnded = false;
			this.step += 1;
		},
	},
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
			wordProcessing: 'APP_WORD_PROCESSING',
		}),
		speak() {
			const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
			const recognition = new SpeechRecognition();
			recognition.lang = 'en-US';
			recognition.continuos = false;
			recognition.interimResults = false;
			recognition.maxAlternatives = 1;
			recognition.onerror = (event) => {
				console.log(`It's error! ${event.error}`);
				this.count_error += 1;
				if (this.count_error > 100) recognition.onend = () => recognition.stop();
			};
			recognition.onend = () => recognition.start();

			recognition.addEventListener('result', (event) => {
				const last = event.results.length - 1;
				const sayWord = event.results[last][0].transcript.toLowerCase();
				this.$refs.speech.textContent = sayWord;
				recognition.onend = () => recognition.stop();
			});
			recognition.start();
		},
		video() {
			this.$refs.video.addEventListener('ended', () => {
				this.videoIsEnded = true;
			});
			this.$refs.video.play();
		},
		answer() {
			this.$refs.answer.textContent = this.isAnswer;
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
