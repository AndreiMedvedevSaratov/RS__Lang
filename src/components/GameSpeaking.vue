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
