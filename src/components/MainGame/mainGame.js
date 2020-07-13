const mainGame = {
	methods: {

		/**
		 * The main function of the game.
		 */
		checkWord() {
			const input = this.userInput;
			const originWord = this.nextWord.word;

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
	},
};

module.exports = { mainGame };
