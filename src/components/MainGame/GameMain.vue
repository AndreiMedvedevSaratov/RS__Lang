<template lang="pug">
div
	h1 Text
	div(
		class='card-container'
		v-if="Object.keys(nextWord).length != 0"
	)

		div(class='card-header')
			div(class='card-header_repeat-progress')
				//- div(v-for='dot of wordLearnProgress.success' class="dot dot-success")
				//- div(v-for='dot of wordLearnProgress.failure' class='dot dot-failure')
			div(class='card-header_delete-button')
				v-btn(@click='addWordInDeleteCategory()'
					x-small
				)
					div(class='delete-button')

		main(class='card-body')
			div(class='learn-content')

				div(class='learn-content_image-word')
					div(class='learn-content_image'
						v-if='showImage'
						)
						img(:src="`${this.urlFiles}${this.nextWord.image}`" width="250" height="170")

					div(class='learn-content_word')
						form(class='word_origin'
							@submit.prevent='checkWord()'
							)
							span(class='origin_container')
								span(:class='[{hidden: isHideWord}, classForSymbols[i]]'
									v-for='(symbol, i) of nextWord.word'
								) {{ symbol }}
							input(:class="[{hidden: !isHideWord}, 'origin_input']"
								v-focus
								type='text'
								v-model='userInput'
							)
							span(:class="[{hidden: isHideFadeAnswer}, 'origin_fade-answer']"
								) {{ nextWord.word }}
						p(class='word_translation'
							v-if='showWordTranslate'
							v-html="nextWord.wordTranslate"
						)
						p(class='word_transcription'
							v-if='showTranscription && !isHideSentences'
							v-html="nextWord.transcription"
						)
				div(class='learn-content_text-example'
					v-if='showTextExample'
					)
					div(class='text-example_origin')
							p(class='origin_all-sentence')
								span( v-html="example.before" )
								span(v-if='isHideSentences' class='origin_cap') [...]
								span(
									v-else class='origin_word'
									v-html="example.wordInText"
								)
								span( v-html="example.after" )
					div(class='text-example_translate'
						v-if='showTextExampleTranslate'
					)
						p(class='translate_all-sentence'
							v-if='!isHideSentences'
							v-html="nextWord.textExampleTranslate"
						)
				div(class='learn-content_text-meaning'
					v-if='showTextMeaning'
				)
					div(class='text-meaning_origin')
						p(class='origin_all-sentence')
							span( v-html="meaning.before" )
							span(v-if='isHideSentences' class='origin_cap') [...]
							span(
								v-else class='origin_word'
								v-html="meaning.wordInText"
							)
							span( v-html="meaning.after" )
					div(class='text-meaning_translate'
						v-if='showTextMeaningTranslate'
					)
						p(class='translate_all-sentence'
							v-if='!isHideSentences'
							v-html="nextWord.textMeaningTranslate"
						)
		div(class='card-footer')
			v-progress-linear(:value='progressLinear')

</template>

<script>
/**
 * watch (old, )
 */
import { mapGetters, mapMutations, mapActions } from 'vuex';

import { forGame } from './forGame';
import { correctAnswer } from './correctAnswer';
import { wrongAnswer } from './wrongAnswer';
import { mainGame } from './mainGame';

export default {
	name: 'CardItem',
	components: {},
	directives: {
		focus: {
			inserted(el) {
				el.focus();
			},
		},
	},
	mixins: [forGame, mainGame, correctAnswer, wrongAnswer],
	data() {
		return {
			nextWord: {},

			isHideWord: true,
			isHideFadeAnswer: true,
			isHideSentences: true,
			isGetWrongInput: false,
			wordsCount: 0,
			userInput: '',
			classForSymbols: [],
			gameStatus: 'firstAttempt',
		};
	},
	computed: {
		...mapGetters({
			getSetting: 'user/getSetting',
			words: 'getWords',
			urlFiles: 'getUrlFiles',
			getShortStatistics: 'showShortStatistics',
		}),
		// wordLearnProgress() {
		// 	const maxLearnLevel = 5;
		// 	const { learnGroup } = this.config.userWord;
		// 	return {
		// 		success: learnGroup,
		// 		failure: maxLearnLevel - learnGroup,
		// 	};
		// },
		example() {
			const { textExample, word } = this.nextWord;
			return this.getSentenceParts(textExample, word);
		},
		meaning() {
			const { textMeaning, word } = this.nextWord;
			return this.getSentenceParts(textMeaning, word);
		},
		progressLinear() {
			const proportion = this.wordsCount / this.wordsPerDay;
			return Math.floor(proportion * 100);
		},
		choiceWords: {
			get() {
				return this.getSetting.optional.choiceWords;
			},
			set(value) {
				this.setSetting({ key: 'choiceWords', value });
			},
		},
		wordsPerDay: {
			get() {
				return this.getSetting.wordsPerDay;
			},
			set(value) {
				this.setSetting({ value });
			},
		},
		showWordTranslate: {
			get() {
				return this.getSetting.optional.showWordTranslate;
			},
			set(value) {
				this.setSetting({ key: 'showWordTranslate', value });
			},
		},
		showTranscription: {
			get() {
				return this.getSetting.optional.showTranscription;
			},
			set(value) {
				this.setSetting({ key: 'showTranscription', value });
			},
		},
		showImage: {
			get() {
				return this.getSetting.optional.showImage;
			},
			set(value) {
				this.setSetting({ key: 'showImage', value });
			},
		},
		showTextMeaning: {
			get() {
				return this.getSetting.optional.showTextMeaning;
			},
			set(value) {
				this.setSetting({ key: 'showTextMeaning', value });
			},
		},
		showTextMeaningTranslate: {
			get() {
				return this.getSetting.optional.showTextMeaningTranslate;
			},
			set(value) {
				this.setSetting({ key: 'showTextMeaningTranslate', value });
			},
		},
		showAudioMeaning: {
			get() {
				return this.getSetting.optional.showAudioMeaning;
			},
			set(value) {
				this.setSetting({ key: 'showAudioMeaning', value });
			},
		},
		showTextExample: {
			get() {
				return this.getSetting.optional.showTextExample;
			},
			set(value) {
				this.setSetting({ key: 'showTextExample', value });
			},
		},
		showTextExampleTranslate: {
			get() {
				return this.getSetting.optional.showTextExampleTranslate;
			},
			set(value) {
				this.setSetting({ key: 'showTextExampleTranslate', value });
			},
		},
		showAudioExample: {
			get() {
				return this.getSetting.optional.showAudioExample;
			},
			set(value) {
				this.setSetting({ key: 'showAudioExample', value });
			},
		},
	},
	watch: {
		userInput() {
			this.changeLettersStatus();
			if (this.gameStatus === 'secondAttempt') {
				this.isHideFadeAnswer = true;
				setTimeout(() => { this.isHideFadeAnswer = false; }, 1500);
			}
		},
		gameStatus(current) {
			switch (current) {
			case 'finish':
				setTimeout(() => {
					this.resetRoundVariables();
					this.nextRound();
				}, 1500);
				break;
			case 'secondAttempt':
				this.resetAttemptVariables();
				break;
			default:
			}
		},
	},
	created() {
		this.game();
	},
	mounted() {},
	beforeUpdate() {
		this.markWord('nextWord');
	},
	updated() {},
	methods: {
		...mapMutations({
			appHtml: 'EDIT_HTML',
			offStatistics: 'SHOW_SHORT_STATISTICS',
			setSetting: 'user/USER_SETTINGS',
		}),
		...mapActions({
			getWords: 'APP_GET_USER_WORDS_AGGREGATED',
			alert: 'ALERT',
			wordProcessing: 'APP_WORD_PROCESSING',
		}),
		async game() {
			await this.getWords({
				group: 0,
				wordsPerPage: this.wordsPerDay,
				filter: {
					$or: [
						{
							userWord: { $ne: null },
						},
						{
							userWord: null,
						},
					],
				},
			});
			this.nextWord = this.words[this.wordsCount];
		},
		changeLettersStatus() {
			const { userInput } = this;
			const originWord = this.nextWord.word;
			const borderForBigError = 3;

			let errorCount = 0;
			let classesArr = [];

			const arrLen = userInput.length > originWord.length
				? userInput.length
				: originWord.length;
			for (let i = 0; i < arrLen; i += 1) {
				if (userInput[i] === originWord[i]) {
					classesArr.push('result-success');
				} else {
					classesArr.push('result-failure');
					errorCount += 1;
				}
			}

			if (errorCount > borderForBigError) {
				classesArr = classesArr.map((item) => (item === 'result-failure' ? `${item}_big` : item));
			}
			this.classForSymbols = classesArr;
		},
		addWordInDeleteCategory() {
			this.nextWord.userWord.dictionaryGroup = 5;
			console.log('ok, del');
		},
		getSentenceParts(str, word) {
			console.log('getSentenceParts', word);
			console.log('getSentenceParts22', str);
			const regexp = new RegExp(`[${word[0].toUpperCase()}${word[0].toLowerCase()}]${word.slice(1)}\\w?`);
			console.log('getSentenceParts44', regexp);
			const wordInText = str.match(regexp)[0];
			const [before, after] = str.split(wordInText);

			return { before, wordInText, after };
		},
		resetAttemptVariables() {
			this.isHideWord = true;
			this.userInput = '';
			this.classForSymbols = [];
		},
		resetRoundVariables() {
			this.isHideWord = true;
			this.isHideFadeAnswer = true;
			this.isHideSentences = true;
			this.isGetWrongInput = false;
			this.userInput = '';
			this.classForSymbols = [];
			this.gameStatus = 'firstAttempt';
		},
	},
};
</script>

<style lang="scss" scoped>
$fontSize: 2rem;
$fontFamily: 'Roboto', 'Arial', sans-serif;
$cardContainerWidth: 600px;
$cardContainerHeight: 450px;
$borderColor: hsl(0, 3%, 53%);
$imageWidth: 250px;
$imageHeight: 170px;
$successColor: hsl(122, 37%, 74%);
// $failureColorSmall: hsl(45, 100%, 75%);
$failureColor: hsl(45, 100%, 75%);
$failureColorBig: hsl(14, 100%, 78%);

.card-container {
	margin: auto;
	padding: 5px;
	max-width: $cardContainerWidth;
	min-height: $cardContainerHeight;
	width: 100%;
	border: 1px $borderColor solid;
	border-radius: 5px;
	box-shadow: 0 3px 0.5rem hsl(0, 0%, 68%);
	// height: 100%;
}

// HEADER
.card-header {
	display: flex;
	// width: 100%;
	height: 15px;
	margin: 0 5%;
	align-items: center;
	justify-content: space-between;

	&_repeat-progress {
		display: flex;
		height: 100%;
		width: fit-content;
		align-items: center;
	}
}
.delete-button {
	width: 15px;
	height: 15px;
	background-image: url('../../assets/img/dustbin.svg');
	background-position: center;
	background-size: contain;
}
.dot {
	width: 0.5rem;
	height: 0.5rem;
	background: #efe6e1;
	border-radius: 50%;
	margin: 0 0.125rem;
	// transition: background 500ms;

	&-success {
		background-color: hsl(188, 30%, 65%);
	}
	&-failure {
		background-color: hsl(21, 30%, 91%);
	}
}

// BODY
.learn-content {
	&_image-word {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
	}

	&_image {
		max-width: $imageWidth;
		max-height: $imageHeight;
	}

	&_word {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: $fontSize;
		font-family: $fontFamily;
	}
}

.word {
	&_origin {
		position: relative;
		width: fit-content;
		border: 1px solid $borderColor;
	}
}

.origin {
	&_container {
		width: fit-content;
	}

	&_input {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 11;
	}

	&_fade-answer {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
		opacity: 0.5;
	}
}

.result {
	&-success {
		text-decoration: underline;
		color: $successColor;
	}
	&-failure {
		color: $failureColor;

		&_big {
			color: $failureColorBig;
		}
	}
}

.success-result {
	text-decoration: underline;
	color: $successColor;
}

.hidden {
	visibility: hidden;
}
</style>
