<template lang="pug">
	div( class="game" )
		div( class="header") header

		div( class="main" )
			div( class="start-game-button" @click="startGame")
				p( class="start-game-button-info" ) Start game!

			img(
				class="main__image"
				:src="isUrlImage"
			)

			div( class="card-pannel" )
				div(
					class="card"
					v-for="(item, i) in isWords"
					:key="i"
					v-if="i < 5"
					@click="strikeButton(item)"
				)

					div( class="card__info" )
						p( class="card__info__translation" ) {{ item.wordTranslate }}

		div( class="buttonsRow" ) buttonsRow
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
	name: 'AudioVizov',
	components: {},
	props: [],
	data: () => ({
		isStartGame: false,
		randomArray: [0, 1, 2, 3, 4],
		Results: [],
		myWords: {},
		levelOfDifficulty: 0, // from 0 to 5
		currentPageNumber: 4, // from 0 to 29
		currentWordNumberOnPage: 5, // from 0 to 19
		currentGameRound: 0, // from 0 to 9
		card: '',
		pressedWord: '',
	}),
	computed: {
		...mapGetters({
			isWords: 'audiovizov/getWords',
			isUrlFiles: 'audiovizov/getUrlFiles',
			isUrlImage: 'audiovizov/getUrlImage',
		}),
	},
	watch: {},
	created() {},
	mounted() {
		this.getWords({ page: this.currentPageNumber, group: this.levelOfDifficulty });
	},
	methods: {
		...mapActions({
			getWords: 'audiovizov/GET_WORDS',
		}),
		...mapMutations({
			setImgAndAudio: 'audiovizov/AUDIOVIZOV_SET_IMAGE_AND_AUDIO',
		}),
		strikeButton(word) {
			console.log(word);
			if (word.wordTranslate === this.myWords[0].wordTranslate) {
				console.log('success!');
			}
		},
		playRoundOfTheGame() {
			this.playSound(this.isUrlFiles + this.myWords[0].audio);
			this.setImgAndAudio({
				image: this.isUrlFiles + this.myWords[0].image,
				audio: this.isUrlFiles + this.myWords[0].audio,
			});
		},
		// ----- Function get words for the play ----- //
		async getWordsForGame(levelOfDifficulty, currentPageNumber) {
			try {
				this.getWords({ page: currentPageNumber, group: levelOfDifficulty });
				this.myWords = this.isWords;
			} catch (e) {
				console.log(e);
			}
		},
		// ----- Function play sounds for the cards with English names ----- //
		playSound(soundfileMp) {
			if ('Audio' in window) {
				const a = new Audio();
				if (a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/,
					'')) a.src = soundfileMp;
				a.autoplay = true;
			}
		},
		// ----- Function to shuffle array for the game ----- //
		shuffle(array) {
			for (let i = array.length - 1; i > 0; i -= 1) {
				const j = Math.floor(Math.random() * (i + 1));
				// eslint-disable-next-line no-param-reassign
				[array[i], array[j]] = [array[j], array[i]];
			}
			this.randomArray = array;
		},
		async startGame() {
			this.isStartGame = true;
			this.currentGameRound = 0;
			this.randomArray = [0, 1, 2, 3, 4];
			this.shuffle(this.randomArray);
			await this.getWordsForGame(this.levelOfDifficulty, this.currentPageNumber);
			// console.log(this.myWords);
			// this.isUrlImage = './assets/img/speaker.jpg';
			this.playRoundOfTheGame();
		},
	},
};

</script>

<style lang='scss' scoped>
.game {
    height: 100vh;
    padding: 0 15%;
    background-color: #ccd8cc;
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
			margin: 10px auto;
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
			}
		}
	}
	.buttonsRow {
		background-color: #bbc9b8;
		height: 10%;
	}
}
</style>
