<template lang="pug">
div
	h1 Text
	div(class='card-container')

		div(class='card-header')
			div(class='card-header_repeat-progress')
				div(v-for='dot of repeatProgress.success' class="dot dot-success")
				div(v-for='dot of repeatProgress.failure' class='dot dot-failure')
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
									v-for='(symbol, i) of wordArr'
								) {{ symbol }}
							input(:class="[{hidden: !isHideWord}, 'origin_input']"
								autofocus
								type='text'
								v-model='userInput'
							)
						p(class='word_translation'
							v-if='userSettings.showWordTranslate'
						) {{ config.wordTranslate }}
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
import { mainGame } from './mainGame';

export default {
	name: 'CardItem',
	components: {},
	mixins: [forGame, mainGame],
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
			isHideSentences: true,
			isGetWrongAnswer: false,
			wordsCount: 0,
			userInput: '',
			classForSymbols: [],
			gameStatus: 'play',
		};
	},
	computed: {
		repeatProgress() {
			const maxLearnLevel = 5;
			const { learnGroup } = this.config.userWord;
			return {
				success: learnGroup,
				failure: maxLearnLevel - learnGroup,
			};
		},
		wordArr() {
			return this.config.word.split('');
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
			console.log(this.userInput);
		},
		gameStatus(current) {
			switch (current) {
			case 'finish':
				setTimeout(() => {
					this.resetVariables();
					this.nextRound();
				}, 1500);
				this.gameStatus = 'play';
				break;
			case 'repeat':
				console.log('repeat word');
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

			let classesArr = [];
			let errorCount = 0;
			for (let i = 0; i < userInput.length; i += 1) {
				if (userInput[i] === originWord[i]) {
					classesArr.push('result-success');
				} else {
					classesArr.push('result-failfure');
					errorCount += 1;
				}
			}
			if (errorCount > borderForBigError) {
				classesArr = classesArr.map((item) => (item === 'result-failfure' ? `${item}_big` : item));
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
		resetVariables() {
			this.isHideWord = true;
			this.isGetWrongAnswer = false;
			this.userInput = '';
			this.classForSymbols = [];
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
// $failfureColorSmall: hsl(45, 100%, 75%);
$failfureColor: hsl(45, 100%, 75%);
$failfureColorBig: hsl(14, 100%, 78%);

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
	}
}

.result {
	&-success {
		text-decoration: underline;
		color: $successColor;
	}
	&-failfure {
		color: $failfureColor;

		&_big {
			color: $failfureColorBig;
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
