const mainGame = {
	methods: {

		/**
		 * The main function of the game.
		 */
		checkWord() {
			const input = this.userInput;
			const originWord = this.config.word;

			if (originWord === input) {
				this.successInput(this.isGetWrongAnswer);
				this.successResult();
			} else {
				this.failureInput(this.isGetWrongAnswer);
				this.failureResult();
			}
		},
		successResult() {
			this.isHideWord = false;
			this.wordsCount += 1;
			const soundArr = this.getSoundArr(true);
			this.playAllAudio(soundArr);
		},
		getSoundArr(isPlayAllSound) {
			const soundsArr = [];
			const { config, userSettings } = this;
			soundsArr.push(config.audio);
			if (isPlayAllSound) {
				if (userSettings.showAudioMeaning) soundsArr.push(config.audioMeaning);
				if (userSettings.showAudioExample) soundsArr.push(config.audioExample);
			}
			return soundsArr;
		},
		playAllAudio(arr) {
			let current = 0;
			const audio = new Audio(arr[current]);

			const nextAudio = () => {
				current += 1;
				if (current === arr.length) {
					// finish this round, go to next word
					this.gameStatus = 'finish';
					audio.removeEventListener('ended', nextAudio);
				}
				audio.src = arr[current];
				audio.play();
			};

			audio.addEventListener('ended', nextAudio);
			audio.play();
		},
		failureResult() {
			this.isHideWord = false;
			this.isGetWrongAnswer = true;
			const soundArr = this.getSoundArr(false);
			this.repeatAudio(soundArr);
		},
		repeatAudio(arr) {
			const audio = new Audio(arr[0]);
			audio.onended(() => {
				console.log('audio end');
				this.gameStatus = 'repeat';
			});
			audio.play();
		},
		nextRound() {
			const { wordsLimit } = this.userSettings;
			if (this.wordsCount === wordsLimit) {
				this.endGame();
			} else {
				this.$emit('new-word');
			}
		},
		repeatRound() { },
		endGame() {
			alert('end game');
		},

	},
};

module.exports = { mainGame };
