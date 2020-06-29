const forGame = {
	methods: {
		/**
		 *
		 * @param {object} configName - props name for word-object
		 */
		markWord(configName = 'config') {
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
			const { userWord } = this.config;
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
			const { userWord } = this.config;
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
				audio: 'files/01_0005.mp3',
				audioMeaning: 'files/01_0005_meaning.mp3',
				audioExample: 'files/01_0005_example.mp3',
				textMeaning: 'A boat is a vehicle that moves across water',
				textExample: 'There is a small boat on the lake',
				transcription: '[bout]',
				wordTranslate: 'лодка',
				textMeaningTranslate: 'Лодка - это транспортное средство, которое движется по воде',
				textExampleTranslate: 'На озере есть маленькая лодка',
				id: 5,
			};
		},
	},
};

module.exports = { forGame };
