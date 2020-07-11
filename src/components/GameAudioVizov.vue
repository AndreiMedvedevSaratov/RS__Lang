<template lang="pug">
	div( class="game" )

		div( class="main" )
			div( class="start-game-button" @click="startGame")
				p( class="start-game-button-info" ) Start game!

			img(
				class="main__image"
				:src="isUrlImage"
				@click="pronounceSound"
			)

			div( class="card-pannel"
					ref="words" )
				div(
					class="card"
					v-for="(item, i) in myWordsForGame"
					:key="i"
					v-if="i < 5"
					@click="strikeButton(item)"
				)

					div( class="card__info" )
						p( class="card__info__translation"
							:ref="item.word" ) {{ item.wordTranslate }}

			v-col( )
					v-btn(
						@click="showStatistics = true"
						color="primary"
					)
						v-icon(left) mdi-information-outline
						| Statistics

		vModal( :words="{ correct: correctWords, wrong: wrongWords }" )
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import vModal from './modal/ModalShortStat.vue';

export default {
	name: 'AudioVizov',
	components: {
		vModal,
	},
	props: [],
	data: () => ({
		correctWords: [],
		wrongWords: [],
		isStartGame: false,
		isNextRound: false,
		myWords: {},
		myWordsForGame: [],
		wordForGuessTranslate: '',
		wordForGuessAudio: '',
		wordForGuessImage: '',
		currentGameRound: 0, // from 0 to 9
		wordsForTrain: [
			{
				levelOfDifficulty: 0, pageNumber: 4, wordNumberOnPage: 2, result: 0,
			},
			{
				levelOfDifficulty: 0, pageNumber: 8, wordNumberOnPage: 3, result: 0,
			},
			{
				levelOfDifficulty: 0, pageNumber: 7, wordNumberOnPage: 4, result: 0,
			},
			{
				levelOfDifficulty: 0, pageNumber: 3, wordNumberOnPage: 2, result: 0,
			},
			{
				levelOfDifficulty: 0, pageNumber: 5, wordNumberOnPage: 1, result: 0,
			},
			{
				levelOfDifficulty: 1, pageNumber: 4, wordNumberOnPage: 3, result: 0,
			},
			{
				levelOfDifficulty: 2, pageNumber: 4, wordNumberOnPage: 2, result: 0,
			},
			{
				levelOfDifficulty: 3, pageNumber: 4, wordNumberOnPage: 4, result: 0,
			},
			{
				levelOfDifficulty: 4, pageNumber: 4, wordNumberOnPage: 0, result: 0,
			},
			{
				levelOfDifficulty: 5, pageNumber: 4, wordNumberOnPage: 1, result: 0,
			},
		],
		card: '',
		pressedWord: '',
	}),
	computed: {
		...mapGetters({
			isWords: 'audiovizov/getWords',
			isUrlFiles: 'audiovizov/getUrlFiles',
			isUrlImage: 'audiovizov/getUrlImage',
			getShortStatistics: 'showShortStatistics',

			// Открыть/Закрыть краткосрочную статистику
			showStatistics: {
				get() {
					return this.getShortStatistics;
				},
				set() {
					this.offStatistics();
				},
			},
		}),
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
		const a = this.wordsForTrain[this.currentGameRound].levelOfDifficulty;
		const b = this.wordsForTrain[this.currentGameRound].pageNumber;
		this.getWordsForGame(a, b);
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
		]);
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
		...mapActions({
			getWords: 'audiovizov/GET_WORDS',
		}),
		...mapMutations({
			setImgAndAudio: 'audiovizov/AUDIOVIZOV_SET_IMAGE_AND_AUDIO',
			appHtml: 'EDIT_HTML',
			offStatistics: 'SHOW_SHORT_STATISTICS',
		}),
		pronounceSound() {
			this.playSound(this.isUrlFiles + this.wordForGuessAudio);
		},
		shuffle(array) {
			for (let i = array.length - 1; i > 0; i -= 1) {
				const j = Math.floor(Math.random() * (i + 1));
				// eslint-disable-next-line no-param-reassign
				[array[i], array[j]] = [array[j], array[i]];
			}
		},
		strikeButton(word) {
			if (word.wordTranslate === this.wordForGuessTranslate) {
				this.currentGameRound += 1;
				this.isNextRound = true;
				for (let i = 1; i < 6; i += 1) {
					document.querySelector(`#inspire > div > main > div > div > div > div.main > div.card-pannel > div:nth-child(${i}) > div > p`).classList.remove('notActive');
				}
			} else {
				this.wordsForTrain[this.currentGameRound].result += 1;
				this.$refs[word.word][0].classList.add('notActive');
			}
		},
		endOfTheGame() {
			let result = '';
			for (let i = 0; i < 10; i += 1) {
				result += this.wordsForTrain[i].result;
			}
			alert(`End of the game! ${result}`);
			this.showStatistics = true;
		},
		async playRoundOfTheGame() {
			this.isNextRound = false;
			const a = this.wordsForTrain[this.currentGameRound].levelOfDifficulty;
			const b = this.wordsForTrain[this.currentGameRound].pageNumber;
			const c = this.wordsForTrain[this.currentGameRound].wordNumberOnPage;
			try {
				await this.getWordsForGame(a, b);
			} catch (e) {
				console.log(e);
			}
			if (c < 14) {
				for (let i = 0; i < 5; i += 1) {
					this.myWordsForGame[i] = this.myWords[c + i];
				}
			} else {
				for (let i = 0; i < 5; i += 1) {
					this.myWordsForGame[i] = this.myWords[c - i];
				}
			}
			this.wordForGuessTranslate = this.myWordsForGame[0].wordTranslate;
			this.wordForGuessAudio = this.myWordsForGame[0].audio;
			this.wordForGuessImage = this.myWordsForGame[0].image;
			this.shuffle(this.myWordsForGame);
			this.playSound(this.isUrlFiles + this.wordForGuessAudio);
			this.setImgAndAudio({
				image: this.isUrlFiles + this.wordForGuessImage,
				// image: './assets/img/speaker.jpg',
			});
		},
		async getWordsForGame(levelOfDifficulty, currentPageNumber) {
			try {
				this.getWords({ page: currentPageNumber, group: levelOfDifficulty });
			} catch (e) {
				console.log(e);
			}
			this.myWords = this.isWords;
		},
		playSound(soundfileMp) {
			if ('Audio' in window) {
				const a = new Audio();
				if (a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/,
					'')) a.src = soundfileMp;
				a.autoplay = true;
			}
		},
		async startGame() {
			this.isStartGame = true;
			this.currentGameRound = 0;
			this.myWords = {};
			this.myWordsForGame = [];
			this.wordForGuessTranslate = '';
			this.wordForGuessAudio = '';
			this.wordForGuessImage = '';
			for (let i = 0; i < 10; i += 1) {
				this.wordsForTrain[i].result = 0;
			}
			try {
				await this.playRoundOfTheGame();
			} catch (e) {
				console.log(e);
			}
		},
		async stat(right, word) {
			if (right) {
				this.correctWords.push(word);
				// TODO: добавить вставки элементов, которые показывали что пользователь угадал
			} else {
				this.wrongWords.push(word);
				// TODO: добавить вставки элементов, которые показывали что пользователь не угадал
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
			background-color: #a4aea2;
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
