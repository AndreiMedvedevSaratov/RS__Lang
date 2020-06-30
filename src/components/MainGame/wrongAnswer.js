const wrongAnswer = {
	methods: {
		failureResult() {
			this.isHideWord = false;
			this.isGetWrongInput = true;
			const soundArr = this.getSoundArr(false);
			this.repeatAudio(soundArr);
		},
		repeatAudio(arr) {
			const audio = new Audio(arr[0]);
			audio.addEventListener('ended', () => {
				// start another attempt
				this.gameStatus = 'secondAttempt';
			});
			audio.play();
		},
		repeatRound() {
			this.isHideFadeAnswer = false;
		},
	},
};

module.exports = { wrongAnswer };
