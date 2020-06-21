<template lang="pug">
div
	h1 Text
	div(class='card-container')

		div(class='card-header')
			div(class='card-header_repeat-progress')
				div(
					v-for='dot of progress.success' class="dot dot-success"
					)
				div(
					v-for='dot of progress.failure'
					class='dot dot-failure'
					)
			div(class='card-header_delete-button')
				input(
					class='delete-button'
					type='button'
					)

		main(class='card-body')
			div(class='learn-content')
				div(class='learn-content_image-word')
					div(class='learn-content_image')
						img(
							:src='image'
							width="250"
							height="170"
						)
					div(class='learn-content_word')
						div(class='word_origin')
							span(class='origin_container')
								span(
									class='hidden'
									v-for="(symbol, i) of wordArr"
									:key='i'
								) {{ symbol }}
							input(
								class='origin_input'
								type='text'
							)
						p(class='word_translation') {{ cardConfig.wordTranslate }}
				div(class='learn-content_text-example')
					div(class='text-example_origin')
						span {{ example.before }}
						span(class="learn-word")
							span(
								class='hidden'
								v-for="symbol of wordArr"
								) {{ symbol }}
						span {{ example.after }}
					div(class='text-example_translation')
						//- p {{ e}}
				div(class='learn-content_text-meaning')
					div(class='text-meaning_origin')
					div(class='text-meaning_translation')

//-			div(class='example-translate')
				p {{ cardConfig.textExampleTranslate }}

		div(class='card-footer')
			div(class='card-footer_word-translate')
				p {{ cardConfig.wordTranslate }}
				//
</template>

<script>
export default {
	name: 'CardItem',
	props: {
		cardConfig: {
			type: Object,
			required: true,
		},
		wordInfo: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			allLearnLevels: 5,
		};
	},
	computed: {
		image() {
			const { image } = this.cardConfig;
			return image;
		},
		progress() {
			return {
				success: this.wordInfo.group,
				failure: this.allLearnLevels - this.wordInfo.group,
			};
		},

		wordArr() {
			const { word } = this.cardConfig;
			return word.split('');
		},
		example() {
			const { word, textExample } = this.cardConfig;
			const index = textExample.indexOf(word);
			const before = textExample.slice(0, index);
			const after = textExample.slice(index + word.length);
			return {
				before,
				after,
			};
		},
	},
	methods: {},
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

// .learn-word {
// 	border: 1px solid black;
// 	border-radius: 3px;
// }

.hidden {
	visibility: hidden;
}
</style>
