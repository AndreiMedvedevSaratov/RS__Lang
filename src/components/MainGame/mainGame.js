const mainGame = {
	methods: {
		/**
		 * The main function of the game.
		 */
		checkWord() {
			const input = this.userInput.toLowerCase();
			const originWord = this.nextWord.word.toLowerCase();

			if (originWord === input) {
				this.successInput(this.isGetWrongInput);
				this.successResult();
			} else {
				this.failureInput(this.isGetWrongInput);
				this.failureResult();
			}
		},
		getSoundArr(isPlayAllSound) {
			const soundsArr = [];
			soundsArr.push(`${this.urlFiles}${this.nextWord.audio}`);
			if (isPlayAllSound) {
				if (this.showAudioMeaning) soundsArr.push(`${this.urlFiles}${this.nextWord.audioMeaning}`);
				if (this.showAudioExample) soundsArr.push(`${this.urlFiles}${this.nextWord.audioExample}`);
			}
			return soundsArr;
		},
		skipWord() {
			this.isGetWrongInput = true;
			this.successInput(this.isGetWrongInput);
			this.successResult();
		},
	},
};

module.exports = { mainGame };
