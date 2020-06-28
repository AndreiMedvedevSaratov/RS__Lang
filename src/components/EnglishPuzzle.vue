<template lang='pug'>
	.f
		.result-text(
			:ref="'result-word'"
		)

		.begin-text(
			ref="begin-word"
		)
			//- drop(
			//- 	:class="`group-words row-1`"
			//- 	@drop="handleDrop(mixed, ...arguments)"
			//- )
			//- 	drag( 	v-for="(item, j) in mixed"
			//- 			class="drag"
			//- 			:key="j"
			//- 			:transfer-data="{ item: item, list: mixed, example: 'lists' }"
			//- 			v-html="item.outerHTML"
			//- 		)
			//-
		.fuck
			.fuck2 f
		.button
			button( class="button__not-know button_style") I don't know
			button.button__check.button_style Check

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import createCanvas from '@/assets/js/crop-image';
// eslint-disable-next-line no-unused-vars
import { Drag, Drop } from 'vue-drag-drop';
/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	name: 'EnglishPuzzle',
	components: { Drag, Drop },
	props: [],
	data: () => ({
		num: 0,
		texts: [],
		canvasArray: [],
		correctSequence: {},
		mixed: {},
	}),
	computed: {
		...mapGetters({
			words: 'getWordList',
		}),
	},
	watch: {},
	created() {
		this.wordsAction();
	},
	mounted() {
		setTimeout(() => this.game(), 1000);
	},
	methods: {
		...mapActions({
			wordsAction: 'GET_WORDS',
		}),
		handleDrop(toList, data) {
			console.log(data);
			const fromList = data.list;
			if (fromList) {
				toList.push(data.item);
				fromList.splice(fromList.indexOf(data.item), 1);
				toList.sort((a, b) => a > b);
			}
		},
		game() {
			// const sortArr = (arr) => arr.sort(() => Math.random() - 0.5);

			// Поулучаем все предложения данного уровня
			this.words.map((text) => this.texts.push(text.textExample));

			// Поулучаем массив канвас обектов (предложения)
			createCanvas({
				// src: './assets/img/girl.jpg',
				src: 'https://github.com/jules0802/rslang_data_paintings/blob/master/level1/cut/9th_wave.jpg?raw=true',
				wordsList: this.texts,
				draggable: true,
			}).then((res) => {
				this.gameLoad(res);
			});
		},
		gameLoad(res) {
			const sortArr = (arr) => arr.sort(() => Math.random() - 0.5);

			this.canvasArray = res;
			console.log('All canvas', this.canvasArray);
			// const sortArr = (arr) => arr.sort(() => Math.random() - 0.5);

			// Сохраняем правильный вариант предложения (без сортировки)
			this.correctSequence = this.canvasArray[this.num].children;
			console.log('correctSequence', this.correctSequence);

			// Перемещиваем
			const y = Array.from(this.correctSequence);
			this.mixed = sortArr(y);
			console.log('mixed', this.mixed);

			this.$refs['begin-word'].append(...this.mixed);

			console.info(this.$refs['begin-word']);
		},

	},
};
</script>
<style lang='scss'>
.button {
	display: flex;
    justify-content: center;
    margin-top: 12px;
}

.btn {
	width: 90px;
    height: 27px;
    margin-right: 19px;
    border-radius: 3px;
    outline: none;
    background: burlywood;
	border: 1px solid #F1DE9C;
	cursor: pointer;
}

.btn__register:hover {
	color: #fff
}

.btn__sign-in:hover {
	color: #fff
}

.result-text {
	min-width: 860px;
    max-width: fit-content;
	min-height: 480px;
	background: #F1DE9C;
    margin: 0 auto;
}

.begin-text {
    display: flex;
    justify-content: center;
    width: 900px;
    height: auto;
    margin: 10px auto 0px auto;
}

.fuck {
    display: flex;
    width: 600px;
    font-size: 2px;
    background: cadetblue;
    margin: 0 auto;
    opacity: 1;
}

.button_style {
    padding: 10px 30px 10px 30px;
    cursor: pointer;
    border: 1px solid;
    border-radius: 5px;
}

.button__check {
    margin-left: 10px
}

.right {
    box-shadow: 0 0 5px green;
}

.wrong {
    box-shadow: 0 0 5px red;
}

.hide {
    display: none;
}

.hovered {
    background-color: grey;
}

.canvas-item:not(:first-child) {
	margin-left: -8px;
}

.canvas-item {
	height: 48px;
	cursor: pointer;
}

.group-words {
	display: flex;
}
</style>
