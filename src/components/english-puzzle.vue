<template lang='pug'>
	div
		.select_wrapper
			label.level Level:
				select#selectbox1(
					ref="selectbox1"
					)
			label.page Page:
				select#selectbox2(
					ref="selectbox2"
				)
		.button_wrapper
			button#button_1
			button#button_2
			button#button_3
			button#button_4
		.result-word(
			ref="resultWord"
		)
			.word-container(
				v-for="(item, i) in 10"
				:key="i"
				ref="wordContainer"
			)
		.begin-word(
			ref="beginWord"
		)
		.fuck
			.fuck2
		.button
			div(
				v-if="gameStatus"
			)
				button.button__not-know.button_style(
					@click="dontKnow"
				) I don't know
				button.button__check.button_style Check
				button.button__check.button_style(
				v-if="!gameStatus"
			) Next level
		.card
			p#textExampleTranslate подсказка-перевод
			p#audioExample путь к аудио файлу
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	name: 'EnglishPuzzle',
	components: {},
	props: [],
	data: () => ({
		num: 0,
		wordRight: null,
		moveY: 0,
		gameStatus: false,
		// imgSrc: './assets/img/girl.jpg',
	}),
	computed: {
		...mapGetters({
			words: 'getWordList',
		}),
	},
	watch: {
	},
	created() {
		this.wordsAction();
	},
	mounted() {
		setTimeout(() => this.game(), 1000);
	},
	methods: {
		...mapActions({
			wordsAction: 'GET_WORDS',
			alertAction: 'ALERT',
		}),
		game() {
			this.gameStatus = true;

			const widthPx = (str) => +str.match(/[0-9]/g).join('');
			const sortArr = (arr) => arr.sort(() => Math.random() - 0.5);

			const { beginWord, wordContainer } = this.$refs;

			const str = this.words[this.num].textExample;
			const arr = str.split(' ');
			const countWords = arr.length;

			for (let i = 0; i < countWords; i += 1) {
				const div = document.createElement('div');
				div.className = `gig gig_end${this.num}`;
				wordContainer[this.num].append(div);
			}
			for (let i = 0; i < countWords; i += 1) {
				const div = document.createElement('div');
				div.className = `gig gig_begin${this.num}`;
				beginWord.append(div);
			}
			for (let i = 0; i < countWords; i += 1) {
				const div = document.createElement('div');
				div.innerHTML = `${arr[i]}`;
				div.className = `word word${this.num}`;
				div.setAttribute('draggable', true);
				document.querySelectorAll(`.gig_begin${this.num}`)[i].append(div);
			}

			// Array div word
			const wordAll = document.querySelectorAll(`.word${this.num}`);

			this.wordRight = wordAll;

			const map = new Map();
			for (let i = 0; i < countWords; i += 1) {
				const width = wordAll[i].offsetWidth;
				map.set(`${i}`, `${width}`);
			}

			for (let i = 0; i < countWords; i += 1) {
				wordAll[i].style.width = `${map.get(`${i}`)}px`;
			}

			let moveX = 0;

			if (this.num > 0) {
				this.moveY -= 45;
			}
			for (let i = 0; i < countWords; i += 1) {
				if (this.num === 0) {
					if (i === 0) {
						wordAll[i].style.backgroundPosition = `${moveX}px ${this.moveY}px`;
					} else if (i === 1) {
						moveX -= widthPx(wordAll[i - 1].style.width);
						wordAll[i].style.backgroundPosition = `${moveX}px ${this.moveY}px`;
					} else {
						moveX -= widthPx(wordAll[i - 1].style.width);
						wordAll[i].style.backgroundPosition = `${moveX}px ${this.moveY}px`;
					}
				}
				if (this.num > 0) {
					if (i === 0) {
						wordAll[i].style.backgroundPosition = `${moveX}px ${this.moveY}px`;
					} else if (i === 1) {
						moveX -= widthPx(wordAll[i - 1].style.width);
						wordAll[i].style.backgroundPosition = `${moveX}px ${this.moveY}px`;
					} else {
						moveX -= widthPx(wordAll[i - 1].style.width);
						wordAll[i].style.backgroundPosition = `${moveX}px ${this.moveY}px`;
					}
				}
			}

			const y = Array.from(document.querySelectorAll(`.gig_begin${this.num}`));
			const sortY = sortArr(y);
			let strR = '';

			for (let i = 0; i < countWords; i += 1) {
				strR += sortY[i].outerHTML;
			}
			beginWord.innerHTML = `${strR}`;

			const newArr = [];

			for (let i = 0; i < countWords; i += 1) {
				newArr.push(0);
			}

			const gigEnd = document.querySelectorAll(`.gig_end${this.num}`);
			for (let i = 0; i < wordAll.length; i += 1) {
				wordAll[i].addEventListener('click', (e) => {
					if (e.target.closest(`.gig_begin${this.num}`)) {
						for (let p = 0; p < newArr.length; p += 1) {
							if (newArr[p] === 0) {
								document.querySelectorAll(`.gig_end${this.num}`)[p].append(wordAll[i]);
								newArr.splice([p], 1, 1);
								break;
							}
						}
					} else if (e.target.closest(`.gig_end${this.num}`)) {
						document.querySelectorAll(`.gig_begin${this.num}`)[i].append(wordAll[i]);
					}
				});
			}

			for (let i = 0; i < gigEnd.length; i += 1) {
				gigEnd[i].addEventListener('click', () => {
					newArr.splice([i], 1, 0);
				});
			}

			function dragStart() {
				setTimeout(() => {
					this.classList.add('hide');
				}, 0);
			}
			function dragEnd() {
				this.classList.remove('hide');
			}

			function dragOver(event) {
				event.preventDefault();
			}
			function dragEnter() {
				this.classList.add('hovered');
			}
			function dragLeave() {
				this.classList.remove('hovered');
			}
			let target = null;
			document.addEventListener('mousedown', (e) => {
				target = e.target;
			});
			function dragDrop() {
				for (let i = 0; i < gigEnd.length; i += 1) {
					if (this === gigEnd[i]) {
						if (gigEnd[i].innerHTML) {
							let a = gigEnd[i].innerHTML;
							let b = null;
							gigEnd[i].innerHTML = '';
							gigEnd[i].append(target);
							for (let j = i + 1; j < gigEnd.length; j += 1) {
								if (!gigEnd[j].innerHTML) {
									gigEnd[j].innerHTML = `${a}`;
									break;
								} else {
									b = gigEnd[j].innerHTML;
									gigEnd[j].innerHTML = `${a}`;
									a = b;
								}
							}
						} else {
							gigEnd[i].append(target);
							newArr.splice([i], 1, 1);
						}
					}
				}
				for (let i = 0; i < gigEnd.length; i += 1) {
					if (!gigEnd[i].innerHTML) {
						newArr.splice([i], 1, 0);
					}
				}
				// this.append(target)
				this.classList.remove('hovered');
			}

			gigEnd.forEach((item) => {
				item.addEventListener('dragover', dragOver);
				item.addEventListener('dragenter', dragEnter);
				item.addEventListener('dragleave', dragLeave);
				item.addEventListener('drop', dragDrop);
			});
			wordAll.forEach((item) => {
				item.addEventListener('dragstart', dragStart);
				item.addEventListener('dragend', dragEnd);
			});

			document.querySelector('.button__check').addEventListener('click', () => {
				for (let i = 0; i < wordAll.length; i += 1) {
					wordAll[i].classList.remove('right');
					wordAll[i].classList.remove('wrong');
				}
				for (let i = 0; i < wordAll.length; i += 1) {
					if (wordAll[i].closest(`.gig_end${this.num}`)) {
						if (wordAll[i].innerHTML === arr[i]) {
							wordAll[i].classList.add('right');
						} else {
							wordAll[i].classList.add('wrong');
						}
					} else {
						wordAll[i].classList.add('wrong');
					}
				}
			});
		},

		dontKnow() {
			const word = document.querySelectorAll(`.word${this.num}`);
			for (let i = 0; i < word.length; i += 1) {
				this.$refs.beginWord.innerHTML = '';
				document.querySelectorAll(`.gig_end${this.num}`)[i].innerHTML = '';
			}
			for (let i = 0; i < word.length; i += 1) {
				document.querySelectorAll(`.gig_end${this.num}`)[i].innerHTML = this.wordRight[i].outerHTML;
			}

			if (this.num < 9) {
				this.num += 1;
				this.game();
			} else {
				this.gameStatus = false;
				this.alertAction({ status: 'success', data: 'Game over!!' });
			}
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
url('../assets/fonts/montserrat-v14-latin_cyrillic-regular.eot?#iefix') format('embedded-opentype'),
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
		url('../assets/fonts/montserrat-v14-latin_cyrillic-700.eot?#iefix') format('embedded-opentype'),
		url('../assets/fonts/montserrat-v14-latin_cyrillic-700.woff2') format('woff2'),
		url('../assets/fonts/montserrat-v14-latin_cyrillic-700.woff') format('woff'),
		url('../assets/fonts/montserrat-v14-latin_cyrillic-700.ttf') format('truetype'),
  }

body {
	font-family: 'Montserrat';
	font-style: normal;
	color: #476622;
}

.img {
	background: url('../assets/img/nature.jpg') no-repeat;
	background-size: cover;
	width: 100%;
	height: 100vh;
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

input {
	width: 220px;
	height: 30px;
	border: 1px solid #476622;
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
	background: #a8d06f;
	border: 1px solid #a8d06f;
	cursor: pointer;
}

.btn__register:hover {
	color: #a8d06f;
}

.btn__sign-in:hover {
	color: #a8d06f;
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
	width: 900px;
	height: 450px;
	background: #476622;
	margin: 0 auto;
	margin-top: 20px;
	border-top: 1px solid;
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
	height: 45px;
	background: #d7e5d2;
	border: 1px solid;
	align-items: center;
}

.gig {
	flex-grow: 1;
	width: auto;
	min-width: 40px;
	height: 45px;
	background: #a8d06f;
	border: none;
	display: flex;
	justify-content: center;
	color: #d7e5d2;
	font-weight: bold;
}

.word {
	width: -webkit-fill-available;
	height: 45px;
	border: 1px solid;
	text-align: center;
	padding: 12px 5px 12px 5px;
	background: url('../assets/img/girl.jpg') no-repeat;
	cursor: pointer;
}

/*.fuck {*/
/*    display: flex;*/
/*    width: 900px;*/
/*    font-size: 2px;*/
/*    background: #476622;*/
/*    margin: 0 auto;*/
/*    opacity: 1;*/
/*}*/

.button_style {
	padding: 10px 30px 10px 30px;
	cursor: pointer;
	border: 1px solid;
	border-radius: 5px;
	background: #476622;
	color: #d7e5d2;
	font-family: 'Montserrat';
	width: 180px;
	height: 50px;
	position: relative;
	top: 5px;
}

.button__check {
	margin-left: 10px
}

.right {
	box-shadow: 0 0 5px #476622;
}

.wrong {
	box-shadow: 0 0 5px red;
}

.hide {
	display: none;
}

.hovered {
	background-color: #a8d06f;
}

/*мой код*/

.button_wrapper {
	position: relative;
	left: 70vw;
	top: 1vh;
}

#button_1, #button_2, #button_3, #button_4 {
	width: 23px;
	height: 23px;
	margin-left: .3vw;
	color: #476622;
	border-radius: 5px;
	border: solid 1px #476622;
}

#selectbox1, #selectbox2 {
	width: 75px;
	height: 25px;
	margin-left: .3vw;
	color: #476622;
	border-radius: 5px;
	border: solid 1px #476622;
	font-family: 'Montserrat';
	font-size: 14px;
}

.select_wrapper {
	position: relative;
	left: 20vw;
	top: 4vh;
}

#button_1 {
	background: url("../assets/img/1.png") no-repeat;
}
#button_2 {
	background: url("../assets/img/2.png") no-repeat;
}

#button_3 {
	background: url("../assets/img/3.png") no-repeat;
}

#button_4 {
	background: url("../assets/img/4.png") no-repeat;
}

.card {
	position: absolute;
	left: 45vw;
	top: 6vh;
	width: auto;
	height: auto;
	color:#476622;
	font-size: 14px;
	border: solid 1px #476622;
	border-radius: 5px;
	font-family: 'Montserrat';
}
</style>
