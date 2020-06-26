<template lang="pug">
div
	h1 Text
	div(class='card-container')

		div(class='card-header')
			div(class='card-header_repeat-progress')
				div(v-for='dot of progress.success' class="dot dot-success")
				div(v-for='dot of progress.failure' class='dot dot-failure')
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
								span(:class=`{
									hidden: isHideWord,
									'success-result': isSuccessResult,
									'fail-result': !isSuccessResult
									}`
									v-for="(symbol, i) of wordArr"
									:key='i'
									:ref="'symbol' + i"
								) {{ symbol }}
							input(class='origin_input'
								autofocus
								type='text'
								v-model='userWord'
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
								span(v-if='isHideWord' class='origin_cap') [...]
								span(v-else class='origin_word' ) {{ example.wordInText }}
								| {{ example.after }}
					div(class='text-example_translate'
						v-if='userSettings.showTextExampleTranslate'
					)
						p(class='translate_all-sentence'
							v-if='!isHideWord'
						) {{ config.textExampleTranslate }}
				div(class='learn-content_text-meaning'
					v-if='userSettings.showTextMeaning'
				)
					div(class='text-meaning_origin')
						p(class='origin_all-sentence')
							| {{ meaning.before }}
							span(v-if='isHideWord' class='origin_cap') [...]
							span(v-else class='origin_word' ) {{ meaning.wordInText }}
							| {{ meaning.after }}
					div(class='text-meaning_translate'
						v-if='userSettings.showTextMeaningTranslate'
					)
						p(class='translate_all-sentence'
						v-if='!isHideWord'
						) {{ config.textMeaningTranslate }}
		div(class='card-footer')
			v-progress-linear(:value='progressLinear')

</template>

<script>
import { forGame } from '@/store/modules/forGame';
/**
 * computed set and get
 * watch
 */
export default {
	name: 'CardItem',
	components: {},
	mixins: [forGame],
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
			isGetWrongAnswer: false,
			isSuccessResult: false,
			wordsCount: 0,
			userWord: '',
		};
	},
	computed: {
		progress() {
			const maxLearnLevel = 5;
			const { learnGroup } = this.config.userWord;
			return {
				success: learnGroup,
				failure: maxLearnLevel - learnGroup,
			};
		},
		originWord() {
			return this.config.word;
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
	watch: {},
	created() {},
	mounted() {},
	beforeUpdate() {
		this.markWord('config');
	},
	update() {},
	methods: {
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
		playAudio() {
			console.log('I play audio');
		},
		endGame() {
			alert('The end');
		},
		nextRound() {
			this.isHideWord = !this.isHideWord;
			this.wordsCount += 1;
			setTimeout(() => {
				if (this.wordsCount === this.userSettings.wordsLimit) {
					this.endGame();
				}
				this.isHideWord = true;
				this.$emit('new-word');
			}, 2000);
		},
		showSuccessResult() {
			this.isSuccessResult = true;
		},
		showFailureResult() {
			console.log(this.$refs);
		},
		checkWord() {
			const input = this.userWord;
			this.userWord = '';

			if (this.originWord === input) {
				this.successInput(this.isGetWrongAnswer);
				this.showSuccessResult();
				this.nextRound();
			} else {
				this.failureInput(this.isGetWrongAnswer);
				this.isGetWrongAnswer = true;
				this.showFailureResult();
			}
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

.success-result {
	text-decoration: underline;
	color: $successColor;
}

.hidden {
	visibility: hidden;
}
</style>
