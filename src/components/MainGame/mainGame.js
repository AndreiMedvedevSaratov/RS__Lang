const mainGame = {
	methods: {

		/**
		 * The main function of the game.
		 */
		checkWord() {
			const input = this.userInput;
			const originWord = this.config.word;

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
			const { config, userSettings } = this;
			soundsArr.push(config.audio);
			if (isPlayAllSound) {
				if (userSettings.showAudioMeaning) soundsArr.push(config.audioMeaning);
				if (userSettings.showAudioExample) soundsArr.push(config.audioExample);
			}
			return soundsArr;
		},
	},
};

module.exports = { mainGame };
