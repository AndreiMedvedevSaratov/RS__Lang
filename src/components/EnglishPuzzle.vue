<template lang='pug'>
	.f
		.result-word(
			:ref="'result-word'"
		)

		.begin-word(
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

		book1: [
			{
				word: 'agree',
				image: 'files/01_0001.jpg',
				audio: 'files/01_0001.mp3',
				audioMeaning: 'files/01_0001_meaning.mp3',
				audioExample: 'files/01_0001_example.mp3',
				textMeaning: 'To agree is to have the same opinion or belief as another person',
				textExample: 'The students agree they have too much homework',
				transcription: '[əgríː]',
				wordTranslate: 'согласна',
				textMeaningTranslate: 'Согласиться - значит иметь то же мнение или убеждение, что и другой человек',
				textExampleTranslate: 'Студенты согласны, что у них слишком много домашней работы',
				id: 1,
			},
			{
				word: 'alcohol',
				image: 'files/01_0002.jpg',
				audio: 'files/01_0002.mp3',
				audioMeaning: 'files/01_0002_meaning.mp3',
				audioExample: 'files/01_0002_example.mp3',
				textMeaning: 'Alcohol is a type of drink that can make people drunk',
				textExample: 'A person should not drive a car after he or she has been drinking alcohol',
				transcription: '[ǽlkəhɔ̀ːl]',
				wordTranslate: 'алкоголь',
				textMeaningTranslate: 'Алкоголь - это тип напитка, который может сделать людей пьяными',
				textExampleTranslate: 'Человек не должен водить машину после того, как он выпил алкоголь',
				id: 2,
			},
			{
				word: 'arrive',
				image: 'files/01_0003.jpg',
				audio: 'files/01_0003.mp3',
				audioMeaning: 'files/01_0003_meaning.mp3',
				audioExample: 'files/01_0003_example.mp3',
				textMeaning: 'To arrive is to get somewhere',
				textExample: 'They arrived at school at 7 a.m',
				transcription: '[əráiv]',
				wordTranslate: 'прибыть',
				textMeaningTranslate: 'Приехать значит попасть куда-то',
				textExampleTranslate: 'Они прибыли в школу в 7 часов утра',
				id: 3,
			},
			{
				word: 'August',
				image: 'files/01_0004.jpg',
				audio: 'files/01_0004.mp3',
				audioMeaning: 'files/01_0004_meaning.mp3',
				audioExample: 'files/01_0004_example.mp3',
				textMeaning: 'August is the eighth month of the year',
				textExample: 'Is your birthday in August?',
				transcription: '[ɔ́ːgəst]',
				wordTranslate: 'август',
				textMeaningTranslate: 'Август - восьмой месяц года',
				textExampleTranslate: 'У тебя день рождения в августе?',
				id: 4,
			},
			{
				word: 'boat',
				image: 'files/01_0005.jpg',
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
			},
			{
				word: 'breakfast',
				image: 'files/01_0006.jpg',
				audio: 'files/01_0006.mp3',
				audioMeaning: 'files/01_0006_meaning.mp3',
				audioExample: 'files/01_0006_example.mp3',
				textMeaning: 'Breakfast is the morning meal',
				textExample: 'I ate eggs for breakfast',
				transcription: '[brekfəst]',
				wordTranslate: 'завтрак',
				textMeaningTranslate: 'Завтрак - это утренняя трапеза',
				textExampleTranslate: 'Я ел яйца на завтрак',
				id: 6,
			},
			{
				word: 'camera',
				image: 'files/01_0007.jpg',
				audio: 'files/01_0007.mp3',
				audioMeaning: 'files/01_0007_meaning.mp3',
				audioExample: 'files/01_0007_example.mp3',
				textMeaning: 'A camera is a piece of equipment that takes pictures',
				textExample: 'I brought my camera on my vacation',
				transcription: '[kǽmərə]',
				wordTranslate: 'камера',
				textMeaningTranslate: 'Камера - это часть оборудования, которая делает снимки',
				textExampleTranslate: 'Я принес свою камеру в отпуск',
				id: 7,
			},
			{
				word: 'capital',
				image: 'files/01_0008.jpg',
				audio: 'files/01_0008.mp3',
				audioMeaning: 'files/01_0008_meaning.mp3',
				audioExample: 'files/01_0008_example.mp3',
				textMeaning: 'A capital is a city where a country’s government is based',
				textExample: 'The capital of the United States is Washington, D.C',
				transcription: '[kæpətl]',
				wordTranslate: 'столица',
				textMeaningTranslate: 'Столица - это город, в котором базируется правительство страны',
				textExampleTranslate: 'Столица Соединенных Штатов - Вашингтон, округ Колумбия',
				id: 8,
			},
			{
				word: 'catch',
				image: 'files/01_0009.jpg',
				audio: 'files/01_0009.mp3',
				audioMeaning: 'files/01_0009_meaning.mp3',
				audioExample: 'files/01_0009_example.mp3',
				textMeaning: 'To catch is to grab or get something',
				textExample: 'Did you catch the ball during the baseball game?',
				transcription: '[kætʃ]',
				wordTranslate: 'поймать',
				textMeaningTranslate: 'Поймать - значит схватить или получить что-то',
				textExampleTranslate: 'Вы поймали мяч во время игры в бейсбол?',
				id: 9,
			},
			{
				word: 'duck',
				image: 'files/01_0010.jpg',
				audio: 'files/01_0010.mp3',
				audioMeaning: 'files/01_0010_meaning.mp3',
				audioExample: 'files/01_0010_example.mp3',
				textMeaning: 'A duck is a small water bird',
				textExample: 'People feed ducks at the lake',
				transcription: '[dʌk]',
				wordTranslate: 'утка',
				textMeaningTranslate: 'Утка - маленькая водяная птица',
				textExampleTranslate: 'Люди кормят уток у озера',
				id: 10,
			},
		],
		num: 0,
		texts: [],
		canvasArray: [],
		correctSequence: {},
		mixed: {},
	}),
	computed: {

	},
	watch: {},
	created() {},
	mounted() {
		this.$nextTick(() => {
			this.game(this.book1);
		});
	},
	methods: {
		handleDrop(toList, data) {
			console.log(data);
			const fromList = data.list;
			if (fromList) {
				toList.push(data.item);
				fromList.splice(fromList.indexOf(data.item), 1);
				toList.sort((a, b) => a > b);
			}
		},
		game(data) {
			// const sortArr = (arr) => arr.sort(() => Math.random() - 0.5);

			// Поулучаем все предложения данного уровня
			data.map((text) => this.texts.push(text.textExample));

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
@font-face {
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 400;
	src: url('../assets/fonts/montserrat-v14-latin_cyrillic-regular.eot');
	src: local('Montserrat Regular'), local('Montserrat-Regular'),
		url('../assets/fonts/montserrat-v14-latin_cyrillic-regular.eot?#iefix')
		format('embedded-opentype'),
		url('../assets/fonts/montserrat-v14-latin_cyrillic-regular.woff2') format('woff2'),
		url('../assets/fonts/montserrat-v14-latin_cyrillic-regular.woff') format('woff'),
		url('../assets/fonts/montserrat-v14-latin_cyrillic-regular.ttf') format('truetype'),
}

@font-face {
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 700;
	src: url('../assets/fonts/montserrat-v14-latin_cyrillic-700.eot');
	src: local('Montserrat Bold'), local('Montserrat-Bold'),
		url('../assets/fonts/montserrat-v14-latin_cyrillic-700.eot?#iefix')
		format('embedded-opentype'),
		url('../assets/fonts/montserrat-v14-latin_cyrillic-700.woff2') format('woff2'),
		url('../assets/fonts/montserrat-v14-latin_cyrillic-700.woff') format('woff'),
		url('../assets/fonts/montserrat-v14-latin_cyrillic-700.ttf') format('truetype'),
  }

body {
    font-family: 'Montserrat';
    font-style: normal;
    color: black;
}
.title {
	padding-top: 167px;
	font-size: 4rem;
	font-weight: 700;
	display: flex;
    justify-content: center;
}

.description {
	font-weight: 400;
	padding-top: 20px;
	display: flex;
    justify-content: center;
}

form {
	display: flex;
    justify-content: center;
    margin-top: 10px;
}

.form-wrapper {
	width: 369px;
    display: flex;
    flex-direction: column;
}

.input-email {
	display: flex;
    align-items: center;
    justify-content: space-between;
}

.input-password {
	margin-top: 11px;
	display: flex;
    justify-content: space-between;
    align-items: center;
}

label {
	cursor: pointer;
}

input {
	width: 220px;
    height: 30px;
    border: 1px solid #89C3D9;
    border-radius: 5px;
}

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

.start {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.info {
    display: flex;
    justify-content: center;
    height: 20px;
    margin-top: 10px;
}

.result-word {
	min-width: 860px;
    max-width: fit-content;
	min-height: 480px;
	background: #F1DE9C;
    margin: 0 auto;
}

.begin-word {
    display: flex;
    justify-content: center;
    width: 900px;
    height: auto;
    margin: 10px auto 0px auto;
}

.word-container {
    display: flex;
    justify-content: center;
    width: 100%;
    width: 100%;
    height: 45px;
    background: brown;
    border: 1px solid;
    align-items: center;
}

.gig {
    flex-grow: 1;
    width: auto;
    min-width: 40px;
    height: 45px;
    background: burlywood;
    border: none;
    display: flex;
    justify-content: center;
}

.word {
    width: -webkit-fill-available;
    height: 45px;
    border: 1px solid;
    text-align: center;
    padding: 12px 5px 12px 5px;
    //background: url('./assets/img/girl.jpg') no-repeat;
    cursor: pointer
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
