const correctAnswer = {
	methods: {
		successResult() {
			this.isHideWord = false;
			this.isHideSentences = false;
			this.wordsCount += 1;
			const soundArr = this.getSoundArr(true);
			this.playAllAudio(soundArr);
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
		nextRound() {
			const { wordsLimit } = this.userSettings;
			if (this.wordsCount === wordsLimit) {
				this.endGame();
			} else {
				this.$emit('new-word');
			}
		},
		endGame() {
			alert('end game');
		},
	},
};

module.exports = { correctAnswer };
