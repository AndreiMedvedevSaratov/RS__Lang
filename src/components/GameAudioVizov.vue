<template lang="pug">
	div( class="game pink lighten-5" )

		div( class="main " )
			v-row
				v-col( cols="6" )
					v-img(
						class=""
						:src="getImg"
						@click="gameStatus ? playAudio(`${isUrlFiles}${nextCorrectWord.audio}`) : ''"
					)
				v-col( cols="6" )
					ul
						li( class="text-h4" ) Опции уровня
						li
							b Количество слов:
							=' '
							| {{ countWords }}
						li
							b Количество слов на выбор:
							=' '
							| {{ countСhoices }}
						li
							b Подсказка картинкой:
							=' '
							| {{ !withImg || !showImage ? 'Отсутсвует': 'Присутсвует'}}
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
				v-col
					v-btn(
						class="mt-3"
						@click="showWordsGame()"
						block
					) Применить

			div(
				class="card-pannel"
				ref="words"
				v-if="showWords"
			)
				v-btn(
					outlined
					v-for="(item, i) in nextWords"
					:key="i"
					@click="!gameStatus ? playAudio(`${isUrlFiles}${item.audio}`) : nextWord(item._id)"
					x-large
					color="pink darken-1"
					class="ma-1"
					:ref="item._id"
				) {{ item.wordTranslate }}

			v-row
				v-col
					v-btn(
						@click="showStatistics = true"
						color="primary"
						block
						:disabled="correctWords.length === 0 || wrongWords.length === 0"
					)
						v-icon(left) mdi-information-outline
						| Statistics
				v-col
					v-btn(
						block
						@click="checkSetting()"
						color="success"
						:disabled="!showWords || gameStatus"
					) Start Game

		vModal( :words="{ correct: correctWords, wrong: wrongWords }" )
		vAlert(
			text=`Для данной игры должны быть изменены следующие пользовательские настройки:<br>
			<br><b> 1) Дневной лимит не меньше 30 слов </b>
			<br><b> 2) Показывать перевод слова </b><br>
			<br> Соглашаясь Вы принимаете условие!`
			:goYes="consentToTerms"
		)
</template>

<script>
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-underscore-dangle */
import { mapActions, mapGetters, mapMutations } from 'vuex';
import setting from '@/assets/js/mixinSetting';
import alert from '@/assets/js/mixinAlert';
import vModal from './modal/ModalShortStat.vue';
import vAlert from './modal/ModalAlert.vue';

export default {
	name: 'AudioVizov',
	components: {
		vModal,
		vAlert,
	},
	filters: {
	},
	mixins: [setting, alert],
	props: [],
	data: () => ({
		showWords: false,
		gameStatus: false,
		nextCorrectWord: null,
		nextWords: [],
		modifiedArray: [],
		currentPosition: 0,
		correctWords: [],
		wrongWords: [],

		countWords: 15,
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
	}),
	computed: {
		...mapGetters({
			isWords: 'getWords',
			isUrlFiles: 'getUrlFiles',
			isUrlImage: 'getUrlImage',
			getShortStatistics: 'showShortStatistics',
		}),
		// Открыть/Закрыть краткосрочную статистику
		showStatistics: {
			get() {
				return this.getShortStatistics;
			},
			set() {
				this.offStatistics();
			},
		},
		// Если выбрано играть без картинок то зарузить по умолчанию
		getImg() {
			return this.withImg && this.nextCorrectWord != null && this.showImage ? `${this.isUrlFiles}${this.nextCorrectWord.image}` : this.isUrlImage;
		},
	},
	watch: {
		isNextRound() {
			if (this.currentGameRound < 10) {
				if (this.isNextRound) this.playRoundOfTheGame();
			} else this.endOfTheGame();
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
			{ one: 'app', key: 'background', value: 'pink darken-1' },
			// Изменим цвет текста на белый в header
			{ one: 'app', key: 'colorWhite', value: true },
			{ one: 'main', key: 'background', value: 'pink darken-1' },
		]);
	},
	beforeDestroy() {
		// Перед закрытием страницы возращаем настройки обратно
		this.appHtml([
			{ one: 'main', key: 'drawer', value: true },
			{ one: 'main', key: 'breadcrumbs', value: true },
			{ one: 'app', key: 'background', value: 'grey lighten-5' },
			{ one: 'app', key: 'colorWhite', value: false },
			{ one: 'main', key: 'background', value: '' },
		]);
	},
	methods: {
		...mapActions({
			getWords: 'APP_GET_USER_WORDS_AGGREGATED',
			wordProcessing: 'APP_WORD_PROCESSING',
			alert: 'ALERT',
		}),
		...mapMutations({
			appHtml: 'EDIT_HTML',
			offStatistics: 'SHOW_SHORT_STATISTICS',
		}),

		async game() {
			this.gameStatus = true;

			const len = Object.keys(this.nextWords).length - 1;
			const random = this.randomWord(0, len);

			// Рандомное слово
			this.nextCorrectWord = this.nextWords[random];

			this.playAudio(`${this.isUrlFiles}${this.nextCorrectWord.audio}`);

			this.correctWords = [];
			this.wrongWords = [];
		},

		// Проверяем пользовательские настройки на требования игры
		checkSetting() {
			if (this.wordsPerDay >= 30 && this.showWordTranslate) {
				this.game();
			} else this.showAlert = true;
		},

		// Применяем настройки пользователя после согласия
		consentToTerms() {
			this.showWordTranslate = true;
			this.wordsPerDay = 30;
			this.showAlert = false;
			this.setGetSetting({ method: 'put' });
			this.game();
		},

		// Создает новый массив из обьектов с n колличеством внутренних обьектов
		builderArray() {
			this.modifiedArray = this.isWords.reduce((p, c, i) => {
				if (i % this.countСhoices === 0) p.push({});
				// eslint-disable-next-line no-param-reassign
				p[p.length - 1][i] = c;
				return p;
			}, []);
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

		async showWordsGame() {
			await this.gameMode();
			await this.getWords({
				group: this.group,
				wordsPerPage: this.countWords * this.countСhoices,
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
			});
			await this.builderArray();

			this.nextWords = this.modifiedArray[this.currentPosition];
			this.showWords = true;
			this.gameStatus = false;
		},

		// Метод для выбора рандомного слова из пула ( для угадывания )
		randomWord(min, max) {
			// случайное число от min до (max+1)
			const rand = min + Math.random() * (max + 1 - min);
			return Math.floor(rand);
		},

		playAudio(dataAudio) {
			const audio = new Audio(dataAudio);
			audio.play();
		},

		// Метод для получения следующего слова ( после угадывания )
		// Срабатывает при нажатие на любое слово
		nextWord(wordId) {
			// eslint-disable-next-line no-underscore-dangle
			if	(wordId === this.nextCorrectWord._id) {
				this.stat(true, this.nextCorrectWord);
				// eslint-disable-next-line no-plusplus
				if (++this.currentPosition > this.countWords - 1) this.gameOver();
				else {
					this.nextWords = Object.values(this.modifiedArray[this.currentPosition]);
					const random = this.randomWord(0, this.nextWords.length - 1);
					// Рандомное слово
					this.nextCorrectWord = this.nextWords[random];
					this.playAudio(`${this.isUrlFiles}${this.nextCorrectWord.audio}`);
					this.$refs.words.childNodes.forEach((item) => {
						item.classList.remove('v-btn--disabled');
					});
				}
			} else {
				this.stat(false, this.nextCorrectWord);
				this.$refs[wordId][0].$el.classList.add('v-btn--disabled');
			}
		},
		gameOver() {
			this.alert({ data: 'Игра закончена, Ваша статистика!' });
			this.showStatistics = true;
		},

		async stat(right, word) {
			if (right) {
				this.correctWords.push(word);
			} else {
				this.wrongWords.push(word);
			}
			await this.wordProcessing({ word, right });
		},
	},
};

</script>

<style lang='scss' scoped>
.game {
    height: 100vh;
    padding: 0 15%;
    background-color: #F48FB1;
	box-sizing: border-box;
	p {
		margin: 0;
	}
	.header {
		background-color: #909f8d;
		height: 10%;
	}
	.main {
		height: 80%;
		&__image {
			padding: 2% 0;
			display: block;
			margin: 0 auto;
			height: 40%;
			align-items: center;
		}
		.start-game-button {
			width: 300px;
			height: 60px;
			margin: 0px auto;
			background-color: #d8c9d8;
			border: #dadada solid 1px;
			box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
		}
		.start-game-button:hover {
			background-color: #bab1ba;
		}
		.start-game-button-info {
			margin: 0;
		}
		.card-pannel {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			padding: 5px;
			box-sizing: border-box;
			cursor: pointer;
			.card {
				width: 150px;
				height: 60px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: #d8c9d8;
				border: #dadada solid 1px;
				box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.4);

				&__icon {
					background-color: #bbb0bb;
					text-align: center;
					flex: 1;
				}

				&__info {
					text-align: center;
					flex: 3;
				}

				&:hover {
					background-color: #bab1ba;
				}
				p.notActive {
					color: red;
				}
			}
		}
	}
	.buttonsRow {
		background-color: #bbc9b8;
		height: 10%;
	}
}
</style>
