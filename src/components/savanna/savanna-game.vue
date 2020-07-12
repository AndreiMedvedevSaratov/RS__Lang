<template>
  <div class="savanna-game">
    <div class="container">
      <div class="savanna-game__wrapper">
        <h3
          class="savanna-game__word"
          @click="fallingWord"
        >
          careful
        </h3>
        <ul class="savanna-game__healths">
          <li class="helth" />
          <li class="helth" />
          <li class="helth" />
          <li class="helth" />
          <li class="helth" />
        </ul>
        <ul class="savanna-game__word-list">
          <li
            v-for="(item, i) in myWordsForGame"
            :key="i"
            class="word-list__item"
            @click="strikeButton(item)"
          >
            {{ item.wordTranslate }}
          </li>
        </ul>
        <div
          class="start-game-button"
          @click="startGame"
        >
          <p class="start-game-button-info">
            Start game!
          </p>
        </div>
      </div>
    </div>
    <vModal :words="{ correct: correctWords, wrong: wrongWords }" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import vModal from '../modal/ModalShortStat.vue';

export default {
	name: 'AudioVizov',
	components: {
		vModal,
	},
	filters: {
	},
	props: [],
	data: () => ({
		topOfWord: 0,
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
		this.appHtml([
			{ one: 'main', key: 'drawer', value: false },
			{ one: 'main', key: 'breadcrumbs', value: false },
			{ one: 'app', key: 'background', value: 'pink darken-1' },
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
		...mapActions({
			getWords: 'audiovizov/GET_WORDS',
			wordProcessing: 'APP_WORD_PROCESSING',
		}),
		...mapMutations({
			setImgAndAudio: 'audiovizov/AUDIOVIZOV_SET_IMAGE_AND_AUDIO',
			appHtml: 'EDIT_HTML',
			offStatistics: 'SHOW_SHORT_STATISTICS',
		}),
		fallingWord() {
			this.topOfWord += 100;
			document.querySelector('#inspire > div > main > div > div > div > div.container > div > h3').style.top = `${this.topOfWord}px`;
		},
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
				for (let i = 0; i < 4; i += 1) {
					this.myWordsForGame[i] = this.myWords[c + i];
				}
			} else {
				for (let i = 0; i < 4; i += 1) {
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
			this.topOfWord = 0;
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
			} else {
				this.wrongWords.push(word);
			}
			await this.wordProcessing({ word, right });
		},
	},
};

</script>
<style lang='scss' scoped>

ul {
    padding: 0;
    margin: 0;
}

.container {
    padding-top: 0;
    padding-bottom: 0;
}
  .savanna-game {
    width: 100vw;
    height: 100vh;
    background: url("./main-bg.svg") no-repeat center;
    background-position-x: center;
    background-position-y: 100%;
    position: relative;
    padding-top: 60px;
        &__word {
        top: 1000;
        font-size: 48px;
        line-height: 1;
        font-weight: 300;
        white-space: nowrap;
        color: #fff;
        letter-spacing: 1px;
        height: 100%;
        transform: translate(0);
        transition: transform 5s ease-in;
        position: absolute;
        transform-origin: 50% bottom;
        transition: all .3s ease;
        transform: translate(-50%);
        display: inline-block;
        left: 50%;
    }
    &__wrapper {
        position: relative;
        display: flex;
        align-items: center;
        height: 100vh;
        justify-content: center;
    }
    &__healths {
        position: absolute;
        top: 0;
        right: 0;
        list-style: none;
        width: 120px;
        height: 30px;
        display: flex;
        justify-content: space-between;
        .helth {
            width: 20px;
            height: 20px;
            background: url("./hearth.svg") no-repeat center;
        }
    }
    &__word-list {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        list-style: none;
        .word-list__item {
            font-size: 24px;
            line-height: 30px;
            font-weight: 300;
            max-width: 270px;
            padding: 20px 15px 20px 30px;
            color: #fff;
            border-radius: 2px;
            cursor: pointer;
            margin: 0 20px;
            &:hover {
                background: hsla(0,0%,100%,.1);
            }
        }
    }

    .word-list__item--error {
        background: rgba(255,109,127,.3);
    }
    .word-list__item--sucess{
       background: rgba(80,227,194,.15);
    }

}

</style>
