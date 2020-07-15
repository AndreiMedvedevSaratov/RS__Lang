const forGame = {
	methods: {
		/**
		 *
		 * @param {string} configName - props name for word-object
		 */
		markWord(configName = 'nextWord') {
			if (!this[configName].userWord) {
				this[configName].userWord = {
					learnGroup: 1,
					dictionaryGroup: 1,
					allRepeats: 0,
					successRepeats: 0,
					previousTrain: new Date(),
					nextTrain: new Date(),
				};
			}
		},
		getNextTrainTime(group) {
			const breakInDays = [0, 1, 2, 7, 18];
			const date = new Date();
			date.setHours(0, 0, 0, 0);
			switch (group) {
			case 1:
				date.setDate(date.getDate() + breakInDays[0]);
				break;
			case 2:
				date.setDate(date.getDate() + breakInDays[1]);
				break;
			case 3:
				date.setDate(date.getDate() + breakInDays[2]);
				break;
			case 4:
				date.setDate(date.getDate() + breakInDays[3]);
				break;
			case 5:
				date.setDate(date.getDate() + breakInDays[4]);
				break;
			default:
			}

			return date;
		},
		failureInput(isAfterFailure) {
			const minLearnLevel = 0;
			const { userWord } = this.nextWord;
			if (!isAfterFailure) {
				userWord.learnGroup = userWord.learnGroup > minLearnLevel
					? userWord.learnGroup -= 1
					: minLearnLevel;
				userWord.dictionaryGroup = userWord.dictionaryGroup > minLearnLevel
					? userWord.dictionaryGroup -= 1
					: minLearnLevel;
				userWord.allRepeats += 1;
			}
		},
		successInput(isAfterFailure) {
			const maxLearnLevel = 5;
			const { userWord } = this.nextWord;
			if (!isAfterFailure) {
				userWord.learnGroup = userWord.learnGroup < maxLearnLevel
					? userWord.learnGroup += 1
					: maxLearnLevel;
				userWord.dictionaryGroup = userWord.dictionaryGroup < maxLearnLevel
					? userWord.dictionaryGroup += 1
					: maxLearnLevel;
				userWord.successRepeats += 1;
			}
			userWord.allRepeats += 1;
			userWord.previousTrain = new Date();
			userWord.nextTrain = this.getNextTrainTime(userWord.learnGroup);
		},
		/**
		 * use after successful completion of the round
		 */
		getNextWord() {
			return {
				word: 'boat',
				image: 'https://cdn.bannerbuzz.com/media/catalog/product/b/o/boat-lettering.jpg',
				audio: 'https://audio00.forvo.com/audios/mp3/v/w/vw_8991262_39_297198_126192.mp3',
				audioMeaning: 'files/01_0005_meaning.mp3',
				audioExample: 'https://audio00.forvo.com/mp3/9170762/39/9170762_39_7071412.mp3',
				textMeaning: 'A boat is a vehicle that moves across water',
				textExample: 'The next boat to the Aran Islands will be tomorrow morning',
				transcription: '[bout]',
				wordTranslate: 'лодка',
				textMeaningTranslate: 'Лодка - это транспортное средство, которое движется по воде',
				textExampleTranslate: 'Следующая лодка на острава Аран будут завтра утром',
				id: 5,
			};
		},
	},
};

module.exports = { forGame };
