<template lang='pug'>
	v-row(
		class="wrap fill-height red darken-4"
		style="background-image: url('./assets/img/sprint/fon.jpg');"
		justify="center"
		)
		// Темплейт до запуска игры
		v-col(
			v-if="!gameStatus"
			cols="12"
			sm="4"
			align="center"
			class="start"
		)
			h2( class="text-uppercase" )  {{ 'Sprint Game'}}
			v-row
				v-col
					v-select(
						v-model="level"
						:items="levels"
						label="Your English level"
					)
				v-col
					v-select(
						v-model="complexity"
						:items="levelСomplexity"
						label="Complexity of game"
					)
			v-btn(
				@click="game()"
				block
			)
				span( style="color: #112595" ) St
				span( style="color: #ba0410" ) art
		// Темплейт после запуска игры
		v-col(
			v-else
			cols="12"
			sm="8"
			align="center"
			class="start game"
		)
			// Кнопки назад, таймеры и статистика
			v-row
				v-col( v-if="!loading" )
					v-btn(
						@click="backMenu"
						color="error"
					)
						v-icon(left) mdi-keyboard-backspace
						| Back to main
				v-overlay( :value="overlay" )
					div(
						class="timer text-center font-weight-black"
						v-if="!loading"
					) {{ currentTime }}
				v-col(
					v-if="!overlay && !loading"
					class="font-weight-black h1"
				) You have {{ currentTimeGame }} seconds left
				v-col( v-if="!loading" )
					v-btn(
						@click="showStatistics = true"
						color="primary"
					)
						v-icon(left) mdi-information-outline
						| Statistics
			// Анимация загрузки игры
			div( v-if="loading" ) Please stand by
				v-progress-linear(
					indeterminate
					rounded
					color="red darken-4"
					class="mb-0"
				)
			// Скелет игры до запуска
			v-skeleton-loader(
				v-else-if="!statusTimerGame"
				type="card"
			)
			// Игра
			v-card(
				v-else
				class="mx-auto"
			)
				v-img(
					v-if="nextCorrectWord"
					class="white--text align-center"
					height="250px"
					contain
					:src="getImg"
				)
					v-card-title( class="justify-center primary text-h3" ) {{ nextCorrectWord.wordTranslate }}
				v-card-text(
					v-if="nextCorrectWord"
				)
					v-btn(
						v-for="( word, i) in nextWords" :key="i"
						class="ma-2 font-weight-medium"
						tile
						color="cyan lighten-5"
						@click="nextWord(word._id)"
					) {{ word.word }}
			v-btn(
				v-if="!statusTimerGame && !loading"
				@click="replay"
				color="red lighten-5 ma-3"
			)
				v-icon(left) mdi-replay
				| Replay
		vModal( :words="{ correct: correctWords, wrong: wrongWords }" )
</template>

<script>
/* eslint-disable prefer-destructuring */
/* eslint-disable guard-for-in */
/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */
import { mapMutations, mapActions, mapGetters } from 'vuex';
import vModal from './ModalShortStat.vue';
/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	name: 'Sprint',
	components: {
		vModal,
	},
	filters: {
	},
	props: [],
	data: () => ({
		gameStatus: false,
		loading: false,

		overlay: false,

		// Нужно обнулять
		nextCorrectWord: null,
		nextWords: [],
		modifiedArray: [],
		currentPosition: 0,
		correctWords: [],
		wrongWords: [],

		countWords: 20,
		countСhoices: 4,
		group: 0,
		withImg: true,

		level: 1,
		levels: [
			{
				text: 'Elementary',
				value: 1,
			},
			{
				text: 'Intermediate',
				value: 2,
			},
			{
				text: 'Advanced',
				value: 3,
			},
		],
		complexity: 1,
		levelСomplexity: [
			{
				text: 'Easy',
				value: 1,
			},
			{
				text: 'Medium',
				value: 2,
			},
			{
				text: 'Hard',
				value: 3,
			},
		],

		currentTimeGame: 60,
		timerGame: null,
		statusTimerGame: false,

		currentTime: 3,
		timer: null,
		statusTimer: false,

	}),
	computed: {
		...mapGetters({
			words: 'getWords',
			urlFiles: 'getUrlFiles',
			getStatistics: 'sprint/showStatistics',
		}),
		// Если выбрано играть без картинок то зарузить по умолчанию
		getImg() {
			return this.withImg ? `${this.urlFiles}${this.nextCorrectWord.image}` : './assets/img/sprint/fon3.jpg';
		},
		// Открыть/Закрыть краткосрочную статистику
		showStatistics: {
			get() {
				return this.getStatistics;
			},
			set() {
				this.offStatistics();
			},
		},

	},
	watch: {
		currentTime(time) {
			if (time === 0) {
				this.stopTimer();
				this.startTimerGame();
			}
		},
		currentTimeGame(time) {
			if (time === 0) {
				this.stopTimerGame();
			}
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
			// Изменим цвет header по таблице цветов
			// https://vuetifyjs.com/en/styles/colors/#sass-color-pack
			{ one: 'app', key: 'background', value: 'red darken-4' },
			// Изменим цвет текста на белый в header
			{ one: 'app', key: 'colorWhite', value: true },
		]);
		// TODO: проверить уход со страницы через сохранение статистики на слове
		// window.addEventListener('beforeunload', (e) => {
		// 	e.preventDefault();
		// 	const confirmationMessage = 'Почти закрыл';
		// 	console.log('Вроде сработало!');
		// 	return confirmationMessage;
		// }, false);
	},
	beforeDestroy() {
		// Перед закрытием страницы возращаем настройки обратно
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
			offStatistics: 'sprint/SPRINT_SHOW_STATISTICS',
		}),
		...mapActions({
			getWords: 'APP_GET_USER_WORDS_AGGREGATED',
			alert: 'ALERT',
		}),
		// Главный метод
		async game() {
			this.loading = true;
			this.gameStatus = true;
			await this.gameMode();
			await this.getWords({
				group: this.group,
				wordsPerPage: this.countWords * this.countСhoices,
				filter: {
					userWord: null,
				},
			});
			await this.builderArray();

			this.nextWords = this.modifiedArray[this.currentPosition];
			const len = Object.keys(this.nextWords).length - 1;
			const random = this.randomWord(0, len);

			// Рандомное слово
			this.nextCorrectWord = this.nextWords[random];

			await setTimeout(() => {
				this.loading = false;
				this.startTimer();
			}, 100);
		},
		// Создает новый массив из обьектов с n колличеством внутренних обьектов
		builderArray() {
			this.modifiedArray = this.words.reduce((p, c, i) => {
				if (i % this.countСhoices === 0) p.push({});
				// eslint-disable-next-line no-param-reassign
				p[p.length - 1][i] = c;
				return p;
			}, []);
		},
		// Метод для выбора рандомного слова из пула ( для угадывания )
		randomWord(min, max) {
			// случайное число от min до (max+1)
			const rand = min + Math.random() * (max + 1 - min);
			return Math.floor(rand);
		},
		// Метод для получения следующего слова ( после угадывания )
		// Срабатывает при нажатие на любое слово
		nextWord(wordId) {
			// eslint-disable-next-line no-underscore-dangle
			if	(wordId === this.nextCorrectWord._id) {
				this.stat(true, this.nextCorrectWord);
			} else this.stat(false, this.nextCorrectWord);

			if (++this.currentPosition > this.countWords - 1) this.gameOver();
			else {
				const next = Object.values(this.modifiedArray[this.currentPosition]);
				this.nextWords = next;
				const random = this.randomWord(0, this.nextWords.length - 1);
				// Рандомное слово
				this.nextCorrectWord = this.nextWords[random];
			}
		},
		gameOver() {
			this.alert({ data: 'Игра закончена' });
			this.stopTimerGame();
			this.showStatistics = true;
		},
		// Настройка игры под выбранные параметры уровня и сложности
		gameMode() {
			switch (this.level) {
			case 1:
				if (this.complexity === 1) {
					this.countWords = 15;
					this.group = 0;
					this.withImg = true;
					this.countСhoices = 4;
				} else if (this.complexity === 2) {
					this.countWords = 20;
					this.group = 0;
					this.withImg = true;
					this.countСhoices = 4;
				} else if (this.complexity === 3) {
					this.countWords = 20;
					this.group = 1;
					this.withImg = true;
					this.countСhoices = 4;
				}
				break;
			case 2:
				if (this.complexity === 1) {
					this.countWords = 20;
					this.group = 2;
					this.withImg = true;
					this.countСhoices = 4;
				} else if (this.complexity === 2) {
					this.countWords = 25;
					this.group = 2;
					this.withImg = false;
					this.countСhoices = 4;
				} else if (this.complexity === 3) {
					this.countWords = 20;
					this.group = 3;
					this.withImg = false;
					this.countСhoices = 5;
				}
				break;
			case 3:
				if (this.complexity === 1) {
					this.countWords = 20;
					this.group = 4;
					this.withImg = true;
					this.countСhoices = 5;
				} else if (this.complexity === 2) {
					this.countWords = 25;
					this.group = 4;
					this.withImg = false;
					this.countСhoices = 5;
				} else if (this.complexity === 3) {
					this.countWords = 30;
					this.group = 5;
					this.withImg = false;
					this.countСhoices = 5;
				}
				break;
			default:
				this.countWords = 15;
				this.group = 0;
				this.withImg = true;
				this.countСhoices = 4;
			}
		},
		stat(correct, word) {
			if (correct) {
				this.correctWords.push(word);
				// TODO: добавить вставки элементов, которые показывали что пользователь угадал
				return;
			}
			this.wrongWords.push(word);
			// TODO: добавить вставки элементов, которые показывали что пользователь не угадал
		},
		backMenu() {
			this.loading = true;
			this.stopTimer();
			this.stopTimerGame();
			this.modifiedArray = [];

			setTimeout(() => {
				this.loading = false;
				this.gameStatus = false;
			}, 500);
		},

		startTimer() {
			this.timer = setInterval(() => {
				this.currentTime--;
			}, 1000);
			this.statusTimer = true;
			this.overlay = true;
		},
		stopTimer() {
			this.statusTimer = false;
			this.overlay = false;
			clearTimeout(this.timer);
			this.currentTime = 3;
		},

		startTimerGame() {
			this.timerGame = setInterval(() => {
				this.currentTimeGame--;
			}, 1000);
			this.statusTimerGame = true;
		},
		stopTimerGame() {
			this.statusTimerGame = false;
			clearTimeout(this.timerGame);
			this.currentTimeGame = 60;

			this.nextCorrectWord = null;
			this.nextWords = [];
			this.currentPosition = 0;
		},
		replay() {
			this.nextWords = this.modifiedArray[this.currentPosition];
			const len = Object.keys(this.nextWords).length - 1;
			const random = this.randomWord(0, len);

			// Рандомное слово
			this.nextCorrectWord = this.nextWords[random];

			this.startTimer();
		},
	},

};
</script>

<style lang='scss' scoped>
.wrap {
	background:fixed center no-repeat;
	background-size: auto;
	position: absolute;
	width: 100%;
    top: 0;

	.start {
		position: absolute;
		top: 20%;
	}
	.game {
		top: 15%!important;
	}
	.timer{
		height: 300px;
		width: 300px;
		font-size: 15rem;
		line-height: normal;
	}
}
</style>
