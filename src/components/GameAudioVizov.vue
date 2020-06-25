<template lang="pug">
	div( class="game" )
		div( class="header") header

		div( class="main" )
			div( class="start-game-button" )
				p( class="start-game-button-info") Start game!

			img(
				class="main__image"
				:src="isUrlImage"
			)

			div( class="card-pannel" )
				div(
					class="card"
					v-for="(item, i) in isWords"
					:key="i"
					v-if="i <= 4"
					@click="setImgAndAudio({image: isUrlFiles+item.image,audio: isUrlFiles+item.audio})"
				)
					//- span( class="card__icon" ) X
					div( class="card__info" )
						//- p( class="card__info__word" ) {{ item.word }}
						//- p( class="card__info__transcription" ) {{ item.transcription }}
						p( class="card__info__translation" ) {{ item.wordTranslate }}

		div( class="buttonsRow" ) buttonsRow

</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	name: 'AudioVizov',
	components: {},
	props: [],
	data: () => ({

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
		/** Examples
		 * this.getWords(); page - 0, group - 0
		 * this.getWords({ page: 2 });
		 * this.getWords({ page: 2, group: 3 });
		 * this.getWords({ group: 3 });
		 */
		this.getWords();
	},
	methods: {
		...mapActions({
			getWords: 'audiovizov/GET_WORDS',
		}),
		...mapMutations({
			setImgAndAudio: 'audiovizov/AUDIOVIZOV_SET_IMAGE_AND_AUDIO',
		}),
	},

};

/*
// ----- Variables ----- //
let startGame = false;
let randomArray = [0, 1, 2, 3, 4];
let Results = [];
const sound = '';

// ----- Function to shuffle array for the game ----- //
function Shuffle(array) {
	for (let i = array.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		// eslint-disable-next-line no-param-reassign
		[array[i], array[j]] = [array[j], array[i]];
	}
}

// ----- Function to initialize the game ----- //
function gameInit() {
	if (startGame === true) {
		randomArray = [0, 1, 2, 3, 4];
		Shuffle(randomArray);
	}
}

// ----- Function to put correct or wrong star in progress bar ----- //
function gameProgressAddStar(variant) {
	const PROGRESS_BAR = document.getElementById('GAME_PROGRESS');
	if (variant === 1) {
		const SUCCESS_STAR = document.createElement('span');
		SUCCESS_STAR.classList.add('star_correct');
		PROGRESS_BAR.append(SUCCESS_STAR);
	}
	if (variant === 0) {
		const MISTAKE_STAR = document.createElement('span');
		MISTAKE_STAR.classList.add('star_mistake');
		PROGRESS_BAR.append(MISTAKE_STAR);
	}
}

// ----- Game mode ----- //
const BUTTON_START_GAME = document.getElementById('START_GAME');

BUTTON_START_GAME.addEventListener('click', () => {
	if (BUTTON_START_GAME.value === 'start_game') {
		BUTTON_START_GAME.value = 'repeat';
		BUTTON_START_GAME.textContent = 'Repeat';
		BUTTON_START_GAME.classList.add('repeat');
		startGame = true;
		gameInit();
		// Game_Play_Current_Sound();
	}
	if (BUTTON_START_GAME.value === 'repeat') {
		// playSound(sound, sound, sound);
	}
});

// ----- Function to clear changes after game ----- //
function clearAfterGame() {
	for (let i = 1; i < 5; i += 1) {
		// CONTAINER.children[i].children[0].classList.remove('guessed');
		document.getElementById('GAME_PROGRESS').innerHTML = '';
		Results = [];
		randomArray = [0, 1, 2, 3, 4];
		startGame = false;
		BUTTON_START_GAME.value = 'start_game';
		BUTTON_START_GAME.textContent = 'Start Game';
		BUTTON_START_GAME.classList.remove('repeat');
	}
}

const CARD_GAME_CLICK = document.getElementById('CONTAINER_2');

CARD_GAME_CLICK.addEventListener('mousedown', (event) => {
	if (event.target.classList.contains('front') &&
	(event.target.parentNode.classList.contains('guessed') === false) && (startGame === true)) {
		if (sound === event.target.id) {
			// playSound('audio/correct.mp3', 'audio/correct.mp3', 'audio/correct.mp3');
			event.target.parentNode.classList.add('guessed');

			Results.push(1);
			gameProgressAddStar(1);
			randomArray.pop();
			// if (Random_Array.length > 0) Game_Play_Current_Sound();
			// else End_Game();
		} else {
			// playSound('audio/error.mp3', 'audio/error.mp3', 'audio/error.mp3');
			Results.push(0);

			gameProgressAddStar(0);
		}
	}
});

// ----- Function to End the game ----- //
// eslint-disable-next-line no-unused-vars
function endGame() {
	const Body = document.getElementById('BODY');
	const contentWrapper = document.getElementById('CONTENT');
	contentWrapper.classList.add('none');
	let Mistakes = 0;

	for (let i = 0; i < Results.length; i += 1) if (Results[i] === 0) Mistakes += 1;

	if (Mistakes > 0) {
		Body.classList.add('looser');
		// playSound('audio/failure.mp3', 'audio/failure.mp3', 'audio/failure.mp3');
		setTimeout(() => {
			Body.classList.remove('looser');
			contentWrapper.classList.remove('none');
		}, 3000);
	} else {
		Body.classList.add('victory');
		// playSound('audio/success.mp3', 'audio/success.mp3', 'audio/success.mp3');
		setTimeout(() => {
			Body.classList.remove('victory');
			contentWrapper.classList.remove('none');
		}, 3000);
	}
	clearAfterGame();

	setTimeout(() => {
		document.location.href = 'index.html';
	}, 3000);
}
*/
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
