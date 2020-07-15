const correctAnswer = {
	methods: {
		successResult() {
			this.isHideWord = false;
			this.isHideSentences = false;
			this.isHideFadeAnswer = true;
			this.wordsCount += 1;
			const soundArr = this.getSoundArr(true);
			this.playAllAudio(soundArr);
		},
		playAllAudio(arr) {
			console.log(arr);
			let current = 0;
			const audio = new Audio(arr[current]);

			const nextAudio = () => {
				current += 1;
				if (current === arr.length) {
					// finish this round, go to next word
					this.gameStatus = 'learnGroupReq';
					audio.removeEventListener('ended', nextAudio);
				}
				audio.src = arr[current];
				audio.play();
			};

			audio.addEventListener('ended', nextAudio);
			audio.play();
		},
		nextRound() {
			if (this.wordsCount === this.wordsPerDay) {
				this.endGame();
			} else {
				this.nextWord = this.words[this.wordsCount];
			}
		},
		endGame() {
			this.alert({ data: 'Игра закончена, Ваша статистика!' });
			this.showStatistics = true;
		},
	},
};

module.exports = { correctAnswer };
