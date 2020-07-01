<template lang="pug">
div
	h1 Text
	div(class='card-container')

		div(class='card-header')
			div(class='card-header_repeat-progress')
				div(v-for='dot of wordLearnProgress.success' class="dot dot-success")
				div(v-for='dot of wordLearnProgress.failure' class='dot dot-failure')
			div(class='card-header_delete-button')
				v-btn(@click='addWordInDeleteCategory()'
					x-small
				)
					div(class='delete-button')

		main(class='card-body')
			div(class='learn-content')

				div(class='learn-content_image-word')
					div(class='learn-content_image'
						v-if='userSettings.showImage'
						)
						img(:src='config.image' width="250" height="170")

					div(class='learn-content_word')
						form(class='word_origin'
							@submit.prevent='checkWord()'
							)
							span(class='origin_container')
								span(:class='[{hidden: isHideWord}, classForSymbols[i]]'
									v-for='(symbol, i) of config.word'
								) {{ symbol }}
							input(:class="[{hidden: !isHideWord}, 'origin_input']"
								v-focus
								type='text'
								v-model='userInput'
							)
							span(:class="[{hidden: isHideFadeAnswer}, 'origin_fade-answer']"
								) {{ config.word }}
						p(class='word_translation'
							v-if='userSettings.showWordTranslate'
						) {{ config.wordTranslate }}
						p(class='word_transcription'
							v-if='userSettings.showTranscription && !isHideSentences'
						) {{ config.transcription }}
				div(class='learn-content_text-example'
					v-if='userSettings.showTextExample'
					)
					div(class='text-example_origin')
							p(class='origin_all-sentence')
								| {{ example.before }}
								span(v-if='isHideSentences' class='origin_cap') [...]
								span(v-else class='origin_word' ) {{ example.wordInText }}
								| {{ example.after }}
					div(class='text-example_translate'
						v-if='userSettings.showTextExampleTranslate'
					)
						p(class='translate_all-sentence'
							v-if='!isHideSentences'
						) {{ config.textExampleTranslate }}
				div(class='learn-content_text-meaning'
					v-if='userSettings.showTextMeaning'
				)
					div(class='text-meaning_origin')
						p(class='origin_all-sentence')
							| {{ meaning.before }}
							span(v-if='isHideSentences' class='origin_cap') [...]
							span(v-else class='origin_word' ) {{ meaning.wordInText }}
							| {{ meaning.after }}
					div(class='text-meaning_translate'
						v-if='userSettings.showTextMeaningTranslate'
					)
						p(class='translate_all-sentence'
						v-if='!isHideSentences'
						) {{ config.textMeaningTranslate }}
		div(class='card-footer')
			v-progress-linear(:value='progressLinear')

</template>

<script>
/**
 * watch (old, )
 */
import { forGame } from '@/store/modules/forGame';
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
	props: {
		config: {
			type: Object,
			required: true,
		},
		userSettings: {
			type: Object,
			default() {
				return {
					wordsLimit: 50,
					showWordTranslate: true,
					showTranscription: true,
					showImage: true,
					showTextMeaning: true,
					showTextMeaningTranslate: true,
					showAudioMeaning: true,
					showTextExample: true,
					showTextExampleTranslate: true,
					showAudioExample: true,
				};
			},
		},
	},
	data() {
		return {
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
		wordLearnProgress() {
			const maxLearnLevel = 5;
			const { learnGroup } = this.config.userWord;
			return {
				success: learnGroup,
				failure: maxLearnLevel - learnGroup,
			};
		},
		example() {
			const { textExample, word } = this.config;
			return this.getSentenceParts(textExample, word);
		},
		meaning() {
			const { textMeaning, word } = this.config;
			return this.getSentenceParts(textMeaning, word);
		},
		progressLinear() {
			const proportion = this.wordsCount / this.userSettings.wordsLimit;
			return Math.floor(proportion * 100);
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
	created() {},
	mounted() {},
	beforeUpdate() {
		this.markWord('config');
	},
	updated() {},
	methods: {
		changeLettersStatus() {
			const { userInput } = this;
			const originWord = this.config.word;
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
			this.config.userWord.dictionaryGroup = 5;
			console.log('ok, del');
		},
		getSentenceParts(str, word) {
			const regexp = new RegExp(`(${word})\\w?`);
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
